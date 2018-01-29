/**
 * Created by strive-智能社 on 2016/12/9.
 */

define(function(require,exports,module){
    var Move=require('move');
    var COM=require('common');
    exports.show=function(id){
        var oPlay=COM.getById(id);
        var oOl=COM.getByTagName(oPlay,'ol')[0];
        var aBtn=oOl.children;
        var oUl=COM.getByTagName(oPlay,'ul')[0];
        var aLi=oUl.children;

        for(var i=0; i<aBtn.length; i++){
            aBtn[i].index=i;
            aBtn[i].onmouseover=function(){
                for(var i=0; i<aBtn.length; i++){
                    aBtn[i].className='';
                }
                this.className='active';
                //oUl.style.top=-this.index*aLi[0].offsetHeight+'px';
                Move.animate(oUl,{top:-this.index*aLi[0].offsetHeight});
            };
        }
    };
});





































