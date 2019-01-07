// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '池思敏',
    usertel: '15068676937',
    useraddress: '浙江省 宁波市 鄞州区 首南街道 ',
    useraddressxiangxi:'浙江大学宁波理工学院',
    typeadd:'add',
    typealter:'alter'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addressadd: function(e) {e.target.dataset.lx
    var that = this;
    wx.navigateTo({
      url: '/pages/addressadd/addressadd?information=' + JSON.stringify({
        username:that.data.username,
        usertel:that.data.usertel,
        useraddress:that.data.useraddress,
        useraddressxiangxi:that.data.useraddressxiangxi,
        type:e.target.dataset.lx
      }),
    })
  }
})