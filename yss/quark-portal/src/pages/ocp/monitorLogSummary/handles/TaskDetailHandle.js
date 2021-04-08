import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { useModel } from 'umi';
import request from '@/utils/request';

export default class TaskDetailHandle extends BaseHandle {
  constructor(props) {
    const url = { base: '/ocp/task/detail' };
    const service = new BaseService({
      base: '/ocp/task/detail',
    });

    super({ url, service, ...props });
  }

}
