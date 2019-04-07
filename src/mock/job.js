/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-debugger */

var basicData = [{
  id: '1',
  name: '流域',
  type: '1',
  lnglatList: [
    '114.379690,23.098920',
    '114.356860,23.088500',
    '114.343470,23.079100',
    '114.346050,23.068600',
    '114.358150,23.056670',
    '114.375660,23.064410'
  ]
}, {
  id: '2',
  name: 'A河',
  type: '2',
  master: {
    name: '谢某新',
    tel: '1331233122'
  },
  lnglatList: [
    '114.372480,23.089840',
    '114.408190,23.094580',
    '114.419520,23.043400'
  ]
}, {
  id: '3',
  name: 'B河',
  type: '2',
  master: {
    name: '陈某良',
    tel: '13212312211'
  },
  lnglatList: [
    '114.347760,23.043400',
    '114.408870,23.038350',
    '114.481320,23.041830'
  ]
}, {
  id: '4',
  name: 'A湖',
  type: '3',
  lnglatList: [
    '114.372480,23.089840',
    '114.408190,23.094580',
    '114.419520,23.043400'
  ]
}, {
  id: '5',
  name: 'B湖',
  type: '3',
  lnglatList: [
    '114.347760,23.043400',
    '114.408870,23.038350',
    '114.481320,23.041830'
  ]
}, {
  id: '6',
  name: 'A红线',
  type: '4',
  lnglatList: [
    '114.372220,23.076800',
    '114.370350,23.077940',
    '114.368050,23.078230',
    '114.364980,23.078890',
    '114.361390,23.079830',
    '114.357270,23.079530'
  ]
}, {
  id: '7',
  name: 'B红线',
  type: '4',
  lnglatList: [
    '114.402820,23.088300',
    '114.411840,23.084900',
    '114.425010,23.079610'
  ]
}]

var basicRiverData = [{
  id: '1',
  name: '市级河A',
  type: '1',
  master: {
    name: '谢某新',
    tel: '1331233122'
  },
  lnglatList: [
    '114.372480,23.089840',
    '114.391020,23.091730',
    '114.408190,23.094580',
    '114.413340,23.069620',
    '114.419520,23.043400'
  ]
}, {
  id: '2',
  name: '市级河B',
  type: '1',
  master: {
    name: '谢某新',
    tel: '1331233122'
  },
  lnglatList: [
    '114.372480,23.089840',
    '114.391020,23.091730',
    '114.408190,23.094580',
    '114.413340,23.069620',
    '114.419520,23.043400'
  ]
}, {
  id: '3',
  name: '市级河C',
  type: '1',
  master: {
    name: '陈某良',
    tel: '13212312211'
  },
  lnglatList: [
    '114.347760,23.043400',
    '114.376600,23.040560',
    '114.408870,23.038350',
    '114.448700,23.040560',
    '114.481320,23.041830'
  ]
}, {
  id: '4',
  name: '市级河D',
  type: '1',
  master: {
    name: '陈某良',
    tel: '13212312211'
  },
  lnglatList: [
    '114.347760,23.043400',
    '114.376600,23.040560',
    '114.408870,23.038350',
    '114.448700,23.040560',
    '114.481320,23.041830'
  ]
}]

var projectData = [{
  id: '1',
  name: '水库A',
  type: '1',
  lnglat: '114.406810,23.102470'
}, {
  id: '2',
  name: '水库B',
  type: '1',
  lnglat: '114.402350,23.084470'
}, {
  id: '3',
  name: '堤坝A',
  type: '2',
  lnglat: '114.348110,23.093630'
}, {
  id: '4',
  name: '堤坝B',
  type: '2',
  lnglat: '114.372480,23.089840'
}, {
  id: '5',
  name: '水闸A',
  type: '3',
  lnglat: '114.353260,23.068360'
}, {
  id: '6',
  name: '水闸B',
  type: '3',
  lnglat: '114.377290,23.082570'
}, {
  id: '7',
  name: '泵站A',
  type: '4',
  lnglat: '114.363900,23.061100'
}, {
  id: '8',
  name: '泵站B',
  type: '4',
  lnglat: '114.357030,23.081940'
}]

export default {
  // 获取水利基础数据
  getBasicList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types.length && types[0] === '0') {
      return basicData
    }

    distData = _.filter(basicData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  getBasicRiverList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types.length && types[0] === '0') {
      return basicRiverData
    }

    distData = _.filter(basicRiverData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  // 获取水利工程数据
  getProjectList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types.length && types[0] === '0') {
      return projectData
    }

    distData = _.filter(projectData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  }
}