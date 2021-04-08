import BaseService from '@/handles/BaseService';
import request from '@/utils/request';

class UserPostService extends BaseService{
  async query(params) {
    // const url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getEnabledOrgUserList';
    const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryListByCondition'
    const response = await request.post(url, {data:{"dataClass":"User","C_DV_STATE":"ENAB"}});
    return {
      data: { list: response.data},
    };
  };
};

export default UserPostService;
