import { S3Client } from '@aws-sdk/client-s3'

if (
    !process.env.S3_REGION ||
    !process.env.S3_ACCESS_KEY_ID ||
    !process.env.S3_SECRET_ACCESS_KEY
) {
    throw new Error('S3 credentials not found')
}

export const S3ClientDreamz = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
})
