import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//状态
const state={count:10};
//改变状态
const mutations={
  increment(state){
    state.count++;
  },
  decrement(state){
    state.count--;
  },
  clickOdd(state){
    state.count++;
  },
  clickAsync(state){
    state.count++;
  }
};
//事件处理  commit出去   state就是state
const actions={
  increment:({commit,state},n) => {
    console.log(n);
    commit('increment');
  },
  decrement:({commit}) => {
    commit('decrement');
  },
  clickOdd:({commit,state}) => {
    if(state.count%2 === 0){commit('clickOdd');}
  },
  clickAsync:({commit}) => {
    let p1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve();
        },1000);
    });
    p1.then((res)=>{
      commit('clickAsync');
    });
  }
};
//获取数据
const getters={
  count(state){return state.count;},
  isOdd(state){return state.count%2 === 0 ? '偶数' : '奇数'}
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
