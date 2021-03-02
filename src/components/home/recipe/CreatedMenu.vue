<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">创建菜谱</span>
			<div class="header-right"></div>
		</div>
		<!-- <div v-if="myMenuListLength>0">
			<div class="myMenuTitle">我添加的菜谱</div>
			<menu-list @onChange="onChildlist" ref="sonList" :isFrom='createdMenu'></menu-list>
		</div> -->
		<div>
			<div class="menu-cover">
				<img class="cover" v-if="menuCover" :src="menuCover" alt="" />
				<div v-else>+菜谱封面</div>
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" @change="uploadCookProve($event)" />
			</div>

			<div class="content">
				<input class="menu-title" type="text" placeholder="添加菜谱名称" v-model="menuName" />
				<div class="content-list" @click="menuGuanlianVisible = true">
					<span class="content-list-title" @click="goGuanlian()">关联菜品</span>
					<span class="content-list-right" :class="guanlian == '请选择' ? 'huise' : 'black'">
						{{ guanlian }}
						<img src="@/assets/image/icon2/icon-right.png" alt="" />
					</span>
				</div>
				<div class="content-list" @click="currentValue = true">
					<span class="content-list-title">适配宴席</span>
					<span class="content-list-right" :class="shipei == '请选择' ? 'huise' : 'black'">
						<span>{{ shipei }}</span>
						<img src="@/assets/image/icon2/icon-right.png" alt="" />
					</span>
				</div>

				<div class="content-list" @click="diffculty()">
					<span class="content-list-title">上手难度</span>
					<span class="content-list-right" :class="shangnandu == '请选择' ? 'huise' : 'black'">
						{{ shangnandu }}
						<img src="@/assets/image/icon2/icon-right.png" alt="" />
					</span>
				</div>
				<div class="content-list">
					<span class="content-list-title">烹饪时间</span>
					<!-- <span class="content-list-right">
					
					<img src="@/assets/image/icon2/icon-right.png" alt="" />
				</span> -->
					<input type="text" v-model="pengren" placeholder="请填写烹饪时间" />
				</div>
				<div class="content-list" style="display: flex;flex-direction: column;">
					<span class="content-list-title">主厨说</span>
					<span class="content-list-right" style="margin-top: 0.96rem;">
						<input style="width: 100%;height: 4rem;" type="text" placeholder="输入这道菜的优点和你想说的话" v-model="cookSay" />
					</span>
				</div>
				<div class="content-list-shangxia">
					<span class="content-list-title">烹饪食材</span>
					<div class="slide-wrap">
						<div v-for="(val, i) in cooking_material" :key="i" class="input-wrap">
							<span>食材:</span>
							<input @click="SelectClassList(i)" type="text" v-model="val.shicai" placeholder="请选择" />
							<input type="text" v-model="val.num" placeholder="用量:如一个" />
							<img @click="del(i)" src="@/assets/image/icon2/icon-del.png" alt="" />
						</div>
					</div>

					<div class="add-hang">
						<span @click="addcam">{{ cooking_material.length ? '再增加一行' : '增加一行' }}</span>
						<span></span>
					</div>
				</div>
				<div class="zuofa">
					<p>做法</p>
					<div class="step-wrap">
						<div class="step-wrap-item" v-for="(val, i) in cooking_step" :key="i">
							<div style="font-size: 1.34rem;font-weight: 600;color: #161616;margin-bottom: 1rem; display: flex;justify-content: space-between;">
								步骤{{ i + 1 }}
								<img @click="delStep(i)" src="@/assets/image/icon2/icon-del.png" style="width: 1.5rem;height: 100%;" alt="" />
							</div>
							<div class="menu-cover" @change="uploadCookStep($event, i)">
								<img class="cover" v-if="val.menuStep" :src="val.menuStep" alt="" />
								<div v-else>+步骤图</div>
								<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
							</div>
							<input type="text" v-model="val.info" placeholder="添加步骤说明" style="width:100%;margin-top: 1.91rem;margin-bottom: 3rem;font-size: 1.33rem;" />
						</div>
						<div class="add-hang">
							<span @click="addStep">{{ cooking_step.length ? '再增加一步' : '增加一步' }}</span>
							<span></span>
						</div>
					</div>
				</div>
				<div class="menuClass" @click="getMenuClass()">
					<span class="content-list-title">菜谱分类</span>
					<span v-if="menufenlei">{{ menufenlei }}</span>
					<img v-else src="@/assets/image/icon2/icon-right-black.png" alt="" />
				</div>
				<div class="fabu" @click="releaseMenu">发布菜谱</div>
			</div>
		</div>

		<OneDropDown @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></OneDropDown>
		<mt-popup style="height: 25rem;" v-model="classVisible" position="bottom">
			<mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
				<div class="toolbar">
					<button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
					<div class="picker-header">选择分类</div>
					<button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
				</div>
			</mt-picker>
		</mt-popup>
		<mt-popup style="height: 25rem;" v-model="menuClassVisible" position="bottom">
			<mt-picker ref="class_pickerMenu" :slots="buildMenuItems" valueKey="class_title" @change="onMenuClassChange" showToolbar>
				<div class="toolbar">
					<button class="toolbar-item cancel-item" @click="cancelMenuClass">取消</button>
					<div class="picker-header">选择分类</div>
					<button class="toolbar-item confirm-item" @click="confirmMenuClass">确定</button>
				</div>
			</mt-picker>
		</mt-popup>
		<!-- 关联菜品 -->
		<mt-popup class="guanlian" v-model="menuGuanlianVisible" position="bottom">
			<div class="product-list-header">
				<img @click="menuGuanlianVisible = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
				<div class="common-search"><input type="text" placeholder="请输入您要搜索的菜谱" autocomplete="off" v-model="params.keywords" /></div>
				<div class="right" @click="menuGuanlianVisible = false" v-if="ifKeywords">取消</div>
				<div class="right" @click="searchBanquet" v-else>搜索</div>
			</div>
			<div class="tip-title">请选择菜谱关联菜品</div>
			<div class="food-list">				
				<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<div v-if="banquetArr && banquetArr.length">
						<div class="food-list-item"
								v-for="(v,i) in banquetArr" :key="i"
								@click="selectBanquet(v)"
							>
							<img :src="v.goods_image" alt="" />
							<div>{{v.goods_name}}</div>
						</div>
					</div>
				</div>
			</div>
		</mt-popup>
		<!-- 适配宴席 -->
		<mt-popup class="selectBox" v-model="currentValue" position="bottom">
			<div class="cont">
				<!-- 头部 -->
				<div class="head">{{ adaptTitle }}</div>
				<!-- 内容 -->
				<div class="center" v-for="(v, i) in adaptItems" :key="i" @click="adapt(i)">
					<span>{{ v.name }}</span>
					<img v-if="v.select" src="@/assets/image/icon2/icon-select-red.png" alt="" />
				</div>
				<!-- 尾部 -->
				<div class="foot" style="color: #FB1319;" @click="confirmadapt()">确认</div>
				<div class="foot" @click="currentValue = false">取消</div>
			</div>
		</mt-popup>

		<!-- 图片裁切 插件 -->
		<crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData" @haveCropImgDataEnd="fun_getCropImgDataEnd"></crop-img>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast, Indicator } from 'mint-ui';
import { uploadMemberCookImg, uploadCropImg, resMenuClass, sendMenuAdd, getMyMenuList, getGoodsClass, getBanquetGoodsList } from '@/api/homeMenu';
import OneDropDown from '@/components/OneDropDown';
import { mapState, mapActions } from 'vuex';
import { getGoodsclassList } from '@/api/homesearch';
import MenuList from './MenuList';

import CropImg from '../../CropImg'; // 图片裁切

export default {
	data() {
		return {
			menuCover: '',
			menuStep: '',
			cooking_material: [{ shicai: '', num: '' }],
			cooking_step: [{ info: '', menuStep: '' }],
			menuFile_name: '',
			menuCover: '',
			values: [{ name: '简单', id: 1 }, { name: '中等', id: 2 }, { name: '困难', id: 3 }],
			shangnandu: '请选择',
			guanlian: '请选择',
			shipei: '请选择',
			pengren: '',
			menuClass: [],
			classVisible: false,
			menuClassVisible: false,
			i: '',
			menufenlei: '',
			menuName: '',
			shangshouId: '',
			cookSay: '',
			// myMenuListLength:'',
			class_id: '',
			items: [],
			menuGuanlianVisible: false, //关联菜品
			currentValue: false, //适配宴席
			adaptTitle: '请选择适配宴席',
			adaptItems: [
				{ name: '喜宴', id: 1, select: false },
				{ name: '丧宴', id: 2, select: false },
				{ name: '生日宴', id: 3, select: false },
				{ name: '正式宴会', id: 4, select: false },
				{ name: '喜宴', id: 5, select: false },
				{ name: '家宴', id: 6, select: false },
				{ name: '便宴', id: 7, select: false }
			], // title:'创建菜谱'
			// keywords:'',
			banquetArr: [],
			
			params: {
				page: 0,
				keywords:'',
        pagesize: 10
      },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			goods_id:null,  // 选中的商品
			banquet_type:'',  // 宴请类型
			// adaptArry: []
		};
	},
	components: {
		OneDropDown,
		MenuList,
		'crop-img': CropImg
	},
	mounted() {
		resetRem();
	},
	created: function() {
		var that = this;
		this.fetchGoodsclassList();
		getGoodsclassList({ from: 'menu' }).then(res => {
			this.items = res.result.class_list;
			console.log(this.items, 'items');
		});
		resMenuClass().then(res => {
			this.menuClass = res.result;
		});	
	},
	computed: {
		ifKeywords() {
			if (this.params.keywords === '') {
				return true;
			} else {
				return false;
			}
		},
		buildItems: function() {
			// console.log(this.items, 'items');
			if (!this.items || !this.items[0]) {
				console.log('没数据');
				return [];
			}
			let items = new Array();
			this.getDefaultItems(this.items, items);
			return items;
		},
		buildMenuItems: function() {
			if (!this.menuClass || !this.menuClass[0]) {
				return [];
			}
			let items = new Array();
			this.getDefaultMenuItems(this.menuClass, items);
			return items;
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 搜索 宴席
		searchBanquet(){
			this.params.page = 0;
			this.banquetArr = [];
			this.getOrderList();
		},
		// 加载数据
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(true);
			}
    },
		getOrderList(ifReplace) {
			Indicator.open();
			getBanquetGoodsList(this.params).then(res => {
				Indicator.close();
				this.isMore = res.result.hasmore;
				this.loading = !this.isMore;
				let tOrderGroup = res.result.goods_list;
				if (tOrderGroup) {
					if ( this.banquetArr.length <= 0 ) {
						this.banquetArr = tOrderGroup;
					} else {
						this.banquetArr = this.banquetArr.concat(tOrderGroup);
					}
				}
			})
			.catch(function(error) {
				Indicator.close();
				Toast(error.message);
			});
		},
		// 选择 宴席
		selectBanquet(obj){
			// console.log(id);
			this.goods_id = obj.goods_id;
			this.guanlian = obj.goods_name;
			this.menuGuanlianVisible = false;
		},

		...mapActions({
			fetchGoodsclassList: 'fetchGoodsclassList'
		}),
		adapt(i) {
			this.adaptItems[i].select = !this.adaptItems[i].select;
		},
		// 确认适配宴席
		confirmadapt() {
			this.currentValue = false;
			this.shipei = '';
			for (var item of this.adaptItems) {
				if (item.select == true) {
					this.shipei += ','+item.name;
					this.banquet_type += ','+item.id;
				}
			}
			this.shipei = this.shipei.slice(1);
			this.banquet_type = this.banquet_type.slice(1);
			// console.log(this.banquet_type);
		},
		addcam() {
			var that = this;
			let jsn = { shicai: '', num: '' };
			if (!that.cooking_material) {
				that.cooking_material = [];
			}
			that.cooking_material.push(jsn);
		},
		addStep() {
			var that = this;
			let jsn = { info: '', menuStep: '' };
			if (!that.cooking_step) {
				that.cooking_step = [];
			}
			that.cooking_step.push(jsn);
		},
		// 删除 按钮
		del(i) {
			this.cooking_material.splice(i, 1);
		},
		delStep(i) {
			this.cooking_step.splice(i, 1);
		},

		uploadCookProve() {
			var that = this;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
				// Toast("上传图片不得大于200k,请裁切图片后上传");

				// 传值 隐藏 当前页面 打开 插件
				this.cropDataShow = false;
				this.$refs.cropImg.currentValue = true;
				// 将当前 的 input 里的 文件 传递给 插件
				this.$refs.cropImg.files = event.target.files;

				// 清除 当前 input 的 值
				event.target.files = null;
				event.target.type = null;
				// 重新 设置 类型 是文件
				event.target.type = 'file';

				return false;
			}

			formdata.append('menu_image', event.target.files[0]);
			formdata.append('name', 'menu_image');
			// console.log(event.target.files[0], formdata);
			uploadMemberCookImg(formdata)
				.then(res => {
					that.menuFile_name = res.result.file_name;
					that.menuCover = res.result.file_path;
					// this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100)
					// this.memberEdit({ member_avatar: this.user.avatar })
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		// 图片 接收 图片
		fun_getCropImgData(obj) {
			// 关闭插件 显示 当前页面
			this.$refs.cropImg.currentValue = false;
			this.cropDataShow = true;
			// 如果 是 带值 传递过来的 上传 图片
			if (obj.type) {
				uploadCropImg(obj.data)
					.then(res => {
						this.menuFile_name = res.result.file_name;
						this.menuCover = res.result.file_path;
						this.$forceUpdate();
					})
					.catch(err => {
						Toast(err.message);
					});
			}
		},

		pickSlectResult(values) {
			// console.log(values, 'pickOneDropDown');
			this.shangnandu = values[0].name;
			this.shangshouId = values[0].id;
			// debugger
		},
		// 调用难度picker
		diffculty() {
			this.$refs.CookLvPicker.currentValue = true;
		},

		// 上传图片
		uploadCookStep(event, i) {
			var that = this;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
				// Toast("上传图片不得大于200k,请裁切图片后上传");

				// 传值 隐藏 当前页面 打开 插件
				this.cropDataShow = false;
				this.$refs.cropImg.currentValue = true;
				this.$refs.cropImg.cropImgName = i;
				this.$refs.cropImg.comeBack = 1;
				// 将当前 的 input 里的 文件 传递给 插件
				this.$refs.cropImg.files = event.target.files;

				// 清除 当前 input 的 值
				event.target.files = null;
				event.target.type = null;
				// 重新 设置 类型 是文件
				event.target.type = 'file';
				return false;
			}

			formdata.append('step_image', event.target.files[0]);
			formdata.append('name', 'step_image');
			// console.log(event.target.files[0], formdata);
			uploadMemberCookImg(formdata)
				.then(res => {
					that.cooking_step[i].image = res.result.file_name;
					that.cooking_step[i].menuStep = res.result.file_path;
					// that.cooking_step[i].image = res.result.file_path;
					// this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100)
					// this.memberEdit({ member_avatar: this.user.avatar })
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		fun_getCropImgDataEnd(obj) {
			// console.log(obj);
			// 如果 是 带值 传递过来的 上传 图片
			if (obj.type) {
				uploadCropImg(obj.data)
					.then(res => {
						this.cooking_step[obj.name].image = res.result.file_name;
						this.cooking_step[obj.name].menuStep = res.result.file_path;
						this.$forceUpdate();
					})
					.catch(err => {
						Toast(err.message);
					});
			}
		},

		getMenuClass() {
			this.menuClassVisible = true;
		},
		getDefaultItems(_item, defaultItems) {
			// debugger
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
			defaultItems.push({
				flex: 1,
				values: _item[0].children && _item[0].children.length ? _item[0].children[0].children : [],
				textAlign: 'center'
			});
		},
		cancelClass() {
			this.classVisible = false;
			this.i = '';
		},
		confirmClass() {
			let values = this.$refs.class_picker.getValues();
			var temp = values[2];
			if (!temp) {
				temp = values[1];
			}
			if (!temp) {
				temp = values[0];
			}
			console.log(temp, 'temp');
			this.cooking_material[this.i].shicai = temp.value;
			this.cooking_material[this.i].class_id = temp.id;
			// debugger
			// console.log(this.cooking_material, 'cooking_material');
			// this.goods_class.gc_id = temp.id;

			this.classVisible = false;
		},
		onClassChange(picker, values) {
			picker.setSlotValues(1, values[0] ? values[0].children : []);
			picker.setSlotValues(2, values[1] ? values[1].children : []);
			picker.setSlotValues(3, values[2] ? values[2].children : []);
		},
		SelectClassList(i) {
			this.classVisible = true;
			this.i = i;
		},
		getDefaultMenuItems(_item, defaultItems) {
			// console.log(_item, defaultItems, 'aaa');
			defaultItems.push({
				flex: 1,
				values: _item,
				textAlign: 'center'
			});
			defaultItems.push({
				flex: 1,
				values: _item[0].tow_list,
				textAlign: 'center'
			});
			// defaultItems.push({
			// 	flex: 1,
			// 	values: _item[0].tow_list && _item[0].tow_list.length ? _item[0].tow_list[0].tow_list : [],
			// 	textAlign: 'center'
			// });
		},
		onMenuClassChange(picker, values) {
			picker.setSlotValues(1, values[0] ? values[0].tow_list : []);
			picker.setSlotValues(2, values[1] ? values[1].tow_list : []);
			// picker.setSlotValues(3, values[2] ? values[2].children : []);
		},
		cancelMenuClass() {
			this.menuClassVisible = false;
		},
		confirmMenuClass() {
			let values = this.$refs.class_pickerMenu.getValues();
			var temp = values[2];
			if (!temp) {
				temp = values[1];
			}
			if (!temp) {
				temp = values[0];
			}
			// console.log(temp, 'temp');
			this.menufenlei = temp.class_title;
			this.class_id = temp.class_id;
			// debugger
			this.menuClassVisible = false;
		},
		releaseMenu() {
			// console.log('商品is',this.goods_id,'宴席',this.banquet_type);
			let menuParams = {};
			var that = this;
			// for(var i = 0; i<this.ingre.length; i++ ) {

			// 	cooking_material[i].class_id = this.ingre[i].shicaiId
			// 	cooking_material[i].num = this.ingre[i].num
			// }
			// console.log(cooking_material,'cooking_material')
			menuParams.menu_image = this.menuFile_name;
			menuParams.menu_title = this.menuName;
			menuParams.difficulty = this.shangshouId;
			menuParams.cooking_time = this.pengren;
			menuParams.cook_say = this.cookSay;
			menuParams.cooking_material = this.cooking_material;
			menuParams.cooking_step = this.cooking_step;
			menuParams.class_id = this.class_id;
			menuParams.goods_id = this.goods_id;
			menuParams.banquet_type = this.banquet_type;
			// debugger
			if (!menuParams.menu_image) {
				Toast('请上传菜谱封面');
			} else if (!menuParams.menu_title) {
				Toast('请添加菜谱名称');
			} else if (!menuParams.difficulty) {
				Toast('请选择上手难度');
			} else if (!menuParams.cooking_time) {
				Toast('请添加烹饪时间');
			} else if (!menuParams.cook_say) {
				Toast('请添加主厨说');
			} else if (!menuParams.cooking_material[0].num || !menuParams.cooking_material[0].shicai) {
				Toast('请填写食材相关信息');
			} else if (!menuParams.cooking_step[0].info) {
				Toast('请填写烹饪步骤');
			} else if (!menuParams.class_id) {
				Toast('请选择菜谱分类');
			} else {
				// debugger;
				sendMenuAdd(menuParams).then(res => {
					// console.log(res, 'res');
					Toast(res.message);
					that.$router.push({ name: 'HomeMenuManage' });
					// that.getMenuList()
					// debugger
					// this.menuClass = res.result;
					// that.menuClass = res.result
					// that.$refs.MenuClassPicker.currentValue = true;
				});
			}
			// console.log(menuParams,'menuParams')
		},

	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #fefefe;
	.header-wrap {
		padding: 1rem 1.43rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		img {
			// position: absolute;
			// left: 1.78rem;
			// top: 50%;
			width: 1.74rem;
			height: 1.74rem;
			// transform: translate(0, -50%);
		}
		.header-title {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 1.39rem;
			font-weight: 400;
			color: rgba(22, 22, 22, 1);
		}
		.header-right {
		}
	}
	.menu-cover {
		position: relative;
		height: 19.15rem;
		img.cover {
			width: 100%;
			height: 100%;
			position: absolute;
			width: 100%;
			top: 0;
			height: 100%;
		}
		div {
			font-size: 1.24rem;
			font-weight: 400;
			color: #6f6f6f;
			width: 100%;
			height: 100%;
			line-height: 19.15rem;
			text-align: center;
			background-color: #f4f5f7;
		}
		input {
			position: absolute;
			width: 100%;
			top: 0;
			opacity: 0;
			height: 100%;
		}
	}
	.content {
		padding: 0 1.43rem;
		.menu-title {
			padding: 1.86rem 0 1.58rem;
			text-align: center;
			width: 100%;
			border-bottom: 1px solid #efefef;
			font-size: 1.81rem;
			font-weight: 600;
			color: #161616;
			&::-webkit-input-placeholder {
				color: #c6c6c6;
			}
		}
		.content-list {
			display: flex;
			justify-content: space-between;
			margin-top: 2.81rem;
			.content-list-title {
				font-size: 1.53rem;
				font-weight: 600;
				color: #161616;
				width: 30%;
				flex-shrink: 0;
			}
			.content-list-right {
				display: flex;
				align-items: center;
				font-size: 1.52rem;
				font-weight: 400;
				// color: #C6C6C6;
				>span {
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				img {
					margin-left: 0.48rem;
					width: 0.9rem;
					height: 1.15rem;
				}
			}
			input {
				text-align: right;
				font-size: 1.52rem;
				font-weight: 400;
				&::-webkit-input-placeholder {
					color: #c6c6c6;
				}
				// color: #C6C6C6;
			}
		}
		.content-list-shangxia {
			display: flex;
			flex-direction: column;
			margin-top: 2rem;
			.content-list-title {
				font-size: 1.53rem;
				font-weight: 600;
				color: #161616;
			}
			.slide-wrap {
				.input-wrap {
					padding: 1.91rem 0 1.39rem;
					border-bottom: 1px solid #efefef;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					width: 100%;
					font-size: 1.33rem;
					color: #161616;
					span {
						margin-right: 1rem;
						flex-shrink: 0;
					}
					input {
						width: 50%;
						font-size: 1.33rem;
						&::-webkit-input-placeholder {
							color: #c6c6c6;
						}
					}
					img {
						width: 1.4rem;
						height: 100%;
					}
				}
			}

			.add-hang {
				margin-top: 1.39rem;
				display: flex;
				justify-content: space-between;
				span {
					font-size: 1.15rem;
					font-weight: 400;
					color: #e63116;
				}
			}
		}
		.zuofa {
			p {
				font-size: 1.53rem;
				font-weight: 600;
				color: #161616;
				margin: 2.86rem 0 1.91rem;
			}
			.step-wrap {
				.step-wrap-item {
					input {
						&::-webkit-input-placeholder {
							color: #c6c6c6;
						}
					}
				}
				.add-hang {
					margin-top: 1.39rem;
					display: flex;
					justify-content: space-between;
					span {
						font-size: 1.15rem;
						font-weight: 400;
						color: #e63116;
					}
				}
			}
		}
		.menuClass {
			margin-top: 4.77rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 1.39rem;
			border-bottom: 1px solid #efefef;
			span {
				font-size: 1.53rem;
				color: #161616;
				&:first-child {
					font-weight: 600;
				}
			}
			img {
				width: 1.34rem;
				height: 1.34rem;
			}
		}
		.fabu {
			margin-top: 6.1rem;
			margin-bottom: 2rem;
			padding: 0.96rem 0;
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
			box-shadow: 0rem 0rem 0.96rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.91rem;
			font-size: 1.34rem;
			font-weight: 400;
			color: #ffffff;
			text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
			text-align: center;
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
}
.myMenuTitle {
	margin: 2.86rem 1.43rem 0;
	font-size: 1.34rem;
	font-weight: 600;
	color: #161616;
}
.toolbar {
	height: 3rem !important;
	.picker-header {
		line-height: 3rem !important;
	}
	.toolbar-item,
	.picker-header {
		font-size: 1.1rem !important;
	}
}
.huise {
	color: #c6c6c6;
}
.black {
	color: black;
}
.guanlian {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.tip-title {
	padding: 1.43rem;
	font-size: 2rem;
	color: #161616;
	height: 2.7rem;
}
.food-list {
	flex: 1;
	overflow-y: scroll;
	.food-list-item {
		// height: 100vh;
		display: flex;
		align-items: center;
		padding: 1.43rem 1.43rem 1.43rem 0;
		margin-left: 1.43rem;
		border-bottom: 1px solid #efefef;
		img {
			width: 4.29rem;
			height: 4.29rem;
		}
		> div {
			margin-left: 0.95rem;
			font-size: 1.33rem;
			color: #161616;
		}
	}
}
.selectBox {
	div {
		box-sizing: border-box;
	}
	.cont {
		width: 100%;
		// height: 50vh;
		background: #efefef;
		$height: 40px;
		padding-bottom: 30px;
		div {
			height: $height;
			line-height: $height;
			background: #ffffff;
			text-align: center;
			font-size: 14px;
		}
		.head {
			color: #6f6f6f;
			font-size: 12px;
		}
		.center {
			font-weight: 500;
			color: #161616;
			margin-top: 1px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 2.81rem;
			img {
				height: 0.95rem;
			}
		}
		.foot {
			color: #6f6f6f;
			margin-top: 10px;
			font-size: 16px;
		}
	}
}
.product-list-header {
		display: flex;
		height: 3.72rem;
		padding: 0.56rem 1.3rem;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 1px solid #f5f5f5;
		background: #fff;
		// .slot {
		// 	width: 1.6rem;
		// 	font-size: 0.8rem;
		// }
		img {
			width: 1.74rem;
			height: 1.74rem;
			margin-right: 1.3rem;
		}
	}
	.common-search {
		flex: 1;
		// padding: 0.35rem 0.3rem 0.35rem 0;
	}
	.common-search input {
		box-sizing: border-box;
		width: 100%;
		height: 2.6rem;
		border-radius: 1.73rem;
		background: #F3F3F3 url(../../../assets/image/icon2/search.png) no-repeat 2.17rem center;
		background-size: 1.13rem;
		font-size: 1.13rem;
		color: rgba(22, 22, 22, 1);
		padding-left: 3.99rem;
		border: 0;
		font-family: PingFangSC-Regular, PingFang SC;
	
		&::-webkit-input-placeholder {
			color: rgba(183, 183, 183, 1);
		}
	}
	.right {
		margin-left: 1.3rem;
		font-size: 1.21rem;
		flex-shrink: 0;
		font-size: 1.21rem;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(183, 183, 183, 1);
	}
</style>
