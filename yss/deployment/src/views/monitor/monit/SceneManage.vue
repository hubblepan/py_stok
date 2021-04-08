<template>
  <d2-container>
    <div>
      <app-header :title="'场景列表'">
        <!--        <a :href="downloadUrl" rel="nofollow noreferrer">-->
        <!--          <el-button type="primary" size="mini" icon="el-icon-takeaway-box" v-if="false">监控大盘</el-button>-->
        <!--        </a>-->
      </app-header>

      <el-button class="d2-ml d2-mt d2-mb-10" type="success" size="small" @click="handleAddScene">新增场景</el-button>
      <el-table class="d2-ml" v-loading="loadingData"
                :data="sceneList" border style="width: 98%" max-height="750"  :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="name"
          label="场景名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="productLine"
          label="产品线"
          width="150">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="分析指标"-->
        <!--          align="center"-->
        <!--          width="100">-->
        <!--          <template slot-scope="scope">-->
        <!--&lt;!&ndash;            <el-button @click="handleNodeSetting" size="mini" type="danger" plain v-if="!scope.row.analysisMetricsVos">配置</el-button>&ndash;&gt;-->
        <!--            <el-button @click="handleAnalysisSetting(scope.$index, scope.row)" size="mini" type="info" plain v-if="scope.row.analysisMetricsVos">查看</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="analysisDataTime"
          label="分析时间(分钟)"
          align="center"
          width="130">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="触发指标"-->
        <!--          align="center"-->
        <!--          width="100">-->
        <!--          <template slot-scope="scope">-->
        <!--&lt;!&ndash;            <el-button @click="handleUISetting" size="mini" type="danger" plain v-if="!scope.row.serverList">配置</el-button>&ndash;&gt;-->
        <!--            <el-button @click="handleTriggerSetting(scope.$index, scope.row)" size="mini" type="info" plain v-if="scope.row.analysisMetricsVos">查看</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="triggerTime"
          label="触发时间(分钟)"
          align="center"
          width="130">
        </el-table-column>
        <el-table-column
          prop="serverList"
          label="关联Tomcat"
          align="center"
          width="260">
          <template slot-scope="scope">
            <el-button @click="handleNodeSetting(scope.$index, scope.row)" size="mini" type="danger" plain v-if="!scope.row.applicationNodeIds || scope.row.applicationNodeIds.length === 0">关联Tomcat</el-button>
            <div v-if="scope.row.tomcatList">
              <span>{{scope.row.tomcatList.map(item => {return item.tomcatName}).join(',')}}</span>
              <el-button type="info" icon="el-icon-edit" size="mini" circle  plain style="margin-left: 15px" @click="handleNodeSetting(scope.$index, scope.row)"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="场景描述">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="240" width="240">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleAnalysis(scope.$index, scope.row)" size="mini" type="primary">分析</el-button>
              <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="info">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <scene-add ref="SceneAdd" :on-upload="onAdded"></scene-add>
      <scene-update ref="SceneUpdate" :on-update="onUpdated"></scene-update>
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
import * as api from '../api/scene_api';

export default {
  name: 'SceneManage',
  components: {
    SceneTomcatSelect, SceneAdd, AppHeader, SceneUpdate,
  },
  data() {
    return {
      loadingData: false,
      sceneList: [],
      deployLoadingMap: {},
    };
  },
  created() {
    this.execListScene();
  },
  methods: {
    onAdded(p) {
      p.then(res => {
        // 成功
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
</style>
