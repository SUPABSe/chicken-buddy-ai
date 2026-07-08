/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site: no server, no API routes, no backend.
  // `npm run build` produces ./out — host it anywhere (Netlify, Cloudflare
  // Pages, GitHub Pages, Vercel static) for free.
  output: "export",
};
export default nextConfig;
