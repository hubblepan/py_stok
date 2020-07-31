<template>
    <app-container title="节点管理">
        <div>
            <el-tree
                    class="content"
                    :data="data"
                    :props="defaultProps"
                    accordion
                    ref="tree">
            </el-tree>
        </div>

    </app-container>
</template>

<script>
    import AppContainer from "../views/AppContainer";
    import coreData from './core';
    export default {
        name: "StockCore",
        components: {AppContainer},
        data() {
            return {
                filterText: '',
                data: [
                    {
                        id: 1,
                        label: '网格布局(1000)',
                        children: [
                            {
                                id: 1001,
                                label: '磁贴布局(10001)',
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: 'markdown',
                    },
                    {
                        id: 3,
                        label: '画布',
                    },
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted() {
            this.data = this.parseCoreData();
        },
        methods: {
          parseCoreData() {
              this.data = [];
              let result = [];
              coreData.core.sort((a, b) => (b.total - a.total)).forEach((item, index) => {
                  item.items.length > 0 && result.push({
                      id: index,
                      label: item.items[0]._source.name + '(' + item.code + ')',
                      children: item.items.map((item) => ({id: item._source.code, label: item._source.title}))
                  })
              });
              return result;
          }
        },
    }
</script>

<style scoped>
    .content {
        margin-left: 1rem;
    }
    /deep/ .el-tree-node__content {
        height: 3.5rem;
        font-size: 1rem;
        border-bottom: 1px solid rgb(225, 225, 225);
    }
</style>
