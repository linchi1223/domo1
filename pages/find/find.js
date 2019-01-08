// pages/find/find.js
// 调用函数要加this

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zong: [],
    goods: [],
    classname: '详情',
    indexon: 0,
    goodsId: 0
  },

  // 获取列表
  getlist() {
    var that = this;
    wx.request({
      // url: 'http://127.0.0.1/domo1/data/data.json',
      url: app.globalData.address + '/api/productCategory/list.html',
      success(res) {
        
        that.setData({

          zong: res.data.data
        })

         that.getGoodsList(res.data.data[0].id)
      },
    })
  },
  
  // 获取商品列表
  getGoodsList(goodsId) {
    var that = this;
    wx.request({
      // url: 'http://127.0.0.1/domo1/data/data1.json',
      url: app.globalData.address + '/api/goods/list.html',
      data: {
        categoryId: goodsId
      },
      success: function(res) {
       
        //console.log(res.data.data.content);
        that.setData({
          goods: res.data.data.content
        })
        
      },
    })
  },
  //按钮按下
  downbar(e) {
    var that = this;
    console.log(e.target.dataset.index);
    console.log(e.target.dataset.cid)
    that.setData({
      indexon: e.target.dataset.index,
      goodsId: e.target.dataset.cid
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
  toDetailsTap(e) {
   // console.log(e.currentTarget.dataset.cid)
    wx.navigateTo({
      url: '/pages/goodnews/goodnews?id='+e.currentTarget.dataset.cid,
    })
    // console.log(e.currentTarget.dataset.cid);//284
  }


})