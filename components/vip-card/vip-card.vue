<template>
  <view class="popup-privilege-box" :style="{'height':isforever?'760rpx':'818rpx'}">
    <view class="popup-privilege-bg">
      <view class="popup-privilege-bg-title">会员特权</view>
      <view class="popup-privilege-bg-text">
        <text>尊贵权益等你来拿</text>
      </view>
      <view class="popup-privilege-bg-list">
        <view class="popup-privilege-list-li">
          <view class="popup-privilege-list-li-ico">
            <image src="../../static/image/microphone-ico.png" mode="aspectFill"
                   style="width: 46rpx;height: 70rpx;"></image>
          </view>
          <view class="popup-privilege-list-li-info">
            <view class="popup-privilege-info-title">口语练习</view>
            <view class="popup-privilege-info-text">发音练习录音回放</view>
          </view>
        </view>
        <view class="popup-privilege-list-li">
          <view class="popup-privilege-list-li-ico">
            <image src="../../static/image/ad-ico.png" mode="aspectFill" style="width: 64rpx;height: 64rpx;"></image>
          </view>
          <view class="popup-privilege-list-li-info">
            <view class="popup-privilege-info-title">去广告</view>
            <view class="popup-privilege-info-text">去除App内所有广告</view>
          </view>
        </view>
        <view class="popup-privilege-list-li">
          <view class="popup-privilege-list-li-ico">
            <image src="../../static/image/menu-ico.png" mode="aspectFill" style="width: 58rpx;height: 58rpx;"></image>
          </view>
          <view class="popup-privilege-list-li-info">
            <view class="popup-privilege-info-title">其他特权</view>
            <view class="popup-privilege-info-text">更多特权等待开放中</view>
          </view>
        </view>
      </view>
    </view>
    <view class="popup-privilege-bottom-one" :style="{'height':isforever?'340rpx':'448rpx'}"></view>
    <view class="popup-privilege-bottom-two" :class="{'popup-privilege-bottom-two-bg':isforever}">
      <view class="popup-privilege-bottom-btn" @click="clickBtn('top',1)">{{btnName1}}</view>
      <view class="popup-privilege-bottom-btn1" v-if="!isforever" @click="clickBtn('bottom',2)">{{btnName2}}</view>
    </view>
    <view class="privilege-close-ico" @click="clickBtn('close')">
      <image src="../../static/image/privilege-close-ico.png" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    btnName1: {},
    btnName2: {},
    isforever: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickBtn(type,id) {
      switch (type) {
        case "top":
          this.$emit("clickOne",id)
          break;
        case "bottom":
          this.$emit("clickTwo",id)
          break;
        case "close":
          this.$emit("close")
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-privilege-box {
  position: relative;
  width: 600rpx;
  height: 818rpx;
  border-radius: 12rpx;

  .popup-privilege-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 540rpx;
    height: 100%;
    padding: 50rpx 98rpx 0;
    box-sizing: border-box;
    background: #fff;
    border-radius: 12rpx 12rpx 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;

    .popup-privilege-bg-title {
      font-weight: 700;
      font-size: 40rpx;
      color: $uni-text-color;
    }

    .popup-privilege-bg-text {
      margin-top: 20rpx;
      font-size: 24rpx;
      color: #626266;

      text {
        position: relative;
      }

      text::after,
      text::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 1rpx;
        width: 50rpx;
        background: $uni-text-color;
      }

      text::after {
        right: -60rpx;
      }

      text::before {
        left: -60rpx;
      }
    }

    .popup-privilege-bg-list {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      .popup-privilege-list-li {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 46rpx;

        .popup-privilege-list-li-ico {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64rpx;
          margin-right: 48rpx;

          image {
          }
        }

        .popup-privilege-list-li-info {
          display: flex;
          flex-direction: column;

          .popup-privilege-info-title {
            font-size: 28rpx;
            font-weight: 700;
            color: $uni-text-color;
          }

          .popup-privilege-info-text {
            font-size: 24rpx;
            color: #939399;
          }
        }
      }

      .popup-privilege-list-li:first-child {
        margin-top: 46rpx;
      }

      .popup-privilege-list-li:last-child {
        margin-bottom: 0;
      }
    }

  }

  .popup-privilege-bottom-one {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 448rpx;
    background: url(../../static/image/privilege-bg-ico1.png) no-repeat;
    background-size: cover;
    z-index: -1;
    overflow: hidden;
    border-radius: 12rpx;
  }

  .popup-privilege-bottom-two-bg {
    height: 264rpx !important;
    background: url(../../static/image/privilege-bg-ico11.png) no-repeat !important;
    background-size: cover !important;
  }

  .popup-privilege-bottom-two {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 338rpx;
    padding-top: 70rpx;
    box-sizing: border-box;
    background: url(../../static/image/privilege-bg-ico.png) no-repeat;
    background-size: cover;

    .popup-privilege-bottom-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 260rpx;
      height: 72rpx;
      border-radius: 36rpx;
      background: #F5D045;
      color: #1E1E1D;
      font-weight: 600;
      font-size: 28rpx;
    }

    .popup-privilege-bottom-btn1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 258rpx;
      height: 70rpx;
      margin-top: 30rpx;
      border-radius: 36rpx;
      border: 1rpx solid #F5D045;
      color: #F5D045;
      font-weight: 600;
      font-size: 28rpx;
    }
  }

  .privilege-close-ico {
    position: absolute;
    bottom: -160rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 84rpx;
    height: 84rpx;
    z-index: 999;

    image {
      width: 84rpx;
      height: 84rpx;
    }
  }
}
</style>
