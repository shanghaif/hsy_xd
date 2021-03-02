<template>
	<div class="container p_discount hsy_main">
		<!-- 头部标签 -->
		<head-title title="抢购管理" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor="#626771" color="#FFFFFF"></head-title>
		<ul class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="(item, index) in dataArr" :key="index">
				<div class="details">
					<div>
						<span>{{ item.groupbuy_name }}</span>
						<span>{{ item.goods_name }}</span>
						<span v-if="item.groupbuy_type == 1">仅零售</span>
						<span v-else-if="item.groupbuy_type == 2">仅社团</span>
						<span v-else>零售和社团</span>
					</div>
					<div>
						<span>{{ $moment(item.groupbuy_starttime * 1000).format('YYYY-MM-DD h:mm') }}</span>
						至
						<span>{{ $moment(item.groupbuy_endtime * 1000).format('YYYY-MM-DD h:mm') }}</span>
						<span>{{item.groupbuy_state_text}}</span>
						<!-- <span v-if="item.groupbuy_state == 10">审核中</span>
						<span v-else-if="item.groupbuy_state == 20">正常</span>
						<span v-else-if="item.groupbuy_state == 31">管理员关闭</span>
						<span v-else-if="item.groupbuy_state == 30">审核失败</span>
						<span v-else-if="item.groupbuy_state == 32">已结束</span> -->
					</div>
					<!-- <span>{{ item.end }}</span> -->

					<!-- <div class="item-more" @click="popupMore(index)">
						<span></span>
						<span></span>
					</div>

					<ul class="goods-btn" v-show="index == i">
						<li>编辑</li>
						<li>管理</li>
					</ul> -->
				</div>
			</li>
			<div class="loading-wrapper" v-if="dataArr.length > 0">
				<p class="common-no-more" v-if="!isMore">没有更多了</p>
				<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
			</div>
			<empty-record2 isFrom='content' v-if="dataArr.length <= 0 && !isMore"></empty-record2>
		</ul>
		<mt-button class="hsy_btn hsy_f" @click="$router.push({ name: 'SellerPurchasAdd' })">新增抢购</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getPurchaseList } from '../../../api/sellerPromotion';
import { Toast } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	data() {
		return {
			dataArr: [
				// {
				// 	name: '活动',
				// 	type: '近零售',
				// 	start: '2020-12-12',
				// 	end: '2020-12-15',
				// 	down: '2020-12-12',
				// 	status: true
				// },
				// {
				// 	name: '活动',
				// 	type: '近零售',
				// 	start: '2020-12-12',
				// 	end: '2020-12-15',
				// 	down: '2020-12-12',
				// 	status: true
				// }
			], // 数据
			i: null,
			params: {
				page: 0
			},
			isMore: true,
			loading: false
		};
	},
	components: {
		HeadTitle,
		EmptyRecord2
	},
	created() {
		// this.getPurchaseList()
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				// this.loading = true;
				this.getPurchaseList(true);
			}
		},
		getPurchaseList(ispush) {
			getPurchaseList(this.params)
				.then(res => {
					// this.dataArr = res.result.groupbuy_list
					this.buildData(ispush, res);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		buildData(ispush, res) {
			if (res) {
				if (ispush) {
					this.dataArr = this.dataArr.concat(res.result.groupbuy_list);
				} else {
					this.dataArr = res.result.groupbuy_list;
				}
				this.isMore = res.result.hasmore;
				this.loading = false;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
	min-height: 100vh;
	ul.flex-wrapper {
		padding-bottom: 6rem;
		> li {
			margin: 0.4rem 1.42rem;
			// margin-bottom: 0.8rem;
			display: flex;
			align-items: center;
			background: #fff;
		}
	}
}
// 弹性布局
@mixin item_flex {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.details {
	@include item_flex;
	padding: 1.43rem;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	div {
		@include item_flex;
		width: 100%;
	}
	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
