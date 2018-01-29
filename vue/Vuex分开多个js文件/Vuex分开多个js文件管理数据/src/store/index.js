import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
//把Vuex导出    在main里面一定要引入store.js   放入到vue实例里面
export default new Vuex.Store({
    modules:{
        mutations
    },
    actions
});
