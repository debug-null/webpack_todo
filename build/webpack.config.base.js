const path = require("path");
const isDev = process.env.NODE_ENV === "development";

const config = {
  target: "web",
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    filename: "bundle[hash:8].js",
    path: path.join(__dirname, "../dist")
  },
  resolve: {
    alias: {
      "@": path.join("../", "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader" //处理jsx文件
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: __dirname + "src",
        options: {
          presets: ["env"]
        }
      },

      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader", //将图片转为base64直接写在js文件
            options: {
              limit: 1024, // 文件小于1024就转为base64，写在js文件
              name: "resources/[path][name].file.[ext]" //输出的文件名
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
