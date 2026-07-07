import type { NextConfig } from "next";

// Deployed as a GitHub Pages project site at /biology-app.
// `output: "export"` produces a fully static site in `out/` (the app is
// entirely client-side, so no server runtime is needed).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/biology-app";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? repoBasePath : undefined,
  assetPrefix: isGithubPages ? repoBasePath : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
