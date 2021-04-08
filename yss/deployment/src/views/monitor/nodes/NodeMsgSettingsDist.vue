<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="180px" ref="configForm" label-position="left">
      <el-form-item label="分布式节点" prop="nodeIp" style="width: 500px;">
        <el-input placeholder="请输入消息总线Broker名称" v-model="formData.brokerName" :title="formData.brokerName"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="16">
          <el-form-item label="消息总线地址" prop="ip">
            <el-input placeholder="ip地址" v-model="formData.ip" :title="formData.ip">
            </el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="1">-->
        <!--<div style="text-align: center;line-height: 40px">:</div>-->
        <!--</el-col>-->
        <el-col :span="7">
          <el-form-item label-width="0px" prop="port">
            <el-input :max="65535" :min="0" placeholder="端口号" type="number" v-model="formData.port" :title="formData.port">
              <template slot="prepend">:</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="消息总线Broker名称" prop="brokerName" style="width: 500px;">
        <el-input placeholder="请输入消息总线Broker名称" v-model="formData.brokerName" :title="formData.brokerName"></el-input>
      </el-form-item>
      <el-form-item label="Broker端口(含+1,-2)" prop="brokerPort" style="width: 500px;">
        <el-input placeholder="请输入消息总线BrokerIP地址" v-model="formData.brokerPort" :title="formData.brokerPort"></el-input>
      </el-form-item>
      <el-form-item label="消息总线消息存放地址" prop="messageStoreDir">
        <el-input placeholder="请输入消息总线消息存放地址" v-model="formData.messageStoreDir" :title="formData.messageStoreDir"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as validate from '@/libs/validate';

export default {
  name: 'NodeMsgSettingsDist',
  props: {
    formData: {
      type: Object,
      require: true,
    },
    nodeIp: {
      type: String,
      require: true,
    },
    distributed: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      configInfoLoading: false, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      rules: {
        // 消息总线服务地址
        ip: [
          { required: true, message: '请输入消息总线服务地址', trigger: 'blur' },
          {
            pattern: validate.domainExp().exp,
            message: validate.domainExp().msg,
            trigger: ['blur', 'change'],
          },
        ],
        // 消息总线Broker名称
        brokerName: [{ required: true, message: '请输入消息总线Broker名称', trigger: 'blur' }],
        // 端口
        port: [
          { required: true, message: '请输入端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        brokerPort: [
          { required: true, message: '请输入Broker端口', trigger: 'blur' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        mqAddress: [{ required: true, message: '请输入集群配置', trigger: 'blur' }],
      },
    };
  },
  methods: {
    onAdvanceChanged(val) {
      this.formData.isAdvance = val;
      if (val && !this.formData.mqAddress) {
        this.formData.mqAddress = this.nodeIp + ':' + this.formData.port;
      }
    },
    // 子组件本地校验
    async validateForm (callback, force = false) {
      // ip: '',
      // port: '',
      // brokerName: '',
      // messageStoreDir: '',
      // brokerPort: '',
      if (force) {
        this.$refs['configForm'].validate(callback);
        return;
      }
      if (this.formData.ip && this.formData.port && this.formData.brokerName && this.formData.brokerPort) {
        this.$refs['configForm'].validate(callback);
      } else {
        callback(false);
      }
    },
    getFormData() {
      if (!this.formData.isAdvance) {
        this.formData.mqAddress = undefined;
      } else {
        this.formData.ip = undefined;
        this.formData.port = undefined;
      }
      return this.formData;
    },
  },
};
</script>

<style scoped>
  .el-form-item__content .el-input-group{
    margin-top: 2px;
    margin-left: -1px;
    border-left: 0 none;
  }

  .el-input-group__prepend{
    font-weight: bold;
  }
</style>
