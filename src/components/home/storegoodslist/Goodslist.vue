<template>
	<div style="overflow-x: hidden;">
		<!-- <div class="common-header-wrap">
        <mt-header class="common-header" title="可选商品">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div> -->
		<div class="top">
			<div class="head-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<input type="text" @click="onSearch" placeholder="请输入关键词" autocomplete="off" v-model="keyword">
				<!-- <span class="search" @click="search">搜索</span> -->
				<div class="header-right" @click="popupMore">
					<span></span>
					<span></span>
					<span></span>
					<div v-if="showDot" class="dot"></div>
				</div>
			</div>
			<div class="store-info">
				<img :src="store.store_avatar" alt="" class="avatar" />
				<div class="store-info-content">
					<div class="store_name">{{ store.store_name }}</div>
					<div class="follow_number">{{ store.store_collect }}人收藏店铺</div>
				</div>
				<div class="license" v-if="(store.is_platform_store && config.business_licence) || store.business_licence_number_electronic" @click="imageVisible = true">
					<!-- <i class="iconfont">&#xe621;</i> -->
					<img src="@/assets/image/icon2/icon-license.png" alt="" />
					<span>营业执照</span>
				</div>
				<div class="follow_panel" @click="toggleFavorite">
					<img :src="store.is_favorate ? heartWhite : heart" alt="" />
					<!-- <i class="iconfont" :class="{ active: store.is_favorate }" v-html="favoriteIco"></i> -->
					<span>{{ store.is_favorate ? '已关注' : '关注' }}</span>
				</div>
			</div>
		</div>
		<!-- <div class="common-search">
            <input type="text" placeholder="搜索店铺商品" readonly="true" autocomplete="off" v-model="params.keyword" @click="$router.push({name:'HomeStoreGoodsclass',query:{id:store_id}})">
        </div> -->
		<goodslist-body ref='keySearch'  :items="rec_goods_list" ></goodslist-body>
		<common-store-footer :store_id="store.store_id"></common-store-footer>
		<mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup">
			<img v-if="store.business_licence_number_electronic" :src="store.business_licence_number_electronic" />
			<img v-if="store.is_platform_store && config.business_licence" :src="config.business_licence" />
		</mt-popup>
		<header-more3 v-show="popupVisible"
		:store="store"
			@change-popupVisible="changePopupVisible" :showDot="showDot"></header-more3>
		<!-- <header-more3 v-show="popupVisible" :showDot="showDot"></header-more3> -->
	</div>
</template>

<script>
// import HomeCommonSearch from '../common/HomeCommonSearch'
import CommonStoreFooter from '../common/CommonStoreFooter';
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
import { getStoreInfo} from '../../../api/homestoredetail';
import GoodslistBody from './GoodslistBody';
import HeaderMore3 from '../../HeaderMoreSty';
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite';
import { resetRem, resumeRem } from '@/util/rem';


import { isWechat } from '../../../util/wechat'

export default {
	name: 'StoreGoodslist',
	components: {
		HeaderMore3,
		CommonStoreFooter,
		GoodslistBody,
		// HomeCommonSearch
	},
	data() {
		return {
			keyword: '',
			imageVisible: false,
			store: {
				store_id: this.$route.query.id ? this.$route.query.id : ''
			},
			qrcodeurl: '',
			params: {
				keyword: this.$route.query.keyword ? this.$route.query.keyword : ''
			},
			popupVisible: false, // 弹出更多
			showDot: false,
			rec_goods_list: false,
			heartWhite:require('@/assets/image/icon2/icon-heart-white.png') ,
			heart:require('@/assets/image/icon2/icon-heart-transparent2.png') 
			
		};
	},
	computed: {
		...mapState({
			areaId: state => state.member.area_id, //member数据，用于查看商品信息
			sellerInfo: state => state.seller.info, //seller数据，用于查看商品信息
			tuan: state => state.member.tuan, //社区团
			extuan: state => state.member.extuan,
			memberInfo: state => state.member.info, //member数据，用于查看商品信息
			exid: state => state.member.exid,
			extuan: state => state.member.extuan,
			token: state => state.member.token,
			config: state => state.config.config,
			storeInfo: state => state.goodsdetail.storeInfo,
		})
		
	},
	created() {
		this.loading()
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods:{
		...mapMutations({
			saveStoreInfo:"saveStoreInfo", // 存储 当前 商家 信息
		}),
		loading() {
			// console.log(this.params,this.$route.query)
			// 初始化seller_id,member_id
			var seller_id = null,
				member_id = null,
				areaId = this.areaId,
				tuan = this.tuan;
			if (this.sellerInfo) {
				//有信息 赋值
				seller_id = this.sellerInfo.seller_id;
			}
			if (this.memberInfo) {
				//有信息 赋值
				member_id = this.memberInfo.member_id;
			}
			if (this.exid) {
				areaId = this.exid;
			}
			if (this.extuan) {
				tuan = this.extuan;
			}
			
			// terminal_id 终端id，1APP 2公众号 3h5
			var terminal_id = 3;
			if( isWechat() ){
				terminal_id = 2;
			}else if( window.plus ){
				terminal_id = 1;
			}
			// console.log(terminal_id);
			// 查询接口
			// debugger
			getStoreInfo(terminal_id,this.store.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
				.then(res => {
					this.saveStoreInfo(res.result.store_info);
					this.qrcodeurl = env.SITE_URL + '/home/qrcode?url=' + encodeURIComponent(env.H5_HOST + '/home/storedetail?id=' + this.store.store_id);
					this.store = res.result.store_info;
					this.rec_goods_list = res.result.rec_goods_list;
					if (this.store.is_platform_store) {
						this.fetchConfig({}).then(
							response => {},
							error => {
								Toast(error.message);
							}
						);
					}
				}).catch(function(error) {});
		},
		// 弹出更多
		popupMore() {
			if (!this.popupVisible) {
				this.popupVisible = true;
			} else {
				this.popupVisible = false;
			}
		},
		toggleFavorite() {
			if (!this.store.is_favorate) {
				addFavoriteStore(this.store.store_id).then(
					response => {
						Toast(response.message);
						this.store.is_favorate = !this.store.is_favorate;
						this.store.store_collect += 1;
					},
					error => {
						Toast(error.message);
					}
				);
			} else {
				delFavoriteStore(this.store.store_id).then(
					response => {
						Toast(response.message);
						this.store.is_favorate = !this.store.is_favorate;
						this.store.store_collect -= 1;
					},
					error => {
						Toast(error.message);
					}
				);
			}
		},
		// search () {
		//   // this.$router.push({ 'name': 'HomeStoreGoodslist', 'query': { id: this.$route.query.id, keyword: this.keyword } })
		//   this.$refs.keySearch.Search(this.keyword)
		//   this.utils.save('goodsSearch',this.keyword)
		// },
		onSearch() {
			this.$router.push({ name: 'HomeSearch', params: { isFromStore: true,id:this.$route.query.id } });
		},
		// 切换 黑色下拉框
		changePopupVisible ( v ){
			this.popupVisible = v;
		}
		
	}
};
</script>

<style scoped lang="scss">
// .common-search {
// 	padding: 0.4rem 0.6rem;
// }
// .common-search input {
// 	box-sizing: border-box;
// 	width: 100%;
// 	height: 1.6rem;
// 	border-radius: 0.2rem;
// 	background: #ededed url(../../../assets/image/home/icon_search.png) no-repeat 0.6rem center;
// 	background-size: 0.55rem;
// 	font-size: 0.7rem;
// 	color: #999;
// 	padding-left: 1.65rem;
// 	border: 0;
// }

.top {
	padding-bottom: 0.91rem;
	background-color: rgba(98, 103, 113, 1);
	.head-wrap {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1.24rem 1.43rem;
		img {
			width: 1.91rem;
			height: 1.91rem;
		}
		.header-right {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// width: 1.54rem;
			span {
				width: 0.39rem;
				height: 0.39rem;
				margin-left: 0.39rem;
				border-radius: 50%;
				background-color: #fff;
			}
		}
		span.search {
			width: 4rem;
			margin-right: 1rem;
			color: #fff;
		}
	}
	.store-info {
		display: flex;
		align-items: center;
		color: #ffffff;
		margin-bottom: 0.91rem;
		font-weight: 400;
		.avatar {
			margin-left: 1.43rem;
			width: 5.72rem;
			height: 5.72rem;
			border-radius: 0.77rem;
		}
		.store-info-content {
			display: flex;
			flex-direction: column;
			padding: 0.9rem 0 0.8rem 0.62rem;
			.store_name {
				font-size: 1.34rem;
				font-weight: 500;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
			.follow_number {
				margin-top: 0.53rem;
				font-size: 1.15rem;
			}
		}
		.license {
			margin-left: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-shrink: 0;
			img {
				width: 1.81rem;
				height: 1.43rem;
			}
			span {
				margin-top: 0.48rem;
				font-size: 1.05rem;
			}
		}
		.follow_panel {
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-right: 0.67rem;
			margin-left: 0.43rem;
			width: 5.2rem;
			flex-shrink: 0;
			img {
				width: 1.45rem;
				height: 1.45rem;
			}
			span {
				margin-top: 0.48rem;
				font-size: 1.05rem;
			}
		}
	}
}
.middle-popup {
	width: 80%;
}
.middle-popup img {
	max-width: 100%;
}
.head-wrap input {
	margin: 0 1.48rem;
	box-sizing: border-box;
	width: 100%;
	// height: 1.6rem;
	height: 2.6rem;
	border-radius: 1.5rem;
	background: #fff url(../../../assets/image/icon2/search.png) no-repeat 2.17rem center;
	background-size: 1.13rem;
	// font-size: 0.7rem;
	font-size: 1.13rem;
	// font-size: 26px;
	color: rgba(183, 183, 183, 1);
	color: #999;
	padding-left: 3.99rem;
	border: 0;
	&::-webkit-input-placeholder {
		color:rgba(183,183,183,1);
	}
}
</style>
