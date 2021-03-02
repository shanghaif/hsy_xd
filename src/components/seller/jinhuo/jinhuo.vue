<template>
	<div class="container hsy_main jinhuo">
		<!-- <div class="common-header-wrap">
			<mt-header title="进货台账" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="进货台账"></head-title>
		<div style="" @click="onDate('d_start')">
			<mt-cell title="起始日期" is-link>{{ dt.d_start ? $moment.unix(dt.d_start).format('YYYY-MM-DD') : '' }}</mt-cell>
		</div>
		<div style="" @click="onDate('d_end')">
			<mt-cell title="结束日期" is-link>{{ dt.d_end ? $moment.unix(dt.d_end).format('YYYY-MM-DD') : '' }}</mt-cell>
		</div>
		<mt-popup v-model="showCell" position="right" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<mt-header title="查询结果"><mt-button slot="left" icon="back" @click="showCell = false"></mt-button></mt-header>
			</div>
			<div class="list-wrap">
				<!-- <el-table :data="tableData" height="350" border style="width: 100%">
					<el-table-column prop="goods_name" label="商品名称" width="100"></el-table-column>
					<el-table-column prop="goods_scdate" label="生产日期" width="100"></el-table-column>
					<el-table-column prop="guige" label="规格" @cell-click="showxiangqing = true"></el-table-column>
					<el-table-column prop="goods_jhl" label="数量"></el-table-column>
					<el-table-column prop="goods_bzq" label="保质期"></el-table-column>
					<el-table-column label="供货详情">
						<template slot-scope="scope">
							<el-button type="success" @click="pshow(scope.$index, scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="goods_addtime" label="进货时间"></el-table-column>
					<el-table-column prop="goods_yhren" label="验货人"></el-table-column>
				</el-table> -->
				<table class="table" v-for="(item, index) in tableData" :key="index">
					<tbody>
						<header>商品详情</header>
						<tr>
							<td>商品名称：{{ item.goods_name }}</td>
							<td>规格：{{ item.guige }}</td>
						</tr>
						<tr>
							<td>数量：{{ item.goods_jhl }}</td>
							<td>验货人：{{ item.goods_yhren }}</td>
						</tr>
						<tr>
							<td colspan="1">生产日期：{{ item.goods_scdate=='1970-01-01'?'':item.goods_scdate }}</td>
							<td colspan="1">保质期：{{ item.goods_bzq }}</td>
						</tr>
						<!-- <tr>
						</tr> -->
						<tr>
							<td colspan="1">进货时间：{{ item.goods_addtime }}</td>
							<td @click="pshow(index, item)" colspan="1" style="background-color: lightskyblue;">
								供货详情：
								<span>点击查看</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</mt-popup>
		<button class="hsy_btn hsy_f" @click="getGoodsList(), (showCell = true)">查询</button>
		<div>
			<mt-datetime-picker
				ref="datePicker"
				type="date"
				:startDate="new Date('2000/1/1')"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="selectData ? new Date(selectData) : new Date()"
				@confirm="dateConfirm"
			></mt-datetime-picker>
			<mt-popup v-model="showxiangqing" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="进货详情" class="common-header"><mt-button slot="left" icon="back" @click="showxiangqing = false"></mt-button></mt-header>
				</div>
				<div class="common-popup-content">
					<!-- <mt-field label="进货商" v-model="p.ghs"></mt-field>
					<p class="from-icon">...</p>
					<mt-field label="销售商" v-model="p.xss"></mt-field> -->
					<!-- <div class="label">商品安全信息</div> -->
					<mt-field label="产地" v-model="p.goods_chandi"></mt-field>
					<mt-cell class="mt-5" title="产地证明">
						<div class="user-avatar-wrapper">
							<div v-if="p.goods_chandipic" class="user-avatar">
								<!-- <img :src="p.goods_chandipic" :style="getBannerStyle1" @click="openImage(p.goods_chandipic)" /> -->
								<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
									<template>
										<img :src="p.goods_chandipic" :style="getBannerStyle1" />
									</template>
								</img-viewer>
							</div>
						</div>
					</mt-cell>
					<!-- <mt-field label="供货商" v-model="p.goods_gonghuo"></mt-field> -->
					<mt-field label="供货商" v-model="p.goods_suyuan_news"></mt-field>
					<mt-cell class="mt-5" title="购货证明">
						<div class="user-avatar-wrapper">
							<div v-if="p.goods_gonghuopic" class="user-avatar">
								<!-- <img :src="p.goods_gonghuopic" :style="getBannerStyle1" @click="openImage(p.goods_gonghuopic)" /> -->
								<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
									<template>
										<img :src="p.goods_gonghuopic" :style="getBannerStyle1" />
									</template>
								</img-viewer>
							</div>
						</div>
					</mt-cell>
					<mt-cell class="mt-5" title="检验合格证明">
						<div class="user-avatar-wrapper">
							<div v-if="p.goods_jianyan" class="user-avatar">
								<!-- <img :src="p.goods_jianyan" :style="getBannerStyle1" @click="openImage(p.goods_jianyan)" /> -->
								<img-viewer :options="options" @inited="inited" class="viewer" ref="viewer">
									<template>
										<img :src="p.goods_jianyan" :style="getBannerStyle1" />
									</template>
								</img-viewer>
							</div>
						</div>
					</mt-cell>
				</div>
			</mt-popup>
			<mt-popup v-model="isshow" class="popup"><img :src="showimage" :style="getBannerStyle" @click="isshow = false" /></mt-popup>
		</div>
	</div>
</template>

<script>
import Viewer from 'v-viewer/src/component.vue';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import '@/assets/style/hsy-mint.scss'
import { getGoodsList1, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods';
export default {
	data() {
		return {
			dt: { d_start: '', d_end: '' },
			dataName: '',
			selectData: '',
			tableData: [],
			p: [],
			showxiangqing: false,
			showimage: '',
			isshow: false,
			showCell: false,
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
			}
		};
	},
	components: {
		HeadTitle,
		'img-viewer': Viewer
	},
	computed: {
		getBannerStyle: function() {
			const { width, height } = window.screen;
			var width1 = (width - 0) * 0.8;
			var height1 = (height - 0) * 0.8;
			return {
				maxWidth: width1 + 'px',
				maxHeight: height1 + 'px'
			};
		},
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
		this.dt.d_end = parseInt(new Date().getTime() / 1000);
		this.dt.d_start = parseInt(new Date(new Date().getTime() - 2592000000) / 1000);
		this.getGoodsList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		inited(viewer) {
			this.$viewer = viewer;
		},
		pshow(i, r) {
			var s = r.goods_suyuan;
			var sA = s.split('|');
			this.p.ghs = sA[0];
			this.p.xss = sA.pop();
			// this.p.goods_gonghuo = r.goods_gonghuo;
			this.p.goods_suyuan_news = r.goods_suyuan_news;
			this.p.goods_gonghuopic = r.goods_gonghuopic;
			this.p.goods_chandi = r.goods_chandi;
			this.p.goods_chandipic = r.goods_chandipic;
			this.p.goods_jianyan = r.goods_jianyan;
			this.showxiangqing = true;
		},
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},

		onDate(name) {
			this.dataName = name;
			this.$refs.datePicker.open();
		},
		dateConfirm(value) {
			this.dt[this.dataName] = parseInt(value.getTime() / 1000);
			this.$forceUpdate();
		},
		getGoodsList() {
			Indicator.open();
			getGoodsList1(this.dt.d_start, this.dt.d_end).then(res => {
				this.tableData = res.result.goods_list;
				Indicator.close();
			});
		}
	}
};
</script>

<style scoped lang="scss">
/* .btn_l_sty {
	min-height: 48px;
	padding: 0 1rem;
	width: 20%;
} */
.hsy_main {
	// /deep/ .mint-cell-title {
	// 	font-size: 1.33rem;
	// }
}
// .jinhuo {
	/deep/.mint-cell {
		&:last-child {
			background: none;
		}
	}
// }
.common-header-wrap {
	height: 4rem;
	&/deep/.mint-header {
		height: 4rem;
		line-height: 4rem;
		border: none;
		padding: 0 1.43rem;
		background-color: #fff;
		.mint-header-title {
			font-size: 1.39rem;
			position: absolute;
			left: 50%;
			color: #000;
			transform: translate(-50%, 0);
		}
		.mintui {
			color: #000;
		}
	}
}
.common-popup-content {
	top: 4rem;
}
.list-wrap {
	padding: 0 1.43rem;
	overflow-y: scroll;
	height: 90%;
}
.table {
	width: 100%;
	// border: 1px solid #666;
	border-collapse: collapse;
	margin-bottom: 15px;
	header {
		font-weight: bold;
		font-size: 1.24rem;
		margin: 0.95rem 0;
	}
	td {
		padding: 5px;
		border: 1px solid #666;
		font-size: 1.1rem;
		width: 57%;
	}
}
.from-icon {
	padding: 0 10px 10px;
	position: relative;
	background-color: #fff;
	letter-spacing: 10px;
	font-weight: 800;
	&:after {
		left: 10px;
		right: 0;
		background-color: #efefef;
		z-index: 1;
		      pointer-events: none;
		      height: 1px;
		      bottom: 0;
	}
}
</style>
