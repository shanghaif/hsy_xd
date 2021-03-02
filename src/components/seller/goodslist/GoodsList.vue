<template>
  <div class="category">
    <!-- <div class="common-header-wrap">
      <mt-header class="common-header" title="全部商品">
          <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
          <mt-button slot="right" size="small"
            style="width:2.6rem;height: 1.6rem;color:#fff" 
            type="primary" 
            @click="submitData">提交</mt-button>
      </mt-header>
    </div> -->
    <head-title title="全部商品"></head-title>
    <goods-list-body ref="mychild"></goods-list-body>
    <!-- <common-store-footer :store_id="store_id"></common-store-footer> -->
  </div>
</template>

<script>
import HeadTitle from '@/components/HeadTitle'
import GoodsListBody from './GoodsListBody'
export default {
  name: 'HomeGoodsclass',
  components: {
    // CommonStoreFooter,
    GoodsListBody,
    HeadTitle
  },
  methods: {
    submitData(){
      this.$refs.mychild.submit();
    }
  }
}
</script>

<style scoped lang='scss'>
  .product-list-header {
    display: flex;
    height:2rem;
    padding: 0 0.25rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
.slot{width:1.6rem;font-size:.8rem}
  }
  .common-search{
    flex:1;
    padding:0.4rem 0.6rem 0.4rem 0;
  }
  .common-search input {
    box-sizing: border-box;
    width: 100%;
    height:1.6rem;
    line-height:1.6rem;
    border-radius:0.2rem;
    background: #EDEDED ;
    background-size:0.55rem;
    font-size:0.7rem;
    color: #999;
    border: 0;
    padding-left:.5rem;
  }
  .buttom{width:2.6rem;height: 1.6rem;}
</style>
