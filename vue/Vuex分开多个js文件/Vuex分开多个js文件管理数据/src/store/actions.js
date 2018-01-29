//全部的方法名称都存在types里面的
//import { INCREMENT, DECREMENT } from './types  一个一个的引入   下面方法是一次性全部引入
import * as types from './types';
export default {
    increment:({ commit }) => {
        commit(types.INCREMENT);
    },
    decrement:({ commit }) => {
        commit( types.DECREMENT );
    },
    clickOdd:({ commit, state }) => {
        //跟简单语法的区别  数据在state.mutations里面   因为是在mutations里面导出的
        state.mutations.count%2 === 0 && commit( types.CLICK_ODD );//if() else{} 
    },
    clickAsync:({ commit }) => {
        new Promise((resolve,reject) => {
            setTimeout(() => {
                commit(types.CLICK_ASYNC);
                resolve();
            },1000);
        });
    }
}