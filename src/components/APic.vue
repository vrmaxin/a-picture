<template>
  <div>
    <div class="panel">
      <div v-for="(item,index) in checkedList"
           :key="index">
        <el-checkbox v-model="item.value"
                     :label="item.label"
                     border></el-checkbox>
      </div>
    </div>
    <div id="mapDiv"></div>
  </div>
</template>
<script>
import job from '@/api/job.js'
import { TMap } from '@/utils/TMap.js'
import { debug, debuglog } from 'util';
export default {
  name: 'Apic',
  data () {
    return {
      tMap: {},
      basicList: [],
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checkedList: [
        {
          label: '流域边界',
          value: false
        },
        {
          label: '河流',
          value: false
        },
        {
          label: '湖泊',
          value: false
        },
        {
          label: '红线',
          value: false
        }
      ]
    }
  },
  mounted () {
    this.initMap()
    this.getList()
  },
  methods: {
    initMap () {
      this.tMap = new TMap('mapDiv', T)
      this.tMap.addMarker()
    },
    getList () {
      var that = this
      job['getBasicList']().then(response => {
        that.basicList = response.data;
        for (var i = 0; i < that.basicList.length; i++) {
          var item = that.basicList[i]
          var lnglatList = item.lnglatList
          var points = that.tMap.buildPoints(lnglatList)
          that.tMap.addPolyline(points)
        }
        console.log(response.data);
      })
    }
  }
}
</script>
<style lang="scss">
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
  width: 200px;
  background: #ffffff;
  z-index: 1000;
}
</style>
