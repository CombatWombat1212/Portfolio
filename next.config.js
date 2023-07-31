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

  async redirects() {
    return [
      {
        source: '/Explorations/:slug*',
        destination: '/Explorations',
        permanent: false,
      },
    ]
  },
}

module.exports = withVideos(nextConfig)
