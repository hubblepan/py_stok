import React, { useCallback, useLayoutEffect } from 'react';

import { Button, Checkbox, Radio, Input, Select, Spin } from 'antd';

import type { LoadingContentWrapperProps } from 'ali-react-table';
import { BaseTable, Classes, useTablePipeline, features } from 'ali-react-table';
import styled from 'styled-components';
import BeanUtil from '@/utils/BeanUtil';

const StyledBaseTable = (styled(BaseTable)`
  --line-height: 1.5715;
  --font-size: 14px;
  --row-height: 22px;
  --header-row-height: 36px;
  --cell-padding: 8px;

  --lock-shadow: rgba(0, 0, 0, 0.2) 0 0 10px 0px;
  --border-color: #f0f0f0;
  --color: rgba(0, 0, 0, 0.85);
  --bgcolor: white;
  --hover-bgcolor: #fafafa;
  --highlight-bgcolor: #fafafa;
  --header-color: rgba(0, 0, 0, 0.85);
  --header-bgcolor: #fafafa;
  --header-hover-bgcolor: #f5f5f5;
  --header-highlight-bgcolor: #f5f5f5;

  &.dark {
    --lock-shadow: black 0 0px 6px 2px;
    --border-color: #f0f0f0;
    --color: rgba(255, 255, 255, 0.65);
    --bgcolor: #141414;
    --hover-bgcolor: #262626;
    --highlight-bgcolor: #262626;
    --header-color: rgba(255, 255, 255, 0.85);
    --header-bgcolor: #1d1d1d;
    --hover-hover-bgcolor: #222;
    --header-highlight-bgcolor: #222;
  }

  &.compact {
    --cell-padding: 8px;
  }

  td {
    transition: background 0.3s;
  }

  th {
    font-weight: 500;
  }

  .${Classes.lockShadowMask} {
    .${Classes.lockShadow} {
      transition: box-shadow 0.3s;
    }
  }

  &:not(.bordered) {
    --cell-border-vertical: none;
    --header-cell-border-vertical: none;

    thead > tr.first th {
      border-top: none;
    }
  }
  &:not(.has-footer) tbody tr.last td {
    // border-bottom: var(--cell-border-horizontal) !important;
  }
  &,
  .art-horizontal-scroll-container {
    ::-webkit-scrollbar {
      background: #fff;
    }
  }
` as unknown) as typeof BaseTable;

const AntEmptyContent = React.memo(() => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="41"
      className="ant-empty-img-simple"
      viewBox="0 0 64 41"
    >
      <g fill="none" fillRule="evenodd" transform="translate(0 1)">
        <ellipse cx="32" cy="33" className="ant-empty-img-simple-ellipse" rx="32" ry="7" />
        <g fillRule="nonzero" className="ant-empty-img-simple-g">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            className="ant-empty-img-simple-path"
          />
        </g>
      </g>
    </svg>
    <div className="empty-tips" style={{ marginTop: 8, color: 'rgba(0,0,0,.25)', fontSize: 14 }}>
      暂无数据
    </div>
  </>
));

function AntLoadingContentWrapper({ children, visible }: LoadingContentWrapperProps) {
  return (
    <div className="ant-loading-content-wrapper" style={{ opacity: visible ? 0.6 : undefined }}>
      {children}
    </div>
  );
}

function BlockSpin() {
  return <Spin style={{ display: 'block' }} />;
}

/** Ant Design 风格的基础表格组件.
 *
 * AntdBaseTable 在 ali-react-table 提供的 BaseTable 基础上定制了默认的表格样式
 * * `className="bordered"` 带边框样式
 * * `className="compact"` 紧凑样式
 * * `className="dark"` 暗色主题
 *
 * 其他样式暂未提供，可以根据需求自行添加~
 * */
export const QuarkTree = (props: any) => {
  const {
    rowKey = 'id',
    selectMode = { mode: 'checkbox', selectType: 'treeSelect' },
    useVirtual = 'auto',
    useOuterBorder = true,
    defaultColumnWidth = 100,
    estimatedRowHeight = 39,
    handles,
    loading,
    tableHeight,
    dataSource,
    columns,
    getRowProps,
    treeMode,
    sortMode,
    selectedRowKeys,
    expandedRowKeys,
    featuresOptions,
    tableWrapper,
    ...tableProps
  } = props;

  useLayoutEffect(() => {
    if (tableHeight > 0 && tableWrapper?.current) {
      const domStyle = tableWrapper.current.querySelector('.art-horizontal-scroll-container')
        ?.style;
      domStyle.minHeight = `${tableHeight - 41}px`;
    }
  });
  const pipeline = useTablePipeline({ components: { Checkbox, Radio, Button, Input, Select } });
  pipeline
    .input({
      dataSource,
      columns: columns.map((column: any) => {
        const { sorter } = column;
        const options: any = {};
        if (sorter) {
          options.sortable = sorter;
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
          features: options,
          ...column,
        };
      }),
    })
    .primaryKey(rowKey)
    .appendRowPropsGetter((record, rowIndex) => {
      const rowProps: any = {};
      if (!rowProps.className && (record.checkState === 0 || record.auditState === 0)) {
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
  } else if (expandedRowKeys && handles?.setExpandedRowKeys) {
    pipeline.use(
      features.treeMode({
        openKeys: expandedRowKeys,
        onChangeOpenKeys: handles.setExpandedRowKeys,
      }),
    );
  }

  const selectChildren = useCallback(
    (key, selectRows, children) => {
      const { length } = children;
      for (let i = 0; i < length; i += 1) {
        const item = children[i];
        if (key === item[rowKey]) {
          selectRows.push(item);
          return true;
        }
        if (item.children) {
          if (selectChildren(key, selectRows, item.children)) {
            return true;
          }
        }
      }
      return false;
    },
    [rowKey],
  );

  let selectType = null;
  if (selectMode?.mode === 'checkbox') {
    let onChange = handles?.onSelectedKeys;
    if (!onChange) {
      onChange = (keys: any) => {
        const { length } = dataSource;
        const rows: any[] = [];
        keys.forEach((key: any) => {
          for (let i = 0; i < length; i += 1) {
            const item = dataSource[i];
            if (key === item[rowKey]) {
              rows.push(item);
              break;
            } else if (item.children) {
              if (selectChildren(key, rows, item.children)) {
                break;
              }
            }
          }
        });
        handles?.changeSelectedRows(keys, rows);
      };
    }
    const method = selectMode.selectType || 'treeSelect';
    selectType = features[method]({
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
  } else if (selectMode && selectMode.selectType) {
    selectType = features[selectMode.selectType](selectMode);
  }

  if (selectType) {
    pipeline.use(selectType);
  }

  if (featuresOptions) {
    Object.keys(featuresOptions).forEach((key) => {
      const value = features[key](featuresOptions[key]);
      pipeline.use(value);
    });
  }
  if (tableHeight < 1) {
    return null;
  }
  return (
    <StyledBaseTable
      className="bordered compact"
      isLoading={loading}
      useVirtual={useVirtual}
      useOuterBorder={useOuterBorder}
      estimatedRowHeight={estimatedRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      style={{ height: tableHeight, overflow: 'auto' }}
      components={{
        EmptyContent: AntEmptyContent,
        LoadingContentWrapper: AntLoadingContentWrapper,
        LoadingIcon: BlockSpin,
        ...props.components,
      }}
      {...pipeline.getProps()}
      {...tableProps}
    />
  );
};

export default QuarkTree;
