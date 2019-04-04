import request from '@/utils/request'

export default {
  getBasicList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  },
  getProjectList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  },
  getMonitorList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  },
  getVideoList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  }
}