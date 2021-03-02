<template>
  <div class="new_brand">
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.push({ name: 'HomeBrandIndex' })" src="@/assets/image/brand/h5_back.png" alt="" />
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
            :class="{brand_active: params.unit_type == 0}" @click="fun_changeUnitType(0)" >
            食安山东
            <p class="line"></p>
          </li>
          <li
            :class="{brand_active: params.unit_type == 1}" @click="fun_changeUnitType(1)" >
            食安曹县
            <p class="line"></p>
          </li>
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
      <div class="s_btn">
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
    </div>
    <!--搜索结束 -->
    <!-- 内容展示 -->
    <div class="brand_cont">
      
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
            <!--  -->
            <div class="b_flex">
              <span class="s_tit">{{item.unit_main}}</span>
              <span class="s_km">{{item.distance}}km</span>
            </div>
            <!--  -->
            <div class="i_div">
              评分：<span>{{item.unit_points.split('.')[0]}}分</span>&nbsp;|
              量化等级：<span>{{item.unit_grade}}</span>
            </div>
            <!--  -->
            <div class="i_div">
              <span>{{item.unit_follow|filters_follow}}</span>粉丝数&nbsp;|
              <span>{{item.unit_praise}}%</span>好评率
            </div>
          </div>
         </div>      
      </div>
    </div>    
    <empty-record v-if="brandList && !brandList.length"></empty-record>
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

export default {
  components: {
    EmptyRecord,
    RegionPicker
  },
  data(){
    return{
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
      }else{
        return value
      }    
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
      if( from.name == "HomeBrandItem" || from.name == "HomeBrandSearch" ){
        vm.params = vm.brandParams;
        vm.params.page = vm.params.page-1;
      } 
    })
  },
  created(){
    this.params.sabrand_id = this.brandId;
    this.previous = new Date().getTime();
    this.params.lat1 = this.lat;
    this.params.lng1 = this.lng;
  },

  mounted(){
    resetRem();
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
    ...mapMutations({
      saveStoreId: 'saveStoreId',
      saveParams: "saveParams",
    }),

    // 跳转到 搜索
    fun_jumpSearch(){
      this.saveParams(this.params);
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
        getLatLng().then(p=>{
          this.params.lat1 = p.lat;
          this.params.lng1 = p.lng;
          console.log(this.params);

          
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
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }

        this.valm = res.result.saregionid;
        // console.log(this.valm);
      }).catch(err=>{
        Toast(err.message);
      })
    },
    
    // 点击切换后 从新获取 数据
    fun_loading(){      
      let now = new Date().getTime();
      if ( this.previous + 680 <= now ) {
        this.brandList = [];
        this.params.page = 0;
        this.isMore = true;
        // console.log(this.params);
        this.loadMore();
        this.previous = now;
      }
    },

    // 点击顶部类型
    fun_changeUnitType(i){
      this.params.unit_type = i;
      this.fun_loading();
    },

    // 点击切换 距离 评分 热度 
    fun_getBrandList(str){
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
    },
  },

}
</script>

<style scoped lang='scss'>
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
    font-size: 1.3rem;
  }
  // 筛选字体
  @mixin fs_tit{
    font-size: 1.36rem;
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
    padding: 0 $pmvw;
    // 搜索文本
    .s_text{
      // height: 3.3rem;
      border: $bor solid pink;
      overflow: auto;
      /* padding-top: .4rem; */
      padding: 2.4vw 0;
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
      height:3.2rem;
      margin: 0 0 2.2vw 0;
      // 左侧
      .s_btn_l{
        width: 66%;
        border: $bor solid pink;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 1vw 0;
        font-size: 1.1rem;
        
        li{
          width: 28%;
          height: 2.06rem;
          background: #F7F7F7;
          line-height: 2.06rem;
          display: flex;
          border-radius: 0.44rem;
          justify-content: space-between;
          flex-wrap: wrap;
          padding-left: 1vw;
          p{
            width:70%;
            text-align: center;
            font-size: 3.2vw;
          }
          div{
            width: 28%;
            display: flex;
            flex-direction: column;
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
        width: 30%;
        // padding-top: 2vw;
        margin-top: .64vw;
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
  }
  // 内容信息
  .brand_cont{
    max-height: 82vh;
    border:$bor solid blue;
    padding: 0 $pmvw;
    // padding-top: 1rem;
    overflow: auto;
    .b_c_item{
      height: 24vw;
      // padding: .8rem;
      border:$bor solid yellow;
      @include no-flex;
      margin-bottom: 5vw;
      img{
        width: 8rem;
        height: 8rem;
        width: 24vw;
        height: 24vw;
        border-radius: 1rem;
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
        
        div{          
          margin: .8vw 0;
          .s_tit{
            max-width: 40vw;
          }
          .s_km{
            max-width: 25vw;
          }
        }
        
        .i_name{
          // font-size: 5.08vw;
          @include fs_big();
          color: #2A303C;
        }

        .i_div{
          span{
            font-weight: 600;
            color: #555;
          }
          &:last-child{
            margin-bottom: 0;
          }
        }


      }
    }
    
  }
}
</style>
