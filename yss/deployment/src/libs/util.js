import cookies from './util.cookies';
import db from './util.db';
import log from './util.log';
import layoutHeaderAside from '@/layout/header-aside';
import VueRouter from 'vue-router';

const util = {
  cookies,
  db,
  log,
};

export const createRouter = routes =>
  new VueRouter({
    routes,
  });

util.storageMenuToCookies = function (menuTree) {
  let menusStr = JSON.stringify(menuTree);
  db.set('menus', menusStr).write();
  // util.cookies.set('menus', menusStr)
};
/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin';
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`;
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.setAttribute('id', 'd2admin-link-temp');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(document.getElementById('d2admin-link-temp'));
};
util.backendMenusToMenus = menus => {
  let frontMenus = [];
  for (let j = 0; j < menus.length; j++) {
    let menu = menus[j];
    let route = util.backendMenuToMenu(menu);
    if (menu.children && menu.children.length > 0) {
      route.children = util.backendMenusToMenus(menu.children);
    }
    frontMenus.push(route);
  }
  return frontMenus;
};
util.backendMenuToMenu = menu => {
  let frontMenu = {};
  frontMenu.id = menu.id;
  frontMenu.title = menu.name;
  frontMenu.name = menu.name;
  frontMenu.path = menu.path;
  frontMenu.icon = menu.icon;
  frontMenu.url = menu.url;
  frontMenu.type = menu.type;
  frontMenu.pageType = menu.pageType;
  frontMenu.parentId = menu.parentId;
  let meta = {};
  meta.url = menu.url;
  meta.title = menu.name;
  meta.path = menu.path;
  meta.cache = true;
  frontMenu.meta = meta;
  return frontMenu;
};
util.backendMenusToTwoRouters = menu => {
  let routes = [];
  let route = util.backendMenuToRoute1(menu);
  let children = util.backendMenusToRouters1(menu.children);
  route.children = children;
  routes[0] = route;
  return routes;
};

util.backendMenusToRouters1 = menus => {
  let routers = [];
  for (let j = 0; j < menus.length; j++) {
    let menu = menus[j];
    let route = util.backendMenuToRoute1(menu);
    if (menu.children && menu.children.length > 0) {
      let children = util.backendMenusToRouters1(menu.children);
      for (let i = 0; i < children.length; i++) {
        if (children[i].name) {
          routers.push(children[i]);
        }
      }
    }
    if (route.type !== 'dir') {
      routers.push(route);
    }
  }
  return routers;
};
util.backendMenuToRoute1 = menu => {
  let route = {};
  if (menu.component) {
    if (menu.component !== 'layoutHeaderAside') {
      route.component = () => import(`@/views/${menu.component}`);
    } else {
      route.component = layoutHeaderAside;
    }
  }
  route.title = menu.name;
  route.name = menu.name;
  if (menu.path) {
    route.path = menu.path.replace('/views/', '');
  }
  route.icon = menu.icon;
  route.type = menu.type;
  let meta = {};
  meta.url = menu.url;
  meta.title = menu.name;
  meta.path = menu.path;
  meta.pageType = menu.pageType;
  route.meta = meta;
  return route;
};

export default util;
