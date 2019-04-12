import request from '@/utils/request'

export default {
  getBasicList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  },
  getBasicRiverList(data) {
    return request({
      url: '/job/basic/river/list',
      method: 'post',
      data
    })
  },
  getProjectList(data) {
    return request({
      url: '/job/project/list',
      method: 'post',
      data
    })
  },
  getMonitorList(data) {
    return request({
      url: '/job/monitor/list',
      method: 'post',
      data
    })
  },
  getVideoList(data) {
    return request({
      url: '/job/video/list',
      method: 'post',
      data
    })
  },
  getPublicityList(data) {
    return request({
      url: '/job/publicity/list',
      method: 'post',
      data
    })
  }
}