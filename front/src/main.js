import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from "./router";

import ElementUI from 'element-ui';
import VCharts from 'v-charts';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VCharts);

new Vue({
    router,
    store,
    data:function(){
        return {
            a : 1,
            b : '2',
            c : '3'
        }
    },

    beforeCreate() {
        console.log('before create');
    },
    created() {
       console.log('create');
    },
    beforeMount() {
        console.log('before mount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('before update');
    },
    update() {
        console.log('update');
    },
    render: h => h(App),
}).$mount('#app')
