/* eslint-disable no-empty-pattern */
/* eslint-disable no-debugger */
import {
  param2Obj
} from '@/utils'

export default {
  getList: config => {
    const {} = param2Obj(config.url)
    return [{
        id: '1',
        name: 'A河',
        lnglatList: [
          '114.372480,23.089840',
          '114.408190,23.094580',
          '114.419520,23.043400'
        ]
      },
      {
        id: '2',
        name: 'B河',
        lnglatList: [
          '114.347760,23.043400',
          '114.408870,23.038350',
          '114.481320,23.041830'
        ]
      }
    ]
  }
}