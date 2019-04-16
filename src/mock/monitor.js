/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-debugger */
var qualityData = [{
    id: "1",
    time: '2019-04-12 11:04:12',
    currentQuality: '2',
    targetQuality: '2',
    achieve: '1',
    type: '1',
    lnglat: "114.333940,23.089440"
  },
  {
    id: "2",
    time: '2019-04-13 11:14:12',
    currentQuality: '2',
    targetQuality: '1',
    achieve: '0',
    type: '1',
    lnglat: "114.317120,23.080760"
  },
  {
    id: "3",
    time: '2019-04-14 18:04:12',
    currentQuality: '3',
    targetQuality: '4',
    achieve: '1',
    type: '1',
    lnglat: "114.312310,23.048930"
  },
  {
    id: "4",
    time: '2019-04-16 05:04:12',
    currentQuality: '6',
    targetQuality: '5',
    achieve: '0',
    type: '1',
    lnglat: "114.388530,23.078150"
  }
]
var waterData = [{
    id: "1",
    time: '2019-02-11 05:04:12',
    level: '4.12',
    flow: '11.1',
    type: '1',
    lnglat: "114.348960,23.074600"
  },
  {
    id: "2",
    time: '2019-01-14 05:04:12',
    level: '3.32',
    flow: '10.17',
    type: '1',
    lnglat: "114.354630,23.073180"
  },
  {
    id: "3",
    time: '2019-03-11 05:04:12',
    level: '6.11',
    flow: '18.1',
    type: '1',
    lnglat: "114.369390,23.075070"
  },
  {
    id: "4",
    time: '2019-01-21 05:04:12',
    level: '4.02',
    flow: '15.3',
    type: '1',
    lnglat: "114.377120,23.075700"
  }
]
var rainData = [{
    id: "1",
    time: '2019-02-11 05:04:12',
    rainfall: '4.12',
    type: '1',
    lnglat: "114.349180,23.062950"
  },
  {
    id: "2",
    time: '2019-01-14 05:04:12',
    rainfall: '3.32',
    type: '2',
    lnglat: "114.360900,23.059560"
  },
  {
    id: "3",
    time: '2019-03-11 05:04:12',
    rainfall: '6.11',
    type: '3',
    lnglat: "114.372910,23.068160"
  },
  {
    id: "4",
    time: '2019-01-21 05:04:12',
    rainfall: '4.02',
    type: '4',
    lnglat: "114.378530,23.072150"
  },
  {
    id: "4",
    time: '2019-02-21 05:04:12',
    rainfall: '5.02',
    type: '5',
    lnglat: "114.370590,23.073340"
  }
]
var videoData = [{
    id: "1",
    time: '2019-02-11 05:04:12',
    type: '1',
    lnglat: '114.381920,23.072860',
    videoUrl: 'hydrology.mp4',
    isVideo: '1'
  },
  {
    id: "2",
    time: '2019-01-14 05:04:12',
    type: '1',
    lnglat: '114.373940,23.052090',
    videoUrl: 'protection.mp4',
    isVideo: '1'
  },
  {
    id: "3",
    time: '2019-03-11 05:04:12',
    type: '1',
    lnglat: '114.420120,23.071680',
    videoUrl: 'djbasin.mp4',
    isVideo: '1'
  }
]

export default {
  // 获取水质监测数据
  getQualityList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return qualityData
    }

    distData = _.filter(qualityData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  // 获取水情监测数据
  getWaterList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return waterData
    }

    distData = _.filter(waterData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  // 获取雨情监测数据
  getRainList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return rainData
    }

    distData = _.filter(rainData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  // 获取视频监测数据
  getVideoList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return videoData
    }

    distData = _.filter(videoData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  }
}