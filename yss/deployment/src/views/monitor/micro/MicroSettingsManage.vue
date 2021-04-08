<template>
    <div>
      <app-header :title="'配置列表'"></app-header>

<!--      <div class="d2-mt-20 d2-ml-20 d2-pb-10" style="border-bottom: 1px dotted #dcdcdc">-->
<!--        <el-button size="mini" type="primary" @click="handleAddProgram">添加程序</el-button>-->
<!--      </div>-->

      <div>
        <el-row>
          <el-col :span="8">
            <el-select v-model="project" placeholder="方案选择" size="small" style="margin-top: 20px; margin-left: 20px">
              <el-option
                label="方案1"
                value="方案1">
              </el-option>
              <el-option
                label="方案2"
                value="方案2">
              </el-option>
              <el-option
                label="方案3"
                value="方案3">
              </el-option>
            </el-select>
            <el-tree
              v-loading="loadingData"
              :data="treeData"
              :props="defaultProps"
              node-key="fullPath"
              :highlight-current="true"
              :default-expand-all="true"
              ref="Tree"
              style="margin-left: 20px; margin-top: 20px; padding-left: 10px; padding-top: 10px; margin-right: 10px;">
            <!--      <span slot-scope="{ node, data }">-->
            <!--        <span>{{ data.fileName }}</span>-->
            <!--      </span>-->
            </el-tree>
          </el-col>
          <el-col :span="14">
            <div style="border: 1px solid #ebeef5; height: 700px; margin-top: 20px">
              文件编辑插件
            </div>
          </el-col>
        </el-row>
      </div>

      <micro-program-upload-add :on-added="onProgramAdded" ref="Upload"></micro-program-upload-add>
      <div>
        原型说明：

      </div>
    </div>
</template>

<script>
import AppHeader from '../../../components/header/AppHeader';
import MicroProgramUploadAdd from './MicroProgramUploadAdd';
export default {
  name: 'MicroSettingsManage',
  components: {MicroProgramUploadAdd, AppHeader},
  data() {
    return {
      project: '',
      loadingData: false,
      treeData: [
        {
          id: 111,
          label: 'osgi-fast',
          children: [
            {
              id: 11,
              label: 'tomcat1',
              children: [{
                id: 2,
                label: 'YSS_APP',
                children: [{
                  id: 3,
                  label: 'global',
                  children: [
                    {
                      id: 4,
                      label: 'xxx.properties',
                    }, {
                      id: 5,
                      label: 'xxxx.properties',
                    },
                  ],
                }],
              }],
            },
          ],
        }, {
          id: 6,
          label: 'osgi-uco',
          children: [
            {
              id: 61,
              label: 'tomcat2',
              children: [{
                id: 7,
                label: 'YSS-app',
                children: [{
                  id: 8,
                  label: 'runtime.properties',
                }, {
                  id: 9,
                  label: 'xx.properties',
                }, {
                  id: 10,
                  label: 'xxxx.properties',
                }],
              }],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    handleAddProgram(index, item) {
      this.$refs.Upload.show();
    },
    onProgramAdded(p) {
      p.then(res => {
        // 成功
        console.log(res);
        this.$refs.Upload.closeLoading();
        this.$refs.Upload.close();
        // 刷新节点列表
        // TODO this.execListNode();
      }).catch(reason => {
        console.log(reason);
        this.$refs.Upload.closeLoading();
        this.$message.error({
          message: '添加程序失败:' + reason,
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
