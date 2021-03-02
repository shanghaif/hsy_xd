<template>
	<div class="container order-detail">
		<!-- header -->
		<head-title :title="title"></head-title>
		<div class="content">
			<div class="top-status" v-if="status == 1 || status == 2 || status == 3 || status == 4">
				<div class="status-line">
					<!-- <span class="point-wait"></span> -->
					<span :class="status == 1 || status == 2 || status == 3 || status == 4 ? 'point-over' : 'point-wait'"></span>
					<span :class="status == 2 || status == 3 || status == 4 ? 'point-over' : status == 1 ? 'point-wait' : 'point-aaa'"></span>
					<span :class="status == 3 || status == 4 ? 'point-over' : status == 2 ? 'point-wait' : 'point-aaa'"></span>
					<span :class="status == 4 ? 'point-over' : status == 3 ? 'point-wait' : 'point-aaa'"></span>
					<div class="scale-line" v-if="status == 1" style="width:33.33333%"></div>
					<div class="scale-line" v-else-if="status == 2" style="width:66.666666%"></div>
					<div class="scale-line" v-else-if="status == 3 || status == 4" style="width:100%"></div>
				</div>
				<ul class="status-type">
					<li>
						<span>待接单</span>
						<span>等待商家接单</span>
					</li>
					<li>
						<span>待支付</span>
						<span>用户支付订金</span>
					</li>
					<li>
						<span>进行中</span>
						<span>商家备菜中</span>
					</li>
					<li>
						<span>签到</span>
						<span>如约签到</span>
					</li>
				</ul>
			</div>
			<div class="user-cancel" v-if="status == 0">您的宴请预订订单已取消</div>
			<div class="store-info">
				<div class="store-info-left">
					<img :src="listInfo.store_info.store_avatar" alt="" />
					<div>
						<div>
							<span>{{ listInfo.store_info.store_name }}</span>
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
						<div>
							<img src="@/assets/image/icon2/icon-address-red.png" alt="" />
							<span>{{ storeAddress }}</span>
						</div>
					</div>
				</div>
				<a :href="'tel:' + listInfo.store_info.storePhone"><img src="@/assets/image/icon2/icon-tel.png" alt="" /></a>
			</div>
			<div class="the-title" v-show="statusing == 5 && status == 3">订金信息</div>
			<text-banner v-show=" status == 2||status == 3" :content="message" :bgcolor="'#FDF5C7'" :color="'rgba(247, 140, 8, 1)'"></text-banner>
			<text-banner
				v-show="status == 3 && new Date(listInfo.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()"
				:content="message2"
				:bgcolor="'#FDF5C7'"
				:color="'rgba(247, 140, 8, 1)'"
			></text-banner>
			<!-- 宴席当日不可退订 -->
			<div class="list-cell-wrap" v-if="status == 3 || status == 2 || status == 4">
				<div class="list-cell-start">
					<span>宴席订金:</span>
					<div>{{ listInfo.order_money }}</div>
				</div>
				<div class="list-cell-start">
					<span>可退订时限:</span>
					<div v-if="day > 0">{{ day }}天</div>
					<div v-else-if="hours">{{ hours }}小时</div>
					<div v-else>请联系商家</div>
					<!-- 如果小于24小时，按小时显示哦 -->
				</div>
			</div>
			<div class="the-title">预定信息</div>
			<div class="list-cell-wrap">
				<div class="list-cell-start">
					<span>宴请日期:</span>
					<div>{{ listInfo.banquet_time }}</div>
				</div>
				<div class="list-cell-start">
					<span>宴请方式:</span>
					<div>{{ dinnerType == 1 ? '厨师上门' : '到店堂食' }}</div>
				</div>
			</div>
			<div class="list-cell-wrap" v-if="dinnerType == 1">
				<div class="list-cell-start">
					<span>桌数:</span>
					<div>{{ listInfo.table_num }}</div>
				</div>
				<div class="list-cell-start">
					<span>菜品食材:</span>
					<div>{{ listInfo.dishes_food == 1 ? '厨师准备' : '家里自备' }}</div>
				</div>
			</div>
			<div class="list-cell-wrap" v-else-if="dinnerType != 1">
				<div class="list-cell-start">
					<span>宴席类型:</span>
					<div>
						{{
							listInfo.banquet_type == 1
								? '喜宴'
								: listInfo.banquet_type == 2
								? '丧宴'
								: listInfo.banquet_type == 3
								? '生日宴'
								: listInfo.banquet_type == 4
								? '正式宴会'
								: listInfo.banquet_type == 5
								? '家宴'
								: '便宴'
						}}
					</div>
				</div>
				<div class="list-cell-start">
					<span>桌位数量:</span>
					<div>小桌:{{ listInfo.table_num.xz }},大桌:{{ listInfo.table_num.dz }},包间:{{ listInfo.table_num.bz }}</div>
				</div>
				<div class="list-cell-start">
					<span>每桌人数:</span>
					<div>小桌:{{ listInfo.table_pe.xn }},大桌:{{ listInfo.table_pe.dn }},包间:{{ listInfo.table_pe.bn }}</div>
				</div>
				<div class="list-cell-start">
					<span>预计到店总人数:</span>
					<div>{{ listInfo.banquet_num }}</div>
				</div>
			</div>
			<div class="dishes" v-show="listInfo.goods_list && listInfo.goods_list.length > 0">
				<p>菜品</p>
				<div
					class="list-info-wrap"
					v-for="(item, index) in listInfo.goods_list"
					:key="index"
					@click="$router.push({ name: 'HomeGoodsdetail', query: { goods_id: item.goods_id } })"
				>
					<img :src="item.goods_image" alt="" />
					<div class="list-info-right">
						<span>{{ item.goods_name }}</span>
						<span>
							<div>
								<span v-if="dinnerType == 2">{{ item.table_type == 1 ? '(小桌)' : item.table_type == 2 ? '(大桌)' : '包间' }}</span>
								<span>每桌{{ item.goods_num }}件</span>
								<span>x</span>
								<span>{{ item.table_num ? item.table_num : 0 }}桌</span>
							</div>
							<div>￥{{ parseFloat(item.goods_price * item.table_num).toFixed(2) }}</div>
						</span>
					</div>
				</div>
				<div class="all-price">
					<span>预估费用参考：</span>
					<span>￥{{ parseFloat(allPrice).toFixed(2) }}</span>
				</div>
			</div>
			<div class="cook-info-list" v-show="listInfo.cook_list && listInfo.cook_list.length > 0">
				<div class="the-title">厨师信息</div>
				<div style="padding: 0 1.43rem 1.9rem;background-color: #fff;">
					<div class="cook-list" v-for="(item, index) in listInfo.cook_list" :key="index">
						<img :src="item.member_avatar" alt="" />
						<div>
							<span class="cook-info">
								<span>{{ item.member_name }}</span>
								<span>
									{{
										item.cook_level == '初级'
											? 'lv1'
											: item.cook_level == '中级'
											? 'lv2'
											: item.cook_level == '高级'
											? 'lv3'
											: item.cook_level == '技师'
											? 'lv4'
											: 'lv5'
									}}
								</span>
							</span>
							<span>{{ item.adept_menu }}</span>
						</div>
						<a :href="'tel:' + item.phone"><img style="height: 100%;width: 1.48rem;border-radius: 0;" src="@/assets/image/icon2/icon-tel.png" alt="" /></a>
					</div>
				</div>
			</div>
			<!-- 厨师签到信息列表加加加加加startstart -->
			<div class="the-title" v-show="status == 3 && status == 4">签到信息</div>
			<div v-show="status == 3 && status == 4" class="sign-in">
				<div v-if="signIn" v-for="(item, index) in listInfo.cook_list">
					<span>{{ item.sign_time }}</span>
					<span>{{ item.sign_in ? '已签到' : '未签到' }}</span>
					<span>{{ item.member_name }}</span>
				</div>
				<div v-else><span>暂无签到</span></div>
			</div>
			<!-- 厨师签到信息列表加加加加加endendedn -->
			<div class="the-title">联系信息</div>
			<div class="list-cell-wrap">
				<div class="list-cell-start">
					<span>联系人:</span>
					<div>{{ listInfo.member_name }}</div>
				</div>
				<div class="list-cell-start">
					<span>联系电话:</span>
					<div>{{ listInfo.member_phone }}</div>
				</div>
				<div class="list-cell-start" v-if="dinnerType == 1">
					<span>上门地址:</span>
					<div>{{ listInfo.address + listInfo.detailed_address }}</div>
				</div>
			</div>
		</div>
		<div class="footer" v-show="status == 1 || status == 2 || (status == 3 && (dinnerType == 2 || qiandaoDay > 0)) || status == 4 || statusing == 5">
			<div class="cancle botton" @click="cancle()" v-if="status == 1 || status == 2 || (status == 3 && qiandaoDay > 0)&&statusing != 5&&listInfo.conduct_status!=2">取消订单</div>
			<div style="margin-left: 1.43rem;" @click="cancelOrder('zhifu')" class=" botton deposit-money" v-if="status == 2">支付定金</div>
			<span class="qiandao" v-if="status == 3 && dinnerType == 2 && new Date(listInfo.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()">
				宴请日期已到，若您已到店请签到
			</span>
			<span class="qiandao" v-if="statusing == 5">您已提交了取消订单申请，请等候商家审核</span>
			<div
				class="cancle botton"
				v-if="status == 3 && dinnerType == 2 && new Date(listInfo.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()"
				@click="cancelOrder('qiandao')"
			>
				立即签到
			</div>
			<div class="cancle botton" v-if="statusing == 5" @click="undoCancel()">撤销取消申请</div>
		</div>

		<!-- 弹窗单选列表 -->
		<SelectBox title="请选择申请退订原因" :items="arry" ref="selectOne" @getSelectBox="getSelectValue"></SelectBox>
	</div>
</template>

<script>
import textBanner from './textBanner';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox } from 'mint-ui';
import SelectBox from '@/components/SelectBox.vue';
import { getListInfo, cancelOrder } from '@/api/memberBanquet.js';
export default {
	data() {
		return {
			title: '订单详情',
			message: '若您有退订需求，请在可退订时限内申请，订金将在1-7个工作日内退到您的账户，在超出可退订时限外申请退订，订金则会存在不退的风险，请线下与商家联系',
			message2: '宴请日期当天不可再申请退订',
			status: null, //0已取消，1待接单，2待支付，3进行中，4签到，5申请取消中
			statusing: null, //5申请取消中
			storePhone: '',
			storeName: '济南好食源餐馆',
			storeAddress: '',
			dinnerType: 2, //1厨师上门，2到店堂食
			arry: [{ name: '宴席取消或另择日期', id: 1 }, { name: '选择其他商家', id: 2 }, { name: '菜品缺少', id: 3 }, { name: '商家原因', id: 4 }],
			order_id: this.$route.query.order_id,
			listInfo: [],
			allPrice: 0, //菜品总价格
			day: null, //
			hours: null, //可退订倒计时小时
			qiandaoDay: null, //距离宴请当日签到时间
			signIn: false
		};
	},
	components: {
		HeadTitle,
		textBanner,
		SelectBox
	},
	created() {
		this.getListInfo();
	},
	watch: {},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		cancle() {
			if (this.status == 1 || this.status == 2) {
				var that = this;
				MessageBox.confirm('确认要取消订单？', '', { cancelButtonText: '我再想想', confirmButtonText: '确认取消' })
					.then(action => {
						that.cancelOrder();
					})
					.catch(function(error) {
						// Toast()
					});
			} else {
				this.$refs.selectOne.currentValue = true;
			}
		},
		getSelectValue(values) {
			console.log(values, '取消原因');
			this.cancelOrder('shenqing', values.name);
			// 取消原因选择
		},
		qiandao() {},
		cancelOrder(state, yuan) {
			let params = {};
			params.order_id = this.order_id;
			if (state == 'zhifu') {
				params.status = 2;
			} else if (state == 'qiandao') {
				params.status = 3;
			} else if (state == 'shenqing') {
				if (this.status == 3) {
					if (this.hours > 0 || this.day > 0) {
						var that = this;
						MessageBox.confirm('确认要取消订单？', '', { cancelButtonText: '我再想想', confirmButtonText: '确认取消' })
							.then(action => {
								let params = {};
								params.order_id = this.order_id;
								params.status = 4;
								cancelOrder(params)
									.then(res => {
										Toast(res.message);
										this.getListInfo();
									})
									.catch(error => {
										Toast(error.message);
									});
							})
							.catch(function(error) {
								// Toast()
							});
						
						debugger
					} else {
						debugger
						params.status = 2;
						params.conduct_status = 1;
						params.yuan = yuan;
					}
				}
			} else {
				params.status = 4;
			}
			console.log(params,'params')
			cancelOrder(params)
				.then(res => {
					Toast(res.message);
					this.getListInfo();
					if (state == 'zhifu') {
						this.$router.push({ name: 'MemberBanquetPay', query: { pay_sn: res.result.order_sn, pay_type: 'pay_new' } });
					}
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		// 撤销取消申请
		undoCancel() {
			let params = {}
			params.conduct_status = 4
			params.order_id = this.order_id;
			cancelOrder(params)
				.then(res => {
					Toast(res.message);
					this.getListInfo();
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		getListInfo() {
			getListInfo({ order_id: this.order_id })
				.then(res => {
					if (res.result.banquet_mode == 1) {
						this.dinnerType = 2;
					} else {
						this.dinnerType = 1;
					}
					this.listInfo = res.result;
					if (this.listInfo.status == 1) {
						// 待接单
						this.status = 1;
					} else if (this.listInfo.status == 2) {
						// 进行中
						this.status = 3;
						if (this.listInfo.conduct_status == 1) {
							this.statusing = 5;
						} else if (this.listInfo.conduct_status == 2) {
							this.status = 0;
						}
					} else if (this.listInfo.status == 3) {
						// 签到
						this.status = 4;
					} else if (this.listInfo.status == 4) {
						// 已取消
						this.status = 0;
					} else if (this.listInfo.status == 5) {
						// 待支付
						this.status = 2;
					}

					for (var item of this.listInfo.goods_list) {
						this.allPrice += item.table_num * item.goods_num * item.goods_price;
					}
					this.storeAddress = this.listInfo.store_info.area_info + this.listInfo.store_info.store_address;
					// debugger
					console.log(this.listInfo.cook_list, 'this.listInfo.cook_list');
					if (this.listInfo.cook_list && this.listInfo.cook_list.length > 0) {
						for (var item of this.listInfo.cook_list) {
							if (item.sign_in) {
								this.signIn = true;
							}
						}
					}
					this.timeDown();
				})
				.catch(error => {
					console.log(error);
					Toast(error.message);
				});
		},
		timeDown() {
			if (this.listInfo.banquet_time) {
				const endTime = new Date(this.listInfo.banquet_time);
				console.log(endTime.getTime());
				const nowTime = new Date();
				let qiandaoTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
				this.qiandaoDay = parseInt(qiandaoTime / (24 * 60 * 60));
				console.log(this.qiandaoDay, 'qiandaoDay');
				let leftTime = parseInt((this.listInfo.add_time * 1000 + this.listInfo.time_limit * 24 * 60 * 60 * 1000 - nowTime.getTime()) / 1000);
				console.log(leftTime, 'leftTime');
				this.day = parseInt(leftTime / (24 * 60 * 60));
				// this.hours = this.formate(parseInt((leftTime / (60 * 60)) % 24));
				this.hours = parseInt(this.day % 24);
				console.log(this.day, this.hours, 'this.day');
				// this.minute = this.formate(parseInt((leftTime / 60) % 60));
				// this.second = this.formate(parseInt(leftTime % 60));
				// if (leftTime <= 0) {
				// 	this.flag = true;
				// 	this.$emit('time-end');
				// }
			}
		}
		// formate (time) {
		//   if (time >= 10) {
		//     return time
		//   } else {
		//     return `0${time}`
		//   }
		// }
	}
};
</script>

<style lang="scss" scoped>
.order-detail {
	> div.content {
		padding-top: 3.7rem;
	}
	min-height: 100vh;
	background-color: rgba(244, 245, 247, 1);
	padding-bottom: 5rem;
	/deep/.head_title_cont {
		position: fixed;
		width: 100%;
		z-index: 99;
	}
	.the-title {
		background: #f4f5f7;
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: #6f6f6f;
	}
	.content {
		.top-status {
			padding: 1.9rem 1.62rem;
			background-color: #fff;
			.status-line {
				height: 0.1rem;
				background: #ecf0f8;
				// margin: 0 13% 0.33rem;
				width: 75.4%;
				margin: 0 auto 0.6rem;
				position: relative;
				> span {
					position: absolute;
					z-index: 3;
					top: 0;
					transform: translate(-50%, -40%);
					border-radius: 50%;
					&:nth-child(1) {
						left: 0;
					}
					&:nth-child(2) {
						left: 33.33%;
					}
					&:nth-child(3) {
						left: 66.66%;
					}
					&:nth-child(4) {
						left: 100%;
					}
				}
				.point-aaa {
					width: 0.48rem;
					height: 0.48rem;
					background: rgba(251, 19, 25, 1);
				}
				.point-over,
				.point-wait {
					width: 1.19rem;
					height: 1.19rem;
					background: #fb1319;
					&::before {
						content: '';
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
				.point-over {
					&::before {
						height: 0.48rem;
						width: 0.67rem;
						background: url('../../../assets/image/icon2/icon-over-white.png') center center/100% 100% no-repeat;
					}
				}
				.point-wait {
					&::before {
						background-color: #fff;
						height: 0.38rem;
						width: 0.38rem;
						border-radius: 50%;
					}
				}
			}
			.scale-line {
				position: absolute;
				background-color: rgba(251, 19, 25, 1);
				height: 0.1rem;
				z-index: 1;
			}
			.status-type {
				display: flex;
				// justify-content: space-between;
				> li {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					> span {
						&:nth-child(1) {
							font-size: 1.33rem;
							font-weight: 400;
							color: #161616;
							margin-bottom: 0.19rem;
						}
						&:nth-child(2) {
							font-size: 1.14rem;
							font-weight: 400;
							color: #6f6f6f;
						}
					}
				}
			}
		}
		.user-cancel {
			padding: 2.86rem 1.43rem 3.29rem;
			font-size: 2rem;
			font-weight: 400;
			color: #161616;
			background-color: #fff;
			margin-bottom: 0.95rem;
		}
		.store-info {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.9rem 1.43rem;
			.store-info-left {
				display: flex;
				> img {
					margin-right: 0.67rem;
					width: 4.76rem;
					height: 4.76rem;
					border-radius: 0.38rem;
				}
				> div {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 20rem;
					> div {
						display: flex;
						align-items: center;
						&:nth-child(1) {
							span {
								font-size: 1.33rem;
								font-weight: 600;
								color: #161616;
							}
							img {
								width: 1.24rem;
								margin-left: 0.48rem;
							}
						}
						&:nth-child(2) {
							img {
								width: 0.86rem;
								margin-right: 0.48rem;
							}
							span {
								font-size: 1.14rem;
								font-weight: 400;
								color: #6f6f6f;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								width: 100%;
							}
						}
					}
				}
			}
			> a {
				padding: 1.43rem 1.43rem 1.43rem 2.86rem;
				border-left: 1px solid #eee;
				> img {
					width: 1.48rem;
				}
			}
		}
		.list-cell-wrap {
			background-color: #fff;
			.list-cell-start {
				position: relative;
				display: flex;
				// justify-content: space-between;
				padding: 0.95rem 1.43rem;
				align-items: center;
				position: relative;
				font-size: 1.33rem;
				font-weight: 400;
				color: rgba(22, 22, 22, 1);
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 4%;
					width: 96%;
					background-color: rgba(239, 239, 239, 1);
					height: 1px;
				}
				span {
					// margin-left: 1rem;
					flex-shrink: 0;
				}
				> div {
					font-size: 1.33rem;
					margin-left: 1.19rem;
				}
			}
		}
		.dishes {
			padding: 1.43rem 1.43rem 1.9rem;
			background-color: #fff;
			> p {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
			}
			> .list-info-wrap {
				display: flex;
				margin-top: 1.5rem;
				img {
					width: 5.52rem;
					height: 5.52rem;
					border-radius: 0.38rem;
				}
				> div.list-info-right {
					margin-left: 0.95rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 100%;
					> span {
						&:nth-child(1) {
							font-size: 1.24rem;
							font-weight: 400;
							color: #161616;
						}
						&:nth-child(2) {
							display: flex;
							justify-content: space-between;
							> div {
								font-weight: 400;
								&:nth-child(1) {
									font-size: 1.14rem;
									color: #6f6f6f;
									span {
										margin-right: 1rem;
									}
								}
								&:nth-child(2) {
									font-size: 1.24rem;
									color: #161616;
								}
							}
						}
					}
				}
			}
			.all-price {
				margin-top: 2rem;
				text-align: right;
				span {
					font-size: 1.14rem;
					font-weight: 500;
					color: rgba(255, 0, 0, 1);
					&:first-child {
						font-weight: 400;
						color: rgba(111, 111, 111, 1);
					}
				}
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		padding: 0.67rem 1.43rem;
		text-align: right;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		> div.botton {
			text-align: center;
			height: 3.33rem;
			line-height: 3.33rem;
			width: 8.95rem;
			// padding: 0.9rem 2.1rem;
			border-radius: 1.67rem;
			border: 0.05rem solid #fb1319;
			font-size: 1.14rem;
			font-weight: 400;
			color: #fc2025;
		}
		> div.cancle {
			margin-left: auto;
		}
		div.deposit-money {
			color: #fff;
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
		}
		.qiandao {
			font-size: 1.05rem;
			font-weight: 400;
			color: #6f6f6f;
		}
	}
	.cook-list {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		padding: 1.9rem 0;
		border-bottom: 1px solid #efefef;
		img {
			&:nth-child(1) {
				width: 4.29rem;
				height: 4.29rem;
				border-radius: 50%;
			}
			&:last-child {
				height: 1.33rem;
				margin-left: auto;
			}
		}
		> div {
			margin: 0 0.67rem;
			> span {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
			.cook-info {
				margin-bottom: 0.81rem;
				display: flex;
				align-items: center;
				span {
					&:first-child {
						font-size: 1.33rem;
						font-weight: 600;
						color: #161616;
					}
					&:last-child {
						text-align: center;
						margin-left: 0.38rem;
						width: 2.71rem;
						height: 1.29rem;
						line-height: 1.29rem;
						background: linear-gradient(131deg, #ffd3a4 0%, #d49652 100%);
						border-radius: 0.62rem;
						font-size: 1.14rem;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}
		}
		a {
			margin-left: auto;
			padding: 1.43rem 1.43rem 1.43rem 2.86rem;
			border-left: 1px solid #eee;
		}
	}
	.sign-in {
		background-color: #fff;
		padding: 1.43rem;
		div {
			margin-bottom: 0.95rem;
			span {
				&:first-child {
					margin-right: 2rem;
				}
				font-size: 1.14rem;
				font-weight: 400;
				color: #161616;
			}
		}
	}
	// 弹窗选择样式修改
	// /deep/.mint-msgbox {
	// 	width: 63.73%;
	// 	.mint-msgbox-content {
	// 		padding: 23.17% 0;
	// 	}
	// }
}
</style>
