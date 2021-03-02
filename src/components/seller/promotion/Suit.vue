<template>
	<div class="container p_discount hsy_main">
		<!-- 头部标签 -->
		<head-title title="优惠套装管理" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor="#626771" color="#FFFFFF"></head-title>
		<ul class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="(item, index) in dataArr" :key="item.bl_id">
				<div class="details">
					<span>{{ item.bl_name }}</span>
					<span v-if="item.blyhtz_type == 1">仅零售</span>
					<span v-else-if="item.blyhtz_type == 2">仅社团</span>
					<span v-else>零售和社团</span>
					<span>￥{{ item.bl_discount_price }}</span>
					<span>商品数:{{ item.count }}</span>
					<!-- <span>{{item}}</span> -->
					<span v-if="item.bl_state == 0">关闭</span>
					<span v-else>开启</span>
					<ul class="goods-btn" v-show="index == i">
						<li @click="$router.push({ name: 'SellerSuitAdd', query: { bundling_id: item.bl_id } })">编辑</li>
						<li @click="delSuitItem(item.bl_id)">删除</li>
					</ul>
					<div class="item-more" @click="popupMore(index)">
						<span></span>
						<span></span>
					</div>
				</div>
				
			</li>
			<div class="loading-wrapper" v-if="dataArr.length > 0">
				<p class="common-no-more" v-if="!isMore">没有更多了</p>
				<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
			</div>
			<empty-record2 isFrom='content' v-if="dataArr.length <= 0 && !isMore"></empty-record2>
		</ul>
		<div class="tc" style="margin-top: 2rem;padding-bottom: 8rem;">注：您最多可以发布10个优惠套装</div>
		<mt-button class="hsy_btn hsy_f" @click="$router.push({ name: 'SellerSuitAdd' })">添加活动</mt-button>
	</div>
</template>

<script>
import { getSuitList,delSuitItem } from '../../../api/sellerPromotion';
import { Toast } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
export default {
	data() {
		return {
			dataArr: [],
			params: {
				page: 0
			},
			isMore: true,
			i: -1,
			loading:false	//是否加载更多
		};
	},
	components: {
		HeadTitle,
		EmptyRecord2
	},
	created() {},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		popupMore(i) {
			if (this.i == i) {
				this.i = -1;
				return;
			}
			this.i = i;
			console.log(this.i);
		},
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = true;
				this.getSuitList(true);
			}
		},
		getSuitList(ispush) {
			getSuitList(this.params)
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
					this.dataArr = this.dataArr.concat(res.result.bundling_list);
				} else {
					this.dataArr = res.result.bundling_list;
				}
				this.isMore = res.result.hasmore;
				this.loading = false
			}
		},
		delSuitItem(id) {
			delSuitItem(id)
				.then(res => {
					Toast(res.message);
					this.i = -1;
					this.params.page = 0
					this.getSuitList()
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
	min-height: 100vh;
	ul.flex-wrapper {
		> li {
			margin: 0.4rem 1rem;
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
.tc {
	text-align: center;
}
.details {
	@include item_flex;
	padding: 1.43rem;
	position: relative;
	flex-grow: 1;
	width: 100%;
	box-sizing: border-box;
	span {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	// margin-right: 1.3rem;
}
.item-more {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.33rem;
	height: 1.19rem;
	background: #f3f3f3;
	border-radius: 0.74rem;
	// position: absolute;
	right: 1.76rem;
	bottom: 1.71rem;
	// margin-right: 1rem;
	span {
		width: 0.29rem;
		height: 0.29rem;
		background: #d6d6d6;
		border-radius: 50%;
		&:first-child {
			margin-right: 0.33rem;
		}
	}
}
.goods-btn {
	position: absolute;
	background-color: #fff;
	right: 5rem;
	bottom: -3.5rem;
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
</style>
