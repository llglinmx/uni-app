<template>
  <view class="go-back-box">
    <view class="back-img" @click="goBack">
      <image src="../../static/image/go-back-ico.png" mode="widthFix"></image>
    </view>
    <view class="title">{{title}}</view>
    <view class="head-text">
      <text> {{textT}}</text>
      <text> {{textB}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      default: ''
    },
    textT: {
      default: ''
    },
    textB: {
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back-box {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;

  .back-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88rpx;
    height: 88rpx;

    image {
      width: 22rpx;
      height: 40rpx;
    }
  }

  .title {
    padding-right: 50rpx;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $uni-text-color;
    font-weight: 600;
  }

  .head-text {
    margin-right: 20rpx;
    display: flex;
    flex-direction: column;
    color: $uni-text-color;
    font-size: 18rpx;
    font-weight: 600;

    text {
      text-align: right;
    }
  }
}
</style>
