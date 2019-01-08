// 倒计时函数

function countdown(before)
{
  var before = new Date(before);
  var today = new Date();

  var totalSeconds = (today - before)/1000;
  totalSeconds = parseInt(totalSeconds);
  var seconds, minutes, hours, days, temp;
  var count;

  days = totalSeconds/(60*60*24);
  days = parseInt(days);

  temp = totalSeconds - days*(60*60*24)
  hours = temp/(60*60);
  hours = parseInt(hours);

  temp = temp - hours*(60*60);
  minutes = temp/60;
  minutes = parseInt(minutes);

  seconds = temp - minutes*60;
  count = filling(days)+':'+filling(hours)+":"+filling(minutes)+":"+filling(seconds);
  return count;
}

function filling (timer){
  var time;
  if(timer<10){
    time = '0'+timer;
  }
  else{
    time = ''+timer;
  }
  return time;
}


module.exports = {
  countdown: countdown,
}