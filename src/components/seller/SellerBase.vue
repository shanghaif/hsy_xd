<template>
	<div class="seller-base">
		<router-view />
		<div v-if="$route.meta.footer.show" class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeIndex' }" id="home_index">
					<router-link :to="{ name: 'HomeIndex' }" class="item">
						<i class="iconfont icon-homepage" />
						<span class="text">返回商城</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'SellerOrderList' }" id="seller_order">
					<router-link :to="{ name: 'SellerOrderList' }" class="item">
						<i class="iconfont icon-quanbudingdan1" />
						<span class="text">订单管理</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'SellerIndex' }" id="seller_index">
					<router-link :to="{ name: 'SellerIndex' }" class="item">
						<i class="iconfont icon-people" />
						<span class="text">店铺中心</span>
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'SellerBase',
	data() {
		return {
			home_selected: 'seller_index'
		};
	},
	computed: {
		...mapState({
			user: state => state.seller.info
		})
	},
	created: function() {
		if (!this.user) {
			this.$router.push({ name: 'HomeSellerLogin' });
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.common-footer-wrap {
	height: 2.5rem;
	.common-footer {
		height: 2.5rem;
		line-height: 2.5rem;
		background: #fbfbfb;
		border-top: 1px solid #efefef;
		z-index: 99;
		.item-wrap {
			padding: 0.2rem 0;
			.item {
				color: #666;
				.iconfont {
					display: block;
					width: 1.5rem;
					height: 1.5rem;
					line-height: 1.5rem;
					font-size: 1.5rem;
					text-align: center;
					margin: 0 auto;
				}
				.text {
					font-size: 0.6rem;
					line-height: 0.6rem;
				}
			}
		}
		.item-wrap.is-selected {
			background: none;
		}
		.item-wrap.active {
			background: none;
			.item {
				color: #e93b3d;
			}
		}
	}
}
</style>
