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
}
