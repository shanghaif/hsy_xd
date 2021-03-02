<template>
		<div class="recipt hsy_main">
      <!-- SellerReceipt -->
			<!-- 头部 -->
    <head-title fontSize='0.32rem' title="查看回单" fontSizeRight='0.30rem'></head-title>

    <!-- 主题内容 -->
    <div class="cont">
      <div class="recipt-img">
        <div v-if="order_image" class="show-img">
					<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
						<template>
							<img :src="order_image" />
						</template>
					</img-viewer>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-btn" v-if="state == 2">
      <mt-button
        class="btn_new" @click="submit(1)">
        驳回回单
      </mt-button>
      <mt-button
        class="btn_new" @click="submit(3)">
        确认回单
      </mt-button>
    </div>

  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { orderReceiptBWy } from '../../../api/sellerOrder';
import $ from 'jquery';
import HeadTitle from '../../HeadTitle';
import CropImg from '../../CropImg';

import { resetRem, resumeRem } from '@/util/rem';

import '@/assets/style/hsy-mint.scss';

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';
export default {

	components: {
		'head-title': HeadTitle,
    'crop-img': CropImg,
    'img-viewer': Viewer,
  },
  
  name: 'MemberProfileSet',
  
	data() {
    return {
      order_id: this.$route.params.order_id,  // 订单编号
      order_image: this.$route.params.order_image,   // 订单里的 回单照片
      state: this.$route.params.state,   // 订单 状态 2 待操作   3 已确认
      
			options: {
				button: true, //右上角按钮
				zoomable: true, //是否可以缩放
				movable: true, //是否可以移动
				transition: true, //使用 CSS3 过度
				fullscreen: true, //播放时是否全屏
				keyboard: true, //是否支持键盘
				title: false, //当前图片标题
				tooltip: false, //显示缩放百分比
				navbar: false, //底部缩略图
				toolbar: false, //底部工具栏
				rotatable: false, //是否可旋转
				scalable: false //是否可翻转
			},
    }
  },

  created(){
    // console.log( this.order_id );
  },

	mounted() {
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

	computed: {
    
  },

  methods:{
    // 查看 图片
		inited(viewer) {
			this.$viewer = viewer;
		},

    // 确认/驳回 回单
    submit(num){
      orderReceiptBWy(this.order_id,num).then(res=>{
        Toast(res.message);
        this.$router.go(-1);
      }).catch(err=>{
        Toast(err.message);
      });
    }
  }
}
</script>


<style lang="scss" scoped>
.recipt{
  div,img,ul,li{
    box-sizing: border-box;  
  }
  // 头部
  &/deep/.head_title_cont{
    height: 4.5rem;
    height: 0.9rem;
    .header-wrap{
      padding: 1.3rem 1.5rem 1.2rem;
      padding: 0.26rem .3rem 0.24rem;
      img{
        width: 2rem;
        height: 2rem;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
		.header-title-r{
			right: -15%;
		}
  }

  .cont{
    padding: 0.30rem;
    .recipt-img{
      text-align: center;
      .user-avatar {
        display: block;
        position: relative;
        width: 6rem;
        height: 4.6rem;
        border-radius: 16px;
        border: 1px dashed #c4c4c4;
        margin: 0 auto;

        .icon_img {
          width: 100%;
          height: 100%;
          padding: 4% 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          span {
            line-height: initial;
            color: #e63116;
            font-size: 0.36rem;
          }

          img {
            width: 2.8rem;
            height: 2.8rem;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }

        input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }

      .show-img{
        img{
          width: 5rem;
        }
      }

      .del-btn{
        position: absolute;
        right: -0.4rem;
        top: -0.4rem;
        font-size: 0.8rem;
      }
    }
  }

  
  .bottom-btn{
    width: 92%;
    display: flex;
    justify-content: space-between;
    bottom: 4%;
    left: 4%;
    position: fixed;

    // 按钮
    .btn_new {
      background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
      box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
      border-radius: 40px;
      color: #fff;
      width: 42%;
      margin: 0.3rem auto;
      z-index: 1;
    }
  }
}
</style>
