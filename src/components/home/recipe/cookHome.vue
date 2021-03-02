<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">{{ title }}</span>
			<span></span>
		</div>

		<div class="list-content">
			<div class="cook-info">
				<img v-if="menuLists.cook_info.member_avatar" :src="menuLists.cook_info.member_avatar" alt="" class="avatar" />
				<img v-else src="" alt="" class="avatar" />
				<div class="cook-wrap">
					<div class="cook-title">
						<span class="cook-name">厨师:</span>
						{{ menuLists.cook_info.cook_name }}
					</div>
					<div class="cook-store" @click="goStore(menuLists.cook_info.store_id)">
						<span>所属饭店:</span>
						{{ menuLists.cook_info.restaurant }}
					</div>
				</div>
				<span class="dianzan">
					<img :src="zanBlock" alt="" />
					<span class="zanshu">{{ menuLists.cook_info.thumbs_num }}</span>
				</span>
				<img style="width: 1.42rem;height: 1.42rem;margin-left: 1.9rem;" @click="onShare()" src="@/assets/image/icon2/icon-share-black.png" alt="" />
				
			</div>
			<div class="header-left">
				<img class="header-icon" src="../../../assets/image/icon2/icon-red-bg.png" />
				<span class="header-title">Ta创建的菜谱</span>
			</div>
			<ul class="list-wrap">
				<!--  v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" -->
				<li class="list-item" v-for="(item, index) in menuLists.menu_list" :key="index">
					<img v-if="item.menu_image" :src="item.menu_image" alt="" @click="goMenuDetail(item.menu_id)" />
					<img v-else src="" alt="" @click="goMenuDetail(item.menu_id)" />
					<div class="menu-list-info">
						<div class="menu-list-info-top">
							<span @click="goMenuDetail(item.menu_id)">{{ item.menu_title }}</span>
						</div>
						<div class="menu-function">{{ item.cook_say }}</div>
					</div>
				</li>
			</ul>
			<div class="noMenuList" v-show="menuLists.menu_list.length==0">Ta还没有创建菜谱</div>
			<!-- <div class="loading-wrapper" v-if="menuLists.length > 0">
			<p class="common-no-more" v-if="!isMore">没有更多了</p>
			<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
		</div> -->
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
import { sendThumbs, cookhome } from '@/api/homeMenu';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			thumbsUp: false, //点赞
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png'),
			menuLists: [],
			loading: false, // 是否加载更多
			isMore: true,
			isFrom: '',
			title: '厨师主页',
			shareVisible: false,
			weixinShareImage: false,
			copyVisible: false,
			// copyLink: env.H5_HOST + ,
			// copyLink:'',
			copyLink: env.H5_HOST + this.$route.fullPath,
			member_id:''
		};
	},
	// props:['isFrom'],
	components: {},
	// props: ['menuList','index'],
	mounted() {
		resetRem();
		// this.menuLists = this.menuList;
	},
	created: function() {
		var that = this;
		cookhome({ member_id: that.$route.query.member_id }).then(res => {
			that.menuLists = res.result;
			// Toast(res.message);
			// debugger
		});
	},
	computed: {
		getWrapperStyle: function() {
			const { width, height } = window.screen;
			return {
				width: width + 'px',
				height: height + 'px'
			};
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		goMenuDetail(id) {
			this.$router.push({ name: 'HomeMenuDetail', query: { menu_id: id } });
		},
		onShare(member_id) {
			this.shareVisible = true;
			this.member_id = member_id;
			// this.copyLink = env.H5_HOST + '/home/cookindex?member_id=' + this.member_id + '&isfrom=cookhome',
			console.log(this.copyLink,'copyLink')
		},
		// 分享到 微信
		fun_weixinShare() {
			// 如果在 APP 里
			console.log('window.location.href',window.location.href) 
			if (window.plus) {
				let that = this;
				let url = window.location.href;
				// console.log(that.member_id,'memeber_id')
				// let url = env.H5_HOST + '/home/cookindex?member_id=' + that.member_id + '&isfrom=cookhome'
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
				Toast('复制成功！')
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
.list-content {
	padding: 0.48rem 1.43rem;
	.list-wrap {
		.list-item {
			margin-bottom: 1.43rem;
			background-color: #fff;
			border-radius: 0.76rem;
			box-shadow: 0rem 0rem 0.95rem 0.61rem rgba(242, 242, 242, 0.54);
			overflow: hidden;
			img {
				width: 100%;
				height: 17.62rem;
			}
			.menu-list-info {
				padding: 1.33rem 1.43rem 1.9rem;
				.menu-list-info-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.43rem;
					span {
						font-size: 1.71rem;
						font-weight: 600;
						color: #161616;
					}
				}

				.menu-goods {
					font-size: 1.14rem;
					font-weight: 600;
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
	.cook-info {
		display: flex;
		padding: 0 1.43rem 1.43rem;
		align-items: center;
		margin: 0 -1.43rem;
		border-bottom: 1px solid #efefef;
		img.avatar {
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
					margin-right: 0.2rem;
				}
			}
			.cook-store {
				margin-top: 0.29rem;
				font-size: 0.95rem;
				font-weight: 400;
				color: #6f6f6f;
				span {
					margin-right: 0.2rem;
				}
			}
		}
		.dianzan {
			display: flex;
			align-items: center;
			font-size: 1.14rem;
			margin-left: auto;
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
				color: #e53216;
			}
		}
	}
}
.delMenu {
	text-align: right;
	font-size: 1.15rem;
	font-weight: 400;
	color: #e53216;
	margin-top: 1.43rem;
	margin-bottom: 1.9rem;
}
.header-left {
	padding: 1.9rem 0 0.95rem;
	display: flex;
	align-items: center;
	.header-title {
		font-size: 1.56rem;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(22, 22, 22, 1);
	}

	.header-icon {
		width: 0.34rem;
		height: 1.52rem;
		border-radius: 0.17rem;
		margin-right: 0.43rem;
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
	font-size: 0.6rem;
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
	background: #228B22;
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
.common-popup-wrapper {
	height: 17rem;
	overflow: visible;

	.common-header-wrap{
		& /deep/ .common-header{
			height: 2.8rem;
			.mint-header-title{
				font-size: 1.6rem;
			}
		}
	}
	}
	.noMenuList {
			height: 15rem;
			    line-height: 15rem;
			    text-align: center;
			    font-size: 1.2rem;
	}
</style>
