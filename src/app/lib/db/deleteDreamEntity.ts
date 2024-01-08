import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { prisma } from '../clients/prisma'

export async function deleteDream(
    dreamId: string,
    imageName: string | undefined,
    S3Client: S3Client
) {
    try {
        if (dreamId.length > 0) {
            // Cascades

            await prisma.dream.delete({
                where: {
                    id: dreamId,
                },
            })
        }
    } catch (e) {
        throw new Error(e as any)
    }
}
