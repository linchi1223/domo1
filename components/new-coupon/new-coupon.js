// components/new-coupon/new-coupon.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon:{
      type:Object,
      value:{},
      observer:function(coupon){
        // console.log(coupon);
        this.setData({
          isGeted: coupon.checked,
        })
      }
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    isGeted:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getnewCoupon:function(){
      if(this.data.isGeted)
      {
        wx.showToast({
          title: '请勿重复领取',
          icon:'none',
          duration:1200,
        })
        return
      }
      this.gitCoupon();
      
    },

    gitCoupon: function () {
      var that = this;
 
      wx.request({
        // url: `${app.globalData.domain}/IntegralLog/exchangeCoupon.html`,
        url: app.globalData.address + "/api/coupon/receivecouponcode.html",
        data: {
          openid: app.globalData.openId,
          couponId: this.data.coupon.id,
        },
        success: function (res) {
          if(res.data.code==0)
          {
            that.setData({
                isGeted:true,
            })
          }
        }
      })

    },
  }
})
