<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 08:41:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 10:07:32
-->
<template>  
  <mt-swipe class="swiper-wrapper" :showIndicators="isShowIndicators">
    <mt-swipe-item v-for="(item, index) in items" :key="index">
      <img v-lazy="item.adv_code" v-if='item.adv_code' @click="goAdUrl(item)">
      <img src="../../../assets/image/home/default_image_banner.png" v-else>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  name: 'IndexBanner',
  data () {
    return {
    }
  },
  props: ['items'],
  computed: {
    isShowIndicators () {
      if (this.items && this.items.length > 1) {
        return true
      }
      return false
    }
  },
  methods: {
    goAdUrl (item) {
      switch (item.adv_type) {
        case 'goods':
          this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: item.adv_typedate } })
          break
        case 'store':
          this.$router.push({ name: 'HomeStoredetail', query: { id: item.adv_typedate } })
          break
        case 'article':
          this.$router.push({ name: 'HomeArticledetail', query: { article_id: item.adv_typedate } })
          break
        case 'url':
          window.location.href=item.adv_typedate
          break  
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-wrapper {
  width: 7.1rem;
  height: 2.90rem;
  margin:  0 auto;
  border-radius: .2rem;
  overflow: hidden;

  
  // width: 7.5rem;
  // border-radius: 0;
  img{
    width:100%;
    height:100%;
  }

  &/deep/.mint-swipe-indicators{
    bottom: 0;
  }
}
</style>
