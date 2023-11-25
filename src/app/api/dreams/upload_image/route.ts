import { NextResponse, NextRequest } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from '../../../lib/clients/prisma'
import { getToken } from 'next-auth/jwt'
import { generateImageName } from '../../../lib/generateImageName'

export async function POST(request: NextRequest) {
    // try {
    //     const { dreamInput, tags, emotions } = await request.json()
    // await createDreamEntity(dreamInput, tags, emotions)
    // ID and image of the entity - in case of error delete the entity and the image
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

    try {
        const form = await request.formData()

        const imageFile = form.get('image') as File
        const dreamId = form.get('dreamId') as string

        const imageResponse = await prisma.dream.findUnique({
            where: {
                id: dreamId,
            },
            select: {
                image: true,
            },
        })

        if (imageFile) {
            // Get the image name from the database or generate a new one
            const imageName =
                imageResponse?.image || generateImageName(imageFile.type)

            // Convert the image to a buffer
            const imageBlob = new Blob([imageFile])
            const imageArrayBuffer = await imageBlob.arrayBuffer()
            const imageBuffer = Buffer.from(imageArrayBuffer)

            // Upload the image to S3
            await storageS3.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME_DREAM,
                    Key: imageName,
                    // TODO: fix uploading the image
                    Body: imageBuffer,
                })
            )
        } else {
            return new Response('No image file!', {
                status: 404,
            })
        }
    } catch (e) {
        console.log('Error uploading dream image', e)

        return new Response('Something went wrong!', {
            status: 404,
        })
    }

    return NextResponse.json(
        {
            message: 'Image uploaded!',
        },
        {
            status: 200,
        }
    )
}
