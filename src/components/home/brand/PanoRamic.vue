<template>
	<div class="viewer">
    <!-- 头部标题 返回按钮 -->
    <!-- <img class="viewer_close" @click="$router.go(-1)" src="@/assets/image/brand/h5_l_f.png" alt=""> -->
    <div @click="$router.go(-1)"  class="viewer_close"></div>
		<!-- 全景模式 -->
		<div id="viewer" class="viewer"></div>
    <!-- 底部 切换 模块 -->
    <div v-if="changeShow" class="change_btn">
      <div class="img_btn" 
        v-for="(v,i) in PanoRamicArr" :key="i"
        @click="fun_changeImg(v.path)"
        :class="{hot:icon1 == v.path}"
        >
          <img :src="v.path" alt="">
          <span>{{v.name}}</span>
          <mt-button id="my-button"></mt-button>
        </div>
    </div>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { Toast, Indicator } from 'mint-ui'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import { Viewer } from 'photo-sphere-viewer';
import { resetRem, resumeRem } from '@/util/rem';

export default {
	data() {
		return {
      PSV:null,     // 全景对象
      icon1: null,  // 当前路径
      changeShow: false,  // 切换图片按钮 是否显示
		}
  },

	computed: {
		...mapState({
			PanoRamicArr: state => state.homebrand.PanoRamicArr,
		})
  },
  created(){ 
    // console.log(this.PanoRamicArr);
   },

	mounted(){
    resetRem();
    // 调用全景函数
    this.fun_changeImg(this.PanoRamicArr[0].path);
    Indicator.close();
  },
  
	beforeDestroy() {
    resumeRem();    
    // 如果有全景对象  销毁对象 赋值 为null  隐藏切换按钮
    if (this.PSV) {
      this.PSV.destroy();
      this.PSV = null;
      this.changeShow = false;
    }
  },
  
	methods: {
    // 切换图片函数
    fun_changeImg(path){      
      // 如果有全景对象  销毁对象 赋值 为null  隐藏切换按钮
      if (this.PSV) {
        this.PSV.destroy();
        this.PSV = null;
        this.changeShow = false;
      }
      // 初始化加载
      this.$nextTick(() => {
        // 当前图像路径切换
        this.icon1 = path;
        // 创建 全景对象
        this.PSV = new Viewer({
          container: document.querySelector('#viewer'),   // id
          panorama: this.icon1,                           // 图片路径
          autorotateDelay: 1,                             // 等待时间后自动旋转 毫秒数(坑：必须为正整数)
          autorotateSpeed: '0.6rpm',                        //  旋转速度
          navbar: [                                       // 底部导航栏按钮
            'autorotate',
            // {
            //   id: 'my-button',
            //   content: '查看',
            //   title: 'Hello world',
            //   className: 'custom-button',
            //   onClick: () => {
            //     alert('你好');
            //   }
            // },
          ],
        })
        //  加载完全景后的 回调函数
        this.PSV.once('ready', (e,p) => {
          //  如果 有多条全景图片 数据
          if( this.PanoRamicArr.length > 1 ){
            // 显示 切换 按钮
            this.changeShow = true;
          }
        });

        this.PSV.on('click', (e, position) => {
          // console.log(`new position is longitude: ${position.longitude} latitude: ${position.latitude}`);
        });
      })
    }
  }

}
</script>

<style scoped lang="scss">
.viewer{
	height: 100vh;
	width: 100vw;
  position: relative;

  $img_btn_size:12vw;

  & /deep/ .psv-navbar{
    background: transparent;
    top: 0;
    display: flex;
    justify-content: flex-end;

    .psv-button{
      background: rgba(61, 61, 61, 0.5);
    }
  }
  //  关闭
  .viewer_close{
    // position: absolute;
    // top: 2vw;
    // left: 2vw;
    // z-index: 20;
    // width: 8vw;
    // font-size: 6vw;
    
    &::before{
      content:'\2716';
      position: absolute;
      top: 2vw;
      left: 2vw;
      z-index: 20;
      text-align: center;
      width: 8vw;
      font-size: 6vw;
      z-index: 100;
      mix-blend-mode: difference;
      color: aliceblue;
    }
  }
  // 切换模块
  .change_btn{
    position: absolute;
    width: 98vw;
    padding: 1vw ;
    height: 5rem;
    z-index: 10;
    // border: 2px solid red;
    // bottom: 42px;
    bottom: 1vw;
    left: 0;
    overflow: auto;

    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;

    // 切换图按钮
    .img_btn{
      width: $img_btn_size;
      height: $img_btn_size;
      border: 3px solid #D8B492;
      border-radius: 50%;
      display: inline-block;
      margin: 0 1vw;
      overflow: hidden;
      
      flex-shrink: 0;
      opacity: 0.76;
      position: relative;
      // 图片
      img{
        width: 120%;
        height: 120%;
        transform: translate(-8%,-5%);
      }
      // 文字大小
      span{
        position: absolute;
        left: 2.3vw;
        top: 4vw;
        // color: #000;
        mix-blend-mode: difference;
        color: aliceblue;
        font-size: 3.6vw;            
      }
    }

    // 高亮显示
    .hot{
      border-color: pink;
      opacity: 1;
    }
  }
}
</style>
