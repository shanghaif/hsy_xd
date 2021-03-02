<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 15:52:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 10:39:59
-->

<template>
<div class="main-content">
  <div class="list" 
    v-for="(obj,index) in items" :key='index'
    @click="fun_GoDetails(obj)"
    >
    <img :src="obj.goods_img_480" alt="">
    <div class="con">{{obj.goods_name}}</div>
    <!-- <div class="con" v-if="index%7==0">测试测试测试</div>
    <div class="con" v-if="index%3==0">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
    <div class="con" v-if="index%3==0">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div> -->
    <div class="bot">
      <p>
        <span>￥</span>
        <span>{{obj.goods_promotion_price}}</span>
      </p>
      <span class="icon iconfont">&#xe6ae;</span>
    </div>
  </div>
</div>
</template>

<script>
// 商品列表详情
import { mapState } from 'vuex';
export default {
  props:['items'],
	data(){
		return{
		}
	},

	computed:{
		...mapState({
		}),
	},

	methods:{
    // 查看详情
		fun_GoDetails(obj) {
      // 记住是 当前 滚动 状态 
      this.$emit('getScrollTop','');
      // console.log(obj);
      // alert('你好');
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: obj.goods_id } });
    },
    
	},
}
</script>

<style scoped lang="scss">
.main-content{
  $bor:0px;
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  // width: 6.9rem;
  // margin: 0 auto;
  // box-sizing: border-box;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  width: 7.5rem;
  padding: .30rem;
  box-sizing: border-box;
  column-count: 2;   // 两行    
  column-gap: 0.3rem;// 列间距
  .list {
    break-inside: avoid;
    width: 3.30rem;
    border: $bor solid red;
    overflow: hidden;

    width: 3.30rem;
    // height: 5.22rem;
    background: #FFFFFF;
    box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
    border-radius: .10rem;
    margin-bottom: 0.3rem;
    padding-bottom: 0.2rem;

    img{
      width: 100%;
      border: 0.1rem;
    }
    .con{
      width: 2.67rem;
      margin: 0.2rem auto;
      font-size: .30rem;
      font-weight: 500;
      color: #333333;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      -webkit-box-orient: vertical;
      box-orient: vertical;
      overflow: hidden;
    }
    .bot{
      width: 2.67rem;
      height: 0.32rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      p{
        display: flex;
        align-items: flex-end;
        font-size: 0.24rem;
      }
      span{
        font-size: .26rem;
        font-weight: 500;
        color: #D00303;
      }
      .icon{
        font-size: 0.36rem;
      }
    }
  }

  padding: 0 0.2rem 0.2rem 0.2rem;
  column-gap: 0.2rem;// 列间距
  .list{
    width: 3.45rem;
    margin-bottom: 0.2rem;  
  }
  
  
}
</style>