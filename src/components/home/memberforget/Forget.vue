<template>
	<!-- <div class="container"> -->
		<!-- <div class="common-header-wrap">
			<mt-header class="common-header" title="密码找回"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="container">
			<div id="stadus-bar"></div>
			<div class="icon-back" @click="$router.go(-1)"><img src="../../../assets/image/icon2/icon-back.png" alt="" /></div>
			<div class="page-title">密码找回</div>
			<div class="list-wrapper">
				<div class="input-wrapper">
					<span>+86</span>
					<input v-model="username" placeholder="请输入手机号" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }" />
				</div>
				<div class="input-wrapper">
					<span>验证码</span>
					<input v-model="verifyCodeMobile" placeholder="请输入短信验证码" type="number" :attr="{ oninput: 'if(value.length>6)value=value.slice(0,6)' }" />
					<p @click="sendVerifyCodeMobile" class="countdown" plain>{{ sendStateTextMobile }}</p>
				</div>
				<div class="input-wrapper">
					<span>设置密码</span>
					<input type="password" v-model="password" placeholder="6-20位数字/字母/符号" maxlength="20" />
				</div>
				<div class="input-wrapper">
					<span>确认密码</span>
					<input type="password" v-model="confirmPassword" placeholder="6-20位数字/字母/符号" maxlength="20" />
				</div>
			</div>
			<div class="button-wrapper">
				<mt-button class="ds-button-large" :class="username && password && confirmPassword && verifyCodeMobile != '' ? 'button-open' : 'button-disable'" v-on:click="onSubmit">确定</mt-button>
			</div>
			<!-- <div class="section-wrapper top-wrapper">
				<div>
					<mt-field class="input-wrapper" v-model="username" placeholder="请输入手机号" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }" />
				</div>
				<mt-field class="input-wrapper" placeholder="验证码" v-model="verifyCodeMobile" type="number" :attr="{ oninput: 'if(value.length>6)value=value.slice(0,6)' }">
					<mt-button @click="sendVerifyCodeMobile" class="btn" type="default" size="small" plain>{{ sendStateTextMobile }}</mt-button>
				</mt-field>
			</div>
			<div class="section-wrapper bottom-wrapper">
				<div><mt-field class="input-wrapper" type="password" v-model="password" placeholder="设置密码" maxlength="20" /></div>
				<div><mt-field type="password" class="input-wrapper" v-model="confirmPassword" placeholder="确认密码" maxlength="20" /></div>
			</div>
			<label class="tips">6-20位数字/字母/符号</label>
			<mt-button type="primary" class="ds-button-large" v-on:click="onSubmit">确定</mt-button> -->
		</div>
	<!-- </div> -->
</template>

<script>
import { forget } from '../../../api/memberForget';
import { getSmsCaptcha } from '../../../api/common';
import { mapMutations, mapActions, mapState } from 'vuex';
import { Toast } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem'
export default {
	name: 'HomeMemberForget',
	components: {},
	data() {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			verifyCodeMobile: '',
			canSendMobile: true,
			timeIntervalMobile: false,
			sendStateTextMobile: '发送'
		};
	},

	created() {
		resetRem()
		// let html = document.documentElement;
		// let font = html.style.fontSize;
		// let arr = ''
		// arr = parseInt(font.split('px')) 
		// // 手机端专用
		// document.getElementById("top-bg").style.height = (arr*12.78 + plus.navigator.getStatusbarHeight())+'px';
	},
	mounted() {
		resetRem()
	},
	beforeDestroy: function() {
		clearInterval(this.timeIntervalMobile);
		resumeRem()
	},
	methods: {
		...mapMutations({
			saveAuthInfo: 'memberLogin'
		}),
		onSubmit() {
			forget(this.username, this.verifyCodeMobile, this.password, this.confirmPassword).then(
				response => {
					this.saveAuthInfo({ token: response.result.token, info: response.result.info });
					this.$router.push({ name: 'MemberIndex' });
				},
				error => {
					Toast(error.message);
				}
			);
		},
		sendVerifyCodeMobile() {
			if (!this.canSendMobile) {
				return;
			}
			getSmsCaptcha(3, this.username)
				.then(res => {
					this.canSendMobile = false;
					let second = 60;
					Toast(res.message);
					let _this = this;
					this.timeIntervalMobile = setInterval(function() {
						if (second <= 0) {
							_this.canSendMobile = true;
							_this.sendStateTextMobile = '发送';
							clearInterval(_this.timeIntervalMobile);
						} else {
							_this.sendStateTextMobile = second + 's';
						}

						second--;
					}, 1000);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	// .section-wrapper {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: flex-start;
	// 	align-items: stretch;
	// 	background-color: #ffffff;
	// 	border-top: 1px solid #e8eaed;
	// 	border-bottom: 1px solid #e8eaed;
	// 	.input-wrapper {
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-content: flex-start;
	// 		align-items: center;
	// 		background-color: #fff;
	// 		height: 2.2rem;
	// 		padding-left: 0.5rem;
	// 		input {
	// 			flex: 1;
	// 			font-size: 0.8rem;
	// 		}
	// 		.bottom-input {
	// 			border-bottom-width: 0;
	// 		}
	// 	}
	// }
	.icon-back {
		margin: 1.19rem 0 0 1.43rem;
		img {
			width: 1.9rem;
			height: 1.9rem;
		}
	}
	.list-wrapper {
		padding: 4.15rem 2.38rem 1.66rem;
		.input-wrapper {
			margin-bottom: 2.05rem;
			display: flex;
			align-items: center;
			padding: 0.95rem 0;
			border-bottom: 1px solid rgba(151, 151, 151, 0.23);
			font-size: 1.33rem;
			font-family: PingFangSC-Regular, PingFang SC;
			color: rgba(22, 22, 22, 1);
			span {
				display: inline-block;
				width: 6.76rem;
				position: relative;
				&::after {
					content: '';
					height: 0.9rem;
					width: 1px;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translate(0, -50%);
					background-color: rgba(151, 151, 151, 1);
				}
			}
			input {
				color: rgba(22, 22, 22, 1);
				padding-left: 1.38rem;
				&::placeholder {
					color: rgba(198, 198, 198, 1);
				}
			}
		}
	}
}
// .top-wrapper {
// 	margin-top: 0.5rem;
// }
// .bottom-wrapper {
// 	margin-top: 0.5rem;
// }
// .tips {
// 	color: #c3c3c3;
// 	font-size: 0.6rem;
// 	margin-left: 0.9rem;
// 	margin-top: 0.5rem;
// 	text-align: left;
// }
// .ds-button-large {
// 	margin-top: 1rem;
// }
.countdown {
	margin-left: auto;
	border: 0;
	margin-right: 0.9rem;
	flex-shrink: 0;
	color: rgba(232, 69, 71, 1);
}
.page-title {
	margin-top: 5.34rem;
	margin-left: 1.3rem;
	font-size: 2.29rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(22, 22, 22, 1);
}
.button-wrapper {
	padding: 0 1.43rem;
	.ds-button-large {
		height: 3.8rem;
		font-size: 1.33rem;
		background: rgba(230, 230, 230, 1);
		border-radius: 1.9rem;
		color: #fff;
	}
	.button-open {
		background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
		box-shadow: 0px 0px 20rpx 0px rgba(251, 104, 84, 0.5);
	}
	.button-disable {
		background: rgba(230, 230, 230, 1);
	}
}
</style>
