import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';

class SubService extends BaseService {
  tree() {
    return request(this.url.tree, {
      method: 'get',
    });
  }

  plan() {
    return request(this.url.plan, {
      method: 'post',
    });
  }

  detail(id) {
    return request(this.url.detail, {
      method: 'get',
      data: { params: { id } },
    });
    // return request.get(this.url.detail, { params: { id } });
  }

  execute(ids) {
    return request(this.url.execute, {
      method: 'post',
      data: { ids },
    });
  }

  confirm(params) {
    return request(this.url.confirm, {
      method: 'post',
      data: params,
    });
  }

  unconfirm(ids) {
    return request(this.url.unconfirm, {
      method: 'post',
      data: { ids },
    });
  }
}
export default class SubHandle extends BaseHandle {
  constructor(props) {
    // const service = new SubService({
    //   base: '/ocp/monitor/sub',
    //   confirm: '/ocp/monitor/sub/confirm',
    //   unconfirm: '/ocp/monitor/sub/unconfirm',
    //   execute: '/ocp/monitor/sub/execute',
    //   plan:'/ocp/monitor/sub/queryplans',
    //   tree:'/ocp/monitor/sub/treetarget',
    // });
    const { url } = props;
    const service = new SubService(url);
    super({ service, ...props });
  }

  execute() {
    const { selectedRows, service } = this;
    const ids = [];
    selectedRows.forEach((item) => {
      ids.push(item.id);
    });
    service
      .execute(ids)
      .then(() => {})
      .catch(() => {});
    MsgBox.success({ message: '已执行，请在任务中心查看执行进度' });
  }

  executelog() {
    console.log('setTaskVisible');;
    this.setTaskVisible(true);
  }

  confirm() {
    const ids = [];
    const { selectedRows, setConfirmIds, setConfirmVisible } = this;
    selectedRows
      .filter((item) => !item.confirmStatus)
      .forEach((item) => {
        ids.push(item.id);
      });
    setConfirmIds(ids);
    setConfirmVisible(true);
  }

  unconfirm() {
    const ids = [];
    const { selectedRows, service, query } = this;
    selectedRows
      .filter((item) => item.confirmStatus)
      .forEach((item) => {
        ids.push(item.id);
      });
    MsgBox.confirm({
      title: '反确认',
      content: '是否反确认所选择的记录？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        try {
          service.unconfirm(ids);
          query.call(this);
        } catch (e) {
          MsgBox.error({ message: '反确认失败' });
        }
        // return new Promise((resolve, reject) => {
        //   service.unconfirm(ids).then(() => {
        //     MsgBox.success({ message: '反确认成功' });
        //     // 刷新主表
        //     resolve();
        //     // query.call(this);
        //   });
        // }).then(()=>{query.call(this);})
        //   .catch(() => MsgBox.error({ message: '反确认失败' }));
      },
    });
  }
}
