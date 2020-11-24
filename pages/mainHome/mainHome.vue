<template>
	<view class="main-box" :style="{paddingTop:paddingTop +'px'}">
		<view class="main-box-head">
			<nav-bar @back="goBack" :textT='textT' :textB='textB'></nav-bar>
		</view>
		<view class="main-box-content" :style="{'marginBottom':isVip?'40rpx':'0'}">
			<view class="main-content-swiper">
				<swiper class="swiper" :duration="duration" previous-margin="44rpx" next-margin="44rpx" @change="swiperChange">
					<swiper-item v-for="(item,index) in wordList" :key="item.id">
						<view class="swiper-item" :class="{'item-height':isIndex==index}" v-if="item.id!=-1" @click="showTranslate">
							<view class="item-icon" v-if="isState==1" @touchstart.stop="showChange(index)" @touchend.stop="showEndChange(index)">
								<view class="item-icon-img" v-if="!isShow">
									<image v-if="!item.isCheck" style="width: 40rpx;height: 40rpx;" src="../../static/image/icon.png" mode="aspectFill"></image>
									<image v-else style="width: 40rpx;height: 40rpx;" src="../../static/image/icon-active.png" mode="aspectFill"></image>
								</view>
							</view>

							<view class="item-top">
								<view class="item-top-word">
									<view class="item-word" v-if="isShow">
										<text class="text">
											<text>{{item.word}}</text>
										</text>
									</view>
									<view class="item-word" v-if="!isShow">
										<text class="text" v-if="isState==0">
											<text>{{item.word}}</text>
										</text>
										<text class="text" :class="{'item-word-active':isState==1}" v-else>
											<text style="color: #FF3030;" v-if="!item.isCheck" :class="{'textColor':item.word==item.character}">{{item.character}}
											</text>
											<text v-else>{{item.word}}</text>
										</text>
									</view>
									<view class="item-word-txt">
										<!-- [<text>ə`</text><text class="red">bæn</text><text>dən</text>] -->
										[
										<text> {{item.phonetic}}</text>
										]
									</view>

									<view class="item-word-list" v-if="isState==0">
										<view class="item-word-item" v-if="isTran">
											<view class="item-list-li" v-if="tranType">{{item.translations}}</view>
										</view>
										<!-- <view class="item-list-li">n. 放任；放纵</view> -->
									</view>
									<view class="item-word-list" v-if="isState==1">
										<view class="item-word-item" v-if="!isShow">
											<view class="item-list-li">{{item.translations}}</view>
										</view>
										<!-- <view class="item-list-li">n. 放任；放纵</view> -->
									</view>
									<view class="item-wrap-show" v-if="!isShow">
										<view class="item-wrap-list" v-show="isState==1">
											<view class="item-wrap-li" :class="{'item-wrap-li-active':v.isActive}" v-for="(v,idx) in item.list" :key="idx"
											 @click="clickList(index,idx)">{{v.word}}
											</view>
											<view class="item-wrap-li" @click="delWordList(index)">
												<image style="width: 44rpx;height: 32rpx" src="../../static/image/word-close-ico.png" mode="widthFix"></image>
											</view>
										</view>
									</view>

								</view>
							</view>
							<view class="item-bottom">
								<view class="item-bottom-btn">
									<view class="btn-left">
										<image src="../../static/image/horn-ico.png" @click.stop="playWord(index)" mode="aspectFill" v-if="!isPlayWord"></image>
										<image src="../../static/image/horn-ico1.gif" mode="aspectFill" v-else></image>
									</view>
									<view class="btn-center">
										<image @longpress="voiceBtn($event)" @touchstart="startLongpress" @touchend="endLongpress" :style="{'opacity':isSound?'0.7':'1'}"
										 src="../../static/image/voice-ico.png" mode="aspectFill"></image>
									</view>
									<view class="btn-right">
										<image src="../../static/image/sound-ico1.gif" mode="aspectFill" v-if="isPlay"></image>
										<image src="../../static/image/play-ico1.png" @click.stop="playback" mode="aspectFill" v-else></image>
									</view>
								</view>
								<view class="sound-effect" :style="{'width':isSound?'268rpx':'0'}">
									<image src="../../static/image/ly-ico.gif" mode="" :style="{'width':isSound?'166rpx':'0'}"></image>
								</view>
							</view>
						</view>
						<view class="swiper-item" :class="{'item-height':isIndex==index}" v-else>
							<view class="swiper-item-last-msg">
								<view class="swiper-item-last-msg-top">
									<view class="swiper-item-last-msg-ico">
										<image src="../../static/image/integer-ico.png" mode="aspectFill"></image>
									</view>
									<view class="swiper-item-last-msg-title">完成任务</view>
									<view class="swiper-item-last-msg-content">
										恭喜你已完成今天的学习和复习任务，并获得2积分，积分可以兑换会员奖励噢！
									</view>
								</view>
								<view class="swiper-item-last-msg-bottom">
									<view class="swiper-item-last-msg-btn" @click="getPoints">领取积分</view>
									<view class="swiper-item-last-msg-text">若未完全掌握，可返回重新学习！</view>
								</view>

							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="cover-box" v-if="isSound"></view>
		</view>
		<view class="main-box-ad" v-if="!isVip">
			<view class="main-box-ad-info"></view>
		</view>

		<uni-popup ref="popup" type="center" :maskClick="false">
			<vip-popup title="单词测评" content="单词跟读测评与回放录音为会员特权，是否开通会员？" @closeBtn="closePop"></vip-popup>
		</uni-popup>
		<uni-popup ref="integralMsg" type="center" :maskClick="false">
			<view class="popup-vip-box">
				<view class="vip-box-head">领取成功</view>
				<view class="vip-box-content">
					<view class="content-vip-title">领取成功，获得8积分。仅每天首次完成任务可获得积分！</view>
					<view class="content-vip-btn" @click="integralClose">我知道了</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar/nav-bar'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import vipPopup from '@/components/vip-popup/vip-popup.vue'
	import {
		openSqlite,
		closeSQL,
		selectSQL,
		isOpen
	} from "@/static/api/sqlAjax.js"

	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';

	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;

	export default {
		data() {
			return {
				isTran: false, // 是否开启单词翻译
				tranType: false, //翻译模式   false 为单击屏幕翻译  true 为自动翻译
				wordsTranType:false,
				pronType: false, //发音类型  false 为英式发音   true 为美式发音
				isShow: false, // 复习界面是否直接显示单词
				paddingTop: 0,
				isVip: true, //是否有开会员
				isPlayWord: false, //播放单词
				isState: false, //用于判断当前处于什么状态  学习/复习   false为学习  true为复习
				isPlay: false, // 用于判断学习界面播放回放
				isSound: false, //是否录音
				duration: 500,
				centeredSlides: true,
				msgText: this.isState ? "已复习" : "已学习",
				msgText1: this.isState ? "还需复习" : "还需复习",
				isFlag: false,
				textT: 0,
				textB: 0,
				isIndex: 0,
				wordList: [],
				voicePath: '',
				pageIndex:0,//页数
				pageSize:20,//每次请求多少条数据
			}
		},
		watch: {
			isIndex(val) {
				this.textT = (this.isState == 1 ? '已复习 ' : '已学习 ') + (val)
				this.textB = (this.isState == 1 ? '还需复习 ' : '还需学习 ') + (this.wordList.length - val - 1);
			}
		},
		components: {
			uniPopup,
			navBar,
			vipPopup
		},
		onLoad(options) {

			// console.log(this.$store.state.wordsList)

			if (!!options.isState) {
				this.isState = options.isState
			}

			uni.getSystemInfo({
				success: (res) => {
					this.paddingTop = res.statusBarHeight
				}
			});

			this.textT = (this.isState == 1 ? '已复习 ' : '已学习 ') + (this.isIndex) //初始已学习/复习数量
			this.textB = (this.isState == 1 ? '还需复习 ' : '还需学习 ') + (this.wordList.length - this.isIndex - 1) //初始还需学习/复习数量

			let self = this;
			recorderManager.onStop(function(res) {
				console.log(JSON.stringify(res));
				self.voicePath = res.tempFilePath;
			});
			
			this.getSetInfo() // 获取设置信息

			this.getData()
		},
		methods: {

			// 返回
			goBack() {
				uni.navigateBack({})
			},

			//设置信息
			getSetInfo() {
				this.closeSQL("words")
				openSqlite('words', '_doc/words.db').then(e => {
					selectSQL('words', 'select * from setTable').then(data => {
						data.forEach(item => {
							this.isTran = item.wordsTranslate == 0 ? false : true // 显示翻译功能类型
							this.tranType = item.isTranslate == 0 ? false : true // 翻译类型
							this.wordsTranType = item.isTranslate == 0 ? false : true // 翻译类型 (用于判断)
							this.pronType = item.pron == 0 ? false : true //发音类型
							this.isShow = item.state == 0 ? false : true
						})
					}).catch(data => {
						console.log(data)
						this.closeSQL('words')
					})
				}).catch(e => {
					console.log("words数据库打开失败")
				})
			},

			// 获取数据
			getData() {
				this.closeSQL('words')

				var objList = [{
						word: 'We',
						isActive: false
					},
					{
						word: 'com',
						isActive: false
					}, {
						word: 'wel',
						isActive: false
					}, {
						word: 'l',
						isActive: false
					}, {
						word: 'lcom',
						isActive: false
					}, {
						word: 'e',
						isActive: false
					},
				]
				var arrList = []
				
				openSqlite('words', '_doc/words.db').then(e => {
					console.log("words数据库打开成功")
					selectSQL('words', 'select * from wordsData2 limit '+this.pageIndex+','+this.pageSize+'').then(data => {
						data.forEach((item, index) => {
							// console.log(item)
							var str = {
								word: item.word,
								phonetic: item.phonetic,
								translations: item.translations,
								id: item.id,
								arr: [],
								character: "",
								isCheck: false,
								list: objList
							}
							arrList.push(str);

						})
						// 往数组的最后添加一条数据  不能不加 不然不能显示任务完成界面
						arrList.push({
							id: -1
						})
						this.wordList = arrList
					}).catch(data => {
						console.log(data)
					})

				}).catch(e => {
					console.log("words数据库打开失败")
				})
			},

			// 点击显示翻译
			showTranslate() {
				this.tranType = true
			},

			// 滑动事件
			swiperChange(e) {
				this.isIndex = e.detail.current
				if(!this.wordsTranType){
					this.tranType = false
				}
			},

			// 播放单词
			playWord(index) {
				this.isPlayWord = true
				setTimeout((item) => {
					this.isPlayWord = false
				}, 1500)

				//type值  0为美式 1 为英式
				let src = ''
				console.log(this.pronType)
				if (this.pronType) {
					src = 'http://dict.youdao.com/dictvoice?type=1&audio=' + this.wordList[index].word;
				} else {
					src = 'http://dict.youdao.com/dictvoice?type=0&audio=' + this.wordList[index].word;
				}

				// let src = this.wordList[index].src
				const Audio = uni.createInnerAudioContext();
				Audio.autoplay = true;

				Audio.src = src; //音频地址

				Audio.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});


			},


			// 长按录音
			voiceBtn(e) {
				if (this.isVip) {
					recorderManager.start({ //开始录音
						format: 'mp3', //音频格式，有效值 aac/mp3/wav/PCM
					});
					return false;
				}

			},
			startLongpress() {
				console.log(this.isVip)
				if (this.isVip) {
					this.isSound = true;
					return false;
				}
				this.$refs.popup.open()
				console.log("手指开始")
			},
			// 手指离开长按事件
			endLongpress() {
				if (this.isVip) {
					this.isSound = false;
					console.log("手指离开")
					recorderManager.stop(); //结束录音
					return false;
				}

			},

			// 点击播放回放
			playback() {
				if (this.isVip) {
					if (this.voicePath) { //播放录音
						this.isPlay = true
						innerAudioContext.src = this.voicePath;
						innerAudioContext.play();
						setTimeout(() => {
							this.isPlay = false
						}, 2000)
					} else {
						uni.showToast({
							title: "你还没有录音回放文件，请先录音",
							icon: "none"
						})
					}
					return false;
				}

				uni.showToast({
					title: "你还没有录音回放文件，请先录音",
					icon: "none"
				})
			},

			// 单词组合点击事件
			clickList(index, idx) {
				// 判断为false  则添加进数组  几 界面显示
				if (!this.wordList[index].list[idx].isActive) {
					this.wordList[index].arr.push(this.wordList[index].list[idx].word)
					this.wordList[index].character = this.wordList[index].arr.join('')
				}
				// 添加完成后 变true
				this.wordList[index].list[idx].isActive = true

				console.log(this.wordList[index].arr)
			},
			// 删除
			delWordList(index) {
				var arrList = []
				// 获取到添加的最后一个元素
				var str = this.wordList[index].arr[this.wordList[index].arr.length - 1]
				// 循环比对  删除对应的元素
				this.wordList[index].list.forEach(item => {
					if (item.word == str) {
						item.isActive = false
						this.wordList[index].arr.splice(this.wordList[index].arr.length - 1, 1)
						arrList = this.wordList[index].arr
					}
				})

				// 删除成功后赋值界面显示
				if (arrList.length + 1 != 0) {
					this.wordList[index].character = arrList.join('')
				}
			},


			// 复习界面  手指长按显示单词
			showChange(index) {
				this.wordList[index].isCheck = !this.wordList[index].isCheck
			},
			// 复习界面 手指离开隐藏单词
			showEndChange(index) {
				this.wordList[index].isCheck = !this.wordList[index].isCheck
			},


			// 关闭弹窗
			closePop() {
				this.$refs.popup.close()
			},


			// 领取积分
			getPoints() {
				this.$refs.integralMsg.open(); //积分领取成功s弹窗
			},
			// 关闭积分领取成功弹出层
			integralClose() {
				this.$refs.integralMsg.close();
			},


			// 关闭数据库
			closeSQL(type) {
				closeSQL(type).then(res => {
					console.log(type + "数据库关闭成功")
				}).catch(err => {
					console.log(type + "数据库关闭失败")
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		background: #F5F5FA;

		.main-box-head {}

		.main-box-content {
			position: relative;
			flex: 1;
			width: 100%;
			margin-top: 20rpx;
			margin-bottom: 32rpx;

			.main-content-swiper {
				height: 100%;

				.swiper {
					height: 100%;

					swiper-item {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						width: 640rpx;
						height: 100%;

						.swiper-item {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							width: 640rpx;
							height: 95%;
							padding: 140rpx 48rpx 72rpx;
							box-sizing: border-box;
							background: #fff;
							border-radius: 12rpx;
							transition: 0.3s;

							.item-icon {
								position: absolute;
								top: 20rpx;
								right: 20rpx;
								width: 40rpx;
								height: 40rpx;
								padding: 20rpx;

								.item-icon-img {
									width: 100%;
									height: 100%;
								}
							}

							.item-top {
								.item-top-word {

									.item-word {
										display: flex;
										justify-content: center;
										height: 80rpx;
										font-size: 60rpx;
										font-weight: 700;
										color: $uni-text-color;

										.text {
											.textColor {
												color: $uni-text-color !important;
											}
										}

										.item-word-active {
											// padding: 0 16rpx;
											box-sizing: border-box;
											// color: #FF3030;
											color: #2626FF;
											border-bottom: 1rpx solid $uni-text-color;
										}
									}


									.item-word-txt {
										display: flex;
										justify-content: center;
										align-items: center;
										margin: 40rpx 0 30rpx;
										font-size: 32rpx;
										color: $uni-text-color;

										.red {
											color: #FF3030;
										}
									}

									.item-word-list {
										padding: 0 42rpx;
										box-sizing: border-box;
										font-size: 24rpx;
										font-weight: 500;
										color: #747499;

										.item-list-li {
											line-height: 40rpx;
										}
									}

									.item-wrap-list {
										display: flex;
										flex-wrap: wrap;
										margin-top: 80rpx;

										.item-wrap-li {
											display: flex;
											align-items: center;
											justify-content: center;
											width: 110rpx;
											height: 60rpx;
											margin-bottom: 32rpx;
											margin-right: 24rpx;
											border: 1rpx solid #747499;
											border-radius: 6rpx;
											font-size: 32rpx;
											color: #747499;
											font-weight: 100;
											transition: 0.5;
										}

										.item-wrap-li:nth-child(4n) {
											margin-right: 0;
										}

										.item-wrap-li:last-child {
											border: 0;
										}

										.item-wrap-li-active {
											border: 1rpx solid $uni-text-color;
											color: $uni-text-color !important;
											font-weight: normal;
											// font-weight: 600;
										}
									}
								}
							}

							.item-bottom {
								position: relative;
								height: 134rpx;
								padding: 0 52rpx;
								box-sizing: border-box;

								.item-bottom-btn {
									display: flex;
									align-items: center;
									justify-content: space-between;

									.btn-left {
										display: flex;
										align-items: center;
										justify-content: center;
										width: 96rpx;
										height: 96rpx;
										border-radius: 50%;
										box-shadow: 0 0 8rpx 0 #e5e5e5;

										image {
											width: 96rpx;
											height: 96rpx;
										}
									}

									.btn-center {
										image {
											width: 134rpx;
											height: 134rpx;
											transition: 0.2s;

										}
									}

									.btn-right {
										display: flex;
										align-items: center;
										justify-content: center;
										width: 96rpx;
										height: 96rpx;
										border-radius: 50%;
										box-shadow: 0 0 8rpx 0 #e5e5e5;

										image {
											width: 96rpx;
											height: 96rpx;
										}
									}
								}

								.sound-effect {
									display: flex;
									align-items: center;
									justify-content: center;
									position: absolute;
									left: 0;
									right: 0;
									margin: auto;
									top: -172rpx;
									width: 268rpx;
									height: 172rpx;
									background: url(../../static/image/sound-effect-ico.png) no-repeat;
									background-size: cover;
									transition: 0.5s;

									image {
										width: 166rpx;
										height: 88rpx;
										transition: 0.5s;
										transform: translateY(-10rpx);
									}
								}
							}

							.swiper-item-last-msg {
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;

								.swiper-item-last-msg-top {
									display: flex;
									align-items: center;
									flex-direction: column;

									.swiper-item-last-msg-ico {
										width: 282rpx;
										height: 306rpx;

										image {
											width: 100%;
											height: 100%;
										}
									}

									.swiper-item-last-msg-title {
										margin: 60rpx 0 48rpx;
										color: $uni-text-color;
										font-size: 40rpx;
										font-weight: 600;
									}

									.swiper-item-last-msg-content {
										color: $uni-text-color;
										font-size: 28rpx;
										font-weight: 600;
										line-height: 44rpx;
									}
								}

								.swiper-item-last-msg-bottom {
									display: flex;
									align-items: center;
									flex-direction: column;
									margin-bottom: 44rpx;

									.swiper-item-last-msg-btn {
										display: flex;
										align-items: center;
										justify-content: center;
										width: 260rpx;
										height: 72rpx;
										margin: 0 0 40rpx;
										border-radius: 36rpx;
										font-size: 28rpx;
										color: #fff;
										background: $uni-text-color;
									}

									.swiper-item-last-msg-text {
										font-size: 24rpx;
										font-weight: 500;
										color: #999;
									}
								}
							}

						}

						.item-height {
							height: 100%;
						}
					}
				}
			}

			.cover-box {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 9999999;
			}
		}

		.main-box-ad {
			width: 100%;
			height: 120rpx;
			padding: 0 48rpx;
			margin: 32rpx 0;
			box-sizing: border-box;

			.main-box-ad-info {
				width: 100%;
				height: 120rpx;
				background: #fff;
				border-radius: 12rpx;
			}
		}

		.popup-vip-box {
			display: flex;
			flex-direction: column;
			width: 440rpx;
			height: 436rpx;
			border-radius: 12rpx;


			.vip-box-head {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 120rpx;
				background: url(../../static/image/pop-bg.png) no-repeat;
				background-size: contain;
				color: #F5D045;
				font-size: 32rpx;
				font-weight: 500;
			}


			.vip-box-content {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				flex: 1;
				padding: 0 44rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 0 0 12rpx 12rpx;

				.content-vip-title {
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 40rpx;
					color: $uni-text-color;
				}

				.content-vip-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 260rpx;
					height: 72rpx;
					background: #F5D045;
					border-radius: 32rpx;
					font-size: 28rpx;
					color: $uni-text-color;
				}
			}

		}
	}
</style>
