<template>
  <view class="set-box" :style="{paddingTop:paddingTop +'px'}">
    <view class="set-box-head">
      <nav-bar @back="goBack" title="设置"></nav-bar>
    </view>
    <view class="set-box-content">
      <view class="list-box">
        <view class="li-title">学习</view>
        <view class="list-li">
          <view class="list-li-msg">单词翻译</view>
          <view class="list-li-wrap">
            <switch checked @change="translateChange" v-if="isShow"/>
            <switch @change="translateChange" v-else/>
          </view>
        </view>
        <view class="list-li" v-if="isShow" @click="checkTranslateType('auto')">
          <view class="list-li-msg-indent">自动翻译</view>
          <view class="list-li-wrap">
            <image src="../../static/image/yes-ico.jpg" mode="widthFix" v-if='isCheck'></image>
          </view>
        </view>
        <view class="list-li" v-if="isShow" @click="checkTranslateType('click')">
          <view class="list-li-msg-indent">单击屏幕翻译</view>
          <view class="list-li-wrap">
            <image src="../../static/image/yes-ico.jpg" mode="widthFix" v-if='!isCheck'></image>
          </view>
        </view>
        <view class="li-title">发音</view>
        <view class="list-li" @click="pronounce(0)">
          <view class="list-li-msg">英式发音</view>
          <view class="list-li-wrap">
            <image src="../../static/image/yes-ico.jpg" mode="widthFix" v-if='!isPronounce'></image>
          </view>
        </view>
        <view class="list-li" @click="pronounce(1)">
          <view class="list-li-msg">美式发音</view>
          <view class="list-li-wrap">
            <image src="../../static/image/yes-ico.jpg" mode="widthFix" v-if='isPronounce'></image>
          </view>
        </view>
        <view class="li-title">复习</view>
        <view class="list-li">
          <view class="list-li-msg">直接显示单词</view>
          <view class="list-li-wrap">
            <switch checked @change="showWordChange" v-if="isShowWord"/>
            <switch @change="showWordChange" v-else/>
          </view>
        </view>
        <!-- <view class="list-li">
          <view class="list-li-msg">单词拼写</view>
          <view class="list-li-wrap">
            <switch checked @change="wordSpellChange" v-if="isWordSpell" />
            <switch @change="wordSpellChange" v-else />
          </view>
        </view> -->

      </view>
    </view>
  </view>
</template>

<script>
import {
  openSqlite,
  closeSQL,
  selectSQL,
} from "@/static/api/sqlAjax.js"
import navBar from '@/components/nav-bar/nav-bar'

export default {
  data() {
    return {
      paddingTop: 0,
      isShow: false, // 显示翻译功能类型
      isCheck: false, // 翻译类型
      isShowWord: false, // 直接显示单词
      isWordSpell: false, //单词拼写
      isPronounce: false, //发音类型
    }
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.paddingTop = res.statusBarHeight
      }
    });
    this.openSqlite()
  },
  components: {
    navBar,
  },
  methods: {
    // 返回
    goBack() {
      uni.navigateBack({})
    },
    // 单词翻译开关
    translateChange(e) {
      this.isShow = e.target.value ? true : false;
      this.updateData()
    },

    // 选择翻译类型
    checkTranslateType(type) {
      switch (type) {
        case "auto": // 自动翻译
          this.isCheck = true
          this.updateData()
          break;
        case "click": // 点击屏幕翻译
          this.isCheck = false
          this.updateData()
          break;
      }
    },

    // 发音
    pronounce(type) {
      switch (type) {
        case 0: // 美式发音
          this.isPronounce = false
          this.updateData()
          break;
        case 1: // 英式发音
          this.isPronounce = true
          this.updateData()
          break;
      }
    },
    // 直接显示单词开关
    showWordChange(e) {
      this.isShowWord = e.target.value ? true : false;
      this.updateData()
    },
    // // 单词拼写开关
    // wordSpellChange(){
    // 	this.isWordSpell = e.target.value ? true : false;
    // },
    // 打开数据库
    openSqlite() {
      this.closeSQL("words")
      openSqlite('words', '_doc/words.db').then(e => {
        selectSQL('words', 'select * from setTable').then(data => {
          // console.log(data)
          data.forEach(item => {
            this.isShow = item.wordsTranslate == 0 ? false : true // 显示翻译功能类型
            this.isCheck = item.isTranslate == 0 ? false : true // 翻译类型
            this.isShowWord = item.state == 0 ? false : true // 直接显示单词
            this.isPronounce = item.pron == 0 ? false : true //发音类型
            console.log(item)
          })
        }).catch(data => {
          console.log(data)
          this.closeSQL('words')
        })
      }).catch(e => {
        console.log("words数据库打开失败")
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

    updateData() {
      var wordsTranslate = this.isShow ? 1 : 0
      var words = this.isCheck ? 1 : 0
      var pron = this.isPronounce ? 1 : 0
      var state = this.isShowWord ? 1 : 0
      console.log(wordsTranslate, words, pron, state)
      this.closeSQL("words")
      openSqlite('words', '_doc/words.db').then(e => {
        console.log("words数据库打开成功")
        plus.sqlite.executeSql({
          name: 'words',
          sql: 'update setTable SET wordsTranslate = ' + wordsTranslate + ',isTranslate=' + words + ',pron=' + pron +
              ',state=' + state + '',
          success: e => {
            console.log('executeSql success!');
            this.closeSQL("words")
          },
          fail: err => {
            console.log('executeSql failed: ' + JSON.stringify(err));
          }
        });
      }).catch(e => {
        console.log("words数据库打开失败")
      })


    },
  }
}
</script>

<style scoped lang="scss">
.set-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .set-box-head {
  }

  .set-box-content {
    flex: 1;
    padding: 0 48rpx;
    box-sizing: border-box;
    border-top: 1rpx solid #EBEBEB;

    .list-box {
      .li-title {
        display: flex;
        align-items: flex-end;
        height: 88rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: #939399;
        border-bottom: 1rpx solid #F2F2F2;
      }

      .list-li {
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1rpx solid #F7F7F7;
        color: $uni-text-color;

        .list-li-msg {
          font-size: 28rpx;
          font-weight: 600;
        }

        .list-li-wrap {
          image {
            margin-right: 20rpx;
            width: 34rpx;
            height: 26rpx;
          }
        }

        .list-li-msg-indent {
          padding-left: 20rpx;
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
