import { STORAGE_KEY_PREFIX, SESSION_KEY_PREFIX } from './constant';

/**
 * Web存储类，用于封装存储和获取对象值
 * @author huangsq
 */
export class Storage {
  storage: any;

  keyPrefix: string;

  cache: {};

  constructor(storage: any, keyPrefix: string = STORAGE_KEY_PREFIX) {
    this.storage = storage;
    this.keyPrefix = keyPrefix;
    this.cache = {};
  }

  getKey(key: string) {
    return this.keyPrefix + key;
  }

  removeCache(key: string) {
    return delete this.cache[this.getKey(key)];
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  /**
   * 获取Json对象值
   * @param {*} key
   */
  getObject(key: string) {
    let value = this.cache[key];
    if (!value) {
      value = JSON.parse(this.get(key));
      this.cache[key] = value;
    }
    return value;
  }

  /**
   * 设置Json对象值
   * @param {*} key
   * @param {*} value
   */
  setObject(key: string, value: any) {
    if (!value) {
      this.remove(key);
      return;
    }
    this.removeCache(key);
    this.setItem(this.getKey(key), JSON.stringify(value));
  }

  /**
   * 获取会后对象值
   * @param {*} key
   */
  get(key: string) {
    return this.getItem(this.getKey(key));
  }

  /**
   * 设置Json对象值
   * @param {*} key
   * @param {*} value
   */
  set(key: string, value: any) {
    this.setItem(this.getKey(key), value);
  }

  /**
   * 移除会话存储项
   * @param {*} key
   */
  remove(key: string) {
    this.removeCache(key);
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * 清空会话存储项
   */
  clear() {
    this.storage.clear();
  }

  /**
   * 清空会话存储项
   */
  getStorage(): any {
    return this.storage;
  }

  /**
   * 获取会话存储项所有的key，不包含前缀
   */
  keys() {
    const allKeys = [];
    for (let i = 0; i < this.storage.length; i += 1) {
      const key = this.storage.key(i)?.replace(this.keyPrefix, '');
      allKeys.push(key);
    }
    return allKeys;
  }

  /**
   * 获取会话存储项条数
   */
  length() {
    return this.storage.length;
  }
}

/**
 * 本地存储实现,封装localStorage和sessionStorage
 */
const isServer = typeof window === 'undefined';

const local = !isServer ? window.localStorage : null;
const session = !isServer ? window.sessionStorage : null;

const StorageUtil = {
  local: new Storage(local, STORAGE_KEY_PREFIX),
  session: new Storage(session, SESSION_KEY_PREFIX),
};

export default StorageUtil;
