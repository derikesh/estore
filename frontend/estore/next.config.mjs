/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
  };
  
  export default nextConfig;