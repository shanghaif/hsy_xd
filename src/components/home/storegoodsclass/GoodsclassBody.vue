<template>
	<div class="ui-category-body">
		<div class="goodslist-body show-goods-list">
			<!-- 无限加载滚动列表 -->
			<div class="flex-wrapper">
				<div class="ui-product-body" v-for="(item, index) in goodsList" v-bind:key="index">
					<div class="list" v-on:click="goDetail(item.goods_id)">
						<div class="ui-image-wrapper"><img class="product-img" v-lazy="item.goods_image_url" /></div>
						<div class="flex-right">
							<div class="product-header">
								<h3 class="title clear-bottom" style="-webkit-box-orient:vertical">{{ item.goods_name }}</h3>
							</div>
							<h3 class="clear-bottom margin_l_5" style="-webkit-box-orient:vertical">数量：{{ item.goods_storage }}</h3>
							<div class="p-price" style="-webkit-box-orient:vertical">发布日期：{{ item.goods_addtime }}</div>
							<div class="p-price" style="-webkit-box-orient:vertical">进货日期：{{ item.supplier_goods_addtime }}</div>
							<!-- <div class="p-info">
                            <span class="platform_store">自营</span>
                            <span class="goods_salenum">销量:{{ item.goods_salenum }}</span>
                        </div> -->
							<!-- <div class="add-cart"><i class="iconfont">&#xe681;</i></div> -->
						</div>
					</div>
				</div>
				<div class="loading-wrapper" v-if="goodsList.length > 0">
					<p class="common-no-more" v-if="isMore">没有更多了</p>
					<!-- <mt-spinner type="triple-bounce" color='#e93b3d' v-if='isMore'></mt-spinner> -->
				</div>
				<empty-record2 isFrom="content" v-if='goodsList.length <= 0 && !isMore'></empty-record2>
			</div>
		</div>
	</div>
</template>

<script>
import EmptyRecord2 from '../../EmptyRecord2';
import { mapState } from 'vuex';
import { getStoreGoodsListAll } from '../../../api/homestoredetail'; //获取数据函数
export default {
	props: ['store_id'],
	components: {
		EmptyRecord2
	},
	data() {
		return {
			params: {
				store_id: this.$route.query.id ? this.$route.query.id : ''
			},
			goodsList: [], // 商品列表
			isMore: true
		};
	},
	created() {
		this.loading();
	},
	methods: {
		// 加载商品函数
		loading() {
			getStoreGoodsListAll(this.store_id)
				.then(res => {
					this.goodsList = res.result;
				})
				.catch(err => {});
		},
		goDetail(goods_id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
		}
	}
};
</script>

<style scoped lang="scss">
.ui-category-body {
	width: 100%;
	.flex-wrapper {
		padding: 0.96rem;
		padding-bottom: 5rem;
		background-color: rgba(244, 245, 247, 1);
		.ui-product-body {
			// border-bottom: 1px solid rgba(232, 234, 237, 1);
			background-color: #fff;
			margin-bottom: 0.96rem;
			border-radius: 0.77rem;
			.list {
				padding: 0.96rem;
				display: flex;
				width: auto;
				align-items: center;
				justify-content: space-between;
				// margin: 0.55rem 0.5rem;
				position: relative;
				div.ui-image-wrapper {
					width: 11.91rem;
					height: 11.91rem;
					position: relative;
					display: flex;
					justify-content: center;
					align-content: center;
					align-items: center;
					flex-shrink: 0;
					background-position: center center !important;
					background-size: 11.91rem 11.91rem;
					background-repeat: no-repeat;
					-webkit-background-size: cover;
					-moz-background-size: cover;
					-o-background-size: cover;
					background-size: cover;
					img.product-img {
						width: 11.91rem;
						height: 11.91rem;
						flex-shrink: 0;
						border-radius: 0.77rem;
					}
					img.product-img[lazy='loading'] {
						width: 11.91rem;
						height: 11.91rem;
						border-radius: 0.77rem;
					}
					img.product-im[lazy='error'] {
						width: 11.91rem;
						height: 11.91rem;
						border-radius: 0.77rem;
					}
					img.product-img[lazy='loaded'] {
						width: 11.91rem;
						height: 11.91rem;
						flex-shrink: 0;
						border-radius: 0.77rem;
						background: rgba(255, 255, 255, 1);
					}
				}

				span {
					position: absolute;
					height: 1rem;
					background: rgba(243, 244, 245, 1);
					line-height: 1rem;
					text-align: center;
					font-size: 0.7rem;
					color: #e93b3d;
					width: 5.5rem;
					bottom: 0;
					left: 0;
				}
			}
			.flex-right {
				padding-left: 0.96rem;
				width: 100%;
				position: relative;
				.title {
					font-size: 1.24rem;
					font-weight: 500;
					color: #161616;
					overflow: hidden;
					    display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					&.clear-bottom {
						margin-bottom: 0;
					}
				}
				.product-header {
					margin-bottom: 0.81rem;
					display: flex;
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
				}
				.margin_l_5 {
					font-size: 1.15rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #6F6F6F;
					margin-bottom: 1rem;
				}
				.p-price {
					// color: #e93b3d;
					// font-size: 1rem;
					font-size: 1.05rem;
					font-weight: 400;
					color: #6F6F6F;
					&:last-child {
						margin-top: 0.48rem;
					}
				}
				.p-info {
					margin-bottom: 0.4rem;
					.platform_store {
						font-size: 0.8rem;
						color: #e93b3d;
						border: 1px solid #e93b3d;
						border-radius: 0.15rem;
						padding: 0 0.2rem;
					}
					.goods_salenum {
						font-size: 0.8rem;
						margin-left: 2rem;
						color: #999;
					}
				}
				.add-cart {
					background: #e93b3d;
					border-radius: 50%;
					text-align: center;
					position: absolute;
					right: 0.6rem;
					top: 0.5rem;
					width: 1.8rem;
					height: 1.8rem;
					line-height: 1.8rem;
					i {
						font-size: 1rem;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
