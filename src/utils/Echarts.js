class Echarts {
  // 构造
  constructor(el) {
    this.chart = this.$echarts.init(document.getElementById(el))
  }

  init(option) {
    // 绘制图表
    var distOption = {
      title: {
        text: '在Vue中使用echarts'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    distOption = Object.assign(option, distOption)

    this.chart.setOption(distOption);
  }
}
export {
  Echarts
};