let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let path = require('path')

module.exports = {
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
