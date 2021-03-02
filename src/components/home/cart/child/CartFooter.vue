<!-- CartFooter.vue -->
<template>
	<div class="ui-cart-footer" v-bind:class="{ 'has-bottom': issShowTabbar }">
		<div class="list-checkbox">
			<input type="checkbox" class="checkbox" id="checkbox-all" v-model="isSelected" @change="selectedAll(isSelected)" />
			<label for="checkbox-all"><span class="iconfont">&#xe69b;</span></label>
			<i v-if="isCheckedAll">全选</i>
			<i v-if="!isCheckedAll" class="total-price" style="margin-left: 0.9rem;">
				合计：
				<span>
					<span>￥</span>
					<span>{{ totalPrice }}</span>
				</span>
			</i>
		</div>
		<span class="cart-footer-btn remove" v-if="isCheckedAll" @click="deleteSelected()">删除</span>
		<span class="cart-footer-btn checkout" v-if="!isCheckedAll" @click="checkout">去结算({{ totalAmount }})</span>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			isSelected: true,
			deleteGoods: []
		};
	},
	computed: mapState({}),

	props: {
		totalPrice: {},
		totalAmount: {},
		cartId: {},
		isCheckedAll: {
			type: Boolean,
			default: false
		},
		issShowTabbar: {
			type: Number,
			default: 0
		},
		isStatus: {
			type: Boolean,
			default: true
		}
	},

	watch: {
		isCheckedAll: function(value) {
			this.isSelected = !value;
		},

		isStatus: function(value) {
			this.isSelected = value;
		}
	},

	methods: {
		/*
		 *  selectedAll: 底部全选按钮的状态
		 *  @param: value 底部全选按钮的值
		 */
		selectedAll(value) {
			this.$parent.$emit('cart-bottom-status', { isCheckAll: value });
		},

		/*
		 *  deleteSelected: 删除购物车商品
		 */
		deleteSelected() {
			this.$parent.$emit('update-cart-list', { isdelete: true });
		},
		/*
		 *  checkout: 结算
		 */
		checkout() {
			if (!this.isCheckedAll && this.totalAmount != 0) {
				this.$router.push({ name: 'MemberBuyStep1', query: { cart_id: this.cartId } });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-cart-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 4.67rem;
	background: rgba(255, 255, 255, 1);
	bottom: 0;
	position: fixed;
	width: -webkit-fill-available;
	padding: 0 1.48rem 0 1.43rem;
	.list-checkbox {
		flex-shrink: 0;
		position: relative;
		display: flex;
		align-items: center;
		label {
			position: absolute;
			// top: 0.6rem;
			// left: 0;
			width: 1.43rem;
			height: 1.43rem;
			display: inline-block;
			border-radius: 50%;
			border: 1px solid #6f6f6f;
			box-sizing: border-box;
			.iconfont {
				display: none;
				line-height: 1.43rem;
				text-align: center;
			}
			span {
				font-size: 1rem;
			}
		}
		input {
			position: relative;
			margin: 0;
			z-index: -999;
			background-color: #fff;
			opacity: 0;
			margin-right: 1rem;
			&:checked + label {
				border-color: $primaryColor;
				background-color: $primaryColor;
				.iconfont {
					display: block;
					color: #fff;
				}
			}
			&:focus {
				outline-offset: 0;
			}
		}
		i {
			display: flex;
			align-items: center;
			padding-left: 0.86rem;
			font-style: normal;
			font-size: 1.24rem;
			font-weight: 400;
			color: #6f6f6f;
			&.total-price span {
				color: #e53216;
				font-weight: 400;
				&:first-child {
					font-size: 1.33rem;
				}
				&:last-child {
					font-size: 1.71rem;
					font-weight: bold;
				}
			}
		}
	}
	span.cart-footer-btn {
		// width: 7.5rem;
		// height: 2.3rem;
		padding: 0.86rem 2.14rem;
		display: inline-block;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		border-radius: 1.67rem;
		font-size: 1.14rem;
		font-weight: 400;
		color: #ffffff;
		cursor: pointer;
		font-weight: normal;
	}
	.checkout {
		// background: linear-gradient(90deg, #ff9494 0%, #fb3737 100%) linear-gradient(90deg, #fc6952 0%, #e53216 100%);
	}
	.disable {
		background: #c3c3c3;
	}
	.remove {
		background: #f23030;
	}
}
.has-bottom {
	// bottom: 2.5rem;
}
</style>
