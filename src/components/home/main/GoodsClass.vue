<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-28 11:01:48
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-03-01 16:23:18
-->
<template>
<div class="goods-class"
  v-infinite-scroll="getMore"
  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
  <!-- 顶部 分类 -->
  <div class="top-bg">
    <div>      
      <ul class="g-c-top">
        <li v-for="gc in (openClose?slide.child:slide.child.slice(0,9))" :key="gc.gc_id"
          @click="fun_goCategorySearch(gc.gc_id)"
          >
          <img :src="gc.pic" alt="">
          <div>{{gc.gc_name.slice(0,5)}}</div>
        </li>
        <li class="g-c-open" @click="openClose = !openClose" v-if="slide.child.length>9" >
          <img :class="{rotate:openClose}"  src="@/assets/image/icon2/open-good-class.png" alt="">
          <span>{{openClose?"收起":"展开全部"}}</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 广告位 -->
  <div class="banner"
    v-if="slide.banner_image"
    @click="fun_goCategorySearch(slide.gc_id)">
    <img class="filter" :src="slide.banner_image" alt="">
  </div>
  <!-- 猜你喜欢 -->
  <div class="yourLike">
    <span>猜你喜欢</span>
    <img class="filter" src="@/assets/image/main/main-bg-goods.png" alt="">
  </div>

  <!-- 商品 -->
  <div  class="main-content" v-if="goods_list">
    
    <waterfall :col='2' :data="goods_list" style="width:7.1rem">
      <template>
        <div class="list" 
        v-for="(obj,index) in goods_list" :key='index'
        @click="fun_GoDetails(obj)"
        :class="{oldClass:obj.old}"
        >
        <img :src="obj.goods_image" alt="">
        <div class="con">{{obj.goods_name}}</div>
        <div class="bot">
          <p>
            <span>￥</span>
            <span>{{obj.goods_news_price}}</span>
          </p>
          <span class="icon iconfont">&#xe6ae;</span>
        </div>
      </div>
      </template>
    </waterfall>
    <!-- <div class="list" 
      v-for="(obj,index) in goods_list" :key='index'
      @click="fun_GoDetails(obj)"
       :class="{oldClass:obj.old}"
      >
      <img :src="obj.goods_image" alt="">
      <div class="con">{{obj.goods_name}}</div>
      <div class="bot">
        <p>
          <span>￥</span>
          <span>{{obj.goods_news_price}}</span>
        </p>
        <span class="icon iconfont">&#xe6ae;</span>
      </div>
    </div> -->
    <!-- <div class="end">
      <div class="loading-wrapper" v-if="goods_list.length > 0">
        <p class="common-no-more" v-if="!isMore">没有更多了</p>
        <mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
      </div>
    </div> -->
  </div>
    <div class="end">
      <div class="loading-wrapper" v-if="goods_list.length > 0">
        <p class="common-no-more" v-if="!isMore">没有更多了</p>
        <mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
      </div>
    </div>
  <!-- 空白页 -->
  <empty-record-new v-if="goods_list&&goods_list.length <= 0 && !isMore" isFrom='search'></empty-record-new>			
</div>
</template>

<script>
// Your own value is controlled by yourself. No one should believe it!
// import { mapState } from 'vuex';
// import { Toast } from 'mint-ui';

import { getGoodsClassGoods } from '../../../api/homesearch';
import EmptyRecordNew from '../../EmptyRecordNew';

export default {
  name:"GoodsClass",
	data(){
		return{

			openClose: false,   // 展开关闭 分类
			loading  : true,   // 是否加载更多
      isMore   : true,    // 是否有更多
      
      goods_list:[
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
      ],     // 商品列表

			params : {
				page    : 0,            // 第几页
				pageSize: 10,           // 每页条数
				keyword : "",           // 关键词
				sort_key: "",           // 排序
				gc_id   : 1,            // 分类
				key     : this.token,   // 用户标识
			},
		}
  },
  
  props:{
    slide       : Object,   // 当前模块的 分类
    currentSlide: Number,   // 父组件的 当前index
    nowIndex    : Number,   // 自己的 index
  },

  watch:{
    // 监听变化 只有在显示 当前模块时 才触发 请求数据
    currentSlide(val){
      ( val == this.nowIndex && (this.goods_list.length && this.goods_list[0].old) ) && (
        this.getNewData()
      )
    }
  },

  components:{
    'empty-record-new' : EmptyRecordNew,  // 空白页
  },
  
  created(){
    // 初始化 分类 更改为当前
    this.params.gc_id = this.slide.gc_id; 
  },

	methods:{
		// 懒加载
		getMore(){
			this.loading = true; // 禁止loading
			this.params.page = ++this.params.page;  // 第几页
			if (this.isMore) {
				this.getValue(true);
			}
    },
    
    // 获取 数据 
		getValue(hasOld){  
			getGoodsClassGoods(this.params).then(res=>{
				hasOld?(
          // 如果 有旧数据  追加
					this.goods_list = this.goods_list.concat(res.result.goods_list)
				):(
          // 首次 查询 
					this.goods_list = res.result.goods_list
        )
        // 根据返回值 判断 是否还有 后续数据
        this.isMore = res.result.hasmore;
        setTimeout(()=>{          
          // 开启
          this.loading = false;
        },500)
			}).catch(err=>{
				Toast(err.message);
			})
    },
    
    // 跳转到 分类搜索 页面
    fun_goCategorySearch(gc_id){
      // 记住是 当前 滚动 状态 
      this.$emit('getScrollTop','');
      this.$router.push( 
        { 
          name: "HomeCategorySearch",
          query: {
            gc_id_father: this.slide.gc_id,
            gc_id: gc_id
          } 
        }
      );
    },
    
    // 跳转到 商品详情 页面
		fun_GoDetails(obj) {
      // 记住是 当前 滚动 状态 
      this.$emit('getScrollTop','');
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: obj.goods_id } });
    },

    // 加载新数据
    getNewData(){      
      this.goods_list = [];
      this.params.page = 0;
      this.isMore = true;
      this.getMore();
      // console.log("触发");
    },

    // 清空旧数据
    clearGoodsClass(){
      this.goods_list = [
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
        {
          goods_name:"",
          goods_image:"http://shop.ihaosy.com/uploads/home/common/default_goods_image.jpg",
          goods_price:"",
          old:true,
        },
      ];    // 商品列表
      this.params.page = 0;
      // this.goods_list = [];
      // this.loading = false;
      // this.params.page = 0;
      // this.getMore();
    }
		
	},
}
</script>

<style scoped lang="scss">
.goods-class{
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  
  div,ul,li,p,span,input,img{
    box-sizing: border-box;
  }

  .top-bg{
    background: #E63116;
    width: 100%;
    height: fit-content;
    padding: 0.2rem 0 0 0;
    >div{
      transition: all .5s;
      width: 7.5rem;
      border-top-left-radius: 0.2rem;
      border-top-right-radius: 0.2rem;
      margin: 0 auto;
      height: fit-content;
      background: #fff;
      padding-top: 0.2rem;
    }
  }

  .g-c-top{
    width: 7.1rem;
    margin: 0 auto;
    border-radius: 0.1rem;
    height: fit-content;
    box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0.2rem;
    padding-top: 0;
    li{
      width: 20%;
      height: 1.1rem;
      height: fit-content;
      max-height: 1.4rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.3rem;
      margin-top: 0.15rem;
      font-size: .2rem;
      font-weight: 500;
      color: #666666;
      // text-align: center;
      img{
        width: 1.02rem;
        height: .69rem;
      }
      div{  
        width: 1.02rem;
        height: 0.34rem;
        text-align: center;
      }
    }
    .g-c-open{
      img{
        width: 0.47rem;
        height: 0.47rem;
        margin-bottom: 0.2rem;
      }
    }
    .rotate{
      transform: rotate(180deg);
    }
  }

  // guanggao
  .banner{
    width: 7.10rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    img{
      width: 100%;
    }
  }
  .yourLike{
    height: 0.42rem;
    font-size: .34rem;
    font-weight: bold;
    color: #161616;
    text-align: center;
    position: relative;
    margin-top: 0.2rem;
    span{
      position: relative;
      z-index: 1;
    }
    
    .filter{
      width: 4.03rem;
      height: 0.17rem;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0.3rem);
    }
  }

  // 商品列表			
  .main-content{
    $bor:0px;
    div,ul,li,p,span,input,img{
      box-sizing: border-box;
    }
    
    // width: 6.9rem;
    // margin: 0 auto;
    // box-sizing: border-box;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;

    
    width: 7.5rem;
    padding: .20rem;
    box-sizing: border-box;
    // column-count: 2;   // 两行    
    // column-gap: 0.3rem;// 列间距

    &/deep/.vue-waterfall-column{
      width: 3.45rem !important;
      &:nth-child(2){
        margin-right: 0.2rem;
      }
    }

    .list {
      break-inside: avoid;
      width: 3.30rem;
      border: $bor solid red;
      overflow: hidden;

      width: 3.45rem;
      // height: 5.22rem;
      background: #FFFFFF;
      box-shadow: 0px 0px .16rem 0px rgba(0, 0, 0, 0.08);
      border-radius: .10rem;
      margin-bottom: 0.2rem;
      padding-bottom: 0.2rem;
      color: #D00303;

      img{
        width: 100%;
        border: 0.1rem;
      }
      .con{
        width: 2.67rem;
        margin: 0.2rem auto;
        font-size: .30rem;
        font-weight: 500;
        color: #333333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -moz-line-clamp: 2;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        overflow: hidden;
      }
      .bot{
        width: 2.67rem;
        height: 0.32rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        p{
          display: flex;
          align-items: flex-end;
          font-size: 0.24rem;
        }
        span{
          font-size: .26rem;
          font-weight: 500;
        }
        .icon{
          font-size: 0.36rem;
        }
      }
    }
    .oldClass{
      background:#B7B7B7;
      color: #B7B7B7;
    }
  }

  .end{
    width: 100%;
    text-align: center;
    p{
      font-size: 0.32rem;
      padding: 0 0 0.2rem 0;
    }
  }
}
</style>