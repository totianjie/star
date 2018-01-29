```
<!--
    <script>
        function show(json){
            alert(json.s);
        }
    </script>
    <script src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=中国&cb=show"></script>

    -->
    <script>
        function json2url(json){
            var arr=[];
            for(var name in json){
                arr.push(name+'='+json[name]);
            }
            return arr.join('&');
        }

        function jsonp(json){
            json = json || {};  
            //没有路径就不用往下走了
            if(!json.url)return;   
            //默认给cb    
            json.cbName  = json.cbName || 'cb';  
            //如果没有数据给个空对象
            json.data = json.data || {};  
            
            //清除缓存   相当于是把json.cbName一起放入了data当中用于在下一步好合并成xx=xx&xx=xx&的形式
            json.data[json.cbName] = 'show'+Math.random();  
            //在上一步中留下了个点  清除掉
            json.data[json.cbName]=json.data[json.cbName].replace('.','');

            var oHead=document.getElementsByTagName('head')[0];
            var oS=document.createElement('script');
            oS.src=json.url+'?'+json2url(json.data);
            oHead.appendChild(oS);
            //回调函数必须是全局的
            window[json.data[json.cbName]]=function(res){
                //数据已经拿到 可以把oS干掉了
                oHead.removeChild(oS);
                json.success && json.success(res);
            }
        }

        window.onload=function(){
            jsonp({
                "url":"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                data:{
                    "wd":"湖南"
                },
                success:function(res){
                    console.log(res);
                }
            });
        }
    </script>
```