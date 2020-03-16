// page/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src_img: "../../image/logo/logo.jpg",
    version: "v1.0.1",
    info: "微微日记提供一个工具，帮助使用者记录每一天的心情，记录每天值得记录的事情。",
    advocate: "微微日记提倡书写时斟词酌句，多加思量，不可随意乱写，错字连篇。但也不可故作高深，无病呻吟。" ,
    showAbout: "show",
    showAdvocate: "none",
    showFeedback:"none",
    hideFeedback:"show"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage() {
    return {
      title: '转发按钮',
      path: 'page/API/pages/share-button/share-button'
    }
  },
  handleTapShareButton: function () {
    if (!((typeof wx.canIUse === 'function') && wx.canIUse('button.open-type.share'))) {
      wx.showModal({
        title: '当前版本不支持转发按钮',
        content: '请升级至最新版本微信客户端',
        showCancel: false
      })
    }
  },

  shareMessage: function () {
    // this.handleTapShareButton();

  },

  // 显示关于
  showAbout:function() {
      this.setData({
        showAbout: show(this.data.showAbout),
        showAdvocate: "none",
      });
  
  },

  // 显示建议
  showAdvocate: function () {
    this.setData({
      showAbout: "none",
      showAdvocate: show(this.data.showAdvocate)
    });
  },
  // 显示反馈
  showFeedback: function () {
    this.setData({
      showFeedback: "show",
      showAdvocate: "none",
      showAbout: "none",
      hideFeedback:"none"
    });
  },
  back:function(){
    wx.navigateBack({
      
    });
  },
  feedback:function() {
    wx.showToast({
      title: '感谢反馈',
      icon: 'success',
      duration: 1500
    });
    wx.setStorage({
      key: 'refresh',
      data: 'true',
    })
    setTimeout(function () {
      // 经授权，跳转到主页
      wx.navigateBack({

      });
    }, 1500);
  }
})

// 是否显示
function show(data){
  if (data == "show") {
    return "none";
  }else {
    return "show";
  }
}