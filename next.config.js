/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['scontent-los2-1.cdninstagram.com','lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
