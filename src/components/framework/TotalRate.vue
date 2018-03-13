<template>
  <div class="total_rate_box" :style="bgColor">
    <div class="box_top">
      <div class="left">
        <div class="number">
          {{number}}
        </div>
      </div>
      <div class="right">
        <div class="rate">
          {{rate}}
        </div>
        <div class="img">
          <img src="../../../static/default/images/u002.png" alt=""/>
        </div>
      </div>
    </div>
    <div class="box_bottom">
      <div class="title">
        {{title}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vTotalRate',
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
    rate: {
      type: String,
      default: '0%',
    },
  },
};
</script>

