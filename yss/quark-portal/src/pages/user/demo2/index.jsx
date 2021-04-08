import React, {
  Component,
  PureComponent,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  memo,
  useMemo,
} from 'react';
import ModalAdd from './add-list/index';
// import QuarkTable from '@/components/QuarkTable';

import { Button, Form, Table, Input, Select, Row, Col, message, Pagination, Dropdown } from 'antd';
import BaseService from '@/handles/BaseService';

const columns = [
  {
    title: '主题代码',
    dataIndex: 'mainCode',
    key: 'mainCode',
    width: 100,
    fixed: 'left',
    sorter: 1,

    search: 1,
    resizable: 1,
    // index: 1,
    hidden: 0,
    export: 1,
    widget: 'input',
    // selectOption: {},
    // filters: [
    //   { text: 'Joe', value: 'Joe' },
    //   { text: 'Jim', value: 'Jim' },
    // ],
    // filteredValue: filteredInfo.mainCode || null,
    onFilter: (value, record) => record.mainCode.includes(value),
  },
  {
    title: '主题名称',
    dataIndex: 'mainName',
    key: 'mainName',
    width: 100,
    search: 1,
    sortable: 1,
    resizable: 1,
    show: 1,
    export: 1,
    widget: 'input',
    sorter: (a, b) => a.mainCode.length - b.mainCode.length,
  },
  {
    title: '主题类型',
    dataIndex: 'mainType',
    width: 120,
    key: 'mainType',
  },
  {
    title: '主题机构代码',
    key: 'oraCode',
    dataIndex: 'oraCode',
    width: 120,
  },
  {
    title: '统一信用代码',
    key: 'creditCode',
    dataIndex: 'creditCode',
    width: 150,
  },
  {
    title: '组织形式',
    key: 'oraStyle',
    width: 100,
    dataIndex: 'oraStyle',
  },

  {
    title: '主题机构代码',
    key: 'oraCode',
    width: 120,
    dataIndex: 'oraCode',
    fixed: 'right',
  },
];

// 子表搜索栏
const subTableSearchBar = [
  <Input type="text" key="1" label="指标名称" name="indexName" />,
  <Select label="监控状态" key="2" name="monitorStatus1">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
  <Select label="监控状态" key="3" name="monitorStatus2">
    <Select.Option value="rmb">RMB</Select.Option>
    <Select.Option value="dollar">Dollar</Select.Option>
  </Select>,
];

const buttons = [
  {
    text: '增加',
    onClick: () => {
      console.log('adddddd');
    },
    disabled: (selects) => {
      return false;
    },
  },
  {
    text: '删除',
    onClick: () => {
      console.log('delete');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
  {
    text: '修改',
    onClick: () => {
      console.log('edit');
    },
    disabled: (selects) => {
      return selects.length !== 1;
    },
  },
  {
    text: '审核',
    onClick: () => {
      console.log('check');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
  {
    text: '反审核',
    onClick: () => {
      console.log('uncheck');
    },
    disabled: (selects) => {
      return selects.length < 1;
    },
  },
];

const service = new BaseService({ base: '/api/server' });

// 搜索栏
class Searchbar extends PureComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    this.resetForm = this.resetForm.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  resetForm() {
    this.formRef.current.resetFields();
  }

  componentDidMount() {
    const { setSearchForm } = this.props;
    setSearchForm(this.formRef.current);
  }

  render() {
    const { formItems = [], query, pageInfo } = this.props;
    console.log(222, '搜索栏渲染');
    return (
      <Form ref={this.formRef} layout="inline" className="px-2">
        {formItems.length > 0 && (
          <Row gutter={[0, 16]} style={{ width: '100%', margin: 0 }}>
            {formItems.map((comp, index) => {
              return (
                <Col span={6} key={index}>
                  <Form.Item
                    label={comp.props.label}
                    name={comp.props.name}
                    key={index}
                    labelCol={{
                      flex: `0 0 80px`,
                    }}
                  >
                    {comp}
                  </Form.Item>
                </Col>
              );
            })}
            <Col span={6} className="text-end pr-4">
              <Button onClick={this.resetForm} style={{ border: '1px solid #D9D9D9' }}>
                重置
              </Button>
              <Button
                type="primary"
                onClick={async () => {
                  const form = this.formRef.current.getFieldsValue();
                  const params = { ...pageInfo, ...form };
                  query(params);
                }}
              >
                查询
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    );
  }
}

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const { selectedRowKeys } = nextProps;

    return selectedRowKeys.length !== this.props.selectedRowKeys.length;
  }
  render() {
    const { selectedRowKeys } = this.props;
    console.log(222, '按钮渲染', selectedRowKeys);
    return (
      <>
        {buttons.map((btn, i) => {
          return (
            <Button
              disabled={btn.disabled(selectedRowKeys)}
              key={i}
              onClick={btn.onClick}
              type="text"
            >
              {btn.text}
            </Button>
          );
        })}
      </>
    );
  }
}

export default class Demo2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      loading: false,
      selectedRowKeys: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 20,
        pageTotal: 0,
      },
      searchForm: null,
    };

    this.query = this.query.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  showUncheck(row, index) {
    return row.checkState == 0 ? 'text-warning' : '';
  }

  async query(params) {
    console.log('~~~~~~~~~~~~查询~~~~~~~~~~~~~~~');
    this.setState({
      loading: true,
    });
    const result = await service.query(params);

    this.setState({
      loading: false,
      selectedRowKeys: [],
      dataSource: result.data.list,
      pageInfo: {
        ...this.state.pageInfo,
        pageTotal: result.data.total,
      },
    });
    return result;
  }

  onPageChange(pageNo, pageSize) {
    const form = this.state.searchForm.getFieldsValue();
    this.setState(
      () => {
        return {
          pageInfo: {
            ...this.state.pageInfo,
            pageSize,
            pageNo,
          },
        };
      },
      () => {
        this.query({ pageNo, pageSize, ...form });
      },
    );
  }

  componentDidMount() {
    (async () => {
      const result = await this.query(this.pageInfo);
    })();
  }

  render() {
    const { dataSource, loading, selectedRowKeys, pageInfo } = this.state;
    console.log('------Demo 2');
    return (
      <>
        <header className="a-card-header" style={{ paddingRight: 0 }}>
          <Searchbar
            formItems={subTableSearchBar}
            query={this.query}
            setSearchForm={(searchForm) => {
              this.setState({
                searchForm,
              });
            }}
            pageInfo={this.state.pageInfo}
          />
          <Toolbar buttons={buttons} selectedRowKeys={selectedRowKeys} />
        </header>
        <Table
          rowClassName={this.showUncheck}
          loading={loading}
          // size="small"
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys });
            },
          }}
          pagination={false}
          scroll={{ x: 'max-content', y: 560 }}
        />
        <Pagination
          style={{ height: 22, lineHeight: '20px' }}
          size="small"
          showSizeChanger
          showQuickJumper
          pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
          defaultPageSize={20}
          pageSize={pageInfo.pageSize}
          defaultCurrent={pageInfo.pageNo}
          total={pageInfo.pageTotal}
          showTotal={(total) => `共 ${total} 项`}
          current={pageInfo.pageNo}
          onChange={this.onPageChange}
        />
      </>
    );
  }
}
