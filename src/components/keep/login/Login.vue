<template>
	<div class="container">
		<!--        <div class="common-header-wrap">
            <mt-header class="common-header" title="登录">
                <mt-button icon="back" slot="left" @click="$router.go(-2)"></mt-button>
                <mt-button slot="right" @click="onSignup">注册</mt-button>
            </mt-header>
        </div> -->
		<div class="icon-back" @click="fun_goBack"><img src="../../../assets/image/icon2/icon-back.png" alt="" /></div>
		<!-- <div class="page-title">欢迎登陆好食源</div> -->
		<div class="top-wrapper">
			<div class="page-title">移动监管</div>
			<!-- <mt-field class="input-wrapper" v-model="username" placeholder="用户名/邮箱/手机号" type="text">
            </mt-field> -->
			<input class="input-wrapper input-wrapper1" type="text" v-model="username" placeholder="用户名称/手机号" />
			<input class="input-wrapper input-wrapper2" type="password" v-model="password" placeholder="用户密码" />
			<!-- <mt-field class="input-wrapper" type="password" v-model="password" placeholder="请输入密码">
            </mt-field> -->
			<div class="button-text">
				<span class="forget-text" @click="onRetrieve">忘记密码</span>
				<span class="register-text" @click="onSignup">新用户<span>注册</span>
				</span>
			</div>
		</div>

		<!-- <div class="retrieve-wrapper">
            <div class="retrieve-item" @click="onRetrieve">
                <label id="retrieve-title">忘记密码？</label>
            </div>
        </div> -->
		<div class="button-wrapper">
      <button class="ds-button-large"
        :class="username && password != '' ? 'button-open' : 'button-disable'" v-on:click="signin(1)">管理员登录</button>
      <button class="ds-button-large"
        :class="username && password != '' ? 'button-open' : 'button-disable'" v-on:click="signin(2)">安全员登录</button>
    </div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem'
import { keepLogin } from '../../../apikeep/login'
import { isWechat } from '../../../util/wechat'
import { Indicator, Toast } from 'mint-ui'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',

      pathName:null,  // 来自于 那个页面
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // console.log(from.name);
      vm.pathName = from.name;
      // 通过 `vm` 访问组件实例
      vm.utils.setCookie('referrer', encodeURIComponent(from.fullPath), 1 / 24)
    })
  },
  created: function () {
    // Indicator.close()
    // let user_info = this.utils.getCookie('user_info')
    // let token = this.utils.getCookie('key')
    // if (user_info) {
    //   user_info = JSON.parse(decodeURIComponent(user_info))
    //   this.saveAuthInfo({ token: token, info: user_info })
    //   this.utils.clearCookie('user_info')
    //   this.utils.clearCookie('key')
    //   this.goHome()
    // }
    if (this.$route.query.clear) {
      this.clearkeepInfo()
    }
    // this.fetchConfig({}).then(
    //   response => {
    //   },
    //   error => {
    //     Toast(error.message)
    //   }
    // )
  },
  mounted () {
    resetRem();
    let isTokenInvalid = this.$route.params.isTokenInvalid
    if (isTokenInvalid) {
      Toast('登录过期')
    }
  },
  beforeDestroy () {
    resumeRem();
  },
  methods: {
    ...mapMutations({
      savekeepInfo: 'savekeepInfo',  // 保存用户信息
      clearkeepInfo: 'clearkeepInfo',
    }),

    fun_goBack(){
      this.$router.go(-1);
      return false;
      if( this.pathName == 'MemberIndex' ){
        // this.$router.go(-2)
        if( this.$route.query.clear ){
          // console.log('揍你',this.$router);
          // this.$router.go(-3);
          this.$router.push( { name: "HomeIndex"} );
        }else{
          this.$router.go(-2)
        }
      }else{
        this.$router.go(-2)
      }
    },
    // 登录
    signin (client_type) {
      let username = this.username
      let password = this.password
      if (username.length === 0) {
        Toast('请输入用户名称')
        return
      }
      // TODO: 用户名（为手机号或邮箱）校验
      if (password.length === 0) {
        Toast('请输入用户密码')
        return
      }
      if (password.length < 6) {
        Toast('至少输入6位密码')
        return
      }
      Indicator.open()
      keepLogin( username, password, client_type).then(
        res => {
          Indicator.close();
          var info = (res.result.client_type == 1 )? res.result.supervise_info : res.result.safety_info;
          console.log(info);
          var token = res.result.client_type+'|'+ info.admin_id;
          this.savekeepInfo( [token,info] );
			    this.$router.push({ name: 'KeepIndex' });
        },
        error => {
          Indicator.close()
          Toast(error.message)
        }
      )
    },

    goBack () {
      this.$router.go(-1);
    },

    goHome () {
      let referrer = this.utils.getCookie('referrer');
      if (referrer) { // 返回之前的页面
        referrer = decodeURIComponent(referrer);
        this.utils.clearCookie('referrer');
        // console.log(referrer);
        if( referrer == '/member/setting' ){
          this.$router.go(-1);
        }
        this.$router.push({ path: referrer })
      } else {
        this.$router.push({ name: 'MemberIndex' })
      }
    },

    onSignup () {
      this.$router.push({ name: 'KeepRegister' })
    },

    onRetrieve () {
      this.$router.push({ name: 'KeepForget' })
    },

  }
}
</script>

<style scoped lang='scss'>
.container {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #fff;

	.icon-back {
		margin: 1.19rem 0 0 1.43rem;
		img {
			width: 1.9rem;
			height: 1.9rem;
		}
	}

	.top-wrapper {
		padding: 5.58rem 2.38rem 7.05rem;
    margin: 7.58rem 1.38rem 3.05rem;
    background: #eee;
    padding: 1rem;
    padding-bottom: 2rem;
    border-radius: 1.5rem;
		.page-title {    
      font-size: 2.29rem;
      font-weight: 400;
      text-align: center;
      margin: 1.38rem 0;
      color: #161616;
		}
		.input-wrapper {
			width: 100%;
			display: flex;
			align-content: center;
			align-items: center;
			padding: 0.95rem 0;
			border-bottom: 1px solid rgba(151, 151, 151, 0.23);
			font-size: 1.43rem;
			// font-family: PingFangSC-Regular, PingFang SC;
			color: rgba(22, 22, 22, 1);
      border-radius: 0.8rem;
      padding-left: 0.5rem;
			&::placeholder {
				color: rgba(198, 198, 198, 1);
			}
		}
		.input-wrapper1 {
			margin-top: 4.15rem;
			margin-bottom: 2.19rem;
		}
		.button-text {
			margin-top: 1.38rem;
			/* margin-bottom: 149rpx; */
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.14rem;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(111, 111, 111, 1);
			.forget-text {
			}
			.register-text {
				span {
					color: rgba(222, 55, 0, 1);
				}
			}
		}
	}
	.button-wrapper {
		padding: 0 1.43rem;
    display: flex;
    justify-content: space-between;
		.ds-button-large {
      width: 48%;
			height: 3.81rem;
			font-size: 1.33rem;
			background: rgba(230, 230, 230, 1);
			border-radius: .9rem;
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
}

.bottom-wrapper {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	align-items: stretch;
}
.auth-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 13rem;
}
.auth-title-wrapper {
	height: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 2rem;
}
.auth-title {
	color: #8f8e94;
	font-size: 0.7rem;
}
.auth-line {
	display: flex;
	flex: 1;
	height: 1px;
	background-color: #d8d8d8;
	margin-left: 0.8rem;
	margin-right: 0.8rem;
}
.auth-item {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.auth-item-icon {
	width: 3rem;
	height: 3rem;
	text-align: center;
	font-size: 3rem;
}
.wechat {
	color: #2db304;
}
.sina {
	color: #f01414;
}
.tencent {
	color: #26a2ff;
}
.auth-item-title {
	margin-top: 0.6rem;
}
.auth-bottom-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-left: 0.75rem;
	margin-right: 0.75rem;
	margin-bottom: 1rem;
}
</style>
