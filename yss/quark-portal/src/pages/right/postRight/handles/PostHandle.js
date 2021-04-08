import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import ButtonState from '@/components/TableView/ButtonState';
import { useModel } from 'umi';
import PostService from '../service/PostService';
import MsgBox from '@/utils/MsgBox';

export default class PostHandle extends BaseHandle {
  constructor(model) {
    const service = new PostService({ base: '/api/post' });
    const buttonState = new ButtonState();

    super({ service, buttonState, ...model });
  }

  async add() {
    this.setOperate('add');
    this.setFormVisible(true);
  }

  copy() {
    const { selectedRows } = this;
    this.setOperate('copy');
    this.setFormData(selectedRows[0]);
    this.setFormVisible(true);
  }

  edit() {
    const { selectedRows } = this;
    this.setOperate('edit');
    this.setFormData(selectedRows[0]);
    this.setFormVisible(true);
  }
}
