<template>
	<div class="common-store-list">
		<div class="ui-storelist-filter">
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
					<img class="sort-img" src="@/assets/image/icon2/icon-bottom.png" :class="isShowMore ? 'active' : ''" v-if="item.isMore" alt="" />
					<!-- <span class="iconfont" :class="isShowMore ? 'active' : ''" v-if="item.isMore">&#xe6ea;</span> -->
				</li>
			</ul>
			<div class="bg-mask" v-if="isShowMore"></div>
			<div class="sort-model" v-if="isShowMore">
				<div v-for="(item, index) in childSort" v-bind:key="item.id" v-on:click="getSortChild(item)" v-bind:class="{ active: item.id == sort.id }">
					<a>{{ item.name }}</a>
					<span class="iconfont" v-if="item.id == sort.id">&#xe69b;</span>
				</div>
			</div>
		</div>
		<!-- <p class="store_count">商家总数：{{ store_count }}</p> -->
		<div class="storelist-body show-store-list">
			<!-- 无限加载滚动列表 -->
			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="ui-product-body" v-for="(item, index) in storeList" v-bind:key="index" 
					>
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
								@click.stop="handClickSee(item)">查看</button>
							<button v-if="item.joinin_state == 40"
								@click.stop="handClickGood(item)">商品</button>
							<button v-if="item.joinin_state == 10"
								@click.stop="handClickTest(item)">审核</button>
							<button v-if="item.joinin_state == 40" 
								@click.stop="handClickTaizhang(item)">台账</button>
							<!-- <button v-if="item.is_camer == 1"								
								@click="$router.push( { name:'KeepStoreLive',query:{ sid : item.store_id}} )">视频</button> -->
							<button v-if="item.complain == 1"
								@click="handClickJuBao(item)">举报</button>
						</div>
					</div>
					<div v-if="1==2" class="list-wrapper" v-on:click="goDetail(item)">
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
												<span class="common-score">{{ ((item.store_credit_percent / 100) * 5).toFixed(1) }}</span>
											</span>
										</div>
									</div>
								</div>
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
				<div class="loading-wrapper" v-if="storeList.length > 0">
					<p class="common-no-more" v-if="!isMore">没有更多了</p>
					<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
				</div>
				<empty-record2 v-if="storeList.length <= 0 && !isMore" isFrom='content'></empty-record2>
			</div>
		</div>

		<region-picker2 ref="picker" v-on:onConfirm="onPickerConfirm"></region-picker2>
		
		<!-- 二级列表安全员 -->
      <second-select
        @onConfirm="getonConfirm"
        title="选择安全员"
				showName="area_name"
        v-if="safetyList.length>0" ref="secondselect" :items="safetyList"></second-select>
	</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../EmptyRecord2';
import { mapState } from 'vuex';
import SecondSelect from '../SecondSelect';
import RegionPicker2 from '../../RegionPicker2';
import { getStoreList, getStoreNearbyList } from '../../../apikeep/homesearch';
import { keepSafetyXuanze, keepSafetyShenhe } from '../../../apikeep/safety';
export default {
	name: 'CommonStoreList',
	props: ['currentid'],
	components: {
		EmptyRecord2,
		RegionPicker2,
		'second-select':SecondSelect,
	},
	data() {
		return {
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
						// },
						{
							key: '1',
							name: '已审核商家',
							isMore: false,
							id: 5
						},
						{
							key: '2',
							name: '未审核商家',
							isMore: false,
							id: 6
						}
					]
				},
				// {
				// 	key: 'store_sales',
				// 	name: '销量',
				// 	isMore: false,
				// 	id: 1
				// },
				// {
				// 	key: 'store_credit',
				// 	name: '评分',
				// 	isMore: false,
				// 	id: 2
				// },
			], // 排序数据
			currentSortKey: {}, // 当前选中的排序
			childSort: [], // 综合筛选
			sort: {}, // 综合筛选子集
			isShowMore: false, // 是否显示筛选模态框
			params: {
				brand: this.$route.query.brand ? this.$route.query.brand : '',
				category: this.$route.query.storeclass_id ? this.$route.query.storeclass_id : '',
				is_exchange: 0,
				is_hot: 0,
				activity: null, // TODO: 确认activity的值
				sort_key: this.$route.query.sort_key ? this.$route.query.sort_key : '',
				sort_value: 2,
				page: 0,
				keyword: this.$route.query.keywords ? this.$route.query.keywords : ''
			},
			storeList: [], // 商品列表
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多

			nowSort_key: null, //当前的 选中的类型（ 区域过滤传参时使用）
			store_area_id: null, //选中的区域
			store_count: 0,//商家总数

			safetyList : [],     // 安全员id
			safetyStore: null,   //商家id
		};
	},
	computed: {
		...mapState({
      keepInfo : state => state.keep.keepInfo, 
      keepToken : state => state.keep.keepToken,    // 获取 登录信息
		})
	},
	watch: {
		currentid() {
			this.getValue();
		}
	},
	created() {
		(this.keepInfo.type && this.keepInfo.type == 1)?(
			this.sortkey.push(				
				{
					key: 'store_area_id',
					name: '区域筛选',
					isMore: false,
					id: 3
				}
			)
		):'';
		this.currentSortKey = this.sortkey[0];
		this.childSort = this.currentSortKey.child;
		this.sort = this.childSort[0];

		
		// 安全员列表
		keepSafetyXuanze().then(res=>{
			this.safetyList = res.result;
		}).catch(err=>{
			console.log(err);
		})
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
		// closeFiler: 关闭下拉筛选模态框
		closeFiler() {
			this.isShowMore = false;
		},
		// isShowDroupMenu: 点击显示下拉框， 并且显示模态框
		isShowDroupMenu() {
			let item = this.currentSortKey;
			if (item.isMore) {
				this.isShowMore = true;
			} else {
				this.isShowMore = false;
			}
		},

		//
		onPickerConfirm(values) {
			// console.log(values[2].area_id);
			this.store_area_id = values[2].area_id;
			// 类型 取之前的值
			this.params.sort_key = this.nowSort_key;
			this.closeFiler();
			this.getValue();
		},
		/**
		 *  setActiveSortkey: 点击切换数据并设置选中的样式
		 *  @param: item 当前选中的item
		 */
		setActiveSortkey(item, index) {
			if( index == 1 || index == 2 ){				
				this.sort = this.sortkey[0];
			}
			// (item.key == 2 || item.key == 3)?(console.log(123)):(console.log(999));
			// console.log(item);
			if (item.key != 'store_area_id') {
				this.currentSortKey = item;
				this.nowSort_key = item.key; //当前选中的值 存起来
				if (item.isMore) {
					this.isShowMore = !this.isShowMore;
				} else {
					this.closeFiler();
					this.getValue();
				}
			} else {
				this.$refs.picker.currentValue = true;
			}
		},
		/**
		 *  getValue: 向父级组件发送改变列表事件， 并传递当前的sort_key， sort_value
		 */
		getValue() {
			let data = this.getSortValue();
			let res = data;
			this.params.page = 1;
			this.storeList = [];
			this.loading = false;
			this.setParamsByData(res);
			if (data.sort_key == 'distance') {
				// Toast("h5+");
				if (window.plus) {
					var that = this;
					plus.geolocation.getCurrentPosition(
						p => {
							// that.member_point.lat = p.coords.latitude;
							// that.member_point.lng = p.coords.longitude;
							that.getStoreList(false, true);
						},
						function(e) {
							alert('Geolocation error: ' + e.message);
						}
					);
				} else {
					// 获取 当前经纬度 赋值
					this.utils.getLatLng().then(obj => {
						console.log(obj);
						// this.member_point.lat = obj.lat;
						// this.member_point.lng = obj.lng;
						this.getStoreList(false, true);
					});
				}
				// }else{
				//   this.getStoreList(false,true)
				// }
			} else {
				this.getStoreList();
			}
		},
		/**
		 *  getSortValue: 获取排序值
		 */
		getSortValue() {
			let sort = this.currentSortKey;
			let value = { sort_key: '', sort_value: '' };
			if (sort.isMore) {
				value.sort_key = this.sort.key;
			} else {
				value.sort_key = sort.key;
			}
			return value;
		},
		/**
		 *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
		 *  @param: item 模态框的item
		 */
		getSortChild(item) {
			this.sort = item;
			this.isShowMore = !this.isShowMore;
			this.getValue();
		},
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				let data = this.getSortValue();
				if (data.sort_key == 'distance') {
					this.getStoreList(true, true);
				}else{
					this.getStoreList(true);
				}
			}
		},
		/**
		 * getStoreList: 获取商品列表
		 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
		 */
		getStoreList(ispush = false, nearby = false) {
			let data = this.params;
			data.category = this.currentid;
			if (nearby) {
				getStoreNearbyList(data.brand, data.category, data.keyword, '', '', data.sort_key, data.page, '',this.store_area_id).then(res => {
					this.buildData(ispush, res);
				});
			} else {
				getStoreList(data.brand, data.category, data.keyword, 0, 0, data.sort_key, data.page, '', this.store_area_id).then(res => {
					this.buildData(ispush, res);
				});
			}
		},
		/**
		 * getList: 构建数据
		 * @param: ispush 是否改变向元数据追加数据
		 * @param: res 接口请求返回的数据
		 */
		buildData(ispush, res) {
			if (res) {
				if (ispush) {
					this.storeList = this.storeList.concat(res.result.store_list);
				} else {
					this.storeList = res.result.store_list;
				}
				this.isMore = res.result.hasmore;
				// 商家总数
				this.store_count = res.result.store_count;
			}
		},
		/**
		 * 根据事件传递的值来对请求列表重新赋值
		 * @param data 事件传递的参数
		 * @returns {params|{brand, category, is_exchange, is_hot, activity, sort_key, sort_value, page, per_page, keyword}}
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
		// 查看
		handClickSee(item){
			this.$emit('haveStoreData','');
			this.$router.push( { name: 'KeepTestEdit', query:{ member_id : item.member_id}} );
		},
		// 商品
		handClickGood(item){
			this.$emit('haveStoreData','');
			this.$router.push( { name: 'KeepStoreGoodslist', query:{ store_id : item.store_id}} );
		},
		// 审核
		handClickTest(item){
			this.$emit('haveStoreData','');
			this.$router.push( { name: 'KeepTesting', query:{ member_id : item.member_id}} )
		},
		// 台账
		handClickTaizhang(item){
			this.$emit('haveStoreData','');
			this.$router.push( { name: 'KeepJinhuo', query:{ sid : item.store_id}} );
		},
		// 举报
		handClickJuBao(item){
			this.$emit('haveStoreData','');
			this.$router.push( { name:'KeepReportList',query:{ sid : item.store_id}} )
		},
		goDetail(item) {
			var str = '3,4,7,8,9,10,47,48,49,50';
			if( str.indexOf(item.storeclass_id) != -1){
				this.$router.push({ name: 'HomeStoreFoodslist', query: { id: item.store_id } });				
			}else{
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: item.store_id } });	
			}
			
		},

	}
};
</script>

<style lang="scss" scoped>
.common-store-list {
	position: relative;
}
// 商家总数
.store_count {
	text-align: right;
	font-size: 1.1rem;
	font-weight: 500;
	color: #888;
	padding-right: 0.54321rem;
}
.ui-storelist-filter {
	width: auto;
	overflow-x: auto;
	overflow-y: hidden;
	ul.filter-list {
		display: flex;
		// width: auto;
		// justify-content: space-around;
		// align-content: center;
		align-items: center;
		// border-top: 1px solid #e8eaed;
		// border-bottom: 1px solid #e8eaed;
		// width: 18rem;
		// width: 14rem;
		justify-content: space-between;
    border: 0;
    padding: .2rem 1.3rem;

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
			// border-bottom: 0.1rem solid transparent;
			// position: relative;
			// flex-basis: 5rem;
			text-align: center;
			// height: 2.1rem;
			// margin-right: 1rem;
			padding: 0;
			// line-height: 2.1rem;
			flex-shrink: 0;
			display: flex;
			position: relative;
			padding: 0.5rem 0;
			a {
				// height: 2.1rem;
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
			// border-bottom-color: #e93b3d;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 1.8rem;
				height: 0.3rem;
				transform: translate(-50%, 0);
				background: linear-gradient(89deg, #e53216 0%, #fc6952 100%);
			}
			a {
				color: rgba(22, 22, 22, 1);
			}
			.sort-img {
				// color: #e93b3d;
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
		top: 7.82rem;
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
		padding: 0 3.9rem;
		padding-top: 1.9rem;
		text-align: center;
		z-index: 10;

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
.storelist-body {
	padding: 0.6rem 1.3rem 0.86rem;
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
						font-size: 0.97rem;
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
						margin-top: 1.4rem;
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
