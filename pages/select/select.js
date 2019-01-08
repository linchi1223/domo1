const app = getApp()
Page({
  data: {
    inputValue: "",
    record: [],
    searchArray: []
  },
  onLoad: function () {
    let record = this.data.record;
    var that = this


    wx.getStorage({
      key: 'record',
      success: function (res) { },
      fail: function (res) {
        wx.setStorage({
          key: 'record',
          data: record,
        })
      },
    })

  },
  onShow: function () {
    wx.getStorage({
      key: 'record',
      success: function (res) {
        var pages = getCurrentPages();
        var currentpage = pages[pages.length - 1];
        currentpage.setData({
          record: res.data,
        })
      },
    })
  },



  // 搜索的规则
  search: function () {
    let value = this.data.inputdate;
    var updata = [];
    value = value.trim();

    if (!value || value.length <= 0) {
      wx.showToast({
        title: '请输入关键字',
        icon: "none"
      })
      return;

    }

    wx.navigateTo({
    
      url: '/pages/search/search?searchText=' + this.data.inputdate,
    })

    wx.getStorage({
      key: 'record',
      success: function (res) {
        updata = res.data;

        // 查找是否存在记录
        let index = updata.findIndex(function (v) {
          return value === v
        });
        if (index > -1) {
          updata.splice(index, 1);
        }

        let updatalen = updata.unshift(value);

        if (updatalen > 8) {
          updata.shift();
        };

        wx: wx.setStorage({
          key: 'record',
          data: updata,
          success: function () {
            var pages = getCurrentPages();
            var currentpage = pages[pages.length - 1];

            currentpage.setData({
              record: updata,
            })
          }
        });

      },
    })

  },


  // 删除图案的清除方法
  clearRecord: function () {
    wx.removeStorage({
      key: 'record',
      success: function (res) {
        let record = [];

        wx.setStorage({
          key: 'record',
          data: record,
        })
      },
    })
    this.setData({
      record: [],
    })
  },

  // 历史记录的跳转
  goToSearch: function (e) {
    let value = e.target.dataset.value;
    let index = e.target.dataset.index;

    wx.navigateTo({
      url: '/pages/search/search?searchText=' + value,
    })
    let updata = this.data.record;
    updata.splice(index, 1)
    let updatalen = updata.unshift(value);
    this.setData({
      record: updata,
    })
  },

  // 输入实时更新
  input: function (e) {
    this.setData({
      inputdate: e.detail.value,
    })
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1,
    });
  }
})
  