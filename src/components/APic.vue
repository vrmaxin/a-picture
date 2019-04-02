<template>
  <div>
    <div id="mapDiv"></div>
  </div>
</template>
<script>
export default {
  name: 'Apic',
  data () {
    return {
      map: {},
      zoom: 12
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new T.Map('mapDiv');
      this.map.centerAndZoom(new T.LngLat(116.40769, 39.89945), this.zoom);
    }
  }
}
</script>
<style lang="scss">
#mapDiv {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
