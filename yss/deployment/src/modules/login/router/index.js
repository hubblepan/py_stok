import VueRouter from 'vue-router';
import Test from '../pages/Test';
import Login from '../pages/Login';

const routes = [
  // 登录首页
  {
    path: '/',
    component: Login,
  },
  {
    path: '/test',
    component: Test,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
