import ButtonState from '@/components/TableView/ButtonState';
import BaseHandle from '@/handles/BaseHandle';
import BaseService from '@/handles/BaseService';
import PostRightService from '../service/PostRightService';
import { Checkbox, message, Select } from 'antd';
import CheckboxSelect from '@/components/CheckboxSelect';
import MsgBox from '@/utils/MsgBox';
import request from '@/utils/request';
import bigInt from 'big-integer';
import AppContext from '@/utils/AppContext';

let newInstance = null;

export default class PostRightSubHandle extends BaseHandle {
  constructor(model,masterDataSource) {
    const service = new PostRightService({ base: '/api/postRight' });
    const buttonState = new ButtonState();

    super({ masterDataSource, service, buttonState, ...model });
    this.changeCheck = this.changeCheck.bind(this);
    newInstance = this;
  }

  /**
   * 勾选复选框，计算功能模块行的勾选
   * @param {记录} record
   * @param {*} checked
   */
  calculationFunRightForCheck(record){
    let hasRightFuncodes = [...this.selectedRowKeys];
    //要检查这一行是否有选中的按钮
    var hasCheckedOper = false;
    record.operCheckInfo.otherOpersMore?.forEach(item => {
      if(item.data.checked){
        hasCheckedOper = true;
      }
    });
    record.operCheckInfo.baseOpers?.forEach(item => {
      if(item.checked){
        hasCheckedOper = true;
      }
    });

    if(hasCheckedOper){
      //不包含，要加上
      if(hasRightFuncodes.indexOf(record.c_FUN_CODE) == -1){
        hasRightFuncodes.push(record.c_FUN_CODE);
      }
      if(record.n_OPER_VALUE.and(this.funOperValue).compareTo(this.funOperValue) < 0){
        record.n_OPER_VALUE = record.n_OPER_VALUE.add(this.funOperValue);
      }
    }else{
      //包含要减去
      if(hasRightFuncodes.indexOf(record.c_FUN_CODE) >= 0){
        hasRightFuncodes.splice(hasRightFuncodes.indexOf(record.c_FUN_CODE),1);
      }
      if(record.n_OPER_VALUE.and(this.funOperValue).compareTo(this.funOperValue) == 0){
        record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(this.funOperValue);
      }
    }

    return hasRightFuncodes;
  }

  /**
   * 复选框勾选
   * @param {*} text
   * @param {*} record 记录
   * @param {*} index
   * @param {*} operValue 复选框对应的操作值
   * @param {*} oldChecked 目前勾选状态
   */
  changeCheck(text, record, index, operValue, oldChecked) {
    // console.log('xxxxxxx index', index);
    //console.log('changeCheck operValue', operValue);
    //检查目前是否选中
    var checked = !oldChecked;
    if(record.operCheckInfo){
      //设置基础按钮勾选
      if(record.operCheckInfo.baseOpers && record.operCheckInfo.baseOpers.get(operValue.c_OPER_CODE)){
        record.operCheckInfo.baseOpers.get(operValue.c_OPER_CODE).checked = checked;
      }
      //设置其他按钮勾选
      record.operCheckInfo.otherOpersMore?.forEach(item => {
        if(operValue.c_OPER_CODE == item.value){
          item.data.checked = checked;
        }
      });
      //计算权限：选中则加上按钮权限，否则减去按钮权限
      if(checked){
        record.n_OPER_VALUE = record.n_OPER_VALUE.add(operValue.n_OPER_VALUE);
      }else{
        record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(operValue.n_OPER_VALUE);
      }
      //重新计算行的权限
      let hasRightFuncodes = newInstance.calculationFunRightForCheck(record);
      this.changeState({dataSource: [...this.dataSource], selectedRowKeys: hasRightFuncodes});
    }
  }

  /**
   * 更多下拉中的批量勾选确认回调
   * @param {*} record
   * @param {*} checkboxValList
   */
  changeChecksForOtherMore(record, checkboxValList){
    //console.log("changeChecksForOtherMore checkboxValList",checkboxValList);
    record.operCheckInfo.otherOpersMore?.forEach(item => {
      var isChecked = false;
      for(var i=0; i<checkboxValList.length; i++){
        if(checkboxValList[i] == item.value){
          isChecked = true;
          break;
        }
      }
      if(isChecked){
        item.data.checked = true;
        //未包含按钮权限应加上
        if((record.n_OPER_VALUE.and(item.data.n_OPER_VALUE)).compareTo(item.data.n_OPER_VALUE) < 0){
          record.n_OPER_VALUE = record.n_OPER_VALUE.add(item.data.n_OPER_VALUE);
        }
      }else{
        item.data.checked = false;
        //包含按钮权限应减去
        if((record.n_OPER_VALUE.and(item.data.n_OPER_VALUE)).compareTo(item.data.n_OPER_VALUE) == 0){
          record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(item.data.n_OPER_VALUE);
        }
      }
    });

    //重新计算行的权限
    let hasRightFuncodes = newInstance.calculationFunRightForCheck(record);
    this.changeResult({dataSource: [...this.dataSource], selectedRowKeys: hasRightFuncodes});
  }

  edit({ event, button, currentRow }) {
    if(this.viewMode === "List"){
      super.edit({ event, button, currentRow });
    }else{
      const selectedRowKeys = currentRow || this.selectedRowKeys;
      this.setOperate('edit');
      this.changeState({operate:'edit'});
    }
  }

  //查询
  async query () {
    var queryCondition = super.getSearchFormParams();
    if(!this.footActiveKey || this.footActiveKey===""){
      MsgBox.warning({ message: '请选择至少一个岗位' });
      return;
    }
    //先清空之前的查询结果
    this.changeState({
      dataSource: [],
      subTableColumns:[],
    });

    this.setOperate('query');
    console.log("this.viewMode",this.viewMode);
    if(this.viewMode === "List"){
      //列表模式
      //super.query();
      this.queryList(queryCondition);
    }else{
      //视图模式，显示树形结构
      this.queryView(queryCondition);
    }
  }

  //查询列表模式并展示
  async queryList(queryCondition){
    const subTableNewColumns = [...this.subTableColumns];
    //用户转换
    const userConvertUrl = '/YSSUCOBRIDGE/ws/com/yss/framework/api/dataservice/controller/IUserDataServiceController/getKeyConvertMap?serviceId=osgi-fast';
    const userConvertMap = await request.post(userConvertUrl);
    //系统分类转换
    const clsConvertUrl = '/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getShortDataMap?serviceId=osgi-fast';
    const clsConvertMap = await request.post(clsConvertUrl,{data:"FUN_CLS"});

    //获取岗位权限(根据下部页签)
    const queryRes = await this.service.queryPostRightByPostCodeByMap(this.footActiveKey,"1",queryCondition);
    //数据转换
    var [treeList,dataMap] = this.service.convertPostRightListForListMode(queryRes.data.dataList,userConvertMap,clsConvertMap);
    this.changeResult({dataSource: treeList, dataSourceMap: dataMap, subTableColumns:subTableNewColumns});
  }

  //查询视图模式并展示
  async queryView(queryCondition){
    const subTableNewColumns = [...this.subTableColumns];
    subTableNewColumns.splice(2,(subTableNewColumns.length-2));

    //1.获取功能及功能下的操作列表
    const funRightTable = await this.service.getUserFunRightTable();
    //2.获取所有操作
    const allOpervalue = await this.service.queryOperValues();
    //3.获取基础操作列表
    const baseOperValues = await this.service.queryBaseOperValues();
    //转换基础操作按钮列表
    const baseOperValueMap = await this.service.getOperValueMap(baseOperValues.data);
    //console.log("--------------baseOperValueMap", baseOperValueMap);
    //转换获取其他按钮的操作列表
    const otherOperValueMap = await this.service.getOtherOperValueMap(baseOperValues.data, allOpervalue.data);
    //console.log("--------------otherOperValueMap", otherOperValueMap);
    //4.获取岗位权限(根据下部页签)
    const queryRes = await this.service.queryPostRightByPostCodeByMap(this.footActiveKey,"0",queryCondition);
    //5.转化数据，计算操作项及勾选情况
    let [tree, dataMap, parentCodes, selectedRowKeys] = this.service.convertPostRightListToTree(queryRes.data.dataList,baseOperValueMap,otherOperValueMap,funRightTable);
    queryRes.data = {list: tree};
    this.expandedRowKeys = parentCodes;
    console.log("--------------queryRes", queryRes);
    console.log("this.expandedRowKeys",this.expandedRowKeys);

    //6.1基础操作列
    if(baseOperValues.data && baseOperValues.data.length > 0){
      for(var i=0; i<baseOperValues.data.length; i++){
        let baseOperValue = baseOperValues.data[i];
        //let colOperValue = bigInt(baseOperValue.c_OPER_VALUE);
        let cloumKey = baseOperValue.c_OPER_CODE;
        subTableNewColumns.push({
          title: baseOperValue.c_DV_OPER_TYPE,
          dataIndex: baseOperValue.c_OPER_CODE + "_" +baseOperValue.c_OPER_VALUE,
          code: baseOperValue.c_OPER_CODE + "_" +baseOperValue.c_OPER_VALUE,
          key: {cloumKey},
          width: 40,
          hidden: false,
          export: true,
          render: (text, record, index) => {
            record = newInstance.dataSourceMap[record.code];
            if(record.operCheckInfo && record.operCheckInfo.baseOpers.get(cloumKey)){
              var checked = record.operCheckInfo.baseOpers.get(cloumKey).checked;
              return (
                <Checkbox disabled={newInstance.operate != 'edit'} checked={checked} onChange={() => {
                  newInstance.changeCheck(text, record, index, baseOperValue,checked);
                }}/>
              )
            }
          },
        });
      }
    }

    //6.2其他操作列
    subTableNewColumns.push({
      title: "其他",
      dataIndex: "other",
      code: 'other',
      key: "other",
      hidden: false,
      export: true,
      width: 200,
      render: (text, record, index) => {
        record = newInstance.dataSourceMap[record.code];
        if(record.operCheckInfo){
          var res = [];
          //其他按钮显示
          if(record.operCheckInfo.otherOpers.length > 0){
            record.operCheckInfo.otherOpers.forEach(item => {
              var operName = item.c_DV_OPER_TYPE;
              var checked = item.checked;
              res.push(
                <Checkbox disabled={newInstance.operate != 'edit'} checked={checked} onChange={() => {
                    newInstance.changeCheck(text, record, index, item, checked);
                  }}>{operName}</Checkbox>
              );
            });
          }
          if(record.operCheckInfo.otherOpersMore.length > record.operCheckInfo.otherOpers.length){
            //更多下拉单的回调函数
            const changeCallback = (funCode,checkboxValList) =>{
              if(funCode == record.c_FUN_CODE){
                newInstance.changeChecksForOtherMore(record,checkboxValList);
              }
            }
            //更多的其他按钮显示为：下拉框
            res.push(
              <CheckboxSelect optionsList={record.operCheckInfo.otherOpersMore}
                funCode={record.c_FUN_CODE}
                changeCallback={changeCallback}
                operate={newInstance.operate}
              />
            );
          }
          return (res);
        }
      }}
    );

    console.log("--------------queryRes?.data?.list", queryRes?.data?.list);
    this.changeResult({dataSource: queryRes?.data?.list,
      dataSourceMap: dataMap,
      subTableColumns: subTableNewColumns,
      selectedRowKeys: selectedRowKeys,
      expandedRowKeys:[...this.expandedRowKeys]});
  }

  /**
   * 列表模式下，获取要删除的行的权限
   * @param {选中的行} selectedRows
   * @param {目标功能代码列表} targetFunCodes
   * @param {功能删除后，对应的权限列表} dataList
   */
  async getDeleteRightForList(selectedRows,targetFunCodes,dataList){
    let postRights = [];
    var funOperValue = bigInt("2097152");
    var zeroValue = bigInt("0");

    //所有选中的行，在数据库中对应的岗位功能权限操作值
    let postFunOperValue = {};//<postCode,<funCode,n_oper_value>>
    selectedRows.forEach((item) => {
      if (item.checkState === 0 || item.auditState === 0) {
        postRights.push(item);
        let funCode = item.c_FUN_CODE;
        let postCode = item.c_POST_CODE;
        let n_OPER_VALUE = bigInt(item.c_OPER_VALUE);
        if(!postFunOperValue[postCode]){
          postFunOperValue[postCode] = {};
        }
        if(!postFunOperValue[postCode][funCode]){
          postFunOperValue[postCode][funCode] = n_OPER_VALUE;
        }
      }
    });
    //做减法
    if(postRights.length > 0){
      let allOperValues = await this.service.queryOperValues();
      allOperValues.data.forEach((operValue) => {
        operValue.n_OPER_VALUE = bigInt(operValue.c_OPER_VALUE);
      });
      postRights.forEach((postRight) => {
        allOperValues.data.forEach((operValue) => {
          if(operValue.c_OPER_CODE === postRight.c_OPER_CODE){
            let postCode = postRight.c_POST_CODE;
            let funCode = postRight.c_FUN_CODE;
            if(postFunOperValue[postCode] && postFunOperValue[postCode][funCode]){
              let n_OPER_VALUE = postFunOperValue[postCode][funCode];
              postFunOperValue[postCode][funCode] = n_OPER_VALUE.subtract(operValue.n_OPER_VALUE);
            }
          }
        });
      });
    }
    //组装岗位功能权限
    for(let postCode in postFunOperValue){
      console.log("postFunOperValue",postCode,postFunOperValue[postCode]);
      for(let funCode in postFunOperValue[postCode]){
        console.log("postFunOperValue",postCode,funCode,postFunOperValue[postCode][funCode]);
        targetFunCodes.push(funCode);
        let postRight = {
          c_POST_CODE:postCode,
          c_FUN_CODE:funCode,
          auditState:0,
          operator:"",
          modifier:AppContext.getUserCode(),
          modifyDate:"",
        };
        let n_OPER_VALUE = postFunOperValue[postCode][funCode];
        if(n_OPER_VALUE.compareTo(zeroValue) != 0 && n_OPER_VALUE.compareTo(funOperValue) != 0 ){
          postRight.c_OPER_VALUE = n_OPER_VALUE.toString();
          dataList.push(postRight);
        }
      }
    }
  }

  //复写基类的删除方法
  async deletes ({ event, button, currentRow }) {
    const selectedRows = currentRow || this.selectedRows;
    let targetFunCodes = [];
    let dataList = [];
    let post={c_POST_CODE:this.footActiveKey}
    if(this.viewMode === "List"){
      this.getDeleteRightForList(selectedRows,targetFunCodes,dataList);
    }
    MsgBox.confirmModal({
      title: '删除',
      content: '是否确定删除未审核的记录，删除后不可恢复',
      okText: '确定删除',
      type: "danger",
      onOk: async () => {
        try {
          let result;
          if(this.viewMode === "List"){
            //列表模式删除
            result = await this.service.updatePostAndRigths(post,dataList,targetFunCodes);
          }else{
            //视图模式删除（删除岗位下所有的权限）
            result = await this.service.deleteByPostList(post);
          }
          if(result.code === "success" && result.success){
            MsgBox.info({ message: '删除数据成功' });
            this.requery({ event });
          }else{
            MsgBox.error({ message: '删除数据失败' });
          }
        } catch (e) {
          console.log("删除数据失败",e);
          MsgBox.error({ message: '删除数据失败' });
        }
      },
    });
    return true;
  }

  /**
   *列表模式：获取待审核的功能菜单
   * @param {审核标识} auditFlag 0 审核 1 反审核
   */
  getTargetFunForList(){
    let targetFunCodes = [];
    this.selectedRows.forEach((item) => {
      let funCode = item.c_FUN_CODE;
      if(targetFunCodes.indexOf(funCode) < 0){
        targetFunCodes.push(funCode);
      }
    });
    return targetFunCodes;
  }

  //复写基类的审核方法
  check ({ event, button }) {
    MsgBox.confirmModal({
      title: '审核',
      content: '是否确定审核未审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: async() => {
        try {
          let result;
          if(this.viewMode === "List"){
            const targetFunCodes = this.getTargetFunForList();
            if(targetFunCodes.length == 0){
              MsgBox.warn({ message: '请选择要审核的数据' });
              return;
            }
            result = await this.service.auditByPostAndFunCodes(this.footActiveKey,targetFunCodes,0);
          }else{
            let post={c_POST_CODE:this.footActiveKey}
            result = await this.service.auditByPostList(post);
          }
          console.log("check result",result);
          if(result.code === "success" && result.success){
            MsgBox.info({ message: '审核数据成功' });
            this.requery({ event });
          }else{
            MsgBox.info({ message: '审核数据失败' });
          }
        } catch (e) {
          MsgBox.error({ message: '审核数据失败' });
        }
      },
    });
    return true;
  }

  //复写基类的反审核方法
  uncheck ({ event, button }) {
    MsgBox.confirmModal({
      title: '反审核',
      content: '是否确定反审核已审核的记录?',
      okText: '确认',
      cancelText: '取消',
      onOk: async() => {
        try {
          let result;
          if(this.viewMode === "List"){
            const targetFunCodes = this.getTargetFunForList();
            if(targetFunCodes.length == 0){
              MsgBox.warn({ message: '请选择要反审核的数据' });
              return;
            }
            result = await this.service.auditByPostAndFunCodes(this.footActiveKey,targetFunCodes,1);
          }else{
            let post={c_POST_CODE:this.footActiveKey}
            result = await this.service.unAuditByPostList(post);
          }
          console.log("uncheck result",result);
          if(result.code === "success" && result.success){
            MsgBox.info({ message: '反审核数据成功' });
            this.requery({ event });
          }else{
            MsgBox.info({ message: '反审核数据失败' });
          }
        } catch (e) {
          MsgBox.error({ message: '反审核数据失败' });
        }
      },
    });
    return true;
  }

  //复写基类的保存方法
  save(data, event, button) {
    // this.service.save(data);
    let datasource =  [...this.dataSource];
    let currPost = null;//岗位信息
    let dataList = [];//权限列表
    let currFunCode = [];//选中的菜单
    let bigZero = bigInt("0");
    //获取选中的岗位信息
    if(this.masterDataSource && this.masterDataSource.length > 0){
      this.masterDataSource.forEach(item => {
        if(item.c_POST_CODE === this.footActiveKey){
          currPost = item;
        }
      });
    }
    //获取权限和目标功能代码
    if(datasource && datasource.length > 0){
      datasource.forEach(child => {
        this.service.convertToPostRights(child,dataList,currFunCode,currPost.c_POST_CODE, bigZero);
      });
    }

    let params ={
      post:currPost,
      postRigths:dataList,
      targetFunCodes:currFunCode
    };
    console.log("okHandle params",params);
    request
      .post('/YSSUCOBRIDGE/ws/com/yss/fast/right/support/post/controller/IPostNewServiceController/updatePostAndRigths?serviceId=osgi-fast',{data:params} )
      .then((reslut) => {
        if (reslut.success) {
          message.success('保存成功！');
          this.requery({ event });
        } else {
          MsgBox.error({message: `保存失败:${reslut.data}`,});
        }
      });
  }
}

