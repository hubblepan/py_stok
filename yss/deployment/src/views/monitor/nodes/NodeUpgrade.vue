<template>
  <div v-loading="loadingData">
<!--    <app-header :title="'应用部署'"></app-header>-->
    <div style="padding: 20px 0; margin: 0 0px 0 20px;border-bottom: 1px dotted #dcdcdc;">
      <el-radio v-model="mainOperate" label="upgrade">升级</el-radio>
      <el-radio v-model="mainOperate" label="backup">回退</el-radio>
    </div>
<!--    <NodeUpgradeUpload ></NodeUpgradeUpload>-->
    <node-upgrade-upload ref="Upload" v-if="mainOperate === 'upgrade'"></node-upgrade-upload>
    <div class="d2-mt-20 d2-ml-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">
      <el-button size="mini" type="primary" @click="handleNodeAdd" v-if="false">选择节点</el-button>
    </div>
    <el-table
      :data="tableData"
      :span-method="configTableSpan"
      @row-click="handleClickTableRow"
      :row-class-name="tableRowClassName"
      border style="margin: 20px 20px 0px 20px; width: 98%"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
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
          <el-checkbox v-model="scope.row.isSelected"/>
        </template>
      </el-table-column>
      <el-table-column align="left" width="240">
        <template slot="header" slot-scope="scope">
          <span>Tomcat名称</span>
          <span style="color: #aaaaaa; font-size: 10px; font-weight: normal; margin-left: 6px;">(双击可修改)</span>
        </template>
        <template slot-scope="scope">
          <div>
            <el-tooltip :content="scope.row.tomcatInfo.tomcatDir" placement="top" v-if="!(scope.row.tomcatInfo.editState)"  style="width: 100%">
              <span @dblclick.stop="changeTomcatName(scope.$index, scope.row)" style="width: 260px;">{{scope.row.tomcatInfo.tomcatName}}</span>
            </el-tooltip>
            <el-input v-if="scope.row.tomcatInfo.editState" v-model="scope.row.tomcatInfo.tomcatNameCache" @blur.native.capture="handleSaveTomcatName(scope.$index, scope.row)" v-on:keyup.enter.native="onEnterName(scope.$index, scope.row)" size="mini" style="margin-right: 20px; width: 80%" ref="InputTomcatName"></el-input>
          </div>
          <!--            <el-button type="info" icon="el-icon-edit" circle size="mini" @click.stop="changeTomcatName(scope.$index, scope.row)" style="margin-left: 10px"></el-button>-->
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        label="选择的tomcat地址">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="handleSetTomcat(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!(scope.row.tomcatInfo) && scope.row.isSelected">点击选择</el-button>-->
<!--          <div v-if="scope.row.tomcatInfo">-->
<!--            <span v-if="scope.row.tomcatInfo">{{scope.row.tomcatInfo.tomcatDir}}</span>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
      <el-table-column align="center" label="升级包路径" min-width="140" v-if="mainOperate === 'upgrade'">
        <template slot-scope="scope">
          <div v-if="mainOperate === 'upgrade' && scope.row.singleZip" style="width: inherit; text-align: center">
            <el-tooltip :content="scope.row.singleZip" placement="top">
              <span class="single-line">{{scope.row.singleZip}}</span>
            </el-tooltip>
            <!--              <i class="el-icon-delete" style="padding: 3px; tran: 10px"></i>-->
            <el-button type="info" icon="el-icon-delete" size="small" circle class="war-clear" @click.stop="handleReset(scope.$index, scope.row)"></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="backupTime"
        label="回退点"
        v-if="mainOperate === 'backup'">
        <template slot-scope="scope">
          <div v-if="mainOperate === 'backup' && scope.row.backupTime" style="width: inherit; text-align: center">
            <el-tooltip :content="scope.row.backupTime" placement="top">
              <span class="single-line">{{scope.row.backupTime}}</span>
            </el-tooltip>
            <!--              <i class="el-icon-delete" style="padding: 3px; tran: 10px"></i>-->
            <el-button type="info" icon="el-icon-delete" size="small" circle class="war-clear" @click.stop="handleReset(scope.$index, scope.row)"></el-button>
          </div>
          <el-button @click.stop="handleSelectBackup(scope.$index, scope.row)" size="mini" type="danger" plain v-if="mainOperate === 'backup' && scope.row.tomcatInfo && scope.row.backupTime === '' && scope.row.isSelected">选择回退点</el-button>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" min-width="240" width="320">
        <template slot-scope="scope">
          <el-button @click.stop="handleUploadAdd(scope.$index, scope.row)" size="mini" type="warning" plain v-if="scope.row.tomcatInfo && mainOperate === 'upgrade'" icon="el-icon-upload">单独包</el-button>
          <el-button @click.stop="handleHistory(scope.$index, scope.row)" size="mini" type="info">升级历史</el-button>
<!--          <el-button @click.stop="handleReset(scope.$index, scope.row)" size="mini" type="plain" v-if="scope.row.tomcatInfo" icon="el-icon-delete">清空</el-button>-->
          <el-button @click.stop="handleReport(scope.$index, scope.row)" size="mini" type="success" v-if="scope.row.tomcatInfo && scope.row.tomcatInfo.runningStatus==='UP'">启动报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size: 12px; color: #909399; margin: 0px 0px 0px 20px">注1: 双击 'Tomcat名称' 单元格可以修改Tomcat名称,  按 enter 键可以保存Tomcat名称</span>
    <div style="text-align: center">
      <el-button @click="handleForceUpgrade" size="small" type="primary" style="margin: 20px;" v-if="mainOperate === 'upgrade'">一键升级</el-button>
      <el-button @click="handleBackup" size="small" type="primary" style="margin: 20px;" v-if="mainOperate === 'backup'">一键回退</el-button>
    </div>
    <!-- 新增节点 -->
    <node-select :on-selected="onNodeSelected" ref="nodeSelect"></node-select>
    <!-- 选择Tomcat节点的列表-->
    <node-upgrade-select-tomcat :on-tomcat-selected="onTomcatSelected" ref="nodeSelectTomcat"></node-upgrade-select-tomcat>
    <!--文件对比-->
    <node-upgrade-compare :on-compared="onCompared" ref="Compare"></node-upgrade-compare>
    <!--回滚选择-->
    <node-upgrade-backup-select :on-added="onBackupSelected" ref="BackupSelect"></node-upgrade-backup-select>
    <!--添加节点的升级包-->
    <node-upgrade-upload-add :on-added="onUploadAdded" ref="UploadAdd"></node-upgrade-upload-add>

    <node-upgrade-loading ref="UploadLoading"></node-upgrade-loading>

    <!-- 升级历史弹窗 -->
    <el-drawer
      title="历史升级记录"
      :visible.sync="updateHistory.show"
      direction="rtl"
      :with-header="false">
      <div>
        <el-divider></el-divider>
        <update-history v-bind:tomcat-id="updateHistory.tomcatId" v-if="updateHistory.show"></update-history>
      </div>

    </el-drawer>
  </div>
</template>

<script>
// import AppHeader from '../../../components/header/AppHeader';
import NodeSelect from './NodeSelect';
import NodeAddWar from './NodeAddWar';
import dateFormat from '../../../utils/dateFormat';
import NodeUpgradeUpload from './NodeUpgradeUpload';
import NodeUpgradeCompare from './NodeUpgradeCompare';
import NodeUpgradeBackupSelect from './NodeUpgradeBackupSelect';
import NodeUpgradeUploadAdd from './NodeUpgradeUploadAdd';
import NodeUpgradeSelectTomcat from './NodeUpgradeSelectTomcat';
import NodeUpgradeLoading from './NodeUpgradeLoading';
import UpdateHistory from '../update/UpdateHistory';

import * as api from '../api/node_upgrade_api';
import * as deployApi from '../api/node_deploy_api';
import * as manageApi from '../api/node_manage_api';

export default {
  name: 'NodeUpgrade',
  components: {
    NodeUpgradeUploadAdd, NodeSelect, NodeUpgradeSelectTomcat, NodeUpgradeUpload, NodeUpgradeCompare, NodeUpgradeBackupSelect, NodeUpgradeLoading, UpdateHistory,
  },
  mounted() {
    this.$refs.Upload.handleInit('', '', null);
    this.handleListNode();
  },
  data() {
    return {
      mainOperate: 'upgrade',
      loadingData: false,
      showUpload: true,
      fileType: '',
      appWarDir: '',
      appFile: {
        file: null,
        name: '',
        size: '0kb',
        modifyDate: '',
      },
      showTomcatDialog: false,
      fileList: [],
      fileData: null,
      force: false,
      selectionTableData: [],
      tableData: [
      ],
      tableSpan: {}, // map,   item.id -> tableSpanItem
      tableSpanItem: {
        index: 1,
        count: 1,
      },
      // 手动构造 tableData数据
      tableItem: {
        name: '', // 节点名称
        ip: '', // 节点ip
        id: '', // 节点id
        singleZip: '', // 独立升级包
        isSelected: false,
        tomcatInfo: {
          id: '',
          deployStatus: '', // 部署状态
          runningStatus: '', // 运行状态
          tomcatDir: '', // tomcatDir
        },
        backupTime: '',
      },
      updateHistory: {
        show: false,
        tomcatId: '',
      },
    };
  },
  methods: {
    handleHistory(index, row) {
      this.updateHistory.show = true;
      this.updateHistory.tomcatId = row.tomcatInfo.id;
    },
    handleReport(index, row) {
      deployApi.connectInfo([row.tomcatInfo.id]).then(res => {
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
    onEnterName(index, row) {
      row.tomcatInfo.editState = false;
      this.handleSaveTomcatName(index, row);
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
      deployApi.updateTomcatName(row.tomcatInfo)
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
    // 点击本地文件表格的一行
    handleClickTableRow(row, column, event) {
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
    handleListNode() {
      this.loadingData = true;
      // manageApi.listNode()
      //   .then(res => {
      //     res.data = res.data.filter(item => {
      //       return item.agentStatus === 'up';
      //     });
      //     res.data.forEach((item, index) => {
      //       this.$set(item, 'isSelected', false);
      //     });
      //     this.tableData = res.data;
      //     this.loadingData = false;
      //   })
      //   .catch(reason => {
      //     this.loadingData = false;
      //   });
      api.getAllTomcatOfUpgrade()
        .then(res => {
          this.loadingData = false;
          let tableData = [];
          console.log(res.data);
          res.data = res.data.filter(item => {
            return item.upgrade;
          });
          // 转换数据结构
          res.data.forEach((item, index) => {
            let nodeItem = {
              id: item.nodeId,
              name: item.nodeName,
              ip: item.ip,
              agentStatus: 'up',
              singleZip: '', // 独立升级包
              isSelected: false,
              backupTime: '',
              tomcatInfo: {
                id: item.id,
                deployStatus: item.deployStatus, // 部署状态
                runningStatus: item.runningStatus, // 运行状态
                tomcatDir: item.tomcatDir, // tomcatDir
                tomcatName: item.tomcatName,
                tomcatNameCache: item.tomcatName,
                version: item.version,
                editState: false,
              },
            };
            tableData.push(nodeItem);
          });
          // 按照 nodeName 排序
          // tableData.sort((item1, item2) => {
          //   if (item1.name > item2.name) {
          //     return 1;
          //   } else if (item1.name === item2.name) {
          //     return 0;
          //   } else {
          //     return -1;
          //   }
          // });
          // 计算tableSpan
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
        })
        .catch(reason => {
          this.loadingData = false;
        });
    },
    handleSelectionChange(selection) {
      this.selectionTableData = selection;
      this.tableData.forEach((item, index) => {
        item.isSelected = false;
      });
      this.selectionTableData.forEach((item, index) => {
        item.isSelected = true;
      });
    },
    onValideForm() {
      // 验证 表单
      // 1. 根据文件类型判断数据是否存在
      if (this.fileType.trim() === '') {
        this.$message.error('请先选择一个本地或者远程war包');
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
    onBackupSelected(selectTime, index) {
      // do nothing
      this.tableData[index].backupTime = selectTime;
    },
    handleDeploy(tomcatIds, formDataMap, force = false) {
      this.loadingData = true;
      deployApi.connectInfo(tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (formDataMap[item.tomcatId]) {
              formDataMap[item.tomcatId].connectInfo = item;
            }
          });
          this.$router.push({name: 'NodeUpgradeComplete', params: {data: JSON.stringify(this.selectionTableData), type: 'upgrade', force: String(force)}});
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
        });
    },
    onCompared() {
      // 执行升级
      let tomcatIds = [];
      let formDataMap = {};
      // 1. 判断是否包含正在运行的Tomcat
      this.selectionTableData.forEach((item, index) => {
        formDataMap[item.tomcatInfo.id] = item;
        tomcatIds.push(item.tomcatInfo.id);
      });
      this.handleDeploy(tomcatIds, formDataMap, this.force);
    },
    onUploadAdded(p, index) {
      p.then(res => {
        this.$refs.UploadAdd.close();
        this.$refs.UploadAdd.closeLoading();
        console.log(res.data, index);
        this.tableData[index].singleZip = res.data;
        this.tableData[index].isSelected = true;
      }).catch(reason => {
        this.$refs.UploadAdd.close();
        this.$refs.UploadAdd.closeLoading();
      });
    },
    onTomcatSelected(index, nodeId, tomcatInfo) {
      if (!this.tableData[index].tomcatInfo) {
        this.$set(this.tableData[index], 'tomcatInfo', tomcatInfo);
        this.$set(this.tableData[index], 'singleZip', '');
        this.$set(this.tableData[index], 'backupTime', '');
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

    handleNodeAdd() {
      // 处理添加缓存NodeId
      let cacheNodeIds = [];
      this.tableData.forEach((item, index) => {
        cacheNodeIds.push(item.id);
      });
      this.$refs.nodeSelect.show(cacheNodeIds, false);
    },
    handleSetTomcat(index, item) {
      this.$refs.nodeSelectTomcat.show(index, item.id);
    },

    handleUploadAdd(index, item) {
      this.$refs.UploadAdd.show(index, item.id, item.tomcatInfo.id, item.tomcatInfo);
    },
    handleSelectBackup(index, item) {
      this.$refs.BackupSelect.show(item.tomcatInfo.id, index);
    },
    handleReset(index, item) {
      // item.tomcatInfo = null;
      item.singleZip = '';
      item.backupTime = '';
    },
    isOnlyPrivateZip() {
      let allPrivate = true;
      this.selectionTableData.forEach((item, index) => {
        if (!item.singleZip || item.singleZip === '') {
          allPrivate = false;
        }
      });
      return allPrivate;
    },
    handleForceUpgrade() {
      this.selectionTableData = this.tableData.filter(item => {
        return item.isSelected;
      });
      // 验证升级文件字段
      if (!this.isOnlyPrivateZip() && !this.$refs.Upload.validForm()) {
        return;
      }
      // 验证节点
      if (!this.validNodeData()) {
        return;
      }
      let force = false;
      this.selectionTableData.forEach((item, index) => {
        if (item.tomcatInfo.runningStatus === 'UP') {
          force = true;
        }
      });
      if (force) {
        this.$confirm('选择的节点中包含正在运行Tomcat, 是否进行强制升级?', '升级提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.handleCompare();
        }).catch(() => {
          // do nothing
        });
      } else {
        this.handleCompare();
      }
    },

    validNodeData() {
      let valid = true;
      if (this.selectionTableData.length === 0) {
        valid = false;
        this.$alert('至少选择一个Tomcat', {type: 'error'});
      }
      this.selectionTableData.forEach((item, index) => {
        // 1. tomcatInfo 不等于 null
        if (!item.tomcatInfo || !item.tomcatInfo.id) {
          valid = false;
          this.$alert('存在没有配置tomcat的节点', {type: 'error'});
        }

        // 2. 如果是回退, 则选择了回退时间点
        if (this.mainOperate === 'backup') {
          if (!item.backupTime || item.backupTime === '') {
            valid = false;
            this.$alert('存在没有配置回退点的Tomcat', {type: 'error'});
          }
        }
      });
      return valid;
    },

    handleCompare() {
      // this.loadingData = true;
      // 1. 执行文件上传
      let uploadTomcatIds = [];
      let allTomcatIds = [];
      let nodeNameMap = {};
      this.selectionTableData.forEach((item, index) => {
        if (item.singleZip === '') {
          // 使用的 公共升级包
          uploadTomcatIds.push(item.tomcatInfo.id);
        }
        allTomcatIds.push(item.tomcatInfo.id);
        nodeNameMap[item.tomcatInfo.id] = item.tomcatInfo.tomcatName;
      });
      if (!this.isOnlyPrivateZip()) {
        let fileData = this.$refs.Upload.getFormData();
        fileData.append('tomcatIds', uploadTomcatIds.join(','));
        this.$refs.UploadLoading.show();
        api.uploadZip(fileData)
          .then(res => {
            // 上传处理
            return api.getCompareTree(allTomcatIds);
          })
          .then(res => {
            // this.loadingData = false;
            this.$refs.UploadLoading.close();
            // 对比处理
            this.$refs.Compare.show(res.data, nodeNameMap);
          })
          .catch(reason => {
            // this.loadingData = false;
            this.$refs.UploadLoading.close();
          });
      } else {
        this.loadingData = true;
        api.getCompareTree(allTomcatIds)
          .then(res => {
            this.loadingData = false;
            // 对比处理
            this.$refs.Compare.show(res.data, nodeNameMap);
          })
          .catch(reason => {
            this.loadingData = false;
          });
      }
    },
    handleBackup() {
      this.selectionTableData = this.tableData.filter(item => {
        return item.isSelected;
      });
      // 验证节点
      if (!this.validNodeData()) {
        return;
      }
      let tomcatIds = [];
      let formDataMap = {};
      // 1. 判断是否包含正在运行的Tomcat
      this.selectionTableData.forEach((item, index) => {
        formDataMap[item.tomcatInfo.id] = item;
        tomcatIds.push(item.tomcatInfo.id);
      });
      this.loadingData = true;
      deployApi.connectInfo(tomcatIds)
        .then(res => {
          this.loadingData = false;
          res.data.forEach((item, index) => {
            if (formDataMap[item.tomcatId]) {
              formDataMap[item.tomcatId].connectInfo = item;
            }
            this.$router.push({name: 'NodeUpgradeComplete', params: {data: JSON.stringify(this.selectionTableData), type: 'backup'}});
          });
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({message: reason});
        });
    },
  },
};
</script>

<style scoped>
/*/deep/ .el-input__inner{*/
/*  border: 0px solid white;*/
/*}*/
/*/deep/ .el-textarea__inner{*/
/*  border: 0px solid white;*/
/*}*/
/deep/ .el-form-item{
  margin-bottom: 10px;
}
/deep/ .el-upload-dragger{
  height: 140px;
}

/deep/ .el-radio__label{
  display: inline;
}

/deep/ .el-checkbox__original {
  pointer-events: none;
  display: none;
  height: 0px;
}

.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  display: inline-block;
  margin-top: 10px;
}
.war-clear {
  margin-left: -20px;
  margin-top: -15px;
  background-color: transparent;
  border: none;
  color: #a1a3a9;
  font-size: 16px;
}

/*升级历史标题栏*/
/deep/ .el-drawer__header {
  height: 40px;
  color: #303133;
  font-size: 18px;
  line-height: 40px;
  margin: 0px;
  padding: 0px 0px -20px 20px;
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
