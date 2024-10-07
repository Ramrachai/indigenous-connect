/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },

            {
                protocol: 'https',
                hostname: 'indigenous-connect.s3.ap-south-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
