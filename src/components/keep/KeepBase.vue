<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-16 09:13:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-19 15:13:36
-->
<template>
	<div class="home-base">
		<keep-alive >
			<router-view v-if="$route.meta.keepAlive"/>
		</keep-alive>
		<router-view  v-if="!$route.meta.keepAlive"/>

		<div v-if="$route.meta.footer.show" class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'KeepIndex' }" id="home_index">
					<router-link :to="{ name: 'KeepIndex' }" class="item">
						<i :style="{color:$route.name == 'KeepIndex'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe682;</i>
						<!-- <img style="width: 1.76rem;height: 1.9rem;" :src="$route.name == 'KeepIndex' ? iconHomeSe : iconHome" alt="" /> -->
						<span class="text">首页</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'KeepStoreclass' }" id="home_goodsclass">
					<router-link :to="{ name: 'KeepStoreclass' }" class="item">
						<i :style="{color:$route.name == 'KeepStoreclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe62d;</i>
						<!-- <img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'KeepStoreclass' ? iconFenleiSe : iconFenlei" alt="" /> -->
						<span class="text">商家</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'KeepGoodsclass' }" id="home_cart">
					<router-link :to="{ name: 'KeepGoodsclass' }" class="item">
						<i :style="{color:$route.name == 'KeepGoodsclass'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe6e7;</i>
						<!-- <img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'KeepGoodsclass' ? iconFaxianSe : iconFaxian" alt="" /> -->
						<span class="text">商品</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'KeepMapdh' }" id="home_index">
					<router-link :to="{ name: 'KeepMapdh' }" class="item">
						<i :style="{color:$route.name == 'KeepMapdh'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe657;</i>
						<!-- <img style="width: 1.76rem;height: 1.9rem;" :src="$route.name == 'KeepMapdh' ? iconHomeSe : iconHome" alt="" /> -->
						<span class="text">网格</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'KeepTransparent' }" id="home_index">
					<router-link :to="{ name: 'KeepTransparent' }" class="item">
						<!-- <i :style="{color:$route.name == 'KeepTransparent'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe659;</i> -->
						<i :style="{color:$route.name == 'KeepTransparent'?'#e93b3d':'#666'}"  class="icon iconfont">&#xe68f;</i>
						<!-- <img style="width: 1.76rem;height: 1.9rem;" :src="$route.name == 'KeepTransparent' ? iconHomeSe : iconHome" alt="" /> -->
						<span class="text">透明</span>
					</router-link>
				</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'HomeBase',
	data() {
		return {
			home_selected: 'home_index',
			iconHome:  require('../../assets/image/icon2/tabbar-index.png'),
			iconHomeSe: require('../../assets/image/icon2/tabbar-index2.png'),
			
			iconFenlei: require('../../assets/image/icon2/tabbar-fenlei.png'),
			iconFenleiSe: require('../../assets/image/icon2/tabbar-fenlei2.png'),
			
			iconMapdh:require('../../assets/image/icon2/tabbar-nav.png'),
			iconMapdhSe: require('../../assets/image/icon2/tabbar-nav2.png'),
			
			iconFaxian: require('../../assets/image/icon2/tabbar-faxian.png'),
			iconFaxianSe: require('../../assets/image/icon2/tabbar-faxian2.png'),
			
			iconMySelect:require('../../assets/image/icon2/tabbar-my2.png'),
			iconMy:require('../../assets/image/icon2/tabbar-my.png')
		};
	},
	computed: {
		...mapState({
			user: state => state.member.info
		})
	},
	created: function() {
		// if (!this.user) {
		// 	this.$router.push({ name: 'HomeMemberLogin' });
		// }
	},
	watch: {
		home_selected: function(val, oldVal) {
			// 这里就可以通过 val 的值变更来确定去向
			switch (val) {
				case 'member_index':
					if (!this.user) {
						this.$router.push({ name: 'HomeMemberLogin' });
					}
					break;
			}
		}
	},
	methods: {}
};
</script>
<style lang="scss">
.common-footer-wrap {
	height: 2.5rem;
	.common-footer {
		height: 4.76rem;
		line-height: 4.76rem;
		background: #fbfbfb;
		border-top: 1px solid #efefef;
		z-index: 99;
		.item-wrap {
			padding: 0.2rem 0;
			.mint-tab-item-label {
				width: 100%;
				font-size: 0.98rem;
			}
			.item {
				text-decoration:none;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #666;
				img {
					width: 1.74rem;
					height: 1.9rem;
					margin-top: 0.36rem;
					margin-bottom: 0.5rem;
				}
				.icon{
					margin-top: 0.6rem;
					font-size: 2.4rem;
    			line-height: 2.4rem;
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
