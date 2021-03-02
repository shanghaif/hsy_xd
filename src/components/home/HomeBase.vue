<template>
	<div class="home-base">
		<keep-alive >
			<router-view v-if="$route.meta.keepAlive"/>
		</keep-alive>
		<router-view  v-if="!$route.meta.keepAlive"/>
		<div v-if="$route.meta.footer.show" class="common-footer-wrap">
			<mt-tabbar v-model="home_selected" fixed class="common-footer">
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeIndex' }" id="home_index">
					<router-link :to="{ name: 'HomeIndex' }" class="item">
						<!-- <i class='iconfont icon-homepage' /> -->
						<!-- <img v-show="!(home_selected === 'home_index')" src="../../assets/image/icon2/tabbar-index.png" alt="" />
						<img v-show="home_selected === 'home_index'" src="../../assets/image/icon2/tabbar-index2.png" alt="" /> -->
						<img style="width: 1.76rem;height: 1.9rem;" :src="$route.name == 'HomeIndex' ? iconHomeSe : iconHome" alt="" />
						<span class="text">首页</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeGoodsclass' }" id="home_goodsclass">
					<router-link :to="{ name: 'HomeGoodsclass' }" class="item">
						<!-- <i class="iconfont icon-fenlei" /> -->
						<!-- <img v-show="!(home_selected === 'home_goodsclass')" src="../../assets/image/icon2/tabbar-fenlei.png" alt="" />
						<img v-show="home_selected === 'home_goodsclass'" src="../../assets/image/icon2/tabbar-fenlei2.png" alt="" /> -->
						<img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'HomeGoodsclass' ? iconFenleiSe : iconFenlei" alt="" />
						<span class="text">分类</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeMapdh' }" id="home_mapdh">
					<router-link :to="{ name: 'HomeMapdh' }" class="item">
						<!-- <img v-show="!(home_selected === 'home_mapdh')" src="../../assets/image/icon2/tabbar-nav.png" alt="" />
						<img v-show="home_selected === 'home_mapdh'" src="../../assets/image/icon2/tabbar-nav2.png" alt="" /> -->
						<img style="width: 1.9rem;height: 1.9rem; " :src="$route.name == 'HomeMapdh' ? iconMapdhSe : iconMapdh" alt="" />
						<!-- <i class="iconfont icon-jiangjia" /> -->
						<span class="text">导航</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'HomeFaxian' }" id="home_cart">
					<router-link :to="{ name: 'HomeFaxian' }" class="item">
						<!-- <i class="iconfont icon-search" /> -->
						<!-- <img v-show="!(home_selected === 'home_cart')" src="../../assets/image/icon2/tabbar-faxian.png" alt="" />
						<img v-show="home_selected === 'home_cart'" src="../../assets/image/icon2/tabbar-faxian2.png" alt="" /> -->
						<img style="width: 1.9rem;height: 1.9rem;" :src="$route.name == 'HomeFaxian' ? iconFaxianSe : iconFaxian" alt="" />
						<span class="text">发现</span>
					</router-link>
				</mt-tab-item>
				<mt-tab-item class="item-wrap" :class="{ active: $route.name == 'MemberIndex' }" id="member_index">
					<router-link :to="{ name: 'MemberIndex' }" class="item">
						<!-- <i class="iconfont icon-people" /> -->
						<!-- <img v-show="!(home_selected === 'member_index')" src="../../assets/image/icon2/tabbar-my.png" alt="" />
						img v-show="home_selected === 'member_index'" src="../../assets/image/icon2/tabbar-my2.png" alt="" />
						<img :src="'/home' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页"> -->
						<img style="width: 1.62rem;height: 1.9rem; " :src="$route.name == 'MemberIndex' ? iconMySelect : iconMy" alt="" />
						<!-- <div>{{active ? iconMy : iconMySelect}}</div> -->
						<span class="text">我的</span>
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
			// switch (val) {
			//   case "home_index":
			//     this.$router.push("/index");
			//     break;
			//   case "stockStatistics":
			//     this.$router.push("/stockStatistics");
			//     break;
			//   case "accountStatement":
			//     this.$router.push("/accountStatement");
			//     break;
			//   case "myhome":
			//     this.$router.push("/myhome");
			//     break;
			// }
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
			// height: 100%;
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			// justify-content: center;
			.mint-tab-item-label {
				width: 100%;
				font-size: 0.98rem;
			}
			// img {
			// 	width: 1.74rem;
			// 	height: 100%;
			// 	margin-bottom: 0.55rem;
			// 	margin-top: 0.36rem;
			// }
			.item {
				text-decoration:none;
				// padding: 0.86rem 0 0.38rem 0;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: rgba(0, 0, 0, 1);
				img {
					width: 1.74rem;
					height: 1.9rem;
					margin-top: 0.36rem;
					margin-bottom: 0.5rem;
				}
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
</style>
