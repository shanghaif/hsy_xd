<template>
  <div class="discount hsy_main">
		<!-- 背景墙 -->
    <img class="top_bg" src="@/assets/image/icon2/discount.png" alt="">
    <!-- 头部 -->
    <div class="head_title_cont">
        <img class="left" @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
        <img src="@/assets/image/icon2/discount_tit.png" alt="">
        <span></span>
    </div>

    <!-- 主体 -->
    <div class="cont" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="item" v-for="(item, index) in goodsList" :key="index"
        @click="goDetail(item.goods_id)"
        >
        <img :src="item.image_url" alt="" />
        <div class="list-right">
          <p>{{item.goods_name}}</p>
          <span class="color">满{{item.xianshigoods_lower_limit}}件{{item.xianshi_discount}}优惠</span>
          <div class="price">           
            <span class="nowP">￥{{item.xianshigoods_price}}</span>
            <s>￥{{item.goods_price}}</s>
          </div>
          <div class="go_pay">立即购买</div>
        </div>
      </div>
      <div class="loading-wrapper" v-if="goodsList.length <= 0">
        <!-- <p class="common-no-more" v-if="!isMore">没有更多了</p> -->
        <empty-record v-if="!isMore"></empty-record>
        <mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import '@/assets/style/hsy-mint.scss';
import { getXianshiList } from '../../../api/homepromotion';

import EmptyRecord from '../../EmptyRecord.vue';

export default {
	components: {
    HeadTitle,
    EmptyRecord
  },
  data(){
    return{
      loading: false,
      isMore: true,
      goodsList: [],
			params: {
				page: 0,
				// pagesize:10
			},

    }
  },

	mounted() {
		resetRem();
  },
  
	beforeDestroy() {
		resumeRem();
  },

  methods:{
    // form_id，入口，0无，1折扣，2抢购
    // terminal_id，终端，1APP，2公众号
		goDetail(goods_id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id ,form_id: 1 } });
		},
    
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			// this.params.pagesize = this.params.pagesize + 10;
			if (this.isMore) {
				this.loading = false;
				this.getGoodsList(true);
			}
		},
		getGoodsList(ispush) {
			var that = this;
			getXianshiList(that.params).then(
				response => {
					// console.log(res);
					if (ispush) {
						that.goodsList = that.goodsList.concat(response.result.goods_list);
					} else {
						that.goodsList = response.result.goods_list;
					}
					that.isMore = response.result.hasmore;
				},
				error => {
					Toast(error);
				}
			);
    },
  }
  
}
</script>

<style scoped lang="scss">
.discount{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F4F5F7;

  div{
    box-sizing: border-box;
  }

  .top_bg{
    width: 100%;
    height: 20vh;
    position: fixed;
    top: 0;
  }


  
  .head_title_cont{
    // flex-grow: 0;
    background: transparent;
    height: 3.74rem;
    padding: .8rem 1.43rem;
    position: relative;
    z-index: 1;
    box-sizing: border-box;

    display: flex;
    background: transparent;
    justify-content: center;
    .left{
      position: absolute;
      left: 1.43rem;
      top: 1rem;
      box-sizing: border-box;
      width: 1.74rem;
      height: 1.74rem;
    }
    img {
      width: 5rem;
      height: 2rem;
    }
  }

  .cont{
    flex: 1;
    width: 100vw;
    overflow-y: scroll;
    position: relative;
    .item {
      // width: 94vw;
      background-color: #fff;
      margin: 1.4rem 1.3rem;
      padding: .8rem;
      border-radius: 0.69rem;
      display: flex;
      box-sizing: border-box;

      img {
        border-radius: 0.7rem;
        // width: 10rem;
        // height: 10rem;
        width: 32vw;
        height: 32vw;
        margin-bottom: 0.26rem;
      }
      .list-right {
        // flex: 1;
        width: 67%;
        height: 32vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-direction: column;
        margin-left: auto;
        padding: .5rem .8rem;
        position: relative;

      .color{
        padding: 0rem .5rem;
        margin-top: 1rem;
        border-radius: 5px;
        border: 1px solid #E53216;
        color: #E53216;
        width: fit-content;
      }

      .price{
        font-size: 1.78rem;
        color: #E53216;
        s{
          margin-left: .5rem;
          font-size: 1.3rem;
          color: #C6C6C6;
        }
      }

        p{
          font-size: 1.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #161616;
          font-weight: 500;
        }

        .go_pay{
          padding: .5rem .6rem;          
          background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
          border-radius: 27px;
          color: #fff;
          position: absolute;
          right: 1rem;
          bottom: 0.5rem;

        }
      }
    }
  }
}
</style>