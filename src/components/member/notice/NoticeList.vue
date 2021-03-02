<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header title="通知消息" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="通知消息"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="body" v-if="notice_list && notice_list.length">
				<div class="notice-message-body" v-for="(item, index) in notice_list" :key="item.message_id">
					<p>{{ $moment.unix(item.message_time).format('YYYY-MM-DD HH:mm') }}</p>
					<div class="notice-track">
						<div class="notice-status">
							<p class="title">{{ message_type_text[item.message_type] }}</p>
							<p class="content">{{ item.message_body }}</p>
						</div>
					</div>
				</div>
			</div>
			<empty-record2 isFrom='content' v-else-if="notice_list && !notice_list.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getNoticeList } from '../../../api/memberNotice';
import { Toast, Indicator } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	name: 'NoticeList',
	components: {
		EmptyRecord2,
		HeadTitle
	},
	data() {
		return {
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			message_type_text: ['私信', '系统消息', '留言'],
			// wrapperHeight: 0,
			notice_list: false
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
		goBack() {
			this.$router.go(-1);
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getNoticeList(true);
			}
		},
		getNoticeList() {
			Indicator.open();

			getNoticeList(this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.notice_list;
					if (temp) {
						if (!this.notice_list) {
							this.notice_list = temp;
						} else {
							this.notice_list = this.notice_list.concat(temp);
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
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background: rgba(244, 245, 247, 1);
	.header {
		border-bottom: 1px solid #e8eaed;
		position: fixed;
		width: 100%;
		z-index: 1;
	}
	.body {
		width: 100%;
		padding: 0 1.43rem;
		box-sizing: border-box;
		.notice-message-body {
			width: 100%;
			height: 100%;
			> p {
				text-align: center;
				// margin-top: 1rem;
				// margin-bottom: 0.5rem;
				margin: 1.91rem 0 .96rem;
				font-size: 1.14rem;
				font-weight: 400;
				color: #6F6F6F;
			}
			.notice-track {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100%;
				background: rgba(255, 255, 255, 1);
				border-radius: 0.96rem;
				// margin: 0 0.5rem;
				.notice-status {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					// margin: 0.6rem 0.75rem 0.7rem 0.75rem;
					margin: 1.91rem 2rem 2rem 1.43rem;
					.title {
						// font-size: 0.7rem;
						// color: #333;
						// color: rgba(22, 22, 22, 1);
						// margin: 0 0 0.7rem 0;
						margin-bottom: 1.77rem;
						font-size: 1.34rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #161616;
					}
					.content {
						// font-size: 0.65rem;
						// color: #666;
						width: 100%;
						height: 100%;
						
						font-size: 1.15rem;
						font-weight: 400;
						color: #6F6F6F;
					}
				}
				.arrow-right {
					width: 0.25rem;
					height: 0.5rem;
					margin-right: 0.6rem;
					margin-left: 0.65rem;
				}
			}
		}
	}
}
</style>
