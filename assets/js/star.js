export default function ( id ) { 
  var context;
  var arr = new Array();
  var starCount = 800;
  var windowWidth = ''
    //初始化画布及context
  function init() {
    //获取canvas
    var stars = document.getElementById(id);
    windowWidth = window.innerWidth; //当前的窗口的高度
    stars.width = windowWidth;
    stars.height = window.innerHeight;
    //获取context
    context = stars.getContext("2d");
  }
  //创建一个星星对象
  var Star = function () {
    this.x = windowWidth * Math.random();//横坐标
    this.y = 5000 * Math.random();//纵坐标
    this.text = ".";//文本
    this.color = "white";//颜色
    //产生随机颜色
    this.getColor = function () {
      var _r = Math.random();
      if (_r < 0.5) {
        this.color = "#333";
      } else {
        this.color = "white";
      }
    }
    //初始化
    this.init = function () {
      this.getColor();
    }
    //绘制
    this.draw = function () {
      context.fillStyle = this.color;
      context.fillText(this.text, this.x, this.y);
    }
  }
  //星星闪起来
  function playStars() {
    for (var n = 0; n < starCount; n++) {
      arr[n].getColor();
      arr[n].draw();
    }
    setTimeout(playStars, 100);
  }
  //页面加载的时候
  // window.onload = function () {
    init();
    //画星星
    for (var i = 0; i < starCount; i++) {
      var star = new Star();
      star.init();
      star.draw();
      arr.push(star);
    }
    playStars();//绘制闪动的星星
  // }
}