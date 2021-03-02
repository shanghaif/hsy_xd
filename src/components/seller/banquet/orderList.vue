<template>
<div class="chef-order">
		<!-- 顶部返回栏 -->
    <head-title fontSize='0.32rem' title="宴席订单" :iconright="iconright" fontSizeRight='0.30rem'></head-title>
    <!-- 选择框 -->
		<div class="order-header">
			<ul>
				<li class="item"
					v-for="item in orderNav"
					:key="item.id"
					:class="{ active: params.status == item.id }"
					@click="setOrderNavActive(item.id)">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<!-- 菜品主体列表  -->
		<div class="main">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <ul v-if="order_list && order_list.length">
          <li class="item" v-for="(item,index) in order_list" :key="index"
            @click="$router.push( { name:'BanquetSellerOrderDetail',query:{order_id:item.order_id}} )"
            >
            <!-- 顶部 -->
            <div class="top">
              <div>
                <img :src="item.member_avatar" alt="">
                <span>{{item.member_name}}</span>
                <p>{{new Date(item.add_time*1000).toLocaleString()}}</p>
              </div>
              <span class="statu">{{item.status|filterStatus}}</span>
            </div>
            <div class="return" v-if="item.conduct_status == 1">
              <p>用户已申请宴席退订，请进入详情审核 >></p>
            </div>
            <!-- 主要信息 -->
            <div class="info">
              <div class="time">
                <span>
                  宴请日期: 
                  <span :class="{redClass:new Date(item.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()}">
                    {{item.banquet_time}}</span>
                </span>
                <span>宴请方式: {{item.banquet_mode==1?"到店堂食":"厨师上门"}}</span>
              </div>
              <ul :class="{ulClose:!item.type,ulClose1:!item.type&&item.goods_list&&item.goods_list.length==1}" :style="{height:item.type?(1.48*item.goods_list.length+'rem'):'auto'}">
                <li v-for="(value,i) in item.goods_list" :key="i">
                  <img :src="value.goods_image" alt="">
                  <div>
                    <span>{{value.goods_name}}</span>
                    <div>
                      <span>每桌{{value.goods_num}}件 x {{value.table_num}}桌</span>
                      <span>
                        <span>¥</span>
                        <span>{{value.goods_price}}</span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="item.goods_list&&item.goods_list.length>3 && !item.type" @click.stop="open(item)" class="open">
                <span>展开(共{{item.goods_list?item.goods_list.length:""}}种)</span>
                <img src="@/assets/image/icon2/icon-bottom.png" alt="">
              </div>
              <div v-if="item.type" @click.stop="close(item)" class="open close">
                <span>关闭</span>
                <img src="@/assets/image/icon2/icon-bottom.png" alt="">
              </div>
              <!-- <div class="signIn">
                <button>签到</button>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
		</div>
    <!-- 否则 没有数据 -->
    <div class="empty-order" v-show="allShow" v-if="order_list&&!order_list.length">
      <img class="img" src="@/assets/image/icon2/empty-order.png" alt="">
      <p class="title">未查到您的订单</p>
      <p class="small">暂时还没有用户申请宴席预订</p>
      <button>去添加菜品</button>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { getBanquetStoreList } from '../../../api/sellerBanquet.js';
import HeadTitle from '../../HeadTitle';

export default {
  data(){
    return{
      url:'https://shop.ihaosy.com/uploads/home/store/goods/37/37_2020101309010071369_480.jpg',
      order_list:[],
      allShow:false,
	  iconright:require('@/assets/image/icon2/icon-set-black.png'),
      order:[
        { 
          name:"用户订单",
          type:false,
          foods:[
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
            {name:"西红柿炒鸡蛋"},
            {name:"辣椒炒鸡蛋"},
          ]
        },
      ],	
			orderNav: [
				{
					name: '全部',
					id: -1
				},
				{
					name: '待接单',
					id: 1
				},
				{
					name: '进行中',
					id: 2
				},
				{
					name: '已签到',
					id: 3
				},
				{
					name: '已取消',
					id: 4
				},
				{
					name: '待支付',
					id: 5
				}
			],
			params: { 
        page: 0,
        status: -1,
        pagesize: 5
      },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
    }
  },
	components: {
		"head-title":HeadTitle,
  },
	filters:{
		filterStatus(v){
			// 1待接单  2进行中  3已签到  4已取消  5代支付
			switch(v){
				case 1:
					v = '待接单';
				break;
				case 2:
					v = '进行中';
				break;
				case 3:
					v = '已签到';
				break;
				case 4:
					v = '已取消';
				break;
				case 5:
					v = '代支付';
				break;
				default:
					v = '进行中'
			}
			return v
		}
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
    // 点击 右上角 设置
		fun_right(){
			this.$router.push( { name: "SellerBanquetSetting" } );
    },
    // 更换条件
		setOrderNavActive(index) {
      this.params.status = index;
			this.getOrderList(true);
		},
    open(item){
      // console.log(item);
      item.type = true;
      this.$forceUpdate();
    },
    close(item){
      // console.log(item);
      item.type = false;
      this.$forceUpdate();
    },
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(false);
			}
    },
    
		getOrderList(ifReplace) {
			Indicator.open();
			if (ifReplace) {
				this.params.page = 1;
				this.order_list = [];
			}
			 getBanquetStoreList (this.params)
				.then(res => {
					Indicator.close();
          this.allShow = true;
					if (res.result.hasmore) {
						this.isMore = true;
						this.loading = false;
					} else {
						this.isMore = false;
						this.loading = true;
					}

					let tOrderGroup = res.result.order_list;

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
  computed: {
    ...mapState({
      maskState: state => state.ele.maskState,
      maskId: state => state.ele.maskId
    }),
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

  

	// 选项
	.order-header {
    $color-light:#6f6f6f;
    $color-bright:#FB1319;
    $font-big: 0.28rem; // 28px
    background-color: #fff;
    box-sizing: border-box;
    height: 0.9rem;
    padding: 0.27rem 0.3rem;
    z-index: 100;
		color: $color-light;
		font-size: $font-big;
		ul {
			list-style: none;
			width: auto;
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			height: 100%;
			background: rgba(255, 255, 255, 1);

			li {
				text-align: center;
				color: #6f6f6f;
				&.active {
					position: relative;
					color: $color;
					font-weight: 500;
					&::after {
						content: '';
						position: absolute;
						bottom: -0.06rem;
						left: 16%;
						width: 0.4rem;
						left: 25%;
    				width: 50%;
						height: 0.05rem;
						background: linear-gradient(90deg, #E53216 0%, #FC6952 100%);
						border-radius: 0.03rem;
					}
				}
			}
		}
	}


  // 主要餐品
  .main{
		flex: 1;
		overflow: scroll;
    padding: 0.20rem;
    background: #F4F5F7;

    // 顶部两个
    .item{
      width: 100%;
      // height: 626rem;
      background: #FFFFFF;
      border-radius: 0.16rem;
      margin-bottom: 0.20rem;
      // 顶部
      .top{
        @include flex;
        padding: 0.30rem;
        border-bottom: 1px solid #eee;
        >div{
          @include flex;
          align-items: center;
          img{
            width: 0.50rem;
            height: 0.50rem;
            border-radius: 50%;
            border: 1px solid #eee;
          }
          span{
            margin: 0 0.30rem 0 0.10rem;
            height: 0.33rem;
            font-size: 0.24rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #161616;
            line-height: 0.33rem;
          }
          p{
            height: 0.29rem;
            font-size: 0.24rem;
            font-family: DIN-Regular, DIN;
            font-weight: 400;
            color: #6F6F6F;
            line-height: 0.29rem;
          }
        }
        .statu{
          height: 0.33rem;
          font-size: 0.24rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FB1319;
          line-height: 0.33rem;
        }
      }

      .return{
        width: 7.09rem;
        height: .70rem;
        background: #FDF5C7;
        padding: 0.2rem 0.3rem;
        p{
          height: .30rem;
          font-size: .22rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #F78C08;
          line-height: .30rem;

        }
      }
      // 主要信息
      .info{
        padding: 0.30rem;
        .time{
          @include flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          >span{
            height: 0.33rem;
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6F6F6F;
            line-height: 0.33rem;
            margin-bottom: 0.20rem;
            &:first-child{
              margin-right: 0.70rem;
            }
            
						.redClass{
							color: #FB1319;
						}
          }
        }
        
        // 菜品列表
        ul{
          padding-top: 0.10rem;
          overflow: hidden;
          transition: all 0.68s;
          li{
            @include flex;
            margin-bottom: 0.32rem;
            img{
              width: 1.16rem;
              height: 1.16rem;
              border-radius: 0.16rem;
              margin-right: 0.20rem;
            }
            >div{
              flex: 1;
              @include flex;
              flex-direction: column;
              span{
                height: 0.37rem;
                font-size: 0.26rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #161616;
                line-height: 0.37rem;
              }
              >div{
                @include flex;
                >span{
                  height: 0.33rem;
                  font-size: 0.24rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #6F6F6F;
                  line-height: 0.33rem;
                  &:last-child{
                    height: 0.37rem;
                    font-size: 0.26rem;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #161616;
                    line-height: 0.37rem;
                  }
                }
              }
            }
          }
        }
        .ulClose{
          height: 3.06rem !important;
          overflow-y: hidden;
        }
        .ulClose1{
          height: 1.53rem !important;
          overflow-y: hidden;
        }

        // 展开
        .open{
          @include flex;
          justify-content: center;
          align-items: center;
          span{
            height: 0.33rem;
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6F6F6F;
            margin-right: 0.11rem;
            line-height: 0.33rem;
          }
          img{
            width: 0.19rem;
            height:0.09rem;

          }
        }
        .close{
          img{
            transform: rotate(180deg);
          }
        }

        // 签到
        .signIn{
          padding: 0 0.11rem;
          text-align: right;
          button{
            width: 1.59rem;
            height: .58rem;
            border-radius: .34rem;
            border: 0.02rem solid #FB1319;
            background: #fff;
            font-size: 0.26rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FB1319;
            line-height: 0.58rem;

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