/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['it'],
    defaultLocale: 'it',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'work.tagagency.it',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    }
    return config
  }
}

module.exports = nextConfig