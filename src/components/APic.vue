<template>
  <div class="a-pic">
    <img class="map-reset"
         :src="resetMap.icon"
         @click="resetMap.handle()"
         alt="">
    <div class="toolbar-wrap">
      <div class="toolbar">
        <div v-for="(item,index) in toolbarMap"
             :key="index"
             :class="item.actived?'tool actived':'tool'"
             @click="handleClickToolMapLabel(item,index)"
             @mouseover="handleMouseOverToolMapLabel(item,index)"
             @mouseout="handleMouseOutToolMapLabel(item,index)">
          <img :src="item.actived?item.activedIcon:item.icon"
               alt="">
          <i v-if="!item.actived&&index!==toolbarMap.length-1">|</i>
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <div v-if="maxVideoMap&&maxVideoMap[0]&&maxVideoMap[0].url">
      <div class="max-media"
           v-for="(item,index) in maxVideoMap"
           :key="index">
        <div class="media-container">
          <div class="media-wrap">
            <div class="media-close">
              <img v-if="item.url"
                   :src="closeIcon"
                   @click="closeMaxVideo(index)">
            </div>
            <video controls="controls"
                   autoplay
                   v-if="item.url"
                   :src="item.url"></video>
          </div>
        </div>
      </div>
    </div>
    <div v-if="maxImgMap&&maxImgMap[0]&&maxImgMap[0].url">
      <div class="max-media"
           v-for="(item,index) in maxImgMap"
           :key="index">
        <div class="media-container">
          <div class="media-wrap">
            <div class="media-close">
              <img v-if="item.url"
                   :src="closeIcon"
                   @click="closeMaxImg(index)">
            </div>
            <img v-if="item.url"
                 :src="item.url">
          </div>
        </div>
      </div>
    </div>
    <div v-if="maxChartsMap&&maxChartsMap[0]&&maxChartsMap[0].url">
      <div class="max-media"
           v-for="(item,index) in maxChartsMap"
           :key="index">
        <div class="media-container">
          <div class="media-wrap">
            <div class="media-close">
              <img v-if="item.url"
                   :src="closeIcon"
                   @click="closeMaxCharts(index)">
            </div>
            <img v-if="item.url"
                 :src="item.url">
          </div>
        </div>
      </div>
    </div>
    <div :class="hideLeftPanel?'panel-l panel-l-hidden':'panel-l'">
      <el-row :class="hideLeftPanel?'panel-hidden':''">
        <el-col class="label-col"
                :span="5">
          <div class="label-wrap">
            <div v-for="(item,index) in moduleMap"
                 :key="index"
                 :class="item.actived||item.hovered?'label-item actived':'label-item'"
                 @click="handleClickModuleMapLabel(item,index)"
                 @mouseover="handleMouseOverModuleMapLabel(item,index)"
                 @mouseout="handleMouseOutModuleMapLabel(item,index)">
              <img :src="item.actived||item.hovered?item.activedIcon:item.icon" />
              {{item.label}}
            </div>
          </div>
        </el-col>
        <el-col :span="19"
                class="collapse-col">
          <div v-if="moduleMap[0].actived">
            <el-collapse v-model="jobActiveNames">
              <el-collapse-item title="水利基础"
                                name="1">
                <el-checkbox :indeterminate="jobBasicIsIndeterminate"
                             v-model="jobBasicAllSelected"
                             @change="handleJobBasicAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobBasicSelected"
                                   @change="handleJobBasicChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobBasicOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <div v-if="isRiver">
                  <div class="river-level">河流分级</div>
                  <el-radio-group v-model="jobBasicRiverSelected"
                                  @change="handleJobBasicRiverChange"
                                  size="small">
                    <el-radio v-for="(item,index) in jobBasicRiverOptions"
                              :label="item.value"
                              :key="index"
                              border>{{item.label}}</el-radio>
                  </el-radio-group>
                </div>
              </el-collapse-item>
              <el-collapse-item title="水利工程"
                                name="2">
                <el-checkbox :indeterminate="jobProjectIsIndeterminate"
                             v-model="jobProjectAllSelected"
                             @change="handleJobProjectAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobProjectSelected"
                                   @change="handleJobProjectChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobProjectOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
              <el-collapse-item title="水务监测站"
                                name="3">
                <el-checkbox :indeterminate="jobMonitorIsIndeterminate"
                             v-model="jobMonitorAllSelected"
                             @change="handleJobMonitorAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobMonitorSelected"
                                   @change="handleJobMonitorChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobMonitorOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
              <el-collapse-item title="视频监控"
                                name="4">
                <el-checkbox :indeterminate="jobVideoIsIndeterminate"
                             v-model="jobVideoAllSelected"
                             @change="handleJobVideoAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobVideoSelected"
                                   @change="handleJobVideoChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobVideoOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
              <el-collapse-item title="公示牌"
                                name="5">
                <el-checkbox :indeterminate="jobPublicIsIndeterminate"
                             v-model="jobPublicAllSelected"
                             @change="handleJobPublicAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobPublicSelected"
                                   @change="handleJobPublicChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobPublicOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div v-show="moduleMap[1].actived">
            <Monitor :tMap="tMap"></Monitor>
          </div>
          <div v-if="moduleMap[2].actived">
            <el-collapse v-model="jobActiveNames">
              <el-collapse-item title="河长制专题"
                                name="1">
                <el-checkbox :indeterminate="jobBasicIsIndeterminate"
                             v-model="jobBasicAllSelected"
                             @change="handleJobBasicAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobBasicSelected"
                                   @change="handleJobBasicChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobBasicOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div v-if="moduleMap[3].actived">
            <el-collapse v-model="jobActiveNames">
              <el-collapse-item title="统计分析"
                                name="1">
                <el-checkbox :indeterminate="jobBasicIsIndeterminate"
                             v-model="jobBasicAllSelected"
                             @change="handleJobBasicAllChange"
                             size="small"
                             border>全选</el-checkbox>
                <el-checkbox-group v-model="jobBasicSelected"
                                   @change="handleJobBasicChange"
                                   size="small">
                  <el-checkbox v-for="(item,index) in jobBasicOptions"
                               :label="item.value"
                               :key="index"
                               border>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
      <div class="left-toggle"
           @click="handleTogglePanel('left')">
        <span v-if="!hideLeftPanel">&lt;</span>
        <span v-else>&gt;</span>
      </div>
    </div>
    <div :class="hideRightPanel?'panel-r panel-r-hidden':'panel-r'">
      <div class="right-toggle"
           @click="handleTogglePanel('right')">
        <span v-if="!hideRightPanel">&gt;</span>
        <span v-else>&lt;</span>
      </div>
      <el-row :class="hideRightPanel?'panel-hidden':''">
        <el-col class="tab-col"
                :span="5">
          <div class="tab-wrap">
            <div v-for="(item,index) in typeMap"
                 :key="index"
                 :class="item.actived?'label-item actived':'label-item'"
                 @click="handleClickTypeMapLabel(item,index)"
                 @mouseover="handleMouseOverTypeMapLabel(item,index)"
                 @mouseout="handleMouseOutTypeMapLabel(item,index)">
              <img :src="item.actived?item.activedIcon:item.icon" />
              {{item.label}}
              <div class="tab-label">
                <img :src="item.actived?item.activedIcon:item.icon" />
                {{item.label}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="table-col"
                :span="5">
          <el-table @row-click="handleClickRow"
                    :data="jobBasicList"
                    stripe
                    border
                    size="small"
                    style="width: 100%">
            <el-table-column header-align="center"
                             align="center"
                             prop="id"
                             fixed
                             label="编号">
            </el-table-column>
            <el-table-column header-align="center"
                             align="center"
                             prop="name"
                             label="名称">
            </el-table-column>
          </el-table>
          <div v-for="(item,index) in videoMap"
               :key="index">
            <div style="text-align:right;"><img v-if="item.url"
                   :src="closeIcon"
                   @click="closeVideo(index)">
            </div>
            <video style="width:300px;height:150px;"
                   controls="controls"
                   autoplay
                   v-if="item.url"
                   :src="item.url"></video>
          </div>
        </el-col>

      </el-row>
    </div>
    <div id="mapDiv"></div>
  </div>
</template>
<script>
import job from '@/api/job.js'
import { TMap } from '@/utils/TMap.js'
import Monitor from './lib/Monitor'
export default {
  name: 'Apic',
  components: {
    Monitor
  },
  watch: {
  },
  data () {
    return {

      closeIcon: require('@/assets/global/close.png'),
      hideLeftPanel: false,
      hideRightPanel: false,
      moduleMap: [
        {
          name: 'job',
          label: '工程设施',
          icon: require('@/assets/job.png'),
          activedIcon: require('@/assets/job_actived.png'),
          hovered: false,
          actived: true
        },
        {
          name: 'monitor',
          label: '监测监控',
          icon: require('@/assets/monitor.png'),
          activedIcon: require('@/assets/monitor_actived.png'),
          hovered: false,
          actived: false
        },
        {
          name: 'special',
          label: '河长制专题',
          icon: require('@/assets/special.png'),
          activedIcon: require('@/assets/special_actived.png'),
          hovered: false,
          actived: false
        },
        {
          name: 'statistics',
          label: '统计分析',
          icon: require('@/assets/statistics.png'),
          activedIcon: require('@/assets/statistics_actived.png'),
          hovered: false,
          actived: false
        }
      ],

      typeMap: [
        {
          label: '水利基础',
          icon: require('@/assets/global/close.png'),
          activedIcon: require('@/assets/global/close_actived.png'),
          actived: true
        },
        {
          label: '水利工程',
          icon: require('@/assets/global/close.png'),
          activedIcon: require('@/assets/global/close_actived.png'),
          actived: false
        },
      ],

      labelHoverTip: false,

      // 地图对象
      tMap: {},

      videoMap: [
        {
          url: ''
        }
      ],

      maxVideoMap: [
        {
          url: ''
        }
      ],

      imgMap: [
        {
          url: ''
        }
      ],

      maxImgMap: [
        {
          url: ''
        }
      ],

      chartsMap: [
        {
          url: ''
        }
      ],

      maxChartsMap: [
        {
          url: ''
        }
      ],

      jobActiveNames: ['1', '2', '3', '4', '5'],
      monitorActiveNames: ['1'],
      specialActiveNames: ['1'],
      statisticsActiveNames: ['1'],

      // 接口返回列表数据
      jobBasicList: [],
      jobProjectList: [],
      jobMonitorList: [],
      jobVideoList: [],
      jobPublicList: [],

      // 不定项时，全选按钮状态
      jobBasicIsIndeterminate: false,
      jobProjectIsIndeterminate: false,
      jobMonitorIsIndeterminate: false,
      jobVideoIsIndeterminate: false,
      jobPublicIsIndeterminate: false,

      // 全选按钮状态
      jobBasicAllSelected: false,
      jobProjectAllSelected: false,
      jobMonitorAllSelected: false,
      jobVideoAllSelected: false,
      jobPublicAllSelected: false,

      // 左侧选择项
      jobBasicSelected: [],
      jobBasicRiverSelected: '0',
      jobProjectSelected: [],
      jobMonitorSelected: [],
      jobVideoSelected: [],
      jobPublicSelected: [],

      // 水利基础备选项
      jobBasicOptions: [{
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

      // 河流备选项
      jobBasicRiverOptions: [
        {
          value: '0',
          label: '默认'
        }, {
          value: '1',
          label: '市级'
        }, {
          value: '2',
          label: '区县'
        }, {
          value: '3',
          label: '乡镇'
        }, {
          value: '4',
          label: '村级'
        }
      ],

      // 水利工程备选项
      jobProjectOptions: [
        {
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

      // 水务监测站
      jobMonitorOptions: [
        {
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
        }
      ],

      // 视频监控
      jobVideoOptions: [
        {
          value: '1',
          label: '水文局'
        }, {
          value: '2',
          label: '环保局'
        }, {
          value: '3',
          label: '东江流域局'
        }
      ],

      // 视频监控
      jobPublicOptions: [
        {
          value: '1',
          label: '公示牌'
        }
      ],

      // 接口参数
      jobBasicParam: {
        types: []
      },
      jobBasicRiverParam: {
        types: undefined
      },
      jobProjectParam: {
        types: []
      },
      jobMonitorParam: {
        types: []
      },
      jobVideoParam: {
        types: []
      },
      jobPublicParam: {
        types: []
      },

      // 水利工程图标映射
      jobIconMap: {
        project: {
          '1': 'reservoir',
          '2': 'dam',
          '3': 'sluice',
          '4': 'pump'
        },
        monitor: {
          '1': 'reservoir',
          '2': 'rain',
          '3': 'quality',
          '4': 'section',
          '5': 'power'
        },
        video: {
          '1': 'hydrology',
          '2': 'protection',
          '3': 'djbasin'
        },
        public: {
          '1': 'public',
          '2': 'public2'
        }
      },
      // 水利基础配置项映射
      jobBasicOptionMap: {
        '1': {
          zoom: 8,
          lng: 114.754940,
          lat: 24.038940,
          options: {
            color: "blue",
            fillColor: "#FFFFFF",
            fillOpacity: 0.5
          }
        },
        '2': {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10
          }
        },
        '3': {
          zoom: 14,
          lng: 114.378230,
          lat: 23.082810,
          options: {
            color: "#FFFF00",
            fillColor: '#0000FF',
            fillOpacity: 0.5
          }
        },
        '4': {
          zoom: 15,
          lng: 114.377890,
          lat: 23.135820,
          options: {
            color: "#FF0000",
            opacity: 1,
            lineStyle: 'dashed'
          }
        },
        '5': {
          options: {
            color: "#0000FF",
            opacity: 0.5,
            weight: 10
          }
        }
      },
      toolbarMap: [
        {
          label: '点',
          icon: require('@/assets/map/tool/marker.png'),
          activedIcon: require('@/assets/map/tool/marker_actived.png'),
          actived: false,
          type: 'marker',
          handle: this.handleTool
        },
        {
          label: '线',
          icon: require('@/assets/map/tool/polyline.png'),
          activedIcon: require('@/assets/map/tool/polyline_actived.png'),
          actived: false,
          type: 'polyline',
          handle: this.handleTool
        },
        {
          label: '面',
          icon: require('@/assets/map/tool/polygon.png'),
          activedIcon: require('@/assets/map/tool/polygon_actived.png'),
          actived: false,
          type: 'polygon',
          handle: this.handleTool
        },
        {
          label: '矩形',
          icon: require('@/assets/map/tool/rect.png'),
          activedIcon: require('@/assets/map/tool/rect_actived.png'),
          actived: false,
          type: 'rect',
          handle: this.handleTool
        },
        {
          label: '圆',
          icon: require('@/assets/map/tool/circle.png'),
          activedIcon: require('@/assets/map/tool/circle_actived.png'),
          actived: false,
          type: 'circle',
          handle: this.handleTool
        },
        {
          label: '测距',
          icon: require('@/assets/map/tool/rangingline.png'),
          activedIcon: require('@/assets/map/tool/rangingline_actived.png'),
          actived: false,
          type: 'rangingline',
          handle: this.handleTool
        },
        {
          label: '测面',
          icon: require('@/assets/map/tool/ranginggon.png'),
          activedIcon: require('@/assets/map/tool/ranginggon_actived.png'),
          actived: false,
          type: 'ranginggon',
          handle: this.handleTool
        },
        {
          label: '清除',
          icon: require('@/assets/map/tool/clear.png'),
          activedIcon: require('@/assets/map/tool/clear_actived.png'),
          actived: false,
          handle: this.handleToolClear
        }
      ],
      resetMap: {
        icon: require('@/assets/map/tool/reset.png'),
        handle: this.handleResetMap
      }
    }
  },
  computed: {
    // 是否显示河流分级
    isRiver () {
      return this.jobBasicParam.types && this.jobBasicParam.types.indexOf('2') !== -1 ? true : false
    },
  },
  mounted () {
    this.initMap()
  },
  methods: {
    handleResetMap () {
      this.tMap.reset()
    },
    handleTool (type) {
      var that = this
      that.tMap.addTool(type, that.tMap.map)

      // 天地图绘制线的时候会获取window全局下的map，因此map赋给window
      window.map = that.tMap.map
    },

    handleToolClear () {
      var that = this
      that.tMap.clearTool()
    },

    handleClickRow (row) {
      var lnglat = row.lnglat ? row.lnglat : row.lnglatList[0]
      var lng = lnglat.split(',')[0]
      var lat = lnglat.split(',')[1]
      this.tMap.centerAndZoom(lng, lat)
    },
    closeVideo (index) {
      this.videoMap.splice(index, 1)
    },
    closeMaxVideo () {
      this.maxVideoMap[0].url = ''
    },
    closeImg (index) {
      this.imgMap.splice(index, 1)
    },
    closeMaxImg () {
      this.maxImgMap[0].url = ''
    },
    closeCharts (index) {
      this.chartsMap.splice(index, 1)
    },
    closeMaxCharts () {
      this.maxChartsMap[0].url = ''
    },
    handleTogglePanel (type) {
      if (type === 'left') {
        this.hideLeftPanel = !this.hideLeftPanel
      } else if (type === 'right') {
        this.hideRightPanel = !this.hideRightPanel
      }
    },

    initMap () {
      this.tMap = new TMap('mapDiv', T)
      this.tMap.vm = this
      this.tMap.addMapControl(['mapType', 'zoom', 'scale'])
    },

    // 模块标签改变事件
    handleClickModuleMapLabel (item, index) {
      for (var i in this.moduleMap) {
        var tempItem = this.moduleMap[i]

        if (tempItem.actived) {
          if (i !== index) {
            // 创建一个数组，用于存放旧的顶级模块的地图覆盖物
            this.tMap[tempItem.name + 'AllOverlays'] = this.tMap.getAllOverlays()
            this.tMap.clearOverLays()
          }
        }

        tempItem.actived = false
        tempItem.hovered = false
      }

      // 如果存在已有的覆盖物，则加载出原有的覆盖物
      var name = this.moduleMap[index].name

      // 重新设置顶级模块名，用于标注点点击弹窗正确获取映射的中文属性名称
      this.tMap.topModuleType = name
      if (this.tMap[name + 'AllOverlays'] && this.tMap[name + 'AllOverlays'].length) {
        for (var j in this.tMap[name + 'AllOverlays']) {
          var overlay = this.tMap[name + 'AllOverlays'][j]
          this.tMap.map.addOverLay(overlay)
        }
      }

      this.moduleMap[index].actived = true
      this.labelHoverTip = false
    },

    // 模块标签改变事件
    handleMouseOverModuleMapLabel (item, index) {
      if (!this.moduleMap[index].actived) {
        this.labelHoverTip = true
        // this.moduleMap[index].actived = true
        this.moduleMap[index].hovered = true
      }
    },

    // 模块标签改变事件
    handleMouseOutModuleMapLabel (item, index) {
      if (this.labelHoverTip) {
        // this.moduleMap[index].actived = false
        this.moduleMap[index].hovered = false
      }
      this.labelHoverTip = false
    },

    // 模块标签改变事件
    handleClickTypeMapLabel (item, index) {
      for (var i in this.typeMap) {
        var tempItem = this.typeMap[i]
        tempItem.actived = false
      }
      this.typeMap[index].actived = true
      this.labelHoverTip = false
    },

    // 模块标签改变事件
    handleMouseOverTypeMapLabel (item, index) {
      if (!this.typeMap[index].actived) {
        this.labelHoverTip = true
        this.typeMap[index].actived = true
      }
    },

    // 模块标签改变事件
    handleMouseOutTypeMapLabel (item, index) {
      if (this.labelHoverTip) {
        this.typeMap[index].actived = false
      }
      this.labelHoverTip = false
    },

    // 模块标签改变事件
    handleClickToolMapLabel (item, index) {
      for (var i in this.toolbarMap) {
        var tempItem = this.toolbarMap[i]
        tempItem.actived = false
      }
      this.toolbarMap[index].actived = true
      this.labelHoverTip = false

      // 执行地图工具方法
      item.handle(item.type)
    },

    // 模块标签改变事件
    handleMouseOverToolMapLabel (item, index) {
      if (!this.toolbarMap[index].actived) {
        this.labelHoverTip = true
        this.toolbarMap[index].actived = true
      }
    },

    // 模块标签改变事件
    handleMouseOutToolMapLabel (item, index) {
      if (this.labelHoverTip) {
        this.toolbarMap[index].actived = false
      }
      this.labelHoverTip = false
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
        that.jobBasicList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'basic'

        for (var i = 0; i < that.jobBasicList.length; i++) {
          var item = that.jobBasicList[i]
          var type = item.type
          var lnglatList = item.lnglatList

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'basic'

          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList)

          // 添加覆盖物并返回覆盖物
          var option = this.getOptionBytype(type)
          var method = this.getOverlayMethodBytype(type)
          var zoom = option && option.zoom ? option.zoom : that.tMap.zoom
          var lng = option && option.lng ? option.lng : that.tMap.lng
          var lat = option && option.lat ? option.lat : that.tMap.lat
          var options = option && option.options ? option.options : {}

          var overlay = that.tMap[method](points, item, options)

          that.tMap.centerAndZoom(lng, lat, zoom)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobBasicOverLays) {
            that.tMap.jobBasicOverLays = []
          }

          that.tMap.jobBasicOverLays.push(overlay)

          // 将水利河流覆盖物保存起来
          if (type === '2') {
            if (!that.tMap.jobBasicTopRiverOverLays) {
              that.tMap.jobBasicTopRiverOverLays = []
            }
            that.tMap.jobBasicTopRiverOverLays.push(overlay)
          }
        }
      })
    },

    // 获取分级河流数据
    getBasicRiverList () {
      var that = this

      var overLays, overlay, i
      // 1.先清除现有的水利基础的覆盖物
      if (that.tMap.jobBasicRiverOverLays && that.tMap.jobBasicRiverOverLays.length) {
        overLays = that.tMap.jobBasicRiverOverLays
        for (i = 0; i < overLays.length; i++) {
          overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobBasicRiverOverLays
      }

      if (that.tMap.jobBasicTopRiverOverLays && that.tMap.jobBasicTopRiverOverLays.length) {
        overLays = that.tMap.jobBasicTopRiverOverLays
        for (i in overLays) {
          overlay = overLays[i]

          // 如果是默认河流，则显示整条完整河流
          if (this.jobBasicRiverParam.type === '0') {
            that.tMap.addOverLay(overlay);
            return
          } else {
            that.tMap.removeOverLay(overlay)
          }
        }
      }


      // 2.再重新添加水利基础的覆盖物
      job['getBasicRiverList'](that.jobBasicRiverParam).then(response => {
        that.basicRiverList = response.data;
        for (var i = 0; i < that.basicRiverList.length; i++) {
          var item = that.basicRiverList[i]
          // var type = item.type
          var lnglatList = item.lnglatList
          // 构建坐标点列表
          var points = that.tMap.buildPoints(lnglatList)

          var option = this.getOptionBytype('5')
          var options = option && option.options ? option.options : {}

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'basic'

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

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'project'
        for (var i = 0; i < that.jobProjectList.length; i++) {
          var item = that.jobProjectList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'project'

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

      // 1.先清除现有的水务监测站的覆盖物
      if (that.tMap.jobMonitorOverLays && that.tMap.jobMonitorOverLays.length) {
        var overLays = that.tMap.jobMonitorOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobMonitorOverLays
      }
      job['getMonitorList'](that.jobMonitorParam).then(response => {
        that.jobMonitorList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置

        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'monitor'
        for (var i = 0; i < that.jobMonitorList.length; i++) {
          var item = that.jobMonitorList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'monitor'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobMonitorOverLays) {
            that.tMap.jobMonitorOverLays = []
          }
          that.tMap.jobMonitorOverLays.push(overlay)
        }
        // console.log(response.data);
      })
    },

    // 获取水务监测站数据
    getVideoList () {
      var that = this

      // 1.先清除现有的水务监测站的覆盖物
      if (that.tMap.jobVideoOverLays && that.tMap.jobVideoOverLays.length) {
        var overLays = that.tMap.jobVideoOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobVideoOverLays
      }
      job['getVideoList'](that.jobVideoParam).then(response => {
        that.jobVideoList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'video'

        for (var i = 0; i < that.jobVideoList.length; i++) {
          var item = that.jobVideoList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表
          var point = that.tMap.buildPoint(lnglat)
          var iconUrl = that.getIconBytype(that.tMap.moduleType, item.type)

          // 传递订住视频的方法
          that.tMap.nailVideoFun = this.nailVideo
          that.tMap.zoomVideoFun = this.zoomVideo

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'video'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobVideoOverLays) {
            that.tMap.jobVideoOverLays = []
          }
          that.tMap.jobVideoOverLays.push(overlay)
        }
        // console.log(response.data);
      })
    },

    // 订住视频
    nailVideo (url) {
      var item = {
        url: url
      }
      this.videoMap.push(item)
    },

    // 最大化视频
    zoomVideo (url) {
      var item = {
        url: url
      }
      this.maxVideoMap[0] = Object.assign(this.maxVideoMap[0], item)
    },

    // 订住图片
    nailImg (url) {
      var item = {
        url: url
      }
      this.imgMap.push(item)
    },

    // 最大化图片
    zoomImg (url) {
      var item = {
        url: url
      }
      this.maxImgMap[0] = Object.assign(this.maxImgMap[0], item)
    },

    // 最大化图形
    // 需要修改成echarts图形
    zoomCharts (data) {

      //测试用的图片
      var item = {
        url: require(`@/static/charts.png`)
      }

      this.maxChartsMap[0] = Object.assign(this.maxChartsMap[0], item)
    },

    // 获取水务监测站数据
    getPublicList () {
      var that = this

      // 1.先清除现有的水务监测站的覆盖物
      if (that.tMap.jobPublicOverLays && that.tMap.jobPublicOverLays.length) {
        var overLays = that.tMap.jobPublicOverLays
        for (var i = 0; i < overLays.length; i++) {
          var overlay = overLays[i]
          that.tMap.removeOverLay(overlay)
        }
        delete that.tMap.jobPublicOverLays
      }
      job['getPublicityList'](that.jobPublicParam).then(response => {
        that.jobPublicList = response.data;

        // 设置模块名称，用于区分窗口属性映射关系keyMap的设置
        that.tMap.topModuleType = 'job'
        that.tMap.moduleType = 'public'

        for (var i = 0; i < that.jobPublicList.length; i++) {
          var item = that.jobPublicList[i]
          var lnglat = item.lnglat
          // 构建坐标点列表

          var point = that.tMap.buildPoint(lnglat)

          // 通过判断实牌或者虚牌来获取不同的图标
          var publicType = item.isReal === '1' ? 1 : '2'
          var iconUrl = that.getIconBytype(that.tMap.moduleType, publicType)

          // 传递订住视频的方法
          that.tMap.nailImgFun = this.nailImg
          that.tMap.zoomImgFun = this.zoomImg

          // 为标注点的属性添加模块的名称，用于弹窗获取映射中文属性名，修复切换顶级模块后（没有重新设置moduleType，导致模块名不对应），弹窗内容显示的问题
          item.moduleType = 'public'

          // 添加覆盖物并返回覆盖物
          var overlay = that.tMap.addMarker(point, item, iconUrl)

          // 将水利基础覆盖物保存起来
          if (!that.tMap.jobPublicOverLays) {
            that.tMap.jobPublicOverLays = []
          }
          that.tMap.jobPublicOverLays.push(overlay)
        }
        // console.log(response.data);
      })
    },

    // 水利基础全选按钮事件
    handleJobBasicAllChange (val) {
      this.jobBasicSelected = [].concat()
      if (val) {
        for (var i in this.jobBasicOptions) {
          var item = this.jobBasicOptions[i]
          this.jobBasicSelected.push(item.value)
        }
      }
      this.jobBasicIsIndeterminate = false
      this.jobBasicParam.types = this.jobBasicSelected
      this.getBasicList()
    },

    // 水利基础选项改变事件
    handleJobBasicChange (val) {
      let checkedCount = val.length;
      this.jobBasicAllSelected = checkedCount === this.jobBasicOptions.length;
      this.jobBasicIsIndeterminate = checkedCount > 0 && checkedCount < this.jobBasicOptions.length;
      this.jobBasicParam.types = val
      this.getBasicList()
    },

    // 河流选项改变事件
    handleJobBasicRiverChange (val) {
      this.jobBasicRiverParam.type = val
      this.getBasicRiverList()
    },

    // 水利工程全选按钮事件
    handleJobProjectAllChange (val) {
      this.jobProjectSelected = [].concat()
      if (val) {
        for (var i in this.jobProjectOptions) {
          var item = this.jobProjectOptions[i]
          this.jobProjectSelected.push(item.value)
        }
      }
      this.jobProjectIsIndeterminate = false
      this.jobProjectParam.types = this.jobProjectSelected
      this.getProjectList()
    },

    // 水利工程选项改变事件
    handleJobProjectChange (val) {
      let checkedCount = val.length;
      this.jobProjectAllSelected = checkedCount === this.jobProjectOptions.length;
      this.jobProjectIsIndeterminate = checkedCount > 0 && checkedCount < this.jobProjectOptions.length;
      this.jobProjectParam.types = val
      this.getProjectList()
    },

    // 水务监测站全选按钮事件
    handleJobMonitorAllChange (val) {
      this.jobMonitorSelected = [].concat()
      if (val) {
        for (var i in this.jobMonitorOptions) {
          var item = this.jobMonitorOptions[i]
          this.jobMonitorSelected.push(item.value)
        }
      }
      this.jobMonitorIsIndeterminate = false
      this.jobMonitorParam.types = this.jobMonitorSelected
      this.getMonitorList()
    },

    handleJobMonitorChange (val) {
      let checkedCount = val.length;
      this.jobMonitorAllSelected = checkedCount === this.jobMonitorOptions.length;
      this.jobMonitorIsIndeterminate = checkedCount > 0 && checkedCount < this.jobMonitorOptions.length;
      this.jobMonitorParam.types = val
      this.getMonitorList()
    },

    // 水利工程全选按钮事件
    handleJobVideoAllChange (val) {
      this.jobVideoSelected = [].concat()
      if (val) {
        for (var i in this.jobVideoOptions) {
          var item = this.jobVideoOptions[i]
          this.jobVideoSelected.push(item.value)
        }
      }
      this.jobVideoIsIndeterminate = false
      this.jobVideoParam.types = this.jobVideoSelected
      this.getVideoList()
    },

    handleJobVideoChange (val) {
      let checkedCount = val.length;
      this.jobVideoAllSelected = checkedCount === this.jobVideoOptions.length;
      this.jobVideoIsIndeterminate = checkedCount > 0 && checkedCount < this.jobVideoOptions.length;
      this.jobVideoParam.types = val
      this.getVideoList()
    },

    // 水利工程全选按钮事件
    handleJobPublicAllChange (val) {
      this.jobPublicSelected = [].concat()
      if (val) {
        for (var i in this.jobPublicOptions) {
          var item = this.jobPublicOptions[i]
          this.jobPublicSelected.push(item.value)
        }
      }
      this.jobPublicIsIndeterminate = false
      this.jobPublicParam.types = this.jobPublicSelected
      this.getPublicList()
    },

    handleJobPublicChange (val) {
      let checkedCount = val.length;
      this.jobPublicAllSelected = checkedCount === this.jobPublicOptions.length;
      this.jobPublicIsIndeterminate = checkedCount > 0 && checkedCount < this.jobPublicOptions.length;
      this.jobPublicParam.types = val
      this.getPublicList()
    },

    // 根据类别获取图标
    getIconBytype (moduleType, type) {
      return this.jobIconMap[moduleType][type]
    },

    // 根据水利基础类别获取覆盖物样式
    getOptionBytype (type) {
      return this.jobBasicOptionMap[type]
    },

    // 根据水利基础类别获取覆盖物类型
    getOverlayMethodBytype (type) {
      if (type === '1' || type === '3') {
        return 'addPolygon'
      } else if (type === '2' || type === '4') {
        return 'addPolyline'
      }
    }
  }
}
</script>
<style lang="scss">
.a-pic {
  .map-reset {
    position: absolute;
    right: 370px;
    top: 45px;
    z-index: 1001;
    cursor: pointer;
  }
  .toolbar-wrap {
    z-index: 1000;
    .toolbar {
      position: absolute;
      right: 400px;
      top: 30px;
      width: auto;
      height: auto;
      z-index: 1000;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      align-content: center;
      background: #ffffff;
      box-shadow: 0 0 5px 3px #cccccc;
      border-radius: 2px;
      .tool:hover {
        background: #2380e8;
        color: #ffffff;
      }
      .tool.actived {
        color: #ffffff;
        background: #2380e8;
        border-radius: 2px;
      }

      // .tool::after {
      //   content: "|";
      //   display: table-cell;
      //   vertical-align: middle;
      //   position: absolute;
      //   right: 0;
      //   top: center;
      //   color: #cccccc;
      // }

      .tool i {
        font-style: normal;
        display: table-cell;
        vertical-align: middle;
        position: absolute;
        right: -2px;
        top: 15px;
        color: #cccccc;
      }

      .tool {
        order: 1;
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: auto;
        flex: 0 1 auto;
        align-self: auto;

        text-align: center;

        display: table;
        padding: 15px 15px;

        position: relative;

        cursor: pointer;
        img {
          display: table-cell;
          vertical-align: middle;
          margin-right: 5px;
        }

        span {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
  }

  .max-media {
    overflow: hidden;
    z-index: 1001;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    // width: auto;
    height: auto;
    max-width: 1366px;
    // max-height: 768px;
    display: flex;
    justify-content: center;
    align-items: center;
    .media-container {
      margin: 0 auto;
      text-align: center;
      .media-wrap {
        position: relative;
        .media-close {
          text-align: right;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 10;
          img {
            width: 50px;
            height: 50px;
          }
        }
        video {
          height: inherit;
          width: inherit;
        }
        img {
          height: inherit;
          width: inherit;
        }
      }
    }
  }

  #mapDiv {
    position: absolute;
    width: calc(100vw);
    height: 100%;
  }

  .panel-l-hidden {
    left: -400px !important;
  }

  .panel-r-hidden {
    // right: -350px !important;
  }

  .panel-hidden {
    display: none;
  }

  .panel-l {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 400px;
    background: #ffffff;
    z-index: 1000;
    border-right: 1px solid #e7e7e7;

    .left-toggle {
      position: absolute;
      right: -20px;
      bottom: 90px;
      width: 20px;
      height: 90px;
      background: #ffffff;
      border-radius: 0 3px 3px 0;
      display: table;
      box-shadow: 1px 0 2px #e7e7e7;
      cursor: pointer;
      span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        color: #aaaaaa;
        font-size: 16px;
      }
    }
    .el-row {
      height: inherit;
      .el-col.label-col {
        height: inherit;
        width: 54px;
        .label-wrap {
          height: inherit;
          overflow-y: hidden;
          border-right: 1px solid #ebebeb;
          .label-item {
            writing-mode: vertical-rl;
            letter-spacing: 3px;
            font-size: 17px;
            text-align: center;
            padding: 20px 15px;
            cursor: pointer;
            border-bottom: 1px solid #ebebeb;
            font-weight: bold;
            color: #434343;
          }
          .label-item:hover {
            color: #ffffff;
            background: #2380e8;
          }
          .label-item.actived {
            color: #ffffff;
            background: #2380e8;
          }
        }
      }

      .el-col.collapse-col {
        height: inherit;
        width: 346px;
        overflow-y: auto;
        .el-collapse {
          .el-collapse-item {
            .el-collapse-item__header {
              letter-spacing: 2px;
              padding-left: 1em;
              font-size: 17px;
              font-weight: bold;
              color: #434343;
            }
            .el-collapse-item__wrap {
              .el-collapse-item__content {
                overflow: hidden;
                padding-bottom: 5px;
                .el-checkbox {
                  float: left;
                  margin-left: 10px;
                  margin-bottom: 10px;
                  margin-right: 0;
                  padding: 6.5px 15px 6.5px 15px;
                  height: 34px;
                  .el-checkbox__input {
                    display: none;
                  }
                  .el-checkbox__label {
                    padding-left: 0;
                    font-size: 15px;
                  }
                }
                .el-checkbox.is-checked::before {
                  content: "\2714";
                  font-size: 10px;
                  height: 10px;
                  position: absolute;
                  color: #ffffff;
                  right: 0;
                  bottom: 2px;
                  z-index: 10;
                }
                .el-checkbox.is-checked::after {
                  content: "";
                  width: 0;
                  height: 0;
                  border-bottom: 12px solid #0f89e5;
                  border-left: 15px solid transparent;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }

                .river-level {
                  clear: left;
                  text-indent: 1em;
                }

                .el-radio {
                  margin-left: 10px;
                  margin-bottom: 10px;
                  margin-right: 0;
                  padding-left: 15px;
                  .el-radio__input {
                    display: none;
                  }
                  .el-radio__label {
                    padding-left: 0;
                  }
                }

                .el-radio.is-checked::before {
                  content: "\2714";
                  font-size: 10px;
                  height: 10px;
                  position: absolute;
                  color: #ffffff;
                  right: 0;
                  bottom: 0px;
                  z-index: 10;
                }
                .el-radio.is-checked::after {
                  content: "";
                  width: 0;
                  height: 0;
                  border-bottom: 12px solid #0f89e5;
                  border-left: 15px solid transparent;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .panel-r {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: auto;
    background: #ffffff;
    z-index: 1000;

    .right-toggle {
      position: absolute;
      left: -20px;
      bottom: 90px;
      width: 20px;
      height: 90px;
      background: #ffffff;
      border-radius: 0 3px 3px 0;
      display: table;
      box-shadow: 1px 0 2px #e7e7e7;
      cursor: pointer;
      span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        color: #aaaaaa;
        font-size: 16px;
      }
    }

    .el-row {
      height: inherit;
      .el-col.tab-col {
        height: inherit;
        width: 35px;
        .tab-wrap {
          height: inherit;
          overflow: hidden;
          border-right: 1px solid #ebebeb;
          width: inherit;
          .label-item {
            width: inherit;
            writing-mode: vertical-rl;
            letter-spacing: 3px;
            font-size: 14px;
            text-align: center;
            padding: 20px 3px;
            cursor: pointer;
            font-weight: bold;
            color: #434343;
            position: relative;

            .tab-label {
              position: absolute;
              top: 0;
              left: -10px;
              width: inherit;
              writing-mode: vertical-rl;
              letter-spacing: 3px;
              font-size: 14px;
              text-align: center;
              padding: 20px 3px;
              cursor: pointer;
              z-index: 10;
            }
          }
          .label-item:hover {
            color: #ffffff;
          }
          .label-item.actived {
            color: #ffffff;
          }

          .label-item.actived::before {
            content: "一二三四五";
            padding: 20px 0;
            width: 0;
            border-bottom: 25px solid transparent;
            border-top: 25px solid transparent;
            border-right: 40px solid #2380e8;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
          }
          .label-item::before {
            content: "一二三四五";
            padding: 20px 0;
            width: 0;
            border-bottom: 25px solid transparent;
            border-top: 25px solid transparent;
            border-right: 40px solid #e8e8e8;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
          }
        }
      }
      .el-col.table-col {
        height: inherit;
        width: 315px;
        padding: 10px;
      }
    }
  }

  .el-radio--small.is-bordered {
    margin-left: 10px;
  }
}
</style>
