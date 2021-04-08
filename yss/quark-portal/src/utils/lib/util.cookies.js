import Cookies from 'js-cookie';
import { COOKIE_KEY_PREFIX } from '../utils/constant';

/**
 * Cookie工具类，用于存储和获取当前用户的Cookie值
 * @author huangsq
 */
const cookies = {};

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1,
  };
  Object.assign(currentCookieSetting, cookieSetting);
  Cookies.set(`${COOKIE_KEY_PREFIX}-${name}`, value, currentCookieSetting);
};

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`${COOKIE_KEY_PREFIX}-${name}`);
};

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get();
};

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`${COOKIE_KEY_PREFIX}-${name}`);
};

export default cookies;
