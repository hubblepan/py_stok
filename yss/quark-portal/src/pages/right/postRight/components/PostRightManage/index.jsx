import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { Tabs, Tooltip, Input, Select ,Radio} from 'antd';

import {
  FileSearchOutlined,
  SettingOutlined,
  SearchOutlined,
  FileTextOutlined,
  AppstoreOutlined, ProfileOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import PagePane from '@/blocks/PagePane';
import PostRightMasterHandle from '../../handles/PostRightMasterHandle';
import PostRightSubHandle from '../../handles/PostRightSubHandle';
import ToolBar from '@/components/ToolBar';
import request from '@/utils/request';
const { TabPane } = Tabs;
import PostRightAdd from '../../add-list/addRight';

import QuarkTable from "@/components/QuarkTable";
import MsgBox from '@/utils/MsgBox';
import { useTablePipeline, features, BaseTable } from 'ali-react-table';

import {Table, Checkbox} from 'antd';
import bigInt from 'big-integer';

export const FatherContext = createContext();

const PostRightManage = () => {

  const masterModel = useModel('right.postRight.postRightMasterModel');
  const subModel = useModel('right.postRight.postRightSubModel');
  const {subTableColumns, detailVisible,selectedRows,selectedRowKeys,footActiveKey,viewMode,
    formVisible, setFormVisible, formData, operate,expandedRowKeys} = subModel;

  const {addVisible,changeSelectedRows } = masterModel;

  const [selectedFootTabs, setSelectedFootTabs] = useState([]);
  const [dVClsDatas, setDVClsDatas] = useState([]);
  const funOperValue = bigInt("2097152");

  const masterHandle = new PostRightMasterHandle(masterModel);
  const subHandle = new PostRightSubHandle({ ...subModel}, [...masterModel.dataSource]);

  const masterTableColumns = [
    {
      title: '岗位名称',
      key: 'typeName',
      dataIndex: 'typeName',
    },
    {
      title: '岗位代码',
      key: 'typeCode',
      dataIndex: 'typeCode',
    },
  ];

  //主页面：工具栏
  const masterTabletoolbar = {
    buttons: {
      dashed: {
        visible: 1,
        children: {
          refresh:{
            visible:1
          }
        },
      },
    },
  };

  //子页面： 工具栏
  const subTabletoolbar = {
    funCode:'PostManager',
    buttons: {
      add: {
        operCode: 'ADD',
        text: '新增',
        method: 'add',
        order: 20,
        visible: 1,
        disable: () => {
          if(viewMode === "List"){
            return false;//只有列表模式，才可用
          }else{
            return true;
          }
        }
      },
      edit: {
        operCode: 'UPD',
        text: '修改',
        method: 'edit',
        visible: 1,
        order: 20,
        disable: () => {
          if(operate === 'query'){
            if(viewMode === "View"){
              if(subModel.auditState.unAudit > 0 || (subModel.auditState.unAudit===0 && subModel.auditState.audit === 0)){
                return false;
              }else{
                return true;
              }
            }else{
              if(subModel.auditState.unAudit > 0 && subModel.auditState.audit === 0){
                return false;
              }else{
                return true;
              }
            }
          }
        }
      },
      save: {
        operCode: 'SAVE',
        text: '保存',
        method: 'save',
        visible: 1,
        order: 30,
        disable: () => {
          //视图模式，编辑操作下才可用
          if(viewMode === "View"){
            return operate != 'edit';
          }else{
            return true;
          }
        }
      },
      deletes: {
        operCode: 'DEL',
        text: '删除',
        method: 'deletes',
        visible: true,
        order: 50,
        disable: () => {
          //有选中的行，即可用
          if(viewMode === "View"){
            if(subModel.auditState.unAudit > 0){
              return false;
            }else{
              return true;
            }
          }else{
            if(subModel.auditState.unAudit > 0 && subModel.auditState.audit === 0){
              return false;
            }else{
              return true;
            }
          }
        }
      },
      check: {
        operCode: 'CHK',
        id: 'check',
        text: '审核',
        visible: true,
        order: 60,
        disable: () => {
          if(subModel.auditState.unAudit > 0){
            return false;
          }else{
            return true;
          }
        }
      },
      uncheck: {
        operCode: 'UCHK',
        id: 'uncheck',
        text: '反审核',
        visible: true,
        order: 70,
        disable: () => {
          if(viewMode === "View"){
            if(subModel.auditState.audit > 0 && subModel.auditState.unAudit === 0){
              return false;
            }else{
              return true;
            }
          }else{
            if(subModel.auditState.audit > 0){
              return false;
            }else{
              return true;
            }
          }
        }
      },

      more: {
        visible: true,
      },
    },
  };

  // 搜索栏
  const subTableSearchBar = [
    // <Input type="text" key="c_DV_FUN_CLS" label="系统名称" name="c_DV_FUN_CLS_NAME" />,
    <Select
      allowClear
      label="系统名称"
      name="c_DV_FUN_CLS_NAME"
      mode="multiple"
    >
      {dVClsDatas.map(dVClsData => (
          <Option key={dVClsData.key}>{dVClsData.value}</Option>
        ))}
    </Select>,
    <Input type="text" key="c_FUN_NAME" label="功能名称" name="c_FUN_NAME" />,
  ];

  // 获取系统分类的词汇列表
  const getDVClsDatas = () =>{
    request
    .post('/YSSUCOBRIDGE/ws/com/yss/platform/support/dataservice/controller/IVocDataServiceController/getShortDataMap?serviceId=osgi-fast',{data:"FUN_CLS"})
    .then((result) => {
      //转换树形结构
      var data = result.data;
      let list = [];
      for(var p in data){//遍历json对象的每个key/value对,p为key
        list.push({key:p,value:data[p]});
      }
      setDVClsDatas(list);
    });
  };

  // 搜索栏初始化
  useEffect(() => {
    //初始化查询条件
    getDVClsDatas();
  }, []);

  //子页面：切换页签生效，清空子表页面数据
  const clearSubTableData = ()=>{
    //列头重新展示
    let tableColumn=[];
    if(viewMode === "List"){
      tableColumn = subTableListColumns;
    }else{
      tableColumn = subTableViewColumns;
    }

    subModel.changeState({
      dataSource: [],
      subTableColumns:tableColumn,
      selectedRowKeys:[],
    });
  }

  //子页面：底部页签切换
  const onFootTabChange = (key)=> {
    //console.log("底部页签，切换",key);
    setSelectedFootTabs([...selectedFootTabs]);
    subModel.setFootActiveKey(key);
    clearSubTableData();
  }

  //删除当前页签后，改变选中索引
  const changeSelectIndexAfterDelFootTab = (targetKey)=>{
    let newLength = selectedFootTabs.length;
    if(footActiveKey === targetKey){
      let newActiveKey = "";
      if(newLength > 0){
        newActiveKey = selectedFootTabs[newLength-1].c_POST_CODE
      }
      subModel.setFootActiveKey(newActiveKey);
      clearSubTableData();
    }
  }

  //子页面：底部页签编辑
  const onFootTabEdit = (targetKey, action)=> {
    //console.log("操作tab页签",targetKey,action);
    if("remove" == action){
      //底部tab页签删除
      let hasSelectedIndex = -1;
      for(let i= 0; i<selectedFootTabs.length; i++){
        let oldItem = selectedFootTabs[i];
        if(oldItem.typeCode == targetKey){
          hasSelectedIndex = i;
          break;
        }
      }
      if(hasSelectedIndex != -1){
        selectedFootTabs.splice(hasSelectedIndex,1);
        setSelectedFootTabs([...selectedFootTabs]);
        //删除当前页签后，改变选中索引
        changeSelectIndexAfterDelFootTab(targetKey);
      }
      //控制主表去除行的勾选
      let hasMasterSelectedIndex = -1;
      for(let i= 0; i<masterModel.selectedRowKeys.length; i++){
        let oldkey = masterModel.selectedRowKeys[i];
        if(oldkey == targetKey){
          hasMasterSelectedIndex = i;
          break;
        }
      }
      if(hasMasterSelectedIndex != -1){
        masterModel.selectedRowKeys.splice(hasSelectedIndex,1);
      }
    }
  }

  //主表：改变主表复选框的状态,触发
  const changeMasterRowChecked = (record, selected)=>{
    //是否已选中
    let hasSelectedIndex = -1;
    for(let i= 0; i<selectedFootTabs.length; i++){
      let oldItem = selectedFootTabs[i];
      if(oldItem.typeCode == record.typeCode){
        hasSelectedIndex = i;
        break;
      }
    }
    if(selected){
      if(hasSelectedIndex == -1){
        let selectedRow = JSON.parse(JSON.stringify(record));
        selectedFootTabs.push(selectedRow);

        ////添加页签后，改变选中索引
        subModel.setFootActiveKey( selectedRow.c_POST_CODE);
        clearSubTableData();
      }
    }else{
      if(hasSelectedIndex != -1){
        //删除页签
        selectedFootTabs.splice(hasSelectedIndex,1);
        //删除当前页签后，改变选中索引
        changeSelectIndexAfterDelFootTab(record.typeCode);
      }
    }
  }

  //主表：行选中
  const rowSelectionPost = {
    selectedRowKeys:masterModel.selectedRowKeys,
    onChange: changeSelectedRows,
    onSelect: (record, selected, treeSelectedRows) => {
      changeMasterRowChecked(record, selected);
      setSelectedFootTabs([...selectedFootTabs]);
    },
    onSelectAll: (selected, treeSelectedRows, changeRows) => {
      // checkbox全选选择
      changeRows.map((record, index) => {
        changeMasterRowChecked(record, selected);
      });
      setSelectedFootTabs([...selectedFootTabs]);
    },
  };

  //主表
  const masterTable ={
    //...masterModel,
    tableType: 'antd',
    columns: masterTableColumns,
    toolbar: masterTabletoolbar,
    tableProps: {
      rowKey: 'typeCode', // 必填
      expandable: {
        defaultExpandAllRows: false, // 默认展开所有行
      },
      rowSelection:rowSelectionPost,
      rowClassName: (record, index) => {
        if (record.checkState == 0 || record.auditState === 0 ) {
          return 'text-warning';
        }
      }
    },
    //handles: masterHandle,
    search: {
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
    },
  }

  //子表：行选中
  const rowSelectedPostRight = (keys)=>{
    //计算已审核和未审核的数量
    let auditState = {audit:0, unAudit:0};
    for(let i=0; i<keys.length; i++){
      let record = subModel.dataSourceMap[keys[i]];
      if(record){
        if(record.auditState > 0){
          auditState.audit = auditState.audit + 1;
        }else{
          auditState.unAudit = auditState.unAudit + 1;
        }
      }
    }
    subModel.changeState({auditState: {...auditState},});

    //只有视图模式才重新计算每行的权限
    if(subModel.viewMode != "View" || operate != 'edit'){
      return;
    }
    //动态列的复选框：未选中变为选中
    keys.forEach((item) => {
      let record = subModel.dataSourceMap[item];
      if(record && (record.n_OPER_VALUE.and(funOperValue)).compareTo(funOperValue)< 0){
        changeRowChecked(record, true);
      }
    });
    //动态列的复选框：选中变为未选中
    for(var key in subModel.dataSourceMap){
      let record = subModel.dataSourceMap[key];
      if(record && (record.n_OPER_VALUE.and(funOperValue)).compareTo(funOperValue) === 0 && keys.indexOf(key) < 0){
        changeRowChecked(record, false);
      }
    }
    //行选中状态
    subModel.changeState({
      dataSource: [...subModel.dataSource],
    });
  }

  //子表：改变子表行复选框的选中状态
  const changeRowChecked =(record, selected)=>{
    console.log("record, selected---",record, selected);
    if(record){
      if(record.operCheckInfo){
        //设置基础按钮勾选
        record.operCheckInfo.baseOpers.forEach(function(value,key){
          value.checked = selected;
          if(selected && (record.n_OPER_VALUE.and(value.n_OPER_VALUE)).compareTo(value.n_OPER_VALUE) < 0){
            //勾选，未包含按钮权限应加上
            record.n_OPER_VALUE = record.n_OPER_VALUE.add(value.n_OPER_VALUE);
          }else if(!selected && (record.n_OPER_VALUE.and(value.n_OPER_VALUE)).compareTo(value.n_OPER_VALUE) == 0){
            //去除勾选，勾选的权限应减去
            record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(value.n_OPER_VALUE);
          }
  　　　});
        //设置其他按钮勾选
        record.operCheckInfo.otherOpersMore?.forEach(item => {
          item.data.checked = selected;
          if(selected && (record.n_OPER_VALUE.and(item.data.n_OPER_VALUE)).compareTo(item.data.n_OPER_VALUE) < 0){
            //勾选，未包含按钮权限应加上
            record.n_OPER_VALUE = record.n_OPER_VALUE.add(item.data.n_OPER_VALUE);
          }else if(!selected && (record.n_OPER_VALUE.and(item.data.n_OPER_VALUE)).compareTo(item.data.n_OPER_VALUE) == 0){
            //去除勾选，勾选的权限应减去
            record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(item.data.n_OPER_VALUE);
          }
        });
      }
      //设置行的权限
      if(selected && (record.n_OPER_VALUE.and(funOperValue)).compareTo(funOperValue) < 0){
        //行勾选，勾选行的权限应加上
        record.n_OPER_VALUE = record.n_OPER_VALUE.add(funOperValue);
      }else if(!selected && (record.n_OPER_VALUE.and(funOperValue)).compareTo(funOperValue) == 0){
        //去除行勾选，勾选行的权限应减去
        record.n_OPER_VALUE = record.n_OPER_VALUE.subtract(funOperValue);
      }
    }
  }

  //子表：切换模式
  const changeViewMode =(e)=>{
    let targetMode = e.target.value;
    subModel.setViewMode(targetMode);
  }

  //监听viewMode
  useEffect(() => {
    //清空子表页面数据
    clearSubTableData();
  }, [viewMode]);

  //监听子表selectedRowKeys
  useEffect(() => {
    rowSelectedPostRight([...selectedRowKeys]);
  }, [selectedRowKeys]);

  //子表：列表模式下的列
  const subTableListColumns = [
    {
      title: '岗位名称',
      key: 'c_POST_NAME',
      dataIndex: 'c_POST_NAME',
      code: 'c_POST_NAME',
      resizable: true,
      width: 120,
      fixed: 'left',
      lock: true,
      ellipsis: true,
    },
    {
      title: '系统',
      key: 'c_DV_FUN_CLS',
      dataIndex: 'c_DV_FUN_CLS',
      code: 'c_DV_FUN_CLS',
      resizable: true,
      width: 90,
      lock: true,
      fixed: 'left',
      ellipsis: true,
      render: (text,record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.c_DV_FUN_CLS_NAME}</div>
      ),
    },
    {
      title: '功能名称',
      key: 'c_FUN_NAME',
      dataIndex: 'c_FUN_NAME',
      code: 'c_FUN_NAME',
      resizable: true,
      width: 120,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '权限',
      key: 'c_DV_OPER_TYPE',
      dataIndex: 'c_DV_OPER_TYPE',
      code: 'c_DV_OPER_TYPE',
      resizable: true,
      width: 100,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '制作人',
      key: 'modifier',
      dataIndex: 'modifier',
      code: 'modifier',
      width: 100,
      render: (text,record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.modifierName}</div>
      ),
    },
    {
      title: '制作时间',
      key: 'modifyDate',
      code: 'modifyDate',
      width: 120,
      dataIndex: 'modifyDate',
    },
    {
      title: '审核人',
      key: 'operator',
      dataIndex: 'operator',
      code: 'operator',
      width: 100,
      render: (text,record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{record.operatorName}</div>
      ),
    },
    {
      title: '审核时间',
      key: 'auditDate',
      code: 'auditDate',
      width: 120,
      dataIndex: 'auditDate',
    },
  ];

  //子表：视图模式下的列
  const subTableViewColumns = [
    {
      title: '功能代码',
      key: 'c_FUN_CODE',
      dataIndex: 'c_FUN_CODE',
      code: 'c_FUN_CODE',
      sorter: true,
      resizable: true,
      width: 150,
      fixed: 'left',
      lock: true,
      ellipsis: true,
    },
    {
      title: '功能名称',
      key: 'c_FUN_NAME',
      dataIndex: 'c_FUN_NAME',
      code: 'c_FUN_NAME',
      sorter: true,
      resizable: true,
      width: 120,
      fixed: 'left',
      lock: true,
      ellipsis: true,
    },
  ];

  //子表
  const subTable = {
    //复写header
    header: {
      headerRender: () => {
        return (
          <header className="a-card-header">
            <Radio.Group
              defaultValue="1"
              value={viewMode}
              className="ml-2"
              onChange={changeViewMode}
              size="small"
            >
              <Radio.Button value="View"><span><AppstoreOutlined/></span></Radio.Button>
              <Radio.Button value="List"><span><ProfileOutlined/></span></Radio.Button>
            </Radio.Group>
            <ToolBar
              handles={subHandle}
              selectedRows={selectedRows}
              filterButton={true}
              {...subTabletoolbar}
            />
          </header>
        );
      }
    },
    //...subModel,
    columns: subTableColumns,
    toolbar: subTabletoolbar,
    queryParams: 'c_FUN_NAME', // 查询子表的字段值
    autoQuery: false, // 如果为true时必须指定对应规则 autoQuery
    search: {
      formItems: subTableSearchBar,
    },
    // 可配置项
    tableProps: {
      rowKey: 'code', // 必填
      rowClassName: (record, index) => {
        if (record.checkState == 0 || record.auditState === 0 ) {
          return 'text-warning';
        }
      },
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
        expandedRowKeys: subModel.expandedRowKeys,
      },
      selectMode: {
        mode: 'checkbox',
        isDisabled: (row)=>{
          if(viewMode === "View"){
            return operate != 'edit';
          }else{
            return false;
          }
        }
      },
    },
    footer: {
      footerRender: () => {
        const tabPaneList = selectedFootTabs.map(item => {
          return (
            <TabPane tab={item.typeName} key={item.typeCode}/>
          );
        });
        return (
          <Tabs hideAdd type="editable-card" activeKey={footActiveKey} onEdit={onFootTabEdit} tabPosition="bottom"  onChange={onFootTabChange}>
            {tabPaneList}
          </Tabs>
        )
      }
    }
  }

  return (
    <>
      <PagePane
          masterTable={masterTable}
          subTable={subTable}
          masterModel={masterModel}
          subModel={subModel}
          subHandle={subHandle}
          masterHandle={masterHandle}
           />
      <PostRightAdd
        onCancel={() => setFormVisible(false)}
        modalVisible={formVisible}
        formData={formData}
        operate={operate}
        footActiveKey={footActiveKey}
        handle={subHandle}
      />
    </>
  );
};

export default PostRightManage;
