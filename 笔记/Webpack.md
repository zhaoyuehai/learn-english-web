# Webpack

```
HMR | resolve | optimization | dll | webpack5 | production | development | eslint | babel | pwa | loader | plugin | devtool | 性能优化 | tree-shaking | code-split | 
caching | lazy-loading | library | shimming
```

- 概念：

  - 本质上，webpack是一个js应用程序的静态模块打包器【module bundler】。
  - 当webpack处理应用程序时，它会递归地构建一个依赖关系图【dependency graph】,包含了应用程序中需要的每个模块，然后将所有这些模块打包成一个或多个bundle。
  - 核心概念：
    - **入口 entry**
    - **输出 output**
    - **loader**
    - **插件 plugins**

- ```javascript
  const path = require('path')
  
  module.exports = {
      //模式
      mode: 'production',
  	//入口起点
      entry: './src/index.js',
      //输出
  	output: {
      	filename: 'bundle.[hash:8].js', //打包后的文件名
          path: path.resolve(__dirname, 'dist'),//__dirname是nodejs的变量，代表当前文件的目录绝对路径。
  	},
      //loader配置
      module: {
          rules:[
              {
                  //匹配哪些文件
                  test: /\.css$/,
                  //使用哪些loader进行处理
               	user: [//use数组中的loader执行顺序：从右到左【从下到上】依次执行
                      //创建<style>标签，将js中的样式资源插入进去，添加到<head>中生效
               		'style-loader',
                      //将css文件变成commonjs模块加载到js中，里面内容是样式字符串
               		'css-loader'
               	]
                  //总结：打包时执行css-loader，将.css文件以字符串形式加入到js中，然后当页面打开时，通过style-loader创建<style>标签，添加到<head>中。
                  //style-loader是将css-loader打包号的css代码，通过一个JS脚本创建一个<style>标签的形式插入到html文件中。
      		},
              { test: /\.json$/, use: 'json-loader'}
          ]
      },
      //插件
      plugins: [
          new HtmlWebpackPlugin({
              template: './src/template.html',
          })
      ]
  }
  ```

- 入口起点【entry point】
  - 指示webpack应该使用哪个模块作为其内部依赖的开始，去分析构建内部依赖图。
  - 配置entry属性，来指定一个或多个入口起点。默认：./src
- 出口【output】
  - 告诉webpack在哪里输出它所创建的bundles。以及如何命名这些文件，默认：./dist
  - 基本上整个应用程序结构都会被编译到你指定的路径下。
- loader
  - loader让webpack能够去处理那些非JavaScript文件（webpack自身只理解JavaScript）。
  - test属性：标识出应该被指定的loader进行转换的某个或者某些文件
  - use属性：转换是使用哪个loader
  - 在webpack配置中定义loader时，要定义在`module.rules`中。
- 插件【plugins】
  - loader被用于转换某些类型的模块，而插件可以用于执行范围更广的任务。
  - 插件范围包括，打包优化和压缩，重新定义环境中的变量等等
  - 使用一个插件，只需要`require()`它，然后把它添加到`plugins`数组中。多数插件可以通过选项option自定义。
  - 如果在一个配置文件中因不同目的多次使用同一个插件时，需要使用new操作符来创建它的一个实例。
- 模式【Mode】
  - 通过设置mode参数`development`或者`production`。
  - 将`process.env.NODE_EV`值设置为`development` 开发模式，启用插件NamedChunksPlugin和NamedModulesPlugin
  - 将`process.env.NODE_EV`值设置为`production` 生产模式，启用插件FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin和UglifyJsPlugin。
- ：
  - webpack能处理js/json资源，不能处理css/img等其他资源
  - 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
  - 生产环境相比开发环境多了一个压缩js代码
- webpack的配置文件：webpack.config.js



