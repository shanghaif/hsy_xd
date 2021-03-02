<template>
	<div class="member-order-list">
		<head-title fontSize='1.33rem' title="宴席订单"></head-title>
		<!-- <button v-if="true" @click="$router.push({ name: 'MemberChooseDishes' })">点击跳转</button> -->
		<!-- <button v-if="true"  style="height:20px;margin:10px" @click="$refs.selectBox.currentValue=true">出来</button> -->
		<!-- header -->
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
		<div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<!-- 如果 有数据 -->
			<div class="order-body" v-if="order_list && order_list.length">
				<!-- 循环 -->
				<div v-for="(item, index) in order_list" v-bind:key="index">
					<div class="list"
						@click="$router.push({name:'HomeorderDetail',query:{order_id:item.order_id}})"
						>
						<!-- 顶部标签 -->
						<div class="top">
							<div class="top-left">
								<img src="@/assets/image/icon2/icon-store-black.png" alt="">
								<span>{{ item.store_name }}</span>
								<img src="@/assets/image/icon2/index-icon-right.png" alt="">
							</div>
							<span class="top-right">{{item.status|filterStatus}}</span>
						</div>
						<!-- 滚动条 -->
						<div class="center">
							<ul class="center-left">
								<li v-for="(v,i) in item.goods_list" :key="i">
									<img :src="v.goods_image" alt="">
									<span>{{v.goods_name}}</span>
								</li>
							</ul>
							<div class="center-right">
								<span>费用参考</span>
								<div>									
									<span>￥</span>
									<span class="price">{{item.cost_reference}}</span>
								</div>
							</div>
						</div>
						<!-- 底部时间 类型 -->
						<div class="bottom">
							<div>
								宴请日期：<span 
									:class="{redClass:new Date(item.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()}">{{item.banquet_time}}</span>
							</div>
							<div>
								宴请方式：{{item.banquet_mode==1?"到店堂食":"厨师上门"}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 否则 没有数据 -->
			<div class="empty-order" v-show="allShow" v-else-if="order_list && !order_list.length">
				<img class="img" src="@/assets/image/icon2/empty-order.png" alt="">
				<p class="title">未查到您的订单</p>
				<p class="small">您可以选择餐饮商家进行宴席预订</p>
				<button>查看商家</button>
			</div>

			<select-box title='请选择申请退订原因' showName="mname" :items="[{id:1,mname:'占山'},{id:2,mname:'刘二狗'},{id:3,mname:'马保国'}]" ref="selectBox"></select-box>
		</div>
		<!-- 厨师 -->
		<div class="chef"
			v-if="chef"
			:class="{noChef:chefHas}"
			@click="$router.push({ name: 'MemberChefOrder'})">
			<div class="over" :class="{noChefWord:chefHas}">
				您有新的上门制作的宴席订单，请查看>>
			</div>
			<div class="img">
				<img src="@/assets/image/icon2/banquet-chef-no.png" alt="">
			</div>
		</div>
		<!-- <button @click="chef=!chef">@click="chefValue=!chefValue"</button>
		<button @click="chefHas=!chefHas">chefHas</button> -->
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getMemberBanqueList, getMemberBanqueCookList } from '../../../api/memberBanquet';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import SelectBox from '../../../components/SelectBox';
export default {
	components: {
		EmptyRecord2,
		HeadTitle,
		SelectBox
	},
	name: 'MemberOrderList',
	data() {
		return {
			chef:false,
			chefHas:true,
			allShow:false,
			order_id: 0,
			goItem: -1,			
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
			orderDetailVisible: false,
			// wrapperHeight: 0,
			params: {
        page: 0,
        status:-1,
        pagesize: 5
      },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			order_list: [],
		};
	},
	
	mounted() {
		let sw = document.documentElement.clientWidth;
		let html = document.documentElement;
		if (300 < sw && sw <= 310) {
			html.style.fontSize = 9.92 + 'px';
		} else if (310 <= sw && sw <= 320) {
			html.style.fontSize = 10.24 + 'px';
		} else if (320 < sw && sw <= 375) {
			html.style.fontSize = 12 + 'px';
		} else if (375 < sw && sw <= 414) {
			html.style.fontSize = 13.248 + 'px';
		} else if (414 < sw && sw <= 641) {
			html.style.fontSize = 13 + 'px';
		} else if (641 <  sw) {
			html.style.fontSize = 21 + 'px';
		}
		// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
			if (300 < sw && sw <= 310) {
				html.style.fontSize = 9.92 + 'px';
			} else if (310 <= sw && sw <= 320) {
				html.style.fontSize = 10.24 + 'px';
			} else if (320 < sw && sw <= 375) {
				html.style.fontSize = 12 + 'px';
			} else if (375 < sw && sw <= 414) {
				html.style.fontSize = 13.248 + 'px';
			} else if (414 < sw && sw <= 641) {
				html.style.fontSize = 13 + 'px';
			} else if (641 <  sw) {
				html.style.fontSize = 21 + 'px';
			}
		};
		// resetRem();
	},
	filters:{
		filterStatus(v){
			// 待接单  2进行中  3已签到  4已取消  5代支付
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
	beforeDestroy() {
		resumeRem();
	},

	// mounted() {
	// 	this.wrapperHeight = document.documentElement.clientHeight - 140;
	// },
	computed: {
		...mapState({
			user: state => state.member.info
		}),
	},
	created: function() {

	},
	watch: {
		orderArrTime: function() {
			console.log('该百年');
		}
	},
	methods: {
		fun_left() {
			if (this.goItem == -1) {
				this.$router.go(-1);
			} else {
				this.$router.push({ name: 'MemberIndex' });
			}
		},
		setOrderNavActive(index) {
			this.params.status = index;
			this.getOrderList(true);
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
			getMemberBanqueList(this.params)
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

					res.result.is_cook==1?this.chef=true:'';
					setTimeout(()=>{
						if( res.result.is_see != 0){
							this.chefHas = false;
						}
					},10)

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
	}
};
</script>
<style lang="scss" scoped>
.member-order-list {
	div,ul,li{
		box-sizing: border-box;
	}

  // 字体颜色
	$color: #161616;
	$color-light:#6f6f6f;
	$color-bright:#FB1319;
  // // 大号字体
	// $font-big: 1.1667rem; // 28px
	// // 适应字体
	// $font:1rem;  // 24px
	// $font-small: 0.9166rem;  // 22px
	// $font-small-end: 0.8334rem;  // 20px

  // 大号字体
	$font-big: 1.1667rem; // 28px
	// 适应字体
	$font: 1rem;  // 24px
	$font-small: 0.9166rem;  // 22px
	$font-small-end: 0.8334rem;  // 20px


	color: $color;
	font-size: $font;
	font-family: PingFangSC-Medium, PingFang SC;
	background-color: rgba(244, 245, 247, 1);

	height: 100vh;
	display: flex;
	flex-direction: column;

	// 选项
	.order-header {
		background-color: #fff;
		box-sizing: border-box;
		height: 5rem;
		padding: 1.43rem 1.48rem;
		width: 100%;
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
						bottom: -0.6rem;
						left: 16%;
						width: 1.667rem;
						height: 0.2084rem;
						background: linear-gradient(90deg, #E53216 0%, #FC6952 100%);
						border-radius: 0.125rem;
					}
				}
			}
		}
	}

	// 订单
	.content{
		flex: 1;
		overflow-y: scroll;

		.order-body {
			> div {
				margin: 0 1.25rem 0;
				.list {
					width: 100%;
					padding: 1.5833rem 1.667rem;
					box-sizing: border-box;
					background: #fff;
					margin-top: 1.25rem;
					border-radius: 0.667rem;
					// height: 14.375rem;
					// 头部店铺信息 标题
					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.top-left{
							display: flex;
							align-items: center;
							img {
								width: $font-big;
								margin-right: 0.4167rem;
							}
							span {
								margin-right: 0.4167rem;
							}
						}
						.top-right {
							color: $color-bright;
						}
					}

					// 中间 菜品信息
					.center{
						display: flex;
						
						.center-left{
							flex: 1;
							display: flex;
							overflow-x: scroll;
							padding-top: 1.125rem;
							li{
								font-size: $font-small;
								width: 4.33rem;
								margin-right: 1.12rem;
								span{
									overflow: hidden;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 1;
								}
								img{
									border: 1px solid #eee;
									border-radius: 4px;
									margin-bottom: 0.4166rem;
									width: 4.33rem;
									height: 4.33rem;
								}

							}
						}

						.center-right{
							width: 5.25rem;
    					padding: 2.43rem 0;
							padding-bottom: 1.31rem;
    					text-align: right;
							font-size: $font-small-end;
							>span{
								color: $color-light;
							}
							>div{
								margin-top: .5rem;
							}
							.price{
								font-size: $font-big;
							}
						}
					}

					// 底部 宴请时间 类型
					.bottom{
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;

						text-align: right;
						color: $color-light;
						div{							
							padding-top: 1.125rem;
							&:first-child{
								// margin-right: 1.26rem;
							}
						}
						.redClass{
							color: #FB1319;
						}
					}
					
				}
				
			}
		}

		.empty-order{
			background-color: #fff;
			height: 100%;
			text-align: center;
			
			.img {
				width: 15.541666666666666;
				height: 11.083333333333334rem;
				margin-top: 5.833333333333333rem;
			}

			.title{
				margin: 1.125rem 0 1.291666666666666rem 0;
				font-size: 0.5833333333333334rem;
				font-weight: 400;
				color: #000;
			}
			.small{
				font-size: 0.5rem;
				color: #4C4C4C;
			}
			button{
				margin-top: 4.291rem;
				padding: 1rem 2.375rem;
				background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
				box-shadow: 0px 0px 0.8333333333333334rem 0px rgba(251, 104, 84, 0.37);
				border-radius: 0.667rem;
				color: #fff;
				font-size: 1rem;
			}
		}
	}

	// 厨师
	.chef{
		transition: all 1s;
		position: fixed;
		right: 1.958rem;
		bottom: 7.832rem;
		width: 15.8rem;
		height: 4.584rem;
		background: #FFEFEF;
		border-radius: 55px 55px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 1.4166rem;
		overflow: hidden;
		.img{
			width: 4.584rem;
			height: 4.584rem;
			background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: -0.979rem;
			right: 0;
			img{
				width: 1.958rem;
				height: 2.334rem;
			}

		}

		.over{
			height: 2.5rem;
			width: 10rem;
			font-size: $font-small;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FB1319;
			line-height: 1.25rem;

		}
		
		.noChefWord{
			width: 100%;
			overflow: hidden;
		}
	}

	.noChef{
    width: 4.584rem;
	}
}
</style>
