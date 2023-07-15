const withSass = require("@zeit/next-sass");

module.exports = withSass({
  pageExtensions: ["ts", "tsx"],
  cssModules: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["*"],
  },
  compiler: {
    styledComponents: true,
  },
});
