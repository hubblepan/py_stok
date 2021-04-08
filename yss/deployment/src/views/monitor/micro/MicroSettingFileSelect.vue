<template>
  <!-- 新增服务器 -->
  <el-dialog title="选择配置文件" :visible.sync="showDialog" width="580px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      node-key="fullPath"
      :highlight-current="true"
      :default-expand-all="true"
      ref="Tree"
      style="margin-left: 20px; margin-top: 20px; padding-left: 10px; padding-top: 10px; margin-right: 10px;">
    </el-tree>

    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '安装中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'MicroSettingFileSelect',
  props: ['onAdded'],
  data() {
    return {
      treeData: [
        {
          id: 111,
          label: 'osgi-fast',
          children: [
            {
              id: 11,
              label: 'tomcat1',
              children: [{
                id: 2,
                label: 'YSS_APP',
                children: [{
                  id: 3,
                  label: 'global',
                  children: [
                    {
                      id: 4,
                      label: 'xxx.properties',
                    }, {
                      id: 5,
                      label: 'xxxx.properties',
                    },
                  ],
                }],
              }],
            },
          ],
        }, {
          id: 6,
          label: 'osgi-uco',
          children: [
            {
              id: 61,
              label: 'tomcat2',
              children: [{
                id: 7,
                label: 'YSS-app',
                children: [{
                  id: 8,
                  label: 'runtime.properties',
                }, {
                  id: 9,
                  label: 'xx.properties',
                }, {
                  id: 10,
                  label: 'xxxx.properties',
                }],
              }],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    show() {
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    showLoading() {
      this.loading = true;
    },
    execAdd() {
      // this.$refs['formAddNode'].validate((valid) => {
      //   if (valid) {
      //     this.loading = true;
      //     this.onAdded(api.createNode(this.formData)); // 将请求的promise返回给调用者
      //     // show loading
      //     this.showLoading();
      //   } else {
      //     return false;
      //   }
      // });
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
