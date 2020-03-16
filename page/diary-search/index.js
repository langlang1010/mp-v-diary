const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  onShareAppMessage() {
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    }
  },

  data: {
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth()+1,
    days,
    day: date.getDate(),
    value: [9999, 1, 1],
    isDaytime: true,
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  confirm:function() {
    // console.log(this.data.day);
    var d = this.data.day + 1;
    var time = this.data.year+"-"+this.data.month+"-"+d;
    console.log(time);
    wx.setStorage({
      key: 'pickDate',
      data: time,
      success: function() {
        wx.navigateBack({
          
        });
      }
    })
  }
})