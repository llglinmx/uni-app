<template>
  <view class="popup-vip-box">
    <view class="vip-box-head">{{title}}</view>
    <view class="vip-box-content">
      <view class="content-vip-title">{{content}}</view>
      <view class="content-vip-btn" @click="buyVip">立即开通</view>
      <view class="content-vip-text" @click="noBuy">暂不开通</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {},
    content: {}
  },
  methods: {
    // 开通会员
    buyVip() {
    },
    // 暂不开通
    noBuy() {
      this.$emit("closeBtn")
    },
  }
}
</script>

<style lang="scss" scoped>
.popup-vip-box {
  display: flex;
  flex-direction: column;
  width: 440rpx;
  height: 436rpx;
  border-radius: 12rpx;


  .vip-box-head {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120rpx;
    background: url(../../static/image/pop-bg.png) no-repeat;
    background-size: contain;
    color: #F5D045;
    font-size: 32rpx;
    font-weight: 500;
  }


  .vip-box-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    padding: 0 44rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 0 0 12rpx 12rpx;

    .content-vip-title {
      font-size: 28rpx;
      margin-bottom: 40rpx;
      color: $uni-text-color;
    }

    .content-vip-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 260rpx;
      height: 72rpx;
      background: #F5D045;
      border-radius: 32rpx;
      font-size: 28rpx;
      color: $uni-text-color;
    }

    .content-vip-text {
      margin-top: 30rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: #909099;
    }
  }

}
</style>
