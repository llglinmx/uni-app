<template>
	<view class="home-box" :style="{paddingTop:paddingTop +'px'}">
		<view class="home-head">
			<view class="home-head-ico home-head-comm" @click="headClick('calendar')">
				<image src="../../static/image/calendar-ico.png" mode="widthFix"></image>
			</view>
			<view class="home-head-user home-head-comm" @click="headClick('user')">
				<image src="../../static/image/user-ico.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="home-content" v-show="isState">
			<view class="home-content-title">高考高频词汇</view>
			<view class="home-content-wrap">
				<view class="content-text">
					<view class="text-msg">今日单词</view>
					<view class="text-number">
						<text class="font-max">30</text>
						<text class="font-min">/80</text>
					</view>
				</view>
				<view class="content-text">
					<view class="text-msg">剩余任务</view>
					<view class="text-number">
						<text class="font-max">80</text>
						<text class="font-min">/120</text>
					</view>
				</view>
			</view>
			<view class="progress">
				<view class="progress-text">
					已学习单词
					<text style="margin-left: 10rpx;">{{learnNum}}</text>
					/
					<text>{{totalNum}}</text>
				</view>
				<view class="progress-bar" id="progress-bar">
					<view class="bar-active" :style="{width:widthStyle+'rpx'}"></view>
				</view>
			</view>
		</view>
		<view class="home-content" v-show="!isState">
			<view class="no-task">
				<image src="../../static/image/no-task-img.png" mode="widthFix" class="no-task-img"></image>
				<text class="no-task-title">当前没有学习任务</text>
			</view>
		</view>
		<view class="home-footer">
			<view class="home-btn" v-if="!isState" @click="taskBtn('plan')">制定学习计划</view>
			<view class="home-btn" v-if="isState" @click="taskBtn('study')">学习今日单词</view>
			<view class="home-btn" v-if="isState" @click="taskBtn('review')">复习</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paddingTop: 0,
				widthStyle: 0,
				isState: false, // 用于判断是否已经制定了学习计划
				totalNum: 2000, // 单词总数量
				learnNum: 1500, //已学习数量
			}
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.paddingTop = res.statusBarHeight
				}
			});

			//判断是否已经制定了学习计划
			if (!options.isTask == false) {
				this.isState = true
			}

			
			

			// plus.sqlite.openDatabase(data);


			//关闭数据库
			// plus.sqlite.closeDatabase({
			// 	name: 'worddata',
			// 	success: function(e) {
			// 		console.log('数据库关闭成功')
			// 	},
			// 	fail: function(e) {
			// 		console.log('数据库关闭失败')
			// 	}
			// })
			
		},
		onReady() { //页面初次渲染完毕执行
			this.getDescBox()
		},
		methods: {
			// 顶部按钮点击
			headClick(type) {
				switch (type) {
					case 'calendar': // 日历点击
						uni.navigateTo({
							url: "../learningPlan/learningPlan"
						})
						break;
					case 'user': // 个人中心
						uni.navigateTo({
							url: "../personal/personal"
						})
						break;
				}
			},

			// 计算进度条
			getDescBox() {
				uni.createSelectorQuery().in(this).select("#progress-bar").boundingClientRect(result => {
					var w = result.width / this.totalNum * this.learnNum // 总宽度 / 总数量 * 已完成数量
					this.widthStyle = w * 2 // 这里 *2  是因为使用rpx 2倍计算
				}).exec()
			},

			// 点击按钮
			taskBtn(type) {
				switch (type) {
					case "plan": // 制定学习计划
						uni.redirectTo({
							url: "../setTasks/setTasks"
						})
						break;
					case "study": // 学习今日单词
						uni.navigateTo({
							// url:"../mainHome/mainHome?isState=true"
							url: "../mainHome/mainHome?isState=0"
						})
						break;
					case "review": // 复习
						uni.navigateTo({
							// url:"../mainHome/mainHome?isState=false"
							url: "../mainHome/mainHome?isState=1"
						})
						break;
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.home-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;

		.home-head {
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			box-sizing: border-box;
			width: 100%;
			height: 88rpx;

			.home-head-comm {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 88rpx;
				height: 88rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.home-head-ico {}

			.home-head-user {}
		}

		.home-content {
			flex: 1;
			padding: 0 48rpx;
			box-sizing: border-box;

			.home-content-title {
				padding: 104rpx 0 120rpx;
				font-size: 44rpx;
				font-weight: bold;
				color: #1D1D26;
			}

			.home-content-wrap {
				display: flex;
				color: #1D1D26;

				.content-text {
					flex: 1;
					display: flex;
					flex-direction: column;

					.text-msg {
						font-size: 28rpx;
						font-weight: 500;
					}

					.text-number {
						margin-top: 20rpx;

						.font-max {
							font-size: 88rpx;
							font-weight: 600;
						}

						.font-min {
							font-size: 44rpx;
							font-weight: 600;
						}
					}
				}
			}

			.progress {
				margin-top: 160rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #4E4E66;

				.progress-text {}

				.progress-bar {
					position: relative;
					width: 100%;
					height: 12rpx;
					margin-top: 22rpx;
					background: #E5F4FF;
					border-radius: 6rpx;

					.bar-active {
						position: absolute;
						top: 0;
						left: 0;
						width: 200rpx;
						height: 100%;
						background: #2626FF;
						border-radius: 6rpx;
					}
				}
			}

			.no-task {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 100%;

				.no-task-img {
					width: 280rpx;
					height: 248rpx;
					transform: translateY(-40rpx);
				}

				.no-task-title {
					font-size: 26rpx;
					font-weight: 500;
					color: #676767;
				}
			}

		}

		.home-footer {
			padding: 0 48rpx 96rpx;
			box-sizing: border-box;

			.home-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 96rpx;
				margin-bottom: 40rpx;
				border-radius: 12rpx;
				font-size: 32rpx;
			}

			.home-btn:nth-child(1) {
				background: #2626FF;
				color: #fff;
			}

			.home-btn:nth-child(2) {
				background: #E5F2FF;
				color: #2626FF;
			}
		}
	}
</style>
