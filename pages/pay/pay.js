// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    tel: '',
    payIndex: 0,
    address: '',
    // price: 0,
    priceint: '',
    pricefloat: '',
    goods_info: [],
    // gs: 10,
    payments: ["微信支付", "余额支付"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var goods_info = JSON.parse(options.goods_info) //json字符串转对象  goodnews.js
    // var user_info= JSON.parse(options.user_info)
    that.setData({
      id: goods_info.id,
      number: goods_info.number,
    });
    that.getgoods();


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
        console.log(res);
        that.setData({
          name: res.data.data.name,
          price: that.toDecimal(res.data.data.defaultProduct.price),
          marketPrice: res.data.data.defaultProduct.marketPrice,
          products: res.data.data.products ? res.data.data.products : [],
          sales: res.data.data.sales,
          stock: res.data.data.stock,
          goods: res.data.data,
          attr_group_list: res.data.data.data,
          buyid: res.data.data.defaultProduct.id,
          productId: res.data.data.defaultProduct.id,
          collect: res.data.data.collect
        });
        that.zhongji(that.data.number,that.data.price);
      },

    })
  },

  //数量减少
  numberSub: function() {
    var that = this;
    // console.log("sub");
    //console.log(that.data.number);
    var num = that.data.number;
    if (num <= 1)
      return true;
    num--;
    that.setData({
      number: num,
    });
    that.dzhongji(num, that.data.price);

  },

  // 数量增加
  numberAdd: function() {
    var that = this;
    // console.log("add");
    var stock = that.stock;
    var num = that.data.number;
    if (num >= stock)
      return true;
    num++;
    that.setData({
      number: num,
    });

    that.dzhongji(num, that.data.price);
  },
  //数字判断
  numberBlur: function(e) {
    var that = this;

    // console.log(that.data.stock)
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


  //总价
  zhongji(num,price) {
    var that = this;
    // console.log(that.data.price)
    var sumprice = num * price;
    that.setData({
      sumprice: num * price,
    })
    that.toDecimal(sumprice);
  },
  dzhongji(num, price) {
    var that = this;
    var sumprice = num * price;
    that.setData({
      sumprice: num * price,
    })
    that.toDecimal(sumprice);
  },

  //取整数和取小数
  zhengxiao(num) {
    var that = this;
    var b = num.split(".");
    var x = b[0];
    var y = b[1]
    that.setData({
      priceint: x,
      pricefloat: y
    })

  },
  //保留两位小数
  toDecimal(x) {
    var that = this;
    //  console.log(x);
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    that.zhengxiao(s);
    //  console.logs(s);
    return s;
  },
  //绑定支付方式
  bindchangeIndex: function (e) {
    var index = e.detail.value;
    // console.log(e);
    var name = e.currentTarget.dataset.name;
    if (name === "courierIndex") {
      this.setData({
        courierIndex: index,
      }, () => {
        this.getOrderData(this.data.options)
      });
    } else if (name === "payIndex") {
      this.setData({
        payIndex: index,
      })
    } else {
      console.log("Error");
    }
  },
  address_select: function(){
    wx.navigateTo({
      url: '/pages/address/address',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})
