const path = require("path")

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin') //可以简化HTML文件的创建，为您的webpack捆绑服务提供服务。
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'

const config =  {
  target: 'web', 
  entry: path.join(__dirname, 'src/index.js'),
  output:{
    filename: 'bundle[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'                  //处理jsx文件
      },
       // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', //将图片转为base64直接写在js文件
            options: {
              limit: 1024, // 文件小于1024就转为base64，写在js文件
              name: '[name].file.[ext]' //输出的文件名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new webpack.DefinePlugin({  //它维护一个全局的配置文件，在编译期间会自动检测process.env.NODE_ENV，根据当前的环境变量去替换我们的文件，比如接口域名。
      'proccess.env':{
        NODE_ENV: isDev ? '"development"':'"production'
      }
    })
  ]
}

if( isDev ){
  //方便调式，有多个形式
  // config.devTool = '#cheap-module-eval-source-map',
  // webpack 2 后才有的
  config.devServer = {
    port: 8001,
    host: '127.0.0.1', //设置为 0.0.0.0 局域网和内网IP和localhost都能访问 
    overlay: {
      errors: true, //编译有错误直接显示在页面上
    },
    open: true, //自动打开浏览器
    hot: true //热更新，修改代码后，不刷新页面
  } 

  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true, //若其他loader已经生成了map，就直接使用，提高编译速度
          }
        },
        'stylus-loader'
      ]
    }
  )

}else{

  config.output.filename = '[name].[chunkhash:8].js'  //chunkhash只能用在生产环境

  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )

  config.plugins.push(
    new ExtractTextPlugin("styles.[chunkhash:8].css")
  )
}


module.exports = config