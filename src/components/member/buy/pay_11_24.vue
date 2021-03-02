<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
            <mt-header class="common-header" title="付款">
                <mt-button icon="back" slot="left" @click="goBack"></mt-button>
            </mt-header>
        </div> -->
		<div class="header-wrap">
			<img @click="goBack" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">付款</span>
			<span></span>
			<!-- <img @click="onSearch" src="@/assets/image/icon2/icon-search-black.png" alt="" /> -->
		</div>
		<div v-if="pay_info">
			<div class="top-wrapper">
				<div class="row-wrapper title-wrapper">
					<!-- <i class="icon iconfont">&#xe6d2;</i> -->
					<label class="title">订单提交成功，请选择付款方式</label>
				</div>
				<div class="row-wrapper subtitle-wrapper">
					<label class="subtitle">合计：</label>
					<label class="price">￥ {{ pay_info.pay_amount }}</label>
				</div>
			</div>

			<div class="item-wrapper" v-on:click="payType(item.payment_code)" v-for="(item, index) in payment_list" :key="index">
				<div class="item-left-wrapper">
					<i class="icon" :class="{ zfbPng: item.isZfb, wxPng: !item.isZfb }"></i>
					<label class="item-title">{{ item.payment_name }}</label>
				</div>
				<div class="item-right-wrapper">
					<!-- <i class="item-select iconfont" v-if="payment_info.payment_code == item.payment_code"></i> -->
					<img class="item-select" src="@/assets/image/icon2/icon-dui.png" v-if="payment_info.payment_code == item.payment_code" alt="" />
				</div>
			</div>
		</div>
		<div v-if="wxpayType" style="background-color: #fff;padding-top: 4.76rem;"><button class="ds-button-large" type="primary" v-on:click="submit">立即付款</button></div>	
		<div v-else style="background-color: #fff;padding-top: 4.76rem;"><button class="ds-button-large" type="primary" v-on:click="$router.push({name:'MemberOrderList', query: { state: 'state_new' } })">去待支付页面支付</button></div>
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
		// if(window.plus){
		//   this.getShare();
		// }
		resetRem();
		this.getPaymentList();
	},
	beforeDestroy() {
		// 如果有订单查询
		if (this.Timer) {
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
		//////////////////////////////////////////////////////////////////////////////
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
		//////////////////////////////////////////////////////////////////////////////
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
								this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', isZfb: true });
							}
							if (this.payAllList.account_wx_refund == true) {
								this.payment_list.push({ payment_code: 'wxpublicpay', payment_name: '微信', isZfb: false });
								this.WXloading();
							}
							// 在普通浏览器里
						} else {
							// console.log(this.payAllList.H5_zfb_refund);
							if (this.payAllList.H5_zfb_refund == true) {
								this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', isZfb: true });
							}
						// if (this.payAllList.app_wx_refund == true) {
						// 	this.payment_list.push({ payment_code: 'wxpay_h5', payment_name: '微信', isZfb: false });
						// 	// this.getShare();
						// }
						}
						if (this.payment_list.length > 0) {
							this.payment_info.payment_code = this.payment_list[0].payment_code;
						}
						return false;
					} else {
						//否则在APP端
						if (this.payAllList.H5_zfb_refund == true) {
							this.payment_list.push({ payment_code: 'unionpay', payment_name: '支付宝', isZfb: true });
						}
						if (this.payAllList.app_wx_refund == true) {
							this.payment_list.push({ payment_code: 'wxpay_h5', payment_name: '微信', isZfb: false });
							this.getShare();
						}
						// this.payment_info.payment_code = this.payment_list[0].payment_code;
						if (this.payment_list.length > 0) {
							this.payment_info.payment_code = this.payment_list[0].payment_code;
						}
					}
					/****************************** */
					return false;
					if (this.payment_list.length) {
						this.payment_info.payment_code = this.payment_list[0].payment_code;
					}
					loadScript('weixin', 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js', function() {
						wx.miniProgram.getEnv(function(res) {
							let indexof = -1;
							let temp = _this.payment_list;
							let j = temp.indexOf('allinpay_h5');

							if (res.miniprogram) {
								indexof = temp.indexOf('wxpay_jsapi');
								if (j >= 0) {
									temp[j] = 'allinpay_h5_W06';
								}
							} else {
								indexof = temp.indexOf('wxpay_minipro');
								if (j >= 0) {
									temp[j] = 'allinpay_h5_W02';
								}
							}
							if (indexof > -1) {
								temp.splice(indexof, 1);
							}
							if (indexof > -1 || j > -1) {
								_this.payment_list = temp;
							}
						});
					});
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
							// console.log(res);
							// return false;
							// var res = JSON.parse(res.result).miniPayRequest;
							// var package1 = res.package.split("=")[0];
							// var package2 = res.package.split("=")[1];
							// var paySign1 = res.paySign.split("==")[0];
							// var datas = res;
							// datas.package = null;
							// datas.paySign = null;
							// datas.package1 = package1;
							// datas.package2 = package2;
							// datas.paySign1 = paySign1;
							// datas = JSON.stringify(datas);
							// console.log(JSON.stringify(res.result));
							// return false;
							this.sweixin
								? this.sweixin.launchMiniProgram({
										path: 'pages/pay/pay?datas=' + JSON.stringify(res.result),
										type: 0, //可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
										id: 'gh_c6b8c53146de' //'gh_c6b8c53146de'
								  })
								: plus.nativeUI.alert('当前环境不支持微信操作!');
							return false;
							// alert(res);
							// console.log(res);
							// return false;
							plus.payment.request(
								that.payRequsetObj['wxpay'],
								res,
								function(result) {
									alert(3);
									// 支付成功处理
									alert('支付成功:' + JSON.stringify(result));
								},
								function(error) {
									// 支付失败处理
									alert('支付失败！！！:' + res);
									alert('支付失败！！！:' + JSON.stringify(error));
								}
							);
						});
						// this.weixinPay()
						// return false;
					} else if (this.payment_info.payment_code == 'unionpay') {
						//如果是支付宝支付
						pay_type_new = 'H5_zfb';
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new).then(res => {
							this.wxpayType = false;
							this.$router.push({ name: 'HomeUrlPay', params: { url: res.result } });
							// window.location.href = res.result;
						});
						// this.alipay();
					} else if (this.payment_info.payment_code == 'wxpublicpay') {
						//如果是微信公众号支付
						pay_type_new = 'account_wx';
						// alert("公众号支付 wxcoder:"+this.wxcode );
						if (!this.wxcode) {
							return false;
						}
						pay(this.pay_sn, this.pay_type, this.payment_info, this.token, pay_type_new, this.wxcode).then(res => {
							this.wxpayType = false;
							// alert("成功获取公众号参数");
							// alert(JSON.stringify(res));
							var res = JSON.parse(res.result).jsPayRequest;
							// console.log(res);
							// alert(JSON.stringify(res));
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
						// alert( "微信公众号支付" );
						// this.wxPublicPay();
					} else {
						// this.payment_info.payment_code = 'wxpay_h5';
						// pay_type_new = "app_wx";
						// //#ifdef APP-PLUS  , , data, key,pay_type_new
						// var datas = {
						//   paySn:this.pay_sn,
						//   payType:this.pay_type,
						//   data:this.payment_info,
						//   key:this.token,
						//   pay_type_new:pay_type_new
						// }
						// datas = JSON.stringify(datas);
						// this.sweixin ? this.sweixin.launchMiniProgram({
						//   path: 'pages/pay/pay?datas='+datas,
						//   type: 2,//可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
						//   id: 'gh_c6b8c53146de',//'gh_c6b8c53146de'
						// }) : plus.nativeUI.alert('当前环境不支持微信操作!');
						//#endif
						Toast('暂无支付方式');
					}
				})
				.catch(error => {
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
		// 微信公众号支付
		wxPublicPay() {
			wxpublicPayData(this.wxcode)
				.then(res => {
					// alert("成功"+JSON.stringify(res));
				})
				.catch(err => {
					// alert('失败')
					// alert(JSON.stringify(err));
					// alert(err);
					var res = err.jsPayRequest;
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
							alert(res);
							if (res.err_msg == 'get_brand_wcpay_request:ok') {
								alert('支付成功');
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							} else {
								alert('支付失败,请重试');
							}
						}
					);
				});
			// $.ajax({
			//   url: "https://shopa.ihaosy.com/api/Groupbuy/get_openid",
			//   data:{
			//     wxcoder:this.wxcode
			//   },
			//   success: function (res) {
			//     var res = JSON.parse( res ).jsPayRequest;
			//     WeixinJSBridge.invoke(
			//       'getBrandWCPayRequest', {
			//         "appId":res.appId,     //公众号名称，由商户传入
			//         "timeStamp":res.timeStamp,//时间戳，自1970年以来的秒数
			//         "nonceStr": res.nonceStr, //随机串
			//         "package": res.package, //预支付交易码
			//         "signType": res.signType,//微信签名方式：
			//         "paySign": res.paySign //微信签名
			//       },
			//       function(res){
			//         alert(res);
			//         if(res.err_msg == "get_brand_wcpay_request:ok" ){
			//           alert("支付成功");
			//         }else{
			//           alert("支付失败,请重试");
			//         }
			//       }
			//     );

			//   },
			//   error:function(){
			//     alert('错误');
			//   }
			// })
			// return false;

			//   alert('公众号支付');
			//   getPayData("get_wxnet_authorization").then(res=>{
			//   // console.log('res',res);
			//   }).catch(err=>{
			//     var res = err.jsPayRequest;
			//     // console.log(res);
			//     alert( JSON.stringify(res) );
			//     WeixinJSBridge.invoke(
			//       'getBrandWCPayRequest', {
			//         "appId":res.appId,     //公众号名称，由商户传入
			//         "timeStamp":res.timeStamp,//时间戳，自1970年以来的秒数
			//         "nonceStr": res.nonceStr, //随机串
			//         "package": res.package, //预支付交易码
			//         "signType": res.signType,//微信签名方式：
			//         "paySign": res.paySign //微信签名
			//       },
			//       function(res){
			//         alert(res);
			//         if(res.err_msg == "get_brand_wcpay_request:ok" ){
			//           alert("支付成功");
			//           // 使用以上方式判断前端返回,微信团队郑重提示：
			//           //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
			//         }else{
			//           alert("支付失败,请重试");
			//         }
			//       }
			//     );
			//   })
			// wx.config({
			//   debug: false,
			//   appId: res2.appId, // 必填,公众号的唯一标识
			//   timestamp: res2.timestamp, // 必填,生成签名的时间戳
			//   nonceStr: res2.nonceStr, // 必填,生成签名的随机串
			//   signature: res2.signature, // 必填,签名
			//   jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
			// })
			// wx.ready(res => {
			//   wx.chooseWXPay({
			//     timestamp: payJson.timeStamp,
			//     nonceStr: payJson.nonceStr,
			//     package: payJson.package,
			//     signType: payJson.signType,
			//     paySign: payJson.paySign,
			//     success: function (r) {
			//         alert('微信api：success')
			//         alert(r)
			//         this.$router.push({ name: 'Home'});
			//         // 支付成功后的回调函数
			//         if (r.errMsg == "chooseWXPay:ok") {
			//             alert('支付成功')
			//             this.$router.push({ name: 'Home'});
			//             //支付成功
			//             // _this.checkDetail(res.ordersNo);

			//         } else {
			//             alert('success支付失败')
			//             this.$router.push({ name: 'Home'});
			//             // _this.checkDetail(res.ordersNo);
			//             alert(r.errMsg,null);
			//         }
			//     },
			//     cancel: function(r) {
			//         alert('取消支付')
			//         this.$router.push({ name: 'Home'});
			//         //支付取消
			//         this.$route.push
			//         _this.checkDetail(res.ordersNo);
			//     },
			//     fail:function(r){
			//         alert('fail支付失败了')
			//         this.$router.push({ name: 'All_order_list'});
			//         //支付失败
			//     }
			//   });
			// });
		},
		// 查看当前手机可用的支付通道
		getChannels() {
			var that = this;
			plus.payment.getChannels(
				function(channels) {
					// alert("唤醒plus.payment.getChannels");
					// alert( JSON.stringify(channels) );
					for (var i in channels) {
						// alert(channels[i].id);
						if (channels[i].id == 'alipay') {
							that.payRequsetObj['alipay'] = channels[i];
							// alert(that.payRequsetObj['alipay'].id+that.payRequsetObj['alipay'].description+that.payRequsetObj['alipay'].serviceReady);
						} else if (channels[i].id == 'wxpay') {
							that.payRequsetObj['wxpay'] = channels[i];
							// alert(that.payRequsetObj['wxpay'].id+that.payRequsetObj['wxpay'].description+that.payRequsetObj['wxpay'].serviceReady);
							that.checkServices(that.payRequsetObj['wxpay']); //检测是否安装微信
						}
					}
				},
				function(e) {
					alert('获取支付通道失败：' + e.message);
				}
			);
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
		// 支付宝支付
		alipay() {
			// this.getChannels();
			var that = this;
			/////////////////////
			// MessageBox.confirm('', {
			//   message: '支付宝请求哪个接口',
			//   title: '提示',
			//   confirmButtonText: 'shopa',
			//   cancelButtonText: 'demo'
			// }).then(action => {
			//   if (action == 'confirm') {
			getPayData('zfb_app_get_authorization')
				.then(res => {
					// console.log('res',res);
				})
				.catch(err => {
					var res = err.qrCode;
					// console.log(res);
					window.location.href = res;
					// return false;
					// that.$router.push({ name: 'HomeUrl' ,params:{url:res} })
					// return false;
					// res = JSON.parse(res);
					// // console.log(res);
					// res = res.appPayRequest
					// console.log("res",res);
					// // return false;
					// var payParam = res;
					// alert( JSON.stringify(that.payRequsetObj['alipay']) );
					// alert( JSON.stringify(payParam) );
					// console.log(payParam);
					// plus.payment.request( that.payRequsetObj['alipay'], payParam,
					//   function(result) {
					//       alert(3);
					//       // 支付成功处理
					//       alert('支付成功:'+JSON.stringify(result))
					//   },
					//   function(error) {
					//       // 支付失败处理
					//       alert('支付失败！！！:'+payParam)
					//       alert('支付失败！！！:'+JSON.stringify(error))
					// })
				});
			//     }
			//   }).catch(err => {
			//     if (err == 'cancel') {     //取消的回调
			//       $.ajax({
			//         url: "https://demo.dcloud.net.cn/payment/alipayrsa2/?total=1",
			//         success: function (res) {
			//           let payParam = res;
			//           alert( JSON.stringify(that.payRequsetObj['alipay']) );
			//           alert( payParam );
			//           console.log(payParam);
			//           plus.payment.request( that.payRequsetObj['alipay'], payParam,
			//             function(result) {
			//                 alert(3);
			//                 // 支付成功处理
			//                 alert('支付成功:'+JSON.stringify(result))
			//             },
			//             function(error) {
			//                 // 支付失败处理
			//                 alert('支付失败！！！:'+payParam)
			//                 alert('支付失败！！！:'+JSON.stringify(error))
			//           })
			//         },
			//       })

			//     }
			//   });
			// //////////////////////////////////////////
		},
		//微信支付
		weixinPay() {
			// this.getChannels();
			var that = this;
			/////////////////////
			// MessageBox.confirm('', {
			//   message: '微信请求哪个接口',
			//   title: '提示',
			//   confirmButtonText: 'shopa',
			//   cancelButtonText: 'demo'
			// }).then(action => {
			//   if (action == 'confirm') {
			getPayData('app_get_authorization')
				.then(res => {
					// console.log('res',res);
				})
				.catch(err => {
					var res = err;
					// console.log(res);
					res = res.appPayRequest;
					// console.log("res",res);
					// return false;
					var payParam = res;
					// var payParam = {
					//   appid:res.appId,
					//   noncestr:res.nonceStr,
					//   prepayid:res.package.slice(10),
					//   signtype:'RSA',
					//   paysign: res.paySign,
					//   timestamp:res.timeStamp,
					// }
					// alert( JSON.stringify(that.payRequsetObj['wxpay']) );
					// alert( JSON.stringify(payParam) );
					// console.log(payParam);
					plus.payment.request(
						that.payRequsetObj['wxpay'],
						payParam,
						function(result) {
							alert(3);
							// 支付成功处理
							alert('支付成功:' + JSON.stringify(result));
						},
						function(error) {
							// 支付失败处理
							alert('支付失败！！！:' + payParam);
							alert('支付失败！！！:' + JSON.stringify(error));
						}
					);
				});
			//     }
			//   }).catch(err => {
			//     if (err == 'cancel') {     //取消的回调
			//       $.ajax({
			//         url: 'https://demo.dcloud.net.cn/payment/wxpayv3.HBuilder/?total=1',
			//         success: function (res) {
			//           let payParam = res;
			//           alert( JSON.stringify(that.payRequsetObj['wxpay']) );
			//           alert( payParam );
			//           console.log(payParam);
			//           plus.payment.request( that.payRequsetObj['wxpay'], payParam,
			//             function(result) {
			//                 alert(3);
			//                 // 支付成功处理
			//                 alert('支付成功:'+JSON.stringify(result))
			//             },
			//             function(error) {
			//                 // 支付失败处理
			//                 alert('支付失败！！！:'+payParam)
			//                 alert('支付失败！！！:'+JSON.stringify(error))
			//           })
			//         },
			//       })

			//     }
			//   });
			// //////////////////////////////////////////
		},
		// 检测是否安装支付服务
		checkServices(pc) {
			if (!pc.serviceReady) {
				var txt = null;
				switch (pc.id) {
					case 'wxpay':
						txt = '检测到系统未安装“微信”，无法完成支付操作，是否立即安装？';
						break;
					default:
						txt = '系统未安装“' + pc.description + '”服务，无法完成支付，是否立即安装？';
						break;
				}
				plus.nativeUI.confirm(
					txt,
					function(e) {
						if (e.index == 0) {
							pc.installService();
						}
					},
					pc.description
				);
			}
		}
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
