//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    msg: '数据',
    inputValue: '',
    arr: [
      // { msg: 'aaa' },
      // { msg: 'bbb' },
      // { msg: 'ccc' },
      // { msg: 'ddd'},
    ]
  },
  inputChange (ev) {
    this.setData({
      inputValue: ev.detail.value
    });
  },
  add () {
    var arr = this.data.arr;
    arr.push({
      msg: this.data.inputValue
    });
    this.setData({
      arr: arr,
      inputValue: ''
    });
  },
  delete (ev) {
    console.log(ev.target.dataset);
    console.log('点击删除');
  },
  addHistor () {
    wx.setStorage({
      key: 'arr',
      data: this.data.arr,
      success (res) {
        console.log('异步保存成功',res);
      }
    });
    wx.getStorage({
      key: 'arr',
      success (res) {
        console.log('异步获取成功',res);
      }
    });
    wx.removeStorage({
      'key': 'arr',
      success (res) {
        console.log('删除成功',res);
      }
    });
    wx.clearStorage({
      success (res) {
        console.log('全部清除成功',res);
      }
    });
    wx.getStorageInfo({
      success(res) {
        console.log('获取本地缓存信息成功',res);
      }
    });
  },
  getData () {
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success (res) {
        console.log(res);
      },
      fail (res) {
        console.log("接口调用失败");
      }
    });
  }
})
