<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar :routes="frameworkRoutes"></v-sidebar>
    <div class="content">
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


export default {
  components: {
    vHead,
    vSidebar,
  },
  computed: {
    ...mapState('framework', ['frameworkRoutes']),
  },
};
</script>
