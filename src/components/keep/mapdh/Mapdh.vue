<template>
	<!-- <vue-drawer-layout
	ref="drawerLayout"
	:reverse="true"
	:content-drawable="true"
	:drawer-width="200">
	<div class="drawer class-list" :style="{height:select.height}" slot="drawer">
		<ul>
			<li v-for="item in storeclass_list" v-bind:key="item.storeclass_id" @click="getStoreList(item.storeclass_id)">
				<img class="menu-item-icon icon_style" :src="geticon(item.storeclass_id)" />
				{{item.storeclass_name}}
			</li>
		</ul>
	</div> -->
	<div class="content" slot="content">
		<baidu-map class="map" :center="zhongxinP" :zoom="zm"  :max-zoom="19" :scroll-wheel-zoom="true" :style="select" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
			<bm-control class="search_content">
				<div class="ui-form-area">
					<div class="ui-form-control">
						<!-- <i class="iconfont icon-search search_i" /> -->
						<img class="search-img" src="../../../assets/image/icon2/search.png" alt="" />
						<input v-model="keyword" type="text" placeholder="请输入要搜索的地名" class="ui-form-input" />
					</div>
				</div>
				<!-- <button class="button small" @click="handleToggleDrawer">M</button> -->
			</bm-control>
			<!--缩放控件-->
			<!-- <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation> -->
			<bm-local-search :keyword="keyword" :auto-viewport="true" />
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getPoint"></bm-geolocation>
			<bm-copyright anchor="BMAP_ANCHOR_TOP_RIGHT" :copyright="cR"></bm-copyright>
			<!-- <bml-marker-clusterer :averageCenter="true"> -->
				<div class="abcd" v-for="(item, index) in items" :key="index">
					<!-- <bm-marker
						:position="{ lng: item.lng, lat: item.lat }"
						:title="item.name"
						@touchend="infoWindowOpen(index)"
						@click="infoWindowOpen(index)"
						:icon="{ url: geticon(item.storeclass_id), size: { width: 50, height: 50 } }"
					>  -->
					<bm-marker
						:position="{ lng: item.lng, lat: item.lat }"
						:title="item.name"
						@touchend="infoWindowOpen(index)"
						@click="infoWindowOpen(index)"
						:icon="{ url: require('../../../assets/image/mappath/'+(Sid==100?100:item.storeclass_id)+'.png'), size: { width: 50, height: 50 } }"
					> 
					<!-- <bm-label :content="item.name" :labelStyle="{color: '#999', fontSize : '12px',border:'0'}" :offset="{width: -35, height: 30}"/> -->
					</bm-marker>
				</div>
			<!-- </bml-marker-clusterer> -->
			<bm-info-window :title="infoWindow.contents" :position="{ lng: infoWindow.lng, lat: infoWindow.lat }" :show="infoWindow.show" @close="infoWindowClose">
				<div class="map_info_btn" style="max-width:200px">
					<!-- <button v-if="infoWindow.storeclass_id!=99" class="button  small" @click="goid(infoWindow)">
						<span class="iconfont bg-14">&#xe703;</span>
						详情
					</button> -->
					<!-- <button v-if="infoWindow.storeclass_id==99" class="button  small" @click="goidName(infoWindow)">
						<span class="iconfont bg-14">&#xe703;</span>
						复制名称
					</button> -->
					<!-- <button class="button small" @click="goroad(infoWindow.lng, infoWindow.lat, 2, 1)">
						<span class="iconfont bg-12 icon-31daishouhuo"></span>
						导航
					</button> -->

					<button  class="button small"
						@click.stop="$router.push( { name: 'KeepTestEdit', query:{ member_id : infoWindow.member_id}} )">								
						<span style="color:#e93f9d"  class="icon iconfont">&#xe69f;</span>
						查看</button>
					<!-- <button class="button small"
						@click.stop="$router.push( { name: 'KeepStoreGoodslist', query:{ store_id : infoWindow.store_id}} )">						
						<span style="color:#e93b3d"  class="icon iconfont">&#xe6e7;</span>
						商品
					</button> -->
					<button class="button small"
						@click.stop="$router.push( { name: 'KeepJinhuo', query:{ sid : infoWindow.store_id}} )">			
						<span style="color:#B4D500"  class="icon iconfont">&#xe6de;</span>
						台账
					</button>
					<button class="button small" v-if="infoWindow.is_camer == 1"								
						@click="$router.push( { name:'KeepStoreLive',query:{ sid : infoWindow.store_id}} )">								
						<span style="color:#00AEFF"  class="icon iconfont">&#xe6c6;</span>
						视频
					</button>
					<button class="button small" v-if="infoWindow.complain == 1"
						@click="$router.push( { name:'KeepReportList',query:{ sid : infoWindow.store_id}} )">								
						<span style="color:#e93b3d"  class="icon iconfont">&#xe670;</span>
						举报
					</button>

					<!-- ************************************** 
						<button class="button small" @click.stop="$router.push( { name: 'KeepStoreGoodslist', query:{ store_id : infoWindow.store_id}} )">						
							<span style="color:#3C65FF"  class="icon iconfont">&#xe6e7;</span>
							商品
						</button>
						<button class="button small" 
							@click.stop="$router.push( { name: 'KeepTesting', query:{ member_id : infoWindow.member_id}} )">				
							<span style="color:#FF9C3C"  class="icon iconfont">&#xe62d;</span>
							审核
						</button>
						<button class="button small" 
							@click.stop="$router.push( { name: 'KeepJinhuo', query:{ sid : infoWindow.store_id}} )">			
							<span style="color:#B4D500"  class="icon iconfont">&#xe6de;</span>
							台账
						</button>
						<button class="button small" 					
							@click="$router.push( { name:'KeepStoreLive',query:{ sid : infoWindow.store_id}} )">								
							<span style="color:#00AEFF"  class="icon iconfont">&#xe6c6;</span>
							视频
						</button>
						<button class="button small" 					@click="$router.push( { name:'KeepReportList',query:{ sid : infoWindow.store_id}} )">								
							<span style="color:#e93b3d"  class="icon iconfont">&#xe670;</span>
							举报
						</button>
					 ****************************************** -->
				</div>
					<!-- <button class="button small" @click="goroad(infoWindow.lng, infoWindow.lat, 1, 1)">
						<span class="iconfont bg-11">&#xe60b;</span>
						步行
					</button>
				</div>
				<div class="map_info_btn">
					<button class="button small" @click="goroad(infoWindow.lng, infoWindow.lat, 2, 1)">
						<span class="iconfont bg-12 icon-31daishouhuo"></span>
						驾行
					</button>
					<button class="button small" @click="goroad(infoWindow.lng, infoWindow.lat, 3, 1)">
						<span class="iconfont icon-31daishouhuo bg-13"></span>
						公交
					</button>
				</div> -->
			</bm-info-window>
			<bm-marker :position="add.p">
				<bm-info-window :show="add.show" @close="pWindowClose" style="font-size: 14px">
					<p>名称：{{ add.siteName }}</p>
					<p>地址：{{ add.site }}</p>
				</bm-info-window>
			</bm-marker>
			<bm-walking v-if="daohang.bx" :start="daohang.sp" :end="daohang.ep" :auto-viewport="true" :panel="daohang.mb"></bm-walking>
			<bm-driving v-if="daohang.jc" :start="daohang.sp" :end="daohang.ep" :auto-viewport="true" :panel="daohang.mb"></bm-driving>
			<bm-transit v-if="daohang.gj" :start="daohang.sp" :end="daohang.ep" :auto-viewport="true" :panel="daohang.mb"></bm-transit>
		</baidu-map>
		<!--上拉弹出框 -->
		<div class="show-content-btn" :class="{ content_list_show: contentListShow }">
			<!-- 图标 -->
			<!-- <div class="down_arrow" :class="{down_up:!contentListShow,up_top:contentListShow}" @click="_changeContListShow"></div> -->
			<div class="down_arrow" :class="{ down_up: !contentListShow, up_top: contentListShow }" @click="_changeContListShow"></div>
			<!-- 内容 -->
			<ul class="list_content">

				<li v-for="(v,i) in storeArr" :key="i">
					<div class="title-wrapper">
						<!-- <div class="title"></div> -->
						<img :src="require(`../../../assets/image/mappath/title.png`)" style="width:1.6rem;margin-right: 0.6rem;"/>
						<span>{{v.storeclass_name}}</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in v.child" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>

				<!-- 餐饮 -->
				<!-- <li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>餐饮</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_cy" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>
				<li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>批发</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_pf" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>
				<li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>零售</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_ls" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>
				<li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>生产</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_sc" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>
				<li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>药店</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_yd" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li>
				<li>
					<div class="title-wrapper">
						<div class="title"></div>
						<span>农产农资</span>
					</div>
					<div class="item">
						<div class="item_v" v-for="(v, i) in storeclass_list_nz" :key="i" @click="getStoreList(v.storeclass_id)">
							<img class="menu-item-icon icon_style" :src="require(`../../../assets/image/mappath/${v.storeclass_id}_.png`)" />
							<div>{{ v.storeclass_name }}</div>
						</div>
					</div>
				</li> -->

			</ul>
		</div>
	</div>
	<!-- </vue-drawer-layout> -->
</template>
<script>
import { BmlMarkerClusterer } from 'vue-baidu-map';
// import icon1 from '../../../assets/image/mappath/1.png';
// import icon2 from '../../../assets/image/mappath/2.png';
// import icon3 from '../../../assets/image/mappath/3.png';
// import icon4 from '../../../assets/image/mappath/4.png';
// import icon6 from '../../../assets/image/mappath/6.png';
// import icon7 from '../../../assets/image/mappath/7.png';
// import icon8 from '../../../assets/image/mappath/8.png';
// import icon9 from '../../../assets/image/mappath/9.png';
// import icon10 from '../../../assets/image/mappath/10.png';
// import icon11 from '../../../assets/image/mappath/11.png';
// import icon12 from '../../../assets/image/mappath/12.png';
// import icon13 from '../../../assets/image/mappath/13.png';
// import icon14 from '../../../assets/image/mappath/14.png';
// import icon15 from '../../../assets/image/mappath/15.png';
// import icon16 from '../../../assets/image/mappath/16.png';
// import icon17 from '../../../assets/image/mappath/17.png';
// import icon18 from '../../../assets/image/mappath/18.png';
// // import icon19 from '../../../assets/image/mappath/19.png';
// import icon20 from '../../../assets/image/mappath/20.png';
// import icon21 from '../../../assets/image/mappath/21.png';
// import icon22 from '../../../assets/image/mappath/22.png';
// import icon23 from '../../../assets/image/mappath/23.png';
// import icon24 from '../../../assets/image/mappath/24.png';
// // import icon25 from '../../../assets/image/mappath/25.png';
// import icon26 from '../../../assets/image/mappath/26.png';
// import icon27 from '../../../assets/image/mappath/27.png';
// import icon28 from '../../../assets/image/mappath/28.png';
// import icon29 from '../../../assets/image/mappath/29.png';
// import icon30 from '../../../assets/image/mappath/30.png';
// import icon31 from '../../../assets/image/mappath/31.png';
// import icon32 from '../../../assets/image/mappath/32.png';
// import icon33 from '../../../assets/image/mappath/33.png';
// import icon34 from '../../../assets/image/mappath/34.png';
// import icon35 from '../../../assets/image/mappath/35.png';
// import icon36 from '../../../assets/image/mappath/36.png';
// import icon37 from '../../../assets/image/mappath/37.png';
// import icon39 from '../../../assets/image/mappath/39.png';
// import icon40 from '../../../assets/image/mappath/40.png';
// import icon41 from '../../../assets/image/mappath/41.png';
// import icon42 from '../../../assets/image/mappath/42.png';
// import icon43 from '../../../assets/image/mappath/42.png';
import Vue from 'vue';
import $ from 'jquery';
import { mapState, mapMutations } from 'vuex';
import { getStoreListMap, getStoreNearbyList1 } from '../../../apikeep/homesearch';
import DrawerLayout from 'vue-drawer-layout';
import { getStoreClass, getNewStoreClass } from '../../../api/seller';
import { Toast, Indicator } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
Vue.use(DrawerLayout);

export default {
	data() {
		return {
			contentListShow: false,
			select: { width: '100%', height: '', marginBottom: '10px' },
			initLocation: false,
			lng0: 0,
			lng1: 0,
			lng2: 0,
			lat0: 0,
			lat1: 0,
			lat2: 0,
			old1:[0,0],   //  保存的 放大后的 坐标1
			old2:[0,0],   //  保存的 放大后的 坐标2
			zm: 17,    //  本次缩放比例
			oldzm:17,   // 上一次缩放比例
			Sid: 0,
			storeclass_list: false,
			// tb1: icon1,
			// tb2: icon2,
			// tb3: icon3,
			// tb4: icon4,
			// tb6: icon6,
			// tb7: icon7,
			// tb8: icon8,
			// tb9: icon9,
			// tb10: icon10,
			// tb11: icon11,
			// tb12: icon12,
			// tb13: icon13,
			// tb14: icon14,
			// tb15: icon15,
			// tb16: icon16,
			// tb17: icon17,
			// tb18: icon18,
			// tb20: icon20,
			// tb21: icon21,
			// tb22: icon22,
			// tb23: icon23,
			// tb24: icon24,
			// tb26: icon26,
			// tb27: icon27,
			// tb28: icon28,
			// tb29: icon29,
			// tb30: icon30,
			// tb31: icon32,
			// tb32: icon32,
			// tb33: icon33,
			// tb34: icon34,
			// tb35: icon35,
			// tb36: icon36,
			// tb37: icon37,
			// tb39: icon39,
			// tb40: icon40,
			// tb41: icon41,
			// tb42: icon42,
			// tb43: icon43,
			GPS: null,

			storeclass_list_cy: [],
			storeclass_list_pf: [],
			storeclass_list_ls: [],
			storeclass_list_sc: [],
			storeclass_list_yd: [],
			storeclass_list_nz: [],

			storeArr:[],

			zhongxinP: { lng: 115.579356, lat: 34.875037 },
			cR: [{ id: 1, content: '', bounds: { ne: { lng: 110, lat: 40 }, sw: { lng: 0, lat: 0 } } }, { id: 2, content: '' }],
			// cR:[{id: 1, content: '', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a >@好食源</a>'}],
			items: [],
			keyword: '',
			infoWindow: {
				show: false,
				lng: 115.579356,
				lat: 34.875037,
				id: 0,
				contents: ''
			},
			add: {
				show: false,
				p: { lng: 0, lat: 0 },
				siteName: '',
				site: ''
			},

			daohang: {
				sp: { lng: 116.404, lat: 39.915 },
				ep: { lng: 116.404, lat: 39.925 },
				bx: false,
				jc: false,
				mb: true,
				gj: false
			},
			storeMapLngLat: {
				show:true,
				lat: this.$route.query.lat ? this.$route.query.lat : null, //返回来的商家经纬度
				lng: this.$route.query.lng ? this.$route.query.lng : null, //返回来的商家经纬度
				storeclass_id: this.$route.query.sid ? this.$route.query.sid : null, //返回来的商家类型
				id: this.$route.query.id ? this.$route.query.id : null, //返回来的商家id
				store_id: this.$route.query.id ? this.$route.query.id : null, //返回来的商家id
				contents: this.$route.query.name ? this.$route.query.name : null,
			}
		};
	},
	components: {
		BmlMarkerClusterer
	},
	// computed: {
	// 	//items:function(){
	// 	//return [{p:{lng: 116.404, lat: 39.915},tb:icon1,name:'bbb',id:1,show:false},{p:{lng: 116.454, lat: 39.915},tb:icon1,name:'aaa',id:2,show:false}]
	// 	//}
	// },
	computed: {
		...mapState({
			member_point: state => state.member.point,
			token: state => state.member.token,
			storeMapInfo: state => state.home.storeMapInfo
		})
	},
	created: function() {
		this.getStoreclassList();
	},
	methods: {
		...mapMutations({
			memberPoint: 'memberPoint',
			savestoreMapInfo: 'savestoreMapInfo' //保存店铺地图信息
		}),
		// 点击展示类型列表
		_changeContListShow() {
			this.contentListShow = !this.contentListShow;
		},
		hh() {
			this.select.height = window.innerHeight - 50 + 'px';
		},
		infoWindowClose(e) {
			this.infoWindow.show = false;
		},
		infoWindowOpen(i) {
			var item = this.items[i];
			//alert(item.name)
			// console.log(item);
			this.infoWindow.contents = item.name;
			this.infoWindow.lng = item.lng;
			this.infoWindow.lat = item.lat;
			this.infoWindow.id = item.id;
			this.infoWindow.show = true;
			this.infoWindow.storeclass_id = item.storeclass_id;
			this.infoWindow.store_id = item.store_id;
			this.infoWindow.is_camer = item.is_camer;
			this.infoWindow.complain = item.complain;
			this.infoWindow.member_id = item.member_id;
			this.savestoreMapInfo(item);
		},
		geticon(s) {
			return eval(`this.tb${s}`);
		},
		// 复制名曾
		goidName(infoWindow){			
			var oInput = document.createElement('input');
			oInput.value = infoWindow.contents;
			document.body.appendChild(oInput);
			oInput.select();//选择对象
			document.execCommand('copy');//执行浏览器复制命令
			document.body.removeChild(oInput);
			Toast('复制成功！');
		},
		
		// 判断 是否在 地图内
		isInOldMap (new1,new2){
			var old1 = this.old1;
			var old2 = this.old2;
			// console.log(new1,new2);
			return new1[0]<=old2[0] && new1[0]>=old1[0]?(
				new1[1]<=old2[1] && new1[1]>=old1[1]?(
					new2[0]<=old2[0] && new2[0]>=old1[0]?(
						new2[1]<=old2[1] && new2[1]>=old1[1]
					):false
				):false
			):false
		},

		// 详情
		goid(infoWindow) {
			// return false;
			var id;
			if( infoWindow.store_id ){
				id = infoWindow.store_id;
			}else{
				id = this.storeMapLngLat.sid;
			}
			let params = { lng: infoWindow.lng, lat: infoWindow.lat, id: id,sid: this.Sid==100?100:infoWindow.storeclass_id };
			this.$router.push({ name: 'HomeStoreabout', query: params });
		},
		goroad(lng, lat, n, m) {
			// console.log(lat,lng);
			// console.log(lat,lng);
			// return ;
			// 如果在 APP端
			if( window.plus ){
				this.GPS = {
					PI: 3.14159265358979324,  
					x_pi: 3.14159265358979324 * 3000.0 / 180.0,    
					transformLat: function (x, y) {  
							var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));  
							ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;  
							ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;  
							ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;  
							return ret;  
					},  
					transformLon: function (x, y) {  
							var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));  
							ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;  
							ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;  
							ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;  
							return ret;  
					},
					outOfChina: function (lat, lon) {  
							if (lon < 72.004 || lon > 137.8347)  
									return true;  
							if (lat < 0.8293 || lat > 55.8271)  
									return true;  
							return false;  
					},  
					delta: function (lat, lon) {
							var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。  
							var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。  
							var dLat = this.transformLat(lon - 105.0, lat - 35.0);  
							var dLon = this.transformLon(lon - 105.0, lat - 35.0);  
							var radLat = lat / 180.0 * this.PI;  
							var magic = Math.sin(radLat);  
							magic = 1 - ee * magic * magic;  
							var sqrtMagic = Math.sqrt(magic);  
							dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);  
							dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);  
							return { 'lat': dLat, 'lon': dLon };  
					},
					
					//BD-09 to GCJ-02  
					bd_decrypt: function (bdLat, bdLon)  
					{  
							var x = bdLon - 0.0065, y = bdLat - 0.006;  
							var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);  
							var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);  
							var gcjLon = z * Math.cos(theta);  
							var gcjLat = z * Math.sin(theta);  
							return { 'lat': gcjLat, 'lon': gcjLon };  
					},  
					//GCJ-02 to WGS-84  
					gcj_decrypt: function (gcjLat, gcjLon)  
					{  
							if (this.outOfChina(gcjLat, gcjLon))  
									return { 'lat': gcjLat, 'lon': gcjLon };  
				
							var d = this.delta(gcjLat, gcjLon);  
							return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon };  
					},
				};

				/**
				 * @原算法 https://www.jianshu.com/p/57ca061f3987
				 * @根据该作者的修改成JS版的
				 * @time 2019-7-17 09:58:42
				 * @description bd09 转WGS84,精准度高
				 * */
				var CoordinateUtil = {
					x_pi: 3.14159265358979324 * 3000.0 / 180.0,
					//pai
					pi: 3.1415926535897932384626,
					//离心率
					ee: 0.00669342162296594323,
					//长半轴
					a: 6378245.0,
					//百度转国测局
					bd09togcj02: function(bd_lon, bd_lat) {
						var x = bd_lon - 0.0065;
						var y = bd_lat - 0.006;
						var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * CoordinateUtil.x_pi);
						var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * CoordinateUtil.x_pi);
						var gg_lng = z * Math.cos(theta);
						var gg_lat = z * Math.sin(theta);
						return {
							lng: gg_lng,
							lat: gg_lat
						}
					},
					//国测局转百度
					gcj02tobd09: function(lng, lat) {
							var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * CoordinateUtil.x_pi);
							var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * CoordinateUtil.x_pi);
						var bd_lng = z * Math.cos(theta) + 0.0065;
						var bd_lat = z * Math.sin(theta) + 0.006;
						return {
							lng: bd_lng,
							lat: bd_lat
						};
					},
					//国测局转84
					gcj02towgs84: function(lng, lat) {
							var dlat = CoordinateUtil.transformlat(lng - 105.0, lat - 35.0);
							var dlng = CoordinateUtil.transformlng(lng - 105.0, lat - 35.0);
						var radlat = lat / 180.0 * CoordinateUtil.pi;
						var magic = Math.sin(radlat);
						magic = 1 - CoordinateUtil.ee * magic * magic;
						var sqrtmagic = Math.sqrt(magic);
						dlat = (dlat * 180.0) / ((CoordinateUtil.a * (1 - CoordinateUtil.ee)) / (magic * sqrtmagic) * CoordinateUtil.pi);
						dlng = (dlng * 180.0) / (CoordinateUtil.a / sqrtmagic * Math.cos(radlat) * CoordinateUtil.pi);
						var mglat = lat + dlat;
						var mglng = lng + dlng;
						return {
							lng: lng * 2 - mglng,
							lat: lat * 2 - mglat
						};
					},
					//经度转换
					transformlat: function(lng, lat) {
						var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
						ret += (20.0 * Math.sin(6.0 * lng * CoordinateUtil.pi) + 20.0 * Math.sin(2.0 * lng * CoordinateUtil.pi)) * 2.0 / 3.0;
						ret += (20.0 * Math.sin(lat * CoordinateUtil.pi) + 40.0 * Math.sin(lat / 3.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
						ret += (160.0 * Math.sin(lat / 12.0 * CoordinateUtil.pi) + 320 * Math.sin(lat * CoordinateUtil.pi / 30.0)) * 2.0 / 3.0;
						return ret;
					},
					//纬度转换
					transformlng: function(lng, lat) {
						var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
						ret += (20.0 * Math.sin(6.0 * lng * CoordinateUtil.pi) + 20.0 * Math.sin(2.0 * lng * CoordinateUtil.pi)) * 2.0 / 3.0;
						ret += (20.0 * Math.sin(lng * CoordinateUtil.pi) + 40.0 * Math.sin(lng / 3.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
						ret += (150.0 * Math.sin(lng / 12.0 * CoordinateUtil.pi) + 300.0 * Math.sin(lng / 30.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
						return ret;
					},
					getWgs84xy:function(x,y){
						//先转 国测局坐标
						var doubles_gcj = CoordinateUtil.bd09togcj02(x, y); //（x 117.   y 36. ）
						//国测局坐标转wgs84
						var doubles_wgs84 = CoordinateUtil.gcj02towgs84(doubles_gcj.lng, doubles_gcj.lat);
						//返回 纠偏后 坐标
						
						return doubles_wgs84;
					}
				}
				//测试
				var res = CoordinateUtil.getWgs84xy( lng,lat);
				// console.log(res)
				// 转换标准（坑）
				var end = this.GPS.bd_decrypt((+lat),(+lng));
				end = this.GPS.gcj_decrypt(end.lat,end.lon);
				lat = end.lat;
				lng = end.lon;
				// console.log(lat,lng);
				// 获取 当前位置 
				this.utils.getLatLng().then(res=>{
					// 设置目标位置坐标点和其实位置坐标点
					var dst = new plus.maps.Point( lng, lat ); // 终点
					var src = new plus.maps.Point( res.lng, res.lat ); // 起始位置(当前)
					// 调用系统地图显示
					plus.maps.openSysMap(dst, this.infoWindow.contents, src);
				})
				// return false;
			}
			var p = { lng: lng, lat: lat };
			if (m == 1) {
				this.daohang.ep = p;
				this.daohang.sp = this.add.p;
			}
			if( this.daohang.sp.lng==0 && this.daohang.sp.lat==0 ){
				this.utils.getLatLng().then(res=>{
					this.daohang.sp = {
						lat: res.lat,
						lng: res.lng,
						of: "inner"
					}
					
					if (m == 2) {
						this.daohang.sp = p;
						this.daohang.ep = this.add.p;
					}
					this.daohang.bx = false;
					this.daohang.jc = false;
					this.daohang.gj = false;
					if (n == 1) this.daohang.bx = true;
					if (n == 2) this.daohang.jc = true;
					if (n == 3) this.daohang.gj = true;
				}).catch(err=>{
					Toast('定位失败');
				})
			}else{
				if (m == 2) {
					this.daohang.sp = p;
					this.daohang.ep = this.add.p;
				}
				this.daohang.bx = false;
				this.daohang.jc = false;
				this.daohang.gj = false;
				if (n == 1) this.daohang.bx = true;
				if (n == 2) this.daohang.jc = true;
				if (n == 3) this.daohang.gj = true;
			}
		},
		mb(n) {
			this.daohang.mb = false;
			if (n == 1) this.daohang.mb = true;
		},
		syncCenterAndZoom(e) {
			const { lng, lat } = e.target.getCenter();
			//	this.zhongxinP=e.target.getCenter()
			this.add.show = false;
			var zoom = e.target.getZoom();
			var c = e.target.getCenter();
			var bs = e.target.getBounds(); //获取可视区域
			var bssw = bs.getSouthWest(); //可视区域左下角
			var bsne = bs.getNorthEast(); //可视区域右上角
			if (this.lng1 != bssw.lng || this.lat1 != bssw.lat || this.lng2 != bsne.lng || this.lat2 != bsne.lat) {
				this.zm = zoom;
				this.lng0 = c.lng;
				this.lat0 = c.lat;
				this.lng1 = bssw.lng;
				this.lat1 = bssw.lat;
				this.lng2 = bsne.lng;
				this.lat2 = bsne.lat;
				//alert("当前地图可视范围是：" + this.lng1 + "," + this.lat1+ "到" + this.lng2 + "," + this.lat2);
				//alert(this.lng0);
				// console.log(this.zm,this.oldzm);
				// 如果 地图可视区域 未超出范围
				((this.zm ==19 && this.oldzm ==17) || (this.zm ==19 && this.oldzm ==19&& !this.isInOldMap([this.lat1,this.lng1],[this.lat2,this.lng2])) ) ||(this.zm >=17 && !this.isInOldMap([this.lat1,this.lng1],[this.lat2,this.lng2]))?(
				getStoreNearbyList1('', this.Sid, '', this.lng1, this.lat1, this.lng2, this.lat2, '', 0, this.token,this.zm).then(res => {
					// var arr = [];
					// for( var i = 0; i < res.result.store_list.length; i++ ){
					// 	i<30 ? ( arr.push( res.result.store_list[i] ) ):""
					// }
					this.items =  res.result.store_list;
					// 获取放大后的 数据
					var obj = res.result;
					this.old1 = [obj.lat1,obj.lng1];
					this.old2 =  [obj.lat2,obj.lng2];
					this.oldzm = this.zm;
					// console.log(this.items);
					// this.items = res.result.store_list;
				})):'';
			}
		},
		getPoint(e) {
			this.add.show = true;

			this.add.p = e.point;

			let geocoder = new BMap.Geocoder(); //创建地址解析器的实例

			geocoder.getLocation(e.point, rs => {
				this.add.site = rs.address;

				//地址描述(string)=

				// console.log(rs.address);
				//这里打印可以看到里面的详细地址信息，可以根据需求选择想要的

				// console.log(rs.addressComponents);
				//结构化的地址描述(object)

				// console.log(rs.addressComponents.province);
				//省

				// console.log(rs.addressComponents.city);
				//城市

				// console.log(rs.addressComponents.district);
				//区县

				// console.log(rs.addressComponents.street);
				//街道

				// console.log(rs.addressComponents.streetNumber);
				//门牌号

				// console.log(rs.surroundingPois);
				//附近的POI点(array)

				// console.log(rs.business);
				//商圈字段，代表此点所属的商圈(string)
			});

			this.memberPoint({ point: { lng: e.point.lng, lat: e.point.lat, address: '', cityCode: 10 } });
		},
		pWindowClose() {
			this.add.show = false;
		},

		pWindowOpen() {
			setInterval(() => {
				this.add.show = true;
			}, 100);
		},
		getLoctionSuccess(e) {
			this.add.show = true;

			this.add.p = e.point;

			let geocoder = new BMap.Geocoder(); //创建地址解析器的实例

			geocoder.getLocation(e.point, rs => {
				this.add.site = rs.address;
			});
		},
		handleToggleDrawer() {
			this.$refs.drawerLayout.toggle();
		},
		getStoreclassList() {
			Indicator.open();
			/*getStoreClass().then(res => {
				Indicator.close();
				var res = res.result.store_class;
				for (var item of res) {
					if (item.store_class_type == '1') {
						this.storeclass_list_cy.push(item);
					}
					if (item.store_class_type == '2') {
						this.storeclass_list_pf.push(item);
					}
					if (item.store_class_type == '3') {
						this.storeclass_list_ls.push(item);
					}
					if (item.store_class_type == '4') {
						this.storeclass_list_sc.push(item);
					}
					if (item.store_class_type == '5') {
						this.storeclass_list_yd.push(item);
					}
					if (item.store_class_type == '6') {
						this.storeclass_list_nz.push(item);
					}
				}
			})
			.catch(function(error) {
				Indicator.close();
				Toast(error.message);
			});*/

			this.utils.getSpecialIdentity().then(store_class=>{
				Indicator.close();
				this.storeArr = store_class;
				// console.log("🚀 ~ file: Mapdh.vue ~ line 760 ~ this.utils.getSpecialIdentity ~ this.storeArr", this.storeArr);
				this.storeArr.push(
					{
						store_class_type: "",
						storeclass_bail: 0,
						storeclass_dname: null,
						storeclass_id: 9,
						storeclass_name: "其他",
						storeclass_old_id: null,
						storeclass_pid: 0,
						storeclass_sort: 99,
						child:[
							// {
							// 	store_class_type: "1",
							// 	storeclass_bail: 0,
							// 	storeclass_id: 99,
							// 	storeclass_name: "社区团",
							// 	storeclass_old_id: "99",
							// 	storeclass_pid: 99,
							// 	storeclass_sort: 99,
							// },
							{
								store_class_type: "1",
								storeclass_bail: 0,
								storeclass_id: 100,
								storeclass_name: "冷链经营",
								storeclass_old_id: "100",
								storeclass_pid: 100,
								storeclass_sort: 100,
							},
						]
					}
				);
				// for( var item of store ){
				// 	item.id = item.storeclass_id;
				// 	item.name = item.storeclass_name;
				// 	delete item.storeclass_bail;
				// 	delete item.storeclass_pid;
				// 	delete item.storeclass_sort;
				// 	for( var end of item.child ){
				// 		end.id = end.storeclass_id;
				// 		end.name = end.storeclass_name;
				// 		delete item.storeclass_bail;
				// 		delete item.storeclass_pid;
				// 		delete item.storeclass_sort;
				// 	}
				// }
			}).catch(err=>{
				Indicator.close();
				Toast(err.message);
			})
		},
		goHomeStorelist(storeclassId) {
			this.$router.push({ name: 'HomeStorelist', query: { storeclass_id: storeclassId } });
		},
		/**
		 * getStoreList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		getStoreList(id) {
			this.Sid = id;
			// this.zm >=17?(
			// !this.isInOldMap([this.lat1,this.lng1],[this.lat2,this.lng2])?(
				getStoreNearbyList1('', id, '', this.lng1, this.lat1, this.lng2, this.lat2, '', 0, this.token,this.zm).then(res => {
					this.buildData(res);
				})
			// ):'';
			// ):'';
		},
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData(res) {
			if (res) {
				// var arr = [];
				// for( var i = 0; i < res.result.store_list.length; i++ ){
				// 	i<30 ? ( arr.push( res.result.store_list[i] ) ):""
				// }
				this.items =  res.result.store_list;
				//	  alert(JSON.stringify(res.result.store_list));
				// this.items = res.result.store_list;
				//  this.$refs.drawerLayout.toggle()
				this.contentListShow = !this.contentListShow;

				
				// 获取放大后的 数据
				var obj = res.result;
				this.old1 = [obj.lat1,obj.lng1];
				this.old2 =  [obj.lat2,obj.lng2];
				this.oldzm = this.zm;

				// this.infoWindow.show = false;
			}
		}
	},
	mounted() {
		resetRem();
		this.hh();
		// 如果是商家返回的
		if (this.storeMapLngLat.lat && this.storeMapLngLat.lng) {
			// console.log(this.storeMapInfo);
			this.zhongxinP = {
				lat: this.storeMapLngLat.lat,
				lng: this.storeMapLngLat.lng
			};
			this.getStoreListMap(this.storeMapLngLat.storeclass_id);

			// this.infoWindow.contents = this.storeMapInfo.name;
			// this.infoWindow.contents = this.storeMapLngLat.name;
			// this.infoWindow.lng = this.storeMapInfo.lng;
			// this.infoWindow.lat = this.storeMapInfo.lat;
			// this.infoWindow.id = this.storeMapInfo.id;
			// this.infoWindow.show = true;
			// this.infoWindow.storeclass_id = this.storeMapLngLat.sid;
			// this.infoWindow.store_id = this.storeMapLngLat.id;

			this.infoWindow = this.storeMapLngLat;
		}
	},
	beforeDestroy() {
		resumeRem();
	}
};
</script>
<style scoped lang="scss">
.content {
	position: relative;
	// height: calc(100% - 2.5rem);
	$border_radius: 1rem; /*圆角*/
	$transition_s: 0.3s; /*过度时长*/

	.map_info_btn{
		button{
			margin-right: 12px;
			margin: 4px 0;
			margin-right: 12px;
		}
	}

	div.content_list_show {
		height: 80%;
	}
	.show-content-btn {
		transition: all $transition_s;
		// position: absolute;
		position: fixed;
		// height: 1.68rem;
		height: 3.2rem;
		// bottom: 0;
		width: 100%;
		margin: 0 auto;
		border-top-left-radius: $border_radius;
		border-top-right-radius: $border_radius;
		left: 0;
		// bottom: -.7rem;
		// bottom: 2.3rem;
		bottom: 4.76rem;
		background: #fff;
		// 下拉箭头
		.down_arrow {
			width: 36px;
			height: 22px;
			margin: 0 auto;
			background-repeat: no-repeat;
			background-size: contain;
			margin-top: 10px;
		}
		// .down_arrow:after {
		// 		content: '';
		// 		display: block;
		// 		width: 1rem;
		// 		height: 1rem;
		// 		border-right: 1px solid #888;
		// 		border-top: 1px solid #888;
		// 		margin-top: .5rem;

		// }
		// 上拉箭头
		.down_up {
			background-image: url('../../../assets/image/mappath/up.png');
		}
		.up_top {
			background-image: url('../../../assets/image/mappath/down.png');
		}
		// .down_up{
		// 	-webkit-transform: rotate(-45deg); /*箭头方向可以自由切换角度*/
		// 	transform: rotate(-45deg);
		// 	transition-timing-function:ease-in;
		// 	transition-duration: $transition_s;
		// }
		// .up_top{
		// 	-webkit-transform: rotate(135deg); /*箭头方向可以自由切换角度*/
		// 	transform: rotate(135deg);
		// 	transition-timing-function:ease-in;
		// 	transition-duration: $transition_s;
		// }
		// 内容
		.list_content {
			margin-top: 0.32rem;
			padding: 0 0.4rem;
			overflow-y: auto;
			height: 100%;
			li {
				padding: 0 0 0 1rem;
				&:last-child {
					margin-bottom: 2rem;
				}
				.title-wrapper {
					display: flex;
					align-items: center;
					.title {
						width: 0.6rem;
						// display: inline-block;
						height: 0.6rem;
						border: 0.36rem solid red;
						border-radius: 50%;
						background: #fff;
						margin-right: 0.43rem;
					}
					span {
						font-weight: 600;
						font-size: 1.6rem;
					}
				}

				.item {
					display: flex;
					justify-content: end;
					flex-wrap: wrap;
					padding: 0.6rem 0;
					flex-direction: inherit;
					justify-content: flex-start;
					.item_v {
						width: 24%;
						font-size: 1.1rem;
						text-align: center;
						margin-bottom: 1.26rem;

						width: 22%;
						margin: 1.1rem 1%;
						text-align: center;
						margin-bottom: 1.26rem;
						box-sizing: border-box;

						div {
							// white-space: nowrap;
							// text-overflow: ellipsis;
							// white-space: nowrap;
							// width:100%;
							// overflow: hidden;

							width: 100%;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}
				}
			}
		}
	}
	.search-img {
		width: 1.13rem;
		height: 1.13rem;
	}
	// i.search_i {
	// 	position: absolute;
	// 	margin-top: 0.15rem;
	// 	font-size: 1.1rem;
	// }

	.search_content {
		width: 90%;
		height: 2.22rem;
		margin: 0 auto;
		top: 1rem !important;
		position: relative !important;
	}

	.icon_style {
		width: 36px;
		// height: 40px;
		margin-bottom: 4px;
	}
	.map {
		width: 100%;
		& /deep/ .BMap_noprint {
			bottom: 58px !important;
		}
	}
	.centered {
		margin: 50px auto;
		text-align: center;
	}

	.button::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	.button {
		display: inline-block;
		*display: inline;
		zoom: 1;
		padding: 6px 20px;
		margin: 0;
		cursor: pointer;
		border: 1px solid #bbb;
		overflow: visible;
		font: bold 13px arial, helvetica, sans-serif;
		text-decoration: none;
		white-space: nowrap;
		color: #555;

		background-color: #ddd;
		background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, 0)));
		background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
		background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
		background-image: -ms-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
		background-image: -o-linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
		background-image: linear-gradient(top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

		-webkit-transition: background-color 0.2s ease-out;
		-moz-transition: background-color 0.2s ease-out;
		-ms-transition: background-color 0.2s ease-out;
		-o-transition: background-color 0.2s ease-out;
		transition: background-color 0.2s ease-out;
		background-clip: padding-box; /* Fix bleeding */
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		border-radius: 3px;
		-moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
		-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);

		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.button:hover {
		background-color: #eee;
		color: #555;
	}

	.button:active {
		background: #e9e9e9;
		position: relative;
		top: 1px;
		text-shadow: none;
		-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) inset;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) inset;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) inset;
	}

	.button[disabled],
	.button[disabled]:hover,
	.button[disabled]:active {
		border-color: #eaeaea;
		background: #fafafa;
		cursor: default;
		position: static;
		color: #999;
		/* Usually, !important should be avoided but here it's really needed :) */
		-moz-box-shadow: none !important;
		-webkit-box-shadow: none !important;
		box-shadow: none !important;
		text-shadow: none !important;
	}

	/* Smaller buttons styles */

	.button.small {
		padding: 4px 12px;
	}

	/* Larger buttons styles */

	.button.large {
		padding: 12px 30px;
		text-transform: uppercase;
	}

	.button.large:active {
		top: 2px;
	}

	/* Colored buttons styles */

	.button.green,
	.button.red,
	.button.blue {
		color: #fff;
		text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);

		background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.3)), to(rgba(255, 255, 255, 0)));
		background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		background-image: -ms-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
		background-image: linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
	}

	/* */

	.button.green {
		background-color: #57a957;
		border-color: #57a957;
	}

	.button.green:hover {
		background-color: #62c462;
	}

	.button.green:active {
		background: #57a957;
	}

	/* */

	.button.red {
		background-color: #ca3535;
		border-color: #c43c35;
	}

	.button.red:hover {
		background-color: #ee5f5b;
	}

	.button.red:active {
		background: #c43c35;
	}

	/* */

	.button.blue {
		background-color: #269ce9;
		border-color: #269ce9;
	}

	.button.blue:hover {
		background-color: #70b9e8;
	}

	.button.blue:active {
		background: #269ce9;
	}

	/* */

	.green[disabled],
	.green[disabled]:hover,
	.green[disabled]:active {
		border-color: #57a957;
		background: #57a957;
		color: #d2ffd2;
	}

	.red[disabled],
	.red[disabled]:hover,
	.red[disabled]:active {
		border-color: #c43c35;
		background: #c43c35;
		color: #ffd3d3;
	}

	.blue[disabled],
	.blue[disabled]:hover,
	.blue[disabled]:active {
		border-color: #269ce9;
		background: #269ce9;
		color: #93d5ff;
	}

	/* Group buttons */

	.button-group,
	.button-group li {
		display: inline-block;
		*display: inline;
		zoom: 1;
	}

	.button-group {
		font-size: 0; /* Inline block elements gap - fix */
		margin: 0;
		padding: 0;
		background: rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 7px;
		-moz-border-radius: 7px;
		-webkit-border-radius: 7px;
		border-radius: 7px;
	}

	.button-group li {
		margin-right: -1px; /* Overlap each right button border */
	}

	.button-group .button {
		font-size: 13px; /* Set the font size, different from inherited 0 */
		-moz-border-radius: 0;
		-webkit-border-radius: 0;
		border-radius: 0;
	}

	.button-group .button:active {
		-moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
	}

	.button-group li:first-child .button {
		-moz-border-radius: 3px 0 0 3px;
		-webkit-border-radius: 3px 0 0 3px;
		border-radius: 3px 0 0 3px;
	}

	.button-group li:first-child .button:active {
		-moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
	}

	.button-group li:last-child .button {
		-moz-border-radius: 0 3px 3px 0;
		-webkit-border-radius: 0 3px 3px 0;
		border-radius: 0 3px 3px 0;
	}

	.button-group li:last-child .button:active {
		-moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
	}
	input,
	input:focus {
		outline: none;
		border: none;
	}

	.ui-form-area {
		margin-bottom: 1em;
	}

	.ui-form-control {
		display: flex;
		// padding: 0.4em 1em 0.4em;
		padding: 0.74rem 0rem 0.74rem 2.17rem;
		border-radius: 1.5em;
		background-color: #fff;
	}

	.ui-form-input {
		width: 100%;
		background-color: transparent;
		padding-left: 0.7rem;
		&::-webkit-input-placeholder {
			font-size: 1.13rem;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(183, 183, 183, 1);
		}
	}

	.ui-form-input,
	.ui-form-input:focus {
		outline: none;
		border: none;
		color: #2c333a;
		// font-size: 0.9em;
		font-size: 1.13rem;
	}

	input::-webkit-input-placeholder {
		color: #7a7a7a;
	}

	input:-moz-placeholder {
		color: #7a7a7a;
	}

	input::-moz-placeholder {
		color: #7a7a7a;
	}

	input:-ms-input-placeholder {
		color: #7a7a7a;
	}
	.class-list {
		overflow-y: auto;
	}
	.class-list li {
		box-sizing: border-box;
		text-align: left;
		padding: 0.4rem;
		width: 100%;
		font-size: 0.7rem;
		float: left;
		background: #fff;
		line-height: 1.5rem;
		border-bottom: 1px solid #dedbdb;
		border-right: 1px solid #dedbdb;
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
	.bg-11 {
		color: #800;
	}
	.bg-12 {
		color: #880;
	}
	.bg-13 {
		color: #080;
	}
	.bg-14 {
		color: #088;
	}
	.bg-15 {
		color: #008;
	}
}
</style>
