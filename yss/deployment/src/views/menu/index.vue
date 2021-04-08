<template>
  <d2-container>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-button-group>
          <el-button type="primary" :disabled="!menuManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
          <el-button type="primary" :disabled="!menuManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
          <el-button type="primary" :disabled="!menuManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
        </el-button-group>
      </div>
      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="menuTree"
            @node-click="getNodeData"
            default-expand-all
          >
          </el-tree>
        </el-col>
        <el-col :span="16" style='margin-top:15px;'>
          <el-card class="box-card">
            <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="form" ref="menuForm">
              <el-form-item label="菜单名" prop="name">
                <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="父节点" prop="parentName">
                <el-input v-model="form.parentName" :disabled="formEdit" placeholder="点选父级节点" readonly></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="icon">
                <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select class="filter-item" v-model="form.type" :disabled="formEdit" placeholder="请选择资源类型">
                  <el-option v-for="item in  typeOptions" :key="item.key" :label="item.value"
                    :value="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.type !== 'dir'" label="请求path" prop="path">
                <el-input v-model="form.path" :disabled="formEdit" placeholder="请输入请求路径"></el-input>
              </el-form-item>
              <el-form-item v-if="form.type == 'menu'" label="页面类型" prop="pageType">
                <el-select class="filter-item" v-model="form.pageType" :disabled="formEdit" placeholder="请选择页面嵌套类型">
                  <el-option v-for="item in  typePageOptions" :key="item.key" :label="item.value"
                    :value="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.pageType == 'iframe' || form.pageType == 'outurl'" label="外源URL" prop="url">
                <el-input v-model="form.url" :disabled="formEdit" placeholder="请输入外源url"></el-input>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary" @click="update">更新</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button type="primary" @click="create">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import {
  fetchTree, getMenu, addMenu, delMenu, updateMenu,
} from '@api/menu/index.js';
import util from '@/libs/util.js';
import router from '@/router';
import store from '@/store';

export default {
  name: 'menu1',
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: [{ key: 'dir', value: '目录' }, { key: 'menu', value: '菜单' }],
      typePageOptions: [{ key: 'iframe', value: 'IFrame嵌套' }, { key: 'div', value: 'div嵌套' }, {
        key: 'outurl',
        value: '外部链接',
      }],
      listQuery: {
        name: undefined,
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        parentName: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
      },
      currentId: undefined,
      currentName: undefined,
      menuManager_btn_add: true,
      menuManager_btn_edit: true,
      menuManager_btn_del: true,
      // 表单校验
      rules: {
        name: [
          {
            required: true,
            message: '请输入菜单名',
            trigger: 'blur',
          },
        ],
        path: [
          {
            message: '请输入path',
            trigger: 'blur',
          },
          { pattern: /^\/.*/, message: '必须以/开头' },
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    },
  },
  created() {
    this.getList();
    this.menuManager_btn_add = true;
    this.menuManager_btn_del = false;
    this.menuManager_btn_edit = false;
  },
  methods: {
    getList() {
      fetchTree().then(data => {
        let array = [];
        array[0] = data;
        let menusFront = util.backendMenusToMenus(array);
        this.currentId = data.id;
        this.currentName = data.name;
        this.treeData = menusFront;
      }
      );
    },
    refreshList() {
      fetchTree().then(data => {
        let array = [];
        array[0] = data;
        let menusFront = util.backendMenusToMenus(array);
        this.currentId = data.id;
        this.currentName = data.name;
        this.treeData = menusFront;
        // this.$store.dispatch('d2admin/db/databasePageClear') 未生效
        let routers = util.backendMenusToTwoRouters(data);
        router.replace(routers);
        store.commit('d2admin/page/init', menusFront[0].children);
        store.commit('d2admin/menu/asideSet', menusFront[0].children);
        util.storageMenuToCookies(data);
      }
      );
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (data.path === '/views' || data.path === '/views/portal/menu' || data.path === '/views/portal') {
        this.menuManager_btn_edit = false;
        this.menuManager_btn_del = false;
        this.menuManager_btn_add = false;
        this.onCancel();
      } else {
        this.menuManager_btn_edit = true;
        this.menuManager_btn_del = true;
        if (!this.formEdit) {
          this.formStatus = 'update';
        }
      }
      getMenu(data.id).then(response => {
        this.form = response;
        if (this.form.type === 'dir') {
          this.menuManager_btn_add = true;
        } else {
          this.menuManager_btn_add = false;
        }
        this.currentId = this.form.id;
        this.currentName = this.form.name;
      });
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      this.resetForm();
      this.form.parentId = this.currentId;
      this.form.parentName = this.currentName;
      this.form.type = 'dir';
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        delMenu(this.currentId).then(() => {
          this.resetForm();
          this.refreshList();
          this.onCancel();
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          });
        });
      });
    },
    validate() {
      return this.$refs.menuForm.validate();
    },
    update() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (this.form.pageType === 'iframe') {
            this.form.component = 'iframe/1.vue';
          } else if (this.form.pageType === 'div') {
            this.form.component = 'div/1.vue';
          } else if (this.form.pageType === 'outurl') {
            this.form.component = 'outurl/1.vue';
          }
          updateMenu(this.form).then(() => {
            this.refreshList();
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000,
            });
          });
        }
      });
    },
    create() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (this.form.pageType === 'iframe') {
            this.form.component = 'iframe/1.vue';
          } else if (this.form.pageType === 'div') {
            this.form.component = 'div/1.vue';
          } else if (this.form.pageType === 'outurl') {
            this.form.component = 'outurl/1.vue';
          }
          addMenu(this.form).then(() => {
            this.refreshList();
            this.$notify({
              title: '成功',
              message: '创建成功.',
              type: 'success',
              duration: 2000,
            });
          });
        }
      }
      );
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        name: undefined,
        parentId: undefined,
        parentName: undefined,
        url: undefined,
        icon: undefined,
        path: undefined,
        enabled: undefined,
        type: 'dir',
      };
    },
  },
};
</script>
