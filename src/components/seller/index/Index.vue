<template>
	<div class="container">
		<div class="top-wrapper">
			<div class="nav-back" @click="$router.push({ name: 'HomeIndex' })"><img src="@/assets/image/icon2/icon-white-back.png" alt="" /></div>
			<div class="nav-list">
				<div class="top-info-wrapper">
					<div class="avatar-wrapper" @click="goSettingIndex">
						<img class="avatar" v-bind:src="seller.store_avatar" v-if="isOnline && seller && seller.store_avatar" />
					</div>
					<div class="info-wrap">
						<label class="sellername" style="-webkit-box-orient:vertical" @click="goSettingIndex">{{ sellername }}</label>
						<label class="sellerid">(商家ID:{{ seller.store_id }})</label>
					</div>
				</div>
				<div class="nav-item" id="right-nav-item" @click="goSettingIndex">
					<img src="@/assets/image/icon2/icon-set.png" alt="" />
					<span v-if="0"></span>
				</div>
				<div class="nav-item" id="left-nav-item" @click="goNews()"><img src="@/assets/image/icon2/icon-seller-news.png" alt="" /></div>
				
			</div>
		</div>
		<!-- <div class="order-header" @click="goSellerorder">
			<div class="order-header-item" id="order-item-left">
				<i class="order-header-icon iconfont">&#xe6de;</i>
				<label class="item-title order-header-title">订单管理</label>
			</div>
			<div class="order-header-item" id="order-item-right">
				<label class="order-subtitle">查看全部订单</label>
				<i class="indicator iconfont">&#xe650;</i>
			</div>
			<div class="order-header-line"></div>
		</div>
		<div class="order-wrapper">
			<index-order-item
				class="order-item"
				testAttr="SellerOrderList"
				id="state_new"
				iconfont="&#xe664;"
				title="待付款"
				:orderNumber="seller_info.order_nopay_count"
			></index-order-item>
			<index-order-item
				class="order-item"
				testAttr="SellerOrderList"
				id="state_pay"
				iconfont="&#xe663;"
				title="待发货"
				:orderNumber="seller_info.order_noship_count"
			></index-order-item>
			<index-order-item
				class="order-item"
				testAttr="SellerOrderList"
				id="state_send"
				iconfont="&#xe6a6;"
				title="待收货"
				:orderNumber="seller_info.order_noreceipt_count"
			></index-order-item>
		</div> -->
		<div class="order-wrapper">
			<div class="order-header" @click="goSellerorder">
				<!-- <i class="order-header-icon iconfont">&#xe6de;</i> -->
				<label class="item-title">我的订单</label>
				<div>
					<label class="order-subtitle">查看全部</label>
					<img src="../../../assets/image/icon2/icon-gray-right.png" alt="" />
				</div>
			</div>
			<div class="order-list">
				<index-order-item
					class="order-item"
					testAttr="SellerOrderList"
					id="state_new"
					:iconfont="iconOblige"
					title="待付款"
					:orderNumber="seller_info.order_nopay_count"
				></index-order-item>
				<index-order-item
					class="order-item"
					testAttr="SellerOrderList"
					id="state_pay"
					:iconfont="iconWaitOblige"
					title="待发货"
					:orderNumber="seller_info.order_noship_count"
				></index-order-item>
				<index-order-item
					class="order-item"
					testAttr="SellerOrderList"
					id="state_send"
					:iconfont="iconWaitReceiv"
					title="待收货"
					:orderNumber="seller_info.order_noreceipt_count"
				></index-order-item>

				<!-- <index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_noeval"
					:iconfont="iconReturns"
					title="退货退款"
					:orderNumber="seller_info.order_noeval_count"
				></index-order-item> -->
			</div>
		</div>

		<div class="manage-wrapper">
			<div>
				<index-manage-item v-on:onclick="goSellerRefundList(1)" :iconfont="iconTuikuan" title="退款管理"></index-manage-item>
				<index-manage-item v-on:onclick="goSellerRefundList(2)" :iconfont="iconTuihuo" title="退货管理"></index-manage-item>
				<index-manage-item v-on:onclick="goSellerEvaluateList" :iconfont="pingjia" title="评价管理"></index-manage-item>
				<index-manage-item v-on:onclick="$router.push({ name: 'SellerComplaintList' })" :iconfont="tousu" title="投诉管理"></index-manage-item>
			</div>
		</div>

		<div class="manage-wrapper">
			<div>
				<index-manage-item v-on:onclick="goGoodsonline" :iconfont="shangpin" title="商品管理"></index-manage-item>
				<index-manage-item v-on:onclick="goPromotion" :iconfont="iconcuxiao" title="促销管理"></index-manage-item>
				<index-manage-item v-on:onclick="goWaste" :iconfont="baofei" title="报废/消费"></index-manage-item>
				<index-manage-item v-on:onclick="goOfflineSales" :iconfont="xianxia" title="线下销售"></index-manage-item>
				<index-manage-item v-on:onclick="goQualify" :iconfont="hegezheng" title="合格证管理"></index-manage-item>
				<index-manage-item :manageNumber="manageNumber" v-on:onclick="goConsult" :iconfont="zixun" title="咨询管理"></index-manage-item>
				<index-manage-item v-on:onclick="goSellerChatList" :iconfont="iconMessage" title="聊天列表"></index-manage-item>
			</div>
		</div>


		<div class="manage-wrapper">
			<!-- <div class="manage-title">我的店铺</div> -->
			<div>
				<index-manage-item v-on:onclick="goPerfext1" :iconfont="iconJoin" 
					title='完善信息'></index-manage-item>
				<index-manage-item v-if="!seller.is_platform_store" v-on:onclick="goMoney" :iconfont="peisong" title="配送管理"></index-manage-item>
				<index-manage-item v-on:onclick="golicense" :iconfont="xukezheng" title="修改许可证"></index-manage-item>
				<index-manage-item v-on:onclick="goGoodsclass" :iconfont="fenlei" title="店铺分类"></index-manage-item>
				<index-manage-item v-on:onclick="goMap" :iconfont="dingwei" title="商家定位"></index-manage-item>
				<index-manage-item v-if="!seller.is_platform_store" v-on:onclick="goDeposit" :iconfont="baozhengjin" title="店铺保证金"></index-manage-item>
				
				<index-manage-item v-on:onclick="gocamerList" :iconfont="camera" color="#fb6c4a" title="摄像头管理"></index-manage-item>
				<!-- <index-manage-item v-on:onclick="goSellerStatisticsGeneral" :iconfont="tongji" title="店铺统计"></index-manage-item> -->

				<index-manage-item v-if="store_info.storeclass_id==7||store_info.storeclass_id==10||store_info.storeclass_id==3||store_info.storeclass_id==6" v-on:onclick="goCookAdd" :iconfont="iconCookGuanli" title="厨师管理"></index-manage-item>
				
				<!-- <index-manage-item v-on:onclick="goBanquet('SellerBanquetList')" :iconfont="iconbanquet" title="宴席订单"></index-manage-item>				 -->
				<index-manage-item v-on:onclick="goUpGrade" :iconfont="iconUpGrade" 
					title='店铺申请'></index-manage-item>
				<index-manage-item v-on:onclick="goAccount" :iconfont="qianyue" title="银联签约"></index-manage-item>
			</div>
		</div>
		<div class="manage-wrapper" style="margin-bottom: 5rem;">
			<div>
				<index-manage-item v-on:onclick="gojinhuoList" :iconfont="jinhuo" color="#fb6c4a" title="进货台账"></index-manage-item>
				<index-manage-item v-on:onclick="goSellerInviter" :iconfont="shequ" title="社区团"></index-manage-item>
				<index-manage-item v-on:onclick="goSellerStatisticsGeneral(1)" :iconfont="tongji" title="统计分析"></index-manage-item>
			</div>
		</div>

		<div class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeIndex' }" id="home_index">
					<router-link :to="{ name: 'HomeIndex' }" class="item">
						<i class="iconfont ifont icon-homepage" />
						<span class="text">返回商城</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'SellerOrderList' }" id="seller_order">
					<router-link :to="{ name: 'SellerOrderList' }" class="item">
						<i class="iconfont ifont icon-quanbudingdan1" />
						<span class="text">订单管理</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'SellerIndex' }" id="seller_index">
					<router-link :to="{ name: 'SellerIndex' }" class="item">
						<i class="iconfont ifont icon-people" />
						<span class="text">店铺中心</span>
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import IndexInfoItem from './IndexInfoItem';
import IndexOrderItem from './IndexOrderItem';
import IndexManageItem from './IndexManageItem';
import { getSellerInfo, getSellerSign, getUpGrade } from '../../../api/seller';
import { getMemberInformation } from '../../../api/memberConsult';
import { mapState, mapMutations } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

export default {
	name: 'Index',
	data() {
		return {
			manageNumber:0,    //自选管理
			store_info: {},
			seller_info: {},
			statics: {},
			home_selected: 'SellerIndex',
			iconOblige: require('@/assets/image/icon2/index-daifu.png'),
			iconWaitOblige: require('@/assets/image/icon2/index-daifa.png'),
			iconWaitReceiv: require('@/assets/image/icon2/icon-daishou.png'),
			iconReturns: require('@/assets/image/icon2/index-daifu.png'),
			shangpin: require('@/assets/image/icon2/index-shangpin.png'),
			fenlei: require('@/assets/image/icon2/index-dianpu.png'),
			peisong: require('@/assets/image/icon2/index-peisong.png'),
			baozhengjin: require('@/assets/image/icon2/index-baozhengjin.png'),
			xianxia: require('@/assets/image/icon2/index-xianxia.png'),
			camera: require('@/assets/image/icon2/index-shexiangtou.png'),
			jinhuo: require('@/assets/image/icon2/icon-jinhuo.png'),
			shequ: require('@/assets/image/icon2/index-shequ.png'),
			tongji: require('@/assets/image/icon2/index-tongji.png'),
			pingjia: require('@/assets/image/icon2/index-pingjia.png'),
			qianyue: require('@/assets/image/icon2/index-qianyue.png'),
			hegezheng: require('@/assets/image/icon2/index-hegezheng.png'),
			dingwei: require('@/assets/image/icon2/index-dingwei.png'),
			baofei: require('@/assets/image/icon2/index-baofei.png'),
			xukezheng: require('@/assets/image/icon2/index-xukezheng.png'),
			tousu: require('@/assets/image/icon2/index-tousu.png'),
			zixun: require('@/assets/image/icon2/index-zixun.png'),
			iconTuikuan: require('@/assets/image/icon2/icon-tuikuan-s.png'),
			iconTuihuo: require('@/assets/image/icon2/icon-tuihuo-s.png'),
			iconMessage: require('@/assets/image/icon2/icon-message2.png'),
			iconCookGuanli: require('@/assets/image/icon2/icon-cook-guanli.png'),
			iconcuxiao:require('@/assets/image/icon2/icon-cuxiao.png'),
			iconbanquet:require('@/assets/image/icon2/icon-banquet-seller.png'),
			iconUpGrade:require('@/assets/image/icon2/icon-supply-chain.png'),
			iconJoin:require('@/assets/image/icon2/icon-join.png'),
			
		};
	},
	components: {
		IndexInfoItem,
		IndexManageItem,
		IndexOrderItem
	},
	created: function() {
		resetRem();
		if (this.isOnline) {
			getSellerInfo()
				.then(response => {
					if (response && response.result) {
						this.seller_info = response.result.seller_info;
						this.store_info = response.result.store_info;
						this.statics = response.result.statics;						
						this.sellerEditUpGrade(response.result.seller_info.supply_chain);
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
			
			// 获取 登录用户 的 消息信息 小红点
			getMemberInformation().then(res=>{
				// console.log(res);
				this.manageNumber = res.result.seller_consult_cont;
			})
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy: function() {
		resumeRem();
	},
	computed: {
		...mapState({
			isOnline: state => state.seller.isOnline,
			seller: state => state.seller.info,
		}),
		sellername() {
			let title = '登录/注册';
			if (this.isOnline) {
				if (this.seller && typeof this.seller !== 'undefined' && JSON.stringify(this.seller) !== '{}') {
					title = this.seller.seller_name;
				}
			}
			return title;
		}
	},
	methods: {
		...mapMutations({
			memberUpdate: 'memberUpdate',
			sellerEditUpGrade:'sellerEditUpGrade'
		}),
		showLogin() {
			this.$router.push({ name: 'HomeSellerLogin' });
		},
		// 店铺资金 普通店铺显示
		goMoney() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerTransportList' });
			} else {
				this.showLogin();
			}
		},
		// 店铺保证金 普通店铺显示
		goDeposit() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerDeposit' });
			} else {
				this.showLogin();
			}
		},
		// 店铺设置
		goSettingIndex() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerSettingIndex' });
			} else {
				this.showLogin();
			}
		},
		goNews() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerNoticeList' });
			} else {
				this.showLogin();
			}
		},
		// 银联签约
		goAccount() {
			getSellerSign()
				.then(res => {
					this.$router.push({ name: 'HomeUrl', params: { url: res } });
				})
				.catch(e => {
					this.$router.push({ name: 'HomeUrl', params: { url: e } });
				});
			// return false;
			// if (this.isOnline) {
			//   this.$router.push({ name: 'SellerAccount' })
			// } else {
			//   this.showLogin()
			// }
		},
		// 合格证
		goQualify() {
			this.$router.push({ name: 'SellerQualify' });
		},
		// 商品管理
		goGoodsonline() {
			if (this.isOnline) {
				var str = '3,4,7,8,9,10,47,48,49,50';
				(str.indexOf(this.store_info.storeclass_id) != -1) ? this.$router.push({ name: 'SellerFoodsonline' }) : this.$router.push({ name: 'SellerGoodsonline' })
			} else {
				this.showLogin();
			}
		},
		//摄像头管理
		gocamerList() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerCamm' });
			} else {
				this.showLogin();
			}
		},
		//进货台账
		gojinhuoList() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerJinhuo' });
			} else {
				this.showLogin();
			}
		},
		// 商家聊天列表
		goSellerChatList() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerChatList' });
			} else {
				this.showLogin();
			}
		},
		// 订单列表
		goSellerorder() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerOrderList' });
			} else {
				this.showLogin();
			}
		},
		// 退款管理
		goSellerRefundList(refundType) {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerRefundList', query: { refund_type: refundType } });
			} else {
				this.showLogin();
			}
		},
		// 评价管理
		goSellerEvaluateList() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerEvaluateList' });
			} else {
				this.showLogin();
			}
		},

		// 订单结算
		goSellerbill() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerBillList' });
			} else {
				this.showLogin();
			}
		},
		// 店铺统计
		goSellerStatisticsGeneral(n) {
			if (this.isOnline) {
				if( n == 1){
					this.$router.push({ name: 'SellerEcharts' });
				}else{
					this.$router.push({ name: 'SellerStatisticsGeneral' });
				}
			} else {
				this.showLogin();
			}
		},
		// 咨询管理
		goConsult() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerConsultList' });
			} else {
				this.showLogin();
			}
		},
		// 店铺分类
		goGoodsclass() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerGoodsClassList' });
			} else {
				this.showLogin();
			}
		},
		// 线下销售
		goOfflineSales() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerOfflineSales' });
			} else {
				this.showLogin();
			}
		},
		// 虚拟订单
		// goVrorder () {
		//   if (this.isOnline) {
		//     this.$router.push({ name: 'SellerVrOrderList' })
		//   } else {
		//     this.showLogin()
		//   }
		// },
		// 店铺分销
		goSellerInviter() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerInviter' });
			} else {
				this.showLogin();
			}
		},
		// 商家定位
		goMap() {
			this.$router.push({ name: 'SellerMap' });
		},
		// 报销消费
		goWaste() {
			this.$router.push({ name: 'SellerReimbursement' });
		},
		// 厨师管理
		goCookAdd() {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeCookList' });
			} else {
				this.showLogin();
			}
		},

		// 许可证
		golicense(){
			if (this.isOnline) {
				this.$router.push({ name: 'Sellerlicense' });
			} else {
				this.showLogin();
			}
		},
		
		// 促销活动
		goPromotion() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerPromotionIndex' });
			}else{
				this.showLogin();
			}
		},
		
		// 店铺申请
		goUpGrade(){
			if (this.isOnline) {
				this.$router.push(
					{ 
						name: 'SellerApplysecurity' ,
						params:{
							sabrand_id:this.store_info.sabrand_id,
							cold:this.store_info.leng
						}
					}
				);
			}else{
				this.showLogin();
			}
		},
		
		// 完善信息
		goPerfext1(){
			if (this.isOnline) {
				var id = this.store_info.storeclass_id;
				var storeStatus = !( id== '32'|| id == '54'||id == '41'||id == '42');
				let name = storeStatus?'SellerPerfect1':'SellerPerfect1Self';
				this.$router.push( { name: name } );
			}else{
				this.showLogin();
			}
		},
		
		goBanquet(name){
			if (this.isOnline) {
				this.$router.push({ name: name });
			} else {
				this.showLogin();
			}
		}
	}
};
</script>

<style scoped lang="scss">
// .bgUrl {
// 	background: url('../../../assets/image/qualify/qualify.png');
// 	background-size: 0.78rem;
// 	background-repeat: no-repeat;
// 	background-position: center 0.6rem;
// }
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: rgba(244, 245, 247, 1);
	// height: 100vh;
	.top-wrapper {
		height: 15.83rem;
		background: rgba(98, 103, 113, 1);
		border-bottom-left-radius: 10%;
		border-bottom-right-radius: 10%;
		.nav-back {
			margin: 1.04rem 0 1.74rem 1.3rem;
			img {
				width: 1.74rem;
				height: 1.74rem;
			}
		}
		.nav-list {
			display: flex;
			padding: 0 1.3rem 0 1.74rem;
			.top-info-wrapper {
				display: flex;
				.avatar-wrapper {
					.avatar {
						width: 4.35rem;
						height: 4.35rem;
						border-radius: 0.43rem;
					}
					margin-right: 0.87rem;
				}
				.info-wrap {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.sellername {
						font-size: 1.57rem;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}
					.sellerid {
						font-size: 1.04rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}
			}
			.nav-item {
				img {
					width: 1.57rem;
					height: 1.65rem;
				}
			}
			#right-nav-item {
				margin-left: auto;
				margin-right: 1.3rem;
			}
		}
	}
	.order-wrapper {
		margin: -5.78rem 0.87rem 0;
		background-color: #fff;
		border-radius: 0.7rem;
		padding: 1.3rem 1.3rem 1.04rem;
		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item-title {
				font-size: 1.22rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(22, 22, 22, 1);
			}
			div {
				display: flex;
				align-items: center;
				.order-subtitle {
					font-size: 1.04rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(111, 111, 111, 1);
				}
				img {
					width: 0.87rem;
					height: 0.87rem;
				}
			}
		}
		.order-list {
			margin-top: 1.3rem;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.order-item {
				width: 20%;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.manage-wrapper {
		box-shadow: 0rem 0rem 0.86rem 0.56rem rgba(242, 242, 242, 0.54);
		border-radius: 0.69rem;
		background: #fff;
		margin: 0.8rem;
		margin: 0.8rem 0.8rem 0;
		padding-top: 1.7rem;
		.manage-title {
			margin: 1.3rem;
			font-size: 1.21rem;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(22, 22, 22, 1);
		}
		div {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
	}
}
.item-wrap {
	.item {
		color: #666;
	}
}

.ifont {
	font-size: 2.4rem;
}

.common-footer-wrap {
	height: 2.5rem;
	.common-footer {
		height: 4.9rem;
		// line-height: 2.5rem;
		background: #fbfbfb;
		border-top: 1px solid #efefef;
		z-index: 99;
		.item-wrap {
			padding: 0.2rem 0;
			.item {
				color: #666;
				.iconfont {
					display: block;
					width: 2.9rem;
					height: 2.9rem;
					line-height: 1.9rem;
					font-size: 2.9rem;
					text-align: center;
					margin: 0 auto;

					display: block;
					width: 2.2rem;
					height: 2.2rem;
					line-height: 2.6rem;
					font-size: 2.2rem;
					text-align: center;
					margin: 0 auto;
				}
				.text {
					font-size: 1.1rem;
					line-height: 0.6rem;

					font-size: 1.1rem;
					line-height: 2.2rem;
				}
			}
		}
		.item-wrap.is-selected {
			background: none;
		}
		.item-wrap.active {
			background: none;
			.item {
				color: #e93b3d;
			}
		}
	}
}
</style>
