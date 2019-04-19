/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-debugger */
var patrolData = [{
    id: "1",
    pName: '惠州市',
    name: '龙门县',
    patrolNum: '122',
    mileage: '189',
    duration: '17',
    problemNum: '3274',
    mileageDensity: '115',
    durationDensity: '8',
    widthLableAndCharts:'1',
    type: '1',
  },
  {
    id: "2",
    pName: '惠州市',
    name: '博罗县',
    patrolNum: '122',
    mileage: '189',
    duration: '17',
    problemNum: '3274',
    mileageDensity: '115',
    durationDensity: '8',
    widthLableAndCharts:'1',
    type: '1'
  },
  {
    id: "3",
    pName: '惠州市',
    name: '惠城区',
    patrolNum: '122',
    mileage: '189',
    duration: '17',
    problemNum: '3274',
    mileageDensity: '115',
    durationDensity: '8',
    widthLableAndCharts:'1',
    type: '1'
  },
  {
    id: "4",
    pName: '惠州市',
    name: '惠阳区',
    patrolNum: '122',
    mileage: '189',
    duration: '17',
    problemNum: '3274',
    mileageDensity: '115',
    durationDensity: '8',
    widthLableAndCharts:'1',
    type: '1'
  }, {
    id: "5",
    pName: '惠州市',
    name: '惠东县',
    patrolNum: '122',
    mileage: '189',
    duration: '17',
    problemNum: '3274',
    mileageDensity: '115',
    durationDensity: '8',
    widthLableAndCharts:'1',
    type: '1'
  }
]
var problemData = [{
    id: "1",
    pName: '惠州市',
    name: '龙门县',
    num: '3274',
    complete: ' 2000',
    completeRate: '65',
    type: '1'
  },
  {
    id: "2",
    pName: '惠州市',
    name: '博罗县',
    num: '3274',
    complete: ' 2000',
    completeRate: '65',
    type: '1'
  },
  {
    id: "3",
    pName: '惠州市',
    name: '惠城区',
    num: '3274',
    complete: ' 2000',
    completeRate: '65',
    type: '1'
  },
  {
    id: "4",
    pName: '惠州市',
    name: '惠阳区',
    num: '3274',
    complete: ' 2000',
    completeRate: '65',
    type: '1'
  },
  {
    id: "5",
    pName: '惠州市',
    name: '惠东县',
    num: '3274',
    complete: ' 2000',
    completeRate: '65',
    type: '1'
  }
]


export default {
  // 获取水质监测数据
  getPatrolList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return patrolData
    }

    distData = _.filter(patrolData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  },

  // 获取水情监测数据
  getProblemList: config => {
    var distData = []
    var data = JSON.parse(config.body)
    var types = data.types

    // 返回全部
    if (types && types.length && types[0] === '0') {
      return problemData
    }

    distData = _.filter(problemData, function (o) {
      return types.indexOf(o.type) !== -1;
    });
    return distData
  }
}