<template>
	<div class="container p_discount hsy_main">
		<!-- 头部标签 -->
		<head-title title="优惠套装活动" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor="#626771" color="#FFFFFF"></head-title>
		<div class="add-cook">
			<div class="add-cook-list red-star">
				<span>活动名称:</span>
				<input type="text" placeholder="请填写活动名称超过25个字符" maxlength="30" v-model="activeName" />
			</div>
			<!-- <div class="add-cook-list">
				<span>抢购副标题:</span>
				<input type="text" placeholder="不超过30个字符" maxlength="30" v-model="productSName" />
			</div> -->
			<div v-if="!this.bundling_id" class="add-cook-list red-star" style="height: 1.4rem;line-height: 1.4rem;" @click="showCookLvPicker">
				<span>活动类别:</span>
				<input type="text" placeholder="请选择" readonly="readonly" v-model="marketType" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>

			<div class="add-cook-list red-star border0">
				<span>选择商品</span>
				<!-- <span>{{ selectenGood }}</span> -->
			</div>
			<div class="add-cook-list">
				<!-- <span>选择抢购商品</span> -->
				<input type="text" placeholder="搜索店内商品" v-model="searchProduct" />
				<span class="search-product" @click="searchProducts">搜索</span>
			</div>
			<ul class="goodsList">
				<li v-for="(item, i) in goodsList" :key="i" @click="selectGood(item)">
					<img :src="item.goods_image" alt="" />
					<!-- <img src="@/assets/image/icon2/time.png" alt="" /> -->
					<p class="good-name">{{ item.goods_name }}</p>
					<p class="good-price">￥{{ item.goods_price }}</p>
				</li>
			</ul>
			<div class="margin_142">已选择商品:</div>
			<ul class="goodsList">
				<li v-for="(item, index) in selectGoods" :key="index">
					<img :src="item.goods_image" alt="" />
					<!-- <img src="@/assets/image/icon2/time.png" alt="" /> -->
					<p class="good-name">{{ item.goods_name }}</p>
					<!-- <p v-if="bundling_id">{{item.goods_price}}</p> -->
					<p class="good-price">￥{{ item.price }}</p>
					<input
						class="input-set "
						style="text-align: center;"
						type="number"
						placeholder="优惠价格(￥)"
						maxlength="10"
						@blur.prevent="newPriceAll()"
						v-model="item.new_price"
					/>
					<div class="delet-product" @click="delSelect(item)">删除所选</div>
				</li>
			</ul>
			<div class="add-cook-list">
				<span>优惠套装总价格(￥):</span>
				<input class="input-set" type="number" placeholder="优惠总套装价格" readonly="readonly" maxlength="10" v-model="oldPrice" />
				<!-- <span>原价: ￥{{ oldPrice }}</span> -->
			</div>
			<mt-cell title="买家是否承担运费">
				<input v-if="yunfei" type="number" placeholder="买家需承担的运费(￥)" v-model="yunfeiPrice" />
				<mt-switch v-model="yunfei"></mt-switch>
			</mt-cell>
			<mt-cell title="活动开启状态"><mt-switch v-model="activeType"></mt-switch></mt-cell>
			<div class="submit-button" @click="submit">提交申请</div>
		</div>
		<OneDropDown @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></OneDropDown>
		<!-- <OneDropDown @pickOneDropDown="pickSlectTime" ref="timePicker" :items="timeValues"></OneDropDown> -->
		<!-- <mt-datetime-picker
			ref="datePicker1"
			type="date"
			:startDate="new Date(new Date().getTime() + (24 * 60 * 60 * 1000))"
			yearFormat="{value}年"
			monthFormat="{value}月"
			dateFormat="{value}日"
			:value="new Date(new Date().getTime() + (24 * 60 * 60 * 1000))"
			@confirm="dateConfirm1"
		></mt-datetime-picker> -->
		<!-- <crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img> -->
		<!-- <purchase-region-picker ref="picker" @onConfirm="onPickerConfirm"></purchase-region-picker> -->
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import OneDropDown from '@/components/OneDropDown';
import PurchaseRegionPicker from './PurchaseRegionPicker.vue';
import { Toast } from 'mint-ui';
import { taozhuangSerach, sendBundlingbuy, getSuitListEdit } from '../../../api/sellerPromotion';
import CropImg from '../../CropImg'; // 图片裁切
export default {
	data() {
		return {
			activeName: '',
			productSName: '',
			values: [{ name: '仅零售', id: 1 }, { name: '仅社团', id: 2 }, { name: '零售和社团', id: 3 }],
			marketType: '',
			sendTime: '',
			endTimeName: '请选择时间',
			goods: [],
			selectenGood: '请搜索要参与活动的店内商品并选择',
			productPrice: '',
			introduce: '',
			searchProduct: '',
			goodsList: [],
			params: {
				bundling_name: '',
				blyhtz_type: '',
				discount_price: '',
				goods: [],
				bundling_freight_choose: 0,
				bundling_freight: '',
				state: 1
			},
			goods_price: '',
			marketId: '',
			startData: '',
			selectGoods: [],
			oldPrice: 0,
			yunfei: false,
			activeType: true,
			yunfeiPrice: '',
			bundling_id: this.$route.query.bundling_id ? this.$route.query.bundling_id : '',
			editGoods_list: [],
			canSend: true,
			productAllPrice: 0
		};
	},
	components: {
		HeadTitle,
		OneDropDown,
		PurchaseRegionPicker,
		'crop-img': CropImg
	},
	watch: {
		selectGoods(newVal, oldVal) {
			this.oldPrice = 0;
			for (var i = 0; i < newVal.length; i++) {
				this.oldPrice += parseFloat(newVal[i].new_price);
			}
		},
		editGoods_list(newVal, oldVal) {
			this.oldPrice = 0;
			for (var i = 0; i < newVal.length; i++) {
				this.oldPrice += parseFloat(newVal[i].new_price);
			}
		}
	},
	created() {
		console.log(this.bundling_id, 'this.bundling_id');
		if (this.bundling_id) {
			this.getSuitListEdit();
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		newPriceAll() {
			this.oldPrice = 0;
			for (var i of this.selectGoods) {
				this.oldPrice += +i.new_price;
			}
		},
		getSuitListEdit() {
			getSuitListEdit(this.bundling_id)
				.then(res => {
					var data = res.result.bundling_info;
					this.activeName = data.bl_name;
					this.marketId = data.blyhtz_type;
					if (data.blyhtz_type == 1) {
						this.marketType = '仅零售';
					} else if (data.blyhtz_type == 2) {
						this.marketType = '仅社团';
					} else {
						this.marketType = '零售和社团';
					}
					var arr = [];
					for (var i = 0; i < res.result.goods_list.length; i++) {
						let obj = {
							gid: res.result.goods_list[i].goods_id,
							price: res.result.goods_list[i].goods_price,
							new_price: res.result.goods_list[i].new_price,
							goods_name: res.result.goods_list[i].goods_name,
							goods_image: res.result.goods_list[i].goods_image,
							appoint: 1,
							new_price: res.result.goods_list[i].new_price
						};
						this.selectGoods.push(obj);
					}
					console.log(this.selectGoods, 'obj');
					this.productPrice = data.bl_discount_price;
					if (data.bl_freight_choose) {
						this.yunfei = true;
					} else {
						this.yunfei = false;
					}
					if (this.yunfei) {
						this.yunfeiPrice = data.bl_freight;
					}
					if (data.bl_state) {
						this.activeType = true;
					} else {
						this.activeType = fasle;
					}
					// this.activeType = data.bl_state

					this.editGoods_list = res.result.goods_list;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		showCookLvPicker() {
			this.$refs.CookLvPicker.currentValue = true;
		},
		pickSlectResult(values) {
			if( values[0].id == 3 || this.marketId == values[0].id ){
				
			} else {
				this.selectGoods = [];
				this.goodsList = [];
			}
			// console.log(values, 'pickOneDropDown');
			this.marketType = values[0].name;
			this.marketId = values[0].id;
		},
		onDate1(picker, values) {
			this.$refs.datePicker1.open();
		},
		searchProducts() {
			let params = {};
			params.searchProduct = this.searchProduct;
			if(!this.marketId) {
				params.blyhtz_type = 1
			}else {
				params.blyhtz_type = this.marketId
			}
			taozhuangSerach(params)
				.then(res => {
					if (!res.result.goods_list.length|| res.result.goods_list.length=='undefined') {
						Toast('店铺内暂无可选择商品');
					}
					this.goodsList = res.result.goods_list;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		selectGood(item) {
			// if () {
			var selectArr = {};
			// var selectGoods = []
			selectArr.gid = item.goods_id;
			selectArr.price = item.goods_price;
			selectArr.goods_name = item.goods_name;
			selectArr.goods_image = item.goods_image;
			selectArr.appoint = 1;
			selectArr.new_price = item.new_price;
			this.selectGoods = this.unique(this.selectGoods.concat([selectArr]));
			console.log(this.selectGoods, 'selectGoods');
			// } else {
			// 	Toast('请检查套装价格')
			// 	this.canSend = false
			// }

			// this.$forceUpdate();
		},
		unique(arr) {
			const res = new Map();
			return arr.filter(arr => !res.has(arr.gid) && res.set(arr.gid, 1));
		},
		delSelect(e) {
			this.selectGoods = this.selectGoods.filter(item => item.gid !== e.gid);
		},
		submit() {
			// var params = {};
			if (this.bundling_id) {
				this.params.bundling_id = this.bundling_id;
			}
			this.params.bundling_name = this.activeName;
			this.params.blyhtz_type = this.marketId;
			this.params.discount_price = this.oldPrice;
			if (this.yunfei) {
				this.params.bundling_freight_choose = 0;
				if (!this.yunfeiPrice) {
					Toast('请填写买家承担的运费');
					return;
				} else {
					this.params.bundling_freight = this.yunfeiPrice;
				}
			} else {
				this.params.bundling_freight_choose = 1;
			}
			if (this.activeType) {
				this.params.state = 1;
			} else {
				this.params.state = 0;
			}
			// console.log(this.params.goods,this.selectGoods)
			if (!this.params.bundling_name) {
				Toast('请填写活动名称');
			} else if (!this.params.blyhtz_type) {
				Toast('请填写活动类目');
			} /* else if ((this.params.goods.length <= 1)) {
				debugger
				Toast('请选择组合套装商品且商品数量大于一个');
			} */else {
				var goods = JSON.parse(JSON.stringify(this.selectGoods));

				for (var i of goods) {
					// console.log('@@@',i,i.new_rice);
					if (+i.price < +i.new_price || +i.new_price <= 0||!i.new_price) {
						this.canSend = false;
						Toast('请检查套装价格');
						return;
						break;
					} else {
						this.canSend = true;
					}
				}
				if (!this.canSend) {
					Toast('请检查套装价格');
					return;
				}
				// return;
				var params = JSON.parse(JSON.stringify(this.params));
				params.goods = goods;
				if(params.goods.length <= 1 || params.goods.length > 3) {
					Toast('请选择组合套装商品且商品数量>1且<4');
					return
				}
				// console.log('params',params)
				sendBundlingbuy(params)
					.then(res => {
						// if (res.code == 10001) {
						// 	Toast(res.message);
						// } else {
						Toast(res.message);
						// }
						this.$router.go(-1);
					})
					.catch(err => {
						Toast(err.message);
					});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	padding-bottom: 4rem;
	background-color: #f4f5f7;
	min-height: 100vh;
	ul {
		li {
		}
	}
}
// 弹性布局
@mixin item_flex {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.add-cook {
	// padding-bottom: 3rem;
	background-color: #fff;
	.add-cook-list {
		display: flex;
		justify-content: space-between;
		padding: 1.19rem 1.43rem 1.19rem 0;
		margin-left: 1.43rem;
		align-items: center;
		border-bottom: 1px solid #eee;
		span {
			font-size: 1.33rem;
			font-weight: 400;
			color: #161616;
			margin-right: 1.43rem;
			flex-shrink: 0;
			&.search-product {
				background-color: RGBA(234, 67, 58, 1);
				padding: 0.6rem 1rem;
				border-radius: 1.3rem;
				margin-right: 0;
				color: #fff;
			}
		}
		input {
			flex-grow: 1;
			font-size: 1.33rem;
		}
		img {
			width: 1.33rem;
			height: 1.33rem;
		}
	}
	.textarea-wrap {
		font-size: 1.33rem;
		// padding: 1.19rem 1.43rem 1.19rem;
		margin: 1.43rem;
		border-bottom: 1px solid #eee;
		div {
			textarea {
				font-size: 1.33rem;
				width: 100%;
				padding: 0;
			}
		}

		span {
			margin-bottom: 2.38rem;
			display: inline-block;
		}
	}
	.up-data-img {
		height: 8.24rem;
		position: relative;
		span {
		}
		.img-wrap {
			position: absolute;
			right: 1.43rem;
			width: 8.24rem;
			height: 8.24rem;
			line-height: 8.24rem;
			text-align: center;
			background-color: #f4f5f7;
			border-radius: 0.76rem;
			img {
				width: 2.62rem;
				height: 2.57rem;
				position: absolute;
				top: 50%;
				transform: translate(-50%, -50%);
				left: 50%;
			}
		}
		img {
			width: 8.24rem;
			height: 8.24rem;
		}
		input {
			position: absolute;
			right: 1.43rem;
			width: 8.24rem;
			height: 8.24rem;
			opacity: 0;
		}
	}
	.submit-button {
		// bottom: 1rem;
		height: 3.8rem;
		margin: 1.43rem;
		line-height: 3.8rem;
		text-align: center;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.9rem;
		font-size: 1.33rem;
		font-weight: 400;
		color: #ffffff;
	}
}
.send_time {
	padding: 1.2rem 1rem;
	background: #ffffff;
	box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: 1.2rem 0;

	.s_t_icon {
		width: 2.555rem;
		img {
			width: 100%;
		}
	}

	.s_t_time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 88%;
		padding-right: 1rem;
		font-size: 1.14rem;
		box-sizing: border-box;

		.abs_right {
			transform: rotate(90deg);
			width: 1.14rem;
			margin-left: 0.2rem;
		}
	}
}
.red-star {
	&::after {
		content: '*';
		position: absolute;
		left: 0.8rem;
		color: red;
	}
}
.red-stars {
	&::after {
		content: '*';
		position: absolute;
		left: -0.5rem;
		color: red;
	}
}
.goodsList {
	display: flex;
	overflow-x: scroll;
	li {
		text-align: center;
		padding: 0.8rem 2rem;
		img {
			height: 7rem;
		}
		p.good-name {
			margin: 0.6rem 0;
		}
		p.good-price {
		}
	}
}
.border0 {
	border-bottom: 0 !important;
}
.margin_142 {
	margin: 1.42rem 1.42rem 0;
}
.delet-product {
	background-color: #eee;
	margin-top: 0.5rem;
	border-radius: 1rem;
}
.input-set {
	width: 8rem;
	border: 1px solid #eee;
	padding: 0.5rem;
	flex-grow: 0 !important;
}
</style>
