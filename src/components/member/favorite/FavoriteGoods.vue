<template>
	<div class="container">
		<div v-if="favorites_list && favorites_list.length">
			<!-- <mt-cell-swipe class="goods-item" v-for="(item, index) in favorites_list" v-bind:key="item.fav_id" :right="rightBottom(item.fav_id)"> -->
				
				<div class="goods-wrap" v-for="(item, index) in favorites_list" v-bind:key="item.fav_id" @click="$router.push({ name: 'HomeGoodsdetail', query: { goods_id: item.goods_id } })">
				
					<div class="store-name"><img src="@/assets/image/icon2/icon-store-black.png" alt=""><span>{{ item.store_name }}</span></div>
					<div class="goods-info">
						<img :src="item.goods_image_url" alt="" />
						<div>
							<span>{{ item.goods_name }}</span>
							<span><span>￥</span>{{ item.goods_price }}</span>
						</div>
					</div>
				</div>
			<!-- </mt-cell-swipe> -->
		</div>
		<empty-record2 isFrom='content' v-else-if="favorites_list && !favorites_list.length"></empty-record2>
	</div>
</template>
<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getFavoriteGoodsList, delFavoriteGoods } from '../../../api/memberFavorite';
export default {
	components: {
		EmptyRecord2
	},
	name: 'MemberFavoriteGoods',
	data() {
		return {
			favorites_list: false
		};
	},
	created: function() {
		this.getFavoriteGoodsList();
	},

	methods: {
		// 左滑事件
		// rightBottom(favId) {
		// 	return [
		// 		{
		// 			content: '删除',
		// 			style: { background: 'red', color: '#fff' },
		// 			handler: () =>
		// 				MessageBox({
		// 					title: '确认删除',
		// 					message: '是否要取消关注此店铺？',
		// 					showCancelButton: true
		// 				}).then(action => {
		// 					if (action === 'confirm') {
		// 						this.getCancelCollection(favId);
		// 					}
		// 				})
		// 		}
		// 	];
		// },
		// 取消收藏店铺数据
		getCancelCollection(favId) {
			delFavoriteGoods(favId).then(res => {
				if (res) {
					this.getFavoriteGoodsList();
				}
			});
		},
		getFavoriteGoodsList() {
			Indicator.open();
			getFavoriteGoodsList(this.page, {})
				.then(res => {
					Indicator.close();
					this.favorites_list = res.result.favorites_list;
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	background-color:#F4F5F7 ;
}
// .goods-item {
	
	.goods-wrap {
		margin: 0.95rem 1.42rem;
		display: flex;
		flex-direction: column;
		padding: 1.9rem 1.42rem 1.9rem 1.38rem;
		background: #fff;
		border-radius: 0.76rem;
		.store-name {
			display: flex;
			align-items: center;
			margin-bottom: 1.42rem;
			img {
				width: 1.41rem;
				height: 100%;
				margin-right: 0.47rem;
			}
			span {
				font-size: 1.23rem;
				font-weight: 600;
				color: #161616;
			}
		}
		.goods-info {
			display: flex;
			img {
				width: 9.04rem;
				height: 9.04rem;
				border-radius: 0.76rem;
			}
			div {
				margin-left: 1.42rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				span {
					&:first-child {
						font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
					}
					&:last-child {
						font-size: 1.71rem;
						font-weight: 600;
						color: #E63116;
						span {
							font-size: 1.24rem;
						}
					}
				}
			}
		}
	}
// }

</style>

<!--Cell Swipe样式覆盖 -->
<style>
.goods-item .mint-cell-swipe-button {
	width: 4.5rem;
	font-size: 0.7rem;
	display: flex !important;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}
.goods-item .mint-cell-wrapper {
	padding: 0;
}
.goods-item .mint-cell-wrapper .mint-cell-value {
	width: 100%;
	border-bottom: 1px solid rgba(232, 234, 237, 1);
}
</style>
