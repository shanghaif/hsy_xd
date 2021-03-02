<template>
	<!-- 商品 -->
	<div class="commodity-wrapper">
		<!-- 轮播图 -->
		<info-goods-swipe></info-goods-swipe>
		<!-- 商品信息 -->
		<info-item></info-item>

		<!-- 促销商品的活动结束时间 -->
		<info-promos-time></info-promos-time>
		<!-- 促销信息 -->
		<info-promotions></info-promotions>
		<!-- 食品安全 -->
		<!-- info-spaq></info-spaq -->
		<!-- 购买 -->
		<info-buy></info-buy>
		<!-- 联系客服-->
		<info-contact></info-contact>
		<!-- 评论 -->
		<info-goods-review></info-goods-review>
		<!-- 拼团 -->
		<info-like></info-like>

		<!-- 店铺信息 -->
		<div class="goods-detail-store" @click="$router.push({ name: 'HomeStoredetail', query: { id: storeInfo.store_id } })">
			<div>
				<div class="store-name">
					<img width="57" class="store-img" :src="storeInfo.store_logo" />
					<div>
						<span>{{ storeInfo.store_name }}</span>
						<span class="icon-mall" v-if="storeInfo.is_platform_store">自营</span>
						<span>{{ storeInfo.favorites_count }}人收藏店铺</span>
					</div>
					<img class="img-right" src="@/assets/image/icon2/icon-right.png" alt="" />
				</div>
				<div class="store-rate">
					<span class="equal">
						描述相符
						<em>{{ storeInfo.store_credit.store_servicecredit.credit }}</em>
						<i>{{ storeInfo.store_credit.store_servicecredit.percent_text }}</i>
					</span>
					<span class="equal">
						服务态度
						<em>{{ storeInfo.store_credit.store_desccredit.credit }}</em>
						<i>{{ storeInfo.store_credit.store_desccredit.percent_text }}</i>
					</span>
					<span class="equal">
						发货速度
						<em>{{ storeInfo.store_credit.store_deliverycredit.credit }}</em>
						<i>{{ storeInfo.store_credit.store_deliverycredit.percent_text }}</i>
					</span>
				</div>
			</div>
		</div>
		<!-- 相关菜谱 -->
		<related-recipes></related-recipes>
		<!-- 商品搭配 -->
		<accessory-item></accessory-item>
		<!-- 推荐商品  -->
		<recommend-item></recommend-item>
		<div style="height:0.25rem; background-color: #F0F2F5"></div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import InfoGoodsSwipe from './InfoGoodsSwipe';
import InfoItem from './InfoItem';
import InfoPromotions from './InfoPromotions';
import InfoPromosTime from './InfoPromosTime';
import InfoBuy from './InfoBuy';
import InfoSpaq from './InfoSpaq';
import InfoContact from './InfoContact';
import InfoLike from './InfoLike';
import InfoGoodsReview from './InfoGoodsReview';
import RecommendItem from './RecommendItem';
import AccessoryItem from './AccessoryItem';

import RelatedRecipes from './RelatedRecipes';
export default {
	data() {
		return {};
	},

	created() {},

	components: {
		InfoGoodsSwipe,
		InfoItem,
		InfoPromotions,
		InfoPromosTime,
		InfoSpaq,
		InfoBuy,
		InfoContact,
		InfoLike,
		InfoGoodsReview,
		RecommendItem,
		AccessoryItem,
		RelatedRecipes
	},

	computed: {
		...mapState({
			storeInfo: state => state.goodsdetail.storeInfo
		})
	},

	mounted() {},

	methods: {}
};
</script>

<style lang="scss" scoped>
.commodity-wrapper {
	height: 100%;
}
.goods-detail-store {
	display: block;
	position: relative;
	z-index: 1;
	padding: 1.9rem 1.43rem 1.76rem;
	background: #fff;
	margin-top: 0.95rem;
	// border-top: 0.5rem solid #eee;
}
.goods-detail-store .store-name {
	min-height: 0.9rem;
	color: #333;
	display: flex;
	align-items: center;
	img.store-img {
		border-radius: 0.76rem;
		margin-right: 0.95rem;
	}
	img.img-right {
		width:0.95rem;
		height: 0.95rem;
	}
}
.goods-detail-store .store-name div {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	height: 47px;
	span {
		&:nth-child(1) {
			font-size: 1.24rem;
			font-weight: 600;
			color: #161616;
		}
		&:nth-child(2) {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6F6F6F;
		}
	}
}
.goods-detail-store .store-name .icon-store {
	width: 0.8rem;
	height: 0.9rem;
	vertical-align: top;
	margin-right: 0.2rem;
}
.goods-detail-store .store-name .icon-store:before {
	content: '\e7dc';
}
.goods-detail-store .store-name .icon-mall {
	color: #f23030;
	font-size: 0.9rem;
	// margin-left: 0.5rem;
}
.goods-detail-store .store-rate {
	// height: 0.7rem;
	padding: 0.95rem 0 0;
	// border-top: solid 0.05rem #eee;
	font-size: 0;
	display: flex;
	justify-content: space-between;
}
.goods-detail-store .store-rate span {
	// display: inline-block;
	// width: 33.33%;
	font-size: 1.14rem;
	font-weight: 400;
	color: #6F6F6F;
	display: flex;
	font-size: 1.14rem;
	align-items: center;
}
.goods-detail-store .store-rate span em {
	display: inline-block;
	vertical-align: middle;
	font-size: 0.7rem;
	font-weight: 600;
}
.goods-detail-store .store-rate span i {
	display: inline-block;
	vertical-align: middle;
	// width: 1.2rem;
	// height: 1.2rem;
	font-size: 0.9rem;
	// line-height: 1.2rem;
	font-style: normal;
	text-align: center;
	border-radius: 0.1rem;
	margin-left: 0.2rem;
}
.goods-detail-store .store-rate span.high em,
.goods-detail-store .store-rate span.equal em {
	font-size: 1.14rem;
	font-weight: 400;
	color: #6F6F6F;
	vertical-align: baseline;
}
.goods-detail-store .store-rate span.high i,
.goods-detail-store .store-rate span.equal i {
	color: #fff;
	background-color: #f23030;
}
.goods-detail-store .store-rate span.low em {
	color: #48cfae;
}
.goods-detail-store .store-rate span.low i {
	color: #fff;
	background-color: #48cfae;
}
</style>
