import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { useModel } from 'umi';
import MsgBox from '@/utils/MsgBox';
import request from '@/utils/request';

export default class DetailHandle extends BaseHandle {
  constructor(props) {
    const service = new BaseService({
      base: '/ocp/message/detail',
    });

    super({ service, ...props });
  }
}
