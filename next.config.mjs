/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push(
      'pino-pretty' /* add any other modules that might be causing the error */
    )
    return config
  },
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
