import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import css from '../index.less';
import NoData from './NoData';

// import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';
// import { SettingOutlined, CopyOutlined } from '@ant-design/icons';

// import { PageHeaderWrapper, ProCard } from '@ant-design/pro-layout';
// import {
//   Card,
//   Button,
//   Form,
//   Input,
//   Select,
//   TimePicker,
//   InputNumber,
//   Divider,
//   Layout,
//   Anchor,
//   TreeSelect,
//   Modal,
//   Popconfirm,
//   message,
// } from 'antd';
// import moment from 'moment';
// import TableTreeDropdown from './tableTreeDropdown';
// import { submit } from '../../../services/chartSetting';

import { Table, Pagination, Modal, Tag, Space } from 'antd';
import { queryDetail } from '@/services/queryDetail';

let DetailModal = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showDialog = useCallback(() => showDialogFunc(), []);
  const hiddenDialog = useCallback(() => hiddenDialogFunc(), []);
  // 查询条件参数
  const [parameter, setParameter] = useState(props.parameter);
  // 详情对话框标题
  const [modalTitle, setModalTitle] = useState();
  // const [conditionParam, setConditionParam] = useState(props.parameter.conditionParam);
  // 查询的分页参数
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => {
      return `共 ${total} 条`;
    },
  });
  // 查询的url
  // const [url, setUrl] = useState(props.parameter.url);
  // 查询列表的columns
  const [columns, setColumns] = useState(props.columns);

  const [listData, setListData] = useState([]);

  let { initialValues, title } = props;
  const modalWidth = '1200px';

  const showDialogFunc = () => {
    setVisible(true);
    //console.log("DetailModal setVisible true  ");
  };

  const hiddenDialogFunc = () => {
    setVisible(false);
    setListData([]);
    setTableLoading(true);
    setPagination({
      current: 1,
      pageSize: 100,
      total: 0,
      showSizeChanger: true,
      showTotal: (total) => {
        return `共 ${total} 条`;
      },
    });
    setColumns([]);
    props.setModalHidden();
  };

  const onOk = async (e) => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    showDialog,
  }));

  //创建序号，根据分页信息
  const snCreate = (text,record,index) => {
    return(
      <span>{(pagination.current-1)*pagination.pageSize+index+1}</span>
    );
  };

  // 查询列表数据
  const queryList = async (parameter) => {
    //console.log("DetailModal querylist start ");
    const result = await queryDetail(parameter);
    //console.log("DetailModal querylist end ");
    pagination.total = result.total;
    parameter.columns[0].render = snCreate;
    setColumns(parameter.columns);
    setPagination(pagination);
    setListData(result.list);
    setTableLoading(false);
  };

  useEffect(() => {
    //console.log("DetailModal useEffect 1  ");
    if(visible === true){
      //console.log("DetailModal useEffect 2 ");
      setParameter(props.parameter);

      if (props.parameter && props.parameter.url) {
        // 设置列头
        setColumns(props.parameter.columns);
        // 设置标题
        setModalTitle(props.parameter.setModalTitle);
        props.parameter.conditionParam.pageSize = pagination.pageSize;
        props.parameter.conditionParam.pageNo = pagination.current;
        queryList(props.parameter);
        setLoading(true);
      }
    }
  }, [props.parameter, visible]);

  const onChangePage = (currentPage, pageSize) => {
    setTableLoading(true);
    parameter.conditionParam.pageSize = pageSize;
    parameter.conditionParam.pageNo = currentPage;
    setParameter(parameter);
    pagination.current = currentPage;
    pagination.pageSize = pageSize;
    setPagination(pagination);
    queryList(parameter);
  };

  const onShowSizeChange = (current, size) => {
    setTableLoading(true);
    parameter.conditionParam.pageSize = size;
    parameter.conditionParam.pageNo = 1;
    setParameter(parameter);
    pagination.current = 1;
    pagination.pageSize = size;
    setPagination(pagination);
    queryList(parameter);
  };

  let tableHtml = '';
  if (loading) {
    tableHtml = (
      <Table
        columns={columns}
        dataSource={listData}
        locale={ tableLoading?{ emptyText: <div style={{height: '140px'}} /> }:{ emptyText:<NoData /> }}
        bordered
        pagination={false}
        scroll={{ x: 1600, y: 635 }}
        loading={tableLoading}
        rowKey={(record, index) => index}
      />
    );
  }
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={hiddenDialog}
      confirmLoading={confirmLoading}
      wrapClassName={css.classWrapper}
      title={title}
      bodyStyle={{ padding: 0 }}
      width={modalWidth}
      centered
      forceRender
      initialValues={initialValues}
      footer={null}
      destroyOnClose
    >
      {tableHtml}
      <Pagination
        {...pagination}
        onChange={onChangePage}
        onShowSizeChange={onShowSizeChange}
        style={{ paddingTop: 8, paddingBottom: 16, paddingRight: 16, textAlign: 'right' }}
      />
    </Modal>
  );
};
DetailModal = forwardRef(DetailModal);

export default DetailModal;
