<template>
	<div class="container inviter-info-wrap">
		<!-- <div class="common-header-wrap">
            <mt-header title="商品分销管理" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
                <mt-button slot="right"  @click="goAdd">新增</mt-button>
            </mt-header>
        </div> -->
		<head-title title="商品分销管理" titleRight="新增"></head-title>
		<div class="table-wrap">
			<table v-for="item in goods_list" :key="item.goods_commonid" @click="onEdit(item.goods_commonid)" class="table">
				<!-- <mt-cell :title="item.goods_name" class="pt-5 pb-5">
				<span class="inviter_info">
					<em>已分销{{ item.inviter_total_quantity }}件</em>
					<em>总金额{{ item.inviter_total_amount }}</em>
					<em>总佣金{{ item.inviter_amount }}</em>
				</span>
				<i class="iconfont">&#xe650;</i>
			</mt-cell> -->
				<tbody>
					<tr>
						<td class="title">{{ item.goods_name }}</td>
						<td class="title">编辑</td>
					</tr>

					<tr>
						<td>已分销：{{ item.inviter_total_quantity }}</td>
						<td>总金额：{{ item.inviter_total_amount }}</td>
					</tr>
					<tr>
						<td>总佣金：{{ item.inviter_amount }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { Toast, Indicator } from 'mint-ui';
import { getInviterGoodsList } from '../../../api/sellerInviter';
export default {
	name: 'GoodsList',
	data() {
		return {
			// 分销商品列表
			goods_list: []
		};
	},
	components: {
		HeadTitle
	},
	created: function() {
		this.getGoodsList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// fun_clickRight() {
		// 	this.goAdd();
		// },
		fun_right() {
			this.goAdd();
		},
		goAdd() {
			this.$router.push({ name: 'SellerInviterGoodsForm', query: { action: 'add' } });
		},
		onEdit(goods_commonid) {
			this.$router.push({ name: 'SellerInviterGoodsForm', query: { goods_commonid: goods_commonid } });
		},
		getGoodsList() {
			getInviterGoodsList()
				.then(res => {
					this.goods_list = res.result.goods_list;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.inviter-info-wrap {
	/deep/.mint-cell {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
		padding: 0 1.43rem;
		display: flex;
		justify-content: space-between;
		position: relative;
		.mint-cell-wrapper {
			padding: 0;
			.mint-cell-title {
				width: 8rem;
				font-size: 1.33rem;
			}
			.mint-cell-value {
				// flex: 1;
			}
		}
		&::after {
			content: '';
			position: absolute;
			// left: 1.43rem;
			bottom: 0;
			right: 0 !important;
			height: 1px;
			left: 1.43rem;
			width: 96% !important;
			background-color: #efefef;
		}
	}
}
.table-wrap {
	padding: 0.95rem 1.43rem;
	.table {
		width: 100%;
		// border: 1px solid #666;
		// border: 1px solid #666;
		// border-collapse: collapse;
		margin-bottom: 15px;
		tr {
			.title {
				font-weight: bold;
				font-size: 1.24rem;
				border: none;
				&:last-child {
					text-align: right;
				}
			}
			td {
				padding: 5px;
				border: 1px solid #eee;
				font-size: 1.1rem;
				width: 62%;
			}
		}

		
	}
}

// .inviter_info {
// 	width: 8rem;
// }
// .inviter_info em {
// 	display: block;
// 	width: 100%;
// }
</style>
