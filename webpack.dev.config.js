module.exports = {
    //增加映射文件，来调试源码
    devtool: 'source-map', //会单独生成一个.js.map文件,会标识出错的行和列
    // devtool: 'eval-source-map',//不会产生单独的文件，但是可以显示行和列
    // devtool: 'cheap-module-source-map',//不会产生列，但是是一个单独的映射文件
    // devtool: 'cheap-module-eval-source-map',//不会生成文件，不显示列
    devServer: {
        port: 3000,
        hot: true,
        progress: true,
        contentBase: './build',
        compress: true,
    }
}
