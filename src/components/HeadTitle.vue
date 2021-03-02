<template>
<div class="head_title_cont" :style="{background:bgcolor?bgcolor:'#fff'}">
    
	<div class="header-wrap">
		<img v-if="iconleft" @click="fun_clickLeft" :src="iconleft" alt="" />
		<img v-else @click="fun_clickLeft" src="@/assets/image/icon2/icon-black-left.png" alt="" />
		<span :class="{CanSee:titleShow}" class="header-title" :style="{color:color?color:'#161616',fontSize:fontSize?fontSize:'1.52rem'}">{{title}}</span>
		<img v-if="iconright" @click="fun_clickRight" :src="iconright" alt="" />
		<span :style="{color:titleRightColor,fontSize:fontSizeRight?fontSizeRight:'1.52rem'}" class="header-title-r" v-else-if="titleRight" @click="fun_clickRight">{{titleRight}}</span>
		<span v-else></span>
	</div>

</div>
</template>

<script>
import {isWechat} from '../util/wechat.js'
export default {
  data () {
    return {
      titleShow:false,
    }
  },
  props: {
    iconleft:String,    //  左侧 图标

    iconright:String,    // 右侧图标

    bgcolor:String,   // 背景颜色
    color:String,     // 标题文字颜色

    // 标题
    title: String,
    fontSize:String,
    fontSizeRight:String,

    // 标题
    titleRight: String,    //  左侧文字
    titleRightColor:String,  //  右侧文字

    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: false
    }
  },
  mounted(){
    if( isWechat() ){
      document.title = this.title;
      this.titleShow = true;
    }
  },
  beforeDestroy(){
    if( this.titleShow ){
      this.titleShow = false;
      document.title = '好食源';
    }
  },
  methods:{

    // 点击 左侧 按钮
    fun_clickLeft(){
      if( this.$parent.fun_left ){
        this.$parent.fun_left();
      }else{
        this.$router.go(-1);
      }
    },

    // 点击 右侧 按钮
    fun_clickRight(){
      if( this.$parent.fun_right ){
        this.$parent.fun_right();
      }else{
        this.$router.go(-1);
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.head_title_cont{
  height: 3.74rem;
  background: #F4F5F7;
  font-size: 1.28rem;
  position: relative;
  z-index: 1;
  div{
    box-sizing: border-box;
  }

  // 头部
  .header-wrap {
    padding: 1rem 1.43rem;
    position: relative;
    display: flex;
    background: transparent;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    img {
      // width: 1.64rem;
      // height: 1.64rem;
		width: 1.74rem;
		height: 1.74rem;
    }
    .header-title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      
      font-size: 1.52rem;
      font-weight: 400;
      color: rgba(22, 22, 22, 1);
    }
    .CanSee{
      opacity: 0;
    }
    .header-title-r{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-1.43rem, -50%);
      font-size: 1.39rem;
    }
    .header-right {
      span {
        font-size: 1.3rem;
      }
    }
  }

}
</style>
