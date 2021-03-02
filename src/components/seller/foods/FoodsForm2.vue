<template>
<div>
	<div class="container goods-form-2 hsy_main" v-show="cropDataShow">

		<head-title :title="editType?'菜品编辑':'菜品发布'"></head-title>
		
		<!-- <mt-cell class="mast_value" title="菜品分类" is-link>{{ goods_class.gctag_name }}</mt-cell> -->
		<mt-field class="mast_value" label="菜品名称" v-model="goods.goods_name"></mt-field>

		<mt-field type="number" class="mast_value" label="价格" :readonly="ifSpec" v-model="goods.goods_price"></mt-field>
	
	
	
		<!-- <mt-field class="mast_value" type="number" label="菜品库存" :readonly="ifSpec || editType" v-model="goods.goods_storage"></mt-field> -->
		<!-- <mt-field label="库存预警值" type="number" :readonly="ifSpec" v-model="goods.goods_storage_alarm"></mt-field> -->
		
		<mt-cell class="mt-5 mast_value" title="菜品图片">
			<div class="user-avatar-wrapper">
				<div v-if="goods.goods_image" class="user-avatar">
					<img :src="goods.goods_image_url" @click="openImage(goods.goods_image_url)" />
					<span @click="dropImage('goods_image')" class="del-btn iconfont">&#xe6d8;</span>
				</div>
				<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadImage('goods_image', $event)">
					
					<img src="@/assets/image/icon2/icon-empty.png" alt="" />
					<input type="file" accept="image/*" />
				</div>
			</div>
		</mt-cell>
		
		<div @click="showClassPicker = true"><mt-cell title="本店分类" is-link>{{sgcate_name[0]}}</mt-cell></div>
		<mt-cell title="立即发布"><mt-switch v-model="goods.goods_state"></mt-switch></mt-cell>

		<div v-if="!goods.goods_state" @click="onDatetime">
			<mt-cell title="发布时间" is-link>{{ goods_shelftime ? $moment.unix(goods_shelftime).format('YYYY-MM-DD HH:mm') : '' }}</mt-cell>
		</div>
		

		<mt-cell title="菜品推荐"><mt-switch v-model="goods.goods_commend"></mt-switch></mt-cell>
		<!-- <mt-button size="large" type="primary" class="mt-30" @click="nextStep">{{ commonid ? '保存' : '下一步' }}</mt-button> -->
		<div class="add-button" @click="nextStep"><span>{{ editType ? '保存' : '下一步' }}</span></div>
		<div>
			<!-- 查看图片 -->
			<mt-popup v-model="isshow" popup-transition="popup-fade" class="popup">
				<img :src="showimage" :style="getBannerStyle" @click="isshow = false" />
			</mt-popup>

			<mt-popup class="middle-popup" v-model="bodyEditVisible" popup-transition="popup-fade">
				<mt-field v-if="bodyItem.type == 'text'" placeholder="请输入内容" v-model="bodyItem.value" type="textarea" />
				<div v-if="bodyItem.type == 'image'" class="user-avatar iconfont icon-xiangji" ref="upload_btn" @change="uploadImage('goods_body', $event)">
					<img :src="bodyItem.value_url" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
			</mt-popup>

			<mt-popup class="middle-popup type-popup" v-model="bodyAddVisible" popup-transition="popup-fade">
				<mt-cell title="类型">
					<mt-radio v-model="bodyType" :options="bodyTypeOptions"></mt-radio>
				</mt-cell>

				<div class="btn-wrapper">
					<mt-button class="btn" type="default" @click="bodyAddVisible = false">取消</mt-button>
					<mt-button class="btn" type="primary" @click="confirmBodyAdd">确定</mt-button>
				</div>
			</mt-popup>
		</div>
		<div>

			<mt-popup v-model="showTransportList" position="right" class="common-popup-wrapper">
				<transport-list
					ref="transportList"
					:ifComponent="true"
					@useTransport="useTransport"
					@editTransport="editTransport"
					@addTransport="
						transparentQuery = { action: 'add', transport_id: 0 };
						showTransportForm = true;
					"
					@closeTransortList="showTransportList = false"
				/>
			</mt-popup>

			<mt-popup v-model="showTransportForm" position="right" class="common-popup-wrapper">
				<transport-form :query="transparentQuery" :ifComponent="true" @saveTransport="saveTransport" @closeTransortForm="showTransportForm = false" />
			</mt-popup>

			<mt-popup v-model="showClass" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="店铺分类" class="common-header">
						<mt-button slot="left" icon="back" @click="showClass = false"></mt-button>
						<mt-button slot="right" @click="addStoreClass">新增</mt-button>
					</mt-header>
				</div>
				<div class="common-popup-content">
					<div
						v-for="(item, index) in sgcate_id"
						:key="index"
						@click="
							showClassPicker = true;
							sgcate_index = index;
						"
					>
						<mt-cell title="选择分类" is-link>{{ sgcate_name[index] }}</mt-cell>
					</div>
				</div>
			</mt-popup>
		
		</div>
		<div>
			<mt-popup v-model="showClassPicker" position="bottom">
				<mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
					<div class="toolbar">
						<button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
						<div class="picker-header">选择分类</div>
						<button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
					</div>
				</mt-picker>
			</mt-popup>

			
		</div>
		
	</div>

	<mt-datetime-picker
		ref="datetimePicker"
		type="datetime"
		:startDate="new Date()"
		yearFormat="{value}年"
		monthFormat="{value}月"
		dateFormat="{value}日"
		hourFormat="{value}时"
		minuteFormat="{value}分"
		:value="goods_shelftime ? new Date(goods_shelftime) : new Date()"
		@confirm="datetimeConfirm"
		@cancel="goods_shelftime = 0"
	></mt-datetime-picker>

	<crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img>
</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle.vue';
import transportList from '../transport/transportList';
import transportForm from '../transport/transportForm';
import RegionPicker from '../../../components/RegionPicker';


import { getCommonData, goodsEdit, uploadInfoFile, goodsSave, uploadGoodsCropImg } from '../../../api/sellerFoods';
import { getGoodsClassTree } from '../../../api/sellerGoodsClass';

import '@/assets/style/hsy-mint.scss';

import CropImg from '../../CropImg'

export default {
	data() {
		return {
			cropImgIndex:null,    // 裁切的图片名称
			cropDataShow:true,    // 切换 插件 隐藏 表单页面
			
			options: [{ title: '选择菜品分类' }, { title: '填写菜品详情' }, { title: '上传菜品图片' }],
			
			
			class_id: this.$route.query.class_id,
			commonid: this.$route.query.commonid,
			editType: this.$route.query.editType,  // 编辑？

			goods: { 
				goods_state: true,
				goods_commend: false,
			},  //  商品 详情
			
			
			showClass: false,
			showTransportList: false,
			showTransportForm: false,
			showClassPicker: false,
			showAttr: false,
			
			nosy: true,
			
			ifSpec: false,
			
			showimage: '',
			isshow: false,
			goods_shelftime: 0,
			virtual_indate: 0,
			
			appoint_satedate: 0,
			goods_scdate: 0,
			sp_name: {},
			
			
			attr_list: false,
			sp_id: 0,
			spec_add_value: '',

			spec: {},
			bodyVisible: false,
			bodyIndex: 0,
			bodyList: [
				{
					type: 'text',
					value: ''
				}
			],
			bodyItem: false,
			bodyEditVisible: false,
			bodyAddVisible: false,
			bodyTypeOptions: [
				{
					label: '文字',
					value: 'text'
				},
				{
					label: '图片',
					value: 'image'
				}
			],
			bodyType: 'text',
			
			
			
			transparentQuery: { action: 'add', transport_id: 0 },
			items: false,
			sgcate_id: [0],
			sgcate_name: [''],
			sgcate_index: 0,
			goods_class: {},
			attr_checked: false,

		};
	},

	created() {

		getGoodsClassTree()
			.then(res => {
				this.items = res.result.class_list;
			})
			.catch(error => {
				Toast(error.message);
			});
			
			
		getCommonData(this.class_id)
			.then(res => {
				
				this.goods_class = res.result.goods_class;


			})
			.catch(error => {
				Toast(error.message);
			});

			if (this.commonid) {
				goodsEdit(this.commonid).then(res => {
					this.attr_checked = res.result.attr_checked;
					var goods = res.result.goods;
					//====================

					this.nosy = true;

					this.goods_shelftime = goods.goods_shelftime;
					this.virtual_indate = goods.virtual_indate;
					this.goods = goods;
					this.goods.goods_state == 0?( this.goods.goods_state = false):(this.goods.goods_state = true);
					this.goods.goods_commend == 0?( this.goods.goods_commend = false):(this.goods.goods_commend = true);

					if (goods.spec_name) {
						for (var k in goods.spec_name) {
							this.sp_name[k] = goods.spec_name[k];
						}
					}
					this.sgcate_id = res.result.store_class_goods;
					let store_goods_class = res.result.store_goods_class;
					for (var i in this.sgcate_id) {
						if (store_goods_class[this.sgcate_id[i]]) {
							this.sgcate_name[i] = store_goods_class[this.sgcate_id[i]].storegc_name;
						}
					}
					
				})
				.catch(error => {
					Toast(error.message);
				});
			}
	},
	computed: {
		...mapState({
			mclass: state => state.member.mclass,
			info: state => state.seller.info
		}),


		getBannerStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width;
			let itemHeight = height;
			return {
				maxWidth: itemWidth + 'px',
				maxHeight: itemHeight + 'px'
			};
		},

		// 选择分类 计算
		buildItems: function() {
			if (!this.items || !this.items[0]) {
				return [];
			}
			let items = new Array();

			this.getDefaultItems(this.items, items);
			return items;
		}
	},
	components: {
		RegionPicker,
		transportForm,
		transportList,
		"head-title":HeadTitle,
		
		
		"crop-img": CropImg
	},
	methods: {
		// 店铺 分类 新增
		addStoreClass() {
			this.sgcate_id.push(0);
			this.sgcate_name.push('');
		},

		// 选择分类
		getDefaultItems(_item, defaultItems) {
			defaultItems.push({
				flex: 1,
				values: _item,
				textAlign: 'center'
			});
			defaultItems.push({
				flex: 1,
				values: _item[0].children,
				textAlign: 'center'
			});
		},

		// 取消 选择分类
		cancelClass() {
			this.showClassPicker = false;
		},
		// 确认选择分类
		confirmClass() {
			let values = this.$refs.class_picker.getValues();
			var temp = values[1];
			if (!temp) {
				temp = values[0];
			}
			this.sgcate_name.splice(this.sgcate_index, 1, temp.value);
			this.sgcate_id[this.sgcate_index] = temp.id;

			this.showClassPicker = false;
		},
		// 更改分类函数
		onClassChange(picker, values) {
			picker.setSlotValues(1, values[0] ? values[0].children : []);
			picker.setSlotValues(2, values[1] ? values[1].children : []);
		},

		saveTransport() {
			this.$refs.transportList.reload();
			this.showTransportForm = false;
		},
		useTransport(transport_id, transport_title) {
			this.goods.transport_id = transport_id;
			this.goods.transport_title = transport_title;
			this.showTransportList = false;
		},
		editTransport(transport_id) {
			this.transparentQuery = { action: 'edit', transport_id: transport_id };
			this.showTransportForm = true;
		},
		
		// 类型 确定取消
		confirmBodyAdd() {
			let bodyItem = { type: this.bodyType, value: '' };
			this.bodyList.splice(this.bodyIndex, 0, bodyItem);
			this.bodyAddVisible = false;
			this.bodyEdit(this.bodyIndex, bodyItem);
		},
		bodyAdd(index) {
			this.bodyAddVisible = true;
			this.bodyIndex = index;
		},
		bodyEdit(index, item) {
			this.bodyEditVisible = true;
			this.bodyItem = item;
		},
		
		// 下一步 
		nextStep() {
			// console.log(this.goods);
			// console.log( this.sgcate_id, this.sgcate_name );
			// console.log( this.goods_class );
			var newCommid = null;
			if( this.editType ){
				newCommid = this.commonid;
			}
			if( !this.goods.goods_name ){
				Toast('请输入菜品名称');
				return false;
			}
			if( !this.goods.goods_image ){
				Toast('请上传菜品图片');
				return false;
			}
			if( !this.goods.goods_price ){
				Toast('请输入菜品价格');
				return false;
			}
			if( this.sgcate_id.length <=0 ){
				Toast('请选择本店分类');
				return false;
			}
			// this.goods.goods_l_price = 1;
			// this.goods.goods_c_price = 1;
			// this.goods.goods_p_price = 1;
			// this.goods.goods_j_price = 1;
			this.goods.goods_storage = 99999;
			goodsSave(
				{
					commonid: newCommid,

					class_id : this.goods_class.gc_id,
					gc_id1 : this.goods_class.gc_id_1,
					gc_id2 : this.goods_class.gc_id_2,
					goods:this.goods,
					
          'sgcate_id': this.sgcate_id,
					// goods : {
					// 	goods_name : goods_name,        // 菜品 名称
					// 	goods_image : goods_image,      // 菜品图片
					// 	goods_price : goods_price,      // 菜品价格
					// 	goods_commend : goods_commend,  // 菜品推荐
					// 	goods_storage : goods_storage,  // 菜品库存
					// 	goods_state : goods_state,      // 立即发布
					// }
				}
			).then(res => {
				Toast(res.message);	
				this.$router.push({ name: 'SellerFoodsForm3', query: { commonid: res.result.commonid } });
			})
			.catch(error => {
				Toast(error.message);
			});
		},

		// 查看图片 
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},
		// 删除图片
		dropImage(type) {
			this.goods[type] = '';
			this.$forceUpdate();
		},

		// 上传图片
		uploadImage(type, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
        // Toast("上传图片不得大于200k,请裁切图片后上传");
        // 保存 当前 值 名称
        this.cropImgIndex = type;
        // 传值 隐藏 当前页面 打开 插件
        this.cropDataShow = false;
        this.$refs.cropImg.currentValue = true;
        // 将当前 的 input 里的 文件 传递给 插件
        this.$refs.cropImg.files = event.target.files;

        // 清除 当前 input 的 值
        event.target.files = null;
        event.target.type = null;
        // 重新 设置 类型 是文件
        event.target.type = "file";

        return false;
			}
			formdata.append('file', event.target.files[0]);
			formdata.append('name', 'file');
			uploadInfoFile(formdata)
				.then(res => {
					if (type == 'goods_body') {
						this.bodyItem.value = res.result.path;
						this.bodyItem.value_url = res.result.url;
						this.bodyEditVisible = false;
					} else {
						this.goods[type] = res.result.path;
						this.goods[type + '_url'] = res.result.url;
					}
					this.$forceUpdate();
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		

		// 图片 接收 图片
		fun_getCropImgData(obj){
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			this.cropDataShow = true;
			// 如果 是 带值 传递过来的 上传 图片
			if( obj.type ){
				uploadGoodsCropImg(obj.data).then(res=>{
					
					if (this.cropImgIndex == 'goods_body') {
						this.bodyItem.value = res.result.file_name;
						this.bodyItem.value_url = res.result.file_path;
						this.bodyEditVisible = false;
					} else {
						this.goods[this.cropImgIndex] = res.result.file_name;
						this.goods[this.cropImgIndex + '_url'] = res.result.file_path;
					}
					this.$forceUpdate();
				}).catch(err=>{
					Toast(err.message);
				})
				
			}
		},

		datetimeConfirm(value) {
			this.goods.goods_shelftime = parseInt(value.getTime() / 1000);
			this.goods_shelftime = this.goods.goods_shelftime;
		},
		onDatetime(picker, values) {
			this.$refs.datetimePicker.open();
		},
		
		
		
	},
	
};
</script>
<style>
.goods-form-2 input[readonly] {
	color: #999;
}
</style>
<style scoped lang="scss">
.container {
	background: #fff;
	/*------------------------*/
	/deep/.mint-cell {
		&::after {
			right: 0;
			left: 1.42rem;
			background-color: #efefef;
		}
	}
	/deep/ .mint-cell-wrapper {
		padding: 1.19rem 1.42rem;
		.mint-field-core {
			text-align: right;
		}
	}
	& /deep/ .mint-cell-text {
		padding-left: 0.66rem;
	}
	.mast_value {
		& /deep/ .mint-cell-text {
			position: relative;
		}
		& /deep/ .mint-cell-text::after {
			content: '*';
			color: red;
			font-size: 1.2rem;
			position: absolute;
			left: 0.1rem;
			top: 0.1rem;
		}
	}
	/*------------------------*/

	.label {
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		background: #f4f5f7;
	}
	.user-avatar-wrapper {
		display: inline-block;
		vertical-align: top;
		// margin-right: 0.5rem;
		// margin-bottom: 0.5rem;
	}
	.user-avatar-wrapper .del-btn {
		mix-blend-mode: difference;
		font-size: 1.6rem;
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
	}
	.user-avatar {
		display: block;
		// border: 1px solid #eee;
		position: relative;
		border-radius: 0.76rem;
		width: 7.61rem;
		height: 7.61rem;
		margin: 0 auto;
		text-align: center;
		img {
			width: 100%;
			height: 100%;
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
	.avatar-empty {
		background-color: #f4f5f7;
		line-height: 7.61rem;
		img {
			width: 2.86rem;
			height: 2.52rem;
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
			font-size: 1rem;
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
	.middle-popup {
		width: 80%;
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

.cell-list {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	padding: 1.19rem 1.43rem;
	margin-left: 1.43rem;
	display: flex;
	justify-content: space-between;
	position: relative;
	div {
		display: flex;
		align-items: center;
		span {
			margin-right: 1rem;
		}
		input {
			text-align: right;
		}
		img {
			width: 1.43rem;
			height: 1.43rem;
		}
	}
	span {
	}
	&::before {
		content: '';
		position: absolute;
		// left: 1.43rem;
		bottom: 0;
		height: 1px;
		width: 100%;
		background-color: #efefef;
	}
}
/deep/.mint-popup-bottom {
	height: 28rem;
}
.picker-items {
	width: 100%;
}
.goods-form-2 {
	/deep/.toolbar {
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		background-color: #f0f2f5;
		.toolbar-item {
			font-size: 1.1rem;
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
			line-height: 3rem;
			font-size: 1rem;
		}
	}
	.toolbar {
		height: 3rem;
	}
	.common-header-wrap {
		height: 4rem;
		.common-header {
			height: 4rem;
			line-height: 4rem;
			/deep/.mint-header-title {
				font-size: 1.52rem;
			}
		}
	}
	.common-popup-content {
		top: 4rem;
	}
}
.add-button {
	background-color: #fff;
	// position: fixed;
	// z-index: 2;
	// bottom: 0;
	margin-top: 2rem;
	padding: 1rem 1.43rem;
	width: 100%;
	box-sizing: border-box;
	// margin-bottom: 1rem;
	span {
		display: block;
		text-align: center;
		height: 3.81rem;
		line-height: 3.81rem;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.9rem;

		font-size: 1.33rem;
		font-weight: 400;
		color: #ffffff;
	}
}

.type-popup {
	/deep/.mint-radiolist {
		width: 100%;
		.mint-radiolist-title {
			margin: 0;
		}
		.mint-radiolist-label {
			width: 7rem;
			.mint-radio-label {
				margin: 0;
			}
		}
	}
}
</style>
