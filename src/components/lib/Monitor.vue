<template>
  <div class="monitor">
    <el-collapse v-model="monitorActiveNames">
      <el-collapse-item title="水质监测"
                        name="1">
        <el-checkbox v-show="monitorQualityOptions.length>1"
                     :indeterminate="monitorQualityIsIndeterminate"
                     v-model="monitorQualityAllSelected"
                     @change="handleMonitorQualityAllChange"
                     size="small"
                     border>全选</el-checkbox>
        <el-checkbox-group v-model="monitorQualitySelected"
                           @change="handleMonitorQuality"
                           size="small">
          <el-checkbox v-for="(item,index) in monitorQualityOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="水情监测"
                        name="2">
        <el-checkbox v-show="monitorWaterOptions.length>1"
                     :indeterminate="monitorWaterIsIndeterminate"
                     v-model="monitorWaterAllSelected"
                     @change="handleMonitorWaterAllChange"
                     size="small"
                     border>全选</el-checkbox>
        <el-checkbox-group v-model="monitorWaterSelected"
                           @change="handleMonitorWater"
                           size="small">
          <el-checkbox v-for="(item,index) in monitorWaterOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="雨情监测"
                        name="3">
        <el-checkbox v-show="monitorRainOptions.length>1"
                     :indeterminate="monitorRainIsIndeterminate"
                     v-model="monitorRainAllSelected"
                     @change="handleMonitorRainAllChange"
                     size="small"
                     border>全市雨情</el-checkbox>
        <el-checkbox-group v-model="monitorRainSelected"
                           @change="handleMonitorRain"
                           size="small">
          <el-checkbox v-for="(item,index) in monitorRainOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="视频监测"
                        name="4">
        <el-checkbox v-show="monitorVideoOptions.length>1"
                     :indeterminate="monitorVideoIsIndeterminate"
                     v-model="monitorVideoAllSelected"
                     @change="handleMonitorVideoAllChange"
                     size="small"
                     border>全选</el-checkbox>
        <el-checkbox-group v-model="monitorVideoSelected"
                           @change="handleMonitorVideo"
                           size="small">
          <el-checkbox v-for="(item,index) in monitorVideoOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import monitor from '@/api/monitor.js'
export default {
  name: 'Monitor',
  props: {
    tMap: Object
  },
  data () {
    return {
      monitorActiveNames: ['1', '2', '3', '4', '5'],

      // 接口返回列表数据
      monitorQualityList: [],
      monitorWaterList: [],
      monitorRainList: [],
      monitorVideoList: [],

      // 不定项时，全选按钮状态
      monitorQualityIsIndeterminate: false,
      monitorWaterIsIndeterminate: false,
      monitorRainIsIndeterminate: false,
      monitorVideoIsIndeterminate: false,

      // 全选按钮状态
      monitorQualityAllSelected: false,
      monitorWaterAllSelected: false,
      monitorRainAllSelected: false,
      monitorVideoAllSelected: false,

      // 左侧选择项
      monitorQualitySelected: [],
      monitorWaterSelected: [],
      monitorRainSelected: [],
      monitorVideoSelected: [],

      // 水质监测备选项
      monitorQualityOptions: [
        {
          value: '1',
          label: '全市水质'
        }
      ],
      // 水情监测备选项
      monitorWaterOptions: [
        {
          value: '1',
          label: '全市雨情'
        }
      ],
      // 雨情监测备选项
      monitorRainOptions: [
        {
          value: '1',
          label: '水库水情'
        },
        {
          value: '2',
          label: '断面水情'
        },
        {
          value: '3',
          label: '堰闸水情'
        },
        {
          value: '4',
          label: '电站水情'
        },
        {
          value: '5',
          label: '泵站水情'
        }
      ],
      // 视频监测备选项
      monitorVideoOptions: [
        {
          value: '1',
          label: '全市监控'
        }
      ],

      // 接口参数
      monitorQualityParam: {
        types: []
      },
      monitorWaterParam: {
        types: []
      },
      monitorRainParam: {
        types: []
      },
      monitorVideoParam: {
        types: []
      },

      // 监测监控图标映射
      monitorIconMap: {
        quality: {
          '1': 'quality'
        },
        water: {
          '1': 'water'
        },
        rain: {
          '1': 'reservoir',
          '2': 'section',
          '3': 'dam',
          '4': 'power',
          '5': 'pump'
        },
        video: {
          '1': 'video'
        }
      },

      qualityMap: {
        '1': 'Ⅰ',
        '2': 'Ⅱ',
        '3': 'Ⅲ',
        '4': 'Ⅳ',
        '5': 'Ⅴ',
        '6': 'Ⅵ'
      }
    }
  },
  methods: {
    // 水质监测全选按钮事件
    handleMonitorQualityAllChange (val) {
      this.monitorQualitySelected = [].concat()
      if (val) {
        for (var i in this.monitorQualityOptions) {
          var item = this.monitorQualityOptions[i]
          this.monitorQualitySelected.push(item.value)
        }
      }
      this.monitorQualityIsIndeterminate = false
      this.monitorQualityParam.types = this.monitorQualitySelected
      this.getQualityList()
    },

    // 水质监测选项改变事件
    handleMonitorQuality (val) {
      let checkedCount = val.length;
      this.monitorQualityAllSelected = checkedCount === this.monitorQualityOptions.length;
      this.monitorQualityIsIndeterminate = checkedCount > 0 && checkedCount < this.monitorQualityOptions.length;
      this.monitorQualityParam.types = val
      this.getQualityList()
    },

    // 水质监测全选按钮事件
    handleMonitorWaterAllChange (val) {
      this.monitorWaterSelected = [].concat()
      if (val) {
        for (var i in this.monitorWaterOptions) {
          var item = this.monitorWaterOptions[i]
          this.monitorWaterSelected.push(item.value)
        }
      }
      this.monitorWaterIsIndeterminate = false
      this.monitorWaterParam.types = this.monitorWaterSelected
      this.getWaterList()
    },

    // 水质监测选项改变事件
    handleMonitorWater (val) {
      let checkedCount = val.length;
      this.monitorWaterAllSelected = checkedCount === this.monitorWaterOptions.length;
      this.monitorWaterIsIndeterminate = checkedCount > 0 && checkedCount < this.monitorWaterOptions.length;
      this.monitorWaterParam.types = val
      this.getWaterList()
    },

    // 水质监测全选按钮事件
    handleMonitorRainAllChange (val) {
      this.monitorRainSelected = [].concat()
      if (val) {
        for (var i in this.monitorRainOptions) {
          var item = this.monitorRainOptions[i]
          this.monitorRainSelected.push(item.value)
        }
      }
      this.monitorRainIsIndeterminate = false
      this.monitorRainParam.types = this.monitorRainSelected
      this.getRainList()
    },

    // 水质监测选项改变事件
    handleMonitorRain (val) {
      let checkedCount = val.length;
      this.monitorRainAllSelected = checkedCount === this.monitorRainOptions.length;
      this.monitorRainIsIndeterminate = checkedCount > 0 && checkedCount < this.monitorRainOptions.length;
      this.monitorRainParam.types = val
      this.getRainList()
    },

    // 水质监测全选按钮事件
    handleMonitorVideoAllChange (val) {
      this.monitorVideoSelected = [].concat()
      if (val) {
        for (var i in this.monitorVideoOptions) {
          var item = this.monitorVideoOptions[i]
          this.monitorVideoSelected.push(item.value)
        }
      }
      this.monitorVideoIsIndeterminate = false
      this.monitorVideoParam.types = this.monitorVideoSelected
      this.getVideoList()
    },

    // 水质监测选项改变事件
    handleMonitorVideo (val) {
      let checkedCount = val.length;
      this.monitorVideoAllSelected = checkedCount === this.monitorVideoOptions.length;
      this.monitorVideoIsIndeterminate = checkedCount > 0 && checkedCount < this.monitorVideoOptions.length;
      this.monitorVideoParam.types = val
      this.getVideoList()
    },

    // 根据类别获取图标
    getIconBytype (moduleType, type) {
      return this.monitorIconMap[moduleType][type]
    },

    // 根据指标值获取水质图标
    getQualityIconByData (data) {
      var currentQuality = data.currentQuality
      var targetQuality = data.targetQuality
      var iconName = currentQuality + "_" + targetQuality
      return iconName
    },

    // 获取水质监测数据
    getQualityList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.monitorQualityOverLays && that.tMap.monitorQualityOverLays.length) {
        var overLays = that.tMap.monitorQualityOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.monitorQualityOverLays
      }
      monitor['getQualityList'](that.monitorQualityParam).then(response => {
        that.monitorQualityList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'monitor'
        that.tMap.moduleType = 'quality'
        for (var i = 0; i < that.monitorQualityList.length; i++) {
          var item = that.monitorQualityList[i]

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'quality'

          // 为标注点添加含有图形的属性，用于判断显示图形
          item.widthCharts = '1'

          var distItem = this.dealDataValues(item)

          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)

          var iconUrl = that.getQualityIconByData(item)


          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, distItem, iconUrl)

          // 将水质监测覆盖物保存起来
          if (!that.tMap.monitorQualityOverLays) {
            that.tMap.monitorQualityOverLays = []
          }
          that.tMap.monitorQualityOverLays.push(overlay)
        }
      })
    },

    dealDataValues (src) {
      var dist = Object.assign({}, src)
      if (dist.currentQuality) {
        dist.currentQuality = this.qualityMap[dist.currentQuality]
      }
      if (dist.targetQuality) {
        dist.targetQuality = this.qualityMap[dist.targetQuality]
      }
      if (dist.achieve) {
        dist.achieve = parseInt(dist.achieve) ? '是' : '否'
      }
      return dist
    },

    // 获取水质监测数据
    getWaterList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.monitorWaterOverLays && that.tMap.monitorWaterOverLays.length) {
        var overLays = that.tMap.monitorWaterOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.monitorWaterOverLays
      }
      monitor['getWaterList'](that.monitorWaterParam).then(response => {
        that.monitorWaterList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'monitor'
        that.tMap.moduleType = 'water'
        for (var i = 0; i < that.monitorWaterList.length; i++) {
          var item = that.monitorWaterList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'water'

          // 为标注点添加含有图形的属性，用于判断显示图形
          item.widthCharts = '1'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水质监测覆盖物保存起来
          if (!that.tMap.monitorWaterOverLays) {
            that.tMap.monitorWaterOverLays = []
          }
          that.tMap.monitorWaterOverLays.push(overlay)
        }
      })
    },

    // 获取水质监测数据
    getRainList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.monitorRainOverLays && that.tMap.monitorRainOverLays.length) {
        var overLays = that.tMap.monitorRainOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.monitorRainOverLays
      }
      monitor['getRainList'](that.monitorRainParam).then(response => {
        that.monitorRainList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'monitor'
        that.tMap.moduleType = 'rain'
        for (var i = 0; i < that.monitorRainList.length; i++) {
          var item = that.monitorRainList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'rain'

          // 为标注点添加含有图形的属性，用于判断显示图形
          item.widthCharts = '1'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水质监测覆盖物保存起来
          if (!that.tMap.monitorRainOverLays) {
            that.tMap.monitorRainOverLays = []
          }
          that.tMap.monitorRainOverLays.push(overlay)
        }
      })
    },
    // 获取水质监测数据
    getVideoList () {
      var that = this

      // 1.先清除现有的水质监测的覆盖物
      if (that.tMap.monitorVideoOverLays && that.tMap.monitorVideoOverLays.length) {
        var overLays = that.tMap.monitorVideoOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.monitorVideoOverLays
      }
      monitor['getVideoList'](that.monitorVideoParam).then(response => {
        that.monitorVideoList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'monitor'
        that.tMap.moduleType = 'video'
        for (var i = 0; i < that.monitorVideoList.length; i++) {
          var item = that.monitorVideoList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'video'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水质监测覆盖物保存起来
          if (!that.tMap.monitorVideoOverLays) {
            that.tMap.monitorVideoOverLays = []
          }
          that.tMap.monitorVideoOverLays.push(overlay)
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
