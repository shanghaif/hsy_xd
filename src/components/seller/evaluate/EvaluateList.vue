<template>
<div class="container evaluate_list">
    <!-- <div class="common-header-wrap">
        <mt-header title="评价管理" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div> -->
    <head-title title="评价管理" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
    <div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div v-if="evaluate_list.length > 0">
        <div class="item"
          v-for="(item, index) in evaluate_list" :key="index"
          @click="fun_goReply(item)"
          >
          <!-- 左侧图片 -->
          <img class="item_img" :src="item.geval_goodsimage_url"/>
          <!-- 中间详细 -->
          <div class="info">
            <p class="title">{{item.geval_goodsname}}</p>
            <p class="user">
              <span>用户评价:</span>
              {{item.geval_content}}</p>
            <div class="explain" v-if="item.geval_explain">
              <span>我的回复:</span>
              {{item.geval_explain}}</div>
            <p class="buyer">
              {{item.geval_frommembername}}
              发表于
              {{ $moment.unix(item.geval_addtime).format('YYYY年MM月DD日') }}
            </p>
          </div>
          <!-- 右侧点击 -->
          <div class="scores">
            <span>{{item.geval_scores}}.0</span>
            <img v-if="!item.geval_explain" src="@/assets/image/icon2/icon-right-black.png" alt="">
          </div>
        </div>
      </div>
      <empty-record v-else></empty-record>
    </div>
    <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div  v-if="evaluate_list.length > 0">
        <div class="mb-10 evaluate-item"  v-for="(item, index) in evaluate_list">
            <div class="evaluate-info">
                <div class="p-img">
                    <img :src="item.geval_goodsimage_url"/>
                    <span class="common-score-wrapper"><i class="iconfont front" :style="{width:item.geval_scores/5*100+'%'}"></i><i class="iconfont back"></i></span>
                </div>
                <div class="p-info">
                    <div class="name">{{item.geval_content}}</div>
                    <div class="explain">{{item.geval_explain}}</div>
                </div>
            </div>
            <div class="evaluate-btn">
                <div class="buyer-info">{{item.geval_frommembername}} 发表于 {{ $moment.unix(item.geval_addtime).format('YYYY年MM月DD日') }}</div>
                <div class="btn-wrapper">
                  <mt-button size="small" type="primary" class="btn" v-if="!item.geval_explain" @click="goExplain(item.geval_id)">解释</mt-button></div>
            </div>
        </div>
        </div>
        <empty-record v-else></empty-record>
    </div> -->
</div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui'
import EmptyRecord from '../../../components/EmptyRecord'
import { getEvaluateList, addExplain } from '../../../api/sellerEvaluate'

import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle';

export default {
  name: 'Goodsonline',
  data () {
    return {
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多
      pageTotal: 1, // 总页数
      evaluate_list: [], // 商品列表
      keyword: '',
      goods_type: '',
      search_type: ''

    }
  },
  components: {
    EmptyRecord,
    'head-title':HeadTitle
  },
  created () {
  },

  mounted(){
    resetRem();
  },

  beforeDestroy(){
    resumeRem();
  },

  methods: {
    //  去  回复页面
    fun_goReply(item){
      if( !item.geval_explain ){
        this.$router.push({ name:"SellerEvaluateReply", query:{geval_id:item.geval_id}});
      }
    },

    setOrderNavActive (index) {
      this.goods_type = index
      this.reload()
    },
    getGoodsList (ispush) {
      Indicator.open()
      let params = this.params
      getEvaluateList(params).then(res => {
        Indicator.close()

        if (ispush) {
          this.evaluate_list = this.evaluate_list.concat(res.result.goodsevallist)
        } else {
          this.evaluate_list = res.result.goodsevallist
        }
        this.pageTotal = res.result.page_total
        if (res.result.hasmore) {
          this.isMore = true
        } else {
          this.isMore = false
        }
      })
    },
    loadMore () {
      this.loading = true
      this.params.page = ++this.params.page
      if (this.isMore && this.params.page <= this.pageTotal) {
        this.loading = false
        this.getGoodsList(true)
      }
    },
    goExplain (geval_id) {
      MessageBox.prompt('请输入解释', '').then(({ value, action }) => {
        addExplain(geval_id, value).then(res => {
          Toast(res.message)
          this.$router.go(0)
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    reload () {
      // 重新加载数据
      this.params.page = 0
      this.isMore = true
      this.evaluate_list = []
      this.loadMore()
    }
  }
}
</script>

<style scoped lang="scss">
    .order-header {
        position: fixed;
        height: 2.2rem;
        width: 100%;
        top: 2.2rem;
        z-index: 100;
        ul {
            list-style: none;
            width: auto;
            display: flex;
            justify-content: space-around;
            align-content: center;
            align-items: center;
            height: 100%;
            background: rgba(255, 255, 255, 1);
            border-bottom: 1px solid #e8eaed;
            li {
                font-size: 0.7rem;
                color: #333;
                height: 100%;
                text-align: center;
                line-height: 2.2rem;
                border-bottom: 0.1rem solid transparent;
                &.active {
                    color: $primaryColor;
                    border-bottom-color: $primaryColor;
                }
            }
        }
    }
    .evaluate-item{background:#fff;}
    .evaluate-info{padding:.5rem;display: flex}
    .evaluate-info .p-img{width:4rem;}
    .evaluate-info .p-img img{width:4rem;height:4rem;}
    .evaluate-info .p-info{flex:1;margin-left:1rem;}
    .evaluate-info .p-info .name{font-size:0.7rem;}
    .evaluate-info .p-info .explain{font-size:0.7rem;color:$primaryColor;margin-top:.5rem}
    .evaluate-btn{padding:.5rem;border-top:1px solid #e4e4e4;display: flex}
    .evaluate-btn .btn-wrapper{width:3rem;}
    .evaluate-btn .btn{float: right}
    .evaluate-btn .buyer-info{flex:1;font-size:.7rem;line-height:1.65rem}

.evaluate_list{
  div{
    box-sizing: border-box;
  }
  .cont{
    padding-left: 1.43rem;
    .item{
      padding: 1rem 0;
      display: flex;
      color: #161616;
      font-size: 1.32rem;
      padding-right: 1.43rem;
      
      border-top: 1px solid #e4e4e4;

      .item_img{
        width:7.78rem;
        height: 7.78rem;
        border: 1px solid #f1f1f1;
        border-radius: 10px;
        flex-shrink: 0;
      }
      .info{
        width: 66%;
        padding-left: 2%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;

        span{
          color: #666;
        }
        
        .title{
          font-size:1.6rem;
        }
        .user{
          color: #999;
          word-wrap: break-word;
        }

        .explain{
          color: #FC6750;
          word-wrap: break-word;
        }

        .buyer{
          font-size: 1.22rem;
          color: #6F6F6F;
        }
      }

      .scores{
        flex-grow: 1;
        font-size: 1.36rem;
        color: #E63116;
        height: 7rem;
        line-height: 7rem;
        display: flex;
        align-items: center;

        img{
          width: 1.56rem;
        }
      }
    }
  }
}
</style>
