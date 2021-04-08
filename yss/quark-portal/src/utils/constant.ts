// 应用版本
export const APP_VERSION = `${typeof VERSION !== 'undefined' ? VERSION : '1.0.0'}`;

export const KEY_PREFIX = `quark-${APP_VERSION}`;
// STORAGE_KEY_PREFIX
export const STORAGE_KEY_PREFIX = `${KEY_PREFIX}-`;
// Cookies前缀
export const COOKIE_KEY_PREFIX = `${KEY_PREFIX}-`;
// Session前缀
export const SESSION_KEY_PREFIX = `quark-`;
// Token key  accessToken
export const TOKEN_KEY = `accessToken`;
// Token key
export const REFRESH_TOKEN = `refreshToken`;

export const USER_KEY = `user`;
export const USER_CODE = `userCode`;
export const POST_KEY = `post`;
export const RIGHTS_KEY = `rights`;
export const ROUTERS_KEY = `routers`;


export const CONTENT_TYPE_JSON = 'application/json; charset=UTF-8';
export const CONTENT_TYPE_FORM =  'application/x-www-form-urlencoded; charset=UTF-8';
export const CONTENT_TYPE_FORM_DATA = 'multipart/form-data; charset=UTF-8';




