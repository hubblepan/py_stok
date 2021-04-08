import React, { useEffect, useState } from 'react';
import { Input, Form, Table, message } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import styles from '../style.less';
import MsgBox from '@/utils/MsgBox';
import { queryCombination } from './DetectionService';
import QuarkTable from '@/components/QuarkTable';

const { Search } = Input;
const CombinationTable = (props) => {
  const { testVisible, setIdcombination } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [defaultExpanded, setDefaultExpanded] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const columns = [
    {
      title: '组合名称',
      key: 'portName',
      dataIndex: 'portName',
      width: 370,
    },
    {
      title: '组合代码',
      key: 'portCode',
      dataIndex: 'portCode',
    },
  ];
  useEffect(() => {
    if (testVisible) {
      form.resetFields();
      fetchTargetList();
      // setLoading(true)
      // setTimeout(()=>{
      //   setLoading(false)
      // },2000)
    } else {
      // 清空数据
      setSelectedRowKeys([]);
      setIdcombination('');
      setDataSource([]);
      setPagination({ total: 0 });
    }
  }, [testVisible]);
  const fetchTargetList = (query = {}) => {
    const { pagination = {}, keyword = '' } = query;
    const params = {
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      keyword,
    };
    console.log(params);
    setLoading(true);
    setTimeout(() => {
      queryCombination(params)
        .then((response) => {
          // setDataSource(response.data.list)
          renderTable(response.data.list || []);
          // 重新设置pagination
          setPagination({
            ...query.pagination,
            total: response.data.total,
          });
          setLoading(false);
          setSelectedRowKeys([]);
          setIdcombination('');
        })
        .catch(() => {
          setLoading(false);
        });
    }, 2000);
  };
  const searchTarget = () => {
    if (!form.getFieldValue('keyword')) {
      MsgBox.info({ content: '请输入关键词' });
      return;
    }
    const keyword = form.getFieldValue('keyword');
    const pagination1 = { current: 1, pageSize: pagination.pageSize };
    fetchTargetList({ pagination: pagination1, keyword });
  };
  const onTableChange = (pagination) => {
    // fetchTargetList({page:pagination.current,pageSize:pagination.pageSize})
    console.log(pagination);
    const keyword = form.getFieldValue('keyword');
    fetchTargetList({ pagination, keyword });
  };
  const renderTable = (dataSource) => {
    /**
     * 这里注意：一定要先改defaultExpandedRowKeys，再改dataSource
     * 1.先深度遍历获取所有的key值
     * 2.再设置dataSource
     */
    new Promise((resolve) => {
      const newExpandedKeys = [];
      const expand = (treeDatas) => {
        // 获取到所有可展开的父节点
        treeDatas.map((item) => {
          newExpandedKeys.push(item.id);
          if (item.children) {
            expand(item.children);
          }
        });
        return newExpandedKeys;
      };
      setDefaultExpanded(expand(dataSource));
      resolve(dataSource);
    }).then((dataSource) => {
      setDataSource(dataSource);
    });
  };
  const selectIdtarget = (selectedRowKeys, selectedRows) => {
    // 设置选中
    setSelectedRowKeys(selectedRowKeys);
    const ids = [];
    selectedRows
      .filter((item) => item.isLeaf)
      .forEach((item) => {
        ids.push(item.id);
      });
    setIdcombination(ids.join(','));
  };
  return (
    <>
      <div className={styles.targetTable}>
        <Form form={form}>
          <Form.Item className={styles.searchFormItem} label="" name="keyword">
            <Search
              style={{ marginLeft: 'auto', width: '240px' }}
              placeholder="请输入关键词搜索"
              prefix={<SearchOutlined />}
              enterButton="搜索"
              onSearch={searchTarget}
            />
          </Form.Item>
        </Form>
        <QuarkTable
          key={`table-${dataSource && dataSource.length}`}
          expandable={{
            defaultExpandAllRows: true,
            defaultExpandedRowKeys: defaultExpanded,
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
          }}
          scroll={{ y: 'calc(100% - 39px)' }}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              selectIdtarget(selectedRowKeys, selectedRows);
            },
          }}
          onChange={onTableChange}
          pagination={{
            ...pagination,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total, range) => `共 ${total} 条`,
            hideOnSinglePage: false,
          }}
        />
      </div>
    </>
  );
};
export default CombinationTable;
