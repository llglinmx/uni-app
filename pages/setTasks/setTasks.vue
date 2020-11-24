<template>
  <view class="setTasks-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="setTasks-box-head">
      <nav-bar @back="goBack"></nav-bar>
    </view>
    <view class="setTasks-box-content">
      <view class="content-title">请选择一个词库开始学习：</view>
      <view class="content-list" v-for="(item,index) in dataList" :key="index">
        <view class="list-text">{{item.title}}</view>
        <view class="list-box">
          <view :class="{'active':idx==activeIndex&&index==checkIndex}" class="list-box-li" v-for="(v,idx) in item.data"
                @click="checkTask(index,idx)">{{v}}
          </view>
        </view>
      </view>
    </view>
    <view class="setTasks-box-footer">
      <view class="footer-btn" @click="planBtn('plan')">制定学习计划</view>
      <view class="footer-msg">
        <text @click="planBtn('skip')">暂时跳过</text>
      </view>
    </view>
  </view>
</template>

<script>

import navBar from '@/components/nav-bar/nav-bar'

export default {
  data() {
    return {
      checkIndex: 0,
      activeIndex: 0,
      paddingTop: 0,
      dataList: [{
        title: '热门',
        data: ['高考高频词汇', '四级高频', '四级', '四级', '考研']
      },
        {
          title: '高中',
          data: ['四级', '六级', '考研']
        },
        {
          title: '大学',
          data: ['四级', '六级', '考研']
        }
      ]
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

    getData() {

    },

    // 返回
    goBack() {
      uni.navigateBack({})
    },

    // 选中任务
    checkTask(index, idx) {
      this.checkIndex = index
      this.activeIndex = idx
    },

    // 底部按钮
    planBtn(type) {
      switch (type) {
        case "plan": // 制定学习计划
          uni.navigateTo({
            url: "../formulatePlan/formulatePlan"
          })
          break;
        case "skip": // 暂时跳过
          uni.redirectTo({
            url: "../home/home"
          })
          break;
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.setTasks-box {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .setTasks-box-head {
  }

  .setTasks-box-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 48rpx;
    box-sizing: border-box;

    .content-title {
      margin: 40rpx 0 0;
      font-size: 40rpx;
      font-weight: 600;
      color: $uni-text-color;
    }

    .content-list {
      margin-top: 48rpx;

      .list-text {
      }

      .list-box {
        display: flex;
        flex-wrap: wrap;

        .list-box-li {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 52rpx;
          margin-top: 40rpx;
          margin-right: 48rpx;
          // max-width: 272rpx;
          // min-width: 160rpx;
          height: 60rpx;
          border: 1rpx solid #2626FF;
          border-radius: 32rpx;
          font-size: 28rpx;
          color: #2626FF;
        }

        .active {
          background: #2626FF;
          color: #fff !important;
        }

      }
    }
  }

  .setTasks-box-footer {
    padding: 0 48rpx;
    box-sizing: border-box;
    font-weight: 500;

    .footer-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 96rpx;
      margin-bottom: 24rpx;
      background: #2626FF;
      color: #fff;
      font-size: 32rpx;
      border-radius: 12rpx;
    }

    .footer-msg {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 96rpx;
      color: #999;
      font-size: 28rpx;
    }
  }
}
</style>
