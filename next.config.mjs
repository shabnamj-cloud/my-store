/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.openai.com",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // حذف بخش rewrites زیرا در production کار نمی‌کند
  eslint: {
    // برای جلوگیری از خطاهای ESLint در build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;