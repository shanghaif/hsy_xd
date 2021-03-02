<template>
	<div class="category">
		<!-- <div class="common-header-wrap">
			<mt-header class="common-header" title="全部商品"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="top">
			<div class="head-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<!-- <home-common-search2 :value="params.keyword"></home-common-search2> -->
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
					<span>{{ store.is_favorate ? '已收藏' : '收藏' }}</span>
				</div>
			</div>
		</div>
		<mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup">
			<img v-if="store.business_licence_number_electronic" :src="store.business_licence_number_electronic" />
			<img v-if="store.is_platform_store && config.business_licence" :src="config.business_licence" />
		</mt-popup>
		<goodsclass-body :store_id="store_id"></goodsclass-body>
		<header-more3 v-show="popupVisible" :store="store"
			@change-popupVisible="changePopupVisible" :showDot="showDot"></header-more3>
		<!-- <header-more3 v-show="popupVisible" :showDot="showDot"></header-more3> -->
		<common-store-footer :store_id="store_id"></common-store-footer>
	</div>
</template>

<script>
// import HomeCommonSearch2 from '../common/HomeCommonSearch'
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
import { getStoreInfo } from '../../../api/homestoredetail';
import CommonStoreFooter from '../common/CommonStoreFooter';
import GoodsclassBody from './GoodsclassBody';
import { resetRem, resumeRem } from '@/util/rem';
import HeaderMore3 from '../../HeaderMoreSty';
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite';
import { isWechat } from '../../../util/wechat'
export default {
	name: 'HomeGoodsclass',
	data() {
		return {
			keyword: '',
			// params: {
			//   keyword: this.$route.query.keywords ? this.$route.query.keywords : ''
			// },
			store_id: this.$route.query.id ? this.$route.query.id : '',
			popupVisible: false, // 弹出更多
			showDot: false,
			qrcodeurl: '',
			imageVisible:false,
			store: {
				store_id: this.$route.query.id ? this.$route.query.id : ''
			},
			heartWhite: require('@/assets/image/icon2/icon-heart-white.png'),
			heart: require('@/assets/image/icon2/icon-heart-transparent2.png')
		};
	},
	components: {
		CommonStoreFooter,
		GoodsclassBody,
		HeaderMore3,
		// HomeCommonSearch2
	},
	created() {
		this.loading()
	},
	mounted() {
		resetRem();
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
			config: state => state.config.config
		})
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		loading() {
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
			// 查询接口
			getStoreInfo(terminal_id,this.store.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
				.then(res => {
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
				})
				.catch(function(error) {});
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
		

		// 切换 黑色下拉框
		changePopupVisible ( v ){
			this.popupVisible = v;
		}
	}
};
</script>

<style scoped lang="scss">
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
			width: 17rem;
			padding: 0.9rem 0 0.8rem 0.62rem;
			.store_name {
				font-size: 1.34rem;
				font-weight: 500;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
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
			width: 5.4rem;
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
			// margin-right: 0.67rem;
			margin-left: 0.43rem;
			width: 5.2rem;
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
.product-list-header {
	display: flex;
	height: 2rem;
	padding: 0 0.25rem;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #f5f5f5;
	background: #fff;
	.slot {
		width: 1.6rem;
		font-size: 0.8rem;
	}
}
.common-search {
	flex: 1;
	padding: 0.4rem 0.6rem 0.4rem 0;
}
.common-search input {
	box-sizing: border-box;
	width: 100%;
	height: 1.6rem;
	line-height: 1.6rem;
	border-radius: 0.2rem;
	background: #ededed;
	background-size: 0.55rem;
	font-size: 0.7rem;
	color: #999;
	border: 0;
	padding-left: 0.5rem;
}
.buttom {
	width: 2.6rem;
	height: 1.6rem;
}
.middle-popup {
	width: 80%;
}
.middle-popup img {
	max-width: 100%;
}
</style>
