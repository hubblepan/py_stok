/**
 * 管控基础参数mock接口
 */
import Mock from 'mockjs';
import { query, detail, save, deletes, changeState } from './MockUtil';

/**
 * 生成数据列表
 */

const getDataList = () => {
  const tempList = [
    {
      id: '1',
      modifier: 'ht',
      modifyDate: '20201113 16:14:46',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 0,
      operator: 'ht',
      auditDate: '20201113 16:14:46',
      paramType: 'autoCheck',
      paramName: '正常状态的监控明细结果是否自动确认',
      paramCondition: '=',
      paramValueCode: '1',
      paramValue: '是',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '正常状态的监控明细结果否启用自动确认操作是',
    },
    {
      id: '542',
      modifier: 'ht',
      modifyDate: '20201104 14:56:03',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 0,
      operator: 'ht',
      auditDate: '20201104 14:56:03',
      paramType: 'autoDeployCheck',
      paramName: '指标部署后是否自动审核',
      paramCondition: '=',
      paramValueCode: 'ENABLE',
      paramValue: '启用',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '控制指标部署后是否自动审核',
    },
    {
      id: '421',
      modifier: 'zxf',
      modifyDate: '20201023 16:30:50',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 0,
      operator: 'zxf',
      auditDate: '20201023 16:30:50',
      paramType: 'autoIndexMsgPost',
      paramName: '强制消息框提示岗位',
      paramCondition: '=',
      paramValueCode:
        'SYSMGR|ITcode|fa_post|XTGLG|GKQXG|search|glsqg|sqcsg|QUERY|WBSWEBDEMO_POST|YWQNG|admin|YWJBG|ZLSPG|ZLJFG|ZLFSG|ZLJBG|ZLFHG|YWFHG',
      paramValue:
        '超级管理员|IT岗|fa岗位测试|系统管理岗|管控权限岗|查询1|管理授权岗|授权测试岗|浏览|WBSWEBDEMO测试岗|业务全能岗|系统管理员|经办岗|指令审批岗|计财复核岗|计财确认岗|指令经办岗|指令复核岗|复核岗',
      paramValueList: [
        {
          id: '41',
          idenRela: '421',
          paramCode: 'SYSMGR',
          paramName: '超级管理员',
        },
        {
          id: '42',
          idenRela: '421',
          paramCode: 'ITcode',
          paramName: 'IT岗',
        },
        {
          id: '43',
          idenRela: '421',
          paramCode: 'fa_post',
          paramName: 'fa岗位测试',
        },
        {
          id: '44',
          idenRela: '421',
          paramCode: 'XTGLG',
          paramName: '系统管理岗',
        },
        {
          id: '45',
          idenRela: '421',
          paramCode: 'GKQXG',
          paramName: '管控权限岗',
        },
        {
          id: '46',
          idenRela: '421',
          paramCode: 'search',
          paramName: '查询1',
        },
        {
          id: '47',
          idenRela: '421',
          paramCode: 'glsqg',
          paramName: '管理授权岗',
        },
        {
          id: '48',
          idenRela: '421',
          paramCode: 'sqcsg',
          paramName: '授权测试岗',
        },
        {
          id: '49',
          idenRela: '421',
          paramCode: 'QUERY',
          paramName: '浏览',
        },
        {
          id: '50',
          idenRela: '421',
          paramCode: 'WBSWEBDEMO_POST',
          paramName: 'WBSWEBDEMO测试岗',
        },
        {
          id: '51',
          idenRela: '421',
          paramCode: 'YWQNG',
          paramName: '业务全能岗',
        },
        {
          id: '52',
          idenRela: '421',
          paramCode: 'admin',
          paramName: '系统管理员',
        },
        {
          id: '53',
          idenRela: '421',
          paramCode: 'YWJBG',
          paramName: '经办岗',
        },
        {
          id: '54',
          idenRela: '421',
          paramCode: 'ZLSPG',
          paramName: '指令审批岗',
        },
        {
          id: '55',
          idenRela: '421',
          paramCode: 'ZLJFG',
          paramName: '计财复核岗',
        },
        {
          id: '56',
          idenRela: '421',
          paramCode: 'ZLFSG',
          paramName: '计财确认岗',
        },
        {
          id: '57',
          idenRela: '421',
          paramCode: 'ZLJBG',
          paramName: '指令经办岗',
        },
        {
          id: '58',
          idenRela: '421',
          paramCode: 'ZLFHG',
          paramName: '指令复核岗',
        },
        {
          id: '59',
          idenRela: '421',
          paramCode: 'YWFHG',
          paramName: '复核岗',
        },
      ],
      paramValueStr:
        '超级管理员|IT岗|fa岗位测试|系统管理岗|管控权限岗|查询1|管理授权岗|授权测试岗|浏览|WBSWEBDEMO测试岗|业务全能岗|系统管理员|经办岗|指令审批岗|计财复核岗|计财确认岗|指令经办岗|指令复核岗|复核岗',
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '设置指标强制消息框提示的岗位',
    },
    {
      id: '101',
      modifier: 'ht',
      modifyDate: '20201124 14:05:50',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20201124 14:05:50',
      paramType: 'autoMonitor',
      paramName: '不支持自动监控产品状态',
      paramCondition: '=',
      paramValueCode: 'PS1|PS2|PS3|PS6|PS7',
      paramValue: '草稿|待发行|募集期|已清算|已关账',
      paramValueList: [
        {
          id: '91',
          idenRela: '101',
          paramCode: 'PS1',
          paramName: '草稿',
        },
        {
          id: '92',
          idenRela: '101',
          paramCode: 'PS2',
          paramName: '待发行',
        },
        {
          id: '93',
          idenRela: '101',
          paramCode: 'PS3',
          paramName: '募集期',
        },
        {
          id: '94',
          idenRela: '101',
          paramCode: 'PS6',
          paramName: '已清算',
        },
        {
          id: '95',
          idenRela: '101',
          paramCode: 'PS7',
          paramName: '已关账',
        },
      ],
      paramValueStr: '草稿|待发行|募集期|已清算|已关账',
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '针对已设置产品状态，系统将不再自动监控对应产品的执行情况',
    },
    {
      id: '401',
      modifier: 'ht',
      modifyDate: '20201116 09:52:36',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20201116 09:52:36',
      paramType: 'autoRelateGroup',
      paramName: '指标自动关联优先群组',
      paramCondition: '=',
      paramValueCode: 'QYZT_DISB',
      paramValue: '不启用',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '指标自动关联组合时，是否优先按群组关联',
    },
    {
      id: '245',
      modifier: 'ht',
      modifyDate: '20201104 14:46:36',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20201104 14:46:36',
      paramType: 'autoSetColor',
      paramName: '"预警"类指标详情字体颜色',
      paramCondition: 'ForeColor',
      paramValueCode: '-65536',
      paramValue: '-65536',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '用于配置监控状态为"预警"类监控指标【详情】界面中列表数据的显示颜色',
    },
    {
      id: '521',
      modifier: 'ht',
      modifyDate: '20201022 11:47:49',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20201022 11:47:41',
      paramType: 'indexRelaPortLevel',
      paramName: '指标关联到组合层级',
      paramCondition: '=',
      paramValueCode: 'ENABLE',
      paramValue: '启用',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '控制所有组合指标是否要关联到组合层级',
    },
    {
      id: '481',
      modifier: 'ht',
      modifyDate: '20200413 13:56:54',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 0,
      operator: 'ht',
      auditDate: '20201022 09:16:15',
      paramType: 'indexServerLink',
      paramName: '11',
      paramCondition: '=',
      paramValueCode: 'ESBService',
      paramValue: 'ESBService',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: [
        {
          id: '341',
          idenRela: '481',
          paramType: 'indexServerLink',
          paramCode: 'SERVICES_TEST',
          paramName: '外部服务接口调用测试',
        },
      ],
      paramRelaStr: '外部服务接口调用测试',
      paramDesc: '用于配置管控系统监控指标需使用的服务接连',
    },
    {
      id: '581',
      modifier: 'ht',
      modifyDate: '20201022 09:45:19',
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20201022 09:40:50',
      paramType: 'monitorLogSummary_treeTab',
      paramName: '【监控日志总览】界面的列表层级结构',
      paramCondition: '=',
      paramValueCode: 'TREE_TAB2',
      paramValue: '按2层结构展示',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: [
        {
          id: '409',
          idenRela: '581',
          paramType: 'monitorLogSummary_treeTab',
          paramCode: 'IndexTree',
          paramName: '指标树',
        },
      ],
      paramRelaStr: '指标树',
      paramDesc: '设置列表按照2层或3层树级结构展示',
    },
    {
      id: '625',
      modifier: '',
      modifyDate: null,
      startUseDate: '2020-12-02 15:37:54',
      endUseDate: '2020-12-02 15:37:54',
      // auditState: 1,
      checkState: 1,
      operator: 'ht',
      auditDate: '20200824 18:05:42',
      paramType: 'uninheritConfirmResult',
      paramName: '重复执行指标时不继承确认状态',
      paramCondition: '=',
      paramValueCode: 'ENABLE',
      paramValue: '启用',
      paramValueList: null,
      paramValueStr: null,
      paramRelaList: null,
      paramRelaStr: '-',
      paramDesc: '重复执行指标时不继承确认状态',
    },
  ];

  /**
  for (let i = 0; i < 10; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      key: '@id',
      paramName: '@string(upper,7)',
      paramCondition: '@first',
      paramValue: '@natural(18,40)',
      paramValueCode: '@natural(18,40)',
      paramDesc: '@natural(18,40)',
      paramType: '@integer(100000,999999)',
      checkState: Math.random() > 0.5 ? 1 : 0,
      checkTime: '@natural(18,40)',
      updateTime: '@natural(18,40)',
      updateBy: '@natural(18,40)',
      checkBy: '@natural(18,40)',
      editable: '@natural(18,40)',
    });
    tempList.push(listItem);
  }
  **/
  return tempList;
};

let dataList = getDataList();

/**
 *编辑数据
 * @param {*} data
 */
const saveParamsData = (data) => {
  if (!data.id) {
    const id = Mock.mock({
      id: '@id',
    });
    const obj = data;
    obj.id = id.id;
    obj.key = id.id;

    dataList.push(data);
  } else {
    const {
      id,
      paramrType,
      paramName,
      paramCondition,
      paramValue,
      paramValueCode,
      paramValueStr,
      paramValueList,
      paramRelaStr,
      paramRelaList,
      paramDesc,
      IsEdit,
      auditState,
      operator,
      auditDate,
      modifier,
      modifyDate,
    } = data;

    dataList.some((item) => {
      const obj = item;
      if (item.id === id) {
        obj.id = id;
        obj.paramType = paramrType;
        obj.paramName = paramName;
        obj.paramCondition = paramCondition;
        obj.paramValue = paramValue;
        obj.paramValueCode = paramValueCode;
        obj.paramValueStr = paramValueStr;
        obj.paramValueList = paramValueList;
        obj.paramRelaStr = paramRelaStr;
        obj.paramRelaList = paramRelaList;
        obj.paramDesc = paramDesc;
        obj.IsEdit = IsEdit;
        obj.auditState = auditState;
        obj.operator = operator;
        obj.auditDate = auditDate;
        obj.modifier = modifier;
        obj.modifyDate = modifyDate;
      }
      return true;
    });
  }
  const result = {
    code: 'SUCCESS',
    data: null,
    msg: '新增|修改成功！',
    success: true,
  };
  return result;
};

/**
 * 删除数据
 * @param {*} ids
 */

const deleteData = (ids) => {
  console.log(ids);
  dataList = dataList.filter((item) => ids.indexOf(item.id) === -1);
};

/**
 * 审核
 * @param {*} id
 */

const checkData = (id) => {
  console.log(id);
  const index = dataList.findIndex((item) => item.id === id);
  dataList[index].checkState = 0;
  const data = {
    code: 'SUCCESS',
    data: null,
    success: true,
    msg: '审核成功！',
  };
  return data;
};

/**
 * 反审核
 * @param {*} id
 */

const uncheckData = (id) => {
  console.log(id);
  const index = dataList.findIndex((item) => item.id === id);
  dataList[index].checkState = 1;
  const data = {
    code: 'SUCCESS',
    data: null,
    success: true,
    msg: '审核成功！',
  };
  return data;
};

/**
 * 根据某条数据ID查询数据详情
 * @param {*} id
 */

const detailData = (id) => {
  const data1 = dataList.find((item) => item.id === id);
  const result = {
    code: 'SUCCESS',
    data: data1,
    success: true,
    msg: '查询一条数据成功！',
  };
  return result;
};

/**
 * 基础参数数据
 */
const getData = [
  {
    serverData: [
      {
        key: 1,
        value: 'serve1',
        linkData: ['s1', 's2', 's3'],
      },
      {
        key: 2,
        value: 'serve2',
        linkData: ['t1', 't2', 't3'],
      },
    ],
  },
  {
    database: [
      {
        key: 1,
        value: 'database1',
        linkData: ['db1', 'db2', 'db3'],
      },
      {
        key: 2,
        value: 'database2',
        linkData: ['dbase1', 'dbase2', 'dbase3'],
      },
    ],
  },
];

const changeCheck = (dataList1, ids, state) => {
  dataList1.forEach((item) => {
    if (ids.includes(item.id)) {
      item.checkState = state;
    }
  });
};

export default {
  // 查询
  'post /ocp/sysparam/query': function (req, res) {
    const { data, pageNo, pageSize } = req.body;
    const result = {
      code: 'SUCCESS',
      data: { list: query(dataList, data, pageNo, pageSize), total: dataList.length },
      success: true,
      msg: '查询成功！',
    };
    res.json(result);
    // const data = {
    //   code: 'SUCCESS',
    //   data: {
    //     list: dataList,
    //   },
    //   total: 100,
    //   success: true,
    //   msg: '查询成功！',
    // };
    // res.json(data);
  },

  // 新增
  'POST /ocp/sysparam/save': function (req, res) {
    const item = req.body;
    res.json(saveParamsData(item));
  },

  // 详情
  'GET /ocp/sysparam/detail': function (req, res) {
    const { id } = req.query;
    res.json(detail(dataList, id));
  },

  // 删除
  'DELETE /ocp/sysparam/deletes': function (req, res) {
    const { ids } = req.body;
    deleteData(ids);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '删除成功！',
    };
    return res.json(data);
  },

  // 审核
  'POST /ocp/sysparam/check': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(dataList, ids, 1);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 反审核
  'POST /ocp/sysparam/uncheck': function (req, res) {
    const { ids } = req.body;
    console.log(ids);
    changeCheck(dataList, ids, 0);
    const data = {
      code: 'SUCCESS',
      data: null,
      success: true,
      msg: '审核成功！',
    };
    return res.json(data);
  },

  // 基础参数数据关联查询
  'GET /ocp/sysparam/datasource': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: getData,
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 查询数据库连接    主键 c_CONN_NAME
  'GET /ocp/sysparam/dblink/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: [
          {
            id: '5927',
            modifier: 'oyl',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'oyl',
            auditDate: '20201027 09:22:31',
            c_CONN_NAME: '112',
            c_DB_NAME: 'orcl',
            c_CONN_CODE: '11',
            c_DB_TYPE: 'ORA',
            c_PORT: '1521',
            c_IP: '192.168.1.3',
            c_USER: 'V45HTWB1',
            c_PWD: 'd1qHpLIVmosDC9UWDf83cw==',
            c_DB_MARK: '',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: '1 ',
            enCodePWD: 'd1qHpLIVmosDC9UWDf83cw==',
          },
          {
            id: '5928',
            modifier: 'ht',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'ht',
            auditDate: '20200828 16:38:16',
            c_CONN_NAME: 'mysqlTest2',
            c_DB_NAME: 'test',
            c_CONN_CODE: 'mysqlTest',
            c_DB_TYPE: 'MYSQL',
            c_PORT: '3306',
            c_IP: '192.168.4.31',
            c_USER: 'root',
            c_PWD: 'XMZwsw3ZJjVq+2j0D59pZA==',
            c_DB_MARK: '',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: 'root123',
            enCodePWD: 'XMZwsw3ZJjVq+2j0D59pZA==',
          },
          {
            id: '5929',
            modifier: 'QY',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'QY',
            auditDate: '20160811 16:35:04',
            c_CONN_NAME: 'V45',
            c_DB_NAME: 'ams',
            c_CONN_CODE: 'V45',
            c_DB_TYPE: 'ORA',
            c_PORT: '1521',
            c_IP: '10.10.90.35',
            c_USER: 'V45_CPYF_YWCS',
            c_PWD:
              '7CB527A6CC4FB16853F8FDCCB999A249880F662929C3FFDA5189F394106022FDECC81AF75DCFE527C6E2FB83D59091B4E3E8576C891C65E4',
            c_DB_MARK: 'kettle',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: 'V45_CPYF_YWCS',
            enCodePWD:
              '7CB527A6CC4FB16853F8FDCCB999A249880F662929C3FFDA5189F394106022FDECC81AF75DCFE527C6E2FB83D59091B4E3E8576C891C65E4',
          },
          {
            id: '6180',
            modifier: 'QY',
            modifyDate: '20201203 19:13:06',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'QY',
            auditDate: '20160811 16:35:04',
            c_CONN_NAME: 'v45pro_wng',
            c_DB_NAME: 'orcl',
            c_CONN_CODE: 'v45pro_wng',
            c_DB_TYPE: 'ORA',
            c_PORT: '1521',
            c_IP: '192.168.1.3',
            c_USER: 'V45HTWB1',
            c_PWD: 'ZdIUfubHcYBbQ5lgfhTnSg==',
            c_DB_MARK: 'kettle',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '10',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: '1',
            enCodePWD: 'ZdIUfubHcYBbQ5lgfhTnSg==',
          },
          {
            id: '5931',
            modifier: 'ht',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'ht',
            auditDate: '20200612 09:51:27',
            c_CONN_NAME: '集群数据库',
            c_DB_NAME: 'testDB',
            c_CONN_CODE: '113',
            c_DB_TYPE: 'GREENPLUM',
            c_PORT: '5432',
            c_IP: '192.168.1.113',
            c_USER: 'gpadmin',
            c_PWD: 'bXc4DMp1B2FUDbDRivjjag==',
            c_DB_MARK: '',
            c_DV_LINK_TYPE: 'CLUSTER',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: 'gpadmin',
            enCodePWD: 'bXc4DMp1B2FUDbDRivjjag==',
          },
          {
            id: '5932',
            modifier: 'ht',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'ht',
            auditDate: '20200616 16:37:28',
            c_CONN_NAME: 'distributed',
            c_DB_NAME: 'orcl',
            c_CONN_CODE: 'distributed',
            c_DB_TYPE: 'ORA',
            c_PORT: '1521',
            c_IP: '192.168.1.3',
            c_USER: 'distributed_fast',
            c_PWD: 'ZdIUfubHcYBbQ5lgfhTnSg==',
            c_DB_MARK: '',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: '1',
            enCodePWD: 'ZdIUfubHcYBbQ5lgfhTnSg==',
          },
          {
            id: '5930',
            modifier: 'ht',
            modifyDate: '20201117 15:53:14',
            startUseDate: '2020-12-04 11:43:22',
            endUseDate: '2020-12-04 11:43:22',
            auditState: 1,
            operator: 'ht',
            auditDate: '20200612 10:57:24',
            c_CONN_NAME: 'V45HTWB1',
            c_DB_NAME: 'orcl',
            c_CONN_CODE: 'V45HTWB1',
            c_DB_TYPE: 'ORA',
            c_PORT: '1521',
            c_IP: '192.168.1.3',
            c_USER: 'V45HTWB1',
            c_PWD: 'd1qHpLIVmosDC9UWDf83cw==',
            c_DB_MARK: '',
            c_DV_LINK_TYPE: 'SINGTON',
            c_BELONGED_DB: '',
            c_QEURY_TIME_OUT: '',
            dbConnCodes: [],
            dbLinks: [],
            decodePWD: '1 ',
            enCodePWD: 'd1qHpLIVmosDC9UWDf83cw==',
          },
        ],
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 查询服务连接   主键 wid
  'GET /ocp/sysparam/servicelink/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: [
          {
            id: '33289',
            wsType: 'Webserver',
            wid: 'WBSV_IPCALL',
            http: 'http',
            port: '8080',
            ip: '127.0.0.1',
            server: ' ',
            timeout: '5000',
          },
          {
            id: '18071',
            wsType: 'HTTP',
            wid: 'ESBService',
            http: 'http',
            port: '8083',
            ip: '192.168.1.170',
            server:
              'http://192.168.1.170:8083/YSSUCOBRIDGE/ws/com/yss/uco/monitor/support/service/IMonitoringExeRestfulService/monitor/check',
            timeout: '60000',
          },
          {
            id: '96560',
            wsType: 'Webserver',
            wid: 'shService',
            http: 'http',
            port: '8088',
            ip: '192.168.4.62',
            server: 'iamgate/IamgateWebService',
            timeout: '3000',
          },
          {
            id: '30564',
            wsType: 'HTTP',
            wid: 'ws',
            http: 'http',
            port: null,
            ip: null,
            server: 'http://127.0.0.1:8030/YSSUCOBRIDGE/ws',
            timeout: null,
          },
          {
            id: '103255',
            wsType: null,
            wid: 'SyncData',
            http: 'http',
            port: '8088',
            ip: '10.10.20.101',
            server: 'YSSUCOBRIDGE/ws/com/yss/ams/product/plm/datasync/service/ISyncPlmDataService',
            timeout: null,
          },
          {
            id: '103256',
            wsType: null,
            wid: 'OccuPension',
            http: 'http',
            port: '8083',
            ip: '10.10.20.20',
            server: 'YSSUCOBRIDGE/ws/com/yss/ams/planlicid/support/webservice/IPlanDataPullService',
            timeout: null,
          },
        ],
      },
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },

  // 查询服务连接和数据库连接的参数关联值
  'GET /ocp/sysparam/index/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: [
        {
          indexCode: 'indexCode1',
          indexName: 'indexName2',
        },
      ],
      success: true,
      msg: '查询成功！',
    };
    res.json(data);
  },
};
