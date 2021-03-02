<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">菜谱管理</span>
			<div class="header-right"></div>
		</div>
		<div>
			<div class="myMenuTitle">我添加的菜谱</div>
			<menu-list @onChange="onChildlist" ref="sonList" :isFrom="'createdMenu'"></menu-list>
		</div>
		<div class="fabu" @click="releaseMenu"><div>新建菜谱</div></div>
		<!-- <OneDropDown @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></OneDropDown> -->
		<!-- <OneDropDown @pickOneDropDown="pickSlectMenu" ref="MenuClassPicker" :items="menuClass"></OneDropDown> -->
		<!-- <mt-popup style="height: 25rem;" v-model="classVisible" position="bottom">
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
		</mt-popup> -->
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast } from 'mint-ui';
import { uploadMemberCookImg, resMenuClass, sendMenuAdd, getMyMenuList } from '@/api/homeMenu';
import OneDropDown from '@/components/OneDropDown';
import { mapState, mapActions } from 'vuex';
import { getGoodsClass } from '../../../api/sellerGoods';
import MenuList from './MenuList';
export default {
	data() {
		return {
			menuCover: '',
			menuStep: '',
			cooking_material: [{ shicai: '', num: '' }],
			cooking_step: [{ info: '' }],
			menuFile_name: '',
			menuCover: '',
			values: [{ name: '简单', id: 1 }, { name: '中等', id: 2 }, { name: '困难', id: 3 }],
			shangnandu: '请选择',
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
			class_id: ''
			// title:'创建菜谱'
		};
	},
	components: {
		OneDropDown,
		MenuList
	},
	mounted() {
		resetRem();
		// if(myMenuListLength>0) {
		// 	this.title = '菜谱管理'
		// }
	},
	created: function() {
		var that = this;
		getMyMenuList().then(res => {
			that.$refs.sonList.getMenuListChild(res.result.menu_list, ispush, isFrom);
		});
		resMenuClass().then(res => {
			this.menuClass = res.result;
		});
		
	},
	computed: {
		
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapActions({
			// fetchGoodsclassList: 'fetchGoodsclassList'
		}),
		

		onChildlist() {
			this.getMenuList();
		},

		getMenuList(ispush) {
			var that = this;
			getMyMenuList().then(res => {
				// this.menuInfo = []
				// debugger
				// this.menuInfo = res.result
				let isFrom = 'createdMenu';
				that.myMenuListLength = res.result.menu_list.length;
				that.title = '菜谱管理';
				ispush = res.result.hasmore
				that.$refs.sonList.getMenuListChild(res.result.menu_list, ispush, isFrom,res.result.hasmore);
				
				// debugger;
			});
		},
		releaseMenu() {
			this.$router.push({ name: 'HomeCreatedMenu' });
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #fefefe;
	padding-bottom: 6rem;
	.fabu {
		position: fixed;
		bottom: 0;
		// margin-bottom: 2rem;
		text-align: center;
		width: 92%;
		padding: 4%;
		div {
			width: 100%;
			padding: 0.95rem 0;
			background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
			box-shadow: 0rem 0rem 0.96rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.91rem;
			font-size: 1.34rem;
			font-weight: 400;
			color: #ffffff;
			text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
		}
	}
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
		}
		.content-list {
			display: flex;
			justify-content: space-between;
			margin-top: 2.81rem;
			.content-list-title {
				font-size: 1.53rem;
				font-weight: 500;
				color: #161616;
			}
			.content-list-right {
				display: flex;
				align-items: center;
				img {
					margin-left: 0.48rem;
					width: 0.9rem;
					height: 1.15rem;
				}
			}
			input {
				text-align: right;
			}
		}
		.content-list-shangxia {
			display: flex;
			flex-direction: column;
			margin-top: 2rem;
			.slide-wrap {
				.input-wrap {
					padding: 1.91rem 0 1.39rem;
					border-bottom: 1px solid #efefef;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					width: 100%;
					span {
						margin-right: 1rem;
						flex-shrink: 0;
					}
					input {
						width: 50%;
					}
					img {
						width: 1.8rem;
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
				font-weight: 500;
				color: #161616;
				margin: 2.86rem 0 1.91rem;
			}
			.step-wrap {
				.step-wrap-item {
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
				font-weight: 500;
				color: #161616;
			}
			img {
				width: 1.34rem;
				height: 1.34rem;
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
}
.myMenuTitle {
	margin: 2.86rem 1.43rem 0;
	margin-bottom: 0.5rem;
	font-size: 1.34rem;
	font-weight: 600;
	color: #161616;
}
</style>
