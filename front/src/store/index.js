import Vuex from 'vuex';
import Vue from 'vue';
import {INCREASE_TODO, TODO_DONE } from './mutaion_types';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        todos: [
            {id:1, text: '待办事项1', done: true},
            {id:2, text: '待办事项2', done: false}
        ]
    },

    /* 其作用 和 vue 的 computed 属性类似*/
    getters: {
        /*通过属性访问*/
      doneTodos: (state) => {
          return state.todos.filter(todo => todo.done);
      },
        /*通过方法访问*/
      getTodoById: (state) => (id) => {
          return state.todos.find(todo => todo.id === id)
      }
    },

    /* 不允许异步操作*/
    mutations: {
        increment(state, payload) {
            state.count+= payload.amount;
        },

        /* 使用常量作为函数名, 需要带中括号*/
        [INCREASE_TODO] (state, todo) {
            state.todos.push(todo);
        },

        [TODO_DONE] (state, {id, done}){
            let todo = state.getTodoById(id);
            if(todo){
                todo.done = done;
            }
        }
    },

    /* 允许异步操作 */
    actions: {
        //Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
        updateTodoList: function () {
            10-50/1
        }
    }


    /*vuex commit 和 dispatch*/
});
