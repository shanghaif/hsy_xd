<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper ui-detail-common" v-if="detailInfo">
		<div class="buy-wrapper header" @click="changeCartState()" v-if="this.activeBuy()">
			<p v-if="number <= 0 && chooseinfo.ids.length <= 0"><span>请选择购买</span>{{ chooseinfo.specification.join(',') }}数量分类</p>
			<p v-if="number <= 0 && chooseinfo.ids.length > 0"><span>已选</span>{{ chooseinfo.specification.join(',') }},数量{{ number + 1 }}</p>
			<p v-if="number > 0 && chooseinfo.ids.length <= 0"><span>已选</span>数量{{ number }}</p>
			<p v-if="number > 0 && chooseinfo.ids.length > 0"><span>已选</span>{{ chooseinfo.specification.join(',') }},数量{{ number }}</p>
			<!-- <span class="iconfont">&#xe6ef;</span> -->
			<img src="@/assets/image/icon2/icon-right.png" alt="" />
		</div>
		<div class="buy-wrapper header isopacity" @click="changeCartState()" v-if="!this.activeBuy()">
			<p v-if="number <= 0 && chooseinfo.ids.length <= 0"><span>请选择购买</span>{{ chooseinfo.specification.join(',') }}数量分类</p>
			<p v-if="number <= 0 && chooseinfo.ids.length > 0"><span>已选</span>{{ chooseinfo.specification.join(',') }},数量{{ number + 1 }}</p>
			<p v-if="number > 0 && chooseinfo.ids.length <= 0"><span>已选</span>数量{{ number }}</p>
			<p v-if="number > 0 && chooseinfo.ids.length > 0"><span>已选</span>{{ chooseinfo.specification.join(',') }},数量{{ number }}</p>
			<!-- <span class="iconfont">&#xe6ef;</span> -->
			<img src="@/assets/image/icon2/icon-right.png" alt="" />
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			priceAs: 0
		};
	},

	computed: {
		...mapState({
			number: state => state.goodsdetail.number,
			user: state => state.member.info,
			detailInfo: state => state.goodsdetail.detailInfo,
			mclass: state => state.member.mclass,
			area_id: state => state.member.area_id,
			chooseinfo: state => state.goodsdetail.chooseinfo
		})
	},

	created() {
		var priceAs = 1;
		// console.log(this.mclass);
		if (this.upgrape) {
			priceAs = this.detailInfo.goods_g_price;
		}
		this.priceAs = this.utils.currencyPrice(priceAs * this.detailInfo.goods_price);
	},

	watch: {
		detailInfo: function(value) {
			this.setSpecification();
		}
	},

	methods: {
		...mapMutations({
			saveCartState: 'saveCartState',
			saveChooseInfo: 'saveChooseInfo',
			changeType: 'changeType'
		}),

		activeBuy: function() {
			if (this.detailInfo.goods_storage > 0) {
				return true;
			} else {
				return false;
			}
		},

		changeCartState() {
			if (this.mclass == 0) {
				Toast('请先登录');
				return false;
			}
			if (this.detailInfo.gw_dz == -1) {
				Toast('请先清空购物车');
				return false;
			}
			if (this.detailInfo.gw_dz == 1 || this.detailInfo.gw_dz == 3 || this.detailInfo.gw_dz == 5) {
				Toast('请先设置收货地址');
				return false;
			}
			if (this.detailInfo.gw_dz == 3) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('不在团购的配送区域内');
				return false;
			}
			if (this.detailInfo.gw_dz == 5) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('不在零售的配送区域内；');
				return false;
			}
			if (this.detailInfo.gw_dz == -1) {
				//不在团购的配送区域内； //不在零售的配送区域内；
				Toast('请先去购物车清理商品');
				return false;
			}
			if (this.priceAs == '0.00') {
				return false;
			}
			if (!this.area_id) {
				Toast('请先设置收货地址');
				return false;
			}
			this.saveCartState(true);
			this.changeType('加入购物车');
		},

		setSpecification() {
			if (this.detailInfo && this.detailInfo.properties) {
				let data = this.detailInfo.properties;
				let arrays = [];
				for (let i = 0; i <= data.length - 1; i++) {
					arrays.push(data[i].name);
				}
				this.saveChooseInfo({ specification: arrays, ids: [] });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-buy-wrapper {
	position: relative;
	.buy-wrapper {
		&.header {
			padding: 0;
		}
		&.isopacity {
			opacity: 0.5;
		}
		p {
			// font-size: 0.7rem;
			// color: rgba(78, 84, 93, 1);
			// line-height: 1rem;
			// padding: 0;
			// margin: 0;
			span {
				margin-right: 1.43rem;
				font-size: 1.24rem;
				font-weight: 600;
				color: #161616;
			}
			// i {
			// 	font-weight: normal;
			// 	font-style: normal;
			// }
		}
		// .iconfont {
		// 	width:0.25rem;
		// 	height: 0.5rem;
		// 	cursor: pointer;
		// }
		img {
			width: 0.95rem;
			height: 0.95rem;
		}
	}
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 85.33%;
		height: 0.1rem;
		background-color: #EFEFEF;
	}
}
.ui-detail-common {
	height: 5.57rem;
	line-height: 5.57rem;
	margin-top: 0.95rem;
	background: white;
	padding: 0 1.43rem;
}
.ui-detail-common .header {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	width: auto;
}
</style>
