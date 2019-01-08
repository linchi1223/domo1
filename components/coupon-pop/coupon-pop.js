// pages/Components/coupon-pop/coupon-pop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    sure:function(){
      var detail ={};
      var option ={};
      this.triggerEvent('getcoupons',detail,option)
    }
  }
})
