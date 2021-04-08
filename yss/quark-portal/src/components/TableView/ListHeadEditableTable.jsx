import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Checkbox } from 'antd';


const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      // handleSave({ ...record, ...values });
    } catch (errInfo) {
      // console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if(true) {
      // console.log("dataIndex="+dataIndex);
      if(dataIndex == 'isShow' || dataIndex == 'isExport' || dataIndex == 'isFrozen' ) {
        childNode =
        (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <Checkbox ref={inputRef}  />
        </Form.Item>
        )
      } else {
        // console.log("record[dataIndex]="+record[dataIndex]);
        childNode =
        (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} 是必填项`,
            },
          ]}
        >
          <Input value={record[dataIndex]} ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
        )
      }
    } else {  // 非编辑状态
      childNode =
      (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
      loading: props.loading,
    };
    this.columns = [
      {
        title: '序号',
        key: 'id',
        dataIndex: 'id',
        resizable: true,
        render: (text, record, index) => `${index + 1}` ,
      },
      {
        title: '字段代码',
        key: 'key',
        dataIndex: 'key',
        resizable: true,
        hide: true,
      },
      {
        title: '字段名称',
        key: 'text',
        dataIndex: 'text',
        resizable: true,
      },
      {
        title: '是否可见',
        key: 'isShow',
        dataIndex: 'isShow',
        resizable: true,
        editable: true,
      },
      {
        title: '是否导出',
        key: 'isExport',
        dataIndex: 'isExport',
        resizable: true,
        editable: true,
      },
      {
        title: '是否固定',
        key: 'isFrozen',
        dataIndex: 'isFrozen',
        resizable: true,
        editable: true,
      },
      {
        title: '列宽',
        key: 'isFrozen',
        dataIndex: 'width',
        resizable: true,
        editable: true,
      },
    ];

  }

  /**
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  * */

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          loading={this.state.loading}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default EditableTable;
