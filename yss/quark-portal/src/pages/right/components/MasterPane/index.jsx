import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import RenderTable from './component/RenderTable/';
import ToolBar from '@/components/ToolBar';
import FooterPane from './component/FooterPane';
import HeaderPane from './component/HeaderPane';
import SearchPane from './component/SearchPane';
import ErrorBoundary from '@/components/ErrorBoundary';
import BeanUtil from '@/utils/BeanUtil';
import { useVT } from 'virtualizedtableforantd4';

const MasterPane = (props, ref) => {
  const {
    handles,
    loading,
    selectedRows,
    selectedRowKeys,
    changeSelectedRows,
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
    pageWrapper,
    hide,
    expandedRowKeys,
    setExpandedRowKeys,
    searchWord,
    setSearchWord,
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

  const [vt] = useVT(() => ({ scroll: { y: tableHeight - 40 } }), [tableHeight]);

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
  return (
    <ErrorBoundary>
      <aside
        className={`${hide ? 'hidden' : ''} ${pageWrapper ? 'page-wrapper a-card' : 'a-card'}`}
      >
        <HeaderPane handles={handles} toolbarDom={toolbarDom} {...header} />
        <SearchPane toolbarDom={toolbarDom} handles={handles} {...search} />
        <div className="a-card-body px-2" ref={tableWrapper}>
          <RenderTable
            tableRender={tableRender}
            tableProps={_tableProps}
            menuProps={menuProps}
            setMenuProps={setMenuProps}
            toolbar={toolbar}
            vt={vt}
          />
        </div>
        <FooterPane pageInfo={pageInfo} selectedRows={selectedRows} {...footer} />
      </aside>
    </ErrorBoundary>
  );
};

// export default React.memo(MasterPane, (prevProps, nextProps) => {
//   return (
//     prevProps.loading === nextProps.loading &&
//     prevProps.selectedRowKeys === nextProps.selectedRowKeys &&
//     prevProps.dataSource === nextProps.dataSource &&
//     prevProps.searchWord === nextProps.searchWord &&
//     prevProps.expandedRowKeys === nextProps.expandedRowKeys
//   );
// });
export default React.memo(MasterPane);
