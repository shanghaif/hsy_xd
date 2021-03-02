<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">{{ title }}</span>
			<div class="header-right">
				<img @click="onSearch" src="@/assets/image/icon2/icon-search-black.png" alt="" />
				<img v-show="index == 0" @click="$router.push({ name: 'HomeMenuClass' })" src="@/assets/image/icon2/icon-menu-black.png" alt="" />
			</div>
		</div>
		<!-- <div class="content-wrapper">
			<div class="bg-wrap"><img src="@/assets/image/icon2/recipe-bg.png" alt="" /></div>
			<div class="tip-text">暂无更多内容</div>
			<div class="button-wrap"><div class="go-shop" @click="$router.push({ name: 'HomeIndex' })">去商城逛逛</div></div>
		</div> -->
		<ul class="tab-nav" v-if="isfrom != 'menuClass'">
			<li class="tab-title" :class="index == 0 ? 'active' : ''" @click="(index = 0), updataIndex(index)">菜谱推荐</li>
			<li class="tab-title" :class="index == 1 ? 'active' : ''" @click="(index = 1), updataIndex(index)">大厨驾到</li>
		</ul>
		<div class="content" v-show="index == 0">
			<menu-sort @onChange="onChildValue"></menu-sort>
			<menu-list @onChange="onChildlist" ref="sonList" :index="index"></menu-list>
		</div>
		<div class="content" v-show="index == 1">
			<ul class="select-nav">
				<li
					class="select-nav-item"
					v-for="(item, index) in selectNav"
					:key="index"
					@click="(currCookId = index), selectCookList(index)"
					:class="index == currCookId ? 'NavActive' : ''"
				>
					{{ item.name }}
				</li>
			</ul>
			<ul class="cook-list" v-infinite-scroll="getMoreCook" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<li class="cook-list-item" v-for="(item, index) in cookInfo" :key="item.id">
					<div class="cook-info">
						<img @click="goCookHome(item.member_id)" :src="item.member_avatar" alt="" class="avatar" />
						<div class="cook-wrap">
							<div class="cook-title" @click="goCookHome(item.member_id)">
								<span class="cook-name">厨师:</span>
								{{ item.cook_name }}
							</div>
							<div class="cook-store" @click="goStore(item.store_id)">
								<span>所属饭店:</span>
								{{ item.restaurant }}
							</div>
						</div>
					</div>
					<div class="menu-goods">拿手菜品</div>
					<div class="menu-function">{{ item.adept_menu }}</div>
					<div class="bottom-button">
						<img @click="cookTthumbsIs(index, item.member_id)" :src="item.cook_thumbs_is == 1 ? zanRed : zanBlock" alt="" />
						<span :class="{ dianRed: item.cook_thumbs_is == 1 }">{{ item.thumbs_num }}</span>
						<img @click="onShare(item.member_id)" src="@/assets/image/icon2/icon-share-black.png" alt="" />
					</div>
				</li>
			</ul>
			<div class="loading-wrapper" v-if="cookInfo.length > 0">
				<p class="common-no-more" v-if="!isMoreCook">没有更多了</p>
				<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMoreCook"></mt-spinner>
			</div>
		</div>
		<mt-popup v-model="shareVisible" position="bottom" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<mt-header title="分享至" class="common-header"><mt-button slot="left" icon="back" @click="shareVisible = false"></mt-button></mt-header>
			</div>
			<div class="common-popup-content">
				<div class="share-list">
					<div class="share-item weixin" @click="fun_weixinShare">微信</div>
					<div class="share-item copy" @click="showLink">复制</div>
				</div>
			</div>
			<div class="weixin-share-wrapper" :style="getWrapperStyle" v-if="weixinShareImage" @click="weixinShareImage = false">
				<img class="weixin-share" src="@/assets/image/weixin-share.png" />
			</div>
		</mt-popup>
		<mt-popup v-model="copyVisible" class="copy-wrapper">
			<div class="title">您的浏览器不支持直接复制，请手动复制</div>
			<input type="text" :value="copyLink" onfocus="this.select()" />
		</mt-popup>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { mapState, mapMutations } from 'vuex';
import { getMenuInfo, getCookInfo, sendThumbs } from '@/api/homeMenu';
import { Toast } from 'mint-ui';
import MenuSort from './MenuSort';
import MenuList from './MenuList';
import menuSearch from '../../menuSearch';
export default {
	data() {
		return {
			showMenuClass: false,
			selectNav: [
				{
					key: '',
					order: '',
					name: '综合排序',
					isMore: false,
					id: 0
				},
				{
					key: 'goods_salenum',
					order: '',
					name: '按发布量',
					isMore: false,
					id: 1
				},
				{
					key: 'goods_addtime',
					order: '',
					name: '离我最近',
					isMore: false,
					id: 2
				}
			],
			index: 0,
			menuListIndex: 0,
			params: {
				is_recommend: '', //精选
				news: '', //1降序,2升序
				difficulty: '', //1困到简单
				pagesize: 10, //每页显示几条数据
				page: 0, //第几页
				cook_thumbs_is: 0
			},
			menuInfo: [],
			cookInfo: [],
			isMoreCook: true,
			paramsCook: {
				page: 0,
				pagesize: 10, //每页显示几条数据
				menu_num: 0 //发布量
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
			shareVisible: false,
			weixinShareImage: false,
			copyVisible: false,
			// copyLink: env.H5_HOST + ,
			copyLink: '',
			member_id: ''
		};
	},
	components: {
		MenuSort,
		MenuList,
		menuSearch
	},
	computed: {
		getWrapperStyle: function() {
			const { width, height } = window.screen;
			return {
				width: width + 'px',
				height: height + 'px'
			};
		},
		// titles() {
		// 	let routes = this.$route.query;
		// 	console.log(routes.isFrom);
		// 	if (routes.isFrom == 'menuClass') {
		// 		this.title = routes.menuPageTitle;
		// 		debugger;
		// 	}
		// }
		...mapState({
			menuIndex: state => state.member.menuIndex,
			token: state=>state.member.token,
			isOnline: state => state.member.isOnline
		})
	},
	mounted() {
		resetRem();
		if (this.$route.query.menuPageTitle) {
			this.title = this.$route.query.menuPageTitle;
		} else {
			this.title = '精选菜谱';
		}
	},
	created: function() {
		// getMenuInfo(this.params).then(res => {
		// 	this.$refs.sonList.getMenuListChild(res.result)
		// });
		var that = this;
		if (that.$route.query.isFrom == 'menuClass') {
			that.menu_id = that.$route.query.menu_id;
			that.isfrom = that.$route.query.isFrom;
		}
	},
	beforeRouteEnter(to, from, next) {
		// 在导航完成前获取数据
		next(vm => {
			if (from.name == 'MenuSearch') {
				vm.index = vm.menuIndex;
			}
		});
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		updataIndex(index) {
			console.log(index, 'index');
			this.memberSaveMenuIndex(index);
		},
		cookTthumbsIs(index, id) {
			if (this.isOnline) {
				if (this.cookInfo[index].cook_thumbs_is == 1) {
					this.cookInfo[index].cook_thumbs_is = 0;
				} else {
					this.cookInfo[index].cook_thumbs_is = 1;
				}
				console.log(this.cookInfo[index].cook_thumbs_is);
				let thumbsParams = {};
				thumbsParams.cook_id = id;
				thumbsParams.type = 1;
				console.log(thumbsParams, 'thumbsParams');
				var that = this;
				sendThumbs(thumbsParams).then(res => {
					Toast(res.message);
					that.paramsCook.page = 1;
					that.getCooksList();
				});
				// debugger
			}else{
				Toast("请先去登录");
			}
		},
		...mapMutations({
			memberSaveMenuIndex: 'memberSaveMenuIndex'
		}),
		onChildValue(sortInfo) {
			let sortInfos = sortInfo;
			this.menuListIndex = sortInfo.num;
			console.log(this.menuListIndex, sortInfo);

			var that = this;
			// console.log(this.menuInfo,'this.menuInfo')
			if (that.menuListIndex == 0) {
				that.params.is_recommend = '';
				that.params.news = '';
				that.params.difficulty = '';
				that.params.page = 1;
			} else if (that.menuListIndex == 1) {
				that.params.is_recommend = 1;
				that.params.news = '';
				that.params.difficulty = '';
				that.params.page = 1;
			} else if (that.menuListIndex == 2) {
				if (sortInfos.trangleTop) {
					that.params.news = 1;
				} else {
					that.params.news = 2;
				}
				that.params.is_recommend = '';
				that.params.difficulty = '';
				that.params.page = 1;
			} else if (that.menuListIndex == 3) {
				if (sortInfos.trangleTop) {
					that.params.difficulty = 2;
				} else {
					that.params.difficulty = 1;
				}
				that.params.is_recommend = '';
				that.params.news = '';
				that.params.page = 1;
			}
			console.log(that.params, 'that.params');
			that.getMenuList();
		},
		getMenuList(ispush) {
			var that = this;
			if (that.isfrom == 'menuClass') {
				that.params.class_id = that.menu_id;
			}
			that.params.key = this.token;
			getMenuInfo(that.params).then(res => {
				// this.menuInfo = []
				// this.menuInfo = res.result
				ispush = res.result.hasmore;
				that.$refs.sonList.getMenuListChild(res.result.result, ispush, that.isfrom, res.result.hasmore);
				console.log(res.result.hasmore, 'res.result.hasmore', res);
			});
		},
		onSearch() {
			this.$router.push({ name: 'MenuSearch', query: { menu: true } });
		},
		onChildlist(addPage) {
			if (addPage) {
				this.params.page = ++this.params.page;
			}
		},

		// 厨师
		getMoreCook() {
			if (this.isMoreCook) {
				this.loading = true;
				this.loading = false;
				this.getCooksList(true);
				this.paramsCook.page = ++this.paramsCook.page;
			}
		},
		selectCookList(selectIndex) {
			var that = this;
			if (selectIndex == 0) {
				that.paramsCook.menu_num = '';
				this.paramsCook.page = 1;
				this.cookInfo = [];
				this.loading = false;
			} else if (selectIndex == 1) {
				that.paramsCook.menu_num = 1;
				this.paramsCook.page = 1;
				this.cookInfo = [];
				this.loading = false;
			}
			this.getCooksList();
		},

		/**
		 * getGoodsList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		getCooksList(ispush) {
			// console.log(this.mclass);
			// debugger
			this.paramsCook.key = this.token;
			getCookInfo(this.paramsCook).then(res => {
				this.buildData(ispush, res);
			});
		},
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData(ispush, res) {
			if (res) {
				if (ispush) {
					this.cookInfo = this.cookInfo.concat(res.result.cook_list);
				} else {
					this.cookInfo = res.result.cook_list;
					// debugger
				}
				// debugger
				this.isMoreCook = res.result.hasmore;
			}
		},
		goCookHome(id) {
			if( this.isOnline ){
				// debugger
				this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
			}else{
				Toast("请先去登录");
			}
		},
		onShare(member_id) {
			this.shareVisible = true;
			this.member_id = member_id;
			(this.copyLink = env.H5_HOST + '/home/cookindex?member_id=' + this.member_id + '&isfrom=cookhome'), console.log(this.copyLink, 'copyLink');
		},
		// 分享到 微信
		fun_weixinShare() {
			// 如果在 APP 里
			console.log('window.location.href', window.location.href);
			if (window.plus) {
				let that = this;
				// let url = window.location.href;
				console.log(that.member_id, 'memeber_id');
				let url = env.H5_HOST + '/home/cookindex?member_id=' + that.member_id + '&isfrom=cookhome';
				let thumbs = 'https://shop.ihaosy.com/uploads/home/common/app.png';
				let content = '好食源菜谱';
				// if (url.indexOf('home/goodsdetail?goods_id=') != -1) {
				// 	// 如果在 商品详情页
				// 	if (!this.goodsDetailInfo.photos[0]) {
				// 		thumbs = env.H5_HOST + '/assets/image/home/default_image_banner.png';
				// 	} else {
				// 		thumbs = this.goodsDetailInfo.photos[0];
				// 	}
				// 	content = this.goodsDetailInfo.goods_name;
				// 	// console.log( thumbs,this.goodsDetailInfo );
				// } else if (url.indexOf('storedetail?id=') != -1 || url.indexOf('store_goodslist?id=') != -1 || url.indexOf('store_goodsclass?id=') != -1) {
				// 	// 如果在 店铺详情页
				// 	// console.log(this.store);
				// 	thumbs = this.store.store_avatar;
				// 	content = this.store.seller_name;
				// }

				// #ifdef APP-PLUS
				plus.share.getServices(
					s => {
						var shares = {};
						// alert(JSON.stringify(s));
						for (var i = 0; i < s.length; i++) {
							var t = s[i];
							shares[t.id] = t;
						}
						var sweixin = shares['weixin'];

						let msg = {
							type: 'web', //分享的内容的类型
							title: '好食源菜谱分享',
							content: content,
							thumbs: [thumbs],
							href: url,
							extra: { scene: 'WXSceneSession' } // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
						};
						sweixin.send(
							msg,
							function() {
								Toast('分享成功');
								// 关闭 下拉列表
								that.$emit('change-popupVisible', false);
								that.weixinShareImage = false;
								// 关闭底部分享模块
								that.shareVisible = false;
							},
							function(error) {
								Toast('分享失败');
							}
						);
					},
					function(e) {
						console.log('获取分享服务列表失败：' + e.message);
					}
				);
			} else {
				this.weixinShareImage = true;
			}
			//#endif
		},
		showLink() {
			if (window.clipboardData) {
				window.clipboardData.clearData();
				window.clipboardData.setData('Text', this.copyLink);
				Toast('复制成功！');
				// debugger;
			} else {
				this.copyVisible = true;
			}
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
.header-wrap {
	padding: 1rem 1.43rem;
	position: relative;
	display: flex;
	justify-content: space-between;
	img {
		// position: absolute;
		// left: 1.78rem;
		// top: 50%;
		width: 1.74rem;
		height: 1.74rem;
		// transform: translate(0, -50%);
	}
	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.39rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.header-right {
		img {
			width: 1.71rem;
			height: 1.71rem;
			&:last-child {
				margin-left: 1.43rem;
			}
		}
	}
}
.content-wrapper {
	.bg-wrap {
		margin-top: 8.78rem;
		text-align: center;
		img {
			width: 16.17rem;
			height: 11.57rem;
		}
	}
	.tip-text {
		text-align: center;
		font-size: 1.22rem;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.button-wrap {
		text-align: center;
		margin-top: 6.96rem;
		.go-shop {
			display: inline-block;
			font-size: 1.22rem;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			padding: 1.09rem 2.7rem;
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0rem 0rem 0.87rem 0rem rgba(251, 104, 84, 0.37);
			border-radius: 0.7rem;
		}
	}
}
.tab-nav {
	padding: 1.2rem 1.95rem;
	display: flex;
	align-items: center;
	.tab-title {
		margin-right: 1.9rem;
		font-size: 1.33rem;
		font-weight: 400;
		color: #6f6f6f;
		&.active {
			font-weight: 600;
			color: #161616;
			position: relative;
			&::after {
				content: '';
				position: absolute;
				bottom: -0.33rem;
				left: 50%;
				transform: translate(-50%, 0);
				width: 1.9rem;
				height: 0.24rem;
				background: linear-gradient(90deg, #e53216 0%, #fc6952 100%);
				border-radius: 0.12rem;
			}
		}
	}
}
.content {
	background: #f4f5f7;
	min-height: 100vh;
}

.select-nav {
	padding: 1.14rem 3.48rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.select-nav-item {
		display: flex;
		&.NavActive {
			font-size: 1.33rem;
			font-weight: 600;
			color: red;
		}
		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 0.19rem;
			.sanjiao-top {
				width: 0;
				height: 0;
				border-right: 0.4rem solid transparent;
				border-left: 0.4rem solid transparent;
				border-bottom: 0.45rem solid #6f6f6f;
				margin-bottom: 0.19rem;
				&.trangleActiveTop {
					border-bottom: 0.45rem solid red;
				}
			}
			.sanjiao-bottom {
				width: 0;
				height: 0;
				border-right: 0.4rem solid transparent;
				border-left: 0.4rem solid transparent;
				border-top: 0.45rem solid #6f6f6f;
				&.trangleActiveBottom {
					border-top: 0.45rem solid red;
				}
			}
		}
	}
}
.cook-list {
	min-height: 100vh;
	padding: 0.48rem 1.43rem;
	background-color: #f4f5f7;
	.cook-list-item {
		background-color: #fff;
		padding: 1.9rem 1.43rem;
		margin-bottom: 1.42rem;
		border-radius: 0.76rem;
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
					font-weight: 600;
					color: #161616;
					.cook-name {
						margin-right: 0.5rem;
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
			font-weight: 600;
			color: #161616;
		}
		.menu-function {
			margin-top: 0.95rem;
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
			color: #12937c;
			// transform: translateX(-0.5rem);
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.bottom-button {
			margin-top: 1.43rem;
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img {
				width: 1.43rem;
				height: 1.43rem;
				&:last-child {
					margin-left: 1.9rem;
				}
			}
			span {
				margin-left: 0.38rem;
			}
			.dianRed {
				color: #e53216;
			}
		}
	}
}
.common-popup-wrapper {
	height: 17rem;
	overflow: visible;

	.common-header-wrap {
		& /deep/ .common-header {
			height: 2.8rem;
			.mint-header-title {
				font-size: 1.4rem;
			}
		}
	}
}
.weixin-share {
	width: 50vw;
}
.copy-wrapper {
	padding: 1rem;
}
.copy-wrapper input {
	height: 1.5rem;
	line-height: 1.5rem;
	padding: 0 0.2rem;
	width: 12rem;
	border: 1px solid #e1e1e1;
}
.copy-wrapper .title {
	font-size: 1rem;
	text-align: center;
	margin-bottom: 0.5rem;
}
.share-list {
	display: flex;
}
.share-list .share-item {
	height: 5rem;
	margin: 1rem 0.8rem;
	width: 4.5rem;
	padding-left: 0;
	background: none;
	text-align: center;
	color: #333;
	font-size: 0.6rem;
}
.share-list .share-item:before {
	font-family: 'iconfont';
	content: '';
	display: block;
	border-radius: 50%;
	width: 4rem;
	height: 4rem;
	line-height: 4rem;
	text-align: center;
	font-size: 2.2rem;
	color: #fff;
	background: red;
	margin: 0 auto;
	margin-bottom: 0.25rem;
}
.share-list .share-item.weixin:before {
	content: '\e647';
	background: #228b22;
}
.share-list .share-item.copy:before {
	content: '\e64b';
	background: #228b22;
}
.weixin-share-wrapper {
	position: absolute;
	bottom: 0;
	left: 0;
	text-align: right;
}
.common-popup-content {
	top: 5rem;
}
</style>
