<template>
  <view class="plan-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="plan-box-head">
      <nav-bar @back="goBack" title="我的计划"></nav-bar>
    </view>
    <view class="plan-box-content">
      <view class="plan-card">
        <view class="card-con">
          <view class="card-con-top">
            <view class="card-con-top-text">高考高频词汇</view>
            <view class="card-con-top-edit">
              <image src="../../static/image/edit-ico.png" mode="widthFix"></image>
            </view>
          </view>
          <view class="card-con-bottom">
            <view class="card-con-bottom-text">已学习单词</view>
            <view class="card-con-bottom-msg">
              <text class="text1">2400</text>
              /
              <text class="text2">5800</text>
            </view>
          </view>
        </view>
        <view class="card-bar" id="card-bar">
          <view class="progress-bar" :style="{width:widthStyle+'rpx'}"></view>
        </view>
      </view>
      <view class="plan-list">
        <view class="plan-list-li">
          <view class="li-info">
            <image src="../../static/image/task-ico1.png" mode="widthFix" style="width: 28rpx;height: 32rpx;"></image>
            <text>已进行任务数</text>
          </view>
          <view class="li-text">25/280</view>
        </view>
        <view class="plan-list-li">
          <view class="li-info">
            <image src="../../static/image/task-ico2.png" mode="widthFix" style="width: 30rpx;height: 32rpx;"></image>
            <text>已进行任务天数</text>
          </view>
          <view class="li-text">20/200</view>
        </view>
        <view class="plan-list-li">
          <view class="li-info">
            <image src="../../static/image/start-time-ico.png" mode="widthFix"
                   style="width: 32rpx;height: 32rpx;"></image>
            <text>开始时间</text>
          </view>
          <view class="li-text">2020-05-25</view>
        </view>
        <view class="plan-list-li" style="color: #2626FF;">
          <view class="li-info">
            <image src="../../static/image/end-time-ico.png" mode="widthFix"
                   style="width: 30rpx;height: 32rpx;"></image>
            <text>结束时间</text>
          </view>
          <view class="li-text">2020-12-25</view>
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
      widthStyle: 0,
      totalNum: 5800, // 单词总数量
      learnNum: 2400, //已学习数量
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
  onReady() { //页面初次渲染完毕执行
    this.getDescBox()
  },
  methods: {
    // 返回
    goBack() {
      uni.navigateBack({})
    },
    // 计算进度条
    getDescBox() {
      uni.createSelectorQuery().in(this).select("#card-bar").boundingClientRect(result => {
        var w = result.width / this.totalNum * this.learnNum // 总宽度 / 总数量 * 已完成数量
        this.widthStyle = w * 2 // 这里 *2  是因为使用rpx 2倍计算
      }).exec()
    },
  }
}
</script>

<style scoped lang="scss">
.plan-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .plan-box-head {
  }

  .plan-box-content {
    padding: 0 48rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #EBEBEB;

    .plan-card {
      position: relative;
      width: 100%;
      height: 240rpx;
      margin: 60rpx 0 80rpx;
      border-radius: 12rpx;
      box-shadow: 0 0 10px 0px #e0e0e0;
      overflow: hidden;

      .card-con {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 48rpx 40rpx;
        box-sizing: border-box;
        color: $uni-text-color;

        .card-con-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .card-con-top-text {
            font-size: 40rpx;
            font-weight: bold;
          }

          .card-con-top-edit {
            width: 36rpx;
            height: 36rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }
        }

        .card-con-bottom {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-weight: 700;

          .card-con-bottom-text {
            font-size: 24rpx;
          }

          .card-con-bottom-msg {
            .text1 {
              font-size: 40rpx;
            }

            .text2 {
              font-size: 28rpx;
            }
          }
        }
      }

      .card-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 12rpx;
        border-radius: 0 0 0 12rpx;

        .progress-bar {
          position: relative;
          top: 0;
          left: 0;
          width: 200rpx;
          height: 100%;
          background: #2626FF;
          // border-radius:0 0 0 12rpx;
        }
      }

    }

    .plan-list {
      .plan-list-li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx 0;
        color: $uni-text-color;

        .li-info {
          display: flex;
          align-items: center;

          image {
          }

          text {
            margin-left: 18rpx;
            font-size: 28rpx;

          }
        }

        .li-text {
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
