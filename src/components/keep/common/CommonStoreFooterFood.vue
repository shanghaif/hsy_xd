<template>
	<div class="home-base">
		<router-view />
		<div class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeStoreabout' }" id="home_about">
					<router-link :to="{ name: 'HomeStoreabout', query: { id: store_id } }" class="item">
						<!-- <i class="iconfont icon-homepage" /> -->
						<img :src="$route.name == 'HomeStoreabout' ? iconHomeAbout2 : iconHomeAbout1" alt="" />
						<span class="text">商家信息</span>
					</router-link>
				</mt-tab-item>
				
				<!-- <mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeStoreGoodslist' }" id="home_goodsclass">
					<router-link :to="{ name: 'HomeStoreGoodslist', query: { id: store_id } }" class="item">
						<img :src="$route.name == 'HomeStoreGoodslist' ? iconProductSelect2 : iconProductSelect1" alt="" />
						<span class="text">可选商品</span>
					</router-link>
				</mt-tab-item> -->

				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeStoreFoodslist' }" id="home_search">
					<router-link :to="{ name: 'HomeStoreFoodslist', query: { id: store_id } }" class="item">
						<!-- <i class="iconfont icon-sousuo1" /> -->
						<img :src="$route.name == 'HomeStoreFoodslist' ? iconStoreGoods2 : iconStoreGoods1" alt="" />
						<span class="text">选择菜品</span>
					</router-link>
				</mt-tab-item>

				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'MemberChatInfo' }" id="home_search" @click.native="jumpToNeed">
					<!-- <router-link :to="{ name: 'MemberChatInfo', query: { t_id: storeInfo.member_id } }" class="item"> -->
						<!-- :to="{ name: 'MemberChatInfo', query: { t_id: storeInfo.member_id } }" -->
						<!-- <i class="iconfont icon-sousuo1" /> -->
						<div class="item">
							<img :src="iconMessage3" alt="" />
							<span class="text">咨询商家</span>
						</div>
						
					<!-- </router-link> -->
				</mt-tab-item>
				<!-- <mt-tab-item class="item-wrap" :class="{ active: $route.name == 'MemberIndex' }" id="member_index">
					<router-link :to="{ name: 'MemberIndex' }" class="item">
						<i class="iconfont icon-people" />
						<span class="text">我的</span>
					</router-link>
				</mt-tab-item> -->
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
	name: 'CommonStoreFooter',
	data() {
		return {
			home_selected: 'home_about',
			iconHomeAbout1: require('@/assets/image/icon2/icon-store-info.png'),
			iconHomeAbout2: require('@/assets/image/icon2/icon-store-info2.png'),
			iconProductSelect1: require('@/assets/image/icon2/icon-product-select.png'),
			iconProductSelect2: require('@/assets/image/icon2/icon-product-select2.png'),
			iconStoreGoods1: require('@/assets/image/icon2/icon-product-all.png'),
			iconStoreGoods2: require('@/assets/image/icon2/icon-product-all2.png'),
			iconMessage3: require('@/assets/image/icon2/icon-message3.png')
			
		};
	},
	props: ['store_id'],
	computed: {
		...mapState({
			storeInfo: state => state.goodsdetail.storeInfo,
			user: state => state.member.info,
		})
	},

	created: function() {},
	methods:{
		jumpToNeed() {
			if (!this.user) {
				Toast('请先登录');
			} else if (this.user.member_id == this.storeInfo.member_id) {
				Toast('不能和自己聊天');
			} else {
				this.$router.push({ name: 'MemberChatInfo', query: { t_id: this.storeInfo.member_id } });
			}
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.common-footer-wrap {
	height: 2.5rem;
	.common-footer {
		height: 5.76rem;
		line-height: 5.76rem;
		background: #fbfbfb;
		border-top: 1px solid #efefef;
		z-index: 99;
		.item-wrap {
			padding: 0.76rem 0;
			// height: 100%;
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			// justify-content: center;
			.mint-tab-item-label {
				width: 100%;
				font-size: 0.98rem;
				height: 100%;
			}
			img {
				width: 1.74rem;
				height: 100%;
				margin-bottom: 0.55rem;
			}
			// text {
			// 	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
			// 	-webkit-user-select: none;
			// 	-moz-user-focus: none;
			// 	-moz-user-select: none;
			// }
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
.item {
	text-decoration: none;
	// padding: 0.86rem 0 0.38rem 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 1);
	img {
		width: 1.76rem;
		height: 1.9rem;
		margin-bottom: 0.55rem;
	}
}
</style>
