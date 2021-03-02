<template>
	<div class="search-wrapper brand_head_s">
    <div class="header_h">
      <search-header ref="header" 
        :keyword="keywords"
        title="品牌搜索"
        place="请输入品牌名称"
        @postKeyword="fun_postKeyword"
        @postcurrenKeywords="fun_postcurrenKeywords"
        >
      </search-header>
    </div>
    <!-- 搜索 模块 -->
		<div class="search-body" v-show="!showList">
			<div class="list current-search" v-if="currenKeywords.length > 0">
				<div class="list-header">
					<span>搜索历史</span>
					<img src="../../../assets/image/icon2/icon-del.png" v-on:click="deleteCurrent()" />
				</div>
				<ul ref="ref_ul">
					<li class="item" v-for="(item, index) in currenKeywords" v-on:click="getKey(item)" :key="index">{{ item }}</li>
				</ul>
			</div>

			<div class="list hot-wrapper" v-if="hotKeywords[0] !== ''">
				<div class="list-header"><span>热门搜索</span></div>
				<ul>
					<li class="item" v-for="(item, index) in hotKeywords" :key="index" v-on:click="getKey(item)">{{ item }}</li>
				</ul>
			</div>
		</div>
    <!-- 列表内容 -->
    <!-- 内容展示 -->
    <div class="brand_cont" v-show="showList">

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
              <div class="name_t">
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
    <empty-record v-if="!showList"></empty-record>

	</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex';
import searchHeader from './HeaderSearch';
import EmptyRecord from '../../../components/EmptyRecord'
import { searchKeywordList } from '../../../api/homesearch';

import { getBrandList, getHotKeyWords } from '../../../api/homebrand.js';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			hotKeywords: [],     // 热门推荐
			currenKeywords: [],  // 历史记录
      keywords:  '',
      showList: false,
      brandList: [],

      loading: false, // 是否加载更多
      isMore: false, // 是否有更多    

      params: {
        page : 0,     // 起始条数
        per_page : 10, // 一次查询条数

        sabrand_id : null, // 食安品牌id，1是食安山东 必穿
        lat1 : null ,         // 经度 必穿
        lng1 : null ,         // 纬度 必穿
        unit_type : 0,   //（可选、搜索项）：食安企业类型id

        sort_distance : 0,  // 距离排序
        sort_points : 0,    // 评分排序
        sort_follow : 0,    // 热度排序

        
			  previous : null,
      },
		};
  },
  watch:{
    brandList:function(v){
      if(v.length){
        this.showList = true;
      }else{
        this.showList = false;
      }
    }
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
	components: {
    searchHeader,
    EmptyRecord
	},
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => { 
      if( from.name != "HomeBrandItem" ){

        //更新初始化列表数据
        vm.keywords = '';
        vm.brandList = [];
        vm.$refs.header.clear();
      }
      resetRem();
        /*var keyArr = vm.utils.fetch('brandkeyword');
        vm.keywords = keyArr[keyArr.length-1];
        vm.fun_postKeyword(vm.keywords);
        vm.$refs.ref_ul.lastElementChild.click();
        
        vm.params.lat1 = vm.lat;
        vm.params.lng1 = vm.lng;
        vm.params.sabrand_id = vm.brandId;
        getBrandList(vm.params,vm.keywords).then(res=>{
          vm.brandList = res.result.sabrand_list;
          if (res.result.hasmore) {
            vm.isMore = true
          } else {
            vm.isMore = false
          }
        }).catch(err=>{
          Toast(err.message);
        })


      } */
    })
  },
	computed: {
		...mapState({
			currentKey: state => state.homesearch.currentKey,
			lat: state => state.homebrand.lat,
			lng: state => state.homebrand.lng,
			brandId: state => state.homebrand.brandId,
		})
	},
	mounted() {
		resetRem()
	},
	created() {
    this.params.lat1 = this.lat;
    this.params.lng1 = this.lng;
    this.params.sabrand_id = this.brandId;
    this.previous = new Date().getTime();
		this.getHotKeywords();
		this.getCurrentKey();
	},
	beforeDestroy: function() {
		resumeRem()
	},
	methods: {
		...mapMutations({
			changeKey: 'changeKey',
      saveStoreId: 'saveStoreId',
    }),
    // 查看品牌详情
    fun_goInfo(id){
      this.saveStoreId(id);
      // this.$router.push({name:'HomeBrandItem'});
      this.$router.push({name:'HomeBrandItem',query:{sid:id}})
    },
    // 接收 headersearch 返回的 关键词
    fun_postKeyword(keyword){
      if( keyword ){
        this.keywords = keyword;
        this.isMore = true;
        this.params.page = 0;
        this.brandList = [];
        this.loadMore();
      }
    },
    // 如果 用户清空了 搜索框的内容 从新 记录数据
    fun_postcurrenKeywords(){
      if( !this.showList ){
		    this.getCurrentKey();
      }
    },

		getHotKeywords() {
			getHotKeyWords().then(res => {
				this.hotKeywords = Object.assign( res.result, this.hotKeywords);
			});
		},

		getKey(item) {
			if (item.content) {
				this.keywords = item.content;
			} else {
				this.keywords = item;
			}
			this.changeKey(this.keywords);
			this.$refs.header.search(this.keywords);
		},

		deleteCurrent() {
			this.utils.save('brandkeyword', []);
			this.currenKeywords = this.utils.fetch('brandkeyword');
		},

		getCurrentKey() {
			this.currenKeywords = this.utils.fetch('brandkeyword');
    },
    
    // 加载数据
    loadMore () {
      this.loading = true;
      this.params.page = ++this.params.page;
      if (this.isMore) {
        this.loading = false;
        this.getOrderList(true)
      }
    },
    
    getOrderList (ispush) {      
      let now = new Date().getTime();
      if ( this.previous + 280 <= now ) {
        Indicator.open();
        let params = this.params;
        getBrandList(params,this.keywords).then(res=>{
          Indicator.close();
          if (ispush && this.brandList) {
            this.brandList = this.brandList.concat(res.result.sabrand_list);
          } else {
            this.brandList = res.result.sabrand_list
          }
          if (res.result.hasmore) {
            this.isMore = true
          } else {
            this.isMore = false
          }
        }).catch(err=>{
          Toast(err.message);
          // console.log(err);
        })
        this.previous = now;
      }
    },
	}
};
</script>

<style lang="scss" scoped>
.brand_head_s{
  div{
    box-sizing: border-box;
  }
  
  // 大号字体
  @mixin fs_big{
    font-size: 1.8rem;
  }
  // 小号字体
  @mixin fs_small{
    font-size: 1.28rem;
  }
  // 溢出 。。。
  @mixin overThree{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @mixin pos_fixed{    
    position: fixed;
    top: 25vw;
  }

  & /deep/ .common-empty-record{
    padding-top: 10%;
    @include pos_fixed();
    top: 60vh;
  }
  .b_flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  $pmvw:4vw;
// .search-wrapper 
// 	height: auto;
//   width: auto;
  .header_h{
    height:25vw;
  }
	.search-body {
    @include pos_fixed();
		padding: 0 1.3rem;
		div.list {
			margin-bottom: 1.5rem;
			.list-header {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				span {
					color: #333;
					// font-size: 0.7rem;
					font-size:1.39rem;
          font-size: 4.15vw;
					font-family:PingFangSC-Medium,PingFang SC;
					color:rgba(22,22,22,1);
					align-self: flex-end;
				}
				img {
					width: 1.13rem;
					height: 1.13rem;
					cursor: pointer;
				}
			}
			ul {
				display: flex;
				padding-top: 1.13rem;
				flex-wrap: wrap;
				li {
					padding: 0.45rem 1.3rem;
					background-color: rgba(244, 245, 247, 1);
					border-radius: 1.95rem;
					color: #333;
					font-size: 0.6rem;
          font-size: 3vw;
					margin-right: 1.3rem;
					margin-bottom: 1.3rem;
					cursor: pointer;
				}
			}
		}
		div.hot-wrapper {
			.list-header {
				span {
				}
			}
		}
  }
  
  
  $bor:0;
  @mixin no-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  // 内容信息
  .brand_cont{
    @include pos_fixed();
    height: 86.8vh;
    border:$bor solid blue;
    padding: 0 $pmvw;
    // padding-top: 1rem;
    overflow: auto;
    box-sizing: border-box;
    width: 100vw;
    
    
    .b_c_item{
      height: 24vw;
      // padding: .8rem;
      border:$bor solid yellow;
      @include no-flex;
      margin-bottom: 5vw;
      margin: 3vw 0 5vw 0;
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
</style>
