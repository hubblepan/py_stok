import React, { createContext } from 'react';
import { Tooltip } from 'antd';
import { useModel } from 'umi';
import TablePane from '@/blocks/TablePane';
import ModalBox from './components/ModalBox.jsx';
import BasicHandle from './handles/basicParamsHandle.js';

export const FatherContext = createContext();

const IndexPage = () => {
  const model = useModel('ocp.monitorSysParam.basicParamsModel');

  const { formVisible, setFormVisible, operate, paramType, formData } = model;
  const handles = new BasicHandle({ ...model, url: { base: '/ocp/sysparam' } });

  const panelProps = {
    title: '管控基础参数',
    ...model,
    handles,
    // formVisible: setCommonModalVisible,
    search: {
      // formItems: subTableSearchBar,
    },
    autoQuery: true,

    columns: [
      {
        title: '参数名称',
        dataIndex: 'paramName',
        key: 'paramName',
        width: 200,
        ellipsis: true,
      },
      {
        title: '参数条件',
        dataIndex: 'paramCondition',
        key: 'paramCondition',
        width: 100,
        ellipsis: true,
      },
      {
        title: '参数值',
        dataIndex: 'paramValue',
        key: 'paramValue',
        width: 200,
        ellipsis: true,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '参数关联值',
        dataIndex: 'paramValueCode',
        key: 'paramValueCode',
        width: 200,
        ellipsis: true,
        render: (text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '参数说明',
        dataIndex: 'paramDesc',
        key: 'paramDesc',
        width: 200,
        ellipsis: true,
        render: (text) => <Tooltip title={text}> {text}</Tooltip>,
      },
      {
        title: '参数类型',
        dataIndex: 'paramType',
        key: 'paramType',
        width: 150,
        ellipsis: true,
      },
      {
        title: '审核状态',
        dataIndex: 'checkState',
        key: 'checkState',
        width: 80,
        ellipsis: true,
      },
    ],

    toolbar: {
      buttons: {
        add: {
          visible: 1,
          children: {
            addsql: {
              id: 'addsql',
              text: '数据库链接',
              visible: 1,
              method: 'addsql',
            },
            addserver: {
              id: 'addserver',
              text: '服务链接',
              visible: 1,
              method: 'addserver',
            },
          },
        },
        edit: {
          text: '修改',
          visible: 1,
        },
        deletes: {
          visible: 1,
        },
        check: {
          visible: 1,
        },
        uncheck: {
          visible: 1,
        },
      },
      filterButton: false,
      // toolbarRender,
    },
    tableProps: {},
    // page: false,
  };

  return (
    <>
      <section className="page-wrapper a-card">
        <TablePane {...panelProps} {...model}>
          <ModalBox
            formVisible={formVisible}
            setFormVisible={setFormVisible}
            operate={operate}
            paramType={paramType}
            handles={handles}
            formData={formData}
          />
        </TablePane>
      </section>
    </>
  );
};

export default IndexPage;
