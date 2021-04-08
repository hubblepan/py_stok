import React, { Component, PureComponent } from 'react';
import { Resizable } from 'react-resizable';
import { Table } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

import baseTableProps from '../../handles/baseTableProps';
import ListHeadModal from '../TableView/ListHeadModal';

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement((props) => <th {...props} />);
const SortableContainer = sortableContainer((props) => <tr {...props} />);

const ResizableTitle = (props) => {
  const { onResize, width, resizable, ...restProps } = props;
  restProps.style = { ...restProps.style };
  if (!width || !resizable) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ userSelect: 'none' }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class QuarkTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: 1,
      listheadModalVisible: false,
      listheadData: [],
      loading: false,
      handles: props.handles,
    };
    this.updateColumns(props.resizable);
  }

  updateColumns(resizable) {
    if (resizable) {
      this.columns = this.props.columns.map((col, index) => {
        return {
          ...col,
          onHeaderCell: (column) => ({
            width: column.width,
            // search: column.search,
            sortable: column.sortable,
            resizable: column.resizable,
            index: column.index,
            // show: column.show,
            // export: column.export,
            onResize: this.handleResize(index),
          }),
        };
      })
    } else {
      this.columns = this.props.columns;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // 典型用法（不要忘记比较 props）：
    const {resizable} = this.props;
    this.updateColumns(resizable);
    if (prevProps.columns !== this.props.columns) {
      this.setState((pre) => ({
        trigger: pre.trigger + 1
      }));

    }
  }


  // onSortEnd = ({ oldIndex, newIndex }) => {
  //   this.setState(({ columns }) => ({
  //     columns: arrayMove(columns, oldIndex, newIndex),
  //   }));
  // };

  DraggableCell = (props) => (
    <ResizableTitle
      usedraghandle="true"
      helperclass="row-dragging"
      // onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableContainer = (props) => (
    <SortableContainer
      usedraghandle="true"
      helperclass="row-dragging"
      // onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  CellWrapper = (props) => {
    return (
      <td {...props}>
        <div className="cell-nowrap">{props.children}</div>
      </td>
    );
  };

  onHeaderRow = (column, index) => {
    return {
      /**
      onClick: (event) => {
        const method = this.handles && this.handles.onHeaderRowClick;
        method && method.call(this.handles, event, column, index);
      },
      * */
      onContextMenu: async (event) => {
        event.preventDefault();
        // this.setState({
        //   listheadModalVisible: true,
        // });
        const listHead = await this.state.handles.listHead.call(this.state.handles, event);
        console.log(`listHead==${JSON.stringify(listHead)}`);
        this.setState({
          listheadModalVisible: true,
          listheadData: listHead.data,
          loading: false,
        });
      },
      onMouseEnter: (event) => {
        // 鼠标移入行
        event.currentTarget.style.cursor = 'pointer';
      },
      onMouseLeave: (event) => {
        // event.currentTarget.style.cursor="wait";
      },
    };
  };

  setListheadModalVisible = () => {
    this.setState({
      listheadModalVisible: false,
      loading: false,
    });
  };

  components = {
    header: {
      cell: this.DraggableCell,
      // wrapper: DraggableContainer,
      row: this.DraggableContainer,
    },
    body: {
      cell: this.CellWrapper,
    },
  };

  handleResize = (index) => (e, { size }) => {
    const nextColumns = [...this.columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    this.columns = nextColumns;
    this.setState((pre) => ({
      trigger: pre.trigger + 1
    }));
  };

  render() {
    // let { resizable, columns } = this.props;
    // if (resizable !== false) {
    //   columns = this.state.columns.map((col, index) => {
    //     return {
    //       ...col,
    //       onHeaderCell: (column) => ({
    //         width: column.width,
    //         // search: column.search,
    //         sortable: column.sortable,
    //         resizable: column.resizable,
    //         index: column.index,
    //         // show: column.show,
    //         // export: column.export,
    //         onResize: this.handleResize(index),
    //       }),
    //     };
    //   });
    // }

    // let { listHead } = this.props;
    const tableProps = baseTableProps(this.props);
    tableProps.onHeaderRow = this.onHeaderRow; // 列头自定义

    const showListHeadModal = () => {
      let res = [];
      if (this.state.listheadModalVisible) {
        res = (
          <ListHeadModal
            listheadModalVisible={this.state.listheadModalVisible}
            setListheadModalVisible={this.setListheadModalVisible}
            columns={this.columns}
            loading={this.state.loading}
            listheadData={this.state.listheadData}
          />
        );
      } else {
        res = '';
      }
      return res;
    };

    return (
      <>
        <Table components={this.components} {...tableProps} columns={this.columns} />
        {showListHeadModal()}
      </>
    );
  }
}

export default QuarkTable;
