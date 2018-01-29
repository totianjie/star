<template>
    <div id="head">
        <ul>
            <router-link to="/home" tag="li">首页</router-link>
            <router-link to="/news" tag="li">新闻</router-link>
            <router-link to="/login" tag="li">登录</router-link>
            <router-link to="/reg" tag="li">注册</router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'head',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="less">
    #head{
        width:100%;
        ul{
            display:flex;

            li{

                flex:1;
                display:flex;
                align-items:center;
                justify-content:center;
                line-height: 50px;
                color:#fff;
                background-color:#f60;
                &.router-link-exact-active{
                    background-color:aqua;
                }
            }
        }
    }
</style>