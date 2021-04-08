import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

export default function baseTableProps (props) {
  const {
    bordered = 'bordered',
    rowKey = 'id',
    size = 'small',
    pagination = false,
    rowSelection,
    scroll,
    expandable,
    dataSource,
    ...rest
  } = props;

  const rowClassName = (record) => {
    return record.checkState === 0 ? 'text-warning' : '';
  };

  const _rowSelection =
    rowSelection === false
      ? null
      : {
        checkStrictly: false,
        columnWidth: 46,
        fixed: true,
        sticky: 'sticky',
        tableLayout: 'fixed',
        type: 'checkbox',
        getCheckboxProps: (record) => ({
          disabled: record.selectable === false,
          name: record.name,
        }),
        ...rowSelection,
      };

  const _scroll = scroll
    ? {
      scrollToFirstRowOnChange: true,
      ...scroll,
    }
    : { scrollToFirstRowOnChange: true };

  let _expandable = null;
  if (expandable) {
    const { expandedRowKeys, setExpandedRowKeys } = expandable;
    let onExpand = null;
    if (expandedRowKeys && setExpandedRowKeys) {
      onExpand = (expanded, record) => {
        if (expanded) {
          const expandedRows = expandedRowKeys.slice(0, expandedRowKeys.length);
          expandedRows.push(record[rowKey]);
          setExpandedRowKeys(expandedRows);
        } else {
          setExpandedRowKeys(
            expandedRowKeys.filter((item) => {
              return item !== record[rowKey];
            }),
          );
        }
      };
    }
    _expandable = {
      defaultExpandAllRows: true,
      expandIcon: ({ expanded, onExpand, record }) => {
        if (record.isLeaf) {
          return <span className="mr-2 invisible" />;
        }
        return expanded ? (
          <CaretDownOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
        ) : (
            <CaretRightOutlined className="mr-2" onClick={(e) => onExpand(record, e)} />
          );
      },
      onExpand,
      ...expandable,
    };
    // console.log('_expandable');
    // console.log(_expandable);
  }

  return {
    bordered,
    rowKey,
    size,
    pagination,
    // onRow,
    // onHeaderRow,
    rowClassName,
    dataSource,
    rowSelection: _rowSelection,
    scroll: _scroll,
    expandable: _expandable,
    ...rest,
  };
}
