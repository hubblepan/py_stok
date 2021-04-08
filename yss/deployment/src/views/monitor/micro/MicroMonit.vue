<template>
  <div>
    <app-header-new title="方案管理">
      <template v-slot:button-group>
        <span>每</span> <el-input style="width: 50px; margin: 0 10px; height: 15px" type="number" size="mini" placeholder="30" :min="10" v-model="refreshHz"></el-input> <span>秒刷新数据</span>
      </template>
    </app-header-new>
    <div>
      <el-alert
        title="部分服务器代理未启动， 微服务状态信息更新可能会不准确"
        type="warning"
        show-icon
        v-if="warningServerStatus"
        :closable="false">
      </el-alert>
      <el-row :gutter="12" style="margin: 0 14px;">
        <el-col :span="8">
          <div class="app-card-add-server" @click="handleAddProject" style="border: 1px dashed #e8e8e8; height: 285px; background: #fafafa; text-align: center; color: rgba(0, 0, 0, 0.4); cursor: pointer; padding-top: 70px;">
            <i class="iconfont iconfangan" style="font-size: 28px"></i>
            <div style="font-size: 14px">新增方案</div>
          </div>
        </el-col>
        <el-col v-for="item in projectList" :key="item.id" :span="8">
          <div class="app-card-server">
            <!--  方案名称  -->
              <span class="server-name">
                {{item.schemeName + (item.enableCluster ? '(集群)' : '')}}
              </span>
            <i class="el-icon-edit" style="color: rgba(0, 0,0, 0.4)" @click="handleRenameScheme(item)"></i>

            <div style="float: right; margin-right: 20px; font-size: 13px; color: rgba(0, 0, 0, 0.4)">创建者: {{item.creator}}</div>
            <div style="margin-left: 20px; line-height: 28px; height: 28px; font-size: 13px; color: rgba(0, 0, 0, 0.6)">{{item.des}}</div>
            <!-- 服务器状态 -->
            <div style="color: rgba(0,0,0,0.6); margin-left: 16px;margin-right: 16px; font-size: 16px">
              <el-popover
                v-for="serverItem in item.serverDigestVoList" :key="serverItem.id"
                :open-delay="400"
                placement="bottom"
                popper-class="scence-popover"
                width="510"
                effect="dark"
                trigger="hover">
                <div>
                  <div style="font-size: 14px">{{serverItem.ip}}</div>
                  <div style="font-size: 14px;" v-for="instanceItem in serverItem.microServInstanceList" :key="instanceItem.id">
                    <div class="app-inst-status" :style="{background: handleInstColor(instanceItem)}"></div>
                    <div style="margin-left: 10px; width: 120px; display: inline-block; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;">{{instanceItem.serviceCode}}</div>
                    <div style="margin-left: 10px; width: 240px; display: inline-block; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;">{{instanceItem.installDir}}</div>
                    <div class="app-inst-status-text" :style="{color: handleInstColor(instanceItem)}">{{handleInstText(instanceItem)}}</div>
                  </div>
                </div>
                <div  slot="reference"  style="display: inline-block">
                  <i class="iconfont iconfuwuqi1" :style="{margin: '8px', color: handleServerColor(serverItem), height: '60px'}"></i>
                </div>
              </el-popover>
              <div  style="display: inline-block; margin-left: 8px">
                <i class="iconfont iconadd-o" style="{margin: 8px; color: rgba(0,0,0,0.4); height: 60px}" @click="handleAddProjectNode(item)" ></i>
              </div>
            </div>
            <div style="margin: 0 16px">
              <el-divider></el-divider>
            </div>
            <div style="margin-left: 16px; margin-top: -8px; color: rgba(0, 0, 0, 0.8)">
              <span style="display: inline-block; width: 90px;">服务实例状态</span>
              <span style="display: inline-block; width: 70px;">未启动 {{item.noStartCount}}</span>
              <span style="display: inline-block; width: 60px;">正常 {{item.normalCount}}</span>
              <span style="display: inline-block; width: 50px;">异常 {{item.errorCount}}</span>
            </div>
            <div style="padding: 0px 16px;">
              <el-popover
                v-for="microLabel in item.microServiceDigestVoList" :key="microLabel.id"
                :visible-arrow="true"
                :open-delay="500"
                placement="bottom"
                width="510"
                trigger="hover">
                <div>
                  <div style="font-size: 14px">{{microLabel.serviceCode}}</div>
                  <div style="font-size: 14px;" v-for="instanceItem in microLabel.instanceVoList" :key="instanceItem.id">
                    <div class="app-inst-status" :style="{background: handleInstColor(instanceItem)}"></div>
                    <div style="margin-left: 10px; width: 120px; display: inline-block; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;">{{instanceItem.ip}}</div>
                    <div style="margin-left: 10px; width: 240px; display: inline-block; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;">{{instanceItem.installDir}}</div>
                    <div class="app-inst-status-text" :style="{color: handleInstColor(instanceItem)}">{{handleInstText(instanceItem)}}</div>
                  </div>
                </div>
                <div  slot="reference"  style="display: inline-block; width: 30%">
                  <el-tag class="micro-label" :style="{padding: '0 4px', borderLeftColor: microServiceStatus[microLabel.microServiceStatus], color: microServiceStatus[microLabel.microServiceStatus]}">{{microLabel.serviceCode}}</el-tag>
                </div>
              </el-popover>
            </div>

            <div style="position: absolute; left: 0; bottom: 0px; height: 40px; border-top: 1px solid #e8e8e8; width: 100%">
              <el-row>
                <el-col :span="8">
                  <div class="app-text-button app-button-group" @click="handleDeploy(item)">
                    <i class="iconfont iconbushu"></i>
                    <span>部署</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="app-text-button app-button-group" @click="handleExtService(item)">
                    <i class="iconfont iconbushu"></i>
                    <span>服务</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="app-text-button app-button-group" @click="handleDeleteScheme(item)">
                    <i class="iconfont iconclose"></i>
                    <span>删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <app-loading ref="AppLoading"></app-loading>
    <micro-ext-service-manage ref="ExtService"></micro-ext-service-manage>
    <micro-ext-db-manage ref="ExtDb"></micro-ext-db-manage>
  </div>
</template>

<script>
import AppHeaderNew from '../../../components/header/AppHeaderNew';
import * as api from '../api/micro_service_api';
import * as nodeApi from '../api/node_manage_api';
import AppLoading from '../../../components/AppLoading';
import MicroExtServiceManage from './MicroExtServiceManage';
import MicroExtDbManage from './MicroExtDbManage';
import { mapState, mapActions } from 'vuex';
const SERVER_STATUS = {
  INIT: 'rgba(0,0,0,0.4)',
  WARN: '#faad15',
  ERROR: '#ff4d4f',
  NORMAL: 'rgb(86, 194, 45)',
};
const INST_STATUS = {
  ERROR: '#ff4d4f',
  NO_START: 'rgba(0, 0, 0, 0.4)',
  NORMAL: 'rgb(86, 194, 45)',
};
const INST_STATUS_TEXT = {
  ERROR: '异常',
  NO_START: '未启动',
  NORMAL: '正常',
};
export default {
  name: 'MicroMonit',
  components: { MicroExtDbManage, MicroExtServiceManage, AppHeaderNew, AppLoading},
  props: ['onAddProject', 'onAddProjectNode'],
  created() {
    // this.initData();
  },
  mounted() {
    this.loadFromStorage(this.cacheKey)
      .then(res => {
        if (res) {
          this.refreshHz = parseInt(res);
        }
      });
    this.initData();
  },
  computed: {
    ...mapState('d2admin/user', [
      'info',
    ]),
  },
  data() {
    return {
      cacheKey: 'refreshHz_micro_monit',
      refreshTaskId: -1,
      refreshHz: 30,
      microServiceStatus: {
        WARN: '#faad15',
        ERROR: '#ff4d4f',
        NORMAL: 'rgb(86, 194, 45)',
        INIT: 'rgba(0, 0, 0, 0.4)',
      },
      warningServerStatus: false,
      projectItem: {
        id: '',
        // 方案信息
        schemeId: '1',
        schemeName: '方案1',
        schemeStatus: '',
        microServiceDigestVoList: [],
        serverDigestVoList: [],
        errorCount: 0,
        normalCount: 0,
        noStartCount: 0,
      },
      projectList: [],
    };
  },
  destroyed() {
    this.refreshHz = this.refreshHz < 10 ? 10 : this.refreshHz;
    this.saveToStorage(this.cacheKey, this.refreshHz + '');
    this.refreshTaskId !== -1 && clearTimeout(this.refreshTaskId);
  },
  methods: {
    handleAddProjectNode(item) {
      this.onAddProjectNode(item.schemeId, item.enableCluster, item.serverDigestVoList.map(serverItem => serverItem.ip));
    },
    handleExtService({schemeId}) {
      this.$refs.ExtService.show(schemeId);
      // this.$refs.ExtDb.show(schemeId);
    },
    async saveToStorage(key, value) {
      const db = await this.$store.dispatch('d2admin/db/database');
      db
        .set(key, value)
        .write();
      console.log(key, value);
    },

    async loadFromStorage(key) {
      const db = await this.$store.dispatch('d2admin/db/database');
      return db.get(key) && db.get(key).value();
    },
    initData(loading = true) {
      loading && this.showLoading();
      api.schemeList()
        .then(res => {
          this.hideLoading();
          this.projectList = res.data;
          this.refreshHz = this.refreshHz < 10 ? 10 : this.refreshHz;
          this.handleServerStatus();
          this.refreshTaskId = setTimeout(() => { this.initData(false); }, this.refreshHz * 1000);
        })
        .catch(reason => {
          this.hideLoading();
          this.refreshHz = this.refreshHz < 10 ? 10 : this.refreshHz;
          this.refreshTaskId = setTimeout(() => { this.initData(false); }, this.refreshHz * 1000);
          // do nth
        });
    },
    handleServerStatus() {
      nodeApi.listNode()
        .then(res => {
          let needWarning = false;
          res.data && res.data.forEach(item => {
            if (item.agentStatus !== 'up') {
              needWarning = true;
            }
          });
          this.warningServerStatus = needWarning;
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    handleAddProject() {
      this.onAddProject();
    },
    handleDeploy(item) {
      this.$router.push({name: 'MicroDeployUpgradeProgram', params: {scheme: JSON.stringify(item)}});
    },
    handleDeleteScheme(item) {
      this.$prompt('请输入删除原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\s\S]{20,100}/,
        // inputValidator: this.validTemplateName,
        inputErrorMessage: '字数控制在20~100范围内',
      }).then(({ value }) => {
        this.showLoading();
        return api.deleteScheme(item.schemeId, this.info.name, value);
      }).then(res => {
        this.hideLoading();
        this.initData(true);
        // do noth
      }).catch(() => {
      });
    },
    async validTemplateName(value) {
      try {
        let res = await api.schemeExits(value);
        if (!res.data) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    handleRenameScheme(item) {
      let newName = '';
      this.$prompt('请输入新的方案名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\s\S]{1,100}/,
        inputErrorMessage: '字数控制在1~100范围内',
      }).then(({ value }) => {
        newName = value;
        this.showLoading();
        return api.schemeExits(value);
      }).then(res => {
        if (!res.data) {
          return api.renameScheme(item.schemeId, newName);
        } else {
          this.hideLoading();
          this.$message.error('方案名称重复');
        }
      }).then(res => {
        this.hideLoading();
        this.initData(true);
        // do noth
      }).catch(() => {
        this.hideLoading();
      });
    },
    handleServerColor(item) {
      return SERVER_STATUS[item.serverStatus];
    },
    handleInstColor(item) {
      return INST_STATUS[item.runningStatus];
    },
    handleInstText(item) {
      return INST_STATUS_TEXT[item.runningStatus];
    },
    handleMicroServiceColor(item) {
      return this.microServiceStatus[item.microServiceStatus];
    },
    showLoading() {
      console.log(this, this.$refs.AppLoading);
      this.$refs.AppLoading.show();
    },
    hideLoading() {
      this.$refs.AppLoading.dismiss();
    },
  },
};
</script>

<style scoped>
  /deep/ .el-card {
    margin-bottom: 20px;
    height: 15rem;
  }

  .server-status {
    margin: 0px 10px;
    font-size: 1.5rem;
    height: 1.5rem;
    width: 1.2rem;
  }

  .micro-label {
    border: none;
    border-radius: 0;
    border-left: 2px solid rgba(0, 0, 0, 0.4);
    font-size: 14px;
    background: white;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    width: 30%;
    /*text-overflow: ellipsis; overflow:hidden; white-space:nowrap;*/
    cursor: default;
  }

  .micro-label2 {
    border: 1px solid #ff4d4f;
    border-radius: 7px;
    font-size: 10px;
    background: #ff4d4f;
    vertical-align: top;
    font-weight: 400;
    color: white;
    max-width: 90%;
    width: auto;
    display: inline-block;
    text-align: center;
    text-overflow: ellipsis; overflow:hidden; white-space:nowrap;
    cursor: default;
  }

  /deep/ .el-tag {
    height: 14px;
    line-height: 14px;
    margin: 1px 2px;
    padding: 0 0 0 4px;
  }

  /deep/ .el-card__body{
    padding: 10px;
  }

  .app-card-server {
    position: relative;
    width: 100%;
    height: 285px;
    border: 1px solid #e8e8e8;
    padding-top: 10px;
    margin-bottom: 16px;
  }
  .server-name {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0,0,0,0.8);
    margin-left: 16px;
    margin-right: 16px;
  }

  .app-server-state {
    color: #999999;
    font-size: 16px;
  }
  /deep/ .el-divider--horizontal{
    width: 100%;
    margin: 12px 0px;
  }

  .app-text-button {
    height: 48px;
    line-height: 48px;
    width: 68px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }

  .app-text-button i, span{
    width: 24px;
    height: 18px;
    font-size: 12px;
  }
  .app-text-button span{
    font-weight: 500;
    margin-left: 4px;
  }
  .app-text-button:hover {
    color: rgba(41, 105, 255, 1);
  }
  .app-button-group {
    height: 40px;
    line-height: 40px;
    width: 80%;
    text-align: center;
    font-size: 14px;
  }
  .app-button-group i{
    width: 24px;
    height: 18px;
    font-size: 16px;
  }
  .app-button-group span{
    top: 0px;
    position: absolute;
  }
  .app-inst-status{
    width: 6px;
    height: 6px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 5px
  }
  .app-inst-status-text{
    margin-left: 10px; width: 80px; display: inline-block; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;
  }

  /deep/ .el-popover__title{
    font-size: 14px;
  }
  .el-input--mini /deep/ .el-input__inner{
    height: 22px;
    line-height: 22px;
    padding-right: 0px;
  }
</style>
