<template>
	<div class="ui-detail-info1 product-aqzs">
		<div class="label">商品追溯</div>
		<mt-field label="平台进货商" :readonly="true" :disableClear="true" :class="{ ft_c: chase }" v-model="ghs"></mt-field>
		<p class="from-icon">...</p>
		<mt-field label="销售商" :readonly="true" :disableClear="true" :class="{ ft_c: chase }" v-model="xss"></mt-field>
		<div class="label">商品安全信息</div>
		<!-- <viewer :images="viewerList"> -->

		<mt-field label="产地" v-if="detailInfo.goods_chandi" v-model="detailInfo.goods_chandi" :readonly="true"></mt-field>
		<mt-field label="供货商" style='margin-bottom: 0.95rem;' v-if="detailInfo.goods_gonghuo" v-model="detailInfo.goods_gonghuo" :readonly="true"></mt-field>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { productLike, productUnlike } from '../../../../api/homegoodsdetail';
import { Toast, Indicator } from 'mint-ui';
// npm install v-viewer --save

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';
export default {
	components: {
		'img-viewer': Viewer
	},
	data() {
		return {
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
			seehgz: '查看合格证'
		};
	},
	computed: {
		...mapState({
			isFavorate: state => state.goodsdetail.isFavorate,
			detailInfo: state => state.goodsdetail.detailInfo,
			certificate_info: state => state.goodsdetail.certificate_info,
			currentProductId: state => state.goodsdetail.currentProductId,
			user: state => state.member.info
		}),
		getBannerStyle1: function() {
			const { width, height } = window.screen;
			var width1 = (width - 0) * 0.3;
			var height1 = (height - 0) * 0.3;
			return {
				maxWidth: width1 + 'px',
				maxHeight: height1 + 'px'
			};
		}
	},
	created() {
		//   console.log(this.certificate_info);
		if (this.certificate_info) {
			if (this.certificate_info.certificate_image != null) {
				this.hgzImgShow = true;
			}
		}
	},
	mounted() {
		this.fl();
	},
	methods: {
		...mapMutations({
			saveInfo: 'saveDetailInfo',
			changeIndex: 'changeIndex',
			saveIsFavorate: 'saveIsFavorate'
		}),
		jump_qualify() {
			// console.log(this.certificate_info);
			this.$router.push({ name: 'HomeQsee3', query: { id: this.certificate_info.certificate_id, n: 1 } });
		},
		fl() {
			var s = this.detailInfo.goods_suyuan;
			// 如果 S 不是 null
			if (s != null) {
				var sA = s.split('|');
				this.ghs = sA[0];
				this.xss = sA.pop();
				this.chase = false;
			} else {
				this.ghs = '暂无信息';
				this.xss = '暂无信息';
				this.chase = true;
			}
		},
		inited(viewer) {
			this.$viewer = viewer;
		}
	}
};
</script>

<style scoped lang="scss">
.product-aqzs {

	.from-icon{
		padding: 3px 1.43rem;
    position: relative;
    background: #fff;
    padding-bottom: 1rem;
    padding-top: 0;
		letter-spacing:10px;
		font-weight: 800;
		&:after{			
			left: 1.43rem;
			right: 0;
			background-color: #EFEFEF;
			content: "";
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
		color: #6F6F6F;
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
			background-color: #EFEFEF;
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
</style>
