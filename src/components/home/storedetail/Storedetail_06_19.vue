<template>
<div class="container">

    <div class="header" :style="{backgroundImage:'url('+store.mb_title_img+')'}">
        <div class="content-wrapper">
            <div class="avatar" @click="goStoreabout">
                <img :src="store.store_avatar">
            </div>
            <div class="content">
                <div class="store_name">{{store.store_name}}</div>
                <div v-if="(store.is_platform_store && config.business_licence) || store.business_licence_number_electronic" @click="imageVisible=true"><i class="iconfont">&#xe621;</i></div>
            </div>
            <div class="follow_panel">
                <div class="follow_button" @click="toggleFavorite" >
                    <i class="iconfont" :class="{'active':store.is_favorate}"  v-html="favoriteIco"></i>
                    {{favoriteName}}
                </div>
                <div class="follow_number">
                    {{store.store_collect}}人收藏
                </div>
            </div>
            <i class="header-more iconfont" @click="popupMore">&#xe680;<div v-if="showDot" class="dot"></div></i>
        </div>
        <div class="background">
            <img v-if="store.store_logo" v-lazy="store.store_logo" width="100%" height="100%">
            <img v-else v-lazy="store.store_logo" width="100%" height="100%">
        </div>
    </div>
    <header-more v-show="popupVisible" :showDot="showDot"></header-more>
    <mt-swipe class="mt-5" v-if="store.mb_sliders && store.mb_sliders.length" v-bind:style="getBannerStyle" :showIndicators="isShowIndicators">
        <mt-swipe-item v-for="(item, index) in store.mb_sliders" :key="index">
            <img :style="getBannerStyle" v-lazy="item.imgUrl" @click="goAd(item)">
        </mt-swipe-item>
    </mt-swipe>
    <store-product-list
            :items="rec_goods_list"
            v-if="rec_goods_list && rec_goods_list.length > 0"
    ></store-product-list>
    <common-store-footer :store_id="store.store_id"></common-store-footer>
    <mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup">
        <img v-if="store.business_licence_number_electronic" :src="store.business_licence_number_electronic">
        <img v-if="store.is_platform_store && config.business_licence" :src="config.business_licence">
    </mt-popup>

    <!-- 选择区域 -->
    <region-picker ref="picker"
      :closeModal="false"
      :valm="Area_id"
      v-on:onConfirm="onPickerConfirm"
      @onConfirmend="onConfirmend"
      ></region-picker>

    <div v-if="c_show" class="ui-form-area">
      <span>请选择社区团</span>
      <div class="ui-form-control register-form-select" @change="csel">   
        <select class="ui-form-input" v-model='tid'>	
          <option value=999>选择社区团</option> 
          <option v-for='(item,index) of c' :key='index' :value='item.member_id' >{{ item.tuan}}</option> 
        </select>
      </div> 
    </div>  
</div>
</template>

<script>
import { mapState,mapActions,mapMutations } from 'vuex'
import { Toast ,MessageBox } from 'mint-ui'
import CommonStoreFooter from '../common/CommonStoreFooter'
import { getStoreInfo } from '../../../api/homestoredetail'
import { getChatCount } from '../../../api/memberChat'
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite'
import StoreProductList from './StoreProductList'
import HeaderMore from '../../HeaderMore'


import RegionPicker from '../../../components/RegionPicker1'
import { tuanlist ,tuangc} from '../../../api/homesearch'

export default {
  name: 'Storedetail',
  data () {
    return {
        imageVisible:false,
      store: {
        store_id: this.$route.query.id ? this.$route.query.id : ''
      },
      rec_goods_list: false,
      popupVisible: false, // 弹出更多
      showDot:false,
      tid:"",
      c:[],
      c_show:false,
      varMarket:null
    }
  },
  components: {
    HeaderMore,
    StoreProductList,
    CommonStoreFooter,
    RegionPicker,
  },
  computed: {
    ...mapState({
      Area_id:state =>state.member.area_id,//用户收货地址
      tid1:state =>state.member.tid,
        config: state => state.config.config,
      token: state => state.member.token,
      isOnline:state => state.member.isOnline,
      sellerInfo:state => state.seller.info,//seller数据，用于查看商品信息
      memberInfo:state => state.member.info,//member数据，用于查看商品信息
      areaId:state => state.member.area_id,//member数据，用于查看商品信息
      tuan:state =>state.member.tuan,//社区团
      market:state =>state.homecart.market,      
      mclass:state => state.member.mclass,
    }),
    getBannerStyle: function () {
      const { width } = window.screen
      let itemWidth = width
      let itemHeight = width * (94.0 / 188.0)
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
    isShowIndicators () {
      if (this.store.mb_sliders && this.store.mb_sliders.length > 1) {
        return true
      }
      return false
    },
    favoriteIco () {
      return this.store.is_favorate ? '&#xe64d;' : '&#xe64e;'
    },
    favoriteName () {
      return this.store.is_favorate ? '已收藏' : '收藏'
    }
  },
  created () {
    this.tid = this.tid1;
    if(this.mclass != (1||2)){      
      this.loading();
    }else if( !this.areaId && !this.market ){
      MessageBox({
        closeOnClickModal:false,//点击灰色禁止关闭
        title: '温馨提示',
        message: '普通会员查看商品类型',
        showCancelButton: true,
        confirmButtonText:"零售商品",
        cancelButtonText:"团购商品"
      }).then(action => {
        if(action == 'confirm'){
          // console.log('零售')
          this.saveHomecartMarket("l");
          this.varMarket = "l"
          this.onRegion();
          // this.loading();
        }else{
          // console.log('团购')
          this.saveHomecartMarket("c");
          this.varMarket = "c";
          this.c_show = true;
          // this.loading();
          this.onRegion();
        }
      })
    }else{
      this.varMarket = this.market;
      this.loading();
    }
    
  },
  methods: {
    ...mapActions({
      fetchConfig: 'fetchConfig'
    }),
    ...mapMutations({      
      membertuans: 'memberTuans',
      memberSetTarea:"memberSetTarea",
      memberSaveArea_id:"memberSaveArea_id",      //保存收货地址
      saveHomecartMarket: 'saveHomecartMarket',//修改 来自于哪个市场
      memberSaveTuan:"memberSaveTuan",//修改社区团
    }),
    onRegion (picker, values) {
      this.$refs.picker.currentValue = true
    },
    onConfirmend(){//选择地区  取消
      Toast("请选择地区");
      this.$refs.picker.currentValue = true      
    },
    onPickerConfirm (values) {
      console.log([values[2].area_id,this.getRegionStr(values)]);
      this.memberSaveArea_id([values[2].area_id,this.getRegionStr(values)]);
      if( !this.c_show ){
        this.loading();
        return
      }else{
        this.memberSetTarea([this.getRegionStr(values),values[2].area_id]);
        tuanlist(this.Area_id, this.token).then(res => {
          this.c=res.result
          // console.log(this.c)
        })
      }
    },
    getRegionStr (values) {
      let title = ''
      for (let i = 0; i < values.length; i++) {
        const element = values[i]
        if (i !== 0) {
          title = title + ' ' + element.area_name
        } else {
          title = title + element.area_name
        }
      }
      return title
    },
    csel(){
      // this.memberSaveTuan(this.tid);
      console.log(this.c,arguments);
      for(var i =0;i<this.c.length;i++){
        if(this.c[i].member_id == this.tid){
          this.memberSaveTuan(this.c[i].tuan);
          // return;
        }
      }
      this.loading();
      this.c_show = false;
      console.log(123456);
      tuangc(this.tid, this.token).then(res => {
        var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
        var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
        // this.tcids=sa
        // this.tsids=sa1
        // this.$refs.tuan.tcids=sa
        this.membertuans({tid:this.tid,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:2})
      //	this.$forceUpdate()
      console.log(this.tsids)
      })
    },
    loading(){
      // return false;
      var seller_id = null,member_id = null;
      if(this.sellerInfo){
        seller_id = this.sellerInfo.seller_id
      }
      if(this.memberInfo){
        member_id = this.memberInfo.member_id
      }
      console.log('market',this.varMarket);
      // return false;
      getStoreInfo(
        this.store.store_id,
        this.token,
        member_id,
        seller_id,
        this.varMarket,
        this.areaId,
        this.tuan
      ).then((res) => {
        this.store = res.result.store_info
        this.rec_goods_list = res.result.rec_goods_list
          if(this.store.is_platform_store){
              this.fetchConfig({}).then(
                  response => {
                  },
                  error => {
                      Toast(error.message)
                  }
              )
          }
      }).catch(function (error) { })
      if(this.isOnline){
        getChatCount().then(res=>{
          if(res.result){
            this.showDot['chat']=true
          }
        })
      }
    },
    goAd (item) {
      if (item.type === 2) {
        this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: item.link } })
      } else {
        window.location.href = item.link
      }
    },
    goStoreabout: function () {
      this.$router.push({ name: 'HomeStoreabout', query: { id: this.$route.query.id } })
    },
    // 弹出更多
    popupMore () {
      if (!this.popupVisible) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
    },
    // 切换收藏
    toggleFavorite () {
      if (!this.store.is_favorate) {
        addFavoriteStore(this.store.store_id).then(
          response => {
            Toast(response.message)
            this.store.is_favorate = !this.store.is_favorate;
            this.store.store_collect += 1;
          },
          error => {
            Toast(error.message)
          }
        )
      } else {
        delFavoriteStore(this.store.store_id).then(
          response => {
            Toast(response.message)
            this.store.is_favorate = !this.store.is_favorate;
            this.store.store_collect -= 1;
          },
          error => {
            Toast(error.message)
          }
        )
      }
    }
  }

}
</script>

<style scoped>
.dot{position:absolute;width:.5rem;height:.5rem;background:red;border-radius:50%;top:.2rem;right:0;}
    .header {background: rgba(7,17,27,.5);color: #fff;overflow: hidden;position: relative;background-position: center;background-size: auto 100%;}
    .header .content-wrapper {-ms-flex-align: center;-webkit-box-align: center;align-items: center;display: -webkit-box;display: -ms-flexbox;display: flex;padding:0.8rem 0.5rem;position: relative;}
    .header .content-wrapper .avatar {-ms-flex: 0 0 3rem;-webkit-box-flex: 0;flex: 0 0 3rem;margin-right:0.4rem;width:3rem;}
    .header .content-wrapper .avatar img {border-radius:0.1rem;width:3rem;height:3rem;}
    .header .content-wrapper .content {position:relative;width:8rem;}
    .header .content-wrapper .content .store_name {font-size:.8rem;font-weight: 700;margin-bottom:.4rem;}
    .follow_panel{position:absolute;top:1rem;right:2rem;}
    .follow_panel .follow_button{display:block;background:#e93b3d;border-radius:2.5rem;padding:0 0.4rem;line-height:1.2rem;font-size:0.6rem;color:#fff;}
    .follow_panel .follow_button i{line-height:1.2rem;}
    .follow_panel .follow_number{text-align:center;line-height:0.7rem;font-size:0.5rem;color:#fff;margin-top:0.1rem;}
    .header-more{width:2rem;height:2rem;line-height:2rem;position:absolute;top:0.5rem;right:0;color:#fff;text-align:center;font-size:1rem;}
    .header .background {background:#2c3b53;-webkit-filter: blur(0.5rem);filter: blur(0.5rem);height: 100%;left: 0;position: absolute;top: 0;width: 100%;z-index: -1;}
    .middle-popup{width:80%}
    .middle-popup img{max-width:100%}
</style>
