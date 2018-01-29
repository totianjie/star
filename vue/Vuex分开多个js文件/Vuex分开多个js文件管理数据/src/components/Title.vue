<template>
    <div id="title">
        <ul>
            <li @click='is(0)'>模块1</li>
            <li @click='is(1)'>模块2</li>
        </ul>
        <component :is="temp"></component>
    </div>
</template>

<script>
import vTemp from './Temp';
import vTemp2 from './Temp2';
export default {
    name: 'title',
    data() {	
        return {
            temp:vTemp
        }
    },
    components:{
        vTemp,
        vTemp2
    },
    methods: {
        is(i){
            i === 0 ? this.temp=vTemp : this.temp=vTemp2;
        }
    }
}
</script>

<style scoped lang="less">
    #title{
        color:#399;
        width:100%;
        ul{
            font-size:20px;
            margin:0 auto;
            overflow: hidden;
            display:flex;
            justify-content:center;
            cursor:pointer;
            li{
                width:100px;
                float:left;
                list-style:none;
            }
        }
    }
</style>