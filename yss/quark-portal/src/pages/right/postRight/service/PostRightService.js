import BaseService from '@/handles/BaseService';
import request from '@/utils/request';
import bigInt from 'big-integer';
import moment from 'moment';
import AppContext from "@/utils/AppContext";

class PostRightService extends BaseService{
  async getAllPost() {
    let param ={dataClass:"Post"};
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/queryByCondition';
    let result = await request.post(url,{data:param});
    console.log("PostRightService------------",result);
    return result;
  }

  // 获取岗位下的权限
  queryPostRightByPostCodeByMap (postCode,showMod,queryCondition) {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/queryPostRightByPostCodeByMap';
    let params = {
      dataClass:"PostRight",postCode:postCode,authOrgCode:"[root]",showType:"All",showMod:showMod
    };
    //查询条件:系统分类
    let funClss = queryCondition["c_DV_FUN_CLS_NAME"];
    if(funClss){
      let ARRAY_C_DV_FUN_CLS = "";
      for(let i=0; i<funClss.length; i++){
        let funCls = funClss[i];
        if(i==0){
          ARRAY_C_DV_FUN_CLS = funCls;
        }else{
          ARRAY_C_DV_FUN_CLS = ARRAY_C_DV_FUN_CLS + "," +funCls;
        }
      }
      if("" != ARRAY_C_DV_FUN_CLS){
        params.ARRAY_C_DV_FUN_CLS = ARRAY_C_DV_FUN_CLS;
      }
    }
    //查询条件：功能名称
    if(queryCondition["c_FUN_NAME"]){
      params.C_FUN_NAME = queryCondition["c_FUN_NAME"];
    }
    console.log("params--------",params);

    const res = request.post(url, {
      data:params,
    });
    return res;
  }

  // 获取功能菜单
  getUserFunRightTable () {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/getUserFunRightTable';
    const params = {
      serviceId: 'osgi-fast',
    };
    const res = request.get(url, {
      params,
    });
    return res;
  }

  // 获取基础操作列表
  queryBaseOperValues () {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostRightServiceController/queryBaseOperValues';
    const params = {
      serviceId: 'osgi-fast',
    };
    const res = request.post(url, {
      params,
    });
    return res;
  }

  // 获取所有操作列表
  queryOperValues () {
    const url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/right/controller/IUserPostRightServiceController/queryOperValues';
    const params = {
      serviceId: 'osgi-fast',
    };
    const res = request.post(url, {
      params,
    });
    return res;
  }

  //修改岗位权限
  async updatePostAndRigths(post,postRigths,targetFunCodes){
    let param ={post:post,postRigths:postRigths,targetFunCodes:targetFunCodes};
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/updatePostAndRigths';
    let result = await request.post(url,{data:param});
    return result;
  }

  //删除岗位下的权限
  async deleteByPostList(post){
    let param =[post];
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/deleteByPostList';
    let result = await request.post(url,{data:param});
    return result;
  }

  //审核（/或者反审核）岗位下指定菜单的权限
  async auditByPostAndFunCodes(postCode,targetFuncodes,auditFlat){
    let param ={postCode:postCode,targetFuncodes:targetFuncodes,auditFlat:auditFlat};
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/auditByPostAndFunCodes';
    let result = await request.post(url,{data:param});
    return result;
  }

  //审核岗位的权限
  async auditByPostList(post){
    let param =[post];
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/auditByPostList';
    let result = await request.post(url,{data:param});
    return result;
  }

  //反审核岗位的权限
  async unAuditByPostList(post){
    let param =[post];
    let url = '/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostRightController/unAuditByPostList';
    let result = await request.post(url,{data:param});
    return result;
  }

  // 获取基础的操作MAP
  getOperValueMap(operValues){
    var map = {};
    for(let i=0; i<operValues.length; i++){
      var operValue = operValues[i];
      operValue.n_OPER_VALUE = bigInt(operValue.c_OPER_VALUE);
      //map.set(baseOperValue.c_OPER_CODE,baseOperValue);
      map[operValue.c_OPER_CODE] = operValue;
    }
    return map;
  }

  // 获取其他的操作MAP
  getOtherOperValueMap(baseOperValues, allOperValues){
    var map = new Map();
    if (allOperValues && allOperValues.length > 0) {
      // 将根节点塞进列表
      for(var i=0; i<allOperValues.length; i++){
        var isOther = true;
        var operValue = allOperValues[i];
        for(var j=0; j<baseOperValues.length; j++){
          var baseOperValue = baseOperValues[j];
          if(baseOperValue.c_OPER_CODE == operValue.c_OPER_CODE){
            isOther = false;
            break;
          }
        }
        if(isOther){
          //其他按钮的大数字转换
          operValue.n_OPER_VALUE = bigInt(operValue.c_OPER_VALUE);
          //map.set(operValue.c_OPER_CODE,operValue);
          map[operValue.c_OPER_CODE] = operValue;
        }
      }
    }

    return map;
  }

  //获取功能模块下的按钮，及按钮是否选中的情况
  getOperCheckedMap(data,baseOperValueMap,otherOperValueMap,funRightTable){
    var operCheckInfo = {};//按钮操作信息{[{ADD:baseOper1},{DEL:baseOper2}], otherOpers:[{otherOper1},{otherOper2}]}
    var baseOpers = new Map();//基础按钮 [{ADD:baseOper1},{DEL:baseOper2}]
    var otherOpers = [];//其他按钮 [{otherOper1},{otherOper2}]
    var otherOpersMore = [];//超出一定个数的其他按钮
    operCheckInfo.baseOpers = baseOpers;
    operCheckInfo.otherOpers = otherOpers;
    operCheckInfo.otherOpersMore = otherOpersMore;

    var funCode = data.c_FUN_CODE;
    if(!funRightTable.data[funCode]){
      return operCheckInfo;
    }
    var funRightOpers = funRightTable.data[funCode];//功能下操作的列表
    var rightValue = data.n_OPER_VALUE;//功能的权限
    let otherSize =0;//其他中的按钮总字数
    for(let i=0; i<funRightOpers.length; i++){
      var funRightOperCode = funRightOpers[i];
      if(baseOperValueMap[funRightOperCode]){
        //基础按钮按钮的值
        var baseOperRight = baseOperValueMap[funRightOperCode].n_OPER_VALUE;
        //功能包含按钮
        var checked = false;
        if((rightValue.and(baseOperRight)).compareTo(baseOperRight) == 0){
          checked = true;
        }

        //对应基础按钮复选框
        let _baseOper = JSON.parse(JSON.stringify(baseOperValueMap[funRightOperCode]));
        _baseOper.checked = checked;
        baseOpers.set(_baseOper.c_OPER_CODE,_baseOper);
      }else if(otherOperValueMap[funRightOperCode]){
        //其他按钮的值
        var otherOper = otherOperValueMap[funRightOperCode];
        var otherOperRight = otherOper.n_OPER_VALUE;
        //功能包含按钮
        var checked = false;
        if((rightValue.and(otherOperRight)).compareTo(otherOperRight) == 0){
          checked = true;
        }
        var _otherOper = JSON.parse(JSON.stringify(otherOper));
        _otherOper.checked = checked;
        otherSize = otherSize + _otherOper.c_DV_OPER_TYPE.length;
        if(otherOpers.length < 3 && otherSize < 9){//其他中的按钮，总字数小于9,（避免：因按钮字数太多，显示不全的问题）
          otherOpers.push(_otherOper);
        }

        //对应其他按钮列表的复选框
        let moreOpt = {};
        moreOpt.label = _otherOper.c_DV_OPER_TYPE;
        moreOpt.value = _otherOper.c_OPER_CODE;
        moreOpt.data = _otherOper;
        otherOpersMore.push(moreOpt);
      }
    }
    return operCheckInfo;
  }

  //列表模式：转换岗位权限到树形结构
  convertPostRightListForListMode(listData,userConvertMap,clsConvertMap){
    let list = [];
    var funOperValue = bigInt("2097152");
    var zeroValue = bigInt("0");
    const dataMap = {};
    if (listData && listData.length > 0) {
      let validList = [];
      listData.forEach(item => {
        let rightValue = bigInt(item.c_OPER_VALUE);
        let menuItem = JSON.parse(JSON.stringify(item));
        menuItem.code = item.c_FUN_CODE + "___" + item.c_POST_CODE +"___" + item.c_OPER_CODE;
        menuItem.n_OPER_VALUE=rightValue;
        menuItem.isLeaf = true;
        menuItem.isShow = true;
        //代码转换为名称展示
        if(userConvertMap.data[menuItem.operator] != undefined){
          menuItem.operatorName = userConvertMap.data[menuItem.operator];
        }
        if(userConvertMap.data[menuItem.modifier] != undefined){
          menuItem.modifierName = userConvertMap.data[menuItem.modifier];
        }
        if(clsConvertMap.data[menuItem.c_DV_FUN_CLS] != undefined){
          menuItem.c_DV_FUN_CLS_NAME = clsConvertMap.data[menuItem.c_DV_FUN_CLS];
        }
        list.push(menuItem);
        dataMap[menuItem.code] = menuItem;
      });
    }
    return [list,dataMap];
  }

  //转换岗位权限到树形结构
  convertPostRightListToTree(listData,baseOperValueMap,otherOperValueMap,funRightTable) {
    const root = [];
    const treeList = [];
    const dataMap = {};
    const parentCodes = ["[root]"];
    var that = this;
    var funOperValue = bigInt("2097152");
    var selectedRowKeys = [];

    //岗位下功能权限转换
    if (listData && listData.length > 0) {
      listData.forEach(item => {
        if (root.length == 0 && item.c_FUN_CODE === '[root]') {
          //根节点只有一个
          root.push(item);
        }
        //全部数据去重
        if(!dataMap[item.c_FUN_CODE]){
          item.n_OPER_VALUE = bigInt(item.c_OPER_VALUE);
          //获取有权限的功能
          if((item.n_OPER_VALUE.and(funOperValue)).compareTo(funOperValue) == 0){
            selectedRowKeys.push(item.c_FUN_CODE);
          }
          //获取功能包含的按钮，及按钮的勾选情况
          item.operCheckInfo = that.getOperCheckedMap(item,baseOperValueMap,otherOperValueMap,funRightTable);
          item.code = item.c_FUN_CODE;
          dataMap[item.c_FUN_CODE] = item;
          treeList.push(item);
        }
      });

      // 将各个节点放到其父节点下面
      treeList.forEach(item => {
        if(item.c_FUN_CODE != '[root]'){
          const parent = dataMap[item.c_FUN_CODE_P];
          if(parent != undefined){
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
            parentCodes.push(item.c_FUN_CODE_P);
          }
        }
      });
    }
    return [root, dataMap, parentCodes, selectedRowKeys];
  }

  //转换树形结构到列表模式
  convertToPostRights(data,dataList,currFunCode,postCode,bigZero){
    if(data.children && data.children.length > 0){
      data.children.forEach(child => {
        this.convertToPostRights(child,dataList,currFunCode,postCode,bigZero);
      });
    }else{
      currFunCode.push(data.c_FUN_CODE);
      if(data.n_OPER_VALUE && data.n_OPER_VALUE.compareTo(bigZero) != 0){
        data.c_POST_CODE = postCode;
        delete data.code;
        delete data.c_FUN_NAME;
        delete data.c_FUN_CODE_P;
        data.c_OPER_VALUE = data.n_OPER_VALUE.toString();
        data.modifier = AppContext.getUserCode();
        data.modifyDate = moment().format('YYYY-MM-DD hh:mm:ss');
        dataList.push(data);
      }
    }
  }

}

export default PostRightService
