<template>
	<div class="container invoice-form hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header :title="getTitle" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title :title="getTitle"></head-title>
		<mt-cell title="发票类型">
			<!-- <mt-radio align="left" class="page-part" v-model="invoice.invoice_state" :options="invoice_state_options" /> -->
			<mt-navbar class="tab-nav" v-model="invoice.invoice_state">
				<!-- <mt-tab-item id="1">关注店铺</mt-tab-item> -->
				<mt-tab-item id="1">普通发票</mt-tab-item>
				<mt-tab-item id="2">增值税专用发票</mt-tab-item>
			</mt-navbar>
		</mt-cell>

		<mt-tab-container v-model="invoice.invoice_state">
			<mt-tab-container-item id="1">
				<mt-field label="发票抬头" placeholder="请输入发票抬头" v-model="invoice.invoice_title"></mt-field>
				<mt-field label="纳税人识别号" placeholder="请输入纳税人识别号" v-model="invoice.invoice_code"></mt-field>
				<mt-field label="发票内容" placeholder="请输入发票内容" v-model="invoice.invoice_content"></mt-field>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<mt-field label="单位名称" placeholder="请输入单位名称" v-model="invoice.invoice_company"></mt-field>
				<mt-field label="纳税人识别号" placeholder="请输入纳税人识别号" v-model="invoice.invoice_company_code"></mt-field>
				<mt-field label="注册地址" placeholder="请输入注册地址" v-model="invoice.invoice_reg_addr"></mt-field>
				<mt-field label="注册电话" placeholder="请输入注册电话" v-model="invoice.invoice_reg_phone"></mt-field>
				<mt-field label="开户银行" placeholder="请输入开户银行" v-model="invoice.invoice_reg_bname"></mt-field>
				<mt-field label="银行帐户" placeholder="请输入银行账户" v-model="invoice.invoice_reg_baccount"></mt-field>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-button class="hsy_btn hsy_f" v-on:click="submit">{{ getSumitTitle }}</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator } from 'mint-ui';
import { getInvoiceInfo, addInvoice, editInvoice } from '../../../api/memberInvoice';
export default {
	name: 'InvoiceForm',
	data() {
		return {
			invoice_state_options: [
				{
					label: '普通发票',
					value: '1'
				},
				{
					label: '增值税专用发票',
					value: '2'
				}
			],
			invoice_id: 0,
			invoice: {
				invoice_state: '1',
				invoice_title: '',
				invoice_code: '',
				invoice_content: '',
				invoice_company: '',
				invoice_company_code: '',
				invoice_reg_addr: '',
				invoice_reg_phone: '',
				invoice_reg_bname: '',
				invoice_reg_baccount: ''
			}
		};
	},
	components: {
		HeadTitle
	},
	created: function() {
		if (!this.isAddMode) {
			this.invoice_id = this.$route.query.invoice_id;
			getInvoiceInfo(this.invoice_id)
				.then(res => {
					this.invoice.invoice_state = res.result.invoice_state;
					this.invoice.invoice_title = res.result.invoice_title;
					this.invoice.invoice_code = res.result.invoice_code;
					this.invoice.invoice_content = res.result.invoice_content;
					this.invoice.invoice_company = res.result.invoice_company;
					this.invoice.invoice_company_code = res.result.invoice_company_code;
					this.invoice.invoice_reg_addr = res.result.invoice_reg_addr;
					this.invoice.invoice_reg_phone = res.result.invoice_reg_phone;
					this.invoice.invoice_reg_bname = res.result.invoice_reg_bname;
					this.invoice.invoice_reg_baccount = res.result.invoice_reg_baccount;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	computed: {
		isAddMode() {
			let mode = this.$route.query.action;
			// add: 添加地址，edit: 编辑地址
			if (mode === 'add') {
				return true;
			} else {
				return false;
			}
		},
		getTitle() {
			if (this.isAddMode) {
				return '新增发票';
			} else {
				return '修改发票';
			}
		},
		getSumitTitle() {
			let isFromCheckout = this.$route.query.isFromCheckout;
			if (isFromCheckout) {
				return '保存并使用';
			} else {
				return '保存';
			}
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		submit() {
			// 普通发票
			if (this.invoice.invoice_state === '1') {
				if (this.invoice.invoice_title === '') {
					Toast('请填写发票抬头');
					return;
				}
				if (this.invoice.invoice_code === '') {
					Toast('请填写纳税人识别号');
					return;
				}
				if (this.invoice.invoice_content === '') {
					Toast('请填写发票内容');
					return;
				}
			}
			// 专用发票
			if (this.invoice.invoice_state === '2') {
				if (this.invoice.invoice_company === '') {
					Toast('请填写单位名称');
					return;
				}
				if (this.invoice.invoice_company_code === '') {
					Toast('请填写纳税人识别号');
					return;
				}
				if (this.invoice.invoice_reg_addr === '') {
					Toast('请填写注册地址');
					return;
				}
				if (this.invoice.invoice_reg_phone === '') {
					Toast('请填写注册电话');
					return;
				}
				if (this.invoice.invoice_reg_bname === '') {
					Toast('请填写开户银行');
					return;
				}
				if (this.invoice.invoice_reg_baccount === '') {
					Toast('请填写银行帐户');
					return;
				}
			}

			if (this.isAddMode) {
				Indicator.open();
				addInvoice(this.invoice).then(
					response => {
						Indicator.close();
						this.updateSelectedInvoice();
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			} else {
				Indicator.open();
				editInvoice(this.invoice, this.invoice_id).then(
					response => {
						Indicator.close();
						this.updateSelectedInvoice();
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			}
		},
		updateSelectedInvoice() {
			let isFromCheckout = this.$route.query.isFromCheckout;
			let goBackLevel = this.$route.query.goBackLevel ? this.$route.query.goBackLevel : -1;
			if (isFromCheckout) {
				this.$router.go(goBackLevel);
			} else {
				this.goBack();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.ds-button-large {
	margin-top: 1rem;
}
.mint-radiolist {
	display: flex;
}
.mint-radiolist >>> .mint-radio-label {
	font-size: 13px;
}
.invoice-form {
	/deep/.mint-cell-wrapper {
		.mint-cell-title {
			flex: 0 1 auto;
			flex-shrink: 0;
			width: 27%!important;
			.mint-cell-text {
				font-size: 1.33rem;
				font-weight: 400;
				color: #161616;
			}
		}
		.mint-cell-value {
			font-size: 1.33rem;
			flex-grow: 1;
			.mint-navbar {
				.mint-tab-item {
					padding: 0.38rem 1.43rem;
					margin-left: 1.43rem;
					background: #f4f5f7;
					border-radius: 1.07rem;
					flex: 0 1 auto;
					font-weight: 400;
					color: #6f6f6f;
					.mint-tab-item-label {
						font-size: 1.05rem;
					}
				}
				.is-selected {
					background: #ffe5e5;
					border: 0.05rem solid #e5371b;
					color: #e63116;
				}
			}
			.mint-field-core {
				&::-webkit-input-placeholder {
					color: #c6c6c6;
				}
			}
		}
	}
}
</style>
