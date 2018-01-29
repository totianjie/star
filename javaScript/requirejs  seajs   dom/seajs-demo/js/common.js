/**
 * Created by strive-智能社 on 2016/12/9.
 */
define(function(require,exports,module){
    module.exports={
        getStyle:function(obj,name){
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return getComputedStyle(obj,false)[name];
            }
        },
        getById:function(id){
            return document.getElementById(id);
        },
        getByTagName:function(oParent,tagName){
            return oParent.getElementsByTagName(tagName);
        }
    };
});





































