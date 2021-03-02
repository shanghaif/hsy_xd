<template>
	<div class="brand_item">
    <!-- 头部标题 返回按钮 -->
		<div class="header" id="bar" v-show="headerFixed" :class="{isFixed: headerFixed}">
			<div class="header-wrap">
				<img class="img-back" @click="goBack" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">工厂名片</span>
				<img class="img-back" @click="popupMore" src="@/assets/image/brand/h5_share.png" alt="" />
			</div>
		</div>
    <!-- 背景 -->
    <div class="bg_img">
      <!-- 顶部 head -->
      <div class="header" v-show="!headerFixed"  id="bgImg">
        <div class="header-wrap">
          <img class="img-back" @click="goBack" src="@/assets/image/brand/h5_l_f.png" alt="" />
          <span class="header-title">工厂名片</span>
          <img class="img-back" @click="popupMore" src="@/assets/image/brand/h5_share1.png" alt="" />
        </div>
      </div>
      <img class="img_true" v-lazy='Info.cov_panorama' >
      <div class="img_opac"></div>
      <!-- 主要信息 -->
      <div class="item_data">
        <p class="i_name brand_active">{{Info.unitname}}</p>
        <!--  -->
        <div class="i_div">
          <span>评分：{{Info.unit_points?Info.unit_points:"90"}}分&nbsp;|&nbsp;量化等级：{{Info.unit_grade}}</span>
        </div>
        <!--  -->
        <div class="i_div">
          <span>{{Info.unit_follow?Info.unit_follow:"xx "}} 粉丝数&nbsp;|&nbsp;{{Info.unit_praise?Info.unit_praise:"90"}}%好评率</span>
        </div>
      </div>
    </div>
    <div class="main">   
      <!-- 全景 视频 -->
      <div class="technology">
        <!-- 左侧全景 -->
        <div class="t_item" @click="fun_togPanoramic">
          <img src='@/assets/image/brand/core/brand_p.jpg' alt="">
          <!-- <img v-lazy='brand_p' alt=""> -->
          <div>
            <span>
              360度全景看厂
            </span>
          </div>
        </div>
        <!-- 右侧直播 -->
        <div class="t_item" @click="$router.push({name:'HomeBrandLive',query:{id:store_id}})">
          <!-- <img :src="Info.cov_live" alt=""> -->
          <img src='@/assets/image/brand/core/brand_l.jpg' alt="">
          <!-- <img v-lazy='brand_l' alt=""> -->
          <div>
            <span>
              直播视频
            </span>
          </div>
        </div>
      </div>
      <!-- 企业介绍 -->
      <div class="introduct">
        <!-- 企业简介 -->
        <div class="text dashed" @click="fun_goChild('HomeBrandIntroduct')"  v-if="Info.unit_intro">
          <span>企业简介：</span>
          <p class="long">{{Info.unit_intro}}</p>          
				  <img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
        </div>
        <!-- 满意度 -->
        <div class="text" :class="{dashed:unitsm_list.length}"  @click="fun_goChild('HomeBrandSurvey')" v-if="Info.unit_percent">
          <span>满意度：</span>
          <div class="long">
            <ul class="ponits">              
              <li>
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt="">
              </li>
              <li class="star" :style="{width:Info.unit_percent+'%'}">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeDI9IjEwMCUiIHkyPSI1MCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZERTAwIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGQjAwMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+">
              </li>
            </ul>
          </div>
          <img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
        </div>
        <!-- 工厂评价 -->
        <div class="text" v-if="unitsm_list.length" @click="fun_goChild('HomeBrandEvaluate')">
          <span>工厂评价：</span>
          <p class="long see">查看更多</p>          
				  <img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
        </div>
        <ul class="evaluat" v-if="unitsm_list.length">
          <li v-for="(v,i) in unitsm_list" :key="i">
            <!-- <img class="ava" src="@/assets/image/brand/market_ava.png" alt=""> -->
            <img class="ava" :src="v.member_avatar" alt="">
            <div class="ava_r">
              <p>{{v.member_name|splitStar}}</p>
              <p>{{v.sm_text}}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 主营业务 -->
      <div class="main_bus" v-if="Info.unit_main ||Info.unit_areas||Info.unit_employees||Info.unit_found||Info.unit_income">
        <div class="bussiness p_b_0">          
          <div class="top" v-if="Info.unit_main">
            <div>主营业务：{{Info.unit_main}}</div>
            <div @click="goStoreDetail" class='orign'>{{godetails}}</div>           
          </div>
          <div class="dashed" v-if="Info.unit_main"></div>
          <ul class="bottom">
            <li v-if="Info.unit_areas">
              <p>{{Info.unit_areas}}平方</p>
              <span>面积</span>
            </li>
            <li class="li_center"  v-if="Info.unit_employees">
              <!-- <div> -->
                <p>{{Info.unit_employees}}人</p>
                <span>员工人数</span>
              <!-- </div> -->
            </li>
            <li class="li_right"  v-if="Info.unit_found">
              <!-- <div> -->
                <p>{{Info.unit_found}}</p>
                <span>成立时间</span>                
              <!-- </div> -->
            </li>
            <li v-if="Info.unit_income">
              <p>{{Info.unit_income}}</p>
              <span>营业收入</span>
            </li>
            <li v-if="Info.unit_contains.val">
              <p>{{Info.unit_contains.val}}</p>
              <span>{{Info.unit_contains.tit}}</span>
            </li>
          </ul> 
        </div>
        <!-- 联系模块 -->
        <div class="bussiness p_t_0">    
          <ul class="phone">
            <li v-if="Info.unit_address">
              <span>地址：</span>
              <span>{{Info.unit_address}}</span>
            </li>
            <li v-if="Info.unit_tel">
              <span>电话：</span>
              <span>{{Info.unit_tel}}</span>
            </li>
            <li v-if="Info.unit_email">
              <span>邮箱：</span>
              <span>{{Info.unit_email}}</span>
            </li>
            <li v-if="Info.unit_phone">
              <span>联系人手机号：</span>
              <span>{{Info.unit_phone}}</span>
            </li>
          </ul>        
        </div>
      </div>

      <!-- 核心竞争力 -->
      <div class="main_power"  v-if="coreList&&coreList.length>0">         
        <div class="top">
          <div>核心竞争力</div>
        </div>
        <ul class="bottom">
          <li 
            v-for="(core,coreIndex) in coreList" :key="coreIndex"
            :class="{is_active:core.data_value}"
            @click="fun_jump(coreIndex,core)"
            >
            <img v-if="core.data_value>0" :src='require(`@/assets/image/brand/core/${core.data_name}_a.png`)' alt="">
            <img v-else :src='require(`@/assets/image/brand/core/${core.data_name}.png`)' alt="">
            <p :class="{is_active:core.data_value>0}">{{core.data_tit}}({{core.data_value}})</p>
          </li>
          <!-- <li>
            <img src="@/assets/image/brand/core/bzrz.png" alt="">
            <p>标准认证(333)</p>
          </li>
          <li>
            <img src="@/assets/image/brand/core/ryxx.png" alt="">
            <p>荣誉信息(0)</p>
          </li>
          <li>
            <img src="@/assets/image/brand/core/ppjz.png" alt="">
            <p>品牌价值(333)</p>
          </li>
          <li @click="fun_goChild('HomeBrandDuty')">
            <img src="@/assets/image/brand/core/shzr.png" alt="">
            <p>社会责任(222)</p>
          </li>
          <li class="is_sctive">
            <img src="@/assets/image/brand/core/ppxc_a.png" alt="">
            <p>品牌宣传(0)</p>
          </li> -->
        </ul>
      </div>

      <!-- 质量安全 -->
      <div class="main_bus main_mt" v-if="safetyList&&safetyList.length>0">
        <div class="bussiness">          
          <div class="top anquan">
            <div>质量安全</div>
          </div>
          <ul class="bottom">
            <li 
              v-for="(safety,si) in safetyList" :key="si"
              @click="fun_safetyJump(safety.data_typeid,safety.data_tit)"
              >
              <p>{{safety.data_value}}</p>
              <span>{{safety.data_tit}}</span>
            </li>
          </ul>    
        </div>
      </div>

      <!-- 工厂评价 -->
      <div class="nice" v-if="unit_goods_list && unit_goods_list.length>0">
        <!-- <div class="text">
          <span>优势产品：</span>
          <p class="long see" @click="$router.push( { name:'HomeStoreGoodsclass', query:{id:store_id}} )">完整产品目录</p>          
          <img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />      
        </div> -->
        <div class="text">
          <span>优势产品：</span>
          <div @click="$router.push( { name:'HomeStoreGoodsclass', query:{id:store_id}} )" >
            <p class="long see">完整产品目录</p>          
            <img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
          </div>  
        </div>
        <ul>
          <li v-for="(v,i) in unit_goods_list" :key="i"
            @click="$router.push( { name:'HomeGoodsdetail',query:{goods_id:v.goods_id} } )"
            >
            <img :src="v.goods_image" :alt="v.goods_name">
          </li>
        </ul>
      </div>

      <!-- 全景 视频 -->
      <!-- <div style="height:500vh">
      </div> -->

  </div>
		<header-more3 v-show="popupVisible"
      :brandInfo="Info"
			@change-popupVisible="changePopupVisible" :showDot="showDot"></header-more3>
		<!-- <div id="bar" :class="{isFixed: headerFixed}"> -->
	</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState,mapMutations } from 'vuex';
import { getSaunitInfo } from '../../../api/homebrand.js';
import HeaderMore3 from '../../HeaderMoreSty';

import { resetRem, resumeRem } from '@/util/rem';
import { getSaunitDatalis } from '../../../api/homebrand.js';

// import brand_p from '../../../assets/image/brand/core/brand_p.png';
// import brand_l from '../../../assets/image/brand/core/brand_l.png';

export default {
	components: {
    HeaderMore3,
	},
	data() {
		return {
      // brand_p:brand_p,
      // brand_l:brand_l,
      pathName: null,    // 来自于
			headerFixed: false,  // 定位
      popupVisible: false, // 弹出更多

      showDot: false,      // 分享
      Info: {} ,    // 详细信息
      unitsm_list: [],     //好评
      unit_goods_list:[], //  优势产品

      coreList:[],      // 核心竞争力
      safetyList:[],    //  安全

      store_id:null,

      // PanoList:[
      //   { path:"https://cn.bing.com/th?id=OHR.SmithRock_ZH-CN6383276214_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"大厅"},
      //   {path:"https://cn.bing.com/th?id=OHR.OysterMushroom_ZH-CN6265453153_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"后院"},
      //   {path:"https://cn.bing.com/th?id=OHR.Garajonay_ZH-CN6136090113_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"厨房"},
        
      //   { path:"https://cn.bing.com/th?id=OHR.SmithRock_ZH-CN6383276214_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"大厅"},
      //   {path:"https://cn.bing.com/th?id=OHR.OysterMushroom_ZH-CN6265453153_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"后院"},
      //   {path:"https://cn.bing.com/th?id=OHR.Garajonay_ZH-CN6136090113_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"厨房"},
        
      //   { path:"https://cn.bing.com/th?id=OHR.SmithRock_ZH-CN6383276214_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"大厅"},
      //   {path:"https://cn.bing.com/th?id=OHR.OysterMushroom_ZH-CN6265453153_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"后院"},
      //   {path:"https://cn.bing.com/th?id=OHR.Garajonay_ZH-CN6136090113_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp", name:"厨房"},
      // ]
		}
  },
  filters:{
    splitStar:function(str){
      // console.log(str);
      var length = str.length;
      var a = str.substr(0,1);
      var end = str.substr(length-1,1);
      for(var i = 0;i<length-2;i++){
        a += '*';
      }
      a += end;
      return a
    }
  },
	computed: {
		...mapState({
			// store_id: state => state.homebrand.store_id,
      // memberInfo: state => state.member.info,
      brandPathName: state => state.homebrand.brandPathName,  // 之前保存的路径
		}),
		godetails(){
			return (this.Info.unit_type<5)?"进入店铺":(this.Info.unit_type==5?'进入基地':(this.Info.unit_type==6?'进入市场':'进入街区'))
		}
  },
  created(){
    this.store_id = this.$route.query.sid;
    this.saveStoreId(this.store_id);
    // return false;
    if( this.store_id ){
      getSaunitInfo( this.store_id).then(res=>{
        // console.log(res);
        this.Info = res.result.saunit_info;
        this.unitsm_list = res.result.unitsm_list;
        this.unit_goods_list = res.result.unit_goods_list;

        this.coreList = res.result.saunit_data1;
        this.safetyList = res.result.saunit_data2;
        for( var item of this.safetyList ){
          if( item.data_tit == '三年满意度'){
            item.data_value += '分'; 
          }else if( item.data_tit == "抽查合格率"){
            item.data_value += '%'; 
          }
        }
      })
    }
  },
  
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
      vm.pathName = from.name;
      if(from.name != 'HomeBrandSurvey' ){
        vm.savebrandPathName(from.name);
      }
    })
  },
	mounted() {
    resetRem();
		this.headerFixed = false;
		// window.addEventListener('scroll', this.handleScroll, true);
	},
	destroyed() {
    resumeRem();
		// 销毁监听 吸顶特效
		// window.removeEventListener('scroll', this.handleScroll, true);
	},
	methods: {
    ...mapMutations({
      saveDutyObj: 'saveDutyObj',      
      savePanoRamicArr:"savePanoRamicArr",   // 保存 全景 数组
      saveStoreId: 'saveStoreId',    // 保存商家 信息
      savebrandPathName:"savebrandPathName",  // 保存 过来的 路径
    }),

    // 进店铺
    goStoreDetail(){
      // 正常 查看店铺
      ( this.Info.unit_type <5 )?
      this.$router.push( { name:'HomeStoreGoodslist', query:{id:this.store_id}} ):
      this.$router.push( { name:'HomeBrandStoreList', query:{id:this.Info.id}} )

    },

    // 点击 返回 按钮
    goBack(){
      // console.log(this.pathName);
      // if( this.pathName != 'HomeBrandSurvey' ){
        this.$router.go(-1);
      // }else{
      //   this.$router.push({ name: this.brandPathName })
      // }
    },

    // 上面 三个 跳转
    fun_goChild(pathName){
      // if( pathName == 'HomeBrandSurvey'){
      //   if( this.memberInfo ){
      //     this.$router.push( { name: pathName } );
      //   }else{
      //     // Toast("请先登录");
      //     this.$router.push({ name: 'HomeMemberLogin' })
      //   }
      // }else{
        this.$router.push( { name: pathName } );
      // }
    },

    // 切换全景
    fun_togPanoramic(){
      // Indicator.open()
      // this.savePanoRamicArr(this.PanoList);
      var arr = this.Info.panorama_pic;
      if( arr.length >0 ){
        var list = [];
        for(var item of arr){
          // console.log(item);
          list.push( 
            {
              path:item.pic,
              name:item.tit
            } 
          )
        }
        // console.log(list);
        this.savePanoRamicArr(list);
        this.$router.push( { name:"HomeBrandPano" })
      }else{
        Toast("暂无全景展示");
      }
      // mix-blend-mode: difference;
    },
    
    // 核心竞争力 跳转
    fun_jump(index,core){
      if(core.data_value>0){
        this.saveDutyObj(core);
        if( index<3 ){
          this.$router.push( { name: 'HomeBrandDuty' } );
        }else if( index == 3 ){
          // 安全 三项跳转
          this.fun_safetyJump(core.data_typeid,'品牌价值',core);
        }else{
          this.$router.push( { name: 'HomeBrandCore' } );
        }
      }else{
        Toast("暂无数据");
      }
    },

    // 三项 安全 跳转
    fun_safetyJump(data_typeid,title,core){
      getSaunitDatalis(this.store_id,data_typeid).then(res=>{
        var imgUrl = res.result.saunit_datalist[0].item_pic;
        if( title=="品牌价值"){
          this.$router.push({ name:'HomeBrandImg',query:{img:imgUrl,tit:title,itemtit:core.data_value}})
        }else{
          this.$router.push({ name:'HomeBrandImg',query:{img:imgUrl,tit:title}})
        }
      })
    },

    // 点击 出现分享
    popupMore () {
      if (!this.popupVisible) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
    },
    		// 切换 黑色下拉框
		changePopupVisible ( v ){
			this.popupVisible = v;
		},
		handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var offsetTop = document.getElementById('bgImg').offsetHeight;
			if (scrollTop > offsetTop) {
				this.headerFixed = true;
			} else {
				this.headerFixed = false;
			}
		},
		// closeFiler: 关闭下拉筛选模态框
		closeFiler() {
			this.isShowMore = false;
		},
	}
};
</script>

<style lang="scss" scoped>
.brand_item{
  // 虚线
  .dashed{
    &:after{        
      content: " ";
      position: absolute;
      bottom: 0;
      right: 0;
      width:100%;
      border-bottom: 1px dashed #d9d9d9;
    }
  }

  // 字体 小
  @mixin fs_small{
    font-size: 3.58vw;
    font-size: 1.2rem;
  }
  // 字体 中
  @mixin fs_{
    font-size: 3.8vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size: 4.58vw;
  }

  // 阴影
  @mixin item_bs{
    box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);
    margin: 5.8vw 0;
  }
  // 盒子模型
  @mixin item_box{
    box-sizing: border-box;
  }
  // 弹性布局
  @mixin item_flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  // 框
  // $bor:1px;
  $bor: 0;

  // 边距
  $pmvw: 4vw 4vw;

  $ptop: 4vw ;

  // 圆角
  $bord_radius:6px;
  
  @include fs_;

  .is_sctive{
    color: #000 !important;
  }

  .more-box{
    position: fixed;
  }
  // 头部标题 返回按钮
	.header {
    // height: 5.8vh;
    width: 100%;
    position: absolute;
    z-index: 10;
		.header-wrap {
			display: flex;
			justify-content: space-between;
			padding: .8rem 1.3rem;
			align-items: center;
			.img-back {
				width: 1.692rem;
				height: 1.692rem;
			}
			.header-title {
				font-size: 1.692rem;;
				font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
				font-weight: 600;
				color: rgba(22, 22, 22, 1);
			}
			.img-search {
				width: 1.692rem;
				height: 1.692rem;
			}
		}
	}
  // 固定定位
  .isFixed {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    background: #fff;
  }
  // 背景
  .bg_img{
    position: relative;
    height:52vw;
    width: 100vw;
    .header-title {color:#fff !important;}
    .img_true{
      width: 100%;
      height: 100%;
      position: absolute
    }
    .img_opac{
      background: #000;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.5;
    }
    
    .item_data{
      width: 66vw;
      height: 24vw;
      border: $bor solid red;
      // font-size: 1.2rem;
      position: absolute;
      top: 18.8vw;
      // margin-top: 5vw;
      padding-left: 6vw;
      color: #fff;

      div{          
        margin: .52rem 0;
      }
      
      .i_name{
        @include fs_big;
      }

      .i_div{
        span{
          font-weight: 600;
          display:inline-block;
          vertical-align:middle;   
        @include fs_small;
          color: #ddd;
        }
      }


    }
  }
  .main{    
    width: 90vw;
    margin: 0 auto;
    transform: translateY(-8.8vw);
    // 圆点
    .pai{
      width: 3vw;
      height: 1.5vw;
      background-color: #eee;
      position: absolute;
      transform: rotate(90deg);
      border-radius: 1.5vw 1.5vw 0 0;
      bottom: -0.5vw;
      z-index: 1;
    }
    .pai_r{
      right: -.65vw;
      transform: rotate(270deg);
    }
    .pai_l{
      left: -.65vw;
    }

    // 科技
    .technology{
      width: 90vw;
      height: 25vw;
      margin: 0 auto;
      // transform: translateY(-12vw);
      // border: $bor solid pink;
      @include item_flex;
      .t_item{
        width: 48%;
        height: 25vw;
        // border: 1px solid red;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        div{
          position: absolute;
          bottom: 2vw;
          left: 0;
          bottom: 1.6vw;
          left: 1vw;
          padding: .5vw 3vw;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 4px;
          color: #fff;
          transform: scale(.85);
          @include fs_small();
        }
        img{
          height: 100%;
          width: 100%;
        }
      }
    }

    // 企业简介
    .introduct{
      border-radius: $bord_radius;
      @include item_bs();
      // background: #999;
      div{
        background-color:#fff;
      }
      // 前两个
      .text{
        &:first-child{
          p{
            line-height: 1.8;
          }
        }
        // &:after{
          // content: " ";
          // position: absolute;
          // bottom: 0;
          // right: 0;
          // height: 1px;
          // border-bottom: 1px solid #d9d9d9;
          // border-style: dotted;
          // color: #d9d9d9;
          // -webkit-transform-origin: 0 0;
          // transform-origin: 0 0;
          // -webkit-transform: scaleY(.5);
          // transform: scaleY(.5);
          // left: 0;
          // z-index: 2;
        // }
        background: #fff;
        background: transparent;
        @include item_box;
        padding: 2.8vw $ptop;
        width: 100%;
        @include item_flex;
        // justify-content: space-around;
        align-items: center;
        position: relative;
        
        // border-bottom: 1px dashed #d9d9d9;
        // span{
        //   width: 20vw;
        //   font-size: 3.8vw;
        // }
        .long{
          width:58vw;
          overflow: hidden;
          height: 6vw;
          text-overflow: ellipsis;
          white-space: nowrap;
          .ponits{
            width:25vw;
            position: relative;
            li{
              width:100%;
              position: absolute;
              img{
                width:32vw;
                height: 5vw;
              }
            }
            .star{
              overflow: hidden;
            }
          }
        }
        .see{
          text-align:right;
          color: #999;
          line-height: 1.8;
        }
        img{
          // width: 4vw;
          // height: 4vw;
          // margin-top: .46vw;

          width: 2.68vw;
          height: 2.68vw;
          margin-top: .72vw;
        }
      }

      // 工厂评价
      .evaluat{
        // background-color: #fff;
        background: transparent;
        width: 84vw;
        padding: 0 3vw;
        padding-bottom: 3vw;
        li{
          @include item_flex;
          // width: 95%;
          margin: 0 auto;
          align-items: center;
          justify-content: flex-start;
          height: 11.8vw;
          margin: 2vw 0 3vw 0;
          .ava{
            width : 11.66vw;
            border-radius: 50%;
          }
          .ava_r{
            width: 70vw;
            padding-left: 2vw;
            height: 11.66vw;
            p{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;  
              @include fs_small;
              font-size: 1.3rem;
              color: #A4ABB3;

              &:last-child{                
                margin-top: 2vw;
                color: #333;
              }
            }
          }
        }
      }
    }

    // 主营业务
    .main_bus{

      .anquan{
        display: block !important;
        position: relative;
      }
      border-radius: $bord_radius;
      @include item_bs;
      .bussiness{
        position: relative;
        // &:after{
        //   content: " ";
        //   position: absolute;
        //   bottom: 0;
        //   right: 0;
        //   height: 1px;
        //   border-bottom: 1px solid #d9d9d9;
        //   color: #d9d9d9;
        //   -webkit-transform-origin: 0 0;
        //   transform-origin: 0 0;
        //   -webkit-transform: scaleY(.5);
        //   transform: scaleY(.5);
        //   left: 0;
        //   z-index: 2;
        // }
        padding: $pmvw;
        padding-top: 3vw !important;
        .top{
          @include item_flex();
          align-items: center;
          @include fs_big();
          div{
            font-weight: 600;
            overflow: hidden;
            width: 60vw;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .orign{
            @include fs_();
            width: 17vw;
            height: 5.55vw;
            line-height: 1.45;
            text-align: center;
            border-radius: 24px 0px 0px 24px;
            border: 1px solid #E73919;
            color: #E73919;
            transform: translateX(4vw);
          }
        }

        .bottom{
          @include item_flex();
          justify-content: flex-start;
          padding: 2vw 0;
          transform: scale(1.1) translateX(3.8vw);

          li{
            width: 33%;
            margin: 2vw 0;
            display: flex;
            flex-direction: column;
            align-items: inherit;
            p{
              font-weight: 600;
            }
            span{
              color: #999;
              @include fs_small();
              // display: block;
              margin-top: 1vw;
              // transform: translate(-2vw, 0vw) scale(.85)
            }
            display: flex;
          }

        }
      }
      .p_t_0{
        padding-top: 0vw;
      }
      .p_b_0{
        padding-bottom: 0vw;
        
        .bottom{

          li{
            span{
              transform: scale(0.9090909090909091) translateX(-1.3vw);
            }
          }
        }
      }

      .phone{
        span{
          @include fs_();
          // &:last-child{
          //   color: #999;
          // }
        }
      }
    }

    // 核心竞争力
    .main_power{
      border-radius: $bord_radius;
      margin-top: 3vw;
      @include item_bs;
      padding: $pmvw;
      .top{
        @include item_flex();
        align-items: center;
        @include fs_big();
        div{
          font-weight: 600;
        }
      }
      .bottom{
        @include item_flex();
        // justify-content: flex-start;
        li{
          width: 33%;
          width: 28%;
          margin: 2vw 0 0 0;
          text-align: center;
          color: #B3B9BF;
          img{
            width: 5vw;
            margin: 2vw 0;
          }
          p{
            text-align: center;
            @include fs_small();
            // font-size: 3.2vw;
            // transform: scale(.8);
            margin-top: .6vw;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .is_active{
            color: #2A303C;
          }
        }

      }
    }

    // 质量安全    
    .main_mt{
      margin-top: 3vw;
      .bussiness{
        .bottom{
          @include item_flex();
          justify-content: flex-start;
          padding:  2vw 0 0 0;
          margin-top: 2vw;
          transform: scale(1) translateX(0);
          justify-content: space-between;
          li{
            width: 23%;
            // margin: 2vw 0 0 0;
            margin: 0;
            span{
              margin-top: 2.6vw;
            }
          }

        }
      }
    }

    // 优势产品
    .nice{
      border-radius: $bord_radius;
      @include item_bs;
      margin: 3vw 0;
      .text{
        // border: 1px solid #999;
        background: #fff;
        background: transparent;
        @include item_box;
        padding: $pmvw 3.5vw 4vw;
        width: 100%;
        @include item_flex;
        align-items: center;
        position: relative;
        
        div{
          width: 50vw;
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          
          .long{
            width: 40vw;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #B1B9C1;
            white-space: nowrap;
            text-align: right;
            // padding-top: .45vw;
          }
          img{
            width: 2.68vw;
            height: 2.68vw;
            margin-top: 1.24vw;
            transform: translateX(2px);
          }
        }
        span{
          @include fs_big();
          font-weight: 600;
        }
      }

      // 底部产品
      ul{
        @include item_flex;
        // padding: 0 $pmvw;
        width: 82vw;
        margin: 0 auto;
        li{
          // width: 26vw;
          // margin: 2vw 0;
          // width: 26vw;
          // margin: 1vw 0;
          width: 25vw;
          margin-bottom: 3.5vw;
          img{
            width: 100%;
          }
        }

        padding-bottom: .5vw;
      }
    }

  }
}
</style>
