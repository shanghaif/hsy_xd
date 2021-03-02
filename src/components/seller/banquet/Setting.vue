<template>
<div class="banquet-setting" :class="{banquetSettingBg:!openValue}">
  <!-- 顶部返回栏 -->
  <head-title fontSize='0.32rem' title="宴席设置"></head-title>
  <!-- 主题内容  -->
  <div class="main" >
    <!-- 顶部按钮 -->
    <div class="top-btn " :class="{topBtnOpen:openValue}">
      <div>
        <span>宴席预订功能</span>
        <div>
          <mt-switch v-model="openValue"></mt-switch>
        </div>
      </div>
      <p>启用“宴席预订”功能后，用户可线上提交预订宴席信息订单</p>
    </div>
    <!-- 关闭状态 -->
    <div v-show="!openValue" class="change-close">
      <!-- 标题 -->
      <div class="title">
        <img src="@/assets/image/icon2/banquet-tit.png" alt="">
      </div>
      <!-- 介绍 -->
      <div class="introduction">
        <p>
          为了满足有宴席预订需求的用户，现增加宴席预订功能，商家开启后，用户可提交宴席预订订单，商家根据预订信息线下与用户沟通细节后接单并准备
        </p>
      </div>
      <!-- 轮播图 -->
      <div class="main-swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item class="swipe1">
            <p>
              <span>1.</span>
              <span>开启后，在店铺首页将显示“宴席预订”入口</span>
            </p>
            <div>
              <img src="@/assets/image/icon2/banquet-sw1.png" alt="">
            </div>
          </mt-swipe-item>
          <mt-swipe-item class="swipe1">
            <p>
              <span>2.</span>
              <span>可在“宴席预订”里查看用户提交的宴席预订订单</span>
            </p>
            <div>
              <img src="@/assets/image/icon2/banquet-sw2.png" alt="">
            </div>
          </mt-swipe-item>
          <mt-swipe-item class="swipe1">
            <p>
              <span>3.</span>
              <span>商家接单时需录入宴席订金与，用户将根据这个金额支付</span>
            </p>
            <div>
              <img src="@/assets/image/icon2/banquet-sw3.png" alt="">
            </div>
          </mt-swipe-item>
          <mt-swipe-item class="swipe1">
            <p>
              <span>4.</span>
              <span>如果用户选择“厨师上门”，商家交替对应的上门厨师</span>
            </p>
            <div>
              <img src="@/assets/image/icon2/banquet-sw4.png" alt="">
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <!-- 开始状态 -->
    <div v-show="openValue" class="change-open">
      <!-- 支持宴席方式 -->
      <div class="way">
        <span class="bright">*</span>
        <span>可支持宴请方式:</span>
        <ul>
          <li>
            <input value="1" v-model="ModeArr" type="checkbox">
            <div>
              <img v-show="ModeArr[0]==1||ModeArr[1]==1" src="@/assets/image/icon2/icon-select.png" alt="">
            </div>
            <span>到店堂食</span>
          </li>
          <li>
            <input value="2" v-model="ModeArr" type="checkbox">
            <div>
              <img v-show="ModeArr[0]==2||ModeArr[1]==2" src="@/assets/image/icon2/icon-select.png" alt="">
            </div>
            <span>厨师上门</span>
          </li>
        </ul>
      </div>
      <!-- 店内支持桌型 -->
      <div class="way">
        <span class="bright">*</span>
        <span>店内支持桌型:</span>
        <ul>
          <li>
            <input value="1" v-model="TableTypeArr" type="checkbox">
            <div>
              <img  v-show="TableTypeArr[0]==1||TableTypeArr[1]==1||TableTypeArr[2]==1" src="@/assets/image/icon2/icon-select.png" alt="">
            </div>
            <span>小桌</span>
          </li>
          <li>
            <input value="2" v-model="TableTypeArr" type="checkbox">
            <div>
              <img  v-show="TableTypeArr[0]==2||TableTypeArr[1]==2||TableTypeArr[2]==2" src="@/assets/image/icon2/icon-select.png" alt="">
            </div>
            <span>大桌</span>
          </li>
          <li>
            <input value="3" v-model="TableTypeArr" type="checkbox">
            <div>
              <img  v-show="TableTypeArr[0]==3||TableTypeArr[1]==3||TableTypeArr[2]==3" src="@/assets/image/icon2/icon-select.png" alt="">
            </div>
            <span>包间</span>
          </li>
        </ul>
      </div>
      <!-- 最大可预订桌数: -->
      <div class="num">
        <div class="way">
          <span class="bright">*</span>
          <span>最大可预订桌数:</span>
        </div>
        <ul>
          <li  v-show="TableTypeArr[0]==1||TableTypeArr[1]==1||TableTypeArr[2]==1" >
            <span>小桌</span>
            <input min="1" type="number" v-model="Info.table_maxnum.xz" placeholder="请输入最大可预订多少桌">
          </li>
          <li  v-show="TableTypeArr[0]==2||TableTypeArr[1]==2||TableTypeArr[2]==2" >
            <span>大桌</span>
            <input min="1" v-model="Info.table_maxnum.dz" placeholder="请输入最大可预订多少桌" type="number">
          </li>
          <li  v-show="TableTypeArr[0]==3||TableTypeArr[1]==3||TableTypeArr[2]==3" >
            <span>包间</span>
            <input min="1" v-model="Info.table_maxnum.bz" placeholder="请输入最大可预订多少桌" type="number">
          </li>
        </ul>
      </div>
      <!-- 每桌最多可坐人数: -->
      <div class="num">
        <div class="way">
          <span class="bright">*</span>
          <span>每桌最多可坐人数:</span>
        </div>
        <ul>
          <li  v-show="TableTypeArr[0]==1||TableTypeArr[1]==1||TableTypeArr[2]==1" >
            <span>小桌</span>
            <input min="1" v-model="Info.table_maxnumber.xn" placeholder="请输入最大可预订多少桌" type="number">
          </li>
          <li  v-show="TableTypeArr[0]==2||TableTypeArr[1]==2||TableTypeArr[2]==2" >
            <span>大桌</span>
            <input min="1" v-model="Info.table_maxnumber.dn" placeholder="请输入最大可预订多少桌" type="number">
          </li>
          <li  v-show="TableTypeArr[0]==3||TableTypeArr[1]==3||TableTypeArr[2]==3" >
            <span>包间</span>
            <input min="1" v-model="Info.table_maxnumber.bn" placeholder="请输入最大可预订多少桌" type="number">
          </li>
        </ul>
      </div>

      <button @click="save" class="btn-save">
        保存
      </button>

    </div>
  </div>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, Indicator } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getBanquetStoreInfo, setBanquetStatus, setBanquetInfo } from '../../../api/sellerBanquet.js';

export default {
  data(){
    return{
      openValue: false,
      Info:{
        table_maxnum:{
          xz: null,
          dz: null,
          bz: null,
        },
        table_maxnumber:{
          xn: null,
          dn: null,
          bn: null,
        },
      },
      ModeArr:[],  // 1.到店堂食  2.厨师上门
      TableTypeArr:[],
    }
  },
	components: {
		"head-title":HeadTitle,
  },
  watch:{
    openValue(v){
      v?v=1:v=2;
      setBanquetStatus(v).then(res=>{
        // console.log(res);
      }).catch(err=>{
        Toast(err.message);
      })
    }
  },

  created(){
    this.loading();
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
	beforeDestroy() {
		resumeRem();
  },
  methods:{
    
    // 初始化加载
    loading(){
      getBanquetStoreInfo().then(res=>{
        // console.log(res);
        this.Info = res.result;
        this.openValue = (res.result.status == 1?true:false);
        if( this.Info.banquet_mode ){
          this.ModeArr = this.Info.banquet_mode.split(',');
        }
        if( this.Info.table_type ){
          this.TableTypeArr = this.Info.table_type.split(',');
        }
      }).catch(err=>{
        Toast(err);
      })
    },

    // 保存
    save(){
      var banquet_mode = '';
      var table_type = '';
      for( var mode of this.ModeArr){
        banquet_mode += mode+',';
      }
      var xx = true;
      var dd = true;
      var bb = true;
      for( var table of this.TableTypeArr){
        if( table == 1){
          xx = false;
        }else if( table == 2){
          dd = false;
        }else if( table == 3){
          bb = false;
        }
        table_type += table+',';
      }
      if( banquet_mode.length > 0 ){
        banquet_mode = banquet_mode.slice(0,-1)
      }else{
        Toast("请选择宴请方式");
        return false;
      }
      if( table_type.length > 0 ){
        table_type = table_type.slice(0,-1)
      }else{
        Toast("请选择支持桌型");
        return false;
      }
      // obj.banquet_mode = banquet_mode;
      // obj.table_type = table_type;
      var obj = {
        banquet_mode: banquet_mode,
        table_type: table_type,
        xz: this.Info.table_maxnum.xz,
        bz: this.Info.table_maxnum.bz,
        dz: this.Info.table_maxnum.dz,
        xn: this.Info.table_maxnumber.xn,
        bn: this.Info.table_maxnumber.bn,
        dn: this.Info.table_maxnumber.dn
      };
      if( xx ){
        obj.xz = null;
        obj.xn = null;
      }else{
        if( obj.xz <= 0 || obj.xn<=0 ){
          Toast("请检查输入是否正确");
          return false;
        }
      }
      if( dd ){
        obj.dz = null;
        obj.dn = null;
      }else{
        if( obj.dz <= 0 || obj.dn<=0 ){
          Toast("请检查输入是否正确");
          return false;
        }
      }
      if( bb ){
        obj.bz = null;
        obj.bn = null;
      }else{
        if( obj.bz <= 0 || obj.bn<=0 ){
          Toast("请检查输入是否正确");
          return false;
        }
      }
      
      // console.log(obj);
      setBanquetInfo(obj).then(res=>{
        // console.log(res);
        Toast(res.message);
      }).catch(err=>{
        Toast(err.message);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.banquetSettingBg{
  background-image: url('../../../assets/image/icon2/banquet-setting-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.banquet-setting{
  background-color: #fff;
	@mixin flex{
		display: flex;
		justify-content: space-between;
	}
	div,img,li,ul{
		box-sizing: border-box;
	}
	height: 100vh;
	display: flex;
	flex-direction: column;
	// 主体 文字颜色
	$color:#161616;
	$color-small:#6F6F6F;
	// 字体大小
	$font: 0.28rem;
	// 字体大小
	$font-small: 0.24rem;

	color: $color;
	font-size: $font-small;

	
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
  }

  // 主体内容
  .main{
    flex: 1;
    @include flex;
    flex-direction: column;
    padding: 0.55rem 0 0.34rem 0.3rem;
    
    // 上面按钮
    .top-btn{
      width: 6.90rem;
      height: 1.63rem;
      background: rgba(255, 255, 255, 0.24);
      border-radius: .16rem;
      border: .02rem solid rgba(255, 255, 255, 0.33);

      padding: .30rem .3rem;
      padding-right: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      >div{
        @include flex;
        span{
          height: .40rem;
          font-size: .28rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: .40rem;
        }
        >div{
          width: .84rem;
          height: .44rem;
          background: #FFFFFF;
          border-radius: .40rem;
          margin-right: 0.32rem;
          &/deep/.mint-switch{
            .mint-switch-core{
              width: .84rem;
              height: .44rem;
              &::after{
                width: .34rem;
                height: .34rem;
                background: #FFFFFF;
                // opacity: 0.71;
                top: 0.038rem;
                left: 0.03rem;
                // transform: translate(0.38rem);
              }
              &::before{
                opacity: 0.18;
                width: .84rem;
                height: .44rem;
              }
            }
            .mint-switch-input:checked + .mint-switch-core{
              background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
              border-radius: .40rem;
              border-color: #FF865D;              
              &::after{
                // top: 0.03rem;
                // right: 0.05rem;
                transform: translate(0.38rem);
              }
            }
          }
        }
        
      }
      >p{
        height: .33rem;
        font-size: .24rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: .33rem;

      }

    }
    
    // 开始 按钮
    .topBtnOpen{
      background: #F4F5F7;
      >div{
        span{
          color: #161616;
        }
      }
      >p{
        color: #6F6F6F;
      }
    }

    // 切换 关闭
    .change-close{
      flex: 1;
      @include flex;
      flex-direction: column;
      padding-right: 0.3rem;

      // 图片标题
      .title{
        text-align: center;
        height: 1.97rem;
        height: 0.985rem;
        >img{
          // width: 5.1rem;
          // height: 0.95rem;
          // margin: 0.6rem 0 0.42rem;
          width: 2.55rem;
          height: 0.475rem;
          margin: 0.3rem 0 0.21rem;
        }
      }
      // 介绍
      .introduction{
        width: 6.90rem;
        height: 1.34rem;
        background: #FFFFFF;
        border-radius: .16rem;
        // opacity: 0.17;
        background: rgba(255, 255, 255, 0.24);
        padding: 0.22rem 0.21rem;


        >p{
          font-size: .22rem;
          font-weight: 300;
          line-height: .30rem;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #FFFFFF;
        }
      }
      // 轮播图
      .main-swipe{
        flex: 1;
        padding: 0 0.10rem;
        padding-top: 0.28rem;
        &/deep/.mint-swipe-indicators{
          .mint-swipe-indicator{
            width: 0.25rem;
            height: 0.09rem;
          }
          .is-active{
            background: #FFFFFF;
            border-radius: 0.08rem;
          }
        }
        .swipe1{
          >p{
            >span{
              height: 0.51rem;
              font-size: .25rem;
              font-family: DIN-Bold, DIN;
              font-weight: bold;
              color: #FFFFFF;
              line-height: .49rem;
              &:first-child{
                font-size: .40rem;
              }          
            }
          }
          div{
            text-align: center;
            height: 100%;
            width: 100%;
            >img{
              margin-top: .45rem;
              height: 72%;
            }
          }
        }
      }
    }

    // 切换 开始
    .change-open{
      flex: 1;
      padding: 0.30rem 0;
      // 方式
      .way{
        @include flex;
        justify-content: flex-start;
        height: 0.90rem;
        background: #FFFFFF;
        height: 0.90rem;
        padding: 0.25rem 0;

        font-size: 0.28rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #161616;
        border-bottom: 1px solid #eee;

        .bright{
          color: #FF0000;
          margin-right: .05rem;
        }
        >ul{
          @include flex;
          justify-content: flex-start;
          >li{
            margin-left: 0.30rem;
            @include flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            input{
              width: 100%;
              height: 100%;
              position: absolute;
            }
            >div{
              @include flex;
              justify-content: center;
              align-items: center;
              img{
                width: 0.16rem;
                height: 0.12rem;
              }
              // &:first-child{
                width: .22rem;
                height: .22rem;
                background: #EDEEF0;
                border-radius: .02rem;
                margin-right: 0.06rem;
              // }

            }
          }
        }


      }

      // 桌数
      .num{
        border-bottom: 1px solid #eee;
        .way{
          border-bottom: 0;
        }
        ul{
          padding-left: 0.5rem;
          li{
            height: .40rem;
            font-size: .28rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #161616;
            line-height: .40rem;
            margin-bottom: 0.3rem;
            span{
              margin-right: .34rem;
            }
            input{              
              height: .40rem;
              font-size: .28rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: .40rem;
              color: #161616;
              width: 60%;
            }
            input::placeholder{
              color: #C6C6C6;
            }

          }
        }
      }

      // 保存
      .btn-save{
        width: 6.90rem;
        height: .80rem;
        background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
        box-shadow: 0px 0px .20rem 0px rgba(251, 104, 84, 0.5);
        border-radius: .40rem;
        color: #fff;
        position: fixed;
        bottom: 0.3rem;
        left: 0.3rem;
      }
    }
  }


}
</style>