// 自定义分类管理
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import QuarkModal from '@/components/QuarkModal';
import React, { useEffect, useMemo, useState } from 'react';
import PagePane from '@/blocks/PagePane';
import { useModel } from 'umi';
// import DPopover from '@/pages/targetCorrelation/components/DiyClassifyAdminModal/components/DPopover';
import TreeSearchSelect from '@/components/TreeSearchSelect';
import fastConvert from '@/handles/fastConvert';
import styles from './style.less';

import MasterHandle from './handles/MasterHandle';
import SubHandle from './handles/SubHandle';

import { subToolbar } from './toolbar';
import SubAddModal from './components/SubAddModal';
import MasterAddModal from './components/MasterAddModal';

import Context from './createContext';

const DiyClassifyAdmin = (props) => {
  const { visible, setVisible } = props;

  const masterModel = useModel('ocp.ocpIndexRela.diyClassifyAdminMaster');
  const subModel = useModel('ocp.ocpIndexRela.diyClassifyAdminSub');

  const {
    masterRowEditData,
    setMasterRowEditData,
    formVisible,
    setFormVisible,
    operate,
    currentRecord,
    selectedRows,
  } = masterModel;
  const { saveModalVisible, setSaveModalVisible, dataSource, setDataSource } = subModel;
  const selectedGroup = useMemo(() => {
    return (selectedRows && selectedRows[0] && selectedRows[0].c_GROUP_CODE) || '';
  }, [selectedRows]);
  useEffect(() => {
    if (visible) {
      // 弹窗打开时清空右侧数据
      setDataSource([]);
    }
  }, [visible]);

  // const [saveModalVisible, setSaveModalVisible] = useState(false);
  // const [masterRowEditData, setMasterRowEditData] = useState({});

  const masterHandle = new MasterHandle(masterModel);
  const subHandle = new SubHandle({ ...subModel, masterSelectedRows: masterHandle.selectedRows });

  const [selectedId, setSelectedId] = useState('');
  // const [subTableData, setSubTableData] = useState([]);
  const [masterRowVisible, setMasterRowVisible] = useState(false);

  const masterTable = {
    columns: [
      {
        title: '分类名称',
        key: 'c_GROUP_NAME',
        dataIndex: 'c_GROUP_NAME',
        // sorter: true,
        resizable: true,
        width: 120,
        // render: (text, record, index) => {
        //   const props = { content: text, row: record }
        //   return <EditDropDown {...props} toolbar={[]} />
        // }
      },
      {
        title: '分类编码',
        key: 'c_GROUP_CODE',
        dataIndex: 'c_GROUP_CODE',
        // sorter: true,
        resizable: true,
      },
    ],
    toolbar: {
      buttons: {
        file: {
          // icon: <DPopover />,
          // dropdownItem: false,
          // icon:<FolderAddOutlined />,
          icon: 'addfile',
          visible: 1,
          method: 'add',
        },
      },
      contextmenus: {
        check: {
          visible: 1,
          method: 'check',
          disable: (rows) => {
            return !(rows[0].auditState === 0 && rows[0].c_GROUP_CODE);
          },
        },
        uncheck: {
          visible: 1,
          method: 'uncheck',
          disable: (rows) => {
            return !(rows[0].auditState === 1 && rows[0].c_GROUP_CODE);
          },
        },
        deletes: {
          text: '删除',
          visible: 1,
          method: 'deletes',
          disable: (rows) => {
            return !(rows[0].auditState === 0 && rows[0].c_GROUP_CODE);
          },
        },
        edit: {
          text: '修改',
          visible: 1,
          method: 'edit',
          disable: (rows) => {
            return !(rows[0].auditState === 0 && rows[0].c_GROUP_CODE);
          },
        },
      },
    },
    footer: { footerRender: false },
    tableProps: {
      rowKey: 'id',
      rowSelection: {
        type: 'radio',
      },
      rowClassName: (record) => {
        const selectedStyle = record.id === selectedId ? styles.rowSelected : '';
        const auditStyle = record.auditState === 0 ? 'text-warning' : '';
        // const selectedStyle =
        //   record.id === selectedId
        //     ? styles.rowSelected
        //     : record.auditState == 0
        //     ? 'text-warning'
        //     : '';
        return `${styles.rowHover} ${auditStyle}`;
      },
      expandable: false, // 显式指定不可扩展
      onRow: (row) => {
        return {
          // 点击行
          onClick: (event) => {
            // setSelectedId(row.id || '');
            // subHandle.query({ params: { dataClass: 'CustomGroupRelaData' } });
          },
        };
      },
    },
    search: {
      formItems: [<Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />],
      // searchMethod: true,
      // searchName: 'c_GROUP_NAME',
    },
  };
  const columns = [
    {
      dataIndex: 'c_PORT_NAME_ST',
      title: '组合简称',
      width: 120,
    },
    {
      dataIndex: 'c_PORT_NAME',
      title: '组合名称',
      // width: 80,
    },
    {
      dataIndex: 'c_PORT_CODE',
      title: '组合代码',
      width: 80,
    },
    {
      dataIndex: 'c_DAT_CLS',
      title: '资产类别',
      width: 80,
    },
  ];
  const treeTarget = [];
  const [portTree, setPortTree] = useState([]);
  const fetchGroup = async () => {
    const response = await subHandle.service.group();
    setPortTree(response.data.list);
  };
  useEffect(() => {
    fetchGroup();
  }, []);
  const subTable = {
    columns: [
      {
        key: 'c_GROUP_NAME',
        dataIndex: 'c_GROUP_NAME',
        title: '分类名称',
        width: 80,
      },
      {
        key: 'c_PORT_CODE',
        dataIndex: 'c_PORT_CODE',
        title: '组合代码',
        width: 100,
      },
      {
        key: 'c_PORT_NAME',
        dataIndex: 'c_PORT_NAME',
        title: '组合名称',
        // width: 80,
      },
      {
        key: 'c_DV_PORT_CODE',
        dataIndex: 'c_DV_PORT_CODE',
        title: '组合级别',
        width: 80,
      },
      {
        key: 'n_CHECK_TYPE',
        dataIndex: 'n_CHECK_TYPE',
        title: '审核状态',
        width: 80,
      },
      {
        key: 'c_UPDATE_BY',
        dataIndex: 'c_UPDATE_BY',
        title: '制作人',
        width: 60,
      },
      {
        key: 'c_UPDATE_TIME',
        dataIndex: 'c_UPDATE_TIME',
        title: '制作时间',
        width: 80,
      },
      {
        key: 'c_CHECK_BY',
        dataIndex: 'c_CHECK_BY',
        title: '审核人',
        width: 60,
      },
      {
        key: 'c_CHECK_TIME',
        dataIndex: 'c_CHECK_TIME',
        title: '审核时间',
        width: 80,
      },
    ],
    toolbar: subToolbar,
    filterButton: false,
    search: {
      colsNumber: 3,
      formItems: [
        // <Input type="text" label="组合代码" name="PORT_CODES" />,
        <TreeSearchSelect
          // defaultOpen={true}
          label="组合代码"
          name="PORT_CODES"
          joinSymbol="|"
          valueField="c_PORT_CODE"
          labelField="c_PORT_CODE"
          filterMethod={(item)=>item.dATA_TYPE==='PORT_TYPE'}
          tableProps={{
            // style:{width:'600px'},
            tableLayout: 'fixed',
            dataSource: portTree,
            columns,
            rowKey: 'c_PORT_CODE',
          }}
          dropdownCard={{
            width: 500,
          }}
        />,
        <Select label="组合层级" name="LEVEL" allowClear>
          <Select.Option value="PORT_LAYER">组合层</Select.Option>
          <Select.Option value="UNIT_LAYER">单元层</Select.Option>
          <Select.Option value="UNIT_LAYER,PORT_LAYER">所有层级</Select.Option>
        </Select>,
        <Select label="审核状态" name="N_CHECK_STATE" allowClear>
          <Select.Option value="SearchAll">全部</Select.Option>
          <Select.Option value="SearchAudit">已审核</Select.Option>
          <Select.Option value="SearchUnAudit">未审核</Select.Option>
        </Select>,
      ],
    },
    // 可配置项
    tableProps: {
      rowClassName: (record) => {
        const selectedStyle = record.auditState == 0 ? 'text-warning' : '';
        return `${selectedStyle} ${styles.rowHover}`;
      },
    },
    autoQuery: false,
  };

  return (
    <Context.Provider
      value={{ masterRowVisible, setMasterRowVisible, masterRowEditData, setMasterRowEditData }}
    >
      <QuarkModal
        title="自定义分类管理"
        bodyStyle={{ height: '700px', padding: '0px' }}
        width={1150}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <PagePane
          masterTable={masterTable}
          subTable={subTable}
          masterModel={masterModel}
          subModel={subModel}
          subHandle={subHandle}
          masterHandle={masterHandle}
        />
        <MasterAddModal
          visible={formVisible}
          setVisible={setFormVisible}
          operate={operate}
          handles={masterHandle}
          currentRecord={currentRecord}
        />
        {/* /!* 主表行编辑 *!/ */}
        {/* <MasterRowEditModal */}
        {/*  visible={masterRowVisible} */}
        {/*  setVisible={setMasterRowVisible} */}
        {/*  masterRowEditData={masterRowEditData} */}
        {/*  setMasterRowEditData={setMasterRowEditData} */}
        {/* /> */}
      </QuarkModal>
      {/* 子表新增 */}
      <SubAddModal
        visible={saveModalVisible}
        setVisible={setSaveModalVisible}
        selectedGroup={selectedGroup}
        handles={subHandle}
      />
    </Context.Provider>
  );
};

export default DiyClassifyAdmin;
