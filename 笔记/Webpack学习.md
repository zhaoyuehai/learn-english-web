# Webpack

- 概念：
  - 本质上，webpack是一个js应用程序的静态模块打包器【module bundler】。
  - 当webpack处理应用程序时，它会递归地构建一个依赖关系图【dependency graph】,包含了应用程序中需要的每个模块，然后将所有这些模块打包成一个或多个bundle。
  - 四个核心概念：
    - **入口 entry**
    - **输出 output**
    - **loader**
    - **插件 plugins**
  - 