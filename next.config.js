/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
