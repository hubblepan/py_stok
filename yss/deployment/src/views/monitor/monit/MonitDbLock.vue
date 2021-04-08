<template>
  <div>
    <el-dialog title="锁表信息" :visible.sync="showDialog" width="90%" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <el-table
        ref="table"
        :data="tableData"
        v-loading="loadingData"
        @selection-change="onSelectionChange"
        @row-click="handleClickTableRow"
        border style="margin: 10px; width: 98%;" max-height="375" :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
<!--        <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--        </el-table-column>-->

        <el-table-column
          prop="sid"
          label="SID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="serial"
          label="SERIAL"
          width="90">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="machine"
          label="所在机器"
          width="160">
        </el-table-column>
        <el-table-column
          prop="program"
          label="所在程序"
          width="140">
        </el-table-column>
        <el-table-column
          prop="status"
          label="锁状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sqlText"
          label="死锁语句"
          min-width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content" style="max-width: 400px;">{{scope.row.sqlText}}</div>
              <span style="text-overflow: ellipsis; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; ">{{scope.row.sqlText}}</span>
            </el-tooltip>
          </template>

        </el-table-column>
        <el-table-column
          prop="startLockTime"
          label="锁表时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nowTime"
          label="最后锁表时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cTime"
          label="持续时间(秒)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="objectType"
          label="引起锁的对象类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="objectName"
          label="被锁的数据库表名"
          width="100">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="handleDeleteLock(scope.$index, scope.row)">解锁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import * as api from '../api/monit_api';
export default {
  name: 'MonitDbLock',
  data() {
    return {
      showDialog: false,
      loadingData: false,
      selectData: [],
      tableData: [],
    };
  },
  created() {
  },
  methods: {
    show(tomcatId) {
      this.showDialog = true;
      this.tomcatId = tomcatId;
      this.tableData = [];
      this.selectData = [];
      this.execListDbLock();
    },
    close() {
      this.showDialog = false;
    },
    closeLoading() {
      this.loading = false;
    },
    onSelectionChange(val) {
      this.selectData = val;
    },
    handleDeleteLock(index, row) {
      this.loading = true;
      api.deleteLock(this.tomcatId, [row])
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.$message.success('解锁成功');
            this.tableData.splice(index, 1);
          }
          if (this.tableData.length === 0) {
            this.close();
          }
        })
        .catch(reason => {
          this.loading = false;
        });
    },
    // 点击本地文件表格的一行
    handleClickTableRow(row, event, column) {
      console.log(row, event, column);
      this.$refs.table.toggleRowSelection(row);
    },

    execListDbLock() {
      this.loadingData = true;
      api.queryLockTable(this.tomcatId)
        .then(res => {
          this.loadingData = false;
          this.tableData = res.data;
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

  .el-table {
    overflow: auto;
  }
</style>
