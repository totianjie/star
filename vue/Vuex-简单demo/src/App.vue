<template>
  <div id="app">
    {{msg}}
    <br>
    <router-view></router-view>
    <input type="button" value="增加" @click="increment">
    <input type="button" value="减少" @click="decrement">
    <input type="button" value="偶数增加" @click="clickOdd">
    <input type="button" value="点击异步" @click="clickAsync">
    <div>
    {{$store.state.count}}
      <p>
      现在数字为：{{count}}------>{{isOdd}}
      </p>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState,mapMutations} from 'vuex'
export default {
  name: 'app',
  data(){
    return {
      msg:'vuex'
    }
  },
  // computed:{
  //   ...mapState(['count']),
  //   ...mapState(
  //     {
  //       isOdd:state => {
  //         if(state.count%2 === 0){return '偶数';}else{return '奇数'}
  //         return state.count;
  //       }
  //     }
  //   )
  // },
  computed:mapGetters(['count','isOdd']),
  methods:{
    //不需要传参的话就直接派发
    ...mapActions(['decrement','clickOdd','clickAsync']),
    //如果需要传参就despatch
    increment(){
      this.$store.dispatch({type:'increment',num:2});
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
