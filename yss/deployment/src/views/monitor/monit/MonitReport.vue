<template>
    <div v-loading="loadingData">
      <app-header :title="'巡检报告'">
        <a :href="downloadUrl" rel="nofollow noreferrer">
          <el-button type="primary" size="mini" icon="el-icon-takeaway-box">导出报告</el-button>
        </a>

      </app-header>
      <el-tabs tab-position="left" style="margin-right: 20px; margin-top: 20px;">
        <el-tab-pane label="操作系统">
          <el-table
            :data="operatingSystemTable"
            :span-method="operatingSystemSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
            width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="中间件Tomcat">
          <el-table
            :data="middleWareTable"
            :span-method="middleWareSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数据库配置">
          <el-table
            :data="dbConfigTable"
            :span-method="dbConfigSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="消息总线配置">
          <el-table
            :data="mqConfigTable"
            :span-method="mqConfigSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="服务注册中心配置">
          <el-table
            :data="registryCenterConfigTable"
            :span-method="registryCenterConfigSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="RPC配置">
          <el-table
            :data="rpcConfigTable"
            :span-method="rpcConfigSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="业务日志配置">
          <el-table
            :data="logConfigTable"
            :span-method="logConfigSpanMethod"
            border
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="检查内容/操作命令">
            </el-table-column>
            <el-table-column
              prop="value"
              label="检查结果"
              width="240">
            </el-table-column>
            <el-table-column
              prop="isPass"
              label="检查是否通过"
              align="center"
              width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.isPass" class="el-icon-check" style="color: green"></i>
                <i v-if="!scope.row.isPass" class="el-icon-close" style="color: red"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="360">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import * as api from '../api/monit_api';
import * as deployApi from '../api/node_deploy_api';

export default {
  name: 'MonitReport',
  components: { AppHeader },
  computed: {
    downloadUrl() {
      return this.baseUrl + '/inspection/download/report?tomcatDir=' + this.tomcatDir;
    },
  },
  data() {
    return {
      tomcatId: '',
      tomcatDir: '',
      loadingData: false,
      data: {},
      baseUrl: '',
      tableHeight: 160,
      operatingSystemTable: [],
      dbConfigTable: [],
      logConfigTable: [],
      middleWareTable: [],
      mqConfigTable: [],
      registryCenterConfigTable: [],
      rpcConfigTable: [],
      item: {
        type: 'linux系统',
        describe: '',
        isPass: true,
        remarks: '',
        value: '',
      },
    };
  },
  created() {
    this.tableHeight = this.getClientHeight() - 200;
  },
  mounted() {
    this.loadingData = true;
    this.tomcatId = this.$route.params.tomcatId;
    this.tomcatDir = this.$route.params.tomcatDir;

    deployApi.connectInfo([this.tomcatId])
      .then(res => {
        let connectVo = res.data[0];
        this.baseUrl = 'http://' + connectVo.ip + ':' + connectVo.socketPort;
      })
      .catch(reason => {

      });

    api.inspectReport(this.tomcatId)
      .then(res => {
        this.loadingData = false;
        // 构造 操作系统 table
        this.data = res.data;
        this.parseOperatingSystemVo(res);
        this.parseDbConfigTableVo(res);
        this.parseLogConfigTableVo(res);
        this.parseMiddleWareTableVo(res);
        this.parseMqConfigTableVo(res);
        this.parseRegistryCenterConfigTableVo(res);
        this.parseRpcConfigTableVo(res);
        // do no
      })
      .catch(reason => {
        this.loadingData = false;
        this.$message.error({message: reason});
      });
  },
  methods: {
    parseOperatingSystemVo(res) {
      let operatingSystemTable = [];
      let operatingSystemVo = res.data.operatingSystemVo;
      let linuxSystemVo = operatingSystemVo.linuxSystemVo;
      let windowsSystemVo = operatingSystemVo.windowsSystemVo;
      if (operatingSystemVo && linuxSystemVo) {
        Object.keys(linuxSystemVo).forEach((item, index) => {
          operatingSystemTable.push(Object.assign({type: 'linux系统'}, linuxSystemVo[item]));
        });
      }
      if (operatingSystemVo && windowsSystemVo) {
        Object.keys(windowsSystemVo).forEach((item, index) => {
          operatingSystemTable.push(Object.assign({type: 'windows系统'}, windowsSystemVo[item]));
        });
      }
      this.operatingSystemTable = operatingSystemTable;
    },
    parseLogConfigTableVo(res) {
      let logConfigTable = [];
      let logConfigVo = res.data.logConfigVo;
      if (logConfigVo) {
        Object.keys(logConfigVo).forEach((item, index) => {
          logConfigTable.push(Object.assign({type: 'logback.xml'}, logConfigVo[item]));
        });
      }
      this.logConfigTable = logConfigTable;
    },

    logConfigSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let logConfigVo = this.data.logConfigVo;
        let logConfigCount = 0;
        if (logConfigVo) {
          logConfigCount = Object.keys(this.data.logConfigVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: logConfigCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    parseRpcConfigTableVo(res) {
      let rpcConfigTable = [];
      let rpcConfigVo = res.data.rpcConfigVo;
      if (rpcConfigVo) {
        Object.keys(rpcConfigVo).forEach((item, index) => {
          rpcConfigTable.push(Object.assign({type: 'rpc.xml'}, rpcConfigVo[item]));
        });
      }
      this.rpcConfigTable = rpcConfigTable;
    },

    rpcConfigSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let rpcConfigVo = this.data.rpcConfigVo;
        let rpcConfigCount = 0;
        if (rpcConfigVo) {
          rpcConfigCount = Object.keys(this.data.rpcConfigVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: rpcConfigCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    parseRegistryCenterConfigTableVo(res) {
      let registryCenterConfigTable = [];
      let registryCenterConfigVo = res.data.registryCenterConfigVo;
      if (registryCenterConfigVo) {
        Object.keys(registryCenterConfigVo).forEach((item, index) => {
          registryCenterConfigTable.push(Object.assign({type: 'zoo.cfg'}, registryCenterConfigVo[item]));
        });
      }
      this.registryCenterConfigTable = registryCenterConfigTable;
    },

    registryCenterConfigSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let registryCenterConfigVo = this.data.registryCenterConfigVo;
        let registryCenterConfigCount = 0;
        if (registryCenterConfigVo) {
          registryCenterConfigCount = Object.keys(this.data.registryCenterConfigVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: registryCenterConfigCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    parseMqConfigTableVo(res) {
      let mqConfigTable = [];
      let mqConfigVo = res.data.mqConfigVo;
      if (mqConfigVo) {
        Object.keys(mqConfigVo).forEach((item, index) => {
          mqConfigTable.push(Object.assign({type: 'mq.xml'}, mqConfigVo[item]));
        });
      }
      this.mqConfigTable = mqConfigTable;
    },

    mqConfigSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let mqConfigVo = this.data.mqConfigVo;
        let mqConfigCount = 0;
        if (mqConfigVo) {
          mqConfigCount = Object.keys(this.data.mqConfigVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: mqConfigCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    parseMiddleWareTableVo(res) {
      let middleWareTable = [];
      let middleWareVo = res.data.middleWareVo;
      if (middleWareVo) {
        Object.keys(middleWareVo).forEach((item, index) => {
          middleWareTable.push(Object.assign({type: '中间件-Tomcat'}, middleWareVo[item]));
        });
      }
      this.middleWareTable = middleWareTable;
    },

    middleWareSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let middleWareVo = this.data.middleWareVo;
        let middleWareCount = 0;
        if (middleWareVo) {
          middleWareCount = Object.keys(this.data.middleWareVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: middleWareCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    parseDbConfigTableVo(res) {
      let dbConfigTable = [];
      let dbConfigVo = res.data.dbConfigVo;
      if (dbConfigVo) {
        Object.keys(dbConfigVo).forEach((item, index) => {
          dbConfigTable.push(Object.assign({type: 'dbsetting.xml'}, dbConfigVo[item]));
        });
      }
      this.dbConfigTable = dbConfigTable;
    },

    dbConfigSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let dbConfigVo = this.data.dbConfigVo;
        let dbConfigCount = 0;
        if (dbConfigVo) {
          dbConfigCount = Object.keys(this.data.dbConfigVo).length;
        }
        if (rowIndex === 0) {
          return {
            rowspan: dbConfigCount,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    operatingSystemSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // linux span
        let operatingSystemVo = this.data.operatingSystemVo;
        let linuxSystemVo = operatingSystemVo.linuxSystemVo;
        let windowsSystemVo = operatingSystemVo.windowsSystemVo;
        let linuxCount = 0;
        let windowsCount = 0;
        if (operatingSystemVo && linuxSystemVo) {
          linuxCount = Object.keys(this.data.operatingSystemVo.linuxSystemVo).length;
        }

        if (operatingSystemVo && windowsSystemVo) {
          windowsCount = Object.keys(this.data.operatingSystemVo.windowsSystemVo).length;
        }
        if (rowIndex === 0 && linuxCount > 0) {
          // 扩展部分
          return {
            rowspan: linuxCount,
            colspan: 1,
          };
        } else if (rowIndex > 0 && rowIndex < linuxCount) {
          // 被扩展部分
          return {
            rowspan: 0,
            colspan: 0,
          };
        } else if (rowIndex === linuxCount) {
          return {
            rowspan: windowsCount,
            colspan: 1,
          };
        } else if (rowIndex > linuxCount) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
        // // windows span
        //
        // // others
        // // 扩展
        // if (rowIndex === 0) {
        //   return {
        //     rowspan: 3,
        //     colspan: 1,
        //   };
        // }
        // // 被扩展的
        // else if (rowIndex < 3) {
        //   return {
        //     rowspan: 0,
        //     colspan: 0,
        //   };
        // }
        // // 正常
        // else {
        //   return {
        //     rowspan: 1,
        //     colspan: 1,
        //   };
        // }
      }
    },
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
  },
};
</script>

<style scoped>

</style>
