/*eslint-disable no-var */

var webpack = require('webpack'),
    path = require('path'),
    WebpackAssetsManifest = require('webpack-assets-manifest'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath('css/[name].css');
        },
        allChunks: true
    }),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env) {
    return {
        entry: {
            'main': './src/index.jsx'
        },
        output: {
            path: path.join( __dirname, 'build', 'production' ),
            filename: '[name].js',
            pathinfo: false
        },
        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.svg$/,
                    use: "file-loader?name=[name].[ext]&publicPath=/svg/&outputPath=svg/"
                },
                {
                    test: /\.(png|jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                    use: "file-loader?name=[name].[ext]&publicPath=/fonts/&outputPath=fonts/"
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }]
                    })
                },
            ]
        },
        plugins: [
            new WebpackAssetsManifest({
                output: 'asset-manifest.json'
            }),
            extractCSS,
            new UglifyJsPlugin({
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            })
        ]
    }
};
