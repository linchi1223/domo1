// components/spell-order-item/spell-order-item.js
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
    test:[0,1],
    order:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToSpellDetail: function () {
      wx.navigateTo({
        url: '/pages/spell-detail/spell-detail',
      })
    },
  }
})
