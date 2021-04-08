import BaseService from '@/handles/BaseService';
import request from '@/utils/request';

class PostService extends BaseService{
  async query(params) {

    params.paraMap.dataClass = "Post";
    params.paraMap.N_CHECK_STATE = "SearchAll";
    //查总数
    const totalUrl = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryDataTotal?serviceId=osgi-fast';
    const totalRes = await request.post(totalUrl, {data:params.paraMap});
    // console.log("PostService:totalRes",totalRes);

    //查结果
    //console.log("PostService:params",params);
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryByCondition/page?serviceId=osgi-fast';
    const response = await request.post(url, {data:params});
    // console.log("PostService:response",response);

    //词典转换
    //权限机构转换
    const orgConvertUrl = '/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IAuthOrgDataServiceController/getKeyConvertMapByList?serviceId=osgi-fast';
    const orgConvertMap = await request.post(orgConvertUrl,{data:[]});
    //console.log("PostService:orgConvertMap",orgConvertMap);
    //用户转换
    const userConvertUrl = '/YSSUCOBRIDGE/ws/com/yss/framework/api/dataservice/controller/IUserDataServiceController/getKeyConvertMap?serviceId=osgi-fast';
    const userConvertMap = await request.post(userConvertUrl);
    // console.log("PostService:userConvertMap",userConvertMap);
    //状态转换
    const stateConvertUrl = '/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getShortDataMap?serviceId=osgi-fast';
    const stateConvertMap = await request.post(stateConvertUrl,{data:"SHZT"});
    // console.log("PostService:stateConvertMap",stateConvertMap);

    response.data.dataList.forEach((item)=>{
      if(orgConvertMap.data[item.c_AUTH_ORG_CODE] != undefined){
        item.c_AUTH_ORG_NAME = orgConvertMap.data[item.c_AUTH_ORG_CODE];
      }
      if(stateConvertMap.data["SHZT_"+item.auditState] != undefined){
        item.auditStateName = stateConvertMap.data["SHZT_"+item.auditState];
      }
      if(userConvertMap.data[item.operator] != undefined){
        item.operatorName = userConvertMap.data[item.operator];
      }
      if(userConvertMap.data[item.modifier] != undefined){
        item.modifierName = userConvertMap.data[item.modifier];
      }
    });

    const result = {
      code: response.code,
      data: { list: response.data.dataList, total: totalRes.data },
      success: response.success,
      msg: response.message,
    };

    //console.log("PostService:result",result);
    return result;
  }

  //删除
  async deletes(ids){
    let posts = [];
    ids.forEach((item) => {
      posts.push({id:item});
    });
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/deleteById/list?serviceId=osgi-fast';
    await request.post(url,{data:posts} );
    // console.log("deletes ok");
  }

  //审核
  async check(ids){
    let posts = [];
    ids.forEach((item) => {
      posts.push({id:item});
    });
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/auditById/list?serviceId=osgi-fast';
    await request.post(url,{data:posts} );
    // console.log("check ok");
  }

  //反审核
  async uncheck(ids){
    let posts = [];
    ids.forEach((item) => {
      posts.push({id:item});
    });
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/unAuditById/list?serviceId=osgi-fast';
    await request.post(url,{data:posts} );
    console.log("uncheck ok");
  }

}

export default PostService
