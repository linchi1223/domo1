// pages/find/find.js
// 调用函数要加this


Page({

  /**
   * 页面的初始数据
   */
  data: {
    zong: [],
    goods: [],
    classname: '详情',
    indexon: 0,
    categoryId: 0
  },

  // 获取列表
  getlist() {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/domo1/data/data.json',

      success(res) {
        //console.log(res);
        that.setData({
          zong: res.data.data
        })

        that.getGoodsList(res.data.data[0].id)
      },
    })
  },
  // 获取商品列表
  getGoodsList(categoryId) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/domo1/data/data1.json',
      data: {
        categoryId: categoryId
      },
      success: function(res) {
        console.log(res.data.data.content);
        that.setData({
          goods: res.data.data.content
        })
      },
    })
  },
  //按钮按下
  downbar(e) {
    var that = this;
    // console.log(that);
    console.log(e.target.dataset);
    that.setData({
      indexon: e.target.dataset.index,
      categoryId: e.target.dataset.cid
    })
    const self = this;
    self.getGoodsList(e.target.dataset.cid)

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    that.getlist();
  },

  selecttip: function() {
    wx.navigateTo({
      url: '/pages/select/select'
    })
  },
  toDetailsTap() {
    wx.navigateTo({
      url: '/pages/select/select',
    })
  }


})