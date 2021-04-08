import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';

import QuarkTable from '@/components/QuarkTable';
import ToolBar from '@/components/ToolBar';
import FooterPane from '@/components/PagePane/FooterPane';
import HeaderPane from '@/components/PagePane/HeaderPane';
import SearchPane from '@/components/PagePane/SearchPane';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useVT } from 'virtualizedtableforantd4';

const TablePane = (props) => {
  const {
    loading,
    funCode,
    selectedRows,
    selectedRowKeys,
    changeSelectedRows,
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
    theadHeight = 40,
    changeState,
  } = props;
  // console.log('======TablePane', props);

  // 表格获得高度自适应
  const tableWrapper = useRef(null);
  const sectionRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(600);

  useEffect(() => {
    if (!hide) {
      setTableHeight(tableWrapper.current.clientHeight);
    }
  }, [hide]);
  const onResize = useCallback(() => {
    // const bodyHeight = document.body.clientHeight;
    // const y = tableWrapper.current.getBoundingClientRect().y;
    // console.log(bodyHeight, y);
    setTableHeight(tableWrapper.current.clientHeight);
  }, []);
  useLayoutEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  // const [vt] = useVT(() => ({ scroll: { y: tableHeight - theadHeight } }), [tableHeight]);
  // const [searchForm] = Form.useForm();
  // setSearchForm && setSearchForm(searchForm);
  // handles.searchForm = searchForm; //带上工具栏查询条件
  // const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (autoQuery) {
      handles.query();
    }
  }, []);

  const _tableProps = useMemo(() => {
    return {
      loading,
      dataSource,
      columns,
      changeState,
      handles,
      scroll: { x: '100%', y: tableHeight - theadHeight },
      rowSelection: {
        selectedRowKeys,
        onChange: changeSelectedRows,
      },
      ...tableProps,
    };
  });

  const RenderTable = useCallback(({ tableProps }) => {
    if (tableRender) {
      return tableRender(tableProps);
    }
    return <QuarkTable {...tableProps} />;
  }, []);
  return (
    <ErrorBoundary>
      <section
        className={`${hide ? 'hidden' : ''} ${pageWrapper ? 'page-wrapper a-card' : 'a-card'}`}
        ref={sectionRef}
      >
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
        {
          <SearchPane
            {...search}
            onResize={onResize}
            handles={handles}
            setSearchForm={setSearchForm}
          />
        }
        <div className="a-card-body px-2" ref={tableWrapper}>
          <RenderTable tableProps={_tableProps} />
        </div>
        <FooterPane {...footer} pageInfo={pageInfo} changePage={handles.changePage.bind(handles)} />
        {children}
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(TablePane);
