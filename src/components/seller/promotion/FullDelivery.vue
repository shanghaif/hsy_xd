<template>
	<div class="full_delivery hsy_main">
		<div class="top-wrap">
			<div class="header-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span class="header-title">满即送管理</span>
				<div class="header-right"></div>
			</div>
			<!-- header -->
			<div class="order-header">
				<div class="seller-search">
					<input type="text" placeholder="请输入您要搜索的活动" v-model="keyword" />
					<img src="@/assets/image/icon2/icon-white-search.png" alt="" @click="setOrderNavActive(goods_type)" />
				</div>
				<ul>
					<li class="item" v-for="item in orderNav" v-bind:key="item.id" v-bind:class="{ active: goods_type == item.id }" v-on:click="setOrderNavActive(item.id)">
						{{ item.name }}
					</li>
				</ul>
			</div>
		</div>
		<!-- 列表 -->
		<div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
			<div v-if="goodsList.length > 0">
				<div class="details" v-for="(item, index) in goodsList" :key="index">
					<div class="top">
						<span>{{ item.mansong_name }}</span>
						<span>{{ item.mansong_state_text }}</span>
						<span>{{ item.mansong_type | Typefilter }}</span>
					</div>
					<div class="top top48">
						<!-- <span>{{(item.mansong_state==1)?"开启":"关闭"}}</span> -->
						<span>{{ item.mansong_starttime | filterReturndateTime }}</span>
						<span>{{ item.mansong_endtime | filterReturndateTime }}</span>
					</div>
					<div class="bottom">
						<span>{{ item.mansong_remark ? item.mansong_remark : '暂无备注' }}</span>
					</div>

					<div class="item-more" @click="popupMore(item.mansong_id)">
						<span></span>
						<span></span>
					</div>

					<ul class="goods-btn" v-show="item.mansong_id == nowIndex">
						<li @click="fun_goDetails(item.mansong_id)">详情</li>
						<li @click="fun_Delete(item.mansong_id)">删除</li>
					</ul>
				</div>

				<div class="end_loading" v-show="isMore"><span>加载中...</span></div>
			</div>
			<empty-record2 isFrom="content" v-else></empty-record2>
		</div>

		<!-- 新增 按钮 -->
		<mt-button class="hsy_btn hsy_f" @click="goods_add">新增</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getMansongList, deleteMansong } from '../../../api/sellerPromotion';
import '@/assets/style/hsy-mint.scss';

export default {
	name: 'Goodsonline',
	data() {
		return {
			nowIndex: null,
			params: { page: 0, per_page: 10 },

			busy: false, // 繁忙
			isMore: true, // 是否有更多数据

			pageTotal: 1, // 总页数
			goodsList: [], // 商品列表
			keyword: '',
			goods_type: '0',
			i: -1,
			orderNav: [
				{
					name: '全部',
					id: '0'
				},
				{
					name: '正常',
					id: '1'
				},
				{
					name: '已结束',
					id: '2'
				},
				{
					name: '管理员关闭',
					id: '3'
				}
			],

			detailsObj: {},

			sendTime: null
		};
	},
	components: {
		EmptyRecord2
	},
	filters: {
		Typefilter(v) {
			console.log(v);
			if (v == 1) {
				return '仅零售';
			} else if (v == 2) {
				return '仅团购';
			} else if (v == 3) {
				return '零售和团购';
			} else {
				// console.log(v);
			}
		},
		filterReturndateTime(v) {
			var d = new Date(v * 1000);
			var year = d.getFullYear();
			var month = change(d.getMonth() + 1);
			var day = change(d.getDate());
			var hour = change(d.getHours());
			var minute = change(d.getMinutes());
			var second = change(d.getSeconds());
			function change(t) {
				if (t < 10) {
					return '0' + t;
				} else {
					return t;
				}
			}
			var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			return time;
		}
	},
	created() {
		this.loadMore()
		this.sendTime = new Date().getTime();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 新建
		goods_add() {
			this.$router.push({ name: 'SellerFullDeliveryAdd' });
		},

		setOrderNavActive(index) {
			var nowTime = new Date().getTime();
			if (nowTime > this.sendTime + 680) {
				this.nowIndex = -1;
				this.goods_type = index;

				this.params.page = 1;
				this.goodsList = [];
				this.isMore = true;
				this.getGoodsList();

				this.sendTime = nowTime;
			}
		},

		loadMore() {
			this.busy = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.getGoodsList(true);
			}
		},
		// 获取 数据
		getGoodsList(ispush) {
			if (this.isMore) {
				Indicator.open();
				getMansongList(this.keyword, this.goods_type, this.params.page)
					.then(res => {
						Indicator.close();
						if (ispush) {
							this.goodsList = this.goodsList.concat(res.result.mansong_list);
						} else {
							this.goodsList = res.result.mansong_list;
						}

						this.busy = false; //  繁忙
						this.isMore = res.result.hasmore; //  是否有更多数据
					})
					.catch(err => {
						Indicator.close();
						Toast(err.message);
					});
			}
		},

		popupMore(i) {
			if (this.nowIndex == i) {
				this.nowIndex = -1;
				return;
			}
			this.nowIndex = i;
		},

		// 去详情
		fun_goDetails(id) {
			this.$router.push({ name: 'SellerFullDeliveryDetails', query: { mid: id } });
		},

		// 删除
		fun_Delete(id) {
			MessageBox.confirm('确定要删除此活动吗？')
				.then(action => {
					Indicator.open();
					deleteMansong(id)
						.then(res => {
							Indicator.close();
							Toast(res.message);

							this.isMore = true;
							this.params.page = 1;
							this.getGoodsList(false);
						})
						.catch(err => {
							Indicator.close();
							Toast(err.message);
						});
				})
				.catch(err => {
					this.nowIndex = -1;
				});
		}
	}
};
</script>

<style scoped lang="scss">
.full_delivery {
	background-color: #f4f5f7;
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.list-wrap {
	padding-bottom: 16rem;
	margin-top: 0.95rem;
	min-height: 60vh;
	background-color: #fff;
}

.order-header {
	width: 100%;

	ul {
		list-style: none;
		width: auto;
		display: flex;
		justify-content: space-around;
		align-content: center;
		align-items: center;
		height: 4.43rem;
		border-bottom: 1px solid #e8eaed;

		li {
			font-size: 1.24rem;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
			height: 4.43rem;
			line-height: 4.43rem;

			&.active {
				font-weight: 600;
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0.8rem;
					left: 50%;
					height: 0.24rem;
					width: 70%;
					background-color: #fff;
					transform: translate(-50%, 0);
					border-radius: 0.14rem;
				}
			}
		}
	}
}

.goods-item {
	background: #fff;
	padding: 1.43rem 1.76rem 1.71rem 1.65rem;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 1.65rem;
	}
}

.goods-info {
	display: flex;

	.p-img {
		width: 8rem;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.p-info {
		margin-left: 1.48rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.name {
			font-size: 1.33rem;
			font-weight: 400;
			color: #161616;
		}

		.price {
			color: #e63116;

			span {
				font-size: 1.33rem;
				font-weight: 600;

				&:first-child {
					font-weight: 400;
					font-size: 0.9rem;
				}
			}
		}

		.stock {
			font-size: 1.05rem;
			font-weight: 400;
			color: #6f6f6f;
		}
	}
}

.goods-btn {
	position: absolute;
	right: 6rem;
	bottom: -7.5rem;
	z-index: 100;
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
	border-radius: 0.48rem;

	&::after {
		content: '';
		position: absolute;
		border-top: 0.8rem solid transparent;
		border-left: 0.8rem solid #fff;
		border-bottom: 0.8rem solid transparent;
		top: 1.05rem;
		right: -0.8rem;
	}

	li {
		width: 6.72rem;
		text-align: center;
		height: 3.7rem;
		line-height: 3.7rem;
		border-bottom: 1px solid #efefef;
		font-size: 1.14rem;
	}
}

.seller-search {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	margin: 0 0;

	input {
		box-sizing: border-box;
		width: 80%;
		border-radius: 1.64rem;
		padding: 0.52rem 2rem 0.52rem 3rem;
		margin-right: 2rem;
	}

	img {
		width: 1.8rem;
		height: 1.8rem;
	}

	.mint-cell {
		min-height: 0;

		&:after {
			background-color: #fff !important;
		}
	}
}

.top-wrap {
	background-color: #626771;
	height: 11.17rem;
}

.header-wrap {
	padding: 1rem 1.43rem;
	position: relative;
	display: flex;
	justify-content: space-between;

	img {
		width: 1.74rem;
		height: 1.74rem;
	}

	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.52rem;
		font-weight: 400;
		color: #ffffff;
	}

	.header-right span {
		font-size: 1.3rem;
	}
}

.cont {
	flex: 1;
	background: #f4f5f7;
	overflow-y: scroll;
	padding-bottom: 8.2rem;

	.details {
		padding: 1.43rem;
		position: relative;
		border-bottom: 2px solid #f4f5f7;
		background: #fff;

		.top {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding-right: 4rem;

			&:nth-child(2) {
				margin: 0.5rem 0;
			}

			span {
				&:nth-child(2) {
					text-align: center;
				}
				&:last-child {
					text-align: right;
				}
				width: 33%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.top48 {
			span {
				width: 48%;
			}
		}

		.bottom {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			padding-right: 4rem;

			span {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.end_loading {
		background: #fff;
		text-align: center;
		padding: 1.43rem;
	}

	.item-more {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 0.74rem;
		position: absolute;
		width: 3rem;
		height: 2rem;
		background: #f4f5f7;
		border-radius: 0.74rem;
		position: absolute;
		right: 2rem;
		bottom: 50%;
		transform: translateY(50%);

		span {
			width: 0.39rem;
			height: 0.39rem;
			background: #d6d6d6;
			border-radius: 50%;

			&:first-child {
				margin-right: 0.33rem;
			}
		}
	}

	.goods-btn {
		position: absolute;
		right: 6rem;
		background: #fff;
		bottom: 50%;
		transform: translateY(50%);
		z-index: 100;
		-webkit-box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
		border-radius: 0.48rem;

		&::after {
			content: '';
			position: absolute;
			border-top: 0.8rem solid transparent;
			border-left: 0.8rem solid #fff;
			border-bottom: 0.8rem solid transparent;
			bottom: 50%;
			transform: translateY(50%);
			right: -0.8rem;
		}

		li {
			width: 6.72rem;
			text-align: center;
			height: 3.7rem;
			line-height: 3.7rem;
			border-bottom: 1px solid #efefef;
			font-size: 1.14rem;
		}
	}
}
</style>
