<template>
	<div class="container order-detail">
		<!-- header -->
		<head-title :title="title"></head-title>
		<div class="content">
			<div class="top-status" v-if="status == 1 || status == 2 || status == 3 || status == 4 || statusing == 5">
				<div class="status-line">
					<!-- <span class="point-wait"></span> -->
					<span :class="status == 1 || status == 2 || status == 3 || status == 4 ? 'point-over' : 'point-wait'"></span>
					<span :class="status == 2 || status == 3 || status == 4 ? 'point-over' : status == 1 ? 'point-wait' : 'point-aaa'"></span>
					<span :class="status == 3 || status == 4 ? 'point-over' : status == 2 ? 'point-wait' : 'point-aaa'"></span>
					<span :class="status == 4 ? 'point-over' : status == 3 ? 'point-wait' : 'point-aaa'"></span>
					<div class="scale-line" v-if="status == 1" style="width:33.33333%"></div>
					<div class="scale-line" v-else-if="status == 2" style="width:66.666666%"></div>
					<div class="scale-line" v-else-if="status == 3 || status == 4" style="width:100%"></div>
				</div>
				<ul class="status-type">
					<li>
						<span>待接单</span>
						<span>等待商家接单</span>
					</li>
					<li>
						<span>待支付</span>
						<span>用户支付订金</span>
					</li>
					<li>
						<span>进行中</span>
						<span>商家备菜中</span>
					</li>
					<li>
						<span>签到</span>
						<span>如约签到</span>
					</li>
				</ul>
			</div>
			<div class="user-cancel" v-if="status == 0">您的宴请预订订单已取消</div>
			<div class="user-canceling" v-if="statusing == 5">
				<span>用户已申请取消预定</span>
				<span>取消原因:</span>
			</div>
			<div class="store-info">
				<div>
					<div class="store-info-left">
						<img :src="listInfo.member_avatar" alt="" />
						<div>{{ listInfo.member_name }}</div>
					</div>
					<a :href="'tel:' + listInfo.member_phone"><img src="@/assets/image/icon2/icon-tel.png" alt="" /></a>
				</div>
				<div class="user-info">
					<span>联系人:&nbsp;&nbsp;{{ listInfo.member_name }}</span>
					<span>联系电话:&nbsp;&nbsp;{{ listInfo.member_phone }}</span>
				</div>
				<div class="user-info" v-if="status == 3 || (status == 4 && dinnerType == 2)">
					<span style="margin-right: 1rem;">上门地址:</span>
					<span>{{listInfo.address+listInfo.detailed_address}}</span>
				</div>
			</div>

			<div class="the-title">预定信息</div>
			<div class="list-cell-wrap">
				<div class="list-cell-start">
					<span>宴请日期:</span>
					<div>{{ listInfo.banquet_time }}</div>
				</div>
				<div class="list-cell-start">
					<span>宴请方式:</span>
					<div>{{ dinnerType == 1 ? '厨师上门' : '到店堂食' }}</div>
				</div>
			</div>
			<div class="list-cell-wrap" v-if="dinnerType == 1">
				<div class="list-cell-start">
					<span>桌数:</span>
					<div>{{ listInfo.table_num }}</div>
				</div>
				<div class="list-cell-start">
					<span>菜品食材:</span>
					<div>{{ listInfo.dishes_food == 1 ? '厨师准备' : '家里自备' }}</div>
				</div>
			</div>
			<div class="list-cell-wrap" v-else-if="dinnerType != 1">
				<div class="list-cell-start">
					<span>宴席类型:</span>
					<div>
						{{
							listInfo.banquet_type == 1
								? '喜宴'
								: listInfo.banquet_type == 2
								? '丧宴'
								: listInfo.banquet_type == 3
								? '生日宴'
								: listInfo.banquet_type == 4
								? '正式宴会'
								: listInfo.banquet_type == 5
								? '家宴'
								: '便宴'
						}}
					</div>
				</div>
				<div class="list-cell-start">
					<span>桌位数量:</span>
					<div>
						小桌:{{listInfo.table_num.xz}},大桌:{{listInfo.table_num.dz}},包间:{{listInfo.table_num.bz}}
					</div>
				</div>
				<div class="list-cell-start">
					<span>每桌人数:</span>
					<div>
						小桌:{{listInfo.table_pe.xn}},大桌:{{listInfo.table_pe.dn}},包间:{{listInfo.table_pe.bn}}
					</div>
				</div>
				<div class="list-cell-start">
					<span>预计到店总人数:</span>
					<div>{{ listInfo.banquet_num }}</div>
				</div>
			</div>
			<div class="dishes" v-show="listInfo.goods_list.length">
				<p>菜品</p>
				<div class="list-info-wrap" v-for="(item, index) in listInfo.goods_list" :key="index">
					<img :src="item.goods_image" alt="" />
					<div class="list-info-right">
						<span>{{ item.goods_name }}</span>
						<span>
							<div>
								<span v-if="dinnerType==2">{{ item.table_type == 1 ? '(小桌)' : item.table_type == 2 ? '(大桌)' : '包间' }}</span>
								<span>每桌{{ item.goods_num }}件</span>
								<span>x</span>
								<span>{{ item.table_num ? item.table_num : 0 }}桌</span>
							</div>
							<div>￥{{ parseFloat(item.goods_price * item.table_num).toFixed(2) }}</div>
						</span>
					</div>
				</div>
				<div class="all-price">
					<span>预估费用参考：</span>
					<span>￥{{parseFloat(allPrice).toFixed(2)}}</span>
				</div>
			</div>
			<div class="cook-info-list" v-show="listInfo.cook_list.length>0">
				<div class="the-title">厨师信息</div>
				<div style="padding: 1.9rem 1.43rem;background-color: #fff;">
					<div class="cook-list" v-for="(item,index) in listInfo.cook_list" :key='index'>
						<img :src="item.member_avatar" alt="" />
						<div>
							<span class="cook-info">
								<span>{{item.member_name}}</span>
								<span>{{item.cook_level=='初级'?'lv1':(item.cook_level=='中级'?'lv2':(item.cook_level=='高级'?'lv3':(item.cook_level=='技师'?'lv4':'lv5')))}}</span>
							</span>
							<span>{{item.adept_menu}}</span>
						</div>
						<a :href="'tel:' + item.phone"><img style="height: 100%;width: 1.48rem;border-radius: 0;" src="@/assets/image/icon2/icon-tel.png" alt="" /></a>
					</div>
				</div>
			</div>
			<div class="the-title" v-if="status == 2 || status == 3 || status == 4 || status == 5">备注信息</div>
			<div class="market-info" v-if="status == 2 || status == 3 || status == 4 || status == 5">{{ listInfo.memo }}</div>
			
			<!-- <div class="the-title" v-show="listInfo.sign_time">签到信息</div>
			<div class="sign-in" v-show="listInfo.sign_time">
				<span>{{listInfo.sign_time}}</span>
				<span>已签到</span>
			</div> -->
			<div class="the-title" v-if="status == 3 || status == 2 || status == 4">接单信息</div>
			<!-- <text-banner :content="message" :bgcolor="'#FDF5C7'" :color="'rgba(247, 140, 8, 1)'"></text-banner> -->
			<!-- 宴席当日不可退订 -->
			<div class="list-cell-wrap" v-if="status == 3 || status == 2 || status == 4">
				<div class="list-cell-start">
					<span>宴席订金:</span>
					<div>{{ listInfo.order_money }}</div>
				</div>
				<div class="list-cell-start">
					<span>可退订时限:</span>
					<div v-if="this.day||this.hours">{{ this.hours > 24 ? this.day + '天' : this.hours + '小时' }}</div>
					<div v-else>请联系商家</div>
					<!-- 如果小于24小时，按小时显示哦 -->
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="cancle botton" @click="writeMarket">订单备注</div>
			<div class="botton deposit-money" style="margin-left: 1.43rem;" @click="qiandao()" v-if="status == 3 && statusing != 5 && new Date(listInfo.banquet_time).toLocaleDateString() == new Date().toLocaleDateString()">签到</div>
		</div>

		<!-- 弹窗单选列表 -->
		<SelectBox title="请选择申请退订原因" :items="arry" ref="selectOne" @getSelectBox="getSelectValue"></SelectBox>

		<mt-popup class="receiving-value" v-model="receivingStepValue" position="bottom">
			<img src="@/assets/image/icon2/icon-cha.png" @click="(receivingStepValue = false), (selectCookStatus = 1)" alt="" />
			<div class="receiving-value-title">{{ selectCookStatus == 0 ? '修改厨师' : '选择厨师接单' }}</div>
			<div class="top-status" v-if="selectCookStatus == 1 || selectCookStatus == 2">
				<div class="status-line">
					<div class="scale-line" :style="selectCookStatus == 1 ? 'width:50%' : 'width:100%'"></div>
					<span class="point-step1 point-over"></span>
					<span style="left: 100%;" :class="selectCookStatus == 2 ? 'point-step2 point-over' : 'point-bbb'"></span>
					<!-- <div class="scale-line"  style="width:100%">
					</div> -->
				</div>
				<ul class="status-type">
					<li>
						<span>选择厨师</span>
						<span>指派上门厨师</span>
					</li>
					<li>
						<span>接单</span>
						<span>填写接单信息</span>
					</li>
				</ul>
			</div>
			<div class="line-1" v-if="selectCookStatus == 1 || selectCookStatus == 2"></div>
			<div class="cook-list-wrap">
				<div class="cook-list" v-for="(item, index) in cookList" :key="index" @click="selectCook(item.cook_id)">
					<img :src="item.member_avatar" alt="" />
					<div>
						<span class="cook-info">
							<span>{{ item.cook_name }}</span>
							<span>
								{{
									item.cook_level == '初级'
										? 'lv1'
										: item.cook_level == '中级'
										? 'lv2'
										: item.cook_level == '高级'
										? 'lv3'
										: item.cook_level == '技师'
										? 'lv4'
										: 'lv5'
								}}
								lv2
							</span>
						</span>
						<span>拿手菜：糖醋里脊，锅包肉糖醋包肉糖醋…</span>
					</div>
					<img v-if="item.select" src="@/assets/image/icon2/icon-select-red.png" alt="" />
					<img v-else />
				</div>
			</div>

			<div v-if="cookList.length > 0" class="confirm-get" @click="gostep2()">确定</div>
			<div v-else class="confirm-get">添加厨师</div>
		</mt-popup>

		<mt-popup class="receiving-value" v-model="receivingValue" position="bottom">
			<img src="@/assets/image/icon2/icon-cha.png" @click="(receivingValue = false), (selectCookStatus = 1)" alt="" />
			<div class="receiving-value-title">{{ dinnerType == 2 ? '请输入接单信息' : '选择厨师接单' }}</div>
			<div class="top-status" v-show="dinnerType == 1">
				<div class="status-line">
					<div class="scale-line" :style="selectCookStatus == 1 ? 'width:50%' : 'width:100%'"></div>
					<span class="point-step1 point-over"></span>
					<span style="left: 100%;" :class="selectCookStatus == 2 ? 'point-step2 point-over' : 'point-bbb'"></span>
					<!-- <div class="scale-line"  style="width:100%">
					</div> -->
				</div>
				<ul class="status-type">
					<li>
						<span>选择厨师</span>
						<span>指派上门厨师</span>
					</li>
					<li>
						<span>接单</span>
						<span>填写接单信息</span>
					</li>
				</ul>
			</div>
			<div class="list-cell">
				<span>宴席订金:</span>
				<div>
					<input type="text" placeholder="请输入本次宴席订金" v-model="dingjin" />
					元
				</div>
			</div>
			<div class="list-cell">
				<span>可退订时限:</span>
				<div>
					<input type="text" placeholder="请输入自支付订金日起多少天内可退订金" v-model="tuiTime" />
					天
				</div>
			</div>
			<div class="tip">注：用户在退订时限内申请退订，无需商家审核直接将订金全部退给用户</div>
			<div class="confirm-get" @click="confirmOrder">确认接单</div>
		</mt-popup>

		<mt-popup class="write-market" v-model="writeMarketPopup" position="center">
			<div class="write-market-wrap">
				<textarea name="" v-model="marketText" id="" cols="30" rows="10" placeholder="请输入备注信息"></textarea>
				<div>
					<span @click="writeMarketPopup = false">取消</span>
					<span @click="confirmMark()">确定</span>
				</div>
			</div>
		</mt-popup>

		<mt-popup class="audit-popup" v-model="auditPopup" position="bottom">
			<img src="@/assets/image/icon2/icon-cha.png" @click="auditPopup = false" alt="" />
			<div class="receiving-value-title">退订审核</div>
			<div class="result">
				<span>审核结果</span>
				<div>
					<span :class="selectOne ? 'select' : ''" @click="selectClick(1)">通过</span>
					<span :class="selectOne ? '' : 'select'" @click="selectClick(2)">驳回</span>
				</div>
			</div>
			<div class="list-cell">
				<span>退订金额:</span>
				<div>
					<input type="text" placeholder="请输入给用户退回订金金额" v-model="tuiMoney" />
					天
				</div>
			</div>
			<div class="confirm-get">确定</div>
		</mt-popup>
	</div>
</template>

<script>
// import {  getListInfo,sendMarket } from '@/api/sellerBanquet';
import { getListInfo,sendMarket,qiandao } from '@/api/memberBanquet.js';
import textBanner from '@/components/home/banquet/textBanner';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox } from 'mint-ui';
import SelectBox from '@/components/SelectBox.vue';

export default {
	data() {
		return {
			title: '订单详情',
			message: '若您有退订需求，请在可退订时限内申请，订金将在1-7个工作日内退到您的账户，在超出可退订时限外申请退订，订金则会存在不退的风险，请线下与商家联系',
			status: 1, //0已取消，1待接单，2待支付，3进行中，4签到
			statusing: null, //5申请取消中
			storePhone: '',
			storeName: '济南好食源餐馆',
			storeAddress: '济南市历下区花园路印象城6层',
			dinnerType: 1, //1厨师上门，2到店堂食
			arry: [{ name: '宴席取消或另择日期', id: 1 }, { name: '选择其他商家', id: 2 }, { name: '菜品缺少', id: 3 }, { name: '商家原因', id: 4 }],
			receivingValue: false, //到店堂食接单弹窗
			dingjin: '', //定金
			tuiTime: '', //可退期限
			receivingStepValue: false,
			selectCookStatus: 1, //1选择厨师接单，2填写截单信息
			cookList: [{ name: '11' }],
			writeMarketPopup: false,
			signIn: false, //已签到 厨师签到
			auditPopup: false, //退订审核
			tuiMoney: null, //退订审核的退定金额
			selectOne: true, //选择
			index: 1, //1选择的通过,2驳回
			listInfo: [],
			allPrice: 0, //菜品总价格
			selectedCook: false, //选择厨师后为true
			day: null, //
			hours: null, //可退订倒计时小时
			order_id: this.$route.query.order_id,
			qiandaoDay: null, //距离宴请当日签到时间,
			marketText: ''
		};
	},
	components: {
		HeadTitle,
		textBanner,
		SelectBox
	},
	created() {
		this.getListInfo();
		// this.getCookList();
		// console.log(this.$route.query.order_id,'this.$route.query.order_id')
	},
	watch: {},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// cancle() {
		// 	if (this.status == 1 || this.status == 2) {
		// 		MessageBox.confirm('确认要取消订单？', '', { cancelButtonText: '我再想想', confirmButtonText: '确认取消' })
		// 			.then(action => {
		// 				let params = {};
		// 				params.order_id = this.order_id;
		// 				params.status = 4;
		// 				this.getOrderLInfo(params);
		// 			})
		// 			.catch(function(error) {});
		// 	} else {
		// 		this.$refs.selectOne.currentValue = true;
		// 	}
		// },
		getSelectValue(values) {
			// 取消原因选择
		},
		qiandao() {
			qiandao({order_id:this.order_id,status:3})
				.then(res => {
					Toast(res.message);
					this.getListInfo();
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		// 接单
		receiving() {
			let params = {};
			// params.order_id = this.order_id;
			if (this.dinnerType == 1) {
				// 厨师上门
				this.receivingStepValue = true;
			} else {
				// 到店堂食
				this.receivingValue = true;
			}
		},
		// 接单走接口
		getOrderLInfo(params) {
			getOrderLInfo(params)
				.then(res => {
					Toast(res.message);
					this.receivingValue = false;
					this.getListInfo();
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		gostep2() {
			this.receivingStepValue = false;
			if(this.selectCookStatus == 0) {
				this.confirmOrder()
				return
			}
			this.selectCookStatus = 2;
			this.receivingValue = true;
		},
		writeMarket() {
			this.writeMarketPopup = true;
		},
		// 弹窗确认备注
		confirmMark() {
			this.writeMarketPopup = false;
			let params = {};
			if (this.marketText) {
				params.memo = this.marketText;
				params.order_id = this.order_id;
				this.sendMarket(params);
			} else {
				Toast('备注不可为空哦');
			}
		},
		sendMarket(params) {
			sendMarket(params)
				.then(res => {
					Toast(res.message);
					this.getListInfo();
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		selectClick(index) {
			if (this.index == index) {
				return;
			} else {
				this.selectOne = !this.selectOne;
			}
			this.index = index;
			console.log(this.selectOne, 'this.selectOne');
		},
		// 获取厨师列表
		// getCookList() {
		// 	dinnerCookList()
		// 		.then(res => {
		// 			this.cookList = res.result.cook_list;
		// 			for (var item of this.cookList) {
		// 				item.select = false;
		// 			}
		// 			console.log(this.cookList, '获取this.cookList');
		// 		})
		// 		.catch(error => {
		// 			Toast(error.message);
		// 		});
		// },
		// 弹窗选择厨师
		selectCook(itemId) {
			// this.cookList[i].select = !this.cookList[i].select
			// console.log(this.cookList[i].select,'this.cookList[i].select')
			for (var item of this.cookList) {
				if (item.cook_id == itemId) {
					item.select = !item.select;
				}
				// this.cookList[i].select = !this.cookList[i].select
				// console.log(this.cookList[i].select,'this.cookList[i].select')
			}
			console.log(this.cookList, 'this.cookList');
			this.$forceUpdate();
		},
		// 弹窗确认接单
		confirmOrder() {
			let params = {};
			if (this.dinnerType == 2) {
				// 到店堂食
				params.order_money = this.dingjin;
				params.time_limit = this.tuiTime;
				params.order_id = this.order_id;
				params.status = 5;
				this.getOrderLInfo(params);
			} else {
				// 选择厨师后为true
				this.selectedCook = true;
				params.order_id = this.order_id;
				let cook_list = [];
				for (var item of this.cookList) {
					if (item.select) {
						cook_list.push({ member_id: item.member_id, member_name: item.cook_name });
					}
				}
				// console.log(cook_list,'cook_list')
				params.cook_list = cook_list;
				params.order_money = this.dingjin;
				params.time_limit = this.tuiTime;
				console.log(params, 'params');
				getOrderCInfo(params)
					.then(res => {
						Toast(res.message);
						this.receivingValue = false;
						this.getListInfo();
					})
					.catch(error => {
						Toast(error.message);
					});
			}
		},
		// 获取列表信息
		getListInfo() {
			getListInfo({ order_id: this.order_id })
				.then(res => {
					if (res.result.banquet_mode == 1) {
						this.dinnerType = 2;
					} else {
						this.dinnerType = 1;
					}
					this.listInfo = res.result;
					if (this.listInfo.status == 1) {
						// 待接单
						this.status = 1;
					} else if (this.listInfo.status == 2) {
						// 进行中
						this.status = 3;
						if (this.listInfo.conduct_status == 1) {
							this.statusing = 5;
						} else if (this.listInfo.conduct_status == 2) {
							this.status = 0;
						}
					} else if (this.listInfo.status == 3) {
						// 签到
						this.status = 4;
					} else if (this.listInfo.status == 4) {
						// 已取消
						this.status = 0;
					} else if (this.listInfo.status == 5) {
						// 待支付
						this.status = 2;
					}

					for (var item of this.listInfo.goods_list) {
						this.allPrice += item.table_num * item.goods_num * item.goods_price;
					}

					this.timeDown();
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		timeDown() {
			if (this.listInfo.banquet_time) {
				const endTime = new Date(this.listInfo.banquet_time);
				console.log(endTime.getTime());
				const nowTime = new Date();
				let qiandaoTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
				this.qiandaoDay = parseInt(qiandaoTime / (24 * 60 * 60));
				console.log(this.qiandaoDay, 'qiandaoDay');
				let leftTime = parseInt((this.listInfo.add_time*1000 + this.listInfo.time_limit * 24 * 60 * 60 * 1000 - nowTime.getTime()) / 1000);
				console.log(leftTime,'leftTime')
				this.day = parseInt(leftTime / (24 * 60 * 60));
				// this.hours = this.formate(parseInt((leftTime / (60 * 60)) % 24));
				this.hours = parseInt(this.day % 24);
			}
		},
		formate(time) {
			if (time >= 10) {
				return time;
			} else {
				return `0${time}`;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.order-detail {
	> div.content {
		padding-top: 3.7rem;
	}
	min-height: 100vh;
	background-color: rgba(244, 245, 247, 1);
	padding-bottom: 5rem;
	/deep/.head_title_cont {
		position: fixed;
		width: 100%;
		z-index: 99;
	}
	.the-title {
		background: #f4f5f7;
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: #6f6f6f;
	}
	.top-status {
		padding: 1.9rem 1.62rem;
		background-color: #fff;
		.status-line {
			height: 0.1rem;
			background: #ecf0f8;
			// margin: 0 13% 0.33rem;
			width: 75.4%;
			margin: 0 auto 1rem;
			position: relative;
			> span {
				position: absolute;
				z-index: 3;
				top: 0;
				transform: translate(-50%, -40%);
				border-radius: 50%;
				&:nth-child(1) {
					left: 0;
				}
				&:nth-child(2) {
					left: 33.33%;
				}
				&:nth-child(3) {
					left: 66.66%;
				}
				&:nth-child(4) {
					left: 100%;
				}
			}
			.point-aaa {
				width: 0.48rem;
				height: 0.48rem;
				background: rgba(251, 19, 25, 1);
			}
			.point-over,
			.point-wait {
				width: 1.19rem;
				height: 1.19rem;
				background: #fb1319;
				&::before {
					content: '';
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.point-over {
				&::before {
					height: 0.48rem;
					width: 0.67rem;
					background: url('../../../assets/image/icon2/icon-over-white.png') center center/100% 100% no-repeat;
				}
			}
			.point-wait {
				&::before {
					background-color: #fff;
					height: 0.38rem;
					width: 0.38rem;
					border-radius: 50%;
				}
			}
			.point-step1 {
				display: inline-block;
				position: absolute;
				border-radius: 50%;
				left: 0% !important;
				// top: -0.5rem;
				&::before {
				}
			}
			.point-step2 {
				display: inline-block;
				position: absolute;
				border-radius: 50%;
				left: 100% !important;
				// top: -0.5rem;
				&::before {
				}
			}
			.point-bbb {
				width: 0.48rem;
				height: 0.48rem;
				background: rgba(251, 19, 25, 1);
				position: absolute;
				right: 0 !important;
				border-radius: 50%;
				transform: translate(0, -50%);
			}
		}
		.scale-line {
			position: absolute;
			background-color: rgba(251, 19, 25, 1);
			height: 0.1rem;
			z-index: 1;
		}
		.status-type {
			display: flex;
			justify-content: space-between;
			> li {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				> span {
					&:nth-child(1) {
						font-size: 1.33rem;
						font-weight: 400;
						color: #161616;
						margin-bottom: 0.19rem;
					}
					&:nth-child(2) {
						font-size: 1.14rem;
						font-weight: 400;
						color: #6f6f6f;
					}
				}
			}
		}
	}
	.user-canceling {
		padding: 1.43rem;
		display: flex;
		flex-direction: column;
		background-color: #fdf5c7;
		span {
			font-size: 1.14rem;
			color: #f78c08;
			&:first-child {
				font-size: 1.33rem;
				margin-bottom: 0.95rem;
			}
		}
	}
	.content {
		.user-cancel {
			padding: 2.86rem 1.43rem 3.29rem;
			font-size: 2rem;
			font-weight: 400;
			color: #161616;
			background-color: #fff;
			margin-bottom: 0.95rem;
		}
		.store-info {
			background-color: #fff;
			padding: 1.9rem 1.43rem;
			> div {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.store-info-left {
					display: flex;
					align-items: center;
					> img {
						margin-right: 0.67rem;
						width: 3.57rem;
						height: 3.57rem;
						border-radius: 50%;
					}
					> div {
						display: flex;
						font-size: 1.33rem;
						font-weight: 400;
						color: #161616;
					}
				}
				> a {
					padding: 1.43rem 1.43rem 1.43rem 2.86rem;
					border-left: 1px solid #eee;
					> img {
						width: 1.48rem;
					}
				}
			}
			.user-info {
				margin-top: 0.95rem;
				justify-content: flex-start;
				> span {
					font-size: 1.14rem;
					font-weight: 400;
					color: #6f6f6f;
					&:nth-child(1) {
						margin-right: 2.86rem;
					}
				}
			}
		}
		.list-cell-wrap {
			background-color: #fff;
			.list-cell-start {
				position: relative;
				display: flex;
				// justify-content: space-between;
				padding: 0.95rem 1.43rem;
				align-items: center;
				position: relative;
				font-size: 1.33rem;
				font-weight: 400;
				color: rgba(22, 22, 22, 1);
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 4%;
					width: 96%;
					background-color: rgba(239, 239, 239, 1);
					height: 1px;
				}
				span {
					// margin-left: 1rem;
					flex-shrink: 0;
				}
				> div {
					font-size: 1.33rem;
					margin-left: 1.19rem;
				}
			}
		}
		.dishes {
			padding: 1.43rem 1.43rem 1.9rem;
			background-color: #fff;
			> p {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
			}
			> .list-info-wrap {
				display: flex;
				margin-top: 1.5rem;
				img {
					width: 5.52rem;
					height: 5.52rem;
					border-radius: 0.38rem;
				}
				> div.list-info-right {
					margin-left: 0.95rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 100%;
					> span {
						&:nth-child(1) {
							font-size: 1.24rem;
							font-weight: 400;
							color: #161616;
						}
						&:nth-child(2) {
							display: flex;
							justify-content: space-between;
							> div {
								font-weight: 400;
								&:nth-child(1) {
									font-size: 1.14rem;
									color: #6f6f6f;
									span {
										margin-right: 1rem;
									}
								}
								&:nth-child(2) {
									font-size: 1.24rem;
									color: #161616;
								}
							}
						}
					}
				}
			}
			.all-price {
				margin-top: 2rem;
				text-align: right;
				span {
					font-size: 1.14rem;
					font-weight: 500;
					color: rgba(255, 0, 0, 1);
					&:first-child {
						font-weight: 400;
						color: rgba(111, 111, 111, 1);
					}
				}
			}
		}
		.market-info {
			padding: 1.43rem 1.43rem 1.29rem;
			background-color: #fff;
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		padding: 0.67rem 1.43rem;
		text-align: right;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		> div.botton {
			text-align: center;
			height: 3.33rem;
			line-height: 3.33rem;
			width: 8.95rem;
			// padding: 0.9rem 2.1rem;
			border-radius: 1.67rem;
			border: 0.05rem solid #fb1319;
			font-size: 1.14rem;
			font-weight: 400;
			color: #fc2025;
		}
		> div.cancle {
			margin-left: auto;
			margin-right: 1.43rem;
		}
		div.deposit-money {
			color: #fff;
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
		}
		.qiandao {
			font-size: 1.05rem;
			font-weight: 400;
			color: #6f6f6f;
		}
	}

	// 弹窗选择样式修改
	// /deep/.mint-msgbox {
	// 	width: 63.73%;
	// 	.mint-msgbox-content {
	// 		padding: 23.17% 0;
	// 	}
	// }
	.receiving-value {
		border-radius: 1.43rem 1.43rem 0rem 0rem;
		height: 67.2%;
		padding: 0 4%;
		box-sizing: border-box;
		> img {
			width: 1.33rem;
			position: absolute;
			right: 1.43rem;
			top: 1.48rem;
		}
		.receiving-value-title {
			text-align: center;
			margin: 1.95rem 0 1.9rem;
			font-size: 1.52rem;
			font-weight: 600;
			color: #161616;
		}
		.tip {
			padding: 1.43rem;
			font-size: 1.14rem;
			background: #fdf5c7;
			border-radius: 0.67rem;
			font-weight: 400;
			color: #f79314;
		}
		.line-1 {
			border: 1px solid #efefef;
			margin: 0 -1.43rem 1.9rem;
		}
		.confirm-get {
			position: absolute;
			box-sizing: border-box;
			width: 92%;
			bottom: 2.67rem;
			padding: 0.95rem 0;
			text-align: center;
			font-size: 1.33rem;
			font-weight: 400;
			color: #ffffff;
			text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.9rem;
		}
	}
	.list-cell {
		position: relative;
		display: flex;
		padding: 0.95rem 0;
		align-items: center;
		justify-content: space-between;
		position: relative;
		font-size: 1.33rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 4%;
		// 	width: 96%;
		// 	background-color: rgba(239, 239, 239, 1);
		// 	height: 1px;
		// }
		span {
			// margin-left: 1rem;
			flex-shrink: 0;
			font-size: 1.33rem;
			font-weight: 400;
			color: #161616;
		}
		> div {
			display: flex;
			align-items: center;
			flex-grow: 1;
			input {
				text-align: right;
				margin-right: 0.95rem;
				margin-left: 1rem;
				width: 100%;
				font-size: 1.33rem;
			}
			img {
				height: 1.14rem;
				vertical-align: baseline;
			}
		}
	}
	div.cook-list-wrap {
		height: 40%;
		overflow-y: scroll;
	}

	.cook-list {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		padding-bottom: 1.9rem;
		border-bottom: 1px solid #efefef;
		img {
			&:nth-child(1) {
				width: 4.29rem;
				height: 4.29rem;
				border-radius: 50%;
			}
			&:last-child {
				height: 1.33rem;
				margin-left: auto;
			}
		}
		> div {
			margin: 0 0.67rem;
			> span {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
			.cook-info {
				margin-bottom: 0.81rem;
				display: flex;
				align-items: center;
				span {
					&:first-child {
						font-size: 1.33rem;
						font-weight: 600;
						color: #161616;
					}
					&:last-child {
						text-align: center;
						margin-left: 0.38rem;
						width: 2.71rem;
						height: 1.29rem;
						line-height: 1.29rem;
						background: linear-gradient(131deg, #ffd3a4 0%, #d49652 100%);
						border-radius: 0.62rem;
						font-size: 1.14rem;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}
		}
		a {
			margin-left: auto;
			padding: 1.43rem 1.43rem 1.43rem 2.86rem;
			border-left: 1px solid #eee;
		}
	}

	.write-market {
		border-radius: 0.76rem;
		overflow: hidden;
		.write-market-wrap {
			textarea {
				height: 10.95rem;
				padding: 1.43rem;
				font-size: 1.24rem;
				box-sizing: border-box;
			}
			> div {
				border-top: 1px solid #efefef;
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 4.62rem;
				span {
					font-size: 1.24rem;
					font-weight: 400;
					&:first-child {
						color: #6f6f6f;
					}
					&:last-child {
						color: #e63116;
					}
				}
			}
		}
	}
	.sign-in {
		padding: 1.9rem 1.43rem;
		background-color: #fff;
		font-size: 1.14rem;
		color: #161616;
		span {
			&:last-child {
				margin-left: 2rem;
			}
		}
	}
	.audit-popup {
		height: 64.72%;
		padding: 0 4%;
		box-sizing: border-box;
		border-radius: 1.43rem 1.43rem 0rem 0rem;
		> img {
			width: 1.33rem;
			position: absolute;
			right: 1.43rem;
			top: 1.48rem;
		}
		.receiving-value-title {
			text-align: center;
			margin: 1.95rem 0 1.9rem;
			font-size: 1.52rem;
			font-weight: 600;
			color: #161616;
		}
		.confirm-get {
			position: absolute;
			box-sizing: border-box;
			width: 92%;
			bottom: 2.67rem;
			padding: 0.95rem 0;
			text-align: center;
			font-size: 1.33rem;
			font-weight: 400;
			color: #ffffff;
			text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.9rem;
		}
		.result {
			margin-top: 2.95rem;
			display: flex;
			align-items: center;
			> span {
				font-size: 1.33rem;
				color: #161616;
			}
			> div {
				span {
					width: 7rem;
					text-align: center;
					height: 2.19rem;
					line-height: 2.19rem;
					background: #f4f5f7;
					border-radius: 1.07rem;
					border: 1px solid transparent;
					display: inline-block;
					margin-left: 1.43rem;
					color: #6f6f6f;
					&:last-child {
					}
				}
				.select {
					color: #fb060d;
					background: #ffe3e4;
					border: 0.05rem solid #fb060d;
				}
			}
		}
	}
}
</style>
