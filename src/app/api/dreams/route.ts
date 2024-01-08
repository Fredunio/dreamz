import { NextRequest } from 'next/server'
import { prisma } from '../../lib/clients/prisma'
import { TDreamWithImageUrl } from '../../types/types'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3ClientDreamz } from '../../lib/clients/s3'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId') || undefined
        const dreamId = searchParams.get('id') || undefined

        const dreams: TDreamWithImageUrl[] = await prisma.dream.findMany({
            where: {
                user: {
                    NOT: {
                        emailVerified: null || undefined,
                    },
                    id: userId,
                },
                id: dreamId,
            },
            include: {
                tags: {
                    select: {
                        tag: true,
                    },
                },
                category: true,
                emotions: {
                    select: {
                        emotion: true,
                    },
                },
                user: {
                    select: {
                        image: true,
                        name: true,
                    },
                },
            },
        })

        for (const dream of dreams) {
            if (!dream.imageName) continue
            const command = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME_DREAM,
                Key: dream.imageName,
            })
            const url = await getSignedUrl(S3ClientDreamz, command, {
                expiresIn: 60 * 60 * 24 * 7,
            })
            dream.imageUrl = url
        }

        return Response.json(
            {
                dreams,
                message: 'Dreams fetched successfully',
                // nextPage: nextPage,
            },
            { status: 200 }
        )
    } catch (err) {
        return Response.json(
            { dreams: [], message: 'Something went wrong' },
            { status: 500 }
        )
    }
}
