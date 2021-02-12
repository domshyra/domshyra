const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    //entry: "./src/index.js", //react style
    entry: "./src/index.jsx", //ms style //where react is getting is elemetns to load into the DOM
    mode: "development",
    module: {
        rules: [
            //react source
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
        path: path.resolve(__dirname, "wwwroot"),
        publicPath: "/",
        //filename: "bundle.js" //react style
        filename: "[name].[chunkhash].js"
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
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        }),
        new ESLintPlugin(
            options: {
            extensions: [".js", ".jsx", ".ts"]
        })
    ]
};