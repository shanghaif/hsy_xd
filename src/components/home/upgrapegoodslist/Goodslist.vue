<template>
	<div class="container">
		<home-common-search-upgrape :value="params.keyword"></home-common-search-upgrape>
		<goodslist-body></goodslist-body>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HomeCommonSearchUpgrape from '../common/HomeCommonSearchUpgrape';
import GoodslistBody from './GoodslistBody';
export default {
	name: 'HomeGoodslist',
	components: {
		HomeCommonSearchUpgrape,
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
