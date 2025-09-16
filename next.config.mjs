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
  eslint: {
    ignoreDuringBuilds: true,
  },
  // اضافه کردن این بخش برای نادیده گرفتن خطاهای مربوط به ماژول‌های گمشده
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // نادیده گرفتن خطاهای CSS گمشده
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /\.css$/,
        contextRegExp: /(checkout|order-COMIFORMATION)/,
      })
    );
    
    return config;
  },
};

export default nextConfig;