// 所有需要的数据都定义在getters里面   在这里暴露出去
//getters里面就是一个计算属性
export default {
    count:( state ) => {
        return state.count;
    },
    isOdd:( state ) => {
        return state.count%2 === 0 ? '偶数' : '奇数';
    }
}