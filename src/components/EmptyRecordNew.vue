<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-28 15:16:59
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-28 15:27:44
-->
<template>
	<div class="empty-record-new" v-if="isFrom=='point'">
		<img class="img" src="@/assets/image/icon2/icon-empty-jifen.png" alt="">
		<p>暂无积分</p>
	</div>
	<div class="empty-record-new" v-else-if="isFrom=='address'">
		<img class="img" src="@/assets/image/icon2/icon-empty-address.png" alt="">
		<p>您还没有添加收货地址</p>
	</div>
	<div class="empty-record-new" v-else-if="isFrom=='friendList'">
		<img class="img" src="@/assets/image/icon2/icon-empty-friend-list.png" alt="">
		<p>您暂时没有添加好友</p>
	</div>
	<div class="empty-record-new" v-else-if="isFrom=='search'">
		<img class="img" src="@/assets/image/icon2/icon-empty-search.png" alt="">
		<p>搜索无结果</p>
	</div>
	<div class="empty-record-new" v-else-if="isFrom=='content'||emptyContent=='content'">
		<img class="img" src="@/assets/image/icon2/icon-empty-content.png" alt="">
		<p>暂时没有相关内容</p>
	</div>
	<div class="empty-record-new" v-else-if="isFrom=='message'">
		<img class="img" src="@/assets/image/icon2/icon-empty-content.png" alt="">
		<p>暂时没有相关消息</p>
	</div>
</template>

<script>
export default {
	name: 'EmptyRecordNew',
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
.empty-record-new {
	background-color: #fff;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.img {
		width: 3.72rem;
		height: 2.66rem;
	}
	p {
		margin-top: .47rem;
		font-size: .28rem;
		font-weight: 400;
		color: #161616;
	}
}
</style>