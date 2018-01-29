/**
 * Created by strive-智能社 on 2016/12/9.
 */
define(['style'],function(style){
    return {
        startMove:function(obj,json,options){
            //判断默认值
            options=options || {};
            options.duration=options.duration || 500;
            options.easing=options.easing || 'ease-out';

            //准备运动需要东西
            var count=Math.floor(options.duration/30);

            var start={};
            var dis={};

            for(var name in json){
                start[name]=parseFloat(style.getStyle(obj,name));

                if(isNaN(start[name])){
                    //有事，没有给默认值
                    switch (name){
                        case 'left':
                            start[name]=obj.offsetLeft;
                            break;
                        case 'top':
                            start[name]=obj.offsetTop;
                            break;
                        case 'width':
                            start[name]=obj.offsetWidth;
                            break;
                        case 'height':
                            start[name]=obj.offsetHeight;
                            break;
                        case 'marginLeft':
                            start[name]=0;
                            break;
                        case 'marginTop':
                            start[name]=0;
                            break;
                        case 'fontSize':
                            start[name]=12;
                            break;
                        //.......

                    }
                }

                dis[name]=json[name]-start[name];
            }

            clearInterval(obj.timer);

            var n=0;

            obj.timer=setInterval(function(){
                n++;

                for(var name in json){

                    switch (options.easing){
                        case 'linear':
                            var a=n/count;
                            var cur=start[name]+dis[name]*a;
                            break;
                        case 'ease-in':
                            var a=n/count;
                            var cur=start[name]+dis[name]*Math.pow(a,3);
                            break;
                        case 'ease-out':
                            var a=1-n/count;
                            var cur=start[name]+dis[name]*(1-Math.pow(a,3));
                            break;
                    }

                    if(name=='opacity'){
                        obj.style.opacity=cur;
                        obj.style.filter='alpha(opacity:'+cur*100+')';
                    }else{
                        obj.style[name]=cur+'px';
                    }
                }

                if(n==count){
                    clearInterval(obj.timer);

                    options.complete && options.complete();
                }
            },30);
        }
    }
});





































