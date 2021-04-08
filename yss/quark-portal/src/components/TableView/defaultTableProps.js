import DefaultService from './defaultService'


export default function defaultTableProps (handles, { setCurrentRow, selections, rowKey }) {
  const defaultService = new DefaultService(handles.url);
  const rowClassName = (record, index) => {
    let flag = false;
    Object.keys(record).map((key) => {
      if (record['oraCode'] < 3000000) {
        flag = true;
      }
    });
    return flag ? 'text-warning' : '';
  };

  const rowSelection = {
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // console.log(selectedRowKeys);
      // console.log(selectedRows);
      setCurrentRow(selectedRows);
      // if (selectedRows.length < 1) {
      //   setCurrentRow(null);
      // } else {
      //   setCurrentRow(selectedRows[selectedRows.length - 1]);
      // }
    },
    selectedRows: selections,
    selectedRowKeys: selections.map(item => item[rowKey]),
    getCheckboxProps: (record) => ({
      disabled: record['oraCode'] > 8000000,
      name: record.name,
    }),
  };

  /**
   * 表格Row数据鼠标事件
   * @param {*} record
   * @param {*} index
   */
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        // console.log('onClick', record, index, event);
        // setCurrentRow(record);
      },
      // doubleClick调用detail
      onDoubleClick: async (event) => {
        // console.log('onDoubleClick', record, index, event);
        const params = {}
        params[rowKey] = record[rowKey];
        const detailRes = await defaultService.detail(params);
        handles.detail && handles.detail(event, record, index, detailRes);
      },
      onContextMenu: (event) => {
        console.log('onContextMenu', record, index, event);
      },
      // onMouseEnter: (event) => {
      //   console.log('onMouseEnter', record, event);
      // },
      // onMouseLeave: (event) => {
      //   console.log('onMouseLeave', record, event);
      // },
    };
  };

  /**
   * 表格表头单击事件
   * @param {*} column
   * @param {*} index
   */
  const onHeaderRow = (column, index) => {
    return {
      onClick: (event) => {
        console.log('onHeaderRow', column, index, event);
      },
    };
  };

  return {
    handles: handles,
    bordered: true,
    pagination: false,
    onRow,
    onHeaderRow,
    rowSelection,
    rowClassName,
  };
}
