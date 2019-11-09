//返回一个新创建的<img>元素，该元素用于在获取到地理位置信息后，显示一张Google地图，
//该地图上显示了当前的位置。要注意的是，此函数的调用者必须要将返回的元素
//插入到文档中，以使它可见
//如果当前浏览器不支持地理位置API，则抛出一个错误
function getmap(){
  //检查是否支持地理位置API
  if (!navigator.geolocation)  throw "Geolocation not supported"; 
  //创建一个新的<img>元素，并开始请求地理位置信息，
  //img元素显示包含当前位置的地图，然后再将返回该图片
  var image = document.createElement("img"); 
  navigator.geolocation.getCurrentPosition(setMapURL); 
  return image;
  //当(如果)成功获取到地理位置信息后，会在返回image对象后调用此方站
  function  setMapURL(pos)  { 
    //从参数对象 (pos) 中获取位置信息
    var latitude = pos.coords.latitude;  //经度
    var longitude = pos.coords.longitude; //纬度
    var accuracy = pos.coords.accuracy;  //米
    //构造一个URL，用于请求一张显示当前位置的静态Google地图
    var url = "http://maps.google.com/maps/api/staticmap" + 
            "?center=" + latitude + "," + longitude + "&size=640x640&sensor=true"; 
    //设置一个大致的缩放级别
    var zoomlevel=20;  //以各种方式开始缩放
    if (accuracy > 80)  //在低精度情况下进行放大
      zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2); 
    url += "&zoom=" + zoomlevel;  //将缩放级别添加到URL中
    //现在在image对象中显示该地图。感谢Google
    image.src = url;
  }
}
展示如何使用所有地理位置特性
//异步的获取我的位置，并在指定的元素中展示出来
function whereami(elt) { 
  //将此对象作为第三个参数传递给getCurrentPosition()方法
  var options = { 
    //设置为true，表示如果可以的话
    //获取高精度的位置信息(例如，通过GPS获取)
    //但是，要注意的是，这会影响电池寿命
    enableHighAccuracy: false,  //可以近似：这是默认值
    //如果获取缓存过的位置信息就足够的话，可以设置此属性
    //默认值为0，表示强制检查新的位置信息
    maximumAge: 300000,  // 5分钟左后
    //愿意等待多长时间来获取位置信息?
    //默认值为无限长，getCurrentPosition()方法永不超时
    timeout: 15000  //不要超过15秒
  }; 
  if (navigator.geolocation)  //如果支持的话，就获取位置信息
    navigator.geolocation.getCurrentPosition(success, error, options); 
  else 
    elt.innerHTMl = "Geolocation not supported in this browser"; 
  //当获取位置信息失败的时候，会调用此函数
  function error(e) { 
    // error对象包含一些数字编码和文本消息，如下所示：
    // 1: 用户不允许分享他/她的位置信息
    // 2: 浏览器无法确定位置
    // 3: 发生超时
    elt.innerHTML = "Geolocation error " + e.code + ": " + e.message;
  }
  //当获取位置信息成功的时候，会调用此函数
  function success(pos) { 
    //总是可以获取如下这些字段
    //但是要注意的是时间戳信息在outer对象中，而不在inner、coords对象中
    var msg = "At " + 
        new Date(pos.timestamp).toLocaleString() + " you were within " + 
        pos.coords.accuracy + " meters of latitude " + 
        pos.coords.latitude + " longitude " + 
        pos.coords.longitude + "."; 
    //如果设备还返回了海拔信息，则将其添加进去
    if (pos.coords.altitude) { 
      msg += " You are " + pos.coords.altitude + " 士 " + 
          pos.coords.altitudeAccuracy + "meters above sea level."; 
    }
    //如果设备还返回了速度和航向信息，也将它们添加进去
    if (pos.coords.speed) { 
      msg += " You are travelling at " + 
          pos.coords.speed + "m/s on heading " + 
          pos.coords.heading + ".";
    } 
    elt.innerHTML = msg;  //显示所有的位置信息
  }
}