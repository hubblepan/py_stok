import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new BaseService({ base: '/ocp/sysparam' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...model });
  }

  addsql() {
    this.changeState({
      formVisible: true,
      formData: {},
      paramType: 'database',
      operate: 'add',
    });
  }

  addserver() {
    this.changeState({
      formData: {},
      formVisible: true,
      paramType: 'server',
      operate: 'add',
    });
  }

  edit() {
    this.changeState({ formData: {}, formVisible: true, formLoading: true, operate: 'edit' });
    // console.log(this.selectedRowKeys[0]);

    this.service.detail(this.selectedRowKeys[0]).then((result) => {
      // console.log(result.data);
      this.changeState({ formData: result.data, formLoading: false });
    });
  }
}
