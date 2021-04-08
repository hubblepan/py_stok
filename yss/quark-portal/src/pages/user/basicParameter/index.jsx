import React, { useState, useEffect } from 'react';
import { Button, Table, message, Dropdown, Menu, Modal } from 'antd';
import {
  PlusCircleOutlined,
  EditOutlined,
  CloseOutlined,
  FileDoneOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import MsgBox from '@/utils/MsgBox';
import QuarkTable from '@/components/QuarkTable';
import {
  queryBasicParams,
  deleteBasicParams,
  checkParams,
  uncheckParams,
} from '@/services/basicParameter.js';
import CommonModal from './components/CommonModal.jsx';
import ModifyModal from './components/ModifyModal.jsx';

import styles from './style.less';

const BasicParameter = () => {
  const [commonModalVisible, setCommonModalVisible] = useState(false);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedRowKey, setSelectedRowKey] = useState(0);

  const clearSelections = () => {
    setSelectedRows([]);
  };

  // 模态框的模式：新增，修改
  // const [modalMode, setModalMode] = useState(null);

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'paramName',
    },
    {
      title: '参数条件',
      dataIndex: 'paramCondition',
    },
    {
      title: '参数值',
      dataIndex: 'paramValue',
    },
    {
      title: '参数关联值',
      dataIndex: 'paramValueCode',
    },
    {
      title: '参数说明',
      dataIndex: 'paramDesc',
    },
    {
      title: '参数类型',
      dataIndex: 'paramType',
    },
    {
      title: '审核状态',
      dataIndex: 'checkState',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectRow) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectRow);
      setSelectedRows(selectRow);
      setSelectedRowKey(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  // 查询表格数据
  const [data, setData] = useState([]);
  useEffect(async () => {
    const res = await queryBasicParams();
    setData(res.data);
    clearSelections();
  }, []);

  console.log(data);

  useEffect(() => {
    setSelectedRows(selectedRows);
    setSelectedRowKey(selectedRowKey);
    setModifyModalVisible(modifyModalVisible);
  });

  // 子组件向父组件传参
  function getChildData(childData) {
    setData(childData);
  }

  // 删除数据
  const deleteHandle = async () => {
    if (selectedRows === 0 || selectedRows.length === 0) {
      MsgBox.warning({ message: '请选择一条数据！' });
      return true;
    }
    try {
      await deleteBasicParams({
        id: selectedRows.map((row) => row.id),
      }).then((res) => {
        console.log(res);
      });
      MsgBox.success({ message: '请选择一条数据！' });
      queryBasicParams().then((res) => {
        setData(res.data);
      });
      return true;
    } catch (error) {
      MsgBox.error({ message: '删除失败，请重试！' });
      return false;
    }
  };

  const [linkMode, setLinkMode] = useState('');

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setCommonModalVisible(true);
          setLinkMode('database');
        }}
      >
        数据库连接
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setCommonModalVisible(true);
          setLinkMode('server');
        }}
      >
        服务连接
      </Menu.Item>
    </Menu>
  );

  // 审核
  const checkHandle = async () => {
    if (selectedRows === 0 || selectedRows.length === 0) {
      MsgBox.warning({ message: '至少选择一条数据！' });
      return true;
    }
    Modal.confirm({
      title: '审核',
      content: '是否确定审核？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          checkParams({ id: selectedRowKey[0] })
            .then(function (response) {
              resolve();
              MsgBox.success({ message: response.msg });
              queryBasicParams().then((res) => {
                setData(res.data);
              });
            })
            .catch(function (error) {
              reject();
            });
        }).catch(() => {});
      },
    });
  };

  // 反审核
  const uncheckHandle = async () => {
    if (selectedRows === 0 || selectedRows.length === 0) {
      MsgBox.warning({ message: '至少选择一条数据!' });
      return true;
    }

    Modal.confirm({
      title: '反审核',
      content: '是否确定反审核？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          uncheckParams({ id: selectedRowKey[0] })
            .then(function (response) {
              resolve();
              console.log(response);
              MsgBox.success({ message: response.msg });
              queryBasicParams().then((res) => {
                console.log(res.data);
                setData(res.data);
              });
            })
            .catch(function (error) {
              reject();
            });
        }).catch(() => {});
      },
    });
  };

  // 按钮状态
  const isDisabled = {
    all: () => {
      return selectedRows ? selectedRows.some((row) => row.checkState === 0) : true;
    },
    unCheck: () => {
      return selectedRows ? selectedRows.some((row) => row.checkState === 1) : true;
    },
  };

  const buttonStatus = () => {};

  return (
    <>
      <section className="page-wrapper a-card">
        <header className="a-card-header" style={{ paddingRight: '16px' }}>
          <h6 className="h6">管控基础参数</h6>
          <nav className="a-card-toolbar">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="text" icon={<PlusCircleOutlined />}>
                新增
              </Button>
            </Dropdown>

            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                if (selectedRows === 0 || selectedRows.length === 0 || selectedRows.length > 1) {
                  MsgBox.warning({ message: '请选择一条数据！' });
                } else {
                  setModifyModalVisible(true);
                }
              }}
              disabled={isDisabled.all()}
            >
              修改
            </Button>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={deleteHandle}
              disabled={isDisabled.all()}
            >
              删除
            </Button>
            <Button
              type="text"
              icon={<FileDoneOutlined />}
              onClick={checkHandle}
              disabled={isDisabled.all()}
            >
              审核
            </Button>
            <Button
              type="text"
              icon={<ExceptionOutlined />}
              onClick={uncheckHandle}
              disabled={isDisabled.unCheck()}
            >
              反审核
            </Button>
          </nav>
        </header>
        <div className="a-card-body">
          <QuarkTable
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={false}
            className={styles.table}
            rowClassName={(record, index) =>
              record.checkState === 0 ? styles.csbsTypes : styles.rowColor
            }
          />
        </div>
      </section>
      <CommonModal
        linkMode={linkMode}
        setCommonModalVisible={setCommonModalVisible}
        commonModalVisible={commonModalVisible}
        getChildData={getChildData}
      />
      <ModifyModal
        linkMode={linkMode}
        setModifyModalVisible={setModifyModalVisible}
        modifyModalVisible={modifyModalVisible}
        getChildData={getChildData}
        selectedRows={selectedRows[0]}
        setSelectedRows={setSelectedRows}
        clearSelections={clearSelections}
      />
    </>
  );
};

export default BasicParameter;
