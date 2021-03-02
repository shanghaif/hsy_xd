<template>
	<div class="container">
		<!-- <div class="section-wrapper top-wrapper">
			<div >
				<mt-field class="input-wrapper" v-model="username" placeholder="请输入手机号" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }" />
			</div>

			<div >
				<mt-field class="input-wrapper" v-model="code" placeholder="请输入短信验证码" type="number" :attr="{ oninput: 'if(value.length>6)value=value.slice(0,6)' }" >
				<mt-button @click="sendVerifyCodeMobile" class="countdown" type="default" size="small" plain>{{sendStateTextMobile}}</mt-button>
				</mt-field>
			</div>
		</div> -->
		<!-- <div class="section-wrapper bottom-wrapper">
			<div >
				<mt-field
					type="password"
					class="input-wrapper"
					v-model="password"
					placeholder="设置密码"
					maxlength="20"
				/>
			</div>
			<div >
				<mt-field
					type="password"
					class="input-wrapper"
					v-model="confirmPassword"
					placeholder="确认密码"
					maxlength="20"
				/>
			</div>
		</div> -->
		<!-- <label class="tips">6-20位数字/字母/符号</label> -->
		<div class="list-wrapper">
			<div class="input-wrapper">
				<span>+86</span>
				<input v-model="username" placeholder="请输入手机号" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }" />
			</div>
			<div class="input-wrapper">
				<span>验证码</span>
				<input v-model="code" placeholder="请输入短信验证码" type="number" :attr="{ oninput: 'if(value.length>6)value=value.slice(0,6)' }" />
				<p @click="sendVerifyCodeMobile" class="countdown" plain>{{ sendStateTextMobile }}</p>
			</div>
			<div class="input-wrapper">
				<span>设置密码</span>
				<input type="password" v-model="password" placeholder="设置密码" maxlength="20" />
			</div>
			<div class="input-wrapper">
				<span>确认密码</span>
				<input type="password" v-model="confirmPassword" placeholder="确认密码" maxlength="20" />
			</div>
		</div>
		<div class="button-wrapper">
			<mt-button class="ds-button-large" :class="username && password && confirmPassword && code != '' ? 'button-open' : 'button-disable'" v-on:click="onSubmit">注册</mt-button>
		</div>
	</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { registerByMobile } from '../../../api/memberRegister';
import { getSmsCaptcha, checkPictureCaptcha } from '../../../api/common';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'RegisterByMobile',
	data() {
		return {
			pictureCodeUrl: '',
			pictureCode: '',
			pictureCodeValid: true,
			pictureCodeWait: true,
			username: '',
			code: '',
			password: '',
			confirmPassword: '',
			aggrementUrl: '',
			verifyCodeMobile: '',
			canSendMobile: true,
			timeIntervalMobile: false,
			sendStateTextMobile: '发送'
		};
	},
	mounted() {
		resetRem();
		this.changePictureCode();
	},
	created: function() {},
	beforeDestroy: function() {
		resumeRem()
	},
	computed: {
		...mapState({
			inviter_id: state => state.member.inviterId
		})
	},
	/* watch: {
    pictureCode: function (val) {
      if (val.length >= 4) {
        this.pictureCodeWait = true
        checkPictureCaptcha(val).then(
          response => {
            this.pictureCodeWait = false
            this.pictureCodeValid = true
          },
          error => {
            this.pictureCodeWait = false
            Toast(error.message)
          }
        )
      }
    }
  },
*/
	beforeDestroy: function() {
		clearInterval(this.timeIntervalMobile);
	},
	methods: {
		...mapMutations({
			saveAuthInfo: 'memberLogin'
		}),
		goBack() {
			this.$router.go(-1);
		},
		goProfile() {
			this.$router.go(-2);
		},
		goProfileAdd() {
			this.$router.push({ name: 'profileAdd' });
		},
		changePictureCode() {
			this.pictureCodeUrl = env.API_HOST + '/Seccode/makecode?r=' + Math.random();
		},
		sendVerifyCodeMobile() {
			if (!this.username) {
				Toast('请先输入手机号');
				return;
			}
			if (!this.canSendMobile) {
				return;
			}
			getSmsCaptcha(1, this.username)
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
		},
		check() {
			let username = this.username;
			let code = this.code;
			let password = this.password;
			let confirmPassword = this.confirmPassword;
			if (username.length === 0) {
				Toast('请输入手机号');
				return false;
			}
			if (code.length === 0) {
				Toast('请输入验证码');
				return false;
			}
			if (code.length !== 6) {
				Toast('请输入6位验证码');
				return false;
			}
			if (password.length === 0) {
				Toast('请输入密码');
				return false;
			}
			if (password.length < 6 || password.length > 20) {
				Toast('请输入6-20个字符的密码');
				return false;
			}
			if (confirmPassword.length === 0) {
				Toast('请输入确认密码');
				return false;
			}
			if (password.length !== confirmPassword.length) {
				Toast('确认密码与输入密码不一致');
				return false;
			}
			if (password !== confirmPassword) {
				Toast('确认密码与输入密码不一致');
				return false;
			}
			return true;
		},
		signup() {
			if (!this.check()) {
				return;
			}
			Indicator.open();
			let inviterId = this.inviter_id; // 获取邀请人id

			registerByMobile(this.username, this.password, this.confirmPassword, this.code, inviterId).then(
				response => {
					Indicator.close();
					this.saveAuthInfo({ token: response.result.token, info: response.result.info, mclass: 1 });
					this.$router.push({ name: 'MemberIndex' });
				},
				error => {
					Indicator.close();
					Toast(error.message);
				}
			);
		},
		onSubmit() {
			this.signup();
		},
		onAgreement() {
			this.$router.push({
				name: 'HomeDocument',
				query: { type: '' }
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
	//background-color: #e93b3d;
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
				font-size: 1.33rem;
				width: 15rem;
				color: rgba(22, 22, 22, 1);
				padding-left: 1.38rem;
				&::placeholder {
					color: rgba(198, 198, 198, 1);
				}
			}
		}
	}
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
.countdown {
	margin-left: auto;
	border: 0;
	flex-shrink: 0;
	margin-right: 0.9rem;
	color: rgba(232, 69, 71, 1);
	// min-width: 4rem;
	// margin-right: 0.5rem;
}
</style>
