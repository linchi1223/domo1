const formatTime = date => { //获取时间用常数表达
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':') //返回格式为"2018/12/25 13:00:00"
}

const formatNumber = n => { //将数字格式化 
  n = n.toString() //将n进行字符串转化
  return n[1] ? n : '0' + n //判断n[1]的有没有没有的话前面加0
}

function showRedDot(index) { //提示小红点
  wx.showTabBarRedDot({ //显示 tabBar 某一项的右上角的红点,基础库 1.9.0 开始支持，低版本需做兼容处理。
    index  //number		是	tabBar 的哪一项，从左边算起	
    //success  //function		否	接口调用成功的回调函数	
    //fail  //function		否	接口调用失败的回调函数	
    //complete	//function		否	接口调用结束的回调函数（调用成功、失败都会执行）
  })
}

function hideRedDot(index) { //隐藏小红点
  wx.hideTabBarRedDot({
    index//	number		是	tabBar 的哪一项，从左边算起	
    //success	//function		否	接口调用成功的回调函数	
    //fail	//function		否	接口调用失败的回调函数	
    //complete	//function		否	接口调用结束的回调函数（调用成功、失败都会执行）
  })
}

//利用module.exports公开接口
module.exports = {//nodeJs--模块module.exports与实例化方法；exports 是模块公开的接口,require 用于从外部获取一个模块的接口
  formatTime: formatTime,
  showRedDot: showRedDot,
  hideRedDot: hideRedDot
}