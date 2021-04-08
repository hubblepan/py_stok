//如果没有该段代码，客户端主动断开连接的话，会抛出tcp.read()异常，导致程序挂掉。
process.on('uncaughtException', function (err) {
  console.log(err);
  console.log(err.stack);
});



try {
  var ws = require("nodejs-websocket")

  var socketData = {
    code: "success",
    data: {
      type: "day",
      bizDate: "2020-12-17",
      monitorStateDict: [{
          code: 'code1',
          name: '异常',
        },
        {
          code: 'code2',
          name: '正常',
        },
        {
          code: 'code3',
          name: '预警',
        },
        {
          code: 'code4',
          name: '未执行',
        },
        {
          code: 'code5',
          name: '程序错误',
        },
      ],
      failIndex: {
        title: "异常指标",
        data: [{
            id: 'id1',
            sn: '1',
            indexCode: 'indexCode1',
            indexName: '指标名称1',
            ratio: '10',
          },
          {
            id: 'id2',
            sn: '2',
            indexCode: 'indexCode2',
            indexName: '指标名称2',
            ratio: '20',
          },
          {
            id: 'id3',
            sn: '3',
            indexCode: 'indexCode3',
            indexName: '指标名称3',
            ratio: '30',
          },
          {
            id: 'id4',
            sn: '4',
            indexCode: 'indexCode4',
            indexName: '指标名称4',
            ratio: '40',
          },
          {
            id: 'id5',
            sn: '5',
            indexCode: 'indexCode5',
            indexName: '指标名称5',
            ratio: '50',
          },
          {
            id: 'id6',
            sn: '6',
            indexCode: 'indexCode6',
            indexName: '指标名称6',
            ratio: '6',
          },
          {
            id: 'id7',
            sn: '7',
            indexCode: 'indexCode7',
            indexName: '指标名称7',
            ratio: '70',
          },
          {
            id: 'id8',
            sn: '8',
            indexCode: 'indexCode8',
            indexName: '指标名称8',
            ratio: '80',
          },
          {
            id: 'id9',
            sn: '9',
            indexCode: 'indexCode9',
            indexName: '指标名称9',
            ratio: '90',
          },
          {
            id: 'id10',
            sn: '10',
            indexCode: 'indexCode10',
            indexName: '指标名称10',
            ratio: '10',
          },
          {
            id: 'id11',
            sn: '11',
            indexCode: 'indexCode11',
            indexName: '指标名称11',
            ratio: '11',
          },
          {
            id: 'id12',
            sn: '12',
            indexCode: 'indexCode12',
            indexName: '指标名称12',
            ratio: '12',
          },
          {
            id: 'id13',
            sn: '13',
            indexCode: 'indexCode1',
            indexName: '指标名称1',
            ratio: '10',
          },
          {
            id: 'id14',
            sn: '14',
            indexCode: 'indexCode2',
            indexName: '指标名称2',
            ratio: '20',
          },
          {
            id: 'id15',
            sn: '15',
            indexCode: 'indexCode3',
            indexName: '指标名称3',
            ratio: '30',
          },
          {
            id: 'id16',
            sn: '16',
            indexCode: 'indexCode4',
            indexName: '指标名称4',
            ratio: '40',
          },
          {
            id: 'id17',
            sn: '17',
            indexCode: 'indexCode5',
            indexName: '指标名称5',
            ratio: '50',
          },
          {
            id: 'id18',
            sn: '18',
            indexCode: 'indexCode6',
            indexName: '指标名称6',
            ratio: '6',
          },
          {
            id: 'id19',
            sn: '19',
            indexCode: 'indexCode7',
            indexName: '指标名称7',
            ratio: '70',
          },
          {
            id: 'id20',
            sn: '20',
            indexCode: 'indexCode8',
            indexName: '指标名称8',
            ratio: '80',
          },
          {
            id: 'id21',
            sn: '21',
            indexCode: 'indexCode9',
            indexName: '指标名称9',
            ratio: '90',
          },
          {
            id: 'id22',
            sn: '22',
            indexCode: 'indexCode10',
            indexName: '指标名称10',
            ratio: '10',
          },
          {
            id: 'id123',
            sn: '23',
            indexCode: 'indexCode11',
            indexName: '指标名称11',
            ratio: '11',
          },
          {
            id: 'id24',
            sn: '24',
            indexCode: 'indexCode12',
            indexName: '指标名称12',
            ratio: '12',
          },
        ],
      },
      indexProfile: { // 指标监控概况
        title: "标题",
        total: "11,111",
        data: [{
            name: "正常指标",
            value: 1121,
          },
          {
            name: "异常指标",
            value: 123,
          },
          {
            name: "预警指标",
            value: 1121,
          },
          {
            name: "未执行指标",
            value: 123,
          },
        ],
      },
      portProfile: {
        title: "组合监控概况",
        data: [{
          monitorState: '正常',
          ratio: '54.35',
          value: '6,348',
        }, {
          monitorState: '预警',
          ratio: '14.35',
          value: '1,211',
        }, {
          monitorState: '异常',
          ratio: '4.35',
          value: '348',
        }, {
          monitorState: '未执行',
          ratio: '6.35',
          value: '140',
        }, {
          monitorState: '程序错误',
          ratio: '1.35',
          value: '48',
        }],
      },
      mainIndexProfile: {
        title: "重点指标监控概况",
        state: ['正常', '异常', '预警', '未执行'], //状态名称
        xAxis: ['指标名称1', '指标名称2', '指标名称3', '指标名称4', '指标名称5', '指标名称6', '指标名称7', '指标名称8', '指标名称9', '指标名称10', '指标名称11', '指标名称12'], //x轴数据
        xAxisValue: ['indexCode1', 'indexCode2', 'indexCode3', 'indexCode4', 'indexCode5', 'indexCode6', 'indexCode7', 'indexCode8', 'indexCode9', 'indexCode10', 'indexCode11', 'indexCode12'],
        series: [{
            name: "正常", //状态名称
            type: "bar", //固定值
            stack: "指标", //固定值
            data: [20, 10, 10, 20, 10, 30, 10, 10, 10, 40, 10, 20], //对应三个指标的数据，按照xAxis的顺序
          },
          {
            name: "异常",
            type: "bar",
            stack: "指标",
            data: [20, 10, 20, 40, 40, 40, 30, 20, 10, 10, 20, 20], //对应三个指标的数据，按照xAxis的顺序
          },
          {
            name: "预警",
            type: "bar",
            stack: "指标",
            data: [30, 40, 30, 30, 30, 10, 40, 50, 10, 25, 20, 30], //对应三个指标的数据，按照xAxis的顺序
          },
          {
            name: "未执行",
            type: "bar",
            stack: "指标",
            data: [30, 40, 40, 10, 20, 20, 20, 20, 70, 25, 50, 30], //对应三个指标的数据，按照xAxis的顺序
          },
        ],
      },
      failPortTopN: {
        title: "异常组合 TOP",
        topN: 11,
        data: [{
            id: 'id1',
            sn: '1',
            portCode: 'portCode1',
            portName: '组合名称1',
            ratio: '10',
          },
          {
            id: 'id2',
            sn: '2',
            portCode: 'portCode2',
            portName: '组合名称2',
            ratio: '20',
          },
          {
            id: 'id3',
            sn: '3',
            portCode: 'portCode3',
            portName: '组合名称3',
            ratio: '30',
          },
          {
            id: 'id4',
            sn: '4',
            portCode: 'portCode4',
            portName: '组合名称4',
            ratio: '40',
          },
          {
            id: 'id5',
            sn: '5',
            portCode: 'portCode5',
            portName: '组合名称5',
            ratio: '50',
          },
          {
            id: 'id6',
            sn: '6',
            portCode: 'portCode6',
            portName: '组合名称6',
            ratio: '6',
          },
          {
            id: 'id7',
            sn: '7',
            portCode: 'portCode7',
            portName: '组合名称7',
            ratio: '70',
          },
          {
            id: 'id8',
            sn: '8',
            portCode: 'portCode8',
            portName: '组合名称8',
            ratio: '80',
          },
          {
            id: 'id9',
            sn: '9',
            portCode: 'portCode9',
            portName: '组合名称9',
            ratio: '90',
          },
          {
            id: 'id10',
            sn: '10',
            portCode: 'portCode10',
            portName: '组合名称10',
            ratio: '10',
          },
          {
            id: 'id11',
            sn: '11',
            portCode: 'portCode11',
            portName: '组合名称11',
            ratio: '11',
          },
          {
            id: 'id12',
            sn: '12',
            portCode: 'portCode12',
            portName: '组合名称12',
            ratio: '12',
          },
        ],
      },
      failIndexTopN: {
        title: "异常指标 TOP",
        topN: 20,
        data: [{
            id: 'id1',
            sn: '1',
            indexCode: 'indexCode1',
            indexName: '指标名称1',
            ratio: '10',
          },
          {
            id: 'id2',
            sn: '2',
            indexCode: 'indexCode2',
            indexName: '指标名称2',
            ratio: '20',
          },
          {
            id: 'id3',
            sn: '3',
            indexCode: 'indexCode3',
            indexName: '指标名称3',
            ratio: '30',
          },
          {
            id: 'id4',
            sn: '4',
            indexCode: 'indexCode4',
            indexName: '指标名称4',
            ratio: '40',
          },
          {
            id: 'id5',
            sn: '5',
            indexCode: 'indexCode5',
            indexName: '指标名称5',
            ratio: '50',
          },
          {
            id: 'id6',
            sn: '6',
            indexCode: 'indexCode6',
            indexName: '指标名称6',
            ratio: '6',
          },
          {
            id: 'id7',
            sn: '7',
            indexCode: 'indexCode7',
            indexName: '指标名称7',
            ratio: '70',
          },
          {
            id: 'id8',
            sn: '8',
            indexCode: 'indexCode8',
            indexName: '指标名称8',
            ratio: '80',
          },
          {
            id: 'id9',
            sn: '9',
            indexCode: 'indexCode9',
            indexName: '指标名称9',
            ratio: '90',
          },
          {
            id: 'id10',
            sn: '10',
            indexCode: 'indexCode10',
            indexName: '指标名称10',
            ratio: '10',
          },
          {
            id: 'id11',
            sn: '11',
            indexCode: 'indexCode11',
            indexName: '指标名称11',
            ratio: '11',
          },
          {
            id: 'id12',
            sn: '12',
            indexCode: 'indexCode12',
            indexName: '指标名称12',
            ratio: '12',
          },
        ],
      },
      mainIndexFailTopN: {
        title: "重点指标异常 TOP",
        topN: 100,
        data: [{
            id: 'id1',
            sn: '1',
            portCode: 'portCode1',
            portName: '组合名称1',
            ratio: '10',
          },
          {
            id: 'id2',
            sn: '2',
            portCode: 'portCode2',
            portName: '组合名称2',
            ratio: '20',
          },
          {
            id: 'id3',
            sn: '3',
            portCode: 'portCode3',
            portName: '组合名称3',
            ratio: '30',
          },
          {
            id: 'id4',
            sn: '4',
            portCode: 'portCode4',
            portName: '组合名称4',
            ratio: '40',
          },
          {
            id: 'id5',
            sn: '5',
            portCode: 'portCode5',
            portName: '组合名称5',
            ratio: '50',
          },
          {
            id: 'id6',
            sn: '6',
            portCode: 'portCode6',
            portName: '组合名称6',
            ratio: '6',
          },
          {
            id: 'id7',
            sn: '7',
            portCode: 'portCode7',
            portName: '组合名称7',
            ratio: '70',
          },
          {
            id: 'id8',
            sn: '8',
            portCode: 'portCode8',
            portName: '组合名称8',
            ratio: '80',
          },
          {
            id: 'id9',
            sn: '9',
            portCode: 'portCode9',
            portName: '组合名称9',
            ratio: '90',
          },
          {
            id: 'id10',
            sn: '10',
            portCode: 'portCode10',
            portName: '组合名称10',
            ratio: '10',
          },
          {
            id: 'id11',
            sn: '11',
            portCode: 'portCode11',
            portName: '组合名称11',
            ratio: '11',
          },
          {
            id: 'id12',
            sn: '12',
            portCode: 'portCode12',
            portName: '组合名称12',
            ratio: '12',
          },
        ],
      },
      indexTrend: {
        title: "指标监控状态走势",
        legend: {
          data: ['正常-首次', '异常-首次', '正常-最新', '异常-最新'],
        },
        xAxis: {
          data: ['08/01', '08/02', '08/03', '08/04', '08/05', '08/06', '08/07'],
        },
        series: [{
            name: '正常-首次',
            type: 'line', //固定值
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '异常-首次',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '正常-最新',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '异常-最新',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      },
      portTrend: {
        title: "组合监控状态走势",
        legend: {
          data: ['正常-首次', '异常-首次', '正常-最新', '异常-最新'],
        },
        xAxis: {
          data: ['07/01', '07/02', '07/03', '07/04', '07/05', '07/05', '07/07', '07/08', '07/09', '07/10', '07/11', '07/12', '07/13', '07/14', '07/15', '07/16', '07/17', '07/18', '07/19', '07/20', '07/21', '07/22', '07/23', '07/24', '07/25', '07/26', '07/27', '07/28', '07/29'],
        },
        series: [{
            name: '正常-首次',
            type: 'line', // 固定值
            data: [20, 10, 20, 40, 50, 20, 10, 20, 10, 20, 40, 50, 20, 10, 20, 10, 20, 40, 50, 20, 10, 20, 10, 20, 40, 20, 10, 20, 40],
          },
          {
            name: '异常-首次',
            type: 'line',
            data: [30, 20, 20, 40, 10, 50, 10, 30, 20, 20, 40, 10, 50, 10, 30, 20, 20, 40, 10, 50, 10, 30, 20, 20, 40, 30, 20, 20, 40],
          },
          {
            name: '正常-最新',
            type: 'line',
            data: [40, 30, 30, 5, 10, 10, 10, 40, 30, 30, 5, 10, 10, 10, 40, 30, 30, 5, 10, 10, 10, 40, 30, 30, 5, 40, 30, 30, 5],
          },
          {
            name: '异常-最新',
            type: 'line',
            data: [10, 40, 30, 5, 30, 20, 70, 10, 40, 30, 5, 30, 20, 70, 10, 40, 30, 5, 30, 20, 70, 10, 40, 30, 5, 10, 40, 30, 5],
          },
        ],
      },
    },
    msg: "查询成功！",
    success: true,
  };



  var server = ws.createServer(function (conn) {
    console.log("new connection");
    /**
     * 定时发送消息
     */
    setInterval(() => {

    }, 5000)

    // 收到信息触发     接收 //
    conn.on("text", function (str) {
      console.log("received data:" + str);
      var receivedData = JSON.parse(str);
      if(receivedData.dateType == 'day'){
        socketData.data.type = 'day';
        //socketData.data.bizDate = receivedData.date;
        conn.sendText(JSON.stringify(socketData.data));
      }

      if(receivedData.dateType == 'week'){
        socketData.data.type = 'week';
        //socketData.data.bizDate = receivedData.date;
        conn.sendText(JSON.stringify(socketData.data));
      }

      if(receivedData.dateType == 'month'){
        socketData.data.type = 'month';
        //socketData.data.bizDate = receivedData.date;
        conn.sendText(JSON.stringify(socketData.data));
      }

    })
    // 断开连接触发 //
    conn.on("close", function (coded, reason) {
      console.log("connection closed")
    })
    // 出错触发 //
    conn.on("error", function (code, reason) {
      console.log('异常关闭', code)
    })
  }).listen(9090)
} catch (e) {
  console.log("exception:" + e);
}
