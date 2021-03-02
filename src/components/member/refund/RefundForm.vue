<template>
	<div class="member-information hsy_main">
		<!-- <div class="common-header-wrap">
            <mt-header title="新增退款" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div> -->
		<head-title title="新增退款"></head-title>
		<div class="form">
			<div class="order-comment-body">
				<div class="enter"><textarea placeholder="退款说明" v-model="buyer_message"></textarea></div>
			</div>
			<!-- <mt-field label="退款说明" v-model="buyer_message" type="textarea" /> -->
			<mt-cell title="退款凭证"></mt-cell>
			<div class="image-wrapper">
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadRefundImage(0, $event)">
					<img class="img-content" v-if="image[0]" :src="image[0]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn2" @change="uploadRefundImage(1, $event)">
					<img class="img-content" v-if="image[1]" :src="image[1]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
				<div class="user-avatar iconfont icon-xiangji" ref="upload_btn3" @change="uploadRefundImage(2, $event)">
					<img class="img-content" v-if="image[2]" :src="image[2]" />
					<img v-else class="img-add" src="@/assets/image/icon2/icon-add-img.png" alt="" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
			</div>
			<mt-button class="hsy_f hsy_btn"  @click="submitInformation">保存</mt-button>
		</div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast } from 'mint-ui';

import { uploadRefundImage, addRefundAll } from '../../../api/memberRefund';
export default {
	components: {
		HeadTitle
	},
	name: 'MemberRefundForm',
	data() {
		return {
			order_id: this.$route.query.order_id,
			image: ['', '', ''],
			buyer_message: '',
			file_value: ['', '', '']
		};
	},
	mounted() {
		resetRem();
	},
	computed: {},
	created: function() {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		submitInformation() {
			addRefundAll(this.order_id, this.buyer_message, this.file_value)
				.then(res => {
					Toast(res.message);
					this.$router.push({ name: 'MemberRefundList' });
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		uploadRefundImage(index, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();

			formdata.append('refund_pic', event.target.files[0]);

			uploadRefundImage(formdata)
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
.member-information {
	&/deep/.mint-cell .mint-cell-wrapper {
		font-size: 1.43rem;
	}
	background: #fff;
	.image-wrapper {
		display: flex;
		margin: 1rem;
	}
	.user-avatar {
		flex: 1;
		border: 1px solid #eee;
		position: relative;
		width: 5rem;
		height: 5rem;
		margin: 0 auto;
		text-align: center;
		display: flex;
		justify-content: center;
    align-items: center;
		img {
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
	.ds-button-large {
		margin-top: 1rem;
	}
	
	.hsy_btn{
		
		background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
		box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
		border-radius: 40px;
		color: #fff;
		width: 92%;
		font-size: 1.33rem;
		height: 3.4rem;
		position: fixed;
		bottom: 4%;
		left: 4%;
		z-index: 1;
	}
}
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
	.enter {
		textarea {
			width: 100%;
			height: 6rem;
			border: 1px solid #f7f9fa;
			box-sizing: border-box;
			-webkit-appearance: none;
			outline: none;
		}
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
</style>
