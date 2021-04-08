import { Upload, message, Button, Divider, Modal, Table, Tooltip, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';

const DModal = (props) => {
  const { title, visible, setVisiable } = props;

  const handleOk = () => {
    handleCancel();
  };

  const handleCancel = (props) => {
    setVisiable(false);
  };

  return (
    <Modal
      width={600}
      height={500}
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Table
        rowKey="id"
        tableLayout="fixed"
        size="small"
        bordered
        pagination={false}
        dataSource={[
          {
            id: 1,
            paramsName: '参数名1',
            monitorCondition: '监控条件1',
            paramsValue: '参数值1',
            desc: '描述1述1述1述1述1述1述1述1述1述1',
          },
          {
            id: 2,
            paramsName: '参数名2',
            monitorCondition: '监控条件2',
            paramsValue: '参数值2',
            desc: '描述1述1述1述1述1述1述1述1述1述2',
          },
          {
            id: 3,
            paramsName: '参数名3',
            monitorCondition: '监控条件3',
            paramsValue: '参数值3',
            desc: '描述1述1述1述1述1述1述1述1述1述3',
          },
        ]}
        expandable={{ defaultExpandAllRows: true }}
        columns={[
          {
            title: '参数名称',
            dataIndex: 'paramsName',
            key: 'paramsName',
            ellipsis: true,
          },
          {
            title: '监控条件',
            dataIndex: 'monitorCondition',
            key: 'monitorCondition',
            ellipsis: true,
          },
          {
            title: '参数值',
            dataIndex: 'paramsValue',
            key: 'paramsValue',
            ellipsis: true,
            render: (content, record, index) => {
              return (
                <DropdownSelect
                  value={content}
                  data={[
                    { id: 1, name: '是' },
                    { id: 2, name: '否' },
                  ]}
                  columns={[{ dataIndex: 'name', key: 'name' }]}
                  onChange={(value) => {
                    // console.log(table.current.props.dataSource, index);
                    // table.current.props.dataSource[index].triggerPosition = value.join(',');
                    // setTableData(_.cloneDeep(table.current.props.dataSource));
                    // record.triggerPosition = value.join(',');
                  }}
                />
              );
            },
          },
          {
            title: '参数描述',
            dataIndex: 'desc',
            key: 'desc',
            ellipsis: true,
          },
        ]}
      />
    </Modal>
  );
};

// 上传指标
const UploadTarget = (props) => {
  const { store, setStore } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (text, record, index) => (
        <div
          className="text-center"
          style={{
            float: 'right',
          }}
        >
          {!record.isLeaf ? index + 1 : ''}
        </div>
      ),
    },
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '关联类型',
      dataIndex: 'relatedType',
      key: 'relatedType',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '参数设置',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (content, record, index) => (
        <a
          style={{ color: '#389fff' }}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setModalVisible(true);
            setModalTitle(record.isLeaf ? '分类参数设置' : '指标参数配置');
          }}
        >
          {record.isLeaf ? '分类参数设置' : '指标参数配置'}
        </a>
      ),
    },
  ];

  return (
    <>
      <QuarkTable
        rowSelection={false}
        loading={store.ParamSetting.tableData.length === 0}
        columns={columns}
        // rowSelection={{ hideSelectAll: true }}
        dataSource={store.ParamSetting.tableData}
        expandable={{
          defaultExpandAllRows: true, // 默认展开所有行
          // expandedRowKeys,
          expandIcon: ({ expanded, onExpand, record }) => {
            if (record.isLeaf) {
              return null;
            }
            return expanded ? (
              <CaretDownOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <CaretRightOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            );
          },
          expandIconColumnIndex: 0,
        }}
      />

      <DModal title={modalTitle} visible={modalVisible} setVisiable={setModalVisible} />
    </>
  );
};

export default UploadTarget;
