<template>
<div class="DesksForm2">
  <!-- 头部 -->
  <div class="head">    
		<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
    <span>发布餐桌</span>
		<img style="opacity:0" src="@/assets/image/icon2/icon-black-left.png" alt="" />
  </div>
  <!-- 主体内容 -->
  <main>
    <div class="add-cook-list">
      <span>餐桌名称:</span>
      <input type="text" v-model="deskname" maxlength="30" placeholder="请输入餐桌名称" />
    </div>
  </main>
  
  <!-- 底部按钮 -->
  <div class="foot">
    <button @click="submitData">保存</button>
  </div>
</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle.vue';
import { SaveDesk } from '../../../api/sellerFoods';
export default {
	components: {    
    "head-title":HeadTitle,
	},
	data() {
		return {
      editType:null,   // 编辑
      deskid: this.$route.query.deskid,     // id
      deskname: this.$route.query.deskname,  // 名称
    }
	},

	created() {
  },
  
  mounted(){
		let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    
    html.style.fontSize = (sw/7.5) + 'px';
		// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
      html.style.fontSize = (sw/7.5) + 'px';
		};
  },

	methods: {

    // 保存 提交
    submitData(){
      this.deskname == null?( Toast("请输入餐桌名称")):(
        SaveDesk( this.deskid, this.deskname ).then(res=>{
          // console.log(res);
          Toast(res.message);
          this.$router.go(-1);
        }).catch(err=>{
          Toast(err.message);
        })

      )
    },
	},
	
};
</script>

<style scoped lang="scss">
.DesksForm2{
  div,ul,li,span,p,input{
    box-sizing: border-box;
  }
  .head{
    width: 100vw;
    height:0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;
    >img{
      width: 0.4rem;
      height: 0.4rem;
    }
    span{
      height: .45rem;
      font-size: .32rem;
      font-weight: 400;
      color: #161616;
      line-height: .45rem;

    }
  }

  main{
		.add-cook-list {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 0.25rem 0.30rem;
			align-items: center;
      height: 0.9rem;
			border-bottom: 1px solid #eee;
			
			&:after {
				content: '*';
				color: red;
				font-size: 0.28rem;
				position: absolute;
        left: 0.38rem;
        top: 0.3rem;
			}
			span {
        margin-left: 0.28rem;
				// font-size: 1.33rem;
				// font-weight: 400;
				// color: #161616;
				// margin-right: 1.43rem;
				// flex-shrink: 0;
        height: .40rem;
        font-size: .28rem;
        font-weight: 400;
        color: #161616;
        line-height: .40rem;

			}
			input {
				flex-grow: 1;
				font-size: 1.33rem;

        height: .40rem;
        font-size: .28rem;
        font-weight: 400;
        color: #6F6F6F;
        line-height: .40rem;
        text-align: right;

			}
		}
  }

  .foot{
    >button{
      width: 6.90rem;
      height: .80rem;
      background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
      box-shadow: 0 0 0.20rem 0 rgba(251, 104, 84, 0.5);
      border-radius: .40rem;
      color: #fff;

      font-size: .28rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: .40rem;
      text-shadow: 0px 0px .2rem rgba(251, 104, 84, 0.5);
      position: fixed;
      bottom: 0.77rem;
      left: 0.3rem;

    }
  }

}
</style>