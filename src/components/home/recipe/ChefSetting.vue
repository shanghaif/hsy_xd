<template>
  <div class="ChefSetting">
    <!-- 头部 -->
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">厨师管理</span>
			<div class="header-right"></div>
		</div>
    
		<!-- 主题内容 -->
		<div class="cont">
			<ul>
				<li v-for="(v, i) in list" :key="i" @click="fun_goModule(i)">
					<div>{{ v.name }}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
			</ul>
		</div>

  </div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
export default {
  data(){
    return{
      list:[
        { name: "厨师认证" },
        { name: "菜谱管理" },
      ]
    }
  },

  mounted() {		
		resetRem();
  },
  beforeDestroy(){
    resumeRem();
  },
  
  methods:{
    // 跳转
    fun_goModule(i){
      ( i == 0 )?this.$router.push({ name: 'HomeAddCook',query: { from: 'myIndex' } }):
			this.$router.push({ name: 'HomeMenuManage' });
    },
  },

}
</script>

<style lang="scss" scoped>
.ChefSetting{	
  // 头部  
	.header-wrap {
		padding: 1rem 1.43rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		img {
			// position: absolute;
			// left: 1.78rem;
			// top: 50%;
			width: 1.74rem;
			height: 1.74rem;
			// transform: translate(0, -50%);
		}
		.header-title {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 1.39rem;
			font-weight: 400;
			color: rgba(22, 22, 22, 1);
		}
	}

  // 主体内容   
  .cont {
    padding: 1rem 1.43rem;
    overflow: scroll;
    li {      
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 1.5rem;
      margin-bottom: 1.2rem;
      background: #ffffff;
      color: #fff;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      height: 11vw;
      line-height: 2.5;
      padding: 0 4vw;
      // &:nth-child(1) {
      //   background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
      // }
      &:nth-child(1) {
        background: #626771 linear-gradient(139deg, #66aeff 0%, #1369fa 100%);
      }
      // &:nth-child(1) {
      //   background: linear-gradient(139deg, #4cb8c4 1%, #3cd3ad 100%);
      // }
      &:nth-child(2) {
        background: #f4f5f7 linear-gradient(109deg, #8f94fb 0%, #6167d7 55%, #4e54c8 99%);
      }
      div {
        height: 100%;
        width: 78vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 4vw;
        height: 4vw;
        margin-top: 3.5vw;
      }
    }
  }
}
</style>