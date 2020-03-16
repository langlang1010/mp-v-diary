// page/diary-write/index.js
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLeft: false,
    showRight: false,
    today_date: getDate(),
    today_week: getWeek(),
    length: 0,
    weather: "../../image/weather/sunny.png",
    smile: "../../image/weather/smile.png",
    weathers: [
      "../../image/weather/sun.png",
      "../../image/weather/sun-cloud.png",
      "../../image/weather/cloud.png",
      "../../image/weather/wind.png",
      "../../image/weather/small-rain.png",
      "../../image/weather/rain.png",
      "../../image/weather/small-snow.png",
      "../../image/weather/snow.png",
    ],
    smiles: [
      "../../image/weather/smile1.png",
      "../../image/weather/soso.png",
      "../../image/weather/unhappy.png",
      "../../image/weather/cry.png"
    ],
    content:"",
    post_data:{
      userid: "",
      weather: "-1",
      mood: "-1",
      content: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.today_date=new Date();
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        that.data.post_data.userid = res.data;
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 统计字数
  countNum: function (e) {
    // console.log(e.detail.value.length);
    var num = e.detail.value.length;
    this.setData({
      length: num
    });
    this.data.post_data.content = e.detail.value;
    // console.log(this.data.post_data.content);
  },
  
  // 显示选择框
  img_show_weather: function (e) {
    this.setData({
      showLeft: !this.data.showLeft
    });
  },

  // 选择天气
  img_weather: function (e) {
    // console.log(e.currentTarget.dataset.num);
    var num = e.currentTarget.dataset.weather;
    this.setData({
      weather: this.data.weathers[num],
      showLeft: !this.data.showLeft
    });
    
    // 设置天气
    this.data.post_data.weather = num;
  },

  // 点击显示心情选择框
  img_show_smile: function () {
    this.setData({
      showRight: !this.data.showRight
    });
  },

  // 选择心情
  img_smile: function (e) {
    var num = e.currentTarget.dataset.smile;
    this.setData({
      smile: this.data.smiles[num],
      showRight: !this.data.showRight
    });
    this.data.post_data.mood = num;

  },
  save:function() {
  //  console.log("weather == "+this.data.post_data.weather);
  //  console.log("content == " + this.data.post_data.content);
  //  console.log("mood == " + this.data.post_data.mood);
    var user,session;
  
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        session = res.data;
      }
    });
  
    var content = this.data.post_data.content;
    var weather = this.data.post_data.weather;
    var mood = this.data.post_data.mood;
    var userid = this.data.post_data.userid;
    // console.log(userid);
    var that = this;
    wx.request({
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },      
      url: '' + config.addDiary,
      data: {
        content: content,
        mood: mood,
        weather: weather,
        userid: userid,
        session_key: session 
      },
      success(res){
        if(res.data.status == '200') {
          wx.showToast({
            title: '完成',
            icon: 'success',
            duration: 1500
          });
          that.setData({
            content:""
          });
          wx.setStorage({
            key: 'refresh',
            data: 'true',
          })
          setTimeout(function(){
            // 经授权，跳转到主页
            wx.switchTab({
              url: '../diary/index'
            })
          },1500);
       
        }
      }
    });
  }
})

// 获得年月日
function getDate() {
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  return year + "年" + month + "月" + day + "日";
}

// 获得星期
function getWeek() {
  var weeks = ["天","一","二","三","四","五","六"];
  return "星期"+weeks[new Date().getDay()];
}