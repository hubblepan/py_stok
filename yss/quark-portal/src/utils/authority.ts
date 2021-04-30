import AppContext from './AppContext'; // use localStorage to store the authority info, which might be sent from server in actual project.
import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  console.log(AppContext);
  const authorityString =
    typeof str === 'undefined' ? AppContext.getRights('authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  AppContext.setRights('authority', proAuthority); // auto reload

  reloadAuthorized();
}