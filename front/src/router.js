import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from "./components/home/Home";
import Chart from "./components/chart/Chart";
import Stok from "./components/stok/Stok";
import StokCore from "./components/stok/StokCore";
import StokPerformance from "./components/stok/StokPerformance";
import StokMonitor from "./components/stok/StokMonitor";
import ThirdUI from "./components/third-ui/ThirdUI";

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
    return VueRouterPush.call(this, location).catch(err => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace (location) {
    return VueRouterReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

const routes = [
    {
        path:"/home",
        name: 'home',
        component: Home
    },

    {
        path:"/chart",
        name: 'chart',
        component: Chart
    },

    {
        path: "/stok",
        name: 'Stok',
        component: Stok
    },

    {
        path: "/stok-core",
        name: 'StokCore',
        component: StokCore
    },

    {
        path: '/stok-performance',
        name: 'StokPerformance',
        component: StokPerformance,
    },

    {
        path: '/stok-monitor',
        name: 'StokMonitor',
        component: StokMonitor,
    },

    {
        path: "/third-ui",
        name: 'ThirdUI',
        component: ThirdUI
    }
];

var router =  new VueRouter({
    routes
});
export default router;
