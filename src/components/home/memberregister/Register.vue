<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header class="common-header" title="注册"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="icon-back" @click="$router.go(-1)"><img src="../../../assets/image/icon2/icon-back.png" alt="" /></div>
		<!-- <div class="topList"> -->
		<div class="list">
			<div class="item" v-for="(item, index) in items" :key="index" v-on:click="onClickItem(index)">
				<label
					class="title"
					v-bind:class="{
						active: index === currentIndex,
						normal: index !== currentIndex
					}"
				>
					{{ getTitle(item) }}
				</label>
				<!-- <div class="line" v-if="isShowLine(index)"></div> -->
			</div>
		</div>
		<!-- </div> -->
		<mt-cell v-if="inviter" title="推荐人" :value="inviter.member_name"></mt-cell>
		<register-by-email v-if="currentIndex === 0" />
		<register-by-mobile v-else-if="currentIndex === 1" />
		<div class="go-login">
			<span @click="goLogin()">有账号去登录</span>
		</div>
		<div class="link-wrapper">
			<span class="left-text">点击注册表示同意</span>
			<span class="right-text" @click="onAgreement">《用户协议》</span>
		</div>
	</div>
</template>

<script>
import RegisterByMobile from './RegisterByMobile';
import RegisterByEmail from './RegisterByEmail';
import { mapState, mapMutations } from 'vuex';
import { getInviterInfo } from '../../../api/memberRegister';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'Register',
	components: {
		RegisterByMobile,
		RegisterByEmail
	},
	data() {
		return {
			inviter: false,
			currentIndex: 0,
			items: [
				{
					id: 1,
					title: '普通注册'
				},
				{
					id: 2,
					title: '手机注册'
				}
			]
		};
	},
	created: function() {
		resetRem();
		if (this.$route.query.inviter_id) {
			this.memberInviterId({ inviterId: this.$route.query.inviter_id });
		}
		if (this.inviter_id) {
			getInviterInfo(this.inviter_id).then(res => {
				this.inviter = res.result.member;
			});
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy: function() {
		resumeRem()
	},
	computed: {
		...mapState({
			inviter_id: state => state.member.inviterId
		}),
		isFirstTab() {
			if (this.currentIndex === 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		...mapMutations({
			memberInviterId: 'memberInviterId'
		}),
		goBack() {
			this.$router.go(-1);
		},
		getTitle(item) {
			return item ? item.title : '';
		},
		// isShowLine(index) {
		// 	return index === this.currentIndex;
		// },
		onClickItem(index) {
			if (this.currentIndex !== index) {
				this.currentIndex = index;
			}
		},
		goLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
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
	.icon-back {
		margin: 1.19rem 0 0 1.43rem;
		img {
			width: 1.9rem;
			height: 1.9rem;
		}
	}
}

.list {
	margin-top: 4.29rem;
	margin-left: 1.43rem;
	display: flex;
	// flex-direction: row;
	// justify-content: flex-start;
	// align-content: center;
	align-items: flex-end;
}
.item {
	font-size: 1.71rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(111, 111, 111, 1);
}
.title {
	&:nth-child(1) {
		margin-right: 1.9rem;
	}
}
.active {
	// color: $primaryColor;
	color: rgba(22, 22, 22, 1);
	font-size: 2.29rem;
}
.normal {
	color: rgba(111, 111, 111, 1);
	font-size: 1.71rem;
}
.link-wrapper {
	width: 100%;
	// position: absolute;
	// bottom: 8.95rem;
	margin-top: 5rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	span {
		font-size: 0.9rem;
	}
	.left-text {
		color: rgba(111, 111, 111, 1);
	}
	.right-text {
		color: rgba(22, 22, 22, 1);
	}
}
.go-login {
		text-align: center;
		margin-top: 2.85rem;
		font-size:1.33rem;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(232,75,77,1);
	}
</style>
