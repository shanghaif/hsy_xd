<template>
	<div class="container">
		<head-title :title="article_type_name"></head-title>
		<div class="flex-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<ul class="article-class">
				<li v-for="item in articleList" v-bind:key="item.article_id" @click="goArticleDetail(item)"><span>{{ item.article_title }}</span><img src="@/assets/image/icon2/icon-right.png" alt="" /></li>
			</ul>
			<EmptyRecord2 v-if="articleList.length <= 0 && !isMore" isFrom="content"></EmptyRecord2>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import EmptyRecord2 from '../../EmptyRecord2';
import { Toast, Indicator } from 'mint-ui';
import { getArticleList } from '../../../api/homeArticle';
export default {
	name: 'ArticleList',
	components: {
		EmptyRecord2,
		"head-title":HeadTitle
	},
	data() {
		return {
			article_type_name: '',
			ac_id: this.$route.query.ac_id ? this.$route.query.ac_id : '', // 文章分类ID
			articleList: [],
			
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true // 是否有更多
		};
	},
	created(){
		this.getArticleList();
	},
	mounted() {
		resetRem()
	},
	beforeDestroy() {
		resumeRem()
	},
	methods: {
		loadMore() {
			// this.loading = true;
			// this.params.page = ++this.params.page;
			// if (this.isMore) {
			// 	this.loading = false;
			// 	this.getArticleList(true);
			// }
		},
		getArticleList() {
			Indicator.open();
			getArticleList(this.params, this.ac_id)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					if (this.articleList) {
						this.articleList = this.articleList.concat(res.result.article_list);
					} else {
						this.articleList = res.result.article_list;
					}
					this.article_type_name = (res.result.article_type_name=="市场监管局工作动态")?"热门资讯":res.result.article_type_name;
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},
		goArticleDetail(item) {
			this.$router.push({ name: 'HomeArticledetail', query: { article_id: item.article_id } });
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-wrapper {
	margin-top: 1rem;
}
.article-class li {
	/* width: 96%; */
	padding: 1.2rem 1.43rem;
	/* line-height: 2rem; */
	/* height: 2rem; */
	background: #fff;
	// border-bottom: 1px dotted #ded6c9;
	/* font-size: 0.8rem; */
	font-size: 1.34rem;
	font-weight: 400;
	color: #161616;
	display: flex;
	justify-content: space-between;
	position: relative;
	img {
		width: 1.34rem;
		height: 1.34rem;
	}
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		height: 1px;
		width: 96.2%;
		background-color: rgba(239, 239, 239, 1);
	}
}
</style>
