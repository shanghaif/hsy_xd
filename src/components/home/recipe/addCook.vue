<template>
<div>
	<div class="container" v-show='cropDataShow' >
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">{{ title }}</span>
			<span></span>
		</div>
		<div class="add-cook" v-if="isAudit != 1">
			<div class="add-cook-list" v-if="fromMyIndex">
				<span>用户ID:</span>
				<input type="text" placeholder="请输入" v-model="member_id" />
			</div>
			<div class="add-cook-list" v-show="!this.$route.query.store_id && !this.$route.query.member_id">
				<span>单位:</span>
				<input type="text" v-model="params.restaurant" />
			</div>
			<div class="add-cook-list up-data-img">
				<span>厨师证明</span>
				<img v-if="params.cook_image_url" :src="params.cook_image_url" />
				<div class="img-wrap" v-else><img src="@/assets/image/icon2/icon-add-img.png" alt="" /></div>
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" @change="uploadCookProve($event)" />
			</div>
			<div class="add-cook-list" style="height: 1.4rem;line-height: 1.4rem;" @click="showCookLvPicker">
				<span>厨师等级:</span>
				<input type="text" placeholder="请选择" readonly="readonly" v-model="params.cook_level" />
				<img src="@/assets/image/icon2/icon-right.png" alt="" />
			</div>

			<div class="textarea-wrap">
				<span class="">拿手菜:</span>
				<div class=""><textarea maxlength="140" v-model="params.adept_menu" name="" id="" cols="30" rows="10" placeholder="请输入"></textarea></div>
			</div>

			<div class="submit-button" @click="submit">保存</div>
		</div>
		<div v-else-if="isAudit == 1" style="text-align: center;margin-top: 10rem;">
			<img style="width: 80%;" src="@/assets/image/sellerjoinin_wait.jpg" alt="" />
			<p style="font-size: 1.8rem;">正在审核中</p>
		</div>
		<OneDropDown @pickOneDropDown="pickSlectResult" ref="CookLvPicker" :items="values"></OneDropDown>
	</div>
	
  <!-- 图片裁切 插件 -->
  <crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img>	
</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { uploadMemberCookImg, uploadCropImg, addCookInfo, cookShenhe, getStoreCookInfo } from '@/api/homeMenu';
import { Toast } from 'mint-ui';
import OneDropDown from '@/components/OneDropDown';

import CropImg from '../../CropImg'  // 图片裁切

export default {
	data() {
		return {			
			cropDataShow:true,  // 隐藏 当前页面
			
			menuClassList: [],
			// slots: [
			// 	{
			// 		flex: 1,
			// 		values: ['初级', '中级', '高级', '技师', '高级技师'],
			// 		className: 'slot1',
			// 		textAlign: 'center'
			// 	}
			// ],
			values: [{ name: '初级', id: 0 }, { name: '中级', id: 1 }, { name: '高级', id: 2 }, { name: '技师', id: 3 }, { name: '高级技师', id: 4 }],
			params:{
				cook_image_url: '',   // 厨师证明路径
				cook_image: '',       // 厨师证明
				restaurant: '',       // 单位
				cook_level: '',       // 厨师等级
				adept_menu: '',       // 拿手菜
			},
			title: '添加厨师',
			fromMyIndex: true,
			isAudit: 0, //1为审核中,2为审核完成,3驳货
			member_id: ''
		};
	},
	components: {
		OneDropDown,
    'crop-img': CropImg
	},
	mounted() {
		resetRem();
	},
	created: function() {
		if (this.$route.query.from == 'myIndex') {
			this.title = '厨师入驻';
			this.fromMyIndex = false;
			cookShenhe().then(res => {
				// Toast(res.message)
				if (!this.$route.query.store_id) {
					if (res.result.status == 0) {
						// 审核中
						Toast('审核中');
						this.isAudit = 1;
					} else if (res.result.status == 1) {
						this.isAudit = 2;
						// 审核通过
						// Toast('审核通过');
						this.params = res.result.cook_info;
					} else if (res.result.status == 2) {
						//驳回
						Toast('信息驳回，请重新填写');
						this.isAudit = 0;
					} else {
						this.isAudit = 0;
					}
				}
			});
		}else{
			if( this.$route.query.member_id ){
				this.member_id = this.$route.query.member_id;
				getStoreCookInfo(this.member_id).then(res=>{
					this.params = res.result;
				})
			}else{
				this.params.store_id = this.$route.query.store_id;
			}
		}
	},
	computed: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		uploadCookProve(event) {
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
        event.target.type = "file";

        return false;
			}

			formdata.append('cook_image', event.target.files[0]);
			formdata.append('name', 'cook_image');
			// console.log(event.target.files[0], formdata);
			uploadMemberCookImg(formdata)
				.then(res => {
					that.params.cook_image = res.result.file_name;
					that.params.cook_image_url = res.result.file_path;
					// this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100)
					// this.memberEdit({ member_avatar: this.user.avatar })
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

    // 图片 接收 图片
    fun_getCropImgData(obj){
      // 关闭插件 显示 当前页面
      this.$refs.cropImg.currentValue = false;
      this.cropDataShow = true;
      // 如果 是 带值 传递过来的 上传 图片
      if( obj.type ){
        uploadCropImg(obj.data).then(res=>{
					this.params.cook_image = res.result.file_name;
					this.params.cook_image_url = res.result.file_path;
          this.$forceUpdate();
        }).catch(err=>{
          Toast(err.message);
        })
        
      }
		},
		
		// 调用厨师等级picker
		showCookLvPicker() {
			this.$refs.CookLvPicker.currentValue = true;
		},
		pickSlectResult(values) {
			// console.log(values, 'pickOneDropDown');
			this.params.cook_level = values[0].name;
		},
		// 提交
		submit() {
			var that = this;
			// let params = {};
			// params.cook_level = that.cook_level;
			// params.restaurant = that.restaurant;
			// params.adept_menu = that.adept_menu;
			// params.cook_image = that.cook_image;
			if (!that.fromMyIndex) {
				this.params.type = 1;
				if (!that.params.cook_image) {
					Toast('请上传厨师证明');
				} else if (!that.params.cook_level) {
					Toast('请选择厨师等级');
				} else if (!that.params.restaurant) {
					Toast('请填写所在单位');
				} else if (!that.params.adept_menu) {
					Toast('请填写拿手菜');
				} else {
					addCookInfo(this.params).then(res => {
						// Toast(res.message)
						Toast('厨师申请已提交');
						that.$router.go(-1);
					}).catch(err=>{
						Toast(err.message)
					})
				}
			} else {
				this.params.type = 2;
				if (!that.params.cook_image) {
					Toast('请上传厨师证明');
				} else if (!that.params.cook_level) {
					Toast('请选择厨师等级');
				} else if (!that.params.adept_menu) {
					Toast('请填写拿手菜');
				} else if (!that.member_id) {
					Toast('请填写用户ID');
				} else {
					// console.log(this.params);
					// return false;
					this.params.member_id = this.member_id;
					addCookInfo(this.params).then(res => {
						Toast(res.message);
						that.$router.go(-1);
					}).catch(err=>{
						Toast(err.message)
					})
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.header-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.24rem 1.43rem;
		font-size: 1.39rem;
		font-weight: 400;
		color: #161616;
		margin-bottom: 1.43rem;
		img {
			width: 1.71rem;
			height: 1.71rem;
		}
	}
	.add-cook {
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
			// position: absolute;
			// bottom: 3.5rem;
			// left: 1.43rem;
			// right: 1.43rem;
			margin: 8rem 1.43rem 0;
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
}
</style>
