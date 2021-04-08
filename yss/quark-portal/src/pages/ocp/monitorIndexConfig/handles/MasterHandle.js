import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';
// import request from '@/utils/request';


import MasterService from '../services/TargetMasterService';

export default class MasterHandle extends BaseHandle {
  constructor(model) {
    const service = new MasterService();
    super({ service, ...model });
  }

  add () {
    this.changeState({
      modalTitle: '新增指标分类',
      classifyNode: { typeCode: '', typeName: '', typeP: '' },
      addVisible: true
    })
  }
  edit ({ event, button, currentRow }) {
    const selectedRows = currentRow ? currentRow : this.selectedRows;
    const formValue = selectedRows.find((item) => !item.isLeaf);
    // 此处分类信息需要在列表取，而且字段意义还居然还不一样。
    const classifyNode = {
      id: formValue.id,
      typeCode: formValue.indexCode,
      typeName: formValue.indexName,
      typeP: formValue.typeCode
    }

    this.changeState({
      modalTitle: '修改指标分类',
      classifyNode,
      addVisible: true
    })
  }
  // 此处有坑,baseHandle针对checkState做过滤
  deletes ({ event, button, currentRow }) {
    const selectedRows = currentRow
    let _this = this;
    Modal.confirm({
      title: '删除',
      content: '是否确定删除该产品分类，删除后不可恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // 又是转换
        const rows = selectedRows.map(x => ({
          id: x.id, // id
          typeCode: x.indexCode, // 分类代码
          typeName: x.indexName, // 分类名称
          typeP: x.typeCode // 父级 分类
        }))
        const res = await this.service.deletes(rows);
        if (res.success) {
          MsgBox.success({
            message: '删除成功！'
          })
          _this.requery()
        }

      },
    });
  }

  save () {

  }
}
