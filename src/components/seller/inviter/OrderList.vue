<template>
	<div class="container hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header title="分销业绩" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="分销业绩"></head-title>
		<!-- 上面 按照时间查询 -->
		<div class="q_see">
			<!-- <div class="get_data">
				<div class="time" @click="onDate('start')">
					<mt-cell title="起始" is-link>{{ startTime ? $moment.unix(startTime).format('YYYY-MM-DD') : '' }}</mt-cell>
				</div>
				<div class="time" @click="onDate('end')">
					<mt-cell title="结束" is-link>{{ endTime ? $moment.unix(endTime).format('YYYY-MM-DD') : '' }}</mt-cell>
				</div>
				<mt-button @click="fun_getData">查询</mt-button>
			</div> -->
			<div style="" @click="onDate('start')">
				<mt-cell title="起始" is-link>{{ startTime ? $moment.unix(startTime).format('YYYY-MM-DD') : '' }}</mt-cell>
			</div>
			<div style="" @click="onDate('end')">
				<mt-cell title="结束" is-link>{{ endTime ? $moment.unix(endTime).format('YYYY-MM-DD') : '' }}</mt-cell>
			</div>
			<!-- 上面输入框 -->
			<div><ul id="tree" class="ztree" style="overflow:auto;"></ul></div>
			<mt-datetime-picker
				ref="startTime"
				type="date"
				:startDate="new Date('2020/1/1')"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:endDate="new Date()"
				:value="startTime ? new Date(startTime * 1000) : new Date()"
				@confirm="dateConfirm"
			></mt-datetime-picker>
			<mt-datetime-picker
				ref="endTime"
				type="date"
				:startDate="new Date('2000/1/1')"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:endDate="new Date()"
				:value="endTime ? new Date(endTime * 1000) : new Date()"
				@confirm="dateConfirm"
			></mt-datetime-picker>
		</div>
		<mt-popup v-model="showCell" position="right" class="common-popup-wrapper">
			<div class="common-header-wrap">
				<mt-header title="查询结果" class="common-header"><mt-button slot="left" icon="back" @click="showCell = false"></mt-button></mt-header>
			</div>
			<div class="popup-list-wrap popup-list-wrap-sjx" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="settle-item" v-for="item in order_list" :key="item.orderinviter_id">
					<div class="title">
						{{ item.orderinviter_member_name }}
						<span>{{ $moment.unix(item.orderinviter_addtime).format('YYYY年MM月DD日') }}</span>
					</div>
					<div class="content">{{ item.orderinviter_remark }}</div>
					<div class="payment-account">
						<span>{{ item.orderinviter_money }}</span>
						<mt-button class="btn" type="default" size="small" disabled>{{ item.orderinviter_valid ? '有效' : '无效' }}</mt-button>
					</div>
				</div>
			</div>
		</mt-popup>
		<mt-button @click="fun_getData(),(showCell = true)" class="hsy_btn hsy_f">查询</mt-button>
		<empty-record isFrom="search" v-if="order_list && !order_list.length"></empty-record>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { Toast, Indicator } from 'mint-ui';
import EmptyRecord from '../../../components/EmptyRecord2';
import { getInviterOrderList } from '../../../api/sellerInviter';
export default {
	name: 'OrderList',
	components: {
		EmptyRecord,
		HeadTitle
	},
	data() {
		return {
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			// 分销商品列表
			order_list: false,
			showCell:false,
			selectData: '', //选中的时间
			dataName: '', // 选中时间类型
			startTime: '', // 开始时间
			endTime: '' //结束时间
		};
	},
	created: function() {
		//this.getOrderList()
		//new Date(1596423684000 -new Date(1596423684000).getHours()*60*60*1000-new Date(1596423684000).getMinutes()*1000*60-new Date(1596423684000).getSeconds()*1000)
		this.endTime = parseInt(new Date().getTime() / 1000);
		this.startTime = parseInt(new Date(new Date().getTime() - 2592000000) / 1000);
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// zhuanhau
		getEndTime(time, n) {
			time *= 1000;
			time = new Date(time - new Date(time).getHours() * 60 * 60 * 1000 - new Date(time).getMinutes() * 1000 * 60 - new Date(time).getSeconds() * 1000);
			if (n == 0) {
				time = parseInt(time / 1000);
				return time;
			} else {
				// console.log(time);
				time = parseInt((new Date(time).getTime() + 1000 * 60 * 60 * 23 + (1000 * 60 * 59 + 1000 * 59)) / 1000);
				// console.log(time);
				return time;
			}
		},
		getOrderList(ispush) {
			// Indicator.open()
			let params = this.params;
			params.startTime = this.getEndTime(this.startTime, 0);
			params.endTime = this.getEndTime(this.endTime, 1);
			// console.log(params);
			// return false;
			getInviterOrderList(params).then(res => {
				Indicator.close();

				if (ispush && this.order_list) {
					this.order_list = this.order_list.concat(res.result.order_list);
				} else {
					this.order_list = res.result.order_list;
				}
				if (res.result.hasmore) {
					this.isMore = true;
				  this.loading = false;
				} else {
					this.isMore = false;
				  this.loading = true
				}
			});
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				// this.loading = false;
				Indicator.open();
				this.getOrderList(true);
			}
		},

		// 选择时间函数
		onDate(name, type) {
			this.dataName = name;
			if (name == 'start') {
				this.selectData = this.startTime * 1000;
				this.$refs.startTime.open();
			} else {
				this.selectData = this.endTime * 1000;
				this.$refs.endTime.open();
			}
		},
		// 接收日期
		dateConfirm(value) {
			var nowDate = parseInt(value.getTime() / 1000);
			console.log(nowDate);
			if (this.dataName == 'start') {
				if (nowDate <= this.endTime) {
					this.startTime = nowDate;
				} else {
					Toast('请重新选择时间');
				}
			} else {
				if (nowDate >= this.startTime) {
					this.endTime = nowDate;
				} else {
					Toast('请重新选择时间');
				}
			}
			this.$forceUpdate();
		},

		// 点击查询按钮
		fun_getData() {
			// this.orderList = [];// 数据恢复为空
			// this.params = { 'page': 0, 'per_page': 10 };  // 查询起始值设置
			// this.isMore = true;  //再次加载设置为起始值

			this.params = { page: 0, per_page: 10 };
			this.loading = false; // 是否加载更多
			this.isMore = true; // 是否有更多
			// 分销商品列表
			this.order_list = false;
			this.loadMore(); //  懒加载函数
		}
	}
};
</script>

<style scoped lang="scss">
.settle-item {
	background: #fff;
	margin-top: 0.5rem;
	// border-top: 1px solid #eee;
	border-bottom: 1px solid rgba(239, 239, 239, 1);
	padding: 0.95rem 0 0 1.42rem;;
	.title {
		padding: 0.95rem 1.42rem 0.95rem 0;
		font-size: 1.14rem;
		border-bottom: 1px solid rgba(239, 239, 239, 1);
		color: #999;
		// line-height: 2;
		span {
			float: right;
		}
		.settle-state {
			float: right;
		}
		.state-check {
			color: orangered;
		}
	}
	.content {
		padding: 0.95rem 1.42rem 0.95rem 0;
		display: flex;
		// line-height: 1.5;
		font-size:1.52rem;
		.item {
			flex: 1;
			.mt {
				font-size: 1.14rem;
				color: #999;
			}
			.mc {
				font-size: 1.14rem;
				color: #000;

				.strong {
					font-size: 1.39rem;
				}
			}
			.mc.income {
				color: #4caf50;
			}
			.mc.outlay {
				color: #f31c47;
			}
		}
	}
	.payment-account {
		font-size: 1.39rem;
		color: #333;
		padding: 0.95rem 1.42rem 0.95rem 0;
		border-top: 1px solid rgba(239, 239, 239, 1);
		display: flex;
		span {
			flex: 1;
			// line-height: 1.65rem;
			padding-right: 0.5rem;
		}
		.btn {
			width: 7rem;
		}
	}
}

.get_data {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;

	// border-bottom: 1px solid #999;
	// padding: 5px 0;
	// border-top: 1px solid #999;
	.time {
		width: 42%;
		& /deep/ .mint-cell {
			min-height: 1.8rem;
		}
		& /deep/ .mint-cell-wrapper {
			font-size: 0.6rem;
			// color: #3cd3ad;
		}
	}
	button {
		font-size: 1.14rem;
		width: 16%;

		height: 1.678rem;
		border: 1px solid #666;
	}
}
.common-header-wrap {
	height: 4rem;
	padding: 0 1.43rem;
	position: relative;
	.common-header {
		height: 4rem;
		line-height: 4rem;
		border: none;
		background-color: #fff;
		/deep/.mint-header-title {
			font-size: 1.39rem;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
		}
	}
	.popup-list-wrap {
		overflow-y: scroll;
		height: 94vh;
	}
}
.popup-list-wrap-sjx{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
}
</style>
