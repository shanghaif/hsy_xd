<template>
	<div class="container hsy_main">
		<head-title title="安全员管理"></head-title>
		<div>
			<!--投诉信息-->
			<div>
				<!-- <mt-cell class="menu-item" title="投诉信息"></mt-cell> -->
				<div class="menu-content">
					<mt-cell title="安全员姓名" :value="objInfo.safety_name"></mt-cell>
					<mt-cell title="安全员身份证" :value="objInfo.safety_cid"></mt-cell>
					<mt-cell title="安全员手机号" :value="objInfo.safety_phone"></mt-cell>
					<mt-cell title="安全员街道" :value="objInfo.area_name"></mt-cell>
					<mt-cell title="安全员地址" :value="objInfo.area_info"></mt-cell>
					<!-- <mt-cell class="tousu-content" title="举报内容" :value="objInfo.complain_content"></mt-cell> -->
					<!-- <div @click="isshow = true" v-if="complain_pic.length"><mt-cell title="举报凭证" value="查看"></mt-cell></div> -->
					<br>
					
				<!-- <div v-if="!complaint.end_time"  class="body">
					<div class="order-comment-body">
						<div class="enter"><textarea placeholder="处理意见" v-model="complainsubject_desc"></textarea></div>
					</div>
				</div>
				<mt-cell v-if="complaint.end_time" title="处理时间" :value="complaint.end_time"></mt-cell>
				<div  v-if="complaint.end_time" class="textacont">
					<div class="title">处理信息</div>
					<div class="enter">
						<textarea rows="18" readonly="true" placeholder="暂未处理" v-model="complaint.complainsubject_desc">
					</textarea></div>
				</div> -->
				<!-- <mt-button  v-if="!objInfo.end_time" @click="fun_addReport" class="hsy_f hsy_btn">提交</mt-button> -->
				<div class="button-wrapper">
					<button v-if="objInfo.status == 1" class="ds-button-large " v-on:click="fun_addReport(-1)">拒绝</button>
					<button v-if="objInfo.status == 3 || objInfo.status == 1" class="ds-button-large button-open" v-on:click="fun_addReport(2)">开启</button>
					<button v-if="objInfo.status == 2" class="ds-button-large  button-open " v-on:click="fun_addReport(3)">撤销</button>
				</div>
					<!-- <mt-cell title="处理信息" :value="complaint.complainsubject_desc?complaint.complainsubject_desc:'暂未处理'"></mt-cell> -->				
					
				</div>
				<!-- <mt-popup v-model="isshow" popup-transition="popup-fade" v-if="complain_pic.length > 0">
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
				</mt-popup> -->
			</div>
		</div>
		
		<crop-img ref="cropImg" :dataType="true" @haveCropImgData="fun_getCropImgData"></crop-img>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox } from 'mint-ui';
import '@/assets/style/hsy-mint.scss';
import { keepSafetyInfo, keepSafetyEdit } from '../../../apikeep/safety';
import CropImg from '../../CropImg'

export default {
	data() {
		return {
			safety_id :this.$route.query.safety_id,    // 商家 id
			objInfo:{
				status:2,
			},//安全员详情
		};
	},
	components: {
		HeadTitle,
		"crop-img": CropImg
	},
	created() {
		if ( this.safety_id ) {
			keepSafetyInfo(this.safety_id)
				.then(res => {
					this.objInfo = res.result;
					console.log(res);
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
		// 审核 驳回
		fun_addReport(status) {
			var title = (status == 2)?'开启':"撤销";
			
			MessageBox.confirm('您确定要'+title+'此安全员吗？').then(action => {    
				keepSafetyEdit(this.safety_id,status).then(res => {
					Toast(res.message);
					this.objInfo.status = status;
				}).catch(function(error) {
					Toast(error.message);
				});    

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

	.button-wrapper {
		padding: 0 1.43rem;
    display: flex;
    justify-content: space-around;
		position: fixed;
    width: 92vw;
    bottom: 10vw;
		.ds-button-large {
      width: 48%;
			height: 3.81rem;
			font-size: 1.33rem;
			background: #999;
			border-radius: .9rem;
			color: #fff;
		}
		.button-open {
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0px 0px 20rpx 0px rgba(251, 104, 84, 0.5);
		}
	}
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
