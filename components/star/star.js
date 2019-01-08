const LENGTH = 5
const CLS_FULL = 'full'
const CLS_HALF = 'half'
const CLS_EMPTY = 'empty'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number,
      observer: 'imageSrc'
    },
    hidescore: {
      type: String,
      value: "",
      observer: function (newVal ,oldVal) {
      }
    },
    selectLeft: {
      type: String,
      value: "",
      observer: function (newVal, oldVal) {
      }
    },
    selectRight: {
      type: String,
      value: "",
      observer: function (newVal, oldVal) {
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    xianshi: "none",
    temp: 0
  },

  attached: function() {
    var that = this
    that.setData({
      stars: that.imageSrc(),
      xianshi: that.data.hidescore,
      selectLeft: that.data.selectLeft,
      selectRight: that.data.selectRight
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    imageSrc() {
      let result = []
      let score = Math.floor(this.data.score * 2) / 2
      app.globalData.score = score
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_FULL)
      }

      if (hasDecimal) {
        result.push(CLS_HALF)
      }

      const len = LENGTH - result.length
      for (let i = 0; i < len; i++) {
        result.push(CLS_EMPTY)
      }
      this.triggerEvent('myevent', score)

      this.setData({
        stars: result
      })

      return result
    },
    selectLeft: function selectLeft(e) {
      var that = this
      that.setData({
        score: e.currentTarget.dataset.score,
        temp: 1
      })
      if(that.data.temp == 1)
      {
        that.setData({
          stars: that.imageSrc(),
        })
      }
    },
    selectRight: function (e) {
      var that = this
      that.setData({
        score: e.currentTarget.dataset.score,
        temp: 1
      })
      if (that.data.temp == 1) {
        that.setData({
          stars: that.imageSrc(),
        })
      }
    }
  }
})
