// Vue
import Vue from 'vue';
import i18n from './lang';
import App from './App';
// 核心插件
import d2Admin from '@/plugin/d2admin';
// store
import store from '@/store/index';

import 'xterm/dist/xterm.css';

import '@/styles/iconFont/iconfont.css';
// import '@/styles/font/font.css';

// 菜单和路由设置
import router from './router';
import menuAside from '@/menu/aside';
import { frameInRoutes } from '@/router/routes';
import D2Crud from '@d2-projects/d2-crud';
import VModal from 'vue-js-modal';

import '@/styles/index.scss';
import menuHeader from '@/menu/header';

import * as api from '@/api/menu/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

// 重写message，解决狂点不停弹消息框问题
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { message } from '@/utils/resetMessage';
import VCharts from 'v-charts';
// codemirror
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import { setToken, removeToken } from '@/libs/auth';
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */);

library.add(fas, far, fab);
Vue.use(ElementUI);
Vue.use(VCharts);

Vue.prototype.$message = message;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

// 核心插件
Vue.use(d2Admin);
Vue.use(D2Crud);
Vue.use(VModal, {
  dialog: true,
  dynamic: true,
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes);
    // 设置顶栏菜单
    // 设置侧边栏菜单     //this.$store.commit('d2admin/menu/headerSet', menuHeader)
    if (!menuAside.length) {
      window.setTimeout(() => {
        api.fetchMenu().then(res => {
          this.$store.commit('d2admin/menu/asideSet', res.data);
          this.$store.commit('d2admin/search/init', res.data);
        });
      });
    } else {
      this.$store.commit('d2admin/search/init', menuHeader);
      this.$store.commit('d2admin/menu/asideSet', menuAside);
    }
    if (window.opener) {
      removeToken();
    }
    // 初始化菜单搜索功能
    // this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow');
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load');
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get');
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen');
    // window.addEventListener('beforeunload', e => {
    //   util.cookies.remove('token')
    //   util.cookies.remove('uuid')
    //   util.cookies.remove('menus')
    // })
  },
}).$mount('#app');
