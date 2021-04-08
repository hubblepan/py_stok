import BaseHandle from '@/handles/BaseHandle';
import CommonIndexMasterService from '../service/CommonIndexMasterService';

export default class IndexMasterHandle extends BaseHandle {
  constructor(props) {
    const service = new CommonIndexMasterService();

    super({ service, ...props });
  }

  refresh() {
    this.query();
  }
}
