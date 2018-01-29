/**
 * Created by strive-智能社 on 2016/12/8.
 */

/*
* @desc 获取非行间样式
* @params  Object
* @parmas  String
* @parmas  [a]
* @return  String
*
* */
getStyle=(obj,name)=>{
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}





































