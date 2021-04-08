import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import UserRightService from "@/pages/right/userRight/handles/UserRightService";
import ButtonState from '@/components/TableView/ButtonState';
import { Modal } from 'antd';

import request from '@/utils/request';
import BeanUtil from "@/utils/BeanUtil";

class MasterButtonState extends ButtonState {
  // constructor(props) {
  //   super(props);
  // }

  edit (selectedRows) {
    console.log(this);
    let classifyCount = 0;
    selectedRows.forEach((item) => {
      if (!item.isLeaf) {
        classifyCount+= 1;
      }
    });
    // 有且仅有一个分类
    if (classifyCount === 1) {
      return false;
    }
    return true;
  }

  deletes (selectedRows) {
    console.log(this);
    let classifyCount = 0;
    selectedRows.forEach((item) => {
      if (!item.isLeaf) {
        classifyCount+= 1;
      }
    });
    // 至少包含一个分类
    if (classifyCount > 0) {
      return false;
    }
    return true;
  }
}

export default class RightManageMasterHandle extends BaseHandle {
  constructor(modal) {
    const service = new UserRightService({ base: '/ocp/indexinfo/indextype' });
    const buttonState = new MasterButtonState();

    super({ service, buttonState, ...modal });
  }

  // 重写query 方法
  async query() {
    this.changeState({selectedUsers: []});
    function convertListToTree(listData) {
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        // 将根节点塞进列表
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P === '[root]') {
            treeList.push(item);
          }
          dataMap[item.c_CORP_ORG_CODE] = item;
        });

        // 将各个节点放到其父节点下面
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P !== '[root]') {
            const parent = dataMap[item.c_CORP_ORG_CODE_P];
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      }
      return treeList;
    }
    const params = {serviceId: 'osgi-fast'};
    console.log('列表查询参数', params);
    this.setLoading(true);
    const res = await this.service.query(params);
    // 将返回数据的列表结构，转换成树形结构
    // const result = JSON.parse(JSON.stringify(res));
    const dataSourceMap = {};
    res.data.forEach(item => {
      dataSourceMap[item.c_CORP_ORG_CODE] = item;
    });
    res.data = {list: convertListToTree(res.data)};
    this.changeResult({dataSource: res?.data?.list, dataSourceMap});
  }

  expandOne() {
    this.expandWithGrade(1);
  }

  expandTwo() {
    this.expandWithGrade(2);
  }

  expandThree() {
    this.expandWithGrade(3);
  }

  addOrg () {
    this.changeState({
      showAddOrg: true,
    })
  }

  expandWithGrade(num) {
    // let grade = 1;
    // const expandedRowKeys = [];
    // let nextGradeData = this.dataSource;
    // while (grade < num) {
    //   let newGradeData = [];
    //   nextGradeData?.forEach(item => {
    //     expandedRowKeys.push(item.id);
    //     if (item.children && item.c_DATA_TYPE !== 'USER') {
    //       newGradeData = newGradeData.concat(item.children);
    //     }
    //   });
    //   nextGradeData = newGradeData;
    //   grade+= 1;
    // }
    // this.changeState({dataSource: this.dataSource, expandedRowKeys});
  }

  add () {
    this.changeState({
      modalTitle: '新增指标分类',
      classifyNode: { typeCode: '', typeName: '', typeP: '' },
      addVisible: true
    })
  }

  edit () {
    const { selectedRows } = this;

    this.changeState({
      modalTitle: '修改指标分类',
      classifyNode: selectedRows.find((item) => !item.isLeaf),
      addVisible: true
    })
  }

  // 此处有坑
  deletes () {
    const { selectedRows } = this;
    console.log(selectedRows);
    const classifyId = [];
    this.selectedRows.forEach((item) => {
      if (!item.isLeaf) {
        classifyId.push(item.id);
      }
    });
    Modal.confirm({
      title: '删除',
      content: '是否确定删除该产品分类，删除后不可恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        const id = { id: classifyId.join(',') };
        return new Promise((resolve, reject) => {
          request
            .get('/ocp/indexinfo/indextype/delete', { params: id })
            .then(function (response) {
              console.log(response);
              resolve();
              // refreshMasterTable();
            })
            .catch(function (error) {
              console.log(error);
              reject();
            });
        }).catch(() => { });
      },
    });
  }
}
