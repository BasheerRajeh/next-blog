/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
}

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
module.exports = nextConfig
