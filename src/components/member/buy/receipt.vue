<template>
		<div class="recipt hsy_main">
			<!-- 头部 -->
    <head-title fontSize='0.32rem' :title="title" fontSizeRight='0.30rem'></head-title>

    <!-- 主题内容 -->
    <div class="cont">
      <div class="recipt-img">
        <div v-if="imgUrl" class="user-avatar" :class="{ userNone: imgUrl }">
          <!-- <img v-if="imgUrl" :src="imgUrl" /> -->
					<img-viewer  v-if="imgUrl" :options="options" @inited="inited" class="viewer" ref="viewer">
						<template>
							<img :src="imgUrl" />
						</template>
					</img-viewer>
          <span
            @click="dropImage('order_image')"
            class="del-btn iconfont"
            >
            &#xe619;
          </span>
        </div>
        <div
          v-else-if="!order_image"
          class="user-avatar"
          ref="upload_btn1"
          @change="uploadInformPic('order_image', $event)"
          >
          <div class="icon_img">
            <img src="@/assets/image/icon2/camera.png" />
            <span>上传照片</span>
          </div>
          <input type="file" accept="image/*" />
        </div>
        <div v-else class="show-img">
					<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
						<template>
							<img :src="order_image" />
						</template>
					</img-viewer>
        </div>
      </div>
    </div>

    <mt-button
      v-if="!order_image"
      class="btn_new" @click="submit">
      确认提交
    </mt-button>

    <!-- 图片裁切 -->
		<crop-img
      ref="cropImg"
      @haveCropImgData="fun_getCropImgData"
      :dataType="true"
      >
    </crop-img>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { uploadRecipt, dropRecipt, saveRecipt } from '../../../api/memberPayment';
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
      title: "提交回单",
      imgUrl:null,  // 图片路径
      imgName:null,  // 图片名称
      order_id: this.$route.params.order_id,  // 订单编号
      order_image: this.$route.params.order_image,   // 订单里的 回单照片
      
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
    if( this.order_image ){
      this.title = "查看回单"
    }
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
		...mapState({
			user: state => state.member.info
    }),
    
  },

  methods:{
    // 查看 图片 
		inited(viewer) {
			this.$viewer = viewer;
    },
    
    // 上传图片
		uploadInformPic(index, event) {
			// return false;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			if (event.target.files[0].size > 200 * 1024) {
				// 传值 隐藏 当前页面 打开 插件
				this.$refs.cropImg.currentValue = true;
				// 将当前 的 input 里的 文件 传递给 插件
				this.$refs.cropImg.files = event.target.files;

				// 清除 当前 input 的 值
				event.target.files = null;
				event.target.type = null;
				// 重新 设置 类型 是文件
				event.target.type = 'file';
				return false;
      }
      let formdata = new FormData();
			formdata.append(index, event.target.files[0]);
			formdata.append('id', index);
			uploadRecipt(formdata).then(res => {
        this.imgUrl= res.result.file_path;
        this.imgName = res.result.file_name;
      })
      .catch(function(error) {
        Toast(error.message);
      });
    },
    
		// 图片 接收 图片
		fun_getCropImgData(obj) {
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			// 如果 是 带值 传递过来的 上传 图片
			if (obj.type) {
        var formdata = new FormData();
        formdata.append('order_image',obj.data,Date.now() + '.jpg');
        formdata.append('id', 'order_image');

        uploadRecipt(formdata).then(res => {
          this.imgUrl= res.result.file_path;
          this.imgName = res.result.file_name;
        })
        .catch(function(error) {
          Toast(error.message);
        });
      }
		},

    // 删除 图片
		dropImage(id) {
			MessageBox.confirm('确定要删除该图片吗？').then(action => {
        this.imgUrl = null;
        this.imgName = null;
			});
    },
    
    // 提交 回单
    submit(){
      if( this.imgName ){
        saveRecipt( this.order_id, this.imgName ).then(res=>{
          Toast(res.message);
          this.$router.go(-1);
        }).catch(err=>{
          Toast(err.message);
        })
      }else{
        Toast("请先上传照片");
      }
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
        // height: 4.6rem;
        border-radius: 16px;
        border: 1px dashed #c4c4c4;
        margin: 0 auto;
        padding: 0.2rem;

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
          width: 4rem;
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
          width: 4rem;
          border: 1px dashed #999;
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

  
  // 按钮
  .btn_new {
    background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
    box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
    border-radius: 40px;
    color: #fff;
    width: 92%;
    margin: 0.3rem auto;
    bottom: 4%;
    left: 4%;
    position: fixed;
    z-index: 1;
  }
}
</style>
