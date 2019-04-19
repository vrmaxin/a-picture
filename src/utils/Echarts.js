class ECharts {
  // 构造
  constructor(el, $echarts) {
    this.chart = $echarts.init(document.getElementById(el))
  }

  initChart(option) {
    // 绘制图表
    var distOption = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      series: [{
        name: '销量',
        type: 'pie',
        label: {
          normal: {
            formatter: "{c}",
            position: 'inside'
          }
        },
        data: [{
            name: '巡河次数（次）',
            value: '5'
          },
          {
            name: '巡河里程（km）',
            value: '5'
          },
          {
            name: '巡河时长（h）',
            value: '5'
          },
          {
            name: '巡河问题数（个）',
            value: '5'
          },
          {
            name: '巡问题里程密度（个河次数（次）',
            value: '5'
          },
          {
            name: '问题时长密度（个）',
            value: '5'
          }
        ]
      }]
    }
    var srcOption = {}
    if (option) {
      srcOption = Object.assign(option, srcOption)
    }
    distOption = Object.assign(srcOption, distOption)
    this.chart.setOption(distOption);
  }
}
export {
  ECharts
};