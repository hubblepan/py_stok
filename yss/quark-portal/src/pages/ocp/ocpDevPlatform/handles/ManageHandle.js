import BaseHandle from '@/components/TableView/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import { useModel } from 'umi';

export default class ManageHandle extends BaseHandle {
  constructor(params) {
    const modelName = 'ocp.ocpDevPlatform.manage';
    const modal = useModel(modelName);
    const service = new BaseService({ base: '/api/mainScheme' });
    const buttonState = new ButtonState();

    super({ service, buttonState, ...modal, ...params });
  }

  add() {
    this.setMode('add');
    this.setEditVisible(true);
  }

  copy() {
    this.setMode('copy');
    this.setEditVisible(true);
  }

  edit() {
    const { selectedRows } = this;
    this.setMode('edit');
    this.setEditData(selectedRows[0]);
    this.setEditVisible(true);
  }
}
