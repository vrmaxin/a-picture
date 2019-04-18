/* eslint-disable no-redeclare */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import {
  getkeyMapByModuleType
} from './keyMap'
var T
var map
class TMap {
  // 构造
  constructor(el, obj) {
    T = obj
    this.lng = 114.40
    this.lat = 23.09
    this.zoom = 12
    this.map = new T.Map(el);
    this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), this.zoom);
    // 用于存放当前弹窗对象的数组
    this.currentInfoWinArr = []
    map = this.map

    map.addEventListener("zoomend", this.mapZoomend);
    map.addEventListener("addoverlay", this.mapAddoverlay);
  }

  setViewport(pointsArr) {
    //显示最佳比例尺
    map.setViewport(pointsArr);
  }

  mapAddoverlay(param) {
    var type = param.type
    var target = param.target
    var addoverlay = param.addoverlay
  }

  getAllOverlays() {
    return map.getOverlays()
  }

  reset() {
    this.centerAndZoom(this.lng, this.lat, this.zoom)
  }

  mapZoomend(type, target) {
    this.zoom = map.getZoom()
    var overlays = map.getOverlays()
    for (var i in overlays) {
      var overlay = overlays[i]
      var overlayType = overlay.getType()
      if (overlayType === 2) {
        var icon = overlay.getIcon()
        var x = 20,
          y = 20
        if (this.zoom > 12) {
          x = 32
          y = 32
        } else if (this.zoom <= 10) {
          x = 10
          y = 10
        }
        // 设置大图标
        icon.setIconSize(new T.Point(x, y))
      }
    }
  }

  centerAndZoom(lng, lat, zoom) {
    if (!zoom) {
      zoom = map.getZoom()
    }
    this.map.centerAndZoom(new T.LngLat(lng, lat), zoom);
  }

  setZoom(zoom) {
    this.map.setZoom(zoom);
  }

  // 添加标注
  addMarker(point, data, iconUrl) {
    //创建图片对象
    this.map.centerAndZoom(point);

    var marker
    var options = {}
    if (iconUrl) {
      var icon = new T.Icon({
        iconUrl: require(`@/assets/${this.topModuleType}/${this.moduleType}/${iconUrl}.png`)
      });
      options = {
        icon: icon
      }
    }

    //创建标注对象
    marker = new T.Marker(point, options);

    // 添加标注点击事件
    var that = this
    marker.addEventListener("click", function (e) {
      that.polyClickHandle(e, data)
    });

    //向地图上添加标注
    map.addOverLay(marker);
    return marker
  }

  // 添加覆盖物
  addOverLay(overLay) {
    map.addOverLay(overLay);
  }

  // 添加线
  addPolyline(points, data, options) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建线对象
    var line = new T.Polyline(points, options);
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
  addPolygon(points, data, options) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建面对象
    var polygon = new T.Polygon(points, options);
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
    if (data.isVideo) {
      var val = data.videoUrl
      this.currentMediaType = 'video'
      this.videoPath = require(`@/static/${val}`)
      var videoPath = require(`@/static/${val}`)
      var zoomImgPath = require(`@/assets/global/zoom.png`)
      var nailImgPath = require(`@/assets/global/nail.png`)
      // 暂时隐藏视频
      html += `<div><video style="width:300px;height:150px;" controls="controls" autoplay src=${videoPath}></video></div>`
      html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><img style="cursor:pointer;" title="videoPath" id="zoomBtn" src=${zoomImgPath}><img style="cursor:pointer;" title="videoPath" id="nailBtn" src=${nailImgPath}></div></div>`
    } else {

      for (var key in data) {
        var val = data[key]
        // 使用data的moduleType属性获取模块类型
        var keyMap = getkeyMapByModuleType(this.topModuleType, data.moduleType)
        if (keyMap && keyMap[key]) {
          if (typeof val == "object" && Object.prototype.toString.call(val).toLowerCase() == "[object object]" && !val.length) {
            var subKeyMap = keyMap[key]
            var subData = val
            for (var subKey in subData) {
              var subVal = subData[subKey]
              if (subKeyMap && subKeyMap[subKey]) {
                html += `<div><strong>${subKeyMap[subKey]}:</strong><span>${subVal}</span></div>`
              }
            }
          } else {
            if (key === 'videoUrl') {
              this.currentMediaType = 'video'
              this.videoPath = require(`@/static/${val}`)
              var videoPath = require(`@/static/${val}`)
              var zoomImgPath = require(`@/assets/global/zoom.png`)
              var nailImgPath = require(`@/assets/global/nail.png`)
              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">查看</span></div></div>`
            } else if (key === 'imgUrl') {
              this.currentMediaType = 'img'
              this.imgPath = require(`@/static/${val}`)
              var imgPath = require(`@/static/${val}`)
              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">查看</span></div></div>`
            } else if (key === 'widthCharts') {
              this.currentMediaType = 'charts'

              // 记录标注点的id，用于获取一周的数据，用于图形展示
              this.dataForCharts = Object.assign({}, data)

              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">趋势图</span></div></div>`
            } else {
              html += `<div><strong>${keyMap[key]}:</strong><span>${val}</span></div>`
            }
          }
        }
      }
    }
    var that = this
    that.vm.$nextTick(() => {

      // 订住按钮添加点击事件
      var nailDom = document.getElementById('nailBtn')
      if (nailDom) {
        nailDom.addEventListener('click', function () {
          if (that.currentMediaType === 'video' && that.videoPath) {
            that.vm.nailVideo(that.videoPath)
          } else if (that.currentMediaType === 'img' && that.imgPath) {
            that.vm.nailImg(that.imgPath)
          }
        })
      }

      // 缩放按钮添加点击事件
      var zoomDom = document.getElementById('zoomBtn')
      if (zoomDom) {
        zoomDom.addEventListener('click', function () {
          if (that.currentMediaType === 'video' && that.videoPath) {
            that.vm.zoomVideo(that.videoPath)
          } else if (that.currentMediaType === 'img' && that.imgPath) {
            that.vm.zoomImg(that.imgPath)
          } else if (that.currentMediaType === 'charts' && that.dataForCharts) {
            that.vm.zoomCharts(that.dataForCharts)
          }
        })
      }
    })

    return html
  }

  // 清除覆盖物
  clearOverLays() {
    map.clearOverLays();
  }

  removeOverLay(overLay) {
    map.removeOverLay(overLay);
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

  addMapControl(arr) {
    if (arr.indexOf('mapType') !== -1) {
      //创建对象
      var ctrl = new T.Control.MapType();
      //添加控件
      map.addControl(ctrl);
    }
    if (arr.indexOf('zoom') !== -1) {
      //创建缩放平移控件对象
      var control = new T.Control.Zoom();
      //添加缩放平移控件
      map.addControl(control);
    }

    if (arr.indexOf('scale') !== -1) {
      //创建比例尺控件对象
      var scale = new T.Control.Scale();
      //添加比例尺控件
      map.addControl(scale);
    }
  }


  addTool(type, map) {
    if (this.toolHandler) {
      this.toolHandler.close();
    }

    if (!this.toolHandlerArr) {
      this.toolHandlerArr = []
    }

    if (type === 'marker') {
      // 创建标注工具对象
      var markerTool = new T.MarkTool(this.map, {
        follow: true
      });
      this.toolHandler = markerTool
    } else if (type === 'polyline') {
      // //创建画线工具对象
      var lineTool = new T.PolylineTool(this.map, {
        showLabel: false
      });
      this.toolHandler = lineTool
    } else if (type === 'polygon') {
      //创建画线工具对象
      var polygonTool = new T.PolygonTool(this.map);
      this.toolHandler = polygonTool
    } else if (type === 'rect') {
      // 创建矩形工具对象
      var rectTool = new T.RectangleTool(this.map);
      this.toolHandler = rectTool
    } else if (type === 'circle') {
      //创建画圆工具对象
      var circleTool = new T.CircleTool(this.map);
      this.toolHandler = circleTool
    } else if (type === 'rangingline') {
      //创建画线工具对象
      var lineTool = new T.PolylineTool(this.map, {
        showLabel: true
      });
      this.toolHandler = lineTool
    } else if (type === 'ranginggon') {
      //创建多边形工具对象
      var polygonTool = new T.PolygonTool(this.map, {
        showLabel: true
      });
      this.toolHandler = polygonTool
    }

    this.toolHandlerArr.push(this.toolHandler)

    this.toolHandler.open()
  }

  clearTool() {
    if (this.toolHandlerArr) {
      for (var i in this.toolHandlerArr) {
        var item = this.toolHandlerArr[i]
        item.clear()
      }
    }
  }

}
export {
  TMap
};