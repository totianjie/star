//var mod=require('./a');  //引入模块a.js
//require('style-loader!css-loader!./style.css')	//引入css模块
require('./style.css');
import modB from './b.js'
let a=12;
let b=5;
// document.write(a+'---'+mod.a+','+b);
document.write(modB.a);