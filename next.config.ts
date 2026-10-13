import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    cacheComponents: true,
    images: {
        unoptimized: false,

        // allowed formats
        formats: ['image/avif', 'image/webp'],

        // cached images ttl
        minimumCacheTTL: 31536000,

        // images for others size
        deviceSizes: [
            320, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840,
        ],

        // images for others size(icons and etc)
        imageSizes: [12, 16, 24, 32, 48, 64, 96, 128, 256, 512],
        // localPatterns: [
        //     {
        //         pathname: '/assets/avatars/**'
        //     }
        // ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
