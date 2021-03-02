<template>
	<div class="container browse">
		<!-- <div class="common-header-wrap">
			<mt-header title="浏览历史" class="common-header">
				<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
				<mt-button slot="right" @click="clearallBrowse()">清空浏览记录</mt-button>
			</mt-header>
		</div> -->
		<HeadTitle title="浏览历史" titleRight="清空"></HeadTitle>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="list-wrapper" v-if="goodsbrowse_list && goodsbrowse_list.length">
				<!-- <mt-cell-swipe class="browse-list" v-for="(item, index) in goodsbrowse_list">
					<div class="info" @click="goGoods(item.goods_id)">
						<img class="image" :src="item.goods_image_url" />
						<div>
							<div class="title">{{ item.goods_name }}</div>
							<div>￥{{ item.goods_promotion_price }}</div>
						</div>
					</div>
				</mt-cell-swipe> -->
				<div class="browse-list" v-for="(item, index) in goodsbrowse_list">
					<div class="info" @click="goGoods(item.goods_id)">
						<img class="image" :src="item.goods_image_url" />
						<div>
							<div class="title">{{ item.goods_name }}</div>
							<div class="price">
								<span>￥</span>
								<span>{{ item.goods_promotion_price }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<empty-record2 isFrom="content" v-else-if="goodsbrowse_list && !goodsbrowse_list.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { getBrowseList, clearallBrowse } from '../../../api/memberBrowse';
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
			goodsbrowse_list: false
		};
	},
	created() {},
	mounted() {
		resetRem();
		// this.wrapperHeight = document.documentElement.clientHeight - 90;
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 清空浏览记录
		fun_right() {
			MessageBox({
				title: '确认',
				message: '是否要清空浏览记录？',
				showCancelButton: true
			}).then(action => {
				if (action === 'confirm') {
					clearallBrowse(this.params)
						.then(res => {
							this.goodsbrowse_list = false;
						})
						.catch(function(error) {
							Toast(error.message);
						});
				}
			});
		},
		// clearallBrowse() {
		// 	clearallBrowse(this.params)
		// 		.then(res => {
		// 			this.goodsbrowse_list = false;
		// 		})
		// 		.catch(function(error) {
		// 			Toast(error.message);
		// 		});
		// },
		goBack() {
			this.$router.go(-1);
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getBrowseList(true);
			}
		},
		getBrowseList() {
			Indicator.open();
			getBrowseList(this.params).then(res => {
				Indicator.close();
				if (res) {
					this.goodsbrowse_list = res.result.goodsbrowse_list;
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}
				}
			});
		},
		goGoods(id) {
			console.log(id);
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: id } });
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
	background-color: rgba(244, 245, 247, 1);
}
.browse {
	/deep/.header-title-r {
		color: red;
	}
}
.header {
	border-bottom: 1px solid #e8eaed;
}
.list-wrapper {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.browse-list {
		background-color: #fff;
		// border-bottom: 1px solid #e8eaed;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.91rem 1.43rem;

		// .right {
		// 	width: 2.5rem;
		// }
		.info {
			flex: 1;
			display: flex;
			> div {
				padding: 0.3rem 0;
				margin-left: 1.43rem;
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				justify-content: space-between;
				.title {
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.price {
					span {
						font-weight: 600;
						color: #e63116;
						&:nth-child(1) {
							font-size: 0.95rem;
						}
						&:nth-child(2) {
							font-size: 1.71rem;
						}
					}
				}
			}

			.image {
				width: 25%;
				height: 25%;
				flex-shrink: 0;
				float: left;
			}
		}
	}
}
</style>
