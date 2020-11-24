<template>
	<view class="integral-box" :style="{paddingTop:paddingTop +'px'}">
		<view class="integral-box-head">
			<nav-bar @back="goBack" title="我的积分"></nav-bar>
		</view>
		<view class="integral-box-content">
			<view class="content-number-wrap">
				<view class="number-text">当前积分</view>
				<view class="integer-number">{{integralNumber}}</view>
			</view>
			<view class="integral-msg">
				<text class="toast">兑换服务</text>
			</view>
			<view class="card-list">
				<view class="card-list-li" v-for="(item,index) in integralData">
					<view class="card-li-info">
						<view class="card-info-top">
							<view class="vip-text">VIP</view>
							<view class="vip-day">{{item.day}}</view>
							<view class="vip-txt">天</view>
						</view>
						<view class="card-info-bottom">消耗{{item.integralNumber}}积分</view>
					</view>
					<view class="card-li-btn" @click="exchange(item.id,item.day)">立即兑换</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="integral-pop-box">
				<view class="pop-box-head">
					<view class="pop-head-left">
						<view class="pop-left-vip">VIP</view>
						<view class="pop-left-text">体验卡</view>
					</view>
					<view class="pop-head-right">
						<view class="pop-right-num">{{integralday}}</view>
						<view class="pop-right-day">天</view>
					</view>
				</view>
				<view class="pop-box-contern">
					<view class="content-pop-title">是否确定兑换会员？</view>
					<view class="content-pop-btn" @click="confirmExchange">确定兑换</view>
					<view class="content-pop-text" @click="closePopCard">再看看</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="cardIntegral" type="center" :maskClick="false">
			<view class="integral-pop-box">
				<view class="pop-box-head" :class="{'popup-vip-bg':!isState}">
					<view class="pop-head-left">
						<view class="pop-left-vip">VIP</view>
						<view class="pop-left-text">体验卡</view>
					</view>
					<view class="pop-head-right">
						<view class="pop-right-num">{{integralday}}</view>
						<view class="pop-right-day">天</view>
					</view>
				</view>
				<view class="pop-box-contern">
					<view class="content-pop-title">{{isState?'恭喜你兑换成功！':'积分不足，兑换失败！'}}</view>
					<view class="content-pop-btn" :class="{'popup-vip-btn-bg':!isState}" @click="cardClose">关闭</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar/nav-bar'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		data() {
			return {
				paddingTop: 0,
				integralNumber:0,//积分数量
				integralId:'',//积分id
				isState: true, // 积分兑换是否成功
				integralday: 0, // 积分天数
				integralData: []
			}
		},
		components: {
			uniPopup,
			navBar,
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.paddingTop = res.statusBarHeight
				}
			});
			this.getIntegralData()
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({})
			},


			// 积分兑换
			exchange(id,day) {
				this.$refs.popup.open()
				this.integralId = id
				this.integralday = day
			},
			//确认兑换按钮
			confirmExchange() {
				this.$refs.popup.close()
				let vueData={
					userId:uni.getStorageSync("userId"),
					IntegralId:this.integralId
				}
			
				this.apipost('/integral/exchangeVip', vueData).then(res => {
					if(res.code==10000){
						this.$refs.cardIntegral.open()
						this.getIntegralData();
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				});
			},
			// 关闭按钮
			cardClose() {
				this.$refs.cardIntegral.close()
			},

			// 关闭弹出层
			closePopCard() {
				this.$refs.popup.close()
			},

// 获取积分信息
			getIntegralData() {
				let vueData={
					userId:uni.getStorageSync("userId")
				}
				this.apiget('/integral/getExchangeList', vueData).then(res => {
					console.log(res)
					if(res.code==10000){
						this.integralNumber = res.data.integeral
						this.integralData = res.data.data
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.integral-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;

		.integral-box-head {}

		.integral-box-content {
			flex: 1;
			padding: 0 48rpx;
			box-sizing: border-box;
			border-top: 1rpx solid #EBEBEB;

			.content-number-wrap {
				display: flex;
				align-items: center;
				flex-direction: column;
				padding: 60rpx 0;
				box-sizing: border-box;

				.number-text {
					font-size: 24rpx;
				}

				.integer-number {
					font-size: 92rpx;
					font-weight: 600;
					color: $uni-text-color;
				}
			}

			.integral-msg {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;

				.toast {
					position: relative;
				}

				.toast::before,
				.toast::after {
					content: '';
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 10rpx;
					height: 10rpx;
					background: $uni-text-color;
					border-radius: 50%;
				}

				.toast::before {
					left: -20rpx;
				}

				.toast::after {
					right: -20rpx;
				}
			}

			.card-list {
				.card-list-li {
					width: 100%;
					height: 160rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 44rpx;
					margin-top: 60rpx;
					box-sizing: border-box;
					background: url(../../static/image/card-bg2.png) no-repeat;
					background-size: contain;

					.card-li-info {
						display: flex;
						flex-direction: column;
						color: #F5D045;

						.card-info-top {
							display: flex;
							align-items: baseline;

							.vip-text {
								font-size: 40rpx;
								font-style: italic;
							}

							.vip-day {
								margin: 0 15rpx;
								font-size: 64rpx;
								font-style: italic;
								line-height: 40rpx;
							}

							.vip-txt {
								font-size: 24rpx;
							}
						}

						.card-info-bottom {
							font-size: 26rpx;
						}
					}

					.card-li-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 150rpx;
						height: 62rpx;
						border: 1rpx solid #F5D045;
						border-radius: 32rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #F5D045;
					}
				}
			}
		}

		.integral-pop-box {
			display: flex;
			flex-direction: column;
			width: 440rpx;
			height: 436rpx;

			.pop-box-head {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				width: 100%;
				height: 120rpx;
				display: flex;
				padding: 0 44rpx;
				box-sizing: border-box;
				background: url(../../static/image/pop-bg.png) no-repeat;
				background-size: cover;
				color: #F5D045;

				.pop-head-left {
					display: flex;
					align-items: baseline;
					font-weight: 500;

					.pop-left-vip {
						font-size: 40rpx;
						font-style: italic;
					}

					.pop-left-text {
						margin-left: 24rpx;
						font-size: 24rpx;
					}
				}

				.pop-head-right {
					display: flex;
					align-items: baseline;

					.pop-right-num {
						font-weight: 500;
						font-size: 80rpx;
						font-style: italic;
						line-height: 100rpx;
					}

					.pop-right-day {
						margin-left: 24rpx;
					}
				}
			}

			.popup-vip-bg {
				background: url(../../static/image/pop-bg1.png) no-repeat;
				background-size: cover;
				color: #fff;
			}

			.pop-box-contern {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-evenly;
				flex: 1;
				background: #fff;
				border-radius: 0 0 12rpx 12rpx;
				font-size: 28rpx;
				color: $uni-text-color;

				.content-pop-title {}

				.content-pop-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 260rpx;
					height: 72rpx;
					background: #F5D045;
					border-radius: 36rpx;
				}

				.popup-vip-btn-bg {
					background: #909099;
					color: #fff;
				}

				.content-pop-text {

					color: #909099;
				}
			}
		}
	}
</style>
