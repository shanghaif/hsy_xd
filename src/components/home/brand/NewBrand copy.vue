<template>
  <div class="new_brand">
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header-wrap">
				<img class="img-back" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">食安山东</span>
				<img class="img-back" @click="$router.push({name:'HomeBrandSearch'})" src="@/assets/image/brand/h5_search.png" alt="" />
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
          :class="{brand_active:0==0}" >全部</li>
          <li v-for="(v,i) in 5" :key="i" 
          :class="{brand_active:i==0}" >文本框</li>
        </ul>
      </div>
      <!-- 角标搜索条件 -->
      <div class="s_btn">
        <!-- 左侧 -->
        <ul class="s_btn_l">
          <li>
            <!--  -->
            <p>按距离</p>
            <div>
              <span class="s_top"></span>
              <span class="s_bot"></span>
            </div>
          </li>
          <li>
            <!--  -->
            <p>按评分</p>
            <div>
              <span class="s_top"></span>
              <span class="s_bot"></span>
            </div>
          </li>
          <li>
            <!--  -->
            <p>按热度</p>
            <div>
              <span class="s_top"></span>
              <span class="s_bot"></span>
            </div>
          </li>
        </ul>
        <!-- 右侧 -->
        <div class="s_btn_r">
          <span>所在街道</span>
          <span class="s_r_drop"></span>
        </div>
      </div>
    </div>
    <!--搜索结束 -->
    <!-- 内容展示 -->
    <div class="brand_cont">
      <!-- 单个信息 -->
      <div class="b_c_item"
        v-for="(item,index) in brandList"
        :key="index"
        @click="$router.push({name:'HomeBrandItem',query:{id:1}})"
        >
        <!-- 左侧图片 -->
        <img src="https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=1292968654,1464657959&fm=85&app=92&f=PNG?w=121&h=75&s=12B178845F7C9FEF064E66860300E08E" alt="">
        <!-- 右侧信息 -->
        <div class="item_data">
          <p class="i_name brand_active">{{item.unitname}}</p>
          <!--  -->
          <div class="b_flex">
            <span>衣服原料</span>
            <span>115km</span>
          </div>
          <!--  -->
          <div class="i_div">
            评分：<span>90分</span>&nbsp;|
            量化等级：<span>B+</span>
          </div>
          <!--  -->
          <div class="i_div">
            <span>1.5万</span>粉丝数&nbsp;|
            <span>80%</span>好评率
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { resetRem, resumeRem } from '@/util/rem';
import { getBrandList } from '../../../api/homebrand.js';

export default {
  data(){
    return{
      brandList: [],  // 品牌列表
    }
  },

  created(){
    getBrandList(1,134,134).then(res=>{
      this.brandList = res.result.sabrand_list;
      // console.log(this.brandList);
    }).catch(err=>{
      Toast(err.message);
    })
  },

  mounted(){
		resetRem();
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
  },

}
</script>

<style scoped lang='scss'>
.new_brand{
  // $bor:1px;
  $bor:0;
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
  .brand_active{
    font-weight: 600;
    color:#000;
    font-size: 1.58rem;
  }

  div{
    // box-sizing: ;   
    box-sizing: border-box;
  }
  // 头部标题 返回按钮
	.header {
    height: 5.8vh;
		.header-wrap {
			display: flex;
			justify-content: space-between;
			padding: 1rem 1.3rem;
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
  // 上面搜索条件
  .search{
    font-size: 1.32rem;
    color: #666;
    height: 12.2vh;
    // 搜索文本
    .s_text{
      height: 3.3rem;
      border: $bor solid pink;
      overflow:auto;
      padding-top: .4rem;
      ul{
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        li{
          padding: 0 .22rem;
          // background: pink;
          text-align: center;
          height: 2.2rem;
          line-height: 2.2rem;
          flex-shrink: 0;
          margin: .32rem .86rem;
        }
      }
    }
    // 搜索角标
    .s_btn{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height:3.2rem;
      // 左侧
      .s_btn_l{
        width: 62%;
        border: $bor solid pink;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: .45rem 0 0 .8rem;
        
        li{
          width: 30%;
          height: 2.6rem;
          background: #F7F7F7;
          line-height: 2.6rem;
          display: flex;
          border-radius: 0.44rem;
          justify-content: space-between;
          flex-wrap: wrap;
          p{
            width:70%;
            text-align: center;
          }
          div{
            width: 28%;
            display: flex;
            flex-direction: column;
            span{
              background-image: url('../../../assets/image/brand/h5_bottom.png');
              background-repeat: no-repeat;
              background-size: contain;
              width: 1.22rem;
              height: 48%;
              display: block;         
              &.s_top{
                transform: rotate(180deg);
                margin-bottom: 0.36rem;
              }
              .s_bot{

              }
            }
          }
        }
      }
      // 右侧
      .s_btn_r{
        width: 30%;
        border:$bor solid pink;
        text-align: right;
        padding: .6rem 0.86rem 0 0;
        font-weight: 600;
        .s_r_drop{
          background-image: url('../../../assets/image/brand/h5_drop_down.png');
          display: inline-block;
          background-repeat: no-repeat;
          background-size: contain;
          width: 1.2rem;
          height: 1.62rem;
          margin-left: .32rem;
          background-position-y: .421rem;
        }
      }
    }
  }
  // 内容信息
  .brand_cont{
    height: 82vh;
    border:$bor solid blue;
    padding: 0 .5rem;
    // padding-top: 1rem;
    overflow: auto;
    .b_c_item{
      height: 10rem;
      padding: .8rem;
      border:$bor solid yellow;
      @include no-flex;
      img{
        width: 8rem;
        height: 8rem;
        width: 24vw;
        height: 24vw;
        border-radius: 1rem;
      }
      .item_data{
        width: 70%;
        width: 66vw;
        height: 24vw;
        border: $bor solid red;
        font-size: 1.2rem;
        color: #777;
        padding-top: .2rem;
        // 超出 点点点
        p{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div{          
          margin: .2rem 0;
        }
        
        .i_name{
          font-size: 1.62rem;
        }

        .i_div{
          span{
            font-weight: 600;
            color: #555;
          }
        }


      }
    }
    
  }
}
</style>
