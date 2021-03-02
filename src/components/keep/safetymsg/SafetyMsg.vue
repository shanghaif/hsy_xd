<template>
	<div class="container ReportList">
		<!-- <div class="common-header-wrap">
        <mt-header title="商家投诉" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
		</div> -->
		<head-title title="举报商家"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="complaintList && complaintList.length">
				<div class="goods-item" v-for="(item, index) in complaintList" :key="index">
					<!-- <div class="inform-item-top">
						<span>{{ item.complain_subject_content }}</span>
						<span v-if="item.complain_state == '10'" @click="cancelComplaint(item.complain_id)">取消</span>
						<span v-if="item.complain_state == 30" @click="handleComplain(item.complain_id)">提交仲裁</span>
					</div> -->
					<div class="goods-info" :class="{goodsInfoEndTime:item.end_time}"
						@click="$router.push({ name: 'KeepReportForm', query: { report_id: item.complain_id } })">
						<!-- <div class="p-img"><img :src="goodsList[item.order_goods_id].goods_image_url" /></div> -->
						<div class="p-info">
							<div class="iten-content">商家名称：{{ item.accused_name }}</div>
							<div class="name">举报描述：{{ item.complain_content?item.complain_content:"暂无描述" }}</div>
							<div class="buyer-info">举报时间： {{ item.add_time }}</div>
							<span v-if="item.end_time">已处理</span>
						</div>
					</div>
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
import { getComplaintList } from '../../../apikeep/report';
export default {
	name: 'ReportList',
	components: {
		EmptyRecord2,
		HeadTitle
	},
	data() {
		return {
			params: { 
				page: 0,
				per_page: 10,
				store_id:this.$route.query.sid,
			},
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
		getComplaintList(ispush) {
			Indicator.open();
			let params = this.params;
			getComplaintList(params).then(res => {
				Indicator.close();
				if (res) {
					if (ispush && this.complaintList) {
						this.complaintList = this.complaintList.concat(res.result.complain_list);
					} else {
						this.complaintList = res.result.complain_list;
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
.ReportList{
	padding-top: 0.1rem;
}
	.container {
		min-height: 100vh;
		background-color: rgba(244, 245, 247, 1);
	}
.goods-item {
	background: #fff;
	padding: 0.95rem 1.43rem;
	margin-bottom: 0.95rem;
	margin: 0.95rem;
	border-radius: 1rem;
	position: relative;
	.inform-item-top {
		position: relative;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		padding: 1.43rem 0;
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
			width: 107%;
			bottom: 0;
			background-color: #efefef;
		}
	}
}
.goodsInfoEndTime{
	margin-top: 1rem;
}
.goods-info {
	// margin-top: 1.43rem;
	// padding: 0.5rem;
	display: flex;
	.p-img {
		width: 6.29rem;
		margin-right: 1.43rem;
		img {
			width: 100%;
			height: 100%;
			border-radius: 0.76rem;
		}
	}
	.p-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		span{
			position: absolute;
			top: 1rem;
			right: 1rem;
			color: #D83A15;
		}
		div {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6F6F6F;
			margin: 1rem 0;
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
