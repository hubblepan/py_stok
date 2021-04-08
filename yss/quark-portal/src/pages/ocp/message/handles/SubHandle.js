import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { useModel } from 'umi';
import request from '@/utils/request';
class SubService extends BaseService {
  constructor(props) {
    super(props);
  }

  read(ids) {
    return request(this.url.read, {
      method: 'post',
      data: { ids },
    });
  }
}
export default class SubHandle extends BaseHandle {
  constructor(props) {
    const service = new SubService({
      base: '/ocp/message/sub',
      read: '/ocp/message/sub/read',
    });

    super({ service, ...props });
  }
}
