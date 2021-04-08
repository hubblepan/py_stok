import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import MasterService0 from "../service/MasterService0";

export default class MasterHandle extends BaseHandle {
  constructor(props) {
    const service = new MasterService0();

    super({ service, ...props });
  }

  refresh() {
    this.query();
  }

  structure() {
    this.setStructureVisible(true);
  }
}
