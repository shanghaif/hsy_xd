<!-- footer.vue -->
<template>
	<div
		class="ui-detail-footer"
		v-if="detailInfo"
		v-bind:class="{
			'hidden-cart-footer': ispromotion,
			'show-cart-footer': !ispromotion
		}"
	>
		<div class="footer-flex">
			<div class="left">
				<div class="item" v-on:click="$router.push({ name: 'HomeStoreabout', query: { id: storeInfo.store_id } })">
					<!-- <span class="iconfont">&#xe69f;</span> -->
					<img src="@/assets/image/icon2/icon-store-black.png" alt="" />
					<span class="text">店铺</span>
				</div>
				<div class="item" v-if="config && config.node_site_use == '1' && config.node_site_url" v-on:click="goChat()">
					<!-- <span class="iconfont">&#xe6f1;</span> -->
					<img src="@/assets/image/icon2/icon-message-black.png" alt="" />
					<span class="text">客服</span>
					<span class="icon" v-if="informationNumber > 0">{{ getinformationCount }}</span>
				</div>
				<div class="item" v-on:click="goCart()">
					<!-- <span class="iconfont">&#xe6ae;</span> -->
					<img src="@/assets/image/icon2/icon-cart-black.png" alt="" />
					<span class="icon" v-if="cartNumber > 0">{{ getCarCount }}</span>
					<span class="text">购物车</span>
				</div>
			</div>
			<div class="right" v-if="mclass == 0"><div @click="$router.push({ name: 'HomeMemberLogin' })" class="button active-cart">去登录</div></div>
			
			<div class="right" v-else-if="detailInfo.goods_storage <= 0"><div class="button sty_none">已售罄</div></div>
			<div class="right" v-else-if="detailInfo.IsHaveBuy == 1"><div class="button sty_none">已抢购</div></div>
			
			<div class="right" v-else-if="CanAddCart">
				<div
					class="button active-cart"
					v-on:click="addShopping(true)"
					v-if="
						price != 0 &&
							!detailInfo.bargain_info &&
							((!detailInfo.pintuan_type && detailInfo.goods_storage > 0 && detailInfo.cart) || (detailInfo.pintuan_type && detailInfo.pintuangroup_list.length))
					"
				>
					{{ detailInfo.pintuan_type ? '参加拼团' : '加入购物车' }}
				</div>
				<div
					class="button disabled-cart"
					v-on:click="addShopping(true)"
					v-if="
						price != 0 &&
							!detailInfo.bargain_info &&
							((!detailInfo.pintuan_type && detailInfo.goods_storage <= 0 && detailInfo.cart) ||
								(detailInfo.pintuan_type && detailInfo.goods_storage <= 0 && detailInfo.pintuangroup_list.length))
					"
				>
					{{ detailInfo.pintuan_type ? '参加拼团' : '加入购物车' }}
				</div>
				<div class="button active-buy" v-on:click="checkout()" v-if="price != 0 && detailInfo.goods_storage > 0">
					{{
						detailInfo.bargain_info
							? detailInfo.bargainorder_info
								? detailInfo.bargainorder_info.bargainorder_state == 2
									? '砍价成功去下单'
									: '正在砍价'
								: '发起砍价'
							: detailInfo.pintuan_type
							? '立刻开团'
							: detailInfo.is_presell == 1
							? '预售购买（' + $moment.unix(detailInfo.presell_deliverdate).format('YYYY年MM月DD日') + '发货）'
							: detailInfo.is_goodsfcode == 1
							? 'F码购买'
							: '立即购买'
					}}
				</div>
				<div class="button disabled-buy" v-if="price != 0 && detailInfo.goods_storage <= 0">
					{{
						detailInfo.bargain_info
							? detailInfo.bargainorder_info
								? detailInfo.bargainorder_info.bargainorder_state == 2
									? '砍价成功去下单'
									: '正在砍价'
								: '发起砍价'
							: detailInfo.pintuan_type
							? '立刻开团'
							: detailInfo.is_presell == 1
							? '预售购买（' + $moment.unix(detailInfo.presell_deliverdate).format('YYYY年MM月DD日') + '发货）'
							: detailInfo.is_goodsfcode == 1
							? 'F码购买'
							: '立即购买'
					}}
				</div>
			</div>
			<div class="right" v-else-if="!CanAddCart">
				<div
					v-if="this.detailInfo.gw_dz == 1 || this.detailInfo.gw_dz == 3 || this.detailInfo.gw_dz == 5"
					@click="$router.push({ name: 'MemberAddressList' })"
					class="button active-cart"
				>
					去设置收货地址
				</div>
				<div v-else-if="this.detailInfo.gw_dz == -1" @click="$router.push({ name: 'HomeCart' })" class="button active-cart">去清空购物车</div>
			</div>
		</div>

		<!-- <p class="good-stock-none" v-if="detailInfo.goods_storage <= 0">所选产品暂时无货，非常抱歉！</p> -->

		<shopping v-if="isShowcartInfo" :isShowcartInfo="isShowcartInfo"></shopping>

		<!-- 加入购物车显示动画 -->
		<div class="ui-cart-animation" v-if="isAnimation"><mt-spinner type="snake" color="#e93b3d"></mt-spinner></div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
import shopping from './child/Shopping';
import { cartQuantity } from '../../../api/homecart';
import { addBargain } from '../../../api/memberBargain';
export default {
	data() {
		return {
			cartNumber: 0, //购物车数量
			informationNumber: 0, //客服信息
			isAnimation: false, // 加入购物车成功之后是否显示动画
			price: 0
		};
	},

	components: {
		shopping
	},

	props: {
		ishidefooter: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		...mapState({
			config: state => state.config.config,
			user: state => state.member.info,
			// 是否显示购物车浮层
			isShowcartInfo: state => state.goodsdetail.isShowcartInfo,
			storeInfo: state => state.goodsdetail.storeInfo,
			detailInfo: state => state.goodsdetail.detailInfo,
			isOnline: state => state.member.isOnline,
			ispromotion: state => state.goodsdetail.ispromotion,
			// cartNumber: state => state.tabBar.cartNumber,
			chooseinfo: state => state.goodsdetail.chooseinfo,
			number: state => state.goodsdetail.number,
			mclass: state => state.member.mclass,
			area_id: state => state.member.area_id,
			storeInfo: state => state.goodsdetail.storeInfo,
			tsids: state => state.member.tsids,
			upgrape: state => state.goodsdetail.upgrape,
		}),
		getCarCount() {
			if (this.cartNumber > 0 && this.cartNumber < 100) {
				return this.cartNumber;
			} else if (this.cartNumber >= 100) {
				return '99';
			}
		},
		getinformationCount() {
			if (this.informationNumber > 0 && this.informationNumber < 100) {
				return this.informationNumber;
			} else if (this.informationNumber >= 100) {
				return '99';
			}
		},
		CanAddCart() {
			// this.detailInfo.gw_dz = 4;
			if (this.detailInfo.gw_dz == 7) {
				//商家登录
				if (!this.area_id) {
					Toast('请先设置收货地址');
					return false;
				} else {
					return true;
				}
			}
			if (this.detailInfo.gw_dz == 2) {
				///在团购的配送区域内；
				return true;
			}
			if (this.detailInfo.gw_dz == 4) {
				//在零售的配送区域内；
				return true;
			}
			if (this.detailInfo.gw_dz == 3) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('不在团购的配送区域内');
				return false;
			}
			if (this.detailInfo.gw_dz == 5) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('不在零售的配送区域内；');
				return false;
			}
			if (this.detailInfo.gw_dz == -1) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('请先去购物车清理商品');
				return false;
			}
			// if(this.mclass <3 && this.mclass>0){
			// 	var end = false;
			// 	for(var item of this.tsids){
			// 		if(item == this.storeInfo.store_id){
			// 			end = true;
			// 		}
			// 	}
			// 	return end;
			// }
			// return true;
		}
	},

	created() {
		this.$on('start-addcart-animation', () => {
			this.isAnimation = true;
		});
		this.$on('end-addcart-animation', () => {
			this.isAnimation = false;
			this.saveCartState(false);
		});
		this.getCartCount();
		this.$on('update-cart-num', () => {
			this.getCartCount();
		});
	},
	mounted() {
		this.xgprise();
	},
	methods: {
		...mapMutations({
			saveCartState: 'saveCartState',
			changeType: 'changeType',
			saveSelectedCartGoods: 'saveSelectedCartGoods'
		}),
		xgprise() {
			this.price = 10;
			if (this.upgrape) {
				this.price = this.detailInfo.goods_g_price;
			}
			this.price = this.price * this.detailInfo.goods_price;
		},
		goChat() {
			if (!this.user) {
				Toast('请先登录');
			} else if (this.user.member_id == this.storeInfo.member_id) {
				Toast('不能和自己聊天');
			} else {
				this.$router.push({ name: 'MemberChatInfo', query: { t_id: this.storeInfo.member_id, goods_id: this.detailInfo.goods_id } });
			}
		},
		getCartCount() {
			if (this.isOnline) {
				// 查询 购物车商品数量
				cartQuantity().then(res => {
					if (res) {
						this.cartNumber = res.result.cart_count;
					}
				});

				// 查询 客服信息
				// cartQuantity().then(res => {
				//   if (res) {
				// 	  this.informationNumber = 100;
				//   }
				// })
			}
		},
		// 加入购物车
		addShopping(value) {
			this.saveCartState(value);
			this.changeType('确定');
		},

		// 立即购买
		checkout() {
			if (this.mclass < 3 && !this.area_id) {
				//如果 没有默认收货地址
				Toast('请添加默认收货地址');
				setTimeout(() => {
					this.$router.push({ name: 'MemberAddressList' });
				}, 1000);
				return false;
			}

			//修改价格
			let m_per = 1;
			if (this.upgrape) {
				m_per = this.detailInfo.goods_g_price;
			}
			if (this.detailInfo.is_virtual == '1') {
				let params = { goods_id: this.detailInfo.goods_id, quantity: 1 };
				if (this.detailInfo.pintuan_type) {
					params['pintuan_id'] = this.detailInfo.pintuan_id;
					params['pintuangroup_id'] = 0;
				}
				this.$router.push({ name: 'MemberVrBuyStep1', query: params });
			} else {
				let params = { buy_now: 1, cart_id: this.detailInfo.goods_id + '|'+ this.number };
				if (this.detailInfo.bargain_info) {
					if (this.detailInfo.bargainorder_info) {
						if (this.detailInfo.bargainorder_info.bargainorder_state == 2) {
							params['bargainorder_id'] = this.detailInfo.bargainorder_info.bargainorder_id;
						} else {
							this.$router.push({ name: 'HomeBargainshare', query: { bargainorder_id: this.detailInfo.bargainorder_info.bargainorder_id } });
							return;
						}
					} else {
						// 新增砍价
						addBargain(this.detailInfo.bargain_info.bargain_id)
							.then(res => {
								this.$router.push({ name: 'HomeBargainshare', query: { bargainorder_id: res.result.bargainorder_id } });
							})
							.catch(function(error) {
								Toast(error.message);
							});
						return;
					}
				} else if (this.detailInfo.pintuan_type) {
					params['pintuan_id'] = this.detailInfo.pintuan_id;
					params['pintuangroup_id'] = 0;
				}
				params['m_per'] = m_per;
				this.$router.push({ name: 'MemberBuyStep1', query: params });
			}
		},

		// 购物车
		goCart() {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeCart', params: { type: 0 } });
			} else {
				this.$router.push({ name: 'HomeMemberLogin' });
			}
		},

		/*
		 * fromatArray: 格式化数组
		 */
		fromatArray(delimiter, arrays) {
			let data = '';
			if (delimiter) {
				data = arrays.join(delimiter);
			}
			return delimiter ? data : arrays;
		},

		/*
		 * isHasStock: 是否还有库存
		 */
		isHasStock(id) {
			let data = this.detailInfo.stock;
			if (data.length > 0) {
				for (let i = 0, len = data.length; i <= len - 1; i++) {
					if (data[i].goods_attr == id) {
						return '' + data[i].stock_number + '';
					}
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-detail-footer {
	background: rgba(255, 255, 255, 1);
	border-top: 0.5px solid #e8eaed;
	width: auto;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 0;
	&.hidden-cart-footer {
		display: none;
	}

	&.show-cart-footer {
		display: block;
	}

	.footer-flex {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		height: 4.67rem;
		padding: 0 1.42rem;
	}
	p.good-stock-none {
		width: 100%;
		height: 1.6rem;
		background: #c3c3c3;
		opacity: 0.5;
		font-size: 0.7rem;
		color: #333;
		position: absolute;
		text-align: center;
		line-height: 1.6rem;
		padding: 0;
		margin: 0;
		bottom: 2.2rem;
	}
	div.left {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 37%;
		margin-right: 1rem;
		.item {
			text-align: center;
			position: relative;
			// .iconfont {
			// 	flex-shrink: 0;
			// 	font-size: 1.2rem;
			// }
			img {
				width: 1.71rem;
				height: 1.62rem;
				margin-bottom: 0.29rem;
			}
			.text {
				font-size: 0.86rem;
				color: gray;
				display: block;
			}
		}
		span.icon {
			position: absolute;
			right: 0;
			top: -0.7em;
			font-size: 1rem;
			line-height: 1.4rem;
			width: 1.4rem;
			height: 1.4rem;
			background: #ef3338;
			border-radius: 1rem;
			text-align: center;
			color: #ffffff;
		}
	}
	div.right {
		flex: 1;
		display: flex;
		flex-direction: row;
		.button {
			// flex: 1;
			height: 3.33rem;
			font-size: 1.14rem;
			color: #ffffff;
			text-align: center;
			line-height: 3.33rem;
			width: 41%;
			border-radius: 1.67rem;
			// cursor: pointer;
		}
		.disabled-cart {
			background: #c3c3c3;
		}
		.active-cart {
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
			flex:1;
		}
		.sty_none{
			background: linear-gradient(90deg, #999 0%, #ddd 100%);
			flex:1;
		}
		.disabled-buy {
			background: linear-gradient(268deg, #f37335 0%, #fdc830 100%);
		}
		.active-buy {
			background: linear-gradient(268deg, #f37335 0%, #fdc830 100%);
			margin-left: 1.42rem;
		}
	}
}
.ui-cart-animation {
	position: fixed;
	top: 50%;
	left: 50%;
}
</style>
