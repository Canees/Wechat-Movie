// pages/lookvideo/index.js
const app = getApp()
Page({
  data: {
    videodata: '',
    videolist: []
  },
  onLoad: function () {
    const data = app.globalData.videourl
    if (data.length > 0) {
      data.forEach((el, index) => {
        if (index == 0) {
          el.check = true
        } else {
          el.check = false
        }
      })
      this.setData({
        videolist: data
      })
      // 需要默认一组
      this.parsePlayurl(data[0])
    } else {
      wx.showToast({
        title: '不用看了，肯定数据出错了',
        icon: 'none',
        success: () => {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },
  // 单个点击
  clickItem(e) {
    const item = e.currentTarget.dataset.item
    const ids = e.currentTarget.dataset.index
    const db = this.data.videolist
    this.parsePlayurl(item)
    // 选中状态
    db.forEach((el, id) => {
      if (id == ids) {
        el.check = true
      } else {
        el.check = false
      }
    })
    this.setData({
      videolist: db
    })
  },
  // 解析视频m3u8地址
  parsePlayurl(item) {
    // 解析单个视频m3u8地址
    wx.cloud.callFunction({
      name: 'parseMovieitem2Url',
      data: item,
      success: res => {
        if (res.result.static == 200) {
          this.setData({
            videodata: res.result.data
          })
        } else {
          wx.showToast({
            title: '链接解析错误',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
    // 动态设置nav
    wx.setNavigationBarTitle({
      title: item.name
    })
  },
  rgb256() {//rgb颜色随机
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = '(' + r + ',' + g + ',' + b + ')';
    return rgb;
  },
  color16() {//十六进制颜色随机
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  }
})