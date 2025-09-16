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
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // نادیده گرفتن خطاهای مربوط به ماژول‌های گمشده
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // نادیده گرفتن ماژول‌های خاص که پیدا نمی‌شوند
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^\.\.\/\.\.\/models\//,
        contextRegExp: /app\/api\//,
      }),
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^\/models\//,
        contextRegExp: /app\/api\//,
      }),
      new (require('webpack').IgnorePlugin)({
        resourceRegExp: /^stripe$/,
      })
    );
    
    return config;
  },
};

export default nextConfig;