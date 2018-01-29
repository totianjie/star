> #### scss处理rem

~~~scss
$browser-default-font-size: 37.5px !default;
//$browser-default-font-size: 75px !default;

@function pxTorem($px){//$px为需要转换的字号
    @if (unitless($px)) {
        @return pxTorem($px + 0px);
    }@else if (unit($px) == em) {
        @return $px;
    }
    @return ($px / $browser-default-font-size) * 1rem;
}
@function pxToremNeg($px){//同上,负值转换,用于垂直居中,margin-top为负的半高度...
    @return ($px / $browser-default-font-size) * 1rem * -1;
}

// 使用    width: pxTorem(20px);
~~~

> #### scss小图标处理

~~~scss
@mixin bg-image ($url) {// 小图标处理 二倍 三倍
    background-image: url($url + "@2x.png");
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        background-image: url($url + "@3x.png");
    }
}
// 使用 @include bg-image(../../image/1.png);  //  路径
~~~

> #### 一像素边框

~~~~scss
@mixin border-1px($color){// 一像素边框
    position: relative;
    &:after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: pxTorem(1px) solid $color;
        content: ' ';
    }
}
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
    .border-1px{
        &::after{
            -webkit-transform: scaleY(0.7);
            transform: scaleY(0.7);
        }

    }

}


@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
    .border-1px{
        &::after{
            -webkit-transform: scaleY(0.5)
            transform: scaleY(0.5)
        }

    }

}

// 使用  @include border-1px(#ccc);
~~~~

> #### 移动端字体问题

~~~~scss
@mixin font-dpr($font-size) {// 移动端字体问题
	font-size: $font-size;
	[data-dpr="2"] & {
		font-size: $font-size * 2;
	}
	[data-dpr="3"] & {
		font-size: $font-size * 3;
	}
}

@include font-dpr(14px);//使用
~~~~

> #### less中两倍和三倍背景图片处理

~~~~less
//-------------------------less中两倍和三倍背景图片处理(主要是路径处理比较特殊加了个 ~   )
.bg-image(@url){
 	background-image:~"url(@{url}@2x.png)";
 	@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
   		background-image:~"url(@{url}@3x.png)";
 	}
}
~~~~

> #### js处理rem

~~~~javascript
<script>
    ;(function () {
        function rem (n) {
            var r = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = (r * 100 / (375 * n)) + 'px';
        }

        rem(2);

        window.onresize = function () {
            var time = null;
            clearTimeout(time);
            time = setTimeout(function () {
                rem(2);
            }, 300);
        };
        /*按375标准，如果设计稿是750，那么倍率是2,测量是20px,那么写样式时就写0.2rem*/
    })();
</script>
~~~~

