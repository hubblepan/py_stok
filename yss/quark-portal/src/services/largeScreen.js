import request from '../utils/request';
import { message } from 'antd';

const handleRequest = (res, showMsg) => {
  if (res.success) {
    showMsg && message.success(res.msg);
    return res.data ? res.data : true
  } else {
    if(res.msg){
      message.error(res.msg);
    }
    return false;
  }
}

/**
export const queryScreen = async () => {
  const res = await request('/ocp/largescreen/day/2020-08-05');
  return handleRequest(res);
}

export const queryDayScreen = async () => {
  const res = await request('/ocp/day/2020-01-01');
  return handleRequest(res);
}

export const queryWeekScreen = async () => {
  const res = await request('/ocp/week/2020-01-01');
  return handleRequest(res);
}

export const queryMonthScreen = async () => {
  const res = await request('/ocp/month/2020-01-01');
  return handleRequest(res);
}
**/

export const getWebSocketUrl = async () => {
  const res = await request('/ocp/largescreen/websocketurl');
  return handleRequest(res);
}
