<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 15:43:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-23 17:29:36
-->

<template>
<div class="main-banner2">  
  <!-- 长条广告 -->
  <div class="banner" @click="fun_GoRoute(-1)">
    零食热卖
  </div>
  <ul>
    <li @click="fun_GoRoute(-1)">
      <div class="top-img">
        <img src="@/assets/image/icon2/miaosha.png" alt="">
        <span>1:09:45</span>
      </div>
      <p>精选好物</p>
      <div class="bottom-img">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
      </div>
    </li>
    <li @click="fun_GoRoute(-1)">
      <div class="top-img">
        <img src="@/assets/image/icon2/duomaihui.png" alt="">
        <span>1:09:45</span>
      </div>
      <p>多买多优惠</p>
      <div class="bottom-img">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
        <img src="https://shop.ihaosy.com/uploads/home/common/category-pic-1096.jpg" alt="">
      </div>
    </li>
  </ul>
</div>
</template>

<script>
// 双模块 倒数第二个 六个小商品
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';

export default {
	data(){
		return{
		}
	},

	computed:{
		...mapState({
		}),
	},

	methods:{
		// 点击跳转
		fun_GoRoute(obj){
      ( obj === -1 ) ? (
        Toast('该功能暂未开放')
      ):(
        this.$router.push(obj)
      );
		},		
		
	},
}
</script>

<style scoped lang="scss">
.main-banner2{
  $bor:0px;
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  width: 7.10rem;
  margin: 0 auto;
  border-radius: .10rem;
  border: $bor solid wheat;
  
  // 长条活动
  .banner{
    width: 7.1rem;
    height: 1.48rem;
    border-radius: .10rem;
    border: $bor solid wheat;
    margin: 0.2rem auto;
    background: wheat;
  }
  >ul{
    height: 100%;
    display: flex;
    height: fit-content;
    justify-content: space-between;
    flex-wrap: wrap;
    >li{
      width: 3.45rem;
      height: 2.25rem;
      background: #FFFFFF;
      box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
      border-radius: .10rem;
      padding: 0.2rem;
      img{
        width: 0.83rem;
        height: 0.33rem;
      }
      &:first-child{
        img{
          width: 1.32rem;
          height: 0.31rem;
        }
      }
      .top-img{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: flex-start;
        font-size: .22rem;
        font-weight: 500;
        color: #666666;
        span{
          transform: translateY(-.05rem);
        }
      }
      >p{
        font-size: .24rem;
        font-weight: 500;
        color: #D83A15;
        margin: 0.2rem 0;
      }
      .bottom-img{
        height: .70rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        img{
          width: .70rem;
          height: .70rem;
          border-radius: .10rem;
        }
      }
    }
  }
}
</style>