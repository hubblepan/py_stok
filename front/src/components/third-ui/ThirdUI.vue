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
    import menuData from './ui-menu';
    export default {
        name: "ThirdUI",
        components: {AppContainer},
        data() {
            return {
                filterText: '',
                data: menuData,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        }
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
