<template>
	<div class="container">
		<home-common-search2 :value="params.keyword"></home-common-search2>
		<goodslist-body></goodslist-body>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HomeCommonSearch2 from '../common/HomeCommonSearch2';
import GoodslistBody from './GoodslistBody';
export default {
	name: 'HomeGoodslist',
	components: {
		HomeCommonSearch2,
		GoodslistBody
	},
	data() {
		return {
			params: {
				keyword: this.$route.query.keywords ? this.$route.query.keywords : ''
			}
		};
	},
	created() {},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	}
};
</script>

<style scoped></style>
