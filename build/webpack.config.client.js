const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin') // 可以简化HTML文件的创建，为您的webpack捆绑服务提供服务。
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack的配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8001,
  host: '127.0.0.1', // 设置为 0.0.0.0 局域网和内网IP和localhost都能访问
  overlay: {
    errors: true // 编译有错误直接显示在页面上
  },
  open: true, // 自动打开浏览器
  hot: true // 热更新，修改代码后，不刷新页面
}

const defaultPlugins = [
  new VueLoaderPlugin(),
  new HTMLPlugin(),
  new webpack.DefinePlugin({
    // 它维护一个全局的配置文件，在编译期间会自动检测process.env.NODE_ENV，根据当前的环境变量去替换我们的文件，比如接口域名。
    'proccess.env': {
      NODE_ENV: isDev ? '"development"' : '"production'
    }
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true // 若其他loader已经生成了map，就直接使用，提高编译速度
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([new ExtractTextPlugin('styles.[chunkhash:8].css')])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index.js'),
      vendor: ['vue'] // 按需加载，用到那个模块就填写那个
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
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
      ]
    },
    plugins: defaultPlugins.concat([new ExtractTextPlugin('styles.[chunkhash:8].css')]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor', // 这里的vendor和entry里定义的名字一致，可自行更换
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    }
  })
}

module.exports = config
