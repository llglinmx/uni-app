<template>
	<view class="learning-box" :style="{paddingTop:paddingTop +'px'}">
		<view class="learning-box-head">
			<nav-bar @back="goBack" title="学习计划"></nav-bar>
		</view>
		<view class="learning-box-content">
			<view class="learning-box-content-calendar">
				<!-- <wCalendar :lunar="false" :disabledBefore="false" :disabledAfter="true" @confirm="getResult">
				</wCalendar> -->
				<ren-calendar ref='ren' :markDays='markDays' :headerBar='true' @onDayClick='onDayClick'></ren-calendar>
				<!-- <view class="change">选中日期：{{curDate}}</view> -->
				<view class="msg-list-box">
					<view class="msg-list-box-li" v-for="(item,index) in colorList" :key = "index">
						<view class="msg-list-ico" :style="{'background':item.color}"></view>
						<view class="msg-list-text">{{item.text}}</view>
					</view>
					
				</view>
			</view>
			<view class="learning-box-content-wrap">
				<view class="learning-content-wrap-top">
					<view class="learning-content-top-number">
						{{dateArr[2]}}
					</view>
					<view class="learning-content-top-info">
						<view class="learning-top-info-week">
							{{week}}
						</view>
						<view class="learning-top-info-year">
							{{dateArr[0]}}-{{dateArr[1]}}
						</view>
					</view>
				</view>
				<view class="learning-content-wrap-list" v-if="isTask">
					<view class="learning-list-li" :class="{'learning-list-item':isFinish}">
						<view class="learning-li-img" :class="{'learning-li-bg':isFinish}">
							<image src="../../static/image/book-ico1.png" mode=""></image>
						</view>
						<view class="learning-li-title">
							今日学习单词
							<text>20</text>
							个
						</view>
						<view class="learning-li-state">
							{{isFinish?'已完成':'未完成'}}
						</view>
					</view>
					<view class="learning-list-li" :class="{'learning-list-item':isReview}">
						<view class="learning-li-img" :class="{'learning-li-bg':isReview}">
							<image src="../../static/image/book-ico2.png" mode="aspectFill"></image>
						</view>
						<view class="learning-li-title">
							今日复习单词
							<text>20</text>
							个
						</view>
						<view class="learning-li-state">
							{{isReview?'已完成':'未完成'}}
						</view>
					</view>
				</view>
				<view class="learning-wrap-no-task" v-else>
					<image src="../../static/image/no-task-img.png" mode=""></image>
					<text>当前没有学习任务</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/nav-bar/nav-bar'
	import wCalendar from "@/components/w-calendar/w-calendar.vue"
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	export default {
		data() {
			return {
				paddingTop: 0,
				isTask: true, //是否有学习任务
				isFinish: false, //是否学习完成
				isReview: true, //是否复习完成
				curDate: '',
				markDays: [],
				week:'',
				dateArr:[],
				taskTime:[
					{day:23,isState:1},
					{day:24,isState:2},
					{day:25,isState:3},
					{day:26,isState:0},
					{day:27,isState:2},
					{day:28,isState:0},
				],
				colorList:[
					{color:"#E5F2FF",text:"当日已完成"},
					{color:"#FFE5E5",text:"当日未完成"},
					{color:"#F2F2F7",text:"等待完成"},
					{color:"#4d7df9",text:"选择日期"},
				],
			}
		},
		components: {
			navBar,
			wCalendar,
			RenCalendar
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.paddingTop = res.statusBarHeight
				}
			});
		},
		onReady() {
			this.week = this.$refs.ren.getToday().week // 获取星期

			let today = this.$refs.ren.getToday().date;
			this.dateArr = today.split("-")
			console.log(this.dateArr)
			this.curDate = today;
			this.markDays.push(today);
			
			console.log(this.markDays)
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack({})
			},

			onDayClick(data) {
				console.log(data)
				this.curDate = data.date;
			},

			getResult(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.learning-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;

		.learning-box-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 48rpx;
			box-sizing: border-box;

			.learning-box-content-calendar {
				width: 100%;
				// height: 660rpx;
				margin: 40rpx 0 100rpx;
				padding: 40rpx;
				box-sizing: border-box;
				box-shadow: 0 0 10rpx 0 #e4e4e4;
				border-radius: 12rpx;
				.msg-list-box{
					display: flex;
					align-items: center;
					justify-content: center;
					.msg-list-box-li:first-child{
						margin-left: 0;
					}
					.msg-list-box-li{
						display: flex;
						align-items: center;
						margin-left: 20rpx;
						.msg-list-ico{
							width: 20rpx;
							height: 20rpx;
							border-radius: 50%;
						}
						.msg-list-text{
							margin-left: 10rpx;
							font-size: 20rpx;
							color: #747499;
						}
					}
				}
			}

			.learning-box-content-wrap {
				display: flex;
				flex-direction: column;
				flex: 1;

				.learning-content-wrap-top {
					display: flex;
					align-items: center;

					.learning-content-top-number {
						font-size: 72rpx;
						font-weight: 700;
						color: $uni-text-color;
					}

					.learning-content-top-info {
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						font-weight: 600;

						.learning-top-info-week {
							font-size: 24rpx;
						}

						.learning-top-info-year {
							font-size: 28rpx;
						}
					}
				}

				.learning-content-wrap-list {
					flex: 1;

					.learning-list-item {
						color: #2626FF !important;
						background: #E5F2FF !important;
					}

					.learning-list-li {
						display: flex;
						align-items: center;
						height: 120rpx;
						background: #F2F2F7;
						border-radius: 12rpx;
						margin-top: 40rpx;
						padding-right: 40rpx;
						box-sizing: border-box;
						color: $uni-text-color;

						.learning-li-bg {
							background: #2626FF !important;
						}

						.learning-li-img {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 120rpx;
							height: 120rpx;
							border-radius: 12rpx;
							background: #E1E1E6;

							image {
								width: 36rpx;
								height: 44rpx;
							}
						}

						.learning-li-title {
							flex: 1;
							margin-left: 34rpx;
							font-size: 28rpx;

							font-weight: 500;

							text {
								font-size: 48rpx;
								font-weight: 600;
								line-height: 40rpx;
								margin: 0 10rpx;
							}
						}

						.learning-li-state {
							font-size: 28rpx;
							font-weight: 500;
						}
					}

					.learning-list-li:last-child {
						margin-bottom: 40rpx;
					}
				}

				.learning-wrap-no-task {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					image {
						width: 168rpx;
						height: 148rpx;
						transform: translateY(-30rpx);
					}

					text {
						font-size: 22rpx;
						color: #B3B3B3;
					}
				}
			}
		}

	}
</style>
