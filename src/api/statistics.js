import request from '@/utils/request'

export default {
  getPatrolList(data) {
    return request({
      url: '/statistics/patrol/list',
      method: 'post',
      data
    })
  },
  getProblemList(data) {
    return request({
      url: '/statistics/problem/list',
      method: 'post',
      data
    })
  }
}