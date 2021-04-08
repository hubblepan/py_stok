<template>
  <div class="mt-3">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="上传文件" description=""></el-step>
      <el-step title="Tomcat" description=""></el-step>
      <el-step title="数据库" description=""></el-step>
      <el-step title="消息总线" description=""></el-step>
      <el-step title="服务注册中心" description=""></el-step>
    </el-steps>
    <div :is="comName">
      <Upload></Upload>
      <Tomcat-settings></Tomcat-settings>
      <Database-settings></Database-settings>
      <Msg-settings></Msg-settings>
      <Service-settings></Service-settings>
    </div>
    <div style="float: right;" class="mr-2">
      <el-button class="mt-3" type="primary" @click="prev(active)" v-if="showPrevBtn">上一步</el-button>
      <el-button class="mt-3" type="primary" @click="next(active)">下一步</el-button>
    </div>
  </div>
</template>
<script>
import * as validate from '@/libs/validate';
import Upload from '@/views/monitor/setup/Upload';
import TomcatSettings from '@/views/monitor/setup/TomcatSettings';
import DatabaseSettings from '@/views/monitor/setup/DatabaseSettings';
import MsgSettings from '@/views/monitor/setup/MsgSettings';
import ServiceSettings from '@/views/monitor/setup/ServiceSettings';
export default {
  name: 'SetupSummary',
  components: {
    Upload,
    TomcatSettings,
    DatabaseSettings,
    MsgSettings,
    ServiceSettings,
  },
  data () {
    return {
      showPrevBtn: false,
      cpnNamesArr: ['upload', 'TomcatSettings', 'DatabaseSettings', 'MsgSettings', 'ServiceSettings'],
      comName: 'upload',
      active: 0,
      labelPosition: 'left',
      configInfo: {},
      stepOneFinish: true,
      stepTwoFinish: false,
      stepThreeFinish: false,
      rules: {
        // 部署目录
        dir: {
          value: [
            { required: true, message: '请输入部署目录', trigger: 'blur' },
            {
              pattern: validate.cateExp().exp,
              message: validate.cateExp().msg,
              trigger: 'blur',
            },
          ],
        },
        databaseIp: {
          value: [
            { required: true, message: '请输入部署目录', trigger: 'blur' },
            {
              pattern: validate.ipExp().exp,
              message: validate.ipExp().msg,
              trigger: 'blur',
            },
          ],
        },
        // 客户端端口
        port: {
          value: [
            { required: true, message: '请输入客户端端口号' },
            { type: 'number', message: '客户端端口号在1-65535之间' },
          ],
        },
      },
    };
  },
  methods: {
    prev (index) {
      if (this.active < 0) {
        this.showPrevBtn = false;
        this.active = 0;
      }
      index--;
      if (this.active-- < 2) {
        this.active = 0;
        this.showPrevBtn = false;
      }
      this.comName = this.cpnNamesArr[index];
    },
    next (index) {
      if (this.active > 0) {
        this.showPrevBtn = true;
      }
      if (this.active++ > 3) {
        this.active = 0;
        this.$message({
          message: '配置已完成',
          type: 'success',
        });
      }
      this.comName = this.cpnNamesArr[index];
    },
    tab (tabName) {
      this.comName = tabName;
    },
  },
};
</script>
<style lang="css" scoped></style>
