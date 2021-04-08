import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';

export default class MesHandle extends BaseHandle {
  constructor(model) {
    const service = new BaseService({ base: '/ocp/mesNotice' });
    const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, buttonState, ...model });
  }

  add() {
    this.changeState({
      formVisible: true,
    });
  }

  edit() {
    this.changeState({ formData: {}, formVisible: true, formLoading: true, operate: 'edit' });
    console.log(this.selectedRowKeys[0]);

    // this.service.detail(this.selectedRowKeys[0]).then((result) => {
    //   console.log(result);
    //   this.changeState({ formData: result.data, formLoading: false });
    // });
  }
}
