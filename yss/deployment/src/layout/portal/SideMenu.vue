<template>
  <aside class="main-sidebar">
    <section class="sidebar" style="height: auto;">
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form"></form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="treeview">
          <router-link to="/devops/registry">
            <i class="mr-2 el-icon-s-management"></i>
            <!-- <font-awesome-icon :icon="['fas', 'tachometer-alt']" /> -->
            <span>注册中心</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </router-link>
        </li>
        <li class="treeview">
          <router-link to="/devops/config/">
            <i class="mr-2 el-icon-s-tools"></i>
            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <span>配置中心</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">9</span>
            </span>
          </router-link>
        </li>
        <li class="treeview">
          <router-link to="/devops/gateway/">
            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <i class="mr-2 el-icon-s-platform"></i>

            <span>网关管理</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">2</span>
            </span>
          </router-link>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="mr-2 el-icon-s-order"></i>
            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <span>日志中心</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">6</span>
            </span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <i class="mr-2 el-icon-s-help"></i>

            <span>追踪中心</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">1</span>
            </span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="mr-2 el-icon-s-platform"></i>

            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <span>监控中心</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">2</span>
            </span>
          </a>
        </li>
        <li class="treeview">
          <router-link to="/monitor/setup/">
            <i class="mr-2 el-icon-s-flag"></i>

            <!-- <font-awesome-icon :icon="['fas', 'th']" /> -->
            <span>安装步骤</span>
            <span class="pull-right-container">
              <span class="badge badge-danger float-right">2</span>
            </span>
          </router-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'PortalSideMenu',
};
</script>
