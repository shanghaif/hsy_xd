<template>
	<div class="member-order-list">
		<!-- <div class="common-header-wrap">
			<mt-header title="订单列表" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title :bgcolor="'rgba(98, 103, 113, 1)'" :color="'#fff'" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" title="订单列表"></head-title>
		<!-- header -->
		<div class="order-header">
			<ul>
				<li class="item" v-for="item in orderNav" v-bind:key="item.id" v-bind:class="{ active: stateType == item.id }" v-on:click="setOrderNavActive(item.id)">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="order-body" v-if="order_list && order_list.length">
				<div class="list" v-for="item in order_list" :key="item.order_id">
					<div @click="$router.push({ name: 'SellerOrderDetail', query: { order_id: item.order_id } })">
						<div class="tips-body">
							<span class="tips">订单编号: {{ item.order_sn }}</span>
							<span class="title tips statusTips">{{ item.state_desc }}</span>
						</div>
						<!-- <div class="order-image" v-if="item.goods_list.length > 0"><img v-bind:src="image.image_240_url" v-for="image in item.goods_list" /></div> -->
						<div class="order-image" v-if="item.goods_list.length > 0">
							<div v-for="(item,index) in item.goods_list" :key="index">
								<img v-bind:src="item.image_240_url"/>
								<span class="good-name">{{ item.goods_name }}</span>
							</div>
						</div>
						<div class="price">
							(共计{{ item.goods_list.length }}种商品) 合计 : ￥
							<i>{{ item.order_amount }}</i>
							<i class="freight">(运费:￥{{ item.shipping_fee }})</i>
						</div>
					</div>
					<div class="order-list-opratio">
						<!-- 锁定-->
						<div class="btn">
							<button v-if="item.if_lock">退款中</button>
							<!-- 取消订单 -->
							<button v-if="item.if_cancel" v-on:click="cancel(item.order_id)">取消订单</button>

							<!-- 调整费用 -->
							<button v-if="item.if_modify_price" v-on:click="modifyPrice(item.order_id)">修改运费</button>
							<!-- 修改价格 -->
							<button v-if="item.if_spay_price" v-on:click="spayPrice(item.order_id)">修改价格</button>
							<!-- 物流跟踪 -->
							<button v-if="item.if_deliver" v-on:click="deliver(item.order_id)">物流跟踪</button>

							<!-- 查看回单 -->
							<button v-if="item.wy == 2" v-on:click="goReceipt( item.order_id,item.order_image,2 )">查看回单</button>
							<button v-if="item.wy == 3" v-on:click="goReceipt( item.order_id,item.order_image,3 )">查看回单</button>
							<!-- <img-viewer v-if="item.order_image" :options="options" @inited="inited" class="viewer" ref="viewer">
								<template>
									<img :src="item.order_image" />
								</template>
							</img-viewer> -->
							

							<!-- 发货 -->
							<button style="background-color: rgba(98, 103, 113, 1);color: #fff;" 
								v-if="item.if_send && item.wy != 2"
								v-on:click="send(item.order_id)">发货</button>
						</div>
					</div>
				</div>
			</div>
			<empty-record2 isFrom="content" v-else-if="order_list && !order_list.length"></empty-record2>
			
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getOrderList, cancelOrder, receiptOrder, rejectOrder, editGoodsPrice, editShippingFee } from '../../../api/sellerOrder';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import EmptyRecord2 from '../../../components/EmptyRecord2';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';

export default {
	components: {
		EmptyRecord2,
		HeadTitle,
    'img-viewer': Viewer,
	},
	name: 'MemberOrderList',
	data() {
		return {
			order_id: 0,

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
					name: '已取消',
					id: 'state_cancel'
				}
			],
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			stateType: this.$route.query.state ? this.$route.query.state : '',
			orderDetailVisible: false,
			wrapperHeight: 0,

			order_list: false,
			
			options: {
				button: true, //右上角按钮
				zoomable: true, //是否可以缩放
				movable: true, //是否可以移动
				transition: true, //使用 CSS3 过度
				fullscreen: true, //播放时是否全屏
				keyboard: true, //是否支持键盘
				title: false, //当前图片标题
				tooltip: false, //显示缩放百分比
				navbar: false, //底部缩略图
				toolbar: false, //底部工具栏
				rotatable: false, //是否可旋转
				scalable: false //是否可翻转
			},
		};
	},

	mounted() {
		this.wrapperHeight = document.documentElement.clientHeight - 140;
	},
	computed: {
		...mapState({
			user: state => state.member.info
		})
	},
	created: function() {},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
    // 查看 图片
		inited(viewer) {
			this.$viewer = viewer;
		},
		setOrderNavActive(index) {
			this.stateType = index;
			this.getOrderList(true);
		},
		cancel(orderId) {
			MessageBox.prompt('请填写理由', '').then(({ value, action }) => {
				cancelOrder(orderId, value)
					.then(res => {
						this.getOrderList(true);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		modifyPrice(orderId) {
			MessageBox.prompt('请填写修改的运费', '', { inputType: 'number' }).then(({ value, action }) => {
				editShippingFee(orderId, value)
					.then(res => {
						this.getOrderList(true);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		spayPrice(orderId) {
			MessageBox.prompt('请填写修改的商品价格', '', { inputType: 'number' }).then(({ value, action }) => {
				editGoodsPrice(orderId, value)
					.then(res => {
						this.getOrderList(true);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},

		deliver(orderId) {
			this.$router.push({ name: 'SellerOrderDeliver', query: { order_id: orderId } });
		},

		// 查看 回单
		goReceipt( order_id, order_image, state ){
			this.$router.push({ name: 'SellerReceipt', params: { order_id:order_id, order_image: order_image, state:state } });
		},

		send(orderId) {
			this.$router.push({ name: 'SellerOrderSend', query: { order_id: orderId } });
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

			getOrderList(this.params, '', this.stateType)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let tOrderList = res.result.order_list;

					if (tOrderList) {
						if (ifReplace || !this.order_list) {
							this.order_list = tOrderList;
						} else {
							this.order_list = this.order_list.concat(tOrderList);
						}
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
.member-order-list {
	background-color: rgba(244, 245, 247, 1);
	min-height: 100vh;
	.head_title_cont {
		position: fixed;
		width: 100%;
		top: 0;
	}
	.order-header {
		background-color: #626771;
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
			width: auto;
			display: flex;
			width: fit-content;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			height: 100%;
			background: rgba(98, 103, 113, 1);
			// border-bottom: 1px solid #e8eaed;
			li {
				text-align: center;
				// line-height: 2.2rem;
				// border-bottom: 0.1rem solid transparent;
				font-size: 1.24rem;
				font-weight: 400;
				color: #fff;
				width: 4rem;
				margin-right: 2.6rem;
				&.active {
					position: relative;
					// color: #e84630;
					&::after {
						content: '';
						position: absolute;
						bottom: -0.8rem;
						left: 0;
						width: 100%;
						height: 0.24rem;
						background: #fff;
						border-radius: 0.12rem;
					}
					// color: $primaryColor;
					// border-bottom-color: $primaryColor;
				}
			}
		}
	}
	// .order-body {
	// 	position: relative;
	// 	padding-top: 2.5rem;
	// 	.list {
	// 		width: 100%;
	// 		margin-top: 0.5rem;
	// 		.tips-body {
	// 			height: 2.2rem;
	// 			background: rgba(255, 255, 255, 1);
	// 			box-shadow: 0 0.5px 0 0 rgba(232, 234, 237, 1);
	// 			display: flex;
	// 			justify-content: space-between;
	// 			padding: 0 0.75rem 0 0.5rem;
	// 			.tips {
	// 				font-size: 0.7rem;
	// 				color: #333;
	// 				line-height: 2.2rem;
	// 			}
	// 			.statusTips {
	// 				color: #666666;
	// 			}
	// 			img {
	// 				width: 3.8rem;
	// 				height: 3rem;
	// 			}
	// 		}
	// 		.order-image {
	// 			height: 4.55rem;
	// 			background: rgba(250, 250, 250, 1);
	// 			width: 100%;
	// 			overflow: auto;
	// 			white-space: nowrap;
	// 			img {
	// 				width: 3rem;
	// 				height: 3rem;
	// 				border-radius: 1px;
	// 				margin: 0.85rem 0.5rem 0.5rem;
	// 			}
	// 		}
	// 		.price {
	// 			font-size: 0.7rem;
	// 			color: rgba(78, 84, 93, 1);
	// 			line-height: 2.2rem;
	// 			height: 2.2rem;
	// 			background-color: #fff;
	// 			padding: 0 0.75rem 0 0;
	// 			border-bottom: 1px solid #e8eaed;
	// 			box-sizing: border-box;
	// 			text-align: right;

	// 			overflow: hidden;
	// 			text-overflow: ellipsis;
	// 			white-space: nowrap;
	// 			i {
	// 				font-size: 0.8rem;
	// 				color: #333;
	// 				padding-left: 0.15rem;
	// 				font-style: normal;
	// 				&.freight {
	// 					color: #333;
	// 					font-size: 0.6rem;
	// 				}
	// 			}
	// 		}
	// 		.btn {
	// 			display: flex;
	// 			justify-content: flex-end;
	// 			background: rgba(255, 255, 255, 1);
	// 			border-radius: 0.1rem;
	// 			button {
	// 				width: 4.5rem;
	// 				height: 1.5rem;
	// 				font-size: 0.7rem;
	// 				border-radius: 0.1rem;
	// 				margin: 0.35rem 0.75rem 0.35rem 0;
	// 				background-color: #fff;
	// 				border: 1px solid #ccc;
	// 			}
	// 			.buttonright {
	// 				background: rgba(255, 255, 255, 1);
	// 				border-radius: 0.1rem;
	// 				color: $primaryColor;
	// 				border: 1px solid #e93b3d;
	// 			}
	// 		}
	// 	}
	// 	.loading-wrapper {
	// 		text-align: center;
	// 		p {
	// 			color: #c3c3c3;
	// 			font-size: 0.6rem;
	// 			font-weight: 'Regular';
	// 			margin: 0.5rem auto;
	// 		}
	// 	}
	// }
	.order-body {
		position: relative;
		padding-top: 8.5rem;
		.list {
			// margin: 0.95rem 1.43rem 0;
			// padding: 1.9rem 1.43rem 1.43rem;
			margin: 0.95rem 0.95rem 0;
    	padding: 1.43rem 0.95rem 1.43rem;
			background-color: #fff;
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
				.tips {
					// font-size: 0.7rem;
					font-size: 1.14rem;
					font-weight: 600;
					color: #161616;
					// line-height: 2.2rem;
				}
				> div {
					display: flex;
					align-items: center;
					img {
						width: 1.3rem;
						margin-right: 0.48rem;
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
				> div {
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
				font-size: 0.17rem;
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
						// padding: 0.5rem 1rem;
						padding: 0.5rem 0.8rem;
						font-size: 1.1rem;
						font-weight: 400;
						color: #161616;
						// border-radius: 0.1rem;
						// margin: 0.35rem 0.75rem 0.35rem 0;
						background-color: #fff;
						border-radius: 1.62rem;
						border: 0.1rem solid #e2e2e2;
						&:nth-child(2) {
							// margin-left: 1rem;
						}
						margin: 0 0.5rem;
						// border: 1px solid #ccc;
					}

					.viewer{
						padding: 0rem 1rem;
						border: 1px solid rgb(98, 103, 113);
						border-radius: 1.62rem;
						display: flex;
						align-items: center;
						img{
							height: 2.24rem;
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
</style>
