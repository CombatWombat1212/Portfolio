/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./configs/ImageLoader.js",
    formats: ["image/webp"],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/Home",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },

}

module.exports = withVideos(nextConfig)
