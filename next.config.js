/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'mzjckmyifryhxrmswbdc.supabase.co',
    ]
    //pathname: '/storage/v1/object/public/**',
  }
}

module.exports = nextConfig
