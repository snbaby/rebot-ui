<template>
  <div class="total_img_box">
    <div class="left">
      <img class="img"  src="../../../static/default/images/u001.png" alt="" />
    </div>
    <div class="right">
      <div class="title">
        {{title}}
      </div>
      <div class="number">
        {{number}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vTotalImg',
  props: {
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
