import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';
import {
  querySubTable,
  saveSubTable,
  checkSubTable,
  uncheckMasterTable,
  deleteSubTable,
  deleteMasterTable,
} from '../diyClassifyService';
import PortService from '../service/PortService';

export default class SubHandle extends BaseHandle {
  constructor(model) {
    // const service = new BaseService({ base: '/ocp/indexinfo/combination/diyclassify/' })
    const service = new PortService();
    super({ ...model, service });
  }
  getMasterParams() {
    if (this.masterSelectedRows.length === 0) {
      MsgBox.warning({ message: '请至少选择一条主表数据' });
      return false;
    }
    const masterParams = {};
    // 此处是单选
    // 注意这里的参数是大写
    masterParams.C_GROUP_CODE = this.masterSelectedRows[0].c_GROUP_CODE;
    masterParams.C_GROUP_NAME = this.masterSelectedRows[0].c_GROUP_NAME;
    return masterParams;
  }
  add(...args) {
    this.setSaveModalVisible(true);
  }

  check() {
    const rows = this.selectedRows.filter((item) => item.auditState === 0);
    MsgBox.confirm({
      title: '审核',
      content: '是否要将选中的记录执行审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.check(rows);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
  }
  uncheck(...args) {
    const rows = this.selectedRows.filter((item) => item.auditState === 1);
    MsgBox.confirm({
      title: '审核',
      content: '是否要将选中的记录执行反审核操作？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await this.service.uncheck(rows);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
  }
  deletes() {
    const rows = this.selectedRows.filter((item) => item.auditState === 0);
    MsgBox.confirm({
      title: '删除',
      content: '是否要将选中的未审核记录执行删除操作？删除后不可恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          this.service.deletes(rows);
          this.query();
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
    return true;
  }
}
