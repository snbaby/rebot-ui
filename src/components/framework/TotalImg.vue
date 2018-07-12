<template>
  <div class="total_img_box">
    <div class="left">
      <div class="content">
        <img class="img"  src="../../../static/default/images/u001.png" alt="" />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <p>{{title}}</p>
      </div>
      <div class="number">
        <p>{{number}}</p>
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
      type: Number,
    },
  },
};
</script>
