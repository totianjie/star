<template>
    <div>
        <v-head></v-head>
        <div>
            <v-news-list></v-news-list>
        </div>
        <vNewsList2></vNewsList2>
    </div>
</template>

<script>
import vHead from '../common/Head.vue';
import vNewsList from './NewsList.vue';
import vNewsList2 from './NewsList2.vue';
export default {
    name: 'news',
    data: function() {	
        return {}
    },
    components:{ vHead, vNewsList, vNewsList2 },
    methods: {}
}
</script>

<style scoped lang="less">

</style>