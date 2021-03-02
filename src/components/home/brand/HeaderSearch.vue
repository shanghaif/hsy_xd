<template>
<div class="brand_h_search">
	<!-- 头部标题 返回按钮 -->
	<div class="header">
		<div class="header_cont">
			<!-- <img class="header-left" @click="$router.push( { name:'HomeBrand' } )" src="@/assets/image/brand/h5_back.png" alt="" /> -->
			<img class="header-left" @click="$router.go( -1 )" src="@/assets/image/brand/h5_back.png" alt="" />
			<span class="header-title">{{title}}</span>
			<!-- <img class="img-back" @click="$router.push({name:'HomeBrandSearch'})" src="@/assets/image/brand/h5_search.png" alt="" /> -->
			<span class="header-right"></span>
			<!-- <img class="img-search" src="@/assets/image/icon2/icon-white-search.png" alt="" /> -->
		</div>
	</div>
	<div class="product-list-header">
		<div class="common-search"><input type="text" :placeholder="place" autocomplete="off" v-model="keywords" /></div>
		<div class="right" @click="fun_disabled" v-if="ifKeywords">取消</div>
		<div class="right" @click="search(keywords)" v-else>搜索</div>
	</div>

</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapMutations } from 'vuex';

export default {
	data() {
		return {
			keywords: this.keyword ? this.keyword : '',
			currenKeywords: this.utils.fetch('brandkeyword'),
			previous : null,
		};
	},
	props: ['keyword','title','place'],
	computed: {
		ifKeywords() {
			if (this.keywords === '') {
				return true;
			} else {
				return false;
			}
		}
	},
	watch:{
		keywords:function(v){
			if(!v){
				this.$emit("postcurrenKeywords",this.keywords)
			}
		}
	},
	methods: {
		...mapMutations({
			changeKey: 'changeKey'
		}),
		fun_disabled(){
			// console.log("你好");
			this.$emit("postcurrenKeywords",this.keywords);
		},
		// 分类列表进入到搜索，完成后跳转到商品列表页面
		search(value) {
			let now = new Date().getTime();
      if ( this.previous + 680 <= now ) {
				if (value.replace(/\s+/g, '').length <= 0) {
					Toast('请输入您要搜索的关键字');
					return false;
				} else {
					this.keywords = value;
				}
				if (value) {
					for(var i=0;i<this.currenKeywords.length;i++){
						if( value == this.currenKeywords[i] ){
							this.currenKeywords.splice(i,1);
						}
					}
					this.currenKeywords.push(value);
					let data = this.utils.arrayFilter(this.currenKeywords);
					this.utils.save('brandkeyword', data);
				}
				
        this.previous = now;
				this.$emit("postKeyword",this.keywords)
			}
			// this.$router.push({
			// 	name: 'HomeGoodslist',
			// 	query: { keywords: this.keywords }
			// });
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
.brand_h_search{
	
    // 头部标题 返回按钮
	.header {
    // 字体 大
    @mixin fs_big{
      font-size: 4.88vw;
    }
    $imgWidth: 5.336vw;

    height: 10.5vw;
		.header_cont{
			display: flex;
			justify-content: space-between;
			padding: 2.8128vw 3.6564vw;
			align-items: center;
			.header-left {
				width: $imgWidth;
				height: $imgWidth;
			}
			.header-title {
        font-size: 4.8267vw;
        // @include fs_big;
				// font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
        font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2A303C;
			}
			.header-right {
				width: $imgWidth;
				height: $imgWidth;
        display: block;
			}
		}
	}

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
		height: 3.6rem;
		border-radius: 1.73rem;
		background: rgba(243,243,243,1) url(../../../assets/image/icon2/search.png) no-repeat 2.17rem center;
		background-size: 1.13rem;
		font-size: 1.13rem;
		color: rgba(22, 22, 22, 1);
		padding-left: 3.99rem;
		border: 0;
		font-family:PingFangSC-Regular,PingFang SC;
		
		&::-webkit-input-placeholder {
			color:rgba(183,183,183,1);
		}
		
	}
	.right {
		margin-left: 1.3rem;
		font-size: 1.21rem;
		flex-shrink: 0;
		font-size:1.21rem;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(183,183,183,1);
	}
}
</style>
