module.exports = {
    webpack5: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        BACKEND: process.env.BACKEND,
    },
    images: {
        disableStaticImages: true,
    },
    webpack: (config, options) => {
        const { isServer } = options
        config.module.rules.push({
            test: /\.(wav|mp3|ogg|mpe?g|png|jpe?g|gif|svg)$/i,
            exclude: config.exclude,
            use: [
                {
                    loader: require.resolve('file-loader'),
                    options: {
                        limit: 10000,
                        fallback: require.resolve('url-loader'),
                        publicPath: `/_next/static/images/`,
                        outputPath: `/${isServer ? '../' : ''}static/images/`,
                        name: '[name]-[hash].[ext]',
                        esModule: config.esModule || false,
                    },
                },
            ],
        })
        return config
    },
}
