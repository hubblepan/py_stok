import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import MsgBox from '@/utils/MsgBox';
import request from '@/utils/request';

class MonitorService extends BaseService {
  // 确认接口除了ids还有message参数
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

export default class MonitorDetailHandle extends BaseHandle {
  constructor(props) {
    const { url } = props;
    const service = new MonitorService(url);
    super({ service, ...props });
  }

  confirm() {
    const ids = [];
    const { selectedRows } = this;
    selectedRows
      .filter((item) => !item.confirmStatus)
      .forEach((item) => {
        ids.push(item.id);
      });
    console.log('ids');
    console.log(ids);
    this.setConfirmIds(ids);
    this.setConfirmVisible(true);
  }

  unconfirm() {
    const ids = [];
    const { selectedRows, service, query } = this;
    selectedRows
      .filter((item) => item.confirmStatus)
      .forEach((item) => {
        ids.push(item.id);
      });
    console.log('ids');
    console.log(ids);
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
      },
    });
  }
}
