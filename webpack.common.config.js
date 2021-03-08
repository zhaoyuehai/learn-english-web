let productionConfig = require('./webpack.prod.config')
let developmentConfig = require('./webpack.dev.config')
let {merge} = require('webpack-merge')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let path = require('path')

let generateConfig = env => {
    let fileLoader = env === 'production'
        ? [{
            loader: 'file-loader',
            options: {
                name: '[name]-[hash:5].[ext]',
                outputPath: 'assets/images/'
            }
        }]
        : [{
            loader: 'url-loader',
            options: {
                name: '[name]-[hash:5].[ext]',
                limit: 1000,
                outputPath: 'assets/images/'
            }
        }]
    let styleLoader = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }
    },
        {
            loader: 'css-loader',
        },
        {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#199475',
                        'link-color': '#199475',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                }
            }
        },
    ]
    let scriptLoader = [
        {
            loader: 'babel-loader',//Babel是一个JS编译器，适配新的ES语法
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        }
    ]
    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'assets': path.resolve(__dirname, 'assets')
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: scriptLoader
                },
                {
                    test: /\.(less|css)$/,
                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg)$/,
                    use: fileLoader
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/template.html',
                filename: 'index.html',
                favicon: './favicon.ico',
                title: 'index',
                hash: true,
                minify: {
                    removeAttributeQuotes: true,
                    //删除注释
                    removeComments: true,
                    //删除空格
                    collapseWhitespace: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].css',
                ignoreOrder: true
            })
        ]
    }
}

module.exports = env => merge([generateConfig(env), env === 'production' ? productionConfig : developmentConfig])
