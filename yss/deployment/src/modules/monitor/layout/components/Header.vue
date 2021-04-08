<template>
  <!--头部部分开始-->
  <header class="main-header bg">
    <section class="container">
      <!-- Logo -->
      <a class="logo" href="/">
        <span class="logo-mini">
          <img class="img" src="image/logo.svg" />
        </span>
        <span class="logo-lg">
          <img class="img" src="/image/logo.svg" />部署监控中心
        </span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar">
        <!-- Sidebar toggle button-->
        <div>
          <a class="d-none" href="#" data-toggle="offcanvas" role="button">
            <font-awesome-icon :icon="['fas', 'bars']" />
            <span class="sr-only">Toggle navigation</span>
          </a>
          <h5>
            <span class="badge badge-danger">20 alerts</span>
          </h5>
        </div>
        <nav class="navbar navbar-expand-sm">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Dashboard</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hosts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Alerts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Admin</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mr-2" href="#" data-toggle="dropdown">
                <font-awesome-icon :icon="['fas', 'th']" />
              </a>
            </li>
            <el-dropdown class="d-flex align-items-center">
              <el-button>
                <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />Admin
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/template">
                  <el-dropdown-item>模板管理</el-dropdown-item>
                </router-link>
                <router-link to="/service">
                  <el-dropdown-item>服务器管理</el-dropdown-item>
                </router-link>
                <router-link to="/agent">
                  <el-dropdown-item>探针管理</el-dropdown-item>
                </router-link>
                <router-link to="/appmanage">
                  <el-dropdown-item>应用管理</el-dropdown-item>
                </router-link>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </ul>
        </nav>
      </nav>
    </section>
  </header>
  <!--头部部分结束-->
</template>

<script>
export default {
  name: 'PortalHeader',
};
</script>
