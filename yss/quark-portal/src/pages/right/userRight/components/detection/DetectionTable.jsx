import { Form, DatePicker, Table, Button, Empty, Progress } from 'antd';
import styles from '../style.less';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import request from '@/utils/request';
import { detect } from './DetectionService';
import DiyPogress from '../DiyPogress';
import QuarkTable from '@/components/QuarkTable';

const DetectionTable = (props) => {
  const { testVisible, idtarget, idcombination } = props;
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [globalPagination, setGlobalPagination] = useState({ current: 1, pageSize: 10 });
  const columns = [
    {
      title: '检测结果',
      key: 'result',
      dataIndex: 'result',
      className: styles.textwrap,
      render: (text, row, index) => {
        if (row.success) {
          // return <><CheckCircleOutlined className={'text-success mr-2'} />{text}</>;
          return {
            children: (
              <>
                <CheckCircleOutlined className="text-success mr-2" />
                {text}
              </>
            ),
            props: {
              rowSpan: row.rowSpan || 0,
            },
          };
        }
        return {
          children: (
            <>
              <CloseCircleOutlined className="text-danger mr-2" />
              {text}
            </>
          ),
          props: {
            rowSpan: row.rowSpan || 0,
          },
        };
      },
      width: 370,
      filters: [
        {
          text: '成功',
          value: '1',
        },
        {
          text: '失败',
          value: '0',
        },
      ],
    },
    {
      title: '检测详情',
      key: 'detail',
      dataIndex: 'detail',
      className: styles.textwrap,
      ellipsis: false,
      render: (text, row, index) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    if (testVisible) {
      form.resetFields();
    } else {
      setDataSource([]);
      setTotal(0);
    }
  }, [testVisible]);
  const LoadingProgress = (props) => {
    return (
      <div className={styles.loadingProgress}>
        <div className={styles.text}>正在努力检测中，请耐心等待结果！😊</div>
        <DiyPogress percent={80}></DiyPogress>
      </div>
    );
  };
  const onSearch = async (pagination, filters) => {
    try {
      console.log(pagination);
      console.log(filters);
      const query = await form.validateFields();
      query.bizDate = moment(query.bizDate).format('YYYY-MM-DD');
      query.idtarget = idtarget;
      query.idcombination = idcombination;
      if (!pagination) {
        pagination = {
          current: 1,
          pageSize: globalPagination.pageSize,
        };
      }
      fetchDetectionList({ query, pagination, filters });
    } catch (e) {}
  };
  const fetchDetectionList = ({ pagination = {}, filters = {}, query = {} }) => {
    const params = {
      // 过滤"成功"和"失败"
      success: filters.result ? filters.result.join(',') : '',
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      ...query,
    };
    console.log('fetchDetectionList');
    console.log(params);
    setLoading(true);
    setTimeout(() => {
      detect(params)
        .then((response) => {
          console.log('detect');
          console.log(response);
          setLoading(false);
          // 重新设置total，会改变分页器
          setGlobalPagination({
            ...pagination,
            total: response.data.total,
          });
          // setTotal(response.data.total)
          setDataSource(response.data.list);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 1000);
  };
  const onTableChange = (pagination, filters) => {
    // 筛选的字段值是存在filters.result数组中。当无筛选时，filters为空数组
    onSearch(pagination, filters);
    // fetchDetectionList({pagination,filters})
  };
  return (
    <>
      <div className={styles.targetTable}>
        <Form form={form} layout="inline" className={styles.detectForm}>
          <Form.Item
            label="业务日期"
            name="bizDate"
            rules={[
              {
                required: true,
                message: '请输入业务日期',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                onSearch();
              }}
            >
              执行
            </Button>
          </Form.Item>
        </Form>
        <div className={`${loading ? 'show' : 'hidden'} ${styles.loadingContainer}`}>
          <LoadingProgress></LoadingProgress>
        </div>
        <QuarkTable
          className={!loading ? 'show' : 'hidden'}
          bordered
          rowSelection={false}
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <>
                    <span>暂无检测数据</span>
                    <br />
                    <span>
                      您可点击<span className="text-primary">执行按钮</span>进行检测
                    </span>
                  </>
                }
              />
            ),
          }}
          scroll={{ y: 'calc(100% - 39px)' }}
          onChange={onTableChange}
          pagination={{
            ...globalPagination,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total, range) => `共 ${total} 条`,
            hideOnSinglePage: false,
            // onChange:(page, pageSize)=>{fetchDetectionList({page, pageSize})},
            // onShowSizeChange:(current, size)=>{fetchDetectionList({page:current, pageSize:size})}
          }}
        />
      </div>
    </>
  );
};
export default DetectionTable;
