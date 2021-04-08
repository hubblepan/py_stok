<template>
  <div>
<!--    <el-radio-group v-model="tabPosition" style="margin-bottom: 20px; margin-left: 10px;" size="mini">-->
<!--      <el-radio-button label="query" size="mini">查询参数</el-radio-button>-->
<!--      <el-radio-button label="field" size="mini">指标参数</el-radio-button>-->
<!--    </el-radio-group>-->

    <div v-if="tabPosition === 'query'">
      <el-button style="margin-left: 10px;" type="success" size="mini" @click="handleAddQuery">新增查询参数</el-button>
      <el-table
        ref="queryTable"
        :data="queryTableData"
        border style="margin: 10px; width: 675px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          prop="name"
          label="参数别名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="参数类型"
          width="120">
          <template slot-scope="scope">
            <span>{{queryType[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="key"
          label="参数名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="default"
          label="默认值"
          width="120">
        </el-table-column>

        <el-table-column
          prop="default"
          label="是否必传"
          width="100">
        </el-table-column>

        <el-table-column
          label="操作"
        width="95">
          <el-button size="mini" type="danger" plain>删除</el-button>
        </el-table-column>
      </el-table>
      <scene-query-add ref="SceneQueryAdd"></scene-query-add>
    </div>

    <div v-if="tabPosition === 'field'">
      <scene-u-i-field-settings ref="SceneUIFieldSettings" :field-select-data="fieldSelectData" :field-table-data="fieldTableData" :on-select="onSelectionChange"></scene-u-i-field-settings>
    </div>

  </div>

</template>

<script>
import SceneQueryAdd from './SceneQueryAdd';
import SceneUIFieldSettings from './SceneUIFieldSettings';
export default {
  name: 'SceneUISettings',
  components: { SceneUIFieldSettings, SceneQueryAdd },
  data() {
    return {
      tabPosition: 'field',
      queryType: {
        datetime: '日期时间',
        radio: '单选组',
        string: '字符串',
        textArea: '文本',
      },
      queryTableData: [
        {
          name: '开始时间',
          type: 'datetime',
          key: 'startTime',
          default: null,
          required: true,
        },
        {
          name: '结束时间',
          type: 'datetime',
          key: 'endTime',
          default: null,
          required: true,
        },
        {
          name: '排序方式',
          type: 'radio',
          key: 'sort',
          group: [{value: '1', title: '请求时间Top10'}, {value: '2', title: '请求个数Top10'}],
          default: '1',
          required: true,
        },
      ],
      fieldSelectData: [],
      fieldTableData: [
        {
          name: '当前请求数',
          key: 'currentRequestNumber',
          type: 'line',
          width: 100,
        },
        {
          name: '请求总次数',
          key: 'requestNumber',
          type: 'histogram',
          width: 100,
        },
        {
          name: '总请求占比',
          key: 'percent',
          type: 'string',
          width: 100,
        },
        {
          name: '最大消耗时间',
          key: 'maxTime',
          type: 'pie',
          width: 200,
        },
        {
          name: '请求时间分布',
          key: 'time',
          type: 'string',
        },
        {
          name: '耗时最长请求堆栈',
          key: 'maxStack',
          type: 'textArea',
        },
      ],
    };
  },
  methods: {
    onSelectionChange(val) {
      this.fieldSelectData = val;
    },
    handleAddQuery() {
      // do nothing
      this.$refs.SceneQueryAdd.show();
    },
  },
};
</script>

<style scoped>
  /deep/ .el-radio__label{
    display: inline;
  }
</style>
