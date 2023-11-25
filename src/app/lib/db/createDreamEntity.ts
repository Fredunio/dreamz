import { prisma } from '../clients/prisma'
import { TDreamInput, TEmotionInput, TTagInput } from '../../types/types'
import { deleteDreamEntity } from './deleteDreamEntity'
import { S3ClientDreamz } from '../clients/s3'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export async function createDreamEntity({
    S3Client,
    dreamInput,
    tags,
    emotions,
}: {
    S3Client: S3Client
    dreamInput: TDreamInput
    tags?: TTagInput[]
    emotions?: TEmotionInput[]
}) {
    // ID and image of the entity - in case of error delete the entity and the image
    let newEntityId = ''
    let imageName = ''

    try {
        // Create the entity
        const newEntity = await prisma.entity.create({
            data: {
                type: 'dream',
            },
        })

        // Store the ID of the created entity
        newEntityId = newEntity.entityId

        // Prepare the tags and emotions for the Prisma query
        const tagCreateArray = tags?.map((tagInput) => ({
            tag: {
                connectOrCreate: {
                    where: { name: tagInput },
                    create: { name: tagInput },
                },
            },
        }))

        const emotionConnectArray = emotions?.map((emotionInput) => ({
            emotionId_dreamId: {
                dreamId: newEntityId,
                emotionId: emotionInput,
            },
        }))

        // upload image to backblaze s3 bucket
        if (dreamInput.image) {
            imageName = crypto.randomUUID()

            // Upload the image to S3
            const frontImage = await S3ClientDreamz.send(
                new PutObjectCommand({
                    Bucket: dreamDataBucket,
                    Key: imageName,
                    Body: dreamInput.image,
                })
            )
        }

        // Create the dream entity
        prisma.entity.create({
            data: {
                type: 'dream',
                tags: {
                    create: tagCreateArray,
                },

                dreams: {
                    create: {
                        ...dreamInput,
                        image: imageName || undefined,

                        emotions: {
                            connect: emotionConnectArray,
                        },
                    },
                },
            },
        })
    } catch (e) {
        if (newEntityId) {
            await deleteDreamEntity(newEntityId, imageName, S3Client)
        }
        throw new Error(e as any)
    }
}
