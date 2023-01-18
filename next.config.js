/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


    images: {
      loader: 'custom',
      loaderFile: './configs/ImageLoader.js',
      formats: ['image/webp'],
    },
}




module.exports = nextConfig
