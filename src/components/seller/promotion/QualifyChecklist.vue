<template>
<div class="qualifyChecklist">
  <mt-popup  position="bottom" v-model="showState">
    <div class="mt1">
      <span class="out" @click="showState=false">×</span>
      <p class="title">选择商品</p>
			<div class="seller-search">
				<input type="text" placeholder="请输入您要搜索的商品" v-model="keyword" />
				<img src="@/assets/image/icon2/icon-white-search.png" @click="keySearch" alt="" />
			</div>
      <!-- 我的合格证 -->
      <div class="over" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="li_cont" 
          @click="fun_choose(item)"
           v-for="(item,index) in goods_list" :key="index"
          >
          <!-- 上部分 -->
          <div class="li_top">
            <img :src="item.goods_image" alt="">
            <div>
              <p>商品名称：{{item.goods_name}}</p>
              <p>商品价格：{{item.goods_price}}</p>
              <p>生成日期：{{new Date(item.goods_addtime*1000).toLocaleDateString()}}</p>
            </div>
          </div>
          <!-- 上部分结束 -->
        </div>
        <div v-if="!this.goods_list.length" style="text-align:center;padding-top:6.8rem">暂无合格证</div>  
      </div>  
    </div>
  </mt-popup>  
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { getMansongSearchGoods } from "../../../api/sellerPromotion";//获取 证书列表

export default {
  data(){
    return{
      showState:false,
      list:{},


			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			goods_list: [], // 商品列表
      keyword: '',
      
      sendTime:null,
    }
  },
  filters: {      
    // fil_dateType: function ( v ) {
    //   // 逻辑代码
    //   return v.split(' ')[0];
    // }
  },
  created(){
    // this.params.page = 1;
    // this.getduomaihList()
    // setInterval(()=>{
    //   console.log(this.loading);
    // },1000)
  },
  methods:{
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getduomaihList(true);
			}
    },
    keySearch(){  
      var nowTime = new Date().getTime();
      if( nowTime > this.sendTime + 680 ){
        this.params.page = 1;
        this.getduomaihList(false);
        this.sendTime = nowTime;
      }
    },
    getduomaihList(ispush){
      // console.log(ispush);
      this.params.goods_name = this.keyword;
      getMansongSearchGoods(this.params).then(res=>{
				if (ispush == true ) {
					this.goods_list = this.goods_list.concat(res.result.goods_list);
				} else {
          this.goods_list = res.result.goods_list;
				}
        this.isMore = res.result.hasmore;
				this.loading = false;
      }).catch(err=>{
        Toast(err.message);
      })
    },


    fun_choose(item){
      // 隐藏
      this.showState = false;
      //使用$emit想父组件进行传值
      this.$emit("onQualifyChoose",item);
      this.params.page = 1;
      this.getduomaihList(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.qualifyChecklist{
  .mint-popup-bottom{
    height: 90vh;
    // overflow: hidden;
    background: transparent;
  }
  .mt1{      
    background: #fff;
    background: #626771;
    height: 100%;
    border-radius: 1rem 1rem 0 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 10;

    
    .seller-search {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 1rem 0;
      background: #626771;
      input {
        box-sizing: border-box;
        width: 80%;
        border-radius: 1.64rem;
        // background: #FFFFFF url(../../../assets/image/home/icon_search.png) no-repeat 1rem center;
        // background-size: 1.4rem;
        padding: 0.52rem 2rem 0.52rem 3rem;
        margin-right: 2rem;
      }
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
    .seller-search .mint-cell {
      min-height: 0;
    }
    .seller-search .mint-cell:after {
      background-color: #fff !important;
    }

    .out{
      position: absolute;
      right: 1rem;
      top: -0.2rem;
      font-size: 2.8rem;
      color: #fff;
    }

    .title{
      text-align: center;
      color: #fff;
      margin: .68rem 0;
      font-size: 1.8rem;
    }
    .over{
      height: 75vh;
      // overflow: auto;
      overflow-y : auto;
      padding: .42rem 1rem;
      .li_cont{
        color: #fff;
        font-size: 0.7rem;

        padding: 0 .8rem 0;
        margin: 1rem 0;
        background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
        box-shadow:0px 0px 20px 0px rgba(63,206,177,0.4);
        border-radius:16px;
        ////////////////////////////////
        // 返回箭头
        .see_arrow {
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          margin: 0 auto;
          top: -.38em;
          right: -.2rem;
        }
        .see_arrow:after {            
          content: '';
          display: block;
          width: .4rem;
          height: .4rem;
          transform: rotate(45deg);
          border-right: 2px solid #fff;
          border-top: 2px solid #fff;
          margin-top: .5rem;
        }
        //////////////////////////////////

        .li_top{
          padding: 1rem 0;
          display: flex;
          justify-content: flex-start;
          img{
            height: 6.8rem;
            width: 6.8rem;
          }
          div{
            margin-left: 1rem;
            height: 6.8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }




        .li_bottom{
          position: relative;
          padding: .2rem 0;
          line-height: 1.828;
          border-top: 1px solid #fff;
          .see_arrow{
            top: 0;
          }
        }
      }
    }
  }
} 
</style>