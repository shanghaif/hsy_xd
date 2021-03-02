<template>
	<div class="menu-img">
		<info-goods-swipe></info-goods-swipe>
		<!-- <img src="@/assets/image/icon2/icon-laiyuan.png" alt="" /> -->
		<div class="header-top">
			<span class="header-top-menu" @click="$router.go(-1)"><img src="@/assets/image/icon2/icon-white-back.png" alt="" /></span>
		</div>

		<div class="info-buy">
			<div class="food-title">西红柿炖牛楠</div>
			<div class="food-info">商品介绍商品介绍商品介绍商品介绍商品介绍商</div>
			<div>
				<div class="food-price">
					<span>￥</span>
					<span>1233</span>
				</div>
				<div class="food-add">
					<span class="subtract" @click="subtract">-</span>
					<span class="num">{{ selectNum }}</span>
					<span class="add" @click="addNum">+</span>
					<span class="add-text">添加</span>
				</div>
			</div>
		</div>

		<div class="food-content">
			<div class="food-tab">
				<span @click="tabSelect(1)" :class="{ select: index == 1 }">食品安全追踪</span>
				<span @click="tabSelect(2)" :class="{ select: index == 2 }">详情</span>
				<span @click="tabSelect(3)" :class="{ select: index == 3 }">评价</span>
			</div>

			<div class="ui-detail-info1 product-aqzs" v-show="index == 1">
				<div class="label">商品追溯</div>
				<mt-field label="平台进货商" :readonly="true" :disableClear="true" :class="{ ft_c: chase }" v-model="ghs"></mt-field>
				<p class="from-icon">...</p>
				<mt-field label="销售商" :readonly="true" :disableClear="true" :class="{ ft_c: chase }" v-model="xss"></mt-field>
				<div class="label">商品安全信息</div>
				<!-- <viewer :images="viewerList"> -->

				<mt-field label="产地" v-if="detailInfo.goods_chandi" v-model="detailInfo.goods_chandi" :readonly="true"></mt-field>
				<mt-field label="供货商" style="margin-bottom: 0.95rem;" v-if="detailInfo.goods_gonghuo" v-model="detailInfo.goods_gonghuo" :readonly="true"></mt-field>
				<mt-cell class="" title="产地证明" v-if="detailInfo.goods_chandipic">
					<div class="user-avatar-wrapper">
						<div class="user-avatar">
							<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
								<template>
									<img :src="detailInfo.goods_chandipic" :style="getBannerStyle1" />
								</template>
							</img-viewer>
						</div>
					</div>
				</mt-cell>
				<mt-cell class="" title="购货证明" v-if="detailInfo.goods_gonghuopic">
					<div class="user-avatar-wrapper">
						<div class="user-avatar">
							<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
								<template>
									<img :src="detailInfo.goods_gonghuopic" :style="getBannerStyle1" />
								</template>
							</img-viewer>
						</div>
					</div>
				</mt-cell>
				<mt-cell class="" title="检验报告" v-if="detailInfo.goods_jianyan">
					<div class="user-avatar-wrapper">
						<div class="user-avatar">
							<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
								<template>
									<img :src="detailInfo.goods_jianyan" :style="getBannerStyle1" />
								</template>
							</img-viewer>
						</div>
					</div>
				</mt-cell>
				<mt-cell v-if="hgzImgShow" class="" title="农产品合格证">
					<div class="user-avatar-wrapper">
						<div class="user-avatar">
							<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
								<template>
									<img :src="certificate_info.image" :style="getBannerStyle1" />
								</template>
							</img-viewer>
						</div>
					</div>
				</mt-cell>
				<div v-if="!hgzImgShow" v-show="certificate_info" @click="jump_qualify"><mt-field label="农产品合格证" v-model="seehgz"></mt-field></div>
				<!-- </viewer> -->
			</div>

			<div v-show="index == 2">详情</div>

			<!-- 评价 -->
			<div class="ui-evaluation-header" v-show="index == 3">
				<div class="ui-evaluation-info">
					<span>
						评价
						<span>000条</span>
					</span>
					<!-- <span>好评率</span> -->
				</div>
				<div class="flex-header">
					<div
						v-for="(item, index) in staticData"
						v-bind:key="item.id"
						v-bind:class="{ active: currentTag == item.value }"
						v-on:click="changeTab(item.value, item.grade)"
					>
						{{ item.name }}
					</div>
				</div>
			</div>
			<div class="ui-evaluation-body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="list" v-for="(item, index) in reviewList" v-if="reviewList.length > 0">
					<div>
						<span>
							<img :src="item.member_avatar" alt="" />
							<div>
								<span>{{ item.geval_isanonymous ? '匿名' : item.geval_frommembername }}</span>
								<!-- <span v-bind:class="{
										'good-review': item.geval_scores > 3,
										'medium-review': item.geval_scores > 1,
										'bad-review': item.geval_scores == 1}">
									{{ getGrade(item.geval_scores) }}
								</span> -->
								<span>{{ getTime(item.geval_addtime) }}</span>
							</div>
						</span>
						<span
							v-bind:class="{
								'good-review': item.geval_scores > 3,
								'medium-review': item.geval_scores > 1,
								'bad-review': item.geval_scores == 1
							}"
						>
							{{ getGrade(item.geval_scores) }}
						</span>
					</div>
					<p v-if="item.geval_content">{{ item.geval_content }}</p>
					<p v-if="!item.geval_content">无评价信息</p>
				</div>

				<div class="list-empty" v-if="reviewList.length <= 0 && index == 3"><p>本商品暂无评价</p></div>
			</div>
		</div>

		<div class="footer">
			<div>
				<img src="@/assets/image/icon2/banquet-cart.png" alt="" />
				<span>单桌费用:</span>
				<span>￥12323</span>
			</div>
			<div class="ok-submit">完成</div>
		</div>
	</div>
</template>

<script>
import InfoGoodsSwipe from '@/components/home/goodsdetail/child/InfoGoodsSwipe';
import { resetRem, resumeRem } from '@/util/rem';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			staticData: [],
			index: 3,

			detailInfo: {},
			ghs: '',
			xss: '',
			showimage: '',
			isshow: false,
			chase: false, //产品追溯信息文本颜色
			// images: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'],
			options: {
				button: true, //右上角按钮
				zoomable: true, //是否可以缩放
				movable: true, //是否可以移动
				transition: true, //使用 CSS3 过度
				fullscreen: true, //播放时是否全屏
				keyboard: true, //是否支持键盘
				title: false, //当前图片标题
				tooltip: false, //显示缩放百分比
				navbar: false, //底部缩略图
				toolbar: false, //底部工具栏
				rotatable: false, //是否可旋转
				scalable: false //是否可翻转
			},
			hgzImgShow: false, //合格证图片
			seehgz: '查看合格证',
			// staticData: evaluation,
			id: this.$store.state.goodsdetail.currentProductId ? this.$store.state.goodsdetail.currentProductId : '',
			currentTag: 'total',
			grade: 0,
			subTotal: {},
			reviewList: [],
			page: 0,
			loading: false,
			total: 1,
			selectNum: 1
		};
	},
	components: {
		InfoGoodsSwipe,
	},
	mounted() {
		resetRem();
	},
	created: function() {},
	computed: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		tabSelect(i) {
			console.log(i);
			this.index = i;
		},
		// 添加数量
		addNum() {
			this.selectNum++
			 console.log(this.selectNum,'this.selectNum')
			 
		},
		subtract() {
			this.selectNum--
			if(this.selectNum<=1) {
				this.selectNum = 1
				debugger
				Toast('不能再少了')
				return
				
			}
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
.menu-img {
	background-color: #f4f5f7;
	min-height: 100vh;
	position: relative;
	img {
		width: 100%;
	}
	.header-top {
		box-sizing: border-box;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0.9rem 1.43rem;
		display: flex;
		justify-content: space-between;
		.header-top-menu {
			height: 2.38rem;
			width: 2.38rem;
			display: flex;
			align-items: center;
			justify-content: center;

			background: rgba(0, 0, 0, 0.49);
			border-radius: 50%;
			img {
				width: 1.33rem;
				height: 1.33rem;
			}
		}
	}
}
.info-buy {
	margin-bottom: 0.95rem;
	padding: 1.9rem 1.43rem 1.57rem;
	background-color: #fff;
	.food-title {
		font-size: 1.71rem;
		font-weight: 600;
		color: #161616;
	}
	.food-info {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
		margin: 0.95rem 0;
	}
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.food-price {
			span {
				font-size: 2.38rem;
				font-weight: bold;
				color: #ff0000;
				&:first-child {
					font-size: 1.33rem;
					font-weight: 400;
					color: #ff0000;
				}
			}
		}
		.food-add {
			display: flex;
			align-items: center;
			span {
				text-align: center;
			}
			.subtract,
			.add {
				width: 1.71rem;
				height: 1.71rem;
				// line-height: 1.71rem;
				border-radius: 50%;
				font-weight: 600;
				box-sizing: border-box;
			}
			.subtract {
				color: #fb060d;
				border: 0.05rem solid #fb060d;
			}
			.num {
				font-size: 1.33rem;
				font-weight: 600;
				color: #ff0000;
				margin: 0 0.95rem;
			}
			.add {
				color: #fff;
				background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			}
			.add-text {
				margin-left: 2.1rem;
				width: 4.48rem;
				height: 2.1rem;
				line-height: 2.1rem;
				background: #d8d8d8 linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
				border-radius: 1.19rem;
				font-size: 1.14rem;
				font-weight: 600;
				color: #ffffff;
			}
		}
	}
}
.food-content {
	.food-tab {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 1.29rem 1.43rem 1.1rem;
		span {
			margin-right: 1.9rem;
			font-size: 1.33rem;
			font-weight: 400;
			color: #6f6f6f;
		}
		.select {
			position: relative;
			font-size: 1.33rem;
			font-weight: 600;
			color: #161616;
			&::after {
				content: '';
				position: absolute;
				width: 1.9rem;
				height: 0.24rem;
				background: linear-gradient(90deg, #e53216 0%, #fc6952 100%);
				border-radius: 0.12rem;
				bottom: -0.55rem;
				left: 50%;
				transform: translate(-50%, 0);
			}
		}
	}
}
.product-aqzs {
	.from-icon {
		padding: 3px 1.43rem;
		position: relative;
		background: #fff;
		padding-bottom: 1rem;
		padding-top: 0;
		letter-spacing: 10px;
		font-weight: 800;
		&:after {
			left: 1.43rem;
			right: 0;
			background-color: #efefef;
			content: '';
			position: absolute;
			z-index: 1;
			pointer-events: none;
			height: 1px;
			bottom: 0;
		}
	}
	.label {
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: #6f6f6f;
	}
	.ft_c {
		&/deep/.mint-cell-value {
			input {
				// color: #e93b3d;
			}
		}
	}
	/deep/ .mint-cell-title {
		width: 11.43rem;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		font-size: 1.33rem;
		font-weight: 400;
		color: #6f6f6f;
	}
	/deep/.mint-cell-wrapper {
		padding: 0 1.43rem;
		img {
			margin: 8px 0;
			border-radius: 0.76rem;
		}
	}
	/deep/.mint-cell {
		&::after {
			left: 1.43rem;
			right: 0;
			background-color: #efefef;
		}
	}
	/deep/.mint-cell-value {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
	}
}
.container {
	background: #fff;
	.label {
		padding: 0.5rem;
		font-size: 0.7rem;
		background: #eee;
	}
	.user-avatar-wrapper {
		display: inline-block;
		vertical-align: top;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		img {
			margin: 10px 0;
		}
	}
	.user-avatar-wrapper .del-btn {
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
	}
	.user-avatar {
		display: block;
		border: 1px solid #eee;
		position: relative;
		width: 5rem;
		height: 5rem;
		margin: 0 auto;
		text-align: center;
		img {
			width: auto;
			height: auto;
			max-width: 100%;
			max-height: 100%;
		}
		input {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
		.center-text {
			padding: 0.2rem;
			padding-top: 3.5rem;
			font-size: 0.6rem;
		}
	}
	.user-avatar::before {
		position: absolute;
		font-size: 1.5rem;
		line-height: 5rem;
		left: 50%;
		margin-left: -0.75rem;
		color: rgba(0, 0, 0, 0.5);
	}
	.btn-wrapper {
		display: flex;
		.btn {
			flex: 1;
		}
	}
	.mint-radiolist {
		display: flex;
		.mint-cell {
			flex: 1;
			.mint-radio-input:checked + .mint-radio-core {
				background-color: #ff9900 !important;
				border-color: #ff9900 !important;
			}
		}
	}
	.body-list {
		.body-item {
			padding: 1rem;
			position: relative;
			min-height: 2.2rem;
			font-size: 0.6rem;
			img {
				max-width: 100%;
			}
			.btn-list {
				text-align: right;
				background: rgba(0, 0, 0, 0.5);
				position: absolute;
				top: 0.5rem;
				bottom: 0.5rem;
				left: 0.5rem;
				right: 0.5rem;
				padding: 0.5rem;
				box-sizing: border-box;
				i {
					font-size: 1.2rem;
					margin-left: 0.5rem;
					color: #fff;
				}
			}
		}
	}
	.popup {
		width: 80%;
		overflow: scroll;
	}
	.brand-list {
		h2 {
			line-height: 2rem;
			font-size: 0.7rem;
			padding-left: 0.5rem;
			font-weight: 700;
		}
		ul {
			overflow: hidden;
			border-top: 1px solid #f6f6f9;
		}
		li {
			box-sizing: border-box;
			text-align: center;
			width: 25%;
			padding-bottom: 20%;
			float: left;
			border-bottom: 1px solid #f6f6f9;
			border-right: 1px solid #f6f6f9;
			position: relative;
			.p-img {
				position: absolute;
				top: 0.5rem;
				bottom: 0.5rem;
				right: 0.5rem;
				left: 0.5rem;
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
		li:nth-child(4n) {
			border-right: 0;
		}
	}
}
.toolbar {
	height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	background-color: #f0f2f5;
	.toolbar-item {
		font-size: 0.6rem;
		border: none;
		border-radius: 0;
		background-color: #f0f2f5;
	}
	.cancel-item {
		margin-left: 0.5rem;
		color: #4e545d;
	}
	.confirm-item {
		margin-right: 0.5rem;
		color: red;
	}
	.picker-header {
		color: #4e545d;
		line-height: 2rem;
		font-size: 0.8rem;
	}
}
.ui-evaluation-header {
	background: #ffffff;
	.ui-evaluation-info {
		display: flex;
		justify-content: space-between;
		padding: 1.9rem 1.43rem 1.43rem;
		span {
			&:nth-child(1) {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
				span {
					font-size: 1.14rem;
					font-weight: 400;
					margin-left: 0.67rem;
				}
			}
		}
	}
	.flex-header {
		width: auto;
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		flex-basis: 100%;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding: 0 1.43rem 1.9rem;
		margin-bottom: 0.95rem;
		// height: 2.2rem;

		div {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6f6f6f;
			padding: 0.29rem 1.57rem;
			border: 0.5px solid #f4f5f7;
			background: #f4f5f7;
			border-radius: 1.07rem;
			&.active {
				color: #e63116;
				background: #ffe5e5;
				border: 0.5px solid #e5371b;
			}
		}
	}
}
.ui-evaluation-body {
	// background: rgba(255, 255, 255, 1);
	.list {
		padding: 2.24rem 1.43rem 1.9rem;
		background-color: #fff;
		// border-bottom: 0.5px solid rgba(232, 234, 237, 1);
		color: #333;
		// font-size: 0.75rem;
		margin-bottom: 0.95rem;
		div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 1.43rem;
			// display: flex;
			// justify-content: space-between;
			// align-content: center;
			// align-items: center;
			span {
				display: flex;
				img {
					width: 3.81rem;
					height: 3.81rem;
					border-radius: 50%;
				}
				div {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					padding: 0;
					margin-left: 0.95rem;
					span {
						&:nth-child(1) {
							font-size: 1.14rem;
							font-weight: 600;
							color: #161616;
						}
						&:nth-child(2) {
							font-size: 0.95rem;
							font-weight: 400;
							color: #6f6f6f;
						}
					}
				}
			}
		}
		p {
			padding: 0;
			margin: 0;
			flex-basis: 100%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			font-size: 1.24rem;
			font-weight: 400;
			color: #161616;
		}
	}
	.list-empty {
		position: relative;
		// top: 50%;
		// left: 50%;
		// transform: translate(-50%, -50%);
		text-align: center;
		img {
			width: 2.75rem;
		}
		p {
			color: #7c7f88;
			font-size: 1.3rem;
			padding: 0;
			margin: 0;
			font-weight: normal;
		}
	}
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	padding: 0.62rem 1.43rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	div {
		> img {
			// height: 4.95rem;
			width: 4.95rem;
			margin-right: 0.81rem;
		}
		span {
			&:nth-child(2) {
				font-size: 1.24rem;
				color: #161616;
			}
			&:last-child {
				font-size: 1.43rem;
				font-weight: bold;
				color: #ff0000;
			}
		}
	}
	.ok-submit {
		text-align: center;
		width: 8.95rem;
		height: 3.33rem;
		line-height: 3.33rem;
		background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
		border-radius: 1.67rem;
		font-size: 1.14rem;
		font-weight: 400;
		color: #ffffff;
	}
}
</style>
