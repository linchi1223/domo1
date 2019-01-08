// pages/search/search.js 
const ORDER_SYNTHESIS = "synthesis"
const ORDER_COPIESSOLD = "totalSales"
const ORDER_PRICE = "price"

const app = getApp()
const pageable = require('../../utils/pageable.js')

Page({

  data: {
    openid: '',
    dropDown: false,
    searchText: "",
    orderProperty: ORDER_SYNTHESIS,
    generation: '',
    loading: true,
    noResult: false,
    rotateAnimation: {},
    pageSize: 20,
    pageNumber: 0,
    orderDirection: "asc",
    orderList: [{
        name: '综合',
        property: ORDER_SYNTHESIS
      },
      {
        name: '销量',
        property: ORDER_COPIESSOLD
      },
      {
        name: '价格',
        property: ORDER_PRICE,
        direction: 'normal'
      }
    ]
  },
  onLoad: function(options) {

    if (options) {
      this.setData({
        pageNumber: 0,
        commodityName: options.searchText,
        searchText: options.searchText
      }, this.searchItem)
    }
    console.log(this.data.pageList);
  },

  onReachBottom: function() {
    this.searchItem()
  },

  search: function(e) {
    let searchText = e.detail.value
    var value = searchText.trim() //去掉搜索间的空格  
    if (!value || value.length <= 0) {

      return;
    }

    this.setData({
      pageNumber: 0,
      searchText: value
    }, this.searchItem)


  },


  clickOrder: function(e) {
    if (this.data.dropDown) {
      return
    }

    const property = e.target.dataset.property

    if (property === this.data.orderProperty && property !== ORDER_PRICE) {
      return
    }

    let orderList = this.data.orderList
    if (property === ORDER_PRICE) {
      let direction = orderList[2].direction

      if (direction === 'normal') {
        direction = 'asc'
      } else if (direction === 'asc') {
        direction = 'desc'
      } else {
        direction = 'asc'
      }

      orderList[2].direction = direction

      this.setData({
        orderList,
      })
    } else {
      orderList[2].direction = 'normal'

      this.setData({
        orderList
      })
    }

    this.setData({
      pageNumber: 0,
      orderProperty: property,
      orderDirection: orderList[2].direction
    }, this.searchItem)
  },




  clickAge: function() {
    if (this.data.dropDown) {
      this.boxPullUp()
    } else {
      this.boxDropDown()
    }
  },
  clickShade: function() {
    this.boxPullUp()
  },
  stopMove: function(e) {
    return
  },


  searchItem: function() {
    const searchValue = this.data.searchText || ''
    const generation = this.data.generation || ''
    let orderProperty = this.data.orderProperty || ''
    if (orderProperty === 'synthesis') {
      orderProperty = ''
    }


    const url = `${app.globalData.address}/api/goods/list2.html`

    var params = {
      openid: app.globalData.openId,
      searchValue,
      searchProperty: "name",
      exhibitionId: app.globalData.exhibitionId,
      orderProperty,
      orderDirection: this.data.orderDirection === "normal" ? 'desc' : this.data.orderDirection,
      // categoryId: 1
    }

    // if (orderProperty === ORDER_PRICE) {
    //    params = Object.assign({}, params, {
    //     direction: this.data.orderDirection
    //   })
    // }

    pageable.getPage(this, url, params, 'list')
      // console.log(params)
  },



  clickBtn: function(e) {
    const info = e.target.dataset.info

    if (info !== 'cancel') {
      this.setData({
        pageNumber: 0
      }, this.searchItem)
    }

    this.boxPullUp()
  },

  clickAgeBtn: function(e) {
    const title = e.target.dataset.title
    let generation = ''

    if (title !== this.data.generation) {
      generation = title
    }

    this.setData({
      generation: generation
    })
  },
  boxDropDown: function() {
    this.setData({
      dropDown: true
    })

    this.rotate(180)
  },
  boxPullUp: function() {
    this.setData({
      dropDown: false
    })

    this.rotate(0)
  },

  rotate: function(deg) {
    let animation = wx.createAnimation({
      duration: 150
    })
    animation.rotateX(deg).step()
    this.setData({
      rotateAnimation: animation.export()
    })
  },
  searchCancel: function() {
    wx.navigateBack({
      delta: 1,
    });
  }
})