<template>
	<div class="container hsy_main">
		<!-- header -->
		<!-- <div class="common-header-wrap">
			<mt-header title="评价订单" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="发表评价"></head-title>
		<!-- body -->
		<div class="body">
			<div class="order-comment-body" v-for="(item, index) in orderItem" v-if="orderItem.length > 0">
				<div class="body-list">
					<div class="image"><img v-bind:src="item.goods_image_url" /></div>
					<div class="comment">
						<span>{{ item.goods_name }}</span>
						<span class="common-score-wrapper" @click="setStar(item.goods_id, index, $event)" ref="star">
							<i class="iconfont front" :style="{ width: (score[index] / 5) * 100 + '%' }"></i>
							<i class="iconfont back"></i>
						</span>
					</div>
				</div>
				<div class="enter"><textarea placeholder="写下你对商品的评价吧" maxlength="200" v-model="result.goods[item.goods_id].comment"></textarea></div>
			</div>

			<div v-if="!store_info.is_platform_store" class="store-evaluate">
				<div class="title">店铺评价</div>
				<div class="comment">
					<span>描述相符</span>
					<span class="common-score-wrapper" @click="setStoreStar(0, $event)" ref="star">
						<i class="iconfont front" :style="{ width: (store_desccredit / 5) * 100 + '%' }"></i>
						<i class="iconfont back"></i>
					</span>
				</div>
				<div class="comment">
					<span>服务态度</span>
					<span class="common-score-wrapper" @click="setStoreStar(1, $event)" ref="star">
						<i class="iconfont front" :style="{ width: (store_servicecredit / 5) * 100 + '%' }"></i>
						<i class="iconfont back"></i>
					</span>
				</div>
				<div class="comment">
					<span>发货速度</span>
					<span class="common-score-wrapper" @click="setStoreStar(2, $event)" ref="star">
						<i class="iconfont front" :style="{ width: (store_deliverycredit / 5) * 100 + '%' }"></i>
						<i class="iconfont back"></i>
					</span>
				</div>
			</div>
		</div>
		<mt-button @click="submit" class="hsy_f hsy_btn">提交</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast } from 'mint-ui';
import { getOrderEvaluateInfo, saveOrderEvaluate } from '../../../api/memberOrder';

export default {
	data() {
		return {
			store_info: {},
			orderItem: {},
			result: { goods: {} },
			score: [],
			store_desccredit: 5,
			store_servicecredit: 5,
			store_deliverycredit: 5
		};
	},
	components:{
		HeadTitle
	},
	mounted() {
		resetRem();
	},
	created() {
		if (this.$route.params.order_id) {
			getOrderEvaluateInfo(this.$route.params.order_id)
				.then(res => {
					this.orderItem = res.result.order_goods;
					this.store_info = res.result.store_info;
					for (var i in this.orderItem) {
						this.result.goods[this.orderItem[i].goods_id] = { comment: '', score: 5 };
						this.score[i] = 5;
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		submit() {
			this.result['store_desccredit'] = this.store_desccredit;
			this.result['store_servicecredit'] = this.store_servicecredit;
			this.result['store_deliverycredit'] = this.store_deliverycredit;
			console.log(this.result,'result')
			saveOrderEvaluate(this.$route.params.order_id, this.result)
				.then(res => {
					// this.$router.push({ name: 'MemberOrderList', query: { state: 'state_noeval' } });
					this.$router.go(-1)
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		setStoreStar(type, event) {
			let starWidth = this.$refs.star[0].offsetWidth;
			let score = Math.ceil((event.offsetX / starWidth) * 5);
			switch (type) {
				case 0:
					this.store_desccredit = score;
					break;
				case 1:
					this.store_servicecredit = score;
					break;
				case 2:
					this.store_deliverycredit = score;
					break;
			}
		},
		setStar(goods_id, index, event) {
			let starWidth = this.$refs.star[0].offsetWidth;
			let score = Math.ceil((event.offsetX / starWidth) * 5);
			this.result.goods[goods_id].score = score;
			this.score.splice(index, 1, score);
			// debugger
		}
	}
};
</script>

<style lang="scss" scoped>
.common-score-wrapper .back {
	display: block;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: rgba(244, 245, 247, 1);
	min-height: 100vh;
	.body {
		top: 2.2rem;
		width: 100%;
		.store-evaluate {
			margin-top: 0.95rem;
			padding: 1.91rem 1.43rem 1.43rem;
			background: #fff;
			// font-size: 0.7rem;
			.title {
				// line-height: 2rem;
				// border-top: 1px solid #e1e1e1;
				font-size: 1.24rem;
				font-weight: 600;
				color: #161616;
			}
			.comment {
				margin-top: 0.96rem;
				display: flex;
				span {
					&:first-child {
						font-size: 1.24rem;
						font-weight: 400;
						color: #6F6F6F;
					}
				}
				.common-score-wrapper {
					margin-left:1.43rem;
					width: 80px;
					i {
						color: rgba(230, 49, 22, 1);
						font-size: 16px;
						height: 16px;
						line-height: 16px;
						margin-right: 10px;
					}
				}
			}
		}
		.order-comment-body {
			background: rgba(255, 255, 255, 1);
			padding: 2.39rem 0 1.43rem 1.43rem;
			.body-list {
				display: flex;
				justify-content: left;
				align-content: center;
				align-items: center;
				padding-bottom: 1.43rem;
				padding-right: 1.43rem;
				border-bottom: 1px solid rgba(239, 239, 239, 1);
			}
			.image {
				width: 2.86rem;
				height: 2.86rem;
				flex-shrink: 0;
				img {
					width: 100%;
					height: 100%;
					border-radius: 0.2rem;
				}
			}
			.comment {
				
				// flex-basis: 100%;
				padding-left: 1.43rem;
				.common-score-wrapper {
					width: 80px;
					height: 16px;
					i {
						color: rgba(230, 49, 22, 1);
						font-size: 16px;
						height: 16px;
						line-height: 16px;
						margin-right: 10px;
					}
				}
				span {
					font-size: 1.24rem;
					color: #7c7f88;
					text-align: left;
					display: block;
				}
				ul {
					display: flex;
					justify-content: space-between;
					align-content: center;
					align-items: center;
					margin-top: 1.2rem;
					li {
						img {
							width: 0.95rem;
							height: 0.95rem;
							flex-shrink: 0;
						}
						label {
							// font-size: 0.7rem;
							color: rgba(78, 84, 93, 1);
							font-weight: normal;
						}
					}
				}
			}
			.enter {
				padding-top: 1.43rem;
				padding-right: 1.43rem;
				textarea {
					width: 100%;
					height: 6rem;
					// background: rgba(247, 249, 250, 1);
					// border: 1px solid #f7f9fa;
					box-sizing: border-box;
					padding: 0.5rem 0 0 0.5rem;
					font-size: 1.15rem;
					-webkit-appearance: none;
					outline: none;
					&::-webkit-input-placeholder {
					  font-size: 1.15rem;
					  font-weight: 400;
					  color: #C6C6C6;
					}
				}
			}
		}
	}
	// .hsy_main {
	// 	.hsy_btn {
	// 		background: linear-gradient(90deg, #FC6952 0%, #E53216 100%)!important;
	// 	}
	// }
}

</style>
