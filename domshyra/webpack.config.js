const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const jquery = require('jquery');

module.exports = {
    //where react is getting is elements to load into the DOM
    entry: {
        main: './Components/main.jsx',
        radio: './Components/radio.jsx',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(scss)$/,
                use: [
                    // inject CSS to page
                    { loader: 'style-loader' },
                    // translates CSS into CommonJS modules
                    { loader: 'css-loader' },

                    // Run postcss actions
                    {
                        loader: 'postcss-loader',
                        options: {
                            // `postcssOptions` is needed for postcss 8.x;
                            postcssOptions: {
                                // postcss plugins, can be exported to postcss.config.js
                                plugins: function () {
                                    return [ require('autoprefixer') ];
                                }
                            }
                        }
                    },
                    // compiles Sass to CSS
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "wwwroot/js"),
        publicPath: "js/",
        filename: "[name].bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: jquery,
            jQuery: jquery,
            jquery: jquery
        }),
        new ESLintPlugin({ 
            extensions: [".js", ".jsx"] 
        })
    ]
};