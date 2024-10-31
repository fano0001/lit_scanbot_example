/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const packageJson = require('../package.json')

const conf = {
    entry: {main: ['regenerator-runtime/runtime', './src/index.ts']},
    output: {
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 8002,
        client: {
            overlay: true
        },
        static: './public/',
        allowedHosts: 'all',
        historyApiFallback: {
            index: '/'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx|.ts$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(s?)css$/,
                use: [
                    {
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'sass-loader',

                        options: {
                            sassOptions: {
                                outputStyle: 'compressed'
                            },
                            additionalData: `$THEME:${process.env.THEME};`
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'lit-svg-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: {
            app: path.resolve(__dirname, '../src/app/'),
            styles: path.resolve(__dirname, '../src/styles/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './config/_index.html',
            filename: 'index.html',
            csp: '',
            base: '/',
            appConfigJson: false,
            version: packageJson.version,
        })
    ]
}

module.exports = (env, options) => {
    let production = options.mode === 'production'
    conf.devtool = production ? false : 'source-map'

    conf.plugins = [
        ...conf.plugins,
        new CopyWebpackPlugin({
            patterns: [

                {
                    from: './node_modules/scanbot-web-sdk/bundle/bin/document-scanner',
                    to: './public/wasm'
                }
            ]
        })
    ]

    return conf
}
