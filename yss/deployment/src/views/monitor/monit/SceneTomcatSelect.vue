<template>
  <div>
    <el-dialog title="选择Tomcat" :visible.sync="showDialog" width="930px">
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        @selection-change="onSelectionChange"
        @row-click="handleClickTableRow"
        border style="margin: 10px; width: 890px;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tomcatName"
          label="Tomcat名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="所在节点ip"
          width="200">
        </el-table-column>
        <el-table-column
          prop="tomcatDir"
          label="tomcat地址"
          min-width="200">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execSelect" size="small" :loading="loadingData">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/scene_api';
export default {
  name: 'SceneTomcatSelect',
  props: ['onSelected'],
  data() {
    return {
      showDialog: false,
      loadingData: false,
      sceneId: '',
      cacheTomcatIds: [],
      selectData: [],
      tableData: [],
      rowIndex: -1,
    };
  },
  created() {
  },
  methods: {
    show(sceneId, cacheTomcatIds, index) {
      this.showDialog = true;
      this.cacheTomcatIds = cacheTomcatIds;
      this.sceneId = sceneId;
      this.rowIndex = index;
      this.selectData = [];
      this.tableData = [];
      this.execListTomcat();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    onSelectionChange(val) {
      this.selectData = val;
      console.log(this.selectData);
    },
    // 点击本地文件表格的一行
    handleClickTableRow(row, event, column) {
      console.log(row, event, column);
      this.$refs.table.toggleRowSelection(row);
    },
    execSelect() {
      this.loadingData = true;
      this.onSelected(api.enableSceneApplication(this.sceneId, this.selectData.map(item => {
        return item.id;
      })));
    },

    execListTomcat() {
      this.loadingData = true;
      api.getAllTomcat()
        .then(res => {
          this.loadingData = false;
          this.tableData = res.data.filter(item => {
            return item.upgrade;
          });
          this.selectData = [];
          console.log('bb', this.cacheTomcatIds);
          this.$nextTick(() => {
            this.tableData.forEach((item, index) => {
              console.log('cc', this.cacheTomcatIds.indexOf(item.id), item.id);
              if (this.cacheTomcatIds.indexOf(item.id) > -1) {
                console.log('aa', item);
                // this.selectData.push(item);
                this.$refs.table.toggleRowSelection(item);
              }
            });
          });
          // this.$nextTick(() => {
          //   this.tableData.forEach((item, index) => {
          //     if (this.cacheTomcatIds.indexOf(item.id) > -1) {
          //       this.$refs.table.toggleRowSelection(item);
          //     }
          //   });
          // });
        })
        .catch(reason => {
          this.loadingData = false;
          this.$message.error({
            message: reason,
          });
        });
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
