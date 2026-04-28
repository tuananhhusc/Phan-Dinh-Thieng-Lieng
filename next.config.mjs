/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Phan-Dinh-Thieng-Lieng' : '',
  assetPrefix: isProd ? '/Phan-Dinh-Thieng-Lieng/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
