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
    // 用于存放当前弹窗对象的数组
    this.currentInfoWinArr = []
    map = this.map
  }
  centerAndZoom(lng, lat, zoom) {
    this.map.centerAndZoom(new T.LngLat(lng, lat), zoom);
  }

  // 添加标注
  addMarker(point, data, iconUrl) {
    debugger
    //创建图片对象
    map.centerAndZoom(point, 12);
    var icon = new T.Icon({
      iconUrl: "http://api.tianditu.gov.cn/img/map/markerA.png",
      iconSize: new T.Point(19, 27),
      iconAnchor: new T.Point(10, 25)
    });
    //创建标注对象
    var marker = new T.Marker(point, {
      icon: icon
    });
    //向地图上添加标注
    map.addOverLay(marker);
    return marker
  }

  // 添加线
  addPolyline(points, data) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建线对象
    var line = new T.Polyline(points, {
      color: "blue",
      weight: 10,
      opacity: 0.5,
      fillColor: "#FFFFFF",
      fillOpacity: 0.5
    });
    // 添加线点击事件
    var that = this
    line.addEventListener("click", function (e) {
      that.polyClickHandle(e, data)
    });
    //向地图上添加线
    map.addOverLay(line);

    return line
  }

  // 添加面
  addPolygon(points, data) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建面对象
    var polygon = new T.Polygon(points, {
      color: "blue",
      weight: 3,
      opacity: 0.5,
      fillColor: "#FFFFFF",
      fillOpacity: 0.5
    });
    // 添加面点击事件
    var that = this
    polygon.addEventListener("click", function (e) {
      that.polyClickHandle(e, data)
    });
    //向地图上添加面
    map.addOverLay(polygon);
    return polygon
  }

  // 添加信息窗口
  addInfoWindow(lng, lat, data) {
    var lnglat = new T.LngLat(lng, lat);
    var infoWin = new T.InfoWindow();
    // 保存信息弹窗到弹窗数组中，用于清除弹窗覆盖物使用
    this.currentInfoWinArr.push(infoWin)
    infoWin.setLngLat(lnglat);
    var content = this.buildInfoWinContent(data)
    //设置信息窗口要显示的内容
    infoWin.setContent(content);
    //向地图上添加信息窗口
    map.addOverLay(infoWin);
  }

  // 构建弹窗内容
  buildInfoWinContent(data) {
    var html = ''
    for (var key in data) {
      var val = data[key]
      html += `<div><span>${key}:</span><span>${val}</span></div>`
    }
    return html
  }

  // 清除覆盖物
  clearOverLays() {
    map.clearOverLays();
  }

  removeOverLay(overLay) {
    map.clearOverLays(overLay);
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

  // 创建坐标点
  buildPoint(lnglatStr) {
    var lnglat = lnglatStr.split(',')
    var point = new T.LngLat(lnglat[0], lnglat[1])
    return point
  }

  // 覆盖物点击事件
  polyClickHandle(e, data) {
    var lngLat = e.lnglat
    if (lngLat) {
      var lng = lngLat.lng
      var lat = lngLat.lat
    }
    // 先判断是否已经有弹窗，有的话，先清除弹窗
    if (this.currentInfoWinArr.length) {
      map.removeOverLay(this.currentInfoWinArr[0], this.addInfoWindow(lng, lat, data));
      this.currentInfoWinArr.splice(0, 1)
    } else {
      this.addInfoWindow(lng, lat, data)
    }
  }
}
export {
  TMap
};