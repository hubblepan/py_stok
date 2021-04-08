<template>
  <section class="wrapper">
    <PortalHeader></PortalHeader>
    <main class="main-wrapper container">
      <PortalSideMenu></PortalSideMenu>
      <section id="main-body" class="main-body">
        <router-view />
      </section>
    </main>
    <!--
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 2.3.8
      </div>
      <strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
      reserved.
    </footer>
    -->
  </section>
</template>

<script>
import PortalHeader from './components/Header';
import PortalSideMenu from './components/SideMenu';

export default {
  name: 'Devops',
  components: {
    PortalHeader,
    PortalSideMenu,
  },
  created () {
  },
};
</script>
