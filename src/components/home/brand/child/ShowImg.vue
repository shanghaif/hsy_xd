<template>
  <div class="show_img">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">{{title}}</span>
        <span class="header-right"></span>
			</div>
		</div>

    <!-- 图片展示 -->
    <div class="show">
      <img :src="imgUrl" alt="">
      <p v-if="itemtit">{{'品牌价值：'+itemtit}}万</p>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
// import { mapState, mapActions } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import { getSaunitDatalis } from '../../../../api/homebrand.js';
// import { getBrandList } from '../../../api/homebrand.js';

export default {
	data() {
		return {
      imgUrl:this.$route.query.img,  //  获取 传过来的值
      title:this.$route.query.tit,  //  获取 传过来的值
      itemtit:this.$route.query.itemtit
    }
  },
	// computed: {
	// 	...mapState({
	// 		dutyObj: state => state.homebrand.dutyObj,
	// 	})
  // },
  created(){
    // console.log(this.itemtit);
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {    

	}
};
</script>

<style lang="scss" scoped>
.show_img{
  // 字体 小
  @mixin fs_small{
    font-size: 3.48vw;
  }
  // 字体 中
  @mixin fs_title{
    font-size: 4.18vw;
  }
  // 字体 中
  @mixin fs_{
    font-size: 3.88vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size: 4.58vw;
  }
    // 边距
  $pmvw: 4vw;

  // 盒子模型
  @mixin item_box{
    box-sizing: border-box;
  }

  
  // 弹性布局
  @mixin item_flex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  div,p,li{
    @include item_box;
  }
  // 头部标题 返回按钮
	
  // 头部标题 返回按钮
	.header {
    // 字体 大
    @mixin fs_big{
      font-size: 4.88vw;
    }
    $imgWidth: 5.336vw;

    height: 10.5vw;
		.header_cont{
			display: flex;
			justify-content: space-between;
			padding: 2.8128vw 3.6564vw;
			align-items: center;
			.header-left {
				width: $imgWidth;
				height: $imgWidth;
			}
			.header-title {
        font-size: 4.8267vw;
        // @include fs_big;
				// font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
        font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2A303C;
			}
			.header-right {
				width: $imgWidth;
				height: $imgWidth;
        display: block;
			}
		}
	}
  //  图片
  .show{
    width: 100%;
    padding: 2vw 0;
    img{
      width: 100%;
    }
    p{
      text-align: center;
      font-size: 1.5rem;
      margin: 1rem 0;
      font-weight: 500;
    }
  }


}
</style>
