<template>
  <!-- 新增节点 -->
  <el-dialog :title="title" :visible.sync="showDialog" width="820px"  :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
    <el-carousel trigger="click" height="32rem" :autoplay="false" :loop="false" @change="onPageChanged" ref="Carousel">
      <el-carousel-item v-for="item in compareData" :key="item.id" style="padding: 0px 10px">
        <div style="float: right; margin-bottom: 10px;">
          <div class="title-des-ctn"><div class="title-des"></div><span>修改</span></div>
          <div class="title-des-ctn"><div class="title-des new-blue"></div><span>新增</span></div>
          <div class="title-des-ctn"><div class="title-des equal-black"></div><span>相等</span></div>
        </div>
        <p class="tree-head">
          <span class="head-name">名称</span>
          <span class="head-size">大小(B)</span>
          <span class="head-modified">修改时间</span>
        </p>
        <el-tree
          empty-text="暂无数据"
          :data="item"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="fileName"
          :props="defaultProps"
          ref="tree">
          <span :class="['custom-tree-node',{new:data.comparedResult === 'new',modify:data.comparedResult === 'modify',other:(data.comparedResult !== 'new'&& data.comparedResult !== 'modify')}]" slot-scope="{ node, data }">
            <span :class="{'el-icon-folder-opened': data.dir,'el-icon-document': data.dir}" :title="node.label">
              {{ node.label }}
            </span>
            <span>
              <span :class="['filesize',{new:data.comparedResult === 'new', modify:data.comparedResult === 'modify', other:data.comparedResult !== 'new' && data.comparedResult !== 'modify'}]">
                {{ data.fileSize | fileSizeFileter }}
              </span>

              <span :class="['createtime',{new:data.comparedResult === 'new', modify:data.comparedResult === 'modify', other: data.comparedResult !== 'new' && data.comparedResult!=='modify'}]">
                {{data.createTime | createTimeFilter}}
              </span>
            </span>
          </span>
        </el-tree>
      </el-carousel-item>
    </el-carousel>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="execNext" size="small" :loading="loading">{{this.compareData.length === (this.activeIndex + 1) ? '执行升级' : '下一页'}}</el-button>
      </span>
  </el-dialog>
</template>

<script>
import * as validate from '@/libs/validate';
import * as api from '../api/node_manage_api';
export default {
  name: 'NodeUpgradeCompare',
  props: ['onCompared'],
  data() {
    return {
      title: '',
      showDialog: false,
      loading: false,
      activeIndex: 0,
      test: '',
      nodeNameMap: {},
      compareData: [],
      defaultProps: {
        children: 'children',
        label: 'fileName',
      },
    };
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
  methods: {
    show(data, nodeNameMap) {
      this.nodeNameMap = nodeNameMap;
      let compareData = [];
      data.forEach((item, index) => {
        compareData.push([item]);
      });
      this.compareData = compareData;
      this.showDialog = true;
      this.activeIndex = 0;
      this.title = '文件对比~(' + this.nodeNameMap[this.compareData[0][0].tomcatId] + ')';
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
    onPageChanged(index) {
      this.activeIndex = index;
      this.title = '文件对比~(' + this.nodeNameMap[this.compareData[index][0].tomcatId] + ')';
    },
    execDeploy() {
      // do nothings
      this.$router.push({name: 'NodeUpgradeComplete', params: {test: '11'}});
    },
    execNext() {
      console.log(this.activeIndex, this.compareData.length);
      if (this.activeIndex !== (this.compareData.length - 1)) {
        // 下一页
        this.$refs.Carousel.next();
      } else {
        // 执行部署
        this.onCompared();
        this.close();
      }
      // this.$refs['formAddNode'].validate((valid) => {
      //   if (valid) {
      //     this.addNode.loading = true;
      //     this.onAdded(api.createNode(this.addNode.formData)); // 将请求的promise返回给调用者
      //     // show loading
      //     this.showLoading();
      //   } else {
      //     return false;
      //   }
      // });
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
