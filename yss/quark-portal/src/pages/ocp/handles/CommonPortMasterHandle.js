import BaseHandle from '@/handles/BaseHandle';
import CommonPortMasterService from '../service/CommonPortMasterService';

export default class PortMasterHandle extends BaseHandle {
  constructor(props) {
    const service = new CommonPortMasterService();
    super({ service, ...props });
  }

  refresh() {
    this.query();
  }

  structure() {
    this.setStructureVisible(true);
  }
}
