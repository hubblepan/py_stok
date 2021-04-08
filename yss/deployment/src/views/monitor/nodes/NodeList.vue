<template>
  <d2-container>
    <div v-loading="loadingCache">
      <app-header :title="'应用部署'"></app-header>
      <node-deploy-upload ref="Upload" ></node-deploy-upload>
      <div class="d2-mt-20 d2-ml-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">
<!--        <el-button size="mini" type="primary" @click="handleNodeAdd">选择节点</el-button>-->
      </div>

      <el-table
        :data="tableData"
        :span-method="configTableSpan"
        @row-click="handleClickTableRow"
        :row-class-name="tableRowClassName"
        border style="margin: 20px 20px 0px 20px; width: 98%" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}">
        <el-table-column
          prop="name"
          label="节点名称"
          width="160">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
            <br/>
            <span>{{'(' + scope.row.ip + ')'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isSelected" v-if="scope.row.tomcatInfo"/>
          </template>
        </el-table-column>
        <el-table-column align="left" width="220">
          <template slot="header" slot-scope="scope">
            <span>Tomcat名称</span>
            <span style="color: #aaaaaa; font-size: 10px; font-weight: normal; margin-left: 6px;">(双击可修改)</span>
          </template>
          <template slot-scope="scope">
            <div v-if="scope.row.tomcatInfo"  style="width: 260px;">
              <el-tooltip :content="scope.row.tomcatInfo.tomcatDir" placement="top" v-if="!(scope.row.tomcatInfo.editState)" style="width: 260px;">
                <span @dblclick.stop="changeTomcatName(scope.$index, scope.row)">{{scope.row.tomcatInfo.tomcatName}}</span>
              </el-tooltip>
              <el-input v-if="scope.row.tomcatInfo.editState" v-model="scope.row.tomcatInfo.tomcatNameCache" @blur.native.capture="handleSaveTomcatName(scope.$index, scope.row)" v-on:keyup.enter.native="onEnterName(scope.$index, scope.row)" size="mini" style="margin-right: 20px; width: 80%" ref="InputTomcatName"></el-input>
            </div>
            <el-button @click="handleSetTomcat(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.tomcatInfo)">新增Tomcat</el-button>
            <!--            <el-button type="info" icon="el-icon-edit" circle size="mini" @click.stop="changeTomcatName(scope.$index, scope.row)" style="margin-left: 10px"></el-button>-->
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          label="tomcat名称"-->
<!--          width="180">-->
<!--          <template slot-scope="scope">-->
<!--            <el-tooltip :content="scope.row.tomcatInfo.tomcatDir" placement="top">-->
<!--              <span>{{scope.row.tomcatInfo.tomcatName}}</span>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="tomcatDir"-->
<!--          label="选择的tomcat地址">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button @click="handleSetTomcat(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.tomcatInfo)">点击选择</el-button>-->
<!--            <div v-if="scope.row.tomcatInfo">-->
<!--              <span v-if="scope.row.tomcatInfo">{{scope.row.tomcatInfo.tomcatDir}}</span>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <!--      <el-table-column-->
        <!--        align="left"-->
        <!--        prop="tomcatName"-->
        <!--        label="tomcat名称"-->
        <!--        width="180">-->
        <!--        <template slot-scope="scope">-->
        <!--          <el-button @click="handleSetTomcat(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.tomcatInfo)">点击选择</el-button>-->
        <!--          <span v-if="scope.row.tomcatInfo">{{scope.row.tomcatInfo.tomcatName}}</span>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column align="center" label="部署状态" prop="deployStatus" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.tomcatInfo">
              <el-tag type="info" v-if="scope.row.tomcatInfo.deployStatus==='noDeploy'">未部署</el-tag>
              <el-tag type="success" v-if="scope.row.tomcatInfo.deployStatus==='deploying'">部署中</el-tag>
              <el-tag type="success" v-if="scope.row.tomcatInfo.deployStatus==='redeploy'">部署中</el-tag>
              <el-tag type="success" v-if="scope.row.tomcatInfo.deployStatus==='deployed'">已部署</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="运行状态" prop="runningStatus" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.tomcatInfo">
              <el-tag type="info" v-if="scope.row.tomcatInfo.runningStatus==='DOWN'">未启动</el-tag>
              <el-tag type="success" v-if="scope.row.tomcatInfo.runningStatus==='UP'">运行中</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="应用版本号" prop="tomcatInfo.version" width="220">
        </el-table-column>
        <el-table-column align="center" label="war目录" min-width="120" prop="singleWar">
          <template slot-scope="scope">
<!--            <el-alert-->
<!--              :title="scope.row.singleWar"-->
<!--              type="info"-->
<!--              v-if="scope.row.singleWar"-->
<!--            >-->
<!--            </el-alert>-->
            <div v-if="scope.row.singleWar" style="width: inherit; text-align: center">
              <el-tooltip :content="scope.row.singleWar" placement="top">
                <span class="single-line">{{scope.row.singleWar}}</span>
              </el-tooltip>
<!--              <i class="el-icon-delete" style="padding: 3px; tran: 10px"></i>-->
              <el-button type="info" icon="el-icon-delete" size="small" circle class="war-clear" @click.stop="handleReset(scope.$index, scope.row)"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" min-width="200" width="200">
          <template slot-scope="scope">
            <el-button @click.stop="handleChangeWar(scope.$index, scope.row)" size="mini" type="warning" plain v-if="scope.row.tomcatInfo">War</el-button>
            <!--          <el-button @click="handleSetTomcat(scope.$ind ex, scope.row)" size="mini" type="success" v-if="scope.row.tomcatInfo" icon="el-icon-edit">Tomcat</el-button>-->
<!--            <el-button @click.stop="handleReset(scope.$index, scope.row)" size="mini" type="plain" v-if="scope.row.tomcatInfo">清空</el-button>-->
            <el-button @click.stop="handleReport(scope.$index, scope.row)" size="mini" type="success" v-if="scope.row.tomcatInfo && scope.row.tomcatInfo.runningStatus==='UP'">启动报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span style="font-size: 12px; color: #909399; margin: 0px 0px 0px 20px">注1: 双击 'Tomcat名称' 单元格可以修改Tomcat名称,  按 enter 键可以保存Tomcat名称</span>
      <div style="text-align: center">
        <el-button @click="handleDeploy" size="small" type="primary" style="margin: 20px;">下一步</el-button>
      </div>
      <!-- 新增节点 -->
      <node-select :on-selected="onNodeSelected" ref="nodeSelect"></node-select>
      <!-- 选择Tomcat节点的列表-->
      <node-select-tomcat :on-tomcat-selected="onTomcatSelected" ref="nodeSelectTomcat"></node-select-tomcat>
      <!-- 添加应用 -->
<!--      <node-add-war :on-node-war-added="onWarChanged" ref="nodeChangeWar"></node-add-war>-->
      <node-deploy-upload-add :on-added="onUploadAdded" ref="UploadAdd"></node-deploy-upload-add>
      <node-add-tomcat :on-tomcat-added="onTomcatAdded" ref="nodeAddTomcat"></node-add-tomcat>
      <node-log-loading ref="NodeLogLoading"></node-log-loading>
    </div>
  </d2-container>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import NodeSelect from './NodeSelect';
import NodeSelectTomcat from './NodeSelectTomcat';
import NodeLogLoading from './NodeLogLoading';
// import NodeAddWar from './NodeAddWar';
import NodeDeployUploadAdd from './NodeDeployUploadAdd';
import dateFormat from '../../../utils/dateFormat';
import NodeAddWarRemote from './NodeAddWarRemote';
import NodeDeployUpload from './NodeDeployUpload';
import NodeAddTomcat from './NodeAddTomcat';

import * as api from '../api/node_deploy_api';

export default {
  name: 'NodeList',
  components: {
    NodeLogLoading, AppHeader, NodeSelect, NodeSelectTomcat, NodeDeployUploadAdd, NodeDeployUpload, NodeAddTomcat,
  },
  data() {
    return {
      loadingCache: false,
      showTomcatDialog: false,
      addIndex: -1,
      selectionTableData: [],
      nodeIdSet: new Set([]),
      tableData: [
      ],
      tableSpan: {}, // map,   item.name -> tableSpanItem
      tableSpanItem: {
        index: 1,
        count: 1,
      },
      // 手动构造 tableData数据
      tableItem: {
        name: '', // 节点名称
        ip: '', // 节点ip
        id: '', // 节点id
        singleWar: '', // 独立war包
        tomcatInfo: {
          id: '',
          deployStatus: '', // 部署状态
          runningStatus: '', // 运行状态
          tomcatDir: '', // tomcatDir
          tomcatNameCache: '',
          editState: false,
          loadingStart: false,
        },
      },
    };
  },
  mounted() {
    this.$refs.Upload.handleInit('', '', null);
    this.handleListNode();
  },
  methods: {
    onUploadAdded(p, index) {
      p.then(res => {
        this.$refs.UploadAdd.close();
        this.$refs.UploadAdd.closeLoading();
        this.tableData[index].singleWar = res.data;
        if (!this.tableData[index].isSelected) {
          this.tableData[index].isSelected = true;
        }
      }).catch(reason => {
        this.$refs.UploadAdd.close();
        this.$refs.UploadAdd.closeLoading();
      });
    },
    handleRestart(index, row) {
      if (row.tomcatInfo.runningStatus === 'UP') {
        this.$confirm('该操作将对Tomcat进行重启，是否继续！', '提示', {
          confirmButtonText: '重启',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          row.loadingStart = true;
          this.$refs.NodeLogLoading.show(row.tomcatInfo);
          return api.restartTomcat(row.tomcatInfo.id);
        }).then((res) => {
          // this.$refs.NodeLogLoading.close();
          row.loadingStart = false;
          row.tomcatInfo.runningStatus = 'UP';
        }).catch(() => {
          // this.$refs.NodeLogLoading.close();
          row.loadingStart = false;
          // do nth
        });
      } else {
        this.$refs.NodeLogLoading.show(row.tomcatInfo);
        api.restartTomcat(row.tomcatInfo.id)
          .then(res => {
            row.loadingStart = false;
            row.tomcatInfo.runningStatus = 'UP';
            // this.$refs.NodeLogLoading.close();
          })
          .catch(reason => {
            row.loadingStart = false;
            // this.$refs.NodeLogLoading.close();
          });
      }
    },
    handleReport(index, row) {
      api.connectInfo([row.tomcatInfo.id]).then(res => {
        if (res.success) {
          // this.rollback = false;
          // 查看报告url
          let connectVo = res.data[0];
          let reportUrl =
            'http://' +
            connectVo.ip +
            ':' +
            connectVo.tomcatPort +
            '/YSSUCOBRIDGE/deploy_console/index.html';
          window.open(reportUrl);
        }
      }).catch(reason => {
        // 提示获取连接信息失败
        this.$message.error({
          message: '获取tomcat地址失败',
        });
      });
    },
    handleCheckReport(index, row) {
      api.connectInfo([row.tomcatInfo.id]).then(res => {
        if (res.success) {
          // this.rollback = false;
          // 查看报告url
          let connectVo = res.data[0];
          let reportUrl =
            'http://' +
            connectVo.ip +
            ':' +
            connectVo.tomcatPort +
            '/YSSUCOBRIDGE/deploy_console/index.html';
          window.open(reportUrl);
        }
      }).catch(reason => {
        // 提示获取连接信息失败
        this.$message.error({
          message: '获取tomcat地址失败',
        });
      });
    },
    execListNodeTomcat() {
      this.loadingData = true;
      api.listNodeTomcat(this.nodeId)
        .then(res => {
          this.loadingData = false;
          // res.data.forEach((item, index) => {
          //   this.$set(item, 'id', index);
          // });
          this.tomcatData = res.data;
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({
            message: reason,
          });
        });
    },
    onTomcatAdded(p) {
      let targetTomcatId = '';
      let targetTomcat = null;
      p.then(res => {
        // 获取当前节点的Tomcat信息， 然后获取到最新添加的Tomcat, 插入到tableData中
        targetTomcatId = res.data;
        return api.listNodeTomcat(this.tableData[this.addIndex].id);
      }).then(res => {
        // 成功
        this.$refs.nodeAddTomcat.close();
        this.$refs.nodeAddTomcat.closeLoading();
        res.data.forEach((item, index) => {
          // do nth
          if (item.id === targetTomcatId) {
            targetTomcat = {
              id: item.id,
              deployStatus: item.deployStatus, // 部署状态
              runningStatus: item.runningStatus, // 运行状态
              tomcatDir: item.tomcatDir, // tomcatDir
              tomcatName: item.tomcatName,
              version: '',
              tomcatNameCache: item.tomcatName,
              editState: false,
              loadingStart: false,
            };
          }
        });
        this.tableData[this.addIndex].tomcatInfo = targetTomcat;
        let nodeItem = this.tableData[this.addIndex];
        let emptyNode = {
          id: nodeItem.id,
          name: nodeItem.name,
          ip: nodeItem.ip,
          agentStatus: 'up',
          singleWar: nodeItem.singleWar || '',
          isSelected: nodeItem.isSelected || false,
          tomcatInfo: null,
        };
        this.tableData.splice(this.addIndex + 1, 0, emptyNode);
        this.calculateTableSpan();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeAddTomcat.closeLoading();
        this.$message.error({
          message: '添加Tomcat失败:' + reason,
        });
      });
    },
    onEnterName(index, row) {
      row.tomcatInfo.editState = false;
      this.handleSaveTomcatName(index, row);
    },
    validTomcatName(name) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].tomcatInfo && this.tableData[i].tomcatInfo.tomcatName === name) {
          this.$alert('存在相同的Tomcat名称, 请重新修改');
          return false;
        }
      }
      return true;
    },
    handleSaveTomcatName(index, row) {
      // this.$refs.InputTomcatName.focus();
      row.tomcatInfo.editState = false;
      if (row.tomcatInfo.tomcatName === row.tomcatInfo.tomcatNameCache) {
        return;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (i !== index && this.tableData[i].tomcatInfo && this.tableData[i].tomcatInfo.tomcatName === row.tomcatInfo.tomcatNameCache) {
          this.$alert('存在相同的Tomcat名称, 请重新修改');
          return;
        }
      }
      let originName = row.tomcatInfo.tomcatName;
      row.tomcatInfo.tomcatName = row.tomcatInfo.tomcatNameCache;
      api.updateTomcatName(row.tomcatInfo)
        .then(res => {
          // do nth
        })
        .catch(reason => {
          // do nth
          row.tomcatInfo.tomcatName = originName;
        });
    },
    changeTomcatName(index, item) {
      item.tomcatInfo.editState = true;
      this.$nextTick(() => {
        this.$refs.InputTomcatName.focus();
      });

      // this.$refs.TomcatModify.show(item);
    },
    handleClickTableRow(row, column, event) {
      if (!row.tomcatInfo) {
        return;
      }
      if (column && column.label === '节点名称') {
        return;
      }
      if (event.srcElement && (event.srcElement.localName === 'input' || event.srcElement.className === 'el-checkbox__inner' || event.srcElement.className === 'el-tooltip')) {
        return;
      }
      console.log(row, column, event);
      row.isSelected = !row.isSelected;
    },
    tableRowClassName({row, rowIndex}) {
      let position = this.tableSpan[row.id].position;
      if (position % 3 === 0) {
        return 'warning-row';
      } else if (position % 3 === 1) {
        console.log('two', row, this.tableSpan);
        return 'success-row';
      }
      return '';
    },
    configTableSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.tableSpan[row.id].index === rowIndex) {
          return {
            rowspan: this.tableSpan[row.id].count,
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
    isOnlyPrivateWar() {
      let allPrivate = true;
      this.selectionTableData.forEach((item, index) => {
        if (!item.singleWar || item.singleWar === '') {
          allPrivate = false;
        }
      });
      return allPrivate;
    },
    onValideForm() {
      // 验证 表单
      // 1. 根据文件类型判断数据是否存在
      if (!this.isOnlyPrivateWar() && !this.$refs.Upload.validForm()) {
        return false;
      }
      // 2. 验证节点数是否 > 1
      if (!this.selectionTableData || this.selectionTableData.length < 1) {
        this.$message.error('至少需要选择一个节点来进行部署');
        return false;
      }
      // 3. 验证节点对应的 Tomcat 是否已配置
      let validTomcat = true;
      this.selectionTableData.forEach((item) => {
        if (!item.tomcatInfo) {
          this.$message.error('请选择节点的Tomcat目录');
          validTomcat = false;
        }
      });
      if (!validTomcat) {
        return false;
      }
      // 验证通过
      return true;
    },
    onWarChanged(p, index) {
      p.then(res => {
        this.$refs.nodeChangeWar.close();
        this.$refs.nodeChangeWar.closeLoading();
        this.tableData[index].singleWar = res.data;
        if (!this.tableData[index].isSelected) {
          this.tableData[index].isSelected = true;
        }
      }).catch(reason => {
        this.$refs.nodeChangeWar.close();
        this.$refs.nodeChangeWar.closeLoading();
      });
    },
    onTomcatSelected(index, nodeId, tomcatInfo) {
      if (!this.tableData[index].tomcatInfo) {
        this.$set(this.tableData[index], 'tomcatInfo', tomcatInfo);
        this.$set(this.tableData[index], 'singleWar', '');
      }
      this.tableData[index].tomcatInfo = tomcatInfo;
    },
    onNodeSelected(val) {
      let newTableData = [];
      if (val && val.length > 0) {
        val.forEach((item, index) => {
          // 判断所选节点是否已存在
          let replaceIndex = -1;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id === item.id) {
              replaceIndex = i;
            }
          }
          // 如果不存在,则添加新的, 否则使用原来的
          if (replaceIndex !== -1) {
            // 存在原来的节点
            newTableData.push(this.tableData[replaceIndex]);
          } else {
            newTableData.push(item); // 添加新的
          }
        });
      }
      this.tableData = newTableData;
    },

    handleAddWar() {
      this.$refs.nodeAddWarRemote.show();
    },

    handleNodeAdd() {
      // 处理添加缓存NodeId
      let nodeIdSet = new Set([]);
      this.tableData.forEach((item, index) => {
        nodeIdSet.push(item.id);
      });
      this.$refs.nodeSelect.show([], true, true, this.nodeIdSet);
    },
    handleSetTomcat(index, item) {
      this.addIndex = index;
      let tomcatNames = this.tableData.filter((item) => {
        return item.tomcatInfo;
      }).map((item) => {
        return item.tomcatInfo.tomcatName;
      });
      this.$refs.nodeAddTomcat.show(this.tableData[index].id, tomcatNames);
      // this.$refs.nodeSelectTomcat.show(index, item.id);
    },
    handleChangeWar(index, item) {
      this.$refs.UploadAdd.show(index, item.id, item.tomcatInfo.id, item.tomcatInfo);
    },
    handleReset(index, item) {
      // item.tomcatInfo = null;
      item.singleWar = '';
    },

    handleListNode() {
      this.loadingCache = true;
      api.getAllTomcatOfDeploy()
        .then(res => {
          this.loadingCache = false;
          let tableData = [];
          console.log(res.data);
          // res.data = res.data.filter(item => {
          //   return item.upgrade;
          // });
          // 转换数据结构
          this.nodeIdSet = new Set([]);
          res.data.forEach((item, index) => {
            this.nodeIdSet.add(item.nodeId);
            let nodeItem = {
              id: item.nodeId,
              name: item.nodeName,
              ip: item.ip,
              agentStatus: 'up',
              singleWar: item.deployStatus === 'deploying' || item.deployStatus === 'redeploy' ? item.warDir : '',
              isSelected: false,
              tomcatInfo: item.id ? {
                id: item.id,
                tomcatNameCache: item.tomcatName,
                editState: false,
                loadingStart: false,
                deployStatus: item.deployStatus, // 部署状态
                runningStatus: item.runningStatus, // 运行状态
                tomcatDir: item.tomcatDir, // tomcatDir
                tomcatName: item.tomcatName,
                version: item.version,
              } : null,
            };
            tableData.push(nodeItem);
          });
          // // 按照 nodeName 排序
          // tableData.sort((item1, item2) => {
          //   if (item1.name > item2.name) {
          //     return 1;
          //   } else if (item1.name === item2.name) {
          //     return 0;
          //   } else {
          //     return -1;
          //   }
          // });
          // // 每个节点插入一个空的Tomcat 信息
          // tableData = this.appendEmptyTomcat(tableData);
          // 计算tableSpan
          this.tableSpan = {};
          let position = 0;
          tableData.forEach((item, index) => {
            if (this.tableSpan[item.id]) {
              this.tableSpan[item.id].count = this.tableSpan[item.id].count + 1;
            } else {
              this.tableSpan[item.id] = {
                index: index,
                count: 1,
                position: position,
              };
              position += 1;
            }
          });
          this.tableData = tableData;
          console.log(this.tableData);
          // this.handleRestoreCache();
        })
        .catch(reason => {
          this.loadingCache = false;
        });
    },
    appendEmptyTomcat(tableData) {
      let newTableData = [];
      tableData.forEach((item, index) => {
        newTableData.push(item);
        if (index === tableData.length - 1 || item.name !== tableData[index + 1].name) {
          let emptyTomcat = {
            id: item.id,
            name: item.name,
            ip: item.ip,
            agentStatus: 'up',
            singleWar: '',
            isSelected: false,
            tomcatInfo: null,
          };
          newTableData.push(emptyTomcat);
        }
      });
      return newTableData;
    },
    calculateTableSpan() {
      this.tableSpan = {};
      let position = 0;
      this.tableData.forEach((item, index) => {
        if (this.tableSpan[item.id]) {
          this.tableSpan[item.id].count = this.tableSpan[item.id].count + 1;
        } else {
          this.tableSpan[item.id] = {
            index: index,
            count: 1,
            position: position,
          };
          position += 1;
        }
      });
    },

    handleRestoreCache() {
      this.loadingCache = true;
      api.deployCache()
        .then(res => {
          // 1. 将返回的数据 转换为 页面的tableData结构数据
          this.loadingCache = false;
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, index) => {
              // let tableItem = {
              //   name: item.nodeName, // 节点名称
              //   ip: item.ip, // 节点ip
              //   id: item.nodeId, // 节点id
              //   isSelected: true,
              //   singleWar: item.localWar ? item.warDir : '', // 独立war包
              //   tomcatInfo: {
              //     id: item.id,
              //     tomcatName: item.tomcatName,
              //     deployStatus: item.deployStatus, // 部署状态
              //     runningStatus: item.runningStatus, // 运行状态
              //     tomcatDir: item.tomcatDir, // tomcatDir
              //   },
              // };
              for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].tomcatInfo.id === item.id) {
                  let selectedItem = this.tableData[i];
                  selectedItem.isSelected = true;
                  selectedItem.singleWar = item.localWar ? item.warDir : '';
                  break;
                }
              }
              // this.tableData.push(tableItem);
            });
          }

          // 2. 从缓存中恢复公共的war包数据
          res.data.forEach((item, index) => {
            if (!item.localWar) {
              this.$refs.Upload.onAdded(item.warDir);
            }
          });
        })
        .catch(reason => {
          this.loadingCache = false;
          // do nothing
        });
    },
    handleDeploy() {
      this.selectionTableData = this.tableData.filter(item => {
        return item.isSelected;
      });
      // 验证
      if (!this.onValideForm()) {
        return;
      }
      // 存在使用公共war包的部署
      if (!this.isOnlyPrivateWar()) {
        let fileData = this.$refs.Upload.getFormData();
        let tomcatIds = [];
        this.selectionTableData.forEach((item, index) => {
          if (!item.singleWar || item.singleWar.trim() === '') {
            tomcatIds.push(item.tomcatInfo.id);
          }
        });
        fileData.append('tomcatIds', tomcatIds.join(','));
        this.loadingCache = true;
        // 上传war包
        api.uploadWar(fileData)
          .then(res => {
            this.loadingCache = false;
            // 跳转页面
            this.$router.push({name: 'NodeDeploy', params: {nodeList: JSON.stringify(this.selectionTableData)}});
          })
          .catch(reason => {
            this.loadingCache = false;
            this.$message.error({message: reason});
          });
      } else {
        // 不存在使用公共war包的部署
        this.$router.push({name: 'NodeDeploy', params: {nodeList: JSON.stringify(this.selectionTableData)}});
      }
    },
    beforeUpload(file) {
      var fileName = file.name;
      this.fileName = fileName;
      var suffix = fileName.split('.');
      console.log(suffix[suffix.length - 1]);
      var reg = /(?:war)$/;
      if (!reg.test(suffix[suffix.length - 1])) {
        this.$message.error('上传文件只能是war类型文件');
        return false;
      }
      if (fileName !== 'YSSUCOBRIDGE.war') {
        this.$message.error('上传文件必须是YSSUCOBRIDGE.war文件');
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
  .single-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
    display: inline-block;
    margin-top: 10px;
  }
  .war-clear {
    margin-left: 12px;
    margin-top: -15px;
    background-color: transparent;
    border: none;
    color: #a1a3a9;
    font-size: 16px;
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
