<template>
  <div>
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        @selection-change="onSelectionChange"
        @row-click="handleClickTableRow"
        border style="margin: 10px; width: 98%;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址">
        </el-table-column>
      </el-table>
  </div>

</template>

<script>
import * as api from '../api/node_manage_api';
export default {
  name: 'SceneServerSettings',
  data() {
    return {
      loadingData: false,
      selectData: [],
      tableData: [],
    };
  },
  created() {
  },
  methods: {
    onSelectionChange(val) {
      this.selectData = val;
    },
    // 点击本地文件表格的一行
    handleClickTableRow(row, event, column) {
      console.log(row, event, column);
      this.$refs.table.toggleRowSelection(row);
    },
  },
};
</script>

<style scoped>
</style>
