import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class MasterHandle extends BaseHandle {
  constructor(model) {
    const service = new BaseService({ base: '/ocp/warningMaster' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...model });
  }
}
