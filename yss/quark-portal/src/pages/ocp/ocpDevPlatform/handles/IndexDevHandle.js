import BaseHandle from '@/handles/BaseHandle';
import { Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';
import IndexDevService from '../services/IndexDevService'

export default class IndexDevHandle extends BaseHandle {
  constructor(model) {
    const service = new IndexDevService();
    super({ service, ...model });
  }

  add () {
    this.setMode('add');
    this.setEditVisible(true);
  }

  copy () {
    this.setMode('copy');
    this.setEditVisible(true);
  }

  edit () {
    const { selectedRows } = this;
    this.setMode('edit');
    this.setEditData(selectedRows[0]);
    this.setEditVisible(true);
  }
}


