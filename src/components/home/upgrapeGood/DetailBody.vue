<!-- 商品详情  -->
<template>
	<div
		class="ui-detail-swiper"
		v-bind:class="{
			'hide-promotion-bottom': ispromotion,
			'has-goods-stock': isStock <= 0
		}"
	>
		<product-info v-if="index == 0"></product-info>
		<product-aqzs v-if="index == 1"></product-aqzs>
		<product-desc v-if="index == 2"></product-desc>
		<product-review v-if="index == 3"></product-review>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem'
import ProductInfo from './child/ProductInfo'
import ProductAqzs from './child/ProductAqzs'
import ProductDesc from './child/ProductDesc'
import ProductReview from './child/ProductReview'
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {}
	},

	props: ['isStock'],

	components: {
		ProductInfo,
		ProductAqzs,
		ProductDesc,
		ProductReview
	},

	computed: {
		...mapState({
			index: state => state.goodsdetail.index,
			ispromotion: state => state.goodsdetail.ispromotion
		})
	},

	watch: {},

	mounted() {	
		resetRem()
	},

	created() {},
	beforeDestroy() {
		resumeRem()
	},	
	methods: {
		...mapMutations({})
	}
}
</script>

<style lang="scss" scoped>
.ui-detail-swiper {
	position: absolute;
	-webkit-overflow-scrolling: touch;
	width: 100%;
	// top: 2.25rem;
	top: 4.5rem;
	bottom: 4.67rem;
	left: 0;
	right: 0;
	overflow: auto;
	z-index: 0;
	/* border: 1px solid red; */
	background: #F4F5F7;

	&.hide-promotion-bottom {
		bottom: 0;
	}
}
</style>
