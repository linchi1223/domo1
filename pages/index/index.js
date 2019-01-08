// pages/ok/ok.js
var app = getApp();
Page({

  data: {
    title:'推荐商品',
    swiperCurrent: 0, //轮播图圈圈在那个位置
    // banners: [{
    //     "id": 0,
    //     "path": '/img/4.png',
    //     "url": null,
    //     "goodsId": "311",
    //     "sn": "2018120324139",
    //     "isExhibition": false
    //   },

    //   {
    //     "id": 1,
    //     "path": '/img/1.png',
    //     "url": null,
    //     "goodsId": "312",
    //     "sn": "2018121324240",
    //     "isExhibition": false
    //   },
    //   {
    //     "id": 2,
    //     "path": '/img/2.png',
    //     "url": null,
    //     "goodsId": "163",
    //     "sn": "2018080721716",
    //     "isExhibition": false
    //   },
    //   {
    //     "id": 3,
    //     "path": '/img/3.png',
    //     "url": null,
    //     "goodsId": "8",
    //     "sn": null,
    //     "isExhibition": false
    //   }
    // ]
  },
  // 点击轮播图进行页面跳转
  tapBanner: function(e) {
    // console.log(e.currentTarget.dataset.id);
    // console.log(e.currentTarget.dataset);
    // console.log(e.currentTarget);
    // console.log(e);
    if (!e.currentTarget.dataset.id) {
      ruturn;
    }
    if (e.currentTarget.dataset.id != 0) {

      // console.log('1');
      wx.navigateTo({
        url: "/pages/goodnews/goodnews?id=" + e.currentTarget.dataset.id
        // url: "/pages/goodnews/goodnews"
      })
    }
  },
  //轮播图一张滑动完成后触发的事件，获取当前轮播图所在位置
  swiperchange: function(e) {
    // console.log(e);
    this.setData({
      swiperCurrent: e.detail.current //detail是微信内部的请求
    })
  },
  //点击搜索框跳转页面
  selecttip: function() {
    wx.navigateTo({
      url: '/pages/select/select'
    })
  },


  /**
   * 后台请求轮播图
   */
  getBanners: function() {
    var that = this;
    wx.request({
      url: app.globalData.address + '/api/ad/list.html',
      success: function(res) {
        that.setData({
          banners: res.data.data
        });
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(banner);
    this.getBanners();
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

  }
})