//  主题方案管理
import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      editVisible: false,
      editData: [],
      mode: '',
      viewDetailVisible: false,
      detailData: {},
    }
  });
};

