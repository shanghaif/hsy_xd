<template>
	<div class="statistics_charts">
		<!-- 头部 -->
		<head-title title="透明工程"></head-title>
				
		<!-- 上面搜索框 -->
		<div class="search">
			<ul>
				<li v-for="(v,i) in searchArr" :key="i"
					:class="{active:v.value == searchObj.type}"
					@click="fun_wake(v.value,i)"
					>
					<span>{{v.title}}</span>
					<img v-if="i == 3" class="s_r_drop" :src="require('../../../assets/image/icon2/icon-black-left.png')" alt="">
				</li>
			</ul>
		</div>
		
		<!-- 列表 -->
		<div class="brand_cont" v-show="showList">
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<!-- 无限加载滚动列表 -->
				<div class="flex-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<div class="ui-product-body" v-for="(item, index) in brandList" v-bind:key="index">
						<!-- <div class="ui-product-body" v-for="(item, index) in storeList" v-bind:key="index"> -->
						<!-- <div class="list-wrapper" @click="goDetail(item.store_id)"> -->
							
						<div class="list-wrapper1">
						<div>
							<p>{{item.store_name||"商家名称"}}</p>
							<img src="@/assets/image/keep-store.png" alt="">
							<span @click="confirm(item)" class="icon iconfont">&#xe6e1;</span>
							<span @click="confirm(item)">{{item.safety_name.safety_name||"指定安全员"}}</span>
							<p>营业执照：123485</p>
						</div>
						<div>
							<!-- <button v-if="item.joinin_state == 40"
								@click.stop="$router.push( { name: 'KeepStoreGoodslist', query:{ store_id : item.store_id}} )">商品</button>
							<button v-if="item.joinin_state == 10"
								@click.stop="$router.push( { name: 'KeepTesting', query:{ member_id : item.member_id}} )">审核</button>
							<button v-if="item.joinin_state == 40" 
								@click.stop="$router.push( { name: 'KeepJinhuo', query:{ sid : item.store_id}} )">台账</button> -->
							<button v-if="item.is_camer == 1"								
								@click="$router.push( { name:'KeepStoreLive',query:{ sid : item.store_id}} )">视频</button>
							<!-- <button v-if="item.complain == 1"
								@click="$router.push( { name:'KeepReportList',query:{ sid : item.store_id}} )">举报</button> -->
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
		</div>
		<empty-record2 isFrom="search" v-if="!showList"></empty-record2>


		<!--  -->
		<onw-drop-down 
			@pickOneDropDowncancel="cancelOneDropDown" 
			@pickOneDropDown="getOneDropDown" 
			showName='area_name'
			ref="sel_timeid" 
			:items="nowSelectArr"></onw-drop-down>
		<!-- 二级列表安全员 -->
      <second-select
        @onConfirm="getonConfirm"
        title="选择安全员"
				showName="area_name"
        v-if="safetyList.length>0" ref="secondselect" :items="safetyList"></second-select>
	</div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';
import { mapState } from 'vuex';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import OneDropDown from "../OneDropDown";
import SecondSelect from '../SecondSelect';

import { getStoreList, getStoreNearbyList } from '../../../apikeep/homesearch';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { keepSafetyXuanze, keepSafetyShenhe  } from '../../../apikeep/safety';
export default {
	name: 'StatisticsGeneral',
	components: {
		"head-title" : HeadTitle,
		"onw-drop-down" : OneDropDown,		
		EmptyRecord2,
		SecondSelect
	},
	
	computed: {
    ...mapState({
      keepInfo : state => state.keep.keepInfo,    // 获取 登录信息
    }),

  },
	data() {
		return {
			searchArr:[
				{ title:"学校", value: 10401 },
				{ title:"生产加工", value: 10101 },
				{ title:"餐饮", value: -1 },
			],

			nowSelectArr:[
				// { area_id: '', area_name: "全部区域" },
				// { area_id: 37172101, area_name: "曹城街道办事处" },
				// { area_id: 37172102, area_name: "庄寨镇" },
				// { area_id: 37172103, area_name: "普连集镇" },
				// { area_id: 37172104, area_name: "青堌集镇" },
				// { area_id: 37172105, area_name: "桃源镇" },
				// { area_id: 37172106, area_name: "韩集镇" },
				// { area_id: 37172107, area_name: "砖庙镇" },
				// { area_id: 37172108, area_name: "古营集镇" },
				// { area_id: 37172109, area_name: "魏湾镇" },
				// { area_id: 37172110, area_name: "侯集镇" },
				// { area_id: 37172111, area_name: "苏集镇" },
				// { area_id: 37172112, area_name: "孙老家镇" },
				// { area_id: 37172113, area_name: "阎店楼镇" },
				// { area_id: 37172114, area_name: "梁堤头镇" },
				// { area_id: 37172115, area_name: "安才楼镇" },
				// { area_id: 37172116, area_name: "邵庄镇" },
				// { area_id: 37172117, area_name: "王集镇" },
				// { area_id: 37172118, area_name: "青岗集镇" },
				// { area_id: 37172119, area_name: "常乐集镇" },
				// { area_id: 37172120, area_name: "倪集办事处" },
				// { area_id: 37172121, area_name: "楼庄镇" },
				// { area_id: 37172122, area_name: "郑庄办事处" },
				// { area_id: 37172123, area_name: "大集镇" },
				// { area_id: 37172124, area_name: "朱洪庙镇" },
				// { area_id: 37172125, area_name: "仵楼镇" },
				// { area_id: 37172127, area_name: "青菏办事处" },
				// { area_id: 37172126, area_name: "磐石办事处" },
			],
			

			// 搜索 条件
			searchObj:{
				type: 10401,
				areaId:'',
			},



			
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

	// 初始化 加载数据
	created() {
		(this.keepInfo.type && this.keepInfo.type == 1)?(
			this.searchArr.push(
				{ title:"全部区域", value: '4' }
			)
		):'';
		this.getOrderList(true);
		
		// 安全员列表
		keepSafetyXuanze().then(res=>{
			this.safetyList = res.result;
			this.nowSelectArr = res.result;
			this.nowSelectArr.unshift({ area_id: '', area_name: "全部区域" });
		}).catch(err=>{
			console.log(err);
		})
	},
	
	mounted() {
		resetRem();
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
		// 点击 下拉框
		fun_wake(v,index){
			// console.log(index);	
			index == 3?(
				this.$refs.sel_timeid.currentValue = true
			):(this.searchObj.type = +v,
			this.params.page = 1,
			this.brandList = [],this.getOrderList());
		},

		// 选中 当前 条件 去查询
		getOneDropDown(v){
			this.nowOneDropDownIndex = null;
			this.searchObj.areaId = v[0].area_id;
			this.searchArr[3].title = v[0].area_name;
			this.brandList = [];
			this.params.page = 1;
			this.getOrderList(true);
			return false;
		},

		// 取消
		cancelOneDropDown(){
			this.nowOneDropDownIndex = null;
		},

		
		// 加载数据
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(true);
			}
		},

		getOrderList(ispush) {

			getStoreList('', this.searchObj.type, this.keywords, 0, 0, '', this.params.page, '', this.searchObj.areaId,true)
				.then(res => {
					Indicator.close();
					this.showList = true;
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
          this.loading = false;  //  繁忙
          this.isMore = res.result.hasmore;  //  是否有更多数据
					// console.log(this.brandList);
				})
				.catch(err => {
					Toast(err.message);
					// console.log(err);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.statistics_charts{
	position: relative;
	top: 1px;
	height: 92vh;
	display: flex;
	flex-direction: column;

	.search{
		padding: 1.43rem;
		overflow: scroll;
		margin-top: -1px;
    padding: .5rem 0 1rem 1.43rem;
    overflow: scroll;
    // margin-top: -1px;
		ul{
			// color: #fff;
    	color: #A4ABB3;
			font-size: 1.43rem;
			width: max-content;
			li{
				display: inline-block;
				margin-right: 1.1rem;
				img{
					width: 1.5rem;
					height: 1.5rem;
					transform: rotate(-90deg);
					margin-left: .2rem;
				}

				.reverse{
					transform: rotate(90deg);
					transition: all .5s;
				}
			}
				.active{
					color: #2A303C;
					// transition: all .5s;
				}
		}
	}

	@mixin pos_fixed {
		position: fixed;
		top: 25vw;
		box-sizing: border-box;
	}
	
	$pmvw: 4vw;
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
		overflow: scroll;
		flex: 1;
		padding-bottom: 16vh;
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

	
			
			
			.list-wrapper1{
				margin: 1rem 0;
				width: 91%;
				/* height: 16.5rem; */
				padding: 1rem;
				background: #FFFFFF;
				-webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
				box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
				border-radius: .6rem;
				div{
					// padding-left: .6rem;
					position: relative;
					padding-left: 1.3rem;
					img{
						position: absolute;
						width: 1rem;
						left: 0;
						top: .2rem;
					}
					.icon{
						margin-right: .4rem;
					}
					p{
						margin-bottom: .8rem;
						&:first-child{
							font-size: 3.8vw;
							font-weight: 500;
						}
					}
					&:last-child{
						padding-left: 0;
						margin-top: 1rem;
						button{
							width: 4.7rem;
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
}
</style>
