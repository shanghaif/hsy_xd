<!-- OrderDetailBody.vue -->
<template>
	<div class="order-deliver">
		<!-- <div class="common-header-wrap">
            <mt-header title="物流跟踪" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="物流跟踪"></head-title>
		<div>
			<mt-cell title="物流公司" :value="express_name" />
			<mt-cell title="物流单号" :value="shipping_code" />
		</div>
		<div class="mt-5" v-if="deliver_info"><mt-cell v-for="(item, index) in deliver_info" :key="index" :title="item.AcceptTime" :value="item.AcceptStation" /></div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox } from 'mint-ui';
import { getOrderDeliver } from '../../../api/sellerOrder';
export default {
	name: 'SellerOrderDeliver',
	data() {
		return {
			deliver_info: false,
			express_name: '',
			shipping_code: ''
		};
	},
	components: {
		HeadTitle
	},
	mounted() {
		resetRem();
	},
	created: function() {
		if (this.$route.query.order_id) {
			getOrderDeliver(this.$route.query.order_id)
				.then(res => {
					this.deliver_info = res.result.deliver_info;
					this.express_name = res.result.express_name;
					this.shipping_code = res.result.shipping_code;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {}
};
</script>
<style lang="scss" scoped="scoped">
.order-deliver {
	
	/deep/.mint-cell {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
		padding: 0 1.43rem;
		display: flex;
		justify-content: space-between;
		position: relative;
		.mint-cell-wrapper {
			.mint-cell-title {
				width: 8rem;
				// flex: unset;
			}
			.mint-cell-value {
				flex: 1;
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
			right: 0!important;
			height: 1px;
			left: 1.43rem;
			width: 96%!important;
			background-color: #efefef;
		}
	}
}
</style>
