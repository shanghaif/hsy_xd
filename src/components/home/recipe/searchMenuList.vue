<template>
	<div class="container">
		<!-- <menuSearch></menuSearch> -->
		<!-- <home-common-search2></home-common-search2> -->
		<menuComonSearch></menuComonSearch>
		<!-- <menuSearchHeader ref="header" :keyword="keywords"></menuSearchHeader> -->
		<!-- v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" -->
		<div class="list-content" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<ul class="list-wrap">
				<li class="list-item" v-for="(item, index) in menuLists" :key="index">
					<img v-if="item.menu_image" :src="item.menu_image" alt="" @click="goMenuDetail(item.menu_id)" />
					<img v-else src="" alt="" @click="goMenuDetail(item.menu_id)" />
					<div class="menu-list-info">
						<div class="menu-list-info-top">
							<span @click="goMenuDetail(item.menu_id)">{{ item.menu_title }}</span>

							<!-- <span class="dianzan" v-if="isFrom == 'createdMenu'">
								<img :src="zanBlock" alt="" />
								<span class="zanshu">获赞数</span>
								{{ item.thumbs_num }}
							</span>
							<span v-else class="dianzan" @click="MenuTthumbsIs(index, item.menu_id)" :class="{ dianRed: item.menu_thumbs_is == 1 }">
								<img :src="item.menu_thumbs_is == 1 ? zanRed : zanBlock" alt="" />
								<span v-if="isFrom == 'createdMenu'" class="zanshu">获赞数</span>
								{{ item.thumbs_num }}
							</span> -->
						</div>
						<!-- isFrom != 'createdMenu' && -->
						<div class="cook-info" v-if=" item.cook_info">
							<img @click="goCookHome(item.cook_info.member_id)" v-if="item.cook_info.member_avatar" :src="item.cook_info.member_avatar" alt="" class="avatar" />
							<img v-else src="" alt="" class="avatar" />
							<div class="cook-wrap">
								<div class="cook-title" @click="goCookHome(item.cook_info.member_id)">
									<span class="cook-name">厨师:</span>
									{{ item.cook_info.cook_name }}
								</div>
								<div class="cook-store" @click="goStore(item.cook_info.store_id)">
									<span>所属饭店:</span>
									{{ item.cook_info.restaurant }}
								</div>
							</div>
						</div>
						<!--<div class="menu-goods" v-if="isFrom != 'createdMenu'">拿手菜品</div>
						 <div class="menu-function" v-if="isFrom != 'createdMenu' && item.cook_info && item.cook_info.adept_menu">{{ item.cook_info.adept_menu }}</div>
						 --><div class="menu-function">{{ item.cook_say }}</div>
						<!-- <div class="delMenu" v-show="isFrom=='createdMenu'" 
						@click="delMyMenuListAAAA(item.menu_id)"
						>删除菜谱</div> -->
						<!-- <div class="delMenu" v-show="isFrom == 'createdMenu'" @click="delMyMenuList(item.menu_id)">删除菜谱</div> -->
					</div>
				</li>
			</ul>
			<div class="no-list" v-show="menuLists.length==0">没有搜索到您要的菜谱</div>
		</div>
		<div class="loading-wrapper" v-if="menuLists.length > 0">
			<p class="common-no-more" v-if="!isMore">没有更多了</p>
			<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
// import { mapState, mapActions } from 'vuex';
import { getMenuInfo, getCookInfo, sendThumbs, menuSearchKeyWord } from '@/api/homeMenu';
import { Toast } from 'mint-ui';
import MenuSort from './MenuSort';
import MenuList from './MenuList';
import menuSearch from '../../menuSearch';
import HomeCommonSearch2 from '@/components/home/common/HomeCommonSearch2';
import menuSearchHeader from '../../menuSearchHeader';
import menuComonSearch from './menuComonSearch.vue';
export default {
	data() {
		return {
			showMenuClass: false,

			index: 0,
			menuListIndex: 0,

			menuInfo: [],
			cookInfo: [],
			params: {
				page: 0,
				pagesize: 10, //每页显示几条数据
				menu_title: '' //发布量
			},
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			currCookId: 0,
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png'),
			thumbsUp: false,
			title: '精选菜谱',
			menu_id: '',
			isfrom: null,
			menuLists: [],
			keywords: this.$store.state.homesearch.currentKey ? this.$store.state.homesearch.currentKey : ''
		};
	},
	components: {
		MenuSort,
		MenuList,
		menuSearch,
		// HomeCommonSearch2,
		// menuSearchHeader
		menuComonSearch
	},
	computed: {
		// titles() {
		// 	let routes = this.$route.query;
		// 	console.log(routes.isFrom);
		// 	if (routes.isFrom == 'menuClass') {
		// 		this.title = routes.menuPageTitle;
		// 		debugger;
		// 	}
		// }
		// ...mapState({
		// 	menuInfo: state => state.home.menuInfo
		// })
	},
	mounted() {
		resetRem();
	},
	created: function() {
		// getMenuInfo(this.params).then(res => {
		// 	this.$refs.sonList.getMenuListChild(res.result)
		// });
		var that = this;
		// if (that.$route.query.isFrom == 'menuClass') {
		// 	that.menu_id = that.$route.query.menu_id;
		// 	that.isfrom = that.$route.query.isFrom;
		// }
		this.getSearchList();
		console.log(this.keywords,'keywords')
		// debugger
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// cookTthumbsIs(index, id) {
		// 	if (this.cookInfo[index].cook_thumbs_is == 1) {
		// 		this.cookInfo[index].cook_thumbs_is = 0;
		// 	} else {
		// 		this.cookInfo[index].cook_thumbs_is = 1;
		// 	}
		// 	console.log(this.cookInfo[index].cook_thumbs_is);
		// 	let thumbsParams = {};
		// 	thumbsParams.cook_id = id;
		// 	thumbsParams.type = 1;
		// 	console.log(thumbsParams, 'thumbsParams');
		// 	var that = this;
		// 	sendThumbs(thumbsParams).then(res => {
		// 		Toast(res.message);
		// 		that.getCooksList();
		// 	});
		// 	// debugger
		// },
		// ...mapActions({
		// 	fetchHomeMenuInfo: 'fetchHomeMenuInfo'
		// }),

		onSearch() {
			this.$router.push({ name: 'HomeSearch', params: { menu: true } });
		},

		/**
		 * getGoodsList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getSearchList(true);
			}
		},
		getSearchList() {
			var that = this;
			let keyword = this.$route.query.keywords;
			// debugger
			this.params.menu_title = keyword
			menuSearchKeyWord( this.params ).then(res => {
				// debugger
				if (res.result.hasmore) {
					this.menuLists = this.menuLists.concat(res.result.result);
				} else {
					this.menuLists = res.result.result;
				}
				this.isMore = res.result.hasmore;
				// that.menuLists = res.result;
				// that.getCooksList()
			});
		},
		goMenuDetail(id) {
			this.$router.push({ name: 'HomeMenuDetail', query: { menu_id:id } })
		},
		goCookHome(id) {
			this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
		},
		goStore(id) {
			if(id) {
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: id } });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.list-content {
	margin-top: 1.5rem;
	padding: 0.48rem 1.43rem;
	.list-wrap {
		.list-item {
			margin-bottom: 1.43rem;
			background-color: #fff;
			border-radius: 0.76rem;
			overflow: hidden;
			img {
				width: 100%;
				height: 17.62rem;
			}
			.menu-list-info {
				padding: 1.33rem 1.43rem 1.43rem;
				.menu-list-info-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.43rem;
					span {
						font-size: 1.81rem;
						font-weight: 500;
						color: #161616;
					}
					.dianzan {
						display: flex;
						align-items: center;
						font-size: 1.14rem;
						img {
							width: 1.33rem;
							height: 1.33rem;
							margin-right: 0.38rem;
						}
						.zanshu {
							font-size: 1.15rem;
							font-weight: 400;
							color: #161616;
						}
						&.dianRed {
							color: #E53216;
						}
					}
				}
				.cook-info {
					display: flex;
					padding: 0 0 1.43rem;
					align-items: center;
					img {
						width: 3.33rem;
						height: 3.33rem;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 1.05rem;
					}
					div.cook-wrap {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.cook-title {
							font-size: 1.14rem;
							font-weight: 400;
							color: #161616;
							.cook-name {
								margin-right: 1rem;
							}
						}
						.cook-store {
							margin-top: 0.29rem;
							font-size: 0.95rem;
							font-weight: 400;
							color: #6f6f6f;
							span {
								margin-right: 1rem;
							}
						}
					}
				}
				.menu-goods {
					font-size: 1.14rem;
					font-weight: 500;
					color: #161616;
				}
				.menu-function {
					font-size: 1.14rem;
					font-weight: 400;
					color: #6f6f6f;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
	}
}
.no-list {
	text-align: center;
	height: 10rem;
	line-height: 10rem;
}
</style>
