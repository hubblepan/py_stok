import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {
      // 确认弹窗
      confirmVisible: false,
      confirmIds: [],
      targetFormData: {},
      // 指标详情
      targetVisible: false,
      targetId:'',
      // 监控详情
      monitorId: '',
      monitorVisible: false,
      // 任务详情
      taskVisible:false,
    },
  });
};
