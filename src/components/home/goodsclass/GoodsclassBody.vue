<template>
	<div class="ui-category-body">
		<div class="category-flex">
			<!-- 左侧选择框 -->
			<div ref="leftCont" class="category-sidebar">
				<ul>
					<li
						class="item"
						v-for="(obj,objI) in goodClassData"
						v-bind:key="obj.id + obj.gc_name"
						@click="onItemClick(obj,objI)"
						v-bind:class="{ sidbaractive: goodClassDataSelect && obj.gc_id == goodClassDataSelect.gc_id, noActive: goodClassDataSelect && obj.gc_id != goodClassDataSelect.gc_id }"
					>
						<a>{{ obj.gc_name }}</a>
					</li>
				</ul>
			</div>
			<!-- 右侧 搜索列表 -->
			<div class="category-content" :style="{marginBottom: isGoodsClass?'5.5rem':'0rem'}" v-if="goodClassDataSelect">
				<!-- 顶部搜索框 -->
				<div ref="topBtn" class="top-btn">
					<ul>
						<li
							:class='{active: goodClassDataSelect.gc_id == currentId}'
							@click="fun_changeData(goodClassDataSelect,0)"
							>全部</li>

						<li v-for="(top,TopIndex) in goodClassDataSelect.child" :key="TopIndex+top.gc_name"
							:class='{active: top.gc_id == currentId}'
							@click="fun_changeData(top,TopIndex+1)"
							>{{top.gc_name}}</li>
					</ul>
				</div>
				<!-- 排序框 -->
				<div class="center-btn">
					<ul class="filter-list">
						<li
							class="item"
							v-for="(item, index) in sortkey"
							v-bind:key="item.id+item.name"
							v-on:click="setActiveSortkey(item, index)"
							v-bind:class="{ sortactive: item.id == currentSortKey.id, sortnormal: item.id != currentSortKey.id }"
						>
							<a v-if="!item.isMore">{{ item.name }}</a>
							<a v-else>{{ sort.name }}</a>
							<img class="sort-img" src="@/assets/image/icon2/icon-bottom.png" :class="isShowMore ? 'active' : ''" v-if="item.isMore" alt="" />
						</li>
					</ul>
					<div class="bg-mask" v-if="isShowMore"></div>
					<div class="sort-model" v-if="isShowMore">
						<div v-for="(item2) in childSort" v-bind:key="item2.id+item2.name" v-on:click="getSortChild(item2)" v-bind:class="{ active: item2.id == sort.id }">
							<a>{{ item2.name }}</a>
							<span class="iconfont" v-if="item2.id == sort.id">&#xe69b;</span>
						</div>
					</div>
				</div>

				<!-- 商品列表页 -->
				<div ref="rightCont" class="goods-ul" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<ul  v-if="goods_list && goods_list.length">
						<li class="item" 
							v-for="(good,gIn) in goods_list" :key="gIn"
							@click="goProductDetails(good.goods_id)"
							>
							<img :src="good.goods_image" alt="">
							<div>
								<span>{{good.goods_name}}</span>
								
								<div class="bot">
									<p>
										<span>￥</span>
										<span>{{good.goods_news_price}}</span>
									</p>
									<span class="icon iconfont">&#xe6ae;</span>
								</div>
							</div>
						</li>
						<li>
							<div v-if="goods_list.length > 0">
								<p class="end" v-if="!isMore">没有更多了</p>
								<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
							</div>
						</li>
					</ul>
					<empty-record2 v-if="goods_list&&goods_list.length <= 0 && !isMore" isFrom='content'></empty-record2>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { mapState, mapMutations, mapActions } from 'vuex';

import { getGoodsClassGoods } from '../../../api/homesearch';

import EmptyRecord2 from '../../EmptyRecord2';
export default {
	data() {
		return {
			currentId: 0,   // 默认 二级 分类
			
			isShowMore    : false,   // 是否显示筛选模态框
			currentSortKey: {},      // 当前选中的排序
			sort          : {},      // 综合筛选子集
			sortkey: [
				{
					key: '',
					name: '综合排序',
					isMore: true,
					id: 0,
					child: [
						{
							key: '',
							name: '综合排序',
							isMore: false,
							id: 3
						},
						// {
						// 	key: 'distance',
						// 	name: '距离排序',
						// 	isMore: false,
						// 	id: 4
						// }
					]
				},
				{
					key: 'store_sales',
					name: '销量',
					isMore: false,
					id: 1
				},
				{
					key: 'new_time',
					name: '新品',
					isMore: false,
					id: 2
				},
				// {
				// 	key: 'store_area_id',
				// 	name: '区域筛选',
				// 	isMore: false,
				// 	id: 3
				// }
			], // 排序数据

			params : {
				page    : 0,            // 第几页
				pageSize: 10,           // 每页条数
				keyword : "",           // 关键词
				sort_key: "",           // 排序
				gc_id   : 1,            // 分类
				key     : this.token,   // 用户标识
			},
			
			loading: false,   // 是否加载更多
			isMore : true,    // 是否有更多

			goods_list: [],   // 商品列表

			HmtlPx: null, // 单位

		};
	},

	props:['isGoodsClass'],

	components:{
		"empty-record2" : EmptyRecord2,
	},

	computed: {
		...mapState({
			token: state => state.member.token,  // 用户标识
			
			goodClassData: state => state.goodsclass.goodClassData,  // 左侧商品分类
			goodClassDataSelect: state => state.goodsclass.goodClassDataSelect,  // 右上角 二级分类
		}),
	},

	created() {
	},


	mounted(){
		
		this.$nextTick(()=>{
			this.HmtlPx = document.documentElement.style.fontSize.slice(0,2);  // 获取单位
		});	
		// this.$nextTick(()=>{
		// 	console.log(this.$refs.leftCont);
		// 	console.log(this.$refs.rightCont);
		// 	this.$refs.leftCont.scrollTop = 100;//vm.leftContScrollTop;
		// 	this.$refs.rightCont.scrollTop = 40;
		// })
	},

	methods: {
		...mapMutations({
			saveGoodClassDataSelect: 'saveGoodClassDataSelect',
		}),
		...mapActions({
			fetchGoodsclassListNew: "fetchGoodsclassListNew",  // 获取 分类
		}),

		// 懒加载
		getMore(){
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getValue(true);
			}
		},

		// 获取 商品列表
		getValue(hasOld){
			this.currentId = this.params.gc_id;
			getGoodsClassGoods(this.params).then(res=>{
				hasOld?(
					this.goods_list = this.goods_list.concat(res.result.goods_list)
				):(
					this.goods_list = res.result.goods_list
				)
				this.isMore = res.result.hasmore;
				this.loading = false;
			}).catch(err=>{
				Toast(err.message);
			})
		},

		// 从新加薪新数据
		getClerr(){
			this.params.page = 1;
			this.getValue()
		},

		//  点击 左侧分类
		onItemClick(item,index) {
			this.saveGoodClassDataSelect(item);
			this.currentId = item.gc_id;
			this.params.gc_id = this.currentId;
			this.getClerr();
			this.$refs.topBtn.scrollLeft = 0;
			

			var leftWidth = 0;
			for( var i = 0; i<index-1; i++ ){
				var item = this.$refs.leftCont.children[0].children[i];
				leftWidth += item.offsetHeight;
			}
			this.$refs.leftCont.scrollTop = leftWidth;
		},
		// 选择 分类
		fun_changeData(obj,index){
			this.currentId = obj.gc_id;

			var html = 1.6*this.HmtlPx;

			var leftWidth = 0;
			for( var i = 0; i<index; i++ ){
				var item = this.$refs.topBtn.children[0].children[i];
				leftWidth += (item.offsetWidth+html);
			}
			this.$refs.topBtn.scrollLeft = 0;
			index > 0&&(
				this.$refs.topBtn.scrollLeft = leftWidth - ((this.$refs.topBtn.children[0].children[index-1].offsetWidth+html)/2)
				// this.$refs.topBtn.scrollLeft = leftWidth //- ((this.$refs.topBtn.children[0].children[obj-1].offsetWidth+html)/2)
			);
			this.params.gc_id = this.currentId;
			this.getClerr();
		},

		/**
		 *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
		 *  @param: item 模态框的item
		 */
		getSortChild(item) {
			this.sort = item;
			this.isShowMore = !this.isShowMore;
			this.params.gc_id = this.currentId;
			this.params.sort_key = item.key;
			this.getClerr();
		},
		
		// closeFiler: 关闭下拉筛选模态框
		closeFiler() {
			this.isShowMore = false;
		},
		// 选择 排序
		setActiveSortkey(item, index) {
			if (item.key != 'store_area_id') {
				this.currentSortKey = item;
				if (item.isMore) {
					this.isShowMore = !this.isShowMore;
				} else {
					this.closeFiler();
					this.params.sort_key = item.key;
					this.getClerr();
				}
			} else {
				this.$refs.picker.currentValue = true;
			}
		},

		// 第一次加载
		firstloading() {
			this.params.key =  this.token;
			this.currentSortKey = this.sortkey[0];
			this.childSort = this.currentSortKey.child;
			this.sort = this.childSort[0];
			if (!(this.goodClassData && this.goodClassData.length)) {
				Indicator.open();
			}
			this.fetchGoodsclassListNew().then(
				response => {
					Indicator.close();
					this.params.gc_id = this.goodClassData[0].gc_id;
        	this.getClerr();
				},
				error => {
					Toast(error.message);
					Indicator.close();
				}
			);
		},
		
		// 去详情页
		goProductDetails(goods_id) {	
			this.$emit('getScrollTop',[ this.$refs.leftCont.scrollTop, this.$refs.rightCont.scrollTop  ]);  // 记住状态
      this.$router.push({ 'name': 'HomeGoodsdetail', 'query': { 'goods_id': goods_id } })
		}
	}
};
</script>

<style scoped lang="scss">
.ui-category-body {
	width: 100%;
	background: rgba(246, 246, 246, 1);
	-webkit-overflow-scrolling: touch;
	.category-flex {
		display: flex;
		width: 100%;
		position: absolute;
		bottom: 0;
		width: 100%;
		top: 3.82rem;
		.category-sidebar {
			// margin-top: 1.09rem;
			flex-basis: 8.78rem;
			// background-color: #f0f2f5;
			background-color: RGBA(246, 246, 246, 1);
			overflow-y: scroll;
			ul {
				padding-bottom: 5rem;
				// border-right: 0.5px solid #e8eaed;
				li {
					display: block;
					position: relative;
					// height: 4.09rem;
					// padding: 0.8rem 0.25rem;
					padding: 1.2rem 0 1.2rem 0.3rem;
					a {
						font-size: 1.13rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(111, 111, 111, 1);
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						font-size: 1.13rem;
						text-align: center;
					}
				}
				li.noActive {
					// background-color: #f0f2f5;
					background-color: RGBA(246, 246, 246, 1);
					&::after {
						content: '';
						left: 0;
						top: 0;
						position: absolute;
						height: 1.3rem;
						width: 0.3rem;
						// border-left: 0.1rem solid transparent;
					}
					a {
						// color: #333;
						color: rgba(111, 111, 111, 1);
					}
				}
				li.sidbaractive {
					background-color: #ffffff;
					&::after {
						content: '';
						border-radius: 0.17rem;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translate(0, -50%);
						height: 1.3rem;
						width: 0.3rem;
						background-color: #e93b3d;
						// border-left: 0.1rem solid #e93b3d;
					}
					a {
						font-size: 1.3rem;
						font-weight: 700;
						color: rgba(22, 22, 22, 1);
						line-height: 1.83rem;
					}
				}
			}
		}
		.category-content {
			width: 100%;
			background-color: #fdfdfd;
			overflow: auto;
			margin-bottom: 5.5rem;
			padding-top: 8rem;
			position: relative;
			display: flex;

				
			// 按钮切换
			.top-btn{
				background: #fff;
				z-index: 1;
				width: 100%;
				overflow-x: scroll;
				height: 4rem;
				position: absolute;
				top: 0;
				align-items: center;
    		display: flex;
				@mixin flex-satrt{
					display: flex;
					justify-content: flex-start;
				}
				ul{
					@include flex-satrt();
					width: fit-content;
					padding: 0 1.3rem;
					align-items: center;
					li{
						border: 1px solid transparent;
						border-radius: 1.2rem;
						padding: 0 0.6rem;
						background: #f4f4f4;


						font-size: 1.28rem;
						font-weight: 500;
						color: #333333;
						width: max-content;
						&:not(:last-child){
							margin-right: 1.6rem;
						}
					}
					.active{
						border-color: #E63116;
						color: #E63116;
						background: #fff;
						// font-size: 1.30rem;
						// font-weight: bold;
						// color: #D83A15;
						// position: relative;
						// &::before{
						// 	content: '';
						// 	width: .40rem;
						// 	height: .05rem;
						// 	background: #D83A15;
						// 	border-radius: .03rem;
						// 	position: absolute;
						// 	bottom: -0.1rem;
						// 	left: 50%;
						// 	transform: translateX(-50%);
						// }
					}
				}
			}
			// 排序
			.center-btn{
				background: #fff;
				z-index: 1;
				width: 100%;
				height: 4.2rem;
				top: 4rem;
				position: absolute;
				display: flex;
				align-items: center;							
				ul.filter-list {
					display: flex;
					align-items: center;
					justify-content: space-around;
					border: 0;
					width: 100%;
					li {
						&::after {
							content: '';
							position: absolute;
							left: 50%;
							bottom: 0;
							width: 1.8rem;
							height: 0.3rem;
							transform: translate(-50%, 0);
							background: transparent;
						}
						flex-direction: row;
						font-size: 1.21rem;
						color: rgba(111, 111, 111, 1);
						text-align: center;
						padding: 0;
						flex-shrink: 0;
						display: flex;
						position: relative;
						padding: 0.5rem 0;
						a {
							display: inline-block;
						}
						img {
							height: 0.2rem;
							width: 0.4rem;
							vertical-align: middle;
						}
						.sort-img {
							margin-left: 0.4rem;
							width: 0.69rem;
							height: 0.39rem;
							align-self: center;
							margin-top: 0.3rem;
						}
					}
					li.sortactive {
						// &::after {
						// 	content: '';
						// 	position: absolute;
						// 	left: 50%;
						// 	bottom: 0;
						// 	width: 1.8rem;
						// 	height: 0.3rem;
						// 	transform: translate(-50%, 0);
						// 	background: linear-gradient(89deg, #e53216 0%, #fc6952 100%);
						// }
						a {
							color: rgba(22, 22, 22, 1);
							color: #E63116;
						}
						.sort-img.active {
							transform: rotate(180deg);
						}
					}
					li.sortnormal {
						padding: 0.34rem 0;
						border-bottom-color: transparent;
						a {
							color: rgba(111, 111, 111, 1);
						}
					}
					.arrow-icon {
						width: 0.6rem;
						height: 0.6rem;
					}
				}
							
				.bg-mask {
					position: fixed;
					top: 12rem;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 9;
					background-color: rgba(0, 0, 0, 0.3);
				}
				.sort-model {
					position: absolute;
					// left: 0;
					background-color: #fff;
					// width: 100%;
					// width: 13.86rem;

					border-radius: 0rem 0rem 0.76rem 0.76rem;
					// height: 8.29rem;
					padding: 0 2.6rem;
					padding-top: 1.9rem;
					text-align: center;
					z-index: 10;
					top: 4rem;

					div {
						font-size: 1.24rem;
						font-weight: 400;
						color: #6f6f6f;
						margin-bottom: 1.43rem;
						// border-bottom: 1px solid #e8eaed;
						// cursor: pointer;
						display: flex;
						// width: auto;
						// justify-content: space-between;
						// align-content: center;
						// align-items: center;
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
			
			// 商品列表
			.goods-ul{
				ul,li,div,span{
					box-sizing: border-box;
				}
				flex: 1;
				overflow: scroll;
				>ul {
					height: 100%;
					.item{
						display: flex;
						height: 7.5rem;
						font-size: 1.19rem;
						border-radius: .82rem;
						font-weight: 500;
						color: #333333;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						padding: 0.8rem;
						margin: 0.8rem 1rem;
						-webkit-box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);
						box-shadow: 0px 0px 2vw 0px rgba(6, 6, 7, 0.08);

						>img{
							width: 6rem;
							height: 6rem;
							border-radius: 5px;
						}
						>div{
							padding: 0 0.8rem;
							height: 100%;
							-webkit-box-flex: 1;
							-ms-flex: 1;
							flex: 1;
							display: -webkit-box;
							height: 100%;
							display: -ms-flexbox;
							display: flex;
							-webkit-box-orient: vertical;
							-webkit-box-direction: normal;
							-ms-flex-direction: column;
							flex-direction: column;
							-webkit-box-pack: justify;
							-ms-flex-pack: justify;
							justify-content: space-between;
							span{
								font-size: 1.24rem;
								font-weight: 500;
								color: #161616;
								font-weight: normal;
								display: -moz-box;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-moz-line-clamp: 2;
								-webkit-box-orient: vertical;
								box-orient: vertical;
								overflow: hidden;
							}
							
							.bot{
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: flex-end;
								flex-wrap: wrap;
								p{
									display: flex;
									align-items: flex-end;
									font-size: 1.2rem;
								}
								span{
									font-size: 1.2rem;
									font-weight: 500;
									color: #D00303;
								}
								.icon{
									font-size: 1.36rem;
									color: #333;
								}
							}
							
						}
					}
					
				}

				.end{
					text-align: center;
					padding: 20px;
				}
			}
		}
	}
}
</style>
