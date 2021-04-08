import React, {
  Component,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  memo,
  useMemo,
} from 'react';
import ModalAdd from './add-list/index';
// import QuarkTable from '@/components/QuarkTable';
import QuarkTable from '@/components/QuarkTable';
import HeaderPane from '@/blocks/TablePane/component/HeaderPane';
import SearchPane from '@/blocks/TablePane/component/SearchPane';
import FooterPane from '@/blocks/TablePane/component/FooterPane';
import ToolbarPane from '@/blocks/TablePane/component/ToolbarPane';
import { Button, Form, Table, Input, Select, Row, Col, message, Pagination, Dropdown } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/handles/mapModelToProps';
import ToolBar from '@/components/ToolBar';

import { connect } from 'dva';

const columns = [
  {
    title: '主题代码',
    dataIndex: 'mainCode',
    key: 'mainCode',
    width: 100,
    fixed: 'left',
    sorter: 1,

    search: 1,
    resizable: 1,
    // index: 1,
    hidden: 0,
    export: 1,
    widget: 'input',
    onFilter: (value, record) => record.mainCode.includes(value),
  },
  {
    title: '主题名称',
    dataIndex: 'mainName',
    key: 'mainName',
    width: 100,
    search: 1,
    sortable: 1,
    resizable: 1,
    show: 1,
    export: 1,
    widget: 'input',
    sorter: (a, b) => a.mainCode.length - b.mainCode.length,
  },
  {
    title: '主题类型',
    dataIndex: 'mainType',
    width: 120,
    key: 'mainType',
  },
  {
    title: '主题机构代码',
    key: 'oraCode',
    dataIndex: 'oraCode',
    width: 120,
  },
  {
    title: '统一信用代码',
    key: 'creditCode',
    dataIndex: 'creditCode',
    width: 150,
  },
  {
    title: '组织形式',
    key: 'oraStyle',
    width: 100,
    dataIndex: 'oraStyle',
  },

  {
    title: '主题机构代码',
    key: 'oraCode',
    width: 120,
    dataIndex: 'oraCode',
    fixed: 'right',
  },
];

// 子表搜索栏
const subTableSearchBar = [
  <Input type="text" key="1" label="指标名称" name="indexName" />,
  <Select label="监控状态" key="2" name="monitorStatus">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
  <Select label="监控状态" key="3" name="monitorStatus">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
  <Select label="监控状态" key="4" name="monitorStatus">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
  <Select label="监控状态" key="5" name="monitorStatus">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
];

const toolbar = {
  buttons: {
    add: {
      visible: 1,
    },
    query: {
      visible: 1,
    },
    edit: {
      visible: 1,
    },
    check: {
      visible: 1,
    },
    uncheck: {
      visible: 1,
    },
    print: {
      visible: 1,
    },
    deletes: {
      text: '删除',
      visible: 1,
      order: 301,
    },
  },
  more: {
    print: {
      visible: 1,
    },
    exports: {
      visible: 1,
    },
  },
  // filterButton: false,
  // toolbarRender,
};
const buttons = [
  {
    text: '增加',
    onClick: () => {
      console.log('adddddd');
    },
    disabled: (selects) => {
      return false;
    },
  },
  {
    text: '删除',
    onClick: () => {
      console.log('delete');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
  {
    text: '修改',
    onClick: () => {
      console.log('edit');
    },
    disabled: (selects) => {
      return selects.length !== 1;
    },
  },
  {
    text: '审核',
    onClick: () => {
      console.log('check');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
  {
    text: '反审核',
    onClick: () => {
      console.log('uncheck');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
];

// 按钮栏
const Toolbar = memo(({ buttons, selectedRowKeys }) => {
  console.log('Toolbar-=-=-=-=')
  return (
    <>
      {buttons.map((btn, i) => {
        return (
          <Button
            disabled={btn.disabled(selectedRowKeys)}
            key={i}
            onClick={btn.onClick}
            type="text"
          >
            {btn.text}
          </Button>
        );
      })}
    </>
  );
});

const Demo3 = (props) => {
  const {
    dispatch,
    dataSource,
    loading,
    changePage,
    selectedRows,
    selectedRowKeys,
    changeSelectedRows,
    pageInfo,
    searchForm,
    handles,
    setSearchForm,
  } = props;
  console.log('------Demo3');

  const showUncheck = (row, index) => (row.checkState == 0 ? 'text-warning' : '');

  // const changePage = (pageNo, pageSize) => {
  //   dispatch({
  //     type: 'demo3/effectChangePage',
  //     payload: { pageNo, pageSize },
  //   });
  // };

  // const onSelectChange = (selectedRowKeys, selectedRows) => {
  //   // this.setState({ selectedRowKeys });
  //   dispatch({
  //     type: 'demo3/effectChangeSelect',
  //     payload: { selectedRowKeys },
  //   });
  // };

  // const query = () => {
  //   dispatch({
  //     type: 'demo3/effectQuery',
  //   });
  // };

  // const setSearchForm = (form) => {
  //   dispatch({
  //     type: 'demo3/effectForm',
  //     payload: form,
  //   });
  // };

  useEffect(() => {
    handles.query();
  }, []);

  return (
    <section className="page-wrapper a-card">
      <header className="a-card-header " style={{ paddingRight: 0 }}>
        <ToolBar handles={handles} {...toolbar} selectedRows={selectedRows} filterButton={true} />
        {/* <Toolbar buttons={buttons} selectedRowKeys={selectedRowKeys} /> */}
        <SearchPane
          searchForm={searchForm}
          formItems={subTableSearchBar}
          onResize={() => {}}
          query={handles.query}
          setSearchForm={setSearchForm}
        />
      </header>
      <div className="a-card-body px-2">
        <QuarkTable
          rowClassName={showUncheck}
          loading={loading}
          // size="small"
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          changeSelectedRows={changeSelectedRows}
          rowSelection={{
            selectedRowKeys,
            onChange: changeSelectedRows,
          }}
          pagination={false}
          scroll={{ x: 'max-content', y: 560 }}
        />
      </div>
      <FooterPane pageInfo={pageInfo} changePage={changePage} />

      {/* <Pagination
        style={{ height: 22, lineHeight: '20px' }}
        size="small"
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
        defaultPageSize={20}
        pageSize={pageInfo.pageSize}
        defaultCurrent={pageInfo.pageNo}
        total={pageInfo.pageTotal}
        showTotal={(total) => `共 ${total} 项`}
        current={pageInfo.pageNo}
        onChange={changePage}
      /> */}
    </section>
  );
};

const DvaTaPane2 = (namespace) =>
  connect(({ user2 }) => {
    return mapStateToProps(user2);
  }, mapDispatchToProps(namespace))(Demo3);

export default function (props) {
  const namespace = 'user2';
  let Pane = useCallback(DvaTaPane2(namespace), [namespace]);
  return <Pane {...props} namespace={namespace} />;
}
