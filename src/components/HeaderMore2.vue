<template>
	<div class="more-box sty">
		<!-- <div class="more-item" @click="$router.push({ name: 'HomeIndex' })">
			<i class="iconfont">&#xe6b2;</i>
			<span>首页</span>
		</div> -->
		<div class="more-item" @click="$router.push({ name: 'HomeScan' })">
			<i class="iconfont">&#xe61e;</i>
			<span>扫一扫</span>
		</div>
		<div class="more-item" @click="$router.push({ name: 'MemberInformForm', query: { goods_id: goods_id } })" v-if="routerName === 'HomeGoodsdetail'">
			<i class="iconfont">&#xe6a3;</i>
			<span>违规举报</span>
		</div>
		<!-- <div class="more-item" @click="$router.push({ name: 'HomeSearch' })">
			<i class="iconfont">&#xe61f;</i>
			<span>搜索</span>
		</div> -->
		<div class="more-item" @click="$router.push({ name: 'HomeCart' })">
			<i class="iconfont">&#xe6ae;</i>
			<span>购物车</span>
		</div>
		<!-- <div class="more-item" v-if="config && config.node_site_use == '1' && config.node_site_url" @click="$router.push({ name: 'MemberChatList' })">
			<i class="iconfont">&#xe67c;</i>
			<span>聊天消息</span>
			<div v-if="showDot && showDot.chat" class="dot"></div>
		</div>
		<div class="more-item" @click="$router.push({ name: 'MemberIndex' })">
			<i class="iconfont">&#xe6b4;</i>
			<span>我的商城</span>
		</div> -->
		<!-- <div class="more-item" @click="$router.push({ name: 'HomeSellerLogin' })">
			<i class="iconfont">&#xe6b4;</i>
			<span>商家登录</span>
		</div> -->
		<div class="more-item" @click="onShare">
			<i class="iconfont">&#xe625;</i>
			<span>分享</span>
		</div>
		<div class="more-item" @click="clearHuan">
			<i class="iconfont">&#xe635;</i>
			<span>清除缓存</span>
		</div>
		<div class="more-item" v-if="newApp" @click="installAPP">
			<i class="iconfont">&#xe655;</i>
			<span>版本升级</span>
		</div>
		<i class="arrow"></i>

		<mt-popup v-model="shareVisible" position="bottom" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<!-- <mt-header title="分享到" class="common-header">
					<mt-button slot="left" icon="back" @click="shareVisible = false"></mt-button></mt-header> -->
				<p>分享到</p>
			</div>
			<div class="common-popup-content">
				<div class="share-list">
					<div class="share-item weixin" @click="fun_WerXinShare">
						<img src="@/assets/image/share_wx.png" alt="">
						<p>微信</p>
					</div>
					<div class="share-item weixin" @click="fun_WerXinShare('WXSceneTimeline')">
						<img src="@/assets/image/share_wx.png" alt="">
						<p>朋友圈</p>
					</div>
					<div class="share-item copy" @click="fun_showLink">						
						<img src="@/assets/image/share_copy.png" alt="">
						<p>复制链接</p>
					</div>
				</div>
			</div>
			<div class="common-header-wrap"  @click="shareVisible = false">
				<p>取消</p>
			</div>
		</mt-popup>

		<mt-popup v-model="copyVisible" class="copy-wrapper">
			<div class="title">您的浏览器不支持直接复制，请手动复制</div>
			<input type="text" :value="copyLink" onfocus="this.select()" />
		</mt-popup>
		
		<div class="weixin-share-wrapper h4" :style="getWrapperStyle" v-if="weixinShareImage" @click="weixinShareImage = false">
			<img class="weixin-share" src="../assets/image/weixin-share.png" />
		</div>

	</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { getWechatShare } from '../api/common';
import { loadScript } from '../util/common';
import { isWechat } from '../util/wechat';
import { mapState, mapMutations, mapActions } from 'vuex';
import { getAppVersionCode } from '../api/homeindex.js';
export default {
	name: 'HeaderMore',
	data() {
		return {
			shareVisible: false,
			weixinShareImage: false,
			copyVisible: false,
			copyLink: env.H5_HOST + this.$route.fullPath,

			newApp: true,  // 是否显示 更新 app
		};
	},
	components: {},
	created: function() {
		this.loadingAppVersion();
	},
	props: {
		goods_id: {},
		goodsDetailInfo:{},
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
		fun_WerXinShare(nameType){
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
        }else if( url.indexOf("storedetail?id=") != -1 || url.indexOf("store_goodslist?id=") != -1 || url.indexOf("store_goodsclass?id=") != -1  ){
          // 如果在 店铺详情页
          // console.log(this.store);
          thumbs = this.store.store_avatar;
          content = this.store.seller_name;
        }else if( url.indexOf("branditem") != -1 ){
          // 如果在 品牌详情页
          if ( this.brandInfo.cov_panorama ){
						thumbs = this.brandInfo.cov_panorama;
					}
          content = this.brandInfo.unitname;
				}
				// return false;
        
				// #ifdef APP-PLUS  
				plus.share.getServices((s)=> {
					var shares = {};
					// alert(JSON.stringify(s));
					for (var i = 0; i < s.length; i++) {
						var t = s[i];
						shares[t.id] = t;
					}
					var sweixin = shares['weixin'];
					
					var where = 'WXSceneSession';
					if( nameType == 'WXSceneTimeline'){
						where = 'WXSceneTimeline';
					}
					let msg = {
						type: 'web',　　//分享的内容的类型
						title: '好食源',
						content: content,
						thumbs: [thumbs],
						href: url,
						extra:{scene: where } // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
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
				// 右上角 图片显示
				this.weixinShareImage = true;
				// Toast("你好");
				// 关闭底部分享模块
				this.shareVisible = false;
			}
      //#endif
		},

		// 清除缓存
		clearHuan() {
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
				location. reload();
			}

			function plusReady() {
				plus.cache.clear(function() {
      		location. reload();
					Toast('缓存清除成功');
				});
			}
		},

		// 复制链接
		fun_showLink () {
			var oInput = document.createElement('input');
			oInput.value = this.copyLink;
			document.body.appendChild(oInput);
			oInput.select();//选择对象
			document.execCommand('copy');//执行浏览器复制命令
			document.body.removeChild(oInput);
			Toast('复制成功！');
			this.$emit("change-popupVisible",false);
			// 关闭底部分享模块
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
		},

		
		// 获取当前 app版本 
		loadingAppVersion(){
			// 如果 在 app端
			if( window.plus ){
				var that = this;	
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					// alert(JSON.stringify(wgtinfo.versionCode));			
					// 请求接口 查询  当前app 是否为 最新版本
					getAppVersionCode().then(res=>{
						if (wgtinfo.versionCode == res.result.value) {
							that.newApp = false;
						}
					}).catch(err=>{
						Toast(err.message);
					})
				});
			}else{
				this.newApp = false;
			}
		},

		// 安装 APP 最新版本		
		installAPP() {
			var url = 'https://shop.ihaosy.com/static/haosy.apk';
			var watiting = plus.nativeUI.showWaiting("下载中：0%");
			//创建下载管理对象
			var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
				// 下载完成
				if (status == 200) { //下载成功后的回调函数
					plus.nativeUI.toast("下载成功，准备安装" + d.filename);
					//安装程序，第一个参数是路径，默认的下载路径在_downloads里面
					plus.runtime.install(d.filename, {}, function() {
						plus.nativeUI.toast('安装成功');
					}, function() {
						plus.nativeUI.toast('安装失败');
					});
					plus.nativeUI.closeWaiting();
					plus.downloader.clear();
				} else {
					alert("下载失败 " + status);
					plus.downloader.clear(); //清除下载任务
				}
			});

			dtask.addEventListener("statechanged", function(task, status) {
				if (!dtask) {
					return;
				}
				// alert(task.state);
				switch (task.state) {
					case 1:
						// 开始  
						break;
					case 2:
						// 已连接到服务器  
						break;
					case 3:
						// 已接收到数据  
						var nowData = Math.floor(task.downloadedSize * 100 / task.totalSize);
						if (nowData % 5 === 0) {
							watiting.setTitle("下载中 " + nowData + "%");
							if (nowData === 100) {
								plus.nativeUI.toast("正在准备环境，请稍后！");
							}
						}
						break;
					case 4:
						// 下载完成  
						break;
				}
			}, false);
			dtask.start(); //开始下载任务
		},
	}
};
</script>

<style lang="scss" scoped>
.more-box {
	// opacity: 0.9;
	// background: #000;
	// position: absolute;
	// width: 9rem;
	// z-index: 100;
	// right: 1.3rem;
	// top: 3.2rem;
	// border-radius: 0.2rem;
	background: #fff;
	position: absolute;
	width: 10.81rem;
	z-index: 100;
	right: 1.3rem;
	top: 4rem;
	border-radius: .48rem;
	-webkit-box-shadow: 0 0 0.95rem 0 hsla(0,0%,86.3%,.5);
	box-shadow: 0 0 0.95rem 0 hsla(0,0%,86.3%,.5);
}
.more-item {
	// border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
	// height: 3.2rem;
	// line-height: 3.2rem;
	// list-style: none outside none;
	// color: #fff;
	// font-size: 1rem;
	// position: relative;
	border-bottom: 1px solid #efefef;
	height: 4.24rem;
	list-style: none outside none;
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}
.more-item i {
	// margin: 0 0.4rem;
	// vertical-align: bottom;
	margin-right: .76rem;
	    margin-left: 1.62rem;
}
.more-item span {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
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
	height: 16rem;
	overflow: visible;
	border-radius: 1.5rem 1.5rem 0 0;

	.common-header-wrap{
		& /deep/ .common-header{
			height: 2.8rem;
			.mint-header-title{
				font-size: 1.6rem;
			}
		}
	}
}
.more-box .share-list {
	display: flex;
}
.more-box{
	 .share-list{
		 
		.share-item {
			// height: 3rem;
			margin: 1rem 0.3rem;
			width: 6rem;
			padding-left: 0;
			background: none;
			text-align: center;
			color: #333;
			font-size: 1.3rem;
			img{
				width: 4rem;
			}
		}
		.copy{
			img{
				width: 3.7rem;
				margin-bottom: .3rem;
			}
		}
	 }
}
// .more-box .share-list .share-item:before {
// 	font-family: 'iconfont';
// 	content: '';
// 	display: block;
// 	border-radius: 50%;
// 	width: 4rem;
// 	height: 4rem;
// 	line-height: 4rem;
// 	text-align: center;
// 	font-size: 2.2rem;
// 	color: #fff;
// 	background: red;
// 	margin: 0 auto;
// 	margin-bottom: 0.25rem;
// }
// .more-box .share-list .share-item.weixin:before {
// 	content: '\e647';
// 	background: #228B22;
// }
// .more-box .share-list .share-item.copy:before {
// 	content: '\e64b';
// 	background: #228b22;
// }

.more-box .weixin-share-wrapper {
	position: fixed;
	bottom: 0;
	z-index: 2009;
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


.sty{
	div{
		box-sizing: border-box;
	}
	.common-header-wrap {
		height: 3rem;
		padding: .5rem 0;;
		p{
			font-size: 1.6rem;
			color: #161616;
			text-align: center;
		}
		.common-header {
			height: 3rem;
			& /deep/ .mint-header-title{
				font-size: 1.6rem;
			}
			& /deep/ .mintui{
				font-size: 1.8rem;
			}
		}
	}
	.h4{
		height:4rem;background: rgba(0,0,0,.28);
	}
	.common-popup-content{
		position: relative;
		top: 0;
		height: 9rem;
	}
}
</style>
