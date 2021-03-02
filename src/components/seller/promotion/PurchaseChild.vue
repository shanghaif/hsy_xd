<template>
	<div class="container p_discount hsy_main">
		<!-- 头部标签 -->
		<head-title title="新增抢购" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor="#626771" color="#FFFFFF"></head-title>
		<div class="add-cook">
			<div class="add-cook-list red-star">
				<span>抢购名称:</span>
				<input type="text" placeholder="不超过30个字符" maxlength="30" v-model="productName" />
			</div>
			<div class="add-cook-list">
				<span>抢购副标题:</span>
				<input type="text" placeholder="不超过30个字符" maxlength="30" v-model="productSName" />
			</div>
			<div class="add-cook-list red-star" style="height: 1.4rem;line-height: 1.4rem;" @click="showCookLvPicker">
				<span>抢购市场类型:</span>
				<input type="text" placeholder="请选择" readonly="readonly" v-model="marketType" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			<div class="add-cook-list red-star" @click="onDate1">
				<span>日期:</span>
				<span>{{ sendTime ? $moment(sendTime).format('YYYY-MM-DD') : '配送起始时间' }}</span>
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>
			<div class="add-cook-list red-star" @click="onRegion">
				<span>时间:</span>
				<span>{{ endTimeName }}</span>
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>

			<div class="add-cook-list red-star border0">
				<span>选择抢购商品</span>
				<span>{{ selectenGood }}</span>
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
			<div class="add-cook-list red-star">
				<span>抢购价格(￥):</span>
				<input type="number" placeholder="请输入抢购价格" maxlength="10" v-model="productPrice" />
			</div>
			<div class="add-cook-list up-data-img red-stars">
				<span>抢购活动图片</span>
				<img v-if="goodProveImg" :src="goodProveImg" />
				<div class="img-wrap" v-else><img src="@/assets/image/icon2/icon-add-img.png" alt="" /></div>
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" @change="uploadCookProve($event)" />
			</div>
			<div class="add-cook-list up-data-img">
				<span>抢购推荐位图片</span>
				<img v-if="goodProveImg1" :src="goodProveImg1" />
				<div class="img-wrap" v-else><img src="@/assets/image/icon2/icon-add-img.png" alt="" /></div>
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" @change="uploadPurchaseProve($event)" />
			</div>
			<div class="add-cook-list">
				<span>虚拟数量:</span>
				<input type="number" placeholder="只做前台显示，不影响成交记录" maxlength="5" v-model="productXuNiNumber" />
			</div>
			<div class="add-cook-list red-star">
				<span>限购数量:</span>
				<input type="number" placeholder="买家ID可抢购的最大数量，不限量请填'0'" maxlength="5" v-model="productXianGouNumber" />
			</div>
			<!-- <div class="add-cook-list" v-show="!this.$route.query.store_id">
				<span>单位:</span>
				<input type="text" v-model="unit" />
			</div>
			<div class="add-cook-list up-data-img">
				<span>厨师证明</span>
				<img v-if="cookProveImg" :src="cookProveImg" />
				<div class="img-wrap" v-else><img src="@/assets/image/icon2/icon-add-img.png" alt="" /></div>
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" @change="uploadCookProve($event)" />
			</div>-->
			<div class="textarea-wrap">
				<span class="">本抢介绍:</span>
				<div class=""><textarea maxlength="140" v-model="introduce" name="" id="" cols="30" rows="10" placeholder="请输入"></textarea></div>
			</div>

			<div class="submit-button" @click="submit">提交申请</div>
		</div>
		<OneDropDown @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></OneDropDown>
		<OneDropDown @pickOneDropDown="pickSlectTime" ref="timePicker" :items="timeValues"></OneDropDown>
		<mt-datetime-picker
			ref="datePicker1"
			type="date"
			:startDate="new Date(new Date().getTime() + (24 * getResTime * 60 * 60 * 1000))"
			yearFormat="{value}年"
			monthFormat="{value}月"
			dateFormat="{value}日"
			:value="new Date(new Date().getTime() + (24 *getResTime * 60 * 60 * 1000))"
			@confirm="dateConfirm1"
		></mt-datetime-picker>
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
import { searchProducts, getTimeArry, sendGroupbuy, uploadSellerImg ,getResTimes} from '../../../api/sellerPromotion';
import CropImg from '../../CropImg'; // 图片裁切
export default {
	data() {
		return {
			productName: '',
			productSName: '',
			values: [{ name: '仅零售', id: 1 }, { name: '仅社团', id: 2 }, { name: '零售和社团', id: 3 }],
			marketType: '',
			sendTime: '',
			endTimeName: '请选择时间',
			goods: [
				{
					img: '@/assets/image/icon2/time.png',
					name: 'aaaaa',
					price: 123123
				},
				{
					img: '@/assets/image/icon2/time.png',
					name: 'aaaaa',
					price: 123123
				}
			],
			selectenGood: '请搜索要参与活动的店内商品并选择',
			productPrice: '',
			goodProveImg: '',
			goodPurchaseImg: '',
			introduce: '',
			productXuNiNumber: 0,
			productXianGouNumber: '',
			searchProduct: '',
			goodsList: [],
			timeValues: [],
			oldTime: '',
			file_name: '',
			file_name1: '',
			goodProveImg1: '',
			params: {},
			goods_price: '',
			marketId:'',
			startData:'',
			getResTime:0
		};
	},
	components: {
		HeadTitle,
		OneDropDown,
		PurchaseRegionPicker,
		'crop-img': CropImg
	},
	created() {
		// this.sendTime = new Date(new Date().getTime() + (24 * this.getResTime * 60 * 60 * 1000));
		// var endTime = new Date().getHours();
		// this.endTime = endTime;
		// if (endTime < 9) {
		// 	this.endTimeName = '0' + endTime + ':00-0' + (endTime + 1) + ':00';
		// } else if (endTime == 9) {
		// 	this.endTimeName = '09:00-10:00';
		// } else {
		// 	this.endTimeName = endTime + ':00-' + (endTime + 1) + ':00';
		// }
		// this.getTimeArry();
		this.getResTimes()
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		getResTimes() {
			getResTimes().then(res => {
					this.getResTime = res.result;
					this.sendTime = new Date(new Date().getTime() + (24 * this.getResTime * 60 * 60 * 1000));
					this.startData = this.$moment(this.sendTime).format('YYYY-MM-DD');
					// console.log(this.startData,'created')
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
				this.goodsList = [];
				this.good_id = '';
				this.goods_price = '';
				this.selectenGood = '';
			}
			// console.log(values, 'pickOneDropDown');
			this.marketType = values[0].name;
			this.marketId = values[0].id;
		},
		onRegion(picker, values) {
			// this.$refs.picker.currentValue = true;
			// 时间段
			// this.sendTime/1000
			// console.log(this.startData,'this.startData')
			getTimeArry(this.startData)
				.then(res => {
					var timeArry = [];
					for (var i = 0; i < res.result.length; i++) {
						console.log(res.result[i]);
						// return
						timeArry.push({
							name: res.result[i].bt + ':00-' + res.result[i].et + ':00  剩余' + res.result[i].num + '个',
							id: i,
							oldDate: res.result[i]
						});
					}
					// return false;
					this.timeValues = timeArry;
					console.log(this.timeValues, 'this.timeValues');
				})
				.catch(function(error) {
					Toast(error.message);
				});
			this.$refs.timePicker.currentValue = true;
		},
		// onPickerConfirm(values) {
		// 	var cTime = this.sendTime + (values[0].time + parseInt(this.getResTime)+1) * 3600000;
		// 	console.log(cTime,'cTime')
		// 	var nTime = new Date().getTime();
		// 	if (nTime >= cTime) {
		// 		Toast('请重新选择时间');
		// 		return false;
		// 	}
		// 	this.endTimeName = values[0].time_name;
		// 	this.endTime = values[0].time;
		// },
		// ...mapMutations({
		// 	saveHomecartCartType: 'saveHomecartCartType', //购物车商品类型
		// }),
		onDate1(picker, values) {
			this.$refs.datePicker1.open();
		},
		pickSlectTime(values) {
			this.endTimeName = values[0].name;
			this.oldTime = values[0].oldDate;
		},
		dateConfirm1(v) {
			console.log(new Date(v))
			var sTime = new Date(v.toLocaleDateString()).getTime();
			var nTime = new Date(new Date().toLocaleDateString()).getTime();
			if (nTime == sTime) {
				//当前天数
				var nHourse = new Date().getHours();
				// if (nHourse > this.endTime) {
				// 	Toast('请重新选择时间');
				// 	return false;
				// }
			}
			this.sendTime = sTime;
			this.startData = this.$moment(this.sendTime).format('YYYY-MM-DD');
			console.log(this.startData)
		},
		// checkfcode() {
		// 	checkFCode(this.store_final_total_list.store_cart_list_api[0].goods_list[0].goods_commonid, this.f_code)
		// 		.then(res => {
		// 			this.f_code_check = true;
		// 		})
		// 		.catch(function(error) {
		// 			Toast(error.message);
		// 		});
		// },
		searchProducts() {
			let params = {};
			params.searchProduct = this.searchProduct;
			if(!this.marketId) {
				params.groupbuy_type = 1
			}else {
				params.groupbuy_type = this.marketId
			}
			searchProducts(params)
				.then(res => {
					if (!res.result.length || res.result.length=='undefined') {
						Toast('店铺内暂无可选择商品');
					}
					this.goodsList = res.result;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		selectGood(item) {
			this.good_id = item.goods_commonid;
			this.goods_price = item.goods_price;
			this.selectenGood = item.goods_name + '￥' + item.goods_price;
			// debugger
		},
		uploadCookProve(event) {
			var that = this;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			// if (event.target.files[0].size > 200 * 1024) {
			// 	// Toast("上传图片不得大于200k,请裁切图片后上传");

			// 	// 传值 隐藏 当前页面 打开 插件
			// 	this.cropDataShow = false;
			// 	this.$refs.cropImg.currentValue = true;
			// 	// 将当前 的 input 里的 文件 传递给 插件
			// 	this.$refs.cropImg.files = event.target.files;

			// 	// 清除 当前 input 的 值
			// 	event.target.files = null;
			// 	event.target.type = null;
			// 	// 重新 设置 类型 是文件
			// 	event.target.type = 'file';

			// 	return false;
			// }

			formdata.append('groupbuy_image', event.target.files[0]);
			formdata.append('name', 'groupbuy_image');
			// console.log(event.target.files[0], formdata);
			uploadSellerImg(formdata)
				.then(res => {
					that.file_name = res.result.file_name;
					that.goodProveImg = res.result.file_url;
					// this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100)
					// this.memberEdit({ member_avatar: this.user.avatar })
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		uploadPurchaseProve(event) {
			var that = this;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			// if (event.target.files[0].size > 200 * 1024) {
			// 	// Toast("上传图片不得大于200k,请裁切图片后上传");

			// 	// 传值 隐藏 当前页面 打开 插件
			// 	this.cropDataShow = false;
			// 	this.$refs.cropImg.currentValue = true;
			// 	// 将当前 的 input 里的 文件 传递给 插件
			// 	this.$refs.cropImg.files = event.target.files;

			// 	// 清除 当前 input 的 值
			// 	event.target.files = null;
			// 	event.target.type = null;
			// 	// 重新 设置 类型 是文件
			// 	event.target.type = 'file';

			// 	return false;
			// }
			formdata.append('groupbuy_image', event.target.files[0]);
			formdata.append('name', 'groupbuy_image');
			// console.log(event.target.files[0], formdata);
			uploadSellerImg(formdata)
				.then(res => {
					that.file_name1 = res.result.file_name;
					that.goodProveImg1 = res.result.file_url;
					// this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100)
					// this.memberEdit({ member_avatar: this.user.avatar })
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		// 图片 接收 图片
		// fun_getCropImgData(obj) {
		// 	// 关闭插件 显示 当前页面
		// 	this.$refs.cropImg.currentValue = false;
		// 	this.cropDataShow = true;
		// 	// 如果 是 带值 传递过来的 上传 图片
		// 	if (obj.type) {
		// 		uploadCropImg(obj.data)
		// 			.then(res => {
		// 				this.file_name = res.result.file_name;
		// 				this.cookProveImg = res.result.file_path;
		// 				this.$forceUpdate();
		// 			})
		// 			.catch(err => {
		// 				Toast(err.message);
		// 			});
		// 	}
		// },
		submit() {
			var params = {};
			this.params.groupbuy_name = this.productName;
			this.params.start_time = this.startData;
			this.params.bt = this.oldTime.bt;
			this.params.et = this.oldTime.et;
			this.params.groupbuy_type = this.marketId;
			this.params.groupbuy_price = this.productPrice;
			this.params.groupbuy_image = this.file_name;
			this.params.groupbuy_image1 = this.file_name1;
			this.params.groupbuy_remark = this.productSName;
			this.params.virtual_quantity = this.productXuNiNumber;
			this.params.upper_limit = this.productXianGouNumber;
			this.params.groupbuy_intro = this.introduce;
			this.params.groupbuy_goods_id = this.good_id;
			if (!this.params.groupbuy_name) {
				Toast('请填写抢购名称');
			} else if (!this.params.groupbuy_type) {
				Toast('请填写抢购市场类型');
			} else if (!this.sendTime) {
				Toast('请选择抢购日期');
			} else if (!this.params.bt) {
				Toast('请选择抢购时间段');
			} else if (!this.params.groupbuy_goods_id) {
				Toast('请选择抢购商品');
			} else if (this.params.groupbuy_price == false|| parseFloat(this.params.groupbuy_price) >= parseFloat(this.goods_price)) {
				Toast('请填写正确的抢购价格');
			} else if (!this.params.groupbuy_image) {
				Toast('请选择抢购活动图片');
			} else if (!this.params.upper_limit) {
				Toast('请填写正确的限购数量，不限量请填0');
			} else {
				console.log(this.params.groupbuy_price,this.goods_price)
				sendGroupbuy(this.params)
					.then(res => {
						Toast(res.message);
						this.$router.go(-1)
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
		position: absolute;
		// bottom: 3.5rem;
		left: 1.43rem;
		right: 1.43rem;
		height: 3.8rem;
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
</style>
