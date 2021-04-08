import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';

import QuarkTable from '@/components/QuarkTable';
import ToolBar from '@/components/ToolBar';
import FooterPane from '@/components/PagePane/FooterPane';
import HeaderPane from '@/components/PagePane/HeaderPane';
import SearchPane from '@/components/PagePane/SearchPane';
import ErrorBoundary from '@/components/ErrorBoundary';
import BeanUtil from '@/utils/BeanUtil';
import { useVT } from 'virtualizedtableforantd4';

const TablePane = (props) => {
  const {
    loading,
    funCode,
    selectedRows,
    selectedRowKeys,
    changeSelectedRows,
    expandedRowKeys,
    setExpandedRowKeys,
    setSearchForm,
    dataSource,
    pageInfo,
    autoQuery,
    header,
    search,
    toolbar,
    filterButton,
    footer,
    columns,
    tableRender,
    tableProps,
    handles,
    pageWrapper,
    children,
    hide,
    theadHeight = 41,
    changeState,
  } = props;
  // console.log('======TablePane', props);

  // 表格获得高度自适应
  const tableWrapper = useRef(null);
  const sectionRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(600);

  useEffect(() => {
    if (!hide && tableWrapper.current.clientHeight) {
      setTableHeight(Math.floor(tableWrapper.current.clientHeight) - theadHeight);
    }
  }, [hide]);
  const onResize = useCallback(() => {
    // const bodyHeight = document.body.clientHeight;
    // const y = tableWrapper.current.getBoundingClientRect().y;
    // console.log(bodyHeight, y);
    setTableHeight(Math.floor(tableWrapper.current.clientHeight) - theadHeight);
  }, []);
  useLayoutEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  // const [searchForm] = Form.useForm();
  // setSearchForm && setSearchForm(searchForm);
  // handles.searchForm = searchForm; //带上工具栏查询条件
  // const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (autoQuery) {
      handles.query();
    }
  }, []);

  let bodyDom = null;
  if (tableRender) {
    bodyDom = tableRender({
      handles,
      dataSource,
      columns,
      loading,
      tableHeight,
      selectedRowKeys,
      expandedRowKeys,
      scroll: { x: '100%', y: tableHeight },
      rowSelection: {
        selectedRowKeys,
        onChange: changeSelectedRows,
      },
      ...tableProps,
    });
  } else {
    bodyDom = (
      <QuarkTable
        handles={handles}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        scroll={{ x: '100%', y: tableHeight }}
        rowSelection={{
          selectedRowKeys,
          onChange: changeSelectedRows,
        }}
        {...tableProps}
      />
    );
  }

  return (
    <ErrorBoundary>
      <section
        className={`${hide ? 'hidden' : ''} ${pageWrapper ? 'page-wrapper a-card' : 'a-card'}`}
        ref={sectionRef}
      >
        {(header || toolbar) && (
          <HeaderPane {...header}>
            {/* <ToolbarPane {...toolbar} handles={handles} selectedRows={selectedRows} /> */}
            <ToolBar
              handles={handles}
              selectedRows={selectedRows}
              filterButton={filterButton}
              funCode={funCode}
              {...toolbar}
            />
          </HeaderPane>
        )}
        {search && (
          <SearchPane
            {...search}
            onResize={onResize}
            handles={handles}
            setSearchForm={setSearchForm}
          />
        )}
        <div className="a-card-body px-2" ref={tableWrapper}>
          {bodyDom}
        </div>
        <FooterPane {...footer} pageInfo={pageInfo} changePage={handles.changePage.bind(handles)} />
        {children}
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(TablePane);
