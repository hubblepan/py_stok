import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import MasterService1 from "../service/MasterService1";

export default class MasterHandle extends BaseHandle {
  constructor(props) {
    // const service = new BaseService({ base: '/ocp/indexinfo' });
    const service = new MasterService1();

    super({ service, ...props });
  }

  refresh() {
    this.query();
  }
}
