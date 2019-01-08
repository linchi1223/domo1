function getPage(that, url, params, str, callback) {

  let pageNumber = that.data.pageNumber
  // that.setData({ pageList: that.data.pageList|| []})
  let pageList = that.data.pageList || []
  // 当pageNumber为totalPager时,直接返回   
  if (pageNumber === that.data.totalPager) {
    return
  }

  // 初始化 more 标记为true
  that.setData({
    more: true,
    noResult: false
  })

  // 当pageNumber为0,即获取第一页时,将商品列表清空
  if (pageNumber === 0) {
    that.setData({
      pageList: [],
      loading: true
    })
  } else {
    that.setData({
      pageLoading: true
    })
  }
  pageNumber++

  let data = Object.assign({}, params, {
    pageNumber,
    pageSize: that.data.pageSize
  })


  wx.request({
    url,
    data,
    success: (res) => {


      if (callback) {
        callback(res)
      }

      // 返回的页数为0时,标记 noResult 为true
      let totalPager = res.data.totalPager !== undefined ? res.data.totalPager : res.data.totalPages

      if (totalPager === undefined) {
        totalPager = res.data.totalPage
      }

      if (totalPager === 0) {
        that.setData({
          loading: false,
          noResult: true
        })
        return
      } else {
        that.setData({
          noResult: false
        })
      }

      if (pageNumber - 1 === 0) {
        that.setData({
          loading: false,
          pageList: res.data[str]
        })
        console.log(res.data[str]);
      } else {
        // 当获取非第一页时,将新的商品添加到原先的商品列表中
        pageList = pageList.concat(res.data[str])

        that.setData({
          pageList,
          pageLoading: false
        })
      }



      that.setData({
        pageNumber,
        totalPager
      })

      // 当新获取的数据为最后一页时,将 more 标记置为false
      if (pageNumber === totalPager) {
        that.setData({
          more: false
        })
      }
    }
  })
}

module.exports = {
  getPage: getPage
}