<template>
	<div class="common-empty-record" v-if="isFrom=='point'">
		<img class="img" src="@/assets/image/icon2/icon-empty-jifen.png" alt="">
		<p>暂无积分</p>
	</div>
	<div class="common-empty-record" v-else-if="isFrom=='address'">
		<img class="img" src="@/assets/image/icon2/icon-empty-address.png" alt="">
		<p>您还没有添加收货地址</p>
	</div>
	<div class="common-empty-record" v-else-if="isFrom=='friendList'">
		<img class="img" src="@/assets/image/icon2/icon-empty-friend-list.png" alt="">
		<p>您暂时没有添加好友</p>
	</div>
	<div class="common-empty-record" v-else-if="isFrom=='search'">
		<img class="img" src="@/assets/image/icon2/icon-empty-search.png" alt="">
		<p>搜索无结果</p>
	</div>
	<div class="common-empty-record" v-else-if="isFrom=='content'||emptyContent=='content'">
		<img class="img" src="@/assets/image/icon2/icon-empty-content.png" alt="">
		<p>暂时没有相关内容</p>
	</div>
	<div class="common-empty-record" v-else-if="isFrom=='message'">
		<img class="img" src="@/assets/image/icon2/icon-empty-content.png" alt="">
		<p>暂时没有相关消息</p>
	</div>
</template>

<script>
export default {
	name: 'EmptyRecord2',
	data() {
		return {};
	},
	props: {
		isFrom:String,
		emptyContent:String
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
	.common-empty-record {
		padding-bottom: 40%;
		margin-top: 3%;
		background-color: #fff;
		min-height: 48vh;
		.img {
			width: 12.95rem;
			height: 9.23rem;
		}
		p {
			margin-top: 3.19rem;
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
		}
	}
</style>