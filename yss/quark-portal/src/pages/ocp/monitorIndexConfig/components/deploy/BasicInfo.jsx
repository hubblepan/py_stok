import _ from 'lodash';
import {
  Upload,
  message,
  Button,
  Divider,
  Table,
  Tooltip,
  Spin,
  Select,
  Menu,
  Dropdown,
  Input,
  Card,
  Modal,
} from 'antd';
import QuarkTable from '@/components/QuarkTable';
import { InfoCircleTwoTone, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import Tipbar from './Tipbar';

// 基础信息
const BasicInfo = (props) => {
  const { store, setStore } = props;

  const table = useRef(null);
  // 中间变量
  const [tableData, setTableData] = useState(_.cloneDeep(store.global.selectedTargets));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // 此处有大坑。selectedRows不会随着 tableData更新！
      // 只能通过key来拿
      const selectRows = [];
      let _tableData = tableData.length ? tableData : table.current.props.dataSource;
      _tableData.forEach((x) => {
        selectedRowKeys.forEach((y) => {
          if (x.indexCode === y) {
            selectRows.push(x);
          }
        });
      });
      // console.log('fxxk', selectedRowKeys, tableData);
      store.BasicInfo.selectRows = selectRows;
      store.global.selectedTargets = selectRows;
      setStore(_.cloneDeep(store));
    },
  };

  // 通过监听变化来设置store。
  useEffect(() => {
    // 实时更新selectrows
    const selectRows = [];
    tableData.forEach((x) => {
      store.BasicInfo.selectRows.forEach((y) => {
        if (x.indexCode == y.indexCode) {
          selectRows.push(x);
        }
      });
    });

    store.BasicInfo.tableData = tableData;
    store.BasicInfo.selectRows = selectRows;
    store.global.selectedTargets = selectRows;
    setStore(_.cloneDeep(store));
  }, [tableData]);

  let col = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (text, recode, index) => <div className="text-center">{index + 1}</div>,
    },
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      key: 'indexCode',
      ellipsis: true,
      render: (content) => (
        <div>
          <Tooltip placement="topLeft" title={content}>
            {content}
          </Tooltip>
        </div>
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
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      ellipsis: true,
      render: (content, record, index) => {
        return (
          <Input
            onChange={(e) => {
              const value = e.currentTarget.value;
              table.current.props.dataSource[index].indexAlias = value;
              setTableData(_.cloneDeep(table.current.props.dataSource));
            }}
          />
        );
      },
    },
    {
      title: '触发位置',
      dataIndex: 'triggerPosition',
      key: 'triggerPosition',
      ellipsis: true,
      width: 150,
      // render: (content, record, index) => {
      //   return (
      //     <DropdownSelect
      //       rowKey="id"
      //       name="c_DV_NAME" // 搜索词字段
      //       value={content}
      //       data={store.BasicInfo.dropdownData.triggerPositions || []}
      //       columns={[{ dataIndex: 'c_DV_NAME', key: 'c_DV_NAME' }]}
      //       onChange={(value) => {
      //         table.current.props.dataSource[index].triggerPosition = value.join(',');
      //         setTableData(_.cloneDeep(table.current.props.dataSource));
      //       }}
      //     />
      //   );
      // },
    },
    {
      title: '指标类型',
      dataIndex: 'indexType',
      key: 'indexType',
      ellipsis: true,
      width: 100,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '安装结果',
      dataIndex: 'installResult',
      key: 'installResult',
      width: 150,
      ellipsis: true,
      render: (content, record) => {
        // console.log('content', record);
        // 2新增安装，0重新安装，1更新安装
        let _content = '';
        switch (record.installState) {
          case '0':
            _content = '重新安装';
            break;
          case '1':
            _content = '更新安装';
            break;
          case '2':
            _content = '新增安装';
            break;
          default:
            break;
        }
        return (
          <Tooltip placement="topLeft" title={`${_content}成功`}>
            {`${_content}成功`}
          </Tooltip>
        );
      },
    },
  ];

  const [columns, setColumns] = useState(col);

  useEffect(() => {
    col[4].render = (content, record, index) => {
      return (
        <DropdownSelect
          rowKey="id"
          name="c_DV_NAME" // 搜索词字段
          value={content}
          data={
            store.BasicInfo.dropdownData.triggerPositions
              ? store.BasicInfo.dropdownData.triggerPositions
              : []
          }
          columns={[{ dataIndex: 'c_DV_NAME', key: 'c_DV_NAME' }]}
          onChange={(keys, value) => {
            const tableData = store.BasicInfo.tableData;
            tableData[index].triggerPosition = keys.join(',');
            setTableData(_.cloneDeep(table.current.props.dataSource));
          }}
        />
      );
    };
    setColumns(col);
  }, [store.BasicInfo.dropdownData.triggerPositions]);

  const [reasonModalVisible, setReasonModalVisible] = useState(false);

  const showReason = () => {
    setReasonModalVisible(true);
  };

  const { successInfo, faildInfo } = store.BasicInfo.msg;

  return (
    <>
      <Tipbar
        type="info"
        content={
          <>
            载入成功{successInfo.count}条，载入失败
            <a
              style={{ color: '#245eff' }}
              // target="_blank" href={store.BasicInfo.downloadUrl}
              href="#"
              onClick={showReason}
            >
              {faildInfo.count}
            </a>
            条
          </>
        }
      />

      <div>
        <QuarkTable
          rowKey="indexCode"
          loading={store.BasicInfo.tableData.length === 0}
          resizable={false}
          ref={table}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={store.BasicInfo.tableData}
        />
      </div>

      <Modal
        title="失败原因"
        visible={reasonModalVisible}
        footer={null}
        onCancel={() => setReasonModalVisible(false)}
        mask={false}
      >
        {faildInfo.msg.map((x, i) => (
          <p key={i}>
            {x.name}:{x.value}
          </p>
        ))}
      </Modal>
    </>
  );
};

export default BasicInfo;
