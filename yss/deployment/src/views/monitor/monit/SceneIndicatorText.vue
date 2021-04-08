<template>
  <div>
    <el-dialog :title="title" :visible.sync="showDialog" width="615px">
      <div>
        {{text}}
      </div>
    </el-dialog>
  </div>

</template>

<script>

export default {
  name: 'SceneIndicatorText',
  props: ['onAdded'],
  data() {
    return {
      title: '',
      showDialog: false,
      loadingData: false,
      text: '',
    };
  },
  created() {
  },
  methods: {
    show(title, text) {
      this.showDialog = true;
      this.title = title;
      this.text = text;
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: #F5F7FA;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }
</style>
