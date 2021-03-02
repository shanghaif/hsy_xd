<template>
  <div class="new_brand">
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<!-- <img class="header-left" @click="$router.push({ name: 'HomeIndex' })" src="@/assets/image/brand/h5_back.png" alt="" /> -->
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">食安品牌建设</span>
				<img class="header-right" @click="fun_jumpSearch" src="@/assets/image/brand/h5_search.png" alt="" />
				<!-- <span></span> -->
				<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
			</div>
		</div>
    <!-- 上面搜索条件 -->
    <div class="search">
      <!-- 文本搜索条件 -->
      <div class="s_text">
        <ul>
          <li
            v-for="(v,i) in list"
            :key="(i)"
            :class="{brand_active: params.sabrand_id == v.id}" @click="fun_changeSabrand_id(v.id)" >
            {{v.name}}
            <p class="line"></p>
          </li>
          <!-- <li
            :class="{brand_active: params.unit_type == 0}" @click="fun_changeUnitType(0)" >
            食安山东
            <p class="line"></p>
          </li>
          <li
            :class="{brand_active: params.unit_type == 1}" @click="fun_changeUnitType(1)" >
            食安曹县
            <p class="line"></p>
          </li> -->
          <!-- <li v-for="(v,i) in unitTypeArr" :key="i" 
            @click="fun_changeUnitType(i)" 
            class="line"
            :class="{brand_active:i == params.unit_type}" >
            {{v}}
            <p class="line"></p>
          </li> -->
        </ul>
      </div>
      <!-- 角标搜索条件 -->
      <div class="category-flex">
				<div class="category-sidebar" :class="isClose?'closeLeft':''">
					<ul ref="categorySidebar">
						<li
              ref="categorySidebarAll"
              @click="fun_changeUnitType(0)"
							:class="{ sidbaractive: 0 == params.unit_type, noActive: 0 != params.unit_type }"
						>
							<a>全部</a>
						</li>
						<li
							class="item"
              v-for="(v,i) in unitTypeArr" :key="i" 
              @click="fun_changeUnitType(i)"
							:class="{ sidbaractive: i == params.unit_type, noActive: i != params.unit_type }"
						>
							<a>{{ v }}</a>
							<!-- <a>四个文字</a> -->
						</li>
					</ul>
				</div>

        <div :style="positBtn" class="position-btn" :class="isClose ? 'close' : 'show'" @click="isClose = !isClose">
          <div class="btn-item san1"><img src="@/assets/image/icon2/icon-left-hui.png" alt="" /></div>
        </div>
        <div class="category-content">
          <!-- 角标 -->
          <!-- <div class="s_btn" :class="{padd:isClose}"> -->
          <div class="s_btn" :class="{s_btn_pad:isClose}">
            <!-- 左侧 -->
            <ul class="s_btn_l">
              <li @click="fun_getBrandList('sort_points')">
                <!-- 按评分 -->
                <p>按评分</p>
                <div>
                  <span class="i_top" :class="{s_act_top:params.sort_points == 2}" ></span>
                  <span :class="{s_act_bottom:params.sort_points == 1}" ></span>
                </div>
              </li>
              <li @click="fun_getBrandList('sort_follow')">
                <!--  -->
                <p>按热度</p>
                <div>
                  <span class="i_top" :class="{s_act_top:params.sort_follow == 2}" ></span>
                  <span :class="{s_act_bottom:params.sort_follow == 1}" ></span>
                </div>
              </li>
              <li @click="fun_getBrandList('sort_distance')">
                <!--  -->
                <!-- <p>按距离</p> -->
                <p>按距离</p>
                <div>
                  <span class="i_top" :class="{s_act_top:params.sort_distance == 2}" ></span>
                  <span :class="{s_act_bottom:params.sort_distance == 1}" ></span>
                </div>
              </li>
            </ul>
            <!-- 右侧 -->
            <div class="s_btn_r" @click="onRegion">
              <span>所在街道</span>
              <!-- <span class="s_r_drop"></span> -->
              <img class="s_r_drop" :src="require('../../../assets/image/brand/h5_drop_down.png')" alt="">
            </div>            
          </div>
          <!-- 内容展示 -->
          
          <div class="brand_cont" :class="{clase_small : !isClose}">
            
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
              <!-- 单个信息 -->
              <div class="b_c_item"
                v-for="(item,index) in brandList"
                :key="index"
                @click="fun_goInfo(item.store_id)"
                >
                <!-- 左侧图片 -->
                <img v-lazy="item.unit_pic" alt="">
                <!-- <img src="https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=1292968654,1464657959&fm=85&app=92&f=PNG?w=121&h=75&s=12B178845F7C9FEF064E66860300E08E" alt=""> -->
                <!-- 右侧信息 -->
                <div class="item_data">
                  <p class="i_name brand_active">{{item.unitname}}</p>
                  <div :class="{name_t:isClose}">
                    <!--  -->
                    <div class="b_flex">
                      <span class="s_tit">{{item.unit_main?item.unit_main:"未知"}}</span>
                      <span class="s_km">{{item.distance}}km</span>
                    </div>
                    <!--  -->
                    <div class="i_div i_div_samll">
                      评分：<span>{{item.unit_points?item.unit_points.split('.')[0]:'90'}}分</span>&nbsp;|
                      量化等级：<span>{{item.unit_grade}}</span>
                    </div>
                    <!--  -->
                    <div class="i_div">
                      <span>{{item.unit_follow|filters_follow}}</span>粉丝数&nbsp;|
                      <span>{{item.unit_praise?item.unit_praise:90}}%</span>好评率
                    </div>                   
                    
                  </div>

                </div>
              </div>      
            </div>
          </div>    

          <empty-record v-if="brandList && !brandList.length"></empty-record>

          
        </div>
        
      </div>
    </div>
    <!--搜索结束 -->
    <!-- 内容展示 -->   
		<region-picker :valm="valm" ref="picker" v-on:onConfirm="onPickerConfirm"></region-picker>
  </div>
</template>


<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';
import { getBrandList } from '../../../api/homebrand.js';
import RegionPicker from '../../../components/RegionPicker2'

import EmptyRecord from '../../../components/EmptyRecord'
import { getLatLng } from '../../../util/common'  // 获取当前 经纬度

import { getUnitType } from '../../../api/homebrand.js';

export default {
  components: {
    EmptyRecord,
    RegionPicker
  },
  data(){
    return{
			list:[
				{ name:"食安山东", id:1 },
				{ name:"食安曹县", id:2 },
			],
      isClose: false,   // 左侧角标
      
      previous:null,
      brandList: [],  // 品牌列表

      loading: false, // 是否加载更多
      isMore: true, // 是否有更多      
      
      params: { 
        region_id: null,
        page : 0,     // 起始页数
        per_page : 10, // 一次查询条数

        sabrand_id : null,// 食安品牌id，1是食安山东 必穿
        lat1 : null,             // 经度 必穿
        lng1 : null,             // 纬度 必穿
        unit_type : 0,   //（可选、搜索项）：食安企业类型id

        sort_distance : 0,  // 距离排序
        sort_points : 0,    // 评分排序
        sort_follow : 0,    // 热度排序
      },

      valm:null,
      positBtn:null,
    }
  },
	computed: {
		...mapState({
			brandName: state => state.homebrand.brandName,
			brandId: state => state.homebrand.brandId,
			lat: state => state.homebrand.lat,
      lng: state => state.homebrand.lng,
      unitTypeArr : state => state.homebrand.unittypearr,

      brandParams : state => state.homebrand.brandParams,  // 搜索条件
		})
  },
  filters: {
    filters_follow: function (value) {
      if( value >1000 ){
        if( value>10000 ){
          if( value >1000000){
            return (value/1000000).toFixed(1) +'百万';
          }else return (value/10000).toFixed(1) +'万';
        }else{
          return (value/1000).toFixed(1) +'千';
        }
      }else if(value){
        return value
      }else{
        return 'xx '
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
      if( from.name == "HomeBrandItem" || from.name == "HomeBrandSearch" ){
        vm.params = vm.brandParams;
        vm.params.page = 0;
      } 
    })
  },
  created(){
     // 获取 当前经纬度 赋值
    this.utils.getLatLng().then(obj=>{
      this.savelatlng(obj);
    })
    Indicator.close();
    
    this.savebrand( { id: 1, name:'食安品牌建设' } );
    // 获取 七个分类
    getUnitType().then(res=>{
      this.saveUnitTypeArr(res.result);
      // this.$router.push({ 'name': 'HomeBrand'});
    }).catch(err=>{
      Toast(err.message);
    })
      
    // 获取 当前经纬度 赋值
    // this.utils.getLatLng().then(obj=>{
    //   this.params.lat1 = obj.lat;
    //   this.params.lng1 = obj.lng;
    //   this.savelatlng(obj);
    // })
    this.params.lat1 = this.lat;
    this.params.lng1 = this.lng;

    this.params.sabrand_id = this.list[0].id;
    this.previous = new Date().getTime();
  },

  mounted(){
    resetRem();
    
    var _self = this;
    this.$nextTick(function () {
      setTimeout(()=>{
        var width = _self.$refs.categorySidebar.clientWidth ;
        var height = _self.$refs.categorySidebar.offsetHeight ;
        // console.log(height);
        if( height<300 ){
          height= 346;
        }
        // console.log(height);
        var allHeight = _self.$refs.categorySidebarAll.offsetHeight 
        _self.positBtn = `left:${width}px;top:${(height-allHeight)/2}px`;
      },10)
    })
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
    ...mapMutations({
      saveStoreId: 'saveStoreId',
      saveParams: "saveParams",

      savebrand: 'savebrand',
      savelatlng: 'savelatlng',
      saveUnitTypeArr: 'saveunittypearr',
    }),

    // 切换 食安 品牌
    fun_changeSabrand_id(id){
      if( id == this.params.sabrand_id ){
        return
      }
      let now = new Date().getTime();
      if ( this.previous + 280 <= now ) {
        this.savebrand( { id: id, name:'食安品牌建设' } );
        // console.log(id);
        this.params.sabrand_id = id;
        this.fun_loading();
        this.previous = now;
      }
    },

    // 跳转到 搜索
    fun_jumpSearch(){
      this.saveParams(this.params);
      // console.log(123);
      this.$router.push({name:'HomeBrandSearch'})
    },

    // 查看品牌详情
    fun_goInfo(id){
      this.saveParams(this.params);
      this.saveStoreId(id);
      this.$router.push({name:'HomeBrandItem',query:{sid:id}})
    },

    // 显示 选择的街道
    onRegion (picker, values) {
      this.$refs.picker.currentValue = true
    },
    // 接收 街道值
    onPickerConfirm (values) {
      // var AreaInfo = this.getRegionStr(values)
      // console.log(values,AreaInfo);
      this.params.region_id = values[2].area_id;
      this.fun_loading();
    },
    // 接收街道名称
    getRegionStr (values) {
      let title = ''
      for (let i = 0; i < values.length; i++) {
        const element = values[i]
        if (i !== 0) {
          title = title + ' ' + element.area_name
        } else {
          title = title + element.area_name
        }
      }
      return title
    },

    // 加载数据
    loadMore () {
      if( !this.params.lat1 ){
        this.utils.getLatLng().then(p=>{
          this.params.lat1 = p.lat;
          this.params.lng1 = p.lng;
          // console.log(this.params);

          
          this.loading = true;
          this.params.page = ++this.params.page;
          if (this.isMore) {
            this.loading = false;
            this.getOrderList(true)
          }
        })
      }else{
        this.loading = true;
        this.params.page = ++this.params.page;
        if (this.isMore) {
          this.loading = false;
          this.getOrderList(true)
        }
      }
    },

    // 获取数据
    getOrderList (ispush) {
      Indicator.open();
      let params = this.params;
      // console.log(params);
      getBrandList(params).then(res=>{
        Indicator.close();
        if (ispush && this.brandList) {
          this.brandList = this.brandList.concat(res.result.sabrand_list)
        } else {
          this.brandList = res.result.sabrand_list
        }
        // for(var i =0;i<4;i++){
        //   this.brandList = this.brandList.concat(this.brandList)
        // }
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }

        this.valm = res.result.saregionid;
        // console.log(this.valm);
      }).catch(err=>{
        Indicator.close();
        Toast(err.message);
      })
    },
    
    // 点击切换后 从新获取 数据
    fun_loading(){      
      // let now = new Date().getTime();
      // if ( this.previous + 680 <= now ) {
        this.brandList = [];
        this.params.page = 0;
        this.isMore = true;
        // console.log(this.params);
        this.loadMore();
        // this.previous = now;
      // }
    },

    // 点击顶部类型
    fun_changeUnitType(i){
      let now = new Date().getTime();
      if ( this.previous + 280 <= now ) {
        var i= parseInt(i);
        this.params.unit_type = i;
        this.fun_loading();
        this.previous = now;
      }
    },

    // 点击切换 距离 评分 热度 
    fun_getBrandList(str){
      let now = new Date().getTime();
      if ( this.previous + 280 <= now ) {
        if( str == 'sort_distance' ){
          this.params.sort_points = 0;
          this.params.sort_follow = 0;
          // 如果 是按照距离排序
          this.params.sort_distance == 2 ? this.params.sort_distance = 1 : this.params.sort_distance=2;
        }else if( str == 'sort_points' ){
          this.params.sort_distance = 0;
          this.params.sort_follow = 0;
          // 如果 是按照评分排序
          this.params.sort_points == 2 ? this.params.sort_points = 1 : this.params.sort_points=2;
        }else{
          this.params.sort_points = 0;
          this.params.sort_distance = 0;
          // 如果 是按照热度排序
          this.params.sort_follow == 2 ? this.params.sort_follow = 1 : this.params.sort_follow=2;
        }
        this.fun_loading();
        this.previous = now;
      }
    },
  },

}
</script>

<style scoped lang='scss'>
@keyframes myfirst{
  0% { left:0 }
  50% {left: -0.6rem }
  100% {left: 0 }
}
.position-btn {

  // animation: myfirst  2s infinite;

	position: absolute;
	// top: 45%;

  // position: fixed;
  // top: 39.5%;

	z-index: 2;
	width: 1.4rem;
	overflow: hidden;
	transform: translate(0, -50%);
	.btn-item {
		width: 0;
		height: 0;
		// margin-right:50px;
		// float:left;
		img {
			position: absolute;
			top: 50%;
			left: 0;
			// transform: translate(0, -50%);
			width: 0.8rem;
			height: 1.5rem;
		}
	}
	.san1 {
		border-top: 3.4rem solid transparent;
		border-bottom: 3.4rem solid transparent;
		border-left: 1.5rem solid rgba(246, 246, 246, 1);
	}
}
.position-btn.show {
  animation: 0;
	// left: 6.8rem;
	img {
		transform: translate(0, -50%) rotate(0);
	}
}
.position-btn.close {
	left: 0 !important;
	img {
		transform: translate(0, -50%) rotate(180deg);
	}
}
.closeLeft {
	display: none;
}
.padd{
  padding: 0 4vw !important;
}
.clase_small{
  padding:0 !important;
  padding-left: 4vw !important;
  padding-right: 1vw !important;

  img{
    width: 22vw !important;
    height: 22vw !important;
  }
  .item_data{
    width: 50vw !important;
    height: 22vw !important;
    font-size: 2.98vw !important;
    position: relative;

    .i_div{
      &:last-child{
        position: absolute;
        bottom: 0;
      }
    }
    .b_flex{
      position: absolute;
      width: 94%;
      bottom: 11vw;
    }

    .i_div_samll{
      position: absolute;
      bottom: 5.5vw;
    }
  }

  .i_name{
    font-size: 4.8vw !important;
  }
  .s_tit{
    max-width: 56% !important;
  }
  .s_km{
    max-width: 42% !important;
  }
}

	.category-flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		width: 100%;
		position: relative;
		bottom: 0;
		width: 100%;
		// top: 2.5rem;
		// top: 4.82rem;

    
		.category-sidebar {
			flex-basis: 8.78rem;
			background-color: RGBA(246, 246, 246, 1);
			overflow-y: scroll;
			ul {
				padding-bottom: 5rem;
				// border-right: 0.5px solid #e8eaed;
				li {
					display: block;
					position: relative;
					padding: 1.2rem 0;
          text-align: center;
					a {
						font-size: 1.13rem;
						// font-weight: 400;
						color: rgba(111, 111, 111, 1);
						// display: -webkit-box;
						// -webkit-box-orient: vertical;
						// -webkit-line-clamp: 1;
						// overflow: hidden;
						font-size: 1.13rem;
						text-align: center;
					}
				}
				li.noActive {
					background-color: RGBA(246, 246, 246, 1);
					// &::after {
					// 	content: '';
					// 	left: 0;
					// 	top: 0;
					// 	position: absolute;
					// 	height: 1.3rem;
					// 	width: 0.3rem;
					// 	// border-left: 0.1rem solid transparent;
					// }
					a {
						// color: #333;
						color: rgba(111, 111, 111, 1);
					}
				}
				li.sidbaractive {
					background-color: #ffffff;
					// &::after {
					// 	content: '';
					// 	border-radius: 0.17rem;
					// 	position: absolute;
					// 	top: 50%;
					// 	left: 0;
					// 	transform: translate(0, -50%);
					// 	height: 1.3rem;
					// 	width: 0.3rem;
					// 	background-color: #e93b3d;
					// }
					a {
						// color: $primaryColor;
						font-size: 1.3rem;
						font-family: PingFangSC-Regular, PingFang SC;
						// font-weight: 600;
						color: rgba(22, 22, 22, 1);
						line-height: 1.83rem;
						-webkit-text-stroke: 0px rgba(151, 151, 151, 1);
						text-stroke: 0px rgba(151, 151, 151, 1);
					}
				}
			}
		}
    
		.category-content {
			width: 100%;
			background-color: #fff;
			overflow: auto;
			// margin-bottom: 3rem;
    }
  }



.new_brand{
  // 大号字体
  @mixin fs_big{
    font-size: 1.8rem;
  }
  // 中号字体
  @mixin fs{
    font-size: 1.55rem;
  }
  // 小号字体
  @mixin fs_small{
    font-size: 1.28rem;
  }
  // 筛选字体
  @mixin fs_tit{
    font-size: 1.56rem;
  }


  // $bor:1px;
  $bor:0;
  // 边距
  $pmvw: 4vw;
  @mixin no-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .b_flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  p.line{
    width: 2.36vw;
    height: 0.885vw;
    margin: 0 auto;
    border-radius: 3px;
  }
  .brand_active{
    // font-weight: 600;
    color:#2A303C !important;
    // font-size: 4.66667vw;
    .line{
      background: linear-gradient(270deg, #FF8F7A 0%, #E73919 100%);
    }
  }

  // 溢出 。。。
  @mixin overThree{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  div{
    // box-sizing: ;   
    box-sizing: border-box;
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
  // 上面搜索条件
  .search{
    font-size: 1.32rem;
    color: #666;
    // height: 12.2vh;
    padding:0 0 0 0;
    // 搜索文本
    .s_text{
      // height: 3.3rem;
      border: $bor solid pink;
      overflow: auto;
      /* padding-top: .4rem; */
      padding: 2.4vw 0;
      padding:2.4vw .7rem;
      // height: 11.734vw;

      ul{
        // font-size: 3.734vw;
        @include fs_tit();
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        li{
          padding: 0 .22rem;
          // background: pink;
          text-align: center;
          height: 2.4rem;
          line-height: 2.2rem;
          flex-shrink: 0;
          margin: 0 2vw 0 0;

          color: #A4ABB3;

        }
      }
    }
    // 搜索角标
    .s_btn{
      // height: 11.734vw;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      // height:3.2rem;
      margin: 0 0 2.2vw 0;
      // padding-right: 1vw;
      padding: 0 .2rem;
      padding-left: .7rem;
      // 左侧
      .s_btn_l{
        width: 72%;
        border: $bor solid pink;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 1vw 0;
        font-size: 1.1rem;
        padding: 0;
        
        li{
          width: 28%;
          height: 2.06rem;
          height: 6vw;
          background: #F7F7F7;
          line-height: 2.06rem;
          display: flex;
          border-radius: 0.44rem;
          justify-content: space-between;
          flex-wrap: wrap;
          padding-left: 1vw;
          position: relative;
          p{
            width:72%;
            text-align: center;
            font-size: 3.2vw;
            position:absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          div{
            width: 27.8%;
            display: flex;
            flex-direction: column;
            position: absolute;
            right: -1.5vw;
            span{
              background-image: url('../../../assets/image/brand/h5_bottom.png');
              
              background-repeat: no-repeat;
              background-size: contain;
              width: 2.133vw;
              height: 1.206666vw;
              margin: .2vw 0;
              display: block;
            }
            .i_top{
              margin-top: 1.6vw;
              background-image: url('../../../assets/image/brand/h5_top.png');
            }
            .s_act_top{
              background-image: url('../../../assets/image/brand/h5_act_top.png');
            }
            .s_act_bottom{
              background-image: url('../../../assets/image/brand/h5_act_bottom.png');
            }
          }
        }
      }
      // 右侧
      .s_btn_r{
        // width: 30%;
        // border:$bor solid pink;
        // text-align: right;
        // padding: .06rem 0 0 0;
        // font-weight: 600;
        width: 24.5%;
        // margin-top: .64vw;
        border: 0 solid pink;
        text-align: right;
        text-align: right;
        font-weight: 600;
        font-size: 3.2vw;
        padding: 1vw 0;
        .s_r_drop{
          width: 3vw;
          transform: translateY(-0.5vw);
          margin-left: 1vw;
        }
      }
    }
    
    .s_btn_pad{      
      padding: 0 .7rem;
    }
  }
  // 内容信息
  .brand_cont{
    width: 100%;
    max-height: 81vh;
    border:$bor solid blue;
    padding: 0 $pmvw;
    // padding-top: 1rem;
    overflow: auto;
    .b_c_item{
      height: 24vw;
      // padding: .8rem;
      border:$bor solid yellow;
      @include no-flex;
      // margin-bottom: 5vw;
      margin: 3.5vw 0 5vw 0;
      img{
        // width: 8rem;
        // height: 8rem;
        width: 24vw;
        height: 24vw;
        border-radius: 1rem;
        border: 1px solid #eee;
      }
      .item_data{
        width: 70%;
        width: 65vw;
        height: 24vw;
        border: $bor solid red;
        // font-size: 1.2rem;
        @include fs_small();
        color: #AAB0B8;
        box-sizing: border-box;
        // 超出 点点点
        p,span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .name_t{
          position: relative;
          height: 19.4vw;
          .i_div_samll{
            position: absolute;
            bottom: 6vw;
          }
          .b_flex{
            position: absolute;
            bottom: 12vw;
            width:100%;
          }
        }     
          
        .s_tit{
          max-width: 40vw;
        }
        .s_km{
          max-width: 25vw;
        }
        
        .i_name{
          // font-size: 5.08vw;
          @include fs_big();
          color: #2A303C;
          font-size: 4.6vw;
          line-height: 1;          
          padding-top: .4rem;
        }

        .i_div{
          span{
            font-weight: 600;
            color: #555;
          }
          &:last-child{
            margin-bottom: 0;
            position: absolute;
            bottom: 0;
            line-height: 1;
          }
        }


      }
    }
    
  }
}
@media only screen and (max-width: 330px) and (min-width: 300px) {
  .new_brand .search .s_btn .s_btn_r{
    padding:.6vw 0;
  }
}

    /* left: -0.6rem;*/


</style>
