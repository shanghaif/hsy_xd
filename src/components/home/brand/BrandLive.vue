<template>
	<div class="container liveoneDrop">
			
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title"></span>
				
				<!-- <el-dropdown @command="handleCommand" trigger="click">
					<span class="el-dropdown-link">
						位置选择
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="(val, i) in sxt.cams" :key="i" :command="val.s">{{ val.n }}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> -->
				
				<span @click="$refs.sel_timeid.currentValue = true">
					<span>位置选择</span>
					<img style="width: 1.5rem;height: 1.5rem;transform: rotate(-90deg);margin-left: .2rem;"
						:src="require('../../../assets/image/icon2/icon-black-left.png')" alt="">
				</span>
			</div>
		</div>
			
		<div class="content-wrapper">
			<video id="myPlayer" poster="../../../assets/image/video.png" controls x5-playsinline="true" playsInline webkit-playsinline muted>
				<source id="source" :src="sxturl" type="application/x-mpegURL" />
			</video>
		</div>
		
		<onw-drop-down 
			@pickOneDropDown="getOneDropDown" 
			showName='n'
			ref="sel_timeid" 
			:items="liveData"></onw-drop-down>


	</div>
</template>

<script>
import $ from 'jquery';
import { mapState, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import { getChatCount } from '../../../api/memberChat';
import { getStoreInfo, getLiveData } from '../../../api/homestoredetail';
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite';
import { resetRem, resumeRem } from '@/util/rem';
import { isWechat } from '../../../util/wechat'
import OneDropDown from "../../OneDropDown";

export default {
	name: 'Storeabout',
	data() {
		return {
			liveData:[],  // 视频地址
			store: {
				store_id: this.$route.query.id ? this.$route.query.id : ''
			},
			sxturl: '',
			sxt: {},
			player: '',
			videoArr: [],
		};
	},
	components: {
		"onw-drop-down" : OneDropDown,
	},

	computed: {
		...mapState({
			config: state => state.config.config,
			token: state => state.member.token,
			isOnline: state => state.member.isOnline,
			areaId: state => state.member.area_id, //member数据，用于查看商品信息
			sellerInfo: state => state.seller.info, //seller数据，用于查看商品信息
			tuan: state => state.member.tuan, //社区团
			extuan: state => state.member.extuan,
			memberInfo: state => state.member.info, //member数据，用于查看商品信息
			exid: state => state.member.exid,
			extuan: state => state.member.extuan
		}),
		getBannerStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width;
			let itemHeight = height;
			return {
				maxWidth: itemWidth + 'px',
				maxHeight: itemHeight + 'px'
			};
		},
		getBannerStyle1: function() {
			const { width, height } = window.screen;
			var width1 = (width - 0) * 0.3;
			var height1 = (height - 0) * 0.3;
			return {
				maxWidth: width1 + 'px',
				maxHeight: height1 + 'px'
			};
		}
	},
	created() {
    var terminal_id = 3;
    if( isWechat() ){
      terminal_id = 2;
    }else if( window.plus ){
      terminal_id = 1;
    }
		getStoreInfo(terminal_id,this.store.store_id, this.token)
			.then(res => {
				this.store = res.result.store_info;

				this.qrcodeurl = env.SITE_URL + '/home/qrcode?url=' + encodeURIComponent(env.H5_HOST + '/home/storedetail?id=' + this.store.store_id);
				this.rec_goods_list = res.result.rec_goods_list;
				this.deliverycredit_text = res.result.store_info.store_credit.store_deliverycredit.text;
				this.deliverycredit_credit = res.result.store_info.store_credit.store_deliverycredit.credit;
				this.desccredit_text = res.result.store_info.store_credit.store_desccredit.text;
				this.desccredit_credit = res.result.store_info.store_credit.store_desccredit.credit;
				this.servicecredit_text = res.result.store_info.store_credit.store_servicecredit.text;
				this.servicecredit_credit = res.result.store_info.store_credit.store_servicecredit.credit;
				var s = this.store.camer;
				if (s.length > 10) {
					s = s.replace(/&quot;/g, '"');
					this.sxt = JSON.parse(s);
					// console.log('sxt',this.sxt);
					var line = JSON.parse(s).cams;
					for (var i = 0; i < line.length; i++) {
						this.videoArr.push({ n: line[i].n });
					}
					this.getaddr();
				}
				//alert(s)
				if (this.store.is_platform_store) {
					this.fetchConfig({}).then(
						response => {},
						error => {
							Toast(error.message);
						}
					);
				}
			})
			.catch(function(error) {});
	},
	mounted() {
		resetRem();
		this.initial();

		var fullScreenOfAndroid = function() {
			if (true) {
				if (window.plus) {
					var playym = plus.webview.currentWebview();
					playym.setStyle({ videoFullscreen: 'landscape' });
				}
			} else {
				document.addEventListener('webkitfullscreenchange', function() {
					var el = document.webkitFullscreenElement;
					if (el) {
						plus.screen.lockOrientation('landscape');
						// alert("安卓全屏");
					} else {
						plus.screen.unlockOrientation();
						// alert("安卓关闭");
					}
				});
			}
		};
		fullScreenOfAndroid();
	},
	beforeDestroy() {
		resumeRem();
		//销毁阶段 处理数据
		if (this.player) {
			this.player.stop();
			this.player = null;
		}
		
	},
	methods: {
		// 选中 当前 条件 去查询
		getOneDropDown(v){
			var val = v[0].s;	
			if (this.sxturl !== val) {
				//如果 选中路线 不是 当前路线
				if (val == null && this.sxturl == 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8') {
					return;
				}
				if (this.player) {
					//如果有萤石对象
					this.player.stop(); //停止
					this.player = null; //清空
					$('#myPlayer').attr('src', null); //坑
				}
				if (val == null) {
					//如果当前播放对象异常
					Toast('设备异常,查看测试视频'); //路径更改为 萤石测试地址
					val = 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8';
				}
				// 路径赋值
				this.sxturl = val;
				// console.log(val);
				$('#myPlayer').attr('src', this.sxturl);
				// 创建 萤石对象
				this.player = new EZUIKit.EZUIPlayer('myPlayer');
				// 播放视频
				this.player.play();
				document.getElementById('myPlayer').volume = 0; //静音播放（不可更改）
				// console.log(this.player);
			}
		},
		...mapActions({
			fetchConfig: 'fetchConfig'
		}),
		// 判断查看人信息
		initial() {
			this.varMarket = this.market;
			this.tid = this.tid1;
			this.loading();
		},
		// 加载信息函数
		loading() {
			// 初始化seller_id,member_id
			var seller_id = null,
				member_id = null,
				areaId = this.areaId,
				tuan = this.tuan;
			if (this.sellerInfo) {
				//有信息 赋值
				seller_id = this.sellerInfo.seller_id;
			}
			if (this.memberInfo) {
				//有信息 赋值
				member_id = this.memberInfo.member_id;
			}
			if (this.exid) {
				areaId = this.exid;
			}
			if (this.extuan) {
				tuan = this.extuan;
			}
			// 查询接口
			getStoreInfo(this.store.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
				.then(res => {
					this.store = res.result.store_info;
					this.rec_goods_list = res.result.rec_goods_list;
					if (this.store.is_platform_store) {
						this.fetchConfig({}).then(
							response => {},
							error => {
								Toast(error.message);
							}
						);
					}
				})
				.catch(function(error) {});
			if (this.isOnline) {
				getChatCount().then(res => {
					if (res.result) {
						this.showDot['chat'] = true;
					}
				});
			}
		},
		handleCommand(val) {
			if (this.sxturl !== val) {
				//如果 选中路线 不是 当前路线
				if (val == null && this.sxturl == 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8') {
					return;
				}
				if (this.player) {
					//如果有萤石对象
					this.player.stop(); //停止
					this.player = null; //清空
					$('#myPlayer').attr('src', null); //坑
				}
				if (val == null) {
					//如果当前播放对象异常
					Toast('设备异常,查看测试视频'); //路径更改为 萤石测试地址
					val = 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8';
				}
				// 路径赋值
				this.sxturl = val;
				// console.log(val);
				$('#myPlayer').attr('src', this.sxturl);
				// 创建 萤石对象
				this.player = new EZUIKit.EZUIPlayer('myPlayer');
				// 播放视频
				this.player.play();
				document.getElementById('myPlayer').volume = 0; //静音播放（不可更改）
				// console.log(this.player);
			}
		},
		//=====================获取直播地址
		getaddr() {
			/**---------------------- 萤石云接口 ---------------------------------------- */
			let cams = '';
			let that = this;
			var indexArr = [];
			for (let i = 0; i < this.sxt.cams.length; i++) {
				if (this.sxt.cams[i].t == '1') {
					indexArr.push(i + '');
					var aisle = this.sxt.cams[i]['aisle'] || 1;
					cams = cams + this.sxt.cams[i]['s'] + ':'+aisle +',';
				}
			}
			if (cams) {
				$.ajax({
					type: 'POST',
					url: 'https://open.ys7.com/api/lapp/live/address/get',
					data: {
						accessToken: this.sxt.token,
						source: cams
					},
					dataType: 'json',
					success: function(data) {
						let addressData = data.data;
						if (data.code != '200' || !addressData) {
							Toast('直播链接获取失败');
							return;
						}
            for (let i in addressData) {
              that.sxt.cams[indexArr[i]]['s'] = addressData[i].hls;
            }
						// 地址赋值
						if (addressData[0].hls == null) {
							//如果当前播放对象异常
							Toast('设备异常,查看测试视频'); //路径更改为 萤石测试地址
							addressData[0].hls = 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8';
						}
						if (!that.sxturl) {
							that.sxturl = addressData[0].hls;
							$('#myPlayer').attr('src', that.sxturl);
							// 创建 萤石对象
							that.player = new EZUIKit.EZUIPlayer('myPlayer');
							// 播放
							that.player.play();
							document.getElementById('myPlayer').volume = 0; //静音播放（不可更改）
						}
						that.liveData = that.sxt.cams;
					},
					error: function(e) {
						console.log(e);
					}
				});
			}
			/**-------------------------------------------------------------------------------- */
			// console.log(this.sxt.cams,this.sxt.cams.length);
			for (let i = 0; i < this.sxt.cams.length; i++) {
				var obj = this.sxt.cams[i];
				if (obj.t == '2') {
					// obj.s = "99999999999";
					// console.log(obj.s,'999999999999999',i)
					getLiveData(this.sxt.app_token, obj.s, '0', this.sxt.app_id, this.sxt.app_scret).then(res => {
						// console.log(i);
						if (res.code == 10000) {
							var hls;
							for( var cjObj of JSON.parse(res.result).result.data.streams){
								if(cjObj.streamId == 1){
									hls = cjObj.hls;
								}
							}
							// var hls = JSON.parse(res.result).result.data.streams[1].hls;
							this.sxt.cams[i].s = hls;
							if (!that.sxturl) {
								that.sxturl = hls;
								$('#myPlayer').attr('src', that.sxturl);
								// 创建 萤石对象
								that.player = new EZUIKit.EZUIPlayer('myPlayer');
								// 播放
								that.player.play();
								document.getElementById('myPlayer').volume = 0; //静音播放（不可更改）
							}
							that.liveData = that.sxt.cams;
						}
					});
				}
			}
			that.liveData = that.sxt.cams;
		},
	}
};
</script>

<style scoped lang="scss">
.liveoneDrop{
	&/deep/.mint-popup-bottom{
		height: 19rem;
	}
}
   // 头部标题 返回按钮
	.header {
    // 字体 大
    @mixin fs_big{
      font-size: 4.88vw;
    }
    $imgWidth: 5.336vw;

    height: 10.5vw;
		.header_cont{
			display: flex;
			justify-content: space-between;
			padding: 2.8128vw 3.6564vw;
			align-items: center;
			.header-left {
				width: $imgWidth;
				height: $imgWidth;
			}
			.header-title {
        font-size: 4.8267vw;
        // @include fs_big;
				// font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
        font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2A303C;
			}
			.header-right {
				width: $imgWidth;
				height: $imgWidth;
        display: block;
			}
		}
	}
.container{
	width: 100vw;
	height: 100vh;
}
  //  关闭
  .viewer_close{
    
    &::before{
      content: '\2716';
			position: absolute;
			top: 4px;
			left: 18px;
			z-index: 20;
			text-align: center;
			width: 20px;
			font-size: 20px;
			color: #333;
    }
  }
	.top {
		padding-bottom: 0.91rem;
		background-color: rgba(98, 103, 113, 1);
		.head-wrap {
			display: flex;
			justify-content: space-between;
			padding: 1.24rem 1.43rem;
			img {
				width: 1.91rem;
				height: 1.91rem;
			}
			.header-right {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// width: 1.54rem;
				span {
					width: 0.39rem;
					height: 0.39rem;
					margin-left: 0.39rem;
					border-radius: 50%;
					background-color: #fff;
				}
			}
		}
		.store-info {
			display: flex;
			align-items: center;
			color: #FFFFFF;
			margin-bottom: 0.91rem;
			font-weight: 400;
			.avatar {
				margin-left: 1.43rem;
				width: 5.72rem;
				height: 5.72rem;
				border-radius: 0.77rem;
			}
			.store-info-content {
				display: flex;
				flex-direction: column;
				padding: 0.9rem 0 0.8rem 0.62rem;
				.store_name {
					font-size: 1.34rem;
					font-weight: 500;
					& /deep/ .el-dropdown{
						font-size: 20px;
					}
				}
				.follow_number {
					margin-top: 0.53rem;
					font-size: 1.15rem;
				}
			}
			.license {
				margin-left: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 1.81rem;
					height: 1.43rem;
				}
				span {
					margin-top: 0.48rem;
					font-size: 1.05rem;
				}
			}
			.follow_panel {
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-right: 0.67rem;
				margin-left: 0.43rem;
				width: 5.2rem;
				img {
					width: 1.45rem;
					height: 1.45rem;
				}
				span {
					margin-top: 0.48rem;
					font-size: 1.05rem;
				}
			}
		}
	}

	.content-wrapper {
		// margin: 0 4vw;
		margin-top: 2vw;
		-ms-flex-align: center;
		-webkit-box-align: center;
		align-items: center;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		padding: 0rem 0rem;
		// position: relative;
		background-size: auto 100%;
		// height: 10rem;
		// min-height: 10.32rem;
		.avatar {
			-ms-flex: 0 0 3rem;
			-webkit-box-flex: 0;
			flex: 0 0 3rem;
			margin-right: 0.4rem;
			width: 3rem;
			border: 1px solid #efefef;
			img {
				border-radius: 0.1rem;
				width: 3rem;
				height: 3rem;
			}
		}
		.content {
			// position:absolute;
			// // width:8rem;height:3rem;
			// // margin-left: .5rem;
			// top: .2rem;
			// right: .5rem;
			.store_name {
				font-size: 20px !important;
				& /deep/ .el-dropdown{
					font-size: 20px;
				}
				// margin-bottom:.4rem;
			}
			.follow_number {
				line-height: 0.7rem;
				font-size: 0.7rem;
				margin-top: 0.1rem;
				color: #999;
			}
		}
		.sel_sty {
			// position: absolute;
			// bottom: -.51rem;
			// right: .5rem;
			z-index: 999;
			width: 100%;
			text-align: right;
			padding-right: 0.5rem;
		}
	}

.store_credit {
	padding: 4px 14px;
	height: 20px;
	background: #fff;
	position: relative;
	// padding: 0px 0.5rem 10px;
	.content {
		.store_name {
			font-size: 0.75rem;
				& /deep/ .el-dropdown{
					font-size: 20px;
				}
		}
		.follow_number {
			line-height: 0.7rem;
			font-size: 0.7rem;
			margin-top: 0.1rem;
			color: #999;
		}
	}
	.sel_sty {
		z-index: 999;
		width: 100%;
		text-align: right;
		padding-right: 0.5rem;
	}
}
.store_credit ul{
	padding: 0 1.43rem 1.47rem 1.43rem;
	display: flex;
	flex-direction: column;
}
.store_credit ul li {
	margin-bottom: 1.43rem;
	// display: inline-block;
	// width: 33%;
	// text-align: center;
	font-size: 1.15rem;
}
.store_credit ul li .text {
	font-size: 0.6rem;
}
.store_credit ul li .credit {
	margin-left: 1.43rem;
	
}
.store_credit ul li .store_deliverycredit {
	color: rgba(229, 50, 22, 1);
}
.store_credit ul li .store_desccredit {
	color: rgba(255, 159, 98, 1);
}
.store_credit ul li .store_servicecredit {
	color: rgba(71, 192, 189, 1);
}
.shopping-info-nums {
	background: #fff;
	border-top: 1px solid #f3f3f3;
	padding: 10px 0;
}
.shopping-info-nums ul li {
	width: 50%;
	text-align: center;
	display: inline-block;
}
.shopping-info-nums ul li .nums {
	font-size: 0.8rem;
	color: #333;
}
.shopping-info-nums ul li .text {
	font-size: 0.5rem;
	color: #999;
}
.shopping-about {
	background: #fff;
	padding-top: 25px;
}
.shopping-about div {
	border-top: 1px solid #f3f3f3;
	padding: 0 0.5rem;
	height: 2rem;
	line-height: 2rem;
}
.shopping-about label {
	width: 15%;
	color: #999;
	text-align: center;
	font-size: 0.65rem;
	vertical-align: middle;
}
.shopping-about i {
	float: right;
	font-size: 1.1rem;
	color: #999;
}
.store_info {
	background: #fff;
	padding-bottom: 2.86rem;
}
.store_info div {
	display: flex;
	border-bottom: 1px solid #f3f3f3;
	// padding: 7px 0.5rem;
	padding: 1.2rem 1.43rem 1.2rem 0;
	margin: 0 0 0 1.43rem;
	&:last-child {
		border: none;
	}
}
.store_info div span {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	vertical-align: middle;
}
.store_info div label {
	width: 26%;
	display: inline-block;
	color: #999;
	text-align: left;
	vertical-align: middle;
	font-size: 1.34rem;
	font-weight: 400;
	color: #6F6F6F;
}

.store_info .block {
	span {
		width: 32%;
		display: inline-block;
		text-align: left;
		font-size: 0.65rem;
		vertical-align: middle;
	}
	.ran-viewer {
		display: inline-block;
		padding: 0;
	}
}
.header .background {
	-webkit-filter: blur(0.5rem);
	filter: blur(0.5rem);
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: -1;
}

.middle-popup-code {
	padding: 1.91rem 0;
	border-radius: 1.39rem;
}
.middle-popup-code h4 {
	text-align: center;
	font-size: 1.53rem;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #161616;
}
.middle-popup-code .img-new-box {
	padding: 0 4.81rem;
	margin: 1.43rem 0;
}
.middle-popup-code .img-new-box .img-new-box-code {
	width: 14.1rem;
	height: 100%;
}
.middle-popup-code p {
	text-align: center;
	font-size: 1.05rem;
	font-weight: 400;
	color: #6F6F6F;
}

.middle-popup {
	width: 80%;
}
.middle-popup img {
	max-width: 100%;
}
.user-avatar {
	display: block;
	border: 1px solid #eee;
	position: relative;
	width: 5rem;
	height: 5rem;
	margin: 0 auto;
	text-align: center;
	img {
		width: 100%;
		height: 100%;
	}
}
.user-avatar::before {
	position: absolute;
	font-size: 1.5rem;
	line-height: 5rem;
	left: 50%;
	margin-left: -0.75rem;
	color: rgba(0, 0, 0, 0.5);
}
#myPlayer {
	width: 100%;
	// height: 11.986rem;
	// height: 88%;
	// position: absolute;
	// top: 0;
	// min-height: 9.2rem;
}
.dot {
	position: absolute;
	width: 0.5rem;
	height: 0.5rem;
	background: red;
	border-radius: 50%;
	top: 0.2rem;
	right: 0;
}
</style>
