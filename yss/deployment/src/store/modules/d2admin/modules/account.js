import { Message, MessageBox } from 'element-ui';
import util from '@/libs/util.js';
import router from '@/router';
import { AccountLogin, updatePassword } from '@api/sys.login';
import store from '@/store';
import { setToken, removeToken } from '@/libs/auth';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login ({ dispatch }, { account = '', password = '', token = '' } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin({
          account,
          password,
          token,
        })
          .then(async result => {
            if (result.data) {
              let res = result.data;
              // 设置 cookie 一定要存 uuid 和 token 两个 cookie
              // 整个系统依赖这两个数据进行校验和存储
              // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
              // token 代表用户当前登录状态 建议在网络请求中携带 token
              // 如有必要 token 需要定时更新，默认保存一天(待实现)
              util.cookies.set('uuid', res.token);
              setToken(res.token);
              // 设置 vuex 用户信息
              await dispatch(
                'd2admin/user/set',
                {
                  name: res.nickname,
                  user: res.username,
                },
                { root: true }
              );
              // 用户登录后从持久化数据加载一系列的设置
              await dispatch('load');
              let menu = res.menu;
              menu && util.storageMenuToCookies(menu);
              /*
              let menusFront = util.backendMenusToMenus(menu.children)
              let routers = util.backendMenusToTwoRouters(menu)
              router.replace(routers)
              // 更新标签页池
              store.commit('d2admin/page/init', menusFront)
              store.commit('d2admin/menu/asideSet', menusFront)
              */
            }
            // 结束
            resolve(result);
          })
          .catch(err => {
            console.log('err: ', err);
            reject(err);
          });
      });
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 删除cookie
        removeToken();
        util.cookies.remove('uuid');
        util.cookies.remove('menus');
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true });
        // 跳转路由
        router.push({
          name: 'login',
        });
        store.dispatch('d2admin/db/databasePageClear');
        store.dispatch('d2admin/db/databasePageClear', {
          user: true,
        });
      }

      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true });
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
          type: 'warning',
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true });
            logout();
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true });
            Message({
              message: '取消注销操作',
            });
          });
      } else {
        logout();
      }
    },
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    updateUserPassword ({ dispatch }, { username = '', password = '', newPassword = '' } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        updatePassword({
          username,
          password,
          newPassword,
        })
          .then(async res => {
            Message({
              message: '修改密码成功，返回登陆。',
            });
            // this.logout({}, true)
            removeToken();
            util.cookies.remove('uuid');
            util.cookies.remove('menus');
            // 清空 vuex 用户信息
            await dispatch('d2admin/user/set', {}, { root: true });
            // 跳转路由
            router.push({
              name: 'login',
            });
            // 主动清空路由 暂未生效 待测试
            store.dispatch('d2admin/db/databasePageClear');
            store.dispatch('d2admin/db/databasePageClear', {
              user: true,
            });
          })
          .catch(err => {
            console.log('err: ', err);
            reject(err);
          });
      });
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load ({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true });
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true });
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true });
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true });
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true });
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true });
        // DB -> store 持久化数据加载颜色设置
        await dispatch('d2admin/color/load', null, { root: true });
        // end
        resolve();
      });
    },
  },
};
