<template>
	<div class="container">
		<!--        <div class="common-header-wrap">
            <mt-header title="商品咨询" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="咨询管理"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="consult_list && consult_list.length">
				<div class="consult-item" v-for="(item, index) in consult_list">
					<div class="consult-info">
						<div class="p-info">
							<div class="explain">
								{{ consult_type[item.consulttype_id].consulttype_name }}
								<span class="right">{{ $moment.unix(item.consult_addtime).format('YYYY年MM月DD日') }}</span>
							</div>
							<div class="name">
								<span>咨询内容：</span>
								<textarea name="" id="" cols="" rows="4">
									{{ item.consult_content }}
								</textarea>
							</div>
							<div class="replay" v-if="item.consult_reply">商家回复：{{ item.consult_reply }}</div>
						</div>
					</div>
				</div>
			</div>
			<empty-record2 isFrom="content" v-else-if="consult_list && !consult_list.length"></empty-record2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getConsultList } from '../../../api/memberConsult';
export default {
	data() {
		return {
			consult_type: {},
			params: { page: 0, per_page: 10 },
			consult_list: false,
			loading: false, // 是否加载更多
			isMore: true // 是否有更多
		};
	},
	components: {
		EmptyRecord2,
		HeadTitle
	},
	computed: {},
	mounted() {
		resetRem();
	},
	created() {},
	watch: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getConsultList(true);
			}
		},
		getConsultList() {
			Indicator.open();

			getConsultList(this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.consult_list;
					if (temp) {
						if (!this.consult_list) {
							this.consult_list = temp;
							this.consult_type = res.result.consult_type;
						} else {
							this.consult_list = this.consult_list.concat(temp);
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
div{
	box-sizing: border-box;
}
.consult-item {
	background: #fff;
	// border-bottom: 1px solid #e1e1e1;
}
.consult-info {
	padding: 0 0 0 1.42rem;
	display: flex;
	width: 100%;
}
.consult-info .p-info {
	width: 100%;
	flex: 1;
	padding: 1.19rem 1.42rem 1.19rem 0;
	border-bottom: 1px solid rgba(239, 239, 239, 1);
}
.consult-info .p-info .name {
	font-size: 1.33rem;
	font-weight: 400;
	width: 100%;
	overflow: hidden;
	color: #161616;
	display: flex;
	align-items: center;
	span {
		width: 8rem;
		&:nth-child(2) {
			color: #6f6f6f;
		}
	}
	textarea{
		flex: 1;
	}
}
.consult-info .p-info .explain {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	margin-bottom: 0.95rem;
}
.consult-info .p-info .explain .right {
	float: right;
	color: #666;
	font-size: 1.2rem;
}
.consult-info .p-info .replay {
	border-top: 1px dashed #e1e1e1;
	font-size: 1.33rem;
	margin-top: 0.5rem;
	padding-top: 0.5rem;
	color: green;   word-break: normal;
    width: auto;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
}
</style>
