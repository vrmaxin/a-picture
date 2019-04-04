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
  id: '1',
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
  id: '2',
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
  id: '1',
  name: 'A湖',
  type: '3',
  lnglatList: [
    '114.372480,23.089840',
    '114.408190,23.094580',
    '114.419520,23.043400'
  ]
}, {
  id: '2',
  name: 'B湖',
  type: '3',
  lnglatList: [
    '114.347760,23.043400',
    '114.408870,23.038350',
    '114.481320,23.041830'
  ]
}, {
  id: '1',
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
  id: '2',
  name: 'B红线',
  type: '4',
  lnglatList: [
    '114.402820,23.088300',
    '114.411840,23.084900',
    '114.425010,23.079610'
  ]
}]

var projectData = [{
  id: '1',
  name: '水库A',
  type: '1',
  lnglat: '114.379690,23.098920'
}, {
  id: '2',
  name: '水库B',
  type: '1',
  master: {
    name: '谢某新',
    tel: '1331233122'
  },
  lnglat: '114.372480,23.089840',
}]

export default {
  getBasicList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types
    distData = _.filter(basicData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },
  getProjectList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types
    distData = _.filter(projectData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  }
}