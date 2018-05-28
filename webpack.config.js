const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const config = require('./serviceConfig')

const demoPath = path.join(__dirname, './demo')
const distPath = path.join(__dirname, './dist')

const webpackConfig = {
    entry: {
        app: [path.join(demoPath, './kss.js')],
        test: [path.join(demoPath, './test.js')]
    },
    output: {
        path: distPath,
        publicPath: './'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'demo')
                ],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
         new HtmlWebpackPlugin(
             {
                 template: path.join(demoPath, './index.html'),
                 filename: 'index.html',
                 inject: 'body',
                 chunks: ['app', 'test']
             }
         ),
         new CopyWebpackPlugin(
            [
              {
                from: path.join(__dirname, './demo/assets'),
                to: path.join(__dirname, `./dist/assets`)
              }
            ]
          )
    ]
}

module.exports = webpackConfig