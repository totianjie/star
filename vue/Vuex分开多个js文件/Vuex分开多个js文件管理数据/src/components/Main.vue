<template>
    <div id="main">
        <h1>main</h1>
         {{msg}}
        <br>
        <router-view></router-view>
        <input type="button" value="增加" @click="increment">
        <input type="button" value="减少" @click="decrement">
        <input type="button" value="偶数增加" @click="clickOdd">
        <input type="button" value="点击异步" @click="clickAsync">
        <div>
            <p>
            现在数字为：{{count}}----->{{isOdd}}
            </p>
        </div>
        
        <v-title></v-title>
        <!--<v-temp></v-temp>
        <v-temp2></v-temp2>-->
    </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex';
import vTitle from './Title';
import vTemp from './Temp';
import vTemp2 from './Temp2';

export default {
    name: 'main',
    data() {	
        return {
            msg:'main'
        }
    },
    computed:{
        ...mapGetters(['count','isOdd'])
    },
    components:{
        vTitle,
        vTemp,
        vTemp2
    },
    methods:{
        ...mapActions(['increment','decrement','clickOdd','clickAsync'])
    },
    mounted(){
    }
}
//http://budget.xinchengyue.com:8081/index/index.html?loginNo=zhaohs&password=Z@951272
</script>

<style scoped>

</style>

