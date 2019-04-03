/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
var T
var map
class TMap {
  // 构造
  constructor(el, obj) {
    T = obj
    this.zoom = 12
    this.lng = 114.40
    this.lat = 23.09
    this.map = new T.Map(el);
    this.map.centerAndZoom(new T.LngLat(114.40, 23.09), this.zoom);

    map = this.map
  }
  centerAndZoom(lng, lat, zoom) {
    this.map.centerAndZoom(new T.LngLat(lng, lat), zoom);
  }

  // 添加标注
  addMarker() {
    //创建图片对象
    map.centerAndZoom(new T.LngLat(114.40, 23.09), 12);
    var icon = new T.Icon({
      iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
      iconSize: new T.Point(19, 27),
      iconAnchor: new T.Point(10, 25)
    });
    //创建标注对象
    var marker = new T.Marker(new T.LngLat(114.40, 23.09), {
      icon: icon
    });
    //向地图上添加标注
    map.addOverLay(marker);
  }

  // 添加线
  addPolyline(points) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建线对象
    var line = new T.Polyline(points,{
      color: "blue",
      weight: 10,
      opacity: 0.5,
      fillColor: "#FFFFFF",
      fillOpacity: 0.5
    });
    //向地图上添加线
    map.addOverLay(line);
  }

  // 添加面
  addPolygon(points) {
    //创建面对象
    var polygon = new T.Polygon(points, {
      color: "blue",
      weight: 3,
      opacity: 0.5,
      fillColor: "#FFFFFF",
      fillOpacity: 0.5
    });
    //向地图上添加面
    map.addOverLay(polygon);
  }

  // 添加信息窗口
  addInfoWindow(lng, lat) {
    var lnglat = new T.LngLat(lng, lat);
    var infoWin = new T.InfoWindow();
    infoWin.setLngLat(lnglat);
    //设置信息窗口要显示的内容
    infoWin.setContent("<div>添加的</div>信息窗口<br>asdasd");
    //向地图上添加信息窗口
    map.addOverLay(infoWin);
  }

  // 清除覆盖物
  clearOverLays() {
    map.clearOverLays();
  }

  //创建坐标点集合
  buildPoints(list) {
    var points = [];
    for (var i = 0; i < list.length; i++) {
      var lnglatStr = list[i]
      var lnglat = lnglatStr.split(',')
      points.push(new T.LngLat(lnglat[0], lnglat[1]));
    }
    return points
  }
}
export {
  TMap
};