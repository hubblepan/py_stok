import React, {useEffect, useMemo} from "react";
import MasterHandle from '../../handles/MasterHandle';
import SubHandle from '../../handles/SubHandle';
import {useModel} from "@/.umi/plugin-model/useModel";
import {Input} from "antd";
import {CaretDownOutlined, CaretRightOutlined, SearchOutlined} from "@ant-design/icons";
import PagePane from '@/blocks/PagePane';
import ModalAddUser from '@/pages/right/userRight/components/ModalAddUser';

const IndexPage = (props) => {
  const userRightMaster = useModel('right.userRight.userRightMaster');
  const userRightSub = useModel('right.userRight.userRightSub');
  const {menus,setMenus,dataSource, selectedRowKeys,changeSelectedRows}=userRightMaster;
  const {setTabKey} = props;
  // handles
  const masterHandle = new MasterHandle(userRightMaster);
  useEffect(()=>{
    setMenus(masterHandle.getMasterMenus(dataSource))
  },[dataSource])
  // 构造主表属性
  const masterTable = {
    namespace: 'userRightMaster',
    autoQuery: true,
    pageWrapper: false,
    tableType: 'antd',
    search: {
      searchName: 'c_CORP_ORG_NAME',
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
    },
    columns: [
      {
        title: '组织架构',
        key: 'c_CORP_ORG_NAME',
        dataIndex: 'c_CORP_ORG_NAME',
        sorter: true,
        resizable: true,
        ellipsis: true,
        width: '60%',
      },
      {
        title: '分类代码',
        key: 'c_CORP_ORG_CODE',
        dataIndex: 'c_CORP_ORG_CODE',
        sorter: true,
        resizable: true,
        ellipsis: true,
      },
    ],
    toolbar: {
      buttons: {
        dashed: {
          visible: 1,
          children: {
            refresh: {
              text: '刷新数据',
              visible: 1,
              method: 'refresh',
            },
            menu: {
              text: '分级菜单',
              visible: 1,
              children: menus,
            },
            add: {
              text: '新增组织架构',
              icon:'',
              method: 'add',
              visible: true,
            },
          },
        },
      },
      contextmenus:{
        deletes: {
          text: '删除',
          method: 'deletes',
          visible: true,
        },
        edit: {
          text: '修改',
          method: 'edit',
          visible: true,
        },
      }
    },
    tableProps: {
      rowKey: 'id', // 必填
      rowSelection: {
        checkStrictly: true,
        hideSelectAll: true,
        type: 'radio',
        selectedRowKeys,
        onChange: changeSelectedRows,
      },
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
        expandIcon: ({ expanded, onExpand, record }) => {
          if (!record.children) {
            return <span className="mr-2 invisible" />;
          }
          return expanded ? (
            <CaretDownOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
          ) : (
            <CaretRightOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
          );
        },
      },
    },
    pageInfo: {},
  };


  const subTable = {
    // handles: subHandle, 单独拼装
    autoQuery: false,
    pageWrapper: true,
    resizable: false,
    tableType: 'antd',
    search: {
      formItems: [
        <Input type="text" label="用户ID" name="C_USER_CODE" />,
        <Input type="text" label="用户名称" name="C_USER_NAME" />,
      ],
    },
    columns: userRightSub.subColumns,
    toolbar: {
      funCode:'usermanage',
      buttons: {
        add: {
          text: '新增',
          visible: 1,
          operCode: 'ADD',
          method: 'add',
          order: 10,
          disable: () => false,
        },
        unLock: {
          text: '解锁',
          method: 'unLock',
          operCode: 'UNLOCK',
          order: 20,
          visible: 1,
          disable: () => false,
        },
        start: {
          text: '启用',
          operCode: 'StartU',
          method: 'start',
          visible: 1,
          order: 30,
          disable: () => false,
        },
        stop: {
          text: '停用',
          operCode: 'StopU',
          method: 'stop',
          visible: 1,
          order: 40,
          disable: () => false,
        },
        edit: {
          text: '修改',
          method: 'edit',
          operCode: 'UPD',
          icon: 'edit',
          visible: 1,
          order: 50,
          disable: () => false,
        },
        // copy1: {
        //   text: '复制',
        //   method: 'copy1',
        //   visible: 1,
        //   order: 60,
        // },
        // uncheck: {
        //   text: '删除',
        //   method: 'deletes',
        //   visible: 1,
        //   order: 70,
        // },
        more: {
          visible: 1,
        },
      },
    },
    tableProps: {
      rowKey: 'c_USER_CODE', // 必填
      // expandable: {
      //   defaultExpandAllRows: false,
      //   expandedRowRender: (record) => {
      //     return <p style={{ margin: 0 }}>{record.description}</p>;
      //   },
      //   expandIconColumnIndex: 1,
      // },
    },
    // 此处自定义分页 djtao
    page: {},
  };
  const subHandle = new SubHandle({ ...userRightSub, masterSelectedRows: userRightMaster.selectedRows, setTabKey});
  const panelProps = useMemo(() => {
    return {
      title: '用户权限',
    };
  });
  const {showAddUser, setShowAddUser, modalAddUserMode, selectedRows} = userRightSub;
  return (
    <>
      <PagePane
        {...panelProps}
        masterTable={masterTable}
        subTable={subTable}
        masterModel={userRightMaster}
        subModel={userRightSub}
        subHandle={subHandle}
        masterHandle={masterHandle}
      />
      <ModalAddUser showAddUser={showAddUser}
                    setShowAddUser={setShowAddUser}
                    mode={modalAddUserMode}
                    originUser={selectedRows?.slice(-1)?.[0]}
      />
    </>


  );
};

export default IndexPage;
