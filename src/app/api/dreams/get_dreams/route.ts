import { prisma } from '../../../lib/clients/prisma'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { S3ClientDreamz } from '../../../lib/clients/s3'
import { TDreamWithImageUrl } from '../../../types/types'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const userId = searchParams.get('userId') || undefined
        const sortBy = searchParams.get('sortBy') || 'createdAt'
        const sortByDir = searchParams.get('sortByDir') || 'desc'

        const category = Number(searchParams.get('category')) || undefined

        const search = searchParams.get('search') || ''
        const limit = searchParams.get('limit') || 10
        const page = Number(searchParams.get('page')) || 1
        const skip = (Number(page) - 1) * Number(limit)

        const tagsArr = searchParams.getAll('tags[]')

        let nextPage: number | null = page + 1
        let tags: string[] | undefined = undefined

        const tagQuery =
            tagsArr.length > 0
                ? {
                      some: {
                          tag: {
                              name: {
                                  in: tags,
                              },
                          },
                      },
                  }
                : undefined

        let emotions: number[] | undefined = undefined

        const emotionsArr = searchParams
            .getAll('emotions[]')
            .map((emt) => Number(emt))

        const emotionsQuery =
            emotionsArr.length > 0
                ? {
                      some: {
                          emotionId: {
                              in: emotions,
                          },
                      },
                  }
                : undefined

        const dreams: TDreamWithImageUrl[] = await prisma.dream.findMany({
            where: {
                user: {
                    NOT: {
                        emailVerified: null || undefined,
                    },
                    id: userId,
                },
                tags: tagQuery,

                category: {
                    id: {
                        equals: category,
                    },
                },
                emotions: emotionsQuery,

                AND: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    // {
                    //     story: {
                    //         contains: search,
                    //     },
                    // },
                ],
            },

            orderBy: {
                [sortBy]: sortByDir,
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

            skip,
            take: Number(limit),
        })

        if (dreams.length < Number(limit)) {
            nextPage = null
        }

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
                nextPage: nextPage,
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
