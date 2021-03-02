<template>
	<div class="container hsy_main">
		<head-title title="举报商家"></head-title>
		<div v-if="!report_id">
			<div class="body">
				<div class="order-comment-body">
					<div class="enter"><textarea placeholder="举报内容" v-model="content"></textarea></div>
				</div>
				<mt-cell class="menu-item" title="举报凭证"></mt-cell>
				<div class="image-wrapper">
					<div class="user-avatar" ref="upload_btn1" @change="uploadComplaintPic(0, $event)">
						<img class="img-content" v-if="image[0]" :src="image[0]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<div class="user-avatar" ref="upload_btn2" @change="uploadComplaintPic(1, $event)">
						<img class="img-content" v-if="image[1]" :src="image[1]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<div class="user-avatar" ref="upload_btn3" @change="uploadComplaintPic(2, $event)">
						<img class="img-content" v-if="image[2]" :src="image[2]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
				</div>
			</div>
			<mt-button @click="fun_addReport" class="hsy_f hsy_btn">提交</mt-button>
		</div>
		<div v-else>
			<!--投诉信息-->
			<div>
				<!-- <mt-cell class="menu-item" title="投诉信息"></mt-cell> -->
				<div class="menu-content">
					<mt-cell title="举报人" :value="complaint.accuser_name"></mt-cell>
					<mt-cell title="举报时间" :value="complaint.add_time"></mt-cell>
					<mt-cell class="tousu-content" title="举报内容" :value="complaint.complain_content"></mt-cell>
					<div @click="isshow = true" v-if="complain_pic.length"><mt-cell title="举报凭证" value="查看"></mt-cell></div>
					<br>
					<mt-cell title="处理时间" :value="complaint.end_time?complaint.end_time:'暂未处理'"></mt-cell>
					<div class="textacont">
						<div class="title">处理信息</div>
						<div class="enter">
							<textarea rows="18" readonly="true" placeholder="暂未处理" v-model="complaint.complainsubject_desc">
						</textarea></div>
					</div>
					<!-- <mt-cell title="处理信息" :value="complaint.complainsubject_desc?complaint.complainsubject_desc:'暂未处理'"></mt-cell> -->				
					
				</div>
				<mt-popup v-model="isshow" popup-transition="popup-fade" v-if="complain_pic.length > 0">
					<div class="preview-picture">
						<div class="picture-header" v-on:click="isshow = false">
							<span>关闭</span>
							<span v-if="complain_pic">{{ defaultindex + 1 }} / {{ complain_pic.length }}</span>
						</div>

						<div class="picture-body">
							<mt-swipe
								:auto="0"
								:show-indicators="true"
								:default-index="defaultindex"
								class="ui-common-swiper"
								:prevent="false"
								:stop-propagation="true"
								@change="handleChange"
							>
								<mt-swipe-item v-for="(item, index) in complain_pic" v-bind:key="index"><img v-bind:src="item" /></mt-swipe-item>
							</mt-swipe>
						</div>
					</div>
				</mt-popup>
			</div>
		</div>
		
		<crop-img ref="cropImg" :dataType="true" @haveCropImgData="fun_getCropImgData"></crop-img>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast } from 'mint-ui';
import '@/assets/style/hsy-mint.scss';
import { addReport, uploadComplaintPic, getReportInfo } from '../../../api/memberReport.js';
import CropImg from '../../CropImg'

export default {
	data() {
		return {
			content: '',   // 举报描述
			store_id :this.$route.query.store_id,    // 商家 id
			store_name :this.$route.query.store_name, // 商家 name

			report_id : this.$route.query.report_id,  // 举报 id

			
			image: ['', '', ''],    //  图片凭证
			file_value: ['', '', ''],  // 图片凭证 传值

			complaint: {},  // 详情 信息

			complain_pic: [],  // 图片详情信息
			
			isshow: false,
			
			defaultindex: 0,
			defaultindex2: 0,
		};
	},
	components: {
		HeadTitle,
		"crop-img": CropImg
	},
	created() {
		if ( this.report_id ) {
			getReportInfo(this.report_id)
				.then(res => {
					this.complaint = res.result;
					this.complain_pic = res.result.image_arr;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		handleChange(index) {
			this.defaultindex = index;
		},
		handleChange2(index) {
			this.defaultindex2 = index;
		},
		fun_addReport() {
			addReport( this.store_id, this.store_name, this.content, this.file_value)
				.then(res => {
					this.$router.push({ name: 'MemberReportList' });
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		// 上传图片
		uploadComplaintPic(index, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}

			if (event.target.files[0].size > 200 * 1024) {
				// Toast("上传图片不得大于200k,请裁切图片后上传");
				// 保存 当前 值 名称
				this.cropImgIndex = index;
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

			let formdata = new FormData();
			formdata.append('complain_pic', event.target.files[0]);
			uploadComplaintPic(formdata)
				.then(res => {
					this.image.splice(index, 1, res.result.pic + '?' + Math.floor(Math.random() * 100));
					this.file_value.splice(index, 1, res.result.file_name);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		

		// 图片 接收 图片
		fun_getCropImgData(obj) {
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			// 如果 是 带值 传递过来的 上传 图片
			if (obj.type) {
				let formdata = new FormData();
				formdata.append('complain_pic',  obj.data,Date.now() + '.jpg');
				
				uploadComplaintPic(formdata).then(res => {
					this.image.splice(this.cropImgIndex, 1, res.result.pic + '?' + Math.floor(Math.random() * 100));
					this.file_value.splice(this.cropImgIndex, 1, res.result.file_name);
				})
				.catch(function(error) {
					Toast(error.message);
				});				
				// uploadCropImg(obj.data)
				// 	.then(res => {
				// 		this.user[this.cropImgIndex + '_url'] = res.result.file_name;
				// 		var temp = {};
				// 		temp[this.cropImgIndex + '_url'] = res.result.file_path;
				// 		this.memberEdit(temp);
				// 	})
				// 	.catch(err => {
				// 		Toast(err.message);
				// 	});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.textacont {
	display: flex;
	justify-content: space-between;
	background: rgba(255, 255, 255, 1);
	padding: 1.52rem 1.42rem 1rem;
	.title{
		width:32% !important;
		font-size: 1.33rem;
	}
	.enter {
		padding-top: 0 !important;
		width: 68% !important;
		textarea {
			width: 100%;
			padding: 0 !important;
			background: #fff !important;
			border: 0 !important;
			font-size: 1.33rem !important;
			font-weight: 400;
			resize: none;
			color: #6f6f6f;
			&::-webkit-input-placeholder {
				/* WebKit browsers 适配谷歌 */
				color: #6f6f6f;
			}
		}
	}
}
.ui-common-swiper{
		width: 100%;
    height: 27.33rem!important;
    position: relative;
}
.common-score-wrapper .back {
	display: block;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;
	/deep/.mint-cell {
		padding: 1.19rem 0;
		min-height: 0;
		&::after {
			background-color: #efefef;
			left: 1.42rem;
			right: 0rem;
		}
		.mint-cell-wrapper {
			line-height: normal;
			padding: 0 1.42rem;
			font-size: 1.33rem;
			.mint-cell-title {
				.mint-cell-text {
					font-weight: 400;
					color: #161616;
				}
			}
			.mint-cell-value {
				span {
					width: 100%;
					font-size: 1.33rem;
					font-weight: 400;
					color: #6f6f6f;
				}
			}
		}
	}
	.jubao-content {
		/deep/.mint-cell-wrapper {
			flex-direction: column;
			align-items: flex-start;
			.mint-cell-title {
				margin-bottom: 1.19rem;
			}
		}
	}
	.body {
		top: 2.2rem;
		width: 100%;
		.order-comment-body {
			background: rgba(255, 255, 255, 1);
			padding: 1.52rem 1.42rem 1rem;
			.enter {
				padding-top: 0 !important;
				textarea {
					padding: 0 !important;
					background: #fff !important;
					border: 0 !important;
					font-size: 1.23rem !important;
					font-weight: 400;
					&::-webkit-input-placeholder {
						/* WebKit browsers 适配谷歌 */
						color: #c6c6c6;
					}
				}
			}
			.body-list {
				display: flex;
				justify-content: left;
				align-content: center;
				align-items: center;
				padding-bottom: 0.75rem;
				border-bottom: 1px solid #e8eaed;
			}
			.image {
				width: 3.7rem;
				height: 3.7rem;
				flex-shrink: 0;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.comment {
				flex-basis: 100%;
				padding-left: 0.75rem;
				span {
					font-size: 0.8rem;
					color: #7c7f88;
					text-align: left;
					display: block;
				}
				ul {
					display: flex;
					justify-content: space-between;
					align-content: center;
					align-items: center;
					margin-top: 1.2rem;
					li {
						img {
							width: 1rem;
							height: 1rem;
							flex-shrink: 0;
						}
						label {
							font-size: 0.17rem;
							color: rgba(78, 84, 93, 1);
							font-weight: normal;
						}
					}
				}
			}
			.enter {
				padding-top: 0.75rem;
				textarea {
					width: 100%;
					height: 6rem;
					background: rgba(247, 249, 250, 1);
					border: 1px solid #f7f9fa;
					box-sizing: border-box;
					padding: 0.5rem 0 0 0.5rem;
					font-size: 0.17rem;
					-webkit-appearance: none;
					outline: none;
				}
			}
		}
	}
}
.image-wrapper {
	display: flex;
}
// .user-avatar {
// 	flex: 1;
// 	border: 1px solid #eee;
// 	position: relative;
// 	width: 5rem;
// 	height: 5rem;
// 	margin: 0 auto;
// 	text-align: center;
// 	img {
// 		width: 100%;
// 		height: 100%;
// 	}
// 	input {
// 		width: 100%;
// 		height: 100%;
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		opacity: 0;
// 	}
// }
// .user-avatar::before {
// 	position: absolute;
// 	font-size: 1.5rem;
// 	line-height: 5rem;
// 	left: 50%;
// 	margin-left: -0.75rem;
// 	color: rgba(0, 0, 0, 0.5);
// }
.swipe-wrapper {
	width: 100%;
}
.mint-popup {
	width: 100%;
	height: 100%;
	// background-color: #000;
}
.mint-swipe,
.mint-swipe-items-wrap {
	position: static;
}
.preview-picture {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #000;
	.picture-header {
		height: 4rem;
		color: #000;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 100%;
		top: 0;
		span {
			font-size: 1.43rem;
			font-weight: normal;
			&:first-child {
				cursor: pointer;
				position: absolute;
				left: 0.75rem;
				background-size: 1.2rem;
				display: inline-block;
				height: 4rem;
				line-height: 4rem;
				font-size: 1.33rem;
			}
		}
	}
	.picture-body {
		position: absolute;
		top: 4rem;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
}
.menu-item {
	// background: #f7f9fa;
}

.body {
	top: 4rem;
	width: 100%;
	margin-bottom: 4.75rem;
	// border-bottom: 1px solid #efefef;
	.order-comment-body {
		background: rgba(255, 255, 255, 1);
		padding: 1.52rem 1.42rem 1rem;
		.enter {
			padding-top: 0 !important;
			textarea {
				padding: 0 !important;
				background: #fff !important;
				border: 0 !important;
				font-size: 1.23rem !important;
				font-weight: 400;
				&::-webkit-input-placeholder {
					/* WebKit browsers 适配谷歌 */
					color: #c6c6c6;
				}
			}
		}
		.body-list {
			display: flex;
			justify-content: left;
			align-content: center;
			align-items: center;
			padding-bottom: 0.75rem;
			border-bottom: 1px solid #e8eaed;
		}
		.image {
			width: 3.7rem;
			height: 3.7rem;
			flex-shrink: 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.comment {
			flex-basis: 100%;
			padding-left: 0.75rem;
			span {
				font-size: 0.18rem;
				color: #7c7f88;
				text-align: left;
				display: block;
			}
			ul {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				margin-top: 1.2rem;
				li {
					img {
						width: 1rem;
						height: 1rem;
						flex-shrink: 0;
					}
					label {
						font-size: 0.17rem;
						color: rgba(78, 84, 93, 1);
						font-weight: normal;
					}
				}
			}
		}
		.enter {
			padding-top: 0.75rem;
			textarea {
				width: 100%;
				height: 6rem;
				background: rgba(247, 249, 250, 1);
				border: 1px solid #f7f9fa;
				box-sizing: border-box;
				padding: 0.5rem 0 0 0.5rem;
				font-size: 0.7rem;
				-webkit-appearance: none;
				outline: none;
			}
		}
	}
}
.common-popup-wrapper {
	/deep/.mint-cell-wrapper {
		padding: 1.42rem;
		line-height: normal;
		.mint-cell-title {
			width: 100% !important;
		}
	}
}
.menu-content {
	/deep/.mint-cell-value {
		justify-content: flex-end;		
		span {
			word-break:normal; 
			width:auto; 
			display:block; 
			white-space:pre-wrap;
			word-wrap : break-word ;
			overflow: hidden ;
		}
	}
}


.ui-common-swiper{
		width: 100%;
    height: 27.33rem!important;
		position: relative;
		.mint-swipe-items-wrap div.mint-swipe-item>img {
			height: auto;
			// width: 100%;
			transform: translate(-50%,-50%);
			top: 50%;
			left: 50%;
			position: absolute;
			max-width: 100%;
			max-height: 100%;
		}
}

.image-wrapper {
	display: flex;
	padding: 0 1.42rem;
	margin-bottom: 1.44rem;
	margin-top: 1.44rem;
	justify-content: space-around;
}
.user-avatar {
	// flex: 1;
	// border: 1px solid #eee;
	position: relative;
	width: 7.61rem;
	height: 7.61rem;
	line-height: 7.61rem;
	border-radius: 0.47rem;
	border: 1px dashed #cacaca;
	// margin: 0 auto;
	text-align: center;
	img {
		width: 100%;
		height: 100%;
		// vertical-align: baseline;
	}
	.img-content {
		vertical-align: baseline;
	}
	.img-add {
		width: 2.66rem;
		height: 2.66rem;
	}
	input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
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
.header-wrap {
	background-color: #fff;
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
		font-size: 1.52rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.header-right {
		span {
			font-size: 1.3rem;
		}
	}
}
.common-popup-content {
	top: 4rem;
}
.only-duihua {
	/deep/.mint-cell-wrapper {
		.mint-cell-title {
			width: 100%!important;
		}
		.mint-cell-value {
			width: 0!important;
		}
	}
}
</style>
<style>
.menu-content .mint-cell-title {
	flex: unset;
	width: 4rem;
}
.menu-content .mint-cell-value {
	flex: 1;
}
</style>
