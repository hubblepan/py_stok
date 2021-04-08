import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import { Modal } from 'antd';
import MsgBox from '@/utils/MsgBox';
// import request from '@/utils/request';

export default class MasterHandle extends BaseHandle {
  // constructor(model) {
  //   const service = new TaskMasterService();
  //   super({ service, ...model });
  // }

  constructor(props) {
    const { url } = props;
    const service = new BaseService(url);
    super({ service, ...props });
  }
}
