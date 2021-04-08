// 左侧搜索树
import React, { useEffect, useState } from 'react';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import MsgBox from '@/utils/MsgBox';
import { Button, Input, Table, Dropdown, Menu, message, Modal, Form, TreeSelect } from 'antd';
import QuarkTable from '@/components/QuarkTable';
import request from '@/utils/request';
import styles from './style.less';

function TreeData(props) {
  const {
    columns,
    tableData,
    rowSelection: { selectedRowKeys },
  } = props;

  // checkStrictly设为false--"父子"选中状态关联
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <>
      <QuarkTable
        {...props}
        columns={columns}
        pagination={false}
        style={{ width: '100%' }}
        // rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={tableData}
      />
    </>
  );
}

const AddModal = (props) => {
  const {
    title,
    addVisible,
    setAddVisible,
    query,
    setMasterData,
    classifyNode,
    clearSelections,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [parentCode, setParentCode] = useState('');
  // const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    // form.setFieldsValue(classifyNode)
    if (addVisible) {
      form.resetFields();
      request
        .get('/ocp/indexinfo/indextype/tree')
        .then((response) => {
          setTreeData(response.data.list);
          setParentCode(classifyNode.typeP);
        })
        .catch(() => {});
    }
  }, [addVisible]);

  // console.log(treeData);
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      // 添加id属性
      values.id = classifyNode.id || '';
      console.log('Success:', values);
      setConfirmLoading(true);
      await request.get('/ocp/indexinfo/indextype/save', { params: values });
      setConfirmLoading(false);
      setAddVisible(false);
      fetchMasterTable();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onChange = (parentCode) => {
    setParentCode(parentCode);
  };
  const fetchMasterTable = async () => {
    const masterList = await query();
    setMasterData(masterList.data.list);
    clearSelections();
  };
  return (
    <>
      <Modal
        title={title}
        visible={addVisible}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setAddVisible(false);
        }}
        onOk={onCheck}
        width={600}
      >
        <Form
          form={form}
          colon={false}
          className={styles.addForm}
          labelAlign="right"
          initialValues={classifyNode}
        >
          <Form.Item
            name="typeCode"
            label="分类代码"
            rules={[
              {
                required: true,
                message: '请输入分类代码',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="typeName"
            label="分类名称"
            rules={[
              {
                required: true,
                message: '请输入分类名称',
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item name="typeP" label="父级分类">
            <TreeSelect
              value={parentCode}
              onChange={onChange}
              treeData={treeData}
              placeholder=""
              treeDefaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const TreeTable = (props) => {
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('新增指标分类');
  const [classifyNode, setClassifyNode] = useState({});
  const {
    rowSelection: { selectedRowKeys },
    query,
    setMasterData,
    clearSelections,
    selectedRows,
    tableData,
    // expandable: { expandedRowKeys },
    // setExpandedRowKeys,
    rowKey,
    columns,
  } = props;

  const clickMenu = ({ item, key }) => {
    switch (key) {
      case 'add':
        setModalTitle('新增指标分类');
        setClassifyNode({ typeCode: '', typeName: '', typeP: '' });
        setAddVisible(true);
        break;
      case 'edit':
        setModalTitle('修改指标分类');
        let classifyCount = 0;
        selectedRows.forEach((item) => {
          if (!item.isLeaf) {
            classifyCount++;
          }
        });
        if (classifyCount === 0) {
          MsgBox.message.info('请至少选择一个分类');
          return;
        }
        if (classifyCount > 1) {
          MsgBox.message.info('仅能修改单个分类');
          return;
        }
        setClassifyNode(selectedRows.find((item) => !item.isLeaf));
        setAddVisible(true);
        break;
      case 'delete':
        classifyCount = 0;
        const classifyId = [];
        selectedRows.forEach((item) => {
          if (!item.isLeaf) {
            classifyCount++;
            classifyId.push(item.id);
          }
        });
        if (classifyCount === 0) {
          MsgBox.message.info('请至少选择一个分类');
          return;
        }
        Modal.confirm({
          title: '删除',
          content: '是否确定删除该产品分类，删除后不可恢复。',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            const id = { id: classifyId.join(',') };
            // request.get('/ocp/indexinfo/indextype/delete',{params:classifyId.join(',')})
            return new Promise((resolve, reject) => {
              request
                .get('/ocp/indexinfo/indextype/delete', { params: id })
                .then(function (response) {
                  resolve();
                  fetchMasterTable();
                })
                .catch(function (error) {
                  reject();
                });
            }).catch(() => {});
          },
        });
        break;
      default:
        break;
    }
  };
  const fetchMasterTable = async () => {
    const masterList = await query();
    setMasterData(masterList.data.list);
    clearSelections();
  };
  const menu = (
    <Menu onClick={clickMenu}>
      <Menu.Item key="add">增加</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
      <Menu.Item key="edit">修改</Menu.Item>
    </Menu>
  );
  let count = 0;
  selectedRows.forEach((row) => {
    if (row.isLeaf !== false) {
      count++;
    }
  });

  return (
    <>
      {/* <div
        className="a-card-header"
        style={{
          display: 'flex',
        }}
      >
        <AddModal
        // classifyNode={classifyNode}
        // title={modalTitle}
        // query={query}
        // setMasterData={setMasterData}
        // setAddVisible={setAddVisible}
        // addVisible={addVisible}
        // clearSelections={clearSelections}
        />
      </div> */}
      <div className="a-card-body px-2">
        <TreeData {...props} />
      </div>
      <footer className="a-card-footer">
        <div>
          已选&nbsp;<span style={{ color: 'blue' }}>{count}</span>&nbsp;项
        </div>
      </footer>
    </>
  );
};

export default TreeTable;
