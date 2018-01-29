import {INCREMENT} from './types';
import getters from './getters';
console.log(getters);
const state={
    count:0
};
const mutations={
    INCREMENT:(state) => {
        state.count++;
    }
};
export default {
    state,
    getters,
    mutations
}