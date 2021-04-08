import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';

import QuarkTable from '@/components/QuarkTree';
import ToolBar from '@/components/ToolBar';
import ErrorBoundary from '@/components/ErrorBoundary';
import BeanUtil from '@/utils/BeanUtil';
import FooterPane from '@/components/PagePane/FooterPane';
import HeaderPane from '@/components/PagePane/HeaderPane';
import SearchPane from '@/components/PagePane/SearchPane';
import { useTablePipeline, features } from 'ali-react-table';
import { Input, Select, Button, Checkbox, Radio } from 'antd';

const TreePane = (props) => {
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
    theadHeight = 0,
  } = props;
  // console.log('======TablePane', props);

  // 表格获得高度自适应
  const tableWrapper = useRef(null);
  const sectionRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(600);


  useEffect(() => {
    if (!hide && tableWrapper.current.clientHeight) {
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
  // const [searchForm] = Form.useForm();
  // setSearchForm && setSearchForm(searchForm);
  // handles.searchForm = searchForm; //带上工具栏查询条件
  // const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (autoQuery) {
      handles.query();
    }
  }, []);

  const {
    rowKey = 'id',
    getRowProps,
    selectMode = { mode: 'checkbox' },
    onSelectedKeys,
    treeMode,
    sortMode,
    ...tableOptions
  } = tableProps;

  const pipeline = useTablePipeline({ components: { Checkbox, Radio, Button, Input, Select } });
  pipeline
    .input({
      dataSource,
      columns: columns.map((column: any) => {
        const { sorter } = column;
        // eslint-disable-next-line no-shadow
        const features: any = {};
        if (sorter) {
          features.sortable = sorter;
        }
        return {
          code: column.dataIndex,
          lock: column.fixed,
          getValue: (record: any) => record[column.dataIndex],
          getCellProps: (value: any, record: any, rowIndex: number) => {
            const { ellipsis, getCellProps } = column;
            const cellProps: any = (getCellProps && getCellProps(value, record, rowIndex)) || {};
            if (ellipsis) {
              cellProps.className = 'ant-table-cell-ellipsis';
            }
            return cellProps;
          },
          features,
          ...column,
        };
      }),
    })
    .primaryKey(rowKey)
    .appendRowPropsGetter((record, rowIndex) => {
      const rowProps: any = {};
      if (!rowProps.className && record.checkState === 0) {
        rowProps.className = 'text-warning';
      }
      const rest = BeanUtil.merge(rowProps, getRowProps && getRowProps(record, rowIndex));
      return rest;
    });

  let sortType = {
    mode: 'multiple',
    keepDataSource: false,
    highlightColumnWhenActive: true,
  };
  if (sortMode) {
    sortType = BeanUtil.merge(sortType, sortMode);
  }
  pipeline.use(features.sort(sortType));

  if (treeMode) {
    pipeline.use(features.treeMode(treeMode));
  } else if (expandedRowKeys && setExpandedRowKeys) {
    pipeline.use(
      features.treeMode({ openKeys: expandedRowKeys, onChangeOpenKeys: setExpandedRowKeys }),
    );
  }

  let selectType = null;
  if (selectMode?.mode === 'checkbox') {
    let onChange = onSelectedKeys;
    if (!onChange) {
      onChange = (keys: any) => {
        const { length } = dataSource;
        const rows: any[] = [];
        keys.forEach((key: any) => {
          for (let i = 0; i < length; i += 1) {
            if (key === dataSource[i][rowKey]) {
              rows.push(dataSource[i]);
              break;
            }
          }
        });
        changeSelectedRows(keys, rows);
      };
    }

    selectType = features.treeSelect({
      tree: dataSource,
      rootKey: 'root',
      value: selectedRowKeys || [],
      onChange,
      checkboxColumn: { lock: true },
      highlightRowWhenSelected: true,
      clickArea: 'cell',
      checkedStrategy: 'all',
      ...selectMode,
    });
  } else if (selectMode?.mode === 'radio') {
    selectType = features.singleSelect({
      highlightRowWhenSelected: true,
      clickArea: 'row',
      ...selectMode,
    });
  } else if (selectMode) {
    selectType = features.singleSelect(selectMode);
  }

  if (selectType) {
    pipeline.use(selectType);
  }

  const tableProp = useMemo(() => {
    return {
      isLoading: loading,
      useVirtual: 'auto',
      useOuterBorder: true,
      // defaultColumnWidth: 100,
      estimatedRowHeight: 39,
      handles,
      style: { height: tableWrapper?.current?.clientHeight - theadHeight, overflow: 'auto' },
      // scroll: { x: '100%', y: tableHeight - theadHeight },
      ...pipeline.getProps(),
      ...tableOptions,
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
          <RenderTable tableProps={tableProp} />
        </div>
        <FooterPane {...footer} pageInfo={pageInfo} changePage={handles.changePage.bind(handles)} />
        {children}
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(TreePane);
