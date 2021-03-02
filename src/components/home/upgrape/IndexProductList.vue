<template>
	<div class="product-list">
		<div class="product-list-header" @click="productListClick">
			<div class="header-left">
				<img class="header-icon" src="../../../assets/image/icon2/icon-red-bg.png" />
				<span class="header-title">{{ title }}</span>
			</div>
			<div class="header-more" @click="$router.push( { name: 'HomeUpGrapeGoodClass', query:{upgrape:true} })">
				<span class="">查看更多</span>
				<img src="../../../assets/image/icon2/icon-right.png"/>
			</div>
		</div>
		<div class="product-list-body">
      <div class="content">
        <div class="flex-cont" v-if="goods_list && goods_list.length">
					<index-product-body
						:item="item"
						:index="index"
						v-for="(item, index) in goods_list"
						v-bind:key="index"
					></index-product-body>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import IndexProductBody from './IndexProductBody'
import { Toast, Indicator } from 'mint-ui';
import { getUpGradeGoodsList } from '../../../api/seller'

export default {
  name: 'IndexProductList',
  data () {
    return {			
			// params: { 
			//   page: 0,
			//   pagesize: 10
			// },
			// loading: false, // 是否加载更多
			// isMore: true, // 是否有更多
			// goods_list:[],
		}
  },
  props: ['items', 'title', 'type','goods_list'],
  components: {
    IndexProductBody
  },
	created(){
	},
  computed: {

  },
  methods: {
    productListClick: function () {
      // this.$router.push({
      //   name: 'HomeGoodslist',
      //   query: { sort_key: this.type }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
	// background: #ffffff;
	height: 100%;
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
			height: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-right: -2.66%;
		.content{
			height: 100%;
			overflow-y: scroll;
			.flex-cont{
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
}
</style>
