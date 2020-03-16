const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src_img: "../../image/logo/logo.jpg",
    me_name: "微V日记",
    userid: "",
    session_key: "",
    all_data: "",
    unknown_mood: 0,
    unknown_weather: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.data.userid = res.data;
        console.log("res.data==" + that.data.userid);
      },
    });
    wx.getStorage({
      key: 'session_key',
      success: function(res) {
        that.data.session_key = res.data;
      },
    });
    wx.getStorage({
      key: 'nickName',
      success: function(res) {
        that.setData({
          me_name: res.data
        });
      },
    });
    wx.getStorage({
      key: 'avatarUrl',
      success: function(res) {
        that.setData({
          src_img: res.data
        });
      },
    })

  },

  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.data.userid = res.data;
        // console.log("res.data==" + that.data.userid);
        wx.getStorage({
          key: 'session_key',
          success: function(res) {
            that.data.session_key = res.data;
            wx.request({
              url: '' + config.statisticUrl,
              data: {
                userid: that.data.userid,
                session_key: that.data.session_key
              },
              method: "get",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                console.log(res.data.data);
                var sum = res.data.data.sum;
                var s0 = res.data.data.mood0;
                var s1 = res.data.data.mood1;
                var s2 = res.data.data.mood2;
                var s3 = res.data.data.mood3;
                var unknown_mood = sum - s0 - s1 - s2 - s3 - res.data.data.deleted;
                // console.log("unknown_mood == " + unknown_mood);
                // res.data.data.unknown_mood = unknown_mood;

                var unknown_weather = res.data.data.sum - res.data.data.weather0 - res.data.data.weather1 -
                  res.data.data.weather2 - res.data.data.weather3 - res.data.data.weather4 -
                  res.data.data.weather5 - res.data.data.weather6 - res.data.data.weather7 - res.data.data.deleted;
                // console.log("unknown_weather == " + unknown_weather);
                // res.data.data.unknown_weather = unknown_weather;
                // console.log(res.data.data);
                that.setData({
                  all_data: res.data.data,
                  unknown_mood: unknown_mood,
                  unknown_weather: unknown_weather
                });
              },
            })
          },
        });
      },
    });



  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '转发按钮',
      path: 'page/API/pages/share-button/share-button'
    }
  },

  shareMessage: function() {

  },

  // 返回
  back: function() {
    wx.navigateBack({

    });
  }

})