import React, { useEffect, useState } from 'react';
import { Form, Select, Input } from 'antd';
import QuarkModal from '@/components/QuarkModal';
import QuarkTable from '@/components/QuarkTable/index';
import AppContext from '@/utils/AppContext';
import fastConvert from '@/handles/fastConvert';
import MsgBox from '@/utils/MsgBox';
import { queryGroup, queryPort, queryPortOptional } from './SubAddModalService';

export default (props) => {
  const { visible, setVisible, selectedGroup, handles } = props;
  const [groupList, setGroupList] = useState([]);
  const [transferList, setTransferList] = useState([]);
  const [groupCode, setGroupCode] = useState('');
  const [form] = Form.useForm();

  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [portList, setPortList] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const fetchGroup = async () => {
    await queryGroup({})
      .then((response) => {
        setGroupList(response.data.dataList);
      })
      .catch(() => {});
    console.log('接收到的selectedGroup');
    console.log(selectedGroup);
    // setGroupCode(selectedGroup);
    // form.setFieldsValue()
    form.setFieldsValue({
      groupName: selectedGroup,
    });
  };
  const [loading, setLoading] = useState(false);
  const expandLevel = (expandedLevel = 0, dataSource) => {
    /**
     * 尤其注意：
     * 使用expandedRowKeys属性控制table的展开时，一定要和onExpand配合使用
     */
    let depth = 0;
    const newExpandedKeys = [];
    const expand = (treeData, currentLevel) => {
      // 根据expandedLevel来控制最大"展开层级"。为0代表"全部展开"
      if (currentLevel >= expandedLevel && expandedLevel) {
        return newExpandedKeys;
      }
      if (expandedLevel === 0) {
        // 初始"全部展开"时计算"最大层级"
        // console.log('计算最大层级');
        // console.log(currentLevel);
        // console.log(depth);
        depth = Math.max(depth, currentLevel);
      }
      // 递归遍历
      treeData.map((item) => {
        newExpandedKeys.push(item.c_PORT_CODE);
        // 但是要考虑到空分类的情况
        if (item.children || (!item.children && !item.isLeaf)) {
          expand(item.children || [], currentLevel + 1);
        }
      });
      return newExpandedKeys;
    };
    // console.log('递归前dataSource');
    // console.log(dataSource);
    setExpandedRowKeys(expand(dataSource, 1));
    // console.log('递归完成');
    // console.log(newExpandedKeys);
    // console.log('递归完成depth');
    // console.log(depth);
    if (expandedLevel === 0) {
      return depth;
    }
  };
  const fetchPort = () => {
    setLoading(true);
    Promise.all([queryPort(), queryPortOptional()])
      .then((response) => {
        const portList = response[0].data || [];
        const portCodeList = response[1].data || [];
        const list = portList.filter((item) => {
          return !portCodeList.includes(item.c_PORT_CODE);
        });
        const _list = fastConvert.list2Tree({
          list: list || [],
          pKey: 'c_PORT_CODE_P',
          key: 'c_PORT_CODE',
          isLeaf: (item) => {
            return item.dATA_TYPE && item.dATA_TYPE === 'PORT_TYPE';
          },
        });
        console.log('_list');
        console.log(_list);
        setPortList(_list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    // 使得portList自动展开
    expandLevel(0, portList);
  }, [portList]);
  useEffect(() => {
    if (visible) {
      fetchGroup();
      fetchPort();
    } else {
      setGroupCode('');
      setPortList([]);
      // setTargetKeys([]);
      // setTransferList([]);
      // setSelectedKeys([]);
    }
  }, [visible]);

  const portColumns = [
    {
      dataIndex: 'c_PORT_NAME_ST',
      title: '组合简称',
      width: 200,
    },
    {
      dataIndex: 'c_PORT_NAME',
      title: '组合名称',
    },
    {
      dataIndex: 'c_PORT_CODE',
      title: '组合代码',
      width: 110,
    },
    {
      dataIndex: 'c_DAT_CLS',
      title: '资产类别',
      width: 90,
    },
  ];
  const [selectedRows, setSelectedRows] = useState([]);
  const onOk = async () => {
    try {
      await form.validateFields();
      console.log(selectedRows);
      if (!selectedRows.length) {
        MsgBox.warning({ message: '请选择组合' });
        return;
      }
      const selectedList = selectedRows.filter((item) => {
        return item.isLeaf;
      });
      const addList = [];
      selectedList.forEach((item) => {
        const obj = {};
        obj.c_GROUP_CODE = groupCode;
        obj.c_PORT_CODE = item.c_PORT_CODE;
        obj.modifier = AppContext.getUserCode();
        console.log('AppContext.getUser().userName');
        console.log(AppContext.getUser().userName);
        obj.c_GROUP_NAME = '';
        obj.c_PORT_NAME = '';
        obj.c_DV_PORT_CODE = '';
        obj.n_CHECK_TYPE = '';
        obj.auditState = 0;
        obj.operator = '';
        obj.auditDate = null;
        obj.modifyDate = null;
        obj.id = '';
        addList.push(obj);
      });
      console.log(addList);
      const response = await handles.service.add(addList);
      if (response.success) {
        setVisible(false);
        handles.query();
      }
    } catch (e) {}
  };
  return (
    <QuarkModal
      width={900}
      bodyStyle={{
        height: 'auto',
      }}
      title="新增"
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onOk}
    >
      <Form labelCol={{ flex: '0 0 140px' }} labelAlign="left" form={form}>
        <Form.Item
          name="groupName"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Select
            // className="ml-2 mb-3"
            value={groupCode}
            allowClear
            style={{ width: '360px' }}
            onChange={(value, option) => {
              setGroupCode(value);
            }}
            optionLabelProp="label"
          >
            {groupList.map((item, index) => {
              return (
                <Select.Option value={item.c_GROUP_CODE} label={item.c_GROUP_NAME} key={index}>
                  <div>
                    <span style={{ display: 'inline-block', width: '120px' }}>
                      {item.c_GROUP_CODE}
                    </span>
                    <span>{item.c_GROUP_NAME}</span>
                  </div>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="可供选择的组合"
          // name="combinationMode1"
          rules={[
            {
              validator: async (rule, value) => {
                if (!selectedRows.length) {
                  throw new Error('请选择组合');
                }
              },
            },
          ]}
        >
          {/* <Input className="hidden" /> */}
          {/* <TreeSearchSelect */}
          {/*  name="INDEX_CODES" */}
          {/*  tableProps={{ */}
          {/*    dataSource: portTree, */}
          {/*    columns: leftTableColumns, */}
          {/*  }} */}
          {/*  valueField="c_PORT_CODE" */}
          {/*  labelField="c_PORT_NAME_ST" */}
          {/*  style={{ width: '360px' }} */}
          {/* /> */}
        </Form.Item>
        <QuarkTable
          rowKey="c_PORT_CODE"
          style={{ height: '490px' }}
          columns={portColumns}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              // console.log(selectedRowKeys);
              // console.log(selectedRows);
              setSelectedRows(selectedRows);
            },
          }}
          dataSource={portList}
          expandable={{
            expandedRowKeys,
            setExpandedRowKeys,
          }}
          scroll={{ x: '100%', y: 450 }}
          loading={loading}
        />
      </Form>
    </QuarkModal>
  );
};
