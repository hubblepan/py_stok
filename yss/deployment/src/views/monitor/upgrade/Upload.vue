<template>
  <div v-loading="loadingData">
    <el-form label-width="120px" :model="tomcatInfo" label-position="left" style="margin: 20px 20px -10px 20px;">
      <el-form-item label="tomcat目录:">
        <!--        <el-select @change="selectTomcatDirChanged" placeholder="" style="width:100%" v-model="selectTomcatDir">-->
        <!--          <el-option :key="item.tomcatDir" :value="item.tomcatDir" v-for="item in tomcatDirList" :title="item.tomcatDir"></el-option>-->
        <!--        </el-select>-->
        <el-input placeholder="Tomcat路径" style="width: 70%" v-model="tomcatInfo.tomcatDir" :disabled="true" size="small"></el-input>
      </el-form-item>
    </el-form>
    <node-upgrade-upload ref="Upload"></node-upgrade-upload>
    <node-upgrade-loading ref="UploadLoading"></node-upgrade-loading>
    <div class="btns">
      <el-button type="primary" @click="handleForceUpgrade" size="small" style="margin-top: 40px;">确 定</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '../api/node_upgrade_api';
import NodeUpgradeUpload from '../nodes/NodeUpgradeUpload';
import NodeUpgradeLoading from '../nodes/NodeUpgradeLoading';

export default {
  name: 'upload',
  components: { NodeUpgradeLoading, NodeUpgradeUpload },
  props: ['tomcatDir'],
  data() {
    return {
      tableData: [],
      nodeId: '',
      tomcatInfo: {tomcatDir: ''},
      loadingData: false,
    };
  },

  mounted() {
    Object.assign(this.tomcatInfo, this.$parent.tomcatInfo);
    console.log(this.tomcatInfo.tomcatDir);
    this.nodeId = this.$parent.nodeId;
    this.$refs.Upload.handleInit(this.tomcatInfo.id, this.nodeId, this.tomcatInfo);
    this.$parent.noclickCompare = false;
    this.$parent.noclickComplete = true;
  },
  methods: {
    handleForceUpgrade() {
      // 验证升级文件字段
      if (!this.$refs.Upload.validForm()) {
        return;
      }

      let force = false;
      if (this.tomcatInfo.runningStatus === 'UP') {
        force = true;
      }
      if (force) {
        this.$confirm('选择的节点中包含正在运行Tomcat, 是否进行强制升级?', '升级提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.handleUpload();
        }).catch(() => {
          // do nothing
        });
      } else {
        this.handleUpload();
      }
    },
    handleUpload() {
      // this.loadingData = true;
      let fileData = this.$refs.Upload.getFormData();
      // fileData.append('tomcatIds', [this.tomcatInfo.id].join(','));
      fileData.append('tomcatId', this.tomcatInfo.id);
      this.$refs.UploadLoading.show();
      api.uploadZipForSingle(fileData)
        .then(res => {
          // this.loadingData = false;
          this.$refs.UploadLoading.close();
          // 对比处理
          this.$parent.prevNext('next');
        })
        .catch(reason => {
          // this.loadingData = false;
          this.$refs.UploadLoading.close();
        });
    },
  },
};
</script>

<style scoped>

.tab-ctn{
  margin-top: 15px;
  margin-bottom: 15px;
}

.btns {
  text-align: center;
}

.table-container {
  height: 285px;
  overflow-y: scroll;
}

.upload-demo {
  text-align: center;
  margin-top: 40px;
}

.upload-progress {
  text-align: center;
}

.el-table el-table--fit el-table--enable-row-transition el-table--default{
  width: 100%;
}

.el-row {
  margin: -5px  0 5px 0;
  padding: 0;
}
.table-bar {
  height: 32px;
  line-height: 32px;
}

/*  element-ui table的去除右侧滚动条的样式 */
::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 0px;
}

/deep/ .el-divider--horizontal {
  margin: 4px;
  padding: 0px;
}
/deep/ .el-form-item{
  margin-bottom: 10px;
}
</style>
