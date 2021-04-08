import { Input, Select, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import React, { useEffect, useState } from 'react';
import styles from './style.less';

const TreeSearch = (props) => {
  const { changeSelect, dataSource, selectedRowKeys = [], setSelectedRowKeys } = props;
  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indexName',
      width: 120,
      // resizable:1,
    },
    {
      title: '指标代码',
      dataIndex: 'indexCode',
      width: 120,
      // resizable:1,
    },
    {
      title: '公共指标',
      dataIndex: 'commonIndex',
      width: 120,
      // resizable:1,
    },
  ];

  return (
    <div
      style={{ height: '500px', width: '400px', border: '1px solid #f0f0f0', background: '#fff' }}
    >
      <div className="a-card">
        <div className="a-card-header">
          <Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />
        </div>
        <div className="a-card-body px-2">
          <QuarkTable
            columns={columns}
            dataSource={dataSource}
            expandable={{}}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                changeSelect(selectedRows);
                setSelectedRowKeys(selectedRowKeys);
              },
            }}
          />
        </div>
        {/* <footer className="a-card-footer "> */}
        {/*   已选&nbsp;<span style={{ color: 'blue' }}>{count}</span>&nbsp;项 */}
        {/* </footer> */}
      </div>
    </div>
  );
};
const TreeSearchSelect = (props) => {
  const { value = '', onChange, dataSource } = props;
  // const [selectedRowKeys, setSelectedRowKeys] = useState(value ? value.split(',') : []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 从树结构找节点
  const findTreeNode = (value, treeData) => {
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].indexCode === value) {
        return treeData[i].indexName;
      }

      if (treeData[i].children) {
        const _treeData = treeData[i].children;
        if (findTreeNode(value, _treeData)) {
          return findTreeNode(value, _treeData);
        }
      }
    }
    return '';
  };
  /**
   * title & selectedRowKeys一定要和value关联起来
   * 这一点很重要
   */
  const [title1, setTitle1] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    console.log(title1);
  }, [title1]);
  let title = '';
  title = value
    .split(',')
    .map((value) => findTreeNode(value, dataSource))
    .join(',');
  const changeSelect = (selectedRows) => {
    if (onChange) {
      onChange(selectedRows.map((item) => item.indexCode).join(','));
      // setTitle1(selectedRows.map((item) => item.indexName).join(','));
      setLabels(selectedRows.map((item) => item.indexName));
    }
  };
  const onClear = () => {
    // 清空选中
    setSelectedRowKeys([]);
    setLabels([]);
    onChange('');
  };
  function tagRender(props) {
    // console.log('tagRender props');
    // console.log(props);
    const { label, value, closable, onClose } = props;

    return (
      <Tag closable={false} onClose={onClose}>
        {label}
      </Tag>
    );
  }
  return (
    <Select
      className={styles.multiSelect}
      allowClear
      onClear={onClear}
      mode="multiple"
      value={labels}
      placeholder="请选择"
      // defaultOpen
      dropdownMatchSelectWidth={false}
      tagRender={tagRender}
      maxTagCount={1}
      dropdownRender={() => (
        <TreeSearch
          changeSelect={changeSelect}
          dataSource={dataSource}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
    />
    // <div
    //   className={styles.treeSelect}
    //   // style={{
    //   //   width: '100%',
    //   //   lineHeight: '30px',
    //   //   padding: '1px 11px',
    //   //   border: '1px solid #d9d9d9',
    //   // }}
    // >
    //   <Dropdown
    //     trigger={['click']}
    //     overlay={
    //       <TreeSearch
    //         changeSelect={changeSelect}
    //         dataSource={dataSource}
    //         selectedRowKeys={selectedRowKeys}
    //         setSelectedRowKeys={setSelectedRowKeys}
    //       />
    //     }
    //   >
    //     <a
    //       className="ant-dropdown-link"
    //       onClick={e => e.preventDefault()}
    //       style={{ display: 'flex', width: '100%' }}
    //     >
    //       <div
    //         className="text-center"
    //         style={{
    //           flex: 1,
    //           overflow: 'hidden',
    //           textOverflow: 'ellipsis',
    //           whiteSpace: 'nowrap',
    //         }}
    //       >
    //         {/*{title || '请选择'}*/}
    //         {title1 || '请选择'}
    //       </div>
    //       <div style={{ marginLeft: 'auto' }}>
    //         <small>
    //           <DownOutlined />
    //         </small>
    //       </div>
    //     </a>
    //   </Dropdown>
    // </div>
  );
};
export default TreeSearchSelect;
