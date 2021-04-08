import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';
import IndexMasterService from "../service/IndexMasterService"

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new IndexMasterService();
    // const buttonState = BeanUtil.merge(BaseState, {});

    super({ service, ...model });
  }

  refresh() {
    this.query();
  }

}
