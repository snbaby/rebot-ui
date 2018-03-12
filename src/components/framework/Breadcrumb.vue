<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="(item, index) in breadcrumbs" >
      <el-breadcrumb-item :to="{ path: item.path }" :key="index">{{item.name}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'vBreadcrumb',
  props: {
    breadcrumbs: {
      type: Array,
    },
  },
};
</script>
