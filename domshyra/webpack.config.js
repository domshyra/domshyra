const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    //entry: "./src/index.js", //react style
    entry: "./wwwroot/src/index.jsx", //ms style //where react is getting is elemetns to load into the DOM
    module: {
        rules: [
            //react source                 use: ["babel-loader", "eslint-loader"],
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",

                options: { presets: ["@babel/env"] }
            },
            //react source
            //{
            //    test: /\.css$/,
            //    use: ["style-loader", "css-loader"] // I think this i old
            //},
            //ms source
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            //ms source
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

               //TODO: add sass stuff here
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts"] },
    output: {
        path: path.resolve(__dirname, "wwwroot/dist"),
        publicPath: "/",
        filename: "bundle.js" //react style

    },
//TODO: might need to change the port #
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./wwwroot/dist/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css" 
        }),
        new ESLintPlugin({ 
            extensions: [".js", ".jsx", ".ts"] 
        })
    ]
};