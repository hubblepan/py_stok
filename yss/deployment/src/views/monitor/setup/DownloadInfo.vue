<template>
  <div id="tem-download" v-loading="configInfoLoading">
    <!-- 标题 栏-->
    <div style="height: 60px; font-size: 18px; line-height: 60px; margin-left: 20px;">系统实时监控数据资源</div>
    <el-divider></el-divider>
    <!-- 工具栏-->
    <div style=" padding-left: 20px; padding-right: 20px; margin: 20px 0">
      <div style="font-size: 13px; color: #212529">Tomcat目录:  {{tomcatInfo.tomcatDir}}
      </div>

      <div style="font-size: 13px; border-bottom: dotted; border-bottom-color: rgba(0, 0, 0, 0.2); border-bottom-width: 1px; padding-bottom: 5px; margin-top: 20px">监控日期:
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          size="mini">
        </el-date-picker>
        <a :href="downloadUrl" rel="nofollow noreferrer">
          <el-button
            class="down-ctn"
            icon="el-icon-download"
            type="primary"
            size="mini"
          >点此下载监控信息</el-button>
        </a>

      </div>
    </div>
    <div class="card-ctn">
      <el-row>
        <el-col :span="16">
          <el-card :body-style="{ padding: '0px',textAlign:'center' }">
            <img class="image" src="@/assets/images/monitor_1.png" />
            <img class="image" src="@/assets/images/monitor_2.png" />
            <div style="padding: 14px; position: relative;text-align:center;">
              <h5 style="font-weight:bold">估值系统监控信息</h5>
              <p
                style="width:400px;margin:20px auto;text-align:center;color:grey"
              >获取估值系统运行信息，如CPU、内存以及线程堆栈等系统运行信息，方便问题快速定位</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import request from '@/plugin/axios';
import dateFormat from '../../../utils/dateFormat';
import * as deployApi from '../api/node_deploy_api';

export default {
  name: 'DownloadInfo',
  data() {
    return {
      tomcatInfo: {tomcatDir: '', id: ''},
      dateRange: [dateFormat('yyyy-MM-dd', new Date()), dateFormat('yyyy-MM-dd', new Date())],
      disabled: false,
      configInfoLoading: false, // 是否loading
      baseUrl: '',
    };
  },
  mounted() {
    Object.assign(this.tomcatInfo, this.$route.params.tomcatInfo);
    // if (!this.tomcatDir) {
    //   this.$store.dispatch('d2admin/page/close', {
    //     tagName: '下载监控信息',
    //   });
    // }

    deployApi.connectInfo([this.tomcatInfo.id])
      .then(res => {
        let connectVo = res.data[0];
        this.baseUrl = 'http://' + connectVo.ip + ':' + connectVo.socketPort;
      })
      .catch(reason => {

      });
  },
  beforeDestroy() {
    console.log();
    // sessionStorage.setItem('tomcatDir', this.tomcatDir);
    // this.writeData();
  },
  computed: {
    downloadUrl() {
      return this.baseUrl + '/deploy/download/monitoringdata?startDate=' + this.dateRange[0] + '&endDate=' + this.dateRange[1] + '&tomcatDir=' + this.tomcatInfo.tomcatDir;
    },
  },
  methods: {
    // async writeData() {
    //   const db = await this.$store.dispatch('d2admin/db/database');
    //   db.set('tomcatDirInDownloadInfo', this.tomcatDir).write();
    // },
    // async readData() {
    //   const db = await this.$store.dispatch('d2admin/db/database');
    //   console.log(db.get('tomcatDirInDownloadInfo').value());
    //   return db.get('tomcatDirInDownloadInfo').value().then(res => {
    //     console.log(res);
    //   });
    // },
  },
};
</script>
<style lang="css" scoped>
  /deep/ .el-divider--horizontal {
    margin: 0px;
    padding: 0px;
  }
  #tem-download {
    position: relative;
    min-height: 400px;
  }
  .card-ctn{
    width: 990px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .down-ctn {
    margin-left: 10px;
    margin-bottom: 5px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 50%;
    padding: 20px 40px 0 40px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }

#tem-download >>> .el-loading-spinner .circular {
    height: 100px;
    width: 100px;
  }
</style>
