const path = require('path');
const withVideos = require('next-videos');

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

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };

    return config;
  },
};

module.exports = withVideos(nextConfig);
