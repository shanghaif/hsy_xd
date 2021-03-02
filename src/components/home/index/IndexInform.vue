<template>
	<div class="index-inform">
		<div class="inform-item-left" @click="$router.push({ name: 'TodayMarket' })">
			<div class="title">
				今日行情
				<img src="../../../assets/image/icon2/icon-price.png" />
			</div>
			<div class="item-detail" v-for="(item, index) in items" :key="index">
				<div class="item-detail-left">
					<img :src="item.goods_image" />
					<div>{{ item.goods_name }}</div>
				</div>

				<div class="item-detail-right">
					<div>
						<img src="../../../assets/image/icon2/icon-top-price.png" />
						<span style="margin: 0 0.45rem; flex-shrink: 0;">最高价</span>
						<span class="sub-price">￥</span>
						<span class="today-price">{{ item.max }}</span>
					</div>
					<div>
						<img src="../../../assets/image/icon2/icon-middle-price.png" />
						<span style="margin: 0 0.45rem;flex-shrink: 0;">中间价</span>
						<span class="sub-price">￥</span>
						<span class="today-price">{{ item.zhong }}</span>
					</div>
					<div>
						<img src="../../../assets/image/icon2/icon-bottom-price.png" />
						<span style="margin: 0 0.45rem;flex-shrink: 0;">最低价</span>
						<span class="sub-price">￥</span>
						<span class="today-price">{{ item.min }}</span>
					</div>
				</div>
			</div>
			<div class="inform-more"><img src="../../../assets/image/icon2/icon-more.png" /></div>
		</div>
		<div class="inform-item-right">
			<div class="item-top" @click="$router.push({ name: 'HomeRecipe', query: { isfrom: 'home' } })">
				<div class="item-index-top">
					精选菜谱
					<img src="../../../assets/image/icon2/icon-hot.png" />
				</div>
				<div class="item-index-middle">
					<span>{{menuName}}</span>
					<img :src="menuImg" />
				</div>
				<div class="item-index-bottom">
					<span>厨师：</span>
					<span>{{cookName}}</span>
					<img src="../../../assets/image/icon2/icon-more.png" />
				</div>
			</div>
			<div class="item-bottom" @click="showTip">
				<div class="hot-news">热门资讯</div>
				<div class="news-more">
					<div class="news-more-title">食安曹县</div>
					<img src="../../../assets/image/icon2/food-safety.jpg" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getMenuInfoOne } from '@/api/homeMenu';
import { getIndexInform } from '../../../api/homeindex';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			items: [],
			params:{},
			menuName:'',
			cookName:'',
			menuImg:'',
			menuInfo:{},
			priceList: [
				{
					todayPriceSrc: '/static/image/icon2/icon-top-price.png',
					priceTitle: '最高价',
					todayPrice: '222'
				},
				{
					todayPriceSrc: '/static/image/icon2/icon-middle-price.png',
					priceTitle: '中间价',
					todayPrice: '111'
				},
				{
					todayPriceSrc: '/static/image/icon2/icon-bottom-price.png',
					priceTitle: '最低价',
					todayPrice: '000'
				}
			]
		};
	},
	computed: {},
	created() {
		// console.log(this.items)
		getIndexInform({pagesize:2}).then(
			res => {
				// console.log(res);
				this.items = res.result.goods_list;
			},
			error => {
				Toast(error);
			}
		);
		this.params.pagesize = 1
		var that = this
		getMenuInfoOne(this.params).then(res => {
			that.menuName = res.message[0].menu_title
			that.cookName = res.message[0].cook_info.cook_name
			that.menuImg = res.message[0].menu_image
			// this.menuInfo = res.result
		});
	},

	mounted() {},
	methods: {
		showTip() {
      this.$router.push({ name: 'HomeTopList', query:{ ac_id: 11} });
		}
	}
};
</script>

<style lang="scss" scoped>
.index-inform {
	margin: 1.3rem 0.86rem;
	// background-color: #fff;
	display: flex;
	.inform-item-left {
		flex-grow: 1;
		background-color: #fff;
		margin-right: 0.86rem;
		// width: 15.68rem;
		border-radius: 0.69rem;
		padding: 0.86rem 1.3rem 1.34rem 1.3rem;
		.title {
			display: flex;
			align-items: center;
			font-size: 1.39rem;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: rgba(22, 22, 22, 1);
			img {
				margin-left: 0.43rem;
				width: 3.6rem;
				height: 1.21rem;
			}
		}
		.item-detail {
			display: flex;
			justify-content: space-around;
			// margin-top: 1.21rem;
			margin-top: 2rem;
			.item-detail-left {
				margin-right: 0.4rem;
				div {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; //（行数）
					-webkit-box-orient: vertical;

					width: 4.65rem;
					font-size: 1.04rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(22, 22, 22, 1);
				}
				img {
					width: 3.73rem;
					height: 3.73rem;
					border-radius: 0.34rem;
				}
			}
			.item-detail-right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				div {
					display: flex;
					align-items: center;
					justify-content: space-between;
					img {
						width: 0.78rem;
						height: 0.78rem;
					}
					span {
						font-size: 0.95rem;
						font-family: PingFangSC-Light, PingFang SC;
						font-weight: 300;
						color: rgba(22, 22, 22, 1);
					}
					.sub-price {
						font-size: 0.6rem;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: rgba(229, 50, 22, 1);
						align-self: flex-end;
					}
					.today-price {
						font-size: 1.21rem;
						font-family: DIN-Regular, DIN;
						font-weight: 400;
						color: rgba(229, 50, 22, 1);
					}
				}
			}
		}
		.inform-more {
			margin-top: 1.13rem;
			font-size: 0;
			text-align: center;
			img {
				width: 0.86rem;
				height: 0.17rem;
			}
		}
	}
	.inform-item-right {
		// width: 15.68rem;
		width: 45%;
		.item-top {
			background-color: #fff;
			border-radius: 0.69rem;
			padding: 0.86rem 1.3rem 1.3rem;
			.item-index-top {
				font-size: 1.39rem;
				display: flex;
				align-items: center;
				font-weight: 600;
				color: rgba(22, 22, 22, 1);
				img {
					margin-left: 0.69rem;
					width: 1.56rem;
					height: 1.21rem;
				}
			}
			.item-index-middle {
				margin: 0.69rem auto;
				display: flex;
				span {
					font-size: 1.04rem;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
					width: 6.91rem;
				}
				img {
					margin-left: 1.52rem;
					width: 3.08rem;
					height: 3.08rem;
				}
			}
			.item-index-bottom {
				display: flex;
				align-items: center;
				font-size: 0.86rem;
				font-family: PingFangSC-Light, PingFang SC;
				font-weight: 300;
				color: rgba(111, 111, 111, 1);
				img {
					width: 0.86rem;
					height: 0.17rem;
					margin-left: auto;
				}
			}
		}
		.item-bottom {
			background-color: #fff;
			border-radius: 0.69rem;
			margin-top: 0.86rem;
			padding: 0.86rem 1.3rem 1.3rem;
			.hot-news {
				margin-bottom: 0.69rem;
				font-size: 1.39rem;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
				color: rgba(22, 22, 22, 1);
			}
			.news-more {
				display: flex;
				.news-more-title {
					font-size: 1.04rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(22, 22, 22, 1);
					width: 7rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					padding-top: 0.82rem;
				}
				img {
					margin-left: 0.86rem;
					width: 4.52rem;
					height: 4.52rem;
					border-radius: 0.34rem;
					transform: translateY(-0.41rem);
				}
			}
		}
	}
}
</style>
