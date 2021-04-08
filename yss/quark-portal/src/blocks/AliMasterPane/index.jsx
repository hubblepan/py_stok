import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';

import QuarkTable from '@/components/QuarkTree';
import ToolBar from '@/components/ToolBar';
import FooterPane from './component/FooterPane';
import HeaderPane from './component/HeaderPane';
import SearchPane from './component/SearchPane';
import ContextMenu from './component/ContextMenu';

import ErrorBoundary from '@/components/ErrorBoundary';
import BeanUtil from '@/utils/BeanUtil';

const MasterPane = (props) => {
  const {
    loading,
    selectedRows,
    selectedRowKeys,
    changeSelectedRows,
    expandedRowKeys,
    setExpandedRowKeys,
    setSearchForm,
    dataSource,
    pageInfo,
    autoQuery = true,
    header,
    search,
    toolbar,
    footer,
    columns,
    tableRender,
    tableProps,
    handles,
    pageWrapper,
    hide,
    searchWord,
    setSearchWord,
    theadHeight = 1,
  } = props;
  // console.log('主表渲染-------');
  const { rowKey = 'id' } = tableProps;
  const { searchName = 'id' } = search;

  let searchMethod = handles.searchMethod;
  if (!!search.searchMethod) {
    searchMethod =
      typeof search.searchMethod === 'function' ? search.searchMethod : handles.searchMethod;
  }
  // 监听变动以便展开
  useEffect(() => {
    if (!!search.searchMethod) {
      handles.debounce(() => {
        setExpandedRowKeys(handles.searchMethod({ dataSource, rowKey, searchWord, searchName }));
      }, 300);
    }
  }, [dataSource, searchWord]);

  // 表格获得高度自适应
  const tableWrapper = useRef(null);
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

  const { buttons, toolbarRender, ...toolbarOptions } = toolbar;
  let toolbarDom = null;
  if (toolbarRender) {
    toolbarDom = toolbarRender(toolbar);
  } else {
    toolbarDom = buttons && (
      <ToolBar
        className="pl-2"
        handles={handles}
        buttons={buttons}
        selectedRows={selectedRows}
        {...toolbarOptions}
      />
    );
  }

  // 右键菜单
  const [menuProps, setMenuProps] = useState({
    visible: false,
    top: '0',
    left: '0',
  });

  const _tableProps = useMemo(() => {
    return {
      loading,
      dataSource: !!search.searchMethod ? handles.getShowDataSource(dataSource) : dataSource,
      expandedRowKeys,
      selectedRows,
      selectedRowKeys,
      columns,
      handles,
      scroll: { x: '100%', y: tableHeight - 40 },
      ...tableProps,
      rowSelection:
        tableProps.rowSelection === false
          ? false
          : BeanUtil.merge(
              {
                selectedRowKeys: handles.selectedRowKeys,
                onChange: changeSelectedRows,
              },
              tableProps.rowSelection,
            ),
      expandable:
        tableProps.expandable === false
          ? undefined
          : {
              expandedRowKeys,
              onExpand: (expanded, record) => {
                let expandedRows = [];
                if (expanded) {
                  expandedRows = expandedRowKeys.slice(0, expandedRowKeys.length);
                  expandedRows.push(record[rowKey]);
                  setExpandedRowKeys(expandedRows);
                } else {
                  expandedRows = expandedRowKeys.filter((item) => {
                    return item !== record[rowKey];
                  });
                  setExpandedRowKeys(expandedRows);
                }
              },
              ...tableProps.expandable,
            },
      getRowProps: (record, rowIndex) => {
        return {
          onContextMenu: (event) => {
            event.preventDefault();
            const clickX = event.clientX;
            const clickY = event.clientY;
            setMenuProps({
              ...menuProps,
              currentRecord: record,
              visible: true,
              left: clickX,
              top: clickY,
            });
          },
        };
      },
      // 右键菜单,主表专用
      onRow: (record) => {
        const onRow = tableProps.onRow ? tableProps.onRow(record) : {};
        return {
          ...onRow,
          onContextMenu: (event) => {
            // console.log(1111, tableProps.onRow(record));
            // console.log('右键菜单record', record);
            event.preventDefault();
            const clickX = event.clientX;
            const clickY = event.clientY;
            setMenuProps({
              ...menuProps,
              currentRecord: record,
              visible: true,
              left: clickX,
              top: clickY,
            });
          },
        };
      },
    };
  });

  // 查询
  const queryData = useCallback(() => {
    handles.query.call(handles);
  }, [handles]);
  useEffect(() => {
    if (autoQuery) {
      queryData();
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
      ..._tableProps,
    });
  } else {
    bodyDom = (
      <div>
        <QuarkTable
          handles={handles}
          dataSource={dataSource}
          columns={columns}
          tableHeight={tableHeight}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          expandedRowKeys={expandedRowKeys}
          tableWrapper={tableWrapper}
          {..._tableProps}
        />
        <ContextMenu
          {...menuProps}
          setMenuProps={setMenuProps}
          handles={handles}
          toolbar={toolbar}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <aside
        className={`${hide ? 'hidden' : ''} ${pageWrapper ? 'page-wrapper a-card' : 'a-card'}`}
      >
        <HeaderPane handles={handles} toolbarDom={toolbarDom} {...header} />
        <SearchPane toolbarDom={toolbarDom} handles={handles} {...search} />
        <div className="a-card-body px-2" ref={tableWrapper}>
          {bodyDom}
        </div>
        <FooterPane pageInfo={pageInfo} selectedRows={selectedRows} {...footer} />
      </aside>
    </ErrorBoundary>
  );
};

export default React.memo(MasterPane);
