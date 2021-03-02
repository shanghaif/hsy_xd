<template>
<div class="chef-order">
		<!-- 顶部返回栏 -->
    <head-title fontSize='0.32rem' :title="unit_type_name" fontSizeRight='0.30rem'></head-title>
    
		<!-- 菜品主体列表  -->
		<div class="main">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <ul v-if="order_list && order_list.length">
          <li class="item" v-for="(item,index) in order_list" :key="index"
            @click="goStoreDetail(item)"
            >
						<img :src="item.store_avatar" alt="">
						<div>
							<p>{{item.store_name}}</p>
							<p v-if="item.unit_grade">等级：{{item.unit_grade}}</p>
							<p>评分：<span style="color: #e63116">{{ ((item.store_credit.store_credit_percent / 100) * 5).toFixed(1) }}</span></p>
						</div>
          </li>
        </ul>
      </div>
		</div>
    <!-- 否则 没有数据 -->
    <div class="empty-order" v-show="allShow" v-if="order_list&&!order_list.length">
      <img class="img" src="@/assets/image/icon2/empty-choose-dishes.png" alt="">
      <p class="title">未找到商家</p>
      <!-- <p class="small">暂时还没有用户申请宴席预订</p>
      <button>去添加菜品</button> -->
    </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { getApplySabrandList } from '../../../api/homebrand.js';
import HeadTitle from '../../HeadTitle';

export default {
  data(){
    return{      
      order_list:[],
			allShow:false,
			unit_type_name: '商家列表', // 
      
			params: { 
        page: 0,
        status: -1,
				pagesize: 10,
				sabrand_id:this.$route.query.id,  //  品牌 ID		
      },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
    }
  },
	components: {
		"head-title":HeadTitle,
	},
  
  created(){
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
		// resumeRem();
  },
  methods:{
		// 进入 商家 详情
		goStoreDetail(item){
			var str = '3,4,7,8,9,10,47,48,49,50';
			if( str.indexOf(item.storeclass_id) != -1){
				this.$router.push({ name: 'HomeStoreFoodslist', query: { id: item.store_id } });				
			}else{
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: item.store_id } });	
			}
		},

    // 初始化 加载 函数
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getData(false);
			}
		},
		// 加载函数 
		getData(ifReplace) {
			Indicator.open();
			if (ifReplace) {
				this.params.page = 1;
				this.order_list = [];
			}
			getApplySabrandList(this.params).then(res => {
				Indicator.close();
				this.unit_type_name = res.result.unit_type_name?res.result.unit_type_name:'商家列表';

				this.allShow = true;
				if (res.result.hasmore) {
					this.isMore = true;
					this.loading = false;
				} else {
					this.isMore = false;
					this.loading = true;
				}

				let tOrderGroup = res.result.sabrand_list;

				if (tOrderGroup) {
					if (ifReplace || !this.order_list) {
						this.order_list = tOrderGroup;
					} else {
						this.order_list = this.order_list.concat(tOrderGroup);
					}
				}
			})
			.catch(function(error) {
				Indicator.close();
				Toast(error.message);
			});
		},
  },
  
}
</script>

<style lang="scss" scoped>
.chef-order{
	@mixin flex{
		display: flex;
		justify-content: space-between;
	}
	div,img,ul,li{
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
		.header-title-r{
			right: -15%;
		}
  }
  


  // 主要餐品
  .main{
		flex: 1;
		overflow: scroll;
    padding:0 0.20rem;
    background: #F4F5F7;

    // 顶部两个
    .item{
			width: 7.1rem;
			height: 1.60rem;
			background: #FFFFFF;
			box-shadow: 0px 0px .20rem 0px rgba(0, 0, 0, 0.04);
			border-radius: .16rem;

			padding: 0.3rem;
			display: flex;
			justify-content: flex-start;
			margin: 0.2rem 0;
			>img{
				width: 1rem;
				height: 1rem;
				border-radius: 0.08rem;
				margin-right: 0.2rem;
				border: 1px solid #eee;
    		overflow: hidden
			}
			>div{
				// width: 2.55rem;
				height: .37rem;
				font-size: .26rem;
				font-weight: 500;
				color: #161616;
				line-height: .37rem;
				p{
					&:nth-child(2){
						height: .30rem;
						font-size: .22rem;
						font-weight: 400;
						color: #6F6F6F;
						line-height: .30rem;
					}
					&:nth-child(3){
						height: .28rem;
						font-size: .20rem;
						font-weight: 400;
						color: #6F6F6F;
						line-height: .28rem;

					}
				}

			}

    }



  }
    // 没有数据    
		.empty-order{
			background-color: #fff;
			height: 100%;
			text-align: center;
      transform: translateY(-0.5rem);
			
			.img {
				width: 3.73rem;
				height: 2.66rem;
				margin-top: 1.4rem;
			}

			.title{
				margin: 0.27rem 0 0.31rem 0;
				font-size: 0.28rem;
				font-weight: 400;
				color: #000;
			}
			.small{
				font-size: 0.24rem;
				color: #4C4C4C;
			}
			button{
				margin-top: 0.8rem;
				padding: 0.23rem 0.57rem;
				background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
				box-shadow: 0px 0px 0.2rem 0px rgba(251, 104, 84, 0.37);
				border-radius: 0.16rem;
				color: #fff;
				font-size: 0.24rem;
			}
		}
}
</style>