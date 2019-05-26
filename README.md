### 前端的价值
*   搭建前端工程化
*   网络优化
*   API定制
*   nodejs层

### 注意点
* 在命令行中直接使用某个模块的cli模式运行，调用的是该模块全局的版本，所以，一般从package.json文件中启动
* 新版vue-loader需要安装 VueLoaderPlugin 插件，可查看官网


### GIT 提交历史-对应信息

## webpack配置项目加载各种静态自由及css预处理器
* loader的处理方式是逐级往上处理，比如：stylus loader 将styl文件转成css-》再通过 css loader|style-loader去处理

### webpack-dev-service 的配置和使用
* 无需建立html文件，可直接通过html-webpack-plugin' 简化html的创建
* 增加虚拟服务打开html
* 增加热更新


### VUE2的核心技术知识介绍
* template本质还是render方法

### 配置vue的jsx写法以及postcss

### 实现todo的界面
* 安装Babel-loader时提示 ENOENT: no such file or directory, rename 'F:\webpack打z造todo\node_modules\.staging\is-extendable-e20dea61\README.md'
> 解决方案： 删除package-lock.json文件，重新安装

* babel-loader  
> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解
JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack的打包能力，对它们进行处理。

* babel-loader
> babel-core的作用在于提供一系列api。这便是说，当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api，因此也必须安装babel-core：

* babel-preset-env
> babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理 

* 解析jsx文件还需要安装下面的依赖
> //npm i babel-preset-env@1.6.1 babel-plugin-transform-vue-jsx@3.5.0
> //npm i babel-helper-vue-jsx-merge-props@^2.0.0 babel-plugin-syntax-jsx@^6.8.0

### 实现业务逻辑
* findIndex 返回传入一个测试条件或函数中符合条件的数组的第一个元素位置，很类似some

### webpack配置css单独分离打包
* 安装 extract-text-webpack-plugin  该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象 [https://www.npmjs.com/package/extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)
* 执行后报错： DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
  > 问题原因： extract-text-webpack-plugin目前版本不支持webpack4。
  > 解决方案:  使用extract-text-webpack-plugin的最新的beta版  npm install extract-text-webpack-plugin@next
* 打包时报错： Path variable [contentHash:8] not implemented in this context: styles.[contentHash:8].css
  > 解决方案： 不使用cotentHash，改为chunkHash

### webpack区分打包类库代码及hash优化- [利用浏览器的缓存机制，减少服务器压力,合理使用缓存]
* 使用new webpack.optimize.CommonsChunkPlugin时报错：Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
  >解决方案： 
  ```
    config.optimization = {
      splitChunks: {
        cacheGroups: {
            commons: {
                name: "vendor",
                chunks: "initial",
                minChunks: 2
            }
        }
      }
    }
  ``` 
* hash和chunkhash和contenthash的区别
  > hash: hash是跟整个项目的构建相关，构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的hash都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。
  > 如果出口是hash，那么一旦针对项目中任何一个文件的修改，都会构建整个项目，重新获取hash值，缓存的目的将失效

  > chunkhash: 采用hash计算的话，每一次构建后生成的hash值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要另一种hash值计算方法，即chunkhash。
  > chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成hash值，那么只要我们不改动公共库的代码，就可以保证其hash值不会受影响。
  > 由于采用chunkhash，所以项目主入口文件main.js及其对应的依赖文件main.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建时只要文件内容没有更改就不会重复构建。

  >contenthash: contenthash表示由文件内容产生的hash值，内容不同产生的contenthash值也不一样。在项目中，通常做法是把项目中css都抽离出对应的css文件来加以引用。

### 课程寄语
* 学习VUE重点不是API和指令，而是过程
* 眼界放宽，有点耐心，学习过程中确实会有很多报错，一大半的报错是因为版本不同的原因，所以一定要多点耐心，多看看文档