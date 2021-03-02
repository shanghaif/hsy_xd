<template>
	<div class="index-article">
		<em class="title">
			最新资讯<img src="../../../assets/image/icon2/icon-horn.png" alt="" />
		</em>
		 <!-- <div></div> -->
		<ul class="scroll-content" :style="{ top }">
			<li v-for="(item, index) in items" :key="index" @click="goArticleDetail(item)">{{ item.article_title }}</li>
		</ul>
		<div class="more"><span><img  src="../../../assets/image/icon2/icon-right.png" alt="" @click="goHomeArticlelist('1')"></span></div>
		<!-- <em class="more" >更多</em> -->
	</div>
</template>

<script>
export default {
	name: 'IndexArticle',
	data() {
		return {
			activeIndex: 0
		};
	},
	props: ['items'],
	computed: {
		top() {
			return -this.activeIndex * 2 + 'rem';
		}
	},
	beforeDestroy: function() {
		clearInterval(this.time_interval);
	},
	mounted() {
		let _this = this;
		this.time_interval = setInterval(function() {
			if (_this.activeIndex < _this.items.length - 1) {
				_this.activeIndex += 1;
			} else {
				_this.activeIndex = 0;
			}
		}, 2000);
	},
	methods: {
		goHomeArticlelist(acId) {
			this.$router.push({ name: 'HomeArticlelist', query: { ac_id: acId } });
		},
		goArticleDetail(item) {
			this.$router.push({ name: 'HomeArticledetail', query: { article_id: item.article_id } });
		}
	}
};
</script>

<style scoped lang="scss">
.index-article {
	height: 2rem;
	line-height: 2rem;
	overflow: hidden;
	display: flex;
	// background: #fff;
}
.title {
	display: flex;
	align-items: center;
	// width: 25%;
	// text-align: center;
	font-size:1.13rem;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight: 400;
	// color: $primaryColor;
	color:rgba(22,22,22,1);
	img {
		margin-left: 0.6rem;
		margin-right: 1.3rem;
		width: 1.3rem;
		height: 1.08rem;
	}
}
.more {
	// width: 15%;
	margin-left: auto;
	span {
		padding: 1rem;
		padding-right: 0;
		img {
		width: 0.86rem;
		height: 0.86rem;
	}
	}
	
	
	// text-align: center;
}
.scroll-content {
	// width: 60%;
	position: relative;
	transition: top 0.5s;
	li {
		line-height: 2rem;
		text-align: left;
		font-size:0.95rem;
		color:rgba(111,111,111,1);
	}
}
</style>
