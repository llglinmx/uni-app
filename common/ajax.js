import baseconfig from "./baseconfig.js"

const httpClient = {
	request:function(method,url,data){
		var headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Auth-Token": uni.getStorageSync("auth_token")
		};
		
		return new Promise((resolve,reject)=>{
			uni.showLoading({
				title:"加载中",
				mask:true
			});
			
			uni.request({
				url:url,
				header:headers,
				data:data,
				method:method,
				dataType: 'json',
				success:function(res){
					uni.hideLoading()
					console.log("接口获取原始数据：-------------------",res.data)
					if(res.statusCode == 401){
						uni.showToast({
							icon: 'none',
							duration:1000,
							title: res.message
						});
						setTimeout(function(){
							uni.reLaunch({
								url: '../login/login'
							});
						},1500);
					}else{
						if(res.data.error != null){
							uni.showToast({
								icon: 'none',
								duration:1000,
								title: res.message
							});
							return;
						}else{
							resolve(res.data);
						}
					}
				},
				fail: function(err){
					uni.hideLoading()
					reject(err)
				}
			})
		})
	},
	Get: function(url,data){
		let allurl = this.geturl(url);
		return this.request('GET',allurl,data)
	},
	Post: function(url,data){
		let allurl = this.geturl(url);
		return this.request('POST',allurl,data)
	},
	geturl:function(url){
		return baseconfig.server+url
	}
};

module.exports = httpClient