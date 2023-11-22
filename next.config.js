/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
};

module.exports = nextConfig;
