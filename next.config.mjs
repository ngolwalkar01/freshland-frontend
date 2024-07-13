/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_API_DOMAIN,
            },
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_API_DOMAIN,
            }
        ],
    },
};
export default nextConfig;
