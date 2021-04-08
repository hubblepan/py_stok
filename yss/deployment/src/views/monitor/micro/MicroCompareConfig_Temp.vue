<template>
  <!-- 新增节点 -->
  <el-dialog :title="title" :visible.sync="showDialog" width="820px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-row>
      <el-col :span="12">
        <el-tree
          :data="leftData"
          :props="defaultProps"
          default-expand-all
          :load="loadingLeft">
          <div slot-scope="{ node, data}">
            <span>{{data.label}}</span>
            <span v-if="!data.children || data.children.length < 1">{{'=' + data.value }}</span>
          </div>
        </el-tree>
      </el-col>
      <el-col :span="12">
        <el-tree
          :data="rightData"
          :props="defaultProps"
          default-expand-all
          :load="loadingRight">
          <div slot-scope="{ node, data}">
            <span>{{data.label}}</span>
            <span v-if="!data.children || data.children.length < 1">{{'=' + data.value }}</span>
          </div>
        </el-tree>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execConfirm" size="small">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroCompareConfig_Temp',
  data() {
    return {
      title: '',
      showDialog: false,
      serviceCode: '',
      loadingLeft: false,
      loadingRight: false,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      reqParamsMap: null,
      reqParamsKeyMap: null,
      leftConfig: null,
      rightConfig: null,
      leftData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      rightData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
    };
  },
  methods: {
    show(serviceCode, reqParamsMap, reqParamsKeyMap) {
      this.showDialog = true;
      this.title = '配置对比';
      this.reqParamsMap = reqParamsMap;
      this.reqParamsKeyMap = reqParamsKeyMap;
      this.serviceCode = serviceCode;
      this.testCompare();
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
    execConfirm() {
      console.log('do nth');
    },
    testCompare() {
      api.getInstanceConfigSingle('6304431450469826560', 'osgi-mq', '6304431457147158530')
        .then(res => {
          this.leftConfig = res.data;
          return api.getInstanceConfigSingle('6304430811325005824', 'osgi-mq', '6304430819612950530');
        })
        .then(res => {
          this.rightConfig = res.data;
          this.handleCompare(this.leftConfig, this.rightConfig);
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    handleCompare(leftConfig, rightConfig) {
      let leftData = [];
      let rightData = [];
      // 服务配置
      let leftMicroserviceData = {
        label: '服务配置',
        status: '',
        value: '',
        children: [],
      };
      let rightMicroserviceData = {
        label: '服务配置',
        status: '',
        value: '',
        children: [],
      };
      for (let key in leftConfig.microserviceConfigVo) {
        if (this.reqParamsMap[key] && this.reqParamsMap[key].indexOf(this.serviceCode) !== -1) {
          let leftMicroserviceDataItem = {
            label: this.reqParamsKeyMap[key],
            value: leftConfig.microserviceConfigVo[key],
            equals: '',
            children: null,
          };
          let rightMicroserviceDataItem = {
            label: this.reqParamsKeyMap[key],
            value: rightConfig.microserviceConfigVo[key],
            equals: '',
            children: null,
          };
          rightMicroserviceDataItem.equals = rightMicroserviceDataItem.value === leftMicroserviceDataItem.value;
          leftMicroserviceData.children.push(leftMicroserviceDataItem);
          rightMicroserviceData.children.push(rightMicroserviceDataItem);
        }
      }
      if (leftMicroserviceData.children.length > 0) {
        leftData.push(leftMicroserviceData);
        rightData.push(rightMicroserviceData);
      }
      // osgi配置
      let leftOsgiData = {
        label: 'OSGI配置',
        equals: '',
        value: '',
        children: [],
      };
      let rightOsgiData = {
        label: 'OSGI配置',
        equals: '',
        value: '',
        children: [],
      };
      for (let key in leftConfig.osgiConfigVo) {
        if (key === 'mqListener                                                                                                                                                                     Port') {
          key = 'mqListenerPort2';
        }
        if (this.reqParamsMap[key] && this.reqParamsMap[key].indexOf(this.serviceCode) !== -1) {
          let leftOsgiDataItem = {
            label: this.reqParamsKeyMap[key],
            value: leftConfig.osgiConfigVo[key],
            equals: '',
            children: null,
          };
          let rightOsgiDataItem = {
            label: this.reqParamsKeyMap[key],
            value: rightConfig.osgiConfigVo[key],
            equals: '',
            children: null,
          };
          rightOsgiDataItem.equals = rightOsgiDataItem.value === leftOsgiDataItem.value;
          leftOsgiData.children.push(leftOsgiDataItem);
          rightOsgiData.children.push(rightOsgiDataItem);
        }
      }
      if (leftOsgiData.children.length > 0) {
        leftData.push(leftOsgiData);
        rightData.push(rightOsgiData);
      }
      // 高级配置的 Properties配置
      if (leftConfig.advanceConfigList && leftConfig.advanceConfigList.length > 0) {
        leftConfig.advanceConfigList.forEach((advanceConfig, index) => {
          let leftAdavnceData = {
            label: advanceConfig.des,
            status: '',
            value: '',
            children: [],
          };
          let rightAdavnceData = {
            label: advanceConfig.des,
            status: '',
            value: '',
            children: [],
          };
          advanceConfig.properties.forEach((advanceItem, propertiesIndex) => {
            let leftAdavnceDataItem = {
              label: advanceItem.tag,
              value: advanceItem.value,
              equals: '',
              children: null,
            };
            let rightAdavnceDataItem = {
              label: advanceItem.tag,
              value: rightConfig.advanceConfigList[index].properties[propertiesIndex].value,
              equals: '',
              children: null,
            };
            rightAdavnceDataItem.equals = rightAdavnceDataItem.value === leftAdavnceDataItem.value;
            leftAdavnceData.children.push(leftAdavnceDataItem);
            rightAdavnceData.children.push(rightAdavnceDataItem);
          });
          leftAdavnceData.children.push({
            label: '其它参数',
            value: advanceConfig.extra,
            equals: '',
            children: null,
          });
          rightAdavnceData.children.push({
            label: '其它参数',
            value: rightConfig.advanceConfigList[index].extra,
            equals: rightConfig.advanceConfigList[index].extra === advanceConfig.extra,
            children: null,
          });
          if (leftAdavnceData.children.length > 0) {
            leftData.push(leftAdavnceData);
            rightData.push(rightAdavnceData);
          }
        });
      }
      this.leftData = leftData;
      this.rightData = rightData;
    },
  },
};
</script>

<style scoped>
  /deep/ .el-dialog{
    border-radius: 3px;
  }
  /deep/ .el-dialog__header{
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    border-radius: 3px;
  }
  /deep/ .el-dialog__title{
    font-size: 16px;
    font-weight: 600;
  }

  /deep/ .el-dialog__body {
    padding: 20px 10px;
  }

  .el-icon-folder-opened{
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 300px;/*需要配合宽度来使用*/
  }

  /deep/ .el-tree{
    height: 30rem;
  }

  .tree-head{
    cursor: pointer;
    background: #fff;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    border-bottom: 0;
  }

  .head-name{
    display: inline-block;
    width: 60%;
    padding-left: 20px;
    border-right: 1px solid #e6e6e6;

  }

  .head-size{
    display: inline-block;
    height: 26px;
    line-height: 26px;
    text-align: center;
    min-width: 20%;
    border-right: 1px solid #e6e6e6;
  }

  .head-modified{
    display: inline-block;
    min-width: 20%;
    text-align: center;
  }
  .title-des-ctn{
    display: inline-block;
    font-size: 10px;
    margin-right: 20px;
  }
  .title-des{
    display: inline-block;
    width: 18px;
    height: 10px;
    background-color:#f56c6c ;
    margin-right: 5px;
    border-radius: 3px;
  }
  .new-blue{
    background:#409eff;
  }

  .equal-black{
    background: grey;
  }
  .new {
    color: #409eff;
  }

  .modify {
    color: #f56c6c;
  }

  .other {
    color: grey;
  }
  .filesize {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    text-align: right;
    min-width: 20%;
    padding-right: 40px;
  }
  .createtime {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    text-align: center;
    min-width: 80px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .el-tree-node .is-current {
    background-color: #f5f7fa;
  }
  /deep/ .el-tree-node_content {
    height: 2.5rem;
    line-height: 2.5rem;
  }
  /deep/ .el-tree {
    height: 28rem;
    overflow: auto;
    border: 1px solid #e3e3e3;
    background: #fff;
  }

  /deep/ .el-carousel__arrow {
    background-color: rgba(15,23,30,.11);
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
