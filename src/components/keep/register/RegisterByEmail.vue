<template>
	<div class="container">
		<div class="list-wrapper">			
			<div class="input-wrapper">
				<span>用户名称</span>
				<input type="text"  v-model="obj.username" placeholder="用户名称" maxlength="25">
			</div>
			<div class="input-wrapper">
				<span>设置密码</span>
				<input type="password" v-model="obj.password" placeholder="设置密码" maxlength="20">
			</div>
			<div class="input-wrapper">
				<span>确认密码</span>
				<input type="password" v-model="obj.password1" placeholder="确认密码" maxlength="20">
			</div>

			<div class="input-wrapper">
				<span>真实姓名</span>
				<input type="text"  v-model="obj.safety_name" placeholder="请输入真实姓名" maxlength="25">
			</div>
			<div class="input-wrapper">
				<span>手机号</span>
				<input type="text"  v-model="obj.safety_phone" placeholder="请输入手机号" maxlength="25">
			</div>
			<div class="input-wrapper">
				<span>身份证号</span>
				<input type="text"  v-model="obj.safety_cid" placeholder="请输入身份证号" maxlength="25">
			</div>

			<div class="input-wrapper">
				<span>所在乡镇</span>
				<input @click="onRegion" readonly="true" type="text"  v-model="obj.area_name" placeholder="请选择所在乡镇" maxlength="25">
			</div>
			<div class="input-wrapper">
				<span>村/居委会</span>
				<input type="text"  v-model="obj.area_info" placeholder="请输入（村/居委会）" maxlength="25">
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
			<mt-button class="ds-button-large" v-on:click="onSubmit" :class="obj.username && obj.password &&obj.password1 != '' ? 'button-open' : 'button-disable'">注册</mt-button>
		</div>
		
		<region-picker ref="picker" v-on:onConfirm="onPickerConfirm"></region-picker>
		
	</div>
</template>

<script>
import { login } from '../../../api/memberLogin'
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { keepRegister } from '../../../apikeep/login'
import { checkPictureCaptchaChange } from '../../../api/common'
import { resetRem, resumeRem } from '@/util/rem';
import RegionPicker from '../RegionPicker2';

import html2canvas from "html2canvas"

export default {
  name: 'RegisterByEmail',
  data () {
    return {
			obj:{
				username: '',         // 用户名称
				password: '',         // 用户密码
				password1: '',        // 用户密码

				safety_name: null,    // 姓名
				safety_phone: null,   // 手机号
				safety_cid: null,     // 身份证
				area_id: null,        // 镇
				area_name: null,      // 镇名称
				area_info: null,      // 村（详细地址）
			},
			
			
      pictureCodeValid: false,
      pictureCode: '',
      pictureCodeUrl: '',//验证码
			pictureCodeValue:null,//验证码值
			codeUrl:'',

			previous:null,
			nowTime:null,
    }
	},
	components: {
		RegionPicker,
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
	beforeDestroy: function() {
		resumeRem()
	},
  methods: {
    ...mapMutations({
			keepLogin: 'keepLogin',
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
		
		// 判断是否是 手机号
		checkIsTel(value){
			var Tel = /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/;
			var Landline = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
			if(Tel.test(value)){
					return true;
			}else if(Landline.test(value)){
				return true;
			}else{
				return false;
			}
		},
			
		// 判断是否是身份证
		checkIsCardNo(card){  
			// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			if(reg.test(card) === false){   
				return  false;  
			}else{
				return true;
			}
		},

    check () {
      let obj = this.obj;
			var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
			
			if( reg.test(obj.username) ){
				Toast("不得输入特殊符号");
				return false;
			}
      if (obj.username.length === 0) {
        Toast('请输入3-25个字符的用户名')
        return false
      }
      if (obj.username.length < 3 || obj.username.length > 25) {
        Toast('请输入3-25个字符的用户名')
        return false
      }
      if (obj.password.length === 0) {
        Toast('请输入密码')
        return false
      }
      if (obj.password.length < 6 || obj.password.length > 20) {
        Toast('请输入6-20个字符的密码')
        return false
      }
      if (obj.password1.length === 0) {
        Toast('请输入确认密码')
        return false
      }
      if (obj.password.length !== obj.password1.length) {
        Toast('确认密码与输入密码不一致')
        return false
      }
      if (obj.password !== obj.password1) {
        Toast('确认密码与输入密码不一致')
        return false
			}

			// safety_name: null,    // 姓名
			// safety_phone: null,   // 手机号
			// safety_cid: null,     // 身份证
			// area_id: null,        // 镇
			// area_name: null,      // 镇名称
			// area_info: null,      // 村（详细地址）

			if( !obj.safety_name ){
        Toast('请输入真实姓名');
        return false;
			}
			if( !this.checkIsTel(obj.safety_phone) ){
        Toast('手机号格式有误');
        return false;
			}
			if( !this.checkIsCardNo(obj.safety_cid) ){
        Toast('身份证格式有误');
        return false;
			}
			if( !obj.safety_cid ){
        Toast('请输入身份证');
        return false;
			}
			if( !obj.area_id ){
        Toast('请选择所在乡镇');
        return false;
			}
			if( !obj.area_info ){
        Toast('请输入（村/居委会）');
        return false;
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
			Indicator.open();
			
      keepRegister(
				this.obj
			).then(res=>{
				Indicator.close();
				Toast(res.message);
				console.log(res);
				// this.keepLogin({ token: response.result.token, info: response.result.info,mclass:1 })
				// this.$router.push({ name: 'KeepIndex' }) 
			}).catch(err=>{
				Indicator.close();
				Toast(err.message);
			})
    },
    onSubmit () {
      this.signup()
    },
		
		onRegion(picker, values) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			var obj  = {};
			obj.area_info = this.getRegionStr(values);
			obj.area_id = values[2].area_id;
			obj.city_id = values[1].area_id;
			// console.log(obj);
			this.obj.area_id = obj.area_id;
			this.obj.area_name = obj.area_info;

		},
		getRegionStr(values) {
			let title = '';
			for (let i = 0; i < values.length; i++) {
				const element = values[i];
				if (i !== 0) {
					title = title + ' ' + element.area_name;
				} else {
					title = title + element.area_name;
				}
			}
			return title;
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
		
		padding: 1.43rem 2.38rem 1.66rem;
		.input-wrapper {
			margin-bottom: 0.7rem;
      padding: 0.7rem 0;
      border-bottom: 1px solid rgba(151, 151, 151, 0.23);
      font-size: 1.33rem;
      color: #161616;
			display:flex;
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
				flex:1;
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
