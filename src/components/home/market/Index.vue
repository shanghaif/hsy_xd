<template>
	<div class="container">
		<div style="position: absolute;width: 100%;z-index: 3;background-color:rgba(244, 245, 247, 1) ;">
			<div class="header">
				<div class="header-wrap">
					<img class="img-back" @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
					<!-- <span class="header-title">今日行情</span> -->
					<img class="header-title" src="@/assets/image/icon2/icon-hangqing.png" alt="" />
					<span></span>
					<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
				</div>
			</div>
			<div class="top-bg"></div>
			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="flex-wrapper">
					<div class="list-wrap" v-for="(item, index) in goodsList" :key="index">
						<div class="list-left">
							<img :src="item.goods_image" alt="" />
							<p>{{ item.goods_name }}</p>
						</div>
						<div class="list-right">
							<div>
								<img src="../../../assets/image/icon2/icon-top-price.png" />
								<span style="margin: 0 2rem; flex-shrink: 0;">最高价</span>
								<span class="today-price">
									<span class="rmb">￥</span>
									<span>{{ item.max }}</span>
								</span>
							</div>
							<div>
								<img src="../../../assets/image/icon2/icon-middle-price.png" />
								<span style="margin: 0 2rem;flex-shrink: 0;">中间价</span>
								<span class="today-price">
									<span class="rmb">￥</span>
									<span>{{ item.zhong }}</span>
								</span>
							</div>
							<div>
								<img src="../../../assets/image/icon2/icon-bottom-price.png" />
								<span style="margin: 0 2rem;flex-shrink: 0;">最低价</span>
								<span class="today-price">
									<span class="rmb">￥</span>
									<span>{{ item.min }}</span>
								</span>
							</div>
						</div>
					</div>
					<div class="loading-wrapper" v-if="goodsList.length > 0">
						<p class="common-no-more" v-if="!isMore">没有更多了</p>
						<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';
import { getIndexInform } from '../../../api/homeindex';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			isMore: true,

			goodsList: [],
			params: {
				// pagesize: 1,
				page: 0,
				// pagesize:10
			},
			loading: false // 是否加载更多
		};
	},
	components: {},
	computed: {
		// ...mapState({
		// 	inform: state => state.home.inform
		// })
	},
	created() {
		// console.log(this.inform, 'inform');
		// this.getGoodsList()
		// this.fetchHomeInform({}).then(
		// 	response => {
		// 		console.log(response);
		// 		this.goodsList = response.result;
		// 	},
		// 	error => {
		// 		Toast(error.message);
		// 	}
		// );
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		this.goodsList = [];
		resumeRem();
	},
	methods: {
		// ...mapActions({
		// 	fetchHomeInform: 'fetchHomeInform'
		// }),
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			// this.params.pagesize = this.params.pagesize + 10;
			if (this.isMore) {
				this.loading = false;
				this.getGoodsList(true);
			}
		},
		getGoodsList(ispush) {
			var that = this;
			getIndexInform(that.params).then(
				response => {
					// console.log(res);
					if (ispush) {
						that.goodsList = that.goodsList.concat(response.result.goods_list);
					} else {
						that.goodsList = response.result.goods_list;
					}
					that.isMore = response.result.hasmore;
				},
				error => {
					Toast(error);
				}
			);
			// this.fetchHomeInform(that.params).then(
			// 	response => {
			// 		debugger
			// 		console.log(response);
			// 		if (ispush) {
			// 			that.goodsList = that.goodsList.concat(response.result);
			// 		} else {
			// 			that.goodsList = response.result;
			// 		}
			// 	},
			// 	error => {
			// 		console.log(error.message);
			// 		// Toast(error.message);
			// 	}
			// );
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
			}
		}
	}
	.top-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 10.86rem;
		border-bottom-left-radius: 1.3rem;
		border-bottom-right-radius: 1.3rem;
		z-index: -1;
		background: url('../../../assets/image/icon2/icon-hangqing-bg.png') center center/100% 100% no-repeat;
		// background: rgba(244, 245, 247, 1) linear-gradient(109deg, rgba(143, 148, 251, 1) 0%, rgba(97, 103, 215, 1) 55%, rgba(78, 84, 200, 1) 99%);
	}
	.list-wrap {
		background-color: #fff;
		margin: 1.4rem 1.3rem;
		padding: 1.73rem 2.52rem;
		border-radius: 0.69rem;
		display: flex;
		.list-left {
			img {
				border-radius: 0.7rem;
				width: 6.7rem;
				height: 6.7rem;
				margin-bottom: 0.26rem;
			}
			p {
				text-align: center;
				width: 7rem;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.list-right {
			// flex: 1;
			width: 60%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			margin-left: auto;
			div {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 1.39rem;
					height: 1.39rem;
				}
				.today-price {
					font-size: 1.3rem;
					font-family: DIN-Bold, DIN;
					font-weight: bold;
					color: rgba(229, 50, 22, 1);
					.rmb {
						font-size: 1.13rem;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: rgba(229, 50, 22, 1);
					}
				}
				span {
				}
			}
		}
	}
}
</style>
