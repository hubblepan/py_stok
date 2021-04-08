import BaseHandle from '@/handles/BaseHandle';
import GroupService from '../service/GroupService';
import MsgBox from '@/utils/MsgBox';

export default class MasterHandle extends BaseHandle {
  constructor(model) {
    const service = new GroupService();
    super({ service, ...model });
  }
  check({ event, button, currentRow }) {
    console.log(currentRow);
    MsgBox.confirm({
      title: '审核',
      content: '是否要执行审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.check(currentRow);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
  }
  uncheck({ event, button, currentRow }) {
    console.log(currentRow);
    MsgBox.confirm({
      title: '反审核',
      content: '是否要执行反审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.uncheck(currentRow);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
  }
  add() {
    this.setOperate('add');
    this.setCurrentRecord({});
    this.setFormVisible(true);
  }
  edit({ event, button, currentRow }) {
    console.log(currentRow);
    this.setOperate('edit');
    this.setCurrentRecord(currentRow[0]);
    this.setFormVisible(true);
  }
  deletes({ event, button, currentRow }) {
    MsgBox.confirm({
      title: '删除',
      content: '是否要将选中的记录执行删除操作？删除后不可恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.deletes(currentRow);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
  }
}
