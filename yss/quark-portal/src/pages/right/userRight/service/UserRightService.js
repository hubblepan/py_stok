import request from '@/utils/request';


const commonParams = {serviceId: 'osgi-fast'};
// 复制用户权限
export function updateUserPostDataCopy(userPostDataList, postcodes, dataType, userCode) {
  return request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/updateUserPostDataCopy', {
    params: commonParams,
    data: {
      userPostDataList,
      postcodes,
      dataType,
      userCode,
    }
  });
}

// 审核用户权限
export function auditUserPostByPostList(userDataRightList) {
  return request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/auditUserPostByPostList', {
    params: commonParams,
    data: userDataRightList,
  })
}


export function queryUserDataRight(postCodes, c_DATA_TYPE, c_USER_CODE) {
  return request.post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostDataServiceController/queryByUserCodeByUser', {
    params: commonParams,
    data: {postCodes, c_DATA_TYPE, c_USER_CODE}});
}

export function queryDataByType(dataType) {
  return request.post('/YSSUCOBRIDGE/ws/com/yss/right/controller/IFastDataRightServiceController/queryDataByType', {
    params: commonParams,
    data: dataType});
}
