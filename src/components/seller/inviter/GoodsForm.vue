<template>
	<div class="container hsy_main inviter-goods-form">
		<!-- <div class="common-header-wrap">
            <mt-header :title="getTitle" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
                <mt-button slot="right"  @click="onDelete" v-if="!isAddMode">删除</mt-button>
            </mt-header>
        </div> -->
		<head-title :title="getTitle" :titleRight="isDelete"></head-title>
		<div v-if="isAddMode">
			<div @click="popupSelect = true">
				<mt-cell :title="getSelecedTitle"><i class="iconfont">&#xe650;</i></mt-cell>
			</div>
			<mt-popup v-model="popupSelect" position="right" class="common-popup-wrapper" :modal="false">
				<!-- <div class="common-header-wrap">
					<mt-header title="选择商品" class="common-header"><mt-button slot="left" icon="back" @click.native="popupSelect = false"></mt-button></mt-header>
				</div> -->
				<div class="header-wrap">
					<img @click="popupSelect = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
					<span class="header-title">选择商品</span>
					<span></span>
				</div>
				<div class="select-goods">
					<ul>
						<li class="product-info" v-for="item in selectGoodsList" v-bind:key="item.goods_commonid" @click="selectedGoods(item)">
							<!-- <div class="p-img"><img :src="item.goods_image" /></div>
							<div class="p-info">
								<p class="name">{{ item.goods_name }}</p>
								<p class="price">{{ item.goods_price }}</p>
							</div> -->
							<img class="product-icon" v-lazy="item.goods_image" />
							<span class="product-title">{{ item.goods_name }}</span>
							<div class="product-bottom">
								<span class="product-price">
									<span class="rmb">￥</span>
									<span>{{ item.goods_price }}</span>
								</span>
								<!-- <span class="product-buy">{{ item.goods_salenum }}人已购买</span> -->
								<img class="detail-more" src="../../../assets/image/icon2/icon-more.png" />
							</div>
						</li>
					</ul>
				</div>
			</mt-popup>
		</div>
		<div v-else><div class="title">{{getSelecedTitle}}</div> <!-- <mt-cell :title="getSelecedTitle"></mt-cell> --></div>
		<mt-field label="1级佣金比例" v-model="goods.inviter_ratio_1"></mt-field>
		<mt-field label="2级佣金比例" v-model="goods.inviter_ratio_2"></mt-field>
		<mt-field label="3级佣金比例" v-model="goods.inviter_ratio_3"></mt-field>
		<mt-button class="hsy_btn hsy_f" type="primary" v-on:click="submit">提交</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import { searchGoodsList, addInviterGoods, editInviterGoods, getInviterGoodsInfo, delInviterGoods } from '../../../api/sellerInviter';
export default {
	name: 'GoodsForm',
	data() {
		return {
			// 弹出选择商品
			popupSelect: false,
			// 商品列表用于选择商品设置分拥比例
			selectGoodsList: [],
			// 关键词
			selectGoodsName: '',
			goods: {
				goods_commonid: 0,
				goods_name: '',
				inviter_ratio_1: '',
				inviter_ratio_2: '',
				inviter_ratio_3: ''
			},
			isDelete:''
		};
	},
	components: {
		HeadTitle
	},
	created: function() {
		if(!this.isAddMode) {
			this.isDelete = '删除'
		}
		if (!this.isAddMode) {
			this.goods.goods_commonid = this.$route.query.goods_commonid;
			getInviterGoodsInfo(this.goods.goods_commonid)
				.then(res => {
					this.goods = res.result.info;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		} else {
			this.getSelectGoodsList();
		}
	},
	computed: {
		isAddMode() {
			let mode = this.$route.query.action;
			if (mode === 'add') {
				return true;
			} else {
				return false;
			}
		},
		getTitle() {
			if (this.isAddMode) {
				return '新增分销商品';
			} else {
				return '修改分销商品';
			}
		},
		getSelecedTitle() {
			if (this.goods.goods_commonid) {
				return this.goods.goods_name;
			} else {
				return '选择商品';
			}
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		fun_right() {
			this.onDelete();
		},
		onDelete() {
			MessageBox.confirm('确定要取消该商品佣金设置吗？').then(action => {
				delInviterGoods(this.goods.goods_commonid).then(
					response => {
						this.$router.push({ name: 'SellerInviterGoodsList' });
					},
					error => {
						Toast(error.message);
					}
				);
			});
		},
		submit() {
			if (this.isAddMode) {
				Indicator.open();
				addInviterGoods(this.goods).then(
					response => {
						Indicator.close();
						Toast(response.message);
						this.$router.push({ name: 'SellerInviterGoodsList' });
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			} else {
				Indicator.open();
				editInviterGoods(this.goods).then(
					response => {
						Indicator.close();
						Toast(response.message);
						this.$router.push({ name: 'SellerInviterGoodsList' });
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			}
		},
		// 获取商品列表 用于设置产品分佣
		getSelectGoodsList() {
			searchGoodsList(this.selectGoodsName)
				.then(res => {
					this.selectGoodsList = res.result.goods_list;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		// 选择商品
		selectedGoods(item) {
			this.goods.goods_name = item.goods_name;
			this.goods.goods_commonid = item.goods_commonid;
			// Close
			this.popupSelect = false;
		}
	}
};
</script>

<style scoped lang="scss">
.select-goods {
	overflow-y: scroll;
	height: 82vh;
	padding: 0.95rem 1.42rem 5rem 1.42rem;
	>ul {
		display: flex;
		flex-wrap: wrap;
		margin-right: -2.66%;
	}
}
.product-info {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: #fff;
	margin-bottom: 0.86rem;
	width: 47.34%;
	margin-right: 2.66%;
	height: fit-content;
	max-height: 23.76rem;
	border-radius: 0.69rem;
	justify-content: flex-end;
	box-sizing: border-box;

	.product-icon {
		width: 16.43rem;
		height: 16.43rem;
		box-sizing: border-box;
	}

	.product-title {
		margin: 0.86rem 1.3rem 0.43rem;
		font-size: 1.13rem;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.product-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1.3rem 1.3rem;

		.product-price {
			font-family: DIN-Regular, DIN;
			font-weight: bold;
			color: rgba(229, 50, 22, 1);
			span {
				font-size: 1.65rem;
			}
			.rmb {
				font-size: 0.95rem;
			}
		}
		.detail-more {
			width: 0.86rem;
			height: 0.17rem;
		}
	}
}
// .select-goods li {
// 	// height: 3rem;
// 	padding: 0.95rem 1.42rem;
// 	display: flex;
// }
// .select-goods li .p-img {
// }
// .select-goods li .p-img img {
// 	width: 6.67rem;
// 	height: 6.67rem;
// 	border-radius: 0.76rem;
// }
// .select-goods li .p-info {
// 	margin-left: 1.43rem;
// 	flex-grow: 1;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// }
// .select-goods li .p-info p {
// 	// line-height: 1rem;
// }
// .select-goods li .p-info .price {
// 	color: $primaryColor;
// 	height: 2rem;
// 	font-size: 1.14rem;
// }
// .select-goods li .p-info .name {
// 	font-size: 1.33rem;
// 	color: #161616;
// }
.header-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.24rem 1.43rem;
	font-size: 1.39rem;
	font-weight: 400;
	background-color: #fff;
	color: #161616;
	// margin-bottom: 1.43rem;
	position: relative;
	img {
		width: 1.71rem;
		height: 1.71rem;
	}
	span {
		transform: translate(-50%, 0);
		left: 50%;
		position: absolute;
	}
}
.common-popup-wrapper {
	background-color: rgba(244, 245, 247, 1);
}
.inviter-goods-form {
	/deep/.mint-cell-value {
		input {
			font-size: 1.18rem;
		}
	}
	.title {
		padding: 0.95rem 1.42rem;
		font-weight: 600;
		font-size: 1.57rem;
		margin-top: 1rem;
	}
}
</style>
