<template>
  <view class="help-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="help-box-head">
      <nav-bar @back="goBack" title="帮助"></nav-bar>
    </view>
    <view class="help-box-content">
      <view class="help-list">
        <view class="list-li" v-for="(item,index) in list">
          <view class="list-li-title">Q：为什么每天拨打电话次数有限制？</view>
          <view class="list-li-text">
            A：为了避免因多次呼叫而对其他用户产生影响，因此
            对主动呼叫进行了次数限制，但回拨无限制，敬请谅解。
          </view>
        </view>
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
      list: [{}, {}, {}, {}, {}]
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
.help-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .help-box-head {
  }

  .help-box-content {
    flex: 1;
    overflow-y: scroll;
    padding: 0 48rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #EBEBEB;

    .help-list {
      .list-li {
        margin: 40rpx 0;
        font-size: 28rpx;

        .list-li-title {
          color: $uni-text-color;
          font-weight: 700;
        }

        .list-li-text {
          margin-top: 20rpx;
          color: #666;
        }
      }
    }
  }
}
</style>
