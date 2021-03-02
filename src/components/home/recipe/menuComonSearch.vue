<template>
	<div class="product-list-header" id="bar" :class="headerFixed == true ? 'isFixed product-list-header' : ''">
		<!-- :class="{ logo: from }" -->
		<!-- <div class="" v-if="from == 'home' && config"></div> -->
		<!-- <div class="slot iconfont" @click="$router.go(-1)" v-else>&#xe64f;</div>
		<img class="icon-back" v-if="keyword != ''" src="../../../assets/image/icon2/icon-back.png" @click="$router.go(-1)" /> -->
		<img class="icon-back" v-if="from !== 'home' && config" src="../../../assets/image/icon2/icon-back.png" @click="$router.go(-1)" />
		<div class="common-search">
			<input
				v-if="from !== 'home' && config"
				style="background-color: rgba(246, 246, 246, 1);"
				:class="headerFixed == true || keyword != '' ? 'input-bg' : ''"
				type="text"
				placeholder="请输入您要搜索的商品"
				readonly="true"
				autocomplete="off"
				v-model="keyword"
				@click="onSearch"
			/>
			<input
				v-else
				:class="headerFixed == true || keyword != '' ? 'input-bg' : ''"
				type="text"
				placeholder="请输入您要搜索的商品"
				readonly="true"
				autocomplete="off"
				v-model="keyword"
				@click="onSearch"
			/>
		</div>
		<div v-if="keyword != ''"><!-- 占位 --></div>
		<div class="rignt-button-wrapper" v-if="from == 'home' && config">
			<!-- <div class="status-img status-img1" @click="goCart">
				<img src="../../../assets/image/icon2/shopping-cart.png" />
				
				<img v-if="headerFixed == false" src="../../../assets/image/icon2/shopping-cart.png" />
				<img v-else src="../../../assets/image/icon2/shopping-cart2.png" />
			</div>
			<div class="status-img status-img2"  @click="$router.push({name:'HomeScan'})">
				<img src="../../../assets/image/icon2/scan.png" />
				
				<img v-if="headerFixed == false" src="../../../assets/image/icon2/scan.png" />
				<img v-else src="../../../assets/image/icon2/icon-scan2.png" />
			</div> -->
			<div class="right iconfont" @click="popupMore">
				&#xe680;
				<div v-if="showDot" class="dot"></div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex';
import { getChatCount } from '../../../api/memberChat';
import HeaderMore2 from '../../HeaderMore2';
export default {
	name: 'HomeCommonSearch',
	components: {
		HeaderMore2
	},
	props: ['value', 'from'],
	watch: {
		value: function(value) {
			if (value) {
				this.keyword = value;
			}
		}
	},
	data() {
		return {
			keyword: this.value ? this.value : '', // 关键字
			popupVisible: false,
			showDot: false,
			headerFixed: false
		};
	},
	mounted() {
		this.headerFixed = false;
		window.addEventListener('scroll', this.handleScroll, true);
	},
	created: function() {
		if (this.isOnline) {
			getChatCount().then(res => {
				// console.log(res);
				if (res.result) {
					this.showDot['chat'] = true;
				}
			});
		}
	},
	computed: {
		...mapState({
			config: state => state.config.config,
			isOnline: state => state.member.isOnline
		})
	},
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

		onSearch() {
			this.$router.push({ name: 'MenuSearch'});
		},
		popupMore() {
			if (!this.popupVisible) {
				this.popupVisible = true;
			} else {
				this.popupVisible = false;
			}
		},
		// 购物车
		// goCart() {
		// 	if (this.isOnline) {
		// 		this.$router.push({ name: 'HomeCart', params: { type: 0 } });
		// 	} else {
		// 		this.$router.push({ name: 'HomeMemberLogin' });
		// 	}
		// },

		// 切换 黑色下拉框
		changePopupVisible ( v ){
			this.popupVisible = v;
		}
	}
};
</script>

<style scoped lang="scss">
.dot {
	position: absolute;
	width: 0.5rem;
	height: 0.5rem;
	background: red;
	border-radius: 50%;
	top: 0.2rem;
	right: 0;
}
// .product-list-header.logo {
// 	.slot {
// 		width: 2.5rem;
// 		text-align: center;
// 		line-height: 1.6rem;
// 		img {
// 			max-height: 100%;
// 			max-width: 100%;
// 		}
// 	}
// 	.common-search {
// 		// padding: 0.35rem 0.3rem 0.35rem 0.3rem;
// 	}
// }
.isFixed {
	position: fixed;
	// top: 10px; //自己根据需求设定
	top: 0; //自己根据需求设定
	z-index: 999;
	background-color: #fff;
	// background-color: #ea4e3a;
	width: 100%;
	box-sizing: border-box;
}
.product-list-header {
	display: flex;
	height: 3.82rem;
	padding: 0 1.04rem;
	// padding: 0.64rem 0;
	// padding: 0.25rem;
	justify-content: space-around;
	align-items: center;
	// border-bottom: 1px solid #f5f5f5;
	// background: #fff;
	.slot {
		width: 1.6rem;
		font-size: 0.8rem;
	}
	.icon-back {
		width: 1.74rem;
		height: 1.74rem;
		margin-right: 1.3rem;
	}
	.rignt-button-wrapper {
		display: flex;
		.status-img {
			img {
				width: 1.56rem;
				height: 1.56rem;
			}
		}
		.status-img1 {
			margin-right: 1.26rem;
			margin-left: 1.3rem;
		}
		.status-img2 {
			margin-right: 0.65rem;
		}
	}
}
.common-search {
	flex: 1;
	// padding: 0.35rem 0.3rem 0.35rem 0;
}
.common-search input {
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
.input-bg {
	// background-color: #f3f3f3 !important;
}
.right {
	width: 2.6rem;
	height: 1.6rem;
	text-align: center;
	line-height: 1.6rem;
	position: relative;
	font-size: 18px;
	color: #fff;
}
</style>
