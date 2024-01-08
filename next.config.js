/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "dreamz-dream-data.s3.eu-central-1.amazonaws.com",
                protocol: 'https',
            },
            {
                hostname: 'images.unsplash.com',
                protocol: 'https',
            },
            {
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https',
            },
            {
                hostname: 'lh3.googleusercontent.com',
                protocol: 'https',
            },
            


        ]
    },
}

module.exports = nextConfig
