<template>
	<div class="more-box">
		<div class="more-item" @click="$router.push({ name: 'HomeIndex' })">
			<!-- <i class="iconfont">&#xe6b2;</i> -->
			<img src="@/assets/image/icon2/tabbar-index.png" alt="">
			<span>首页</span>
		</div>
		<div class="more-item" v-if="config && config.node_site_use == '1' && config.node_site_url" @click="$router.push({ name: 'MemberChatList' })">
			<!-- <i class="iconfont">&#xe67c;</i> -->
			<img src="@/assets/image/icon2/icon-message3.png" alt="">
			<span>消息</span>
			<div v-if="showDot && showDot.chat" class="dot"></div>
		</div>
		<div class="more-item" @click="onShare">
			<!-- <i class="iconfont">&#xe625;</i> -->
			<img src="@/assets/image/icon2/icon-share.png" alt="">
			<span>分享</span>
		</div>
		<i class="arrow"></i>

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
				<img class="weixin-share" src="../assets/image/weixin-share.png" />
			</div>
		</mt-popup>

		<mt-popup v-model="copyVisible" class="copy-wrapper">
			<div class="title">您的浏览器不支持直接复制，请手动复制</div>
			<input type="text" :value="copyLink" onfocus="this.select()" />
		</mt-popup>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { getWechatShare } from '../api/common';
import { loadScript } from '../util/common';
import { isWechat } from '../util/wechat';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
	name: 'HeaderMore',
	data() {
		return {
			shareVisible: false,
			weixinShareImage: false,
			copyVisible: false,
			copyLink: env.H5_HOST + this.$route.fullPath
		};
	},
	components: {},
	created: function() {},
	props: {
		goods_id: {},
		share_info: {},
		showDot: {},		
		store:{},
	},
	computed: {
		...mapState({
			config: state => state.config.config
		}),
		routerName() {
			return this.$route.name;
		},
		getWrapperStyle: function() {
			const { width, height } = window.screen;
			return {
				width: width + 'px',
				height: height + 'px'
			};
		}
	},
	watch: {
		share_info: function(val) {
			if (val && isWechat() && this.config.wechat_appid) {
				this.setWechat(val);
			}
		}
	},
	methods: {
		
		// 分享到 微信
		fun_weixinShare(){
			// 如果在 APP 里
			if( window.plus ){
				let that = this;
        let url = window.location.href;
        let  thumbs = 'https://shop.ihaosy.com/uploads/home/common/app.png';
        let  content = "好事源商城";
        if( url.indexOf("home/goodsdetail?goods_id=") != -1 ){
          // 如果在 商品详情页
          if( !this.goodsDetailInfo.photos[0] ){
            thumbs = env.H5_HOST + '/assets/image/home/default_image_banner.png';
          }else{
            thumbs = this.goodsDetailInfo.photos[0];
          }
          content = this.goodsDetailInfo.goods_name;
          // console.log( thumbs,this.goodsDetailInfo );
        }else if( url.indexOf("storeabout?id") != -1 || url.indexOf("storedetail?id=") != -1 || url.indexOf("store_goodslist?id=") != -1 || url.indexOf("store_goodsclass?id=") != -1  ){
          // 如果在 店铺详情页
          // console.log(this.store);
          thumbs = this.store.store_avatar;
          content = this.store.seller_name;
        }
        
				// #ifdef APP-PLUS  
				plus.share.getServices((s)=> {
					var shares = {};
					// alert(JSON.stringify(s));
					for (var i = 0; i < s.length; i++) {
						var t = s[i];
						shares[t.id] = t;
					}
					var sweixin = shares['weixin'];
					
					let msg = {
						type: 'web',　　//分享的内容的类型
						title: '好食源',
						content: content,
						thumbs: [thumbs],
						href: url,
						extra:{scene:"WXSceneSession"} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
					}
					sweixin.send(msg, function() {
						Toast('分享成功')
						// 关闭 下拉列表
						that.$emit("change-popupVisible",false);
						that.weixinShareImage = false;
						// 关闭底部分享模块
						that.shareVisible = false;
					},function(error) {
						Toast('分享失败')
					})
				}, function(e) {
					console.log("获取分享服务列表失败：" + e.message);
				});
			}else{
				this.weixinShareImage = true;
			}
      //#endif
		},
		clearHuan() {
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}

			function plusReady() {
				plus.cache.clear(function() {
					Toast('缓存清除成功');
				});
			}
		},
		showLink() {
			var oInput = document.createElement('input');
			oInput.value = this.copyLink;
			document.body.appendChild(oInput);
			oInput.select();//选择对象
			document.execCommand('copy');//执行浏览器复制命令
			document.body.removeChild(oInput);
			Toast('复制成功！');
			this.$emit("change-popupVisible",false);
			this.weixinShareImage = false;
			// 关闭底部分享模块
			this.shareVisible = false;

			return false;

			// if (window.clipboardData) {
			// 	window.clipboardData.clearData();
			// 	window.clipboardData.setData('Text', this.copyLink);
			// 	Toast('复制成功！');
			// } else {
			// 	this.copyVisible = true;
			// }
		},
		onShare() {
			this.shareVisible = true;
		},
		setWechat(share_info) {
			getWechatShare(encodeURIComponent(window.location.href))
				.then(res => {
					loadScript('weixin', 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js', function() {
						wx.config({
							debug: false,
							appId: res.result.signPackage.appId,
							timestamp: res.result.signPackage.timestamp,
							nonceStr: res.result.signPackage.nonceStr,
							signature: res.result.signPackage.signature,
							jsApiList: [
								// 所有要调用的 API 都要加到这个列表中
								'onMenuShareTimeline',
								'onMenuShareAppMessage',
								'onMenuShareQQ',
								'onMenuShareWeibo',
								'onMenuShareQZone'
							]
						});
						wx.ready(function() {
							wx.onMenuShareAppMessage({
								title: share_info.title,
								link: share_info.link,
								imgUrl: share_info.imgUrl,
								desc: share_info.desc // 分享描述
							});

							wx.onMenuShareTimeline({
								title: share_info.title,
								link: share_info.link,
								imgUrl: share_info.imgUrl,
								desc: share_info.desc
							});
							wx.onMenuShareQQ({
								title: share_info.title, // 分享标题
								desc: share_info.desc, // 分享描述
								link: share_info.link, // 分享链接
								imgUrl: share_info.imgUrl // 分享图标
							});
							wx.onMenuShareWeibo({
								title: share_info.title, // 分享标题
								desc: share_info.desc, // 分享描述
								link: share_info.link, // 分享链接
								imgUrl: share_info.imgUrl // 分享图标
							});
							wx.onMenuShareQZone({
								title: share_info.title, // 分享标题
								desc: share_info.desc, // 分享描述
								link: share_info.link, // 分享链接
								imgUrl: share_info.imgUrl // 分享图标
							});
						});
						wx.error(function(res) {});
					});
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped>
.more-box {
	background: rgba(255, 255, 255, 1);
	position: absolute;
	width: 10.81rem;
	z-index: 1;
	right: 1.3rem;
	top: 4rem;
	border-radius: 0.48rem;
	
box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
}
.more-item {
	border-bottom: 1px solid rgba(239, 239, 239, 1);
	height: 4.24rem;
	list-style: none outside none;
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	position: relative;
	display: flex;
	align-items: center;
}
.more-item img {
	/* margin: 0 0.4rem; */
	width: 1.48rem;
	height: 1.48rem;
	margin-right: 0.76rem;
	margin-left: 1.62rem;
}
.more-item .dot {
	position: absolute;
	width: 0.5rem;
	height: 0.5rem;
	background: red;
	border-radius: 50%;
	top: 0.5rem;
	left: 1rem;
}
.arrow {
	position: absolute;
	display: block;
	right: 0.2rem;
	top: -0.7rem;
	width: 0;
	height: 0;
	margin-right: 0.45rem;
	font-size: 0;
	line-height: 0;
	border-width: 0.4rem;
	border-color: transparent transparent #fff transparent;
	border-style: dashed dashed solid dashed;
}
.common-popup-wrapper {
	height: 10rem;
	overflow: visible;
}
.more-box .share-list {
	display: flex;
}
.more-box .share-list .share-item {
	height: 3rem;
	margin: 1rem 0.8rem;
	width: 2.5rem;
	padding-left: 0;
	background: none;
	text-align: center;
	color: #333;
	font-size: 0.6rem;
}
.more-box .share-list .share-item:before {
	font-family: 'iconfont';
	content: '';
	display: block;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	font-size: 1.2rem;
	color: #fff;
	background: red;
	margin: 0 auto;
	margin-bottom: 0.25rem;
}
.more-box .share-list .share-item.weixin:before {
	content: '\e647';
	background: #228b22;
}
.more-box .share-list .share-item.copy:before {
	content: '\e64b';
	background: #228b22;
}
.more-box .weixin-share-wrapper {
	position: absolute;
	bottom: 0;
	left: 0;
	text-align: right;
}
.more-box .weixin-share {
	height: 10rem;
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
</style>
