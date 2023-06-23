/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    loader: "default"
    // loader: "custom",
    // loaderFile: "./configs/ImageLoader.js",
    // formats: ["image/webp"],
  },

}

module.exports = withVideos(nextConfig)
