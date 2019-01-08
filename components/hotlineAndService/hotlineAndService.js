// components/hotlineAndService/hotlineAndService.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotline:{
      type:Object,
      value:{},
    },
    service:{
      type:Object,
      value:{},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    callNumber:function(){
      wx.makePhoneCall({
        phoneNumber: this.data.hotline.url,
        success:function(){
          console.log(1);
        },
        fail:function(){
          console.log(2);
        }
      })
    }
  }
})
