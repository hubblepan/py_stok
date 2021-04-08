<template>
  <div>
    <el-table
      ref="fieldTable"
      :data="triggerMetricsVos"
      @selection-change="onSelectionChange"
      border style="margin: 10px; width: 675px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
      <el-table-column
        prop="metricsName"
        label="指标别名">
      </el-table-column>
      <el-table-column
        prop="value"
        label="预警阈值"
        width="280">
        <template slot-scope="scope">
          <div>
            <el-select v-model="scope.row.operate" placeholder="预警方向" size="small" style="width: 80px; display: inline-block">
              <el-option label="大于" value=">"></el-option>
              <el-option label="小于" value="<"></el-option>
            </el-select>
            <el-input v-model="scope.row.value" :step="10" style="width: 100px;" controls-position="right" size="small"></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SceneTriggerSettings',
  props: ['triggerData'],
  mounted() {
    this.triggerMetricsVos = this.triggerData;
  },
  data() {
    return {
      triggerMetricsVos: [],
    };
  },
  methods: {
    onSelectionChange(val) {
      this.onSelect(val);
    },
    handleClickTableRow(row, event, column) {
      this.$refs.fieldTable.toggleRowSelection(row);
    },

    validForm(callback) {
      return callback(true);
    },

    getFormData() {
      return this.triggerMetricsVos;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-radio__label{
    display: inline;
  }
</style>
