<template>
	<div class="menu clear-fix">
		<div class="menu-item" @click="goStoreclass">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-store-class.png" />
			<span class="menu-item-title">店铺分类</span>
		</div>
		<div class="menu-item" @click="goBrand">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-brand.png" />
			<span class="menu-item-title">食安山东</span>
		</div>
		<!-- <div class="menu-item" @click="goPintuan">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-group-purchase.png" />
			<span class="menu-item-title">拼团</span>
		</div>
		<div class="menu-item" @click="goBargain">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-bargain.png" />
			<span class="menu-item-title">砍价</span>
		</div> -->
		<!-- <div class="menu-item">
			<img class="menu-item-icon" @click="goMemberIndex(1)" src="../../../assets/image/icon2/icon-retail.png" />
			<span class="menu-item-title">零售市场</span>
		</div>
		<div class="menu-item" @click="goMemberIndex(2)">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-group-buying.png" />
			<span class="menu-item-title">社区团购</span>
		</div>
		<div class="menu-item" @click="goMemberIndex(3)">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-wholesale.png" />
			<span class="menu-item-title">批发市场</span>
		</div>
		<div class="menu-item" @click="goMemberIndex(5)">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-collect.png" />
			<span class="menu-item-title">集采市场</span>
		</div> -->
		<div class="menu-item" @click="goMemberIndex()">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-all.png" />
			<span class="menu-item-title">全部商品</span>
		</div>

		<div class="menu-item" @click="goMemberPointSignin">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-sign.png" />
			<span class="menu-item-title">签到</span>
		</div>


		<div class="menu-item" @click="fun_goPromotion('HomeDiscount')">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-many.png" />
			<span class="menu-item-title">多买惠</span>
		</div>
		<div class="menu-item" @click="$router.push({ name: 'HomeSnapUp' })">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-spike.png" />
			<span class="menu-item-title">秒杀</span>
		</div>
		<div class="menu-item" @click="goTopList()">
			<img class="menu-item-icon" src="../../../assets/image/icon2/red-black-list.png" />
			<span class="menu-item-title">红黑榜</span>
		</div>
		<div class="menu-item" @click="goUpGrape()">
			<img class="menu-item-icon" src="../../../assets/image/icon2/icon-retail.png" />
			<span class="menu-item-title">供应链</span>
		</div>

		<!--<div class="menu-item" @click="goGroupBuy">-->
		<!--<i class="iconfont bg-6">&#xe633;</i>-->
		<!--<span class="menu-item-title">抢购</span>-->
		<!--</div>-->
		<!--<div class="menu-item" @click="goVrGroupBuy">-->
		<!--<i class="iconfont bg-5">&#xe633;</i>-->
		<!--<span class="menu-item-title">虚拟抢购</span>-->
		<!--</div>-->
		<div class="menu-item" v-for="(item, index) in navs" :key="index" @click="goAdUrl(item)">
			<img class="menu-item-icon" :src="item.adv_code" />
			<span class="menu-item-title">{{ item.adv_title }}</span>
		</div>
	</div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'HomeMenu',
  props: ['items'],
  computed: {
    ...mapState({
      isOnline: state => state.member.isOnline,
      mclass:state => state.member.mclass,
      navs: state => state.home.navs,
      cart_type:state => state.homecart.cart_type,//购物车商品类型
			seller: state => state.seller.info,  // 登陆人的商家信息
    })
  },
  methods: {
    // 跳转到 红黑榜
	  goTopList() {
      // this.$router.push({ name: 'HomeArticledetail', query: { article_id: 50 } });
      this.$router.push({ name: 'HomeTopList', query:{ ac_id: 19} });
	  },
		
		// 供应链市场
		goUpGrape(){
			if( this.seller ){
				this.$router.push( { name:"HomeUpGrape"});
			}else{
        Toast("请以商家身份登录");
      }
			// console.log("供应来奶",this.seller.supply_chain == 10);
		},
		
    ...mapMutations({
      saveHomecartMarket: 'saveHomecartMarket',//修改 来自于哪个市场      
      memberSaveTuan:"memberSaveTuan",//团名称设置为空
      
      savelatlng: 'savelatlng',
    }),
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
      // this.$router.push({ 'name': 'HomeBrandIndex' })
      Indicator.open();
    // 获取 当前经纬度 赋值
    // this.utils.getLatLng().then(obj=>{
    //   this.savelatlng(obj);
      // Indicator.close();
      this.$router.push({ 'name': 'HomeBrand'});
    // })
    },
    goArticleclass () {
      this.$router.push({ 'name': 'HomeArticleclass' })
    },

    // 多买惠 折扣
    fun_goPromotion(path){
      this.$router.push(path);
    },

    // 去查看 
    goMemberIndex (n) {
      // console.log(this.mclass);
      if( 0<this.mclass && this.mclass<3 ){//非批发集采
        this.$router.push({ 'name': 'HomeTuanclass',query:{type:this.mclass} })//跳转
        return false;
      }else if( this.mclass == 0 ){  // 未登录
        // Toast('请以普通会员登录')
        this.$router.push({ 'name': 'HomeTuanclass' })
      }else if( this.mclass == 5 ){  // 集采
        this.$router.push({ 'name': 'HomeTuanclass',query:{type:5} })
      }else{   //  普通 商家
        if(this.mclass == 5 ){
          Toast('集采商家不得进入')
        }else if(this.mclass <3 ){
          Toast('普通会员不得进入')
        }else{
          // console.log(this.mclass);
          this.$router.push({ 'name': 'HomeTuanclass',query:{type:this.mclass} })
        }
      }
      return false;
      var market = null;
      // console.log('登陆状态',this.mclass,'购物车商品类型',this.cart_type);
      this.saveHomecartMarket(market);//修改过去来自于那个市场为空
      if(n==0){
        this.$router.push({ 'name': 'HomeGoodsclass' })
      }
      if(n==1){//点击零售
        if( 0<this.mclass && this.mclass<3 ){//非批发集采
          if( this.mclass == 2 ){
            Toast('请更改收货地址为零售地址');
            return false;
          }
          if( this.cart_type == null || this.cart_type == 'l' ){//  购物车无商品 购物车为零售商品
            market = 'l';
            this.saveHomecartMarket(market);//来自于哪个市场修改
            this.memberSaveTuan(null);//修改团名称为空
            this.$router.push({ 'name': 'HomeTuanclass',query:{type:1} })//跳转
          }else{
            Toast('请先去购物车支付')
          }
        }else{
          Toast('请以普通会员登录')
        }
      }
      if(n==2){//点击社区团购
        if(  0<this.mclass && this.mclass<3 ){//非批发集采
          if( this.mclass == 1 ){
            Toast('请更改收货地址为团购地址');
            return false;
          }
          if( this.cart_type == null || this.cart_type == 'c'){// 购物车无商品 购物车为团购商品 
            market = 'c';
            this.saveHomecartMarket(market);
            this.$router.push({ 'name': 'HomeTuanclass' , query:{type:2}})
          }else{
            Toast('请先去购物车支付')
          }
        }else{Toast('请以普通会员登录')}
      }
      if(n==3){
        if(this.mclass == 5 ){ 
          Toast('集采商家不得进入')
        }else if(this.mclass <3 ){
          Toast('普通会员不得进入')
        }else{
          this.$router.push({ 'name': 'HomeTuanclass',query:{type:3} })
        }
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
	background: #ffffff;
	padding: 1.13rem 1.04rem 0;
	.menu-item {
		margin-bottom: 1.13rem;
		width: 25%;
		text-align: center;
		float: left;
		.menu-item-icon {
			width: 3.95rem;
			height: 3.95rem;
			overflow: hidden;
		}
		.menu-item-title {
			display: block;
			color:rgba(22,22,22,1);
			font-family:PingFangSC-Regular,PingFang SC;
			font-size:0.95rem;
			margin-top: 0.34rem;
		}
	}
}
.bg-1 {
	background-image: linear-gradient(to bottom, #d69dcc, #e8198b);
}
.bg-2 {
	background-image: linear-gradient(to bottom, #04befe, #4481eb);
}
.bg-3 {
	background-image: linear-gradient(to bottom, #cc208e, #6713d2);
}
.bg-4 {
	background-image: linear-gradient(to bottom, #ff9a44, #fc6076);
}
.bg-5 {
	background-image: linear-gradient(to bottom, #00ecbc, #007adf);
}
.bg-6 {
	background-image: linear-gradient(to bottom, #ff8177, #b12a5b);
}
</style>
