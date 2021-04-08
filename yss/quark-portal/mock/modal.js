export default {

  'GET api/ocp/largescreen/paramconf/largescreen': {
    "msg": "查询大屏配置成功",
    "code": "success",
    "data": {
      "portTrend_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "mainIndexFailTopN_syncTopN": "10",
      "indexProfile_syncIndexCode": "code1",
      "mainIndexFailTopN_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "portProfile_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "publicParams_refreshStopTime": "18:00:00",
      "portProfile_syncIndexCode": "code2",
      "failIndexTopN_topN": "10",
      "failPortTopN_syncIndexCode": "code3",
      "failIndexTopN_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "indexProfile_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "indexTrend_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "publicParams_refreshStartTime": "08:00:00",
      "failPortTopN_syncTopN": "10",
      "failIndexTopN_syncIndexCode": "code4",
      "failPortTopN_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "publicParams_businessDate": "0",
      "mainIndexProfile_indexCode": "NOSQL_TEST,70049_TEST,IMP_ZQJBXXQSJC,STOCK_GZQHJEHD,80003_TEST_FAIL,80002_TEST_WARN,STOCK_JYTCBHD,STOCK_ZQCCHDJSJG,STOCK_JZRJZBDJC",
      "mainIndexFailTopN_topN": "10",
      "failPortTopN_topN": "10",
      "publicParams_interval": "10",
      "publicParams_frequency": "30",
      "failIndexTopN_syncTopN": "10",
      "mainIndexFailTopN_syncIndexCode": "code5",
      "indexProfile_failIndexInterval": "2"
    },
    "success": true
  },


  'GET api/ocp/largescreen/indextree': {
    "msg": "查询成功",
    "code": "success",
    "data": [
      {
        "id": "161",
        "indexCode": "default",
        "indexName": "未分类指标",
        "indexType": null,
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": false,
        "children": [
          {
            "id": "2201",
            "indexCode": "CLEAR_O32JYSJJK",
            "indexName": "估值与O32交易数据核对",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "default",
            "isLeaf": true,
            "children": []
          },
          {
            "id": "2531",
            "indexCode": "IMP_ZQJBXXQSJC",
            "indexName": "证券基本信息缺失检查",
            "indexType": "数据导入",
            "typeCode": null,
            "typeP": "default",
            "isLeaf": true,
            "children": []
          }
        ]
      },
      {
        "id": "81",
        "indexCode": "test",
        "indexName": "开发测试",
        "indexType": null,
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": false,
        "children": [
          {
            "id": "241",
            "indexCode": "aaaa",
            "indexName": "aaaa",
            "indexType": null,
            "typeCode": null,
            "typeP": "test",
            "isLeaf": false,
            "children": []
          },
          {
            "id": "261",
            "indexCode": "0001test",
            "indexName": "开发测试1",
            "indexType": null,
            "typeCode": null,
            "typeP": "test",
            "isLeaf": false,
            "children": []
          },
          {
            "id": "341",
            "indexCode": "indexBI",
            "indexName": "虎鲸BI服务指标",
            "indexType": null,
            "typeCode": null,
            "typeP": "test",
            "isLeaf": false,
            "children": []
          },
          {
            "id": "2439",
            "indexCode": "80003_TEST_FAIL",
            "indexName": "80003_TEST_FAIL",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "test",
            "isLeaf": true,
            "children": []
          },
          {
            "id": "2437",
            "indexCode": "80002_TEST_WARN",
            "indexName": "80002_TEST_WARN",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "test",
            "isLeaf": true,
            "children": []
          },
          {
            "id": "2438",
            "indexCode": "80003_TEST_EXCEPTION",
            "indexName": "80003_TEST_EXCEPTION",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "test",
            "isLeaf": true,
            "children": []
          },
          {
            "id": "2449",
            "indexCode": "80001_TEST_SUCCESS",
            "indexName": "80001_TEST_SUCCESS",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "test",
            "isLeaf": true,
            "children": []
          },
          {
            "id": "2433",
            "indexCode": "70049_TEST",
            "indexName": "富国测试指标70049",
            "indexType": "PLUGIN",
            "typeCode": null,
            "typeP": "test",
            "isLeaf": true,
            "children": []
          }
        ]
      },
      {
        "id": "2215",
        "indexCode": "STOCK_ZQGZJGWGXTS",
        "indexName": "债券估值价格未更新提示",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2213",
        "indexCode": "STOCK_GZYPBCCHD",
        "indexName": "估值与彭博持仓核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2211",
        "indexCode": "CLEAR.SHETFSGHJSMXHD",
        "indexName": "上海ETF申赎和结算明细核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2209",
        "indexCode": "SYSINIT_GZCSXGTX",
        "indexName": "估值参数修改提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2207",
        "indexCode": "STOCK_ZQCCHDJSJG",
        "indexName": "估值与登记结算机构持仓核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2206",
        "indexCode": "STOCK_TAFEHDPH",
        "indexName": "TA份额核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2205",
        "indexCode": "STOCK_JZRJZBDJC",
        "indexName": "今昨日净值波动检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2204",
        "indexCode": "STOCK_GZQHJEHD",
        "indexName": "期货备付/保证金核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2203",
        "indexCode": "STOCK_BALCOMPNAV",
        "indexName": "会计恒等式不相等",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2192",
        "indexCode": "ACT_ZQDQPXTX",
        "indexName": "债券到期派息提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2200",
        "indexCode": "CLEAR_WHJYSJDQJC",
        "indexName": "外汇交易数据读取检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2199",
        "indexCode": "MONITOR_ETF_GPLZ",
        "indexName": "ETF股票篮子信息",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2198",
        "indexCode": "auto_test2",
        "indexName": "auto_test2",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2197",
        "indexCode": "ACT_ZQQYPZHD",
        "indexName": "证券权益凭证核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2193",
        "indexCode": "ACT_Trade_ALERTED",
        "indexName": "业务流水未审核监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2572",
        "indexCode": "STOCK_FGKFXGPCQJK",
        "indexName": "非公开发行股票除权监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2571",
        "indexCode": "SYSINIT_SEC_INFO",
        "indexName": "证券基本信息",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2570",
        "indexCode": "CLEAR_WHJY",
        "indexName": "外汇交易数据监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2569",
        "indexCode": "CLEAR_CSHZQMBYLXJK",
        "indexName": "初始化债券每百元利息检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2568",
        "indexCode": "ACT_FDLVZQ",
        "indexName": "浮动利率债券截息日提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2567",
        "indexCode": "ACT_JZSYPZSCRQJK",
        "indexName": "结转损益凭证检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2566",
        "indexCode": "CLEAR_FXZQFXXXJC",
        "indexName": "浮息债券付息信息检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2565",
        "indexCode": "ACT_ETFTZGLQSXXWZXJC",
        "indexName": "ETF台账关联券商信息完成性检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2564",
        "indexCode": "CLEAR_SECCHECK",
        "indexName": "QD缺失证券信息检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2563",
        "indexCode": "ACT_SYJZYEGJ",
        "indexName": "损益结转余额告警",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2562",
        "indexCode": "ACT_PZWSHTX",
        "indexName": "凭证未审核提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2561",
        "indexCode": "ACT_LDXZKJC",
        "indexName": "流通受限股票维护LOMD提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2560",
        "indexCode": "CLEAR_ZHCXQSTX",
        "indexName": "组合重新清算提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2557",
        "indexCode": "CLEAR_QYDZRQCWTX",
        "indexName": "权益到账日期错误提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2556",
        "indexCode": "ACT_ZQJYPZJC",
        "indexName": "证券交易凭证检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2539",
        "indexCode": "STOCK_ZJSQHBZJYEHD",
        "indexName": "中金所期货保证金余额核对",
        "indexType": "统计分析",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2558",
        "indexCode": "ACT_TSJJRPZJC",
        "indexName": "特殊节假日凭证检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2633",
        "indexCode": "DBLINK_TEST",
        "indexName": "数据库直连测试",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2632",
        "indexCode": "STOCK_GZBKMYEJC",
        "indexName": "估值表科目余额检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2631",
        "indexCode": "FG_JJJBXXBDWB",
        "indexName": "FG-基金基本信息比对_外部",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2612",
        "indexCode": "STOCK_FXZQLLTZTX",
        "indexName": "浮息债券利率调整提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2610",
        "indexCode": "JYSJDRGDXWWSZJC",
        "indexName": "交易数据导入股东席位未设置检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2591",
        "indexCode": "ceshizhibiao1_z",
        "indexName": "测试指标1_赵",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2630",
        "indexCode": "72398_TEST",
        "indexName": "华宝测试72398",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2493",
        "indexCode": "ACT_ZQQYDZPZJC",
        "indexName": "交易所债券权益到账凭证检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2361",
        "indexCode": "CLEAR_JYSZQQYJEHDNEW",
        "indexName": "FG-交易所债券权益到账金额核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2349",
        "indexCode": "FG_GGQYHD",
        "indexName": "FG-港股权益核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2342",
        "indexCode": "71694_TEST",
        "indexName": "华夏测试71694",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2629",
        "indexCode": "FG_JZRJZBDJK",
        "indexName": "FG-今昨日净值波动监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2218",
        "indexCode": "STOCK_JYTCBHD",
        "indexName": "交易头寸表核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2639",
        "indexCode": "INDEX_TEST",
        "indexName": "INDEX_TEST",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2638",
        "indexCode": "STOCK_YWSHQKJK",
        "indexName": "业务审核情况监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2637",
        "indexCode": "STOCK_JZBDBD",
        "indexName": "净值波动比对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2611",
        "indexCode": "STOCK_GZBYYEBBPJC",
        "indexName": "估值表与余额表不平检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2609",
        "indexCode": "STOCK_DAILYRETURNS",
        "indexName": "每日万份收益监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2621",
        "indexCode": "STOCK_JZZZLJC",
        "indexName": "净值增长率检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2608",
        "indexCode": "STOCK_CPFHJEHD",
        "indexName": "产品分红金额检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2607",
        "indexCode": "CLEAR_JYSZQQYJEHD",
        "indexName": "交易所债券权益到账金额核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2605",
        "indexCode": "STOCK_DEPOSITCHECK",
        "indexName": "估值与支付平台银行存款余额核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2604",
        "indexCode": "STOCK_ZQHBJC",
        "indexName": "债券还本检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2587",
        "indexCode": "EXP_GLRQSWJHD",
        "indexName": "管理人清算文件核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2586",
        "indexCode": "EXP_ETFTBKWJHD",
        "indexName": "ETF退补款文件核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2585",
        "indexCode": "EXP_ETFTZJZWJHD",
        "indexName": "ETF中登净值文件核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2584",
        "indexCode": "ETFFDBJSZLHDHX",
        "indexName": "华夏ETF非担保交收指令核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2602",
        "indexCode": "STOCK_GZQHMXHD",
        "indexName": "期货持仓明细核对",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2581",
        "indexCode": "STOCK_JRKYTCJK",
        "indexName": "估值表可用头寸为负提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2636",
        "indexCode": "SERVICES_TEST",
        "indexName": "外部服务接口调用测试",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2635",
        "indexCode": "DEMO_TEST",
        "indexName": "测试指标",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2578",
        "indexCode": "ACT_XGLTPZTX",
        "indexName": "新股流通凭证检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2577",
        "indexCode": "STOCK_ZZSBOOK_CHECK",
        "indexName": "增值税台账与估值表余额差异检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2576",
        "indexCode": "ACT_ETFTZSLPHGXJC",
        "indexName": "ETF台账数量平衡关系检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2575",
        "indexCode": "STOCK_HGYWDQTX",
        "indexName": "回购业务到期提醒",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2603",
        "indexCode": "STOCK_JCJZJK",
        "indexName": "资产净值监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2634",
        "indexCode": "NOSQL_TEST",
        "indexName": "NOSQL_TEST",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2600",
        "indexCode": "IMP_FXZLLBDQKJK",
        "indexName": "浮息债利率变动情况监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2247",
        "indexCode": "ACT_GXHLPZJK",
        "indexName": "股息红利凭证监控",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      },
      {
        "id": "2573",
        "indexCode": "ACT_JJRPZJC",
        "indexName": "节假日凭证生成检查",
        "indexType": "PLUGIN",
        "typeCode": null,
        "typeP": "[root]",
        "isLeaf": true,
        "children": []
      }
    ],
    "success": true
  },

  'POST api/ocp/largescreen/paramconf/largescreen': (req, res) => {
    res.send({
      code: 'success',
      data: null,
      msg: '保存大屏配置成功',
      success: true
    })
  }
}
