<template>
	<div class="member-order-list only-member-order-list">
		<!-- <div class="common-header-wrap">
			<mt-header title="订单列表" class="common-header"><mt-button slot="left" icon="back" @click="fun_push"></mt-button></mt-header>
		</div> -->
		<head-title title="订单列表"></head-title>
		<!-- header -->
		<!-- <div class="order-header">
			<ul>
				<li class="item" v-for="item in orderNav" v-bind:key="item.id" v-bind:class="{ active: stateType == item.id }" v-on:click="setOrderNavActive(item.id)">
					{{ item.name }}
				</li>
			</ul>
		</div> -->
		<div class="cont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="order-body" v-if="order_group_list && order_group_list.length">
				<div v-for="(order_group, index) in order_group_list" v-bind:key="index">
					<div class="list" >
						{{order_group.desk_name}}&nbsp;&nbsp;&nbsp;&nbsp;
						{{order_group.store_name}}
						<p v-if="order_group.order_begin">
							{{ $moment.unix(new Date(order_group.order_begin)).format('YYYY-MM-DD HH')}}时
							--
							{{ $moment.unix(new Date(order_group.order_end)).format('YYYY-MM-DD HH') }}时
						</p>						
						<div v-if="order_group.is_order != 2" class="item-more" @click="popupMore(index)"><span></span><span></span></div>						
						<ul class="goods-btn" v-show="index == i">
							<li @click="cancelOrder(order_group.id)">取消</li>
						</ul>
					</div>
				</div>
			</div>
			<empty-record2 style="margin-top: 0" class="my-empty" isFrom='content' v-else-if="order_group_list && !order_group_list.length"></empty-record2>
			
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { mapState } from 'vuex';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getDeskOrderList, orderCancel  } from '../../../api/homestoredetail';
export default {
	components: {
		EmptyRecord2,
		HeadTitle
	},
	name: 'MemberOrderList',
	data() {
		return {
			popupVisible : false, // 模态框
			payName : null,       // 开户名
			payNumber : null,     // 开户账号
			zhihangming : null,   // 银行名称
			i:'',  //  item-more 

			order_id: 0,
			goItem: -1,

			orderNav: [
				{
					name: '全部',
					id: ''
				},
				{
					name: '待付款',
					id: 'state_new'
				},
				{
					name: '待回单',
					id: 'receipt_new'
				},
				{
					name: '已回单',
					id: 'receipt_pay'
				},
				{
					name: '待发货',
					id: 'state_pay'
				},
				{
					name: '待收货',
					id: 'state_send'
				},
				{
					name: '待评价',
					id: 'state_noeval'
				}
			],
			stateType: this.$route.query.state ? this.$route.query.state : '',
			orderDetailVisible: false,
			// wrapperHeight: 0,
			params: { page: 0, per_page: 10 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			order_group_list: false,
		};
	},
	
	mounted() {
		resetRem();
		this.i = -1;
	},
	beforeDestroy() {
		resumeRem();
	},
	
	computed: {
		...mapState({
			user: state => state.member.info
		})
	},
	
	methods: {
		// 取消订单
		cancelOrder(id) {
			MessageBox.confirm('您确定要取消此订单？').then(action => {
				this.i = -1;
				Indicator.open();
				orderCancel(id)
					.then(res => {
						Indicator.close();
						Toast(res.message);
						this.resetLoadMoreData();
					})
					.catch(function(error) {
						Indicator.close();
						Toast(error.message);
					});
			});
		},
		// 点击 小点
		popupMore(i) {
			if(this.i == i) {
				this.i = -1;
				return
			}
			this.i = i
			// console.log(this.i)
		},
		// 点击 左上返回 按钮
		fun_left() {
			if (this.goItem == -1) {
				this.$router.go(-1);
			} else {
				this.$router.push({ name: 'MemberIndex' });
			}
		},
		
		// 懒加载
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.getLoadMoreData();
			}
		},
		
		// 加载 数据
		getLoadMoreData() {
			// console.log(this.isMore);
			Indicator.open();
			getDeskOrderList(this.params).then(res=>{
				Indicator.close();
				this.isMore = res.result.hasmore;
				this.loading = !res.result.hasmore;	
				if( !this.order_group_list.length ){
					this.order_group_list = res.result.order_list;
				}else{
					this.order_group_list = this.order_group_list.concat(res.result.order_list);
				}				
			})
		},
		
		// 重置
		resetLoadMoreData(){
			this.params = {page:1,per_page:10};
			this.order_group_list = [];
			this.getLoadMoreData();			
		},
		
		

	}
};
</script>
<style lang="scss" scoped>
.member-order-list {
	div,ul,li,p{
		
			box-sizing: border-box;
	}
	display: flex;
	height: 100vh;
	overflow-y: hidden;
	flex-direction: column;
	background-color: rgba(244, 245, 247, 1);
	.cont{
		flex: 1;
		overflow-y: scroll;
		>div{
			height: 100%;
		}
	}

	.order-header {
		background-color: #fff;
		position: fixed;
		// height: 2.2rem;
		padding: 1.43rem 1.48rem;
		box-sizing: border-box;
		width: 100%;
		// top: 2.2rem;
		z-index: 100;
		top: 3.74rem;
		overflow-x: scroll;
		ul {
			list-style: none;
			display: flex;
			width: fit-content;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			background: rgba(255, 255, 255, 1);
			// border-bottom: 1px solid #e8eaed;
			li {
				text-align: center;
				// line-height: 2.2rem;
				// border-bottom: 0.1rem solid transparent;
				font-size: 1.24rem;
				font-weight: 400;
				color: #6f6f6f;
				width: 4rem;
				margin-right: 2.6rem;
				&.active {
					position: relative;
					color: #e84630;
					&::after {
						content: '';
						position: absolute;
						bottom: -0.8rem;
						left: 0;
						width: 100%;
						height: 0.24rem;
						background: linear-gradient(90deg, #e53216 0%, #fc6952 100%);
						border-radius: 0.12rem;
					}
					// color: $primaryColor;
					// border-bottom-color: $primaryColor;
				}
			}
		}
	}
	.order-body {
		// flex: 1;
		height: 100%;
		
		.list{
			background-color: #fff;
			padding: 1rem;
			border: 1px solid #ccc;
			border-radius: 1rem;
			margin: 1rem;
			position: relative;
			p{
				margin-top: .8rem;
			}
			
			
			.goods-btn {
				background-color: #fff;
				position: absolute;
				right: 6rem;   
				top: 50%;
				transform: translateY(-50%);
				z-index: 100;
				box-shadow: 0rem 0rem 0.95rem 0rem rgba(220, 220, 220, 0.9);
				border-radius: 0.48rem;
				&::after {
					content: '';
					position: absolute;
					border-top: 0.8rem solid transparent;
					border-left: 0.8rem solid #fff;
					border-bottom: 0.8rem solid transparent;
					top: 1.05rem;
					right: -0.8rem;
			
				}
				li {
					width: 6.72rem;
					text-align: center;
					height: 3.7rem;
					line-height: 3.7rem;
					border-bottom: 1px solid #EFEFEF;
					font-size: 1.14rem ;
				}
			}
			.item-more{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 2.33rem;
				height: 1.19rem;
				background: #F3F3F3;
				border-radius: 0.74rem;
				position: absolute;
				right: 1.76rem;
				bottom: 50%;
				transform: translateY(50%);
				span {
					width: 0.29rem;
					height: 0.29rem;
					background: #D6D6D6;
					border-radius: 50%;
					&:first-child {
						margin-right: 0.33rem;
					}
				}
			}
		}
	}
	
	.mint-popup {
		width: 100%;
		height: 11.75rem;
	}
}
</style>
