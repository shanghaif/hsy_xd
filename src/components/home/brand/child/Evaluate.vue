<template>
  <div class="evaluate">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">工厂评价</span>
        <span class="header-right"></span>
			</div>
		</div>

    <!-- 工厂评价 -->
    <div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <ul>
        <li v-for="(v,i) in evaluateList" :key = "i">
          <!-- <img src="@/assets/image/brand/market_ava.png" alt=""> -->
          <img class="ava" :src="v.member_avatar" alt="">
          <div>
            <span>{{v.member_name|splitStar}}</span>
            <p>{{v.sm_text}}</p>
            <span>{{timestampToTime(v.addtime)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapActions } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import { getSaunitEvaluates } from '../../../../api/homebrand.js';

export default {
	data() {
		return {
      // evaluateList: [],
      evaluateList: [],
      page: 0,    
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多  
      

      page : 0,     // 起始页数
      per_page : 10, // 一次查询条数      
    }
  },
	computed: {
		...mapState({
			store_id: state => state.homebrand.store_id,
    }),  
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
  created(){
    // this.loadMore();
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {      
    // 过滤 时间戳 转化为字符串
    timestampToTime(date){
      return this.utils.timestampToTime(date)
    },
    // 加载数据
    loadMore () {
      this.loading = true;
      this.page = ++this.page;
      if (this.isMore) {
        this.loading = false;
        this.getOrderList(true);
        // this.evaluateList += 8;
      }
    },

     // 获取数据
    getOrderList (ispush) {
      Indicator.open();
      getSaunitEvaluates(this.store_id,this.page,this.per_page).then(res=>{
        // console.log(res);
        Indicator.close();
        if ( ispush && this.evaluateList.length>0 ) {
          this.evaluateList = this.brandList.concat(res.result.saunit_evaluates)
        } else {
          this.evaluateList = res.result.saunit_evaluates
        }
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }
      }).catch(err=>{
        Toast(err.message);
      })
    },
	}
};
</script>

<style lang="scss" scoped>
.evaluate{
  // 字体 小
  @mixin fs_small{
    font-size: 3.48vw;
  }
  // 字体 中
  @mixin fs_title{
    font-size: 4.18vw;
  }
  // 字体 中
  @mixin fs_{
    font-size: 3.88vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size: 4.58vw;
  }
    // 边距
  $pmvw: 4vw;

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
  
  div,p,li{
    @include item_box;
  }
  // 头部标题 返回按钮

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

  // 工厂评价 内容
  .cont{
    height: 94vh;
    // border: 1px solid red;
    padding: 1vw $pmvw;
    overflow: scroll;
    li{
      @include item_flex;
      margin: 3.6vw 0;
      img{
        // width: 13.5vw;
        // height: 13.5vw;
        width: 10.5vw;
        height: 10.5vw;
        border-radius: 50%;
      }
      div{
        width: 78vw;
        @include fs_small;
        color:#A6ACB4;

        p{
          color: #2A303C;
          margin: 2vw 0 1vw 0;;
        }
      }
    }
  }

}
</style>
