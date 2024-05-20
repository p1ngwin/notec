const withSass = require('@zeit/next-sass');
const i18n = require('./next-i18next.config');

module.exports = withSass({
  pageExtensions: ['ts', 'tsx'],
  cssModules: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['*'],
  },
  compiler: {
    styledComponents: true,
  },
  i18n,
});
