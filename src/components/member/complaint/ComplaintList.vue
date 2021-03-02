<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
        <mt-header title="商家投诉" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
		</div> -->
		<head-title title="商家投诉"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="complaintList && complaintList.length">
				<div class="goods-item" v-for="(item, index) in complaintList">
					<div class="inform-item-top">
						<span>{{ item.complain_subject_content }}</span>
						<span v-if="item.complain_state == '10'" @click="cancelComplaint(item.complain_id)">取消</span>
						<span v-if="item.complain_state == 30" @click="handleComplain(item.complain_id)">提交仲裁</span>
					</div>
					<div class="goods-info" @click="$router.push({ name: 'MemberComplaintForm', query: { complain_id: item.complain_id } })">
						<div class="p-img"><img :src="goodsList[item.order_goods_id].goods_image_url" /></div>
						<div class="p-info">
							<div class="iten-content">{{ item.complain_subject_content }}</div>
							<!-- <div class="name">{{ item.complain_content }}</div> -->
							<div class="buyer-info">投诉于 {{ $moment.unix(item.complain_datetime).format('YYYY年MM月DD日') }}</div>
						</div>
					</div>
					<!-- <div class="goods-btn">
						<div class="buyer-info">投诉于 {{ $moment.unix(item.complain_datetime).format('YYYY年MM月DD日') }}</div>
						<div class="btn-wrapper">
							<mt-button size="small" type="primary" class="btn" v-if="item.complain_state == '10'" @click="cancelComplaint(item.complain_id)">取消</mt-button>
						</div>
						<div class="btn-wrapper" v-if="item.complain_state == 30">
							<mt-button size="small" type="primary" class="btn" @click="handleComplain(item.complain_id)">提交仲裁</mt-button>
						</div>
						<div class="btn-wrapper">
							<mt-button size="small" type="default" class="btn" @click="$router.push({ name: 'MemberComplaintForm', query: { complain_id: item.complain_id } })">
								查看
							</mt-button>
						</div>
					</div> -->
				</div>
			</div>
			<empty-record2 isFrom='content' v-else-if="complaintList && !complaintList.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Indicator, MessageBox, Toast } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getComplaintList, cancelComplaint, handleComplain } from '../../../api/memberCompliant';
export default {
	name: 'BillList',
	components: {
		EmptyRecord2,
		HeadTitle
	},
	data() {
		return {
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			complaintList: false, // 商品列表
			goodsList: false
		};
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		handleComplain(complaint_id) {
			handleComplain(complaint_id)
				.then(res => {
					Toast(res.message);
					this.$router.go(0);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		cancelComplaint(order_id) {
			MessageBox.confirm('你确定要取消吗？').then(action => {
				cancelComplaint(order_id)
					.then(res => {
						Toast(res.message);
						this.$router.go(0);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		getComplaintList(ispush) {
			Indicator.open();
			let params = this.params;
			getComplaintList(params).then(res => {
				Indicator.close();
				if (res) {
					if (ispush && this.complaintList) {
						this.complaintList = this.complaintList.concat(res.result.complaint_list);
						this.goodsList = Object.assign(this.goodsList, res.result.goods_list);
					} else {
						this.complaintList = res.result.complaint_list;
						this.goodsList = res.result.goods_list;
					}
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}
				}
			});
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getComplaintList(true);
			}
		}
	}
};
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
		background-color: rgba(244, 245, 247, 1);
	}
.goods-item {
	background: #fff;
	padding: 1.43rem;
	margin-bottom: 0.95rem;
	.inform-item-top {
		position: relative;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		padding: 0 0 0.95rem 0;
		box-sizing: border-box;
		span {
			&:nth-child(1) {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
			}
			&:nth-child(2),&:nth-child(3) {
				font-size: 1.33rem;
				margin-left: auto;
				font-weight: 500;
				color: #e63116;
			}
			&:nth-child(3) {
				margin-left: 1rem;
			}
		}
		&::after {
			content: '';
			position: absolute;
			height: 1px;
			width: 100%;
			bottom: 0;
			background-color: #efefef;
		}
	}
}
.goods-info {
	margin-top: 1.43rem;
	// padding: 0.5rem;
	display: flex;
	.p-img {
		width: 15%;
    margin-right: 5%;
		img {
			width: 100%;
			height: 100%;
			border-radius: 0.76rem;
		}
	}
	.p-info {
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		div {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6F6F6F;
		}
		.iten-content {
			display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 2;
		}
		.name {
			
		}
		.buyer-info {
			
		}
	}
}
// .goods-info .p-img {
// 	width: 4rem;
// }
// .goods-info .p-img img {
// 	width: 4rem;
// 	height: 4rem;
// }
// .goods-info .p-info {
// 	flex: 1;
// 	margin-left: 1rem;
// }
// .goods-info .p-info .name {
// 	font-size: 0.8rem;
// }
// .goods-info .p-info .explain {
// 	font-size: 0.8rem;
// 	color: $primaryColor;
// 	margin-bottom: 0.5rem;
// }
.goods-btn {
	padding: 0.5rem;
	border-top: 1px solid #e4e4e4;
	display: flex;
}
.goods-btn .btn-wrapper {
	margin-left: 0.5rem;
}
.goods-btn .btn {
	float: right;
}
.goods-btn .buyer-info {
	flex: 1;
	font-size: 0.7rem;
	line-height: 1.4rem;
}
</style>
