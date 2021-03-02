<template>
	<div class="container hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header title="商品发布" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="商品发布"></head-title>
		<step :options="options" :active="2"></step>
		<div style="height: 0.95rem;background: #F4F5F7;"></div>
		<div style="padding: 1.42rem 1.42rem 0.95rem;color: #161616;font-size: 1.33rem;">上传图片：</div>
		<div v-if="value_array.length">
			<div class="image-wrapper" v-for="(item, index) in value_array" :key="index">
				<!-- <div class="label">{{(spec_value && spec_value[1] && spec_value[1][item.spvalue_id])?spec_value[1][item.spvalue_id]:item.spvalue_name}}</div> -->
				<div class="user-avatar-wrapper">
					<div v-if="img[item.spvalue_id] && img[item.spvalue_id][0]" class="user-avatar">
						<img :src="img[item.spvalue_id][0].goodsimage_full_url" @click="openImage(img[item.spvalue_id][0])" />
						<span @click="dropImage(item.spvalue_id, 0)" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadInformPic(item.spvalue_id, 0, $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
				<div class="user-avatar-wrapper" v-if="length[index] > 1 || (img[item.spvalue_id] && img[item.spvalue_id][1])">
					<div v-if="img[item.spvalue_id][1]" class="user-avatar">
						<img :src="img[item.spvalue_id][1].goodsimage_full_url" @click="openImage(img[item.spvalue_id][1])" />
						<span @click="dropImage(item.spvalue_id, 1)" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn2" @change="uploadInformPic(item.spvalue_id, 1, $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
				<div class="user-avatar-wrapper" v-if="length[index] > 2 || (img[item.spvalue_id] && img[item.spvalue_id][2])">
					<div v-if="img[item.spvalue_id][2]" class="user-avatar">
						<img :src="img[item.spvalue_id][2].goodsimage_full_url" @click="openImage(img[item.spvalue_id][2])" />
						<span @click="dropImage(item.spvalue_id, 2)" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn3" @change="uploadInformPic(item.spvalue_id, 2, $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
				<div class="user-avatar-wrapper" v-if="length[index] > 3 || (img[item.spvalue_id] && img[item.spvalue_id][3])">
					<div v-if="img[item.spvalue_id][3]" class="user-avatar">
						<img :src="img[item.spvalue_id][3].goodsimage_full_url" @click="openImage(img[item.spvalue_id][3])" />
						<span @click="dropImage(item.spvalue_id, 3)" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn4" @change="uploadInformPic(item.spvalue_id, 3, $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
				<div class="user-avatar-wrapper" v-if="length[index] > 4 || (img[item.spvalue_id] && img[item.spvalue_id][4])">
					<div v-if="img[item.spvalue_id][4]" class="user-avatar">
						<img :src="img[item.spvalue_id][4].goodsimage_full_url" @click="openImage(img[item.spvalue_id][4])" />
						<span @click="dropImage(item.spvalue_id, 4)" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn5" @change="uploadInformPic(item.spvalue_id, 4, $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
				<div class="user-avatar-wrapper" v-if="length[index] < 5" @click="addImage(index)"><div class="user-avatar iconfont icon-jia"></div></div>
			</div>
			<mt-button class="hsy_f hsy_btn" @click="nextStep">保存</mt-button>
		</div>

		<mt-popup v-model="isshow" popup-transition="popup-fade" class="popup"><img :src="showimage" :style="getBannerStyle" @click="isshow = false" /></mt-popup>
	</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapActions } from 'vuex';
import Step from '../../Step';
import { imageEdit, imageSave, uploadInfoFile } from '../../../api/sellerGoods';
export default {
	data() {
		return {
			options: [{ title: '选择商品分类' }, { title: '填写商品详情' }, { title: '上传商品图片' }],
			commonid: this.$route.query.commonid,
			length: [],
			showimage: '',
			isshow: false,
			value_array: false,
			spec_value: false,
			img: [],
			timer: null //定时器
		};
	},
	computed: {
		getBannerStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width;
			let itemHeight = height;
			return {
				maxWidth: itemWidth + 'px',
				maxHeight: itemHeight + 'px'
			};
		}
	},
	created() {
		imageEdit(this.commonid)
			.then(res => {
				this.value_array = res.result.value_array;
				this.spec_value = res.result.spec_value;
				this.img = res.result.img;
				for (var i in this.value_array) {
					if (this.img[this.value_array[i].spvalue_id]) {
						this.length[i] = this.img[this.value_array[i].spvalue_id].length;
					} else {
						this.length[i] = 1;
					}
				}
			})
			.catch(error => {
				Toast(error.message);
			});
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
		clearTimeout(this.timer);
		this.timer = null;
	},
	components: {
		Step,
		HeadTitle,
	},
	methods: {
		addImage(index) {
			this.length.splice(index, 1, this.length[index] + 1);
		},
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},
		dropImage(index1, index2) {
			var temp = this.img[index1];
			temp.splice(index2, 1, '');
			this.img[index1] = temp;
			this.$forceUpdate();
		},
		uploadInformPic(index1, index2, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();

			formdata.append('file', event.target.files[0]);
			formdata.append('name', 'file');
			uploadInfoFile(formdata)
				.then(res => {
					if (!this.img[index1]) {
						this.img[index1] = [];
					}
					if (!this.img[index1][index2]) {
						this.img[index1][index2] = {
							goodsimage_full_url: '',
							goodsimage_isdefault: 0,
							goodsimage_url: ''
						};
					}
					var temp = this.img[index1];
					var temp2 = temp[index2];

					temp2['goodsimage_full_url'] = res.result.url;
					temp2['goodsimage_url'] = res.result.path;
					temp.splice(index2, 1, temp2);
					this.$forceUpdate();
					this.img[index1] = temp;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		nextStep() {
			imageSave(this.commonid, this.img)
				.then(res => {
					Toast(res.message);
					this.timer = setTimeout(() => {
						this.$router.push({ name: 'SellerGoodsonline' });
					}, 500);
				})
				.catch(error => {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background: #fff;
}
.image-wrapper {
	width: 100%;
	position: relative;
	box-sizing: border-box;
	padding: 1rem 1.42rem 0;
}
.user-avatar-wrapper {
	display: inline-block;
	vertical-align: top;
	margin: 0 1rem 1rem 0;
	// margin-left: 0.5rem;
	// margin-bottom: 0.5rem;
}
.user-avatar-wrapper .del-btn {
	position: absolute;
	bottom: 0.2rem;
	right: 0.2rem;
}
.user-avatar {
	display: block;
	border: 1px solid #eee;
	position: relative;
	width: 8.23rem;
	height: 8.23rem;
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
.user-avatar::before {
	position: absolute;
	font-size: 1.5rem;
	line-height: 8.23rem;
	left: 50%;
	margin-left: -0.75rem;
	color: rgba(0, 0, 0, 0.5);
}
.label {
	padding: 0.5rem;
	font-size: 0.7rem;
	background: #eee;
	margin-bottom: 0.5rem;
}
.avatar-empty {
	background-color: #f4f5f7;
	line-height: 7.61rem;
	img {
		width: 2.86rem;
		height: 2.52rem;
	}
}
</style>
