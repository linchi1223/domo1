// pages/addressadd/addressadd.js
const app = getApp()
var addressll = require('../../utils/address.js')
var animation
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [0, 0, 0],
    addressMenuIsShow: false,
    provinces: [],
    province: '',
    city: '',
    username: '',
    usertel: '',
    useraddress: '',
    useraddressxiangxi: '',
    phone:'',
    address:{
      id:1,
    },
    addressId:1
  },
  /**
   * 获取名字
   */
  bindinputname: function(event) {
    let address = this.data.address;
    address.consignee = event.detail.value;
    this.setData({
      address: address
    });
  },
  /**
   * 获取电话 
   */
  bindinputtel: function(event) {
    let address = this.data.address;
    address.phone = event.detail.value;
    this.setData({
      address: address
    });
  },
  /**
   * 获取详细地址
   */
  bindinputaddress: function(event) {
    let address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.getaddressdefault(); //121行
    if (!isNaN(options.addressId)) {
      //标题
      wx.setNavigationBarTitle({
        title: "编辑地址"
      });
      wx.request({
        url: app.globalData.address + "/api/receiver/view.html",
        data: {
          id: options.addressId,
        },
        success: function(res) {

          if (res.data) {
            that.setData({
              address: res.data.data,
              areaInfo: res.data.data.areaName,
              oneget: 1
            })
          }
        }
      })
    } else {
      wx.setNavigationBarTitle({
        title: "新增地址"
      });
    }
    that.setData({
      addressId: options.addressId
    })




    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })

    this.animation = animation;
    // 默认联动显示北京
    var id = addressll.provinces[0].id;
    this.setData({
      provinces: addressll.provinces,
      citys: addressll.citys[id],
      areas: addressll.areas[addressll.citys[id][0].id],
    })


    // var information = JSON.parse(options.information) //json字符串转对象
    // console.log(information);
    // if (information.type == "alter") {
    //   that.setData({
    //     username: information.username,
    //     usertel: information.usertel,
    //     useraddress: information.useraddress,
    //     useraddressxiangxi: information.useraddressxiangxi
    //   });
    // }


  },



  /**
   * 获取地址列表
   */
  getaddressdefault: function() {
    var that = this;
    wx.request({
      url: app.globalData.address + "/api/receiver/list.html",
      data: {
        openid: app.globalData.openId,
        pageSize: 20,
        pageNumber: 1
      },
      success: function(res) {
        if (res.data) {
          const data = res.data
          if (data.list.length == 0) {
            that.setData({
              defaultAddress: true
            })
          }
        }
      }
    })
  },



  /**
   * 三联动选择器
   */
  // 点击所在地区弹出选择框
  selectDistrict: function(e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },





  // 执行动画
  startAddressAnimation: function(isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })

  },






  // 点击地区选择取消按钮
  cityCancel: function(e) {
    this.startAddressAnimation(false)
  },






  // 点击地区选择确定按钮
  citySure: function(e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    var areaInfoqd = that.data.provinces[value[0]].name + " " + that.data.citys[value[1]].name + " " + (that.data.areas[value[2]] ? that.data.areas[value[2]].name : '');
    var areaInfo = that.data.provinces[value[0]].name + that.data.citys[value[1]].name + (that.data.areas[value[2]] ? that.data.areas[value[2]].name : '');
    that.setData({
      areaInfo: areaInfo,
      areaInfoqd: areaInfoqd

    })

  },




  // 隐藏

  hideCitySelected: function(e) {
    this.startAddressAnimation(false)
  },




  // 处理省市县联动逻辑
  cityChange: function(e) {

    var value = e.detail.value
    var provinces = this.data.provinces;
    var citys = this.data.citys
    var areas = this.data.areas
    // console.log(e.detail.value)
    var provinceNum = value[0]

    var cityNum = value[1]
    var countyNum = value[2]
    // console.log(this.data.value[0])
    if (this.data.value[0] != provinceNum) {

      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: addressll.citys[id],
        areas: addressll.areas[addressll.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: addressll.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },








  /**
   * 改变地址
   */
  getaddress: function() {
    var that = this;
    var phonetest = /^1\d{10}$/
    if (that.data.address.consignee == "" || that.data.address.phone == "" || that.data.address.address == "" || that.data.areaInfo == "" || !phonetest.test(that.data.address.phone)) {
      wx.showModal({
        title: '格式不正确',
        content: '请填写完整信息',
        showCancel: false
      });
      return
    } else {
      wx.showToast({
        title: '正在修改...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })

      wx.request({
        url: app.globalData.address + "/api/receiver/update.html",
        data: {
          consignee: that.data.address.consignee,
          phone: that.data.address.phone,
          areaName: that.data.areaInfo,
          address: that.data.address.address,
          zipCode: that.data.address.zipCode,
          isDefault: that.data.address.isDefault,
          id: that.data.addressId,
          openid: app.globalData.openId
        },
        success: function(res) {
          if (res.data) {
            wx.hideToast();
            wx.showToast({
              title: '修改成功',
              icon: 'success',
            })
          }
        }
      })
    }
  },




  /**
   * 地址保存
   */
  upaddress: function() {
    var that = this
    var str = /^1\d{10}$/; //检查电话号码是否正确

    if (that.data.address.id == that.data.addressId) {
      that.getaddress()
    } else {
      if (that.data.address.consignee == null || that.data.address.phone == null || that.data.address.address == null || that.data.areaInfo == null) {
        wx.showModal({
          title: '格式不正确',
          content: '请填写完整信息',
          showCancel: false
        })
        return
      } else if (that.data.address.consignee == "" || that.data.address.phone == "" || that.data.address.address == "" || that.data.areaInfo == "" || !str.test(that.data.address.phone)) {
        wx.showModal({
          title: '格式不正确',
          content: '请填写完整信息',
          showCancel: false
        })
        return
      } else {
        wx.showToast({
          title: '正在保存...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        wx.request({
          url: app.globalData.address + '/api/receiver/save.html',
          data: {
            consignee: that.data.address.consignee,
            phone: that.data.address.phone,
            address: that.data.address.address,
            isDefault: false,
            zipCode: "311113",
            openid: app.globalData.openId,
            areaName: that.data.areaInfo
          },
          success: function(res) {
            if (res.data) {
              wx.hideToast();
              wx.showToast({
                title: '保存成功',
                icon: 'success',
              })
              wx.navigateBack({})
            }
          }
        })
      }
    }
  }

})