import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';

export default class VoucherDetailHandle extends BaseHandle {
  constructor(props) {
    const { url } = props;

    const service = new BaseService(url);

    super({ service, ...props });
  }
}
