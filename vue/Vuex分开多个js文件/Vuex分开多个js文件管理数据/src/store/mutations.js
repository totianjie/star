//所有的方法名称都存在types里面
import * as types from './types';
//引入状态模块
import state from './state';
//暴跌出去的数据
import getters from './getters';
const mutations={
    [types.INCREMENT]:(state) => {
        state.count++;
    },
    [types.DECREMENT]:(state) => {
        state.count--;
    },
    [types.CLICK_ODD]:(state) => {
        state.count++;
    },
    [types.CLICK_ASYNC]:(state) => {
        state.count++;
    }
};
//导出所有的模块   所以在index.js里面要把mutations放入modules里面（因为mutations是一个磊的模块）
export default {
    state,
    types,
    getters,
    mutations    
}