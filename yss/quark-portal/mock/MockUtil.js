/**
 * 查询数据
 * @param {*} dataList
 * @param {*} data
 * @param {*} page
 */
export const query = (dataList, data, pageNo, pageSize) => {
  let newList = dataList;
  if (data) {
    newList = dataList.filter((item) => {
      return Object.keys(data).every((key) => {
        return item[key].indexOf(data[key]) >= 0;
      });
    });
  }
  if (pageNo && pageSize) {
    const start = (pageNo - 1) * pageSize;
    const end = pageNo * pageSize;
    const length = newList.length;
    if (start > length) {
      return [];
    } else if (end > length) {
      return newList.slice(start, length);
    } else {
      return newList.slice(start, end);
    }
  }
  return newList;
};

/**
 * 查询明细
 * @param {*} dataList
 * @param {*} id
 */
export const detail = (dataList, id) => {
  const data = dataList.find((item) => {
    if (item.id === id) {
      return item;
    }
  });
  const result = {
    code: 'SUCCESS',
    data: data,
    msg: '查询成功',
    success: true,
  };
  return result;
};

/**
 * 保存信息
 * @param {*} dataList
 * @param {*} data
 */
export const save = (dataList, data) => {
  const isAdd = true;
  if (!data.id) {
    const mockId = Mock.mock({
      id: '@id',
    });
    data.id = mockId.id;

    dataList.push(data);
  } else {
    isAdd = false;

    dataList.some((item) => {
      if (item.id === data.id) {
        Object.keys(item).map((key) => {
          item[key] = data[key];
        });
      }
      return true;
    });
  }
  const msg = isAdd ? '新增成功' : '修改成功';
  const result = {
    code: 'SUCCESS',
    data: null,
    msg,
    success: true,
  };
  return result;
};

/**
 * 删除数据
 * @param {*} dataList
 * @param {*} ids
 */
export const deletes = (dataList, ids) => {
  return dataList.filter((item) => ids.indexOf(item.id) === -1);
};

/**
 * 变更数据状态
 * @param {*} dataList
 * @param {*} ids
 * @param {*} state
 */
export const changeState = (dataList, ids, state) => {
  dataList.map((item) => {
    if (ids.indexOf(item.id) >= 0) {
      item.checkState = state;
    }
    return item;
  });
  const msg = state === 1 ? '审核成功' : '反审核成功';
  const result = {
    code: '201',
    data: null,
    msg: msg,
    success: true,
  };
  return result;
};
