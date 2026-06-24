/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Note: If deploying to GitHub Pages as a project site (e.g., https://username.github.io/repo-name),
  // you may need to add basePath: '/repo-name' and assetPrefix: '/repo-name/' here.
  // Since we are creating a clean standalone bundle, we export with default relative paths
  // and detail custom configurations in the README.
};

export default nextConfig;
