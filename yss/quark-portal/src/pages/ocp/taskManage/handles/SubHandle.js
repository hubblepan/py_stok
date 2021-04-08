import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { useModel } from 'umi';
import request from '@/utils/request';

export default class SubHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'task.sub';
    const model = useModel(modelName);
    const url = { base: '/ocp/task/sub' };
    const service = new BaseService({
      base: '/ocp/task/sub',
    });

    super({ url, service, ...model, ...params });
  }
}
