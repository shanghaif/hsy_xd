<!-- Concat.vue -->
<template>
	<div class="ui-concat-wrapper ui-detail-common" v-if="detailInfo">
		<div class="ui-promotions-wrapper ui-detail-common" @click="$router.push({ name: 'HomeGoodsConsult', query: { goods_id: detailInfo.goods_id } })">
			<!-- header -->
			<div class="promotions-header header">
				<h3>
					<span>商品咨询</span>
					<!-- <span class="iconfont">&#xe6ef;</span> -->
					<img src="@/assets/image/icon2/icon-right.png" alt="" />
				</h3>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},

	computed: {
		...mapState({
			detailInfo: state => state.goodsdetail.detailInfo,
			user: state => state.member.info,
			isOnline: state => state.member.isOnline
		})
	},

	watch: {},

	mounted() {
		this.$nextTick(() => {});
	},

	created() {},

	methods: {
		goSingin() {
			this.$router.push({ name: 'HomeMemberLogin' });
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-promotions-wrapper {
	&.ui-detail-common {
		padding: 0;
	}
	.promotions-header {
		// margin-top: 0.95rem;
		height: 5.57rem;
		padding: 0 1.43rem;
		line-height: 5.57rem;
		background: #fff;
		h3 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.24rem;
			font-weight: 600;
			color: #161616;
			// .iconfont {
			// 	float: right;
			// 	margin-right: -0.55rem;
			// }
			img {
				width: 0.95rem;
				height: 0.95rem;
			}
		}
	}
}
</style>
