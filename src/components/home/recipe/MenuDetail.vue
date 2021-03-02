<template>
	<div class="container">
		<div class="menu-img">
			<img :src="menuDetailList.menu_image" alt="" />
			<div class="header-top">
				<span class="header-top-menu" @click="$router.go(-1)"><img src="@/assets/image/icon2/icon-white-back.png" alt="" /></span>
				<span class="header-top-menu" @click="onShare()"><img src="@/assets/image/icon2/icon-share-white.png" alt="" /></span>
			</div>

			<div class="menu-list-info">
				<div class="menu-list-info-top">
					<span>{{ menuDetailList.menu_title }}</span>
					<div>
						<span class="dianzan" @click="(thumbsUp = !thumbsUp), MenuTthumbsIs()" :class="{ dianRed: thumbsUp }">
							<img :src="thumbsUp ? zanRed : zanBlock" alt="" />
							<!-- {{ item.thumbs_num }} -->
							点赞({{ menuDetailList.thumbs_num }})
						</span>
						<span class="shoucang dianzan" @click="(shoucang = !shoucang), shoucangMethod()" :class="{ dianRed: shoucang }">
							<img :src="shoucang ? shoucangRed : shoucangBlack" alt="" />
							<!-- {{ item.thumbs_num }} -->
							收藏
						</span>
					</div>
				</div>
				<div class="cook-info">
					<!-- <img :src="item.cook_info.cook_image" alt="" class="avatar" /> -->
					<div @click="goCookHome(menuDetailList.cook_info.member_id)">
						<img v-if="menuDetailList.cook_info.member_avatar" :src="menuDetailList.cook_info.member_avatar" alt="" class="avatar" />
						<img class="laiyuan" src="@/assets/image/icon2/icon-laiyuan.png" alt="" />
					</div>
					<div class="cook-wrap">
						<div class="cook-title" @click="goCookHome(menuDetailList.cook_info.member_id)">
							<span class="cook-name">厨师:</span>
							{{ menuDetailList.cook_info.cook_name }}
							<!-- 王老四 -->
						</div>
						<div class="cook-store" @click="goStore(menuDetailList.cook_info.store_id)">
							<span>所属饭店:</span>
							{{ menuDetailList.cook_info.restaurant }}
							<!-- 王麻子餐馆 -->
						</div>
					</div>
				</div>
				<div class="menu-info">
					<span>上手难度:{{ menuDetailList.difficulty }}</span>
					<span>烹饪时间:{{ menuDetailList.cooking_time }}</span>
				</div>
				<div class="cook-speak">主厨说</div>
				<div class="menu-function">{{ menuDetailList.cook_say }}</div>
			</div>
		</div>
		<div class="occupancy-bg"></div>
		<div class="ingredients">
			<p class="ingredients-title">烹饪食材</p>
			<ul class="ingredients-content">
				<li class="ingredients-content-list" v-for="(item, index) in menuDetailList.cooking_material" :key="index">
					<span>{{ item.shicai }}</span>
					<span>&nbsp;:&nbsp;{{ item.num }}</span>
					<!-- <span>{{ item.num }}</span> -->
				</li>
			</ul>
		</div>
		<div class="occupancy-bg"></div>
		<div class="steps">
			<p class="steps-title">
				烹饪步骤
				<span>共{{ bushu }}步</span>
			</p>
			<ul class="steps-content">
				<li class="steps-content-item" v-for="(item, index) in menuDetailList.cooking_step" :key="index">
					<p class="steps-no">步骤{{ index + 1 }}</p>
					<div class="step-img"><img :src="item.menuStep" alt="" /></div>
					<div>{{ item.info }}</div>
				</li>
			</ul>
		</div>
		<div class="occupancy-bg"></div>
		<div class="select-ingredients">
			<p>
				<span style="font-weight: 600;">
					精选食材
					<span style="font-weight: 400;">共{{ jingxuan }}件</span>
				</span>
				<span class="one-buy" v-if="jingxuan > 0" @click="goBugProductAll()">一键买齐</span>
			</p>
			<ul class="select-ingredients-list">
				<li class="select-ingredients-list-item" v-for="(item, index) in menuDetailList.goods_list" :key="index" @click="productClick(item.goods_id)">
					<img :src="item.goods_image" alt="" />
					<div class="item-info">
						<div class="item-info-top">{{ item.goods_name }}</div>
						<div class="item-info-center">{{ item.goods_advword }}</div>
						<div class="item-info-bottom">￥{{ item.goods_price }}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="occupancy-bg"></div>
		<div class="taocan select-ingredients">
			<p>食谱套装菜</p>
			<ul class="select-ingredients-list">
				<li class="select-ingredients-list-item" v-for="(item, index) in menuDetailList.taozhuang" :key="index">
					<img @click="productClick(item.goods_id)" :src="item.goods_image" alt="" />
					<div class="item-info">
						<div class="item-info-top" @click="productClick(item.goods_id)">{{ item.goods_name }}</div>
						<div class="item-info-center" @click="productClick(item.goods_id)">{{ item.goods_advword }}</div>
						<div class="item-info-bottom">
							{{ item.goods_price }}
							<span @click="goBugProduct(item)"><img src="@/assets/image/icon2/icon-add.png" alt="" /></span>
						</div>
					</div>
				</li>
				<!-- <li class="select-ingredients-list-item">
					<img src="../../../assets/image/icon2/dishes.jpg" alt="" />
					<div class="item-info">
						<div class="item-info-top">生鲜有机番茄西红柿</div>
						<div class="item-info-center">商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍</div>
						<div class="item-info-bottom">￥122</div>
					</div>
				</li> -->
			</ul>
		</div>
		<div class="occupancy-bg"></div>
		<div class="comments">
			<p>
				评价
				<span>{{ comment_count }} 条</span>
			</p>
			<ul class="comments-list">
				<li class="comments-list-item" v-for="(item, index) in commentlist" :key="index">
					<div class="member-info">
						<img :src="item.member_avatar" alt="" />
						<span class="user-name">{{ item.comment_user_name }}</span>
					</div>
					<p class="comment-text">{{ item.comment_text }}</p>
					<span class="req" @click="sendMessage(item.comment_id, item)">{{ item.child_count > 0 ? item.child_count : '' }}回复</span>
				</li>
			</ul>
		</div>
		<div class="tabbar">
			<input type="text" placeholder="请输入评论" v-model="pinglun" />
			<div class="pinglun" @click="sendCommentInfo()">
				<!-- <img src="@/assets/image/icon2/icon-message-black.png" alt="" />
				<span>333</span> -->
				<span>发送</span>
			</div>
			<div class="cart" @click="$router.push({ name: 'HomeCart' })">
				<span
					style="position: absolute;
						right: 0rem;
						top: -0.8rem;
						height: 1.5rem;
						width: 1.5rem;
						text-align: center;
						background: red;
						border-radius: 50%;
						line-height: 1.5rem;
						color: #fff;
						font-size: 0.8rem;"
				>
					{{ menuDetailList.cart_count }}
				</span>
				<img src="@/assets/image/icon2/icon-cart-black.png" alt="" />
				<span>购物车</span>
			</div>
		</div>

		<mt-popup v-model="showCommentDetail" class="comment-popup" position="bottom">
			<div class="comment-wrap">
				<img class="close" @click="closeCommentDetail()" src="@/assets/image/icon2/icon-cha.png" alt="" />
				<div class="comment-title">评论详情</div>
				<div class="comment">
					<div class="user-info-wrap">
						<img class="user-avatar" :src="commentLandlord.member_avatar" alt="" />
						<div class="user-info">
							<span class="user-name">{{ commentLandlord.comment_user_name }}</span>
							<span class="user-time">{{ commentLandlord.comment_time }}</span>
						</div>
					</div>
					<div class="comment-content">{{ commentLandlord.comment_text }}</div>
				</div>
				<div class="comment-occupancy-bg"></div>
				<div class="comment-container">
					<p v-if="childAllCount">{{ childAllCount }}条回复</p>
					<p v-else style="margin-bottom:1.9rem">暂无更多评论</p>
					<div class="comment" :style="item.level >= 3 ? 'margin-left:3rem' : 'margin-left:0'" v-for="(item, index) in childCommentList" :key="index">
						<div class="user-info-wrap">
							<img class="user-avatar" :src="item.member_avatar" alt="" />
							<div class="user-info">
								<span class="user-name">{{ item.comment_user_name }}</span>
								<span class="user-time">{{ item.comment_time }}</span>
							</div>
						</div>
						<div class="comment-content">{{ item.comment_text }}</div>
						<span class="req" @click="sendChildComment(item.comment_id)">回复</span>
					</div>
				</div>

				<div class="tabbar">
					<input ref="input" type="text" placeholder="请输入评论" v-model="childpinglun" />
					<div class="pinglun" @click="sendChildCommentInfo()">
						<!-- <img src="@/assets/image/icon2/icon-message-black.png" alt="" />
						<span>333</span> -->
						<span>发送</span>
					</div>
					<div class="cart" @click="$router.push({ name: 'HomeCart' })">
						<img src="@/assets/image/icon2/icon-cart-black.png" alt="" />
						<span>购物车</span>
					</div>
				</div>
			</div>
		</mt-popup>

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
import { mapState, mapMutations, mapActions } from 'vuex';
// import { cartType } from "@/api/homecart";
import { Toast } from 'mint-ui';
import { getMenuDetail, shoucangSend, quxiaoshoucang, sendThumbs, sendCommentReq, getCommentDetailList, cartAdd } from '@/api/homeMenu';
// import OneDropDown from '@/components/OneDropDown'
export default {
	data() {
		return {
			thumbsUp: false, //点赞
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png'),
			shoucang: false,
			shoucangRed: require('@/assets/image/icon2/icon-heart-red.png'),
			shoucangBlack: require('@/assets/image/icon2/icon-heart-black.png'),
			menuId: this.$route.query.menu_id,
			menuDetailList: {
				cook_info: {
					member_avatar: null
				}
			},
			bushu: '',
			jingxuan: '',
			shareVisible: false,
			weixinShareImage: false,
			copyVisible: false,
			// copyLink: env.H5_HOST + ,
			// copyLink:'',
			copyLink: env.H5_HOST + this.$route.fullPath,
			member_id: '',
			showCommentDetail: false,
			pinglun: '',
			commentlist: [
				{
					comment_user_name: null,
					comment_time: null,
					member_avatar: null,
					comment_text: null
				}
			],
			comment_id: '',
			commentLandlord: {
				comment_user_name: null,
				comment_time: null,
				member_avatar: null,
				comment_text: null
			},
			childCommentList: [{ comment_user_name: null, comment_time: null, member_avatar: null, comment_text: null }],
			childpinglun: '',
			comment_pid: '',
			comment_count: '',
			childAllCount: ''
		};
	},
	components: {},
	mounted() {
		resetRem();
	},
	created: function() {
		var that = this;
		console.log(that.menuId, this.$route.query.menu_id, 'that.menuId');
		this.getMenuDetailInfo();
		// this.sendCommentInfo();
		// console.log(this.area_id, 'area_id');
	},
	computed: {
		...mapState({
			isOnline: state => state.member.isOnline,
			area_id: state => state.member.area_id, //收货地址
			mclass: state => state.member.mclass,
		}),
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
		productClick: function(id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: id } });
		},
		shoucangMethod() {
			var that = this;
			if (that.shoucang) {
				shoucangSend({ menu_id: that.menuId }).then(res => {
					Toast(res.message);
				});
			} else {
				quxiaoshoucang({ menu_id: that.menuId }).then(res => {
					Toast(res.message);
				});
			}
		},
		getMenuDetailInfo() {
			var that = this;
			getMenuDetail({ menu_id: that.menuId }).then(res => {
				// Toast(res.message)
				that.menuDetailList = res.result;
				that.bushu = that.menuDetailList.cooking_step.length;
				that.jingxuan = that.menuDetailList.goods_list.length;
				this.commentlist = this.menuDetailList.commentlist;
				this.comment_count = this.menuDetailList.comment_count;
				if (that.menuDetailList.menu_collection_is == 1) {
					that.shoucang = true;
				} else {
					that.shoucang = false;
				}
				if (this.menuDetailList.menu_thumbs_is == 1) {
					this.thumbsUp = true;
				} else {
					this.thumbsUp = false;
				}
				console.log(that.bushu, 'that.bushu');
				console.log(that.menuDetailList, 'that.menuDetailList');
				// debugger
				// that.getCooksList()
			});
		},
		MenuTthumbsIs() {
			if (this.menuDetailList.menu_thumbs_is == 1) {
				this.thumbsUp = false;
			} else {
				this.thumbsUp = true;
			}
			console.log(this.menuDetailList.menu_thumbs_is);
			var that = this;
			sendThumbs({ menu_id: this.menuDetailList.menu_id, type: 2 }).then(res => {
				Toast(res.message);
				// that.getCooksList()
				this.getMenuDetailInfo();
			});
		},
		goCookHome(id) {
			this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
		},
		onShare(member_id) {
			this.shareVisible = true;
			this.member_id = member_id;
			// this.copyLink = env.H5_HOST + '/home/cookindex?member_id=' + this.member_id + '&isfrom=cookhome',
			console.log(this.copyLink, 'copyLink');
		},
		// 分享到 微信
		fun_weixinShare() {
			// 如果在 APP 里
			console.log('window.location.href', window.location.href);
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
				Toast('复制成功！');
				// debugger;
			} else {
				this.copyVisible = true;
			}
		},
		sendCommentInfo() {
			if (this.pinglun) {
				sendCommentReq({ menu_id: this.menuDetailList.menu_id, comment_text: this.pinglun }).then(res => {
					Toast(res.message);
					this.pinglun = '';
					// that.getCooksList()
					this.getMenuDetailInfo();
					console.log(res, 'res');
				});
			} else {
				Toast('评论不能为空');
			}
		},
		sendMessage(comment_id, item) {
			this.commentLandlord = item;
			// debugger
			this.showCommentDetail = true;
			this.comment_id = comment_id;
			if (!this.comment_pid) {
				this.comment_pid = comment_id;
			}
			// debugger
			this.getCommentDetail(comment_id);
		},
		getCommentDetail(comment_id) {
			getCommentDetailList({ comment_id: comment_id }).then(res => {
				// Toast(res.message);
				this.childCommentList = res.result.child_list;
				this.childAllCount = res.result.count_child;
				// that.getCooksList()
				console.log(res, 'res');
			});
		},
		sendChildComment(comment_id) {
			var that = this;
			this.comment_pid = comment_id;
			this.$nextTick(() => {
				this.$refs.input.focus();
			});
		},
		sendChildCommentInfo() {
			var that = this;
			// if(!this.comment_pid) {
			// 	this.comment_pid =
			// }
			if (this.childpinglun) {
				sendCommentReq({ menu_id: this.menuDetailList.menu_id, comment_text: this.childpinglun, comment_pid: this.comment_pid }).then(res => {
					Toast(res.message);
					// that.getCooksList()
					if (res.code == 10000) {
						that.getCommentDetail(this.comment_id);
						that.childpinglun = '';
					}
				});
			} else {
				Toast('评论不能为空');
			}
		},
		// 一键买齐
		goBugProductAll() {
			var that = this;
			var listArry = this.menuDetailList.goods_list;
			// debugger
			var listArryNew = [];
			// var param = {};
			// listArryNew.push(param);
			// console.log(listArry, 'listArry');
			for (var i = 0; i < listArry.length; i++) {
				let m_per = 1;
				if (this.mclass == 1) {
					m_per = listArry[i].goods_l_price;
				}
				if (this.mclass == 2) {
					m_per = listArry[i].goods_c_price;
				}
				if (this.mclass == 3 || this.mclass==6 ) {
					m_per = listArry[i].goods_p_price;
				}
				if (this.mclass == 4) {
					m_per = listArry[i].goods_B_price;
				}
				if (this.mclass == 5) {
					m_per = listArry[i].goods_j_price;
				}
				// console.log('@', i);
				listArryNew.push({
					goods_id: listArry[i].goods_id,
					price: m_per,
					quantity: 1,
					bl_id: '',
					cart_type: '',
					cart_area_id: this.area_id
				});
				// listArryNew[i].goods_id = listArry[i].goods_id;
				// listArryNew[i].price = listArry[i].goods_c_price;
				// listArryNew[i].quantity = /* listArry[i].quantity */ 1;
				// listArryNew[i].bl_id = '';
				// listArryNew[i].cart_type = '';
				// listArryNew[i].cart_area_id = this.area_id;
				// debugger
			}
			for (var i = 0; i < listArryNew.length; i++) {
				cartAdd(listArryNew[i])
					.then(res => {
						Toast('添加购物车成功');
						that.getMenuDetailInfo();
					})
					.catch(function(error) {
						Toast(error.message);
					});
			}
		},
		goBugProduct(item) {
			// console.log(item);
			let m_per = 1;
			if (this.mclass == 1) {
				m_per = item.goods_l_price;
			}
			if (this.mclass == 2) {
				m_per = item.goods_c_price;
			}
			if (this.mclass == 3 || this.mclass==6 ) {
				m_per = item.goods_p_price;
			}
			if (this.mclass == 4) {
				m_per = item.goods_B_price;
			}
			if (this.mclass == 5) {
				m_per = item.goods_j_price;
			}
			var that = this;
			let params = {};
			params.goods_id = item.goods_id;
			params.price = m_per;
			params.quantity = 1;
			params.bl_id = '';
			params.cart_type = '';
			params.cart_area_id = this.area_id;
			cartAdd(params).then(res => {
				// Toast(res.message);
				Toast('添加购物车成功');
				// debugger
				// that.getCooksList()
				that.getMenuDetailInfo();
				console.log(res, 'res');
			});
		},
		closeCommentDetail() {
			this.showCommentDetail = false;
			this.comment_id = '';
			this.comment_pid = '';
		},
		goStore(id) {
			if (id) {
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: id } });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 10rem;
	.menu-img {
		position: relative;
		img {
			width: 100%;
		}
		.header-top {
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding: 0.9rem 1.43rem;
			display: flex;
			justify-content: space-between;
			.header-top-menu {
				height: 2.38rem;
				width: 2.38rem;
				display: flex;
				align-items: center;
				justify-content: center;

				background: rgba(0, 0, 0, 0.49);
				border-radius: 50%;
				img {
					width: 1.33rem;
					height: 1.33rem;
				}
			}
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
					font-weight: 600;
					color: #161616;
				}
				div {
					display: flex;
					flex-direction: row;
					.dianzan {
						display: flex;
						align-items: center;
						flex-direction: column;
						font-size: 0.86rem;
						font-weight: 400;
						img {
							width: 1.33rem;
							height: 1.33rem;
							margin-bottom: 0.33rem;
						}
						&.dianRed {
							color: #e53216;
						}
					}
					.shoucang {
						margin-left: 1.9rem;
					}
				}
			}
			.cook-info {
				display: flex;
				padding: 0 0 1.43rem;
				align-items: center;
				div {
					position: relative;
					margin-right: 2.05rem;
					.avatar {
						width: 3.33rem;
						height: 3.33rem;
						border-radius: 50%;
						overflow: hidden;
					}
					.laiyuan {
						position: absolute;
						right: 0;
						bottom: 0;
						transform: translate(50%, 0);
						width: 2.76rem;
						height: 1.33rem;
					}
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
			}
			.menu-info {
				padding: 0 0 1.43rem 0;
				border-bottom: 1px solid #efefef;
				margin-right: -1.43rem;
				span {
					font-size: 1.14rem;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #e53216;
					&:first-child {
						margin-right: 3.81rem;
					}
				}
			}
			.cook-speak {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
				margin: 1.43rem 0 0.95rem;
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
				margin-bottom: 0.57rem;
			}
		}
	}
	.occupancy-bg {
		width: 100%;
		height: 0.95rem;
		background: #f4f5f7;
	}
	.ingredients {
		padding: 1.9rem 1.43rem;
		.ingredients-title {
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
			margin-bottom: 0.57rem;
		}
		.ingredients-content {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			justify-content: space-between;
			box-sizing: border-box;
		}
		.ingredients-content-list {
			width: 46%;
			display: flex;
			justify-content: space-between;
			justify-content: flex-start;
			span {
				margin-top: 1.43rem;
				font-size: 1.14rem;
				font-weight: 400;
				color: #12937c;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:last-child {
					font-size: 1.14rem;
					font-weight: 400;
					color: #6f6f6f;
					min-width: 38%;
    			max-width: 50%;
					color: #161616;
				}
			}
		}
	}
	.steps {
		padding: 1.9rem 1.43rem;
		.steps-title {
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
			margin-bottom: 1.9rem;
			span {
				margin-left: 0.95rem;
				font-size: 1.05rem;
				font-weight: 400;
				color: #6f6f6f;
			}
		}
		.steps-content {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			.steps-content-item {
				margin-bottom: 0.9rem;
				p {
					margin-bottom: 0.95rem;
				}
				.step-img {
					text-align: center;
					img {
						// width: 100%;
						height: 17.62rem;
						border-radius: 0.38rem;
					}
				}

				div {
					margin-top: 1.43rem;
					margin-bottom: 1.9rem;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
					margin-bottom: 0;
				}
			}
		}
	}
	.select-ingredients {
		padding: 1.9rem 1.43rem;
		p {
			display: flex;
			justify-content: space-between;
			span {
				font-size: 1.33rem;
				font-weight: 500;
				color: #161616;
				span {
					font-size: 1.05rem;
					font-weight: 400;
					color: #6f6f6f;
					margin-left: 0.95rem;
				}
			}
			.one-buy {
				height: 2.05rem;
				padding: 0 1.19rem;
				background: linear-gradient(90deg, #ff9494 0%, #fb3737 100%);
				border-radius: 1.12rem;
				font-size: 1.14rem;
				font-weight: 400;
				color: #ffffff;
				line-height: 2.05rem;
			}
		}
		.select-ingredients-list {
			display: flex;
			flex-wrap: wrap;
			.select-ingredients-list-item {
				margin-top: 0.95rem;
				display: flex;
				width: 100%;
				img {
					width: 9.05rem;
					height: 9.05rem;
					border-radius: 0.76rem;
					margin-right: 1.19rem;
				}
				.item-info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 100%;
					.item-info-top {
						font-size: 1.24rem;
						font-weight: 600;
						color: #161616;
					}
					.item-info-center {
						font-size: 1.14rem;
						font-weight: 400;
						color: #6f6f6f;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					.item-info-bottom {
						font-size: 1.43rem;
						font-weight: bold;
						color: #e53216;
						display: flex;
						justify-content: space-between;
						align-items: center;
						img {
							width: 1.62rem;
							height: 1.62rem;
						}
					}
				}
			}
		}
	}
	.taocan {
		padding: 1.9rem 1.43rem;
		p {
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
		}
	}
	.comments {
		padding: 1.9rem 0 1.9rem 1.48rem;
		p {
			font-size: 1.34rem;
			font-weight: 600;
			color: #161616;
			span {
				margin-left: 0.67rem;
				font-size: 1.15rem;
				font-weight: 400;
				color: #6f6f6f;
			}
		}
		.comments-list {
			.comments-list-item {
				padding: 1.9rem 1.43rem 1.43rem 0;
				border-bottom: 1px solid #efefef;
				.member-info {
					img {
						width: 2.86rem;
						height: 2.86rem;
						border-radius: 50%;
						margin-right: 0.48rem;
					}
					span.user-name {
						font-size: 1.05rem;
						font-weight: 400;
						color: #161616;
					}
				}
				p.comment-text {
					margin: 1.2rem 0 0.96rem;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
				}
				span.req {
					padding: 0.24rem 0.62rem;
					font-size: 1.05rem;
					font-weight: 400;
					color: #6f6f6f;
					background: #f4f5f7;
					border-radius: 1.03rem;
				}
			}
		}
	}
	.tabbar {
		border-top: 1px solid #efefef;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		padding: 0.77rem 0 0.77rem 1.9rem;
		box-sizing: border-box;
		// z-index: 2222;
		input {
			height: 3.05rem;
			flex-grow: 1;
			background-color: #f3f3f3;
			padding-left: 1.43rem;
			border-radius: 0.39rem;

			font-size: 1.24rem;
		}
		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-shrink: 0;
			img {
				width: 1.62rem;
				height: 1.53rem;
			}
			span {
			}
		}
		.pinglun {
			align-items: center;
			span {
				padding: 0 1rem;
				display: inline-block;
				margin: auto;
			}
		}
		.cart {
			position: relative;
			margin: 0 2.91rem 0 1.6rem;
		}
	}
}

.weixin-share {
	width: 50vw;
}
.copy-wrapper {
	padding: 1rem;
	font-size: 1rem;
}
.copy-wrapper input {
	height: 1.5rem;
	line-height: 1.5rem;
	padding: 0 0.2rem;
	// width: 12rem;
	width: 100%;
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
	font-size: 1rem;
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
.comment-popup {
	width: 100%;
	min-height: 10rem;
	background: #ffffff;
	border-radius: 1.42rem 1.42rem 0rem 0rem;
	max-height: 100%;
	.comment-wrap {
		padding: 1.9rem 0 3rem;
		position: relative;
		// padding: 0 1.43rem;
		.tabbar {
			position: absolute;
		}
		.close {
			width: 1.33rem;
			height: 1.28rem;
			position: absolute;
			right: 1.42rem;
			// top: 1.42rem;
		}
		.comment-title {
			text-align: center;
			font-size: 1.52rem;
			font-weight: 500;
			color: #161616;
		}
		.comment-container {
			padding-right: 1.42rem;
			padding-bottom: 2rem;
			p {
				margin-left: 1.42rem;
				margin-top: 1.9rem;
				font-size: 1.14rem;
				font-weight: 500;
				color: #161616;
			}
		}
		.comment-occupancy-bg {
			width: 100%;
			height: 0.95rem;
			background: #f4f5f7;
		}
	}
}
.comment {
	padding: 1.9rem 1.42rem;
	.user-info-wrap {
		display: flex;
		padding: 0 0 0.95rem;
		.user-avatar {
			width: 4.76rem;
			height: 4.76rem;
			border-radius: 50%;
		}
		.user-info {
			margin-left: 1.14rem;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.user-name {
				font-size: 1.33rem;
				font-weight: 400;
				color: #161616;
			}
			.user-time {
				font-size: 0.95rem;
				font-weight: 400;
				color: #6f6f6f;
			}
		}
	}
	.comment-content {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.req {
		padding: 0.24rem 0.62rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: #6f6f6f;
		background: #f4f5f7;
		border-radius: 1.03rem;
		margin-top: 1.19rem;
		display: inline-block;
	}
}
.steps-no {
	font-size: 1.24rem;
	font-weight: 600;
}
.common-popup-content {
	top: 4rem;
}
</style>
