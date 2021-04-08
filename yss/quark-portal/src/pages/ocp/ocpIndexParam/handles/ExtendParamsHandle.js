import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new BaseService({ base: '/ocp/exParams' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...model });
  }

  add() {
    this.changeState({
      mode: 'add',
      editVisible: true,
    });
  }

  edit() {
    this.changeState({
      mode: 'edit',
      editVisible: true,
      formData: {},
    });
  }

  copy() {
    this.changeState({
      mode: 'copy',
      editVisible: true,
    });
  }
}
