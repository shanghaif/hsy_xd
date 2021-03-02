<template>
	<div class="container hsy_main">
		<!-- header -->
		<!-- <div class="common-header-wrap">
			<mt-header title="举报详情" class="common-header">
				<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
			</mt-header>
		</div> -->
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">举报商品</span>
			<span></span>
		</div>
		<div v-if="!inform_id">
			<!-- body -->
			<div class="body">
				<div @click="typeVisible = true"><mt-cell title="举报类型" is-link :value="type_name" /></div>
				<div @click="subjectVisible = true"><mt-cell title="举报主题" is-link :value="subject_name" /></div>
				<!-- <mt-cell class="menu-item" title="举报凭证"></mt-cell> -->
				<div class="order-comment-body">
					<div class="enter"><textarea placeholder="举报内容" v-model="content"></textarea></div>
				</div>
				<div class="image-wrapper">
					<div class="user-avatar" ref="upload_btn1" @change="uploadInformPic(0, $event)">
						<img v-if="image[0]" :src="image[0]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<div class="user-avatar" ref="upload_btn2" @change="uploadInformPic(1, $event)">
						<img v-if="image[1]" :src="image[1]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<div class="user-avatar" ref="upload_btn3" @change="uploadInformPic(2, $event)">
						<img v-if="image[2]" :src="image[2]" />
						<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<!-- <div class="user-avatar iconfont icon-xiangji" ref="upload_btn2" @change="uploadInformPic(1, $event)">
						<img v-if="image[1]" :src="image[1]" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div>
					<div class="user-avatar iconfont icon-xiangji" ref="upload_btn3" @change="uploadInformPic(2, $event)">
						<img v-if="image[2]" :src="image[2]" />
						<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
					</div> -->
				</div>
			</div>
			<mt-button type="primary" @click="addInform" class="ds-button-large">提交</mt-button>
			<!--举报类型-->
			<mt-popup v-model="typeVisible" position="right" class="common-popup-wrapper">
				<!-- <div class="common-header-wrap">
					<mt-header title="举报类型" class="common-header"><mt-button slot="left" icon="back" @click="typeVisible = false"></mt-button></mt-header>
				</div> -->
				<div class="header-wrap">
					<img @click="typeVisible = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
					<span class="header-title">举报类型</span>
					<span></span>
				</div>
				<div class="common-popup-content"><mt-radio v-model="type" :options="type_options"></mt-radio></div>
			</mt-popup>
			<!--举报主题-->
			<mt-popup v-model="subjectVisible" position="right" class="common-popup-wrapper">
				<!-- <div class="common-header-wrap">
					<mt-header title="举报主题" class="common-header"><mt-button slot="left" icon="back" @click="subjectVisible = false"></mt-button></mt-header>
				</div> -->
				<div class="header-wrap">
					<img @click="subjectVisible = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
					<span class="header-title">举报主题</span>
					<span></span>
				</div>
				<div class="common-popup-content"><mt-radio v-model="subject" :options="subject_options"></mt-radio></div>
			</mt-popup>
		</div>
		<div v-else class="hsy_main">
			<!--举报信息-->
			<div>
				<div class="menu-content">
					<mt-cell title="举报商家" :value="goods_info.store_name"></mt-cell>
					<mt-cell title="举报商品" :value="goods_info.goods_name"></mt-cell>
					<mt-cell title="举报类型" :value="subject_info.informsubject_type_name"></mt-cell>
					<mt-cell title="举报主题" :value="subject_info.informsubject_content"></mt-cell>
					<mt-cell title="举报时间" :value="$moment.unix(inform.inform_datetime).format('YYYY.MM.DD')"></mt-cell>
					<mt-cell class='jubao-content' title="举报内容" :value="inform.inform_content"></mt-cell>
					<div @click="isshow = true" v-if="inform_pic.length"><mt-cell title="举报凭证" value="查看"></mt-cell></div>
					<mt-cell title="举报状态" :value="inform.inform_handle_type_text"></mt-cell>
					<mt-cell title="处理信息" v-if="inform.inform_handle_message" :value="inform.inform_handle_message"></mt-cell>
				</div>
				<mt-popup v-model="isshow" popup-transition="popup-fade" v-if="inform_pic.length > 0">
					<div class="preview-picture">
						<div class="picture-header" v-on:click="isshow = false">
							<span>关闭</span>
							<span v-if="inform_pic">{{ defaultindex + 1 }} / {{ inform_pic.length }}</span>
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
								<mt-swipe-item v-for="(item, index) in inform_pic" v-bind:key="index"><img v-bind:src="item" /></mt-swipe-item>
							</mt-swipe>
						</div>
					</div>
				</mt-popup>
			</div>
			<mt-button  v-if="inform.inform_state == '1'" @click="cancelInform(inform.inform_id)" class="hsy_f hsy_btn">取消举报</mt-button>
		</div>
	</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { Toast, MessageBox } from 'mint-ui';
import { addInform, uploadInformPic, getCommonData, getInformInfo, getInformSubject, cancelInform } from '../../../api/memberInform';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			content: '',
			inform_id: this.$route.query.inform_id,
			goods_id: this.$route.query.goods_id,
			subjectVisible: false,
			subject_options: [],
			subject_name: '',
			subject: '',
			typeVisible: false,
			type_options: [],
			type_name: '',
			type: '',
			image: ['', '', ''],
			file_value: ['', '', ''],
			inform: {},
			inform_pic: [],
			isshow: false,
			defaultindex: 0,
			subject_info: false,
			goods_info: false
		};
	},
	mounted() {
		resetRem();
	},
	created() {
		if (!this.inform_id) {
			getCommonData(this.goods_id)
				.then(res => {
					let type_options = res.result.type_list;

					for (var i in type_options) {
						this.type_options.push({
							label: type_options[i].informtype_name,
							value: type_options[i].informtype_id + ',' + type_options[i].informtype_name
						});
					}
					this.type = type_options[0].informtype_id + ',' + type_options[0].informtype_name;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		} else {
			getInformInfo(this.inform_id)
				.then(res => {
					this.inform = res.result.inform_info;
					this.subject_info = res.result.subject_info;
					this.inform_pic = res.result.inform_pic;
					this.goods_info = res.result.goods_info;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	watch: {
		subject: function(subject) {
			let temp = subject.split(',');
			this.subject_name = temp[1];
			this.subjectVisible = false;
		},
		type: function(type) {
			let temp = type.split(',');
			this.type_name = temp[1];
			this.typeVisible = false;
			getInformSubject(temp[0])
				.then(res => {
					let subject_options = res.result.inform_subject_list;
					this.subject_options = [];
					for (var i in subject_options) {
						this.subject_options.push({
							label: subject_options[i].informsubject_content,
							value: subject_options[i].informsubject_id + ',' + subject_options[i].informsubject_content
						});
					}
					this.subject = subject_options[0].informsubject_id + ',' + subject_options[0].informsubject_content;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		cancelInform(order_id) {
			MessageBox.confirm('你确定要取消吗？').then(action => {
				cancelInform(order_id)
					.then(res => {
						Toast(res.message);
						this.$router.go(-1);
					})
					.catch(function(error) {
						console.log(error)
						// Toast(error.message);
					});
			});
		},
		handleChange(index) {
			this.defaultindex = index;
		},
		addInform() {
			addInform(this.goods_id, this.subject, this.content, this.file_value)
				.then(res => {
					this.$router.push({ name: 'MemberInformList' });
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		uploadInformPic(index, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();

			formdata.append('inform_pic', event.target.files[0]);

			uploadInformPic(formdata)
				.then(res => {
					this.image.splice(index, 1, res.result.pic + '?' + Math.floor(Math.random() * 100));
					this.file_value.splice(index, 1, res.result.file_name);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.common-score-wrapper .back {
	display: block;
}
.container {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
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
			font-size: 1.39rem;
			font-weight: 400;
			color: rgba(22, 22, 22, 1);
		}
		.header-right {
			span {
				font-size: 1.3rem;
			}
		}
	}
	.body {
		top: 4rem;
		width: 100%;
		margin-bottom: 4.75rem;
		border-bottom: 1px solid #efefef;
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
							font-size: 0.7rem;
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
		}
	}
	.menu-content {
		/deep/.mint-cell-value {
			justify-content: flex-end;
		}
	}
	/deep/.mint-cell {
		padding: 1.19rem 0;
		min-height: 0;
		&::after {
			background-color: #efefef;
			left: 1.42rem;
			right: 0rem;
		}
		.mint-cell-wrapper {
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
					font-size: 1.33rem;
					font-weight: 400;
					color: #6f6f6f;

					word-break:normal; 
					width:auto; 
					display:block; 
					white-space:pre-wrap;
					word-wrap : break-word ;
					overflow: hidden ;

				}
			}
		}
	}
	.jubao-content {
		/deep/.mint-cell-wrapper {
			// flex-direction: column;
			// align-items: flex-start;
			.mint-cell-title {
				margin-bottom: 1.19rem;
			}
			// .mint-cell-value {
			// 	width: 100%!important;
			// }
		}
	}
}
.image-wrapper {
	display: flex;
	padding: 0 1.42rem;
	margin-bottom: 1.44rem;
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
.swipe-wrapper {
	width: 100%;
}
.mint-popup {
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.mint-swipe,
.mint-swipe-items-wrap {
	position: static;
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
		height: 2.2rem;
		color: #000;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		width: 100%;
		top: 0;
		span {
			font-size: 1.4rem;
			font-weight: normal;
			&:first-child {
				cursor: pointer;
				position: absolute;
				left: 0.75rem;
				background-size: 1.2rem;
				display: inline-block;
				height: 2.2rem;
				line-height: 2.2rem;
			}
		}
	}
	.picture-body {
		position: absolute;
		top: 2.2rem;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
}
.menu-item {
	background: #f7f9fa;
}
.common-popup-content {
	top: 4rem;
}

.ds-button-large {
	width: 94%;
	margin: 0 3%;
	background: linear-gradient(89deg, #fc6952 0%, #e53216 99%);
	box-shadow: 0rem 0rem 0.95rem 0rem rgba(235, 64, 38, 0.49);
	border-radius: 1.9rem;
	font-size: 1.33rem;
	font-weight: 400;
	color: #ffffff;
	text-shadow: 0px 0px 0px rgba(251, 104, 84, 0.5);
}
</style>
<style>
.menu-content .mint-cell-title {
	flex: unset;
	width: 7rem !important;
}
.menu-content .mint-cell-value {
	flex: 1;
}
</style>
