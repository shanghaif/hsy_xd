<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header title="签到送积分" class="common-header"><mt-button slot="left" icon="back" @click="goBack"></mt-button></mt-header>
		</div> -->
		<div class="point-signin-header">
			<div class="header-wrap">
				<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
				<span class="header-title">签到</span>
				<span></span>
			</div>
			<div class="btn-wrapper" :class="{ active: !if_signin }">
				<div class="btn">
					<div v-if="if_signin"><div class="title">已签到</div></div>
					<div v-else @click="goSign">签到</div>
				</div>
			</div>
		</div>
		<div class="calendar-wrapper" v-if="day_list">
			<div class="calendar-month">
				<i class="iconfont" @click="goSearch(0)">&#xe64f;</i>
				<span>{{ $moment(search_day).format('YYYY年MM月') }}</span>
				<i class="iconfont" @click="goSearch(1)">&#xe650;</i>
			</div>
			<div class="calendar-title">
				<div class="item"><span>日</span></div>
				<div class="item"><span>一</span></div>
				<div class="item"><span>二</span></div>
				<div class="item"><span>三</span></div>
				<div class="item"><span>四</span></div>
				<div class="item"><span>五</span></div>
				<div class="item"><span>六</span></div>
			</div>
			<div class="calendar-content">
				<div class="item" v-for="n in day_list[0].week" :key="'t' + n"></div>
				<div class="item" v-for="(item, index) in day_list" :key="'c' + index">
					<!-- :class="{ active: item.state, 'pre-active': item.day == $moment().format('YYYY-MM-DD') && !item.state }" -->
					<span>{{ item.num }}</span>
					<img v-if="item.state" src="@/assets/image/icon2/icon-select.png" alt="" />
				</div>
			</div>
		</div>
		<div class="bottom-info">
			<div class="notice">连续签到{{ config.points_signin_cycle }}天为一周期，每周期可获得{{ config.points_signin_reward }}积分额外奖励，每过一个周期连续签到天数清0</div>
			<div class="content" v-if="user.member_signin_days_cycle">已连续签到{{ user.member_signin_days_cycle }}天</div>
			<div class="content" v-else>进入新周期</div>
			<div class="scale">
				<span>1天</span>
				<div>
					<!-- {{(user.member_signin_days_cycle/7*100)+'%'}} -->
					<p :style="{width: (user.member_signin_days_cycle)/7*100+'%'}"></p>
					<span></span>
				</div>
				<span>7天</span>
			</div>
			<div style="text-align: right;padding-right: 2.28rem;">
				<div class="reward">
					<img :src="user.member_signin_days_cycle==7?require(`@/assets/image/icon2/icon-reward-red.png`):require(`@/assets/image/icon2/icon-reward.png`)" alt="" >
					<p>7积分</p>
				</div>
			</div>
		</div>
		<!-- 签到弹窗 -->
		<!-- v-show="showPopup" -->
		<div class="point-popup" v-show="showPopup">
			<p>签到成功</p>
			<p>{{jifen}}</p>
			<span @click="closePopup">确认</span>
		</div>
		<div class="mengban" v-show="showPopup"></div>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
// import HeadTitle from '../../HeadTitle';
import { mapState, mapMutations, mapActions } from 'vuex';
import { getPointSignin, addPointSignin } from '../../../api/memberPoint';
import { getMemberInfo } from '../../../api/member';
import { Toast, Indicator } from 'mint-ui';

export default {
	name: 'MemberPointSignin',

	data() {
		return {
			day_list: false,
			search_day: '',
			if_signin: false,
			pathName: '',
			showPopup:false,
			jifen:''
		};
	},
	components: {
		// HeadTitle
	},
	beforeRouteEnter(to, from, next) {
		// 在导航完成前获取数据
		next(vm => {
			vm.pathName = from.name;
		});
	},
	created() {
		this.getPointSignin();
		this.fetchConfig({}).then(
			response => {},
			error => {
				Toast(error.message);
			}
		);
		getMemberInfo().then(
			res => {
				this.memberUpdate({ info: res.result.member_info });
			},
			error => {}
		);
	},
	computed: {
		...mapState({
			user: state => state.member.info,
			config: state => state.config.config
		})
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapActions({
			fetchConfig: 'fetchConfig'
		}),
		...mapMutations({
			memberUpdate: 'memberUpdate',
			memberEdit: 'memberEdit'
		}),
		goSign() {
			addPointSignin()
				.then(res => {
					// console.log(res,'point res')
					// Toast(res.message);
					this.jifen = res.message
					this.memberEdit(res.result.member_signin_info);
					this.getPointSignin();
					this.if_signin = true;
					this.showPopup = true;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		goSearch(type) {
			if (type) {
				// 后一个月
				this.search_day = this.$moment(this.search_day)
					.add(1, 'months')
					.format('YYYY-MM-DD');
			} else {
				// 前一个月
				this.search_day = this.$moment(this.search_day)
					.subtract(1, 'months')
					.format('YYYY-MM-DD');
			}
			this.getPointSignin();
		},
		getPointSignin() {
			getPointSignin(this.search_day)
				.then(res => {
					Indicator.close();
					this.if_signin = res.result.if_signin;
					this.day_list = res.result.day_list;
					this.search_day = this.$moment.unix(res.result.time).format('YYYY-MM-DD');
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},

		goBack() {
			if (this.pathName != 'HomeMemberLogin') {
				this.$router.go(-1);
			} else {
				this.$router.push({ name: 'MemberIndex' });
			}
		},
		closePopup() {
			this.showPopup = false
		}
	}
};
</script>

<style scoped lang="scss">
	.container {
		background-color: #FEFDFD;
		padding-bottom: 10rem;
	}
.point-signin-header {
	// margin-bottom: 1rem;
	// background: $primaryColor;
	height: 22.57rem;
	background: url('../../../assets/image/icon2/icon-qiandao.png') center center/100% 100% no-repeat;
	// padding: 0.5rem;
	text-align: center;
	.header-wrap {
		// background-color: #fff;
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
			color: #fff;
		}
		.header-right {
			span {
				font-size: 1.3rem;
			}
		}
	}
	.btn-wrapper {
		height: 10.8rem;
		width: 10.8rem;
		padding: 0.71rem;
		margin: 0 auto;
		margin-top: 1.71rem;
		border-radius: 50%;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.11);
		// opacity: 0.21;
		// border: 0.3rem solid rgba(255, 255, 255, 0.5);
		overflow: hidden;
		&.active {
			.btn {
				> div {
					// background: $primaryColor;
					color: rgba(255, 255, 255, 0.8);
					line-height: 7.48rem;
					color: #e84934;
					font-weight: 600;
					font-size: 1.52rem;
				}
			}
		}
		.btn {
			// width: 9.28rem;
			// height: 9.28rem;
			width: 100%;
			height: 100%;
			padding: 0.95rem;

			background: rgba(255, 255, 255, 0.21);
			// opacity: 0.21;
			border-radius: 50%;
			box-sizing: border-box;
			> div {
				border-radius: 50%;
				// width: 7.47rem;
				// height: 7.47rem;
				width: 100%;
				height: 100%;
				line-height: 7.48rem;
				background-color: #fff;
				margin: 0 auto;
				// border: 1px solid $primaryColor;
				box-sizing: border-box;
				.title {
					font-size: 1.52rem;
					font-weight: 600;
					color: #e84934;
					// margin-top: 0.7rem;
				}
			}
		}
	}
}
.calendar-wrapper {
	background: #fff;
	// width: 90%;
	margin: 0 1.42rem;
	margin-top: -4rem;
	border-radius: 0.76rem;
	padding-bottom: 1.9rem;
	box-shadow: 0rem 0rem 1rem 0rem rgba(85, 38, 38, 0.06);
	.calendar-month {
		text-align: center;
		font-size: 1.23rem;
		// line-height: 2rem;
		// border-bottom: 1px solid #eee;
		// margin-bottom: 0.5rem;
		padding: 1.9rem 0;
		> span {
			margin: 0 1rem;
		}
		i {
			font-size: 1.23rem;
		}
	}
	.item {
		// float: left;
		display: inline-block;
		width: 14.28%;
		// height: 1.5rem;
		padding-top: 1.42rem;
		text-align: center;
		position: relative;
		font-size: 1.23rem;
		> span {
			height: 1rem;
			width: 1rem;
			line-height: 1rem;
			border-radius: 50%;
			display: block;
			margin: 0 auto;
		}
		> img {
			width: 0.95rem;
			height: 0.71rem;
			position: absolute;
		}
		&.pre-active {
			> span {
				border: 1px solid $primaryColor;
			}
		}
		&.active {
			> span {
				background: $primaryColor;
				color: #fff;
			}
		}
	}
	.calendar-content,
	.calendar-title {
		// overflow: hidden;
		padding: 0 0.5rem;
	}
}
.bottom-info {
	margin: 0 1.42rem;
	margin-top: 0.95rem;
	padding: 1.9rem 1.76rem;
	background: #FFFFFF;
	box-shadow: 0rem 0rem 1rem 0rem rgba(85, 38, 38, 0.06);
	border-radius: 0.76rem;
	.notice {
		text-align: center;
		font-size: 1.04rem;
		font-weight: 400;
		color: #6F6F6F;
	}
	.content {
		margin: 1.9rem 0;
		text-align: center;
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
	}
	.scale {
		display: flex;
		align-items: center;
		>span {
			font-size: 1.14rem;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #6F6F6F;
			flex-shrink: 0;
		}
		>div {
			margin: 0 1.42rem;
			flex-grow: 1;
			height: 0.57rem;
			// background: linear-gradient(89deg, #FF9494 0%, #FB3737 99%);
			background: #D8D8D8;
			border-radius: 0.45rem;
			position: relative;
			>p {
				position: absolute;
				height: 0.57rem;
				background: linear-gradient(89deg, #FF9494 0%, #FB3737 99%);
				
				border-radius: 0.45rem;
				&::after {
					position: absolute;
					content: '';
					width: 1.09rem;
					height: 1.09rem;
					border-radius: 50%;
					right: 0;
					background: #FFDBD5;
					box-shadow: 0rem 0rem 0.19rem 0rem rgba(90, 27, 27, 0.5);
					top: 50%;
					transform: translate(0,-50%);
				}
				&::before {
					position: absolute;
					content: '';
					width: 0.71rem;
					height: 0.71rem;
					background: #E63116;
					border-radius: 50%;
					right: 0.19rem;
					z-index: 1;
					transform: translate(0,-50%);
					top: 50%;
				}
			}
		}
	}
	.reward {
		display: inline-block;
		margin-left: auto;
		text-align: center;
		img {
			margin-top: 1.42rem;
			width: 1.9rem;
			height: 1.9rem;
		}
		p {
			margin-top: 0.19rem;
			font-size: 0.95rem;
			font-weight: 400;
			color: #6F6F6F;
		}
	}
}
.mengban {
	background-color: rgba(0, 0, 0, 0.3);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 2;
}
.point-popup {
	position: fixed;
	width: 25rem;
	height: 32rem;
	top: 23%;
	z-index: 3;
	left: 50%;
	box-sizing: border-box;
	text-align: center;
	transform: translate(-50%,0);
	background: url('../../../assets/image/icon2/icon-tip-popup.png') center center/100% 100% no-repeat;
	p {
		text-align: center;
		&:nth-child(1) {
			margin-top: 19.67rem;
			font-size: 1.72rem;
			font-weight: 600;
			color: #E84832;
		}
		&:nth-child(2) {
			margin-top: 1.43rem;
			font-size: 1.24rem;
			color: #6F6F6F;
		}
	}
	span {
		display: inline-block;
		margin-top: 1.77rem;
		width: 9.58rem;
		height: 2.86rem;
		background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
		border-radius: 1.67rem;
		line-height: 2.86rem;
		font-size: 1.34rem;
		color: #FFFFFF;
		text-align: center;
	}
}
</style>
