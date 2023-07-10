const path = require("path")

module.exports = {
    async rewrites() {
        return [
            // Rewrite everything else to use `pages/index`
            {
                source: '/:path*',
                destination: '/',
                sassOptions: {
                    includePaths: [path.join(__dirname, 'style')],
                },
            },
        ];
    },
};