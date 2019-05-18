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