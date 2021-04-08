import React, {useEffect, useMemo} from 'react';

import {Checkbox, Input, Tabs, TreeSelect, Radio, Pagination} from 'antd';

import {
  SearchOutlined, AppstoreOutlined, ProfileOutlined, CaretDownOutlined, CaretRightOutlined
} from '@ant-design/icons';

import PagePane from '@/pages/right/components/PagePane';
import ToolBar from '@/components/ToolBar';

import FormAddOrg from "@/pages/right/userRight/components/FormAddOrg";

import RightManageMasterHandle from '../../handles/RightManageMasterHandle';
import RightManageSubHandle from '../../handles/RightManageSubHandle';

import { useModel } from 'umi';
import QuarkTable from "@/components/QuarkTable";
import MsgBox from '@/utils/MsgBox';
import { useTablePipeline, features} from 'ali-react-table';
import QuarkTree from '@/pages/right/components/QuarkTree';
import ModalAddRight from '@/pages/right/userRight/components/ModalAddRight';
import ModalCopyRight from "@/pages/right/userRight/components/ModalCopyRight";

const { TabPane } = Tabs;

let globalSubModal = null;
let globalMasterModal = null;
let globalSubHandles = null;

function TreeTable({dataSource, columns, isLoading, checkedStrategy}) {
  const rootKey = '[rootKey]';
  const pipeline = useTablePipeline({ components: {Checkbox} });
    pipeline.input({ dataSource, columns})
    .primaryKey('c_DATA_CODE')
    .use(features.treeMode({defaultOpenKeys: globalSubModal.expandedRowKeys,}))
    .use(
      features.treeSelect({
        tree: dataSource,
        rootKey: rootKey,
        checkboxPlacement: 'start',
        checkedStrategy,
        clickArea: 'cell',
        // defaultValue: ['1', '3'],
        checkboxColumn: { lock: true },
        highlightRowWhenSelected: true,
        value: globalSubModal?.selectedRowKeys || [],
        onChange: (keys) => {
          keys = keys.filter(key => key !== rootKey);
          globalSubModal?.changeSelectedRows(keys, keys.map(item => globalSubModal.dataSourceMap[item]));
        },
      }),
    )
  return <QuarkTree {...pipeline.getProps()} isLoading={isLoading} useVirtual={true} style={{width: '100%', height: '88%', overflow: 'auto'}}
  />
}

const IndexPage = () => {
  const panelProps = useMemo(() => {
    return {
      title: '用户权限',
    };
  });

  /** ************************** 用户权限分配主表属性开始 *************************** */
  const userRightManageMaster = useModel('right.userRight.userRightManageMaster');
  const userRightManageSub = useModel('right.userRight.userRightManageSub');
  globalSubModal = userRightManageSub;
  globalMasterModal = userRightManageMaster;

  const {currentUser, setCurrentUser, currentDataType} = userRightManageSub;
  const {menus, setMenus, selectedUsers, setSelectedUsers} = userRightManageMaster;
  const rightManageMasterTable = {
    autoQuery: true,
    pageWrapper: false,
    search: {
      searchName: 'c_CORP_ORG_NAME',
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
    },
    columns: [
      {
        title: '组织架构',
        key: 'c_CORP_ORG_NAME',
        dataIndex: 'c_CORP_ORG_NAME',
        width: '70%',
        sorter: true,
        resizable: true,
        ellipsis: true,
        render: (text, record) => {
          const onChange = () => {

            const indexPosition = selectedUsers.indexOf(record);
            if (indexPosition === -1) {
              selectedUsers.push(record);
              if (selectedUsers.length === 1) {
                setCurrentUser(record);
              }
              setSelectedUsers([...selectedUsers]);
            } else {
              selectedUsers.splice(indexPosition, 1);
              setSelectedUsers([...selectedUsers]);
              setCurrentUser(selectedUsers?.[0]);
            }
          };
          return (
            <>{record.c_DATA_TYPE === 'USER' ? <Checkbox checked={selectedUsers.indexOf(record) !== -1} onChange={onChange}/> : null}<span style={{paddingLeft: 5}}>{text}</span></>
          )
        }
      },
      {
        title: '分类代码',
        key: 'c_CORP_ORG_CODE',
        dataIndex: 'c_CORP_ORG_CODE',
        ellipsis: true,
        sorter: true,
        resizable: true,
      },
    ],
    toolbar: {
      buttons: {
        dashed: {
          visible: 1,
          children: {
            // fold: {
            //   text: '展示分级',
            //   method: 'add',
            //   visible: true,
            //   children: {
            //     one: {
            //       text: '一级',
            //       method: 'expandOne',
            //       visible: true,
            //     },
            //     two: {
            //       text: '二级',
            //       method: 'expandTwo',
            //       visible: true,
            //     },
            //     three: {
            //       text: '三级',
            //       method: 'expandThree',
            //       visible: true,
            //     },
            //   },
            // },
            menu: {
              text: '分级菜单',
              visible: 1,
              children: menus,
            },
            refresh: {
              visible: 1,
            },
            // new: {
            //   text: '新增组织架构',
            //   method: 'add',
            //   visible: true,
            // },
          },
        },
      },
    },
    tableProps: {
      rowKey: 'c_CORP_ORG_CODE', // 必填
      expandable: {
        defaultExpandAllRows: true,
        // expandedRowKeys: userRightManageMaster.expandedRowKeys,
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
      rowSelection: false,
      //   {
      //   selectedRowKeys:userRightManageMaster.selectedRowKeys,
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     userRightManageMaster.changeSelectedRows(selectedRowKeys, selectedRows);
      //     setUserList(selectedRows.filter(item => item.c_DATA_TYPE === 'USER'));
      //   },
      // },
    },
    pageInfo: {},
  };
  const rightManageMasterHandle = new RightManageMasterHandle({...userRightManageMaster});
  useEffect(()=>{
    setMenus(rightManageMasterHandle.getMasterMenus(userRightManageMaster.dataSource))
  },[userRightManageMaster.dataSource]);
  /** ************************** 用户权限分配主表属性结束 *************************** */

  /** ************************** 用户权限分配子表属性开始 *************************** */
  const { detailVisible, modalOperate, detailData, changeVisible, permission, permitVisible, testVisible, deployVisible, currentDetail, primaryKey, subColumns, authOrgTree, dataTree, postList} = userRightManageSub;
  const postOptions = postList.map(item => {
    // return (
    //   <Select.Option value={item.c_POST_CODE} key={item.c_POST_CODE}>{item.c_POST_NAME}</Select.Option>
    // );
    return {...item, title: item.c_POST_NAME, value: item.c_POST_CODE}
  });
  const FooterPane = () => {
    const tabPaneList = selectedUsers.map((item, index) => {
      return (
        <TabPane tab={item.c_CORP_ORG_NAME} key={item.c_CORP_ORG_CODE} closable/>
      );
    });
    function onUserChange(key) {
      // // 根据key 获取当前的 user
      setCurrentUser(selectedUsers.filter(userItem => key === userItem.c_CORP_ORG_CODE)[0]);
    }
    function onDelete(targetKey) {
      if (currentUser?.c_CORP_ORG_CODE === targetKey) {
        setCurrentUser(null);
        for (let i = 0; i < selectedUsers.length; i++) {
          if (selectedUsers[i] !== currentUser) {
            setCurrentUser(selectedUsers[i]);
            break;
          }
        }
      }
      setSelectedUsers(selectedUsers.filter(item => item.c_CORP_ORG_CODE !== targetKey));

    }
    return (
      <div style={{display: "inline-block"}}>
        <Tabs type="editable-card" hideAdd tabPosition="bottom" activeKey={currentUser?.c_CORP_ORG_CODE}  onChange={onUserChange} onEdit={onDelete}>
          {tabPaneList}
        </Tabs>
      </div>

    )
  };
  // 子表属性
  const subToolBar = {
    funCode: 'UserPostData',
    buttons: {
      add: globalSubModal.viewMode === 'View' ? undefined : {
        text: '新增',
        visible: 1,
        method: 'add1',
        operCode: 'ADD',
        order: 10,
      },
      edit: {
        text: '修改',
        method: 'edit1',
        operCode: 'UPD',
        visible: 1,
        order: 10,
        disable: () => {
          return userRightManageSub.disableEdit && globalSubModal.viewMode === 'View';
        }
      },
      save: {
        text: '保存',
        method: 'save1',
        visible: 1,
        operCode: 'SAVE',
        order: 20,
        disable: () => {
          return userRightManageSub.disableSave;
        }
      },
      check1: {
        text: '审核',
        visible: 1,
        operCode: 'CHK',
        method: 'check1',
        order: 30,
        disable: () => {
          if (globalSubModal.viewMode === 'List') {
            return globalSubModal.selectedRows.filter(item => item.auditState === 0).length === 0;
          } else {
            return globalSubModal.selectedRows.filter(item => item.checkEnable).length === 0 || userRightManageSub.editMode;
          }
        }
      },
      uncheck1: {
        text: '反审核',
        operCode: 'UCHK',
        visible: 1,
        method: 'uncheck1',
        order: 40,
        disable: () => {
          if (globalSubModal.viewMode === 'List') {
            return globalSubModal.selectedRows.filter(item => item.auditState === 1).length === 0;
          } else {
            return globalSubModal.selectedRows.filter(item => item.uncheckEnable).length === 0  || userRightManageSub.editMode;
          }
        }
      },
      copy: {
        text: '复制',
        operCode: 'CPY',
        visible: 1,
        method: 'copy',
        order: 50,
        disable: () => {
          return false;
        }
      },
      more: {
        visible: 0,
        order: 60,
      },
    },
  };
  const rightManageSubHandle = new RightManageSubHandle({ ...userRightManageSub, masterSelectedRows: userRightManageMaster.selectedRows});
  globalSubHandles = rightManageSubHandle;
  const {viewMode, pageInfo} = userRightManageSub;
  const rightManageSubTable = {
    // handles: subHandle, 单独拼装
    autoQuery: false,
    pageWrapper: true,
    resizable: false,
    search: {
      formItems: [
        <TreeSelect
          label="权限机构"
          onSelect={(value)=> {globalSubHandles.queryPostData.call(globalSubHandles, value, true)}}
          name="dataType"
          showSearch
          treeNodeFilterProp="title"
          treeData={authOrgTree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll/>,

        <TreeSelect
          maxTagCount={1}
          label="岗位"
          name="ARRAY_C_POST_CODE"
          showSearch
          treeCheckable
          treeNodeFilterProp="title"
          treeData={postOptions}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll/>,

        <TreeSelect
          label="数据"
          name="ARRAY_C_DATA_CODE"
          showSearch
          treeCheckable
          maxTagCount={1}
          treeNodeFilterProp="title"
          treeData={dataTree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll/>,

      ],
    },
    footer: {
      footerRender: () => {
        return (
          <>
            <FooterPane />
            {viewMode === 'List' && pageInfo ? <footer className="a-card-footer flex-right">
                <Pagination
                  style={{ height: 22, lineHeight: '20px' }}
                  size="small"
                  showSizeChanger
                  showQuickJumper
                  pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
                  defaultPageSize={20}
                  pageSize={pageInfo.pageSize}
                  defaultCurrent={pageInfo.pageNo}
                  total={pageInfo.pageTotal}
                  showTotal={(total) => `共 ${total} 项`}
                  current={pageInfo.pageNo}
                  onChange={globalSubHandles.changePage.bind(globalSubHandles)}
                />
              </footer> : null}
          </>
        )
      }
    },
    header: {
      headerRender: () => {
        return (
          <header className="a-card-header">
            <Radio.Group
              defaultValue="View"
              value={viewMode}
              className="ml-2"
              onChange={() => {
                if (viewMode === 'View') {
                  globalSubHandles.switchToListMode();
                } else {
                  globalSubHandles.switchToViewMode();
                }
              }}
              size="small"
            >
              <Radio.Button value="View"><span><AppstoreOutlined/></span></Radio.Button>
              <Radio.Button value="List"><span><ProfileOutlined/></span></Radio.Button>
            </Radio.Group>
            <ToolBar
              handles={rightManageSubHandle}
              selectedRows={userRightManageSub.selectedRows}
              filterButton
              // funCode={funCode}
              {...subToolBar}
            />
          </header>
        );
      }
    },
    columns: subColumns,
    changeSelectedRows: () => {
      console.log('xxxxxx-子表check');
    },
    // toolbar:
    tableRender: (tableProps) => {
      const tabPaneList = globalSubModal.dataTypeList.map(item => {
        return (
          <TabPane tab={item.c_DATA_TYPE_NAME} key={item.c_DATA_TYPE}/>
        );
      });
      function onDataTypeChange(key) {
        // // 根据key 获取当前的 数据类型
        const [currentDataType] = globalSubModal.dataTypeList.filter(dataItem => key === dataItem.c_DATA_TYPE);
        // let checkedStrategy = 'child';
        // if (currentDataType.c_DATA_TYPE === '1') {
        //   checkedStrategy = 'all';
        // } else {
        //   checkedStrategy = 'child';
        // }
        globalSubModal.changeState({
          currentDataType,
          dataSource: [],
          loading: false,
          selectedRowKeys: [],
          selectedRows: [],
          dataSourceMap: {}});
        // globalSubHandles.query.call(globalSubHandles);
        MsgBox.warning({message: '数据类型已改变'});
      }
      return (
        <div style={{width: '100%'}}>
          <div>
            <Tabs type="card" onChange={onDataTypeChange}>
              {tabPaneList}
            </Tabs>
          </div>
          {
            globalSubModal.viewMode === 'View'
            ? <TreeTable {...tableProps} checkedStrategy={globalSubModal.checkedStrategy} isLoading={globalSubModal.loading} style={{marginTop: '-12px', height: '90%'}} />
            : <QuarkTable {...tableProps} rowClassName={
                (record) => {
                  if (record.auditState === 0 ) {
                    return 'text-warning';
                  }
                  return '';
                }
              } />
          }

        </div>
      )
    },
    tableProps: {
      rowKey: 'c_DATA_CODE', // 必填
      expandable: {
        defaultExpandAllRows: true,
        expandIconColumnIndex: 1,
      },
      resizable: true,
    },
    // 此处自定义分页 djtao
    page: {},
  };
  // handles


  /** ************************** 用户权限分配子表属性结束 *************************** */

  useEffect(() => {
    rightManageSubHandle.initSubHandle.call(rightManageSubHandle);
  }, []);

  useEffect(() => {
    // rightManageSubHandle.query.call(rightManageSubHandle);
    userRightManageSub.changeResult({dataSource: []})
  }, [currentUser]);

  useEffect(() => {
    rightManageSubHandle.queryDataByType.call(rightManageSubHandle, true);
    rightManageSubHandle.autoQuery.call(rightManageSubHandle);
  }, [currentDataType]);

  useEffect(() => {
    rightManageSubHandle.autoQuery.call(rightManageSubHandle);
  }, [viewMode]);

  return (
    <>
          <PagePane
            {...panelProps}
            masterTable={rightManageMasterTable}
            subTable={rightManageSubTable}
            masterModel={userRightManageMaster}
            subModel={userRightManageSub}
            subHandle={rightManageSubHandle}
            masterHandle={rightManageMasterHandle}
          />
      {/** **************  主表modal ****************** */}
      <FormAddOrg
        showAddOrg={userRightManageMaster.showAddOrg}
        setShowAddOrg={userRightManageMaster.setShowAddOrg}
      />

      {/** **************  子表modal ****************** */}
      <ModalAddRight
        showAddRight={userRightManageSub.showAddRight}
        setShowAddRight={userRightManageSub.setShowAddRight}
        postList={userRightManageSub.postList}
        dataTree={userRightManageSub.dataTree}
        orgUserTree={userRightManageMaster.dataSource}
        dataType={userRightManageSub.currentDataType}
        subHandles={rightManageSubHandle}
      />

      {userRightManageSub.showCopyRight && <ModalCopyRight
        showCopyRight={userRightManageSub.showCopyRight}
        setShowCopyRight={userRightManageSub.setShowCopyRight}
        orgUserTree={userRightManageMaster.dataSource}
        orgUserMap={userRightManageMaster.dataSourceMap}
        originUser={userRightManageSub.currentUser}
        postList={userRightManageSub.postList}
        curDataType={userRightManageSub.currentDataType}
      />}

    </>
  );
};
export default IndexPage;

