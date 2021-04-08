// 一个轻量级的前端快捷表格组件，支持本地增删改，并返回操作回调
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Table, Button, Tooltip } from 'antd';
import { QuestionCircleOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

// ref 必须传
const FeTable = (props, ref) => {
  const { title, tableProps, updateTableData=()=>{} } = props;
  const { columns, } = tableProps;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(tableProps.dataSource);

  useImperativeHandle(ref, () => ({
    getDataSource: () => dataSource,
    setDataSource,
  }))

  // 新增1条记录
  const addRecord = () => {
    const newDataSource = dataSource.splice(0);
    const record = {}
    columns.forEach(x => {
      // record[x.dataIndex] = ''
      record.id = new Date().getTime();
    })
    newDataSource.push(record);
    setDataSource(newDataSource);
    updateTableData(newDataSource);
  };

  // 删除记录
  const deleteRecords = () => {
    const newDataSource = dataSource.filter((data) => {
      let bCheck = false;
      selectedRowKeys.forEach((key) => {
        if (key === data.id) {
          bCheck = true;
        }
      });
      if (!bCheck) {
        return data;
      }
    });
    setDataSource(newDataSource);
    updateTableData(newDataSource);
  };

  useEffect(() => {
    updateTableData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    setDataSource(tableProps.dataSource);
  }, [tableProps.dataSource]);

  const Header = (props) => {

    return (
      <div style={{ paddingTop: '20px', width: '100%', display: 'flex', marginBottom: '10px' }}>
        <h3 style={{ marginRight: 'auto' }}>
          {title.text}&nbsp;&nbsp;{title.desc && (<Tooltip placement="right" title={title.desc}>
            <a href="#">
              <QuestionCircleOutlined />
            </a>
          </Tooltip>)}
        </h3>

        <div style={{ width: 'min-content', marginLeft: 'auto', display: 'flex' }}>
          <Button type="text" onClick={addRecord} icon={<PlusCircleOutlined />} size="small">
            新增
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            type="text"
            icon={<CloseOutlined />}
            size="small"
            onClick={deleteRecords}
          >
            删除
          </Button>
        </div>
      </div>
    );
  };


  return <>
    <Header />
    <Table
      size="small"
      rowKey="id"
      bordered
      pagination={false}
      {...tableProps}
      dataSource={dataSource}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => {
          setSelectedRowKeys(keys)
        }
      }}
      locale={{
        emptyText: (
          <>
            <div className="text-center">暂无数据</div>
            <div className="text-center">
              请点击
                  <a style={{ color: '#1785ff' }} href="#" onClick={addRecord}>
                新增按钮新增
                  </a>
            </div>
          </>
        ),
      }}
    />
  </>
}

export default forwardRef(FeTable)
