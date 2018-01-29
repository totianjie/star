import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//状态
const state={
    count:0
};
//改变状态只能在mutations里面
const mutations={
    increment:(state,params) => {
        state.count++;
    },
    decrement:(state) => {
        state.count--;
    },
    clickOdd:(state) => {
        state.count++;
    },
    clickAsync:(state) => {
        state.count++;
    }
};
//处理事件及异步，逻辑
const actions={
    //接收一个对象context   第二个参数也是一个对象自己自己传的参数
    increment:({commit, state, getters},params) => {
        commit('increment',params.num);
    },
    decrement:({ commit }) => {
        commit('decrement');
    },
    clickOdd:({ commit, state }) => {
        if(state.count%2 === 0){commit('clickOdd')}
    },
    clickAsync:({ commit }) => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                commit('clickAsync');
                resolve();
            },1000);
        });
    }
};
//暴露出去的数据
const getters={
    count: (state) => {
        return state.count
    },
    isOdd: (state) => {
        return state.count%2 === 0 ? '偶数' : '奇数';
    }
};

//导出
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});