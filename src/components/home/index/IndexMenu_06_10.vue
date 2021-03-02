<template>
  <div class="menu clear-fix">
    <div class="menu-item" @click="goStoreclass">
      <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu1.png" />
      <span class="menu-item-title">店铺分类</span>
    </div>
    <div class="menu-item" @click="goBrand">
      <i class="iconfont bg-4">&#xe671;</i>
      <span class="menu-item-title">品牌</span>
    </div>
    <div class="menu-item" @click="goPintuan">
      <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu2.png" />
      <span class="menu-item-title">拼团</span>
    </div>
    <div class="menu-item" @click="goBargain">
      <i class="iconfont bg-1">&#xe6b5;</i>
      <span class="menu-item-title">砍价</span>
    </div>
    <div class="menu-item" @click="goMemberPointSignin">
      <i class="iconfont bg-4">&#xe6e6;</i>
      <span class="menu-item-title">签到</span>
    </div>
    <div class="menu-item">
      <img class="menu-item-icon" @click="goMemberIndex(1)" src="../../../assets/image/home/home-index-menu3.png" />
      <span class="menu-item-title">零售市场</span>
    </div>
    <div class="menu-item" @click="goMemberIndex(2)">
      <i class="iconfont bg-4">&#xe674;</i>
      <span class="menu-item-title">社区团购</span>
    </div>
    <div class="menu-item" @click="goMemberIndex(3)">
      <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu5.png" />
      <span class="menu-item-title">批发市场</span>
    </div>
    <div class="menu-item" @click="goMemberIndex(5)">
      <i class="iconfont bg-2">&#xe68c;</i>
      <span class="menu-item-title">集采市场</span>
    </div>
     <div class="menu-item" @click="goMemberIndex(0)">
     <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu8.png" />
      <span class="menu-item-title">全部商品</span>
     </div>


    <!--<div class="menu-item" @click="goGroupBuy">-->
      <!--<i class="iconfont bg-6">&#xe633;</i>-->
      <!--<span class="menu-item-title">抢购</span>-->
    <!--</div>-->
    <!--<div class="menu-item" @click="goVrGroupBuy">-->
      <!--<i class="iconfont bg-5">&#xe633;</i>-->
      <!--<span class="menu-item-title">虚拟抢购</span>-->
    <!--</div>-->
    <div class="menu-item"  v-for="(item, index) in navs" :key="index" @click="goAdUrl(item)">
      <img class="menu-item-icon" :src="item.adv_code" />
      <span class="menu-item-title">{{item.adv_title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'HomeMenu',
  props: ['items'],
  computed: {
    ...mapState({
      isOnline: state => state.member.isOnline,
               mclass:state => state.member.mclass,
      navs: state => state.home.navs
    })
  },
  methods: {
    showLogin () {
      this.$router.push({ name: 'HomeMemberLogin' })
    },
    goPointsgoods () {
      this.$router.push({ 'name': 'HomePointsgoods' })
    },
    goStoreclass () {
      this.$router.push({ 'name': 'HomeStoreclass' })
    },
    goPintuan () {
      this.$router.push({ 'name': 'HomePintuanList' })
    },
    goBargain () {
      this.$router.push({ 'name': 'HomeBargainlist' })
    },
    goBrand () {
      this.$router.push({ 'name': 'HomeBrand' })
    },
    goArticleclass () {
      this.$router.push({ 'name': 'HomeArticleclass' })
    },
    goMemberIndex (n) {
if(n==0)
      this.$router.push({ 'name': 'HomeGoodsclass' })
if(n==1){
if(this.mclass<3){ this.$router.push({ 'name': 'HomeTuanclass',query:{type:1} })}
else{Toast('请以普通会员登录')}
}
if(n==2){
if(this.mclass<3){ this.$router.push({ 'name': 'HomeTuanclass' , query:{type:2}})}
else{Toast('请以普通会员登录')}
}
if(n==3){
if(this.mclass==3){ this.$router.push({ 'name': 'HomeTuanclass',query:{type:3} })}
else{Toast('请以商家会员登录')}
}
if(n==5){
if(this.mclass==5){ this.$router.push({ 'name': 'HomeTuanclass',query:{type:5} })}
else{Toast('请以集采会员登录')}
}
    },
    goGroupBuy () {
      this.$router.push({ 'name': 'HomeGroupBuyList' })
    },
    goVrGroupBuy () {
      this.$router.push({ 'name': 'HomeVrGroupBuyList' })
    },
    goMemberPointSignin () {
      this.$router.push({ 'name': 'MemberPointSignin' })
    },
    myOrder () {
      if (this.isOnline) {
        this.$router.push({
          name: 'MemberOrderList'
        })
      } else {
        this.showLogin()
      }
    },
    goAdUrl (item) {
      switch (item.adv_type) {
        case 'goods':
          this.$router.push({ 'name': 'HomeGoodsdetail', query: { goods_id: item.adv_typedate } })
          break
        case 'store':
          this.$router.push({ 'name': 'HomeStoredetail', query: { id: item.adv_typedate } })
          break
        case 'article':
          this.$router.push({ 'name': 'HomeArticledetail', query: { article_id: item.adv_typedate } })
          break
        case 'url':
          window.location.href = item.adv_typedate
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .menu {
    overflow: hidden;
    justify-content: space-around;
    background: #FFFFFF;
    padding-top:1rem;
    .menu-item {
      margin-bottom:1rem;
      width:20%;
      text-align:center;
      float: left;
      .iconfont{
        margin:auto;
        width: 2rem;
        height: 2rem;
        line-height:2rem;
        font-size:1.4rem;
        color:#fff;
        overflow: hidden;
        display:block;
        text-align: center;
        border-radius:50%;
      }
      .menu-item-icon {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
      }
      .menu-item-title {
        display:block;
        color: #333;
        font-size:.6rem;
        margin-top:.2rem;
      }
    }
  }
  .bg-1{background-image: linear-gradient(to bottom , #d69dcc,#e8198b );}
  .bg-2{background-image: linear-gradient(to bottom , #04befe,#4481eb );}
  .bg-3{background-image: linear-gradient(to bottom , #cc208e,#6713d2 );}
  .bg-4{background-image: linear-gradient(to bottom , #ff9a44,#fc6076 );}
  .bg-5{background-image: linear-gradient(to bottom , #00ecbc,#007adf );}
  .bg-6{background-image: linear-gradient(to bottom , #ff8177,#b12a5b );}
</style>
