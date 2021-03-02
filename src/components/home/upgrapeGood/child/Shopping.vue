<!-- Shopping.vue -->
<template>
	<div class="container hsy_main">
		<mt-popup class="mint-pop" v-model="isShowcartInfo" position="bottom" v-if="detailInfo" v-bind:close-on-click-modal="false">
			<div class="ui-add-shopping" v-if="detailInfo">
				<div class="shopping-info">
					<div class="info-header">
						<img src="../../../../assets/image/home/default_image_banner.png" class="info-image" v-if="!detailInfo.photos || detailInfo.photos.length <= 0" />
						<img v-bind:src="detailInfo.photos[0]" class="info-image" v-if="detailInfo.photos && detailInfo.photos.length > 0" />
						<div>
							<span>库存{{ currentStock }}件</span>
							<span>
								<span class="iconfont" v-if="detailInfo.activity">&#xe631;</span>
								<span v-if="detailInfo.activity">{{ detailInfo.activity.name }}</span>
							</span>
							<span class="header-price">
								<span>￥</span>
								<span>{{ propertiPrice }}</span>
							</span>
							<!-- {{ chooseinfo}} -->
							<!-- <span>数量：{{ numbers }}</span> -->
						</div>

						<!-- <span class="iconfont close" v-on:click="closeCartInfo(false)">&#xe65a;</span> -->
						<img class="close" v-on:click="closeCartInfo(false)" src="@/assets/image/icon2/icon-cha.png" alt="" />
					</div>

					<div class="goods-detail-properties">
						<div v-if="detailInfo && detailInfo.goods_spec" v-for="(item, index) in detailInfo.spec_name" :key="index">
							<div class="goods-properties" v-if="detailInfo.spec_value[index]">
								<p>{{ item }}</p>
								<div class="properties-list">
									<div v-for="(key, keyindex) in detailInfo.spec_value[index]" :key="keyindex">
										<span
											@click="setCurrentIndex(keyindex, detailInfo.spec_value[index])"
											v-bind:class="{
												'active-properties': detailInfo.goods_spec[keyindex]
											}"
										>
											{{ key }}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="info-body" id="info-body">
							<p>数量</p>
							<div class="ui-number">
								<div class="reduce ui-common" @click.stop="reduceNumber()" v-bind:class="{ 'reduce-opacity': numbers <= 1 }">-</div>
								<input type="number" min="1" class="number" value="1" v-model="numbers" readonly="true" />
								<div class="add ui-common" @click.stop="addNumber()">+</div>
							</div>
						</div>
					</div>
					<div class="btn_cont">
						<button
							class="hsy_btn"
							:class="detailInfo.goods_storage > 0 ? 'active-cart' : 'disabled-cart'"
							v-on:click="detailInfo.goods_storage > 0 ? checkProduct(false) : false"
							v-if="!detailInfo.bargain_info && ((!detailInfo.pintuan_type && detailInfo.cart) || (detailInfo.pintuan_type && detailInfo.pintuangroup_list.length))"
						>
							{{ addCartText }}
						</button>
						<button
							class="hsy_btn"
							:class="detailInfo.goods_storage > 0 ? 'active-cart' : 'disabled-cart'"
							v-on:click="detailInfo.goods_storage > 0 ? checkProduct(true) : false"
							v-if="!detailInfo.bargain_info && ((!detailInfo.pintuan_type && detailInfo.cart) || (detailInfo.pintuan_type && detailInfo.pintuangroup_list.length))"
						>
							{{ buyNowText }}
						</button>
						<!-- <div
							class="footer-button"
							:class="detailInfo.goods_storage > 0 ? 'active-buy' : 'disabled-buy'"
							v-on:click="detailInfo.goods_storage > 0 ? checkProduct(true) : false"
						>
							{{ buyNowText }}
						</div> -->
					</div>
				</div>
			</div>
		</mt-popup>
		<mt-popup v-if="detailInfo.pintuan_type && detailInfo.pintuangroup_list.length" v-model="subjectVisible" position="right" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<mt-header title="拼团列表" class="common-header"><mt-button slot="left" icon="back" @click="subjectVisible = false"></mt-button></mt-header>
			</div>
			<div class="common-popup-content">
				<div v-for="(item, index) in detailInfo.pintuangroup_list" @click="goPintuan(item)" :key="index">
					<mt-cell :title="item.member_name" is-link v-if="!(detailInfo.pintuangroup_share_id > 0 && item.pintuangroup_headid != detailInfo.pintuangroup_share_id)">
						<!--通过拼团分享会员ID判断其他组团是否显示-->
						<span>{{ item.pintuangroup_surplus > 0 ? '还差' + item.pintuangroup_surplus + '人' : '已满员' }}</span>
						<img slot="icon" :src="item.pintuangroup_avatar" width="24" height="24" />
					</mt-cell>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import { cartAdd } from '../../../../api/homecart';
import { addBargain } from '../../../../api/memberBargain';
import { cartType } from '../../../../api/homecart';
import '@/assets/style/hsy-mint.scss';
export default {
	data() {
		return {
			pintuangroup_id: 0,
			subjectVisible: false,
			addCartText: '加入购物车',
			buyNowText: '立即购买',
			numbers: this.$store.state.goodsdetail.number > 0 ? this.$store.state.goodsdetail.number : 1, // todo 临时解决
			currentStock: this.$store.state.goodsdetail.detailInfo.goods_storage,
			productId: this.$store.state.goodsdetail.currentProductId,
			toastConfig: {
				message: '商品达到每单限购数量',
				position: 'middle'
			},
			ids: [],
			info: [],
			propertiPrice: 0,
			earlier: {}
		};
	},

	props: {
		isShowcartInfo: {
			type: Boolean,
			default: false
		}
	},

	created() {
		if (this.detailInfo.bargain_info) {
			if (this.detailInfo.bargainorder_info) {
				if (this.detailInfo.bargainorder_info.bargainorder_state == 2) {
					this.buyNowText = '砍价成功去下单';
				} else {
					this.buyNowText = '正在砍价';
				}
			} else {
				this.buyNowText = '发起砍价';
			}
		} else if (this.detailInfo.pintuan_type) {
			this.addCartText = '参加拼团';
			this.buyNowText = '立刻开团';
			this.propertiPrice = this.detailInfo.pintuan_price;
		} else if (this.detailInfo.is_presell == 1) {
			this.buyNowText = '预售购买（' + this.$moment.unix(this.detailInfo.presell_deliverdate).format('YYYY年MM月DD日') + '发货）';
		} else if (this.detailInfo.is_goodsfcode == 1) {
			this.buyNowText = 'F码购买';
		} else {
			// 过滤价格
			this.watchNumberPrice();
		}
		this.info = this.chooseinfo.specification;
		this.ids = Object.assign([], this.chooseinfo.ids);
	},

	computed: {
		...mapState({
			isOnline: state => state.member.isOnline,
			token: state => state.member.token,
			detailInfo: state => state.goodsdetail.detailInfo,
			specList: state => state.goodsdetail.specList,
			number: state => state.goodsdetail.number,
			chooseinfo: state => state.goodsdetail.chooseinfo,
			mclass: state => state.member.mclass,
			INFO: state => state.member.info, //用户信息
			market: state => state.homecart.market, //来自于哪个市场
			area_id: state => state.member.area_id, //收货地址
			upgrape: state => state.goodsdetail.upgrape,  // 供应链价格
			// exid: state => state.member.exid //当前地址
		})
	},

	watch: {
		numbers: function(value) {
			if (value) {
				if (this.detailInfo.promotion_type == 'groupbuy' && this.mclass<3) {
					if( (+value) > (+this.detailInfo.upper_limit) ){
						Toast('抢购数量已达到上限');
						this.saveNumber((+this.detailInfo.upper_limit));
						return false;
					}
				}
				let goodStorage = this.detailInfo.goods_storage;
				if (value <= 0) {
					this.numbers = 1;
					this.toastConfig.message = '受不了了，宝贝不能再少了';
					Toast(this.toastConfig);
				} else if (value > goodStorage) {
					this.toastConfig.message = '商品库存不足';
					Toast(this.toastConfig);
					this.numbers = goodStorage;
				}
				this.saveNumber(this.numbers);
				this.watchNumberPrice();
			}
		}
	},

	mounted() {},

	methods: {
		...mapActions({
			getGoodsDetail: 'getGoodsDetail'
		}),
		...mapMutations({
			saveCartState: 'saveCartState',
			saveNumber: 'saveNumber',
			saveChooseInfo: 'saveChooseInfo',
			saveProperties: 'saveProperties',
			setCartNumber: 'setCartNumber',
			saveSelectedCartGoods: 'saveSelectedCartGoods',
			saveHomecartCartType: 'saveHomecartCartType', //购物车商品类型
			saveHomecartMarket: 'saveHomecartMarket' //来自与哪个市场
		}),
		
		// 根据数量 判断是否 符合 多买惠套餐
		watchNumberPrice(){
			if (this.detailInfo.promotion_type == 'groupbuy' && ((+this.detailInfo.upper_limit)==0 || (+this.number) <= (+this.detailInfo.upper_limit)) && this.mclass<3) {
				this.propertiPrice = this.detailInfo.promotion_price;
			} else {				
				if(this.detailInfo.promotion_type == 'xianshi' && (+this.number) >= (+this.detailInfo.lower_limit) && this.mclass<3){
					this.propertiPrice = this.detailInfo.promotion_price;
				}else{
					var moneryType;
					if (this.upgrape) {
						moneryType = this.detailInfo.goods_g_price;
					}
					this.propertiPrice = this.utils.currencyPrice(moneryType * this.detailInfo.goods_price);
				}
			}
		},

		goPintuan(item) {
			if (item.pintuangroup_surplus > 0) {
				this.pintuangroup_id = item.pintuangroup_id;
				this.checkProduct(true);
			}
		},
		// 关闭购物车浮层
		closeCartInfo(value) {
			this.saveCartState(value);
		},

		// 数量加
		addNumber() {
			if (this.detailInfo.goods_storage && this.numbers > this.detailInfo.goods_storage) {
				this.toastConfig.message = '商品库存不足';
				Toast(this.toastConfig);
				this.numbers = this.detailInfo.goods_storage;
			} else {
				if (this.detailInfo.promotion_type == 'groupbuy' && this.mclass<3 ) {
					if( (+this.numbers) >= (+this.detailInfo.upper_limit) ){
						Toast('抢购数量已达到上限');
						this.saveNumber((+this.detailInfo.upper_limit));
						return false;
					}
				}
				this.numbers++;
			}
		},

		// 数量减
		reduceNumber() {
			if (this.numbers > 1) {
				this.numbers--;
			} else {
				this.numbers = 1;
				this.toastConfig.message = '受不了了，宝贝不能再少了';
				Toast(this.toastConfig);
			}
		},

		// 加入购物车
		checkProduct(checkout) {
			if (!this.isOnline) {
				this.$router.push({ name: 'HomeMemberLogin' });
			} else if (this.mclass < 3 && !this.area_id) {
				//如果 没有默认收货地址
				Toast('请添加默认收货地址');
				setTimeout(() => {
					this.$router.push({ name: 'MemberAddressList' });
				}, 1000);
			} else {
				cartType(this.INFO.member_id).then(cart => {
					if (cart.result) {
						this.saveHomecartCartType([cart.result.cart_type, cart.result.cart_area_id]); //保存购物车商品类型  商品地址
					} else {
						this.saveHomecartCartType([null, null]);
					}
					if (this.mclass < 3 && cart.result != null && cart.result.cart_type) {
						if( this.mclass == 1 &&  cart.result.cart_type == 'l' ||  this.mclass == 2 &&  cart.result.cart_type == 'c' ){
						}else{
							Toast('请先去购物车清空商品');
							return false;
						}
					}
					if (checkout) {
						// 立即购买
						if (this.detailInfo.is_virtual == '1') {
							let params = { goods_id: this.detailInfo.goods_id, quantity: this.numbers };
							if (this.detailInfo.pintuan_type) {
								params['pintuan_id'] = this.detailInfo.pintuan_id;
								params['pintuangroup_id'] = this.pintuangroup_id;
							}
							this.$router.push({ name: 'MemberVrBuyStep1', query: params });
						} else {
							let params = { buy_now: 1, cart_id: this.detailInfo.goods_id + '|' + this.numbers };
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
								params['pintuangroup_id'] = this.pintuangroup_id;
							}
							let m_per = 1;
							if (this.upgrape) {
								m_per = this.detailInfo.goods_g_price;
							}
							params['m_per'] = m_per;
							this.$router.push({ name: 'MemberBuyStep1', query: params });
						}
					} else {
						if (this.detailInfo.pintuan_type) {
							this.subjectVisible = true;
						} else {
							//alert(this.detailInfo.goods_price1)
							let m_per = 1;
							if (this.upgrape) {
								m_per = this.detailInfo.goods_g_price;
							}
							if (this.mclass > 0 && this.mclass < 3 && cart.result) {
								if (!cart.result.cart_type) {
									var new_market;
									this.mclass == '2' ? (new_market = 'c') : (new_market = 'l');
									// console.log('添加购物车market', this.market, new_market);
									this.saveHomecartMarket(new_market);
								}
							}
							cartAdd(this.detailInfo.goods_id, this.numbers, '', m_per, this.market, this.area_id).then(
								res => {
									// console.log('来自于',this.market);
									// // 保存购物车商品类型
									// this.saveHomecartCartType(this.market);
									// 首次登陆购物车是否有数据
									cartType(this.INFO.member_id).then(cart => {
										// console.log('',cart.result.cart_type);
										this.saveHomecartCartType([cart.result.cart_type, cart.result.cart_area_id]); //保存购物车商品类型  商品地址
									});
									this.$parent.$emit('update-cart-num');
									this.$parent.$emit('end-addcart-animation');
									Toast(res.message);
								},
								error => {
									Toast(error.message);
								}
							);
						}
					}
				});
			}
		},

		keyDown(event) {},

		/*
		 * setCurrentIndex: 设置当前选中的规格的id,
		 * @parmas: index 当前规格的index
		 * @parmas: specList 同类规格的列表
		 */
		setCurrentIndex(index, specList) {
			let specIndex = [];
			for (var k in specList) {
				if (typeof this.detailInfo.goods_spec[k] !== 'undefined') {
					delete this.detailInfo.goods_spec[k];
					this.detailInfo.goods_spec[index] = specList[index];
					break;
				}
			}
			for (var k in this.detailInfo.goods_spec) {
				specIndex.push(k);
			}
			specIndex = specIndex.sort(this.sortNumber).join('|');
			this.getGoodsDetail({ goods_id: this.specList[specIndex], token: this.token, extra: {} }).catch(error => {
				Toast(error.message);
			});
		},
		sortNumber(a, b) {
			return a - b;
		}
	}
};
</script>

<style lang="scss" scoped>
.mint-popup-bottom {
	overflow: initial;
	height: 70%;
}
.mint-pop {
	border-radius: 1.43rem 1.43rem 0rem 0rem;
}
.ui-add-shopping {
	/* position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%; */
	/* z-index: 200; */
	/* background:rgba(0,0,0, 0.4); */
	.shopping-info {
		background: rgba(255, 255, 255, 1);
		height: 100%;
		position: absolute;
		width: -webkit-fill-available;
		/* bottom: 0; */
		z-index: 10;
		width: 100%;
		border-radius: 1.43rem 1.43rem 0rem 0rem;
		
		.btn_cont{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			bottom: 0;
			width: 100%;
			padding: 4%;
			box-sizing: border-box;

			.hsy_btn{
				width: 42%;
			}
		}
		.info-header {
			padding: 1.43rem 1.43rem 1.9rem;
			display: flex;
			justify-content: flex-start;
			// padding-bottom: 1.25rem;
			// border-bottom: 0.5px solid rgba(232, 234, 237, 1);
			img.info-image {
				width: 6rem;
				height: 6rem;
				border-radius: 1px;
				// margin-top: -0.75rem;
				position: absolute;
				// top: -0.65rem;
			}
			div {
				padding-left: 7.43rem;
				height: 6rem;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				span.header-price {
					display: flex;
					align-items: baseline;
					font-family: not specified;
					span {
						&:nth-child(1) {
							font-weight: 400;
							font-size: 1.33rem;
							color: #e53216;
						}
						&:nth-child(2) {
							font-size: 2.38rem;
							font-weight: bold;
							color: #e53216;
						}
					}
				}
				span {
					display: block;
					color: #8f8e94;

					&:nth-child(2) {
						img {
							vertical-align: middle;
							padding-right: 0.5rem;
							width: 2.5rem;
							height: 1rem;
						}
						span {
							display: inline;
							// font-size: 0.7rem;
							// line-height: 0.7rem;
							padding-bottom: 0.45rem;
							padding-top: 0.6rem;
						}
					}
					&:nth-child(3) {
						// font-size: 0.7rem;
						// line-height: 1rem;
						width: 100%;
						// overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-right: 0.75rem;
					}
					&:last-child {
						// font-size: 0.7rem;
						// line-height: 1rem;
						padding-top: 0.6rem;
						width: 100%;
						// overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-right: 0.75rem;
					}
				}
			}
			.close {
				position: absolute;
				top: 1.43rem;
				right: 1.43rem;
				width: 1.33rem;
				height: 1.29rem;
				// cursor: pointer;
				opacity: 1;
			}
		}
		div.goods-detail-properties {
			width: 100%;
			overflow: auto;
			height: auto;
			position: absolute;
			top: 9.2rem;
			bottom: 2.2rem;
			/* height: 100%; */
		}
		div.goods-properties {
			p {
				font-size: 0.7rem;
				color: rgba(41, 43, 45, 1);
				line-height: 0.8rem;
				margin: 0;
				padding: 0 0.75rem;
			}
			div.properties-list {
				div {
					display: inline-block;
					margin-left: 0.75rem;
					span {
						font-size: 0.7rem;
						color: rgba(78, 84, 93, 1);
						line-height: 0.7rem;
						display: inline-block;
						padding: 0.35rem 0.7rem;
						border: 1px solid #404245;
						border-radius: 0.1rem;
						cursor: pointer;
						margin-top: 0.75rem;
						&.active-properties {
							background: $primaryColor;
							color: rgba(255, 255, 255, 1);
							border: 1px solid $primaryColor;
						}
						&.disabled-properties {
							color: #b1b5bb;
							cursor: none;
							border: 1px solid #a2a6ad;
						}
					}
					/* &:nth-child(even) {
					margin-left: 0.75rem;
					} */
				}
			}
		}
		.info-body {
			padding: 0 1.43rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p {
				font-size: 1.24rem;
				font-weight: 600;
				color: #161616;
				padding: 0;
				margin: 0;
			}
			div.ui-number {
				height: 2.1rem;
				display: flex;
				// border-radius: 0.15rem 0 0 0.15rem;
				input,
				div {
					height: 100%;
					line-height: 2.1rem;
					text-align: center;
					color: #404245;
					display: inline-block;
					padding: 0;
					margin: 0;
					border: 0;
					// outline-offset: 0;
				}
				.ui-common {
					line-height: 2.1rem;
					width: 1.4rem;
					height: 100%;
					font-size: 2rem;
					padding: 0 0.95rem;
					// border: 1px solid #c7c7cd;
					// cursor: pointer;
				}
				.reduce {
					border-right: 0;
				}
				.reduce-opacity {
					opacity: 0.4;
				}
				.add {
					border-left: 0;
				}
				input[type='number'] {
					width: 3.81rem;
					// border: 1px solid #c7c7cd;
					border-radius: 0;
					border-image-width: 0;
					box-shadow: 0;
					vertical-align: bottom;

					background: #f3f3f3;
					&:focus {
						outline: none;
					}
				}
			}
		}
		.info-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			.footer-button {
				flex: 1;
				color: #ffffff;
				line-height: 2.2rem;
				text-align: center;
				font-size: 0.7rem;
				height: 2.2rem;
			}
			.active-cart {
				background: $primaryColor;
			}
			.active-buy {
				background: #000;
			}
			.disabled-buy {
				background: #999999;
			}
			.disabled-cart {
				background: #c3c3c3;
			}
		}
	}
}
</style>
