<template>
  <div class="statistics">
    <el-collapse v-model="statisticsActiveNames">
      <el-collapse-item title="巡河统计"
                        name="1">
        <el-checkbox v-show="statisticsPatrolOptions.length>1"
                     :indeterminate="statisticsPatrolIsIndeterminate"
                     v-model="statisticsPatrolAllSelected"
                     @change="handlestatisticsPatrolAllChange"
                     size="small"
                     border>全选</el-checkbox>
        <el-checkbox-group v-model="statisticsPatrolSelected"
                           @change="handlestatisticsPatrol"
                           size="small">
          <el-checkbox v-for="(item,index) in statisticsPatrolOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="问题统计"
                        name="2">
        <el-checkbox v-show="statisticsProblemOptions.length>1"
                     :indeterminate="statisticsProblemIsIndeterminate"
                     v-model="statisticsProblemAllSelected"
                     @change="handlestatisticsProblemAllChange"
                     size="small"
                     border>全选</el-checkbox>
        <el-checkbox-group v-model="statisticsProblemSelected"
                           @change="handlestatisticsProblem"
                           size="small">
          <el-checkbox v-for="(item,index) in statisticsProblemOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import statistics from '@/api/statistics.js'
import { colorMap } from '@/utils/colorMap'
export default {
  name: 'statistics',
  props: {
    tMap: {
      type: Object
    },
    statisticsOption: {
      type: Object
    }
  },
  data () {
    return {
      index: 0,
      statisticsActiveNames: ['1', '2'],

      // 接口返回列表数据
      statisticsPatrolList: [],
      statisticsProblemList: [],

      // 不定项时，全选按钮状态
      statisticsPatrolIsIndeterminate: false,
      statisticsProblemIsIndeterminate: false,

      // 全选按钮状态
      statisticsPatrolAllSelected: false,
      statisticsProblemAllSelected: false,

      // 左侧选择项
      statisticsPatrolSelected: [],
      statisticsProblemSelected: [],

      // 水质监测备选项
      statisticsPatrolOptions: [
        {
          value: '1',
          label: '巡河统计'
        }
      ],
      // 水情监测备选项
      statisticsProblemOptions: [
        {
          value: '1',
          label: '问题统计'
        }
      ],

      // 接口参数
      statisticsPatrolParam: {
        types: []
      },
      statisticsProblemParam: {
        types: []
      },

      // 监测监控图标映射
      statisticsIconMap: {
        Patrol: {
          '1': 'Patrol'
        },
        Problem: {
          '1': 'Problem'
        }
      }
    }
  },
  methods: {
    // 水质监测全选按钮事件
    handlestatisticsPatrolAllChange (val) {
      this.statisticsPatrolSelected = [].concat()
      if (val) {
        for (var i in this.statisticsPatrolOptions) {
          var item = this.statisticsPatrolOptions[i]
          this.statisticsPatrolSelected.push(item.value)
        }
      }
      this.statisticsPatrolIsIndeterminate = false
      this.statisticsPatrolParam.types = this.statisticsPatrolSelected
      this.getPatrolList()
    },

    // 水质监测选项改变事件
    handlestatisticsPatrol (val) {
      this.statisticsProblemSelected = []
      let checkedCount = val.length;
      this.statisticsPatrolAllSelected = checkedCount === this.statisticsPatrolOptions.length;
      this.statisticsPatrolIsIndeterminate = checkedCount > 0 && checkedCount < this.statisticsPatrolOptions.length;
      this.statisticsPatrolParam.types = val
      this.getPatrolList()
    },

    // 水质监测全选按钮事件
    handlestatisticsProblemAllChange (val) {
      this.statisticsProblemSelected = [].concat()
      if (val) {
        for (var i in this.statisticsProblemOptions) {
          var item = this.statisticsProblemOptions[i]
          this.statisticsProblemSelected.push(item.value)
        }
      }
      this.statisticsProblemIsIndeterminate = false
      this.statisticsProblemParam.types = this.statisticsProblemSelected
      this.getProblemList()
    },

    // 水质监测选项改变事件
    handlestatisticsProblem (val) {
      this.statisticsPatrolSelected = []
      let checkedCount = val.length;
      this.statisticsProblemAllSelected = checkedCount === this.statisticsProblemOptions.length;
      this.statisticsProblemIsIndeterminate = checkedCount > 0 && checkedCount < this.statisticsProblemOptions.length;
      this.statisticsProblemParam.types = val
      this.getProblemList()
    },

    // 根据类别获取图标
    getIconBytype (moduleType, type) {
      return this.statisticsIconMap[moduleType][type]
    },

    // 根据指标值获取水质图标
    getPatrolIconByData (data) {
      var currentPatrol = data.currentPatrol
      var targetPatrol = data.targetPatrol
      var iconName = currentPatrol + "_" + targetPatrol
      return iconName
    },

    // 获取水质监测数据
    getPatrolList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.statisticsOverLays && that.tMap.statisticsOverLays.length) {
        var overLays = that.tMap.statisticsOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.statisticsOverLays
      }
      that.tMap.map.closeInfoWindow()

      statistics['getPatrolList'](that.statisticsPatrolParam).then(response => {
        that.statisticsPatrolList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'statistics'
        that.tMap.moduleType = 'patrol'
        for (var i = 0; i < that.statisticsPatrolList.length; i++) {
          var item = that.statisticsPatrolList[i]

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'patrol'

          // 为标注点添加含有图形的属性，用于判断显示图形
          item.widthCharts = '1'

          // 获取行政区域边界
          this.getAdministrative(item.pName, that.statisticsPatrolList)

          var lnglat = item.lnglat

        }
      })
    },

    // 获取水质监测数据
    getProblemList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.statisticsOverLays && that.tMap.statisticsOverLays.length) {
        var overLays = that.tMap.statisticsOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.statisticsOverLays
      }

      statistics['getProblemList'](that.statisticsProblemParam).then(response => {
        that.statisticsProblemList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'statistics'
        that.tMap.moduleType = 'problem'
        for (var i = 0; i < that.statisticsProblemList.length; i++) {
          var item = that.statisticsProblemList[i]

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'problem'

          // 为标注点添加含有图形的属性，用于判断显示图形
          item.widthCharts = '1'

          // 获取行政区域边界
          this.getAdministrative(item.pName, that.statisticsProblemList)

          var lnglat = item.lnglat
        }
      })
    },

    // 获取行政区划信息
    getAdministrative (name, list) {
      var that = this
      //创建对象
      var administrative = new T.AdministrativeDivision();
      var config = {
        needSubInfo: true,
        needAll: false,
        needPolygon: true,
        needPre: true,
        searchType: 1,
        searchWord: name
      };
      administrative.search(config, function (result) { that.searchResult(result, list) });
    },

    searchResult (result, list) {
      var that = this
      if (result.getStatus() == 100) {
        var data = result.getData();
        // 获取当前的行政区划
        that.handleSearchResult(data, list, function () { that.setViewport(data) });
      } else {
        result.getMsg();
      }
    },

    setViewport (dataArr) {
      for (var k = 0; k < dataArr.length; k++) {
        var lng = dataArr[k].lnt
        var lat = dataArr[k].lat

        var level = dataArr[k].level
        var bound = dataArr[k].bound
        var adminType = dataArr[k].adminType
        var name = dataArr[k].name
        var data = dataArr[k].points

        if (adminType === 'city') {
          for (var j = 0; j < data.length; j++) {
            var points = data[j]
            var pointsArr = [];
            for (var i = 0; i < points.length; i++) {
              var regionLngLats = [];
              var regionArr = points[i].region.split(",");
              for (var m = 0; m < regionArr.length; m++) {
                var lnglatArr = regionArr[m].split(" ");
                var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                regionLngLats.push(lnglat);
                pointsArr.push(lnglat);
              }
            }
            //显示最佳比例尺
            this.tMap.map.setViewport(pointsArr);
          }
        }

        this.$emit('setStatisticsOption', lng, lat)
      }
    },

    // 处理行政区划数据
    handleSearchResult (data, list, callback) {
      for (var i = 0; i < data.length; i++) {
        var lnt = data[i].lnt
        var lat = data[i].lat
        var level = data[i].level
        var bound = data[i].bound
        var adminType = data[i].adminType
        var name = data[i].name

        if (data[i].points) {
          //绘制行政区划
          if (adminType === 'county') {
            this.polygon(data[i].points, adminType, name, list);
          }
        }

        //解释下级行政区划
        if (data[i].child) {
          this.handleSearchResult(data[i].child, list, callback);
        }

        callback()
      }
    },

    // 绘制行政区划边界
    polygon (points, adminType, name, list) {
      var pointsArr = [];
      var that = this
      for (var i = 0; i < points.length; i++) {

        // 闭包实现批量添加点击事件
        (function (i) {
          var regionLngLats = [];
          var regionArr = points[i].region.split(",");
          for (var m = 0; m < regionArr.length; m++) {
            var lnglatArr = regionArr[m].split(" ");
            var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
            regionLngLats.push(lnglat);
            pointsArr.push(lnglat);
          }

          //创建面对象
          if (that.index >= colorMap.length) {
            that.index = 10
          }

          var polygon = new T.Polygon(regionLngLats, { color: "#FFFFFF", weight: 2, opacity: 0.7, fillColor: colorMap[that.index], fillOpacity: 0.9 });
          that.index = that.index + 10

          var oldColor = polygon.getFillColor()

          var itemData = {}
          for (var j = 0; j < list.length; j++) {
            var item = list[j]
            if (item.name === name) {
              itemData = Object.assign({}, item)
              polygon.addEventListener("click", function (e) {
                that.tMap.polyClickHandle(e, itemData)
              });

              polygon.addEventListener('mouseover', function () {
                polygon.setFillColor('#EEC900')
              })

              polygon.addEventListener('mouseout', function () {
                polygon.setFillColor(oldColor)
                that.tMap.map.closeInfoWindow()
              })
            }
          }

          //向地图上添加行政区划面
          that.tMap.map.addOverLay(polygon);

          // 将水质监测覆盖物保存起来
          if (!that.tMap.statisticsOverLays) {
            that.tMap.statisticsOverLays = []
          }
          that.tMap.statisticsOverLays.push(polygon)

        })(i);
      }
    },
  }
}
</script>
<style lang="scss">
</style>
