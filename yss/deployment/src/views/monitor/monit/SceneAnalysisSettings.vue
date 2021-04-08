<template>
  <div>
    <el-table
      ref="fieldTable"
      :data="analysisMetricsVos"
      border style="margin: 10px; width: 675px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="55">-->
<!--      </el-table-column>-->
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
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.tableWidth" :step="10" style="width: 100px;" controls-position="right" size="small" :min="0"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size: 12px; color: #909399; margin-left: 20px;">注1: 计算表格宽度的值的简单公式： width = 20 + 15 * (字符个数， 英文两个字符记1)，取整， 如果没有填值， 则默认平分剩余宽度。</span>
  </div>
</template>

<script>
export default {
  name: 'SceneAnalysisSettings',
  props: ['analysisMetrics'],
  mounted() {
    this.analysisMetricsVos = this.analysisMetrics;
    // this.$nextTick(() => {
    //   this.fieldSelectData.forEach((item, index) => {
    //     this.$refs.fieldTable.toggleRowSelection(item, true);
    //   });
    // });
  },
  data() {
    return {
      analysisMetricsVos: [],
    };
  },
  methods: {
    onSelectionChange(val) {
      // this.onSelect(val);
    },
    handleClickTableRow(row, event, column) {
      this.$refs.fieldTable.toggleRowSelection(row);
    },

    validForm(callback) {
      return callback(true);
      // if (!this.formData.fileList || this.formData.fileList.length === 0) {
      //   this.$alert('请选择一个jar文件', {type: 'error'});
      //   return callback(false);
      // }
      // return this.$refs.formMain.validate(callback);
    },

    getFormData() {
      return this.analysisMetricsVos;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-radio__label{
    display: inline;
  }
</style>
