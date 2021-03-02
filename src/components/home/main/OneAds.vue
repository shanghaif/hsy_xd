<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-26 15:43:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-23 09:53:15
-->

<template>
<div class="main-banner3"  v-if="goodProducts && goodProducts.length">
  <div class="top-tit">
    <span>精选好物</span>
    <span>精选好物</span>
  </div>
  <div class="bottom-ul"  @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
    <ul id="ulRef" :style="{transform: `translate3d(-${Roll*TopMoveWidth}px, 0px, 0px)`}">
      <li  v-for="(good,i) in goodProducts" :key="i"
        @click="fun_GoDetails(good.goods_id)">
        <img :src="good.goods_img_480" alt="">
        <p>{{good.goods_name}}</p>
        <div>
          <span>￥{{good.goods_promotion_price}}</span>
          <!-- <span>￥{{good.goods_price}}</span> -->
        </div>
      </li>
    </ul>
  </div>
  <div  v-if="showLoading" class="kXXQUh">
    <div class="dNdKAo" ref="fatherMy">
      <div class="iYxMJl" ref="childMy" :style="{transform: `translate3d(${Roll*BottomWidth}px, 0px, 0px)`}"></div>
    </div>
  </div>
</div>
</template>

<script>
// 单个模块 最下面 6个 小商品
import { mapState } from 'vuex';

export default {
	data(){
		return{
      showLoading : true,   // 是否显示滚动条
      num         : 2,      // 一次移动的 商品个数
      
      viewSee     : null,   // 可视窗口宽度
      UlAllWidth  : 0,      // 商品列表 总的长度

      Roll        : 0,      // 滚动变量
      TopMoveWidth: 0,      // 上面商品列 滚动距离
      BottomWidth : 0,      // 下面滚动条 滚动距离

      startPos:{},  // 判断 左滑右滑
		}
	},

	computed:{
		...mapState({
			// goodProducts: state => state.home.goodProducts,
			goodProducts: state => state.home.goodProducts
    }),
  },
  
  mounted(){
    this.$nextTick(()=>{
      // 当前 单位 px
      var nowPx = document.documentElement.style.fontSize.slice(0,-2);
      // 获取可视区域宽度
      this.viewSee = 6.3*10000*nowPx/10000;
      // 获取 商品自身宽度
      var obj = nowPx*15200/10000;
      // 获取商品右边距宽度
      var objLeft = nowPx*2000/10000;
      
      // 获取 列表商品的移动距离
      this.TopMoveWidth = (obj + objLeft)*this.num;
      setTimeout(()=>{
        // 商品列表的 长度
        this.UlAllWidth = document.getElementById('ulRef').offsetWidth;
        // 如果 显示 滚动条
        if( this.showLoading ){
          // 底部父元素 减去滚动条 剩下的 距离
          var bottomNull = (this.$refs.fatherMy.offsetWidth - this.$refs.childMy.offsetWidth); 
          // 顶部商品列表长度 减去 顶部可视区域 剩下的距离  除以 商品的移动距离
          var a = ( this.UlAllWidth -  this.viewSee )/(this.TopMoveWidth);
          // 获取 底部滚动条的滚动距离
          this.BottomWidth = bottomNull / a;
        }
      },200)    
    })
  },

	methods:{
    getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0; //默认标记没有滑动
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        var angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1; //向上
        } else if (angle > 45 && angle < 135) {
            result = 2; //向下
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3; //向左
        } else if (angle >= -45 && angle <= 45) {
            result = 4; //向右
        }
        return result;
    },
    start(event){
      let touchS = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
  　　this.startPos = {
          x:touchS.pageX,
          y:touchS.pageY,
          time: new Date()
      }; //取第一个touch的坐标值
    },
    move (event) {
      //当屏幕有多个touch或者页面被缩放过，就不执行move操作
      if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
    },
    end (event) {
      let touchE = event.changedTouches[0];
      this.endPos = {
        x: touchE.pageX,
        y: touchE.pageY,
        timeStemp: new Date()
      };
      let direction = this.getDirection(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
      
			// if ( _e.path[3].className == 'bottom-ul' ){
			// 	return false;
			// };
      /**************************************** */
      // 左滑
      (direction == 3) && (
        this.Roll +=  1
      );
      // 右滑
      (direction == 4)&&(
        this.Roll -=  1
      );
      // 如果 < 0 表示 已到最左侧
      this.Roll<0 && (
        this.Roll = 0
      );
      // 如果 当前滚动变量 > （商品列表长度 - 可视区域）/商品移动距离 表示已到达 最右侧
      (this.Roll > ((this.UlAllWidth-this.viewSee )/this.TopMoveWidth) ) && (
        this.Roll -=  1
      );

      this.$forceUpdate();
    },
    

    // 查看详情
		fun_GoDetails(goods_id) {
      // 记住是 当前 滚动 状态 
      this.$emit('getScrollTop');
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
    },	
		
	},
}
</script>

<style scoped lang="scss">
.main-banner3{
  $bor:0px;
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }
  
  padding: 0.3rem 0.3rem 0.2rem 0.3rem;
  padding: 0.2rem;
  padding-bottom: 0.1rem;
  width: 7.1rem;
  height: fit-content;
  margin:  0 auto;
  margin-top: 0.2rem;
  background: #FFFFFF;
  box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
  border-radius: .10rem;
  .top-tit{
    height: 0.32rem;
    display: flex;
    align-items: center;
    span{
      font-size: .34rem;
      font-weight: bold;
      color: #333333;
      &:last-child{
        font-size: 0.24rem;
        font-weight: 500;
        color: #D83A15;
        margin-left: 0.28rem;
      }
    }
  }
  .bottom-ul{
    margin-top: 0.2rem;
    width: 100%;
    height: fit-content;
    overflow-x: hidden;
    ul{
      // height: 0.8rem;
      display: flex;
      justify-content: flex-start;
      width: fit-content;
      // animation: identifier 6.67s infinite linear;
      transform: translate3d(0, 0px, 0px);
      // transition-duration: 5000ms;
      transition: all .45s;
      position: relative;
      li{
        // background: #E2E2E2;
        width: .80rem;
        width: 1.52rem;
        // height: .80rem;
        border-radius: .10rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 0.01rem;
        
        font-size: .20rem;
        font-weight: 400;
        color: #121212;
        &:not(:last-child){
          margin-right: 0.2rem;
        }
        img{
          width: 100%;
        }

        >p{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -moz-line-clamp: 2;
          -webkit-box-orient: vertical;
          box-orient: vertical;
          overflow: hidden;
          background: transparent;
        }

        >div{
          font-size: .2rem;
          font-weight: 400;
          color: #D83A15;
          width: 100%;

          span{
            // &:last-child{
            //   text-decoration: line-through;
            //   color: #999;
            // }
          }

        }
      }
    }

    
		@keyframes identifier {
			0% {
        transform: translate3d(0, 0px, 0px);
			}
			100% {
        transform: translate3d(-750, 0px, 0px);
			}
		}

  }

  .kXXQUh{
    display: flex;
    width: 100%;
    height: 0.2rem;
    margin-top: 0.2rem;
    margin-top: 0.1rem;
    background-color: rgb(255, 255, 255);
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    .dNdKAo {
      width: 1rem;
      height: 0.06rem;
      background-color: rgb(212, 216, 222);
      border-radius: 0.04rem;
      .iYxMJl {
        width: 0.4rem;
        height: 0.06rem;
        background-color: rgb(255, 109, 42);
        border-radius: 0.04rem;
        will-change: transform;
        transition: all .36s;
      }
    }
  }
}

// if ( e.path && e.path[2].className == 'mint-swipe-items-wrap' ){
// 	return false;
// };
// if ( e.path && e.path[3].className == 'bottom-ul' ){
// 	return false;
// };
</style>