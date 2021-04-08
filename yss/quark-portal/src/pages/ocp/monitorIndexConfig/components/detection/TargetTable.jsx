import React, { useCallback, useEffect, useState } from 'react';
import { Input, Form, Table, message, Button } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import request from '@/utils/request';
import MsgBox from '@/utils/MsgBox';
import styles from '../style.less';
import { queryTarget } from './DetectionService';

const { Search } = Input;
const TargetTable = (props) => {
  const { testVisible, setIdtarget } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [defaultExpanded, setDefaultExpanded] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [totalLevel, setTotalLevel] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const columns = [
    {
      title: '分类名称',
      key: 'typeName',
      dataIndex: 'typeName',
      width: 370,
      // fixed: 'left',
      // sorter: true,
      // resizable: true,
    },
    {
      title: '分类代码',
      key: 'typeCode',
      dataIndex: 'typeCode',
      // width: 150,
      // fixed: 'left',
      // sorter: true,
      // resizable: true,
    },
  ];
  useEffect(() => {
    if (testVisible) {
      form.resetFields();
      fetchTargetList();
    } else {
      // 清空数据
      setSelectedRowKeys([]);
      setIdtarget('');
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
    // console.log(params);
    setLoading(true);
    setTimeout(() => {
      queryTarget(params)
        .then((response) => {
          setDataSource(response.data.list || []);
          // 重新设置pagination
          setPagination({
            ...query.pagination,
            total: response.data.total,
          });
          setLoading(false);
          setSelectedRowKeys([]);
          setIdtarget('');
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
    console.log(pagination);
    const keyword = form.getFieldValue('keyword');
    fetchTargetList({ pagination, keyword });
  };
  const selectIdtarget = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRows);
    // 设置选中
    setSelectedRowKeys(selectedRowKeys);
    const ids = [];
    selectedRows
      .filter((item) => item.isLeaf)
      .forEach((item) => {
        ids.push(item.id);
      });
    setIdtarget(ids.join(','));
  };
  const expandLevel = (expandedLevel) => {
    /**
     * 尤其注意：
     * 使用expandedRowKeys属性控制table的展开时，一定要和onExpand配合使用
     */
    let depth = 0;
    const newExpandedKeys = [];
    const expand = (treeData, currentLevel) => {
      // 根据expandedLevel来控制最大"展开层级"。为0代表"全部展开"
      if (currentLevel >= expandedLevel && expandedLevel) {
        return newExpandedKeys;
      }
      if (expandedLevel === 0) {
        // 初始"全部展开"时计算"最大层级"
        // console.log('计算最大层级');
        // console.log(currentLevel);
        // console.log(depth);
        depth = Math.max(depth, currentLevel);
      }
      // 递归遍历
      treeData.map((item) => {
        newExpandedKeys.push(item.id);
        // 但是要考虑到空分类的情况
        if (item.children || (!item.children && !item.isLeaf)) {
          expand(item.children || [], currentLevel + 1);
        }
      });
      return newExpandedKeys;
    };
    // console.log('递归前dataSource');
    // console.log(dataSource);
    setExpandedRows(expand(dataSource, 1));
    if (expandedLevel === 0) {
      setTotalLevel(depth);
    }
    // console.log('递归完成');
    // console.log(newExpandedKeys);
    // console.log('递归完成depth');
    // console.log(depth);
  };
  const onExpand = (expanded, record) => {
    if (expanded) {
      // 设置展开-把当前id值push进去
      const origExpandedRows = expandedRows.slice(0, expandedRows.length);
      origExpandedRows.push(record.id);
      setExpandedRows(origExpandedRows);
    } else {
      // 设置折叠-过滤掉当前id
      setExpandedRows(
        expandedRows.filter((item) => {
          return item !== record.id;
        }),
      );
    }
  };
  const renderTable = (dataSource) => {
    setDataSource(dataSource);
    /**
     * 这里注意：一定要先改defaultExpandedRowKeys，再改dataSource
     * 1.先深度遍历获取所有的key值
     * 2.再设置dataSource
     */

    new Promise((resolve) => {
      const newExpandedKeys = [];
      let totalLevel = 0;
      const expand = (treeData, currentLevel) => {
        totalLevel = Math.max(totalLevel, currentLevel);
        // 递归搜索
        treeData.map((item) => {
          newExpandedKeys.push(item.id);
          // 但是要考虑到空分类的情况
          if (item.children || (!item.children && !item.isLeaf)) {
            expand(item.children || [], currentLevel + 1);
          }
        });
        return newExpandedKeys;
      };
      // setDefaultExpanded(expand(dataSource));
      setExpandedRows(expand(dataSource, 1));
      console.log('递归完成');
      console.log(newExpandedKeys);
      console.log('totalLevel最大层级');
      console.log(totalLevel);
      resolve(dataSource);
    }).then((dataSource) => {
      // setDataSource(dataSource);
    });
  };
  useEffect(() => {
    // 全部展开
    expandLevel(0);
  }, [dataSource, totalLevel]);
  useEffect(() => {
    // 全部展开
    // console.log('usEffect totalLevel');
    // console.log(totalLevel);
  }, [totalLevel]);
  return (
    <>
      <div className={styles.targetTable}>
        <Form form={form}>
          {/*<Form.Item label="" name="button">*/}
          {/*  <Button type={"primary"} onClick={()=>{expandLevel(1)}}>一级</Button>*/}
          {/*  <Button type={"primary"} onClick={()=>{expandLevel(2)}}>二级</Button>*/}
          {/*  <Button type={"primary"} onClick={()=>{expandLevel(3)}}>三级</Button>*/}
          {/*  <Button type={"primary"} onClick={()=>{expandLevel(4)}}>四级</Button>*/}
          {/*  <Button type={"primary"} onClick={()=>{expandLevel(5)}}>五级</Button>*/}
          {/*</Form.Item>*/}
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
          expandable={{
            defaultExpandAllRows: true,
            onExpand: onExpand,
            // defaultExpandedRowKeys: defaultExpanded,
            expandedRowKeys: expandedRows,
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
          scroll={{
            y: 'calc(100% - 39px)',
          }}
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
export default TargetTable;
