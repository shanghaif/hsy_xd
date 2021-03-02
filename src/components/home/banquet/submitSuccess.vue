<template>
	<div class="submit-result">
		<head-title :title="title"></head-title>
		<div class="content">
			<img src="@/assets/image/icon2/icon-success.png" alt="" />
			<div class="tip1">您的宴席预订订单提交成功</div>
			<div class="tip2">商家会在近期与您联系，请保持通话顺畅</div>
			<div class="tip3" v-show="selected !=1&&selectTab==2">已根据菜谱为您选好食材，请查看和购买</div>
			<div class="bottom">
				<span v-show="selectTab==1" @click="$router.push({ name: 'HomeIndex' })">返回首页</span>
				<span @click="$router.push({ name: 'MemberBanquetList' })">查看我的预定</span>
				<span v-show="selected !=1&&selectTab==2" @click="$router.push({ name: 'MemberChooseDishes' })" class="xuancai">去选菜</span>
			</div>
		</div>
	</div>
</template>

<script>
import HeadTitle from '../../HeadTitle';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			title: '提交成功',
			selected:this.$route.query.selected?this.$route.query.selected:1,
			selectTab:this.$route.query.selectTab?this.$route.query.selectTab:2,
		};
	},
	components: {
		HeadTitle
	},
	created() {
		
	},
	mounted() {
		// this.selected = this.$router.query.selected?this.$router.query.selected:1
		resetRem();
	},
	beforeDestroy() {
		// resumeRem();
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.submit-result {
	.content {
		text-align: center;
		img {
			margin-top: 3.19rem;
			width: 17.29rem;
			transform: translateX(-0.9rem);
			// height: 8.76rem;
		}
		.tip1 {
			font-size: 1.52rem;
			color: #000000;
			margin: 4.1rem 0 1.43rem;
		}
		.tip2 {
			font-size: 1.14rem;
			color: #4c4c4c;
			margin-bottom: 7.62rem;
		}
		.tip3 {
			padding: 0.7rem 0.95rem;
			width: 58%;
			border-radius: 0.33rem;
			margin: 0 auto 0.81rem;
			background: #f4f5f7;
			font-size: 1.05rem;
			font-weight: 400;
			color: #4c4c4c;
		}
		.bottom {
			text-align: center;
			span {
				width: 9.14rem;
				text-align: center;
				padding: 0.81rem 0;
				border-radius: 1.74rem;
				border: 0.05rem solid #fb060d;
				font-size: 1.24rem;
				font-weight: 400;
				color: #fb060d;
				display: inline-block;
				&:nth-child(2) {
					margin-left: 1.9rem;
				}
			}
			.xuancai {
				margin-left: 1.9rem;
				color: #ffffff;
				background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			}
		}
	}
}
</style>
