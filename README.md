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