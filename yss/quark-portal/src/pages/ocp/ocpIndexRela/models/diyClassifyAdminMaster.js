// 自定义分类主表
import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      masterRowEditData: {}
    }
  });
};