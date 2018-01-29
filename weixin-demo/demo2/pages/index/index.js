//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    msg: '数据',
    bShow: true,
    arr: [111, 222, 333],
    arrData: [
      {name: 'aaa', age: 12 },
      {name: 'bbb', age: 12 },
      {name: 'ccc',age: 12},
    ]
  },
  change () {
    let b = this.data.bShow ? false : true;
    this.setData ({
      bShow: b
    });
  }
})
