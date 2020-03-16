const config = require('../../config')

Page({
  data: {
    hideLoading: true,
    hideNoMore: true,
    hideEnd: false,
    diaries: "",
    diaries_temp: "",
    diary_page: 1,
    diary_search_page: 1,
    userid: "",
    session_key: "",
    date: '2019-03-03',
    datePicker: false,
    // no_more_data: false,
    search_date: "",
    search_state: true
    // search_no_more: false
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onPullDownRefresh() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    this.onLoad();
    // console.log('onPullDownRefresh', new Date())
  },

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
        // console.log(res, new Date())
      }
    })
  },
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
    // 判断是不是需要更新
    var that = this;
    wx.getStorage({
      key: 'refresh',
      success: function (res) {
        if (res.data == "true") {
          // 初始化页数
          that.data.diary_page = 1;
          that.setData({
            hideLoading: true,
            hideNoMore: true,
            hideEnd: false
          });
          that.onLoad();
          wx.removeStorage({
            key: 'refresh',
            success: function (res2) {
            },
          })
        }
      },
    });

    var ddate;
    // 判断是不是search
    wx.getStorage({
      key: 'pickDate',
      success: function (res) {
        ddate = res.data;
        wx.showLoading({
          title: '正在加载'
        })
        wx.removeStorage({
          key: 'pickDate',
          success: function (res) {
            // 提交请求，查询此日期之后的日记
            wx.request({
              url: '' + config.listByDate,
              data: {
                userid: that.data.userid,
                session_key: that.data.session_key,
                page: 1,
                date: ddate
              }, success: function (res2) {
                // console.log(res2.data.message);
                // console.log(res2.data.data);
                that.setData({
                  search_state: false,
                  search_date: ddate,
                  diary_search_page: 1
                });
                // 暂时保存
                that.data.diaries_temp = that.data.diaries;
                if (res2.data.data == null) {
                  wx.hideLoading();
                  that.setData({
                    diaries: "",
                    hideLoading: true,
                    hideNoMore: false,
                    hideEnd: true
                  });
                  return;
                }
                var i;
                // 显示查询结果
                for (i = 0; i < res2.data.data.length; i++) {
                  var date = res2.data.data[i].gmtCreate + "";
                  res2.data.data[i].gmtCreate = date.substring(0, 10);
                  var rdate = new Date(res2.data.data[i].gmtCreate);
                  res2.data.data[i].minicontent = res2.data.data[i].content.substring(0, 20);
                  res2.data.data[i].week = getWeek(rdate.getDay());;
                }
                that.setData({
                  diaries: res2.data.data
                });
                wx.hideLoading();
              }

            })
          },
        })
      },
    })

  },

  onShareAppMessage() {
    return {
      title: '快来使用微V日记',
      path: 'page/diary/index'
    }
  },

  onLoad() {
    var that = this;
    // 初始化页数
    that.data.diary_page = 1;
    that.data.diary_search_page = 1;
    that.setData({
      hideLoading: true,
      hideNoMore: true,
      hideEnd: false
    });
    var user;
    // 设置userid和session_key
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        that.data.userid = res.data;
        // 设置userid和session_key
        wx.getStorage({
          key: 'session_key',
          success: function (res2) {
            that.data.session_key = res2.data;

            // 请求
            wx.request({
              url: config.listDiary + '',
              data: {
                userid: that.data.userid,
                page: 1,
                session_key: that.data.session_key
              },
              success(res) {
                var i;
                if (res.data.data == null) {
                  that.setData({
                    hideLoading: true,
                    hideNoMore: false,
                    hideEnd: true,
                  });
                  return;
                }
                // no more
                if (res.data.message == "no more") {
                  that.setData({
                    hideLoading: true,
                    hideNoMore: false,
                    hideEnd: true,
                  });
                }
                for (i = 0; i < res.data.data.length; i++) {
                  var date = res.data.data[i].gmtCreate + "";
                  res.data.data[i].gmtCreate = date.substring(0, 10);
                  var rdate = new Date(res.data.data[i].gmtCreate);
                  res.data.data[i].minicontent = res.data.data[i].content.substring(0, 20);
                  res.data.data[i].week = getWeek(rdate.getDay());;
                }
                that.setData({
                  diaries: res.data.data
                });
              }
            })
          },
        });
      },
    });
  },

  // 查找
  btn_search: function () {
    wx.navigateTo({ url: '../diary-search/index' });
    this.setData({
      diary_search_page: 1
    });
  },
  // 取消
  btn_cancel: function () {
    var temp = this.data.diaries_temp;
    this.setData({
      search_state: true,
      diaries: temp
    });
  },

  // 前去write
  btn_write: function () {
    // this.btn_cancel();
    wx.switchTab({
      url: '../diary-write/index',
    })
  },

  // 查看日记详情
  showDiary: function (e) {
    var index = e.currentTarget.dataset.diary;
    var that = this;
    var data_diary = that.data.diaries[index];
    wx.setStorage({
      key: 'diary',
      data: data_diary
    });

    // console.log(index);
    wx.navigateTo({
      url: '../diary-edit/index',
    })
  },


  // 加载更多
  onReachBottom: function () {
    // 判断是不是在search
    if (this.data.search_state == false) {
      // console.log("searching");
      // 显示正在加载
      this.setData({
        hideLoading: false,
        hideNoMore: true,
        hideEnd: true
      });
      // search more
      searchMore(this);
      return;
    }

    // 显示正在加载
    this.setData({
      hideLoading: false,
      hideNoMore: true,
      hideEnd: true
    });

    var that = this;
    // 定时任务0.5s后执行
    setTimeout(function () {
      var page = that.data.diary_page + 1;
      // 提交请求
      wx.request({
        url: '' + config.listDiary,
        data: {
          userid: that.data.userid,
          page: page,
          session_key: that.data.session_key
        }, success(res) {
          // 判断是否加载完成
          if (res.data.data == null) {
            // console.log("no more");
            that.setData({
              hideLoading: true,
              hideNoMore: false,
              hideEnd: true
            });
            return;
          }

          // 还可以继续加载
          that.setData({
            hideLoading: true,
            hideNoMore: true,
            hideEnd: false
          });

          // 页面数+1
          that.setData({
            diary_page: that.data.diary_page + 1
          });
          // console.log(res.data.data);
          var i;
          for (i = 0; i < res.data.data.length; i++) {
            var date = res.data.data[i].gmtCreate + "";
            res.data.data[i].gmtCreate = date.substring(0, 10);
            var rdate = new Date(res.data.data[i].gmtCreate);
            res.data.data[i].minicontent = res.data.data[i].content.substring(0, 20);
            res.data.data[i].week = getWeek(rdate.getDay());;
          }

          // 补到原来的数组后面
          var add = res.data.data;
          var data = that.data.diaries;
          data = data.concat(add);
          // console.log(data);
          that.setData({
            diaries: data
          });
        }
      })
    }, 500);
  }
})

function searchMore(that) {
  // 定时任务0.5s后执行
  setTimeout(function () {
    var page = that.data.diary_search_page + 1;
    // 提交请求
    wx.request({
      url: '' + config.listByDate,
      data: {
        userid: that.data.userid,
        page: page,
        session_key: that.data.session_key,
        date: that.data.search_date
      }, success(res) {
        // 判断是否加载完成
        if (res.data.data == null) {
          // console.log("no more");
          that.setData({
            hideLoading: true,
            hideNoMore: false,
            hideEnd: true
          });
          return;
        }

        // 还可以继续加载
        that.setData({
          hideLoading: true,
          hideNoMore: true,
          hideEnd: false
        });

        // 页面数+1
        that.setData({
          diary_search_page: that.data.diary_search_page + 1
        });
        // console.log(res.data.data);
        var i;
        for (i = 0; i < res.data.data.length; i++) {
          var date = res.data.data[i].gmtCreate + "";
          res.data.data[i].gmtCreate = date.substring(0, 10);
          var rdate = new Date(res.data.data[i].gmtCreate);
          res.data.data[i].minicontent = res.data.data[i].content.substring(0, 20);
          res.data.data[i].week = getWeek(rdate.getDay());;
        }

        // 补到原来的数组后面
        var add = res.data.data;
        var data = that.data.diaries;
        data = data.concat(add);
        // console.log(data);
        that.setData({
          diaries: data
        });
      }
    })
  }, 500);
}
function getWeek(num) {
  var weeks = ["天", "一", "二", "三", "四", "五", "六"];
  return "星期" + weeks[num];
}