import _ from 'lodash';
import { Upload, message, Button, Divider, Table, Tooltip, Spin } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import MsgBox from '@/utils/MsgBox';

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
  },
  {
    title: '安装类型',
    dataIndex: 'installType',
    key: 'installType',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '开发方式',
    dataIndex: 'developType',
    key: 'developType',
    ellipsis: true,
    width: 100,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '组件标识',
    dataIndex: 'componentIdentify',
    key: 'componentIdentify',
    width: 150,
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '指标代码',
    dataIndex: 'indexCode',
    key: 'indexCode',
    width: 150,
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
  {
    title: '指标名称',
    dataIndex: 'indexName',
    key: 'indexName',
    ellipsis: true,
    render: (content) => (
      <Tooltip placement="topLeft" title={content}>
        {content}
      </Tooltip>
    ),
  },
];

// 上传指标
const UploadTarget = (props) => {
  const { store, setStore } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const _store = _.cloneDeep(store);
      _store.UploadTarget.selectRows = selectedRows;
      setStore(_store);
    },
  };

  const [fileList, setFileList] = useState([]);
  // loading
  const [uploading, setUploading] = useState(false);
  // 上传属性
  const uploadPorps = {
    name: 'file',
    action: '/ocp/indexinfo/deploy/load',
    headers: {
      authorization: 'authorization-text',
    },
    defaultFileList: [],
    itemRender: () => null,
    onChange(info) {
      // 上传中
      setUploading(true);

      if (info.file.status !== 'uploading') {
        setUploading(false);
      }

      if (info.file.status == 'done') {
        setStore({
          ...store,
          UploadTarget: {
            ...store.UploadTarget,
            tableData: info.file.response.data.list,
          },
        });
        MsgBox.success({
          content: `${info.file.name} 上传成功`,
        });
        setFileList([...fileList, ...info.file.response.data.list]);
      } else if (info.file.status === 'error') {
        // MsgBox.message.error(`${info.file.name} 上传失败`);
        MsgBox.error({
          content: `${info.file.name} 上传失败`,
        });
      }
    },
  };

  return (
    <>
      <div style={{ paddingLeft: '20px', lineHeight: '50px', display: 'flex' }}>
        点击
        <Upload style={{ display: 'inline' }} {...uploadPorps}>
          <Button icon={<ArrowUpOutlined />} size="small" type="link">
            载入安装包
          </Button>
        </Upload>
        &nbsp;&nbsp;上传安装包至列表，勾选需安装的指标，点击下一步开始部署。
      </div>
      <div>
        {fileList.length === 0 || uploading ? (
          <Divider style={{ margin: 0 }} />
        ) : (
          <QuarkTable
            tableLayout="fixed"
            rowKey="id"
            size="small"
            bordered
            columns={columns}
            rowSelection={{
              ...rowSelection,
            }}
            dataSource={fileList}
            pagination={false}
          />
        )}
        {uploading ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UploadTarget;
