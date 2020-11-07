const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            { // Load react (js|jsx)
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use: ['babel-loader']
            },
            { // Load images
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img'
                        }
                    }
                ]
            },
            { // Load fonts (woff, woff2, ttf, eot, svg)
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            { // Load css or sass
                test: /\.(scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
           }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new CleanWebpackPlugin(),
    ],
    mode: 'development'
}