import BaseHandle from '@/handles/BaseHandle';
import ThemeProgrammeService from '../services/ThemeProgrammeService';
import MsgBox from '@/utils/MsgBox';

export default class TargetSettingSubHandle extends BaseHandle {
  constructor(model) {
    const service = new ThemeProgrammeService();
    super({ ...model, service });
  }

  async save (data, event, button) {
    const ret = await this.service.save(data);
    if(ret.success){
      MsgBox.success({ message: '主题模板新建成功' });
      this.requery({ event });
    }else{
      MsgBox.error({ message: ret.message });
    }
  }

  async update (data, event, button) {
    const ret = await this.service.update(data);
    if(ret.success){
      MsgBox.success({ message: '主题模板修改成功' });
      this.requery({ event });
    }else{
      MsgBox.error({ message: ret.message });
    }
  }

  async deletes ({ event, button, currentRow }) {
    const selectedRows = currentRow || this.selectedRows;
    const ids = [];
    selectedRows.forEach((item) => {
      if (item.checkState === 0 || item.auditState === 0) {
        ids.push(item.id);
      }
    });
    if(ids.length > 1){
      MsgBox.warning({ message: '只能选择一条数据进行删除' });
      return false;
    }
    MsgBox.confirmModal({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确定删除',
      type: "danger",
       onOk: async () => {
        try {
          const delRet = await this.service.deletes(ids[0]);
          if(delRet.success){
            MsgBox.success({ message: '删除成功' });
            this.requery({ event });
          }else{
            MsgBox.error({ message: delRet.message });
          }
        } catch (e) {
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
    return true;
  }

  check({ event, button }) {
    const ids = [];
    const items = [];
    this.selectedRows.forEach((item) => {
      if (item.auditState === 0) {
        ids.push(item.id);
        item.auditState = 1;
        items.push(item);
      }
    });
    MsgBox.confirmModal({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const ret = await this.service.check(items);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }

  uncheck({ event, button }) {
    const ids = [];
    const items = [];
    this.selectedRows.forEach((item) => {
      if (item.auditState === 1) {
        ids.push(item.id);
        item.auditState = 0;
        items.push(item);
      }
    });
    MsgBox.confirmModal({
      title: '反审核',
      content: '是否确定反审核已审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const ret = await this.service.uncheck(items);
          this.requery({ event });
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

  add () {
    this.setMode('add');
    this.setEditData({});
    this.setEditVisible(true);
  }

  copy () {
    const { selectedRows } = this;
    this.setMode('copy');
    this.setEditData(selectedRows[0]);
    this.setEditVisible(true);
  }

  edit () {
    const { selectedRows } = this;
    this.setMode('edit');
    this.setEditData(selectedRows[0]);
    this.setEditVisible(true);
  }
}

