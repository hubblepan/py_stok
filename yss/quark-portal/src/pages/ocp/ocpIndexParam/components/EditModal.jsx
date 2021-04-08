import React, { useState, useEffect, useRef } from 'react';
import { PercentageOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { DatePicker, Form, Input, Select, Tooltip } from 'antd';
import DropdownSelect from '@/components/DropDownSelect/index.js';
import QuarkTable from '@/components/QuarkTable';
import QuarkModal from '@/components/QuarkModal';
import MsgBox from '@/utils/MsgBox';
import { editQuary } from '@/services/targetParams';
import queryString from 'query-string';
import moment from 'moment';
import ExtendParams from './ExtendParams';
import CombinSubService from '../service/CombinSubService';
import * as YSSPlugin from '../service/YSSTablePlugin';

const EditModal = (props) => {
  const { editVisible, setEditVisible, currentSelect, refreshParams0, refreshParams1 } = props;
  const [exParams, setExParams] = useState(false);
  const table = useRef(null);
  const [form] = Form.useForm();

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  console.log('currentSelect');
  console.log(currentSelect);

  console.log('refreshParams11111111');
  console.log(refreshParams1);
  console.log('refreshParams0000000');
  console.log(refreshParams0);

  const {
    indexCode,
    paramRelaCode,
    paramRelaType,
    relaType,
    parentCode,
    paramType,
  } = currentSelect;
  console.log('code:', indexCode, paramRelaCode, paramRelaType);

  const service = new CombinSubService();

  // 查询参数详细信息-Config
  const [configData, setConfigData] = useState([]);
  useEffect(() => {
    if (editVisible) {
      (async () => {
        const res = await service.paramConfig(indexCode);
        console.log('config数据');
        console.log(res);
        setConfigData(res.data);
      })();
    }
  }, [editVisible]);
  console.log('configData');
  console.log(configData);

  // 查询参数详细信息-Val
  const [valData, setValData] = useState([]);
  useEffect(() => {
    if (editVisible) {
      (async () => {
        const res = await service.paramVal(
          queryString.stringify({
            indexCode,
            relaCode: paramRelaCode,
            relaType: paramRelaType,
          }),
        );
        console.log('val数据');
        console.log(res);
        setValData(res.data);
      })();
    }
  }, [editVisible]);
  console.log('valData');
  console.log(valData);

  // 根据配置转换数据
  const showConfig = configData.map((x) => {
    let ret = {
      ...x,
      id: Math.random(),
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

  console.log('showConfig11111', showConfig);

  //  做完这步 把第一部的值返回到控件结果数据上,主键是paramID
  showConfig.forEach((x) => {
    valData.forEach((y) => {
      if (x.paramID === y.paramID) {
        x.name.code = y.nameCode;
        x.name.value = y.nameVal;

        x.value.code = y.valueCode;
        x.value.value = y.valueVal;

        x.condition.code = y.conditionCode;
        x.condition.value = y.conditionVal;

        x.desc.code = y.descCode;
        x.desc.value = y.descVal;

        x.relaType = y.relaType;
        x.relaCode = y.relaCode;
      }
    });
  });

  // setValData(showConfig);

  console.log('showConfig22222', showConfig);

  const QuiarkSelect = ({ _key, name, query, config, ...rest }) => {
    const { kTableTree, multiSelect } = config;
    const [data, setData] = useState([]);
    useEffect(() => {
      (async () => {
        const res = await query();
        setData(res.data);
      })();
    }, []);

    // console.log('data哈哈哈哈哈', data);mode={multiSelect ? 'multiple' : false}
    if (kTableTree === 'true') {
      return <>树形结构</>;
    } else {
      return (
        <Select
          showArrow={true}
          maxTagCount={1}
          {...(multiSelect ? null : (mode = 'multiple'))}
          {...rest}
        >
          {data.map((x) => {
            return (
              <Select.Option key={x.c_DV_CODE} value={x.c_DV_CODE}>
                {x.c_DV_NAME}
              </Select.Option>
            );
          })}
        </Select>
      );
    }
  };

  // 插件渲染
  const YSSTablePlugin = (props) => {
    const { value, code, type, config, onChange } = props;
    const plugin = null;
    switch (type) {
      // 纯文本
      case 'text':
        return <>{value}</>;
      // 输入框
      case 'YssTextBox':
        return (
          <Input
            onChange={(e) => onChange(e.target.value)}
            defaultValue={value}
            maxLength={config.length}
          />
        );
      // 下拉框
      case 'YssSelCombox':
        // console.log('下拉框控件,看起来得请求获取options', config);
        const query = async () => {
          return await YSSPlugin.getConditionSelects({
            methodName: config.methodName,
            params: config.methodParams,
            serviceId: config.serviceId,
          });
        };

        return (
          <QuiarkSelect
            // _key="code"
            // name="codeName"
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
            onChange={(e) => onChange(e.target.value)}
            defaultValue={value}
            maxLength={config.length}
            suffix={config.fixValue}
          />
        );

      // 范围控件
      case 'SubsectionTextBox':
        return <>范围控件</>;
      // 扩展参数链接
      case 'QuickLink':
        return <a href="#">设置参数</a>;
      // 时间-日期
      case 'YssDateTimeInterval':
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

  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (content, record, index) => {
        return (
          <YSSTablePlugin
            onChange={(val) => {
              showConfig[index].name.value = val;
              showConfig[index].nameVal = val;
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
      render: (content, record, index) => {
        return (
          <YSSTablePlugin
            onChange={(val) => {
              showConfig[index].condition.value = val;
              showConfig[index].conditionVal = val;
              console.log('监控条件改变', val, showConfig);
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
      render: (content, record, index) => {
        return (
          <YSSTablePlugin
            onChange={(val) => {
              showConfig[index].value.value = val;
              showConfig[index].valueVal = val;
              // console.log('参数值改变', val, showConfig);
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
      render: (content, record, index) => {
        return (
          <YSSTablePlugin
            onChange={(val) => {
              showConfig[index].desc.value = val;
              showConfig[index].descVal = val;
            }}
            {...content}
          />
        );
      },
    },
  ];

  const saveHandle = async () => {
    console.log('values++++++');
    console.log(showConfig);

    let data = [];
    showConfig.forEach((item) =>
      data.push({
        ...item,
        portCode: null,
        planCode: null,
        paramType,
        indexCode,
        newRelaType: relaType,
        newRelaCode: parentCode, // 未做处理。 坑：组合模式下是parentCode，指标模式下是relaCode
      }),
    );

    console.log('传参', data);

    try {
      await service
        .save(data)
        .then((result) => {
          console.log('保存结果result');
          console.log(result);
          setEditVisible(false);
          /**
           * todo
           * 局部刷新
           */
          MsgBox.success({ content: '保存成功' });
        })
        .catch(() => {
          console.log('catch');
          MsgBox.error({ message: '保存失败' });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <QuarkModal
        // width={600}
        title="参数配置"
        visible={editVisible}
        onOk={saveHandle}
        onCancel={() => {
          setEditVisible(false);
        }}
      >
        <QuarkTable
          rowKey="id"
          tableLayout="fixed"
          size="small"
          bordered
          footer={false}
          pagination={false}
          dataSource={showConfig}
          rowSelection={false}
          columns={columns}
        />
      </QuarkModal>
      <ExtendParams exParams={exParams} setExParams={setExParams} />
    </>
  );
};

export default EditModal;
