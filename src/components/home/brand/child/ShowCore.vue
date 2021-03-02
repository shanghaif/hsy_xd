<template>
  <div class="show_core">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">{{title}}</span>
				<!-- <img class="img-back" @click="$router.push({name:'HomeBrandSearch'})" src="@/assets/image/brand/h5_search.png" alt="" /> -->
				<span class="header-right"></span>
				<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
			</div>
		</div>
    <!-- 多张图片 -->
    <div class="introduct_swippe">
      <mt-swipe :show-indicators="false">
        <mt-swipe-item v-for="(v,i) in imgArr" :key="i">
          <div class="relative">
            <img :src="v" alt="">
            <div class="page">
              <span>{{i+1}}/{{imgArr.length}}</span>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 内容文字 -->
    <div class="text_cont">
      <!-- 标题  -->
      <div class="name">
        <p>{{val.itemtit}}</p>
        <p>{{val.itemtit1}}</p>
      </div>
      <!-- 文字介绍 -->
      <ul class="text_info">
        <li v-for="(v,i) in 1" :key="i">
          <!-- <p>{{(i+1)|convertToChinaNum}}、就才听出引性</p> -->
          <!-- <p>{{val.item_more}}</p> -->
          <div v-html="val.item_more">

          </div>
        </li>        
      </ul>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';
import { getSaunitIntro } from '../../../../api/homebrand.js';

export default {
	data() {
		return {
      imgArr: [],  // 顶部图片
      list: {},  // 信息

      val:this.$route.query.v,  //  获取 传过来的值
      title:this.$route.query.tit,  //  获取 传过来的值
		};
  },
	computed: {
		...mapState({
			store_id: state => state.homebrand.store_id,
		})
  },
  filters: {
    // 数字 转化为 大写
    convertToChinaNum: function (num) {
      var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
      var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
      if(!num || isNaN(num)){
          return "零";
      }
      var english = num.toString().split("")
      var result = "";
      for (var i = 0; i < english.length; i++) {
          var des_i = english.length - 1 - i;//倒序排列设值
          result = arr2[i] + result;
          var arr1_index = english[des_i];
          result = arr1[arr1_index] + result;
      }
      //将【零千、零百】换成【零】 【十零】换成【十】
      result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
      //合并中间多个零为一个零
      result = result.replace(/零+/g, '零');
      //将【零亿】换成【亿】【零万】换成【万】
      result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
      //将【亿万】换成【亿】
      result = result.replace(/亿万/g, '亿');
      //移除末尾的零
      result = result.replace(/零+$/, '')
      //将【零一十】换成【零十】
      //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
      //将【一十】换成【十】
      result = result.replace(/^一十/g, '十');
      return result;

    }
  },
  created(){
    // console.log(this.val);
    this.imgArr = this.val.item_pic;
    // getSaunitIntro(this.store_id).then(res=>{
    //   this.imgArr = JSON.parse(res.result.saunit_intro.item_pic);
    //   this.list = res.result.saunit_intro;
    // })
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
.show_core{
  // 字体 小
  @mixin fs_small{
    font-size: 3.48vw;
  }
  // 字体 中
  @mixin fs_{
    font-size: 4.18vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size: 4.58vw;
  }
    // 边距
  $pmvw: 4vw;
  
  
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

  // 多张图片
  .introduct_swippe{
    width: 100vw;
    height: 53.5vw;
    .relative{
      position: relative;
      width: 100%;
      height: 100%;
      .page{
        position: absolute;
        margin: 0 auto;
        font-size: 3.58vw;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border-radius: 8px;
        padding: .2vw 3vw;
        transform: translate(-50%, -30%);
        bottom: 0;
        left: 50%;

      }

      img{
        width: 100%;
        height: 100%;
      }
    }

  }

  // 内容文字
  .text_cont{
    padding: 2vw $pmvw;
    @include fs_small;
    // 标题
    .name{
      @include fs_big;
      font-weight: 600;
      margin: 2vw 0;
      p{
        margin: 1vw 0;
        &:last-child{
          @include fs_;
          color:#999;
        }
      }
    }
    // 文字详细
    .text_info{
      li{
        @include fs_small;
        line-height: 1.6;
        color: #000;
        margin:1vw 0;
      }
    }
  }
}
</style>
