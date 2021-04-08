<template>
  <d2-container>
    <div>
      <app-header :title="'场景大盘'">
        <div>
          <el-form size="mini" v-model="formData" :label-position="'left'" label-width="70px" :inline="true" style="margin-top: 12px;">
            <el-form-item label="" size="mini">
              <el-select v-model="formData.refreshHz" placeholder="刷新频率" @change="onRefreshHzChange" style="width: 90px" @click="handleExport">
                <el-option label="20s刷新" value="20"></el-option>
                <el-option label="40s刷新" value="40"></el-option>
                <el-option label="60s刷新" value="60"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" size="mini">
              <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
      </app-header>
      <!--      <div class="d2-mt-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">-->
      <!--        <el-button size="mini" type="primary" @click="handleAddProgram">添加程序</el-button>-->
      <!--      </div>-->
      <div>
        <el-row style="margin-top: -1px;">
          <el-col :span="4">
            <el-table
              :data="sceneList"
              style="margin: 0px 20px 0px 0px; width: 100%"
              :row-class-name="tableRowClassName"
              @row-click="handleClickTableRow"
              row-key="id"
              :show-header="false"
              border
              :tree-props="{children: 'children'}">
              <el-table-column
                prop="name"
                label="场景列表">
                <template slot-scope="scope">
                  <div style="cursor: pointer">
                    <i class="el-icon-picture" style="margin-right: 5px; font-size: 16px;"></i>
                    {{scope.row.name}}
                    <div style="float: right; width: 16px; height: 16px; border-radius: 8px;background: red; color: white; font-size: 0.7rem; margin-top: 3px; text-align: center; line-height: 16px;">
                      3
                    </div>
<!--                    <i class="el-icon-apple" style="float: right; margin-top: 3px;"></i>-->
                  </div>
                </template>
              </el-table-column>
            </el-table>
<!--            <el-button class="d2-ml d2-mt d2-mb-10" type="success" size="small" @click="handleAddScene">新增场景</el-button>-->
<!--            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="info">修改</el-button>-->
          </el-col>
          <el-col :span="20">
            <div style="border-left: 1px solid #ebeef5; margin-top: 0px">
              <div v-for="item in sceneList" :key="item.id">
                <scene-detail ref="SceneDetail" v-if="currentRow === item" :prop-scene-vo="item"></scene-detail>
              </div>
              <!--              -->
              <!--              <micro-deploy-upgrade-program-list :on-change-deploy="handleDeploy" ref="ProgramList" v-if="currentRow && currentRow.id === '2'"></micro-deploy-upgrade-program-list>-->
              <!--              <micro-deploy-upgrade-step ref="Step" v-if="currentRow && currentRow.id === '5'"></micro-deploy-upgrade-step>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div>
<!--      <scene-add ref="SceneAdd" :on-upload="onAdded"></scene-add>-->
<!--      <scene-update ref="SceneUpdate" :on-update="onUpdated"></scene-update>-->
      <scene-tomcat-select :on-selected="onTomcatSelected" ref="SceneTomcatSelect"></scene-tomcat-select>
    </div>
  </d2-container>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import SceneAdd from './SceneAdd';
import SceneUpdate from './SceneUpdate';
import NodeSelect from '../nodes/NodeSelect';
import SceneTomcatSelect from './SceneTomcatSelect';
import SceneDetail from './SceneDetail';
import * as api from '../api/scene_api';

const baseUrl = process.env.VUE_APP_MONITOR_API;

export default {
  name: 'SceneMonit',
  components: {
    SceneDetail, SceneTomcatSelect, SceneAdd, AppHeader, SceneUpdate,
  },
  data() {
    return {
      formData: {
        refreshHz: '20',
      },
      loadingData: false,
      sceneList: [],
      deployLoadingMap: {},
      currentRow: null,
      currentRefreshTaskId: 0,
    };
  },
  created() {
    this.execListScene();
  },
  methods: {
    handleExport() {
      if (this.currentRow) {
        let reportUrl = baseUrl + '/scene/latest/node/application/scene/data/export?sceneId=' + this.currentRow.id;
        let applicationIdsParams = '';
        if (this.currentRow.applicationNodeIds) {
          applicationIdsParams = '&applicationIdList=' + this.currentRow.applicationNodeIds.join('&applicationIdList=');
        }
        console.log(reportUrl + applicationIdsParams);
        window.open(reportUrl + applicationIdsParams);
      }
    },
    onRefreshHzChange(val) {
      this.currentRefreshTaskId && clearInterval(this.currentRefreshTaskId);
      this.currentRefreshTaskId = setInterval(() => {
        this.$refs.SceneDetail.length > 0 && this.$refs.SceneDetail[0].refresh();
      }, parseInt(this.formData.refreshHz) * 1000);
    },
    handleClickTableRow(row, event, column) {
      this.currentRow = row;
    },
    getCurrentIndex() {
      let currentIndex = -1;
      this.sceneList.forEach((item, index) => {
        if (item.id === this.currentRow.id) {
          currentIndex = index;
          return currentIndex;
        }
      });
      return currentIndex;
    },
    handleDeploy() {

    },
    tableRowClassName({row, rowIndex}) {
      if (this.currentRow && this.currentRow.id === row.id) {
        return 'warning-row';
      }
      return '';
    },

    onAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.SceneAdd.closeLoading();
        this.$refs.SceneAdd.close();
        // 刷新节点列表
        this.execListScene();
      }).catch(reason => {
        console.log(reason);
        this.$refs.SceneAdd.closeLoading();
      });
    },
    onUpdated(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.SceneUpdate.closeLoading();
        this.$refs.SceneUpdate.close();
        // 刷新节点列表
        this.execListScene();
      }).catch(reason => {
        console.log(reason);
        this.$refs.SceneUpdate.closeLoading();
      });
    },
    onTomcatSelected(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.SceneTomcatSelect.closeLoading();
        this.$refs.SceneTomcatSelect.close();
        // 刷新节点列表
        this.execListScene();
      }).catch(reason => {
        console.log(reason);
        this.$refs.SceneUpdate.closeLoading();
      });
    },
    handleAddScene() {
      this.$refs.SceneAdd.show();
    },
    handleStop(index, item) {
      // do nothing
      this.$refs.SceneManageNode.show();
    },
    // handleTriggerSetting(index, item) {
    //   this.$refs.SceneUpdate.show(item);
    // },
    // handleAnalysisSetting(index, item) {
    //   this.$refs.SceneUpdate.show(item);
    // },
    handleNodeSetting(index, item) {
      this.$refs.SceneTomcatSelect.show(item.id, item.applicationNodeIds, index);
    },
    handleAnalysis(index, item) {
      this.$router.push({name: 'SceneAnalysis', params: {sceneVo: item}});
    },
    handleUpdate(index, item) {
      this.$refs.SceneUpdate.show(item);
    },
    getAllTomcat() {
      this.loadingData = true;
      api.getAllTomcat()
        .then(res => {
          this.loadingData = false;
          // do nth
          let tomcatIdMap = {};
          res.data.forEach(item => {
            item.id && (tomcatIdMap[item.id] = item);
          });
          this.sceneList.forEach(item => {
            let tomcatInfoList = [];
            item.applicationNodeIds.forEach(id => {
              tomcatInfoList.push(tomcatIdMap[id]);
            });
            this.$set(item, 'tomcatList', tomcatInfoList);
          });
        })
        .catch(reason => {
          this.loadingData = false;
          // do nth
        });
    },
    execListScene() {
      this.loadingData = true;
      api.getSceneList()
        .then(res => {
          this.loadingData = false;
          this.sceneList = res.data;
          res.data.forEach(item => {
            this.$set(item, 'tomcatList', item.applicationList);
          });
          this.currentRow = this.sceneList && this.sceneList.length > 0 ? this.sceneList[0] : null;
          this.formData.refreshHz = '20';
          this.$nextTick(() => {
            this.onRefreshHzChange('20');
          });
          // this.onRefreshHzChange('20');
        })
        .catch(reason => {
          this.loadingData = false;
        });
      // this.loadingData = true;
      // api.listNode()
      //   .then(res => {
      //     this.loadingData = false;
      //     this.sceneList = res.data;
      //     this.sceneList.forEach((item, index) => {
      //       if (!this.deployLoadingMap[item.id]) {
      //         this.deployLoadingMap[item.id] = false;
      //       }
      //       this.$set(item, 'agentAction', this.deployLoadingMap[item.id]);
      //     });
      //   })
      //   .catch(reason => {
      //     this.loadingData = false;
      //     this.$message.error({
      //       message: reason,
      //     });
      //   });
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: #F5F7FA;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
