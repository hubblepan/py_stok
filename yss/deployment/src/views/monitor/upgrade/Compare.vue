<template>
  <div class="tem-compare" v-loading="configInfoLoading">
    <div class="card-body" style="padding: 0;">
      <el-row style="height: 400px;">
        <el-col :span="24" >
          <div class="grid-content bg-purple">
            <el-row style="margin-bottom:12px;">
              <el-col offset="8" :span="8">
                <div class="title-des-ctn"><div class="title-des"></div><span>修改</span></div>
                <div class="title-des-ctn"><div class="title-des new-blue"></div><span>新增</span></div>
                <div class="title-des-ctn"><div class="title-des equal-black"></div><span>相等</span></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" >
                <p class="tree-head">
                  <span class="head-name">名称</span>

                  <span class="head-size">大小(B)</span>
                   <span class="head-modified">修改时间</span>
                </p>
                <el-tree
                  :empty-text="tipsText"
                  :data="compareData"
                  :default-expand-all="true"
                  :expand-on-click-node="false"
                  :highlight-current="true"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  node-key="fileName"
                  ref="tree"
                >
                  <span :class="['custom-tree-node',{new:data.comparedResult==='new'?true:false,modify:data.comparedResult==='modify'?true:false,other:(data.comparedResult!=='new'&& data.comparedResult!=='modify')?true:false}]" slot-scope="{ node, data }">
                    <span :class="{'el-icon-folder-opened':data.dir?true:false,'el-icon-document':data.dir?false:true}" :title="node.label">{{ node.label }}</span>
                    <span>
                      <span
                        :class="['filesize',{new:data.comparedResult==='new'?true:false,modify:data.comparedResult==='modify'?true:false,other:(data.comparedResult!=='new'&& data.comparedResult!=='modify')?true:false}]"
                      >{{ data.fileSize | fileSizeFileter }}</span>

                      <span
                        :class="['createtime',{new:data.comparedResult==='new'?true:false,modify:data.comparedResult==='modify'?true:false,other:(data.comparedResult!=='new'&& data.comparedResult!=='modify')?true:false}]"
                      >{{data.createTime | createTimeFilter}}</span>
                    </span>
                  </span>
                </el-tree>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as api from '../api/node_upgrade_api';

export default {
  name: 'compare',
  props: ['tomcatDir'],
  data() {
    return {
      tipsText: '', // 提示语
      configInfoLoading: true,
      compareData: [],
      defaultProps: {
        children: 'children',
        label: 'fileName',
      },
      compareResult: false,
    };
  },
  mounted() {
    this.$parent.noclickCompare = true;
    this.$parent.noclickComplete = false;
    this.showData();
  },
  updated() {
    this.changeColor();
  },
  methods: {
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
    showData: function() {
      // 获取文件对照表
      this.configInfoLoading = true;

      api.getCompareTree([this.$parent.tomcatInfo.id]).then(res => {
        console.log(res);
        this.compareResult = true;
        var arr = [];
        arr.push(res.data[0]);
        this.compareData = arr;
        if (this.compareData.length === 0) {
          this.tipsText = '暂无数据';
        }
        this.configInfoLoading = false;
      }).catch(err => {
        this.compareResult = false;
        console.log(err);
        this.configInfoLoading = false;
      });
    },
    handleNodeClick() {},
    isValid() {
      return this.compareResult;
    },
    getClass(data) {
      console.log(data);
      var showColor = '';
      if (data.result === 'modify') {
        showColor = 'modify';
      } else {
        showColor = 'new';
      }
      return showColor;
    },
  },
  filters: {
    fileSizeFileter(value) {
      if (value === '' || value === null) {
        value = '';
      }
      return value;
    },
    createTimeFilter(value) {
      if (value === '' || value === null) {
        value = '';
      }
      return value;
    },
  },
};
</script>

<style scoped>

/*radio出现一些多余的点，去掉*/
.el-radio:last-child {
  /*margin-right: -10px;*/
}

.el-icon-folder-opened{
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/* 超出部分显示省略号 */
  white-space: nowrap;/*规定段落中的文本不进行换行 */
  width: 300px;/*需要配合宽度来使用*/

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
  font-size: 12px;
  margin-right: 20px;
}
.title-des{
  display: inline-block;
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

.other {
  color: grey;
}
.filesize {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  text-align: right;
  min-width: 20%;
  padding-right: 78px;
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
</style>
<style>
.upload-ctn {
  width: 100%;
}

#tem-upload .el-upload-list {
  overflow: hidden;
  text-align: left;
  margin: 0 auto;
}

.el-tree-node .is-current {
  background-color: #f5f7fa;
}
.el-tree-node_content {
  height: 2.5rem;
  line-height: 2.5rem;
}
.el-tree {
  height: 25rem;
  overflow: auto;
  border: 1px solid #e3e3e3;
  background: #fff;
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 5;
}
</style>
<style scoped>
/*去除table多出的横线*/
.el-table__fixed::before,
.el-table__fixed-right::before {
  z-index: inherit !important;
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

.el-table__body-wrapper {
  height: 300px !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

/*.el-tree {*/
  /*height: 330px;*/
  /*margin-top: -3px;*/
/*}*/

.card-body {
  overflow-y: hidden;
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
