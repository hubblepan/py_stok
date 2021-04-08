// import createModel from '@/handles/BaseModel';
// import modelExtend from 'dva-model-extend';

// const namespace = 'postRightMasterModel';

// const model = modelExtend(createModel({ namespace }), {
//   namespace,
//   state: {
//     modalTitle: '',
//     classifyNode: {},
//     addVisible: false
//   }
// });


// export default model;

// import baseModel from '@/components/TableView/baseModel';
// export default () => {

//   return baseModel({
//     // 额外状态
//   });
// };

import createSimpleModel from '@/handles/createSimpleModel';

const namespace = 'postRightMasterModel';

export default () => {
  return createSimpleModel({ namespace,state: {
    detailVisible: false,
  }});
};
