<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="120px" ref="configForm" label-position="left">
      <!--<el-form-item label="注册中心端口" prop="port">-->
      <!--<el-input-number v-model="formData.port" :min="1" :max="65535" placeholder="请输入注册中心端口"></el-input-number>-->
      <!--</el-form-item>-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="注册中心端口" prop="port" style="width: 500px;">
            <el-input :max="65535" :min="1" placeholder="请输入注册中心端口" :title="formData.port" type="number" v-model="formData.port"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="数据存放路径" prop="dataStoreDir">
        <el-input placeholder="请输入消数据存放路径" :title="formData.dataStoreDir" v-model="formData.dataStoreDir"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_deploy_api';

export default {
  name: 'ServiceSettings',
  props: {
    formData: {
      type: Object,
      require: true,
    },
  },
  data () {
    return {
      configInfoLoading: true, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      rules: {
        // 注册中心端口
        port: [
          { required: true, message: '请输入注册中心端口', trigger: 'blur' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],

        // 数据存放路径
        dataStoreDir: [
          { required: true, message: '请输入数据存放路径', trigger: 'blur' },
          {
            pattern: validate.cateExp().exp,
            message: validate.cateExp().msg,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 子组件校验，传递到父组件
    async validateForm () {
      const ret = await new Promise((resolve, reject) => {
        this.$refs['configForm'].validate((valid) => {
          resolve(valid);
        });
      });
      return ret;
    },
    initForm () {
      let { tomcatSelected } = this.$parent.$data;
      const isEmptyData = Object.keys(this.formData).some((key) => this.formData[key] === '');
      // 需要判断是否初始化 ,如为空则重新请求
      if (isEmptyData) {
        this.configInfoLoading = true;
        this.editState = false;
        api.getRegistryConfig([tomcatSelected.id])
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
    async saveForm () {
      let data = {};
      for (let attr in this.formData) {
        if (attr !== 'isValid') {
          data[attr] = this.formData[attr];
        }
      }
      const res = await api.saveRegistryConfig([data]);
      console.log(res);
      return res;
    },
    initEdit () {
      let input = document.querySelectorAll('#configForm input');
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('change', () => {
          this.$parent.setEdit(true);
        });
      }
    },
  },
  created () {
    this.initForm();
  },
  mounted () {
    this.initEdit();
  },
};
</script>

<style scoped></style>
