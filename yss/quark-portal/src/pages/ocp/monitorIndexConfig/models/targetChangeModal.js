import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      operType: 'add',
      // drawerTitle: '新增变更记录',// 废弃
      form: null,
      users: []
    }
  });
};


