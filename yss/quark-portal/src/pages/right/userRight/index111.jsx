import React, {useCallback, useEffect, useMemo, useState} from 'react';

import { Tabs, Input, Select} from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';

import PagePane from '@/blocks/PagePane';

import EditDetailModal from './components/EditDetailModal';
import ChangeModal from './components/ChangeModal';
import DetectionModal from './components/DetectionModal';
import PermitModal from './components/PermitModal';
import PermissionModal from './components/PermissionModal';
import DeployModal from './components/deploy/index.jsx';
import MasterAddModal from './components/MasterAddModal';

import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';

import { useModel } from 'umi';
import styles from './style.less'

const {TabPane} = Tabs;

const IndexPage = () => {
  const userRightManageSub = useModel('right.userRight.userRightManageSub');


  const panelProps = useMemo(() => {
    return {
      title: '用户权限',
    };
  });
  /** ************************** 用户管理主表属性开始 *************************** */
  const userRightMaster = useModel('right.userRight.userRightMaster');
  const masterTable = {
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
        sorter: true,
        resizable: true,
      },
      {
        title: '分类代码',
        key: 'c_CORP_ORG_CODE',
        dataIndex: 'c_CORP_ORG_CODE',
        sorter: true,
        resizable: true,
      },
    ],
    toolbar: {
      buttons: {
        dashed: {
          visible: 1,
          children: {
            fold: {
              text: '展示分级',
              method: 'add',
              visible: true,
              children: {
                one: {
                  text: '一级',
                  method: 'xx',
                  visible: true,
                },
                two: {
                  text: '二级',
                  method: 'xxx1',
                  visible: true,
                },
                three: {
                  text: '三级',
                  method: 'xxx1',
                  visible: true,
                },
              },
            },
            refresh: {
              text: '刷新数据',
              method: 'query',
              visible: true,
            },
            new: {
              text: '新增组织架构',
              method: 'add',
              visible: true,
            },
          },
        },
      },
    },
    tableProps: {
      rowKey: 'id', // 必填
      expandable: {
        defaultExpandAllRows: true, // 默认展开所有行
      },
    },
    pageInfo: {},
  };
  const masterHandle = new MasterHandle(userRightMaster);
  /** ************************** 用户管理主表属性结束 *************************** */

  /** ************************** 用户管理子表属性开始 *************************** */
  const userRightSub = useModel('right.userRight.userRightSub');
  const { detailVisible, modalOperate, detailData, changeVisible, permission, permitVisible, testVisible, deployVisible, currentDetail, masterSelectedRows, primaryKey, subColumns,} = userRightSub;
  // 子表属性
  const subTable = {
    // handles: subHandle, 单独拼装
    namespace: 'userRightSub',
    autoQuery: false,
    pageWrapper: true,
    search: {
      formItems: [
        <Input type="text" label="指标名称" name="indexName" />,
        <Select label="监控状态" name="monitorStatus">
          <Select.Option value="rmb">RMB</Select.Option>
          <Select.Option value="dollar">Dollar</Select.Option>
        </Select>,
      ],
    },
    columns: subColumns,
    toolbar: {
      buttons: {
        arrange: {
          text: '部署',
          visible: 1,
          method: 'deploy',
          order: 10,
        },
        test: {
          text: '检测',
          method: 'test',
          order: 20,
          visible: 1,
        },
        unload: {
          id: 'unload',
          text: '卸载',
          method: 'unload',
          visible: 1,
          order: 30,
        },
        edit: {
          text: '修改',
          method: 'edit',
          visible: 1,
          order: 100,
        },
        permitConfig: {
          text: '权限配置',
          method: 'permitConfig',
          visible: 1,
        },
        check: {
          id: 'check',
          text: '审核',
          visible: 1,
        },
        uncheck: {
          id: 'uncheck',
          visible: 1,
        },
        deletes: {
          text: '删除',
          method: 'deletes',
          visible: 1,
        },
        more: {
          visible: 1,
        },
      },
    },
    tableProps: {
      rowKey: 'indexCode', // 必填
      expandable: {
        defaultExpandAllRows: false,
        expandedRowRender: (record) => {
          return <p style={{ margin: 0 }}>{record.description}</p>;
        },
        expandIconColumnIndex: 1,
      },
    },
    // 此处自定义分页 djtao
    page: {},
  };
  // handles
  const subHandle = new SubHandle({ ...userRightSub, masterSelectedRows: userRightMaster.selectedRows});
  /** ************************** 用户管理子表属性结束 *************************** */

    // 高度自适应
  const [mainHeight, setMainHeight] = useState(0);

  const onResize = useCallback(() => {
    const { innerHeight } = window;

    const height = innerHeight - 78;
    setMainHeight(height - 83);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" className={styles.tab}>
        <TabPane tab="Tab 1" key="1">
          <section
            className="page-wrapper a-card"
            style={{ marginTop: '-30px', height: mainHeight }}
          >
            <PagePane
              {...panelProps}
              masterTable={masterTable}
              subTable={subTable}
              masterModel={userRightMaster}
              subModel={userRightSub}
              subHandle={subHandle}
              masterHandle={masterHandle}
            />
          </section>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>


      {/** **************  主表modal ****************** */}
      {userRightMaster.addVisible ? (
        <MasterAddModal
          classifyNode={userRightMaster.classifyNode}
          title={userRightMaster.modalTitle}
          setAddVisible={(boolean) => {
            masterHandle.changeState({
              addVisible: boolean,
            });
          }}
          addVisible={userRightMaster.addVisible}
        />
      ) : null}

      {/** **************  子表modal ****************** */}

      {/* 增删改 */}
      {detailVisible ? (
        <EditDetailModal
          mode={modalOperate}
          detailVisible={detailVisible}
          setDetailVisitble={(boolean) => {
            subHandle.changeState({
              detailVisible: boolean,
            });
          }}
          detailData={detailData}
          handles={{
            uninstall: (selectRow, callback) => {
              console.log('handleOperateRow', selectRow, callback);
              // handleOperateRow(
              //   {
              //     rows: selectRow,
              //     key: 'indexCode',
              //     url: '/ocp/monitor/index/unload',
              //     msg: '是否确定卸载该选中的指标？',
              //   },
              //   callback,
              // );
            },
            check: (selectRow, callback) => {
              console.log('handleOperateRow', selectRow, callback);
              // handleOperateRow(
              //   {
              //     rows: selectRow,
              //     key: 'indexCode',
              //     url: '/ocp/monitor/index/check',
              //     msg: '是否确定审核该指标？',
              //   },
              //   callback,
              // );
            },
            uncheck: (selectRow, callback) => {
              console.log('handleOperateRow', selectRow, callback);
              // handleOperateRow(
              //   {
              //     rows: selectRow,
              //     key: 'indexCode',
              //     url: '/ocp/monitor/index/uncheck',
              //     msg: '是否确定反审核该指标？',
              //   },
              //   callback,
              // );
            },
          }}
          currentSelect={currentDetail}
        />
      ) : null}

      {/* 检测 */}
      {testVisible ? (
        <DetectionModal
          testVisible={testVisible}
          setTestVisible={(boolean) => {
            subHandle.changeState({
              testVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 权限配置 */}
      {permission ? (
        <PermissionModal
          permission={permission}
          setPermission={(boolean) => {
            subHandle.changeState({
              permission: boolean,
            });
          }}
        />
      ) : null}

      {/* 权限配置-test */}
      {permitVisible ? (
        <PermitModal
          permitVisible={permitVisible}
          setPermitVisible={(boolean) => {
            subHandle.changeState({
              permitVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 部署 */}
      {deployVisible ? (
        <DeployModal
          testVisible={deployVisible}
          setTestVisible={(boolean) => {
            subHandle.changeState({
              deployVisible: boolean,
            });
          }}
        />
      ) : null}

      {/* 变更记录 */}
      {changeVisible ? (
        <ChangeModal
          primaryKey={primaryKey}
          changeVisible={changeVisible}
          setChangeVisible={(boolean) => {
            console.log('call handlers', boolean);
            // handles.changeState({
            //   changeVisible: boolean,
            // });
          }}
        />
      ) : null}
    </>
  );
};

// const indexPage = (namespaceMaster, namespaceSub) =>
//   connect(
//     ({ userRightMaster, userRightSub }) => {
//       return { userRightMaster, userRightSub };
//     },
//     mapDispatchToProps(namespaceMaster, namespaceSub),
//     (stateProps, dispatchProps, ownProps) => {
//       return BeanUtil.merge(stateProps, dispatchProps, ownProps);
//     },
//   )(IndexPage);
export default IndexPage;

