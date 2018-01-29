<template>
  <div id="app">
    <input type="button" value="返回" @click="goBack()">
    <v-head></v-head>
    <!-- <transition :name="transitionName" @after-leave="afterLeave">
      <router-view class="poc"></router-view>
    </transition> -->
    <transition enter-active-class="lightSpeedIn" leave-active-class="bounceOutLeft">
       <router-view class="poc animated"></router-view>
    </transition>
   
  </div>
</template>

<script>
  import vHead from './components/Head';
export default {
  name: 'app',
  data(){
    return{
      transitionName:'slide-left',
      routerList:[]
    }
  },
  components:{ vHead },
  methods:{
    goBack(){
      // this.transitionName='slide-right';
      window.history.go(-1);
    },
    afterLeave(){
      // this.transitionName='slide-left';
        console.log('动画leave之后');
    }
  },
  mounted(){
    /*
      在路由中以下两个监听历史记录的都没用   vue路由是每次都添加一个历史记录
    */
    // window.addEventListener("popstate", function(e) {
    //   console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
    // }, false);

    if (window.history && window.history.pushState) {
      //历史记录发生变化时
      window.onpopstate= function() {
        
      }

      // window.history.pushState('forward', null, './#forward');
    }
  },
  watch: {
    //如果是要判断是那一级的路由在动
    '$route' (to,from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;

      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
}
</script>

<style>
body,html{
  width:100%;
  height: 100%;
}
*{ margin: 0; padding: 0; }
#app{ width: 100%; height: 100%; overflow: hidden; position:relative; }
ul,li{ list-style: none;}

.poc{
  position:absolute;
  top:100px;
  /* left:0; */
}
.slide-left-enter{
  left:100%;
}
.slide-left-enter-active{
  transition: 1s all linear;
}
.slide-left-leave-active{
  left:-100%;
  transition: 1s all linear;
}

/* 做了一个返回动画  但是没法判断返回历史记录    在手机端还有问题 */
.slide-right-enter{
  left:-100%;
}
.slide-right-enter-active{
  transition: 1s all linear;
}
.slide-right-leave-active{
  left:100%;
  transition: 1s all linear;
}
</style>
