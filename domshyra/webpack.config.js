const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: "./Components/index.jsx", //where react is getting is elements to load into the DOM
    devtool: 'source-map',
    module: {
        rules: [
            //might need to have 'use: ["babel-loader", "eslint-loader"],' included but dunno yet
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",

                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            //TODO: add sass stuff here
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
        new MiniCssExtractPlugin({
            filename: "css/bundle.css" 
        }),
        new ESLintPlugin({ 
            extensions: [".js", ".jsx"] 
        })
    ]
};