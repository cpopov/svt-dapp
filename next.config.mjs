/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'livedataprod.stocksfc.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
// livedataprod.stocksfc.com
