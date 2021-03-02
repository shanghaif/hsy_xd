<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 16:09:13
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 09:13:49
-->

<template>
<div>
  <!-- 上面头部 -->
  <div class="main-head">
    <span @click="fun_GoLeft"  class="icon iconfont">&#xe6d3;</span>
    <!-- <img @click="fun_GoLeft" src="@/assets/image/icon2/icon-address-black.png" alt=""> -->
    <input @click="fun_GoInput" type="text" placeholder="新鲜蔬菜水果" readonly="true">
    <!-- <span class="icon iconfont">&#xe680;</span> -->
    <img @click="popupVisible = !popupVisible" src="@/assets/image/icon2/icon-ellipsis-white.png" alt="">
  </div>

  <header-more-new v-show="popupVisible" 
    @change-popupVisible="changePopupVisible"
    :showDot="showDot"></header-more-new>
</div>
</template>

<script>
// 主页面上面头部
import HeaderMoreNew from '../../HeaderMoreNew';

import { mapState } from 'vuex';
export default {
	data(){
		return{
      popupVisible:false,  // 弹出框控制
			showDot: false,  // 聊天信息
		}
	},
	components: {
		HeaderMoreNew
	},

	computed:{
		...mapState({
			isOnline: state => state.member.isOnline,  // 是否登录
		}),
	},

	methods:{
    // 点击 左侧 定位
    fun_GoLeft(){
			this.isOnline ? (
        this.$router.push( { name : 'MemberAddressList' } )
      ):(
				this.showLogin()
      );
    },

    // 点击 输入框
    fun_GoInput(){
      this.$router.push({ name: 'HomeSearch', params: { isFromHome: true } });
    },

    // 去登陆
		showLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
    },


		// 切换 
		changePopupVisible ( v ){
			this.popupVisible = v;
		},
    
	},
}
</script>

<style scoped lang="scss">
.main-head{
  background: #E63116;
  $bor:0px;
	@mixin flex{		
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  
  flex: 0;
  position: fixed;
  top: 0;
  padding: 0 0.3rem;
  z-index: 1;
  width: 6.9rem;
  height: .86rem;
  // border:1px solid #B52503;
  margin: 0 auto;
  @include flex();
  align-items: center;
  >input{
    width: 5.62rem;
    height: .60rem;
    background-color: #fff;
    border-radius: .30rem;
    padding-left: 0.85rem;			
    font-size: .3rem;
    font-weight: 400;
    color: #808089;

    
    background-image: url(../../../assets/image/icon2/search.png);
    background-repeat: no-repeat;
    background-position: .3rem center;
    background-size: .34rem;
  }
  img{
    height: 0.41rem;
    width: 0.33rem;
    &:last-child{
      width: 0.39rem;
      height: 0.08rem;
    }
  }
  >span{
    font-size: 0.48rem;
  }
}
</style>