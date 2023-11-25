import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from '../clients/prisma'

export async function deleteDreamEntity(
    entityId: string,
    imageName: string | undefined,
    S3Client: S3Client
) {
    try {
        if (entityId.length > 0) {
            // Cascades
            await prisma.entity.delete({
                where: {
                    entityId,
                },
            })

            // await prisma.dream.delete({
            //     where: {
            //         id: entityId,
            //     },
            // })
        }
    } catch (e) {
        throw new Error(e as any)
    }
}
