/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = {
  reactStrictMode: false,
  env: {
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
};

module.exports = withInterceptStdout(nextConfig, (text) =>
  text.includes('Duplicate atom key') ? '' : text,
);
