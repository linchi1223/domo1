// pages/goodnews/goodnews.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    number: 1,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    id: 0,
    mixBuy: 1,
    stock: 1,
    attChecked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      id: options.id,
    })

    that.getgoods();
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  /**
   * 点击tab切换
   */
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //获取商品信息
  getgoods: function() {
    var that = this;

    wx.request({
      url: app.globalData.address + '/api/goods/detail.html',
      data: {
        goodsId: this.data.id
      },

      success: function(res) {

        that.setData({
          name: res.data.data.name,
          price: res.data.data.defaultProduct.price,
          marketPrice: res.data.data.defaultProduct.marketPrice,
          products: res.data.data.products ? res.data.data.products : [],
          sales: res.data.data.sales,
          stock: res.data.data.stock,
          goods: res.data.data,
          attr_group_list: res.data.data.data,
          buyid: res.data.data.defaultProduct.id,
          productId: res.data.data.defaultProduct.id,
          collect: res.data.data.collect,

        });
      },

    })
  },
  //点击图片变大图
  onGoodsImageClick: function(e) {
    var that = this;
    var urls = [];
    var index = e.currentTarget.dataset.index;
    for (var i in that.data.goods.productimages) {
      urls.push(that.data.goods.productimages[i].source);
    }
    wx.previewImage({
      urls: urls, // 需要预览的图片http链接列表
      current: urls[index],
    });
  },

  //评论详情切换**********************没写完
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },

  //隐藏选择内容==122
  hideAttrPicker: function() {
    var that = this;
    that.setData({

      show: false
    });
  },
  //显示选择内容==113
  showAttrPicker: function() {
    var that = this;

    var attr_group_list = that.data.attr_group_list;
    // if (attr_group_list) {
    //   attr_group_list[0].attr_list[0].checked = true;
    //   // that.setData({
    //   //   group_id: attr_group.attr_group_id,

    //   // })


    // }
    that.setData({

      show: true,
      attr_group_list: attr_group_list,
    });
  },
  // 数量减少==148
  numberSub: function() {
    var that = this;
    //console.log(that.data.number);
    var num = that.data.number;
    if (num <= 1)
      return true;
    num--;
    that.setData({

      number: num,

    });
  },

  // 数量增加==133
  numberAdd: function(e) {
    var that = this;

    var stock = e.target.dataset.stock;
    var num = that.data.number;
    if (num >= stock)
      return true;
    num++;
    that.setData({
      number: num,

    });
  },
  //数字判断==148==133
  numberBlur: function(e) {
    var that = this;

    var num = e.detail.value;
    var stock = e.target.dataset.stock;

    num = parseInt(num);
    if (isNaN(num))
      num = 1;
    if (num <= 0)
      num = 1;
    if (num >= stock && stock != 0) {
      num = stock;
    }
    if (num >= stock && stock == 0) {
      num = stock + 1;
    }
    that.setData({
      number: num,
    });
  },



  //加入购物车==189
  addcart: function(e) {
    // console.log(e.currentTarget.dataset.gwc)
    var that = this;
    that.setData({
      gwc: e.currentTarget.dataset.gwc
    })
    that.submit("Addcart")
  },

  //立即购买==178
  buynow: function(e) {
    var that = this;

    // console.log(e.currentTarget.dataset.cbuy);
    that.setData({
      gwc: e.currentTarget.dataset.gwc,
      cbuy: e.currentTarget.dataset.cbuy
    })
    that.submit("Buynow");
    
  },

  // 提交
  submit: function(type) {
    var that = this;
    //  console.log(type);
    if (!that.data.show) {
      that.showAttrPicker();
      return true;
    }

    if (that.data.number > that.data.stock1) {

      wx.showToast({
        title: "商品库存不足，请选择其它规格或数量",
        image: "/img/icon1.png",
      });
      return true;
    }
    // console.log(that.data);
    if (that.data.attChecked == false) {
      wx.showToast({
        title: "请选择规格",
        image: "/img/icon1.png",
      });
      return true;
    }
    if (type == 'Buynow') { //立即购买 
      // console.log(that.data);
      that.setData({
        show: false,
      });
      wx.navigateTo({ //传递数据redirectTonavigateto
        url: "/pages/pay/pay?goods_info=" + JSON.stringify({ //用json进行数组转字符串
          goods_id: that.data.productId,
          id:that.data.id,
          num: that.data.number,
          name:that.data.name,
          attrname1: that.data.attrname1,
          number: that.data.number,
          price: that.data.price,
          stock:that.data.stock
        })
      })
     
    }
    if (type == "Addcart") { //加入购物车
      wx.showLoading({
        title: '正在提交',
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.request({
        url: app.globalData.address + '/api/cart/add.html',
        data: {
          // openid:openid,
          productId: that.data.productId,
          quantity: that.data.number
        },
        success: function(res) {
          wx.hideLoading();
          // console.log(res)
          if (res.data.code == 0) {
            that.isCarRequest(that.data.productId);
            wx.showToast({
              title: '加入购物车成功',
              icon: 'success',
              image: '',
              duration: 1000,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })

            that.setData({
              show: false,
            });
            // console.log("ok");
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  isCarRequest: function(productId) {
    wx.request({
      url: app.globalData.address + '/api/cart/isCart.html',
      data: {
        goodsId: productId,
        // openid: app.globalData.openId,
      },
      success: (res) => {
        this.setData({
          isCar: res.data,
        })
      }
    })
  },






  //点击后判断
  attrClick: function(e) {
    var that = this;
    // console.log(e);
    that.setData({
      attChecked: true,
    })

    var attr_group_id = e.target.dataset.groupId;
    var attr_id = e.target.dataset.id;
    var attr_group_list = that.data.attr_group_list;

    // console.log(sattr_group_id, attr_id, attr_group_list);

    for (var i in attr_group_list) {

      if (attr_group_list[i].attr_group_id != attr_group_id)
        continue;
      for (var j in attr_group_list[i].attr_list) {
        if (attr_group_list[i].attr_list[j].attr_id == attr_id) {
          attr_group_list[i].attr_list[j].checked = true;
        } else {
          attr_group_list[i].attr_list[j].checked = false;
        }
      }
    }

    that.setData({
      attr_group_list: attr_group_list,
    });

    var check_attr_list = [];
    var check_all = true;
    for (var i in attr_group_list) {
      var group_checked = false;
      for (var j in attr_group_list[i].attr_list) {
        if (attr_group_list[i].attr_list[j].checked) {

          check_attr_list.push(attr_group_list[i].attr_list[j].attr_name);
          that.setData({

            attrname1: attr_group_list[i].attr_list[j].attr_name,
          })
          group_checked = true;
          break;
        }
      }
      if (!group_checked) {
        check_all = false;
        break;
      }
    }
    if (!check_all)
      return;


    //判断规格对应的货品
    var products = that.data.products;

    for (var k = 0; k < products.length; k++) {
      var sameProduct = true
      for (var l = 0; l < products[k].specificationValues.length; l++) {

        if (check_attr_list[l] != that.data.products[k].specificationValues[l].value) {

          sameProduct = false
        }
      }
      if (sameProduct == true) {
        that.setData({
          productId: that.data.products[k].id,
          price1: that.data.products[k].price,
        })
        sameProduct = false;
        break;
      }
    }

    //获取该规格货品库存
    wx.request({
      url: app.globalData.address + '/api/goods/stock.html',
      data: {
        // openid: app.globalData.openId,
        productid: that.data.productId
      },
      success: function(res) {
        that.setData({
          stock1: res.data.data,
        })
      }
    })

  },

  //防止移动
  preventTouchMove: function(e) {},

  testcs: function(e) {
    // console.log(e);
  }
})