<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="170px" label-position="left" ref="configForm">
      <!--<el-form-item label="tomcat端口" prop="port">-->
      <!--<el-input-number :max="65535" :min="1" placeholder="请输入tomcat端口" v-model="formData.port"></el-input-number>-->
      <!--</el-form-item>-->
      <!--<el-col :span="24">-->
      <!--<el-form-item label="tomcat端口" prop="port">-->
      <!--<el-input :max="65535" :min="1" placeholder="tomcat端口" type="number" v-model="formData.port"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <el-form-item label="内存" prop="memorySize" style="width: 400px">
        <!--<el-input placeholder="请输入内容" v-model="formData.memorySize">-->
        <el-input :max="65535" :min="1" placeholder="请输入内存" type="number" :title="formData.memorySize" v-model="formData.memorySize">

        <template slot="append">G</template>
        </el-input>
        <!--<el-input :max="65535" :min="1" placeholder="请输入内存" type="number" v-model="formData.memorySize"></el-input>-->
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="tomcat所在节点IP地址" prop="ip">
            <el-input placeholder="请输入tomcat所在节点IP地址" :title="formData.ip" v-model="formData.ip"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="1">-->
        <!--<div style="text-align: center;line-height: 40px">:</div>-->
        <!--</el-col>-->
        <el-col :span="3">
          <!--<el-form-item prop="dbPort">-->
          <el-form-item label-width="0px" prop="port">
            <el-input :max="65535" :min="1" placeholder="tomcat端口" type="number" :title="formData.port" v-model="formData.port">
              <template slot="prepend">:</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="tomcat根目录" prop="dir">
        <el-input :disabled="editable" placeholder="请输入tomcat根目录" v-model="formData.dir" :title="formData.dir"></el-input>
      </el-form-item>

      <el-form-item label="应用部署目录" prop="appDir">
        <el-input :disabled="editable" placeholder="请输入应用部署目录" v-model="formData.appDir" :title="formData.appDir"></el-input>
      </el-form-item>
      <el-form-item label="应用配置文件路径" prop="appConfigDir">
        <el-input :disabled="editable" placeholder="请输入应用配置文件路径" v-model="formData.appConfigDir" title="formData.appConfigDir"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_deploy_api';

export default {
  name: 'TomcatSettings',
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
      editable: true,
      rules: {
        // tomcat所在节点IP地址

        ip: [
          { required: true, message: '请输入tomcat所在节点IP地址', trigger: 'blur' },
          { validator: validate.tomcatIP, trigger: 'blur' },
        ],

        // 内存
        memorySize: [
          { required: true, message: '请输入内存大小，并且是整数', trigger: 'blur' },
          { validator: validate.isInteger, trigger: 'blur' },
          {
            trigger: 'blur',
            validator: validate.memorySize,
          },
        ],

        // tomcat根目录
        dir: [
          { required: true, message: '请输入tomcat根目录', trigger: 'blur' },
          {
            pattern: validate.cateExp().exp,
            message: validate.cateExp().msg,
            trigger: 'blur',
          },
        ],

        // tomcat端口
        port: [
          { required: true, message: '请输入tomcat端口' },
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    // 子组件校验，传递到父组件
    async validateForm () {
      console.log('tomcatvalid');
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
        api.getTomcatConfig([tomcatSelected.id])
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
      const res = await api.saveTomcatConfig([data]);
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

<style scoped>
  .el-form-item__content .el-input-group{
    margin-top: 2px;
    margin-left: -1px;
    border-left: 0 none;
  }

  .el-input-group__prepend{
    font-weight: bold;
  }

  .el-col-19{
    padding-right: 0 !important;
  }

  .el-form-item__content{
    margin-left: 0 !important;
  }

.el-col-5{
  padding-left: 0 !important;
}

</style>
