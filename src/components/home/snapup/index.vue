<template>
	<div class="container">
		<div style="position: absolute;width: 100%;z-index: 3;background-color:rgba(244, 245, 247, 1) ;">
			<div class="header">
				<div class="header-wrap">
					<img class="img-back" @click="$router.push({ name: 'HomeIndex' })" src="@/assets/image/icon2/icon-white-back.png" alt="" />
					<img class="header-title" src="@/assets/image/icon2/icon-snap-up.png" alt="" />
					<span></span>
					<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
				</div>
			</div>
			<div class="top-bg">
				<div class="type-wrapper">
					<div class="type-wrap" :class="active==i ? 'add-border':''" v-for="(item, i) in timeList" :key="i" @click="timeIndex(item,i)">
						<span :class="{ 'is-title-active': active==i }">{{ item.bt }}:00</span>
						<span class="noActive" :class="active==i ? 'isActive':''" v-if="item.is == 3">已结束</span>
						<span class="noActive" :class="active==i ? 'isActive':''" v-else-if="item.is == 2">抢购中</span>
						<span class="noActive" :class="active==i ? 'isActive':''" v-else>即将开枪</span>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="tite-tip">
					<div class="tite-left">
						<span class="seconds-tit" v-if="endtime - times>=0&&starttime<=times&&times<endtime">本场还剩:</span>
						<span class="seconds-kill" v-if="endtime - times>=0&&starttime<=times&&times<endtime">
							<span>{{ newsTime.hour }}</span>
							:
							<span>{{ newsTime.min }}</span>
							:
							<span>{{ newsTime.sec }}</span>
						</span>
						<span class="seconds-kill" v-else-if="starttime > times">
							时间暂未开启，看看别的场吧
						</span>
						<span class="seconds-kill" v-else-if="times>endtime">
							时间已过，看看别的场吧
						</span>
					</div>
					<div class="tite-right">限时抢购</div>
				</div>
				<!-- <mt-tab-container v-model="selected">
					<mt-tab-container-item id="index"> -->
				<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<div class="list-wrap" v-for="(item, index) in goodsList" :key="index" v-if="goodsList.length > 0">
						<img :src="item.goods_image" alt="" />
						<div class="item-right">
							<div class="tit">{{ item.goods_name }}</div>
							<div class="price">
								<span>￥{{ item.groupbuy_price }}</span>
								<s>￥{{ item.goods_price }}</s>
							</div>
							<div class="scale">
								<div>
									<p :style="{ width: (item.groupbuy_buy_quantity / item.goods_storage) * 100 + '%' }"></p>
									<span>{{ (((item.goods_storage - item.groupbuy_buy_quantity) / item.goods_storage) * 100).toFixed(2)  }}%</span>
								</div>
								<span @click="goBuy(item.goods_id)">马上抢</span>
							</div>
						</div>
					</div>
					<div class="loading-wrapper" v-if="goodsList.length > 0">
						<p class="common-no-more" v-if="!isMore">没有更多了</p>
						<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
					</div>
					<empty-record2 isFrom='content' v-if='goodsList.length <= 0 && !isMore'></empty-record2>
				</div>
				<!-- 	</mt-tab-container-item>
				</mt-tab-container> -->
			</div>
		</div>
	</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import EmptyRecord2 from '../../EmptyRecord2'
import { resetRem, resumeRem } from '@/util/rem';
import { getTimeList, getContentList } from '../../../api/homepromotion';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			isMore: true,

			goodsList: [],
			params: {
				page: 0
			},
			loading: true, // 是否加载更多
			timeList: [], //时间段列表
			endtime: 0,
			starttime: 0,
			times: 0, //当前时间戳
			newsTime: {
				hour: '',
				min: '',
				sec: ''
			},
			active:-1
		};
	},
	components: {
		EmptyRecord2
	},
	computed: {
		// ...mapState({
		// 	inform: state => state.home.inform
		// })
	},
	created() {
		this.getTimeList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		this.goodsList = [];
		resumeRem();
	},
	methods: {
		getTimeList() {
			getTimeList().then(
				response => {
					this.timeList = response.result;
					// for-in循环
					for(let i in this.timeList) {
						if(this.timeList[i].is==2) {
							this.params.bt = response.result[i].bt;
							this.params.et = response.result[i].et;
							this.params.page = 0;
							this.active = i
						}
					}
					// for(var i=0;i<this.timeList.length;i++) {
					// 	if(this.timeList[i].is==2) {
					// 		this.params.bt = response.result[i].bt;
					// 		this.params.et = response.result[i].et;
					// 	}
					// }
					this.loading = false;
					// this.getGoodsList()
				},
				error => {
					Toast(error);
				}
			);
		},
		timeIndex(item,i) {
			// this.params = [];
			this.params.page = 1;
			this.params.bt = item.bt;
			this.params.et = item.et;
			this.getGoodsList();
			this.active = i
		},
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			// this.params.pagesize = this.params.pagesize + 10;
			if (this.isMore) {
				// this.loading = false;
				this.getGoodsList(true);
			}
		},
		getGoodsList(ispush) {
			var that = this;
			getContentList(that.params).then(
				response => {
					// console.log(res);
					// 倒计时
					this.endtime = response.result.endtime * 1000;
					this.starttime = response.result.groupbuy_starttime * 1000;
					// console.log(this.endtime,this.starttime)
					var that = this;

					// if (response.result.groupbuy_starttime * 1000 > timeing.getTime()) {
					// console.log(response.result.groupbuy_starttime * 1000, timeing.getTime());
					setInterval(function() {
						// 获取当前时间戳
						var timeing = new Date();
						that.times = timeing.getTime();
						// 倒计时时间戳
						var num = that.endtime - that.times;
						
						// if (num>=0) {
							// console.log(num,'num')
							var day = parseInt(num / (24 * 60 * 60 * 1000));
							num = num % (24 * 60 * 60 * 1000);
							var hour = parseInt(num / (60 * 60 * 1000));
							num = num % (60 * 60 * 1000);
							var minute = parseInt(num / (60 * 1000));
							num = num % (60 * 1000);
							var seconde = parseInt(num / 1000);
							// console.log(seconde,minute,hour)
							// console.log(typeof hour)
							if(hour.toString().length==1) {
								that.newsTime.hour = '0'+hour;
							}else {
								that.newsTime.hour = hour;
							}
							if(minute.toString().length==1) {
								that.newsTime.min = '0'+minute;
							}else {
								that.newsTime.min = minute;
							}
							if(seconde.toString().length==1) {
								that.newsTime.sec = '0'+seconde;
								// console.log(that.newsTime.sec)
							} else {
								that.newsTime.sec = seconde;
							}
							// debugger
							// that.newsTime.hour = hour;
							// that.newsTime.min = minute;
							// that.newsTime.sec = seconde;
						// } else {
						// 	that.newsTime = {};
						// }
					}, 1000);
					// } else {
					// 	that.newsTime = {};
					// 	console.log('11111111');
					// }

					if (ispush) {
						that.goodsList = that.goodsList.concat(response.result.goods_list);
					} else {
						that.goodsList = response.result.goods_list;
					}
					that.isMore = response.result.hasmore;
					this.loading = false;
				},
				error => {
					Toast(error);
				}
			);
		},
		// 马上买
		goBuy(id) {
    // form_id，入口，0无，1折扣，2抢购
    // terminal_id，终端，1APP，2公众号
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: id, form_id:2 } });
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	// position: relative;
	// z-index: -2;
	// background-color: rgba(244, 245, 247, 1);
	// height: 100vh;
	.header {
		.header-wrap {
			display: flex;
			justify-content: space-between;
			padding: 0.6rem 1.3rem;
			align-items: center;
			position: relative;
			.img-back {
				width: 1.56rem;
				height: 1.56rem;
				
			}
			.header-title {
				// width: 5.48rem;
				height: 1.78rem;
				position: absolute;
				left: 50%;
				transform: translate(-50%,0);
				// font-size: 1.73rem;
				// font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
				// font-weight: 400;
				// color: rgba(255, 255, 255, 1);
			}
		}
	}
	.top-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 10.86rem;
		// border-bottom-left-radius: 1.3rem;
		// border-bottom-right-radius: 1.3rem;
		z-index: -1;
		// background: rgba(244, 245, 247, 1) linear-gradient(109deg, rgba(143, 148, 251, 1) 0%, rgba(97, 103, 215, 1) 55%, rgba(78, 84, 200, 1) 99%);
		background: url('../../../assets/image/icon2/icon-miaosha.png') center center/100% 100% no-repeat;
		overflow-x: scroll;
		.type-wrapper {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.tab-nav {
				background-color: transparent;
				.mint-tab-item {
					padding: 0;
				}
			}
			.add-border {
				&::after {
					content: '';
					position: absolute;
					bottom: 0.1rem;
					left: 50%;
					transform: translate(-50%, 0);
					width: 1.1rem;
					height: 0.29rem;
					background: #ffffff;
					border-radius: 0.14rem;
				}
			}
			.type-wrap {
				position: relative;
				display: flex;
				flex-direction: column;
				// margin: 0 1.4rem;
				width: 7.4rem;
				justify-content: center;
				align-items: center;
				// padding-bottom: 1rem;
				span {
					&:nth-child(1) {
						font-size: 1.81rem;
						font-weight: 600;
						color: rgba(255, 255, 255, 0.65);
					}
					&:nth-child(2) {
						font-size: 1.05rem;
						font-weight: 400;
						color: rgba(255, 255, 255, 0.65);
						
						margin: 0.55rem 0 1.2rem;
					}
					&.isActive {
						font-size: 1.05rem;
						font-weight: 400;
						color: #ffffff;
					}
					&.is-title-active {
						font-size: 1.81rem;
						font-weight: 600;
						color: #ffffff;
					}
				}
			}
		}
	}
	.content {
		position: absolute;
		top: 10.86rem;
		width: 100%;
		background-color: rgba(244, 245, 247, 1);
		.tite-tip {
			height: 3.81rem;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			display: flex;
			align-items: center;
			padding: 0 1.43rem;
			justify-content: space-between;
			div.tite-left {
				.seconds-tit {
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
					margin-right: 0.6rem;
				}
				.seconds-kill {
					span {
						display: inline-block;
						text-align: center;
						width: 1.9rem;
						height: 1.9rem;
						line-height: 1.9rem;
						background: #000000;
						border-radius: 0.38rem;
						font-size: 1.14rem;
						font-weight: 400;
						color: #ffffff;
					}
				}
			}
			.tite-right {
				font-size: 1.24rem;
				font-weight: 400;
				color: #6f6f6f;
			}
		}
		.flex-wrapper {
			min-height: 70vh;
			padding: 0 0.95rem;
			.list-wrap {
				display: flex;
				margin-top: 0.95rem;
				border-radius: 0.76rem;
				background-color: #fff;
				padding: 0.95rem;
				img {
					width: 10.57rem;
					height: 10.57rem;
				}
				.item-right {
					margin-left: 0.95rem;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.tit {
						font-size: 1.33rem;
						font-weight: 600;
						color: #161616;
					}
					.price {
						margin-top: 1rem;
						span {
							font-size: 1.62rem;
							font-weight: bold;
							color: #e53216;
							margin-right: 1rem;
						}
						s {
							font-size: 1.24rem;
							font-weight: 400;
							color: #c6c6c6;
						}
					}
					.scale {
						display: flex;
						align-items: center;
						> span {
							font-size: 1.24rem;
							font-weight: 400;
							text-align: center;
							color: #ffffff;
							flex-shrink: 0;
							width: 6.67rem;
							height: 2.38rem;
							line-height: 2.38rem;
							background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
							border-radius: 1.33rem;
							
						}
						> div {
							overflow: hidden;
							margin-right: 2.48rem;
							flex-grow: 1;
							height: 1.33rem;
							line-height: 1.33rem;
							text-align: center;
							// background: linear-gradient(89deg, #FF9494 0%, #FB3737 99%);
							background: #fcbfba;
							// background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
							border-radius: 0.67rem;
							position: relative;
							> span {
								font-size: 0.95rem;
								font-weight: 400;
								color: #ffffff;
								position: absolute;
								transform: translate(-50%,0);
							}
							> p {
								position: absolute;
								height: 1.33rem;
								background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
								border-radius: 0.67rem;
								// &::after {
								// 	position: absolute;
								// 	content: '';
								// 	width: 1.09rem;
								// 	height: 1.09rem;
								// 	border-radius: 50%;
								// 	right: 0;
								// 	background: #ffdbd5;
								// 	box-shadow: 0rem 0rem 0.19rem 0rem rgba(90, 27, 27, 0.5);
								// 	top: 50%;
								// 	transform: translate(0, -50%);
								// }
								// &::before {
								// 	position: absolute;
								// 	content: '';
								// 	width: 0.71rem;
								// 	height: 0.71rem;
								// 	background: #e63116;
								// 	border-radius: 50%;
								// 	right: 0.19rem;
								// 	z-index: 1;
								// 	transform: translate(0, -50%);
								// 	top: 50%;
								// }
							}
						}
					}
				}
			}
		}
	}
}
</style>
