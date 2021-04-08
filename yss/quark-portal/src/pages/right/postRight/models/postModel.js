import createSimpleModel from '@/handles/createSimpleModel';

const namespace = 'postModel';

export default () => {
  return createSimpleModel({ namespace,state: {
    formVisible: false,
    formData: [],
    operate:"",
  }});
};
