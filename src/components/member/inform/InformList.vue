<template>
	<div class="container inform-list">
		<!-- <div class="common-header-wrap">
            <mt-header title="举报商品" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="举报商品"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="informList && informList.length">
				<div class="inform-item" v-for="(item, index) in informList">
					<div class="inform-item-top">
						<span>{{ item.informsubject_type_name }}</span>
						<span v-if="item.inform_state == '1'" @click="cancelInform(item.inform_id)">取消</span>
					</div>
					<div class="inform-info" @click="$router.push({ name: 'MemberInformForm', query: { inform_id: item.inform_id } })">
						<div class="p-img"><img :src="item.inform_goods_image_url" /></div>
						<div class="p-info">
							<div class="iten-content">举报主题 : {{ item.informsubject_content }}</div>
							<!-- <div class="name">举报描述 : {{ item.inform_content }}</div> -->
							<div class="buyer-info">提交时间 : {{ $moment.unix(item.inform_datetime).format('YYYY-MM-DD HH:MM') }}</div>
						</div>
					</div>
					<!-- <div class="inform-info">
						<div class="p-img"><img :src="item.inform_goods_image_url" /></div>
						<div class="p-info">
							<div class="explain">{{ item.inform_subject_content }}</div>
							<div class="name">{{ item.inform_content }}</div>
						</div>
					</div>
					<div class="inform-btn">
						<div class="buyer-info">举报于 {{ $moment.unix(item.inform_datetime).format('YYYY年MM月DD日') }}</div>
						<div class="btn-wrapper">
							<mt-button size="small" type="primary" class="btn" v-if="item.inform_state == '1'" @click="cancelInform(item.inform_id)">取消</mt-button>
						</div>
						<div class="btn-wrapper">
							<mt-button size="small" type="default" class="btn" @click="$router.push({ name: 'MemberInformForm', query: { inform_id: item.inform_id } })">
								查看
							</mt-button>
						</div>
					</div> -->
				</div>
			</div>
			<empty-record2 isFrom="content" v-else-if="informList && !informList.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import { Indicator, MessageBox, Toast } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getInformList, cancelInform } from '../../../api/memberInform';
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
			informList: false // 商品列表
		};
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		cancelInform(order_id) {
			MessageBox.confirm('你确定要取消吗？').then(action => {
				cancelInform(order_id)
					.then(res => {
						Toast(res.message);
						this.$router.go(0);
					})
					.catch(function(error) {
						console.log(error);
						// Toast(error.message);
					});
			});
		},
		getInformList(ispush) {
			Indicator.open();
			let params = this.params;
			getInformList(params).then(res => {
				Indicator.close();
				if (res) {
					if (ispush && this.informList) {
						this.informList = this.informList.concat(res.result.inform_list);
					} else {
						this.informList = res.result.inform_list;
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
				this.getInformList(true);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
	min-height: 100vh;
}
.inform-item {
	background: #fff;
	padding: 1.43rem;
	overflow: hidden;
	margin-bottom: 0.95rem;
	padding-top: 0.1rem;

	background: #fff;
	padding: 1.43rem;
	margin-bottom: 0.95rem;
	margin: 0.95rem;
	border-radius: 1rem;
	.inform-item-top {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0 0.95rem 0;
		box-sizing: border-box;
		span {
			&:nth-child(1) {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
			}
			&:nth-child(2) {
				font-size: 1.33rem;
				font-weight: 600;
				color: #e63116;
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
	.inform-info {
		display: flex;
		margin-top: 1.43rem;
		box-sizing: border-box;
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
				color: #6f6f6f;
				// word-wrap: break-word;
				// overflow: hidden;
			}
			.iten-content {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				// word-wrap: break-word;
				// overflow: hidden;
			}
			.name {
			}
			.buyer-info {
			}
		}
	}
}
.inform-list{
	padding-top: 0.1rem;
}
// .inform-list {
// 	/deep/.mint-msgbox-btns {
// 		.mint-msgbox-btn {
// 			font-size: 1.14rem;
// 			line-height: 40px;
// 		}
// 	}
// }
// .inform-info {
// 	padding: 0.5rem;
// 	display: flex;
// }
// .inform-info .p-img {
// 	width: 4rem;
// }
// .inform-info .p-img img {
// 	width: 4rem;
// 	height: 4rem;
// }
// .inform-info .p-info {
// 	flex: 1;
// 	margin-left: 1rem;
// }
// .inform-info .p-info .name {
// 	font-size: 0.8rem;
// }
// .inform-info .p-info .explain {
// 	font-size: 0.8rem;
// 	color: $primaryColor;
// 	margin-bottom: 0.5rem;
// }
// .inform-btn {
// 	padding: 0.5rem;
// 	border-top: 1px solid #e4e4e4;
// 	display: flex;
// }
// .inform-btn .btn-wrapper {
// 	margin-left: 0.5rem;
// }
// .inform-btn .btn {
// 	float: right;
// }
// .inform-btn .buyer-info {
// 	flex: 1;
// 	font-size: 0.7rem;
// 	line-height: 1.4rem;
// }
</style>
