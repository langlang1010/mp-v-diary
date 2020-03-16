// page/diary-write/index.js
const config = require('../../config')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showLeft: false,
    showRight: false,
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
    diary: "",
    post_data: {
      userid: "",
      diaryid: "",
      session_key: "",
      weather: "-1",
      mood: "-1",
      content: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 拿数据
    var that = this;
    wx.getStorage({
      key: 'diary',
      success: function (res) {
        // console.log(res.data);
        var len = res.data.content.length;
        that.setData({
          diary: res.data,
          length: len
        });
        if (res.data.weather != -1) {
          that.setData({
            weather: that.data.weathers[res.data.weather]
          });
          that.data.post_data.weather = res.data.weather;
        }
        if (res.data.mood != -1) {
          that.setData({
            smile: that.data.smiles[res.data.mood]
          });
          that.data.post_data.mood = res.data.mood;
        }
        that.data.post_data.content = res.data.content;
        that.data.post_data.diaryid = res.data.pkDiaryid;
      },
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
      length: num,
    });
    this.data.post_data.content = e.detail.value;
  },
  img_show_weather: function (e) {
    this.setData({
      showLeft: !this.data.showLeft
    });
  },
  img_weather: function (e) {
    var num = e.currentTarget.dataset.weather;
    this.setData({
      weather: this.data.weathers[num],
      showLeft: !this.data.showLeft
    });
    this.data.post_data.weather = num;
  },

  img_show_smile: function () {
    this.setData({
      showRight: !this.data.showRight
    });
  },

  // 选择表情
  img_smile: function (e) {
    var num = e.currentTarget.dataset.smile;
    this.setData({
      smile: this.data.smiles[num],
      showRight: !this.data.showRight
    });
    this.data.post_data.mood = num;
  },

  update: function () {
    var userid, session_key;
    var content = this.data.post_data.content;
    var mood = this.data.post_data.mood;
    var weather = this.data.post_data.weather;
    var diaryid = this.data.post_data.diaryid;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        userid = res.data;
        wx.getStorage({
          key: 'session_key',
          success: function (res2) {
            session_key = res2.data;
            // updateDiary
            wx.request({
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: '' + config.updateDiary,
              data: {
                userid: userid,
                diaryid: diaryid,
                content: content,
                mood: mood,
                weather: weather,
                session_key: session_key
              },
              success: function (res) {
                // console.log(res.data.message);
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1500
                });
                wx.setStorage({
                  key: 'refresh',
                  data: 'true',
                })
                setTimeout(function () {
                  // 经授权，跳转到主页
                  wx.switchTab({
                    url: '../diary/index'
                  })
                }, 1500);
              }
            })
          },
        })

      },
    })

  },
  deleteDiary: function () {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '删除后将不能恢复，您确认删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          var userid, session_key, diary_id;
          diary_id = that.data.diary.pkDiaryid;
          // console.log('用户点击确定')
          wx.getStorage({
            key: 'userid',
            success: function (res) {
              userid = res.data;
              wx.getStorage({
                key: 'session_key',
                success: function (res2) {
                  session_key = res2.data;
                  // delete diary
                  wx.request({
                    url: '' + config.deleteDiary,
                    data: {
                      userid: userid,
                      diaryid: diary_id,
                      session_key: session_key
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    success: function (res) {
                      // console.log(res.data.data);
                      if (res.data.data == "success") {
                        wx.showToast({
                          title: '完成',
                          icon: 'success',
                          duration: 1500
                        });

                        wx.setStorage({
                          key: 'refresh',
                          data: 'true',
                        })
                        setTimeout(function () {
                          // 经授权，跳转到主页
                          wx.switchTab({
                            url: '../diary/index'
                          })
                        }, 1500);
                      }
                    },

                  })

                },
              })
            },
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')

        }
      }
    })
  }

})