<template>
	<div class="container">
		<!-- 顶部 -->
		<div class="header-wrap">
			<img @click="goBack" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">付款</span>
			<span></span>
		</div>
		<!-- 页面 主体 -->
		<div v-if="pay_info">
			<!-- 订单价格 信息 -->
			<div class="top-wrapper">
				<div class="row-wrapper title-wrapper">
					<label class="title">订单提交成功，请选择付款方式</label>
				</div>
				<div class="row-wrapper subtitle-wrapper">
					<label class="subtitle">合计：</label>
					<label class="price">￥ {{ pay_info.pay_amount }}</label>
				</div>
			</div>
			<!-- 选择 按钮 -->
			<div class="item-wrapper"
				v-on:click="payType(item.payment_code)"
				v-for="(item, index) in payment_list" :key="index" >
				<div class="item-left-wrapper">
					<i class="icon" :class="item.myImg"></i>
					<!-- <i class="icon" :class="{ zfbPng: item.isZfb, wxPng: !item.isZfb }"></i> -->
					<label class="item-title">{{ item.payment_name }}</label>
				</div>
				<div class="item-right-wrapper">
					<img class="item-select" 
						src="@/assets/image/icon2/icon-dui.png"
						v-if="payment_info.payment_code == item.payment_code"
						alt="" />
				</div>
			</div>
		</div>
		<div 
			v-if="wxpayType"
			style="background-color: #fff;padding-top: 4.76rem;">
			<button class="ds-button-large" type="primary" v-on:click="submit">立即付款</button>
		</div>	
		<div
			v-else
			style="background-color: #fff;padding-top: 4.76rem;">
			<button class="ds-button-large" type="primary"
				v-on:click="$router.push({name:'MemberOrderList', query: { state: 'state_new' } })">去待支付页面支付</button>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { getOrderpayInfo } from '../../../api/memberBuy';
import { getVrOrderpayInfo } from '../../../api/memberVrBuy';
import { mapState } from 'vuex';
import { pay, getPaymentList, getPayData, wxpublicPayData } from '../../../api/memberPayment';
import { getRechargeInfo } from '../../../api/memberRecharge';
import { Toast, MessageBox } from 'mint-ui';
import { loadScript } from '../../../util/common';
import wx from 'weixin-js-sdk';
import $ from 'jquery';
export default {
	name: 'pay',
	data() {
		return {
			wxpayType:true,   //  微信 首次 支付 
			pay_sn: this.$route.query.pay_sn ? this.$route.query.pay_sn : '',
			pay_type: this.$route.query.pay_type ? this.$route.query.pay_type : '',
			// 订单支付显示的数据
			pay_info: null,
			// 提交支付需要用到的数据
			payment_info: {
				password: '', // 支付密码
				rcb_pay: 0, // 是否使用充值卡进行支付
				pd_pay: 0, // 是否使用预存款进行支付
				payment_code: 'alipay_h5', // 支付方式
				wxcode: null //微信code
			},
			payRequsetObj: {}, //支付通道
			sweixin: null, // 微信获取小程序
			Timer: null, //查询订单支付状态定时器

			payAllList: {
				H5_zfb_refund: false,
				account_wx_refund: false,
				app_wx_refund: false
			}, //后台获取全部可用支付通道
			payment_list: [] //当前可用支付通道
		};
	},
	computed: {
		...mapState({
			token: state => state.member.token
		})
	},
	created: function() {
		this.getMemberPayInfo();

		this.Timer = setInterval(() => {
			this.fun_getPayState();
		}, 3000);
	},
	mounted() {
		resetRem();
		this.getPaymentList();
	},
	beforeDestroy() {
		// 如果有订单查询
		if ( this.Timer ) {
			clearInterval(this.Timer);
			this.Timer = null;
		}
		resumeRem();
	},
	methods: {
		// 查询订单是否支付成功
		fun_getPayState() {
			// Toast("查询");
			let _this = this;
			getOrderpayInfo(this.pay_sn)
				.then(res => {})
				.catch(error => {
					// console.log(error);
					if( error.code == 10001 || error.message == "该订单不存在"){
						if (_this.Timer) {
							clearInterval(_this.Timer);
							_this.Timer = null;
						}
						if( _this.payment_info.payment_code == 'wxpay_h5' ){
							_this.$router.push({name:'MemberOrderList', query: { state: 'state_new' ,payType:'wxapp'} })
						}else{
							_this.$router.push({name:'MemberOrderList', query: { state: 'state_new' } })							
						}
					}
					// 订单已经支付
					if (error.code === 12001) {
						Toast('支付成功');
						// 如果有定时任务 ，取消任务
						if (_this.Timer) {
							clearInterval(_this.Timer);
							_this.Timer = null;
						}
						_this.$router.push({ name: 'MemberOrderList' });
					}
				});
		},

		/********   在微信里面 获取 code  ****************** */
		getUrlParam(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			let url = window.location.href.split('#')[0];
			// alert('截取之前'+url);
			let search = url.split('?')[1];
			if (search) {
				var r = search.substr(0).match(reg);
				if (r !== null) return unescape(r[2]);
				return null;
			} else {
				return null;
			}
		},

		// 在微信里面 获取 code
		WXloading() {
			const code = this.getUrlParam('code'); // 截取路径中的code
			// alert("第一次获取code" + code);
			if (code == null || code === '') {
				var local = window.location.href;
				// local = "https://h.ihaosy.com";
				var url =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef05964eb76efd79&redirect_uri=' +
					encodeURIComponent(local) +
					'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
				// alert('路径'+url);
				window.location.href = url;
			} else {
				// alert('传参'+code) //把code传给后台获取用户信息 openId
				this.wxcode = code;
			}
		},
		/***********   在微信里面 获取 code  **************** */

		// 点击返回
		goBack() {
			//如果在微信里
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger' && this.payAllList.account_wx_refund == true) {
				this.$router.go(-2);
			} else {
				this.$router.go(-1);
			}
		},
		payType(code) {
			this.payment_info.payment_code = code;
		},
		getPaymentList() {
			let _this = this;
			getPaymentList()
				.then(res => {
					for (var item of res.result.payment_list) {
						this.payAllList[item.payment_code] = true;
					}
					/********************************* */
					// 如果不是 app端
					if (!window.plus) {
						var ua = navigator.userAgent.toLowerCase();
						//如果在微信里
						if (ua.match(/MicroMessenger/i) == 'micromessenger') {
							if (this.payAllList.H5_zfb_refund == true) {
								this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', myImg: 'zfbPng' });
							}
							if (this.payAllList.account_wx_refund == true) {
								this.payment_list.push({ payment_code: 'wxpublicpay', payment_name: '微信', myImg: 'wxPng' });
								this.WXloading();
							}
							// 在普通浏览器里
						} else {
							if (this.payAllList.H5_zfb_refund == true) {
								this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', myImg: 'zfbPng' });
							}
						}
						this.payment_list.push({ payment_code: 'h5_wy', payment_name: '线下转账', myImg: 'xxzzPng' });
						// 如果 含有支付 通道
						if (this.payment_list.length > 0) {
							this.payment_info.payment_code = this.payment_list[0].payment_code;
						}
						return false;
					} else {
						//否则在APP端
						if (this.payAllList.H5_zfb_refund == true) {
							this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', myImg: 'zfbPng' });
						}
						if (this.payAllList.app_wx_refund == true) {
							this.payment_list.push({ payment_code: 'wxpay_h5', payment_name: '微信', myImg: 'wxPng' });
							this.getShare();
						}
						this.payment_list.push({ payment_code: 'h5_wy', payment_name: '线下转账', myImg: 'xxzzPng' });
						// 如果 含有支付通道
						if (this.payment_list.length > 0) {
							this.payment_info.payment_code = this.payment_list[0].payment_code;
						}
					}
					/****************************** */
					
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		getMemberPayInfo() {
			if (this.pay_type === 'pay_new') {
				let _this = this;
				getOrderpayInfo(this.pay_sn)
					.then(res => {
						if (res.code === 10000) {
							this.pay_info = res.result.pay_info;
						}
					})
					.catch(function(error) {
						if( error.code == 10001 || error.message == "该订单不存在"){
							if (_this.Timer) {
								clearInterval(_this.Timer);
								_this.Timer = null;
							}
							if( _this.payment_info.payment_code == 'wxpay_h5' ){
								_this.$router.push({name:'MemberOrderList', query: { state: 'state_new' ,payType:'wxapp'} })
							}else{
								_this.$router.push({name:'MemberOrderList', query: { state: 'state_new' } })							
							}					
						}
						if (error.code === 12001) {
							// 订单已经支付
							_this.$router.push({ name: 'MemberOrderList' });
						} else {
							// Toast(error.message);
						}
					});
			} else if (this.pay_type === 'vr_pay_new') {
				let _this = this;
				getVrOrderpayInfo(this.pay_sn)
					.then(res => {
						if (res.code === 10000) {
							this.pay_info = res.result.pay_info;
						}
					})
					.catch(function(error) {
						if (error.code === 12001) {
							// 订单已经支付
							_this.$router.push({ name: 'MemberVrOrderList' });
						} else {
							Toast(error.message);
						}
					});
			} else if (this.pay_type === 'pd_pay') {
				getRechargeInfo(this.pay_sn)
					.then(res => {
						if (res.code === 10000) {
							this.pay_info = { pay_amount: res.result.pdinfo.pdr_amount };
						}
					})
					.catch(function(error) {
						Toast(error.message);
					});
			}
		},

		// 提交 订单
		submit() {
			if( !this.wxpayType ){
				Toast("请去待支付订单");
				return false;
			}
			// Toast("查询");
			let _this = this;
			var pay_type_new;
			var that = this;
			getOrderpayInfo(this.pay_sn)
				.then(res => {
					if (this.payment_info.payment_code == 'wxpay_h5') {
						//如果是微信APP支付
						pay_type_new = 'app_wx';
						// alert("微信支付");
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new).then(res => {
							this.wxpayType = false;
							this.sweixin
								? this.sweixin.launchMiniProgram({
										path: 'pages/pay/pay?datas=' + JSON.stringify(res.result),
										type: 0, //可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
										id: 'gh_c6b8c53146de' //'gh_c6b8c53146de'
								  })
								: plus.nativeUI.alert('当前环境不支持微信操作!');
							return false;
						});
					} else if (this.payment_info.payment_code == 'unionpay') {
						//如果是支付宝支付
						pay_type_new = 'H5_zfb';
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new).then(res => {
							this.wxpayType = false;
							this.$router.push({ name: 'HomeUrlPay', params: { url: res.result } });
						});
					} else if (this.payment_info.payment_code == 'wxpublicpay') {
						//如果是微信公众号支付
						pay_type_new = 'account_wx';
						// alert("公众号支付 wxcoder:"+this.wxcode );
						if (!this.wxcode) {
							return false;
						}
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new, this.wxcode).then(res => {
							this.wxpayType = false;
							var res = JSON.parse(res.result).jsPayRequest;
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest',
								{
									appId: res.appId, //公众号名称，由商户传入
									timeStamp: res.timeStamp, //时间戳，自1970年以来的秒数
									nonceStr: res.nonceStr, //随机串
									package: res.package, //预支付交易码
									signType: res.signType, //微信签名方式：
									paySign: res.paySign //微信签名
								},
								function(res) {
									// alert(res);
									if (res.err_msg == 'get_brand_wcpay_request:ok') {
										// 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
										that.fun_getPayState();
									} else {
										Toast('支付失败');
									}
								}
							);
						});
					} else if ( this.payment_info.payment_code == 'h5_wy' ) {	
						// 如果有订单查询
						if ( this.Timer ) {
							clearInterval(this.Timer);
							this.Timer = null;
						}
						// 如果 是线下转账
						pay_type_new = 'h5_wy';
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new).then(res => {
							this.wxpayType = false;
							this.$router.push({ name: 'MemberOrderList' });
						}).catch(err=>{
							Toast(err.message);
						})
					}else{						
						Toast('暂无支付方式');
					}
				})
				.catch(error => {
					// 订单已经支付
					if (error.code === 12001) {
						// Toast('支付成功');
						// 如果有定时任务 ，取消任务
						if (_this.Timer) {
							clearInterval(_this.Timer);
							_this.Timer = null;
						}
						_this.$router.push({ name: 'MemberOrderList' });
					}
				});
		},

		// 获取可分享的
		getShare() {
			// #ifdef APP-PLUS
			plus.share.getServices(
				s => {
					var shares = {};
					// alert(JSON.stringify(s));
					for (var i = 0; i < s.length; i++) {
						var t = s[i];
						shares[t.id] = t;
					}
					var sweixin = shares['weixin'];
					this.sweixin = sweixin;
					// Toast(sweixin);
				},
				function(e) {
					console.log('获取分享服务列表失败：' + e.message);
				}
			);
			//#endif
		},

	}
};
</script>

<style lang="scss" scoped>
.header-wrap {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.24rem 1.43rem;
	font-size: 1.39rem;
	font-weight: 400;
	color: #161616;
	img {
		width: 1.71rem;
		height: 1.71rem;
	}
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;
}
.top-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;
	margin-bottom: 0.95rem;
}
.row-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.title-wrapper {
	// height: 3.2rem;
	padding: 1.9rem 1.42rem 0;
}
.subtitle-wrapper {
	margin-top: 1.42rem;
	padding-bottom: 1.9rem;
}
.icon {
	width: 4rem !important;
	height: 4rem !important;
	margin-right: 1.42rem;
}
.title {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
}
.subtitle {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	margin-left: 2.5rem;
}
.price {
	font-size: 1.33rem;
	font-weight: bold;
	color: #e53216;
}
.item-wrapper {
	// height: 3.1rem;
	position: relative;
	padding: 2.28rem 1.42rem 1.9rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
	// border-bottom: 1px solid #EFEFEF;
}
.item-wrapper::after {
	position: absolute;
	content: '';
	height: 1px;
	background-color: #efefef;
	width: 96%;
	right: 0;
	bottom:0;
}
.item-left-wrapper {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.item-right-wrapper {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.item-title {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
}
// .item-subtitle {
// 	font-size: 0.8rem;
// 	color: #8c8c8c;
// 	margin-right: 0.25rem;
// 	text-align: right;
// }
.item-select {
	width: 1.9rem;
	height: 1.9rem;
	// margin-right: 1.1rem;
}
// .indicator {
// 	width: 0.7rem;
// 	height: 0.7rem;
// 	margin-left: 0.25rem;
// 	margin-right: 0.8rem;
// }
// .action-wrapper {
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: center;
// 	align-items: center;
// 	height: 2.5rem;
// 	margin-top: 2.25rem;
// }
.zfbPng {
	background-image: url('../../../assets/image/pay/zfb.png');
	width: 38px;
	height: 38px;
	background-size: contain;
}
.wxPng {
	background-image: url('../../../assets/image/pay/wx.jpg');
	width: 38px;
	height: 38px;
	background-size: contain;
}
.xxzzPng {
	background-image: url('../../../assets/image/pay/xxzz.png');
	width: 38px;
	height: 38px;
	background-size: contain;
}
.ds-button-large {
	background: linear-gradient(89deg, #FC6952 0%, #E53216 99%);
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
	border-radius: 1.9rem;
	font-size: 1.33rem;
	font-weight: 400;
	color: #FFFFFF;
	padding: 0.95rem;
	text-shadow: 0px 0px 0px rgba(251, 104, 84, 0.5);
	width: 94%;
	margin: 0 3%;
}
</style>
