<template>
    <div>
        <!--<ul>
            <router-link :to="{path:'/news/1',query:{'namewe':'新闻1'}}" tag="li">新闻1</router-link>
            <router-link :to="{path:'/news/2',query:{'newame':'新闻2'}}" tag="li">新闻2</router-link>
            <router-link :to="{path:'/news/3',query:{'naewme':'新闻3'}}" tag="li">新闻3</router-link>
            <router-link :to="{path:'/news/4',query:{'naewme':'新闻4'}}" tag="li">新闻4</router-link>
            <router-link :to="{path:'/news/5',query:{'naewme':'新闻5'}}" tag="li">新闻5</router-link>
            <router-link :to="{path:'/news/6',query:{'newame':'新闻6'}}" tag="li">新闻6</router-link>
        </ul>-->
        <ul>
            <router-link to="/news/1" tag="li">新闻1</router-link>
            <router-link to="/news/2" tag="li">新闻2</router-link>
            <router-link to="/news/3" tag="li">新闻3</router-link>
            <router-link to="/news/4" tag="li">新闻4</router-link>
            <router-link to="/news/5" tag="li">新闻5</router-link>
            <router-link to="/news/6" tag="li">新闻6</router-link>
        </ul>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'newList',
    data: function() {	
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="less">
    ul{
        width:500px;

        li{
            line-height: 30px;
            list-style:none;
        }
    }
</style>