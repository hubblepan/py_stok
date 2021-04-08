<template>
  <el-scrollbar v-bind:style="{height: timelineHeight + 'px'}" id="scrollbar" ref="scrollbar">
  <div style="padding: 20px 20px">
    <el-timeline v-loading="loading" v-bind:style="{height: timelineHeight + 'px'}" v-if="dataList && dataList.length > 0">

        <el-timeline-item v-for="item in dataList" v-bind:timestamp="item.time" placement="top" v-bind:key="item.time" color="#67C23A">
          <el-card>
            <p style="margin: 10px 0px">操作人:   {{item.operator}}</p>
            <p style="margin: 10px 0px">升级内容:   {{item.content}}</p>
            <p style="margin: 10px 0px 0px 0px">文件变更列表:</p>
            <ul>
              <li v-for="f in item.upgradeFileVoList" v-bind:key="f.fileName"><el-link :href="f.downLoadUrl" type="primary" >{{f.fileName}}</el-link></li>
            </ul>
          </el-card>
        </el-timeline-item>
    </el-timeline>
    <app-empty v-if="!dataList || dataList.length === 0"></app-empty>
  </div>
  </el-scrollbar>
</template>

<script>

import * as api from '../api/node_upgrade_api';
import AppEmpty from '../../../components/header/AppEmpty';
export default {
  name: 'UpdateHistory',
  props: ['tomcatId'],
  components: {
    AppEmpty,
  },
  data() {
    return {
      loading: false,
      dataList: [], // "content": "","operator": "","time": "", "versionName": ""
      timelineHeight: 937,
    };
  },
  methods: {
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
  mounted() {
    console.log('updateHistory counted');
    // 获取历史升级信息
    this.loading = true;
    this.timelineHeight = this.getClientHeight() - 64;
    console.log('clientHeight:', this.timelineHeight);
    api.upgradeHistoryInfo(this.tomcatId).then(res => {
      this.loading = false;
      if (res.success) {
        this.dataList = res.data;
      }
    }).catch(reason => {
      this.loading = false;
      console.log(reason);
      //
    });
  },
};
</script>

<style scoped>
  /deep/ .el-dialog__header {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  /deep/ .el-dialog__body {
    margin-top: 0;
    padding-top: 0;
  }
</style>
