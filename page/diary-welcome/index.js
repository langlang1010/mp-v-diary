// page/diary-welcome/index.js
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcome: "欢迎来到\n",
    authorized: false,
    state: false,
    actions: [
      {
        name: '取消',
        color: '#2d8cf0',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 发起请求
          wx.request({
            url: '' + config.loginUrl,
            data: {
              code: res.code
            },
            success(res2) {
              // 获得微信会话凭证，后台将会根据这个凭证来决定是否注册
              var result_data = res2.data.data;
              var session_key = result_data.session_key;
              var userid = result_data.userid;
              var openid = result_data.openid;
              // console.log("登录成功! openid==" + openid);
              wx.getSetting({
                success(setRes) {
                  // console.log(setRes);
                  if (!setRes.authSetting['scope.userInfo'] && that.data.state == false) {
                    // console.log("未授权");
                    // 提醒授权
                    that.setData({
                      authorized: true
                    });
                    return;
                  }
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success(res) {
                      const userInfo = res.userInfo;
                      const nickName = userInfo.nickName;
                      const avatarUrl = userInfo.avatarUrl;
                      const gender = userInfo.gender; // 性别 0：未知、1：男、2：女
                      const province = userInfo.province;
                      const city = userInfo.city;
                      const country = userInfo.country;
                      // console.log("userid==" + userid);
                      wx.setStorage({
                        key: 'session_key',
                        data: session_key
                      });
                      wx.setStorage({
                        key: 'userid',
                        data: userid
                      });
                      wx.setStorage({
                        key: 'openid',
                        data: openid
                      });
                      wx.setStorage({
                        key: 'nickName',
                        data: nickName
                      });
                      wx.setStorage({
                        key: 'avatarUrl',
                        data: avatarUrl
                      });
                      wx.setStorage({
                        key: 'gender',
                        data: gender
                      });
                      wx.setStorage({
                        key: 'province',
                        data: province
                      });
                      wx.setStorage({
                        key: 'country',
                        data: country
                      });
                      wx.setStorage({
                        key: 'city',
                        data: city
                      });
                      // console.log(userInfo)
                      if (res2.data.message == "register") {
                        // console.log("用户正在注册")
                        wx.request({
                          url: '' + config.registerUrl,
                          header: { "Content-Type": "application/x-www-form-urlencoded" },
                          data: {
                            json: JSON.stringify(userInfo),
                            userid: userid,
                            openid: openid
                          },
                          method: "POST",
                          success(res_register) {
                            // console.log(res_register)
                          }
                        });
                      }
                    }
                  });

                  // 已经授权，跳转到主页
                  wx.switchTab({
                    url: '../diary/index'
                  })
                }
              })
            }
          })
        } else {
          console.error('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleClose: function () {
    this.setData({
      authorized: false
    });
  },
  btn_auth: function () {
    var that = this;
    // console.log("你被点击了");
    this.setData({
      authorized: false,
      state: true
    });
    wx.showLoading({
      title: '正在登录'
    })

    setTimeout(function () {
      that.onLoad();
    }, 1500);
  }
})