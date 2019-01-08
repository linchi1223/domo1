// components/common-item/common-item.js
Component({
  properties: {
    commodity: {
      type: Object,
      observer: 'format'
    },

  },
  data: {

  },
  methods: {
    format: function () {
      const commodity = this.data.commodity
      if (!commodity.name) {
        commodity.name = "";
      }
      this.setData({
        commodity
      })
    },
    clickItem: function () {
      wx.navigateTo({
        url: `/pages/goodnews/goodnews?id=${this.data.commodity.id}`
      })
    }
  }
})
