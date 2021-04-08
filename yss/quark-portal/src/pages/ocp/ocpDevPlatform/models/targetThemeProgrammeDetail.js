//  主题方案管理
import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      editVisible: false,
      editData: [],
      mode: '',
      viewDetail: false,
      detailData: {},
      formStatus: 0,
      viewDetail: {}
    }
  });
};
