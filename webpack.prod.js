const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.png$/i,
                type: 'asset/resource',
                use: [{
                    loader: 'image-webpack-loader',
                    options: {
                        pngquant: {
                            quality: [.90, .95],
                        },
                    }
                }],
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'images/[name]-[hash][ext]',
                },
            },
        ],
    },
});