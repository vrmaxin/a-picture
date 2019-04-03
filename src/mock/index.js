import Mock from 'mockjs'
import jobAPI from './job'
import monitorAPI from './monitor'
import specialAPI from './special'
import statisticsAPI from './statistics'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/job\/basic\/list/, 'post', jobAPI.getList)

// 文章相关
Mock.mock(/\/monitor\/list/, 'get', monitorAPI.getList)

// 搜索相关
Mock.mock(/\/special\/user/, 'get', specialAPI.getList)

// 账单相关
Mock.mock(/\/statistics\/list/, 'get', statisticsAPI.getList)

export default Mock