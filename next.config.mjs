/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/etex',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/etex',
  },
};

export default nextConfig;
