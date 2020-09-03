const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    poplist: [],// 泡泡
    usertext: '',//字段
    videolist: [],//查找到的视频
  },
  // 随机设置泡泡样式
  randomStyle() {
    // 个数随机、10之间
    const num = (Math.random() * 10) + 3 //随机1-10个泡泡
    let poplist = []
    for (let i = 0; i < num; i++) {
      poplist.push({
        width: Math.floor((Math.random() * 150) + 50),
        height: Math.floor((Math.random() * 150) + 50),
        top: Math.floor((Math.random() * 80)),
        left: Math.floor((Math.random() * 80)),
        opcaticy: Math.random() - 0.4
      })
    }
    this.setData({
      poplist: poplist
    })
  },
  // 搜索视频list
  searchVideoList() {
    const txt = this.data.usertext
    if (txt) {
      wx.showLoading({
        title: '搜索中...',
        mask: true
      })
      // 1.解析到视频相关列表
      wx.cloud.callFunction({
        name: 'ParseMovieList',
        data: {
          name: txt
        },
        success: res => {
          if (res.result.static == 200) {
            this.setData({
              videolist: res.result.data
            })
            console.log('解析到的视频列表', res.result.data)
          } else {
            wx.showToast({
              title: res.result.data,
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
    } else[
      wx.showToast({
        title: '乱点个啥?',
        icon: 'none'
      })
    ]
  },
  // 用户输入
  userinput(e) {
    this.setData({
      usertext: e.detail.value
    })
  },
  // 清空list
  closemodel() {
    this.setData({
      videolist: []
    })
  },
  // 跳转单个视频listitem
  LKvideo(e) {
    const item = e.currentTarget.dataset.item
    wx.showLoading({
      title: '解析中...',
      icon: 'none'
    })
    // 单个解析视频剧集
    wx.cloud.callFunction({
      name: 'parseMovieItem',
      data: item,
      success: res => {
        if (res.result && res.result.static == 200) {
          // 存app 
          app.globalData.videourl = res.result.data
          // 页面跳转
          wx.navigateTo({
            url: '../lookvideo/index',
          })
        } else {
          wx.showToast({
            title: '解析错误',
            icon: 'none'
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  onLoad: function () {
    // 生成气泡
    // setInterval(()=>{
    //   this.randomStyle()
    // },600)
  }
})