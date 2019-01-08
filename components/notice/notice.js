// pages/Components/notice/notice.js

var WxParse = require('../../wxParse/wxParse.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    content: {
      type: String,
      observer: function(val) {
        WxParse.wxParse("detail", "html", val, this);
      },
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
    goback: function() {
      var detail = {};
      var option = {};
      this.triggerEvent('Read', detail, option);
    },

  }
})