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

// 工程设施
Mock.mock(/\/job\/basic\/list/, 'post', jobAPI.getBasicList)
Mock.mock(/\/job\/basic\/river\/list/, 'post', jobAPI.getBasicRiverList)
Mock.mock(/\/job\/project\/list/, 'post', jobAPI.getProjectList)
Mock.mock(/\/job\/monitor\/list/, 'post', jobAPI.getMonitorList)
Mock.mock(/\/job\/video\/list/, 'post', jobAPI.getVideoList)
Mock.mock(/\/job\/publicity\/list/, 'post', jobAPI.getPublicityList)

// 监测监控
Mock.mock(/\/monitor\/quality\/list/, 'post', monitorAPI.getQualityList)
Mock.mock(/\/monitor\/water\/list/, 'post', monitorAPI.getWaterList)
Mock.mock(/\/monitor\/rain\/list/, 'post', monitorAPI.getRainList)
Mock.mock(/\/monitor\/video\/list/, 'post', monitorAPI.getVideoList)

// 搜索相关
Mock.mock(/\/special\/user/, 'get', specialAPI.getList)

// 统计分析
Mock.mock(/\/statistics\/patrol\/list/, 'post', statisticsAPI.getPatrolList)
Mock.mock(/\/statistics\/problem\/list/, 'post', statisticsAPI.getProblemList)

export default Mock