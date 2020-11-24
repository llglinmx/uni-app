<template>
  <view class="about-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="about-box-head">
      <nav-bar @back="goBack" title="关于"></nav-bar>
    </view>
    <view class="about-box-content">
      <view class="about-content-wrap">
        <view class="about-logo">

        </view>
        <view class="about-edition">
          <view class="about-name">背单词App</view>
          <view class="about-number">Version 1.0</view>
        </view>
      </view>
      <view class="about-content-explain">
        这里是关于软件的介绍，用户协议与隐私政策可
        在文本中提到，并以可跳转链接形式展示。这里是关于软件的介绍，用户协议与隐私政策可
        在文本中提到，并以可跳转链接形式展示。
      </view>
    </view>
  </view>
</template>

<script>
import navBar from '@/components/nav-bar/nav-bar'

export default {
  data() {
    return {
      paddingTop: 0,
    }
  },
  components: {
    navBar,
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.paddingTop = res.statusBarHeight
      }
    });
  },
  methods: {
    // 返回
    goBack() {
      uni.navigateBack({})
    },
  }

}
</script>

<style lang="scss" scoped>
.about-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .about-box-head {
  }

  .about-box-content {
    flex: 1;
    overflow-y: scroll;
    padding: 0 48rpx;
    box-sizing: border-box;
    color: $uni-text-color;
    border-top: 1rpx solid #EBEBEB;

    .about-content-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 60rpx 0 80rpx;

      .about-logo {
        width: 120rpx;
        height: 120rpx;

        border-radius: 12rpx;
        background: purple;
      }

      .about-edition {
        margin-top: 40rpx;

        .about-name {
          font-weight: 700;
          font-size: 32rpx;
        }

        .about-number {
          font-size: 28rpx;
          font-weight: 600;
        }
      }
    }

    .about-content-explain {
      font-size: 28rpx;
      text-indent: 2em;
    }
  }
}
</style>
