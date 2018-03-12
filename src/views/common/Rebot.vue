<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar :routes="frameworkRoutes"></v-sidebar>
    <div class="body-content">
      <v-breadcrumb :breadcrumbs="$route.matched.slice(1)"></v-breadcrumb>
      <v-divide></v-divide>
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import vHead from '../../components/framework/Header';
import vSidebar from '../../components/framework/Sidebar';
import vDivide from '../../components/framework/Divide';
import vBreadcrumb from '../../components/framework/Breadcrumb';

export default {
  data() {
    return {};
  },
  components: {
    vHead,
    vSidebar,
    vDivide,
    vBreadcrumb,
  },
  computed: {
    ...mapState('framework', ['frameworkRoutes']),
  },
  created() {
    console.log(this.$route);
    console.log(this.$route.matched);
  },
};
</script>
