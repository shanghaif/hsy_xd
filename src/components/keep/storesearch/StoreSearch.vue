<template>
	<div class="search-wrapper brand_head_s">
		<div class="header_h">
			<search-header
				ref="header"
				:keyword="keywords"
				title="商家搜索"
				place="请输入商家名称"
				history="StoreKeyword"
				@postKeyword="fun_postKeyword"
				@postcurrenKeywords="fun_postcurrenKeywords"
			></search-header>
		</div>
		<!-- 搜索 模块 -->
		<div class="search-body" v-show="!showList">
			<div class="list current-search" v-if="currenKeywords.length > 0">
				<div class="list-header">
					<span>搜索历史</span>
					<img src="../../../assets/image/icon2/icon-del.png" v-on:click="deleteCurrent()" />
				</div>
				<ul ref="ref_ul">
					<li class="item" v-for="(item, index) in currenKeywords" v-on:click="getKey(item)" :key="index">{{ item }}</li>
				</ul>
			</div>

			<div class="list hot-wrapper" v-if="hotKeywords[0] !== ''">
				<div class="list-header"><span>热门搜索</span></div>
				<ul>
					<li class="item" v-for="(item, index) in hotKeywords" :key="index" v-on:click="getKey(item)">{{ item }}</li>
				</ul>
			</div>
		</div>
		<!-- 列表内容 -->
		<!-- 内容展示 -->
		<div class="brand_cont" v-show="showList">
			<!-- 无限加载滚动列表 -->
			<div class="flex-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="ui-product-body" v-for="(item, index) in brandList" v-bind:key="index">
					<!-- <div class="ui-product-body" v-for="(item, index) in storeList" v-bind:key="index"> -->
					<!-- <div class="list-wrapper" @click="goDetail(item.store_id)"> -->
						
					
				<div class="list-wrapper1">
					<div>
						<p>{{item.store_name||"商家名称"}}</p>
						<img src="@/assets/image/keep-store.png" alt="">
						<div class="camm">
							<span>
								<span @click="confirm(item)"  class="icon iconfont">&#xe6e1;</span>
								<span @click="confirm(item)">{{item.safety_name.safety_name||"指定安全员"}}</span>
							</span>
							<img
								@click="$router.push( { name:'KeepStoreLive',query:{ sid : item.store_id}} )"
								v-show="item.is_camer == '1'" class="i-video"
								:src="require('@/assets/image/icon2/store-camm.png')" alt="">
						</div>
						<p>营业执照：{{item.business_licence_number}}</p>
					</div>
					<div>
						<button v-if="item.joinin_state == 40"
							@click.stop="$router.push( { name: 'KeepTestEdit', query:{ member_id : item.member_id}} )">查看</button>
						<button v-if="item.joinin_state == 40"
							@click.stop="$router.push( { name: 'KeepStoreGoodslist', query:{ store_id : item.store_id}} )">商品</button>
						<button v-if="item.joinin_state == 10"
							@click.stop="$router.push( { name: 'KeepTesting', query:{ member_id : item.member_id}} )">审核</button>
						<button v-if="item.joinin_state == 40" 
							@click.stop="$router.push( { name: 'KeepJinhuo', query:{ sid : item.store_id}} )">台账</button>
						<!-- <button v-if="item.is_camer == 1"								
							@click="$router.push( { name:'KeepStoreLive',query:{ sid : item.store_id}} )">视频</button> -->
						<button v-if="item.complain == 1"
							@click="$router.push( { name:'KeepReportList',query:{ sid : item.store_id}} )">举报</button>
					</div>
				</div>
					<div v-if="1==2" class="list-wrapper" @click="goDetail(item)">
						<div class="list">
							<div class="ui-image-wrapper"><img class="product-img" v-lazy="item.store_logo" /></div>

							<div class="flex-right">
								<div class="product-header">
									<h3 class="title clear-bottom" style="-webkit-box-orient:vertical">{{ item.store_name }}</h3>
								</div>
								<div class="store-info-wrapper">
									<div class="store-info">
										<div class="collect-info">{{ item.store_collect }} 人关注</div>
										<div class="sub-title" style="-webkit-box-orient:vertical">
											<span class="common-score-wrapper">
												评分：
												<span class="common-score">{{ item.store_credit_percent / 10 }}</span>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="btn">
								<img :src="item.is_favorate ? heart1 : heart2" alt="" />
								<span :class="{ active: item.is_favorate }">{{ item.is_favorate ? '已关注' : '关注' }}</span>
								<img v-show="item.is_camer == '1'" class="i-video iVideoTop" :src="require('@/assets/image/icon2/store-camm.png')" alt="">
							</div>
						</div>
						<div class="goods-list" v-if="item.goods_list && item.goods_list.length">
							<div class="goods-item" v-for="(goods, gindex) in item.goods_list" :key="gindex">
								<div class="goods-image"><img :src="goods.goods_image_url" /></div>
								<div class="goods-price">￥{{ goods.goods_price }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="loading-wrapper" v-if="brandList.length > 0">
					<p class="common-no-more" v-if="!isMore">没有更多了</p>
					<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
				</div>
				<!-- <empty-record v-if="brandList.length <= 0 && !isMore"></empty-record> -->
			</div>
			<!--  -->
		</div>
		<!-- 空白页 -->
		<empty-record2 isFrom="search" v-if="!showList"></empty-record2>
		<!-- 二级列表安全员 -->
      <second-select
        @onConfirm="getonConfirm"
        title="选择安全员"
				showName="area_name"
        v-if="safetyList.length>0" ref="secondselect" :items="safetyList"></second-select>
	</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import searchHeader from './HeaderSearch';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import SecondSelect from '../SecondSelect';
import { searchKeywordList } from '../../../api/homesearch';

import { getHotKeyWords } from '../../../api/homebrand.js';
import { getStoreList, getStoreNearbyList } from '../../../apikeep/homesearch';
import { keepSafetyXuanze, keepSafetyShenhe  } from '../../../apikeep/safety';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			heart1: require('@/assets/image/icon2/icon-heart-red.png'),
			heart2: require('@/assets/image/icon2/icon-heart-transparent.png'),
			hotKeywords: [], // 热门推荐
			currenKeywords: [], // 历史记录
			keywords: '',
			showList: false,
			brandList: [],

			loading: false, // 是否加载更多
			isMore: false, // 是否有更多

			params: {
				page: 0, // 起始条数
				per_page: 10, // 一次查询条数
				lat1: null, // 经度 必穿
				lng1: null, // 纬度 必穿

				previous: null
			},

			safetyList : [],     // 安全员id
			safetyStore: null,   //商家id
		};
	},
	watch: {
		brandList: function(v) {
			if (v.length) {
				this.showList = true;
			} else {
				this.showList = false;
			}
		}
	},
	filters: {
		filters_follow: function(value) {
			if (value > 1000) {
				if (value > 10000) {
					if (value > 1000000) {
						return (value / 1000000).toFixed(1) + '百万';
					} else return (value / 10000).toFixed(1) + '万';
				} else {
					return (value / 1000).toFixed(1) + '千';
				}
			} else {
				return value;
			}
		}
	},
	components: {
		searchHeader,
		EmptyRecord2,
		'second-select':SecondSelect,
	},
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => { 
      // if( from.name == "HomeStoreGoodslist" ){
				if (from.name != 'KeepReportList' && from.name != 'KeepStoreLive'&& from.name != 'KeepJinhuo') {
					//更新初始化列表数据
					vm.keywords = '';
					vm.brandList = [];
					vm.$refs.header.clear();
				}
				resetRem();
		});
	},
	
	computed: {
		...mapState({
      keepInfo : state => state.keep.keepInfo,    // 获取 登录信息
			currentKey: state => state.homesearch.currentKey,
			lat: state => state.homebrand.lat,
			lng: state => state.homebrand.lng,
			brandId: state => state.homebrand.brandId
		})
	},
	mounted() {
		resetRem();
	},
	created() {
		this.params.lat1 = this.lat;
		this.params.lng1 = this.lng;
		this.params.sabrand_id = this.brandId;
		this.previous = new Date().getTime();
		this.getHotKeywords();
		this.getCurrentKey();


		// 安全员列表
		keepSafetyXuanze().then(res=>{
			this.safetyList = res.result;
		}).catch(err=>{
			console.log(err);
		})
	},
	beforeDestroy: function() {
		resumeRem();
	},
	methods: {
		// 点击 安全员
		confirm(store){
			if( this.keepInfo.type != '99'  ){
				( store.store_id)?(
					this.$refs.secondselect.currentValue = true,
					this.safetyStore = store
				):(
					Toast('此商家还未开通')
				);
			}
		},
		// 指定安全员
		getonConfirm(v){
			keepSafetyShenhe(v[1].safety_id,this.safetyStore.store_id).then(res=>{
				Toast(res.message);
				this.safetyStore.safety_name = {
					safety_name: v[1].safety_name,
					safety_id : v[1].safety_id
				};
			}).catch(err=>{
				Toast(err.message);
			})
		},

		...mapMutations({
			changeKey: 'changeKey',
			saveStoreId: 'saveStoreId'
		}),
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData(ispush, res) {
			if (res) {
				if (ispush) {
					this.brandList = this.brandList.concat(res.result.store_list);
				} else {
					this.brandList = res.result.store_list;
				}
				this.isMore = res.result.hasmore;
				// 商家总数
				this.store_count = res.result.store_count;
			}
			// console.log(this.brandList);
		},

		// 查看详情
		goDetail(item) {
			var str = '3,4,7,8,9,10,47,48,49,50';
			if( str.indexOf(item.storeclass_id) != -1){
				this.$router.push({ name: 'HomeStoreFoodslist', query: { id: item.store_id } });	
			}else{
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: item.store_id } });
			}
		},

		// 接收 headersearch 返回的 关键词
		fun_postKeyword(keyword) {
			if (keyword) {
				this.keywords = keyword;
				this.isMore = true;
				this.params.page = 0;
				this.brandList = [];
				this.loadMore();
			}
		},
		// 如果 用户清空了 搜索框的内容 从新 记录数据
		fun_postcurrenKeywords() {
			if (!this.showList) {
				this.getCurrentKey();
			}
		},

		// 获取热门 推荐
		getHotKeywords() {
			getHotKeyWords().then(res => {
				this.hotKeywords = Object.assign(res.result, this.hotKeywords);
			});
		},

		// 点击 历史记录
		getKey(item) {
			if (item.content) {
				this.keywords = item.content;
			} else {
				this.keywords = item;
			}
			this.changeKey(this.keywords);
			this.$refs.header.search(this.keywords);
		},

		// 删除 历史记录
		deleteCurrent() {
			this.utils.save('StoreKeyword', []);
			this.currenKeywords = this.utils.fetch('StoreKeyword');
		},

		// 获取历史记录
		getCurrentKey() {
			this.currenKeywords = this.utils.fetch('StoreKeyword');
		},

		// 加载数据
		loadMore() {
			console.log("加载");
			this.loading = true;
			if (this.isMore) {
				this.params.page++;
				this.loading = false;
				this.getOrderList(true);
			}
		},

		getOrderList(ispush) {
			let now = new Date().getTime();
			if (this.previous + 280 <= now) {
				Indicator.open();
				let params = this.params;

				getStoreList('', '', this.keywords, 0, 0, '', this.params.page, '', '')
					.then(res => {
						Indicator.close();
						if (ispush && this.brandList) {
							this.brandList = this.brandList.concat(res.result.store_list);
						} else {
							this.brandList = res.result.store_list;
						}
						if (res.result.hasmore) {
							this.isMore = true;
						} else {
							this.isMore = false;
						}
						// console.log(this.brandList);
					})
					.catch(err => {
						Toast(err.message);
						// console.log(err);
					});
				this.previous = now;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.brand_head_s {
	@mixin pos_fixed {
		position: fixed;
		top: 25vw;
		box-sizing: border-box;
	}

	& /deep/ .common-empty-record {
		padding-top: 10%;
		@include pos_fixed();
		top: 60vh;
	}
	.b_flex {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	$pmvw: 4vw;
	// .search-wrapper {
	// 	height: auto;
	//   width: auto;
	.header_h {
		// height:13vh;
		height: 25vw;
	}
	.search-body {
		@include pos_fixed();
		padding: 1.3rem;
		div.list {
			margin-bottom: 1.5rem;
			.list-header {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				span {
					color: #333;
					font-size: 0.7rem;
					font-size: 1.39rem;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(22, 22, 22, 1);
					align-self: flex-end;
				}
				img {
					width: 1.13rem;
					height: 1.13rem;
					cursor: pointer;
				}
			}
			ul {
				display: flex;
				padding-top: 1.13rem;
				flex-wrap: wrap;
				li {
					padding: 0.45rem 1.3rem;
					background-color: rgba(244, 245, 247, 1);
					border-radius: 1.95rem;
					color: #333;
					font-size: 0.6rem;
					font-size: 1.3rem;
					margin-right: 1.3rem;
					margin-bottom: 1.3rem;
					cursor: pointer;
				}
			}
		}
		div.hot-wrapper {
			.list-header {
				span {
					border: 0;
				}
			}
		}
	}

	$bor: 0;
	@mixin no-flex {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	// 内容信息
	.brand_cont {
		@include pos_fixed();
		height: 86.8vh;
		border: $bor solid blue;
		padding: 0 $pmvw;
		width: 100%;
		// padding-top: 1rem;
		overflow: auto;
		.b_c_item {
			height: 24vw;
			// padding: .8rem;
			border: $bor solid yellow;
			@include no-flex;
			margin: 3vw 0;
			img {
				width: 8rem;
				height: 8rem;
				width: 24vw;
				height: 24vw;
				border-radius: 1rem;
			}
			.item_data {
				width: 70%;
				width: 66vw;
				height: 24vw;
				border: $bor solid red;
				font-size: 1.2rem;
				color: #777;
				padding-top: 0.2rem;
				// 超出 点点点
				p,
				span {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				div {
					margin: 0.2rem 0;
					.s_tit {
						max-width: 40vw;
					}
					.s_km {
						max-width: 26vw;
					}
				}

				.i_name {
					font-size: 1.62rem;
				}

				.i_div {
					span {
						font-weight: 600;
						color: #555;
					}
				}
			}
		}
	}

	.flex-wrapper {
		// background-color: RGBA(240, 241, 243, 1);
		.ui-product-body {
			background-color: #fff;
			border-radius: 0.69rem;
			&:nth-child(1) {
				border-top-left-radius: 0 !important;
				border-top-right-radius: 0 !important;
			}
			.goods-list {
				padding: 0.8rem 0.5rem;
				border-top: 1px solid rgba(239, 239, 239, 1);
				// overflow: hidden;
				display: flex;
				flex-wrap: nowrap;
				overflow-x: scroll;
				margin-top: 1.3rem;
				background: #fff;
				.goods-item {
					// float: left;
					// width: 25%;
					text-align: center;
					margin-right: 1.3rem;
					.goods-image {
						margin-bottom: 0.35rem;
						img {
							width: 4.78rem;
							height: 4.78rem;
							border-radius: 0.7rem;
						}
					}
					.goods-price {
						color: $primaryColor;
						font-size: 1.14rem;
						font-size: 500;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						width: 100%;
					}
				}
			}
			.list-wrapper {
				padding: 1.08rem 0 1.3rem 0.86rem;
				background: #ffffff;
				box-shadow: 0rem 0rem 0.86rem 0rem rgba(0, 0, 0, 0.04);
				border-radius: 0.69rem;
				margin-bottom: 0.5rem;
			}
			
			
			
			.list-wrapper1{
				margin: 1rem 0;
				width: 91%;
				/* height: 16.5rem; */
				padding: 1rem;
				background: #FFFFFF;
				-webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
				box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
				border-radius: .6rem;
				>div{
					// padding-left: .6rem;
					position: relative;
					padding-left: 1.3rem;
					.camm{
						display: flex;
						justify-content: space-between;
						>img{
							width: 1.2rem;
							height: 1.2rem;
							margin-right: 0.5rem;
						}
					}			
					.icon{
						margin-right: .4rem;
					}
					>img{
						position: absolute;
						width: 1rem;
						left: 0;
						top: .2rem;
					}
					p{
						margin-bottom: .8rem;
						&:first-child{
							font-size: 3.8vw;
							font-weight: 500;
						}
						&:last-child{
							margin-top: .68rem;
						}
					}
					&:last-child{
						padding-left: 0;
						margin-top: 1rem;
						button{
							width: 22%;
							height: 2.7rem;
							background: #3C65FF;
							border-radius: 1rem;
							color: #fff;
							margin: 0 .2rem;
							&:nth-child(2){	
								background: #00AEFF;
							}
							&:nth-child(3){	
								background: #B4D500;
							}
							&:nth-child(4){
								background: #FF9C3C;
							}
						}
					}
				}
			}
			.list {
				display: flex;
				width: auto;
				align-items: center;
				justify-content: space-between;
				padding: 0.5rem;
				position: relative;
				background: #fff;

				div.ui-image-wrapper {
					// width: 3rem;
					// height: 3rem;
					position: relative;
					// border: 1px solid #e1e1e1;
					display: flex;
					justify-content: center;
					align-content: center;
					align-items: center;
					// flex-basis: 3rem;
					flex-shrink: 0;

					background-position: center center !important;
					background-size: 5rem 5rem;
					background-repeat: no-repeat;
					-webkit-background-size: cover;
					-moz-background-size: cover;
					-o-background-size: cover;
					background-size: cover;

					img.product-img {
						width: 4.35rem;
						height: 4.35rem;
						// flex-basis: 3rem;
						flex-shrink: 0;
						border-radius: 0.34rem;
					}

					span {
						position: absolute;
						height: 1rem;
						background: rgba(243, 244, 245, 1);
						line-height: 1rem;
						text-align: center;
						font-size: 0.7rem;
						color: #e93b3d;
						width: 5.5rem;
						bottom: 0;
						left: 0;
					}
				}
				.flex-right {
					// padding-top: 0.5rem;
					padding-left: 0.86rem;
					width: 100%;
					position: relative;
					.title {
						font-size: 1.24rem;
						font-weight: 500;
						color: #161616;
						font-weight: normal;

						display: -moz-box;
						display: -webkit-box;

						-webkit-line-clamp: 2;
						-moz-line-clamp: 2;

						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						box-orient: vertical;

						overflow: hidden;
						// margin-bottom: 0.4rem;
						&.clear-bottom {
							margin-bottom: 0;
						}
					}
					.store-info-wrapper {
						display: flex;
						.store-info {
							flex: 1;
						}
					}
					.product-header {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						display: flex;
						align-items: center;
						margin-bottom: 0.3rem;
					}
					.collect-info {
						// font-size: 0.6rem;
						// color: #999;
						font-size: 1.05rem;
						color: #6f6f6f;
					}
					.sub-title {
						color: #55595f;
						// font-size: 0.7rem;

						display: -moz-box;
						display: -webkit-box;

						-webkit-line-clamp: 1;
						-moz-line-clamp: 1;

						-moz-box-orient: vertical;
						-webkit-box-orient: vertical;
						box-orient: vertical;

						// overflow: hidden;
						margin-bottom: 0.4rem;

						.common-score-wrapper {
							font-size: 0.95rem;
							color: #6f6f6f;
							.common-score {
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #e63116;
							}
						}
					}
					.price {
						margin-bottom: 0.4rem;
						span {
							&:first-child {
								color: #e93b3d;
								font-size: 0.8rem;
							}
							&:last-child {
								color: #a4aab3;
								font-size: 0.6rem;
								text-decoration: line-through;
							}
						}
					}
					.sendway {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 0.6rem;
						font-weight: 'Regular';
						span {
							color: #7c7f88;
							&.self-support {
								font-size: 0.5rem;
								color: #e93b3d;
								border: 1px solid #e93b3d;
								border-radius: 0.1rem;
								width: 1.6rem;
								height: 0.8rem;
								line-height: 0.8rem;
								text-align: center;
							}
						}
					}
				}
				.btn {
					width: 5rem;
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					align-self: flex-start;
					img {
						width: 1.22rem;
						height: 1.22rem;
						margin-top: 0.3rem;
						margin-bottom: 0.3rem;
					}
					span {
						font-size: 0.95rem;
						font-family: PingFangSC-Regular, PingFang SC;
						color: #6f6f6f;
					}
					span.active {
						color: #e63116;
					}
					.i-video{
						width:1.6rem;
						height:1.6rem;
						// margin-top: 1.5rem;
					}
				}
				// .btn.active {
				// 	// border-color: $primaryColor;
				// 	// background: $primaryColor;
				// 	// color: #fff;
				// }
			}
		}
	}
}
</style>
