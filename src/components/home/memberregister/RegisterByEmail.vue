<template>
	<div class="container">
		<!-- <div class="section-wrapper top-wrapper">
			<div><mt-field class="input-wrapper" v-model="username" placeholder="用户名" maxlength="25" /></div>
		</div>
		<label class="tips">用户名为3-25位，可以包含英文与数字</label>
		<div class="section-wrapper bottom-wrapper">
			<div><mt-field type="password" class="input-wrapper" v-model="password" placeholder="设置密码" maxlength="20" /></div>
			<div><mt-field type="password" class="input-wrapper" v-model="confirmPassword" placeholder="确认密码" maxlength="20" /></div>
		</div>
		<label class="tips">6-20位数字/字母/符号</label> -->
		<div class="list-wrapper">
			<div class="input-wrapper">
				<span>用户名</span>
				<input type="text"  v-model="username" placeholder="用户名" maxlength="25">
			</div>
			<div class="input-wrapper">
				<span>设置密码</span>
				<input type="password" v-model="password" placeholder="设置密码" maxlength="20">
			</div>
			<div class="input-wrapper">
				<span>确认密码</span>
				<input type="password" v-model="confirmPassword" placeholder="确认密码" maxlength="20">
			</div>
			<div class="input-wrapper code">
				<span>验证码</span>
				<input type="number" v-model="pictureCode" placeholder="输入验证码" oninput='if(value.length>4)value=value.slice(0,4)'>
				<div class="code_style"  @click="getCode">
					<div v-show="!codeUrl" v-html="pictureCodeUrl" ref="wakeCode"></div>
					<img v-if="codeUrl" :src="codeUrl" alt="">					
				</div>
			</div>
			
		</div>
		<div class="button-wrapper">
			<mt-button class="ds-button-large" v-on:click="onSubmit" :class="username && password &&confirmPassword != '' ? 'button-open' : 'button-disable'">注册</mt-button>
		</div>
		
		
	</div>
</template>

<script>
import { login } from '../../../api/memberLogin'
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { register } from '../../../api/memberRegister'
import { checkPictureCaptchaChange } from '../../../api/common'
import { resetRem, resumeRem } from '@/util/rem';

import html2canvas from "html2canvas"

export default {
  name: 'RegisterByEmail',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
			aggrementUrl: '',
			
			
      pictureCodeValid: false,
      pictureCode: '',
      pictureCodeUrl: '',//验证码
			pictureCodeValue:null,//验证码值
			codeUrl:'',

			previous:null,
			nowTime:null,
    }
	},
	
	
  watch: {
    pictureCode: function (val) {
      this.pictureCodeWait = true
      if (val.length >= 4) {
        if ( val == this.pictureCodeValue ){
          this.pictureCodeWait = false
          this.pictureCodeValid = true
        }else{
          this.pictureCodeWait = false;
          this.pictureCodeValid = false;
          Toast('验证码错误')
        }
      }
		},
	},

  created: function () {

	},
	mounted(){		
		this.changePictureCode();
		resetRem();
	},
  computed: {
    ...mapState({
      inviter_id: state => state.member.inviterId
    })
  },
	beforeDestroy: function() {
		resumeRem()
	},
  methods: {
    ...mapMutations({
			saveAuthInfo: 'memberLogin',
			
      // memberSaveArea_id:"memberSaveArea_id",      //保存收货地址
      // memberEx:"memberEx",//保存当前选中收货地址
      // memberTsids:"memberTsids",//保存可配送到当前用户的商家列表
		}),
		
		getCode(){			
      this.nowTime = new Date().getTime();
      if ( this.previous + 1000 <= this.nowTime ) {
				this.changePictureCode();
        this.previous = this.nowTime;
      }else{
				Indicator.close();
				Indicator.open('获取验证码...');
				setTimeout(()=>{
					Indicator.close();
				},500)
			}
		},

		// 数字验证码 转化成 文字
    changePictureCode () {
			this.codeUrl = '';
      checkPictureCaptchaChange().then(res=>{
        this.pictureCodeUrl = res.result.h;
				this.pictureCodeValue = res.result.s;
				this.$nextTick(()=>{
					//生成图片
					html2canvas(this.$refs.wakeCode,{useCORS:true,logging:true}).then(canvas => {
							// 转成图片，生成图片地址
							this.codeUrl = canvas.toDataURL("image/png");
					});
					
					Indicator.close();
				})
      }).catch(err=>{
        Toast(err.message);
      })
		},
		
    goBack () {
      this.$router.go(-1)
    },
    goProfile () {
      this.$router.go(-2)
    },
    goProfileAdd () {
      this.$router.push({ name: 'profileAdd' })
    },
    check () {
      let username = this.username
      let password = this.password
			let confirmPassword = this.confirmPassword
			var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
			if( reg.test(username) ){
				Toast("不得输入特殊符号");
				return false;
			}
      if (username.length === 0) {
        Toast('请输入3-25个字符的用户名')
        return false
      }
      if (username.length < 3 || username.length > 25) {
        Toast('请输入3-25个字符的用户名')
        return false
      }
      if (password.length === 0) {
        Toast('请输入密码')
        return false
      }
      if (password.length < 6 || password.length > 20) {
        Toast('请输入6-20个字符的密码')
        return false
      }
      if (confirmPassword.length === 0) {
        Toast('请输入确认密码')
        return false
      }
      if (password.length !== confirmPassword.length) {
        Toast('确认密码与输入密码不一致')
        return false
      }
      if (password !== confirmPassword) {
        Toast('确认密码与输入密码不一致')
        return false
      }

      return true
    },
    signup () {			
      if (!this.pictureCodeValid) {
        Toast('验证码错误')
    		this.changePictureCode()
        return
      }
      if (!this.check()) {
        return
      }
      Indicator.open()
      let inviterId = this.inviter_id // 获取邀请人id
      register(this.username, this.password, this.confirmPassword, inviterId).then(
        response => {
          Indicator.close()
          this.saveAuthInfo({ token: response.result.token, info: response.result.info,mclass:1 })
					this.$router.push({ name: 'MemberIndex' })        },
        error => {
          Indicator.close()
          Toast(error.message)
        }
      )
    },
    onSubmit () {
      this.signup()
    },
    onAgreement () {
      this.$router.push({
        name: 'HomeDocument',
        query: { type: '' }
      })
		},
  }
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.list-wrapper {
		
		padding: 4.15rem 2.38rem 1.66rem;
		.input-wrapper {
			margin-bottom: 2.05rem;
			padding: 0.95rem 0;
			border-bottom: 1px solid rgba(151, 151, 151, 0.23);
			font-size:1.33rem;
			font-family:PingFangSC-Regular,PingFang SC;
			color:rgba(22,22,22,1);
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
					transform: translate(0,-50%);
					background-color: rgba(151, 151, 151, 1);
				}
			}
			input {
				font-size: 1.33rem;
				color:rgba(22,22,22,1);
				padding-left: 1.38rem;
				&::placeholder {
					color:rgba(198,198,198,1);
				}
			}
		}

		.code{
			position: relative;	

			.code_style{
				position: absolute;
				width: 8.2rem;
				height: 3.62rem;
				right: 1rem;
				overflow: hidden;
				bottom: .21rem;
				div{
					width: 100%;
					height: 100%;
				}
				img{
					width: 100%;
					height: 100%;
				}
			}
			@media only screen and (max-width: 360px){				
				.code_style{
					width: 100px;
					height: 40px;
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
	//background-color: #e93b3d;
	// .section-wrapper {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: flex-start;
	// 	align-items: stretch;
	// 	background-color: #ffffff;
	// 	border-top: 1px solid #e8eaed;
	// 	border-bottom: 1px solid #e8eaed;
	// 	.input-wrapper {
	// 		font-size: 0.8rem;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-content: flex-start;
	// 		align-items: center;
	// 		background-color: #fff;
	// 		height: 2.2rem;
	// 		padding-left: 0.5rem;
	// 		input {
	// 			flex: 1;
	// 		}
	// 		.bottom-input {
	// 			border-bottom-width: 0;
	// 		}
	// 	}
	// }
	
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
</style>
