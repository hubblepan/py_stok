import request from '../utils/request';
import { message } from 'antd';
import { FolderOpenOutlined, FileOutlined } from '@ant-design/icons';

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

export const query = async () => {
  const res = await request('/ocp/largescreen/paramconf/largescreen');
  return handleRequest(res);
};

export const queryIndexTree = async () => {
  const res = await request('/ocp/largescreen/indextree');

  if (res.success && res.data) {
    // 数据转换
    return convertData(res.data);
  } else {
    return [];
  }
};

const convertData = (data) => {
  let result = data.map((x, i) => {
    x.title = x.indexName;
    x.key = x.indexCode;
    if (x.isLeaf) {
      x.icon = <FileOutlined />;
    } else {
      x.icon = <FolderOpenOutlined />;
    }
    if (x.children) {
      x.children = convertData(x.children);
    }

    return x;
  });
  return result;
};

export const submit = async (params) => {
  const res = await request('/ocp/largescreen/paramconf/largescreen', {
    method: 'POST',
    data: params,
  });
  return handleRequest(res, true);
};

export const queryPublicParam = async () => {
  const res = await request('/ocp/largescreen/publicparamconf/largescreen');
  return handleRequest(res);
};
