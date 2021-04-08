import React, {useEffect,} from 'react';
import {Table, Input, Select, Tabs, Button, TreeSelect, Checkbox, Radio} from 'antd';
import {useModel} from 'umi';
import AliTablePane from '@/blocks/AliTablePane';
import UserPostHandle from '@/pages/right/userPost/handles/UserPostHandle';
import {AppstoreOutlined, ProfileOutlined,} from '@ant-design/icons';
import ToolBar from "@/components/ToolBar";
import UserPostAdd from '../UserPostAdd'
const { TabPane } = Tabs ;


const UserPostManage = ()=>{
  const model = useModel('right.userPost.UserPostModel');
  const handles = new UserPostHandle(model);
  const toolBarbu = {
    funCode: 'UserRightsAssignment',
    buttons: {
      add: model.viewMode === 'View' ? undefined : {
        text: '新增',
        visible: 1,
        method: 'add1',
        operCode: 'ADD',
      },
      edit: {
        text: '修改',
        method: 'edit',
        operCode: 'UPD',
        visible: 1,
        disable: () => model.disableEdit && model.viewMode === 'View',
      },
      save: {
        text: '保存',
        operCode: 'SAVE',
        method: 'save',
        visible: 1,
        disable: () => {
          return model.disableSave;
        }
      },
      check: {
        text: '审核',
        visible: 1,
        operCode: 'CHK',
        method: 'check1',
        disable: () => {
          if (model.viewMode === 'View') {
            return model.selectedRows.filter(item => item.checkEnable).length === 0  || model.editMode;
          } else {
            return model.selectedRows.filter(item => item.auditState === 0).length === 0;
          }
        }
      },
      uncheck: {
        text: '反审核',
        operCode: 'UCHK',
        visible: 1,
        method: 'uncheck1',
        disable: () => {
          if (model.viewMode === 'View') {
            return model.selectedRows.filter(item => item.uncheckEnable).length === 0 || model.editMode;
          } else {
            return model.selectedRows.filter(item => item.auditState === 1).length === 0;
          }
        }
      },
      more: {
        visible: 1,
      },
    },
    filterButton:true,
  };


  useEffect(() =>{
    handles.initSearchData.call(handles);
  },[]);
  useEffect(() => {
    handles.autoQuery.call(handles);
  }, [model.userData, model.postData]);


  const {columns, setColumns, userData, postData, viewMode, setViewMode} = model;
  // 根据 viewMode 的属性，配置 columns, tableProps
  const getColumns = (viewMode) => {
    // 视图模式下的 columns 配置
    if (viewMode === 'View') {
      return [
        {
          title: '用户编码',
          width: 100,
          ellipsis: true,
          dataIndex: 'c_CORP_ORG_CODE',
        },
        {
          title: '用户名称',
          width: 100,
          ellipsis: true,
          dataIndex: 'c_CORP_ORG_NAME',
        },
      ];
    }
    // 列表模式下 的 columns配置
    // "id":"19788",
    //   "modifier":"",
    //   "startUseDate":"2021-02-26 14:22:54",
    //   "endUseDate":"2021-02-26 14:22:54",
    //   "auditState":0,
    //   "operator":"",
    //   "c_USER_CODE":"test",
    //   "c_POST_CODE":"1233",
    //   "n_IS_AUTHORIZATION":
    return [
        {
          title: '岗位名称',
          dataIndex: 'c_POST_NAME',
          key: 'c_POST_NAME',
          name: '岗位名称', // 兼容 ali-react-table
          code: 'c_POST_NAME', // 兼容 ali-Sreact-table
          width: 150,
          search: true,
          resizable: true,
          show: true,
          export: true,
        },
        {
          title: '用户名称',
          width: 100,
          ellipsis: true,
          dataIndex: 'c_USER_CODE',
        },
        // {
        //   title: '岗位代码',
        //   name: '岗位代码', // 兼容 ali-react-table
        //   dataIndex: 'c_POST_CODE',
        //   code: 'c_POST_CODE', // 兼容 ali-react-table
        //   key: 'c_POST_CODE',
        //   width: 100,
        //   fixed: 'left',
        //   search: true,
        //   resizable: true,
        //   hidden: false,
        //   lock: true,
        //   export: true,
        // },
        {
          title: '审核人',
          dataIndex: 'operator',
          key: 'operator',
          name: '审核人', // 兼容 ali-react-table
          code: 'operator', // 兼容 ali-Sreact-table
          width: 100,
          search: true,
          resizable: true,
          show: true,
          export: true,
        },
        {
          title: '审核时间',
          dataIndex: 'auditDate',
          key: 'auditDate',
          name: '审核时间', // 兼容 ali-react-table
          code: 'auditDate', // 兼容 ali-Sreact-table
          width: 100,
          search: true,
          resizable: true,
          show: true,
          export: true,
        },
        {
          title: '修改人',
          dataIndex: 'modifier',
          key: 'modifier',
          name: '修改人', // 兼容 ali-react-table
          code: 'modifier', // 兼容 ali-Sreact-table
          width: 100,
          search: true,
          resizable: true,
          show: true,
          export: true,
        },
        {
          title: '修改时间',
          dataIndex: 'modifyDate',
          key: 'modifyDate',
          name: '数据名称', // 兼容 ali-react-table
          code: 'modifyDate', // 兼容 ali-Sreact-table
          width: 100,
          search: true,
          resizable: true,
          show: true,
          export: true,
        },
      ];

  };
  // 切换viewMode
  const switchViewMode = (value) => {
    // 在这里重置viewMode发生时 状态数据的重置和变更。
    model.changeState({columns: getColumns(value), viewMode: value, selectedRows: [], selectedRowKeys: [], pageInfo: value !=='View' ? {
        pageNo: 1,
        pageTotal: 0,
        pageSize: 20,
      } : {}, dataSource: [], expandedRowKeys: [], loading: false});

  };

  // viewMode 发生变化时， 重新查询table 数据
  useEffect(() => {
    handles.autoQuery.call(handles);
  }, [viewMode]);

  // viewMode 发生变化时， 非状态数据的变更写在这里
  const UserPostprops = {
    ...model,
    handles,
    autoQuery: false,
    pageWrapper: true,
    search: {
      formItems: [
        <TreeSelect
          label="用户名称"
          name="userCodes"
          showSearch
          treeCheckable
          treeData = {userData}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
        />,
        <TreeSelect
        label="岗位名称"
        name="postCodes"
        showSearch
        treeCheckable
        treeData = {postData}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        />
      ],
    },
    columns,
    header: {
      headerRender: () => {
        return (
          <header className="a-card-header">
            <Radio.Group
              defaultValue="View"
              value={viewMode}
              className="ml-2"
              onChange={(e) => {
                switchViewMode(e.target.value);
              }}
              size="small"
            >
              <Radio.Button value="View"><span><AppstoreOutlined/></span></Radio.Button>
              <Radio.Button value="List"><span><ProfileOutlined/></span></Radio.Button>
            </Radio.Group>
            <ToolBar
              handles={handles}
              selectedRows={model.selectedRows}
              filterButton
              // funCode={funCode}
              {...toolBarbu}
            />
          </header>
        );
      }
    },
    tableProps: {
      rowKey: model.viewMode === 'View' ? 'c_USER_CODE' : 'id', // 必填
      useVirtual: true,
      selectMode: { mode: 'checkbox' },
    },
    page: {},
  };


  return (
    <>
      <AliTablePane {...UserPostprops} />
      <UserPostAdd
        showAddUserPost={model.showAddUserPost}
        setShowAddUserPost={model.setShowAddUserPost}
        handles={handles}
      />
    </>
  );
};

export default UserPostManage;
