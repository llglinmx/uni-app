<template>
  <view class="btn" @click="btnCick">{{btnName}}</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    btnName: {}
  },
  methods: {
    btnCick() {
      this.$emit('clickBtn')
    },
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 96rpx;
  margin-bottom: 24rpx;
  background: #2626FF;
  border-radius: 12rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #fff;
}
</style>
