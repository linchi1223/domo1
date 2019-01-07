//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    address: 'https://tooth.vverp.com'
  },
  //获取用户信息no3
  setUserInfo: function (userInfo) {
    wx.request({
      url: this.globalData.address + '/api/wechat/setUserInfo.html',
      data: {
        userInfo: userInfo,
        openid: this.globalData.openId,
      }
    })
  },


  // 获取用户信息no2
  getUserInfo: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            //  withCredentials: true,
            //  lang: '',
            success: function (res) {
              this.globalData.userInfo = res.userInfo
              this.setUserInfo(res.userInfo)
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },






  //用户登入no1
  userLogin: function () {
    var that = this;
    wx.login({ //微信登入
      success: function (res) {
        wx.request({ //发送请求
          url: that.globalData.address + '/api/user/login.html',
          data: {
            code: res.code,
            inviteCode: inviteCode
          },
          success: function (res) {
            that.globalData.openId = res.data.data.openid;
            that.globalData.inviteCode = res.data.data.inviteCode;
            this.globalData.isNew = res.data.data.isNew;
            this.getUserInfo() //调用app.js26的行代码//??this
            if (this.openIdReadyCallback) {
              /*1. 方法如果定义了，则说明page.onload比当前方法运行的早（page已经完成初始化），
              app的globalData还没有数据，通过此回调可以及时的刷新数据
              2. 方法如果没有定义，则说明page.onload比当前方法运行的晚（page还没有初始化），
              app的globalData是有值的，可以在page.onload中取globalData里面的值
              */
              if (that.globalData.openId) {
                this.openIdReadyCallback(res)
              }
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
    })
  }
})