<template>
	<div class="seller-order-send hsy_main">
		<!-- <div class="common-header-wrap">
            <mt-header title="订单发货" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="订单发货"></head-title>
		<!-- header -->

		<div class="daddress_info" @click="goAddress">
			<div class="top-wrapper">
				<div v-if="daddress_info" class="selected-wrapper">
					<div class="title-wrapper">
						<i class="icon iconfont">&#xe6d3;</i>
						<label class="title">{{ daddress_info.seller_name }}</label>
						<label class="title">{{ daddress_info.daddress_telphone }}</label>
						<label class="default" v-if="daddress_info.daddress_isdefault">默认</label>
					</div>
					<label class="desc address-text" style="-webkit-box-orient:vertical">{{ daddress_info.area_info }}{{ daddress_info.daddress_detail }}</label>
				</div>
				<div v-else class="unselected-wrapper"><label class="desc">您还没有发货地址，点击这里添加。</label></div>
				<i class="indicator iconfont">&#xe650;</i>
			</div>
			<div class="line-wrapper"></div>
		</div>

		<div class="cart-subtotal">
			<div @click="popupExpress = true">
				<mt-cell class="menu-item" title="物流公司">
					{{ express_name }}
					<i class="indicator iconfont">&#xe650;</i>
				</mt-cell>
			</div>
			<div class="message" v-if="shipping_express_id != '0'"><mt-field label="物流单号" type="text" v-model="shipping_code"></mt-field></div>
		</div>
		<mt-field
			label="车牌号"
			placeholder="例如：鲁A88888"
			disableClear
			v-model="license_plate"
		></mt-field>
		<mt-button class="hsy_btn"  @click="submit">提交</mt-button>
		<mt-popup v-model="popupExpress" position="right" class="common-popup-wrapper">
			<!-- <div class="common-header-wrap">
				<mt-header title="物流公司" class="common-header"><mt-button slot="left" icon="back" @click="popupExpress = false"></mt-button></mt-header>
			</div> -->
			<div class="header-wrap">
				<img @click="popupExpress = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
				<span class="header-title">物流公司</span>
				<span></span>
			</div>
			<div class="common-popup-content"><mt-radio v-model="shipping_express_id" :options="express_options"></mt-radio></div>
		</mt-popup>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { getExpressList, getExpressInfo } from '../../../api/sellerExpress';
import { sendOrder } from '../../../api/sellerOrder';
import { Toast, MessageBox, Indicator } from 'mint-ui';

export default {
	components: { HeadTitle },
	name: 'SellerOrderSend',
	data() {
		return {
			order_id: this.$route.query.order_id,
			daddress_info: false,
			shipping_code: '',
			shipping_express_id: '0',
			express_name: '无需物流',
			popupExpress: false,
			express_list: {},
			express_options: [
				{
					label: '无需物流',
					value: '0'
				}
			]
		};
	},
	mounted() {
		resetRem();
	},
	computed: {},
	created: function() {
		let _this = this;
		getExpressInfo(this.order_id)
			.then(res => {
				this.daddress_info = res.result.daddress_info;
			})
			.catch(function(error) {
				Toast(error.message);
				if (error.code == '12002') {
					_this.goAddress();
				}
			});
		getExpressList(this.order_id)
			.then(res => {
				// this.express_list = res.result.express_array
				let express_options = res.result.express_array;

				for (var i in express_options) {
					this.express_options.push({
						label: express_options[i].express_name,
						value: express_options[i].express_id + ''
					});
					this.express_list[express_options[i].express_id + ''] = express_options[i];
					if (this.shipping_express_id == '0') {
						this.shipping_express_id = express_options[i].express_id + '';
					}
				}
			})
			.catch(function(error) {
				Toast(error.message);
			});
	},
	watch: {
		shipping_express_id: function(shipping_express_id) {
			if (shipping_express_id != '0') {
				this.express_name = this.express_list[shipping_express_id].express_name;
			} else {
				this.express_name = '无需物流';
			}
			this.popupExpress = false;
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		goAddress() {
			if (this.daddress_info) {
				this.$router.push({ name: 'SellerAddressList' });
			} else {
				this.$router.push({
					name: 'SellerAddressForm',
					query: {
						action: 'add',
						isFromCheckout: true,
						goBackLevel: -1
					}
				});
			}
		},
		submit() {
			if (this.shipping_express_id == '0') {
				this.shipping_express_id = '';
			}
			if (!this.daddress_info) {
				Toast('请先添加发货地址');
				return;
			}
			if (this.shipping_express_id != '' && this.shipping_code == '') {
				Toast('请先填写物流单号');
				return;
			}
			sendOrder(this.license_plate,this.order_id, this.shipping_express_id, this.shipping_code, this.daddress_info.daddress_id)
				.then(res => {
					Toast(res.message);
					this.$router.go(-1);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.header-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.24rem 1.43rem;
	font-size: 1.39rem;
	font-weight: 400;
	color: #161616;
	margin-bottom: 1.43rem;
	img {
		width: 1.71rem;
		height: 1.71rem;
	}
}
.daddress_info {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;
	// height: 5rem;
	margin-left: 1.43rem;
	.top-wrapper {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: #fff;
		padding: 0.95rem 0 0.95rem 0;
	}
	.selected-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.title-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.icon {
		width: 1.6rem;
		height: 1.6rem;
		// margin-left: 1rem;
	}
	.title {
		font-size: 1.18rem;
		color: #333;
		margin-left: 1rem;
	}
	.default {
		// width: 1.4rem;
		margin-left: 1rem;
		margin-right: 1rem;
		border: 1px solid #e93b3d;
		color: $primaryColor;
		font-size: 1rem;
		text-align: center;
		border-radius: 0.23rem;
		padding: 0.1rem 0.2rem;
	}
	.desc {
		color: #7c7f88;
		font-size: 1.3rem;
	}
	.address-text {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		// margin-left: 1.8rem;
	}
	.unselected-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.indicator {
		// width: 1.4rem;
		// height: 1.2rem;
		margin-left: 0.5rem;
		margin-right: 1.43rem;
		font-size: 1.35rem;
	}
	.line-wrapper {
		background: #eee;
		// position: relative;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 0.1rem;
	}
}
.cart-subtotal {
	.menu-item {
		
	}
	/deep/.mint-cell {
		padding: 0 1.43rem;
		.mint-cell-wrapper {
			padding: 0;
		}
		&::after {
			width: 96%;
			right: 0;
			left: 4%;
		}
	}
}
.common-popup-content {
	top: 4rem;
}
.seller-order-send{
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
