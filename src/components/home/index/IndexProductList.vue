<template>
	<div class="product-list">
		<div class="product-list-header" @click="productListClick">
			<div class="header-left">
				<img class="header-icon" src="../../../assets/image/icon2/icon-red-bg.png" />
				<span class="header-title">{{ title }}</span>
			</div>
			<div class="header-more">
				<span class="">查看更多</span>
				<img src="../../../assets/image/icon2/icon-right.png"/>
			</div>
		</div>
		<div class="product-list-body">
			<index-product-body
				:item="item"
				:index="index"
				v-for="(item, index) in items"
				v-bind:key="index"
			></index-product-body>
		</div>
	</div>
</template>

<script>
import IndexProductBody from './IndexProductBody'

export default {
  name: 'IndexProductList',
  data () {
    return {}
  },
  props: ['items', 'title', 'type'],
  components: {
    IndexProductBody
  },
  computed: {

  },
  methods: {
    productListClick: function () {
      this.$router.push({
        name: 'HomeGoodslist',
        query: { sort_key: this.type }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
	// background: #ffffff;
	padding: 0 0.86rem;
	margin-top:0.6rem;
	margin-bottom:0.6rem;
	.product-list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.86rem;
		.header-left {
			display: flex;
			align-items: center;
			.header-title {
				font-size:1.56rem;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:600;
				color:rgba(22,22,22,1);
			}
	
			.header-icon {
				width: 0.34rem;
				height: 1.52rem;
				border-radius: 0.17rem;
				margin-right: 0.43rem;
			}
			
		}
		.header-more {
			display: flex;
			align-items: center;
			span {
				font-size:1.04rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(111, 111, 111, 1);
			}
			img {
				margin-left: 0.26rem;
				width: 0.86rem;
				height: 0.86rem;
			}
		}
	}
	.product-list-body {
		display: flex;
		flex-wrap: wrap;
		margin-right: -2.66%;
	}
}
</style>
