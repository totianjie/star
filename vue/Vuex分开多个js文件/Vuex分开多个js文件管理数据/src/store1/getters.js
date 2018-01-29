export default {
    count:(state) => {
        console.log(state);
        return state.count;
    },
    isOdd:(state) => {
        return state.count%2 === 0 ? '偶数' : '奇数';
    }
}