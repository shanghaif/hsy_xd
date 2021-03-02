<template>
	<div class="container">
		<div id="stadus-bar"></div>
		<div class="top-wrapper">
			<div class="nav-item">
				<!-- <span class="" @click="goRegister()"><img src="../../../assets/image/icon2/icon-store.png" alt="" /></span> -->
				<!-- <span class="" v-if="config.points_isuse === '1' && config.points_signin_isuse === '1'" @click="$router.push({ name: 'MemberPointSignin' })"> -->					
				<span class="" v-if="config.points_isuse === '1' && config.points_signin_isuse === '1'" @click="fun_RouterPush( { name : 'MemberPointSignin'} )">
					<img src="../../../assets/image/icon2/icon-regist.png" alt="" />
				</span>
				<span class="" @click="goSetting"><img src="../../../assets/image/icon2/icon-set.png" alt="" /></span>
				<span class="" @click="goNews()"><img src="../../../assets/image/icon2/icon-message.png" alt="" /></span>
			</div>

			<!-- <div class="nav-item" id="left-nav-item" @click="goSetting"><i class="nav-icon iconfont">&#xe607;</i></div>
			<div class="nav-item" id="right-nav-item" @click="goNews()">
				<i class="nav-icon iconfont">&#xe6ce;</i>
				<span v-if="0"></span>
			</div> -->
			<div class="top-info-wrapper">
				<div class="avatar-wrapper" @click="goProfileInfo">
					<img class="avatar" v-bind:src="user.member_avatar + '?' + time" v-if="isOnline && user && user.member_avatar" />
					<img v-else src="" alt="">
				</div>
				<div class="right-info">
					<label class="nickname" style="-webkit-box-orient:vertical" @click="goProfileInfo">{{ nickname }} </label>
					<div class="info-wrapper">
						<span>ID : {{user.member_id}}&nbsp;&nbsp;&nbsp;</span>
						<label>积分：</label>
						<span class="info-item" @click="goScoreList">{{ getScore }}分</span>
						<img src="../../../assets/image/icon2/icon-white-right.png" alt="" />
					</div>
				</div>
			</div>
			<!-- <div class="info-wrapper">
				<div class="info-item" @click="goScoreList">{{ getScore }}积分</div>
			</div> -->
			<div class="top-menu-wrap">
				<p class="menu-item" @click="goFavourite('1')">
					<span>{{user.favorites_goods_count}} | {{user.favorites_menu_count}}</span>
					<span>我的收藏</span>
				</p>
				<p class="menu-item" @click="goFavouriteStore()">
					<span>{{user.favorites_store_count}}</span>
					<span>关注店铺</span>
				</p>
				<p class="menu-item" @click="goBrowse()">
					<span>{{user.favorites_browse_count}}</span>
					<span>浏览记录</span>
				</p>
			</div>
		</div>
		<div class="order-wrapper">
			<div class="order-header" @click="goOrder">
				<!-- <i class="order-header-icon iconfont">&#xe6de;</i> -->
				<label class="item-title">我的订单</label>
				<div>
					<label class="order-subtitle">查看全部订单</label>
					<img src="../../../assets/image/icon2/icon-right.png" alt="" />
				</div>
			</div>
			<div class="order-list">
				<index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_new"
					:iconfont="iconOblige"
					title="待付款"
					:orderNumber="user.order_nopay_count"
				></index-order-item>
				<index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_pay"
					:iconfont="iconWaitOblige"
					title="待发货"
					:orderNumber="user.order_noship_count"
				></index-order-item>
				<index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_send"
					:iconfont="iconWaitReceiv"
					title="待收货"
					:orderNumber="user.order_noreceipt_count"
				></index-order-item>
				<index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_noeval"
					:iconfont="iconWaitEvalu"
					title="待评价"
					:orderNumber="user.order_noeval_count"
				></index-order-item>
				<!-- <index-order-item
					class="order-item"
					testAttr="MemberOrderList"
					id="state_noeval"
					:iconfont="iconReturns"
					title="退货退款"
					:orderNumber="user.order_noeval_count"
				></index-order-item> -->
			</div>
			<!-- <div class="order-header-item">
				<label class="order-subtitle">查看全部订单</label>
				<i class="indicator iconfont">&#xe650;</i>
			</div> -->
			<!-- <div class="order-header-line"></div> -->
		</div>
		<div class="manage-wrapper">
			<div>
				<index-manage-item v-on:onclick="goAddress" :iconfont="iconAddress" title="收货地址"></index-manage-item>
				<index-manage-item v-on:onclick="goArrivalnotice()" :iconfont="iconDaohuo"  title="到货通知"></index-manage-item>
				<index-manage-item v-on:onclick="goReturn" :iconfont="iconTuihuo" title="退货管理"></index-manage-item>
				<index-manage-item v-on:onclick="goRefund" :iconfont="iconTuikuan" title="退款管理"></index-manage-item>
				<index-manage-item v-on:onclick="goInvoice" :iconfont="iconInvoice" title="发票管理"></index-manage-item>
				<index-manage-item v-on:onclick="goIsLoginPush('MemberDesk')" :iconfont="iconbanquet" title="订桌记录"></index-manage-item>
			</div>
		</div>

		<div class="manage-wrapper">
			<div>
				<index-manage-item v-on:onclick="fun_RouterPush({ name: 'MemberInformList' })" :iconfont="iconTousu" title="举报商品"></index-manage-item>
				<index-manage-item v-on:onclick="fun_RouterPush({ name: 'MemberReportList' })" :iconfont="iconJubao" title="举报商家"></index-manage-item>
				<index-manage-item v-on:onclick="fun_RouterPush({ name: 'MemberComplaintList' })" :iconfont="iconReport" title="投诉管理"></index-manage-item>
				<index-manage-item :manageNumber="manageNumber" v-on:onclick="fun_RouterPush({ name: 'MemberConsultList' })" :iconfont="iconRefer" title="咨询管理"></index-manage-item>				
			</div>
		</div>

		<div class="manage-wrapper">
			<div>
				<index-manage-item v-on:onclick="fun_RouterPush({ name: 'MemberAuth' })" :iconfont="iconReal" title="实名认证"></index-manage-item>
				<index-manage-item v-if="isAudit==2"  v-on:onclick="goMembeMenuGuanli" :iconfont="iconCookAdd" title="厨师管理"></index-manage-item>	
				<index-manage-item v-if="isAudit==0 || isAudit==1" v-on:onclick="goMembeAddCook" :iconfont="iconCookAdd" title="厨师入驻"></index-manage-item>			
				<index-manage-item
					v-if="config.inviter_open === '1'"
					v-on:onclick="goMemberInviterManage"
					:iconfont="iconApplyGroup"
					color="#ea51df"
					:title="user.inviter_state == '1' ? '社区团管理' : '申请社区团'"
				></index-manage-item>
				<index-manage-item v-if="user.store_id" v-on:onclick="goSellerInfo" :iconfont="iconJoin" title="商家管理"></index-manage-item>
				<index-manage-item v-else v-on:onclick="goRegister" :iconfont="iconJoin" title="商家入驻"></index-manage-item>
			</div>
		</div>

		<div class="manage-wrapper">
			<!-- <div class="manage-title">工具服务</div> -->
			<div>
				<!-- <index-manage-item :iconfont="iconHelp" title="帮助中心"></index-manage-item> -->
				
				<index-manage-item v-on:onclick="goFriendList" :iconfont="iconFriens" title="我的好友"></index-manage-item>
				<index-manage-item v-on:onclick="goMemberChatList" :iconfont="iconMessage" title="聊天列表"></index-manage-item>
				<!-- <index-manage-item v-else v-on:onclick="goMembeMenuGuanli" :iconfont="iconMenuGuanli" title="菜谱管理"></index-manage-item> -->
				<!-- <index-manage-item v-on:onclick="goIsLoginPush('MemberBanquetList')" :iconfont="iconbanquet" title="宴席订单"></index-manage-item> -->
			</div>
			<!-- <index-manage-item v-on:onclick="$router.push({ name: 'MemberInformList' })" iconfont="&#xe63f;" color="#45cf79" title="举报管理"></index-manage-item>
			<index-manage-item v-on:onclick="$router.push({ name: 'MemberComplaintList' })" iconfont="&#xe67a;" color="#45cf79" title="投诉管理"></index-manage-item>
			<index-manage-item v-on:onclick="goFavourite()" iconfont="&#xe6c1;" color="#45cf79" title="收藏管理"></index-manage-item>

			<index-manage-item v-on:onclick="$router.push({ name: 'MemberConsultList' })" iconfont="&#xe6cf;" color="#45cf79" title="咨询管理"></index-manage-item>

			<index-manage-item v-on:onclick="goAddress" iconfont="&#xe6d3;" color="#800000" title="收货地址"></index-manage-item>
			<index-manage-item v-on:onclick="goArrivalnotice()" iconfont="&#xe6c4;" color="#800000" title="到货通知"></index-manage-item>

			<index-manage-item v-on:onclick="goInvoice" iconfont="&#xe631;" color="#800000" title="发票管理"></index-manage-item>
			<index-manage-item v-on:onclick="goReturn" iconfont="&#xe67a;" color="#800000" title="退货管理"></index-manage-item>

			<index-manage-item v-on:onclick="goRefund" iconfont="&#xe67a;" color="#008000" title="退款管理"></index-manage-item>
			<index-manage-item v-on:onclick="goVrOrder" iconfont="&#xe6de;" color="#008000" title="虚拟订单"></index-manage-item>
			<index-manage-item v-on:onclick="$router.push({ name: 'MemberVrRefundList' })" iconfont="&#xe67a;" color="#008000" title="虚拟退款"></index-manage-item>
			<index-manage-item v-on:onclick="goBonusreceive()" iconfont="&#xe67b;" color="#008000" title="红包记录"></index-manage-item>

			<index-manage-item
				v-if="config.points_isuse === '1' && config.points_signin_isuse === '1'"
				v-on:onclick="$router.push({ name: 'MemberPointSignin' })"
				iconfont="&#xe6e6;"
				color="#000080"
				title="我要签到"
			></index-manage-item>
			<index-manage-item v-on:onclick="goPoint" iconfont="&#xe677;" color="#000080" title="我的积分"></index-manage-item>
			<index-manage-item v-on:onclick="goFriendList" iconfont="&#xe6f0;" color="#000080" title="我的好友"></index-manage-item>
			<index-manage-item v-on:onclick="goBrowse()" iconfont="&#xe691;" color="#000080" title="浏览记录"></index-manage-item>

			<index-manage-item v-on:onclick="$router.push({ name: 'MemberAuth' })" iconfont="&#xe69e;" color="#ea51df" title="实名认证"></index-manage-item>
			<index-manage-item v-on:onclick="goRegister" iconfont="&#xe644;" color="#ea51df" title="商家入驻"></index-manage-item>
			<index-manage-item v-if="user.store_id" v-on:onclick="goSellerInfo" iconfont="&#xe62d;" color="#ea51df" title="商家管理"></index-manage-item>
			<index-manage-item
				v-if="config.inviter_open === '1'"
				v-on:onclick="goMemberInviterManage"
				iconfont="&#xe6e6;"
				color="#ea51df"
				:title="user.inviter_state == '1' ? '社区团管理' : '申请社区团'"
			></index-manage-item> -->
		</div>
	</div>
</template>

<script>
import IndexInfoItem from './IndexInfoItem';
import IndexOrderItem from './IndexOrderItem';
import IndexManageItem from './IndexManageItem';
import { mapState, mapActions } from 'vuex';
import { getMemberIndex } from '../../../api/member';
import { getMemberInformation } from '../../../api/memberConsult';
import { checkInviter } from '../../../api/memberInviter';
import { Toast } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import { cookShenhe } from '@/api/homeMenu';
export default {
	name: 'MemberIndex',
	data() {
		return {
			manageNumber: 0,   // 咨询管理 条数
			user: {},
			time: '',
			orderCount: {},
			isShow: true,
			isAudit:0,
			/* -----------我的订单----satrt */
			iconOblige: require('@/assets/image/icon2/icon-oblige.png'),
			iconWaitOblige: require('@/assets/image/icon2/icon-wait-oblige.png'),
			iconWaitReceiv: require('@/assets/image/icon2/icon-wait-receiv.png'),
			iconWaitEvalu: require('@/assets/image/icon2/icon-wait-evalu.png'),
			iconReturns: require('@/assets/image/icon2/icon-returns.png'),
			/* -----我的订单------end */
			/* ---工具服务----start */
			iconReport: require('@/assets/image/icon2/icon-report.png'),
			iconTousu: require('@/assets/image/icon2/icon-tousu.png'),
			iconJubao: require('@/assets/image/icon2/icon-jubao.png'),
			iconRefer: require('@/assets/image/icon2/icon-refer.png'),
			iconInvoice: require('@/assets/image/icon2/icon-Invoice.png'),
			iconReal: require('@/assets/image/icon2/icon-real.png'),
			iconAddress: require('@/assets/image/icon2/icon-address.png'),
			iconDaohuo: require('@/assets/image/icon2/icon-daohuo.png'),
			// iconHelp: require('@/assets/image/icon2/icon-help.png'),
			iconJoin: require('@/assets/image/icon2/icon-join.png'),
			iconApplyGroup: require('@/assets/image/icon2/icon-apply-group.png'),
			iconTuihuo: require('@/assets/image/icon2/icon-tuihuo.png'),
			iconTuikuan: require('@/assets/image/icon2/icon-tuikuan.png'),
			iconFriens: require('@/assets/image/icon2/icon-friends.png'),
			iconMessage: require('@/assets/image/icon2/icon-message2.png'),
			iconCookAdd: require('@/assets/image/icon2/icon-cook-enter.png'),
			iconMenuGuanli:require(('@/assets/image/icon2/icon-menu-guanli.png')),		
			iconbanquet:require('@/assets/image/icon2/icon-banquet-member.png')
			/* ----工具服务---- */
		};
	},
	components: {
		IndexOrderItem,
		IndexInfoItem,
		IndexManageItem
	},
	created: function() {
		this.time = new Date().getTime();
		this.utils.clearCookie('user_info');
		this.utils.clearCookie('key');
		this.fetchConfig({}).then(
			response => {},
			error => {
				Toast(error.message);
			}
		);
		if (this.isOnline) {
			getMemberIndex().then(
				response => {
					if (response && response.result.member_info) {
						this.user = response.result.member_info;
					}
				},
				error => {}
			);
			// 获取 登录用户 的 消息信息 小红点
			getMemberInformation().then(res=>{
				// console.log(res);
				this.manageNumber = res.result.user_consult_cont;
			})
			
			cookShenhe().then(res => {
				// Toast(res.message)
				if(res.result.status==0) {
					// 审核中
					// Toast('审核中')
					this.isAudit = 1
				} else if(res.result.status==1) {
					this.isAudit = 2
					// 审核通过
					// Toast('审核通过')
					// this.$router.go(-1)
				} else if(res.result.status==2) {
					//驳回
					// Toast('信息驳回，请重新填写')
					this.isAudit = 0
				} else {
					this.isAudit = 0
				}				
			});
		}
	},
	mounted() {
		resetRem();
		// let html = document.documentElement;
		// let font = html.style.fontSize;
		// let arr = '';
		// arr = parseInt(font.split('px'));
		// // 手机端专用
		// document.getElementById('top-bg').style.height = arr * 12.78 + plus.navigator.getStatusbarHeight() + 'px';
	},
	computed: {
		...mapState({
			isOnline: state => state.member.isOnline,
			config: state => state.config.config
		}),

		nickname() {
			let title = '登录/注册';
			if (this.isOnline) {
				if (this.user && typeof this.user !== 'undefined' && JSON.stringify(this.user) !== '{}') {
					if (this.user.member_truename) {
						title = this.user.member_truename;
					} else if (this.user.member_name) {
						title = this.user.member_name;
					}
				}
			}
			return title;
		},
		getScore() {
			let score = '0';
			if (this.isOnline && this.user.member_points) {
				score = this.user.member_points;
			}
			return score;
		},
		// 预存款可用金额 通过store 进行获取
		getAvailablePredeposit() {
			let availablePredeposit = '0.00';
			if (this.isOnline && this.user.available_predeposit) {
				availablePredeposit = this.user.available_predeposit;
			}
			return availablePredeposit;
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapActions({
			fetchConfig: 'fetchConfig'
		}),
		// 判断是否登录 如果登录了 则正常跳转
		fun_RouterPush(obj){
			if (this.isOnline) {
				this.$router.push( obj );
			} else {
				this.showLogin();
			}
		},
		showLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
		},
		goScoreList() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberPointList', query: { index: 0 , integralAll : this.user.member_points } });
			} else {
				this.showLogin();
			}
		},
		goOrder() {
			if (this.isOnline) {
				this.$router.push({
					name: 'MemberOrderList'
				});
			} else {
				this.showLogin();
			}
		},
		goProfileInfo() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberProfileSet' });
			} else {
				this.showLogin();
			}
		},
		goSetting() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberSetting' });
			}else{
				this.showLogin();
			}
		},
		// 消息通知
		goNews() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberNoticeList' });
			} else {
				this.showLogin();
			}
		},
		// 我的关注
		goFavourite(status) {
			if (this.isOnline) {
				console.log(status,'status')
				this.$router.push({ name: 'MemberFavorite', query: { status: status } });
				// this.$router.push({ name: 'MemberFavorite' });
			} else {
				this.showLogin();
			}
		},
		// 关注店铺
		goFavouriteStore() {
			if (this.isOnline) {
				this.$router.push({ name: 'FavoriteStoreNew' });
				// this.$router.push({ name: 'MemberFavorite' });
			} else {
				this.showLogin();
			}
		},
		// 我的地址
		goAddress() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberAddressList' });
			} else {
				this.showLogin();
			}
		},
		// 我的退款
		goReturn() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberReturnList' });
			} else {
				this.showLogin();
			}
		},
		// 我的退货
		goRefund() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberRefundList' });
			} else {
				this.showLogin();
			}
		},
		goRecharge() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberRechargeList' });
			} else {
				this.showLogin();
			}
		},
		// 我的优惠券
		goVoucher() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberVoucherList', query: { index: 0 } });
			} else {
				this.showLogin();
			}
		},
		// 用户积分记录
		goPoint() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberPointList' });
			} else {
				this.showLogin();
			}
		},
		// 用户积分兑换的商品
		goPointsOrderList() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberPointsOrderList' });
			} else {
				this.showLogin();
			}
		},
		goBonus() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberWithdrawList' });
			} else {
				this.showLogin();
			}
		},
		goPredeposit() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberPredepositList' });
			} else {
				this.showLogin();
			}
		},
		// 我的好友列表
		goFriendList() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberFriendList' });
			} else {
				this.showLogin();
			}
		},
		// 商家入驻
		goRegister() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerJoininNew' });
			} else {
				this.showLogin();
			}
		},
		// 聊天列表
		goMemberChatList() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberChatList' });
			} else {
				this.showLogin();
			}
		},
		// 我的订单评价
		goEvaluateList() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberEvaluateList' });
			} else {
				this.showLogin();
			}
		},
		// 发票管理
		goInvoice() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberInvoiceList' });
			} else {
				this.showLogin();
			}
		},
		// 跳转卖家管理中心
		goSellerInfo() {
			if (this.isOnline) {
				this.$router.push({ name: 'SellerIndex' });
			} else {
				this.showLogin();
			}
		},
		// 分销管理中心
		goMemberInviterManage() {
			if (this.isOnline) {
				checkInviter()
					.then(res => {
						this.$router.push({ name: 'MemberInviterManage' });
					})
					.catch(err=> {
						if( err.message == '请先到实名认证填写社区团名称'){
							Toast(err.message);
							this.$router.push({ name: 'MemberAuth',params:{Application:true} });
						}else{
							Toast(err.message);
						}
					});
			} else {
				this.showLogin();
			}
		},
		// 虚拟订单
		goVrOrder() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberVrOrderList' });
			} else {
				this.showLogin();
			}
		},
		// 活动记录
		goMarketmanagelog() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberMarketmanagelog' });
			} else {
				this.showLogin();
			}
		},
		// 红包领取记录
		goBonusreceive() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberBonusreceive' });
			} else {
				this.showLogin();
			}
		},
		// 砍价活动
		gBargain() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberBargainlist' });
			} else {
				this.showLogin();
			}
		},
		// 到货通知
		goArrivalnotice() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberArrivalnotice' });
			} else {
				this.showLogin();
			}
		},
		// 浏览历史
		goBrowse() {
			if (this.isOnline) {
				this.$router.push({ name: 'MemberBrowseList' });
			} else {
				this.showLogin();
			}
		},
		// 厨师入驻
		goMembeAddCook() {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeAddCook',query: { from: 'myIndex' } });
			} else {
				this.showLogin();
			}
		},
		// 菜谱管理
		goMembeMenuGuanli() {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeChefSetting' });
				// this.$router.push({ name: 'HomeMenuManage' });
			} else {
				this.showLogin();
			}
		},
		
		// 去宴请订单
		goIsLoginPush(name){
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
.container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: rgba(244, 245, 247, 1);
	padding-bottom: 10rem;
	.top-wrapper {
		// display: flex;
		// flex-direction: column;
		// justify-content: flex-start;
		// align-items: stretch;
		// height: 9rem;
		padding-bottom: 5.4rem;
		// height: 20.87rem;
		// background: linear-gradient(90deg, #e93b3d, #e93b3d);
		background: url('../../../assets/image/icon2/my-background.png') center center/100% 100% no-repeat;
		.top-info-wrapper {
			// flex: 1;
			// width: 100%;
			margin-left: 1.74rem;
			display: flex;
			// flex-direction: column;
			// justify-content: flex-start;
			align-items: center;
			.avatar-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				// background-color: #fff;
				border: 1px solid #fff;
				margin-right: 0.87rem;
				// margin-top: 1rem;
				.avatar {
					width: 4.35rem;
					height: 4.35rem;
					border-radius: 50%;
				}
			}
			.right-info {
				display: flex;
				flex-direction: column;
				.nickname {
					margin-bottom: 0.43rem;
					font-size: 1.57rem;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
				.info-wrapper {
					display: flex;
					align-items: center;
					font-size: 1.04rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					span {
						&:nth-child(1) {
							margin-right: 1rem;
						}
					}
					.info-item {
						margin-right: 0.35rem;
					}
					label {
					}
					img {
						width: 0.87rem;
						height: 0.87rem;
					}
				}
			}
		}
		.nav-item {
			padding: 1.17rem 0 1.09rem 0;
			// position: absolute;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			// top: 0;
			span {
				// width: 0.4rem;
				// height: 0.4rem;
				// background-color: #f0f2f5;
				// border-radius: 50%;
				// position: absolute;
				// top: 0.5rem;
				// right: 0.5rem;
				margin-right: 1.74rem;
				img {
					width: 1.57rem;
					height: 1.65rem;
				}
			}
		}
		.top-menu-wrap {
			padding: 1.74rem 2.61rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.menu-item {
				text-align: center;
				span {
					display: block;
					font-size: 1.04rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					&:first-child {
						margin-bottom: 0.17rem;
						font-size: 1.57rem;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
					}
				}
			}
		}
	}
	.order-wrapper {
		margin: -4.4rem 0.87rem 0;
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
	// #left-nav-item {
	// 	left: 0;
	// }
	// #right-nav-item {
	// 	right: 0;
	// }
	// .nav-icon {
	// 	width: 2rem;
	// 	height: 2rem;
	// 	line-height: 2rem;
	// 	text-align: center;
	// 	font-size: 1rem;
	// 	color: #fff;
	// }

	// .order-header {
	// 	height: 2rem;
	// 	position: relative;
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content: space-around;
	// 	align-content: stretch;
	// 	background-color: #fff;
	// }
	// .order-header-item {
	// 	flex: 1;
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: center;
	// }
	// #order-item-left {
	// 	justify-content: flex-start;
	// 	margin-left: 1rem;
	// }
	// #order-item-right {
	// 	justify-content: flex-end;
	// }
	// .order-header-line {
	// 	position: absolute;
	// 	height: 1px;
	// 	left: 1rem;
	// 	bottom: 0;
	// 	right: 1rem;
	// 	background-color: #e8eaed;
	// }
	// .item-title {
	// 	font-size: 0.7rem;
	// 	color: #333;
	// }
	// .order-header-icon {
	// 	width: 1rem;
	// 	height: 1rem;
	// 	line-height: 1rem;
	// }
	// .order-header-title {
	// 	margin-left: 0.4rem;
	// }
	// .indicator {
	// 	width: 0.6rem;
	// 	height: 0.6rem;
	// 	margin-left: 1rem;
	// 	margin-right: 1rem;
	// }
	// .order-subtitle {
	// 	font-size: 0.6rem;
	// 	color: #7c7f88;
	// }
	// .order-wrapper {
	// 	height: 4rem;
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content: space-between;
	// 	align-items: stretch;
	// 	background-color: #fff;
	// }
	// .order-item {
	// 	flex: 1;
	// }
	// .bottom-wrapper {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: flex-start;
	// 	align-items: stretch;
	// 	margin-bottom: 3rem;
	// }
	.manage-wrapper {
		box-shadow: 0rem 0rem 0.86rem 0.56rem rgba(242, 242, 242, 0.54);
		border-radius: 0.69rem;
		background: #fff;
		// margin: 0.8rem;
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
</style>
