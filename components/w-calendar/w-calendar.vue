<template>
	<view class="w-calendar">
		<view class="w-calendar-header">
			<view class="prev" @tap="prev"></view>
			<view class="current"><text>{{month}}</text>月</view>
			<view class="next" @tap="next"></view>
			<view class="back" @tap="back">返回今日</view>
		</view>
		<swiper :duration="400" :circular="true" @change="swiperChange" :current="swiperIndex" style="height: 100%;">
			<swiper-item v-for="(month,mIndex) in dataList" :key="mIndex" style="height: 100%;">
				<view class="w-calendar-item">
					<view class="w-calendar-week">
						<view class="w-week-item" v-for="(week,wIndex) in weeks" :key="wIndex">{{week}}</view>
					</view>
					<view class="w-calendar-day">
						<view class="w-day-item" :class="[
								{'disabled':item.type=='before'||item.type=='after'},
								{'active':item.active},
								{'disabled-before':disabledBefore&&item.disabledBefore},
								{'disabled-after':disabledAfter&&item.disabledAfter}]"
						 v-for="(item,dIndex) in month.data" :key="dIndex" @tap="checkItem(item)">
							<view class="box">
								<text>{{item.day}}</text>
								<text v-if="lunar">{{item.lunar.IDayCn}}</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import CALENDAR from './calendar.js'
	let _this = null;
	export default {
		props: {
			lunar: {
				type: Boolean,
				default: false
			},
			disabledBefore: {
				type: Boolean,
				default: false
			},
			disabledAfter: {
				type: Boolean,
				default: false
			},
			theme: {
				type: String,
				default: "#f00"
			}
		},
		data() {
			return {
				swiperIndex: 0,
				last: 0,
				weeks: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
				year: "",
				month: "",
				swiperLen: 3,
				dataList: [],
				rusult: {},
				today: new Date(),
				visible: false,
				isClick: false
			};
		},
		created() {
			_this = this;
			_this.init();
		},
		methods: {
			show() {
				_this.visible = true;
			},
			hide() {
				_this.visible = false;
			},
			returnRusult(item) {
				let result = {};
				_this.dataList = _this.dataList.map((v, k) => {
					v.data = v.data.map((i, j) => {
						i.active = false;
						return i;
					});
					return v;
				});
				item.active = true;
				result = {
					fullDate: item.year + "-" + item.month + "-" + item.day,
					iosDate: item.year + "/" + item.month + "/" + item.day,
					format: item.year + "年" + item.month + "月" + item.day + "日",
					week: item.lunar.ncWeek,
				};
				if (_this.lunar) {
					result.lunar = item.lunar
				};
				_this.$emit("confirm", result);
				_this.hide();
			},
			back() {
				_this.today = new Date();
				_this.init();
			},
			checkItem(item) {
				if (this.disabledBefore && !this.disabledAfter) {
					if (!item.disabledBefore) {
						this.returnRusult(item)
					}
					return;
				}
				if (this.disabledAfter && !this.disabledBefore) {
					if (!item.disabledAfter) {
						this.returnRusult(item)
					}
					return;
				}
				if (this.disabledAfter && this.disabledBefore) {
					if (!item.disabledAfter && !item.disabledBefore) {
						this.returnRusult(item)
					}
					return;
				}
				this.returnRusult(item);
			},
			formatNum(n) {
				return n < 10 ? '0' + n : n;
			},
			prev() {
				if (_this.swiperIndex > 0) {
					_this.swiperIndex--;
				} else {
					_this.swiperIndex = _this.swiperLen - 1;
				}
				_this.isClick = true;
				setTimeout(() => {
					_this.isClick = false;
				}, 300)
				this.init("prev");
			},
			next() {
				if (this.swiperIndex < this.swiperLen - 1) {
					this.swiperIndex++;
				} else {
					this.swiperIndex = 0;
				};
				_this.isClick = true;
				setTimeout(() => {
					_this.isClick = false;
				}, 300)
				this.init("next");
			},
			swiperChange(e) {
				if (!_this.isClick) {
					let index = e.target.current;
					let isPrev = (index - this.last == 1 || index - this.last == -2) ? true : false;
					this.swiperIndex = index;
					if (isPrev) {
						this.init("next");
					} else {
						this.init("prev");
					}
					this.last = index;
				}
			},
			init(str) {
				let aDate = this.today;
				let bDate = "";
				let week = this.today.getDay();
				let year = "",
					month = "";
				let max = 42;
				let lastDays = 0,
					lastWeek = 0,
					lastDate = "";
				let curYear = aDate.getFullYear(),
					curMonth = aDate.getMonth(),
					curDays = 0,
					curData = [],
					curDate = "",
					curWeek = 0;
				let nextYear = 0,
					nextMonth = 0,
					nextDays = 0,
					nextData = [],
					nextDate = "",
					nextWeek = 0;
				let afterYear = 0,
					afterMonth = 0,
					afterDays = 0,
					afterData = [],
					afterDate = "",
					afterWeek = 0;
				let afterDate1 = "";
				let dDate = new Date();
				switch (str) {
					case "prev":
						aDate.setMonth(curMonth - 1);
						break;
					case "next":
						aDate.setMonth(curMonth + 1);
						break;
				}
				year = aDate.getFullYear();
				month = aDate.getMonth();
				lastDate = new Date(year, month - 1, 0);
				lastDays = lastDate.getDate();
				lastWeek = lastDate.getDay();

				curDate = new Date(year, month, 0);
				curDays = curDate.getDate();
				curWeek = curDate.getDay();

				nextDate = new Date(year, month + 1, 0);
				nextDays = nextDate.getDate();
				nextWeek = nextDate.getDay();

				afterDate = new Date(year, month + 2, 0);
				afterDays = afterDate.getDate();
				afterWeek = afterDate.getDay();

				afterDate1 = new Date(year, month + 3, 0);

				let lStart = lastWeek;
				let lEnd = 42 - lStart - curDays;
				let cStart = curWeek;
				let cEnd = 42 - cStart - nextDays;
				let nStart = nextWeek;
				let nEnd = 42 - nStart - afterDays;
				for (let i = lastDays - lStart + 1; i <= lastDays; i++) {
					curData.push({
						year: lastDate.getFullYear(),
						month: this.formatNum(lastDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "before",
						lunar: CALENDAR.solar2lunar(lastDate.getFullYear(), lastDate.getMonth() + 1, i)
					});
				}
				for (let i = 1; i <= curDays; i++) {
					curData.push({
						year: curDate.getFullYear(),
						month: this.formatNum(curDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "current",
						lunar: CALENDAR.solar2lunar(curDate.getFullYear(), curDate.getMonth() + 1, i)
					})
				};
				for (let i = 1; i <= lEnd; i++) {
					curData.push({
						year: nextDate.getFullYear(),
						month: this.formatNum(nextDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "after",
						lunar: CALENDAR.solar2lunar(nextDate.getFullYear(), nextDate.getMonth() + 1, i)
					});
				}

				for (let i = curDays - cStart + 1; i <= curDays; i++) {
					nextData.push({
						year: curDate.getFullYear(),
						month: this.formatNum(curDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "before",
						lunar: CALENDAR.solar2lunar(curDate.getFullYear(), curDate.getMonth() + 1, i)
					});
				}
				for (let i = 1; i <= nextDays; i++) {
					nextData.push({
						year: nextDate.getFullYear(),
						month: this.formatNum(nextDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "current",
						lunar: CALENDAR.solar2lunar(nextDate.getFullYear(), nextDate.getMonth() + 1, i)
					})
				};
				for (let i = 1; i <= cEnd; i++) {
					nextData.push({
						year: afterDate.getFullYear(),
						month: this.formatNum(afterDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "after",
						lunar: CALENDAR.solar2lunar(afterDate.getFullYear(), afterDate.getMonth() + 1, i)
					});
				}

				for (let i = nextDays - nStart + 1; i <= nextDays; i++) {
					afterData.push({
						year: nextDate.getFullYear(),
						month: this.formatNum(nextDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "before",
						lunar: CALENDAR.solar2lunar(nextDate.getFullYear(), nextDate.getMonth() + 1, i)
					});
				}
				for (let i = 1; i <= afterDays; i++) {
					afterData.push({
						year: afterDate.getFullYear(),
						month: this.formatNum(afterDate.getMonth() + 1),
						day: this.formatNum(i),
						type: "current",
						lunar: CALENDAR.solar2lunar(afterDate.getFullYear(), afterDate.getMonth() + 1, i)
					})
				};
				for (let i = 1; i <= nEnd; i++) {
					afterData.push({
						year: afterDate1.getFullYear(),
						month: this.formatNum(afterDate1.getMonth() + 1),
						day: this.formatNum(i),
						type: "after",
						lunar: CALENDAR.solar2lunar(afterDate1.getFullYear(), afterDate1.getMonth() + 1, i)
					});
				}
				this.year = year;
				this.month = this.formatNum(month + 1);
				switch (this.swiperIndex) {
					case 0:
						this.dataList = [{
								data: nextData,
								year: nextDate.getFullYear(),
								month: nextDate.getMonth() + 1
							},
							{
								data: curData,
								year: curDate.getFullYear(),
								month: curDate.getMonth() + 1
							},
							{
								data: afterData,
								year: afterDate.getFullYear(),
								month: afterDate.getMonth() + 1
							}
						];
						break;
					case 1:
						this.dataList = [{
								data: curData,
								year: curDate.getFullYear(),
								month: curDate.getMonth() + 1
							},
							{
								data: nextData,
								year: nextDate.getFullYear(),
								month: nextDate.getMonth() + 1
							},
							{
								data: afterData,
								year: afterDate.getFullYear(),
								month: afterDate.getMonth() + 1
							}
						];
						break;
					case 2:
						this.dataList = [{
								data: afterData,
								year: afterDate.getFullYear(),
								month: afterDate.getMonth() + 1
							},
							{
								data: curData,
								year: curDate.getFullYear(),
								month: curDate.getMonth() + 1
							},
							{
								data: nextData,
								year: nextDate.getFullYear(),
								month: nextDate.getMonth() + 1
							}
						];
						break
				}
				let date = aDate
				this.dataList.map((v, k) => {
					v.data.map((i, j) => {
						let beforeFlag = new Date(i.year, i.month - 1, i.day).getTime() - new Date(dDate.getFullYear(), dDate.getMonth(),
							dDate.getDate()).getTime() >= 0 ? false : true;
						let afterFlag = new Date(i.year, i.month - 1, i.day).getTime() - new Date(dDate.getFullYear(), dDate.getMonth(),
							dDate.getDate()).getTime() > 0 ? true : false;
						i.disabledBefore = beforeFlag;
						i.disabledAfter = afterFlag;
						if (i.year == dDate.getFullYear() && i.month == dDate.getMonth() + 1 && i.day == dDate.getDate()) {
							i.active = true;
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w-calendar {
		position: relative;
		width: 100%;
		width: 100%;
		height: 100%;
		background-color: #fff;
		transition: all 0.3s ease;
		z-index: 99999;

		.w-calendar-header {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 40rpx 40rpx 0;
			box-sizing: border-box;
			position: relative;

			.prev,
			.next {
				font-size: 30rpx;
				position: relative;
				// width: 40rpx;
				// height: 40rpx;
			}

			.prev {
				padding-left: 20px;

				&:before {
					content: "";
					border: 1px solid transparent;
					border-left: solid 1px #000;
					border-top: solid 1px #000;
					width: 20rpx;
					display: block;
					height: 20rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: rotate(-45deg) translate(0, -50%);
				}
			}

			.next {
				padding-right: 20px;

				&:after {
					content: "";
					border: 1px solid transparent;
					border-right: solid 1px #000;
					border-top: solid 1px #000;
					width: 20rpx;
					display: block;
					height: 20rpx;
					position: absolute;
					right: 0;
					top: 50%;
					transform: rotate(45deg) translate(0, -50%);
				}
			}

			.current {
				font-size: 28rpx;
				text{
					font-size: 80rpx
				}
			}

			.back {
				position: absolute;
				right: 40rpx;
				top: 40rpx;
				
				color: $uni-text-color;
				font-size: 20rpx;
				text-align: center;

			}
		}

		swiper {
			height: 802rpx;
			overflow: hidden;
		}

		.w-calendar-item {
			padding: 0 40rpx;
			box-sizing: border-box;

			.w-calendar-week {
				display: flex;

				.w-week-item {
					flex: 1;
					text-align: center;
					line-height: 68rpx;
					height: 68rpx;
					font-size: 24rpx;
					color: #747499;
				}
			}

			.w-calendar-day {
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;

				/* height: 612rpx; */
				.w-day-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: calc(100% / 7);
					margin-bottom: 10rpx;

					.box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 56rpx;
						height: 56rpx;
						border-radius: 50%;
					}

					text {
						font-size: 30rpx;
						font-weight: 500;
						color: $uni-text-color;
					}
				}

				.w-day-item.disabled {
					.box {
						color: #aaa;
					}
				}

				.w-day-item.disabled-before,
				.w-day-item.disabled-after {
					.box {
						color: #eee;
					}
				}

				.w-day-item.active {
					.box {
						height: 54rpx;
						width: 54rpx;
						border: 1rpx solid #2626FF;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
