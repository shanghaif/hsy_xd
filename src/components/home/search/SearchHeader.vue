<template>
	<div class="product-list-header">
		<!-- <div class="" @click="$router.go(-1)"></div> -->
		<img @click="$router.go(-1)" src="../../../assets/image/icon2/icon-back.png" alt="" />
		<div class="common-search"><input type="text" placeholder="请输入您要搜索的商品" autocomplete="off" v-model="keywords" /></div>
		<div class="right" @click="$router.go(-1)" v-if="ifKeywords">取消</div>
		<div class="right" @click="search(keywords)" v-else>搜索</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapMutations } from 'vuex';

export default {
	data() {
		return {
			keywords: this.keyword ? this.keyword : '',
			// currenKeywords: this.utils.fetch('keyword')
			currenKeywords: '',
			currenKeywords1: ''
		};
	},
	props: ['keyword'],
	computed: {
		ifKeywords() {
			if (this.keywords === '') {
				return true;
			} else {
				return false;
			}
		}
	},
	created() {
		if(this.$route.params.isFromStore) {
			this.currenKeywords1 = this.utils.fetch('storeKeyword')
		} else {
			this.currenKeywords = this.utils.fetch('keyword')
		}
		console.log(this.$route.params.isFromStore,'zi')
	},
	methods: {
		...mapMutations({
			changeKey: 'changeKey'
		}),
		// 分类列表进入到搜索，完成后跳转到商品列表页面
		search(value) {
			if (value.replace(/\s+/g, '').length <= 0) {
				Toast('请输入您要搜索的关键字');
				return false;
			} else {
				this.keywords = value;
			}
			if (value) {
				if(this.$route.params.isFromStore) {
					this.currenKeywords1.push(value);
					let data = this.utils.arrayFilter(this.currenKeywords1);
					this.utils.save('storeKeyword', data);
				}else{
					this.currenKeywords.push(value);
					let data = this.utils.arrayFilter(this.currenKeywords);
					this.utils.save('keyword', data);
				}
			}
			console.log(this.$route.params.isFromStore,'this.$route.params.isFromStore')
			if (this.$route.params.isFromStore) {
				this.$router.push({
					name: 'HomeStoreGoodslist',
					query: { keyword: this.keywords,id:this.$route.params.id }
				});
				console.log(this.keyword,'接受父的值')
			} else {
				this.$router.push({
					name: 'HomeGoodslist',
					query: { keywords: this.keywords }
				});
			}
		},

		// 取消返回上一级
		cancel() {
			this.clear();
			let isFromHome = this.$route.params.isFromHome;
			if (isFromHome) {
				this.$router.go(-1);
			} else {
				this.$router.push({ name: 'category' });
			}
		},

		clear() {
			this.keywords = '';
			this.changeKey(this.keywords);
		}
	}
};
</script>

<style scoped lang="scss">
.product-list-header {
	display: flex;
	// height: 2rem;
	padding: 0.56rem 1.3rem;
	justify-content: space-between;
	align-items: center;
	// border-bottom: 1px solid #f5f5f5;
	background: #fff;
	// .slot {
	// 	width: 1.6rem;
	// 	font-size: 0.8rem;
	// }
	img {
		width: 1.74rem;
		height: 1.74rem;
		margin-right: 1.3rem;
	}
}
.common-search {
	flex: 1;
	// padding: 0.35rem 0.3rem 0.35rem 0;
}
.common-search input {
	box-sizing: border-box;
	width: 100%;
	height: 2.6rem;
	border-radius: 1.73rem;
	background: rgba(243, 243, 243, 1) url(../../../assets/image/icon2/search.png) no-repeat 2.17rem center;
	background-size: 1.13rem;
	font-size: 1.13rem;
	color: rgba(22, 22, 22, 1);
	padding-left: 3.99rem;
	border: 0;
	font-family: PingFangSC-Regular, PingFang SC;

	&::-webkit-input-placeholder {
		color: rgba(183, 183, 183, 1);
	}
}
.right {
	margin-left: 1.3rem;
	font-size: 1.21rem;
	flex-shrink: 0;
	font-size: 1.21rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(183, 183, 183, 1);
}
</style>
