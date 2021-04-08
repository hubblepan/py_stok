<template>
  <!-- 新增服务器 -->
  <el-dialog title="方案预览" :visible.sync="showDialog" :width="width + '%'"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body v-loading="loadingData">
    <el-row :gutter="10" v-if="data && data.length > 0">
      <el-col :span="span" v-for="(node) in data" :key="node.nodeId">
        <div class="node-col">
          <i class="fa fa-fw fa-caret-right"></i>
          <span class="board-title">{{node.ip}}</span>
          <div style="display: inline-block; right: 0; position: absolute; height: 42px; line-height: 16px; margin-top: 5px; margin-right: 10px">
<!--            <el-progress :percentage="100" :format="format"></el-progress>-->
<!--            <el-progress :percentage="50" :format="()=> '内存'" style="font-size: 12px" :color="customColors"></el-progress>-->
<!--            <el-progress :percentage="50" :format="()=> '磁盘'" style="font-size: 12px" :color="customColors"></el-progress>-->
            <div class="board-info"><span>所需内存: </span><span v-bind:style="{ color: getTipColor(dataMap[node.nodeId].distributeMemory, parseInt(node.freeMemory))}">{{dataMap[node.nodeId].distributeMemory + 'G'}}</span><span>{{'/ ' + parseInt(node.freeMemory) + 'G'}}</span></div>
            <div class="board-info"><span>所需磁盘: </span><span v-bind:style="{ color: getTipColor(dataMap[node.nodeId].distributeDiskSpace, parseInt(node.freeDiskSpace))}">{{dataMap[node.nodeId].distributeDiskSpace + 'G'}}</span><span>{{'/ ' + parseInt(node.freeDiskSpace) + 'G'}}</span></div>
          </div>
          <div  class="board-group" >
            <draggable :list="node.instanceResourceVos" group="people" @change="log" style="min-height: 300px">
              <div
                class="instance-item board-title"
                v-for="(element) in node.instanceResourceVos"
                :key="element.instanceId">
                {{ element.serviceCode }}
                <!--              <el-tooltip class="item" effect="dark" content="内存: 2G, 硬盘: 5G" placement="top" style="float:right; margin-top: 12px; margin-right: 10px; cursor: auto">-->
                <!--                <i class="el-icon-info"></i>-->
                <!--              </el-tooltip>-->
                <div style="height: 42px; line-height: 16px; float: right; color: rgba(0, 0, 0, 0.4); font-size: 12px; padding-top: 5px; padding-bottom: 5px; padding-right: 10px">
                  <div>{{'内存: ' + parseInt(element.distributeMemory) + 'G'}}</div>
                  <div>{{'硬盘: ' + parseInt(element.distributeDiskSpace) + 'G'}}</div>
                </div>
              </div>
            </draggable>
          </div>

        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execAdd" size="small" :loading="loading">{{loading ? '请求中' : '确 定'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import * as nodeApi from '../api/node_manage_api';
import draggable from 'vuedraggable';

export default {
  name: 'MicroProjectPreview',
  props: ['onAdded'],
  components: {draggable},
  created() {
    this.initData();
  },
  data() {
    return {
      loadingData: false,
      showDialog: false,
      loading: false,
      width: 80,
      span: 4,
      dataMap: {},
      data: [],
      customColors: [
        {color: 'rgb(86, 194, 45)', percentage: 0},
        {color: '#faad15', percentage: 80},
        {color: '#ff4d4f', percentage: 100},
      ]
    };
  },
  methods: {
    initData() {
    },
    show(data) {
      this.showDialog = true;
      let dataMap = {};
      data.forEach(item => {
        dataMap[item.nodeId] = item;
      });
      this.handleSortData(data);
      this.data = data;
      this.dataMap = dataMap;
      this.width = 16 * this.data.length + 2;
      this.span = 24 / this.data.length;
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
      this.onAdded(api.adjustScheme(this.data)); // 将请求的promise返回给调用者
      this.showLoading();
    },
    getTipColor(value, max) {
      if (value / max > 1) {
        return '#ff4d4f';
      } else if (value / max > 0.8) {
        return '#faad15';
      } else {
        return 'rgba(0,0,0,0.4)';
      }
    },
    handleSortData(data) {
      let sortLabel = {
        'zookeeper': 1,
        'fomp-eureka': 2,
        'fomp-traceCenter': 3,
        'osgi-gateway': 4,
        'redis': 5,
        'osgi-mq': 6,
        'osgi-mq-1': 7,
        'osgi-mq-2': 8,
        'osgi-mq-3': 9,
        'osgi-fast': 10,
        'osgi-basebusiness': 11,
        'osgi-automatic': 12,
        'osgi-uco': 13,
        'osgi-unifypay': 14,
        'osgi-elecreco': 15,
      };
      data.forEach(item => {
        item.instanceResourceVos = item.instanceResourceVos.sort((i1, i2) => {
          return sortLabel[i1.serviceCode] - sortLabel[i2.serviceCode];
        });
      });
    },
    log: function(evt) {
      this.handleSortData(this.data);
      this.data.forEach(item => {
        item.distributeMemory = this.handleTotalMemory(item.instanceResourceVos);
        item.distributeDiskSpace = this.handleTotalDisk(item.instanceResourceVos);
      });
    },
    handleTotalMemory(arr) {
      let s = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
        s += parseInt(arr[i].distributeMemory);
      }
      return s;
    },
    handleTotalDisk(arr) {
      let s = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
        s += parseInt(arr[i].distributeDiskSpace);
      }
      return s;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: white;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  /deep/ .el-form-item {
    margin-bottom: 16px;
  }

  .node-col{
    position: relative;
    height: 500px;
    background-color: #f2f2f2;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
  .board-group{
    height: 450px;
    overflow: auto;
  }
  .board-title{
    color: rgb(46, 46, 46);
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .board-info{
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /deep/ .list-group-item{
    padding: 12px;
    margin-bottom: 6px;
  }

  .instance-item{
    height: 42px;
    line-height: 42px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
    padding-left: 12px;
    margin-bottom: 6px;
    margin-left: 6px;
    margin-right: 6px;
    cursor: move;
  }

  /deep/ .el-alert__title {
    font-size: 12px;
  }
</style>
