/**
 * 指标管理mock接口
 */
import Mock from 'mockjs';

/**
 * 生成数据列表
 */
const getDataList = (size = 20) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      indexCode: '@id',
      indexName: '@string(upper,7)',
      indexAlias: '@first',
      indexVersion: '@natural(18,40)',
      deployStatus: '@natural(18,40)',
      componentIdentify: '@natural(18,40)',
      deployBy: '@DATETIME("yyyy-MM-dd")',
      deployDate: '@DATETIME("yyyy-MM-dd")',
      triggerPosition: '@natural(18,40)',
      privilege: '@integer(100000,999999)',
      indexClassify: '@integer(100000,999999)',
      indexType: '@integer(100000,999999)',
      indexLevel: '@integer(100000,999999)',
      dataSource: '@integer(100000,999999)',
      checkState: Math.random() > 0.5 ? 1 : 0, // 是否已审核
      description: `指标描述指标描述指标描述指标描述${Math.random(0)}`,
    });
    tempList.push(listItem);
  }
  return tempList;
};
const getTreeList = () => {
  const list = [
    {
      key: 1,
      id: 1,
      typeName: '开发测试',
      typeCode: 'type1',
      typeP: '',
      isLeaf: false,
      children: [
        {
          key: 11,
          id: 11,
          typeName: '公共',
          typeCode: 'type11',
          typeP: 'type1',
          isLeaf: true,
        },
        {
          key: 12,
          id: 12,
          typeName: '行情',
          typeCode: 'type12',
          typeP: 'type1',
          isLeaf: false,
          children: [
            {
              key: 121,
              id: 121,
              typeName: '基金行情核对',
              typeCode: 'type121',
              typeP: 'type12',
              isLeaf: false,
            },
          ],
        },
        {
          key: 13,
          id: 13,
          typeName: '资产管理',
          typeCode: 'type13',
          typeP: 'type1',
          isLeaf: false,
          children: [
            {
              key: 131,
              id: 131,
              typeName: '证券基金',
              typeCode: 'type131',
              typeP: 'type13',
              isLeaf: false,
              children: [
                {
                  key: 1311,
                  id: 1311,
                  typeName: 'QDII证券基金',
                  typeCode: 'type1311',
                  typeP: 'type131',
                  isLeaf: false,
                },
                {
                  key: 1312,
                  id: 1312,
                  typeName: 'RQFII证券基金',
                  typeCode: 'type1312',
                  typeP: 'type131',
                  isLeaf: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      id: 2,
      typeName: '数据库',
      typeCode: 'type2',
      typeP: '',
      isLeaf: false,
    },
  ];
  return list;
};
const getChangeRecordList = (size = 10, pKey) => {
  const tempList = [];
  for (let i = 0; i < size; i += 1) {
    const listItem = Mock.mock({
      id: '@id',
      submitDate: '@DATETIME("yyyy-MM-dd")',
      changeDate: '@DATETIME("yyyy-MM-dd")',
      submitBy: '@cname',
      background: '@string(upper,7)',
      // description: `变更记录描述${Math.random(0)}`,
      remark: '@integer(100000,999999)',
      checkState: Math.random() > 0.5 ? 1 : 0,
      checkBy: '@cname',
    });

    listItem.description = `变更记录描述:大表主键是${pKey},本条记录id是${listItem.id}`
    tempList.push(listItem);
  }
  return tempList;
}
let treeList = getTreeList();
let portList = [
  {
    key: 1,
    id: 1,
    portName: '资产管理计划',
    portCode: 'port1',
    isLeaf: false,
    children: [
      {
        key: 11,
        id: 11,
        portName: '保险受托资产',
        portCode: 'port11',
        isLeaf: false,
      },
      {
        key: 12,
        id: 12,
        portName: '证券投资基金',
        portCode: 'port12',
        isLeaf: false,
        children: [
          {
            key: 121,
            id: 121,
            portName: '社会保障基金',
            portCode: 'port121',
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    key: 2,
    id: 2,
    portName: '期货资管',
    portCode: 'port2',
    isLeaf: false,
  },
];

/**
 *新增数据
 * @param {*} data
 */
const addList = (data) => {
  treeList.push(data);
  const result = {
    code: 'SUCCESS',
    data: null,
    message: '保存成功！',
    success: true,
  };
  return result;
};
const deleteList = (data) => {
  treeList.pop(data);
  const result = {
    code: 'SUCCESS',
    data: null,
    message: '删除成功！',
    success: true,
  };
  return result;
};
export default {
  // 从表查询
  'POST /ocp/monitor/index/query': (req, res) => {
    const params = req.body;

    res.status(200).json({
      code: 'SUCCESS',
      data: {
        list: getDataList(params.pageSize),
        total: 100,
      },
      message: '查询成功',
      success: true,
    });
  },

  'POST /ocp/indexinfo/indextype/query': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: [
          {
            key: 1,
            id: 1,
            typeName: '开发测试',
            typeCode: 'type1',
            typeP: '',
            isLeaf: false,
            children: [
              {
                key: 11,
                id: 11,
                typeName: '公共',
                typeCode: 'type11',
                typeP: 'type1',
                isLeaf: true,
              },
              {
                key: 12,
                id: 12,
                typeName: '行情',
                typeCode: 'type12',
                typeP: 'type1',
                isLeaf: false,
                children: [
                  {
                    key: 121,
                    id: 121,
                    typeName: '基金行情核对',
                    typeCode: 'type121',
                    typeP: 'type12',
                    isLeaf: false,
                  },
                ],
              },
              {
                key: 13,
                id: 13,
                typeName: '资产管理',
                typeCode: 'type13',
                typeP: 'type1',
                isLeaf: false,
                children: [
                  {
                    key: 131,
                    id: 131,
                    typeName: '证券基金',
                    typeCode: 'type131',
                    typeP: 'type13',
                    isLeaf: false,
                    children: [
                      {
                        key: 1311,
                        id: 1311,
                        typeName: 'QDII证券基金',
                        typeCode: 'type1311',
                        typeP: 'type131',
                        isLeaf: false,
                      },
                      {
                        key: 1312,
                        id: 1312,
                        typeName: 'RQFII证券基金',
                        typeCode: 'type1312',
                        typeP: 'type131',
                        isLeaf: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 2,
            id: 2,
            typeName: '数据库',
            typeCode: 'type2',
            typeP: '',
            isLeaf: false,
          },
        ],
        total: treeList.length,
      },

      success: true,
      message: '查询成功！',
    };
    res.json(data);
  },
  'POST /ocp/indexinfo/indextype/tree': {
    code: 'SUCCESS',
    data: {
      list: [
        {
          title: '开发测试',
          value: 'type1',
          children: [
            {
              title: '行情',
              value: 'type12',
              children: [
                {
                  title: '基金行情核对',
                  value: 'type121',
                },
              ],
            },
            {
              title: '资产管理',
              value: 'type13',
              children: [
                {
                  title: '证券基金',
                  value: 'type131',
                  children: [
                    {
                      title: 'QDII证券基金',
                      value: 'type1311',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '数据库',
          value: 'type2',
        },
      ],
      total: 2,
    },
    message: '查询成功',
    success: true,
  },
  'post /ocp/indexinfo/indextype/save': function (req, res) {
    const item = req.query;
    res.json(addList(item));
  },
  'delete /ocp/indexinfo/indextype/deletes': function (req, res) {
    res.json(deleteList());
  },
  // 删除指标
  'GET /ocp/monitor/index/delete': {
    code: 'success',
    data: null,
    message: '删除成功',
    success: true,
  },

  // 检测
  'POST /ocp/porttree': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: portList,
        total: 12,
      },
      success: true,
      message: '查询成功！',
    };
    res.json(data);
  },
  'post /ocp/indexinfo/detection': function (req, res) {
    const data = {
      code: 'SUCCESS',
      data: {
        list: [
          {
            id: '1',
            result: '数据核对【失败】',
            success: 0,
            detail: '检测结果',
            rowSpan: 1,
          },
          {
            id: '2',
            result: '变更监控【失败】',
            success: 0,
            detail: '检测结果：<br><span class="text-danger">表或视图结果不存在</span>',
            rowSpan: 2,
          },
          {
            id: '3',
            result: '变更监控【失败】',
            success: 0,
            detail: '检测结果：<br><span class="text-danger">未维护扩展参数</span>',
            rowSpan: 0,
          },
          {
            id: '4',
            result: '基金核对【成功】',
            success: 1,
            detail: '检测结果：赢时胜组合',
            rowSpan: 1,
          },
        ],
        total: 16,
        message: '指标检测完成！'
      },
      success: true,
    }
    res.json(data);
  },

  // 指标详情
  'GET /ocp/monitor/index/detail': (req, res) => {
    const { check } = req.query;
    res.json({
      code: 'success',
      data: {
        indexCode: '指标代码',
        indexName: '指标名称',
        indexAlias: '指标别名',
        indexClassify: '指标分类',
        triggerPosition: '触发位置',
        indexType: '指标类型',
        dataSource: '来源界面',
        indexLevel: '指标级别',
        indexParent: '父级指标',
        riskLevel: '风险级别',
        description: '功能简介',
        applyPort: '适用组合',
        busiScope: '业务范围',
        fetchLogic: '取数逻辑',
        monitorRule: '监控规则',
        comment: '备注',
        check
      },
      message: '查询成功',
      success: true,
    })
  },
  // 审核
  'GET /ocp/monitor/index/check': {
    code: 'success',
    data: null,
    message: '审核成功',
    success: true,
  },
  // 反审核
  'GET /ocp/monitor/index/uncheck': {
    code: 'success',
    data: null,
    message: '反审核成功',
    success: true,
  },
  // 卸载
  'GET /ocp/monitor/index/unload': {
    code: 'success',
    data: null,
    message: '卸载成功',
    success: true,
  },

  // 修改指标
  'GET /ocp/monitor/index/update': {
    code: 'success',
    data: null,
    message: '修改成功',
    success: true,
  },

  // 查询变更记录
  'POST /ocp/indexinfo/changerecord/query': (req, res) => {
    const { indexCode } = req.body.paraMap;
    res.json({
      code: "success",
      data: {
        list: getChangeRecordList(23, indexCode),
        total: 23,
      },
      message: "查询成功！",
      success: true
    })
  },
  // 保存变更
  'POST /ocp/indexinfo/changerecord/save': {
    code: "success",
    data: null,
    message: "保存成功！",
    success: true
  },

  // 变更详情
  'POST /ocp/indexinfo/changerecord/detail': (req, res) => {
    const id = req.body.id
    res.json({
      code: "success",
      data: {
        id: id,
        submitDate: '2020-9-01',
        changeDate: '2020-9-02',
        submitBy: 'DangBillion',
        background: '背景',
        description: '描述',
        remark: '备注:id是' + id,
        check: '1',
        checkBy: 'aaa',
      },
      message: "查询成功！",
      success: true
    })
  },

  // 删除变更记录
  'POST /ocp/indexinfo/changerecord/delete': {
    code: "success",
    data: null,
    message: "删除成功！",
    success: true
  },
  // 审核
  'POST /ocp/indexinfo/changerecord/check': {
    code: "success",
    data: null,
    message: "审核成功！",
    success: true
  },
  // 反审核
  'POST /ocp/indexinfo/changerecord/uncheck': {
    code: "success",
    data: null,
    message: "审核成功！",
    success: true
  },

  // 上传
  'POST /ocp/indexinfo/deploy/load': async (req, res) => {
    const data = {
      list: req.files.map((file, index) => ({
        id: Math.random(),
        installType: file.originalname + '安装方式',
        developType: file.originalname + '开发方式',
        componentIdentify: file.originalname + '组件标识',
        indexCode: file.originalname + '指标代码',
        indexName: file.originalname + '指标名称'
      }))
    }
    //originalname
    setTimeout(() => {
      res.json({
        code: "success",
        data,
        message: "上传成功！",
        success: true
      })
    }, 3000)
  },

  'POST /ocp/indexinfo/deploy/baseinfo': (req, res) => {
    const data = {
      message: '从基础信息传过来的文字说明',
      downloadUrl: 'http://baidu.com',
      list: [{
        id: '1',
        indexCode: '指标代码1',
        indexName: '指标名称1',
        indexAlias: '指标别名1',
        triggerPosition: '触发位置1',
        indexType: '指标类型1',
        installResult: '安装结果1'
      }]
    }

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },

  // 基础信息下拉框
  'POST /ocp/indexinfo/deploy/baseinfo/triggerPositions': (req, res) => {
    const data = [
      { id: 1, name: '触发位置a' },
      { id: 2, name: '触发位置b' },
    ]

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },

  // 关联组合-关联模式下拉框
  'POST /ocp/indexinfo/deploy/relatedcombination/combinationmode': (req, res) => {
    // const data = [
    //   { id: 1, name: '关联组合aaa', col: 'cola' },
    //   { id: 2, name: 'bbb', col: 'colb' },
    //   { id: 3, name: 'ccc', col: 'colc' },
    //   { id: 4, name: 'ddd', col: 'cold' },
    //   { id: 5, name: 'eee', col: 'cole' },
    //   { id: 6, name: 'fff', col: 'colf' },
    //   { id: 7, name: 'ggg', col: 'colg' },
    //   { id: 8, name: 'hhh', col: 'colh' },
    //   { id: 9, name: 'iii', col: 'coli' },
    //   { id: 10, name: 'jjj', col: 'colj' },
    //   { id: 11, name: 'kkk', col: 'colk' },
    // ]

    const data = [
      {
        key: 1,
        id: 1,
        name: '开发测试',
        col: 'type1',
        typeP: '',
        isLeaf: false,
        children: [
          {
            key: 11,
            id: 11,
            name: '公共',
            col: 'type11',
            typeP: 'type1',
            isLeaf: true,
          },
          {
            key: 12,
            id: 12,
            name: '行情',
            col: 'type12',
            typeP: 'type1',
            isLeaf: false,
            children: [
              {
                key: 121,
                id: 121,
                name: '基金行情核对',
                col: 'type121',
                typeP: 'type12',
                isLeaf: false,
              },
            ],
          },
          {
            key: 13,
            id: 13,
            name: '资产管理',
            col: 'type13',
            typeP: 'type1',
            isLeaf: false,
            children: [
              {
                key: 131,
                id: 131,
                name: '证券基金',
                col: 'type131',
                typeP: 'type13',
                isLeaf: false,
                children: [
                  {
                    key: 1311,
                    id: 1311,
                    name: 'QDII证券基金',
                    col: 'type1311',
                    typeP: 'type131',
                    isLeaf: false,
                  },
                  {
                    key: 1312,
                    id: 1312,
                    name: 'RQFII证券基金',
                    col: 'type1312',
                    typeP: 'type131',
                    isLeaf: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 2,
        id: 2,
        name: '数据库',
        col: 'type2',
        typeP: '',
        isLeaf: false,
      },
    ]

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },

  // 关联组合
  'POST /ocp/indexinfo/deploy/portlist': (req, res) => {
    const data = {
      message: 'mocK:文字说明',
      list: [{
        id: '1',
        indexAlias: '指标别名1',
        relatedType: '触发位置1',
        relatedMode: '指标类型1',
      }, {
        id: '2',
        indexAlias: '指标别名2',
        relatedType: '触发位置2',
        relatedMode: '指标类型2',
      }]
    }

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },

  // 参数设置
  'POST /ocp/indexinfo/deploy/param': (req, res) => {
    const data = {
      list: [{
        id: '1',
        indexAlias: '指标别名1',
        relatedType: '关联类型1',
        // relatedMode: '指标类型1',
      }, {
        id: '2',
        indexAlias: '指标别名2',
        relatedType: '关联类型2',
        // relatedMode: '指标类型2',
        children: [{
          id: '3',
          indexAlias: '指标别名3',
          relatedType: '关联类型3',
          isLeaf: true,
          // relatedMode: '指标类型1',
        }, {
          id: '4',
          indexAlias: '指标别名4',
          relatedType: '关联类型4',
          isLeaf: true,
          // relatedMode: '指标类型1',
        }, {
          id: '5',
          indexAlias: '指标别名5',
          relatedType: '关联类型5',
          isLeaf: true,
          // relatedMode: '指标类型1',
        }]
      }]
    }

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },


  // 部署完成
  'POST /ocp/indexinfo/deploy/finish': (req, res) => {

    res.json({
      code: "success",
      data: {
        message: '完成信息',
        list: [
          {
            id: 1,
            isSuccess: true,
            targetId: '指标标识1',
            targetCode: '指标代码1',
            targetName: '指标名称1',
            targetAlias: '指标别名1',
            combinationMode: '关联模式1',
            deployResult: '部署成功'
          },
          {
            id: 2,
            isSuccess: false,
            targetId: '指标标识2',
            targetCode: '指标代码2',
            targetName: '指标名称2',
            targetAlias: '指标别名2',
            combinationMode: '关联模式2',
            deployResult: '部署失败'
          }
        ]
      },
      message: "审核成功！",
      success: true
    })
  },

  // 关联组合
  'POST /ocp/indexinfo/selects': (req, res) => {
    const data = {
      message: 'mocK:文字说明',
      list: [{
        id: '1',
        indexAlias: '指标别名1',
        relatedType: '触发位置1',
        relatedMode: '指标类型1',
      }, {
        id: '2',
        indexAlias: '指标别名2',
        relatedType: '触发位置2',
        relatedMode: '指标类型2',
      }]
    }

    res.json({
      code: "success",
      data,
      message: "请求成功！",
      success: true
    })
  },
};
