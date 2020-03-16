Page({
  /**
   * 页面的初始数据
   */
  data: {    
    src_img: "../../image/logo/logo.jpg",
    me_name: "微V日记"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'nickName',
      success: function(res) {
        // console.log(res.data);
        that.setData({
          me_name: res.data
        });
      },
    });
    wx.getStorage({
      key: 'avatarUrl',
      success: function (res) {
        // console.log(res.data);
        that.setData({
          src_img: res.data
        });
      },
    })
    
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
  handleTapShareButton:function () {
    if (!((typeof wx.canIUse === 'function') && wx.canIUse('button.open-type.share'))) {
      wx.showModal({
        title: '当前版本不支持转发按钮',
        content: '请升级至最新版本微信客户端',
        showCancel: false
      })
    }
  },
  shareMessage:function(){
    
  },

  about:function() {
    wx.navigateTo({
      url: '../diary-about/index',
    })
  },
  user_info:function() {
    wx.navigateTo({
      url: '../diary-user-info/index',
    })
  },
  unfinished: function() {
    wx.showModal({
      title: '惨痛声明',
      content: '开发人员因劳累过度正在休养……实在抱歉。',
      showCancel: false,
      confirmText: '好吧'
    })
  },
  toStatistic: function() {
    wx.navigateTo({
      url: '../diary-statistic/index',
    })
  }
})
