<template>
    <div id="temp">
        <h1>模板1</h1>
        <input type="button" value="点击发送事件给父级" ref="btn">
    </div>
</template>

<script>
export default {
    name: 'temp',
    data() {	
        return {}
    },
    methods: {
        sendEvent(ev){
            
            console.log(this.$refs.btn);
            // this.dispatch('childEvent',);
        }
    },
    mounted(){
        this.sendEvent();
    }
}
</script>

<style scoped>

</style>