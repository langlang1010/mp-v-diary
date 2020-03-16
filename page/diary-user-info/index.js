// page/diary-user-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src_img: "../../image/logo/logo.jpg",
    me_name: "微V日记",
    country: "",
    province:"",
    city:"",
    gender:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        console.log(res.data);
      },
    });
    var that = this;
   // var nickName, avatarUrl, country, province, city, gender_code;
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
      success: function (res) {
        that.setData({
          src_img: res.data
        });
      },
    });
    wx.getStorage({
      key: 'country',
      success: function (res) {
        that.setData({
          country: res.data
        });
      },
    });
    wx.getStorage({
      key: 'province',
      success: function (res) {
        that.setData({
          province: res.data
        });
      },
    });
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        });
      },
    });
    wx.getStorage({
      key: 'gender',
      success: function (res) {
        var gender_code = res.data;
        var cgender;
        if (gender_code == 1) {
          cgender = "男";
        } else if (gender_code == 2) {
          cgender = "女";
        } else {
          cgender = "未知";
        }
        that.setData({
          gender: cgender
        });
      },
    });
   
   
  }, 
  back: function () {
    wx.navigateBack({

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})