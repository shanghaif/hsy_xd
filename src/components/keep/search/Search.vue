<template>
	<div class="search-wrapper">
		<search-header ref="header" :keyword="keywords"  :storeGoods="$route.params.storeGoods"></search-header>
		<div class="search-body">
			<div class="list current-search" v-if="currenKeywords.length > 0">
				<div class="list-header">
					<span>搜索历史</span>
					<img src="../../../assets/image/icon2/icon-del.png" v-on:click="deleteCurrent()" />
				</div>
				<ul>
					<li class="item" v-for="(item, index) in currenKeywords" v-on:click="getKey(item)" :key="index">{{ item }}</li>
				</ul>
			</div>

			<div class="list hot-wrapper" v-if="hotKeywords[0] !== ''">
				<div class="list-header"><span>热门搜索</span></div>
				<ul>
					<li class="item" v-for="(item, index) in hotKeywords" :key="index" v-on:click="getKey(item)">{{ item }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import searchHeader from './SearchHeader';
import { searchKeywordList } from '../../../api/homesearch';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			hotKeywords: [],
			currenKeywords: [],
			keywords: this.$store.state.homesearch.currentKey ? this.$store.state.homesearch.currentKey : ''
		};
	},
	components: {
		searchHeader
	},
	computed: {
		...mapState({
			currentKey: state => state.homesearch.currentKey
		})
	},
	mounted() {
		resetRem()
	},
	created() {
		console.log(this.$route.params.storeGoods)
		this.getHotKeywords();
		this.getCurrentKey();
	},
	beforeDestroy: function() {
		resumeRem()
	},
	methods: {
		...mapMutations({
			changeKey: 'changeKey'
		}),

		getHotKeywords() {
			searchKeywordList().then(res => {
				this.hotKeywords = Object.assign([], res.result.list, this.hotKeywords);
			});
		},

		getKey(item) {
			if (item.content) {
				this.keywords = item.content;
			} else {
				this.keywords = item;
			}
			this.changeKey(this.keywords);
			this.$refs.header.search(this.keywords);
		},

		deleteCurrent() {
			if(this.$route.params.isFromStore) {
				this.utils.save('storeKeyword', []);
				this.currenKeywords = this.utils.fetch('storeKeyword');
			}else {
				this.utils.save('keyword', []);
				this.currenKeywords = this.utils.fetch('keyword');
			}
			
		},

		getCurrentKey() {
			if(this.$route.params.isFromStore) {
				this.currenKeywords = this.utils.fetch('storeKeyword');
			}else {
				this.currenKeywords = this.utils.fetch('keyword');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.search-wrapper {
	height: auto;
	width: auto;
	.search-body {
		padding: 1.3rem;
		div.list {
			margin-bottom: 1.5rem;
			.list-header {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				span {
					color: #333;
					font-size: 0.7rem;
					// background: url('../../../assets/image/home/home-search-history.png') no-repeat left center;
					// background-size: 0.8rem;
					// padding-left: 1.25rem;
					font-size:1.39rem;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(22,22,22,1);
					align-self: flex-end;
				}
				img {
					width: 1.13rem;
					height: 1.13rem;
					cursor: pointer;
				}
			}
			ul {
				display: flex;
				padding-top: 1.13rem;
				flex-wrap: wrap;
				li {
					padding: 0.45rem 1.3rem;
					background-color: rgba(244, 245, 247, 1);
					border-radius: 1.95rem;
					color: #333;
					font-size: 0.6rem;font-size: 1.3rem;
					margin-right: 1.3rem;
					margin-bottom: 1.3rem;
					cursor: pointer;
				}
			}
		}
		div.hot-wrapper {
			.list-header {
				span {
					background: url('../../../assets/image/home/home-search-hot.png') no-repeat left center;
					background-size: 1.13rem;
				}
			}
		}
	}
}
</style>
