<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 10:09:43
-->
<template>
<div class="advert">
  <!-- 模块 广告 -->
  <div class="exercise">
    <!-- 左侧 大图 -->
    <div>      
      <mt-swipe class="swiper-wrapper" :showIndicators="true" :auto="3500">
        <mt-swipe-item v-for="(item, index) in g_ads" :key="index">
          <img v-lazy="item.adv_code" v-if='item.adv_code' @click="fun_GoDetails(item)">
          <img src="../../../assets/image/home/default_image_banner.png" v-else>
          <p>{{item.adv_title}}</p>
          <div class="swiper-div">
            <span>立即抢购</span>
            <div>
              <span>GO</span>
              <span class="icon iconfont">&#xe60e;</span>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 右侧上下 小图 -->
    <ul>
      <li @click="fun_GoRoute( { name: 'HomeSnapUp' } )">
        <div class="top-img">
          <img src="@/assets/image/icon2/miaosha.png" alt="">
          <ul>
            <li>{{nowDate[0]}}</li>
            <li>:</li>
            <li>{{nowDate[1]}}</li>
            <li>:</li>
            <li>{{nowDate[2]}}</li>
          </ul>
        </div>
        <div class="bottom-img">
          <div>
            <p>精选好物</p>
            <div>立即抢购</div>
          </div>
          <img src="@/assets/image/main-2.png" alt="">
        </div>
      </li>
      <li @click="fun_GoRoute( { name: 'HomeDiscount' } )">
        <div class="top-img">
          <img src="@/assets/image/icon2/duomaihui.png" alt="">
          <!-- <span>{{new Date(new Date().getTime()+9999999).toTimeString().slice(0,8)}}</span> -->
          <ul>
            <li>{{endDate[0]}}</li>
            <li>:</li>
            <li>{{endDate[1]}}</li>
            <li>:</li>
            <li>{{endDate[2]}}</li>
          </ul>
        </div>
        <div class="bottom-img">
          <div>
            <p>精选好物</p>
            <div>立即抢购</div>
          </div>
          <img src="@/assets/image/main-1.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'mint-ui';

export default {
	data(){
		return{
      startDate:0,
      nowDate:[],

      Timer:null,
		}
	},

	computed:{
		...mapState({
      g_ads: state=>state.home.g_ads,  // 左侧 轮播
		}),

    endDate(){
      return (new Date(new Date().getTime()+7776999).toTimeString().slice(0,8)+'').split(':')
    }
  },

  created(){
    this.startDate = new Date().getTime()+999899999+Math.floor(Math.random()*100000);
    
    this.Timer = setInterval(()=>{
      var bnow = new Date().getTime();
      this.nowDate = this.formatDuring(new Date(this.startDate-bnow).getTime())
    },1000);
  },

  beforeDestroy(){
    clearInterval(this.Timer);
    this.Timer = null;
  },
  

	methods:{
		// 点击跳转
		fun_GoRoute(obj){
      this.$router.push(obj)
    },
    
    // 查看详情
		fun_GoDetails(obj) {
      // console.log(obj.adv_type);
      if( obj.adv_type == 'goods' ){
        var goods_id = obj.adv_typedate.split('goodsdetail?goods_id=')[1];
			  this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
      }else if (  obj.adv_type == 'store' ){
        var store_id = obj.adv_typedate.split('store_goodslist?id=')[1];  
        this.$router.push({ name: 'HomeStoreGoodslist', query: { id: store_id } });  
      }else{
        Toast("活动马上开启");
      }
    },	

    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
      return [hours,minutes,seconds]
    }
		
	},
}
</script>

<style scoped lang="scss">
.advert{
  $bor:0px;
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  // 模块 活动
  .exercise{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 7.1rem;
    margin: 0 auto;
    height: 4.8rem;
    height: 4.06rem;
    border: $bor solid royalblue;

    &/deep/.mint-swipe-indicators{
      bottom: -0.1rem;
      bottom: 0;
      display: none;
      .mint-swipe-indicator{
        width: 0.1rem;
        height: 0.1rem;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: 0.2;
        margin: 0 0.04rem;
      }
      .is-active{
        background: #B52503;
        opacity: 0.8;
      }

    }
    
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      margin:  0 auto;
      border-radius: .2rem;
      overflow: hidden;

      font-size: .34rem;
      font-weight: bold;
      color: #333333;
      img{
        width: 3.45rem;
        height: 2.63rem;
      }

      p{
        margin: 0.2rem;        
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .swiper-div{
        display: flex;
        justify-content: flex-start;
        padding:0 0.2rem;
        span{
          font-size: .28rem;
          font-weight: 500;
          color: #333333;
        }
        >div{
          margin-left: 0.2rem;
          width: .96rem;
          height: 0.42rem;
          background: #D83A15;
          box-shadow: 0px 0px .16rem 0px rgba(216, 58, 21, 0.52);
          border-radius: .21rem;
          display: flex;
          justify-content: center;
          align-items: center;
          >span{
            font-size: .24rem;
            font-weight: 500;
            color: #FFFFFF;
          }
        }

      }
    }


    >div{
      background: #fff;
      width: 3.45rem;
      height: 4.80rem;
      height: 100%;
      border-radius: .10rem;
    }
    >ul{
      width: 3.45rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      >li{
        width: 100%;
        height: 2.3rem;
        height: 1.93rem;
        background: #FFFFFF;
        box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
        border-radius: .10rem;
        padding: 0.2rem;
        padding-bottom: 0;
        img{
          width: 0.83rem;
          height: 0.33rem;
          margin-right: 0.1rem;
        }
        &:first-child{
          img{
            width: 1.32rem;
            height: 0.37rem;
            margin-right: 0.1rem;
          }
        }
        .top-img{
          display: flex;
          justify-content: space-between;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          font-size: .22rem;
          font-weight: 500;
          color: #666666;
          >ul{
            // transform: translateY(-.05rem);
            display: flex;
            li:nth-child(even){
              width: 0.16rem;
              height: 0.33rem;
              background: #fff;
              text-align: center;
            }
            li:nth-child(odd){
              width: 0.33rem;
              height: 0.33rem;
              background: #D83A15;
              border-radius: 0.06rem;
              text-align: center;

              font-size: 0.22rem;
              font-weight: 500;
              color: #FFFFFF;

              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .bottom-img{
          height: .70rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          position: relative;
          >div{                
            >p{
              font-size: .24rem;
              font-weight: 500;
              color: #D83A15;
              margin: 0.2rem 0;
            }
            >div{
              text-align: center;
              width: 1.35rem;
              height: .41rem;
              line-height: .41rem;
              background: #D83A15;
              box-shadow: 0px 0px .16rem 0px rgba(216, 58, 21, 0.52);
              border-radius: .21rem;
              font-size: .24rem;
            }
          }
          img{
            width: 1.68rem;
            height: 1.32rem;
            position: absolute;
            position: absolute;
            top: 0.1rem;
            right: -0.2rem;
          }
        }
      }
    }
  }
}
</style>