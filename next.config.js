const path = require('path')
const withVideos = require('next-videos')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./configs/ImageLoader.js",
    formats: ["image/webp"],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

module.exports = withVideos(nextConfig)
