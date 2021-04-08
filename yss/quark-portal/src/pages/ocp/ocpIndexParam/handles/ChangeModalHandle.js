import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import BaseState from '@/components/TableView/BaseState';
import BeanUtil from '@/utils/BeanUtil';
import { useModel } from 'umi';
import ChangeService from '../service/ChangeService';

export default class ManageHandle extends BaseHandle {
  constructor(model) {
    const service = new ChangeService();

    super({ service, ...model });
  }

  async query() {
    console.log('11111', this.indexCode);
    const result = await this.service.query(this.indexCode);
    this.changeResult({
      dataSource: result?.data?.list,
    });
  }
}
