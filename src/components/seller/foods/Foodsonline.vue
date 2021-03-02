<template>
	<div class="container">
		<div class="top-wrap">
			<div class="header-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span class="header-title">菜品管理</span>
				<div @click="$router.push({name:'SellerDesksonline'})" class="header-right">餐桌</div>
			</div>
			<!-- header -->
			<div class="order-header">
				<!-- <div class="seller-search">
					<input type="text" placeholder="请输入您要搜索的菜品" v-model="keyword" />
					<img src="@/assets/image/icon2/icon-white-search.png" alt="" @click="getGoodsList()" />
				</div> -->
				<ul>
					<li class="item" v-for="item in orderNav" v-bind:key="item.id" v-bind:class="{ active: goods_type == item.id }" v-on:click="setOrderNavActive(item.id)">
						{{ item.name }}
					</li>
				</ul>
			</div>
		</div>
		<div class="list-wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div v-if="goodsList.length > 0">
				<div class="goods-item" v-for="(item, index) in goodsList" :key="index">
					<div class="goods-info">
						<div class="p-img"><img :src="item.goods_image" /></div>
						<div class="p-info">
							<div class="name">{{ item.goods_name }}</div>
							<div>
								<div class="stock">库存:{{ item.goods_storage_sum }}</div>
								<!-- 销量 -->
							</div>
							<div class="price"><span>￥</span><span>{{ item.goods_price }}</span></div>
						</div>
						<div class="item-more" @click="popupMore(index)"><span></span><span></span></div>
					</div>
					<ul class="goods-btn" v-show="index == i">
						<li @click="goods_edit(item.goods_commonid, item.gc_id)">编辑</li>
						<li @click="goods_new(item.goods_commonid, item.gc_id)">新发布</li>
						<li @click="goods_image(item.goods_commonid)">图片</li>
						<li v-if="item.goods_state === 0" @click="goods_show(item.goods_commonid)">上架</li>
						<li v-if="item.goods_state === 1" @click="goods_unshow(item.goods_commonid)">下架</li>
					</ul>
				</div>
			</div>
			<empty-record2 isFrom='content' v-else></empty-record2>
		</div>
		
		<div class="add-button" @click="goods_add"><span>新增菜品</span></div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getGoodsList, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods';

export default {
	name: 'Goodsonline',
	data() {
		return {
			params: { page: 1, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			pageTotal: 1, // 总页数
			goodsList: [], // 商品列表
			keyword: '',
			goods_type: '',
			search_type: '',
			popupVisible: false, // 弹出更多
			i:-1,
			orderNav: [
				{
					name: '出售中',
					id: ''
				},
				{
					name: '仓库中',
					id: 'offline'
				},
				{
					name: '待审核',
					id: 'waitverify'
				},
				{
					name: '违规商品',
					id: 'lockup'
				}
			]
		};
	},
	components: {
		EmptyRecord2
	},
	created() {
		this.getGoodsList()
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		
		goods_add() {
			this.$router.push({ name: 'SellerFoodsForm2', query: { class_id: 1430 } });
		},

		goods_image(commonid) {
			this.$router.push({ name: 'SellerFoodsForm3', query: { commonid: commonid } });
		},

		// 编辑
		goods_edit(commonid, class_id) {
			this.$router.push({ name: 'SellerFoodsForm2', query: { commonid: commonid, class_id: class_id, editType:true  } });
		},

		// 新发布
		goods_new(commonid, class_id) {
			this.$router.push({ name: 'SellerFoodsForm2', query: { commonid: commonid, class_id: class_id, editType:false } });
		},

		setOrderNavActive(index) {
			this.i = -1;
			this.goods_type = index;
			this.reload();
		},
		getGoodsList(ispush) {
			Indicator.open();
			let params = this.params;
			getGoodsList(params, this.keyword, this.goods_type, this.search_type).then(res => {
				Indicator.close();
				// if(!this.keyword) {
				// 	Toast('请输入搜索内容')
				// 	return
				// }
				if (ispush) {
					this.goodsList = this.goodsList.concat(res.result.goods_list);
				} else {
					this.goodsList = res.result.goods_list;
				}
				this.pageTotal = res.result.page_total;
				if (res.result.hasmore) {
					this.isMore = true;
				} else {
					this.isMore = false;
				}
			});
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore && this.params.page <= this.pageTotal) {
				this.loading = false;
				this.getGoodsList(true);
			}
		},
		// 商品上架
		goods_show(goods_id) {
			MessageBox.confirm('您确定要上架此商品吗？').then(action => {
				Indicator.open();
				goodsShow(goods_id)
					.then(res => {
						Indicator.close();
						this.i = -1;
						this.reload();
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		goods_unshow(goods_id) {
			MessageBox.confirm('您确定要下架此商品吗？').then(action => {
				Indicator.open();
				goodsUnshow(goods_id)
					.then(res => {
						Indicator.close();
						this.i = -1;
						this.reload();
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		drop_goods(goods_id) {
			MessageBox.confirm('您确定要下架此商品吗？').then(action => {
				Indicator.open();
				dropGoods(goods_id)
					.then(res => {
						Indicator.close();
						this.reload();
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		reload() {
			// 重新加载数据
			this.params.page = 0;
			this.isMore = true;
			this.goodsList = [];
			this.loadMore();
		},
		popupMore(i) {
			if(this.i == i) {
				this.i = -1;
				return
			}
			this.i = i
			console.log(this.i)
		},
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
}
.list-wrap {
	padding-bottom: 16rem;
	margin-top: 0.95rem;
	min-height: 60vh;
	background-color: #fff;
}
.order-header {
	// position: fixed;
	// height: 2.2rem;
	width: 100%;
	// top: 2.2rem;
	// z-index: 100;
	ul {
		list-style: none;
		width: auto;
		display: flex;
		justify-content: space-around;
		align-content: center;
		align-items: center;
		height: 4.43rem;
		// background: rgba(255, 255, 255, 1);
		border-bottom: 1px solid #e8eaed;
		li {
			font-size: 1.24rem;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
			height: 4.43rem;
			line-height: 4.43rem;
			// border-bottom: 0.1rem solid transparent;
			&.active {
				font-weight: 600;
				position: relative;
				// border-bottom-color: $primaryColor;
				&::after {
					content: '';
					position: absolute;
					bottom: 0.8rem;
					left: 50%;
					height: 0.24rem;
					width: 70%;
					background-color: #fff;
					transform: translate(-50%, 0);
					border-radius: 0.14rem;
				}
			}
		}
	}
}
.goods-item {
	background: #fff;
	padding: 1.43rem 1.76rem 1.71rem 1.65rem;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 1.65rem;
	}
}
.goods-info {
	display: flex;
}
.goods-info .p-img {
	width: 8rem;
}
.goods-info .p-img img {
	width: 100%;
	height: 100%;
}
.goods-info .p-info {
	margin-left: 1.48rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.goods-info .p-info .name {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
}
.goods-info .p-info .price {
	color: #E63116;
	span {
		font-size: 1.33rem;
		font-weight: 600;
		&:first-child {
			font-weight: 400;
			font-size: 0.9rem;
		}
	}
}
.goods-info .p-info .stock {
	font-size: 1.05rem;
	font-weight: 400;
	color: #6F6F6F;
}
.goods-btn {
	background-color: #fff;
	position: absolute;
	right: 6rem;
	bottom: -7.5rem;
	z-index: 100;
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.5);
	border-radius: 0.48rem;
	&::after {
		content: '';
		position: absolute;
		border-top: 0.8rem solid transparent;
		border-left: 0.8rem solid #fff;
		border-bottom: 0.8rem solid transparent;
		top: 1.05rem;
		right: -0.8rem;

	}
	li {
		width: 6.72rem;
		text-align: center;
		height: 3.7rem;
		line-height: 3.7rem;
		border-bottom: 1px solid #EFEFEF;
		font-size: 1.14rem ;
	}
}
.seller-search {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
	input {
		box-sizing: border-box;
		width: 80%;
		border-radius: 1.64rem;
		// background: #FFFFFF url(../../../assets/image/home/icon_search.png) no-repeat 1rem center;
		// background-size: 1.4rem;
		padding: 0.52rem 2rem 0.52rem 3rem;
		margin-right: 2rem;
	}
	img {
		width: 1.8rem;
		height: 1.8rem;
	}
}
.seller-search .mint-cell {
	min-height: 0;
}
.seller-search .mint-cell:after {
	background-color: #fff !important;
}
.top-wrap {
	background-color: #626771;
}
.header-wrap {
	padding: 1rem 1.43rem;
	position: relative;
	display: flex;
	justify-content: space-between;
	img {
		width: 1.74rem;
		height: 1.74rem;
	}
	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.52rem;
		font-weight: 400;
		color: #ffffff;
	}
	.header-right {
		font-size: 1.52rem;
		font-weight: 400;
		color: #ffffff;
	}
}
.item-more{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.33rem;
	height: 1.19rem;
	background: #F3F3F3;
	border-radius: 0.74rem;
	position: absolute;
	right: 1.76rem;
	bottom: 1.71rem;
	span {
		width: 0.29rem;
		height: 0.29rem;
		background: #D6D6D6;
		border-radius: 50%;
		&:first-child {
			margin-right: 0.33rem;
		}
	}
}

.add-button {
	background-color: #fff;
	position: fixed;
	z-index: 2;
	bottom: 0;
	padding: 1rem 1.43rem;
	width: 100%;
	box-sizing: border-box;
	// margin-bottom: 1rem;
	span {
		display: block;
		text-align: center;
		height: 3.81rem;
		line-height: 3.81rem;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.9rem;
		
		font-size: 1.33rem;
		font-weight: 400;
		color: #FFFFFF;
	}
}
</style>
