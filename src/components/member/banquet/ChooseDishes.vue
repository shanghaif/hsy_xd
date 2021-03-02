<template>
	<div class="choose-dishes">
    <!-- 头部 -->
		<head-title fontSize='0.32rem' title="按菜谱选菜"></head-title>
    <!-- 搜索框 -->
    <div class="search">
      <img src="@/assets/image/icon2/icon-search-black.png" alt="">
      <input v-model="params.keywords" placeholder="请输入菜品名称" type="text">
      <span @click="funSearch">搜索</span>
    </div>
    <!-- 列表内容 -->
		<div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<!-- 如果 有数据 -->
			<div class="order-body" v-if="foods_Arr && foods_Arr.length">
				<!-- 循环 -->
				<div v-for="(order_group, index) in foods_Arr" v-bind:key="index">
					<div class="list">
            <div class="left-img">
              <img :src="order_group.goods_image" alt="">
            </div>
            <ul class="right-info">
              <li>
                <span>{{order_group.goods_name}}</span>
                <span>
                  <span>￥</span>
                  <span>{{order_group.goods_price}}</span>
                </span>
              </li>
              <li class="info-center">{{order_group.store_name}}</li>
              <!-- 底部 -->
              <li class="info-last">
                <div class="name">
                  西红柿炒鸡蛋
                </div>
                <div class="btn">
                  <button v-show="order_group.num>0" @click="fun_del(order_group)">-</button>
                  <span>{{order_group.num}}</span>
                  <button @click="fun_add(order_group)">+</button>
                </div>
              </li>
            </ul>

					</div>
				</div>
			</div>
			<!-- 否则 没有数据 -->
			<div class="empty-order" v-if="foods_Arr&&!foods_Arr.length">
				<img class="img" src="@/assets/image/icon2/icon-empty-content.png" alt="">
				<p class="title">{{toastMessage}}</p>
				<!-- <p class="small">暂无此菜品</p> -->
				<!-- <button>去添加菜品</button> -->
			</div>
		</div>
		<!-- 底部购物车 -->
		<div class="cart">
			<div @click="addCart">加入购物车</div>
		</div>

  </div>

</template>

<script>	
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { getMemberBanqueMenu } from '../../../api/memberBanquet';
import { cartAdd } from '../../../api/homecart';
import { mapState } from 'vuex';
export default {
	components: {
		HeadTitle
	},
	data() {
		return {
			toastMessage:"请输入您要搜索的菜品名称",
			params: {
				keywords: '',
				page: 0,
				per_page: 10
			},
			loading: true, // 是否加载更多
			isMore: true,   // 是否有更多
			foods_Arr: [],
      aaa:0,
      cartArr:[],
		};
	},
  mounted() {		
		let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    
    html.style.fontSize = (sw/7.50) + 'px';
		// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
      html.style.fontSize = (sw/7.50) + 'px';
		};
	},
	beforeDestroy() {
		resumeRem();
	},
	computed: {
		...mapState({
			user: state => state.member.info,
			mclass: state => state.member.mclass,
		})
	},
	created: function() {
    this.funSearch();
	},

	methods: {
    // 点击添加
    fun_add(v){
      v.num++;
      this.$forceUpdate();
      // console.log(v.num);
    },
    // 点击删除
    fun_del(v){
      v.num--;
      this.$forceUpdate();
      // console.log(v.num);
    },

    // 点击 加入购物车
    addCart(){
      for( var item of this.foods_Arr ){
        if( item.num > 0 ){
          this.cartArr.push( item )
        }
      }
      console.log(this.cartArr);
      for( var obj of this.cartArr ){
        let m_per = 1;
        if (this.mclass == 1) {
          m_per = obj.goods_l_price;
        }
        if (this.mclass == 2) {
          m_per = obj.goods_c_price;
        }
        if (this.mclass == 3 || this.mclass==6 ) {
          m_per = obj.goods_p_price;
        }
        if (this.mclass == 4) {
          m_per = obj.goods_B_price;
        }
        if (this.mclass == 5) {
          m_per = obj.goods_j_price;
        }      
        cartAdd(obj.goods_id, obj.num, '', m_per, '', '' ).then(res => {
          // console.log(res);
          Toast(res.message);
        }).catch(err=>{
          Toast(err.message);
        })
      }
      // Toast('成功');
    },

		// 点击搜索函数
		funSearch(){
			this.foods_Arr = [];
			// this.loading = false;
      this.toastMessage = "暂未找到您要搜索的菜品";
      
			getMemberBanqueMenu(this.params).then(res => {
				Indicator.close();
        console.log(res);
        this.foods_Arr = res.result;
        for( var obj of this.foods_Arr ){
          obj.num = 0;
        }
      })
			// this.getMore
		},
		// 初始化函数
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getMore(false);
			}
		},
		getMore(ifReplace) {
			Indicator.open();
			if (ifReplace) {
				this.loading = false;
				this.params.page = 1;
				this.isMore = true;
			}
			getMemberBanqueMenu(this.params).then(res => {
				Indicator.close();
        console.log(res);
        this.foods_Arr = res.result;
        for( var obj of this.foods_Arr ){
          obj.num = 0;
        }
      })
			// 	Indicator.close();
			// 	if (res.result.hasmore) {
					this.isMore = true;
			// 	} else {
			// 		this.isMore = false;
			// 	}

			// 	let tOrderGroup = res.result.foods_Arr;

			// 	if (tOrderGroup) {
			// 		if (ifReplace || !this.foods_Arr) {
			// 			this.foods_Arr = tOrderGroup;
			// 		} else {
			// 			this.foods_Arr = this.foods_Arr.concat(tOrderGroup);
			// 		}
			// 	}
			// setTimeout(()=>{
			// 	Indicator.close();
			// 	this.foods_Arr = this.foods_Arr.concat([ 1,2 ]);
			// 	this.aaa++;
			// 	if(this.aaa>3){
			// 		this.foods_Arr = [];
			// 	}
			// },500)
			// })
			// .catch(function(error) {
			// 	Indicator.close();
			// 	Toast(error.message);
			// });
		},
	}
};
</script>
<style lang="scss" scoped>
.choose-dishes{
  height: 100vh;
  display: flex;
  flex-direction: column;

  div,input,span{
    box-sizing: border-box;
  }
  // 头部
  
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

  // 搜索 标签
  .search{
    height: 1.00rem;
    padding: .20rem .30rem;
    display: flex;
    align-items: center;
    position: relative;
    input{
      width: 6.05rem;
      height: .60rem;
      background: #F3F3F3;
      border-radius: .40rem;
      color: #4C4C4C;
      font-size: .26rem;
      padding-left: .93rem;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #B7B7B7;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #B7B7B7;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #B7B7B7;
    }
    span{
      margin-left: .28rem;
      color: #4C4C4C;
      font-size: .28rem;
    }
    img{
      position: absolute;
      left: .80rem;
      width: .26rem;
      height: .26rem;
    }

  }

  // 列表内容
  .cont{
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    padding: .20rem .30rem;

    .list{
      width: 6.90rem;
      height: 1.49rem;
      margin-bottom: .60rem;
      display: flex;

      .left-img{
        width: 1.49rem;
        height: 1.49rem;
        margin-right: .20rem;
        // background: #8B5F5F;
        border-radius: .08rem;
        // border: 1px solid #eee;
        overflow: hidden;
        img{
          width: 1.49rem;
          height: 1.49rem;
		  border-radius: 0.08rem;
        }

      }
      
      .right-info{
        flex: 1;
        li{  
          display: flex;
          justify-content: space-between;
          >span{
            height: .37rem;
            font-size: .26rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #161616;
            line-height: .37rem;
            &:last-child{
              height: .42rem;
              font-size: .30rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FF0000;
              line-height: .42rem;

            }
          }

        }
        .info-center{
          margin-top: .20rem;
					font-size: .24rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #4F4F4F;

        }

        .info-last{
					padding-top: 0.23rem;
          .name{
            height: .33rem;
            background: #FFF0EC;
            border-radius: .03rem;
            padding: .02rem .09rem .01rem .10rem;

            height: .30rem;
            font-size: .22rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FF7653;
            line-height: .30rem;
          }

          .btn{
						display: flex;
            button{
              width: .36rem;
              height: .36rem;
              background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
              border-radius: 50%;
              color: #fff;
              text-align: center;
              line-height: .36rem;
            }
            span{
              margin: 0 .20rem;
							font-size: 0.28rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FF0000;
							min-width: 0.34rem;
    					text-align: center;
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

	// 底部购物车
	.cart{
		width: 7.50rem;
		height: 0.98rem;
		background: #FFFFFF;
		padding: 0.14rem 0.3rem;
		text-align: right;
		display: flex;
		justify-content: flex-end;
		div{
			color: #fff;
			width: 1.96rem;
			background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
			border-radius: .35rem;
			font-size: .24rem;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			padding: 0.18rem 0.35rem;

		}
	}

}
</style>
