<template>
	<div class="container inviter-wrap">
		<!-- <div class="common-header-wrap">
            <mt-header title="店铺分销" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="店铺分销"></head-title>
		<div @click="goSellerInviterGoodsList">
			<mt-cell title="分销商品管理"><i class="iconfont">&#xe650;</i></mt-cell>
		</div>
		<div @click="goSellerInviterOrderList">
			<mt-cell title="分销业绩" @click="goSellerInviterOrderList"><i class="iconfont">&#xe650;</i></mt-cell>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
export default {
	name: 'Index',
	components: {
		HeadTitle
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		goSellerInviterGoodsList() {
			this.$router.push({ name: 'SellerInviterGoodsList' });
		},
		goSellerInviterOrderList() {
			this.$router.push({ name: 'SellerInviterOrderList' });
		}
	}
};
</script>

<style scoped lang="scss">
.inviter-wrap {
	/deep/.mint-cell {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
		padding: 0 1.43rem;
		display: flex;
		justify-content: space-between;
		position: relative;
		.mint-cell-wrapper {
			padding: 0;
			.mint-cell-title {
				width: 8rem;
				font-size: 1.33rem;
				// flex: unset;
			}
			.mint-cell-value {
				// flex: 1;
			}
		}
		// div {
		// 	display: flex;
		// 	align-items: center;
		// 	span {
		// 		margin-right: 1rem;
		// 	}
		// 	input {
		// 		text-align: right;
		// 	}
		// 	img {
		// 		width: 1.43rem;
		// 		height: 1.43rem;
		// 	}
		// }
		&::after {
			content: '';
			position: absolute;
			// left: 1.43rem;
			bottom: 0;
			right: 0 !important;
			height: 1px;
			left: 1.43rem;
			width: 96% !important;
			background-color: #efefef;
		}
	}
}
</style>
