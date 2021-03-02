<template>
  <div class="duty">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">{{dutyObj.data_tit}}</span>
        <span class="header-right"></span>
			</div>
		</div>

    <!-- 核心竞争力 后二 -->
    <div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <ul>
        <li v-for="(v,i) in evaluateList" :key="i"
          @click="$router.push({ name:'HomeBrandShow',query:{v:v,tit:dutyObj.data_tit}})"
          >
          <img :src="v.img" alt="">
          <div class="item">
            <div class="title">{{v.itemtit}}</div>
            <div>{{v.itemtit1}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import { getSaunitDatalis } from '../../../../api/homebrand.js';

export default {
	data() {
		return {
      // evaluateList: [],
      evaluateList: [],
      page: 0,
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多    
    }
  },
	computed: {
		...mapState({
      store_id: state => state.homebrand.store_id,
      dutyObj: state => state.homebrand.dutyObj,
    }),
  },
  created(){
    getSaunitDatalis(this.store_id,this.dutyObj.data_typeid).then(res=>{
      // console.log(res);
      this.evaluateList = res.result.saunit_datalist;
      
      for(var item of this.evaluateList){
        item.img = item.item_pic[0]
      }
    })
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {    
    // 加载数据
    loadMore () {
      this.loading = true;
      this.page = ++this.page;
      if (this.isMore) {
        this.loading = false;
        // this.getOrderList(true);
        // this.evaluateList += 8;
      }
    },

     // 获取数据
    getOrderList (ispush) {
      Indicator.open();
      getBrandList(this.page).then(res=>{
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
      }).catch(err=>{
        Toast(err.message);
      })
    },
	}
};
</script>

<style lang="scss" scoped>
.duty{
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
				// font-weight: 600;
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
    padding: 2vw $pmvw;
    overflow: scroll;
    li{
      @include item_flex;
      margin: 0  0 3.6vw 0;
      img{
        width: 41vw;
        height: 23.065vw;
        border-radius: 8px;
      }
      .item{
        width: 48vw;
        @include fs_;
        color:#A4ABB3;
        div{
          width: 100%;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          margin: .5vw 0;
          @include fs_small;
        }
        .title{
          @include fs_big;
          color: #2A303C;
        }

      }
    }
  }

}
</style>
