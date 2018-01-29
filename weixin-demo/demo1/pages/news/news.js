// pages/news/news.js

const APP = getApp(); // 获取全局app
console.log(APP);
let com = require('../../utils/common');
console.log(com);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'abc'
  },
  fn () {
    this.setData ({
      msg: com.echoHello('小明')
    });
  },
  fn2 () {
    this.setData ({
      msg: com.echoBye('小明')
    });
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
  onShareAppMessage: function () {
  
  }
})