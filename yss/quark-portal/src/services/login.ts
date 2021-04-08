import request from '@/utils/request';
import { FOMP_SSO_SERVER, OSGI_FAST } from '@/pages/constant/constant';
import { CONTENT_TYPE_JSON, CONTENT_TYPE_FORM, CONTENT_TYPE_FORM_DATA } from '@/utils/constant';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function userlogin(params) {
  return request(`/${FOMP_SSO_SERVER}/login`, {
    method: 'POST',
    data: params,
  });
}

export async function userlogout() {
  return request(`/${FOMP_SSO_SERVER}/logout`, {
    method: 'GET',
  });
}

export async function getSysUserEncryptType(params) {
  return request(`/${OSGI_FAST}/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/getSysUserEncryptType`, {
    method: 'POST',
    data: params,
  });
}

export async function getOrgCodeByUserCode(params) {
  return request(`/${OSGI_FAST}/YSSUCOBRIDGE/ws/com/yss/framework/api/dataservice/controller/IUserDataServiceController/getOrgCodeByUserCode`, {
    method: 'POST',
    data: params,
  });
}

export async function getPostByUserCode(params) {
  return request(`/${OSGI_FAST}/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IPostDataServiceController/getByUser`, {
    method: 'POST',
    data: params,
  });
}

export async function getUserRights(params) {
  return request(`/${OSGI_FAST}/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IFASTAuthorityServiceController/getUserRights`, {
    'Content-Type': CONTENT_TYPE_FORM,
    method: 'POST',
    data: params,
  });
}


export async function getCustomFunList(params) {
  return request(`/${OSGI_FAST}/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/customfun/controller/ICustomFunController/getCustomFunList`, {
    method: 'POST',
    data: params,
  });
}
