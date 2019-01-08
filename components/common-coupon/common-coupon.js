const STATUS_NORMAL = "unused"
const STATUS_USED = "used"
const STATUS_TIMEOUT = "expired"

const util = require('../../utils/util.js')

Component({
  properties: {
    status: {
      type: String,
      value: STATUS_NORMAL
    },
    coupon: {
      type: Object,
      observer: 'format'
    },
    canSelect: {
      type: Boolean,
      value: false
    },
    selected: {
      type: Boolean,
      value: false
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
    format: function () {
      let coupon = this.data.coupon

      coupon.beginDate = util.formatTime(new Date(coupon.beginDate)).substr(0,10);
      coupon.endDate = util.formatTime(new Date(coupon.endDate)).substr(0, 10);
      this.setData({
        coupon
      })
    },
    selectCoupon: function () {
      this.setData({
        selected: true
      })
    },
    unSelectCoupon: function () {
      this.setData({
        selected: false
      })
    },

    clickCoupon: function () {
      if (!this.data.canSelect) {
        return
      }

      let detail = this.data.coupon
      detail = Object.assign({}, detail, {
        selected: this.data.selected
      })

      if (this.data.selected) {
        this.unSelectCoupon()
      } else {
        this.selectCoupon()
      }

      this.triggerEvent('coupon', detail)
    }
  }
})