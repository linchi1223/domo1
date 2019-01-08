function initPay(params, callback, failCallBack) {
  if (!params) {
    return
  }
  wx.requestPayment({
    timeStamp: params.timeStamp,
    nonceStr: params.nonceStr,
    package: params.package,
    signType: 'MD5',
    paySign: params.paySign,
    success: () => {
      if (callback) {
        callback()
      }
    },
    fail: (res) => {
      if (failCallBack) {
        failCallBack(res)        
      }
    }
  })
}

module.exports = {
  initPay: initPay
}  