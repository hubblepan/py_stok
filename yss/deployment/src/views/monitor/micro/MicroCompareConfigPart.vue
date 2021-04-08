<template>
  <!-- 新增节点 -->
  <el-dialog :title="title" :visible.sync="showDialog" width="820px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <div>
      <div style="margin-bottom: 0px; float: right">
        <div class="title-des-ctn"><div class="title-des"></div><span style="vertical-align: middle">修改</span></div>
        <div class="title-des-ctn"><div class="title-des new-blue"></div><span style="vertical-align: middle">新增</span></div>
        <div class="title-des-ctn"><div class="title-des equal-black"></div><span style="vertical-align: middle">相等</span></div>
      </div>

      <div style="clear: right; margin-left: 10px; margin-right: 10px">
        <div class="tree-head">
          <span class="head-name">名称</span>

          <span class="head-size">当前版本</span>
          <span class="head-modified">切换后版本</span>
        </div>
        <el-tree
          :data="leftData"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          :load="loadingLeft">
          <div slot-scope="{ node, data}">
            <div v-if="data.type === 'config'" :style="{color: getCompareColor(data)}">
              <div  class="node-name">
                <span v-if="data.comparedResult !== 'delete'">{{data.name}}</span>
                <s v-if="data.comparedResult === 'delete'">{{data.name}}</s>
              </div>
              <div class="node-data1">
<!--                <span v-if="data.comparedResult === 'new'" style="color: #2f74ff">{{data.currentValue}}</span>-->
<!--                <span v-if="data.comparedResult === 'modify'" style="color: #ff4d4f">{{data.oldValue + ' -> ' + data.currentValue}}</span>-->
<!--                <span v-if="data.comparedResult === 'same'" style="color: #6c757d">{{data.currentValue}}</span>-->
<!--                <s v-if="data.comparedResult === 'delete'" style="color: darkgray">{{data.oldValue}}</s>-->
                {{data.oldValue}}
              </div>
              <div class="node-data2">
                {{data.currentValue}}
              </div>
            </div>
            <div v-if="data.type === 'category'">
              <span>{{data.name}}</span>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
<!--        <el-button @click="showDialog = false" size="small">取 消</el-button>-->
        <el-button type="primary" @click="execConfirm" size="small">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
export default {
  name: 'MicroCompareConfigPart',
  updated() {
    this.changeColor();
  },
  data() {
    return {

      title: '',
      showDialog: false,
      serviceCode: '',
      loadingLeft: false,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      compareData: null,
      leftData: [
        {
          type: 'category', // category, config
          name: '服务配置',
          oldValue: '',
          currentValue: '',
          comparedResult: '',
          children: [
            {
              type: 'config', // category, config
              name: 'zk端口',
              oldValue: '8090',
              currentValue: '8091',
              comparedResult: 'modify', // new, modify, same, delete
              children: [],
            },
            {
              type: 'config', // category, config
              name: '注册中心',
              oldValue: '',
              currentValue: '方案222_fomp-eureka_集群',
              comparedResult: 'new', // new, modify, same, delete
              children: [],
            },
            {
              type: 'config', // category, config
              name: '数据库',
              oldValue: 'phb@192.168.4.225:1521/orcl',
              currentValue: 'phb@192.168.4.225:1521/orcl',
              comparedResult: 'same', // new, modify, same, delete
              children: [],
            },
          ],
        },

        {
          type: 'category', // category, config
          name: 'OSGI配置',
          oldValue: '',
          currentValue: '',
          comparedResult: '',
          children: [
            {
              type: 'config', // category, config
              name: 'zk端口',
              oldValue: '8090',
              currentValue: '8091',
              comparedResult: 'modify', // new, modify, same, delete
              children: [],
            },
            {
              type: 'config', // category, config
              name: '注册中心',
              oldValue: '方案111_fomp-eureka_集群',
              currentValue: '方案222_fomp-eureka_集群',
              comparedResult: 'modify', // new, modify, same, delete
              children: [],
            },
            {
              type: 'config', // category, config
              name: '数据库',
              oldValue: 'phb@192.168.4.225:1521/orcl',
              currentValue: '',
              comparedResult: 'delete', // new, modify, same, delete
              children: [],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getCompareColor(data) {
      if (data.comparedResult === 'new') {
        return '#409eff';
      } else if (data.comparedResult === 'modify') {
        return '#f56c6c';
      } else if (data.comparedResult === 'same') {
        return 'grey';
      } else {
        return 'rgba(0, 0, 0, 0.2)';
      }
    },
    // 隔行变色
    changeColor() {
      var content = document.getElementsByClassName('el-tree-node__content');
      for (var i = 0; i < content.length; i++) {
        if (i % 2 === 0) {
          content[i].style.background = '#ebeef5';
        } else {
          content[i].style.background = '';
        }
      }
    },
    show(compareData) {
      this.showDialog = true;
      this.compareData = compareData;
      this.leftData = compareData.children;
      this.title = this.compareData.name + '变更';
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
      this.close();
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
  .title-des-ctn{
    display: inline-block;
    font-size: 12px;
    margin-right: 20px;
    vertical-align: middle;
  }

  .title-des{
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 12px;
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
    width: 26%;
    padding-left: 20px;
    border-right: 1px solid #e6e6e6;

  }

  .head-size{
    display: inline-block;
    height: 26px;
    line-height: 26px;
    min-width: 37%;
    padding-left: 20px;
    border-right: 1px solid #e6e6e6;
  }

  .head-modified{
    display: inline-block;
    padding-left: 20px;
    min-width: 37%;
  }

  .node-name{
    display: inline-block;
    width: 160px;
    padding-left: 20px;

  }

  .node-data1{
    display: inline-block;
    width: 287px;
    padding-left: 30px;
  }

  .node-data2{
    display: inline-block;
    width: 287px;
    padding-left: 30px;
  }
</style>
