<template>
	<div class="menu clear-fix">
		<div v-if="false" class="menu-item" @click="toLearn">
			<!-- <i class="iconfont bg-2">&#xe68c;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-study.png" alt="">
			<span class="menu-item-title">从业学习</span>
		</div>
		<!-- <div class="menu-item" @click="toList(1)">
			<img class="menu-item-icon" src="@/assets/image/icon2/red-list.png" alt="">
			<span class="menu-item-title">榜上有名</span>
		</div>
		<div class="menu-item" @click="toList(-1)">
			<img class="menu-item-icon" src="@/assets/image/icon2/black-list.png" alt="">
			<span class="menu-item-title">曝光台</span>
		</div> -->
		<div class="menu-item" @click="see1('http://www.bioplasm.cn/wx/spaqpx/')">
			<!-- <i class="iconfont bg-4">&#xe6e6;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-315.png" alt="">
			<span class="menu-item-title">直通315</span>
		</div>
		<!-- <div class="menu-item" @click="see('https://www.wenjuan.com/s/RfEZnigY/?share_device=weixin')">
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-quest.png" alt="">
			<span class="menu-item-title">问卷调查</span>
		</div> -->
		<div class="menu-item" @click="see('https://www.wenjuan.com/s/vuiMJbV/')">
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-quest.png" alt="">
			<span class="menu-item-title">问卷调查</span>
		</div>
		<!-- <div class="menu-item" @click="see('https://mp.weixin.qq.com/mp/homepage?__biz=MzUyNTgwMDI3Ng==&hid=29&sn=c0fecf4821763422c1c48fa566b4dc2e&scene=18')">
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-news.png" alt="">
			<span class="menu-item-title">新闻资讯</span>
		</div> -->
		<div class="menu-item" @click="showTip">
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-news.png" alt="">
			<span class="menu-item-title">热门资讯</span>
		</div>
		<!-- <div class="menu-item" @click="goArticleclass">
			<i class="iconfont bg-4">&#xe674;</i>
			<span class="menu-item-title">帮助中心</span>
		</div> -->
		<div class="menu-item" @click="$router.push({ name: 'HomeGoodslist', query: { xianshi: 1 } })" >
			<!-- <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu3.png" /> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-promo.png" alt="">
			<span class="menu-item-title">促销</span>
		</div>
		<!-- <div class="menu-item" @click="goPintuan()" >
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-promo.png" alt="">
			<span class="menu-item-title">拼团</span>
		</div> -->
		<div v-if="false" class="menu-item" @click="goPointsgoods">
			<!-- <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu5.png" /> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-jifen.png" />
			<span class="menu-item-title">积分商城</span>
		</div>
		<!-- <div class="menu-item" @click="myOrder">
			<img class="menu-item-icon" src="../../../assets/image/home/home-index-menu8.png" />
			<span class="menu-item-title">我的订单</span>
		</div> -->
		<div class="menu-item" @click="goGroupBuy">
			<!-- <i class="iconfont bg-6">&#xe633;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-qianggou.png" />
			<span class="menu-item-title">抢购</span>
		</div>
		
		<div class="menu-item" @click="installAPP">
			<!-- <i class="iconfont bg-6">&#xe633;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-version-upgrade.png" />
			<span class="menu-item-title">{{AppTitle}}</span>
			<span v-if="newApp" class="newApp">新</span>
		</div>

		<div class="menu-item" @click="goHomeArticlelist">
			<!-- <i class="iconfont bg-6">&#xe633;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/faxian-articlelist.png" />
			<span class="menu-item-title">商城公告</span>
		</div>
		<div class="menu-item" @click="$router.push({ name: 'TodayMarket' })">
			<!-- <i class="iconfont bg-6">&#xe633;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/faxian-todaymarket.png" />
			<span class="menu-item-title">今日行情</span>
		</div>
		<div class="menu-item" @click="$router.push({ name: 'HomeRecipe', query: { isfrom: 'home' } })">
			<!-- <i class="iconfont bg-6">&#xe633;</i> -->
			<img class="menu-item-icon" src="@/assets/image/icon2/faxian-recipe.png" />
			<span class="menu-item-title">精选菜谱</span>
		</div>

		<!-- <div class="menu-item" @click="$router.push({name:'HomePanoramic'})">
			<img class="menu-item-icon" src="@/assets/image/icon2/icon-faxian-qianggou.png" />
			<span class="menu-item-title">裁切</span>
		</div> -->
		<!-- <div class="menu-item" @click="goMemberIndex">
			<i class="iconfont bg-2">&#xe68c;</i>
			<span class="menu-item-title">个人中心</span>
		</div> -->
		<iframe id="bdIframe" :src="tourl" frameborder="0" :style="select" scrolling="auto" @onload="chht"></iframe>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';
import { getAppVersionCode } from '../../../api/homeindex.js';

export default {
	name: 'HomeMenu',
	// props: ['items'],
	data() {
		return {
			tourl: 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MzQ2MTM0Nw==&hid=2&sn=586e9645d736e4575d1396aa899c204b&scene=18',
			select: { width: '100%', height: '100px' },
			
			newApp: false,  // 是否显示 更新 app
			AppTitle:'下载APP',
		};
	},
	computed: {
		...mapState({
			isOnline: state => state.member.isOnline,
			user: state => state.member.info,
			navs: state => state.home.navs
		})
	},

	created(){
		this.loadingAppVersion();
	},

	mounted() {
		const oIframe = document.getElementById('bdIframe');
		const deviceWidth = document.documentElement.clientWidth;
		const deviceHeight = document.documentElement.clientHeight;
		this.select.width = Number(deviceWidth) - 10 + 'px'; //数字是页面布局宽度差值
		this.select.height = Number(deviceHeight) - 280 + 'px'; //数字是页面布局高度差
		//this.select.height =oIframe.contents().find('body').height();
	},
	methods: {
		// 去学习
		toLearn() {
			if (this.isOnline) {
				if( this.user.gangwei && this.user.gangwei!= 999 ){
					this.$router.push({ name: 'HomeLearn' });
				}else{
					Toast("请先去实名认证，并填写行业岗位信息");
				}
			} else {
				this.showLogin();
			}
		},
		
		// 榜上有名 曝光台
		toList ( v ) {
			if( v > 0 ){
				this.$router.push({ name: 'HomeArticledetail', query: { article_id: 50 } });
			}else{
				Toast('开发中');
			}
		},

		see(s) {
			this.tourl = s;
			// var iframe = document.getElementById("bdIframe");
			// if (iframe.attachEvent){ // 兼容IE写法
			// 	iframe.attachEvent("onload", function(){
			// 		// iframe加载完成后要进行的操作
			// 		if(document.getElementById('appearset_header')){
			// 			document.getElementById('appearset_header').remove();
			// 		}
			// 	})
			// } else {
			// 	iframe.onload = function(){
			// 		// iframe加载完成后要进行的操作
			// 		if(document.getElementById('appearset_header')){
			// 			document.getElementById('appearset_header').remove();
			// 		}
			// 	}
			// }
		},
		chht() {
			var oIframe = document.getElementById('bdIframe');
			this.select.height = oIframe
				.contents()
				.find('body')
				.height();
		},
		see1(s) {
			window.location.href = s;
		},
		showLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
		},
		goPointsgoods() {
			this.$router.push({ name: 'HomePointsgoods' });
		},
		goStoreclass() {
			this.$router.push({ name: 'HomeStoreclass' });
		},
		goPintuan() {
			this.$router.push({ name: 'HomePintuanList' });
		},
		goBargain() {
			this.$router.push({ name: 'HomeBargainlist' });
		},
		goBrand() {
			this.$router.push({ name: 'HomeBrand' });
		},
		goArticleclass() {
			this.$router.push({ name: 'HomeArticleclass' });
		},
		goMemberIndex() {
			this.$router.push({ name: 'MemberIndex' });
		},
		goGroupBuy() {
			this.$router.push({ name: 'HomeGroupBuyList' });
		},
		goVrGroupBuy() {
			this.$router.push({ name: 'HomeVrGroupBuyList' });
		},
		goMemberPointSignin() {
			this.$router.push({ name: 'MemberPointSignin' });
		},
		myOrder() {
			if (this.isOnline) {
				this.$router.push({
					name: 'MemberOrderList'
				});
			} else {
				this.showLogin();
			}
		},
		goAdUrl(item) {
			switch (item.adv_type) {
				case 'goods':
					this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: item.adv_typedate } });
					break;
				case 'store':
					this.$router.push({ name: 'HomeStoredetail', query: { id: item.adv_typedate } });
					break;
				case 'article':
					this.$router.push({ name: 'HomeArticledetail', query: { article_id: item.adv_typedate } });
					break;
				case 'url':
					window.location.href = item.adv_typedate;
					break;
			}
		},
		// 商城公告
		goHomeArticlelist() {
			this.$router.push({ name: 'HomeArticlelist', query: { ac_id: 1 } });
		},

		// 热门资讯
		showTip() {
      this.$router.push({ name: 'HomeTopList', query:{ ac_id: 11} });
		},

		
		// 获取当前 app版本 
		loadingAppVersion(){
			// 如果 在 app端
			if( window.plus ){
				this.AppTitle = '版本升级';
				var that = this;	
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					// alert(JSON.stringify(wgtinfo.versionCode));			
					// 请求接口 查询  当前app 是否为 最新版本
					getAppVersionCode().then(res=>{
						if (wgtinfo.versionCode != res.result.value) {
							that.newApp = true;
						}
					}).catch(err=>{
						Toast(err.message);
					})
				});
			}
		},

		
		// 安装 APP 最新版本
		installAPP() {			
			var ua = window.navigator.userAgent.toLowerCase();
			if( window.plus ){
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
			}else if( ua.match(/MicroMessenger/i) != 'micromessenger' ){
				var link;
				link = document.createElement("a");
				link.href = 'https://shop.ihaosy.com/static/haosy.apk';//下载链接
				link.setAttribute("id","hsyApp");
				link.style.display = "none";//a标签隐藏
				document.body.appendChild(link);
				link.click();
				link = null;
				var domLink = document.getElementById('hsyApp');
				domLink.remove();
        // this.$router.push({ name: 'HomeUrl' ,params:{url: 'https://shop.ihaosy.com/static/haosy.apk' } })
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.menu {
	overflow: hidden;
	justify-content: space-around;
	background: #ffffff;
	padding-top: 1.78rem;
	border-radius:1.3rem 1.3rem 0rem 0rem;
	.menu-item {
		margin-bottom: 1.65rem;
		width: 25%;
		text-align: center;
		float: left;
		position: relative;
		// .iconfont {
		// 	margin: auto;
		// 	width: 2rem;
		// 	height: 2rem;
		// 	line-height: 2rem;
		// 	font-size: 1.4rem;
		// 	color: #fff;
		// 	overflow: hidden;
		// 	display: block;
		// 	text-align: center;
		// 	border-radius: 50%;
		// }
		.menu-item-icon {
			width: 3.6rem;
			height: 3.6rem;
			overflow: hidden;
		}
		.menu-item-title {
			display: block;
			color: #333;
			// font-size: 0.6rem;
			font-size: 1.1rem;
			margin-top: 0.2rem;
		}

		.newApp{
			position: absolute;
			top: -0.5rem;
			right: 1.6rem;
			background: red;
			padding: 1px 4px;
			color: #fff;
			font-size: 12px;
			border-radius: 50%;
		}
	}
}
.bg-1 {
	background-image: linear-gradient(to bottom, #d69dcc, #e8198b);
}
.bg-2 {
	background-image: linear-gradient(to bottom, #04befe, #4481eb);
}
.bg-3 {
	background-image: linear-gradient(to bottom, #cc208e, #6713d2);
}
.bg-4 {
	background-image: linear-gradient(to bottom, #ff9a44, #fc6076);
}
.bg-5 {
	background-image: linear-gradient(to bottom, #00ecbc, #007adf);
}
.bg-6 {
	background-image: linear-gradient(to bottom, #ff8177, #b12a5b);
}
</style>
