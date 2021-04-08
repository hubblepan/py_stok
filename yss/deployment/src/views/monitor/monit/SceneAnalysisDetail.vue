<template>
  <el-dialog :title="title" :visible.sync="showDialog" width="715px" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-table
      ref="fieldTable"
      :data="analysisMetricsVos"
      border style="margin: 10px; width: 675px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
      <el-table-column
        prop="metricsName"
        label="指标别名"
        width="140">
      </el-table-column>
      <el-table-column
        prop="hidden"
        label="是否隐藏"
        align="center"
        width="140">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.hidden"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="displayType"
        label="展示方式"
        width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.displayType" placeholder="指标展示类型" size="small" style="width: 120px">
            <el-option label="字符串" value="string"></el-option>
            <el-option label="折线图" value="line"></el-option>
            <el-option label="直方图" value="histogram"></el-option>
            <el-option label="饼图" value="pie"></el-option>
            <el-option label="文本" value="textArea"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="metricsId"
        label="指标名称">
      </el-table-column>

      <el-table-column
        prop="tableWidth"
        label="表格宽度"
        width="140">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'SceneAnalysisDetail',
  data() {
    return {
      analysisMetricsVos: [],
    };
  },
  methods: {
    show(sceneVo) {
      this.analysisMetricsVos = this.sceneVo.analysisMetricsVos;
      this.title = '分析指标';
      this.showDialog = true;
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

</style>
