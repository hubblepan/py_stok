import { Input, Select, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import React, { useEffect, useState } from 'react';
import styles from './style.less';

const TreeSearch = (props) => {
  const {
    changeSelect,
    selectedRowKeys = [],
    setSelectedRowKeys,
    tableProps = {},
    dropdownCard = {},
  } = props;
  const { showSearch = true, dataSource = [], columns = [], ...rest } = tableProps;
  const { width = 400, height = 500 } = dropdownCard;
  return (
    <div
      className="a-card"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        border: '1px solid #f0f0f0',
        background: '#fff',
      }}
    >
      {showSearch ? (
        <div className="a-card-header">
          <Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />
        </div>
      ) : null}
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
          scroll={{ y: height - 90 }}
          {...rest}
        />
      </div>
      {/* <footer className="a-card-footer "> */}
      {/*   已选&nbsp;<span style={{ color: 'blue' }}>{count}</span>&nbsp;项 */}
      {/* </footer> */}
    </div>
  );
};
const TreeSearchSelect = (props) => {
  const {
    value = '',
    onChange,
    valueField,
    labelField,
    joinSymbol = ',',
    filterMethod = () => {
      return true;
    },
    tableProps = {},
    dropdownCard = {},
    ...rest
  } = props;
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
  // let title = '';
  // title = value
  //   .split(',')
  //   .map((value) => findTreeNode(value, dataSource))
  //   .join(',');
  const changeSelect = (selectedRows) => {
    if (onChange) {
      // onChange(selectedRows.map((item) => item.indexCode).join(','));
      onChange(
        selectedRows
          .filter(filterMethod)
          .map((item) => item[valueField])
          .join(joinSymbol),
      );
      // setTitle1(selectedRows.map((item) => item.indexName).join(','));
      // setLabels(selectedRows.map((item) => item.indexName));
      setLabels(selectedRows.map((item) => item[labelField]));
    }
  };
  useEffect(() => {
    console.log('labels');
    console.log(labels);
  }, [labels]);
  useEffect(() => {
    console.log('labelField');
    console.log(labelField);
  }, [labelField]);
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
          tableProps={tableProps}
          dropdownCard={dropdownCard}
          // columns={columns}
          // dataSource={dataSource}
          changeSelect={changeSelect}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}
      {...rest}
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
