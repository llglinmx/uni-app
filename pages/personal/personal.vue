<template>
	<view class="personal-box" :style="{paddingTop:paddingTop +'px'}">
		<view class="personal-box-head">
			<nav-bar @back="goBack"></nav-bar>
		</view>
		<view class="personal-box-content">
			<view class="content-card" :class="{'vip': isVip}">
				<view class="card-info">
					<view class="card-info-top">
						<view class="card-top-title">VIP</view>
						<view class="card-top-text" v-if="!isVip">未激活</view>
						<view class="card-top-text" v-if="isVip">{{userInfo.vipExpireTime}}</view>
						<view class="card-top-text" v-if="isVip" style="margin-left: 10rpx;">过期</view>
					</view>
					<view class="card-info-bottom">实时录音进行测评</view>
				</view>
				<view class="card-btn" v-if="!isVip" @click="vipBtn(false)">立即开通</view>
				<view class="card-btn-vip" v-else>
					<text @click="vipBtn(true)" v-if="!isforever">立即续费</text>
					<text @click="vipBtn('forever')" v-else>查看特权</text>
				</view>
			</view>
			<view class="content-list">
				<view class="list-box-li" @click="menu('integral')">
					<view class="list-li-left">
						<image src="../../static/image/integral-ico.png" mode="widthFix" style="width: 30rpx;height: 32rpx;"></image>
						<text>我的积分</text>
					</view>
					<view class="list-li-right">
						<text style="font-size: 28rpx;">{{userInfo.userIntegral}}</text>
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="list-box-li" @click="menu('calendar')">
					<view class="list-li-left">
						<image src="../../static/image/calendar-ico.png" mode="widthFix" style="width: 32rpx;height: 32rpx;"></image>
						<text>我的计划</text>
					</view>
					<view class="list-li-right">
						<text>高考高频词汇</text>
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="content-list">
				<view class="list-box-li" @click="menu('set')">
					<view class="list-li-left">
						<image src="../../static/image/set-ico.png" mode="widthFix" style="width: 30rpx;height: 32rpx;"></image>
						<text>设置</text>
					</view>
					<view class="list-li-right">
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="list-box-li" @click="menu('help')">
					<view class="list-li-left">
						<image src="../../static/image/help-ico.png" mode="widthFix" style="width: 32rpx;height: 32rpx;"></image>
						<text>帮助</text>
					</view>
					<view class="list-li-right">
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="list-box-li" @click="menu('feedback')">
					<view class="list-li-left">
						<image src="../../static/image/feedback-ico.png" mode="widthFix" style="width: 30rpx;height: 32rpx;"></image>
						<text>意见反馈</text>
					</view>
					<view class="list-li-right">
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="list-box-li" @click="menu('about')">
					<view class="list-li-left">
						<image src="../../static/image/about-ico.png" mode="widthFix" style="width: 32rpx;height: 32rpx;"></image>
						<text>关于</text>
					</view>
					<view class="list-li-right">
						<image src="../../static/image/more.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="list-box-li" @click="menu('out')">
					<view class="list-li-left">
						<image src="../../static/image/out-ico.png" mode="widthFix" style="width: 32rpx;height: 32rpx;"></image>
						<text>退出</text>
					</view>
					<view class="list-li-right"></view>
				</view>
			</view>
		</view>
		<uni-popup ref="out" type="dialog">
			<uni-popup-dialog type="error" content="你确定要退出当前账号吗?" message="警告" :duration="2000" :before-close="true" @close="outClose"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup-vip-box">
				<view class="vip-box-head" :class="{'popup-vip-bg':isState}">{{isState?'交易成功':'交易失败'}}</view>
				<view class="vip-box-content">
					<view class="content-vip-title">{{isState?'恭喜你，已获得 会员特权':'开通失败，请稍后重试！'}}</view>
					<view class="content-vip-btn" :class="{'popup-vip-btn-bg':isState}" @click="closeVipCard">关闭</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="privilege" type="center" :maskClick="false">
			<vip-card btnName1="半年会员/198元" btnName2="一年会员/298元" @clickOne='openForever' @clickTwo='openYear' @close="privilegeClose"></vip-card>
		</uni-popup>
		<uni-popup ref="forever" type="center" :maskClick="false">
			<vip-card btnName1="我知道了" :isforever="isforever" @clickOne="foreverClose" @close="foreverClose"></vip-card>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar/nav-bar'
	import vipCard from '@/components/vip-card/vip-card.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	export default {
		data() {
			return {
				paddingTop: 0,
				isVip: false, //是否会员
				isState: true, // 会员开通成功/失败
				isforever: false, //是否永久会员
				userInfo: {}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.paddingTop = res.statusBarHeight
				}
			});
		},
		onShow() {
			this.getUserInfo()
		},
		components: {
			uniPopup,
			uniPopupDialog,
			navBar,
			vipCard
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({})
			},

			// 开通会员与续费按钮 查看特权
			vipBtn(bool) {
				switch (bool) {
					case true: //立即续费
						console.log(true)
						this.$refs.privilege.open()
						break;
					case false: //立即开通
						this.$refs.privilege.open()
						break;
					case "forever":
						this.$refs.forever.open()
						break;
				}
			},
			// 关闭开通会员成功失败的弹窗
			closeVipCard() {
				this.$refs.popup.close()
			},

			// 开启半年会员按钮
			openForever(id) {
				let vueDate = {
					id: id,
					userId: uni.getStorageSync("userId")
				}
				this.apiget('/order/createOrder', vueDate).then(res => {
					console.log(res)
					if (res.code == 10000) {
						this.getUserInfo()
						this.$refs.privilege.close()
						this.$refs.popup.open()
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});

			},
			// 开启一年会员按钮
			openYear(id) {
				let vueDate = {
					id: id,
					userId: uni.getStorageSync("userId")
				}
				this.apiget('/order/createOrder', vueDate).then(res => {
					console.log(res)
					if (res.code == 10000) {
						this.getUserInfo()
						this.$refs.privilege.close()
						this.$refs.popup.open()
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});
			},

			// 永久会员弹出层开启
			privilegeClose() {
				this.$refs.privilege.close()
			},
			// 永久会员弹层须知关闭
			foreverClose() {
				this.$refs.forever.close()
			},


			// 菜单点击
			menu(type) {
				switch (type) {
					case "integral": // 我的积分
						uni.navigateTo({
							url: "../myIntegral/myIntegral"
						})
						break;
					case "calendar": //我的计划
						uni.navigateTo({
							url: "../myPlan/myPlan"
						})
						break;
					case "set": //设置
						uni.navigateTo({
							url: "../set/set"
						})
						break;
					case "help": // 帮助
						uni.navigateTo({
							url: "../help/help"
						})
						break;
					case "feedback": //意见反馈
						uni.navigateTo({
							url: "../feedback/feedback"
						})
						break;
					case "about": // 关于
						uni.navigateTo({
							url: "../about/about"
						})
						break;
					case "out": // 退出
						this.$refs.out.open()
						break;
				}

			},
			// 退出弹窗确定按钮
			confirm() {
				uni.showToast({
					title: "退出成功",
					icon: "none"
				})
				this.$refs.out.close()
				setTimeout(() => {
					uni.redirectTo({
						url: "../login/login"
					})
				}, 500)
			},
			// 退出弹窗取消按钮
			outClose() {
				this.$refs.out.close()
			},



			// 获取用户信息
			getUserInfo() {
				let vueData = {
					userId: uni.getStorageSync("userId")
				}
				this.apiget('/user/userInfo', vueData).then(res => {
					if (res.code == 10000) {
						this.userInfo = res.data
						this.isVip = res.data.isVip
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});
			}


		}
	}
</script>

<style scoped lang="scss">
	.personal-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		background: linear-gradient(#fff, #f5f5fa);

		.personal-box-head {}

		.personal-box-content {
			flex: 1;
			overflow-y: scroll;
			padding: 0 48rpx;
			box-sizing: border-box;

			.content-card {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 160rpx;
				padding: 0 44rpx;
				box-sizing: border-box;
				margin-top: 56rpx;
				border-radius: 12rpx;
				background: url(../../static/image/card-bg1.png) no-repeat;
				background-size: cover;
				color: #fff;

				.card-info {

					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.card-info-top {
						display: flex;
						align-items: baseline;

						.card-top-title {
							font-size: 40rpx;
							font-weight: 500;
							font-style: italic;
						}

						.card-top-text {
							margin-left: 16rpx;
							font-size: 24rpx;
						}
					}

					.card-info-bottom {
						display: flex;
						align-items: baseline;
						font-size: 26rpx;

						text {
							margin-left: 10rpx;
							font-size: 22rpx;
							text-decoration: underline
						}
					}
				}

				.card-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 152rpx;
					height: 64rpx;
					font-size: 24rpx;
					border-radius: 32rpx;
					color: $uni-text-color;
					background: linear-gradient(#F7F7FC, #CFCFE6)
				}

				.card-btn-vip {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 150rpx;
					height: 62rpx;
					border: 1rpx solid #F5D045;
					color: #F5D045;
					font-size: 24rpx;
					border-radius: 32rpx;
				}
			}

			.vip {
				color: #F5D045;
				background: url(../../static/image/card-bg2.png) no-repeat;
				background-size: contain;
			}

			.content-list {
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 12rpx;

				.list-box-li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 120rpx;
					width: 100%;
					border-bottom: 1rpx solid #f7f7f7;

					.list-li-left {
						display: flex;
						align-items: center;
						height: 100%;
						flex: 2;

						image {}

						text {
							margin-left: 24rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: $uni-text-color;
						}
					}

					.list-li-right {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						height: 100%;
						flex: 1;

						text {
							margin-right: 10rpx;
							color: #939399;
							font-size: 22rpx;
						}

						image {
							width: 10rpx;
							height: 18rpx;
						}


					}
				}

				.list-box-li:last-child {
					border-bottom: 0;
				}

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
				background: url(../../static/image/pop-bg1.png) no-repeat;
				background-size: contain;
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
			}

			.popup-vip-bg {
				background: url(../../static/image/pop-bg.png) no-repeat;
				background-size: contain;
				color: #F5D045;
			}

			.vip-box-content {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				flex: 1;
				background: #fff;
				border-radius: 0 0 12rpx 12rpx;

				.content-vip-title {
					font-size: 28rpx;
					margin-bottom: 60rpx;
					color: $uni-text-color;
				}

				.content-vip-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 180rpx;
					height: 72rpx;
					background: #909099;
					border-radius: 32rpx;
					font-size: 28rpx;
					color: #fff;
				}

				.popup-vip-btn-bg {
					background: $uni-text-color;
				}
			}

		}


	}
</style>
