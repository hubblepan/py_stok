import request from '../utils/request';
import { message } from 'antd';

const handleRequest = (res, showMsg) => {
  if (res.success) {
    showMsg && message.success(res.msg);
    return res.data ? res.data : true;
  } else {
    if(res.msg){
      message.error(res.msg);
    }
    return false;
  }
};


export const queryDetail = async (parameter) => {
  const res = await request.get(parameter.url, {
    params: parameter.conditionParam,
  },
  );
  return handleRequest(res);
};
