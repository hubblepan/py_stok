// 管控配置化指标
// import baseModel from '@/components/TableView/baseModel';
// export default () => {

//   return baseModel({
//     // 额外状态
//   });
// };


import createSimpleModel from '@/handles/createSimpleModel';

export default () => {
  return createSimpleModel({
    state: {}
  });
};
