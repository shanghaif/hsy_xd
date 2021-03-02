<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 10:34:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-20 11:31:02
-->
<template>
	<div class="container">
		<home-common-search2 :storeGoods="params.store_id" :value="params.keyword"></home-common-search2>
		<goodslist-body :store_id_props="params.store_id"></goodslist-body>
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
				keyword: this.$route.query.keywords ? this.$route.query.keywords : '',
				store_id: this.$route.query.store_id ? this.$route.query.store_id : '',
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
