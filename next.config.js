/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
      logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
