import {
  Upload,
  message,
  Button,
  Divider,
  Modal,
  Table,
  Tooltip,
  Spin,
  Select,
  Menu,
  Dropdown,
  Card,
  Input,
  TimePicker,
  DatePicker,
  Space,
} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import QuarkTable from '@/components/QuarkTable';
import { CaretRightOutlined, CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, forwardRef } from 'react';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import * as DeployService from './DeployService';

import moment from 'moment';

// 从树结构找节点
const findOne = (key, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key == key) {
      return data[i];
    }

    if (data[i].children) {
      const _data = data[i].children;
      if (findOne(key, _data)) {
        return findOne(key, _data);
      }
    }
  }

  return null;
};

const QuiarkSelect = ({ _key, name, query, config, ...rest }) => {
  const { kTableTree, multiSelect } = config;
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await query();
      setData(res.data);
    })();
  }, []);
  if (kTableTree === 'true') {
    return <>树形结构</>;
  } else {
    return (
      <Select showArrow={true} maxTagCount={1} mode={multiSelect ? 'multiple' : false} {...rest}>
        {data.map((x) => {
          return (
            <Select.Option key={x[_key]} value={x[_key]}>
              {x[name]}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
};

// 下啦菜单
const DMenu = (props) => {
  const { name, tableData } = props;

  const [cols, setCols] = useState([
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 140,
      render: (content) => {
        return (
          <Tooltip placement="topLeft" title={content.value}>
            {content.value}
          </Tooltip>
        );
      },
    },
    {
      title: '监控条件',
      dataIndex: 'condition',
      key: 'condition',
      ellipsis: true,
      width: 120,
      render: (content) => {
        return (
          <Tooltip placement="topLeft" title={content.value}>
            {content.value}
          </Tooltip>
        );
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      width: 80,
      render: (content) => {
        return (
          <Tooltip placement="topLeft" title={content.value}>
            {content.value}
          </Tooltip>
        );
      },
    },
    {
      title: '参数描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
      width: 200,
      render: (content) => {
        return (
          <Tooltip placement="topLeft" title={content.value}>
            {content.value}
          </Tooltip>
        );
      },
    },
  ]);

  return (
    <Card
      bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}
      title={`${name}预览`}
      style={{ width: 660 }}
    >
      <Table
        rowKey="paramID"
        tableLayout="fixed"
        size="small"
        bordered
        pagination={false}
        dataSource={tableData}
        expandable={{ defaultExpandAllRows: true }}
        columns={cols}
      />
    </Card>
  );
};

// 插件渲染
const YSSTablePlugin = (props) => {
  const { value, code, type, config, onChange } = props;
  const { RangePicker } = DatePicker;
  const plugin = null;
  switch (type) {
    // 纯文本
    case 'text':
      return <>{value}</>;
    // 输入框
    case 'YssTextBox':
      return (
        <Input
          onChange={(e) => onChange(e.currentTarget.value)}
          defaultValue={value}
          maxLength={config.length}
        />
      );
    // 下拉框
    case 'YssSelCombox':
      console.log('下拉框控件,看起来得请求获取options', config);
      const query = async () => {
        return await DeployService.getConditionSelects({
          methodName: config.methodName,
          params: config.methodParams,
          serviceId: config.serviceId,
        });
      };

      return (
        <QuiarkSelect
          _key="code"
          name="codeName"
          onChange={(val) => onChange(val)}
          bordered={false}
          style={{ width: '100%' }}
          defaultValue={value}
          query={query}
          config={config}
        />
      );
    // 前后缀
    case 'ImprovedTextBox':
      return (
        <Input
          onChange={(e) => onChange(e.currentTarget.value)}
          defaultValue={value}
          maxLength={config.length}
          suffix={config.fixValue}
        />
      );

    // 范围控件
    case 'SubsectionTextBox':
      return <>范围控件</>;
    // 时间-日期
    case 'YssDateTimeInterval':
      // return <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />;
      return (
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
      );
    default:
      return <>{value}</>;
  }
};

// 这基本上是一个定制化的部署modal
const DModal = (props) => {
  const {
    visible,
    setVisiable,
    detailConfig,
    onOk,
    onCancel,
    onDelete,
    currentRecord,
    getName,
  } = props;

  // 转换modaltitle
  const title = getName(currentRecord.paramType) + '配置';

  // 是否指标参数
  const deleteDisabled = currentRecord.paramType === 'ocp_indexParam';

  // 获取表格数据的真实dom
  const table = useRef(null);

  // 根据配置转换数据
  let showConfig = detailConfig.map((x) => {
    let ret = {
      ...x,
      name: {
        value: x.nameVal,
        code: x.nameCode,
        type: x.nameType,
        config: JSON.parse(x.nameConfig),
      },
      value: {
        value: x.valueVal,
        code: x.valueCode,
        type: x.valueType,
        config: JSON.parse(x.valueConfig),
      },
      condition: {
        value: x.conditionVal,
        code: x.conditionCode,
        type: x.conditionType,
        config: JSON.parse(x.conditionConfig),
      },
      desc: {
        value: x.descVal,
        code: x.descCode,
        type: x.descType,
        config: JSON.parse(x.descConfig),
      },
    };

    return ret;
  });

  // 单元格渲染
  const CellRenderer = (props) => {
    const { value, code, type, config, onChange } = props;
    return (
      <Tooltip placement="topLeft" title={value}>
        <YSSTablePlugin {...props} />
      </Tooltip>
    );
  };

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 140,
      render: (content, record, index) => {
        return (
          <CellRenderer
            onChange={(val) => {
              const tableData = table.current.props.dataSource;
              tableData[index].name.value = val;
              tableData[index].nameVal = val;
            }}
            {...content}
          />
        );
      },
    },
    {
      title: '监控条件',
      dataIndex: 'condition',
      key: 'condition',
      ellipsis: true,
      width: 120,
      render: (content, record, index) => {
        return (
          <CellRenderer
            onChange={(val) => {
              const tableData = table.current.props.dataSource;
              tableData[index].condiion.value = val;
              tableData[index].condiionVal = val;
              console.log('监控条件改变', val, tableData);
            }}
            {...content}
          />
        );
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      width: 180,
      render: (content, record, index) => {
        return (
          <CellRenderer
            onChange={(val) => {
              const tableData = table.current.props.dataSource;
              tableData[index].value.value = val;
              tableData[index].valueVal = val;
              // console.log('参数值改变', val, tableData);
            }}
            {...content}
          />
        );
      },
    },
    {
      title: '参数描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
      // width: 200,
      render: (content, record, index) => {
        return (
          <CellRenderer
            onChange={(val) => {
              const tableData = table.current.props.dataSource;
              tableData[index].desc.value = val;
              tableData[index].descVal = val;
            }}
            {...content}
          />
        );
      },
    },
  ];

  const [cols, setCols] = useState(columns);

  // 点击确定
  const handleOk = () => {
    const cancel = () => setVisiable(false);
    const tableData = table.current.props.dataSource;
    // 最好把页面里所有状态带上！作为入参,
    onOk && onOk(tableData);
  };

  const handleCancel = (props) => {
    setVisiable(false);
    onCancel && onCancel();
  };

  const handleDelete = () => {
    const cancel = () => setVisiable(false);

    // 最好把页面里所有状态带上！作为入参,
    onDelete && onDelete(cancel);
  };

  return (
    <Modal
      title={title}
      width={660}
      height={500}
      title={title}
      visible={visible}
      footer={[
        <Button onClick={handleCancel} key="1" type="text">
          取消
        </Button>,
        <Button key="2" disabled={deleteDisabled} onClick={handleDelete} type="text" danger>
          删除
        </Button>,
        <Button key="3" type="primary" onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <QuarkTable
        rowSelection={false}
        ref={table}
        rowKey="paramID"
        tableLayout="fixed"
        size="small"
        bordered
        pagination={false}
        dataSource={showConfig}
        columns={cols}
      />
    </Modal>
  );
};

// 参数设置
const UploadTarget = (props) => {
  const { store, setStore } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVals, setDetailVals] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);

  // 关闭时清理currentRecord
  useEffect(() => {
    if (!modalVisible) {
      setCurrentRecord(null);
    }
  }, modalVisible);

  //  转义名称 工具方法
  const getName = (paraType) => {
    const effectParamDicts = store.ParamSetting.effectParamDicts;
    let name = '';
    if (effectParamDicts.length) {
      effectParamDicts.forEach((x) => {
        if (x['c_DV_CODE'] === paraType) {
          name = x['c_DV_NAME'];
        }
      });
    }
    // switch (paraType) {
    //   case 'ocp_indexParam':
    //     name = '指标参数';
    //     break;
    //   case 'ocp_groupParam':
    //     name = '分类参数';
    //     break;
    //   case 'ocp_portParam':
    //     name = '私有有参数';
    //     break;
    //   default:
    //     break;
    // }
    return name;
  };

  // 查看指标详情
  const getDetail = async (record) => {
    // 1. 请求值表
    const { indexCode, relaType, relaCode, paramRelaCode, paramRelaType } = record;
    const params = {
      indexCode,
      relaCode: paramRelaCode,
      relaType: paramRelaType,
    };

    let detailData = (await DeployService.getParamsDetailVals(params)).data;

    // console.log(333, detailData); // 不用看了这是空的

    // 2. 请求控件（基本参数）
    const detailConfig = (await DeployService.getParamsDetail(indexCode)).data;

    let showConfig = detailConfig.map((x) => {
      let ret = {
        ...x,
        // 注意 record的paramRelatype和paramRelacode在保存中作为relatype和relaCode
        relaType: paramRelaType,
        relaCode: paramRelaCode,
        // 注意 record的relatype和relacode在保存中作为newRelatype和newRelaCode
        newRelaType: relaType,
        newRelaCode: relaCode,
        name: {
          value: x.nameVal,
          code: x.nameCode,
          type: x.nameType,
          config: JSON.parse(x.nameConfig),
        },
        value: {
          value: x.valueVal,
          code: x.valueCode,
          type: x.valueType,
          config: JSON.parse(x.valueConfig),
        },
        condition: {
          value: x.conditionVal,
          code: x.conditionCode,
          type: x.conditionType,
          config: JSON.parse(x.conditionConfig),
        },
        desc: {
          value: x.descVal,
          code: x.descCode,
          type: x.descType,
          config: JSON.parse(x.descConfig),
        },
      };
      return ret;
    });

    // 3. 做完这步 把第一步的值返回到控件结果数据上,主键是paramID
    showConfig.forEach((x) => {
      detailData.forEach((y) => {
        if (x.paramID === y.paramID) {
          x.name.code = y.nameCode;
          x.name.value = y.nameVal;

          x.value.code = y.valueCode;
          x.value.value = y.valueVal;

          x.condiion.code = y.conditionCode;
          x.condition.value = y.conditionVal;

          x.desc.code = x.descCode;
          x.desc.value = x.descVal;
        }
      });
    });

    // // 调试用
    // detailData = [
    //   {
    //     id: 1,
    //     name: '参数名1',
    //     condition: '监控条件1',
    //     value: '参数值1',
    //     desc: '接口返回为空，你见到的是调试用的数据',
    //   },
    // ];

    setDetailVals(showConfig);
  };

  // 保存指标参数
  const onSaveParams = async (tableData) => {
    // console.log('保存表格数据', tableData);
    const res = await DeployService.saveParams(tableData);
    setModalVisible(false);

    // ！！！完事之后可以考虑重新查一遍，或者前端更新。
    // 这条记录之前设置的是什么关联组合信息，就传什么信息
    // 改变值为 paramType，relacode 和 relaType

    // 重新查询生效参数

    // 获取生效参数，请注意各种转换为扁平数据格式
    // const params = [];
    // store.RelatedCombination.selectRows.forEach((x) => {
    //   params.push({
    //     indexCode: x.indexCode, // 指标代码
    //     relaCode: '-', // 关联代码
    //     relaType: '-', // 关联类型
    //     auditState: 0, //对象默认值，不关心，默认是0，下同
    //   });

    //   // 然后，再判断这条记录的关联模式,将其扁平化
    //   if (x.relatedMode) {
    //     if (Array.isArray(x.relatedMode.selectedValues)) {
    //       x.relatedMode.selectedValues.forEach((y) => {
    //         params.push({
    //           indexCode: x.indexCode, // 指标代码
    //           relaCode: y, // 关联代码
    //           relaType: x.relatedMode.mode, // 关联类型
    //           auditState: 0, //对象默认值，不关心，默认是0，下同
    //         });
    //       });
    //     }
    //   }
    // });

    // const effectParams = await DeployService.queryEffectParams(params);
    // let list = [];

    // // 然后在此做数据转换，重新组装为树形结构。
    // for (let i = 0; i < effectParams.length; i++) {
    //   // 判断父节点情况
    //   if (effectParams[i].relaCode === '-' && effectParams[i].relaType === '-') {
    //     for (let j = 0; j < effectParams.length; j++) {
    //       if (
    //         effectParams[j].relaCode !== '-' &&
    //         effectParams[j].relaType !== '-' &&
    //         effectParams[j].indexCode == effectParams[i].indexCode
    //       ) {
    //         effectParams[j].isLeaf = true;
    //         effectParams[i].children = effectParams[i].children ? effectParams[i].children : [];
    //         effectParams[i].children.push(effectParams[j]);
    //         // 删除数组中j编号的记录?
    //       }
    //     }
    //     list.push(effectParams[i]);
    //   }
    // }

    // // 再然后把上一步需要的数据拼接到原数组
    // const rows = store.RelatedCombination.selectRows;
    // list.forEach((x) => {
    //   rows.forEach((y) => {
    //     if (x.indexCode === y.indexCode) {
    //       x.indexAlias = y.indexAlias;
    //     }
    //   });
    // });

    // 找到要修改的节点修改之。
    const aaa = findOne(currentRecord.key, store.ParamSetting.tableData);

    aaa.paramType = 'ocp_groupParam';
    // aaa.relaCode=
    // aaa.relaType=

    setStore(JSON.parse(JSON.stringify(store)));
    // console.log('我要在此改变大表值', aaa, store);
  };

  // 删除参数(指标参数不可删除)
  const onDeleteParams = async () => {
    // 通过cutrrentRecord 删除参数，记得关闭时清理下。
    const params = {
      indexCode: currentRecord.indexCode,
      relaCode: currentRecord.relaCode,
      relaType: currentRecord.relaType,
    };
    console.log('删除', params);
    const deleteRes = DeployService.deleteParams(params);
    setModalVisible(false);

    // ！！！ 删除后复原为指标参数
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (text, record, index) => (
        <div
          className="text-center"
          style={{
            float: 'right',
          }}
        >
          {!record.isLeaf ? index + 1 : ''}
        </div>
      ),
    },
    {
      title: '指标别名',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      ellipsis: true,
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '关联类型',
      dataIndex: 'relaType',
      key: 'relaType',
      ellipsis: true,
      render: (content) => {
        const types = store.RelatedCombination.dropdownData.combinationType;
        types.forEach((type) => {
          if (type['c_DV_CODE'] === content) {
            content = type['c_DV_NAME'];
          }
        });
        return (
          <Tooltip placement="topLeft" title={content}>
            {content === '-' ? '' : content}
          </Tooltip>
        );
      },
    },
    {
      title: '生效参数',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (content, record, index) => {
        const name = getName(record.paramType);
        return (
          <Dropdown
            trigger={['click']}
            placement="bottomCenter"
            overlay={<DMenu name={name} tableData={detailVals} />}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => {
                e.preventDefault();
                getDetail(record);
              }}
            >
              {name}
            </a>
          </Dropdown>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'indexAlias',
      key: 'indexAlias',
      align: 'center',
      width: 120,
      render: (content, record) => {
        // 已审核，不允许操作。
        if (record.auditState) {
          return null;
        }
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              getDetail(record);

              setModalVisible(true);
              setCurrentRecord(record);
            }}
          >
            <SettingOutlined />
          </a>
        );
      },
    },
  ];

  return (
    <>
      <QuarkTable
        rowSelection={false}
        loading={store.ParamSetting.tableData.length === 0}
        columns={columns}
        // rowSelection={{ hideSelectAll: true }}
        dataSource={store.ParamSetting.tableData}
        expandable={{
          defaultExpandAllRows: true, // 默认展开所有行
          // expandedRowKeys,
          expandIcon: ({ expanded, onExpand, record }) => {
            if (record.isLeaf) {
              return null;
            }
            return expanded ? (
              <CaretDownOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <CaretRightOutlined
                style={{ marginRight: '8px' }}
                onClick={(e) => onExpand(record, e)}
              />
            );
          },
          expandIconColumnIndex: 0,
        }}
      />

      {/*  参数设置modal */}
      {modalVisible ? (
        <DModal
          currentRecord={currentRecord}
          detailConfig={detailVals}
          getName={getName}
          visible={modalVisible}
          setVisiable={setModalVisible}
          onOk={onSaveParams}
          onDelete={onDeleteParams}
        />
      ) : null}
    </>
  );
};

export default UploadTarget;
