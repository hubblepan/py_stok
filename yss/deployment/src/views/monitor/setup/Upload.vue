<template>
  <div>
    <div style="height: 40px; font-size: 14px; line-height: 40px; display: none" v-loading="loadingNodeList">
      <el-dropdown @command="handleSwitchNode">
        <el-button :type="dropDownType" plain size="small">
          {{nodeSelected ? nodeSelected.ip : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择节点&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in nodeList" :key="item.ip" :command="item">{{item.ip}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-tabs v-model="nodeLabel" type="card" @tab-click="handleCommand" style="margin-left: -21px;">
      <el-tab-pane v-for="item in nodeList" :key="item.ip" :label="item.ip" :name="item.ip"></el-tab-pane>
    </el-tabs>
    <div v-loading="configInfoLoading" v-if="nodeSelected">
      <el-button @click="handleAddTomcat" type="success" size="mini" style="margin-top: 10px; margin-bottom: 10px;">新加Tomcat</el-button>
      <el-table
        ref="tomcatTable"
        :data="tableData"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        @row-click="handleClickRow"
        border
        :row-class-name="handleHighlightLasted"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column align="center" fixed="left" width="40">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.tomcatDir"
              :show-overflow-tooltip="false"
              @change.native="handleClickRow(scope.row)"
              v-model="tomcatSelectd.tomcatDir"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed label="Tomcat名称" prop="tomcatName">
          <template slot-scope="scope">
            <div>
              <el-tooltip :content="scope.row.tomcatDir" placement="top">
                <span @dblclick.stop="changeTomcatName(scope.$index, scope.row)" v-if="!(scope.row.editState)">{{scope.row.tomcatName}}</span>
              </el-tooltip>
              <span v-if="lastedTomcatId === scope.row.id && !(scope.row.editState)" class="new-tomcat">new</span>
              <el-input v-if="scope.row.editState" v-model="scope.row.tomcatNameCache" @blur.native.capture="handleSaveTomcatName(scope.$index, scope.row)" v-on:keyup.enter.native="onEnterName(scope.$index, scope.row)" size="mini" style="margin-right: 20px; width: 80%" ref="InputTomcatName"></el-input>
            </div>
<!--            <el-button type="info" icon="el-icon-edit" circle size="mini" @click.stop="changeTomcatName(scope.$index, scope.row)" style="margin-left: 10px"></el-button>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="部署状态" prop="deployStatus" width="160">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.deployStatus==='noDeploy'">未部署</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">未部署</div>
            </el-tooltip>

            <el-tag type="success" v-if="scope.row.deployStatus==='deploying'">部署中</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">部署中</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="运行状态" prop="runningStatus" width="160">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.runningStatus==='DOWN'">未启动</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">未启动</div>
            </el-tooltip>

            <el-tag type="success" v-if="scope.row.runningStatus==='UP'">运行中</el-tag>
            <el-tooltip content placement="top">
              <div slot="content">运行中</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="关联war" prop="warName" width="280">
          <template slot-scope="scope">
            <el-button @click="handleSelectWar(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!scope.row.warDir && tomcatSelectd && scope.row.tomcatDir === tomcatSelectd.tomcatDir">点击选择</el-button>
            <div v-if="scope.row.warDir">
              <el-tooltip :content="scope.row.warDir" placement="top">
                <span>YSSUCOBRIDGE.war</span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" prop="warName" width="100">
          <template slot-scope="scope">
            <el-button @click="handleSelectWar(scope.$index, scope.row)" size="mini" type="warning" plain v-if="scope.row.warDir" icon="el-icon-upload">更新</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span style="font-size: 12px; color: #909399;">注1: 双击 'Tomcat名称' 单元格可以修改Tomcat名称,  按 enter 键可以保存Tomcat名称</span>
      <!--</div>-->
      <!--</el-scrollbar>-->
    </div>
    <node-add-tomcat :on-tomcat-added="onTomcatAdded" ref="nodeAddTomcat"></node-add-tomcat>
    <!-- 添加应用 -->
    <node-add-war :on-node-war-added="onWarChanged" ref="nodeChangeWar"></node-add-war>
    <tomcat-modify :on-save="onSaveTomcatName" ref="TomcatModify"></tomcat-modify>
  </div>
</template>
<script>
import * as api from './api';
import NodeAddTomcat from '../nodes/NodeAddTomcat';
import NodeAddWar from '../nodes/NodeAddWar';
import TomcatModify from './TomcatModify';
import * as nodeManageApi from '../api/node_manage_api';
import * as nodeDeployApi from '../api/node_deploy_api';
export default {
  name: 'upload',
  components: {
    TomcatModify,
    NodeAddTomcat,
    NodeAddWar,
  },
  props: ['noClickFromIndex'],
  data() {
    return {
      nodeList: '',
      nodeSelected: null,
      nodeLabel: '',
      tomcatSelectd: {id: '', warDir: '', tomcatDir: ''},
      dropDownType: 'danger',
      configInfoLoading: false, // 是否loading
      loadingNodeList: false,
      editState: false, // 父组件按钮是否可编辑
      tableData: [],
      lastedTomcatId: '',
    };
  },
  mounted() {
    // this.showData();
    this.handleListNode();
  },
  created() {
    // 获取父组件上的noclick
    // this.noClickFromIndex = false;
    this.$emit('noClickFromIndex', false);
  },
  methods: {
    onEnterName(index, row) {
      row.editState = false;
      this.handleSaveTomcatName(index, row);
    },
    handleSaveTomcatName(index, row) {
      // this.$refs.InputTomcatName.focus();
      row.editState = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (i !== index && this.tableData[i].tomcatName === row.tomcatNameCache) {
          this.$alert('存在相同的Tomcat名称, 请重新修改');
          return;
        }
      }
      let originName = row.tomcatName;
      row.tomcatName = row.tomcatNameCache;
      nodeDeployApi.updateTomcatName(row)
        .then(res => {
          // do nth
        })
        .catch(reason => {
          // do nth
          row.tomcatName = originName;
        });
    },
    handleHighlightLasted({row, rowIndex}) {
      if (row.id === this.lastedTomcatId) {
        return 'success-row';
      }
      return '';
    },
    onSaveTomcatName(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.TomcatModify.closeLoading();
        this.$refs.TomcatModify.close();
        // 刷新节点列表
        this.execListTomcat();
      })
        .catch(reason => {
          this.$refs.TomcatModify.closeLoading();
        });
    },
    changeTomcatName(index, item) {
      item.editState = true;
      this.$nextTick(() => {
        this.$refs.InputTomcatName.focus();
      });

      // this.$refs.TomcatModify.show(item);
    },
    handleCommand({index}) {
      this.nodeSelected = this.nodeList[parseInt(index)];
      this.dropDownType = 'primary';
      this.tableData = [];
      this.tomcatSelectd = {id: '', warDir: '', tomcatDir: ''};
      this.configInfoLoading = true;
      this.execListTomcat();
      this.$emit('modifyNode', this.nodeSelected); // 切换tomcat重置数据
    },

    handleListNode() {
      // do nothing
      this.loadingNodeList = true;
      this.editState = false;
      this.$emit('editState', this.editState, this.loadingNodeList); // 请求完了，按钮可用
      nodeManageApi.listNode()
        .then(res => {
          this.loadingNodeList = false;
          // do
          this.nodeList = res.data.filter((item) => {
            return item.agentStatus === 'up';
          });
          this.nodeSelected = this.nodeList && this.nodeList.length > 0 && this.nodeList[0];
          this.nodeLabel = this.nodeSelected && this.nodeSelected.ip;
          this.nodeLabel && this.handleCommand({index: '0'});
          this.editState = true;
          this.$emit('editState', this.editState, this.loadingNodeList); // 请求完了，按钮可用
        })
        .catch(reason => {
          this.loadingNodeList = false;
          this.editState = true;
          this.$emit('editState', this.editState, this.loadingNodeList); // 请求完了，按钮可用
          // do
          this.$alert(reason);
        });
    },
    onWarChanged(p, index) {
      p.then(res => {
        this.$refs.nodeChangeWar.close();
        this.$refs.nodeChangeWar.closeLoading();
        this.tableData[index].warDir = res.data;
        this.$emit('tcdir', this.tomcatSelectd);
      }).catch(reason => {
        this.$refs.nodeChangeWar.close();
        this.$refs.nodeChangeWar.closeLoading();
      });
    },
    onTomcatAdded(p) {
      p.then(res => {
        // 成功
        this.$refs.nodeAddTomcat.close();
        this.$refs.nodeAddTomcat.closeLoading();
        this.lastedTomcatId = res.data;
        this.execListTomcat();
      }).catch(reason => {
        console.log(reason);
        this.$refs.nodeAddTomcat.closeLoading();
      });
    },
    handleSwitchNode(newNode) {
      this.nodeSelected = newNode;
      this.dropDownType = 'primary';
      this.tomcatSelectd = {id: '', warDir: '', tomcatDir: ''};
      this.tableData = [];
      this.execListTomcat();
      this.$emit('modifyNode', this.nodeSelected); // 切换tomcat重置数据
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    execListTomcat() {
      this.configInfoLoading = true;
      this.editState = false;
      this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
      nodeDeployApi.listNodeTomcat(this.nodeSelected.id)
        .then(res => {
          this.configInfoLoading = false;
          let newIndex = -1;
          res.data.forEach((item, index) => {
            this.$set(item, 'tomcatNameCache', item.tomcatName);
            this.$set(item, 'editState', false);
            if (item.id === this.lastedTomcatId) {
              newIndex = index;
            }
          });
          newIndex !== -1 && this.swapArray(res.data, 0, newIndex);
          console.log(newIndex, 'aaaa');
          this.tableData = res.data;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
        })
        .catch(reason => {
          this.configInfoLoading = false;
          this.editState = true;
          this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
        });
    },
    handleAddTomcat() {
      this.$refs.nodeAddTomcat.show(this.nodeSelected.id);
    },
    handleClickRow(row) {
      this.tomcatSelectd = row;
      this.$emit('modifyTomcat', row); // 切换tomcat重置数据
      this.$emit('tcdir', this.tomcatSelectd);
    },

    handleSelectWar(index, item) {
      this.$refs.nodeChangeWar.show(index, this.nodeSelected.id, item.id);
    },
  },
};
</script>

<style>
.new-tomcat {
  color: red;
  font-style: italic;
  margin-left: 20px;
}
/*展示列表的区域，超过200px出现滚动条*/
.wraptable {
  max-height: 300px;
}

.el-tree-node .is-current {
  background-color: #f5f7fa;
}
.el-tree-node_content {
  height: 2.5rem;
  line-height: 2.5rem;
}
.el-tree {
  height: 21.875rem;
  overflow: auto;
  border: 1px solid #e3e3e3;
  background: #fff;
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 5;
}

.el-radio__label {
  display: none;
}
</style>
<style scoped>
.table-container {
  height: 300px;
  overflow-y: auto;
}
/*去除table多出的横线*/
.el-table::before,
.el-table__fixed::before,
.el-table__fixed-right::before {
  z-index: inherit !important;
}
/*  element-ui table的去除右侧滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}

/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
}

.el-table__body-wrapper {
  height: 300px !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

/deep/ .el-button--mini{
  font-size: 10px;
}

/deep/ .el-button--mini.is-circle {
  padding: 3px;
}

/*!*选中一行，颜色加深，字体加粗*!*/
/*#tem-tomcatServer >>> .current-row > td {*/
/*  background-color: #409eff8a !important;*/
/*  font-weight: bold;*/
/*}*/
</style>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
