<template>
	<div class="common-goods-list">
		<div class="ui-goodslist-filter" id="bar" :class="headerFixed == true ? 'isFixed' : ''">
			<ul class="filter-list">
				<li
					class="item"
					v-for="(item, index) in sortkey"
					v-bind:key="item.id"
					v-on:click="setActiveSortkey(item, index)"
					v-bind:class="{ sortactive: item.id == currentSortKey.id, sortnormal: item.id != currentSortKey.id }"
				>
					<a v-if="!item.isMore">{{ item.name }}</a>
					<a v-else>{{ sort.name }}</a>
					<!-- <span class="iconfont" :class="isShowMore ? 'active' : ''" v-if="item.isMore">&#xe6ea;</span> -->
				</li>
			</ul>
			<!-- <div class="sort-model" v-if="isShowMore">
				<div v-for="(item, index) in childSort" v-bind:key="item.id" v-on:click="getSortChild(item)" v-bind:class="{ active: item.id == sort.id }">
					<a>{{ item.name }}</a>
					<span class="iconfont" v-if="item.id == sort.id">&#xe69b;</span>
				</div>
			</div> -->
		</div>
		<div class="goodslist-body show-goods-list">
			<!-- 无限加载滚动列表 -->
			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="ui-product-body" v-for="(item, index) in goodsList" v-bind:key="index">
					<div class="list" v-on:click="goDetail(item.goods_id)">
						<div class="ui-image-wrapper"><img class="product-img" v-lazy="item.goods_image_url" /></div>
						<div class="flex-right">
							<div class="product-header">
								<h3 class="title clear-bottom" style="-webkit-box-orient:vertical">{{ item.goods_name }}</h3>
							</div>
							<div class="p-price" style="-webkit-box-orient:vertical">
								<span class="rmb">￥</span>
								<span>{{ item.goods_price }}</span>
								<span class="goods_salenum">销量:{{ item.goods_salenum }}</span>
							</div>
							<!-- <div class="p-info">
								<span class="platform_store">自营</span>
								
							</div> -->
							<!-- <div class="add-cart"><i class="iconfont">&#xe681;</i></div> -->
						</div>
					</div>
				</div>
				<div class="loading-wrapper" v-if="goodsList.length > 0">
					<p class="common-no-more" v-if="!isMore">没有更多了</p>
					<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
				</div>
				<empty-record2 isFrom="content" v-if="goodsList.length <= 0 && !isMore"></empty-record2>
			</div>
		</div>
	</div>
</template>

<script>
import EmptyRecord2 from '../../EmptyRecord2';
import { mapState } from 'vuex';
import { getStoreGoodsList } from '../../../api/homestoredetail';
export default {
	name: 'CommonGoodsList',
	props: [],
	components: {
		EmptyRecord2
	},
	data() {
		return {
			sortkey: [
				// {
				// 	key: '',
				// 	order: '',
				// 	name: '综合排序',
				// 	isMore: true,
				// 	id: 0,
				// 	child: [
				// 		{
				// 			key: '5',
				// 			order: '',
				// 			name: '综合排序',
				// 			isMore: false,
				// 			id: 3
				// 		},
				// 		{
				// 			key: '4',
				// 			order: '',
				// 			name: '人气最高',
				// 			isMore: false,
				// 			id: 4
				// 		},
				// 		{
				// 			key: '2',
				// 			order: '',
				// 			name: '价格高到低',
				// 			isMore: false,
				// 			id: 5
				// 		},
				// 		{
				// 			key: '2',
				// 			order: '1',
				// 			name: '价格低到高',
				// 			isMore: false,
				// 			id: 6
				// 		}
				// 	]
				// },
				{
					key: '7',
					order: '',
					name: '推荐',
					isMore: false,
					id: 7
				},
				{
					key: '5',
					order: '',
					name: '综合',
					isMore: false,
					id: 3
				},
				{
					key: '4',
					order: '',
					name: '人气',
					isMore: false,
					id: 4
				},
				{
					key: '2',
					order: '',
					name: '价格降序',
					isMore: false,
					id: 5
				},
				{
					key: '2',
					order: '1',
					name: '价格升序',
					isMore: false,
					id: 6
				},
				// {
				// 	key: '5',
				// 	order: '',
				// 	name: '综合排序',
				// 	isMore: false,
				// 	id: 3
				// },
				{
					key: '3',
					order: '',
					name: '销量',
					isMore: false,
					id: 1
				},
				{
					key: '1',
					order: '',
					name: '新品',
					isMore: false,
					id: 2
				}
			], // 排序数据
			currentSortKey: {}, // 当前选中的排序
			childSort: [], // 综合筛选
			sort: {}, // 综合筛选子集
			isShowMore: false, // 是否显示筛选模态框
			params: {
				store_id: this.$route.query.id ? this.$route.query.id : '',
				gc_id: this.$route.query.gc_id ? this.$route.query.gc_id : '',
				is_exchange: 0,
				is_hot: 0,
				activity: null,
				sort_key: this.$route.query.sort_key ? this.$route.query.sort_key : '', // 排序键
				sort_order: this.$route.query.sort_order ? this.$route.query.sort_order : '', // 排序键, //排序值
				page: 0,
				keyword: this.$route.query.keyword ? this.$route.query.keyword : ''
			},
			goodsList: [], // 商品列表
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			headerFixed: false
			// items:''
		};
	},
	props: ['items', 'type'],
	computed: {
		...mapState({
			sellerInfo: state => state.seller.info, //seller数据，用于查看商品信息
			memberInfo: state => state.member.info, //member数据，用于查看商品信息
			areaId: state => state.member.area_id, //member数据，用于查看商品信息
			tuan: state => state.member.tuan, //社区团
			market: state => state.homecart.market,
			exid: state => state.member.exid,
			extuan: state => state.member.extuan,
			token: state => state.member.token,
		})
	},
	created() {
		this.currentSortKey = this.sortkey[1];
		// this.childSort = this.currentSortKey.child;
		// this.sort = this.childSort[0];
	},
	mounted() {
		this.headerFixed = false;
		window.addEventListener('scroll', this.handleScroll, true);
	},
	// beforeRouteEnter(to, from, next) {
	// 		console.log(to,from);
	// 	// 在导航完成前获取数据
	// 	next(vm => {
	// 		console.log(to,from);
	// 		if (from.name == 'HomeGoodsdetail') {
	// 			vm.params.keywords = vm.utils.fetch('goodsSearch');
	// 			// vm.fun_postKeyword(vm.keywords);
	// 			// vm.$refs.ref_ul.firstElementChild.click();
	// 			// vm.params.lat1 = vm.lat;
	// 			// vm.params.lng1 = vm.lng;
	// 			// vm.params.sabrand_id = vm.brandId;
	// 			console.log(vm.params.keywords );
	// 			vm.getGoodsList()
	// 			// getBrandList(vm.params, vm.keywords)
	// 			// 	.then(res => {
	// 			// 		vm.brandList = res.result.sabrand_list;
	// 			// 		if (res.result.hasmore) {
	// 			// 			vm.isMore = true;
	// 			// 		} else {
	// 			// 			vm.isMore = false;
	// 			// 		}
	// 			// 	})
	// 			// 	.catch(err => {
	// 			// 		Toast(err.message); // console.log(err);
	// 			// 	});
	// 		}
	// 	});
	// },
	destroyed() {
		// 销毁监听 吸顶特效
		window.removeEventListener('scroll', this.handleScroll, true);
	},
	methods: {
		handleScroll() {
			// let offsetTop = this.$refs.fixedHeaderRoot.getBoundingClientRect().top;
			// this.headerFixed = offsetTop < 0 ? true : false; // some codevar scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var offsetTop = document.getElementById('bar').offsetTop;
			if (scrollTop > offsetTop) {
				this.headerFixed = true;
			} else {
				this.headerFixed = false;
			}
		},
		// closeFiler: 关闭下拉筛选模态框
		closeFiler() {
			this.isShowMore = false;
		},
		// isShowDroupMenu: 点击显示下拉框， 并且显示模态框
		// isShowDroupMenu() {
		// 	let item = this.currentSortKey;
		// 	if (item.isMore) {
		// 		this.isShowMore = true;
		// 	} else {
		// 		this.isShowMore = false;
		// 	}
		// },
		/**
		 *  setActiveSortkey: 点击切换数据并设置选中的样式
		 *  @param: item 当前选中的item
		 */
		setActiveSortkey(item, index) {
			this.currentSortKey = item;
			if (item.isMore) {
				this.isShowMore = !this.isShowMore;
			} else {
				// this.closeFiler();
				if (item.id == 7) {
					this.goodsList = this.items;
				} else {
					this.getValue();
				}
			}
		},
		/**
		 *  getValue: 向父级组件发送改变列表事件， 并传递当前的sort_key， sort_order
		 */
		getValue() {
			let data = this.getSortValue();
			let res = data;
			this.params.page = 1;
			this.goodsList = [];
			this.loading = false;
			this.params = this.setParamsByData(res);
			this.getGoodsList();
		},
		/**
		 *  getSortValue: 获取排序值
		 */
		getSortValue() {
			let sort = this.currentSortKey;
			let value = { sort_key: '', sort_order: '' };
			if (sort.isMore) {
				value.sort_key = this.sort.key;
				value.sort_order = this.sort.order;
			} else {
				value.sort_key = sort.key;
				value.sort_order = sort.order;
			}
			return value;
		},
		/**
		 *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
		 *  @param: item 模态框的item
		 */
		// getSortChild(item) {
		// 	this.sort = item;
		// 	this.isShowMore = !this.isShowMore;
		// 	this.getValue();
		// },
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getGoodsList(true);
			}
		},
		/**
		 * getGoodsList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		Search(keyword) {
			this.params.keyword = keyword;
			this.getGoodsList();
		},
		getGoodsList(ispush) {
			var seller_id = null,
				member_id = null,
				areaId = this.areaId,
				tuan = this.tuan;
			if (this.sellerInfo) {
				seller_id = this.sellerInfo.seller_id;
			}
			if (this.memberInfo) {
				member_id = this.memberInfo.member_id;
			}
			// console.log('market',this.market);
			if (this.exid) {
				areaId = this.exid;
			}
			if (this.extuan) {
				tuan = this.extuan;
			}
			getStoreGoodsList(this.params, member_id, seller_id, this.market, areaId, tuan,this.token).then(res => {
				this.buildData(ispush, res);
			});
		},
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData(ispush, res) {
			if (res) {
				if (ispush) {
					this.goodsList = this.goodsList.concat(res.result.goods_list);
				} else {
					this.goodsList = res.result.goods_list;
				}
				this.isMore = res.result.hasmore;
			}
		},
		/**
		 * 根据事件传递的值来对请求列表重新赋值
		 * @param data 事件传递的参数
		 */
		setParamsByData(data) {
			let params = this.params;
			for (let item in params) {
				for (let list in data) {
					if (item === list) {
						params[item] = data[list];
					}
				}
			}
			return params;
		},
		goDetail(goods_id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
		}
	}
};
</script>

<style lang="scss" scoped>
.ui-goodslist-filter {
	background-color: rgba(98, 103, 113, 1);
	padding-top: 0.62rem;
	padding: 0.62rem 1.24rem 1.91rem;
	width: auto;
	ul.filter-list {
		display: flex;
		width: auto;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		border: 0;
		/*  border-top: 1px solid #E8EAED; */
		/* border-bottom: 1px solid #E8EAED; */
		li {
			position: relative;
			flex-direction: row;

			font-size: 1.24rem;

			color: #ffffff;
			border-bottom: 0.1rem solid transparent;
			position: relative;
			/* flex-basis:5rem; */
			text-align: center;
			height: 2.1rem;
			padding: 0;
			line-height: 2.1rem;
			&:after {
				content: '';
				position: absolute;
				bottom: -0.3rem;
				left: 50%;
				transform: translate(-50%, 0);
				width: 2.34rem;
				height: 0.2rem;
				background: transparent;
				border-radius: 0.15rem;
			}
			a {
				height: 2.1rem;
				display: inline-block;
			}
			img {
				height: 0.2rem;
				width: 0.4rem;
				vertical-align: middle;
			}
			.iconfont {
				display: inline-block;
			}
		}
		li.sortactive {
			&:after {
				content: '';
				position: absolute;
				bottom: -0.3rem;
				left: 50%;
				transform: translate(-50%, 0);
				width: 2.34rem;
				height: 0.2rem;
				background: #ffffff;
				border-radius: 0.15rem;
			}
			// border-bottom-color: #e93b3d;
			a {
				font-size: 1.72rem;
				font-weight: 500;
				color: #ffffff;
			}
			.iconfont {
				color: #e93b3d;
			}
			.iconfont.active {
				transform: rotate(180deg);
			}
		}
		li.sortnormal {
			border-bottom-color: transparent;
			a {
				color: #ffffff;
				font-size: 1.24rem;
			}
		}
		.arrow-icon {
			width: 0.6rem;
			height: 0.6rem;
		}
	}
	.sort-model {
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 10;
		div {
			color: #333;
			padding: 0.75rem;
			font-size: 0.65rem;
			background-color: #fff;
			margin: 0;
			border-bottom: 1px solid #e8eaed;
			cursor: pointer;
			display: flex;
			width: auto;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			img {
				float: right;
				width: 0.8rem;
				height: 0.8rem;
			}
			&.active {
				color: #e93b3d;
			}
		}
	}
}
.flex-wrapper {
	background-color: rgba(244, 245, 247, 1);
	display: flex;
	flex-wrap: wrap;
	padding: 2%;
	margin-right: -2%;
	padding-bottom: 2rem;
	padding-bottom: 15rem;
	padding-bottom: 6rem;
	height: 60vh;
	overflow-y: scroll;
	.ui-product-body {
		width: 48%;
		margin-right: 2%;
		margin-bottom: 0.96rem;
		background-color: #fff;

		border-radius: 0.77rem;
		.list {
			div.ui-image-wrapper {
				img.product-img {
					width: 100%;
					height: 16.43rem;
					flex-shrink: 0;
				}
				img.product-img[lazy='loading'] {
					width: 100%;
					height: 16.43rem;
				}
				img.product-im[lazy='error'] {
					width: 100%;
					height: 16.43rem;
				}
				img.product-img[lazy='loaded'] {
					width: 100%;
					height: 16.43rem;
					flex-shrink: 0;
					background: rgba(255, 255, 255, 1);
				}

				span {
				}
			}
			.flex-right {
				padding: 0.96rem 1.43rem 1.43rem;
				display: flex;
				flex-direction: column;
				.title {
					margin-bottom: 0.43rem;
					font-size: 1.24rem;
					font-weight: 400;
					color: #161616;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					&.clear-bottom {
						margin-bottom: 0;
					}
				}
				.product-header {
				}
				.p-price {
					display: flex;
					align-items: center;
					font-size: 1.81rem;
					font-weight: bold;
					color: #e53216;
					.rmb {
						font-size: 1.05rem;
						align-self: flex-end;
					}
					.goods_salenum {
						margin-left: auto;
						font-size: 1.24rem;
						font-weight: 400;
						color: #161616;
					}
				}

				.add-cart {
					i {
					}
				}
			}
		}
	}
	.loading-wrapper {
		width: 100%;
	}
}
.isFixed {
	position: fixed;
	// top: 10px; //自己根据需求设定
	top: 0; //自己根据需求设定
	z-index: 999;
	// background-color: #fff;
	// background-color: #ea4e3a;
	width: 100%;
	box-sizing: border-box;
	padding: 1.24rem;
}
</style>
