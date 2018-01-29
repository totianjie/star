/**
 * Created by strive-智能社 on 2016/12/9.
 */
seajs.config({
    base:'./js' //文件相对目录
});
seajs.use('sum',function(sumMod){
    var res=sumMod.res();

    alert(res);
});





































