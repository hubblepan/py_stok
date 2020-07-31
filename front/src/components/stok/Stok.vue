<template>
    <app-container title="应用部署">
        <div class="content">
            <el-row :gutter="10">
                <el-col :lg="6" :md="8" :xs="12" v-for="o in menuData" :key="o" style="margin-bottom: 0.5rem">
                    <el-card :body-style="{ padding: '0px' }" @click.native="go(o)">
                        <div style="padding: 14px;">
                            <span>{{o.title}}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

    </app-container>
</template>

<script>
    import AppContainer from "../views/AppContainer";
    import menu from './menu';
    export default {
        name: "Stok",
        components: {AppContainer},
        data() {
            return {
                menuData: menu.menu,
                menuItem: {
                    routeName: '',
                    title: '',
                }
            };
        },
        methods: {
            go(item) {
                this.$router.push({name: item.routeName})
            }
        }
    }
</script>

<style scoped>
.content {
    margin-left: 1rem;
    background-color: white;

}
</style>
