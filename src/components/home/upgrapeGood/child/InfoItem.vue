<!-- Detailinfo.vue -->
<template>
	<div v-if="detailInfo">
		<div v-if="detailInfo.bargain_info" class="bargain-wrapper">
			<div class="bargain-content" @click="bargainVisible = true">
				<div class="title">砍价购</div>
				<div class="content">
					<div>距结束仅剩</div>
					<div>
						<span v-if="day">
							<em>{{ day }}</em>
							天
						</span>
						<span>
							<em>{{ hours }}</em>
							时
						</span>
						<span>
							<em>{{ minute }}</em>
							分
						</span>
						<span>
							<em>{{ second }}</em>
							秒
						</span>
					</div>
				</div>
				<div class="arrow iconfont">&#xe650;</div>
			</div>
			<mt-popup v-model="bargainVisible" position="bottom" class="bargain-popup-wrapper">
				<div class="mt">玩法详情</div>
				<div class="mc">
					<div class="line">1.活动期间消费者可邀请好友帮忙砍价，好友砍到底价后，即可按底价购买商品；</div>
					<div class="line">2.好友帮忙砍到底价后，消费者须在有效期内购买砍价商品，逾期商品将恢复原价；</div>
					<div class="line">3.同一商品，同一用户仅可享受一次优惠价格；</div>
					<div class="line">4.同一商品，同一用户仅能帮好友砍价一次；</div>
					<div class="line">5.砍价商品数量有限，商品售罄后，您将无法购买。</div>
				</div>
			</mt-popup>
		</div>
		<div class="ui-detail-info">
			<!-- 秒杀抢购 -->
			<div class="spike" v-if="mclass<3 && detailInfo.promotion_type == 'groupbuy'">
				<!-- 左侧价格 -->
				<div class="spike_left">
					<div class="img_bg">						
						<img src="@/assets/image/icon2/spike_tit.png" alt="">
					</div>
					<div class="spike_price">
						<span>￥</span>
						<span>{{ detailInfo.promotion_price }}</span>
						<s :class="mclass > 0?'old-price':'current-price1'">￥{{ detailInfo.goods_price }}</s>
					</div>					
				</div>							
				<!-- 右侧时间 -->
				<div class="spike_right">
					<p>{{ fromNow(detailInfo.promotion_end_time) }}结束</p>
					<p class="bottom" v-if="detailInfo.upper_limit">最多可购买{{ detailInfo.upper_limit }}件</p>
					<p class="bottom" v-else>卖完为止</p>
				</div>
			</div>

			<!-- 限时多买惠 -->
			<div class="spike" v-else-if=" mclass<3 &&  detailInfo.promotion_type == 'xianshi'">
				<!-- 左侧价格 -->
				<div class="spike_left">
					<div class="img_bg">						
						<!-- <img src="@/assets/image/icon2/spike_tit.png" alt=""> -->
						<span class="big">多买</span>
						<span>惠</span>
					</div>
					<div class="spike_price">
						<span>￥</span>
						<span>{{ detailInfo.promotion_price }}</span>
						<s :class="mclass > 0?'old-price':'current-price1'">￥{{ detailInfo.goods_price }}</s>
					</div>					
				</div>							
				<!-- 右侧时间 -->
				<div class="spike_right">
					<p>{{ fromNow(detailInfo.promotion_end_time) }}结束</p>
					<p class="bottom" v-if="detailInfo.lower_limit">最低{{ detailInfo.lower_limit }}件起</p>
					<!-- <p class="bottom" v-else>卖完为止</p> -->
				</div>
			</div>

			<!-- 原思路 -->
			<div class="info-header ui-flex" v-else>
				<div class="price">
					<span class="current-price">
						<slot v-if="detailInfo.bargain_info">
							<span>价格:￥</span>
							<span class="price-num">{{ detailInfo.bargain_info.bargain_floorprice }}</span>
						</slot>
						<slot v-else-if="detailInfo.pintuan_type == 1">
							<span>价格:￥</span>
							<span class="price-num">{{ detailInfo.pintuan_price }}</span>
						</slot>
						<!-- <slot v-else-if="detailInfo.promotion_type!='0'">
							<span>￥</span>
							<span class="price-num">{{ detailInfo.promotion_price }}</span>
						</slot> -->
						<slot v-else>
							<span v-if="mclass > 0" class="current-price1">
								{{ priseName }}￥
								<span>{{ this.realprice }}</span>
							</span>
							<span :class="mclass > 0?'old-price':'current-price1'">￥{{ detailInfo.goods_price }}</span>
						</slot>
					</span>
					<!-- <div class="old-price" v-if="detailInfo.goods_marketprice > 0">￥{{ detailInfo.goods_marketprice }}</div> -->
				</div>
				<div class="favorite">
					<img src="@/assets/image/icon2/icon-heart-red.png" v-on:click="productUnlike()" v-if="isFavorate" alt="" />
					<img src="@/assets/image/icon2/icon-heart-black.png" v-on:click="productLike()" v-else alt="" />
					<!-- <i class="iconfont" v-on:click="productUnlike()" v-if="isFavorate">&#xe6d5;</i>
					<i class="iconfont" v-on:click="productLike()" v-else>&#xe6d6;</i> -->
					<span :class="isFavorate?'favorate':'nofavorate'">{{ favoriteName }}</span>
				</div>
			</div>
			<h3 class="product-title" v-if="detailInfo.promotion_type == '0'">{{ detailInfo.goods_name }}</h3>

			<div class="info-sub ui-flex" v-else-if="mclass<3">
				<h3 class="product-title padding0">{{ detailInfo.goods_name }}</h3>
				<div class="favorite">
					<img src="@/assets/image/icon2/icon-heart-red.png" v-on:click="productUnlike()" v-if="isFavorate" alt="" />
					<img src="@/assets/image/icon2/icon-heart-black.png" v-on:click="productLike()" v-else alt="" />
					<span :class="isFavorate?'favorate':'nofavorate'">{{ favoriteName }}</span>
				</div>
			</div>

			<div class="info-sub ui-flex" v-if="detailInfo.goods_advword">
				<p>{{ detailInfo.goods_advword }}</p>
			</div>
			<div class="unit_sty">
				<p>单位：{{ detailInfo.goods_unit_name }}</p>
			</div>

			<!--<div v-if="!detailInfo.bargain_info && detailInfo.pintuan_info == ''">
				 <div class="info-promotions" v-if="detailInfo.promotion_type == 'groupbuy'">
					<div class="left">
						<i>抢购</i>
						<span v-if="detailInfo.upper_limit">最多可购买{{ detailInfo.upper_limit }}件</span>
					</div>
					<span class="right">{{ fromNow(detailInfo.promotion_end_time) }}结束</span>
				</div>
				<div class="info-promotions" v-if="detailInfo.promotion_type == 'xianshi'">
					<div class="left">
						<i>限时</i>
						<span v-if="detailInfo.lower_limit">最低{{ detailInfo.lower_limit }}件起</span>
					</div>
					<span class="right">{{ fromNow(detailInfo.promotion_end_time) }}结束</span>
				</div> 
			</div>-->
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { productLike, productUnlike } from '../../../../api/homegoodsdetail';
import { Toast, Indicator } from 'mint-ui';
export default {
	data() {
		return {
			bargainVisible: false,
			flag: false,
			day: 0,
			hours: 0,
			minute: 0,
			second: 0,
			time: false,
			orderTime: '', // 下单时间
			arrivalsTime: '', // 到达时间
			arrivalsTitle: '', // 到达时间的标题
			arrivalsRange: '', // 到达时间区间,
			priseName: '',
			pricePer: 100,
			realprice: 0
		};
	},
	computed: {
		...mapState({
			isFavorate: state => state.goodsdetail.isFavorate,
			detailInfo: state => state.goodsdetail.detailInfo,
			currentProductId: state => state.goodsdetail.currentProductId,
			user: state => state.member.info,
			mclass: state => state.member.mclass,
			upgrape: state => state.goodsdetail.upgrape,
		}),
		favoriteName() {
			return this.isFavorate ? '已收藏' : '收藏';
		}
	},
	created() {},
	mounted() {
		this.time = setInterval(() => {
			if (this.flag == true) {
				clearInterval(this.time);
			} else {
				this.timeDown();
			}
		}, 1000);
		this.xgprise();
	},
	methods: {
		...mapMutations({
			saveInfo: 'saveDetailInfo',
			changeIndex: 'changeIndex',
			saveIsFavorate: 'saveIsFavorate'
		}),
		fromNow(time) {
			return this.$moment(time * 1000).fromNow();
		},
		//修改价格
		xgprise() {
			this.detailInfo.goods_price1 = 10;
			console.log(this.mclass);
			if (this.upgrape) {
				this.detailInfo.goods_price1 = this.detailInfo.goods_g_price;
				this.priseName = '供应链价格';
			}
			// console.log(this.detailInfo);
			this.pricePer = this.detailInfo.goods_price1;
			this.realprice = this.utils.currencyPrice(this.pricePer * this.detailInfo.goods_price);
			// console.log(this.realprice);
			//this.saveInfo(this.detailInfo)
		},
		/*
		 * getCommentStatus： 去到评论页面
		 */
		getCommentStatus() {
			this.changeIndex(2);
		},
		/*
		 * productLike： 收藏商品
		 */
		productLike() {
			if (this.user) {
				let id = this.detailInfo.goods_id;
				productLike(id)
					.then(res => {
						if (res) {
							this.saveIsFavorate(true);
						}
					})
					.catch(function(error) {
						Toast(error.message);
					});
			} else {
				this.$router.push({ name: 'HomeMemberLogin' });
			}
		},
		/*
		 * productUnlike： 取消收藏
		 */
		productUnlike() {
			if (this.user) {
				let id = this.detailInfo.goods_id;
				productUnlike(id).then(res => {
					if (res) {
						this.saveIsFavorate(false);
					}
				});
			} else {
				this.$router.push({ name: 'HomeMemberLogin' });
			}
		},

		/*
		 * timeDown: 倒计时
		 */
		timeDown() {
			let end_time = false;
			if (this.detailInfo.bargain_info) {
				end_time = this.detailInfo.bargain_info.bargain_endtime;
			}
			if (end_time) {
				const endTime = new Date(end_time * 1000);
				const nowTime = new Date();
				let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
				this.day = parseInt(leftTime / (24 * 60 * 60));
				this.hours = this.formate(parseInt((leftTime / (60 * 60)) % 24));
				this.minute = this.formate(parseInt((leftTime / 60) % 60));
				this.second = this.formate(parseInt(leftTime % 60));
				if (leftTime <= 0) {
					this.flag = true;
					this.detailInfo.bargain_info = '';
					this.saveInfo(this.detailInfo);
				}
			}
		},
		/*
		 * 格式化时间
		 */
		formate(time) {
			if (time >= 10) {
				return time;
			} else {
				return `0${time}`;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bargain-wrapper {
	.bargain-content {
		padding: 0.5rem;
		color: #fff;
		background: #ea3f64;
		background-image: linear-gradient(to right, #ff5e00, #ea3f3f);
		display: flex;
		.title {
			flex: 1;
			font-size: 1rem;
			line-height: 1.2rem;
		}
		.content {
			width: auto;
			font-size: 0.6rem;
			line-height: 0.6rem;
			em {
				margin: 0 0.1rem;
			}
		}
		.arrow {
			width: 1rem;
			text-align: right;
			line-height: 1.2rem;
		}
	}
	.bargain-popup-wrapper {
		padding: 0.5rem;
		color: #333;
		box-sizing: border-box;
		padding-bottom: 3rem;
		.mt {
			font-size: 0.8rem;
			text-align: center;
		}
		.mc {
			font-size: 0.6rem;
			.line {
				margin-top: 0.5rem;
			}
		}
	}
}
.ui-detail-info {
	background: #ffffff;
	.spike{
		height: 6rem;
    width: 100%;
    box-sizing: border-box;
    background-image: url('../../../../assets/image/icon2/spike.png');
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 0.68rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		color: #fff;

		.spike_left{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.img_bg{
				width: 4.8rem;
				height: 4.8rem;
				background: #E53216;
				border-radius: 12px;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				img{
					height:3.4rem;
				}
				font-size: 1.8rem;
			}
			.spike_price{
				span{
					font-size: 1.33rem;
					&:nth-child(2){
						font-size: 2.0rem;
					}
				}
				s{
					display: block;
					color: #eee;
					font-size: 1.33rem;
				}
			}
		}

		.spike_right{
			text-align: right;
			margin-right: 0.75rem;
			font-size: 1.6rem;
			font-style: italic;
			.bottom{
				font-style: normal;
				font-size: 1.33rem;
			}
		}
	}
	
	.ui-flex {
		padding: 0 1.43rem;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		flex-basis: 100%;
		width: auto;
	}
	.info-header {
		height: 6.1rem;
	}
	
		.favorite {
			width: 4rem;
			text-align: center;
			img {
				width: 1.24rem;
				height: 100%;
			}
			// i {
			// 	width: 2.4rem;
			// 	display: block;
			// 	font-size: 1.2rem;
			// 	line-height: 1.2rem;
			// 	color: #e93b3d;
			// }
			span {
				display: block;
				font-size: 0.86rem;
				font-weight: 400;
				margin-top: 0.33rem;
				&.favorate {
					color: #E53216;
				}
				&.nofavorate {
				color: #161616;
				}
				
			}
		}
	.product-title {
		padding: 0 1.43rem;
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
	}
	.padding0 {
		padding: 0;
	}
	.price {
		// padding-bottom: 0.4rem;
		display: flex;
		span {
			// display: block;
			font-weight: normal;
			&.current-price {
				// font-size: 0.7rem;
				// color: $primaryColor;
				// line-height: 1rem;
			}
			&.old-price {
				font-size: 1.33rem;
				color: #c6c6c6;
				text-decoration: line-through;
				margin-left: 0.43rem;
			}
			&.current-price1 {
				// font-size: 0.7rem;
				// color: #003399;
				// line-height: 1rem;
				font-size: 1.33rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #e53216;
				span {
					font-size: 2.38rem;
					font-weight: bold;
					color: #e53216;
				}
			}
			.price-num {
				font-size: 2.38rem;
				font-weight: bold;
				color: #e53216;
			}
		}
	}

	.info-sub {
		// border-bottom: 0.5px solid #e8eaed;
		margin-top: 1.67rem;
		padding-bottom: 0.25rem;
		p {
			padding: 0;
			margin: 0;
			font-size: 1.14rem;
			font-weight: 400;
			color: #6F6F6F;
		}
	}

	.unit_sty {
		padding: 12px 1.43rem;
		p {
			font-size: 1.1rem;
			color: #666;
		}
	}

	.info-promotions {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 0.5px solid #e8eaed;
		line-height: 1.5rem;
		span {
			margin-left: 0.75rem;
			font-size: 0.6rem;
			color: rgba(143, 142, 148, 1);
		}
		img {
			width: 30.4rem;
		}
	}
	.info-promotions i {
		font-size: 0.7rem;
		border: 1px solid $primaryColor;
		color: $primaryColor;
		padding: 0.1rem 0.3rem;
		border-radius: 0.1rem;
	}
	.info-promotions .left {
		flex: 1;
	}
	.info-promotions .right {
		width: 4rem;
		text-align: right;
	}
}
.price-num {
	font-size: 2.38rem;
	font-weight: bold;
	color: #e53216;
}
</style>
