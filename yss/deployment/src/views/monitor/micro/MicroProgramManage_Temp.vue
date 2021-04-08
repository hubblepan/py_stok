<template>
    <div>
      <app-header :title="'程序列表'"></app-header>

      <div class="d2-mt-20 d2-ml-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">
        <el-button size="mini" type="primary" @click="handleAddProgram">添加程序</el-button>
      </div>
      <el-tree
        v-loading="loadingData"
        :data="treeData"
        :props="defaultProps"
        node-key="fullPath"
        :highlight-current="true"
        :default-expand-all="true"
        ref="Tree"
        style="margin-left: 20px; margin-top: 20px; padding-left: 10px; padding-top: 10px; margin-right: 10px;">
<!--      <span slot-scope="{ node, data }">-->
<!--        <span>{{ data.fileName }}</span>-->
<!--      </span>-->
      </el-tree>
      <micro-program-upload-add :on-added="onProgramAdded" ref="Upload"></micro-program-upload-add>
    </div>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import MicroProgramUploadAdd from './MicroProgramUploadAdd';
export default {
  name: 'MicroProgramManage_Temp',
  components: {MicroProgramUploadAdd, AppHeader},
  data() {
    return {
      loadingData: false,
      treeData: [
        {
          id: 1,
          label: 'osgi-fast',
          children: [{
            id: 2,
            label: 'V1.0.0.1',
            children: [{
              id: 3,
              label: '可执行.jar',
            }, {
              id: 4,
              label: '清算插件.jar',
            }, {
              id: 5,
              label: '算法公式.jar',
            }],
          }],
        }, {
          id: 6,
          label: 'osgi-uco',
          children: [{
            id: 7,
            label: 'V2.0.0.1',
            children: [{
              id: 8,
              label: '可执行.jar',
            }, {
              id: 9,
              label: '清算插件.jar',
            }, {
              id: 10,
              label: '算法公式.jar',
            }],
          }],
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    handleAddProgram(index, item) {
      this.$refs.Upload.show();
    },
    onProgramAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.Upload.closeLoading();
        this.$refs.Upload.close();
        // 刷新节点列表
        // TODO this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.Upload.closeLoading();
        this.$message.error({
          message: '添加程序失败:' + reason,
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
