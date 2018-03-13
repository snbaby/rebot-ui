<template>
  <div class="total_number_box" :style="bgColor">
    <div class="number_box_top">
      <div class="number">
        {{number}}
      </div>
    </div>
    <div class="number_box_bottom">
      <div class="title">
        {{title}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vTotalNumber',
  props: {
    bgColor: {
      type: Object,
      default: () => ({ 'background-color': 'rgba(45, 182, 244, 1)' }),
    },
    title: {
      type: String,
      default: 'title',
    },
    number: {
      type: String,
      default: '0',
    },
  },
};
</script>

