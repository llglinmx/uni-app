<template>
  <view class="feed-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="feed-box-head">
      <nav-bar @back="goBack" title="意见反馈"></nav-bar>
    </view>
    <view class="feed-box-content">
      <view class="feed-content-msg" :class="{'msg-close':!isMsg}">
        <view class="feed-content-msg-txt">
          为了更快解决您的问题，请在发生问题时或再次遇到问题时，立即提交反馈。
        </view>
        <view class="feed-content-msg-close" @click="closeMsg">
          <image src="../../static/image/close-ico.png" mode="widthFix"></image>
        </view>
      </view>
      <view class="feed-content-redio">
        <view class="feed-redio-msg" v-for="(item,index) in checkList" :key="item.id" @click="checkRedio(index)">
          <image src="../../static/image/check-active-ico.png" mode="widthFix" v-if="item.active"></image>
          <image src="../../static/image/check-ico.png" mode="widthFix" v-else></image>
          <text>{{item.msg}}</text>
        </view>
      </view>

      <view class="feed-content-input">
        <view class="feed-content-textarea">
          <textarea maxlength="201" v-model="textareaValue" placeholder="请填写10个字以上的问题描述或使用建议以便我们提供更好的帮助（必填"></textarea>
        </view>
        <view class="feed-content-list">
          <view class="image-li" v-for="(item,index) in imgArr" :key="index">
            <view class="list-li-img" @click="previewImage(item,index)">
              <image :src="item"></image>
            </view>
            <view class="list-li-del-ico" @click="delImg(index)">
              <image src="../../static/image/del-ico.png" mode=""></image>
            </view>
          </view>
          <view class="image-li" v-show="!isLen">
            <view class="list-li-img" @click="upLoadImg">
              <image src="../../static/image/img-up-ico.png" mode=""></image>
            </view>
          </view>
          <view class="list-msg-text">添加图片(非必选)</view>
        </view>
        <view class="foot-msg">
          <text>图片{{imgArr.length}}/3</text>
          <text style="margin-left: 20rpx;">文字{{textareaValue.length}}/200</text>
        </view>
      </view>

      <view class="feed-content-mail">
        <input type="email" v-model="emailVal" placeholder="邮箱(必填)"/>
      </view>
      <view class="feed-content-btn" :style="{'opacity':notNull?'1':' 0.7'}">
        <nav-btn btnName='提交' @clickBtn="submit"></nav-btn>
      </view>
    </view>
  </view>
</template>

<script>
import navBar from '@/components/nav-bar/nav-bar'
import navBtn from '@/components/nav-btn/nav-btn.vue'

export default {
  data() {
    return {
      paddingTop: 0,
      isMsg: true, // 头部提示文案
      emailVal: '', //邮箱
      textareaValue: '', //反馈建议
      notNull: false,
      isEmail: false, // 验证邮箱
      isLen: false,
      imgArr: [],
      checkList: [{
        msg: "遇到问题",
        id: 1,
        active: true
      },
        {
          msg: "使用建议",
          id: 2,
          active: false
        },
      ]
    }
  },
  watch: {
    // 意见反馈输入框
    textareaValue(curVal) {
      if (curVal.length != 0 && this.emailVal.length != 0) {
        this.notNull = true;
        this.isEmail = true;
      } else {
        this.notNull = false;
      }
      if (curVal.length > 200) {
        uni.showToast({
          title: "超过最大文字输入字数",
          icon: "none"
        })
      }
    },
    //判断图片长度
    imgArr(val) {
      if (val.length > 2) {
        this.isLen = true
        return false;
      }
      this.isLen = false

    },
    // 邮箱输入框
    emailVal(val) {
      var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (val.length != 0 && this.textareaValue.length != 0) {
        this.notNull = true;
        // 验证邮箱格式
        if (reg.test(val)) {
          this.isEmail = true;
        } else {
          console.log("邮箱格式不正确");
          this.isEmail = false;
        }
      } else {
        this.notNull = false;
      }
    },
  },
  components: {
    navBar,
    navBtn
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
    // 关闭 msg 提示内容
    closeMsg() {
      this.isMsg = false;
    },
    // 单选
    checkRedio(index) {
      this.checkList.forEach(item => {
        item.active = false
      })
      this.checkList[index].active = true;
    },
    // 上传图片
    upLoadImg() {
      uni.chooseImage({
        count: 3, //图片张数
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            this.imgArr.push(res.tempFilePaths[i])
          }
          // if(this.imgArr.length>2){
          // 	// this.imgArr.splice(0,1)

          // }
        }
      });
    },

    // 删除图片
    delImg(index) {
      console.log(index)
      this.imgArr.splice(index, 1)
    },
    // 图片预览
    previewImage(src, index) {
      // var imgArr = [];
      // imgArr.push(src);
      //预览图片
      uni.previewImage({
        urls: this.imgArr, // 可以左右滑动预览
        current: this.imgArr[index]
      });
    },
    // 提交按钮
    submit() {
      // 判断必填项是否有填写
      if (this.notNull) {
        if (this.isEmail) {
          uni.showLoading({
            title: '加载中',
            mask: true
          });

          setTimeout(() => {
            uni.hideLoading();
          }, 2000)

        } else {
          uni.showToast({
            title: "请输入正确的邮箱",
            icon: "none"
          })
        }
        return false;
      }
      uni.showToast({
        title: "请检查必填项是否都有填写",
        icon: "none"
      })

    },
  }
}
</script>

<style scoped lang="scss">
.feed-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .feed-box-head {
  }

  .feed-box-content {
    flex: 1;
    overflow-y: scroll;
    padding: 0 48rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #EBEBEB;

    .feed-content-msg {
      height: 120rpx;
      display: flex;
      align-items: center;
      margin: 40rpx 0 0;
      padding: 0 32rpx;
      box-sizing: border-box;
      border-radius: 12rpx;
      background: #E5F2FF;
      transition: 0.5s;

      .feed-content-msg-txt {
        flex: 1;
        margin-right: 30rpx;
        font-size: 28rpx;
        color: #2626FF;
        font-weight: 500;
      }

      .feed-content-msg-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20rpx;
        height: 50rpx;

        image {
          width: 20rpx;
          height: 20rpx;
        }
      }
    }

    .msg-close {
      height: 0rpx;
      margin-top: 0;
      overflow: hidden;
    }

    .feed-content-redio {
      display: flex;
      align-items: center;
      padding: 40rpx 20rpx;
      box-sizing: border-box;

      .feed-redio-msg {
        display: flex;
        align-items: center;

        image {
          width: 42rpx;
          height: 42rpx;
        }

        text {
          margin-left: 24rpx;
          font-size: 28rpx;
          color: $uni-text-color;
        }
      }

      .feed-redio-msg:nth-child(2) {
        margin-left: 100rpx;
      }

    }

    .feed-content-input {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 32rpx;
      box-sizing: border-box;
      background: #F5F5F5;
      border-radius: 12rpx;

      .feed-content-textarea {
        flex: 1;
        margin-bottom: 25rpx;
        color: $uni-text-color;

        textarea {
          font-size: 28rpx;

        }
      }

      .feed-content-list {
        display: flex;
        align-items: center;
        height: 125rpx;

        .image-li {
          position: relative;
          margin-right: 24rpx;

          .list-li-img {
            width: 100rpx;
            height: 100rpx;
            border-radius: 12rpx;
            overflow: hidden;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .list-li-del-ico {
            position: absolute;
            top: -25rpx;
            right: -25rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50rpx;
            height: 50rpx;

            image {
              width: 36rpx;
              height: 36rpx;
            }
          }

        }

        .list-msg-text {
          // margin-left: 32rpx;
          font-size: 28rpx;
          color: #999;
        }
      }

      .foot-msg {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 20rpx;
        bottom: 10rpx;
        font-size: 20rpx;
        color: #999;
      }


    }

    .feed-content-mail {
      width: 100%;
      height: 78rpx;
      margin-top: 40rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 12rpx;

      input {
        width: 100%;
        height: 100%;
        font-size: 28rpx;
      }
    }

    .feed-content-btn {
      margin-top: 80rpx;
    }
  }

}
</style>
