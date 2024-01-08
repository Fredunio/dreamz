import { NextResponse, NextRequest } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from '../../../lib/clients/prisma'
import { deleteDream } from '../../../lib/db/deleteDreamEntity'
import { getToken } from 'next-auth/jwt'
import { TDreamInput } from '../../../types/types'
import { deleteFileFromStorage } from '../../../lib/storage/deleteFileFromStorage'
import { generateImageName } from '../../../lib/generateImageName'
import { S3ClientDreamz } from '../../../lib/clients/s3'

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

    if (!process.env.S3_BUCKET_NAME_DREAM) {
        throw new Error('Create Dream: S3 bucket name missing!')
    }

    const storageS3 = S3ClientDreamz

    const userId = token.userId as string
    let newDreamId = ''
    let imageName = undefined

    try {
        const form = await request.formData()

        const dreamInput = JSON.parse(
            form.get('dreamInput') as string
        ) as TDreamInput
        const imageFile = form.get('image') as File
        const tagsArr = form.getAll('tags[]') as string[]
        const emotionsIdArr = form.getAll('emotions[]') as string[]

        // Prepare the tags for the Prisma query
        const tagCreateArray = tagsArr?.map((tagInput: string) => ({
            tag: {
                connectOrCreate: {
                    where: { name: tagInput },
                    create: { name: tagInput },
                },
            },
        }))

        // Prepare the  emotions for the Prisma query

        const emotionConnectArray = emotionsIdArr?.map((emotionId) => ({
            emotion: {
                connect: { id: Number(emotionId) },
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

        const { categoryId, ...dream } = dreamInput
        // Create the dream entity
        await prisma.dream.create({
            data: {
                ...dream,
                tags: {
                    create: tagCreateArray,
                },
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

                imageName: imageName,

                emotions: {
                    // connect: emotionConnectArray,
                    create: emotionConnectArray,
                },
            },
        })

        return NextResponse.json(
            {
                message: 'Dream added!',
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        if (newDreamId) {
            await deleteDream(newDreamId, imageName, storageS3)
        }

        if (imageName) {
            await deleteFileFromStorage(
                imageName,
                process.env.S3_BUCKET_NAME_DREAM,
                storageS3
            )
        }

        return new Response('Something went wrong!', {
            status: 404,
        })
    }
}
