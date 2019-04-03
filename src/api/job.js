import request from '@/utils/request'

export default {
  getBasicList(data) {
    return request({
      url: '/job/basic/list',
      method: 'post',
      data
    })
  }
}