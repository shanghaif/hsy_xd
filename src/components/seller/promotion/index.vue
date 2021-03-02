<template>
	<div class="container">
		<!-- 头部标签 -->
		<head-title title="促销管理"
			:iconleft="require('../../../assets/image/icon2/icon-white-back.png')"
			bgcolor='#626771'
			color="#FFFFFF">
		</head-title>

		<!-- 主题内容 -->
		<div class="cont">
			<ul>
				<li v-for="(v, i) in evaluateList" :key="i" @click="fun_goModule(v.path)">
					<div>{{ v.name }}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
export default {
	data() {
		return {
			evaluateList: [
				{
					name: '抢购管理',
					id: 0,
					path:"SellerPurchase"
				},
				{
					name: '多买惠',
					id: 1,
					path:"SellerDiscount"
				},
				{
					name: '满即送',
					id: 2,
					path:"SellerFullDelivery"
				},
				{
					name: '优惠套装',
					id: 3,
					path:"SellerSuit"
				}
			]
		};
	},
	components: {
		HeadTitle
	},
	created() {
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		fun_goModule(path){
			this.$router.push({ name: path })
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background-color: #f4f5f7;
}
.list-wrap {
	padding-bottom: 16rem;
	margin-top: 0.95rem;
	min-height: 60vh;
	background-color: #fff;
}
// 弹性布局
@mixin item_flex {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
// 边距
$pmvw: 4vw;
@mixin fs_big {
	font-size: 4.58vw;
}
.cont {
	// height: 94vh;
	// border: 1px solid red;
	padding: 2vw $pmvw;
	overflow: scroll;
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
	border-radius: 16px;
	li {
		@include item_flex;
		@include fs_big;
		margin: 2vw 0;
		background: #ffffff;
		color: #fff;
		box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		height: 11vw;
		line-height: 2.5;
		padding: 0 4vw;
		&:nth-child(1) {
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		}
		&:nth-child(2) {
			background: #626771 linear-gradient(139deg, #66aeff 0%, #1369fa 100%);
		}
		&:nth-child(3) {
			background: linear-gradient(139deg, #3cd3ad 1%, #4cb8c4 100%);
		}
		&:nth-child(4) {
			background: #f4f5f7 linear-gradient(109deg, #8f94fb 0%, #6167d7 55%, #4e54c8 99%);
		}
		div {
			// background: #ffffff;
			height: 100%;
			width: 78vw;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		img {
			width: 4vw;
			height: 4vw;
			margin-top: 3.5vw;
		}
	}
}
</style>
