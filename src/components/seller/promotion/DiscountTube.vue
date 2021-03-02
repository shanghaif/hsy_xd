<template>
	<div class="container">
		<div class="top-wrap">
			<div class="header-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span class="header-title">多买惠管理</span>
				<div class="header-right"></div>
			</div>
			<!-- header -->
			<div class="order-header">
				<ul>
					<li class="item" 
						v-for="item in orderNav" 
						v-bind:key="item.id"
						v-bind:class="{ active: goods_type == item.id }"
						v-on:click="setOrderNavActive(item.id)">
						{{ item.name }}
					</li>
				</ul>
			</div>
		</div>
		<!-- 参与商品 列表 -->
		<div class="list-wrap" 
			v-show="goods_type!='offline'">
			<div v-if="DiscountTubeList.length > 0">
				<div class="goods-item" v-for="(item, index) in DiscountTubeList" :key="index">
					<div class="goods-info">
						<div class="p-img"><img :src="item.image_url" /></div>
						<div class="p-info">
							<div class="name">{{ item.goods_name }}</div>
							<div>
								<div class="stock">原价:{{ item.goods_price }}</div>
								<!-- 销量 -->
							</div>
							<div>
								<div class="stock">折扣:{{ item.xianshi_discount }}</div>
								<!-- 销量 -->
							</div>
							<div class="price"><span>￥</span><span>{{ item.xianshigoods_price }}</span></div>
						</div>
						<div v-if="xianshi_state == 1" class="item-more" @click="popupMore(item)"><span></span><span></span></div>
					</div>
					
					<!-- 修改 -->
					<ul class="goods-btn" v-show="Discount.xianshigoods_id == item.xianshigoods_id && goods_type!='offline'">
						<li><input type="text" placeholder="折扣价格" v-model="DiscountPrice"></li>
						<li class="edit" @click="fun_editGoods(item.xianshigoods_id)">修改</li>
						<li class="del" @click="deleteGoods(item.xianshigoods_id)">删除</li>
					</ul>

				</div>
			</div>

			<empty-record2 isFrom='content' v-else></empty-record2>
		</div>

		<!-- 未参与 商品 列表 -->
		<div class="list-wrap"
			v-show="goods_type=='offline'"
			>		
			<div class="seller-search">
				<input type="text" placeholder="请输入您要搜索的商品" v-model="keyword" />
				<img src="@/assets/image/icon2/icon-white-search.png" alt="" @click="getGoodsList()" />
			</div>
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
						<div v-if="xianshi_state == 1"  class="item-more" @click="notPopupMore(item)"><span></span><span></span></div>
					</div>

					<!-- 新增 -->
					<ul class="goods-btn" v-show="item.goods_id == nowGid.goods_id &&goods_type=='offline'">
						<li><input type="text" placeholder="折扣价格" v-model="newPrice"></li>
						<li class="add" @click="fun_addNewGood">新增</li>
					</ul>

				</div>
			</div>

			<empty-record2 isFrom='content' v-else></empty-record2>
		</div>
		
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getGoodsList, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods';

import { editXianshiGoods, deteleXianshiGoods, duomaihGoodsSelect, duomaihGoodsList, addXianshiGoods } from '../../../api/sellerPromotion';

export default {
	name: 'Goodsonline',
	data() {
		return {
			params: { page: 0, per_page: 10 },
			xianshi_id: this.$route.query.mid,
			DiscountTubeList:[],  // 参与商品列表
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
					name: '参与商品',
					id: ''
				},
				{
					name: '未参与商品',
					id: 'offline'
				},
			],

			nowGid: {
				goods_id:null, // 未参与商品
			},  
			newPrice: null,  // 新增

			Discount:{
				xianshigoods_id:null, // 未参与商品
			},  // 修改
			DiscountPrice: null,  // 修改

			xianshi_type:null,

			sendTime:null,

			xianshi_state:null,
		};
	},
	components: {
		EmptyRecord2
	},
	created() {
		this.sendTime = new Date().getTime();
		duomaihGoodsList(this.xianshi_id).then(res=>{
			console.log(res);
			this.DiscountTubeList = res.result.xianshigoods_list;
			this.xianshi_type = res.result.xianshitype;
			this.xianshi_state =  res.result.xianshi_state;
			this.getGoodsList();
		}).catch(err=>{
			Toast(err.message);
		})
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 更改切换标签
		setOrderNavActive(index) {
			
      var nowTime = new Date().getTime();
      if( nowTime > this.sendTime + 680 ){
				if( this.goods_type != index ){
					this.Discount.xianshigoods_id = -1;
					this.goods_type = index;
					this.nowGid.goods_id = -1;
					this.newPrice = null;
					this.DiscountPrice = null;
					if( index == 'offline' ){
						this.getGoodsList();
					}else{
						this.getDiscountTubeList();
					}
				}
				this.sendTime = nowTime;
			}
		},


		// 获取参与商品列表
		getDiscountTubeList(){
			duomaihGoodsList(this.xianshi_id).then(res=>{
				// console.log(res);
				this.DiscountTubeList = res.result.xianshigoods_list;
				this.xianshi_type = res.result.xianshitype;
				// this.getGoodsList();
			}).catch(err=>{
				Toast(err.message);
			})
		},

		// 获取 未参与 商品列表
		getGoodsList(ispush) {
			Indicator.open();
			duomaihGoodsSelect( this.keyword,this.xianshi_type).then(res => {
				Indicator.close();

				if (ispush) {
					this.goodsList = this.goodsList.concat(res.result);
				} else {
					this.goodsList = res.result;
				}
				// this.pageTotal = res.result.page_total;
				if (res.result.hasmore) {
					this.isMore = true;
				} else {
					this.isMore = false;
				}
			});
		},

		// loadMore() {
		// 	this.loading = true;
		// 	this.params.page = ++this.params.page;
		// 	if (this.isMore && this.params.page <= this.pageTotal) {
		// 		this.loading = false;
		// 		this.getGoodsList(true);
		// 	}
		// },
		reload() {
			// 重新加载数据
			this.params.page = 0;
			this.isMore = true;
			this.goodsList = [];
			this.loadMore();
		},

		// 修改 活动内 商品
		fun_editGoods(){
			var newPrice = +this.DiscountPrice;
			// console.log(this.Discount);
			var oldPrice = +this.Discount.goods_price;
			if( newPrice > 0 && (newPrice < oldPrice) && newPrice != (+this.Discount.xianshigoods_price) ){
				MessageBox.confirm('您确定要修改此商品吗？').then(action => {
					Indicator.open();				
					editXianshiGoods(this.Discount.xianshigoods_id,newPrice)
						.then(res => {
							Indicator.close();
							Toast(res.message);
							// console.log('zou');
							this.Discount.xianshigoods_id = -1;
							this.nowGid.goods_id = -1;
							this.getDiscountTubeList();
						})
						.catch(function(error) {
							Indicator.close();
							Toast(error.message);
						});
				});
			}else{
				Toast("折扣价格不能为空，且必须小于商品价格!");
				this.setOrderNavActive('');
			}
		},

		// 删除 活动内 商品
		deleteGoods(id){
			MessageBox.confirm('您确定要删除此商品吗？').then(action => {
				Indicator.open();				
				deteleXianshiGoods(id)
					.then(res => {
						Indicator.close();
						Toast(res.message);
						this.getDiscountTubeList();
					})
					.catch(function(error) {
						Indicator.close();
						Toast(error.message);
					});
			});
		},

		// 新增 未参与商品
		fun_addNewGood(){
			var newPrice = +this.newPrice;
			var oldPrice = +this.nowGid.goods_price;
			if( newPrice > 0 && newPrice < oldPrice ){
				
				MessageBox.confirm('您确定要新增此商品吗？').then(action => {
					Indicator.open();
					// Indicator.open();
					// console.log(newPrice);
					addXianshiGoods( this.nowGid.goods_id, this.xianshi_id, newPrice ).then(res=>{
						Indicator.close();
						Toast(res.message);
						this.setOrderNavActive('');
					}).catch(err=>{
						Indicator.close();
						Toast(err.message);
					})
				});
			}else{
				Toast("折扣价格不能为空，且必须小于商品价格");
			}
		},

		// 点击参与商品列表
		popupMore(i) {
			// if( this.xianshi_state != 3 ){
				if(this.Discount.xianshigoods_id == i.xianshigoods_id) {
					this.Discount = -1;
					return
				}
				this.Discount = i;
			// }
		},

		// 点击 未参与 商品
		notPopupMore(item) {
			// if( this.xianshi_state != 3 ){
				console.log(item);
				if(this.nowGid == item) {
					this.nowGid = -1;
					return
				}
				this.nowGid =  item;
				this.newPrice = null;
			// }
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
	// margin-top: 0.95rem;
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
		// border-bottom: 1px solid #e8eaed;
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
	position: absolute;
	right: 6rem;
	bottom: 50%;
	transform: translateY(50%);
	z-index: 100;
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(2, 20, 20, 0.5);
	border-radius: 0.48rem;
	background:#fff;
	&::after {
		content: '';
		position: absolute;
		border-top: 0.8rem solid transparent;
		border-left: 0.8rem solid #fff;
		border-bottom: 0.8rem solid transparent;
		right: -0.8rem;
		bottom: 50%;
		transform: translateY(50%);

	}
	li {
		width: 9.6rem;
		text-align: center;
		height: 3.7rem;
		line-height: 3.7rem;
		border-bottom: 1px solid #EFEFEF;
		font-size: 1.14rem ;
	}

	.del{
		color: #e53216;
	}

	.edit{
		color: #3F73EB;
	}

	.add{
		color:#3BC6AF,
	}
	
	input{
		text-align: center;
		width: 100%;
	}
}
.seller-search {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 1rem 0;
	background: #626771;
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
		// position: absolute;
		// left: 1.78rem;
		// top: 50%;
		width: 1.74rem;
		height: 1.74rem;
		// transform: translate(0, -50%);
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
		span {
			font-size: 1.3rem;
		}
	}
}
.item-more{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.33rem;
	height: 2.19rem;
	background: #F3F3F3;
	border-radius: 0.74rem;
	position: absolute;
	right: 1.76rem;
	bottom: 4.71rem;
	span {
		width: 0.29rem;
		height: 0.29rem;
		background: #fff;
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
