<template>
  <div class="a-pic">
    <div class="panel">
      <div>
        水利基础
        <el-checkbox-group v-model="jobBasicSelected"
                           @change="handleJobBasicChange"
                           size="mini">
          <el-checkbox v-for="(item,index) in jobBasicOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="isRiver">
        河流分级
        <el-radio-group v-model="jobBasicRiverSelected"
                        @change="handleJobBasicRiverChange"
                        size="mini">
          <el-radio v-for="(item,index) in jobBasicRiverOptions"
                    :label="item.value"
                    :key="index"
                    border>{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div>
        水利工程
        <el-checkbox-group v-model="jobProjectSelected"
                           @change="handleJobProjectChange"
                           size="mini">
          <el-checkbox v-for="(item,index) in jobProjectOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        水务监测站
        <el-checkbox-group v-model="jobMonitorSelected"
                           @change="handleJobMonitorChange"
                           size="mini">
          <el-checkbox v-for="(item,index) in jobMonitorOptions"
                       :label="item.value"
                       :key="index"
                       border>{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div id="mapDiv"></div>
  </div>
</template>
<script>
import job from '@/api/job.js'
import { TMap } from '@/utils/TMap.js'
import { debug, debuglog } from 'util';
import { decode } from 'punycode';
export default {
  name: 'Apic',
  data () {
    return {
      // 地图对象
      tMap: {},

      // 接口返回列表数据
      jobBasicList: [],
      jobProjectList: [],
      jobMonitorList: [],

      // 左侧选择项
      jobBasicSelected: [],
      jobBasicRiverSelected: '0',
      jobProjectSelected: [],
      jobMonitorSelected: [],
      jobVideoSelected: [],
      jobPublicitySelected: [],

      // 左侧选择项选中项
      jobBasicOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '流域'
        }, {
          value: '2',
          label: '河流'
        }, {
          value: '3',
          label: '湖泊'
        }, {
          value: '4',
          label: '红线'
        }
      ],

      jobBasicRiverOptions: [
        {
          value: '0',
          label: '河流'
        }, {
          value: '1',
          label: '市级河流'
        }, {
          value: '2',
          label: '区县河流'
        }, {
          value: '3',
          label: '乡镇河流'
        }, {
          value: '4',
          label: '村级河流'
        }
      ],

      jobProjectOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '水库'
        }, {
          value: '2',
          label: '堤坝'
        }, {
          value: '3',
          label: '水闸'
        }, {
          value: '4',
          label: '泵站'
        }
      ],

      jobMonitorOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '水库站'
        }, {
          value: '2',
          label: '雨量站'
        }, {
          value: '3',
          label: '水质站'
        }, {
          value: '4',
          label: '河道断面站'
        }, {
          value: '5',
          label: '梯级电站'
        }, {
          value: '6',
          label: '摄像头'
        }, {
          value: '7',
          label: '公示牌'
        }
      ],

      // 接口参数
      jobBasicParam: {
        types: []
      },
      jobBasicRiverParam: {
        types: []
      },
      jobProjectParam: {
        types: []
      },
      jobMonitorParam: {
        types: []
      },

      jobProjectIconMap: {
        '1': 'reservoir',
        '2': 'dam',
        '3': 'sluice',
        '4': 'pump'
      }
    }
  },
  watch: {},
  computed: {
    // 是否显示河流分级
    isRiver () {
      return this.jobBasicParam.types.indexOf('2') !== -1 ? true : false
    },
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.tMap = new TMap('mapDiv', T)
    },
    // 获取水利基础数据
    getList () {
    },

    // 获取水利基础数据
    getBasicList () {
      var that = this
      // 1.先清除现有的水利基础的覆盖物
      if (that.tMap.jobBasicOverLays && that.tMap.jobBasicOverLays.length) {
        var overLays = that.tMap.jobBasicOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobBasicOverLays
      }

      // 2.再重新添加水利基础的覆盖物
      job['getBasicList'](that.jobBasicParam).then(response => {
        that.basicList = response.data;
        for (var i = 0; i < that.basicList.length; i++) {
          var item = that.basicList[i]
          var type = item.type
          var lnglatList = item.lnglatList

          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList)

          // 添加覆盖物并返回覆盖物
          var overlay
          if (type === '1' || type === '3') {
            overlay = that.tMap.addPolygon(points, item)
          } else if (type === '2' || type === '4') {
            overlay = that.tMap.addPolyline(points, item)
          }

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobBasicOverLays) {
            that.tMap.jobBasicOverLays = []
          }
          that.tMap.jobBasicOverLays.push(overlay)
        }
      })
    },

    // 获取分级河流数据
    getBasicRiverList () {
      var that = this
      // 1.先清除现有的水利基础的覆盖物
      if (that.tMap.jobBasicRiverOverLays && that.tMap.jobBasicRiverOverLays.length) {
        var overLays = that.tMap.jobBasicRiverOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobBasicRiverOverLays
      }

      // 2.再重新添加水利基础的覆盖物
      job['getBasicRiverList'](that.jobBasicRiverParam).then(response => {
        that.basicRiverList = response.data;
        for (var i = 0; i < that.basicRiverList.length; i++) {
          var item = that.basicRiverList[i]
          var type = item.type
          var lnglatList = item.lnglatList
          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList)

          var options = {
            color: "green",
            weight: 2,
            opacity: 0.5,
            fillColor: "#FFFFFF",
            fillOpacity: 0.5
          }

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addPolyline(points, item, options)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobBasicRiverOverLays) {
            that.tMap.jobBasicRiverOverLays = []
          }
          that.tMap.jobBasicRiverOverLays.push(overlay)
        }
      })
    },

    // 获取水利工程数据
    getProjectList () {
      var that = this
      // 1.先清除现有的水利工程的覆盖物
      if (that.tMap.jobProjectOverLays && that.tMap.jobProjectOverLays.length) {
        var overLays = that.tMap.jobProjectOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobProjectOverLays
      }
      job['getProjectList'](that.jobProjectParam).then(response => {
        that.jobProjectList = response.data;
        for (var i = 0; i < that.jobProjectList.length; i++) {
          var item = that.jobProjectList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(item.type)

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobProjectOverLays) {
            that.tMap.jobProjectOverLays = []
          }
          that.tMap.jobProjectOverLays.push(overlay)
        }
      })
    },

    // 获取水务监测站数据
    getMonitorList () {
      var that = this
      job['getMonitorList'](that.jobMonitorParam).then(response => {
        that.jobMonitorList = response.data;
        for (var i = 0; i < that.jobMonitorList.length; i++) {
          var item = that.jobMonitorList[i]
          var lnglatList = item.lnglatList
          var points = that.tMap.buildPoints(lnglatList)

          if (this.jobBasicSelected.indexOf('basin') !== -1 || this.jobBasicSelected.indexOf('basin') !== -1) {
            that.tMap.addPolygon(points, item)
          } else if (this.selectedBasic === 'river' || this.selectedBasic === 'redline') {
            that.tMap.addPolyline(points, item)
          }
        }
        console.log(response.data);
      })
    },

    // 水利基础选项改变事件
    handleJobBasicChange (val) {
      this.jobBasicParam.types = val
      this.getBasicList()
    },

    // 河流选项改变事件
    handleJobBasicRiverChange (val) {
      this.jobBasicRiverParam.types = val
      this.getBasicRiverList()
    },

    // 水利工程选项改变事件
    handleJobProjectChange (val) {
      this.jobProjectParam.types = val
      this.getProjectList()
    },

    handleJobMonitorChange (val) {
      this.jobMonitorParam.types = val
      this.getMonitorList()
    },

    getIconBytype (type) {
      return this.jobProjectIconMap[type]
    }
  }
}
</script>
<style lang="scss">
.a-pic {
  #mapDiv {
    position: absolute;
    left: 200px;
    width: calc(100% - 200px);
    height: 100%;
  }

  .panel {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 250px;
    background: #ffffff;
    z-index: 1000;
  }

  .el-checkbox.is-bordered.el-checkbox--mini {
    margin-left: 10px;
  }

  .el-radio--mini.is-bordered {
    margin-left: 10px;
  }
}
</style>
