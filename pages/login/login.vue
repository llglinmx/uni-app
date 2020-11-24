<template>
  <view class="login-box">
    <view class="content">
      <view class="content-top">
        <image src="../../static/logo.png" mode="" class="logo"></image>
        <text class="title">知识单词</text>
      </view>
      <view class="content-bottom">
        <view class="login-btn" style="background: #00C260;" @click="loginMethod('wechat')">
          <image style="width: 40rpx;height: 32rpx;" src="../../static/image/wechat-ico.png" mode=""
                 class="login-ico"></image>
          <text class="login-text">微信登录</text>
        </view>
        <view class="login-btn" style="background: #59C7F7;" @click="loginMethod('QQ')">
          <image style="width: 28rpx;height: 34rpx;" src="../../static/image/qq-cio.png" mode=""
                 class="login-ico"></image>
          <text class="login-text">QQ登录</text>
        </view>
        <view class="bottom-msg">
          <text>登录代表你已同意</text>
          <text class="info">用户协议</text>
          <text>和</text>
          <text class="info">隐私政策</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="center" :maskClick="false">
      <view class="popup-box">
        <view class="popup-box-title">用户协议和隐私政策提示</view>
        <view class="popup-box-center">
          <view class="msg-text">
            感谢您使用背单词。为保护您的个人信息安全，
            我们将依据背单词的
            <text>《用户协议》</text>
            和
            <text>《隐私政策》</text>
            来帮助您了解：我们如何收集个人信息、
            如何使用及储存个人信息，以及您享有的相关
            权利。
          </view>
          <view class="msg-text" style="margin-top: 40rpx;">
            在您使用背单词服务前，请务必仔细阅读
            <text>《用户协议》</text>
            和
            <text>《隐私政策》</text>
            以了解详细内容。如
            您同意请点击“同意”开始使用我们的服务。
          </view>
        </view>
        <view class="popup-box-btn">
          <view class="sign-out" @click="power('signOut')">退出</view>
          <view class="agree" @click="power('agree')">同意</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import {
  openSqlite,
  closeSQL,
  selectSQL,
  createTable,
  insertData,
} from "@/static/api/sqlAjax.js"
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
  data() {
    return {
      isMsg: true,
    }
  },
  components: {
    uniPopup,
  },
  onLoad() {
    // this.msgTitle()
  },
  methods: {
    msgTitle() {
      if (this.isMsg) {
        this.$refs.popup.open()
      }
    },
    // 登录方法
    loginMethod(type) {
      switch (type) {
        case "wechat":
          // this.msgTitle() // 显示协议提示
          this.openSqlite();
          uni.navigateTo({
            url: "../home/home"
          })
          // uni.getProvider({
          // 	service: 'oauth',
          // 	success: function(res) {
          // 		console.log(res.provider);
          // 		uni.showModal({
          // 			content: '回调值：' + res.provider,
          // 			showCancel: false,
          // 			buttonText: '确定',
          // 			success: (res) => {
          // 				if (res.confirm) {
          // 					console.log('用户点击确定');
          // 				} else if (res.cancel) {
          // 					console.log('用户点击取消');
          // 				}
          // 			}
          // 		})
          // 		//支持微信、qq和微博等
          // 		if (~res.provider.indexOf('weixin')) {
          // 			uni.login({
          // 				provider: 'weixin',
          // 				success: function(loginRes) {
          // 					uni.showModal({
          // 						content: "App微信获取用户信息成功" + loginRes,
          // 						showCancel: false,
          // 						buttonText: '确定',
          // 						success: (res) => {
          // 							if (res.confirm) {
          // 								console.log('用户点击确定');
          // 							} else if (res.cancel) {
          // 								console.log('用户点击取消');
          // 							}
          // 						}
          // 					})
          // 					console.log("App微信获取用户信息成功", loginRes);
          // 					// that.getApploginData(loginRes) //请求登录接口方法
          // 				},
          // 				fail: function(res) {
          // 					console.log("App微信获取用户信息失败", res);
          // 				}
          // 			})
          // 		}
          // 	}
          // });

          break;
        case "QQ":
          console.log("2")
          break;
      }
    },

    // 打开数据库
    openSqlite() {
      this.closeSQL("words")
      openSqlite('words', '_doc/words.db').then(e => {
        console.log("words数据库打开成功")
        // wordsTranslate 单词翻译开关   isTranslate  0点击屏幕翻译 1自动翻译 pron 0美式发音 1英式发音 state  1直接显示单词
        // var sql = 'delete  from setTable'
        // var sql = 'create table if not exists setTable("id" INT(11),"wordsTranslate" INT(5),"isTranslate" INT(5),"pron" INT(5),"state" INT(5))'

		// //创建设置表
		// createTable('words', sql).then(res => {
		//   var s = "insert into setTable values(1,0,0,0,0)" // 插入默认数据
		// insertData("words", s).then(res => {
		//   this.closeSQL(name)
		// }).catch(err => {
		//   console.log(err)
		//   console.log(name + "数据插入失败")
		//   // this.closeSQL(name)
		// })
		// }).catch(err => {
		//   console.log("数据表创建失败")
		//   this.closeSQL(name)
		// })
      }).catch(e => {
        console.log("words数据库打开失败")
      })
    },

   

    // 插入数据
    insertData(name, sql) {
      console.log(sql)
      insertData(name, sql).then(res => {
        console.log(name + "数据插入成功")
        this.closeSQL(name)
      }).catch(err => {
        console.log(err)
        console.log(name + "数据插入失败")
        // this.closeSQL(name)
      })
    },
    // 关闭数据库
    closeSQL(type) {
      closeSQL(type).then(res => {
        console.log(type + "数据库关闭成功")
      }).catch(err => {
        console.log(type + "数据库关闭失败")
      })
    },
    // 权限弹出层
    power(type) {
      switch (type) {
        case "signOut":
          uni.showToast({
            title: '暂时不能直接退出程序',
            icon: 'none',
            duration: 2000
          });
          break;
        case "agree":
          this.$refs.popup.close() // 关闭弹出层
          break;
      }
    },

  }
}
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background: url(../../static/image/login-bg.png) no-repeat;
  background-size: contain;

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .content-top {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 160rpx;

      .logo {
        width: 160rpx;
        height: 160rpx;
      }

      .title {
        margin-top: 40rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: $uni-text-color;
      }
    }

    .content-bottom {

      .login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 654rpx;
        height: 80rpx;
        margin-bottom: 40rpx;
        border-radius: 12rpx;

        .login-ico {
        }

        .login-text {
          margin-left: 10rpx;
          color: #fff;
          font-size: 28rpx;
          font-weight: 400;
        }
      }

      .bottom-msg {
        padding: 52rpx 0 24rpx;
        text-align: center;
        font-size: 24rpx;
        color: #1D1D26;

        text.info {
          color: #5B6DEE;
          margin: 0 8rpx;
        }

      }
    }
  }

  .popup-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 600rpx;
    height: 580rpx;
    border-radius: 24rpx;
    background: #fff;

    .popup-box-title {
      padding: 38rpx 0;
      font-size: 32rpx;
      color: #1D1D26;
      font-weight: 600;
      text-align: center;
    }

    .popup-box-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 40rpx;

      .msg-text {
        font-size: 26rpx;

        text {
          color: #0076FF;
        }
      }
    }

    .popup-box-btn {
      display: flex;
      height: 104rpx;
      border-top: 1rpx solid #ccc;
      font-size: 36rpx;

      .sign-out {
        flex: 1;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1rpx solid #ccc;
      }

      .agree {
        position: relative;
        flex: 1;
        color: #0076FF;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }
  }
}
</style>
