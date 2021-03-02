<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header title="积分明细" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="top-bg">
			<div class="header-wrap">
				<img class="img-back" @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span class="header-title">积分明细</span>
				<!-- <img class="header-title" src="@/assets/image/icon2/icon-hangqing.png" alt="" /> -->
				<span></span>
				<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
			</div>
			<div class="integral-all">{{integralAll}}</div>
			<p class="integral-all-title">当前积分</p>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="list-wrapper" v-if="point_list && point_list.length">
				<div class="point-list" v-for="(item, index) in point_list" :key="item.pl_id">
					<div class="info">
						<div class="title">{{ item.stagetext }}</div>
						<div class="time">{{ item.addtimetext }}</div>
					</div>
					<div :class="item.pl_points > 0 ? 'number' : 'diture'">{{item.pl_points>0?'+':'-'}}{{ item.pl_points }}</div>
				</div>
			</div>
			<empty-record2 v-else-if="point_list && !point_list.length" isFrom='point'></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { getPointList } from '../../../api/memberPoint';
import { Toast, Indicator } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	name: 'BalanceHistory',
	components: {
		EmptyRecord2
	},
	data() {
		return {
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			// wrapperHeight: 0,
			integralAll:this.$route.query.integralAll,
			point_list: false,
		};
	},
	created() {},

	mounted() {
		resetRem()
		// this.wrapperHeight = document.documentElement.clientHeight - 90;
	},
	beforeDestroy() {
		resumeRem()
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getPointList(true);
			}
		},
		getPointList() {
			Indicator.open();

			getPointList(this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.log_list;
					if (temp) {
						if (!this.point_list) {
							this.point_list = temp;
						} else {
							this.point_list = this.point_list.concat(temp);
						}
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	height: 100%;
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.top-bg {
		height: 12.19rem;
		width: 100%;
		background: url('../../../assets/image/icon2/icon-jifen.png') center center/100% 100% no-repeat;
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
				height: 2.09rem;
				font-size: 1.39rem;
				color: #FFFFFF;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.integral-all {
			margin-top: 2.48rem;
			text-align: center;
			font-size: 2.29rem;
			font-weight: 600;
			color: #FFFFFF;
		}
		.integral-all-title {
			font-size: 1.15rem;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			margin-top: 0.48rem;
		}
	}
}
.header {
	border-bottom: 1px solid #e8eaed;
}
.topList {
	position: fixed;
	width: 100%;
	margin-top: 2rem;
	height: 2rem;
	z-index: 100;
}
.list-wrapper {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.point-list {
		background-color: #fff;
		border-bottom: 1px solid #e8eaed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.2rem 1.43rem;
		.info {
			.title {
				font-size: 1.34rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #161616;
			}
			.time {
				font-size: 1.05rem;
				font-weight: 400;
				color: #6F6F6F;
				margin-top: 0.25rem;
			}
		}
		.number {
			font-size: 1.34rem;
			font-weight: 600;
			color: #E63116;
			// font-size: 1rem;
			// color: $primaryColor;
		}
		.diture {
			font-size: 1.34rem;
			font-weight: 600;
			color: #161616;
		}
	}
}
</style>
