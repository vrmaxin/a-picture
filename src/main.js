import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App.vue'

import './styles/global.scss' // 全局的样式文件

import '@/mock/index.js'; // 使用mockjs模拟

import _ from 'lodash' // 引入loadsh

// 引入Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 引入VueKonva
import VueKonva from 'vue-konva'
Vue.use(VueKonva)


new Vue({
  render: h => h(App),
}).$mount('#app')