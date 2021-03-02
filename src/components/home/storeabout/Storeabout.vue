<template>
	<div class="container">
		<div class="header">
			<div class="top">
				<div class="head-wrap">
					<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
					<div class="header-right" @click="popupMore">
						<span></span>
						<span></span>
						<span></span>
						<div v-if="showDot" class="dot"></div>
					</div>
				</div>
				<div class="store-info">
					<img :src="store.store_avatar" alt="" class="avatar" />
					<div class="store-info-content">
						<div class="store_name">{{ store.store_name }}</div>
						<div class="follow_number">{{ store.store_collect }}人收藏店铺</div>
					</div>
					<div
						class="license"
						v-if="(store.is_platform_store && config.business_licence) || store.business_licence_number_electronic"
						@click="imageVisibleLicense = true"
					>
						<!-- <i class="iconfont">&#xe621;</i> -->
						<!-- <img src="@/assets/image/icon2/icon-license.png" alt="" />
						<span>营业执照</span> -->
					</div>
					<div class="follow_panel" @click="toggleFavorite">
						<img :src="store.is_favorate ? heartWhite : heart" alt="" />
						<!-- <i class="iconfont" :class="{ active: store.is_favorate }" v-html="favoriteIco"></i> -->
						<span>{{ store.is_favorate ? '已收藏' : '收藏' }}</span>
					</div>
				</div>
			</div>

			<div class="content-wrapper">
				<!-- <div class="content sel_sty">
          <div class="store_name">  
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                位置选择<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="(val,i) in sxt.cams" :key="i" :command="val.s">{{val.n}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>                
        </div> -->
				<video id="myPlayer" poster="../../../assets/image/video.png" controls x5-playsinline="true" playsInline webkit-playsinline muted>
					<source id="source" :src="sxturl" type="application/x-mpegURL" />
				</video>
				<!-- <div class="content sel_sty">
          <div class="store_name">  
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                位置选择<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="(val,i) in sxt.cams" :key="i" :command="val.s">{{val.n}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>                
        </div> -->
			</div>

			<div class="store_credit">
				<div class="content sel_sty">
					<div class="store_name">
						<el-dropdown @command="handleCommand" trigger="click">
							<span class="el-dropdown-link">
								位置选择
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="(val, i) in sxt.cams" :key="i" :command="val.s">{{ val.n }}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>

				<!-- <div v-if="banquetType" class="dinner" @click="$router.push({name:'HomebanquetReserve',query:{store_id:store.store_id}})">
					<div class="img-left">
						<img src="@/assets/image/icon2/icon-mans.png" alt="" />
						<span>宴席预定</span>
					</div>
					<div class="img-right">
						<span>可预定</span>
						<img src="@/assets/image/icon2/icon-right2.png" alt="" />
					</div>
				</div> -->

				<ul>
					<li>
						<span class="text">{{ deliverycredit_text }}</span>
						<span class="credit store_deliverycredit">{{ deliverycredit_credit }}分</span>
					</li>
					<li>
						<span class="text">{{ desccredit_text }}</span>
						<span class="credit store_desccredit">{{ desccredit_credit }}分</span>
					</li>
					<li>
						<span class="text">{{ servicecredit_text }}</span>
						<span class="credit store_servicecredit">{{ servicecredit_credit }}分</span>
					</li>
				</ul>
			</div>
			<div style="background-color: rgba(244, 245, 247, 1);height: 0.96rem;width: 100%;"></div>
			<div class="shopping-info-nums">
				<div class="store_info pad_sty">
					<div>
						<label>商家名称：</label>
						<span>{{ store.store_company_name }}</span>
					</div>
					<div>
						<label>商家地址：</label>
						<span>{{ store.area_info }}</span>
					</div>
					<div>
						<label>商家电话：</label>
						<span>{{ store.store_phone }}</span>
						<!-- <a style="margin-left: auto;" :href="'tel:' + store.store_phone"> -->
						<a :href="'tel:' + store.store_phone" style="margin-left: auto;">
							<img style="width: 1.2rem;height: 1.48rem;" src="@/assets/image/icon2/icon-phone.png" alt="" />
						</a>
					</div>
					<div @click="imageVisible = true">
						<label>商家二维码：</label>
						<!-- <span></span> -->
						<img style="margin-left: auto;width: 1.53rem;height: 1.53rem;" src="@/assets/image/icon2/icon-code.png" alt="" />
						<!-- <img style="width: 1.53rem;height: 1.53rem;" src="@/assets/image/icon2/icon-code.png" alt=""> -->
						<!-- <i style="margin-left: auto;" class="iconfont">&#xe6e0;</i> -->
					</div>
					<div>
						<label>全部商品：</label>
						<span>{{ store.goods_count }}</span>
					</div>
					<div>
						<label>商家别名：</label>
						<span>{{ store.seller_name }}</span>
					</div>
					<!-- 图片 -->
					<div class="block" v-if="store.business_licence_number_electronic">
						<span class="demonstration">营业执照</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[0]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.business_licence_number_electronic" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block" v-if="store.b_xk1">
						<span class="demonstration">经营许可证</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[1]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.b_xk1" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block" v-if="store.b_xk2">
						<span class="demonstration">生产许可证</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[2]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.b_xk2" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block" v-if="store.b_xk3">
						<span class="demonstration">登记证</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[3]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.b_xk3" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block" v-if="store.b_fzrjkz">
						<span class="demonstration">负责人健康证</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[4]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.b_fzrjkz" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block" v-if="store.b_aqyjkz">
						<span class="demonstration">安全人员健康证</span>
						<ran-viewer :options="options" @inited="inited" class="ran-viewer" ref="viewer">
							<template>
								<!-- <mt-spinner v-show="!imgShow[5]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
								<img :src="store.b_aqyjkz" :style="getBannerStyle1" />
							</template>
						</ran-viewer>
					</div>
					<div class="block">
						<span class="demonstration"></span>
						<div class="block-btn-map" @click="fun_comeBackMap">查看位置</div>
					</div>
				</div>
			</div>
		</div>

		
		<common-store-footer-food v-if="foodType" :store_id="store.store_id"></common-store-footer-food>
		<common-store-footer v-show="fromGood" v-else :store_id="store.store_id"></common-store-footer>
		<mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup-code">
			<img class="close" @click="imageVisible = false" src="@/assets/image/icon2/icon-cha.png" alt="" />
			<h4>{{ store.store_name }}</h4>
			<div class="img-new-box"><img class="img-new-box-code" :src="qrcodeurl" /></div>
			<p>邀请好友扫一扫分享店铺给TA</p>
		</mt-popup>
		<mt-popup v-model="imageVisibleLicense" popup-transition="popup-fade" class="middle-popup">
			<img v-if="store.business_licence_number_electronic" :src="store.business_licence_number_electronic" />
			<img v-if="store.is_platform_store && config.business_licence" :src="config.business_licence" />
		</mt-popup>
		<header-more3 :store="store" @change-popupVisible="changePopupVisible" v-show="popupVisible" :showDot="showDot"></header-more3>
	</div>
</template>

<script>
import $ from 'jquery';
import { mapState, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
import CommonStoreFooter from '../common/CommonStoreFooter';
import CommonStoreFooterFood from '../common/CommonStoreFooterFood';
import { getChatCount } from '../../../api/memberChat';
import { getStoreInfo, getLiveData } from '../../../api/homestoredetail';
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite';
import { getSellerSetList } from '@/api/memberBanquet.js';
import HeaderMore3 from '../../HeaderMoreSty';
// npm install v-viewer --save
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';
import { resetRem, resumeRem } from '@/util/rem';
import { isWechat } from '../../../util/wechat';
// npm install v-viewer --save

export default {
	name: 'Storeabout',
	data() {
		return {
			imageVisible: false,
			imageVisibleLicense: false,
			store: {
				store_id: this.$route.query.id ? this.$route.query.id : ''
			},
			lat: null, //商家经纬度
			lng: null, //商家经纬度
			id: null, //商家 id
			sid: this.$route.query.sid, //商家 id
			rec_goods_list: false,
			popupVisible: false, // 弹出更多
			showDot: false,
			deliverycredit_text: '',
			deliverycredit_credit: 0,
			desccredit_text: '',
			desccredit_credit: 0,
			servicecredit_text: '',
			servicecredit_credit: 0,
			showimage: '',
			isshow: false,
			qrcodeurl: '',
			sxturl: '',
			sxt: {},
			player: '',
			videoArr: [],
			options: {
				//配置查看图片缩放
				button: true, //右上角按钮
				zoomable: true, //是否可以缩放
				movable: true, //是否可以移动
				transition: true, //使用 CSS3 过度
				fullscreen: true, //播放时是否全屏
				keyboard: true, //是否支持键盘
				title: false, //当前图片标题
				tooltip: false, //显示缩放百分比
				navbar: false, //底部缩略图
				toolbar: false, //底部工具栏
				rotatable: false, //是否可旋转
				scalable: false //是否可翻转
			},
			isServe: true,		//商家是否开启宴请预定
			showDot: false,
			heartWhite: require('@/assets/image/icon2/icon-heart-white.png'),
			heart: require('@/assets/image/icon2/icon-heart-transparent2.png'),
			banquetType: false,  // 宴席 模块 展示
			fromGood:true,
			// imgShow:[false,false,false,false,false,false]//图片是否显示
		};
	},
	components: {
		HeaderMore3,
		CommonStoreFooter,
		CommonStoreFooterFood,
		'ran-viewer': Viewer
	},
	
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
			// console.log(from.name);
			if( from.name == "HomeStoreFoodslist" ){
				vm.fromGood = false;
			}
		})
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
		foodType:function(){
			var str = '3,4,7,8,9,10,47,48,49,50';
			return str.indexOf(this.store.storeclass_id)!= -1
		},
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
		// terminal_id 终端id，1APP 2公众号 3h5
		var terminal_id = 3;
		if (isWechat()) {
			terminal_id = 2;
		} else if (window.plus) {
			terminal_id = 1;
		}
		getStoreInfo(terminal_id, this.store.store_id, this.token)
			.then(res => {
				this.store = res.result.store_info;
				this.lat = res.result.store_info.store_latitude;
				this.lng = res.result.store_info.store_longitude;

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

		// 判断 当前商家 是否 含有宴席 模块
		// getSellerSetList({ store_id:  this.store.store_id })
		// .then(res => {
		// 	// 如果有数据  展示 宴席模块
		// 	this.banquetType = true;
		// }).catch(error => {
		// });
	},
	mounted() {
		resetRem();
		this.initial();
		// //如果不是同源的页面，暂时无法解决
		// //如果是同源的页面，用户需要找到iframe里面的video元素，并对其进行如下操作
		// var videoElem = document.getElementById('myPlayer'); //video元素
		// // video元素开始全屏
		// videoElem.addEventListener('webkitbeginfullscreen', function() {//目的是监听video的全屏事件，改变手机的横竖屏
		//     plus.screen.lockOrientation('landscape');
		//     alert("全屏播放");
		// });
		// // video元素全屏结束
		// videoElem.addEventListener('webkitendfullscreen', function() {
		//     plus.screen.lockOrientation('portrait');
		//     console.log("关闭全屏播放");
		// });

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
		// var fullScreenOfIos = function(videoElem) {
		//   videoElem.addEventListener('webkitbeginfullscreen', function() {
		//     plus.screen.lockOrientation('landscape')
		//   });
		//   videoElem.addEventListener('webkitendfullscreen', function() {
		//     plus.screen.unlockOrientation()
		//   })
		// };
	},
	beforeDestroy() {
		// resumeRem();
		
		// resetRem();
		//销毁阶段 处理数据
		if (this.player) {
			this.player.stop();
			this.player = null;
		}
	},
	methods: {
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
			// terminal_id 终端id，1APP 2公众号 3h5
			var terminal_id = 3;
			if (isWechat()) {
				terminal_id = 2;
			} else if (window.plus) {
				terminal_id = 1;
			}
			// console.log(terminal_id);
			// 查询接口
			// debugger
			getStoreInfo(terminal_id, this.store.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
				// // 查询接口
				// getStoreInfo(this.store.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
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
		//返回地图函数
		fun_comeBackMap() {
			// console.log("返回地图");
			// this.$router.go(-1);
			this.$router.push({
				name: 'HomeMapdh',
				query: { lng: this.lng, lat: this.lat, id: this.store.store_id, sid: this.sid?this.sid:this.store.news_storeclass_id, name: this.store.store_name }
			});
		},
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},
		handleCommand(val) {
			// console.log(val);
			// console.log(this.sxturl);
			// console.log(this.sxt.cams);
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
					var aisle = this.sxt.cams[i].aisle || 1;
					cams = cams + this.sxt.cams[i]['s'] + ':' + aisle + ',';
				}
			}
			if (cams) {
				$.ajax({
					type: 'POST',
					url: 'https://open.ys7.com/api/lapp/live/address/get',
					data: {
						accessToken: that.sxt.token,
						source: cams
					},
					dataType: 'json',
					success: function(data) {
						let addressData = data.data;
						if (data.code != '200' || !addressData) {
							Toast('直播链接获取失败');
							return;
						}
						for (let i in addressData) {
							that.sxt.cams[indexArr[i]]['s'] = addressData[i].hls;
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
									hls = cjObj.hls
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
						}
					});
				}
			}
		},
		// 弹出更多
		popupMore() {
			if (!this.popupVisible) {
				this.popupVisible = true;
			} else {
				this.popupVisible = false;
			}
		},
		// 切换收藏
		toggleFavorite() {
			if (!this.store.is_favorate) {
				addFavoriteStore(this.store.store_id).then(
					response => {
						Toast(response.message);
						this.store.is_favorate = !this.store.is_favorate;
						this.store.store_collect += 1;
					},
					error => {
						Toast(error.message);
					}
				);
			} else {
				delFavoriteStore(this.store.store_id).then(
					response => {
						Toast(response.message);
						this.store.is_favorate = !this.store.is_favorate;
						this.store.store_collect -= 1;
					},
					error => {
						Toast(error.message);
					}
				);
			}
		},
		favoriteName() {
			return this.store.is_favorate ? '已收藏' : '收藏';
		},
		// 图片缩放函数
		inited(viewer) {
			this.$viewer = viewer;
		},
		// 判断当前图片是否加载完成
		// ImgLoad(i){
		//   this.imgShow[i] = true;
		//   this.imgShow.splice(i,1,true);
		// }

		// 切换 黑色下拉框
		changePopupVisible(v) {
			this.popupVisible = v;
		}
	}
};
</script>

<style scoped lang="scss">
.header {
	overflow: hidden;
	position: relative;
	background-position: center;
	background-size: auto 100%;
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
			color: #ffffff;
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
				font-size: 0.75rem;
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
}

.store_credit {
	background: #fff;
	// padding: 0px 0.5rem 10px;
	.content {
		.store_name {
			font-size: 0.75rem;
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
.store_credit ul {
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
	font-size: 1.34rem;
	// display: inline-block;
	// width: 32%;
}
.store_credit ul li .credit {
	margin-left: 1.43rem;
	padding: 0 0 0 2.1rem;
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

.pad_sty {
	// padding: 0 0 0 1.43rem;
	div {
		&:not(.block) {
			// label{
			// 	width: 32%;
			// }
			span {
				padding: 0 0 0 1.43rem;
			}
			img {
				// margin: 0 0 0 1.43rem;
			}
		}
	}
}
.store_info div label {
	width: 26%;
	display: inline-block;
	color: #999;
	text-align: left;
	vertical-align: middle;
	font-size: 1.34rem;
	font-weight: 400;
	color: #6f6f6f;
	flex-shrink: 0;
}

.store_info .block {
	span {
		width: 32%;
		display: inline-block;
		text-align: left;
		font-size: 0.65rem;
		font-size: 1.34rem;
		vertical-align: middle;
	}
	.ran-viewer {
		display: inline-block;
		padding: 0;
	}

	.block-btn-map {
		padding: 0.8rem 1rem;
		background: #999;
		border-radius: 6px;
		color: #fff;
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
	color: #6f6f6f;
}
.middle-popup-code img.close {
	width: 1.29rem;
	height: 1.23rem;
	position: absolute;
	right: 1.43rem;
	top: 1.42rem;
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
.dinner {
	display: flex;
	justify-content: space-between;
	padding: 1.38rem 1.43rem;
	margin: 1.43rem 1.43rem 1.89rem;
	align-items: center;
	background: #ffffff;
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(241, 241, 241, 0.98);
	border-radius: 0.67rem;
	> div {
		display: flex;
		align-items: center;
	}
	.img-left {
		img {
			width: 1.95rem;
			height: 1.52rem;
			margin-right: 0.95rem;
		}
		span {
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
		}
	}
	.img-right {
		img {
			// width: 1.33rem;
			height: 1.33rem;
			margin-left: 0.95rem;
		}
		span {
			font-size: 1.33rem;
			font-weight: 400;
			color: #6f6f6f;
		}
	}
}
</style>
