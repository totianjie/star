import Vue from 'vue';
import App from './app.vue';
import router from './router/';

new Vue({
    el:'#app',
    router,    
    render:h => h(App)//目前一定要这样写
});
