export default (store = {
    todos:[],
    dones:[]
},{
    type,
    payload
})=>{
    if(type==='CREATE_TODO'){
        return {
            ...store,
            todos: [payload.text].concat(store.todos)
        }
    }


    if(type==='GET_TODO_DONE'){
        return {
            ...store,
            todos: store.todos.filter((n,i)=> i!== payload.index),
            dones: store.dones.concat([store.todos[payload.index]])
        }
    }

    if(type==='GET_DONE_TODO'){
        return {
            ...store,
            dones: store.dones.filter((n,i)=> i!== payload.index),
            todos: store.todos.concat([store.dones[payload.index]])
        }
    }

    if(type==='DELET_TODO'){
        return {
            ...store,
            todos: store.todos.filter((n,i)=> i!==payload.index)
        }
    }
    if(type==='DELET_DONE'){
        return {
            ...store,
            dones: store.dones.filter((n,i)=> i!==payload.index)
        }
    }

    if(type==='MODIFY_TASK'){
        return {
            ...store,
            todos: store.todos.map((item,index)=>index===payload.index?payload.text:item)
        }
    }

    return store;
};







