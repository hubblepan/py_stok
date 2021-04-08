import BaseHandle from '@/handles/BaseHandle';
import UserRightService from "@/pages/right/userRight/handles/UserRightService";
import { Modal } from 'antd';

import request from '@/utils/request';

export default class MasterHandle extends BaseHandle {
  constructor(modal) {
    const service = new UserRightService({ base: '/ocp/indexinfo/indextype' });
    super({ service, ...modal });
  }

  // 重写query 方法
  async query() {
    function convertListToTree(listData) {
      const treeList = [];
      const dataMap = {};
      if (listData && listData.length > 0) {
        // 将根节点塞进列表
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P === '0') {
            treeList.push(item);
          }
          dataMap[item.c_CORP_ORG_CODE] = item;
        });

        // 将各个节点放到其父节点下面
        listData.forEach(item => {
          if (item.c_CORP_ORG_CODE_P !== '0') {
            const parent = dataMap[item.c_CORP_ORG_CODE_P];
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        });
      }
      console.log('ppppppaaaaa', treeList);
      return treeList;
    }
    async function getAuthAndCorpOrgTreeViewData() {
      // console.log('用户权限子表查询岗位接口调用: params = ', this.selectedRowKeys);
      const url = '/YSSUCOBRIDGE/ws/com/yss/fast/atomicdata/support/corporg/controller/ICorpOrgServiceController/getAuthAndCorpOrgTreeViewData';
      const params = {
        serviceId: 'osgi-fast',
      };
      const res = await request.post(url, {
        params,
      });
      return res;
    }
    const res = await getAuthAndCorpOrgTreeViewData();
    // 将返回数据的列表结构，转换成树形结构
    res.data = {list: convertListToTree(res.data.dataList)};
    this.changeResult({dataSource: res?.data?.list});
  }

  addOrg () {
    this.changeState({
      showAddOrg: true,
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
