<template>
	<div @click="onclick()" class="item">
		<!-- <i class="item-icon iconfont" :style="{ color: color }" v-html="iconfont"></i> -->
		<img class="item-icon" :src="iconfont" alt="" />
		<span class="item-title">{{ title }}</span>
		<span class="number" 
			v-if="manageNumber == 0 ? '' : manageNumber"
			>{{ manageNumber|filterNumber}}</span>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		iconfont: {
			type: String
		},
		manageNumber: {
			type: Number,
			default: 0
		}
		// color: {
		//   type: String
		// }
	},
	filters: {
		filterNumber: function (value) {
			if( value >99 ){
				return '99⁺';
			}else{
				return value
			}
		}
	},
	methods: {
		onclick() {
			this.$emit('onclick');
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.7rem;

	position: relative;
	span.number {
		position: absolute;
		top: -0.5rem;
		right: 1rem;
		width: 1.63rem;
		height: 1.63rem;
		line-height: 1.63rem;
		background: rgba(230, 49, 22, 1);
		border-radius: 50%;
		font-size: 0.75rem;
		color: RGBA(255, 255, 255, 1);
		font-family:DIN-Medium,DIN;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
	}
}
.item-icon {
	width: 3.39rem;
	height: 3.39rem;
	margin-bottom: 0.6rem;
}
.item-title {
	font-size:1.1rem;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(22,22,22,1);
}
</style>
