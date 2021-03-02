<!-- DetailHeader.vue -->
<template>
	<div>
		<div class="ui-detail-header">
			<!-- <span class="iconfont" @click="$router.go(-1)">&#xe6ee;</span> -->
			<img class="back-img" @click="$router.go(-1)" src="@/assets/image/icon2/icon-back.png" alt="" />
			<div class="navbar-wrapper">
				<div v-for="(item, key) in data" :key="key" v-bind:class="{ navbar_active: key == index }" v-on:click="changeEvent(key)">{{ item.name }}</div>
			</div>
			<!-- <span class="iconfont right" @click="popupMore">
				&#xe680;
				<div v-if="showDot" class="dot"></div>
			</span> -->
			<span>
				<img class="right-img" @click="popupMore" src="@/assets/image/icon2/icon-ellipsis-black.png" alt="">
				<div v-if="showDot" class="dot"></div>
			</span>
		</div>
		<header-more2 :goods_id="goods_id" @change-popupVisible="changePopupVisible" :share_info="share_config" v-show="popupVisible" :showDot="showDot"></header-more2>
	</div>
</template>

<script>
import { header } from './static';
import { getChatCount } from '../../../api/memberChat';
import { mapState, mapMutations } from 'vuex';
import HeaderMore2 from '../../HeaderMore2';
export default {
	data() {
		return {
			share_config: false,
			data: header,
			popupVisible: false,
			showDot: false
		};
	},
	components: {
		HeaderMore2
	},
	computed: {
		...mapState({
			detailInfo: state => state.goodsdetail.detailInfo,
			goods_id: state => state.goodsdetail.currentProductId,
			index: state => state.goodsdetail.index,
			isOnline: state => state.member.isOnline
		})
	},
	created() {
		this.changeIndex(0);
		this.saveNumber(1);
		if (this.isOnline) {
			getChatCount().then(res => {
				if (res.result) {
					this.showDot['chat'] = true;
				}
			});
		}
	},
	methods: {
		...mapMutations({
			changeIndex: 'changeIndex',
			saveNumber: 'saveNumber'
		}),
		popupMore() {
			if (!this.popupVisible) {
				this.popupVisible = true;
			} else {
				this.popupVisible = false;
			}
		},
		changeEvent(index) {
			this.changeIndex(index);
		},
		goBack() {
			this.$router.go(-1);
		},

		// 切换 黑色下拉框
		changePopupVisible(v) {
			this.popupVisible = v;
		}
	},
	watch: {
		detailInfo: function(val) {
			if (val) {
				this.share_config = { title: val.goods_name, link: window.location.href, imgUrl: val.photos[0], desc: val.goods_advword };
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.dot {
	position: absolute;
	width: 0.5rem;
	height: 0.5rem;
	background: red;
	border-radius: 50%;
	top: 0.2rem;
	right: 0;
}
.ui-detail-header {
	// padding: 0 0.45rem;
	// height:3.2rem;
	padding: 0 1.43rem;
	background: rgba(255, 255, 255, 1);
	// border-bottom: 1px solid rgba(232, 234, 237, 1);
	color: #161616;
	font-size: 1.24rem;
	font-weight: 400;
	width: auto;
	height: 4.29rem;
	display: flex;
	justify-content: space-between;
	// align-content: center;
	align-items: center;
	flex-basis: auto;
	position: absolute;
	border: 0;
	top: 0;
	left: 0;
	right: 0;
	// .iconfont {
	// 	width: 1.2rem;
	// 	font-size:0.7rem;
	// 	height: 1.2rem;
	// 	line-height:1.2rem;
	// 	cursor: pointer;
	// 	position: absolute;
	// 	left: 0.45rem;
	// 	top: 0.5rem;
	// }
	// .iconfont.right{left:auto;right:0.45rem}
	img.back-img {
		width: 1.9rem;
		height: 1.9rem;
	}
	img.right-img {
		width: 1.9rem;
		height: 0.38rem;
	}
	div.navbar-wrapper {
		line-height: 4.29rem;
		div {
			// line-height: 2.1rem;
			border-bottom: 0;
			display: inline-block;
			margin-right: 1.62rem;
			color: #55595f;
			background-color: #fff;
			&.navbar_active {
				color: #E53216;
				border-bottom: 0.19rem solid #E53216;
			}
			&:last-child {
				margin-right: 0;
			}
			&:focus {
				outline: none;
			}
		}
	}
}
</style>
