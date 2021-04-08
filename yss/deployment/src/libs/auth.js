import Cookies from './util.cookies';

const tokenKey = 'token';
const userKey = 'user-key';

export function getToken () {
  return Cookies.get(tokenKey);
}

export function setToken (token) {
  return Cookies.set(tokenKey, token);
}

export function removeToken () {
  return Cookies.remove(tokenKey);
}

export function getUser () {
  return Cookies.get(userKey);
}

export function setUser (user) {
  return Cookies.set(userKey, user);
}

export function removeUser () {
  return Cookies.remove(userKey);
}
