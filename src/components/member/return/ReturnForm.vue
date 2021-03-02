<template>
	<div class="member-information hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header :title="'新增' + title" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title :title="'新增' + title"></head-title>
		<div class="form">
			<div @click="popupReason = true">
				<mt-cell class="menu-item" :title="title + '原因'" is-link>{{ reason_name }}</mt-cell>
			</div>
			<mt-field class="menu-item" label="退款金额" v-model="refund_amount" :placeholder="'最多可退金额' + goods.goods_pay_price + '元'" type="number" />
			<mt-field v-if="type == 2" class="menu-item" label="退货数量" v-model="goods_num" :placeholder="'最多可退数量' + goods.goods_num + '件'" type="number" />
			<mt-field class="menu-item" :label="title + '说明'" v-model="buyer_message" type="textarea" />
			<mt-cell class="menu-item" :title="title + '凭证'"></mt-cell>
			<div class="image-wrapper">
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadRefundImage(0, $event)">
					<img class="img-content" v-if="image[0]" :src="image[0]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn2" @change="uploadRefundImage(1, $event)">
					<img class="img-content" v-if="image[1]" :src="image[1]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn3" @change="uploadRefundImage(2, $event)">
					<img class="img-content" v-if="image[2]" :src="image[2]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
			</div>
			<mt-button class="hsy_f hsy_btn" @click="submitInformation">保存</mt-button>
		</div>

		<mt-popup v-model="popupReason" position="right" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<mt-header :title="title + '原因'" class="common-header"><mt-button slot="left" icon="back" @click="popupReason = false"></mt-button></mt-header>
			</div>
			<div class="common-popup-content endmint-cell-title"><mt-radio v-model="reason_id" :options="reason_options"></mt-radio></div>
		</mt-popup>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast } from 'mint-ui';

import '@/assets/style/hsy-mint.scss';
import { uploadRefundImage, getCommonData, addRefund } from '../../../api/memberRefund';
export default {
	components: {
		HeadTitle
	},
	name: 'MemberReturnForm',
	data() {
		return {
			type: this.$route.query.type,
			title: this.$route.query.type == 2 ? '退货' : '退款',
			order_id: this.$route.query.order_id,
			order_goods_id: this.$route.query.order_goods_id,
			image: ['', '', ''],
			buyer_message: '',
			file_value: ['', '', ''],
			reason_id: '',
			reason_name: '',
			popupReason: false,
			reason_list: {},
			reason_options: [],
			refund_amount: '',
			goods_num: '',
			goods: {}
		};
	},
	mounted() {
		resetRem();
	},
	computed: {},
	created: function() {
		getCommonData(this.order_id, this.order_goods_id)
			.then(res => {
				this.goods = res.result.goods;
				this.refund_amount = this.goods.goods_pay_price;
				this.goods_num = this.goods.goods_num;
				let reason_options = res.result.reason_list;

				for (var i in reason_options) {
					this.reason_options.push({
						label: reason_options[i].reason_info,
						value: reason_options[i].reason_id + ''
					});
					this.reason_list[reason_options[i].reason_id + ''] = reason_options[i].reason_info;
					if (this.reason_id === '') {
						this.reason_id = reason_options[i].reason_id + '';
					}
				}
			})
			.catch(function(error) {
				Toast(error.message());
			});
	},
	watch: {
		reason_id: function(reason_id) {
			this.reason_name = this.reason_list[reason_id];

			this.popupReason = false;
		}
	},
	methods: {
		submitInformation() {
			if (!this.refund_amount) {
				Toast('请填写退款金额');
				return;
			}
			if (this.refund_amount <= 0) {
				this.refund_amount = this.goods.goods_pay_price;
				Toast({
					message: '退款不得为负数',
					duration: 600
				});
				return;
			}
			if (this.refund_amount > this.goods.goods_pay_price) {
				this.refund_amount = this.goods.goods_pay_price;
				Toast({
					message: '退款金额不得大于订单金额',
					duration: 600
				});
				return;
			}
			if (this.goods_num % 1 != 0 || this.goods_num <= 0) {
				this.goods_num = this.goods.goods_num;
				Toast({
					message: '退货数量必须为正整数数',
					duration: 600
				});
				return;
			}
			if (this.goods_num > this.goods.goods_num) {
				this.goods_num = this.goods.goods_num;
				Toast('');
				Toast({
					message: '退货数量不得大于订单商品数量',
					duration: 600
				});
				return;
			}
			addRefund(this.type, this.order_id, this.order_goods_id, this.refund_amount, this.goods_num, this.reason_id, this.buyer_message, this.file_value)
				.then(res => {
					Toast(res.message);
					if (this.type == 2) {
						this.$router.push({ name: 'MemberReturnList' });
					} else {
						this.$router.push({ name: 'MemberRefundList' });
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		uploadRefundImage(index, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();

			formdata.append('refund_pic', event.target.files[0]);

			uploadRefundImage(formdata)
				.then(res => {
					this.image.splice(index, 1, res.result.pic + '?' + Math.floor(Math.random() * 100));
					this.file_value.splice(index, 1, res.result.file_name);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.member-information {
	background: #fff;
	.image-wrapper {
		display: flex;
	}
	.user-avatar {
		// flex: 1;
		// border: 1px solid #eee;
		position: relative;
		width: 7.61rem;
		height: 7.61rem;
		line-height: 7.61rem;
		border-radius: 0.47rem;
		border: 1px dashed #cacaca;
		// margin: 0 auto;
		text-align: center;
		img {
			width: 100%;
			height: 100%;
			// vertical-align: baseline;
		}
		.img-content {
			vertical-align: baseline;
		}
		.img-add {
			width: 2.66rem;
			height: 2.66rem;
		}
		input {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}
	.user-avatar::before {
		position: absolute;
		font-size: 3.5rem;
		line-height: 5rem;
		left: 50%;
		top: 50%;
    transform: translate(-50%,-50%);
		color: rgba(0, 0, 0, 0.5);
	}
	.menu-item {
		border-top: 1px solid #eee;
	}
	/deep/.mint-cell {
		&::after {
			right: 0;
			left: 1.42rem;
			background-color: #efefef;
		}
	}
	/deep/ .mint-cell-wrapper {
		padding: 1.19rem 1.42rem;
		.mint-field-core {
			text-align: right;
		}
	}
	& /deep/ .mint-cell-text {
		padding-left: 0.66rem;
	}
	.mast_value {
		& /deep/ .mint-cell-text {
			position: relative;
		}
		& /deep/ .mint-cell-text::after {
			content: '*';
			color: red;
			font-size: 1.2rem;
			position: absolute;
			left: 0.1rem;
			top: 0.1rem;
		}
	}
	.common-header-wrap {
		height: 4rem;
		.common-header {
			height: 4rem;
			line-height: 4rem;
			/deep/.mint-header-title {
				font-size: 1.52rem;
			}
		}
	}
	.common-popup-content {
		top: 4rem;
	}
	.endmint-cell-title{
		&/deep/.mint-cell-title{
			width:80% !important;
		}
	}
	.hsy_btn{
		
		background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
		box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
		border-radius: 40px;
		color: #fff;
		width: 92%;
		font-size: 1.33rem;
		height: 3.4rem;
		position: fixed;
		bottom: 4%;
		left: 4%;
		z-index: 1;
	}
}
</style>
