<template>
	<div class="container step1">
		<!-- 头部 -->
		<div class="step1_top"><head-title title="确认订单"></head-title></div>

		<!-- 主体 -->
		<div class="body" v-if="store_final_total_list">
			<div class="send_time">
				<div class="s_t_icon"><img src="@/assets/image/icon2/time.png" alt="" /></div>
				<div class="s_t_time">
					<div @click="onDate1" class="mint-cell-value endtime">
						日期&nbsp;{{ sendTime ? $moment(sendTime).format('YYYY-MM-DD') : '配送起始时间' }}
						<img class="abs_right" src="@/assets/image/icon2/icon-right.png" alt="" />
					</div>
					<!--  -->
					&nbsp;
					<div @click="onRegion" class="mint-cell-value endtime">
						时间&nbsp;{{ endTimeName }}
						<img class="abs_right" src="@/assets/image/icon2/icon-right.png" alt="" />
					</div>
				</div>
			</div>

			<!-- 收货地址 -->
			<checkout-address class="address" v-on:onclick="goAddress" :item="store_final_total_list.address_info"></checkout-address>

			<!--发票-->
			<div class="fapiao">
				<div
					class="li"
					@click="
						$router.push({
							name: 'MemberInvoiceList',
							query: {
								isFromCheckout: true,
								goBackLevel: -1,
								invoice_id: invoice_id,
								vat_deny: store_final_total_list.vat_deny,
								params: JSON.stringify($route.query)
							}
						})
					"
				>
					<span>发票</span>
					<span>{{ invoice_content }}</span>
					<img class="abs_right" src="@/assets/image/icon2/icon-right.png" alt="" />
				</div>
			</div>

			<checkout-store
				@toStep1="getPrice"
				class="section-header"
				:finalTotalList="store_final_total_list.store_final_total_list"
				:addressApi="store_final_total_list.address_api"
				:storeCartList="store_final_total_list.store_cart_list"
				:ifshowOffpay="store_final_total_list.ifshow_offpay"
				@selectVoucher="selectVoucher"
				@selectPay="selectPay"
				@changeMessage="changeMessage"
				:inputChange="inputChange"
				:oldcart_id="cart_id"
				@tocheckoutStore="fun_changeCartId"
			></checkout-store>
		</div>

		<div class="end_btn">
			<span>￥{{ TotalPrice }}</span>
			<button @click="checkout">提交订单</button>
		</div>

		<!-- <div class="bottom-wrapper" v-if="store_final_total_list">
			<mt-field v-if="!f_code_check && store_final_total_list.store_cart_list_api[0].goods_list[0].is_goodsfcode==1" label="F码"
			 placeholder="请填写F码" type="text" v-model="f_code">
				<mt-button size="small" type="danger" @click="checkfcode">使用</mt-button>
			</mt-field>
			<div v-else class="amount-wrapper">
				<label class="amount ml-5" v-if="store_final_total_list">
					<mt-switch v-model="pd_pay" v-if="store_final_total_list.available_predeposit>0">预存款</mt-switch>
              <mt-switch v-model="rcb_pay" v-if="store_final_total_list.available_rc_balance>0">充值卡</mt-switch>
				</label>
				<mt-button size="small" type="danger" @click="checkout">提交订单</mt-button>
			</div>
		</div> -->

		<mt-datetime-picker
			ref="datePicker1"
			type="date"
			:startDate="new Date()"
			yearFormat="{value}年"
			monthFormat="{value}月"
			dateFormat="{value}日"
			:value="new Date()"
			@confirm="dateConfirm1"
		></mt-datetime-picker>
		<!-- <mt-datetime-picker
        ref="datePicker4"
        type="datetime"
        :startDate="new Date()"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :value="(new Date())"
        @confirm="dateConfirm4"
      >
    </mt-datetime-picker> -->
		<region-picker ref="picker" @onConfirm="onPickerConfirm"></region-picker>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { mapState, mapMutations } from 'vuex';
import { Toast, MessageBox } from 'mint-ui';
import { buyStep1, buyStep2, checkFCode } from '../../../api/memberBuy';
import { cartType } from '../../../api/homecart';
import CheckoutAddress from './child/CheckoutAddress';
import CheckoutItem from './child/CheckoutItem';
import CheckoutStore from './child/CheckoutStore';
import RegionPicker from './RegionPicker.vue';

import HeadTitle from '../../HeadTitle';

export default {
	name: 'Step1',
	components: {
		CheckoutAddress,
		CheckoutItem,
		CheckoutStore,
		RegionPicker,
		HeadTitle
	},
	data() {
		return {
			TotalPrice: null, // 总价
			pay_code: 'online',
			f_code: '',
			invoice_id: this.$route.query.invoice_id ? this.$route.query.invoice_id : 0,
			invoice_content: this.$route.query.invoice_content ? this.$route.query.invoice_content : '',
			f_code_check: false,
			cart_id: this.$route.query.cart_id ? this.$route.query.cart_id : '',
			m_per: this.$route.query.m_per ? this.$route.query.m_per : 1,
			store_final_total_list: null,
			pd_pay: false,
			rcb_pay: false,
			password: '',
			message: [],
			sendTime: '',
			endTimeName: '',

			inputChange: false // 是否可更改 数量
		};
	},

	computed: {
		...mapState({
			tid: state => state.member.tid,
			info: state => state.member.info,
			mclass: state => state.member.mclass
		})
	},

	// beforeRouteEnter (to, from, next) {
	// 	next(vm => {
	// 		if( from.name == 'HomeGoodsdetail' ){
	// 			vm.inputChange = vm.$route.query.cart_id;
	// 		}
	// 	})
	// },

	created: function() {
		this.sendTime = new Date(new Date().toLocaleDateString()).getTime();
		var endTime = new Date().getHours();
		this.endTime = endTime;
		if (endTime < 9) {
			this.endTimeName = '0' + endTime + ':00-0' + (endTime + 1) + ':00';
		} else if (endTime == 9) {
			this.endTimeName = '09:00-10:00';
		} else {
			this.endTimeName = endTime + ':00-' + (endTime + 1) + ':00';
		}
		this.getBuyInfo();
	},

	mounted() {
		resetRem();
	},

	beforeDestroy() {
		resumeRem();
	},

	methods: {
		// 接收 总价
		getPrice(v) {
			// console.log(v);
			this.TotalPrice = v;
		},

		onRegion(picker, values) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			var cTime = this.sendTime + (values[0].time + 1) * 3600000;
			var nTime = new Date().getTime();
			if (nTime >= cTime) {
				Toast('请重新选择时间');
				return false;
			}
			this.endTimeName = values[0].time_name;
			this.endTime = values[0].time;
		},
		...mapMutations({
			saveHomecartCartType: 'saveHomecartCartType' //购物车商品类型
		}),
		onDate1(picker, values) {
			this.$refs.datePicker1.open();
		},
		dateConfirm1(v) {
			var sTime = new Date(v.toLocaleDateString()).getTime();
			var nTime = new Date(new Date().toLocaleDateString()).getTime();
			if (nTime == sTime) {
				//当前天数
				var nHourse = new Date().getHours();
				if (nHourse > this.endTime) {
					Toast('请重新选择时间');
					return false;
				}
			}
			this.sendTime = sTime;
		},
		checkfcode() {
			checkFCode(this.store_final_total_list.store_cart_list_api[0].goods_list[0].goods_commonid, this.f_code)
				.then(res => {
					this.f_code_check = true;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		// 获取订单信息
		getBuyInfo() {
			let extra = {};
			if (this.$route.query.bargainorder_id) {
				extra['bargainorder_id'] = this.$route.query.bargainorder_id;
			}
			buyStep1(this.cart_id, this.$route.query.buy_now ? 0 : 1, this.$route.query.pintuan_id, this.$route.query.pintuangroup_id, extra, this.m_per)
				.then(res => {
					// console.log(JSON.stringify(res))
					if (res.code === 10000) {
						this.store_final_total_list = res.result;
						if (this.invoice_content) {
							if (!this.store_final_total_list.inv_info.invoice_id) {
								this.invoice_id = 0;
								this.invoice_content = this.store_final_total_list.inv_info.content;
							}
						} else {
							this.invoice_content = this.store_final_total_list.inv_info.content;
							if (this.store_final_total_list.inv_info.invoice_id) {
								this.invoice_id = this.store_final_total_list.inv_info.invoice_id;
							}
						}
						if (res.result.ifcart == 0) {
							this.inputChange = true;
						}
					} else {
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		goBack() {
			this.$router.go(-1);
		},
		selectVoucher(voucherInfo, store_id) {
			this.store_final_total_list.store_cart_list[store_id].store_voucher_info = voucherInfo;
		},
		selectPay(payCode) {
			this.pay_code = payCode;
		},
		goAddress() {
			if (this.mclass < 3) {
				//如果是普通会员 不得更改地址
				return false;
			}
			if (this.store_final_total_list.address_info) {
				this.$router.push({
					name: 'MemberAddressList'
				});
			} else {
				this.$router.push({
					name: 'MemberAddressForm',
					query: {
						action: 'add',
						isFromCheckout: true,
						goBackLevel: -1
					}
				});
			}
		},
		changeMessage(message, store_id) {
			this.message[store_id] = message;
		},

		fun_changeCartId(v) {
			// console.log(v);
			this.cart_id = v;
		},

		// 提交订单
		checkout() {
			let ifcart = this.$route.query.buy_now ? 0 : 1;
			let pintuan_id = this.$route.query.pintuan_id;
			let pintuangroup_id = this.$route.query.pintuangroup_id;
			let cart_id = this.cart_id;
			let address_id = this.store_final_total_list.address_info ? this.store_final_total_list.address_info.address_id : 0;
			let vat_hash = this.store_final_total_list.vat_hash;
			let offpay_hash = this.store_final_total_list.address_api.offpay_hash;
			let offpay_hash_batch = this.store_final_total_list.address_api.offpay_hash_batch;
			let invoice_id = this.invoice_id;
			let voucher = null;
			let pd_pay = this.pd_pay ? 1 : 0;
			let password = this.password;
			let rcb_pay = this.rcb_pay ? 1 : 0;
			let pay_message_temp = [];
			let f_code = this.f_code;
			let pay_code = this.pay_code;
			if (!address_id) {
				MessageBox.alert('您需要先去添加收货地址', '');
				return;
			}
			if (pd_pay || rcb_pay) {
				if (!this.store_final_total_list.member_paypwd) {
					MessageBox.confirm('您需要先去设置支付密码', '').then(action => {
						this.$router.push({
							name: 'MemberSetting'
						});
					});
					return;
				} else {
					if (!password) {
						MessageBox.prompt('<b>请输入支付密码</b><br/>注：默认支付密码为：123456', '', {
							showCancelButton: true,
							inputType: 'password'
						}).then(({ value, action }) => {
							this.password = value;
							this.checkout();
						});
						return;
					}
				}
			}
			// 处理格式
			voucher = '';
			let voucher_temp = [];
			for (var t in this.store_final_total_list.store_cart_list) {
				voucher_temp.push([
					this.store_final_total_list.store_cart_list[t].store_voucher_info.vouchertemplate_id +
						'|' +
						t +
						'|' +
						this.store_final_total_list.store_cart_list[t].store_voucher_info.voucher_price
				]);
			}
			voucher = voucher_temp.join(',');
			let i;
			for (i in this.store_final_total_list.store_cart_list) {
				let message = this.message[this.store_final_total_list.store_cart_list[i].store_id];
				if (typeof message === 'undefined') {
					message = '';
				}
				pay_message_temp.push(this.store_final_total_list.store_cart_list[i].store_id + '|' + message);
			}
			let pay_message = pay_message_temp.join(',');
			let extra = {};
			if (this.$route.query.bargainorder_id) {
				extra['bargainorder_id'] = this.$route.query.bargainorder_id;
			}
			// 配送时间
			this.sendTime += this.endTime * 3600000;
			this.endTime = this.sendTime + 3600000;
			let distribution_time1 = this.$moment(this.sendTime).format('YYYY-MM-DD HH:mm:ss');
			let distribution_time2 = this.$moment(this.endTime).format('YYYY-MM-DD HH:mm:ss');
			// console.log(distribution_time1,distribution_time2);return false;
			var sc_type = 'p';
			if (this.mclass == 1) {
				sc_type = 'l';
			} else if (this.mclass == 2) {
				sc_type = 'c';
			} else if (this.mclass == 5) {
				sc_type = 'j';
			}
			buyStep2(
				sc_type,
				distribution_time1,
				distribution_time2,
				ifcart,
				cart_id,
				address_id,
				vat_hash,
				offpay_hash,
				offpay_hash_batch,
				invoice_id,
				voucher,
				pd_pay,
				password,
				rcb_pay,
				pay_message,
				pintuan_id,
				pintuangroup_id,
				f_code,
				pay_code,
				extra,
				this.m_per,
				this.tid
			)
				.then(res => {
					// console.log(res)

					// 购物车商品类型
					cartType(this.info.member_id).then(cart => {
						// console.log(cart.result);
						if (cart.result) {
							this.saveHomecartCartType([cart.result.cart_type, cart.result.cart_area_id]); //保存购物车商品类型  商品地址
						} else {
							this.saveHomecartCartType([null, null]);
						}
					});
					// 跳转到支付界面
					let pay_sn = res.result.pay_sn;
					this.$router.push({
						name: 'MemberBuyPay',
						query: {
							pay_sn: pay_sn,
							pay_type: 'pay_new'
						}
					});
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.step1 {
	height: 100vh;

	&/deep/.picker {
		.mint-datetime-cancel {
			width: auto;
			margin-left: 0.5rem;
			color: #999;
			font-size: 1.8rem;
		}
		.mint-datetime-confirm {
			width: auto;
			margin-right: 0.5rem;
			font-size: 1.8rem;
			color: red;
		}
	}
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	&/deep/.picker-item {
		white-space: inherit;
		font-size: 1.8rem;

		.picker-slot:nth-child(5) {
			display: none;
		}
	}
}

.container /deep/ .picker-slot:nth-child(5) {
	display: none;
}

.header {
	height: 2.2rem;
	color: #48505d;
	font-size: 0.9rem;
	background-color: #fff;
	padding: 0.1rem 0;
	border-bottom: 1px solid #e8eaed;
}
.step1_top {
	height: 3.74rem;
	flex-shrink: 0;
}

.body {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background: #f3f4f5;
	padding: 0 1.43rem;
	display: flex;
	flex-grow: 1;

	.sendtime {
		position: relative;

		i {
			position: absolute;
			left: 0.47rem;
			top: 0.8rem;
			z-index: 1;
		}

		/deep/.mint-cell-text {
			padding-left: 1.3rem;
		}

		.endtime {
			width: 40%;
			text-align: center;
			display: block;
			color: #161616;
		}
	}

	.send_time {
		padding: 1.2rem 1rem;
		background: #ffffff;
		box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin: 1.2rem 0;

		.s_t_icon {
			width: 2.555rem;
			img {
				width: 100%;
			}
		}

		.s_t_time {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 88%;
			padding-right: 1rem;
			font-size: 1.14rem;
			box-sizing: border-box;

			.abs_right {
				transform: rotate(90deg);
				width: 1.14rem;
				margin-left: 0.2rem;
			}
		}
	}

	.address {
		// margin-bottom: 1.2rem;
	}

	.fapiao {
		padding: 1.2rem 1rem;
		background: #ffffff;
		box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
		border-radius: 8px;
		position: relative;

		margin: 1.2rem 0;

		.li {
			display: flex;
			justify-content: space-between;
			margin: 0.5rem 0;
			align-items: center;
			span {
				color: #161616;
				font-size: 1.2rem;
				padding-right: 1.8rem;

				&:last-child {
					padding: 0;
					font-size: 1.5rem;
				}
			}
			img {
				position: absolute;
				right: 1rem;
				width: 1.4rem;
			}
		}
	}
	// margin-bottom: 3rem;
}

// .end_btn {
// 	width: 100vw;
// 	left: 0;
// 	padding: 1.5rem 1.43rem;
// 	box-sizing: border-box;
// 	bottom: 0;
// 	position: fixed;
// 	z-index: 1;
// 	display: flex;
// 	justify-content: space-between;
// 	background: #fff;
// 	span {
// 		color: #e53216;
// 		font-size: 1.98rem;
// 	}
// 	button {
// 		background: linear-gradient(90deg, #fc6952 0%, #fb3737 100%);
// 		border-radius: 17.5px;
// 		padding: 0.5rem 1rem;
// 		color: #fff;
// 	}
// }

.goods {
	height: 4.5rem;
}

.item {
	height: 2.5rem;
}

.section-header {
	// margin-top: 0.4rem;
}

.section-footer {
	margin-bottom: 0.4rem;
}

.comment {
	height: 7.25rem;
}

.desc {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}

.desc-item {
	height: 1.5rem;
}

.bottom-wrapper {
	z-index: 1;
	background: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	min-height: 2.5rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
}

.amount-wrapper {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
}

.amount {
	flex: 1;
	font-size: 0.8rem;
	color: $primaryColor;
	text-align: right;
	padding-right: 0.75rem;
}

.submit {
	width: 7.5rem;
	height: 2.5rem;
	border-radius: 0;
}

.end_btn {
	width: 100vw;
	left: 0;
	padding: 0.67rem 1.43rem;
	box-sizing: border-box;
	bottom: 0;
	position: fixed;
	align-items: center;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	background: #fff;
	height: 4.67rem;
	span {
		color: #e53216;
		font-size: 1.98rem;
	}
	button {
		font-size: 1.14rem;
		// background: linear-gradient(90deg, #fc6952 0%, #fb3737 100%);
		background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
		border-radius: 1.67rem;
		padding: 0.9rem 2.14rem;
		color: #fff;
	}
}
</style>
