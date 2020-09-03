//app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'moviemovie-jo2oi'
    })
  },
  globalData: {
    userInfo: null,
    videourl: ''//播放地址
  }
})