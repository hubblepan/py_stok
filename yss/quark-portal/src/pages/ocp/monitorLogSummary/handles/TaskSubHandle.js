import BaseHandle from '@/handles/BaseHandle';
import MsgBox from '@/utils/MsgBox';
import BaseService from '@/handles/BaseService';

export default class ManageHandle extends BaseHandle {
  // constructor(model) {
  //   const service = new TaskSubService();
  //   super({ service, ...model });
  // }
  constructor(props) {
    const { url } = props;
    const service = new BaseService(url);
    super({ service, ...props });
  }

  execute() {
    this.changeState({
      executeVisible: true,
      currentRecord: this.selectedRows[0],
    });
  }

  importSetting() {
    this.changeState({
      importSetVisible: true,
      // currentRecord: this.selectedRows[0],
    });
  }

  deletes({ event }) {
    console.log('删除触发了吗');
    MsgBox.confirmModal({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确定删除',
      type: 'danger',
      // onOk: async () => {
      //   try {
      //     const delRet = await this.service.deletes();
      //     if (delRet.success) {
      //       MsgBox.success({ message: '删除成功' });
      //       this.requery({ event });
      //     } else {
      //       MsgBox.error({ message: delRet.message });
      //     }
      //   } catch (e) {
      //     MsgBox.error({ message: '删除数据失败' });
      //   }
      // },
    });
  }
}
