import request from '@/utils/request'

export default {
  getQualityList(data) {
    return request({
      url: '/monitor/quality/list',
      method: 'post',
      data
    })
  },
  getWaterList(data) {
    return request({
      url: '/monitor/water/list',
      method: 'post',
      data
    })
  },
  getRainList(data) {
    return request({
      url: '/monitor/rain/list',
      method: 'post',
      data
    })
  },
  getVideoList(data) {
    return request({
      url: '/monitor/video/list',
      method: 'post',
      data
    })
  }
}