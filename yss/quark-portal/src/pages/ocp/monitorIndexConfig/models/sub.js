import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      rowKey: 'indexCode',// 主表zodiac，欧米茄
      // paramKey: 'indexCode', //查询传参数用的字段名
      // 以上两个命名有歧义
      detailVisible: false,
      modalOperate: '',
      detailData: {},
      changeVisible: false,
      permission: false,
      permitVisible: false,
      testVisible: false,
      deployVisible: false,
      currentDetail: {},
      primaryKey: [],
    }
  });
};

