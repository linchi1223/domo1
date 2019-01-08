// components/payment-pop/payment-pop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    price:{
      type: Number,
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
    ComfirmToPay:function(){
      this.triggerEvent('pay')
    },
    cancel:function(){
      this.triggerEvent("cancel");
    }
  }
})
