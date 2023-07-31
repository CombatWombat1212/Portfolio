/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    // loader: "default"
    loader: "custom",
    loaderFile: "./configs/ImageLoader.js",
    formats: ["image/webp"],
  },

  async rewrites() {
    return [
      {
        source: '/Resume',
        destination: '/documents/Sam Giustizia Resume.pdf',
      },
    ]
  },
}

module.exports = withVideos(nextConfig)
