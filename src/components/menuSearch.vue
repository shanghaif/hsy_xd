<template>
	<div class="search-wrapper">
		<menuSearchHeader ref="header" :keyword="keywords" @onChange='searchReturnInfo'></menuSearchHeader>
		<div class="search-body">
			<div class="list current-search" v-if="currenKeywords.length > 0">
				<div class="list-header">
					<span>搜索历史</span>
					<img src="@/assets/image/icon2/icon-del.png" v-on:click="deleteCurrent()" />
				</div>
				<ul>
					<li class="item" v-for="(item, index) in currenKeywords" v-on:click="getKey(item)" :key="index">{{ item }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import menuSearchHeader from './menuSearchHeader';
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
		menuSearchHeader
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
		
		// this.getHotKeywords();
		this.getCurrentKey();
	},
	beforeDestroy: function() {
		resumeRem()
	},
	methods: {
		...mapMutations({
			changeKey: 'changeKey'
		}),

		// getHotKeywords() {
		// 	searchKeywordList().then(res => {
		// 		this.hotKeywords = Object.assign([], res.result.list, this.hotKeywords);
		// 	});
		// },

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
			this.utils.save('menukeyword', []);
			this.currenKeywords = this.utils.fetch('menukeyword');
		},

		getCurrentKey() {
			this.currenKeywords = this.utils.fetch('menukeyword');
		},
		searchReturnInfo() {
			
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
					width: 1.4rem;
					height: 1.4rem;
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
					font-size: 1.05rem;
					margin-right: 1.3rem;
					margin-bottom: 1.3rem;
					cursor: pointer;
				}
			}
		}
		div.hot-wrapper {
			.list-header {
				span {
					background: url('../assets/image/home/home-search-hot.png') no-repeat left center;
					background-size: 1.13rem;
				}
			}
		}
	}
}
</style>
