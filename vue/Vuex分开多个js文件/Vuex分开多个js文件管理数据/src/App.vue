<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
  name: 'app',
  data(){
    return {
      msg:'vuex'
    }
  },
  computed:mapGetters(['count','isOdd']),
  methods:{
      ...mapActions(['increment','decrement','clickOdd','clickAsync'])
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
