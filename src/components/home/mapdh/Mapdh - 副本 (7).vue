<template>
<vue-drawer-layout
    ref="drawerLayout"
 :reverse="true"
 :content-drawable="true"
:drawer-width="200">
   	 <div class="drawer class-list" :style="{height:select.height}" slot="drawer">

    	    		<ul>
    	        		<li v-for="item in storeclass_list" v-bind:key="item.storeclass_id" @click="getStoreList(item.storeclass_id)">
				<img class="menu-item-icon" :src="geticon(item.storeclass_id)" />
    	           		 {{item.storeclass_name}}
    	       		 </li>
    	    		</ul>

	</div>
<div class="content" slot="content">
  <baidu-map 
	class="map" 
	:center="zhongxinP" 
	:zoom="zm" 
	:scroll-wheel-zoom="true" 
	:style="select"
        	@moveend="syncCenterAndZoom"
        	@zoomend="syncCenterAndZoom"
	> 
    <bm-control>
      <div class="ui-form-area">
      <div class="ui-form-control">
      <input v-model="keyword" type="text" placeholder="输入地名" class="ui-form-input  "></div>
      </div>
	<button class="button small" @click="handleToggleDrawer">M</button>
    </bm-control>
 	<bm-local-search :keyword="keyword" :auto-viewport="true" /> 
	<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getPoint"></bm-geolocation>
  
    	<bm-copyright    anchor="BMAP_ANCHOR_TOP_RIGHT"   :copyright="cR">   </bm-copyright>
	
    		<bm-marker v-for='(item,index) in items '  :position="{lng:item.lng,lat:item.lat}"  :title="item.name" @click="infoWindowOpen(item.name,item.id,item.lng,item.lat)"  :icon="{url:geticon(item.id), size: {width: 32, height: 32}}">
    		</bm-marker>
	
   	 <bm-info-window :position="{lng:infoWindow.lng,lat:infoWindow.lat}"  :show="infoWindow.show" @close="infoWindowClose" >
		<p>{{infoWindow.contents}}</p>
      		<p><button class="button  small"  @click="goid(infoWindow.id)"> <span class="iconfont bg-14">&#xe703;</span>详情 </button>
		<button class="button small" @click="goroad(infoWindow.lng,infoWindow.lat,1,1)"><span class="iconfont bg-11">&#xe60b;</span> 步行 </button>
		</p>
		<p><button class="button small" @click="goroad(infoWindow.lng,infoWindow.lat,2,1)"><span class="iconfont bg-12 icon-31daishouhuo"></span> 架行 </button>
		<button class="button small" @click="goroad(infoWindow.lng,infoWindow.lat,3,1)"> <span class="iconfont icon-31daishouhuo bg-13"></span>公交 </button>
		</p>

	</bm-info-window>

  	<bm-marker :position="add.p" >
    
		<bm-info-window :show="add.show" @close="pWindowClose"  style="font-size: 14px">
      
		<p>名称：{{ add.siteName }}</p>
      
		<p>地址：{{ add.site }}</p>
    
  		</bm-info-window>
	</bm-marker>
		<bm-walking v-if="daohang.bx" :start="daohang.sp" :end="daohang.ep" :auto-viewport="true" :panel="daohang.mb"></bm-walking>
		<bm-driving v-if="daohang.jc"  :start="daohang.sp"   :end="daohang.ep"   :auto-viewport="true" :panel="daohang.mb"></bm-driving>
		<bm-transit v-if="daohang.gj" :start="daohang.sp" :end="daohang.ep" :auto-viewport="true"  :panel="daohang.mb"></bm-transit>
    </baidu-map>
</div>
  </vue-drawer-layout>
</template>
<script>
import {BmlMarkerClusterer} from 'vue-baidu-map'
import icon1 from '../../../assets/image/map/1.png';
import icon2 from '../../../assets/image/map/2.png';
import icon3 from '../../../assets/image/map/3.png';
import icon4 from '../../../assets/image/map/4.png';
import icon5 from '../../../assets/image/map/5.png';
import icon6 from '../../../assets/image/map/6.png';
import icon7 from '../../../assets/image/map/7.png';
import icon8 from '../../../assets/image/map/8.png';
import icon9 from '../../../assets/image/map/9.png';
import icon10 from '../../../assets/image/map/10.png';
import icon11 from '../../../assets/image/map/11.png';
import icon12 from '../../../assets/image/map/12.png';
import icon13 from '../../../assets/image/map/13.png';
import icon14 from '../../../assets/image/map/14.png';
import icon15 from '../../../assets/image/map/15.png';
import icon16 from '../../../assets/image/map/16.png';
import icon17 from '../../../assets/image/map/17.png';
import icon18 from '../../../assets/image/map/18.png';
import icon19 from '../../../assets/image/map/19.png';
import icon20 from '../../../assets/image/map/20.png';
import icon21 from '../../../assets/image/map/21.png';
import Vue from 'vue'
import { mapState,mapMutations } from 'vuex'
import { getStoreList,getStoreNearbyList1 } from '../../../api/homesearch'
import DrawerLayout from 'vue-drawer-layout'
import { getStoreClass } from '../../../api/seller'
import { Toast, Indicator } from 'mint-ui'
Vue.use(DrawerLayout)

 export default {
	data () {
  		return {
    			select:{width:'100%', height:'',marginBottom: '10px'},
       			 initLocation: false,
			lng0:0,lng1:0,lng2:0,lat0:0,lat1:0,lat2:0,zm:15,Sid:0,
				 storeclass_list: false,
				 tb1:icon1,
				tb2:icon2,
				 tb3:icon3,
				tb4:icon4,
				 tb5:icon5,
				tb6:icon6,
				 tb7:icon7,
				tb8:icon8,
				 tb9:icon9,
				tb10:icon10,
				 tb11:icon11,
				tb12:icon12,
				 tb13:icon13,
				tb14:icon14,
				 tb15:icon15,
				tb16:icon16,
				 tb17:icon17,
				tb18:icon18,
				 tb19:icon19,
				 tb20:icon20,
				 zhongxinP:{lng: 115.579356, lat: 34.875037},
			cR:[{id: 1, content: '', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a >@好食源</a>'}],
			items:[],
			keyword:'',
			infoWindow: {
        		show: false,
				lng: 115.579356, 
				lat: 34.875037,
				id:0,
        		contents: ''
      				},
			add: {
        				show: false,
				p:{lng: 0, lat: 0},
           				siteName:'',
        				site: ''
      				},
			

			
 			
			daohang:{
				sp:{lng: 116.404, lat: 39.915},
				ep:{lng: 116.404, lat: 39.925},
				bx:false,
				jc:false,
				mb:true,
				gj:false
			}
   		 }
	},
  components: {
    BmlMarkerClusterer
  },
computed: {
//items:function(){
//return [{p:{lng: 116.404, lat: 39.915},tb:icon1,name:'bbb',id:1,show:false},{p:{lng: 116.454, lat: 39.915},tb:icon1,name:'aaa',id:2,show:false}]
//}
},
  computed: {
    ...mapState({
      member_point: state => state.member.point,
      token: state => state.member.token,
    })
  },
  created: function () {
    this.getStoreclassList()
  },
methods: {  
    ...mapMutations({
      memberPoint: 'memberPoint'
    }),
  		hh(){this.select.height=(window.innerHeight)-50+'px'},
   		infoWindowClose (e) {  this.infoWindow.show = false },
		infoWindowOpen(name,id,lng,lat){
			this.infoWindow.contents=name
			this.infoWindow.lng=lng
			this.infoWindow.lat=lat
			this.infoWindow.id=id
			this.infoWindow.show = true
		},
		geticon(s){
			if (s==1) return this.tb1
			if (s==2) return this.tb2
			if (s==3) return this.tb3
			if (s==4) return this.tb4
			if (s==5) return this.tb5
			if (s==6) return this.tb6
			if (s==7) return this.tb7
			if (s==8) return this.tb8
			if (s==9) return this.tb9
			if (s==10) return this.tb10
			if (s==11) return this.tb11
			if (s==12) return this.tb12
			if (s==13) return this.tb13
			if (s==14) return this.tb14
			if (s==15) return this.tb15
			if (s==16) return this.tb16
			if (s==17) return this.tb17
			if (s==18) return this.tb18
			if (s==19) return this.tb19
			if (s==20) return this.tb20
		},
    		goid (id) {
      			let params = { 'id': id }
      			this.$router.push({ 'name': 'HomeStoreabout', 'query': params })
		},
    		goroad (lng,lat,n,m) {
			var p={lng:lng,lat:lat}
			if(m==1){
      			this.daohang.ep=p
			this.daohang.sp=this.add.p
			}
			if(m==2){
      			this.daohang.sp=p
			this.daohang.ep=this.add.p
			}
			this.daohang.bx = false
			this.daohang.jc = false
			this.daohang.gj =false
			if(n==1) this.daohang.bx = true
			if(n==2) this.daohang.jc = true
			if(n==3) this.daohang.gj = true
		},
		mb(n){
			this.daohang.mb =false
			if(n==1)this.daohang.mb =true
		},
    		 syncCenterAndZoom (e) {
      			const {lng, lat} = e.target.getCenter()
			//	this.zhongxinP=e.target.getCenter()
			this.add.show=false
      			var zoom= e.target.getZoom()
			var c=e.target.getCenter();
			var bs = e.target.getBounds();   //获取可视区域
			var bssw = bs.getSouthWest();   //可视区域左下角
			var bsne = bs.getNorthEast();   //可视区域右上角
			if(this.lng1!=bssw.lng||this.lat1!=bssw.lat||this.lng2!=bsne.lng||this.lat2!=bsne.lat){
				this.zm=zoom;
				this.lng0=c.lng;
				this.lat0=c.lat;
				this.lng1=bssw.lng;
				this.lat1=bssw.lat;
				this.lng2=bsne.lng;
				this.lat2=bsne.lat;
				//alert("当前地图可视范围是：" + this.lng1 + "," + this.lat1+ "到" + this.lng2 + "," + this.lat2);
				//alert(this.lng0);
		 		 getStoreNearbyList1( '',this.Sid,'', this.lng1, this.lat1,this.lng2, this.lat2,'',0,this.token).then(res => {
					this.items=[];
					console.log(this.items);
		    			 this.items = res.result.store_list;
					console.log(this.items);
		  		})
			}

    		},
  		getPoint(e){  


	
    			this.add.show = true;
    
			this.add.p = e.point;
			
			let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
    
			geocoder.getLocation(e.point,rs=>{
     
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
  
			 this.memberPoint({ point: { lng: e.point.lng, lat: e.point.lat, address:'', cityCode: 10 } })
		},
		pWindowClose () {
    this.add.show = false
  },
  
		pWindowOpen () {
     setInterval(()=>{
     this.add.show = true
   },100)
  },
  		getLoctionSuccess(e){  

    			this.add.show = true;
    
			this.add.p = e.point;    
    
			let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
    
			geocoder.getLocation(e.point,rs=>{
     
 			this.add.site = rs.address;
      
			});
  
		},
		handleToggleDrawer() {  this.$refs.drawerLayout.toggle(); },
		getStoreclassList () {
		  Indicator.open()
		    getStoreClass().then(res => {
		    Indicator.close()
		    this.storeclass_list = res.result.store_class
console.log( this.storeclass_list)
		  }).catch(function (error) {
		    Indicator.close()
		    Toast(error.message)
		  })
		},
		goHomeStorelist (storeclassId) {
		  this.$router.push({ name: 'HomeStorelist', query: { storeclass_id: storeclassId } })
		},
		/**
		 * getStoreList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		getStoreList (id) {
		 this.Sid=id
		  getStoreNearbyList1(
		    '',
		    id,
		    '',
		   this.lng1,
		    this.lat1,
		    this.lng2,
		    this.lat2,
		    '',
		    0,
		    this.token
		  ).then(res => {
		    this.buildData(res)
		  })
		},
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData (res) {
		  if (res) {
		//	  alert(JSON.stringify(res.result.store_list));
		      this.items = res.result.store_list
		       this.$refs.drawerLayout.toggle()
		  }
		},

   	 },
	mounted(){
  		this.hh();
	}
}
</script>
<style>
.map {
  width: 100%;
}
.centered {
  margin:50px auto;
  text-align:center;
}

.button::-moz-focus-inner{
  border: 0;
  padding: 0;
}

.button{
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
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  
  -webkit-transition: background-color .2s ease-out;
  -moz-transition: background-color .2s ease-out;
  -ms-transition: background-color .2s ease-out;
  -o-transition: background-color .2s ease-out;
  transition: background-color .2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button:hover{
  background-color: #eee;
  color: #555;
}

.button:active{
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}

.button[disabled], .button[disabled]:hover, .button[disabled]:active{
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

.button.small{
  padding: 4px 12px;
}

/* Larger buttons styles */

.button.large{
  padding: 12px 30px;
  text-transform: uppercase;
}

.button.large:active{
  top: 2px;
}

/* Colored buttons styles */

.button.green, .button.red, .button.blue {
  color: #fff;
  text-shadow: 0 1px 0 rgba(0,0,0,.2);
  
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
}

/* */

.button.green{
  background-color: #57a957;
  border-color: #57a957;
}

.button.green:hover{
  background-color: #62c462;
}

.button.green:active{
  background: #57a957;
}

/* */

.button.red{
  background-color: #ca3535;
  border-color: #c43c35;
}

.button.red:hover{
  background-color: #ee5f5b;
}

.button.red:active{
  background: #c43c35;
}

/* */

.button.blue{
  background-color: #269CE9;
  border-color: #269CE9;
}

.button.blue:hover{
  background-color: #70B9E8;
}

.button.blue:active{
  background: #269CE9;
}

/* */

.green[disabled], .green[disabled]:hover, .green[disabled]:active{
  border-color: #57A957;
  background: #57A957;
  color: #D2FFD2;
}

.red[disabled], .red[disabled]:hover, .red[disabled]:active{
  border-color: #C43C35;
  background: #C43C35;
  color: #FFD3D3;
}

.blue[disabled], .blue[disabled]:hover, .blue[disabled]:active{
  border-color: #269CE9;
  background: #269CE9;
  color: #93D5FF;
}

/* Group buttons */

.button-group,
.button-group li{
  display: inline-block;
  *display: inline;
  zoom: 1;
}

.button-group{
  font-size: 0; /* Inline block elements gap - fix */
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 7px;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  border-radius: 7px;
}

.button-group li{
  margin-right: -1px; /* Overlap each right button border */
}

.button-group .button{
  font-size: 13px; /* Set the font size, different from inherited 0 */
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}

.button-group .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}

.button-group li:first-child .button{
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}

.button-group li:first-child .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}

.button-group li:last-child .button{
  -moz-border-radius: 0 3px 3px 0;
  -webkit-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
}

.button-group li:last-child .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}
input,
input:focus{outline: none; border: none;}

.ui-form-area{margin-bottom: 1em;}

.ui-form-control{padding: 0.6em 1em 0.65em; border-radius: 1.5em; background-color: #eee;}

.ui-form-input{width: 100%; background-color: transparent;}

.ui-form-input,
.ui-form-input:focus{outline: none; border: none; color: #2c333a; font-size: 0.9em;}

input::-webkit-input-placeholder{color: #7a7a7a;}

input:-moz-placeholder{color: #7a7a7a;}

input::-moz-placeholder{color: #7a7a7a;}

input:-ms-input-placeholder{color: #7a7a7a;}
.class-list{
overflow-y:auto;
}
.class-list li{box-sizing: border-box;
    text-align: left;
    padding:.4rem;
    width: 100%;
    font-size:0.7rem;
    float: left;
    background:#fff;
    line-height:1.5rem;
    border-bottom: 1px solid #dedbdb;
    border-right: 1px solid #dedbdb;}
  .bg-1{background-image: linear-gradient(to bottom , #d69dcc,#e8198b );}
  .bg-2{background-image: linear-gradient(to bottom , #04befe,#4481eb );}
  .bg-3{background-image: linear-gradient(to bottom , #cc208e,#6713d2 );}
  .bg-4{background-image: linear-gradient(to bottom , #ff9a44,#fc6076 );}
  .bg-5{background-image: linear-gradient(to bottom , #00ecbc,#007adf );}
  .bg-6{background-image: linear-gradient(to bottom , #ff8177,#b12a5b );}
.bg-11{color:#800}
.bg-12{color:#880}
.bg-13{color:#080}
.bg-14{color:#088}
.bg-15{color:#008}
</style>