const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    //where react is getting is elements to load into the DOM
    entry: "./Components/index.jsx", 
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ["babel-loader", "eslint-loader"]
            },
            //{
            //    test: /\.css$/,
            //    use: [MiniCssExtractPlugin.loader, "css-loader"]
            //},
            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: 'style-loader'
                }, {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                }, {
                    // Run postcss actions
                    loader: 'postcss-loader',
                    options: {
                        // `postcssOptions` is needed for postcss 8.x;
                        // if you use postcss 7.x skip the key
                        postcssOptions: {
                            // postcss plugins, can be exported to postcss.config.js
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "wwwroot/js"),
        publicPath: "js/",
        filename: "bundle.js" //todo: figure this out
    },
    plugins: [
        new CleanWebpackPlugin(),
        //new MiniCssExtractPlugin({
        //    filename: "css/bundle.css" 
        //}),
        new ESLintPlugin({ 
            extensions: [".js", ".jsx"] 
        })
    ]
};