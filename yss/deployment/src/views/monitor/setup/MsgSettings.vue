<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="180px" ref="configForm" label-position="left">
      <el-row :gutter="0" type="flex">
        <el-col :span="12">
          <el-form-item label="消息总线地址" prop="ip">
<!--            <el-select placeholder="请选择消息总线服务地址" style="width:100%" v-model="formData.ip">-->
<!--              <el-option :key="item" :value="item" v-for="item in formData.ipList" :title="item"></el-option>-->
<!--            </el-select>-->
            <el-autocomplete placeholder="请选择消息总线服务地址" class="inline-input" style="width: 100%" v-model="formData.ip" :fetch-suggestions="queryIpList"></el-autocomplete>
          </el-form-item>
        </el-col>
        <!--<el-col :span="1">-->
        <!--<div style="text-align: center;line-height: 40px">:</div>-->
        <!--</el-col>-->
        <el-col :span="4">
          <el-form-item label-width="0" prop="port">
            <el-input placeholder="端口号" v-model="formData.port" :title="formData.port" type="number" min="1" max="65535">
              <template slot="prepend" style="font-weight: bold">:</template>
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
import * as api from '../api/node_deploy_api';

export default {
  name: 'DatabaseSettings',
  props: {
    formData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      configInfoLoading: true, // 是否loading
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
      },
    };
  },
  created() {
    this.initForm();
  },
  mounted() {
    this.initEdit();
  },
  methods: {
    // 子组件本地校验
    async validateForm() {
      const ret = await new Promise((resolve, reject) => {
        this.$refs['configForm'].validate((valid) => {
          resolve(valid);
        });
      });
      return ret;
    },
    // 初始化表单
    initForm() {
      let { tomcatSelected } = this.$parent.$data;
      const isEmptyData = Object.keys(this.formData).some((key) => this.formData[key] === '');
      // 需要判断是否初始化 ,如为空则重新请求
      if (isEmptyData) {
        this.configInfoLoading = true;
        this.editState = false;
        api.getMQConfig([tomcatSelected.id])
          .then(res => {
            this.configInfoLoading = false;
            this.editState = true;
            this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
            // 将tomcat 配置列表更新到每个Tomcat card界面
            this.$parent.initForm(res.data[0]);
          })
          .catch(reason => {
            // do nothings
            this.configInfoLoading = false;
            this.editState = true;
            this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
          });
      } else {
        this.configInfoLoading = false;
        this.editState = true;
      }
      this.$emit('editState', this.editState, this.configInfoLoading); // 禁用或启用父组件按钮
    },
    // 保存
    async saveForm() {
      let data = {};
      for (let attr in this.formData) {
        if (attr !== 'isValid') {
          data[attr] = this.formData[attr];
        }
      }
      const res = await api.saveMQConfig([data]);
      console.log(res);
      return res;
    },
    initEdit() {
      let form = document.querySelector('#configForm');
      let element = form.elements;
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('change', () => {
          this.$parent.setEdit(true);
        });
      }
    },
    // 过滤 ip输入框 建议值
    queryIpList(queryString, cb) {
      var qureyResult = queryString ? this.formData.ipList.filter(this.createFilter(queryString)) : this.formData.ipList;
      // 调用 callback 返回建议列表的数据
      var result = [];
      qureyResult.forEach(ip => { result.push({value: ip}); });
      cb(result);
    },
    createFilter(queryString) {
      return (ip) => {
        // return (ip.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        return true;
      };
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
