import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div');
document.body.appendChild(root);


new Vue({
  render: (h) => h(App),
}).$mount(root)

// render: 字符串模板的替代方案，该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
// $mount: 显式调用，开启编译，相当于直接在html文件中的vue的 el挂载目标