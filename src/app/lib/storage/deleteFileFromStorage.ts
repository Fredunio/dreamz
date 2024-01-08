import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

export async function deleteFileFromStorage(
    fileame: string,
    bucketName: string,
    S3Client: S3Client
) {
    try {
        await S3Client.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: fileame,
            })
        )
    } catch (e) {
        throw new Error(e as any)
    }
}
