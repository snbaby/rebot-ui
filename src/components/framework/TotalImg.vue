<template>
  <div class="total_img_box">
    <div class="left">
      <img class="img"  src="../../../static/default/images/u001.png" alt="" />
    </div>
    <div class="right">
      <div class="title">
        模板总数
      </div>
      <div class="number">
        245
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vTotalImg',
};
</script>
<style scoped>
  .total_img_box {
    width: 200px;
    height: 112px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(235, 235, 235, 1);
    border-radius: 6px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .total_img_box .left {
    float: left;
    position: relative;
    left: 18px;
    top: 24px;
    width: 64px;
    height: 64px;
    color: #FFFFFF;
    background-color: #2db6f4;
    border-radius: 50%;
  }

  .total_img_box .left .img {
    padding-left: 18px;
    padding-top: 16px;
  }

  .total_img_box .right {
    float: right;
    position: relative;
    right: 18px;
    top: 24px;
    width: 64px;
    height: 64px;
  }

  .total_img_box .right .title {
    color: #989898;
    font-size: 12px;
  }

  .total_img_box .right .number {
    font-weight: 500;
    font-size: 32px;
    color: #666666;
  }
</style>
