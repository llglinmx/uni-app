<template>
	<view class="plan-box" :style="{paddingTop:paddingTop +'px'}" @click="hideInfo">
		<view class="plan-box-head">
			<nav-bar @back="goBack" title="制定学习计划"></nav-bar>
		</view>
		<view class="plan-box-content">
			<view class="content-list">
				<view class="list-plan-li">
					<view class="li-title">词库</view>
					<view class="li-text">高考高频词汇</view>
				</view>
				<view class="list-plan-li">
					<view class="li-title">单词个数</view>
					<view class="li-text">{{dataList.length}}</view>
				</view>
				<view class="list-plan-msg">
					<view class="text">每日学习单词数</view>
					<view class="list-msg-img" @click.stop="msgInfo">
						<image src="../../static/image/msg-ico.png" mode="widthFix"></image>
					</view>

					<view class="msg-content" v-if="isMsg">
						<view class="txt">
							你可以根据自己的学习需求，设置每天需要完成的新词学习数量。
						</view>
						<view class="txt">
							我们会根据你设置的新词学习数量，来分配任务数，任务进行天数由学习+复习时长来确定。
						</view>
						<view class="txt">
							预计完成日历取决于每日是否完整完成任务，若当日无法完成，则截止天数往后推移。
						</view>
						<view class="txt">
							每日任务安排可查看学习计划日历。
						</view>
					</view>
				</view>
				<view class="list-plan-li">
					<view class="li-title">每日学习单词数</view>
					<view class="li-text">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<!-- <view class="msg-number-box">

        </view> -->
				<view class="list-plan-li">
					<view class="li-title">总任务数</view>
					<view class="li-text">{{taskTotal}}</view>
				</view>

				<view class="list-plan-li">
					<view class="li-title">任务进行天数</view>
					<view class="li-text">20</view>
				</view>
				<view class="list-plan-li">
					<view class="li-title">预计完成日期</view>
					<view class="li-text">{{dataTime}}</view>
				</view>
				<view class="list-plan-li">
					<view class="li-title">学习计划日历</view>
					<view class="li-ico">
						<image src="../../static/image/calendar-ico.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="plan-box-footer">
			<nav-btn btnName='开始学习' @clickBtn="startStudy"></nav-btn>
		</view>
	</view>
</template>

<script>
	import {
		openSqlite,
		closeSQL,
		selectSQL,
		isOpen,
		createTable,
		insertData,
		deleteTable
	} from "@/static/api/sqlAjax.js"
	
	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	import navBar from '@/components/nav-bar/nav-bar'
	import navBtn from '@/components/nav-btn/nav-btn.vue'

	export default {
		data() {
			return {
				isMsg: false,
				paddingTop: 0,
				index: 0,
				array: ['10', '20', '30', '40','50','60','70','80','90','100'],
				dataList: [],
				wordTotal: 200, // 总单词量
				taskTotal: 0, // 总任务数
				dataTime: '', //任务预计完成日期
			}
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

			uni.setStorageSync('userId', 3)

			this.init();
		},
		methods: {
			 ...mapMutations(['VuexWordsList']), // 引入vuex 里的事件
			// 返回
			goBack() {
				uni.navigateBack({})
			},
			// 获取初始单词信息
			init() {
				this.closeSQL('main')
				openSqlite('main', '_www/static/sql/cet6.db').then(e => {
					console.log("main数据库打开成功")
					selectSQL('main', 'select * from words').then(data => {	
						
						this.VuexWordsList(data);
						
						this.dataList = data // 获取单词
						this.taskTotal = data.length / this.array[0]

						this.getFutureDate(this.dataList.length-1)
						this.closeSQL('main')
					}).catch(data => {
						console.log(data)
						this.closeSQL('main')
					})

				}).catch(e => {
					console.log("main数据库打开失败")
				})
			},
			
			homeData(){
				// 先删除表
				plus.sqlite.executeSql({
					name: 'words',
					sql: "DROP TABLE homeData",
					success: function(e){
						console.log("homeData表删除成功");
					},
					fail: function(e){
						console.log("homeData表删除失败");
					}
				});
				
				// wordTitle 标题  taskSum 任务总数量  taskComp 已完成任务数量 
				// todayWordsNumber 今日单词总数量  todayCompNumber 今日单词已完成数量   
				// allWordsNumber 总单词数量   compWordsNumber 已学习的单词总数量
	
				plus.sqlite.executeSql({
					name: 'words',
					sql:'CREATE TABLE homeData (id INTEGER PRIMARY KEY AUTOINCREMENT,wordTitle text NOT NULL,taskSum INT NOT NULL,taskComp INT NOT NULL,todayWordsNumber INT NOT NULL,todayCompNumber INT NOT NULL,taskComp INT NOT NULL,allWordsNumber INT NOT NULL,compWordsNumber INT NOT NULL)',
					success: function(e){
						console.log("homeData数据表创建成功")
						var addData = 'insert into values("高考词频",200,100,100,30,1040,800)'
						insertData("words", addData).then(res => {
							// console.log(name + "数据插入成功")
						}).catch(err => {
							console.log(err)
							console.log( "words数据插入失败")
						})
					},
					fail: function(e){
						console.log("homeData数据表创建失败")
					}
				});
			
			},


			openDataBases() {
				this.closeSQL('words')
				openSqlite('words', '_doc/words.db').then(res => {
					console.log("words数据库已打开")
					
					this.homeData()

					plus.sqlite.executeSql({
						name: 'words',
						sql: "DROP TABLE wordsData2",
						success: function(e){
							console.log('wordsData2表删除成功');
						},
						fail: function(e){
							console.log("wordsData2表删除失败");
						}
					});
					
					var tb = 'CREATE TABLE wordsData2 (id INTEGER PRIMARY KEY AUTOINCREMENT,word text NOT NULL,phonetic text NOT NULL,translations text NOT NULL)'
					createTable("words",tb).then(res => {
						console.log("wordsData2数据表创建成功")
						this.dataList.forEach(item => {
							var s1 =  item.translations.replace("/\"/g","\'")
							var sql = 'insert into wordsData2 values('+item.id+',"'+item.word + '","' + item.phonetic + '","' + s1 +'")'			
							 insertData("words", sql).then(res => {
								// console.log(name + "数据插入成功")
							 }).catch(err => {
								console.log(err)
								console.log(name + "数据插入失败")
							 })
						})
						uni.hideLoading();  
					}).catch(err => {
						console.log("数据表创建失败")
						this.closeSQL(name)
					})
					
				}).catch(err => {
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
			

			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value + 1)
				this.index = e.target.value
				
				this.taskTotal = this.dataList.length/(this.array[e.target.value])
				this.getFutureDate(this.taskTotal);
			},

			// 手指长按显示任务内容
			msgInfo() {
				this.isMsg = true
			},
			// 隐藏内容
			hideInfo() {
				this.isMsg = false
			},

			// 开始学习按钮
			startStudy() {
				uni.showLoading({  
				    title: '词库加载中'  
				});
				this.openDataBases()
				uni.reLaunch({
					url: "../home/home?isTask=true"
				})
			},
			
			// 获取 预计完成日期
			getFutureDate(n) {
				var n = n;
				var d = new Date();
				var year = d.getFullYear();
				var mon = d.getMonth() + 1;
				var day = d.getDate();
				if (day > n) {
					if (mon > 1) {
						mon = mon + 1;
					} else {
						year = year + 1;
						mon = 12;
					}
				}
				d.setDate(d.getDate() + n);
				year = d.getFullYear();
				mon = d.getMonth() + 1;
				day = d.getDate();
				var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
				
				this.dataTime = s
			}
		}
	}
</script>

<style lang="scss" scoped>
	.plan-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;

		.plan-box-head {}

		.plan-box-content {
			width: 100%;
			padding: 0 48rpx;
			box-sizing: border-box;
			flex: 1;

			.content-list {
				.list-plan-li {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 0;
					font-weight: 500;

					.li-title {
						font-size: 28rpx;
						color: $uni-text-color;
					}

					.li-text {
						font-size: 22rpx;
						color: #939399;
					}

					.li-ico {
						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}

				.list-plan-msg {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 50rpx;

					.text {
						font-size: 28rpx;
						color: $uni-text-color;
					}

					.list-msg-img {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 50rpx;
						height: 50rpx;

						image {

							width: 26rpx;
							height: 26rpx;
						}
					}


					.msg-content {
						position: absolute;
						top: 64rpx;
						width: 480rpx;
						height: 448rpx;
						padding: 40rpx;
						box-sizing: border-box;
						background: rgba(0, 0, 0, 0.7);
						border-radius: 12rpx;

						.txt {
							margin-bottom: 16rpx;
							font-size: 24rpx;
							color: #fff;
							line-height: 36rpx;
						}
					}

					.msg-content::after {
						content: '';
						position: absolute;
						top: -18rpx;
						right: 132rpx;
						width: 0;
						height: 0;
						border-top: 0rpx solid transparent;
						border-right: 10rpx solid transparent;
						border-bottom: 18rpx solid rgba(0, 0, 0, 0.7);
						border-left: 10rpx solid transparent;
					}
				}

				.msg-number-box {
					height: 60rpx;
				}
			}
		}

		.plan-box-footer {
			padding: 0 48rpx 96rpx;
			box-sizing: border-box;
		}
	}
</style>
