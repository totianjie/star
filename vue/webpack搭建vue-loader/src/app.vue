<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Home from './components/home/Home.vue'
export default {
    data: function() {	
        return {}
    },
    components:{
        Home
    },
    methods: {}
}
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
        list-style:none;
    }
</style>