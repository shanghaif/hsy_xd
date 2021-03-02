<!-- 商品详情 -->
<template>
    <div>
    <div class="product-detail-wrapper" v-if="ifLoad">
        <!-- header  -->
        <detail-header v-if="!isPreviewPicture"></detail-header>
        <!-- body -->
        <detail-body :isStock="productDetail.goods_storage"></detail-body>
        <!-- footer -->
        <detail-footer v-if="!isPreviewPicture"></detail-footer>
        <!-- 预览图片 -->
        <preview-picture
                v-if="isPreviewPicture"
                :defaultindex="swipeId"
                :isshow="isPreviewPicture"
        ></preview-picture>
        <!-- 促销信息 -->
        <promotion-popup
                v-if="promoPopstatus"
                :promo-popstatus="promoPopstatus"
        ></promotion-popup>
    </div>
    <div class="pre-load-wrapper" v-else><img src="data:image/gif;base64,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rF5Bgb3Lt+7ZtGv7Cn4bV642uoMTi837aa/ix1f/hlILuTJVuIYPS7XMmbEnx5wfSwZFOfRjzJmxITb92HMn0KwFj/5UOrZg1KmtrbYt2DUn2LztzvZUO7hd3Lmp7TZu1/cm4MzZDu9UPDpb5MmlLbfO1rkm6NzNop0cODxZ7NmhbTe/mGd59lync6oOXyv69M7W18/qPRP4/VbJtwl9AFp1H37M6FdgVf1h8t+CVQioCYEQVnEggsooWGGDlzy4oISZUAjhhRgioyGEHFriYYEgYiLigiSWaMyJC6ZYyYoAtnjJiwXGKCMxNBZoIyU47qejJTwC6OP/j8IECeCQkxRZ35GVJLnfkkwC4+R+UEoiJXxUUmJlfVhm6cuW9XUZyZfshTnJmPCVaSYvaMKnJiRsmuemJHCyJ+ecutTJ3p2P5BnenpH0ad6fgOIiqHmEOmIod4hComh4jDZqSwUuEODpp6CGKuqopJZqaqmRNtLTqay26iqrOAiRlgGv1mqrqwYUpmkxAUDg66/ABivssMQWa6yxFYy0wbHMNusssw9QwNOyz1ZrbbMbyLDrttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwBX0sHABBds8MEOJKzwwgw37PDDEEcs8cQUV2zx/8UYZ6zxxhx37PHHIIcs8sgkl1zxCCinrPLKLCdhwMswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300jqT4PTTUEcdNQoVVm311VhnrfXWXHft9ddghy322GSXbfbZaKet9tpst+3223DHLffcdNdt991456333nz37fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556CHLvropJdu+umop6766qy37vrrsMcu++y012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/334Icv/v/45Jdv/vnop6/++uy37/778Mcv//z012///fjnr//+/Pfv//8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygBCdIwQpa8IIYzKAGN8jBDnrwgyAMoQhHSMISmvCEKEyhClfIwha68IUwjKEMZ0jDGtrwhjjMoQ53yMMe+vCHQAyiEIdIxCIa8YhITKIS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" class="pre-load"></div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import DetailHeader from './DetailHeader'
import DetailBody from './DetailBody'
import DetailFooter from './DetailFooter'
import PreviewPicture from './child/PreviewPicture'
import PromotionPopup from './child/PromotionPopup'

// import { scoreGet } from '../../api/score'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      cartNumber: 0,
      productId: this.$route.query.goods_id ? this.$route.query.goods_id : '',
      hideFooter: false,
      popupVisible: true,
      currentScore: 0,
      bargain_id: this.$route.query.bargain_id,
      ifLoad:false,
    }
  },

  components: {
    DetailHeader,
    DetailBody,
    DetailFooter,
    PreviewPicture,
    PromotionPopup
  },

  created () {
    let extra = {}
    if (this.bargain_id) {
      extra['bargain_id'] = this.bargain_id
    }
    this.getGoodsDetail({ goods_id: this.productId, token: this.token, extra: extra }).then(res=>{
      this.ifLoad=true
    }).catch(error => {
      Toast(error.message)
    })
    this.saveCartState(false)
  },

  computed: mapState({
    productDetail: state => state.goodsdetail.detailInfo,
    currentProductId: state => state.goodsdetail.currentProductId,
    token: state => state.member.token,
    isPreviewPicture: state => state.goodsdetail.isPreviewPicture,
    swipeId: state => state.goodsdetail.swipeId,
    promoPopstatus: state => state.goodsdetail.promoPopstatus,
    config: state => state.config.config
  }),

  mounted () {
    this.$nextTick(() => {})
  },

  beforeRouteUpdate (to, from, next) {
    next()
    window.location.reload()
  },

  methods: {
    ...mapMutations({
      saveCartState: 'saveCartState'
    }),
    ...mapActions({
      fetchConfig: 'fetchConfig',
      getGoodsDetail: 'getGoodsDetail'
    }),
    loadConfig (imgUrl, desc, link) {
      this.fetchConfig().then(
        response => {
          let wechat = response.config['wechat.web']
          // let openid = this.$cookie.get('o')
          // 微信已授权
          if (wechat) {
            this.setWechatConfig(wechat, imgUrl, desc, link)
          }
        },
        error => {}
      )
    },
    setWechatConfig (config, imgUrl, desc, link) {
      this.wxApi.wxRegister(config, '商品详情', imgUrl, desc, link)
    }
  }
}
</script>

<style lang="scss" scoped>
    .product-detail-wrapper {
        height: 100%;
        width: auto;
    }
    .pre-load-wrapper{position:fixed;top:0;bottom:0;left:0;right:0}
    .pre-load{width:100%;height:100%}
</style>
