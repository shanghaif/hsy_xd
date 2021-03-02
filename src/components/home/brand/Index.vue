<template>
  <div class="brand_index">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<img class="header-left" @click="$router.push({ name: 'HomeIndex' })" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">食安山东</span>
				<!-- <img class="img-back" @click="$router.push({name:'HomeBrandSearch'})" src="@/assets/image/brand/h5_search.png" alt="" /> -->
				<span class="header-right"></span>
				<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
			</div>
		</div>
		<!-- 按钮 -->
		<ul class="btn_cont">
			<li v-for="(v,i) in list" :key="i" >
				<mt-button @click="fun_jump(v)">{{v.name}}</mt-button>
			</li>
		</ul>
		
  </div>
</template>


<script>
import { Toast, Indicator } from 'mint-ui'
import {  mapMutations } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import { getUnitType } from '../../../api/homebrand.js';

export default {
  data(){
    return{
			list:[
				{ name:"食安山东", id:1 },
				{ name:"食安曹县", id:2 },
			]
    }
  },
  created(){    
  },
  mounted(){    
		resetRem();
		// 获取 当前经纬度 赋值
    this.utils.getLatLng().then(obj=>{
      // console.log(obj);
      this.savelatlng(obj);
    })
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {    
    ...mapMutations({
      savebrand: 'savebrand',
      savelatlng: 'savelatlng',
      saveUnitTypeArr: 'saveunittypearr',
    }),
    fun_jump(obj){
      this.savebrand( { id: obj.id, name: obj.name } );
      getUnitType().then(res=>{
        this.saveUnitTypeArr(res.result);
        this.$router.push({ 'name': 'HomeBrand'})
      }).catch(err=>{
        Toast(err.message);
      })
    }

  },

}
</script>

<style scoped lang='scss'>
.brand_index{
  
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

	// 按钮 内容
	.btn_cont{
		padding: 4vw;
		display: flex;
		li{
			margin: 2vw;
		}
	}
}
</style>
