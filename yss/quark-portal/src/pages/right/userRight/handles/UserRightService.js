import BaseService from '@/handles/BaseService';
import request from '@/utils/request';

class UserRightService extends BaseService{
  query(params) {
    console.log(params);
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getEnabledOrgUserList';
    return request.post(url, {
      params,
    });
  }
}

export default UserRightService
