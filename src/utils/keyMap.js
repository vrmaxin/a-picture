export function getkeyMapByModuleType(type) {
  return keyMap[type]
}

var keyMap = {
  'basic': {
    name: '名称',
    master: {
      name: '河长',
      tel: '手机'
    },
    // 流域
    startStation: '河源位置',
    endStation: '河口位置',
    area: '面积',
    population: '流域人口',
    organ: '负责单位',
    mark: '备注',

    // 河流
    alias: '别名',
    basin: '流域',
    drainage: '水系',
    pRiver: '上级河流',
    riverLevel: '河流级别',
    administrativeDivis: '所属行政区划',
    riverLength: '河流长度',
    // startStation: '江西省寻邬县桠髻钵山',
    // endStation: '狮子洋',
    startLnglat: '起点经纬度',
    startPosition: '起点位置',
    centerLnglat: '中心经纬度',
    endLnglat: '终点经纬度',
    endPosition: '终点位置',
    basinArea: '流域面积',
    // population: '9000万',
    rainArea: '集雨面积',
    // organ: '东江流域局',
    // mark: '这个用mock构造的数据',

    // 红线
    shoreType: '岸别',
  },
  'project': {
    name: '名称',
    master: {
      name: '河长',
      tel: '手机'
    },
    //水库
    organ: '管理单位A',
    address: '地址',
    completionDate: '建成日期',
    engineeringGrade: '工程等别',
    levelDatum: '水准基面',
    projectRegistration: '工程登记',
    majorFunction: '主要功能',
    manageArea: '管理保护范围',

    //堤坝
    level: '级别',
    seismicIntensity: '地震烈度',
    // levelDatum: '水准基面这个不甚了解',
    mark: '备注',
  },
  'monitor': {
    name: '名称',
    stationName: '测站名称',
    riverName: '河流名称',
    drainageName: '水系名称',
    basinName: '流域名称',
    // lnglat: '114.23,31.143',
    stationAddress: '站址',
    administrativeDivis: '行政区划',

    floodLevel: '报汛等级',
    completionDate: '建站年月',
    initialStageDate: '始报年月',
    organ: '管理单位',
    stationShoreType: '测站岸别',
    stationPosition: '测站方位',
    stationType: '站类',
    earlyWarningLevel: '预警水位',
    earlyWarningFlow: '预警流量',
    mark: '备注',

    earlyWarningRainfall: '预警降雨量',

    targetWaterQuality: '目标水质',
  },
  'video': {
    name: '名称',
    videoUrl: true
  },
  'public': {
    name: '名称'
  }
}