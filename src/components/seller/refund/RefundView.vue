<template>
	<div class="member-information">
		<!-- <div class="common-header-wrap">
			<mt-header title="退款详情" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="退款详情"></head-title>
		<mt-cell title="退款编号" :value="refund.refund_sn"></mt-cell>
		<mt-cell title="退款原因" :value="refund.reason_info"></mt-cell>
		<mt-cell title="退款金额" :value="refund.refund_amount"></mt-cell>
		<mt-cell title="退款说明" :value="refund.buyer_message"></mt-cell>
		<div @click="isshow = true"><mt-cell title="退款凭证" :value="pic_list.length > 0 ? '查看' : ''"></mt-cell></div>
		<mt-cell title="退款状态" v-if="refund.seller_state" :value="refund.seller_state|filterState"></mt-cell>
		<mt-cell title="备注信息" v-if="refund.seller_message" :value="refund.seller_message"></mt-cell>
		<mt-cell title="平台备注" v-if="refund.admin_message" :value="refund.admin_message"></mt-cell>

		<mt-popup v-model="isshow" popup-transition="popup-fade" v-if="pic_list.length > 0">
			<div class="preview-picture">
				<div class="picture-header" v-on:click="isshow = false">
					<span>关闭</span>
					<span v-if="pic_list">{{ defaultindex + 1 }} / {{ pic_list.length }}</span>
				</div>

				<div class="picture-body">
					<mt-swipe
						:auto="0"
						:show-indicators="true"
						:default-index="defaultindex"
						class="ui-common-swiper"
						:prevent="false"
						:stop-propagation="true"
						@change="handleChange"
					>
						<mt-swipe-item v-for="(item, index) in pic_list" v-bind:key="index"><img v-bind:src="item" @click="setPopHeader()" /></mt-swipe-item>
					</mt-swipe>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getRefundInfo } from '../../../api/sellerRefund';
export default {
	components: { HeadTitle },
	name: 'SellerRefundView',
	data() {
		return {
			refund_id: this.$route.query.refund_id,
			refund: {},
			pic_list: [],
			isshow: false,
			defaultindex: 0
		};
	},
	mounted() {
		resetRem();
	},
	filters:{
		filterState(k){
			return k==1?"待审核":k==2?"同意":'不同意'
		}
	},
	computed: {},
	created: function() {
		getRefundInfo(this.refund_id)
			.then(res => {
				this.refund = res.result.refund;
				this.pic_list = res.result.pic_list;
			})
			.catch(function(error) {
				Toast(error.message);
			});
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		/*
              handleChange: 轮播图改变时设置是否阻止事件冒泡
              @params: index 当前滑动的index
           */
		handleChange(index) {
			this.defaultindex = index;
		}
	}
};
</script>
<style lang="scss" scoped>
.swipe-wrapper {
	width: 100%;
}
.mint-popup {
	width: 100%;
	height: 100%;
	background-color: #000;
}
.mint-swipe,
.mint-swipe-items-wrap {
	position: static;
}
.preview-picture {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #000;
	.picture-header {
		height: 2.2rem;
		padding: 0.95rem 0;
		color: #000;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 100%;
		top: 0;
		span {
			font-size: 0.7rem;
			font-weight: normal;
			&:first-child {
				cursor: pointer;
				position: absolute;
				left: 1.5rem;
				background-size: 2rem;
				display: inline-block;
				// height: 2.2rem;
				// line-height: 2.2rem;
				padding: 0.95rem 0;
			}
		}
	}
	.picture-body {
		position: absolute;
		top: 3rem;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
}
.member-information {
	/deep/.mint-cell {
		padding: 1.19rem 0;
		min-height: 0;
		&::after {
			background-color: #efefef;
			left: 1.42rem;
			right: 0rem;
		}
		.mint-cell-wrapper {
			padding: 0 1.42rem;
			font-size: 1.33rem;
			.mint-cell-title {
				.mint-cell-text {
					font-weight: 400;
					color: #161616;
				}
			}
			.mint-cell-value {
				    max-width: 77%;
				span {
					font-size: 1.33rem;
					font-weight: 400;
					color: #6f6f6f;
				word-wrap: break-word;
				overflow: hidden;
				}
			}
		}
	}
}

.ui-common-swiper{
	width: 100%;
	height: 27.33rem!important;
	position: relative;
	.mint-swipe-items-wrap div.mint-swipe-item>img {
		height: auto;
		// width: 100%;
		transform: translate(-50%,-50%);
		top: 50%;
		left: 50%;
		position: absolute;
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
