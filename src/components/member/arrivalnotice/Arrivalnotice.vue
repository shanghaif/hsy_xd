<template>
	<div class="container member-arrivalnotice">
		<!-- <div class="common-header-wrap">
			<mt-header title="到货通知" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="到货通知"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="list-wrapper" v-if="arrivalnotice_list && arrivalnotice_list.length">
				<mt-cell-swipe class="point-list" v-for="(item, index) in arrivalnotice_list" :key="item.arrivalnotice_id" :right="rightBottom(item.arrivalnotice_id)">
					<div class="info">
						<div class="title" @click="goGoods(item.goods_id)">{{ item.goods_name }}</div>
						<div class="time">{{ $moment.unix(item.arrivalnotice_addtime).format('YYYY.MM.DD') }}</div>
					</div>
					<div class="right" :class="item.arrivalnotice_state == 2 ? 'number' : 'diture'">{{ item.arrivalnotice_state == 2 ? '已通知' : '未通知' }}</div>
				</mt-cell-swipe>
			</div>
			<empty-record2 isFrom='content' v-else-if="arrivalnotice_list && !arrivalnotice_list.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getArrivalnoticeList, delArrivalnotice } from '../../../api/memberArrivalnotice';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	components: {
		EmptyRecord2,
		HeadTitle
	},
	data() {
		return {
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			// wrapperHeight: 0,

			arrivalnotice_list: false,
			// arrivalnotice_list:[{
			// 	arrivalnotice_id:1,
			// 	goods_id:1,
			// 	arrivalnotice_addtime:1341564864123,
			// 	arrivalnotice_state:1,
			// 	goods_name:'c而是数据'
			// }]
		};
	},
	created() {},

	mounted() {
		// this.wrapperHeight = document.documentElement.clientHeight - 90;
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 左滑事件
		rightBottom(favId) {
			return [
				{
					content: '删除',
					style: { background: 'red', color: '#fff' },
					handler: () =>
						MessageBox({
							title: '确认删除',
							message: '是否要删除此到货通知？',
							showCancelButton: true
						}).then(action => {
							if (action === 'confirm') {
								delArrivalnotice(favId);
								this.reload();
							}
						})
				}
			];
		},
		goBack() {
			this.$router.go(-1);
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getArrivalnoticeList(true);
			}
		},
		getArrivalnoticeList() {
			Indicator.open();

			getArrivalnoticeList(this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.arrivalnotice_list;
					if (temp) {
						if (!this.arrivalnotice_list) {
							this.arrivalnotice_list = temp;
						} else {
							this.arrivalnotice_list = this.arrivalnotice_list.concat(temp);
						}
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},
		reload() {
			this.params = { page: 0, per_page: 10 };
			this.loading = false;
			this.isMore = true;
			this.arrivalnotice_list = false;
			this.loadMore();
		},
		goGoods(goods_id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
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
}
// .header {
// 	border-bottom: 1px solid #e8eaed;
// }
// .topList {
// 	position: fixed;
// 	width: 100%;
// 	margin-top: 2rem;
// 	height: 2rem;
// 	z-index: 100;
// }
.list-wrapper {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.point-list {
		background-color: #fff;
		// border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.95rem 1.43rem 0.95rem;
		.right {
			width: 5rem;
		}
		.info {
			flex: 1;
			.title {
				font-size: 1.34rem;
				color: #333;
			}
			.time {
				font-size: 1.16rem;
				color: #999;
				margin-top: 1rem;
			}
		}
		.number {
			font-size: 1.34rem;
			color: $primaryColor;
		}
		.diture {
			font-size: 1.34rem;
			color: rgba(102, 102, 102, 1);
		}
	}
}
</style>
<style lang="scss">
	.member-arrivalnotice .mint-cell-title {
		flex: 0;
	}
	.member-arrivalnotice .mint-cell-value{
		flex: 1;
	}
.member-arrivalnotice .mint-cell-swipe-button {
	/* width: 4.5rem; */
	/* font-size: 0.7rem; */
	font-size: 1.1rem;
	display: flex !important;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background: linear-gradient(270deg,#ffbd00,#ff9a69)!important;
}
.member-arrivalnotice {
	overflow: hidden;
	.mint-cell {
		&::after {
			left: 4.5%;
			width: 105%;
			background-color: rgba(239, 239, 239, 1);
		}
		.mint-cell-wrapper {
		padding: 0;
	}
	}
	
}
</style>
