##Available Scripts

In the project directory, you can run:
`npm install`
`npm run build`
`npm start | npm run start`

##关键词

#### `react|redux|react-redux|react-saga`
#### `webpack | webpack-cli | webpack-dev-server | babel`

##学习笔记
+ redux跟props有关系，跟state没关系。
+ 一个route对应的根组件页面才需要redux connect，其他的子级组件用...props传递
+ antd修改主题颜色：
    1. 安装 less less-loader
    2. webpack配置 ：
        ```rules: [{
            test: /\.(less|css)$/,
            use: [{
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
            }
            ]
        }, 
        ...
        ```
        3.新建 index.less文件：
        ```
        @import '~antd/dist/antd.less';
        ```
        4.在 index.js中引入：
        ```
        import "./index.less";
        ```

+ useState | Hook : 使函数组件具有状态管理
+ webpack - resolve - alias :路径别名

        




