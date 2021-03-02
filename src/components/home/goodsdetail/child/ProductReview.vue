<!-- Evaluation.vue -->
<template>
	<div class="ui-evaluation">
		<div class="ui-evaluation-header">
			<div class="ui-evaluation-info">
				<span>
					评价
					<span>{{ reviewList.length }}条</span>
				</span>
				<!-- <span>好评率</span> -->
			</div>
			<div class="flex-header">
				<div v-for="(item, index) in staticData" v-bind:key="item.id" v-bind:class="{ active: currentTag == item.value }" v-on:click="changeTab(item.value, item.grade)">
					{{ item.name }}
				</div>
			</div>
		</div>
		<div class="ui-evaluation-body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="list" v-for="(item, index) in reviewList" v-if="reviewList.length > 0">
				<div>
					<span>
						<img :src="item.member_avatar" alt="" />
						<div>
							<span>{{ item.geval_isanonymous ? '匿名' : item.geval_frommembername }}</span>
							<!-- <span v-bind:class="{
									'good-review': item.geval_scores > 3,
									'medium-review': item.geval_scores > 1,
									'bad-review': item.geval_scores == 1}">
								{{ getGrade(item.geval_scores) }}
							</span> -->
							<span>{{ getTime(item.geval_addtime) }}</span>
						</div>
					</span>
					<span
						v-bind:class="{
							'good-review': item.geval_scores > 3,
							'medium-review': item.geval_scores > 1,
							'bad-review': item.geval_scores == 1
						}"
					>
						{{ getGrade(item.geval_scores) }}
					</span>
				</div>
				<p v-if="item.geval_content">{{ item.geval_content }}</p>
				<p v-if="!item.geval_content">无评价信息</p>
			</div>

			<div class="list-empty" v-if="reviewList.length <= 0"><p>本商品暂无评价</p></div>
		</div>
	</div>
</template>

<script>
import { evaluation } from '../static';
import { getReviewList } from '../../../../api/homegoodsdetail';
export default {
	data() {
		return {
			staticData: evaluation,
			id: this.$store.state.goodsdetail.currentProductId ? this.$store.state.goodsdetail.currentProductId : '',
			currentTag: 'total',
			grade: 0,
			subTotal: {},
			reviewList: [],
			page: 0,
			loading: false,
			total: 1
		};
	},
	created() {},
	methods: {
		loadMore() {
			this.loading = true;
			this.page = ++this.page;
			if (this.page <= this.total) {
				this.loading = false;
				this.getReviewList(true);
			}
		},
		getReviewList(ispush) {
			getReviewList(this.id, this.grade, this.page).then(res => {
				if (res) {
					if (ispush) {
						this.reviewList = this.reviewList.concat(res.result.goods_eval_list);
					} else {
						this.reviewList = res.result.goods_eval_list;
					}
					if (res.hasmore) {
						this.loading = false;
					} else {
						this.loading = true;
					}
					this.total = res.page_total;
				}
			});
		},
		changeTab(value, grade) {
			this.currentTag = value;
			this.grade = grade;
			this.getReviewList(false);
		},
		getGrade(grade) {
			if (grade == 1) {
				return '差评';
			} else if (grade > 3) {
				return '好评';
			} else {
				return '中评';
			}
		},
		getTime(timestamps) {
			let date = new Date(timestamps * 1000);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			return year + '-' + month + '-' + day;
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-evaluation {
	.ui-evaluation-header {
		background: #ffffff;
		.ui-evaluation-info {
			display: flex;
			justify-content: space-between;
			padding: 1.9rem 1.43rem 1.43rem;
			span {
				&:nth-child(1) {
					font-size: 1.33rem;
					font-weight: 600;
					color: #161616;
					span {
						font-size: 1.14rem;
						font-weight: 400;
						margin-left: 0.67rem;
					}
				}
			}
		}
		.flex-header {
			width: auto;
			display: flex;
			display: -webkit-flex;
			display: -moz-flex;
			flex-basis: 100%;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			padding: 0 1.43rem 1.9rem;
			margin-bottom: 0.95rem;
			// height: 2.2rem;

			div {
				font-size: 1.14rem;
				font-weight: 400;
				color: #6f6f6f;
				padding: 0.29rem 1.57rem;
				border: 0.5px solid #f4f5f7;
				background: #f4f5f7;
				border-radius: 1.07rem;
				&.active {
					color: #e63116;
					background: #ffe5e5;
					border: 0.5px solid #e5371b;
				}
			}
		}
	}
	.ui-evaluation-body {
		// background: rgba(255, 255, 255, 1);
		.list {
			padding: 2.24rem 1.43rem 1.9rem;
			background-color: #fff;
			// border-bottom: 0.5px solid rgba(232, 234, 237, 1);
			color: #333;
			// font-size: 0.75rem;
			margin-bottom: 0.95rem;
			div {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 1.43rem;
				// display: flex;
				// justify-content: space-between;
				// align-content: center;
				// align-items: center;
				span {
					display: flex;
					img {
						width: 3.81rem;
						height: 3.81rem;
						border-radius: 50%;
					}
					div {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: flex-start;
						padding: 0;
						margin-left: 0.95rem;
						span {
							&:nth-child(1) {
								font-size: 1.14rem;
								font-weight: 600;
								color: #161616;
							}
							&:nth-child(2) {
								font-size: 0.95rem;
								font-weight: 400;
								color: #6F6F6F;
							}
						}
					}
				}
			}
			p {
				padding: 0;
				margin: 0;
				flex-basis: 100%;
				// display: -webkit-box;
				// -webkit-box-orient: vertical;
				// -webkit-line-clamp: 2;
				// overflow: hidden;

				font-size: 1.24rem;
				font-weight: 400;
				color: #161616;

				word-break: normal;
				width: auto;
				display: block;
				white-space: pre-wrap;
				word-wrap: break-word;
				overflow: hidden;
			}
		}
		.list-empty {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			img {
				width: 2.75rem;
			}
			p {
				color: #7c7f88;
				font-size: 1.3rem;
				padding: 0;
				margin: 0;
				font-weight: normal;
			}
		}
	}
}
</style>
