import {
  USER_KEY,
  TOKEN_KEY,
  ROUTERS_KEY,
  RIGHTS_KEY,
  REFRESH_TOKEN,
  USER_CODE,
  POST_KEY,
} from './constant';
import StorageUtil from './StorageUtil';

/**
 * 会话工具类，用于存储和获取当前用户的会话值
 * @author huangsq
 */
const { local, session } = StorageUtil;

const AppContext = {
  getToken: () => {
    // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjX1VTRVJfQ09ERSI6Imh0IiwiZXhwIjoxNjExOTg1MTgyfQ.Ui6M-DTsQTHLL0Wpp9B5K-T2wvx6fozo6_7-whLLm1s';
     return session.get(TOKEN_KEY);
  },
  setToken: (token: string) => {
    return session.set(TOKEN_KEY, token);
  },
  removeToken: () => {
    return session.remove(TOKEN_KEY);
  },
  getRefreshToken: () => {
    return session.get(REFRESH_TOKEN);
  },
  setRefreshToken: (token: string) => {
    return session.set(REFRESH_TOKEN, token);
  },
  removeRefreshToken: () => {
    return session.remove(REFRESH_TOKEN);
  },
  getUser: () => {
    return session.getObject(USER_KEY);
  },
  setUser: (user: any) => {
    return session.setObject(USER_KEY, user);
  },
  removeUser: () => {
    return session.remove(USER_KEY);
  },
  getUserCode: () => {
    // return 'yss';
     return session.get(USER_CODE);
  },
  setUserCode: (userCode: string) => {
    return session.set(USER_CODE, userCode);
  },
  removeUserCode: () => {
    return session.remove(USER_CODE);
  },
  getPost: () => {
     // return 'FMDCG,ZLFSG,ZLYFHG1,SYSMGR,YWQNG,admin,ZLYFHG2,CHK,QDZGZZR,ZLSPG,YYFHG,QDBGZZR,ZLJFG,ZLFHG,GKPTGW,YssAutotestPostCode,ZGZZR,testGW,ywdh1,BGZZR,ZLYFHG3,PZGLG,TAJKG,YYCXG,ZLJBG';
     return session.getObject(POST_KEY);
  },
  setPost: (post: string) => {
    return session.setObject(POST_KEY, post);
  },
  removePost: () => {
    return session.remove(POST_KEY);
  },
  getRouters: () => {
    return session.getObject(ROUTERS_KEY);
  },
  setRouters: (routers: any) => {
    return session.setObject(ROUTERS_KEY, routers);
  },
  removeRouters: () => {
    return session.remove(ROUTERS_KEY);
  },
  getRights: () => {
    return session.getObject(RIGHTS_KEY);
  },
  setRights: (rights: any) => {
    return session.setObject(RIGHTS_KEY, rights);
  },
  removeRights: () => {
    return session.remove(RIGHTS_KEY);
  },
  session,
  local,
  // cookie,
};
export default AppContext;
