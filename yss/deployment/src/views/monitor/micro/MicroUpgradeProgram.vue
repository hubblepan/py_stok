<template>
  <div>
    <el-table
      :data="tableData"
      border style="margin: 20px 0px 0px 0px; width: 100%" :header-cell-style="{background:'#F5F7FA',color:'#606266', height:'50px'}">
      <el-table-column
        prop="name"
        label="程序类型"
        width="160">
      </el-table-column>
      <el-table-column
        prop="version"
        label="当前版本"
        width="320">
      </el-table-column>
      <el-table-column
        prop="upgradeVersion"
        label="升级包版本"
        width="320">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button @click.stop="handleUploadAdd(scope.$index, scope.row)" size="mini" type="warning" plain icon="el-icon-upload">升级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <node-upgrade-upload-add ref="Upload"></node-upgrade-upload-add>
  </div>

</template>

<script>
import NodeUpgradeUploadAdd from '../nodes/NodeUpgradeUploadAdd';
export default {
  name: 'MicroUpgradeProgram',
  components: { NodeUpgradeUploadAdd },
  data() {
    return {
      tableData: [
        {
          name: 'osgi-fast',
          version: 'v1.0.0.1',
          upgradeVersion: 'v2.0.0.1',
        },
        {
          name: 'osgi-uco',
          version: 'v2.0.0.1',
          upgradeVersion: 'v3.0.0.1',
        },
      ],
    };
  },
  methods: {
    handleUploadAdd(index, item) {
      this.$refs.Upload.show();
    },
  },
};
</script>

<style scoped>

</style>
