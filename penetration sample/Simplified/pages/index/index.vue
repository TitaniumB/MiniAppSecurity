<template>
	<view>
		<view class="content">
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<block style="margin-top: 50px;">
				<view class="uni-btn-v">
					<button type="primary" @tap="testPermission">测试剪切板权限</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="downloadImage">测试文件权限</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="testStorage">存储隔离测试</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="getPhoneNumber">手机号加密测试</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="getUserData">用户个人信息加密测试</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="request">网络协议测试</button>
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="testWebView">WebView能力测试</button>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	
	export default {
		data() {
			return {
				title: 'Penetration Samples'
			}
		},
		onLoad() {

		},
		computed: {
			...mapState([
				'loginProvider',
				'isUniverifyLogin'
			])
		},
		methods: {
			testPermission : function (){
				// Todo: 调用基础API
				uni.getClipboardData({
					success: (res) => {
						console.log(res.data);
						const content = res.data ? '剪贴板内容为:' + res.data : '剪贴板暂无内容';
						uni.showModal({
							content,
							title: '读取剪贴板',
							showCancel: false
						})
					},
					fail: () => {
						uni.showModal({
							content: '读取剪贴板失败!',
							showCancel: false
						})
					}
				});
			},
			downloadImage: function () {
				uni.showLoading({
					title:'下载中'
				})
				var self = this
				uni.downloadFile({
					url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: (res) => {
						console.log('downloadFile success, res is', res)
						self.imageSrc = res.tempFilePath;
						uni.hideLoading();
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			},
			testStorage : function(){
				uni.setStorage({
					key: 'storage_key',
					data: 'Hello!I am sub-app!',
					success: function () {
						console.log('success');
					}
				});
				uni.getStorage({
					key: 'storage_key',
					success: function (res) {
						console.log(res.data);
					}
				});
			},
			getUserData : function (){
				uni.login({
				  //step 1
				  provider: "weixin",
				  success: (res) => {
				    const code = res.code;
				    // 换取登录态信息
				    uniCloud.callFunction({
				      name: "login_wx",
				      data: {
				        code,
				        typea: "werun",
				      },
				      success: (result) => {
				        console.log(result);
				        //step 3
				        const uid = result.result.uid;
				        const sessionKey = result.result.sessionKey;
				        uni.setStorageSync("uni_id_token", result.result.token);
				        uni.setStorageSync(
				          "uni_id_token_expired",
				          result.result.tokenExpired
				        );
				
				        //step 4
				        wx.getWeRunData({
				          success: (werunData) => {
				            console.log(werunData);
				          },
				        });
				      },
				    });
				  },
				});
			},
			getPhoneNumber : function (){
				if (this.isUniverifyLogin) {
					// 一键登录
					this.getPhoneNumber(uni.getStorageSync('univerifyInfo')).then(phoneNumber => {
						this.hasUserInfo = true;
						this.userInfo = {
							phoneNumber
						};
					}).catch(err => {
						console.error('getUserInfo fail:', err);
						this.hasUserInfo = false;
					}).finally(() => {
						this.btnLoading = false;
					})
					return;
				}
				
				if(this.loginProvider === 'apple'){
					const nickname = uni.getStorageSync('apple_nickname')
					if(nickname){
						this.hasUserInfo = true;
						this.userInfo = { nickName:nickname }
						this.btnLoading = false;
						return;
					}
				}
				
				uni.getUserInfo({
					provider: this.loginProvider,
					success: (result) => {
						this.hasUserInfo = true;
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
						// #ifndef APP-PLUS
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
						// #endif
						// #ifdef APP-PLUS
						uni.showModal({
							title: '获取用户信息失败',
							content: '错误原因' + content,
							showCancel: false
						});
						// #endif
					},
					complete: () => {
						this.btnLoading = false;
					}
				});
			},
			request : function(){
				const requestUrl = 'http://unidemo.dcloud.net.cn/ajax/echo/text?name=uni-app'
				const duration = 2000
				uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					},
					success: (res) => {
						console.log('request success', res)
						uni.showToast({
							title: '请求成功',
							icon: 'success',
							mask: true,
							duration: duration
						});
						this.res = '请求结果 : ' + JSON.stringify(res);
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						this.loading = false;
					},
				})
			},
			testWebView(){
				uni.navigateTo({url: '/pages/webview/webview'});
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
