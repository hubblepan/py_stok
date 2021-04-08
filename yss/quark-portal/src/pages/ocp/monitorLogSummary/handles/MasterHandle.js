import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';

export default class ManageHandle extends BaseHandle {
  constructor(props) {
    const { url } = props;
    const service = new BaseService(url);
    super({ service, ...props });
  }

  refresh() {
    const { query } = this;
    query.call(this);
  }

  structure() {
    const { setStructureVisible } = this;
    setStructureVisible(true);
  }
}
