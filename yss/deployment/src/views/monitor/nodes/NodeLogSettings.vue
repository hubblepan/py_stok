<template>
  <div v-loading="configInfoLoading">
    <el-form :model="formData" :rules="rules" id="configForm" label-width="80px" ref="configForm" label-position="top">
      <!--<el-form-item label="注册中心端口" prop="port">-->
      <!--<el-input-number v-model="formData.port" :min="1" :max="65535" placeholder="请输入注册中心端口"></el-input-number>-->
      <!--</el-form-item>-->
      <el-form-item label="日志路径" prop="path">
        <el-input placeholder="请输入日志路径" :title="formData.path" v-model="formData.path"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validate from '@/libs/validate';

export default {
  name: 'NodeLogSettings',
  props: {
    formData: {
      type: Object,
      require: true,
    },
  },
  data () {
    return {
      configInfoLoading: false, // 是否loading
      editState: false, // 父组件按钮是否可编辑
      rules: {
        // 日志存放路径
        path: [
          { required: true, message: '请输入日志存放路径', trigger: 'blur' },
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
    async validateForm (callback) {
      this.$refs['configForm'].validate(callback);
    },
    initForm () {
      this.$emit('editState', this.editState); // 禁用父组件按钮
      let { tomcatDir } = this.$parent.$data;
      const isEmptyData = Object.keys(this.formData).some((key) => this.formData[key] === '');
      if (isEmptyData) {
        this.configInfoLoading = true;
        this.editState = false;
        // api.getLogConfig(tomcatDir).then((res) => {
        //   this.$parent.initForm(res.data);
        //   this.editState = true;
        //   this.configInfoLoading = false; // loading结束
        //   this.$emit('editState', this.editState, this.configInfoLoading); // 请求完了，按钮可用
        // }).catch((e) => {
        //   console.log(e);
        // });
      } else {
        this.configInfoLoading = false;
        this.editState = true;
      }
      this.$emit('editState', this.editState, this.configInfoLoading); // 禁用或启用父组件按钮
    },
    // 保存
    async saveForm () {
      let { tomcatDir } = this.$parent.$data;
      // const res = await api.saveLogConfig(tomcatDir, this.formData.path);
      // console.log(res);
      // return res;
      return true;
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
    // this.initForm();
  },
  mounted () {
    this.initEdit();
  },
};
</script>

<style scoped></style>
