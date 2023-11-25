import { NextResponse, NextRequest } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from '../../../lib/clients/prisma'
import { deleteDreamEntity } from '../../../lib/db/deleteDreamEntity'
import { getToken } from 'next-auth/jwt'
import { TDreamInput, TEmotionInput, TTagInput } from '../../../types/types'
import { deleteDreamImageFromStorage } from '../../../lib/storage/deleteDreamImageFromStorage'
import { readFile } from 'fs/promises'
import { generateImageName } from '../../../lib/generateImageName'

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECET,
    })

    if (!token || !token.userId) {
        return new Response('Not signed in!', {
            status: 401,
        })
    }

    if (
        !process.env.S3_REGION ||
        !process.env.S3_ACCESS_KEY_ID ||
        !process.env.S3_SECRET_ACCESS_KEY ||
        !process.env.S3_BUCKET_NAME_DREAM
    ) {
        throw new Error('Create Dream: S3 variables not set!')
    }

    const storageS3 = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    })

    const userId = token.userId as string
    let newEntityId = ''
    let imageName = undefined

    try {
        const form = await request.formData()

        const dreamInput = JSON.parse(
            form.get('dreamInput') as string
        ) as TDreamInput
        const imageFile = form.get('image') as File
        const tagsArr = form.getAll('tags') as string[]
        const emotionsIdArr = form.getAll('emotions') as string[]

        console.log('api dreamInput', dreamInput)
        console.log('api tags', tagsArr)
        console.log('api emotions', emotionsIdArr)

        // Prepare the tags for the Prisma query
        const tagCreateArray = tagsArr?.map((tagInput: string) => ({
            tag: {
                connectOrCreate: {
                    where: { name: tagInput },
                    create: { name: tagInput },
                },
            },
        }))

        // Create the entity
        const newEntity = await prisma.entity.create({
            data: {
                tags: {
                    create: tagCreateArray,
                },
                entityType: {
                    connect: {
                        typeName: 'dream',
                    },
                },
            },
        })

        // Store the ID of the created entity
        newEntityId = newEntity.entityId

        // Prepare the  emotions for the Prisma query

        const emotionConnectArray = emotionsIdArr?.map((emotionId) => ({
            emotionId_dreamId: {
                dreamId: newEntityId,
                emotionId: Number(emotionId),
            },
        }))

        // upload image to s3 bucket

        if (imageFile) {
            // Generate a random name for the image and add the extension from MIME type
            imageName = generateImageName(imageFile.type)

            const imageBlob = new Blob([imageFile])
            const imageArrayBuffer = await imageBlob.arrayBuffer()
            const imageBuffer = Buffer.from(imageArrayBuffer)

            // Upload the image to S3
            await storageS3.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME_DREAM,
                    Key: imageName,
                    // TODO: fix uploading the image
                    // The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-l an Array-like Object. Received an instance of File
                    Body: imageBuffer,
                })
            )
        }

        // console.log('api tagCreateArray', tagCreateArray)
        // console.log('api emotionConnectArray', emotionConnectArray)
        // console.log('api newEntityId', newEntityId)
        // console.log('api imageName', imageName)
        // console.log('api userId', userId)
        // console.log(
        //     'Number(dreamInput.categoryId)',
        //     Number(dreamInput.categoryId)
        // )

        const { categoryId, ...dream } = dreamInput
        // Create the dream entity
        await prisma.dream.create({
            data: {
                ...dream,
                category: {
                    connect: {
                        id: Number(dreamInput.categoryId),
                    },
                },

                user: {
                    connect: {
                        id: userId,
                    },
                },
                // id: newEntityId,
                entity: {
                    connect: {
                        entityId: newEntityId,
                    },
                },

                image: imageName,

                emotions: {
                    connect: emotionConnectArray,
                },
            },
        })
    } catch (e) {
        console.log('Error creating dream entity', e)

        if (newEntityId) {
            await deleteDreamEntity(newEntityId, imageName, storageS3)
        }

        if (imageName) {
            await deleteDreamImageFromStorage(
                imageName,
                process.env.S3_BUCKET_NAME_DREAM,
                storageS3
            )
        }

        return new Response('Something went wrong!', {
            status: 404,
        })
    }

    return NextResponse.json(
        {
            message: 'Dream added!',
        },
        {
            status: 200,
        }
    )
}
