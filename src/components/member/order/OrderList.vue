<template>
	<div class="member-order-list only-member-order-list">
		<!-- <div class="common-header-wrap">
			<mt-header title="订单列表" class="common-header"><mt-button slot="left" icon="back" @click="fun_push"></mt-button></mt-header>
		</div> -->
		<head-title title="订单列表"></head-title>
		<!-- header -->
		<div class="order-header">
			<ul>
				<li class="item" v-for="item in orderNav" v-bind:key="item.id" v-bind:class="{ active: stateType == item.id }" v-on:click="setOrderNavActive(item.id)">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="order-body" v-if="order_group_list && order_group_list.length">
				<div v-for="(order_group, index) in order_group_list" v-bind:key="index">
					<div class="list" v-for="item in order_group.order_list" :key="item.order_id">
						<router-link :to="'/member/order_detail?order_id=' + item.order_id">
							<div class="tips-body">
								<!-- <span class="tips">订单编号: {{ item.order_sn }}</span> -->
								<div>
									<img src="@/assets/image/icon2/icon-store-black.png" alt="">
									<span class="tips">{{ item.extend_store.store_name }}</span>
								</div>
								<span class="title tips statusTips">{{ item.state_desc }}</span>
							</div>

							<div class="order-image" v-if="item.extend_order_goods.length > 0">
								<div v-for="(item,index) in item.extend_order_goods" :key="index">
									<img v-bind:src="item.goods_image_url"/>
									<!-- <img v-bind:src="image.goods_image_url" v-for="image in item.extend_order_goods" /> -->
									<!-- <span class="end_time_close">{{item.endTime}}</span> -->
									<span class="good-name">{{ item.goods_name }}</span>
								</div>
							</div>
							<div class="end_time_close" v-if="item.endTime">{{ item.endTime }}</div>
							<div class="product-sn">
								<span class="tips">订单编号: {{ item.order_sn }}</span>
							</div>
							<div class="price">
								<span>(共计{{ item.extend_order_goods.length }}种商品) 合计:￥</span>
								<i>{{ item.order_amount }}</i>
								<i class="freight">(运费:￥{{ item.shipping_fee }})</i>
							</div>
						</router-link>
						<div class="order-list-opratio">
							<!-- 锁定-->
							<div class="btn">
								<button v-if="item.if_lock">退款中</button>
								<!-- 取消订单 -->
								<button v-if="item.if_cancel" v-on:click="cancel(item)">取消订单</button>
								<!-- 退款取消订单 -->
								<button v-if="item.if_refund_cancel && item.wy !=2 && item.wy!=3" v-on:click="refund(item.order_id)">退款</button>
								<!-- 物流跟踪 -->
								<button v-if="item.if_deliver" v-on:click="deliver(item.order_id)">物流跟踪</button>
								<!-- 收货 -->
								<button v-if="item.if_receive" v-on:click="receive(item.order_id)">收货</button>
								<!-- 评价 -->
								<button v-if="item.if_evaluation" v-on:click="evaluate(item.order_id)">评价</button>

								<button v-if="order_group.pay_amount && item.wy==1"
									@click="storeInfoPay(item.store_id)"
									>商家账户</button>

								<button v-if="order_group.pay_amount && item.wy==1"
									@click="goRecipt(item.order_id)"
									>上传回单</button>

								<button v-if="item.wy==2 || item.wy==3"
									@click="goLookRecipt(item.order_image)"
									>查看回单</button>

								<button v-if="order_group.pay_amount && order_group.pay_amount > 0 && item.wy == 0 " @click="pay(order_group.pay_sn)">继续支付</button>
							</div>
						</div>
					</div>
					<!-- 付款 -->
					<!-- 	<mt-button v-if="order_group.pay_amount && order_group.pay_amount > 0" type="primary" @click="pay(order_group.pay_sn)" class="ds-button-large mt-5 mb-5">
						付款
					</mt-button> -->
				</div>
			</div>
			<empty-record2 isFrom='content' v-else-if="order_group_list && !order_group_list.length"></empty-record2>
			<div class="popupPay">
				<mt-popup
					v-model="popupVisible"
					position="center"
					>
						<ul>
							<li>
								账户名称：{{payName}}
							</li>
							<li>
								账户号码：{{payNumber}}
							</li>
							<li>
								银行名称：{{zhihangming}}
							</li>
						</ul>
						<div @click="copyPay">
							复制信息
						</div>
				</mt-popup>
			</div>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getOrderList, cancelOrder, receiveOrder, getStoreInfo } from '../../../api/memberOrder';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	components: {
		EmptyRecord2,
		HeadTitle
	},
	name: 'MemberOrderList',
	data() {
		return {
			popupVisible : false, // 模态框
			payName : null,       // 开户名
			payNumber : null,     // 开户账号
			zhihangming : null,   // 银行名称

			order_id: 0,
			goItem: -1,

			orderNav: [
				{
					name: '全部',
					id: ''
				},
				{
					name: '待付款',
					id: 'state_new'
				},
				{
					name: '待回单',
					id: 'receipt_new'
				},
				{
					name: '已回单',
					id: 'receipt_pay'
				},
				{
					name: '待发货',
					id: 'state_pay'
				},
				{
					name: '待收货',
					id: 'state_send'
				},
				{
					name: '待评价',
					id: 'state_noeval'
				}
			],
			stateType: this.$route.query.state ? this.$route.query.state : '',
			orderDetailVisible: false,
			// wrapperHeight: 0,
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			order_group_list: false,
			Timer: null
		};
	},
	beforeRouteEnter(to, from, next) {
		// 在导航完成前获取数据
		next(vm => {
			if (from.name == 'MemberBuyPay') {
				vm.goItem = 'MemberIndex';

				if (vm.$route.query.payType == 'wxapp') {
					vm.Timer = setInterval(() => {
						vm.getOrderListNew(true);
					}, 1000);
				}
			}
		});
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
		// 如果有订单查询
		if (this.Timer) {
			clearInterval(this.Timer);
			this.Timer = null;
		}
	},

	// mounted() {
	// 	this.wrapperHeight = document.documentElement.clientHeight - 140;
	// },
	computed: {
		...mapState({
			user: state => state.member.info,
      mclass  : state => state.member.mclass,     // 登陆人身份
		})
	},
	created: function() {
		// this.getOrderList(true)
	},
	watch: {
		orderArrTime: function() {
			console.log('该百年');
		}
	},
	methods: {
		// 点击 左上返回 按钮
		fun_left() {
			if (this.goItem == -1) {
				this.$router.go(-1);
			} else {
				this.$router.push({ name: 'MemberIndex' });
			}
		},

		// 商家信息
		storeInfoPay(store_id){
			getStoreInfo(store_id).then(res=>{
				this.popupVisible = true;
				this.payName = res.result.kaihuming;
				this.payNumber = res.result.zhanghaoming;
				this.zhihangming = res.result.zhihangming;
				// MessageBox.prompt(res.result.kaihuming,res.result.zhanghaoming);
			})
		},
		
		// 复制 商家 信息
		copyPay(){			
			var oInput = document.createElement('input');
			oInput.value = `开户名称:${this.payName} 开户账号:${this.payNumber} 银行名称:${this.zhihangming}`;
			document.body.appendChild(oInput);
			oInput.select();//选择对象
			document.execCommand('copy');//执行浏览器复制命令
			document.body.removeChild(oInput);
			Toast('复制成功！');
			this.popupVisible = false;
		},

		// 去回单
		goRecipt(order_id){
			this.$router.push({ name: 'MemberBuyReceipt', params: { order_id: order_id } });
		},

		// 查看 回单
		goLookRecipt(order_image){
			this.$router.push({ name: 'MemberBuyReceipt', params: { order_image: order_image } });
		},

		setOrderNavActive(index) {
			// 如果有订单查询
			if (this.Timer) {
				clearInterval(this.Timer);
				this.Timer = null;
			}
			this.stateType = index;
			this.getOrderList(true);
		},
		showMessage(message, title) {
			MessageBox.alert(message, title);
		},
		cancel(orderInfo) {
			MessageBox.confirm('确定要取消该订单吗？').then(action => {
				cancelOrder(orderInfo.order_id)
					.then(res => {
						this.getOrderList(true);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},

		// 输入验货人名称 收货
		receive(orderId) {
			if( this.mclass >2 ){
				MessageBox.prompt('请输入验货人姓名').then(({ value, action }) => {
					if( value ){
						// console.log(value, action);
						// return false;
						receiveOrder(orderId,value).then(res => {
							Toast('操作成功');
							this.getOrderList(true);
						}).catch(function(error) {
							Toast(error.message);
						});
					}
				}).catch(err => {
					// console.log(err);
				});
			}else{
				MessageBox.confirm('确认收货？').then(action => {
					receiveOrder(orderId)
						.then(res => {
							Toast('操作成功');
							this.getOrderList(true);
						})
						.catch(function(error) {
							Toast(error.message);
						});
				});
			}
		},
		deliver(orderId) {
			this.$router.push({ name: 'MemberOrderDeliver', query: { order_id: orderId } });
		},
		refund(orderId) {
			this.$router.push({ name: 'MemberRefundForm', query: { order_id: orderId } });
		},
		evaluate(orderId) {
			this.$router.push({ name: 'MemberOrderEvaluate', params: { order_id: orderId } });
		},
		pay(paySn) {
			this.$router.push({ name: 'MemberBuyPay', query: { pay_sn: paySn, pay_type: 'pay_new' } });
		},
		getOrderInfo(orderId) {
			this.orderDetailVisible = true;
			this.order_id = orderId;
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(false);
			}
		},
		getOrderList(ifReplace) {
			Indicator.open();
			if (ifReplace) {
				this.loading = false;
				this.params.page = 1;
				this.isMore = true;
			}

			getOrderList(this.params, this.stateType, '')
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let tOrderGroup = res.result.order_group_list;

					if (tOrderGroup) {
						if (ifReplace || !this.order_group_list) {
							this.order_group_list = tOrderGroup;
						} else {
							this.order_group_list = this.order_group_list.concat(tOrderGroup);
						}
					}
					if (this.stateType == 'state_new') {
						//如果是待付款
						// var Timer = setInterval(()=>{
						var newTime = new Date().getTime(); //当前时间
						for (var i in this.order_group_list) {
							var k = this.order_group_list[i].order_list[0]; //循环对象
							var oldTime = k.add_time * 1000; //下单时间
							if (newTime - oldTime > 1800000) {
								//如果超过下单时间
								cancelOrder(k.order_id).then(res => {
									//取消订单
									this.getOrderList(true); //重新加载数据
								});
							} else {
								//没有超过下单时间
								var endTime = 1800000 - (newTime - oldTime); //还剩多少毫秒
								var m = Math.floor((endTime / (1000 * 60)) % 60); //计算分钟数
								this.order_group_list[i].order_list[0]['endTime'] = '剩' + m + '分钟后自动关闭此订单';
							}
						}
						// },1000)
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},

		getOrderListNew(ifReplace) {
			if (ifReplace) {
				this.loading = false;
				this.params.page = 1;
				this.isMore = true;
			}

			getOrderList(this.params, this.stateType, '')
				.then(res => {
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let tOrderGroup = res.result.order_group_list;

					if (tOrderGroup) {
						if (ifReplace || !this.order_group_list) {
							this.order_group_list = tOrderGroup;
						} else {
							this.order_group_list = this.order_group_list.concat(tOrderGroup);
						}
					}
					if (this.stateType == 'state_new') {
						//如果是待付款
						// var Timer = setInterval(()=>{
						var newTime = new Date().getTime(); //当前时间
						for (var i in this.order_group_list) {
							var k = this.order_group_list[i].order_list[0]; //循环对象
							var oldTime = k.add_time * 1000; //下单时间
							if (newTime - oldTime > 1800000) {
								//如果超过下单时间
								cancelOrder(k.order_id).then(res => {
									//取消订单
									this.getOrderList(true); //重新加载数据
								});
							} else {
								//没有超过下单时间
								var endTime = 1800000 - (newTime - oldTime); //还剩多少毫秒
								var m = Math.floor((endTime / (1000 * 60)) % 60); //计算分钟数
								this.order_group_list[i].order_list[0]['endTime'] = '剩' + m + '分钟后自动关闭此订单';
							}
						}
						// },1000)
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.only-member-order-list {
	.head_title_cont {
		position: fixed;
		width: 100%;
		top: 0;
	}
}
.member-order-list {
	background-color: rgba(244, 245, 247, 1);

	.order-header {
		background-color: #fff;
		position: fixed;
		// height: 2.2rem;
		padding: 1.43rem 1.48rem;
		box-sizing: border-box;
		width: 100%;
		// top: 2.2rem;
		z-index: 100;
		top: 3.74rem;
		overflow-x: scroll;
		ul {
			list-style: none;
			display: flex;
			width: fit-content;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			background: rgba(255, 255, 255, 1);
			// border-bottom: 1px solid #e8eaed;
			li {
				text-align: center;
				// line-height: 2.2rem;
				// border-bottom: 0.1rem solid transparent;
				font-size: 1.24rem;
				font-weight: 400;
				color: #6f6f6f;
				width: 4rem;
				margin-right: 2.6rem;
				&.active {
					position: relative;
					color: #e84630;
					&::after {
						content: '';
						position: absolute;
						bottom: -0.8rem;
						left: 0;
						width: 100%;
						height: 0.24rem;
						background: linear-gradient(90deg, #e53216 0%, #fc6952 100%);
						border-radius: 0.12rem;
					}
					// color: $primaryColor;
					// border-bottom-color: $primaryColor;
				}
			}
		}
	}
	.order-body {
		position: relative;
		padding-top: 8.5rem;
		> div {
			margin: 0 1.43rem 0;
			// padding: 1.9rem 1.43rem 1.43rem;
			// background-color: #fff;
			// border-radius: 0.76rem;
			.list {
				width: 100%;
				padding: 1.9rem 1.43rem 1.43rem;
				box-sizing: border-box;
				background: #fff;
				margin-top: 0.95rem;
				border-radius: 0.76rem;
				// margin-top: 0.5rem;
				.product-sn {
					text-align: right;
					margin: 0.5rem 0;
					.tips {
						font-size: 1.14rem;
						font-weight: 400;
						color: #6f6f6f;
					}
				}
				.tips-body {
					// height: 2.2rem;
					background: rgba(255, 255, 255, 1);
					// box-shadow: 0 0.5px 0 0 rgba(232, 234, 237, 1);
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 0.75rem 0 0.5rem;
					>div {
						display: flex;
						align-items: center;
						img {
							width: 1.3rem;
							margin-right: 0.48rem;
						}
						.tips {
							// font-size: 0.7rem;
							font-size: 1.14rem;
							font-weight: 600;
							color: #161616;
							// line-height: 2.2rem;
						}
					}
					.statusTips {
						// color: #666666;
						font-size: 1.14rem;
						font-weight: 500;
						color: #e84630;
					}
				}
				.order-image {
					// height: 4.55rem;
					background: rgba(255, 255, 255, 1);
					width: 100%;
					overflow: auto;
					white-space: nowrap;
					margin-top: 0.95rem;
					>div {
						margin-bottom: 1.48rem;
					}
					img {
						width: 5rem;
						// height: 3rem;
						border-radius: 1px;
						margin: 0.76rem 0.95rem 0;
					}
					.good-name {
						font-size: 1.14rem;
						font-weight: 400;
						color: #161616;
						vertical-align: middle;
					}
					.end_time_close {
						font-size: 1rem;
						color: #666;
						margin-left: 2rem;
					}
				}
				.end_time_close {
					font-size: 1.2rem;
					color: #4e545d;
					line-height: 1.6rem;
					height: 1.6rem;
					background-color: #fff;
					padding: 0 0.75rem 0 0;
					text-align: right;
				}
				.price {
					font-size: 1.17rem;
					color: rgba(78, 84, 93, 1);
					line-height: 2.2rem;
					height: 2.2rem;
					background-color: #fff;
					padding: 0 0.75rem 0 0;
					// border-bottom: 1px solid #e8eaed;
					box-sizing: border-box;
					text-align: right;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					span {
						font-size: 1.17rem;
					}
					i {
						font-size: 1.17rem;
						color: #333;
						padding-left: 0.15rem;
						font-style: normal;
						&.freight {
							color: #333;
							font-size: 1.17rem;
						}
					}
				}
				.order-list-opratio {
					margin-top: 1.43rem;
					.btn {
					// height: 2.2rem;
					display: flex;
					justify-content: flex-end;
					background: rgba(255, 255, 255, 1);
					border-radius: 0.1rem;
					button {
						// width: 4.5rem;
						// height: 1.5rem;
						// font-size: 0.7rem;
						padding: 0.5rem 1.1rem;
						font-size: 1.24rem;
						font-weight: 400;
						color: #161616;
						// border-radius: 0.1rem;
						// margin: 0.35rem 0.75rem 0.35rem 0;
						background-color: #fff;
						border-radius: 1.62rem;
						border: 0.1rem solid #e2e2e2;
							margin-left: 1rem;
						// &:nth-child(2) {
						// 	margin-left: 1rem;
						// }
						// border: 1px solid #ccc;
					}
					.buttonright {
						background: rgba(255, 255, 255, 1);
						border-radius: 0.1rem;
						color: $primaryColor;
						border: 1px solid #e93b3d;
					}
				}
				}
				
			}
		}

		.loading-wrapper {
			text-align: center;
			p {
				color: #c3c3c3;
				font-size: 0.6rem;
				font-weight: 'Regular';
				margin: 0.5rem auto;
			}
		}
	}
	.mint-popup {
		width: 100%;
		height: 11.75rem;
	}
}

.popupPay{
	&/deep/ .mint-popup {
		padding: 0 1.6rem;
    padding-top: 2rem;
    width: 60%;
    height: 28%;
    box-sizing: border-box;
		border-radius: 1.6rem;
		li{
			margin-bottom: 1rem;
			font-size: 1.28rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		div{
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
			height: 3.33rem;
			font-size: 1.14rem;
			color: #ffffff;
			text-align: center;
			line-height: 3.33rem;
			width: 80%;
			border-radius: 1.67rem;
			margin: 0 auto;
			margin-top: 1.8rem;
		}
	}
}
</style>
