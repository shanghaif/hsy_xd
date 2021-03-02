<template>
<div class="container">
    <div class="common-header-wrap">
        <mt-header title="商品管理" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            <mt-button slot="right" @click="goods_add">新增</mt-button>
        </mt-header>
    </div>

    <!-- header -->
    <div class="order-header">
        <div class="seller-search">
            <div class="common-search">
                <mt-field placeholder="请输入您要搜索的商品" v-model="keyword"></mt-field>
            </div>
            <div class="slot iconfont" @click="getGoodsList()">&#xe629;</div>
        </div>
        <ul>
            <li
                    class="item"
                    v-for="item in orderNav"
                    v-bind:key="item.id"
                    v-bind:class="{ active: goods_type == item.id }"
                    v-on:click="setOrderNavActive(item.id)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
    <div class="mt-50" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div  v-if="goodsList.length > 0">
        <div class="mb-10 goods-item"  v-for="(item, index) in goodsList">
            <div class="goods-info">
                <div class="p-img">
                    <img :src="item.goods_image"/>
                </div>
                <div class="p-info">
                    <div class="name">{{item.goods_name}}</div>
                    <div class="price">{{item.goods_price}}</div>
                    <div class="stock">库存:{{item.goods_storage_sum}}</div>
                </div>
            </div>
            <div class="goods-btn">
                <mt-button size="small" type="primary" class="mr-10" @click="goods_edit(item.goods_commonid,item.gc_id)">编辑</mt-button>
                <mt-button size="small" type="primary" class="mr-10" @click="goods_image(item.goods_commonid)">图片</mt-button>
                <mt-button size="small" type="primary" class="mr-10" v-if="item.goods_state === 0" @click="goods_show(item.goods_commonid)">上架</mt-button>
                <mt-button size="small" type="primary" class="mr-10" v-if="item.goods_state === 1" @click="goods_unshow(item.goods_commonid)">下架</mt-button>
                <mt-button size="small" type="danger" class="mr-10" @click="drop_goods(item.goods_commonid)">删除</mt-button>
            </div>
        </div>
        </div>
        <empty-record v-else></empty-record>
    </div>
</div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui'
import EmptyRecord from '../../../components/EmptyRecord'
import { getGoodsList, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods'

export default {
  name: 'Goodsonline',
  data () {
    return {
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多
      pageTotal: 1, // 总页数
      goodsList: [], // 商品列表
      keyword: '',
      goods_type: '',
      search_type: '',
      orderNav: [
        {
          'name': '出售中',
          'id': ''
        },
        {
          'name': '仓库中',
          'id': 'offline'
        },
        {
          'name': '待审核',
          'id': 'waitverify'
        },
        {
          'name': '违规商品',
          'id': 'lockup'
        }
      ]
    }
  },
  components: {
    EmptyRecord
  },
  created () {
  },
  methods: {
    goods_add () {
      this.$router.push({ name: 'SellerGoodsForm1' })
    },
    goods_image (commonid) {
      this.$router.push({ name: 'SellerGoodsForm3', query: { commonid: commonid } })
    },
    goods_edit (commonid, class_id) {
      this.$router.push({ name: 'SellerGoodsForm2', query: { commonid: commonid, class_id: class_id } })
    },
    setOrderNavActive (index) {
      this.goods_type = index
      this.reload()
    },
    getGoodsList (ispush) {
      Indicator.open()
      let params = this.params
      getGoodsList(params, this.keyword, this.goods_type, this.search_type).then(res => {
        Indicator.close()

        if (ispush) {
          this.goodsList = this.goodsList.concat(res.result.goods_list)
        } else {
          this.goodsList = res.result.goods_list
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
    // 商品上架
    goods_show (goods_id) {
      MessageBox.confirm('您确定要上架此商品吗？').then(action => {
        Indicator.open()
        goodsShow(goods_id).then(res => {
          Indicator.close()
          this.reload()
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    goods_unshow (goods_id) {
      MessageBox.confirm('您确定要下架此商品吗？').then(action => {
        Indicator.open()
        goodsUnshow(goods_id).then(res => {
          Indicator.close()
          this.reload()
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    drop_goods (goods_id) {
      MessageBox.confirm('您确定要下架此商品吗？').then(action => {
        Indicator.open()
        dropGoods(goods_id).then(res => {
          Indicator.close()
          this.reload()
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    reload () {
      // 重新加载数据
      this.params.page = 0
      this.isMore = true
      this.goodsList = []
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
.goods-item{background:#fff;}
.goods-info{height:4rem;width:96%;padding:2%;}
.goods-info .p-img{float:left}
.goods-info .p-img img{width:4rem;height:4rem;}
.goods-info .p-info{margin-left:4.5rem;}
.goods-info .p-info .name{height:2rem;line-height:1rem;font-size:0.7rem;overflow:hidden;}
.goods-info .p-info .price{color:red;line-height:1rem;font-size:0.7rem}
.goods-info .p-info .stock{line-height:1rem;font-size:0.5rem;color:#666}
.goods-btn{padding:1rem;}
.seller-search {display: flex;height: 1.6rem;padding: 0.35rem 0.3rem 0.35rem 0;justify-content: space-between;align-items: center;background: #fff;border-bottom: 1px solid #f5f5f5;.slot{width:1.6rem;font-size:1.2rem} }
.seller-search .mint-cell{min-height:0}
.seller-search .mint-cell:after{background-color:#fff!important;}
.common-search{flex:1;height:1.4rem}
.common-search input {box-sizing: border-box;width: 100%;height: 1.6rem;border-radius: 0.2rem;background: #EDEDED url(../../../assets/image/home/icon_search.png) no-repeat 0.6rem center;background-size:0.55rem;font-size:0.7rem;color: #999;padding-left:1.6rem;border: 0;}
.right{width:2.6rem;height: 1.6rem;}
</style>
