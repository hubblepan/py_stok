<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="170px" label-position="left" ref="configForm">
      <el-form-item label="内存" prop="memorySize" style="width: 400px">
        <!--<el-input placeholder="请输入内容" v-model="formData.memorySize">-->
        <el-input :max="65535" :min="1" placeholder="请输入内存" type="number" :title="formData.memorySize" v-model="formData.memorySize">

        <template slot="append">G</template>
        </el-input>
        <!--<el-input :max="65535" :min="1" placeholder="请输入内存" type="number" v-model="formData.memorySize"></el-input>-->
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item label="tomcat所在节点IP地址" prop="ip">
            <el-input placeholder="请输入tomcat所在节点IP地址" :title="formData.ip" v-model="formData.ip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px" prop="port">
            <el-input :max="65535" :min="1" placeholder="tomcat端口" type="number" :title="formData.port" v-model="formData.port">
              <template slot="prepend">:</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-form-item label="tomcat根目录" prop="dir">-->
<!--        <el-input :disabled="editable" placeholder="请输入tomcat根目录" v-model="formData.dir" :title="formData.dir"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="应用部署目录" prop="appDir">-->
<!--        <el-input :disabled="editable" placeholder="请输入应用部署目录" v-model="formData.appDir" :title="formData.appDir"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="应用配置文件路径" prop="appConfigDir">-->
<!--        <el-input :disabled="editable" placeholder="请输入应用配置文件路径" v-model="formData.appConfigDir" title="formData.appConfigDir"></el-input>-->
<!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_deploy_api';

export default {
  name: 'NodeTomcatSettings',
  props: {
    nodeId: {
      type: String,
      require: true,
    },
    formData: {
      type: Object,
      require: true,
    },
  },
  data () {
    return {
      configInfoLoading: false, // 是否loading
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

  created() {

  },
  methods: {
    // 子组件校验，传递到父组件
    validateForm (callback, force = false) {
      if (force) {
        this.$refs['configForm'].validate(callback);
        return;
      }
      if (this.formData.memorySize && this.formData.ip && this.formData.port) {
        this.$refs['configForm'].validate(callback);
      } else {
        callback(false);
      }
    },
  },
  mounted () {
    // this.initEdit();
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
