<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 09:19:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 10:07:59
-->
<template>
	<!-- 分类  -->
	<ul class="food-class" >
		<li 
			@click="fun_GoRoute({ name: 'HomeStoreclass' })">
			<img  :src="require(`../../../assets/image/icon2/icon-store-class.png`)" />
			<span>店铺分类</span>
		</li>
		<li 
			@click="goMemberIndex()">
			<img  :src="require(`../../../assets/image/icon2/icon-all.png`)" />
			<span>全部商品</span>
		</li>
		<li 
			@click="fun_GoRoute(end.path)"
			v-for="end in startArr" :key="end.url">
			<img  :src="require(`../../../assets/image/icon2/${end.url}.png`)" />
			<span>{{end.name}}</span>
		</li>
		<li 
			@click="goUpGrape()">
			<img  :src="require(`../../../assets/image/icon2/icon-retail.png`)" />
			<span>供应链</span>
		</li>
		<!-- 底部 -->
		<li 
			@click="fun_GoRoute({ name: 'HomeBrand' })">
			<img  :src="require(`../../../assets/image/icon2/icon-brand.png`)" />
			<span>食安山东</span>
		</li>
		<li 
			@click="goPointsgoods">
			<img  :src="require(`../../../assets/image/icon2/icon-faxian-jifen1.png`)" />
			<span>积分商城</span>
		</li>
		<li 
			@click="goQianDao">
			<img  :src="require(`../../../assets/image/icon2/icon-sign.png`)" />
			<span>签到</span>
		</li>
		<li 
			@click="toLearn">
			<img  :src="require(`../../../assets/image/icon2/icon-faxian-study1.png`)" />
			<span>从业学习</span>
		</li>
		<li 
			@click="fun_GoRoute({ name: 'HomeTopList', query:{ ac_id: 19} })" >
			<img :src="require(`../../../assets/image/icon2/red-black-list.png`)" />
			<span>红黑榜</span>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from "mint-ui";

// import {  resumeRem } from '@/util/rem'
export default {
	data(){
		return{
			startArr:[				
				{ 
					name: "多买惠", path: { name: "HomeDiscount" },
					url: "icon-many"
				},
				{ 
					name: "秒杀", path: { name: "HomeSnapUp" },
					url: "icon-spike"
				},
			],
		}
	},
  computed: {
    ...mapState({
      isOnline: state => state.member.isOnline,   // 是否登录
      mclass  : state => state.member.mclass,     // 登陆人身份
      seller  : state => state.seller.info,       // 登陆人的商家信息
			user: state => state.member.info,
		})
	},

	// beforeDestroy(){		
	// 	resumeRem();
	// },

	methods:{
		// 点击跳转
		fun_GoRoute(obj){
			this.$router.push(obj);
		},

		// 积分商城
		goPointsgoods() {
			// resumeRem();
			this.$router.push({ name: 'HomePointsgoods' });
		},

		// 签到
		goQianDao(){
			if (this.isOnline) {
				this.$router.push({ name: 'MemberPointSignin' });
			} else {
				this.showLogin();
			}
		},
		
		// 去学习
		toLearn() {
			if (this.isOnline) {
				if( this.user.gangwei && this.user.gangwei!= 999 ){
					// resumeRem();
					this.$router.push({ name: 'HomeLearn' });
				}else{
					Toast("请先去实名认证，并填写行业岗位信息");
				}
			} else {
				this.showLogin();
			}
		},
		
    // 全部商品
    goMemberIndex () {
      if( 0<this.mclass && this.mclass<3 ){//非批发集采
        this.$router.push({ 'name': 'HomeTuanclass',query:{type:this.mclass} })//跳转
        return false;
      }else if( this.mclass == 0 ){  // 未登录
        this.$router.push({ 'name': 'HomeTuanclass' })
      }else if( this.mclass == 5 ){  // 集采
        this.$router.push({ 'name': 'HomeTuanclass',query:{type:5} })
      }else{   //  普通 商家
        if(this.mclass == 5 ){
          Toast('集采商家不得进入')
        }else if(this.mclass <3 ){
          Toast('普通会员不得进入')
        }else{
          this.$router.push({ 'name': 'HomeTuanclass',query:{type:this.mclass} })
        }
			}
		},
		
		// 供应链市场
		goUpGrape(){
			if( this.seller ){
				this.$router.push( { name:"HomeUpGrape"});
			}else{
        Toast("请以商家身份登录");
      }
		},
		
		showLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
		},
	}
}
</script>

<style scoped lang="scss">
// 分类	
.food-class{
	div,ul,li,p,span,input,img{
		box-sizing: border-box;
	}
	$bor:0px;

	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-bottom: 0.24rem;
	border: $bor solid slategrey;

	// width: 6.90rem;
	// border-radius: .10rem;
	width: 7.5rem;
	// padding: 0 0.3rem 0.3rem 0.3rem;
	// padding: 0 0.2rem 0.2rem 0.3rem;
	// height: 3.07rem;
	// background: #FFFFFF;
	// margin: 0.2rem auto;
	padding: 0 0.1rem;
	padding-bottom: 0.25rem;


	li{
		width: 1.35rem;
		width: 20%;
		margin-top: 0.25rem;

		font-size: .24rem;
		font-weight: 500;
		color: #333333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img{
			width: .66rem;
			height: .55rem;
			width: .88rem;
			height: .88rem;
			margin-bottom: 0.1rem;
		}
	}

	// padding: 0 0 0.2rem 0;
	// width: 6.9rem;
	// border-radius: 0.2rem;
	// li{
	// 	margin-top: 0.2rem;
	// }
}
</style>