<template>
    <div class="head">
        <ul>
            <router-link to="/home" tag="li">home</router-link>
            <router-link to="/news" tag="li">news</router-link>
            <router-link to="/login" tag="li">login</router-link>
            <router-link to="/reg" tag="li">reg</router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Head',
    data: function() {	
        return {}
    },
    methods: {
    }
}
</script>

<style scoped>

    ul{
        width: 100%;
        overflow: hidden;
        display:flex;

    }
    .router-link-active{
        background: #ccc;
        color: #000;
    }
    ul li{
        flex:1;
        height:50px;
        display: flex;
        align-items:center;
        justify-content:center;
        background: #000;
        color: #fff;
    }
</style>