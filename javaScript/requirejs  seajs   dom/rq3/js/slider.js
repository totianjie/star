/**
 * Created by strive-智能社 on 2016/12/9.
 */
define(['move'],function(move){
    return {
        show:function(){
            var oPlay=document.getElementById('play');
            var oOl=oPlay.getElementsByTagName('ol')[0];
            var aBtn=oOl.children;
            var oUl=oPlay.getElementsByTagName('ul')[0];
            var aLi=oUl.children;

            oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

            for(var i=0; i<aBtn.length; i++){
                aBtn[i].index=i;
                aBtn[i].onmouseover=function(){
                    for(var i=0; i<aBtn.length; i++){
                        aBtn[i].className='';
                    }
                    this.className='active';
                    //oUl.style.left=-this.index*aLi[0].offsetWidth+'px';
                    move.startMove(oUl,{left:-this.index*aLi[0].offsetWidth});
                };
            }
        }
    };
});





































