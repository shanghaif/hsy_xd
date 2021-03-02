<template>
	<div class="container invoice_list hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header title="发票管理" class="common-header">
				<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
				<mt-button slot="right" @click="goAdd">新增</mt-button>
			</mt-header>
		</div> -->
		<head-title title="发票管理" titleRight="新增"></head-title>
		<div v-if="invoice_list.length > 0">
			<div v-for="item in invoice_list" :key="item.invoice_id">
				<div class="content">
					<div class="top-wrapper">
						<div v-if="item.invoice_state == 1">
							<!-- <div class="title-wrapper"> -->
							<div>
								<span>发票类型 :</span>
								<label class="title">普通发票</label>
							</div>
							<div>
								<span>发票抬头 :</span>
								<label class="title">{{ item.invoice_title }}</label>
							</div>
							<!-- </div> -->
							<div>
								<span>纳税人识别号 :</span>
								<label class="desc address-text" style="-webkit-box-orient:vertical">{{ item.invoice_code }}</label>
							</div>
						</div>
						<div v-else>
							<!-- <div class="title-wrapper"> -->
							<div>
								<span>发票类型 :</span>
								<label class="title">增值税发票</label>
							</div>
							<div>
								<span>单位名称 :</span>
								<label class="title">{{ item.invoice_company }}</label>
							</div>
							<div>
								<span>纳税人识别号 :</span>
								<label class="desc address-text" style="-webkit-box-orient:vertical">{{ item.invoice_company_code }}</label>
							</div>
							<!-- </div> -->
						</div>
						<div>
							<div class="bottom-line">
								<span>发票内容 :</span>
								<label class="title">{{ item.invoice_content }}</label>
							</div>
						</div>
						<!-- <div class="bottom-line"></div> -->
					</div>
					<div class="bottom-wrapper">
						<div class="bottom-left-wrapper" v-if="isFromCheckout">
							<label class="subtitle" @click="useInvoice(item)">
								<i v-if="invoice_id == item.invoice_id" class="iconfont is-select">&#xe69d;</i>
								<i v-else class="iconfont no-select">&#xe69e;</i>
								设为默认
							</label>
						</div>
						<div class="bottom-right-wrapper">
							<div class="edit-wrapper" @click="onEdit(item.invoice_id)"><img src="@/assets/image/icon2/icon-edit.png" alt="" /></div>
							<div class="edit-wrapper delete-wrapper" @click="onDelete(item.invoice_id)"><img src="@/assets/image/icon2/icon-delete.png" alt="" /></div>
						</div>
					</div>
				</div>
			</div>
			<mt-button class="hsy_btn hsy_f" v-if="isFromCheckout" @click="useInvoice(false)">不使用发票</mt-button>
		</div>
		<div v-else><empty-record2 isFrom="content"></empty-record2></div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import { getInvoiceList, delInvoice } from '../../../api/memberInvoice';
import EmptyRecord2 from '../../../components/EmptyRecord2';
export default {
	name: 'InvoiceList',
	components: {
		EmptyRecord2,
		HeadTitle
	},
	data() {
		return {
			vat_deny: this.$route.query.vat_deny ? this.$route.query.vat_deny : false,
			isFromCheckout: this.$route.query.isFromCheckout ? this.$route.query.isFromCheckout : false,
			invoice_id: this.$route.query.invoice_id ? this.$route.query.invoice_id : 0,
			invoice_list: []
		};
	},
	created: function() {
		this.getInvoiceList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		fun_right() {
			this.goAdd();
		},
		goAdd() {
			this.$router.push({ name: 'MemberInvoiceForm', query: { action: 'add' } });
		},
		useInvoice(item) {
			let query = JSON.parse(this.$route.query.params);
			if (item == false) {
				query.invoice_id = 0;
				query.invoice_content = '不需要发票';
			} else {
				let content = '';
				if (this.vat_deny) {
					if (item.invoice_state == 2) {
						Toast('订单商品不支持增值税发票');
						return;
					}
				}
				if (item.invoice_state == 2) {
					content = '增值税发票 ' + item.invoice_company + ' ' + item.invoice_company_code + ' ' + item.invoice_reg_addr;
				} else {
					content = '普通发票 ' + item.invoice_title + ' ' + item.invoice_code + ' ' + item.invoice_content;
				}
				query.invoice_id = item.invoice_id;
				query.invoice_content = content;
			}
			this.$router.push({ name: 'MemberBuyStep1', query: query });
		},
		onEdit(invoiceId) {
			this.$router.push({ name: 'MemberInvoiceForm', query: { invoice_id: invoiceId } });
		},
		onDelete(invoiceId) {
			Indicator.open();
			MessageBox({
				title: '确认',
				message: '是否要删除此发票？',
				showCancelButton: true
			}).then(action => {
				if (action === 'confirm') {
					delInvoice(invoiceId).then(
						response => {
							this.getInvoiceList();
							Indicator.close();
						},
						error => {
							Indicator.close();
							Toast(error.message);
						}
					);
				} else {
					Indicator.close();
				}
			});
		},
		getInvoiceList() {
			getInvoiceList()
				.then(res => {
					this.invoice_list = res.result.invoice_list;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>
<style scoped lang="scss">
.invoice_list {
	background: rgba(244, 245, 247, 1);
	min-height: 100vh;
	padding-bottom: 2rem;
}
// .container {
// 	background: #fff;
// }
.content {
	background-color: #fff;
	margin: 0.95rem 1.38rem 0;
	border-radius: 0.76rem;
}
.top-wrapper {
	padding: 1.43rem 1.43rem 1.48rem;
	> div {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		> div {
			margin-bottom: 0.95rem;
			> label {
				font-size: 1.14rem;
				font-weight: 400;
				color: #161616;
			}
			> span {
				font-size: 1.14rem;
				font-weight: 400;
				color: #6f6f6f;
				margin-right: 0.5rem;
			}
		}
		.bottom-line {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				right: -5%;
				bottom: -1.48rem;
				height: 1px;
				width: 105%;
				background-color: rgba(239, 239, 239, 1);
			}
		}
	}
}
// .title-wrapper {
// 	height: 1rem;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: flex-start;
// 	align-items: center;
// 	margin-top: 0.5rem;
// 	margin-left: 0.5rem;
// }
// .title {
// 	font-size: 0.8rem;
// 	color: #333;
// 	margin-left: 0.5rem;
// }
// .desc {
// 	color: #7c7f88;
// 	font-size: 0.7rem;
// }
// .address-text {
// 	margin-top: 0.5rem;
// 	margin-bottom: 0.5rem;
// 	margin-left: 1rem;
// 	margin-right: 0.5rem;
// }
// .bottom-line {
// 	position: absolute;
// 	height: 1px;
// 	left: 0.5rem;
// 	bottom: 0;
// 	right: 0.5rem;
// 	background-color: #e8eaed;
// }
.bottom-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: stretch;
	// padding-bottom: 1.33rem;
	// padding-right: 1.43rem;
	padding: 0 1.43rem 1.33rem;
}
.bottom-left-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.bottom-right-wrapper {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: stretch;
}
.edit-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	img {
		width: 1.24rem;
		// height: 100%;
	}
}
.delete-wrapper {
	img {
		margin-left: 1.38rem;
	}
}
.subtitle {
	// font-size: 0.7rem;
	// color: #7c7f88;
	// margin-top: 0.5rem;
	// margin-bottom: 0.5rem;
	// margin-left: 1rem;
	// margin-right: 0.5rem;
}
.subtitle i {
	font-size: 1.4rem;
	margin-right: 0.4rem;
}
.is-select {
	color: rgba(230, 49, 22, 1);
}
.no-select {
	color: rgba(210, 210, 210, 1);
}
</style>
