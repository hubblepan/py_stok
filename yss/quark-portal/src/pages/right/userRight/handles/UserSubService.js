import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import MsgBox from "@/utils/MsgBox";

let commParams = {serviceId: 'osgi-fast'}
class UserSubService extends BaseService{
  async query(params) {
    console.log('', params);
    // 获取选择到的用户数据参数
    const selectedOrgs = this.masterSelectedRows;
    if (!selectedOrgs || selectedOrgs.length < 1) {
      MsgBox.warning({ message: '请选择一个机构' });
      return;
    }

    // 获取总数量
    const queryDataTotal = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryDataTotal';
    const totalRes = await request.post(queryDataTotal, {
      params: commParams,
      data: {C_AUTH_ORG_CODE: selectedOrgs.c_AUTH_ORG_CODE, dataClass: 'User'}
    });


    // 获取分页数据
    const url = '/YSSUCOBRIDGE/ws/com/yss/platform/support/system/user/controller/IUserController/queryByCondition/page';
    const data = {
      paraMap: {C_AUTH_ORG_CODE: selectedOrgs.c_AUTH_ORG_CODE, dataClass: 'User'},
      // 查询数据

      page: {
        currPage: 1,
        pageCount: params.pageNo,
        totalNum: params.pageTotal,
        pageSize: params.pageSize,
        usePage: true,
      },
    };
    const res = await request.post(url, {params: commParams, data});
    // dataList 数据放入dataSource
    // headKeyList 数据放入columns
    const newColumns = res?.data?.headKeyList?.map(item => {
      // "key":"C_DV_CARD_TYPE",
      //   "text":"证件类型",
      //   "align":"L",
      //   "format":"",
      //   "realTableName":"",
      //   "aliasColumnName":"",
      //   "serviceId":"IVocDataService",
      //   "showName":"",
      //   "isShow":"",
      //   "width":"",
      //   "sortable":"",
      //   "order":"",
      //   "isExport":"",
      //   "isFrozen":"",
      //   "typeCode":"",
      //   "defaultDictTypeValue":"",
      //   "dictType":""
      return {
        title: item.text,
        dataIndex: item.key[0].toLowerCase() + item.key.substr(1),
        key: item.key,
        width: 100,
        resizable: true,
        hidden: false,
        export: true,
      }
    });
    console.log(res.data.dataList, newColumns);
    this.changeResult({dataSource: res?.data?.dataList, subColumns: newColumns});
  }
}

export default UserSubService
