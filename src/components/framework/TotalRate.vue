<template>
  <div class="total_rate_box" :style="bgColor">
      <div class="left">
        189
      </div>
      <div class="right">
        <div class="rate">
          61%
        </div>
        <div class="img">
          <img src="../../../static/default/images/u002.png" alt=""/>
        </div>
      </div>
      <div class="title">
        总完成率
      </div>
  </div>
</template>
<script>
export default {
  name: 'vTotalRate',
  props: {
    bgColor: {
      type: Object,
      default: () => ({'background-color': 'rgba(45, 182, 244, 1)'}),
    },
  },
};
</script>
<style scoped>
  .total_rate_box {
    width: 150px;
    height: 112px;
    background: inherit;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(235, 235, 235, 1);
    border-radius: 6px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .total_rate_box .left {
    float: left;
    position: relative;
    left: 18px;
    top: 28px;
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
  }

  .total_rate_box .right {
    float: right;
    position: relative;
    right: 18px;
    top: 28px;
    padding: 3px;
    text-align: center;

  }

  .total_rate_box .right .rate {
    font-weight: 400;
    font-size: 12px;
    color: #ffffff;
  }

  .total_rate_box .right .img {

  }

  .total_rate_box .title {
    position: relative;
    font-size: 12px;
    color: #ffffff;
    top: 68px;
  }
</style>

