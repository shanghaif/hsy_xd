<template>
	<div class="member-information hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header title="个人信息" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<head-title title="个人信息"></head-title>
		<!-- <div class="user-avatar iconfont icon-xiangji" ref="upload_btn" @change="uploadAvatar($event)">
			<img :src="user.member_avatar" />
			<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
		</div> -->
		<div class="user-avatar">
			<span>头像</span>
			<div @change="uploadAvatar($event)" ref="upload_btn">
				<img :src="user.member_avatar" />
				<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
			</div>
			<img src="@/assets/image/icon2/icon-right.png" alt="" />
		</div>
		<div class="form">
			<div @click="onRegion('member_info.member_areainfo')" class="qy">
				<mt-cell title="选择区域">
					{{ member_info.member_areainfo }}
					<img src="@/assets/image/icon2/icon-right.png" alt="" />
				</mt-cell>
			</div>
			<mt-field class="menu-item" label="昵称" v-model="member_info.member_nickname" />
			<mt-field class="menu-item" label="QQ" v-model="member_info.member_qq" />
			<mt-field class="menu-item" label="旺旺" v-model="member_info.member_ww" />
			<div @click="onTime">
				<mt-cell class="menu-item" title="出生日期"><input type="text" style="padding: 0;" readonly="true" :value="member_info.member_birthday"><img src="@/assets/image/icon2/icon-right.png" alt="" /></mt-cell>
			</div><!-- {{member_info.member_birthday}} -->
			<mt-button class="hsy_f hsy_btn" @click="submitInformation">保存</mt-button>
		</div>
		<mt-datetime-picker
			ref="timePicker"
			type="date"
			:startDate="new Date('1900/1/1')"
			:endDate="new Date()"
			:value="member_info.member_birthday ? new Date(member_info.member_birthday) : new Date('1990/1/1')"
			@confirm="timeConfirm"
		></mt-datetime-picker>
		<region-picker :valm="user.member_areaid" ref="picker" @onConfirm="onPickerConfirm"></region-picker>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import { mapState, mapMutations } from 'vuex';
import { uploadMemberAvatar, updateMemberInfo } from '../../../api/member';
import RegionPicker from '../../RegionPicker';
import HeadTitle from '../../HeadTitle';
export default {
	components: {
		RegionPicker,
		HeadTitle
	},
	name: 'MemberProfileSet',
	data() {
		return {
			member_info: {
				member_nickname: '',
				member_qq: '',
				member_ww: '',
				member_birthday: '',
				member_areainfo: '',
				member_areaid: ''
			}
		};
	},
	mounted() {
		resetRem();
	},
	computed: {
		...mapState({
			user: state => state.member.info
		})
	},
	created: function() {
		if (this.user) {
			this.member_info.member_nickname = this.user.member_nickname;
			this.member_info.member_qq = this.user.member_qq;
			this.member_info.member_ww = this.user.member_ww;
			this.member_info.member_birthday = this.user.member_birthday;
			this.member_info.member_areainfo = this.user.member_areainfo;
			this.member_info.member_areaid = this.user.member_areaid;
		}
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapMutations({
			memberEdit: 'memberEdit'
		}),
		onRegion(name) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			this.member_info.member_areainfo = this.getRegionStr(values);
			this.member_info.member_areaid = values[values.length - 1].area_id;
			this.$forceUpdate();
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
		timeConfirm(value) {
			this.member_info.member_birthday = value.getFullYear() + '/' + (value.getMonth() + 1) + '/' + value.getDate();
		},
		onTime(picker, values) {
			this.$refs.timePicker.open();
		},
		submitInformation() {
			updateMemberInfo(this.member_info)
				.then(res => {
					this.memberEdit(this.member_info);
					Toast(res.message);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		uploadAvatar(event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
				Toast('上传图片不得大于200k,请重新选择图片');
				return false;
			}

			formdata.append('memberavatar', event.target.files[0]);

			uploadMemberAvatar(formdata)
				.then(res => {
					this.user.avatar = res.result + '?' + Math.floor(Math.random() * 100);
					this.memberEdit({ member_avatar: this.user.avatar });
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
	background: #fff;
	/deep/.mint-cell {
		&::after {
			right: 0;
			width: 96%;
			left: 4%;
		}
		.mint-cell-wrapper {
			font-size: 1.33rem;
			font-weight: 400;
			color: #161616;
			padding: 0 1.43rem;
			.mint-cell-value {
				input {
					text-align: right;
					padding-right: 0.86rem;
					font-size: 1.33rem;
					font-weight: 400;
					color: #6f6f6f;
				}
				img {
					width: 0.95rem;
					height: 0.95rem;
					margin-left: 0.86rem;
				}
			}
		}
	}
	.mint-popup-bottom {
		height: 23rem;
		/deep/.toolbar {
			height: 3rem;
			.picker-header {
				line-height: 3rem;
			}
			.toolbar-item {
				font-size: 1.1rem;
			}
		}
		.picker-items {
			width: 100%;
		}
	}

	.user-avatar {
		position: relative;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 0.76rem;
		padding: 1.62rem 1.43rem;
		// width: 5rem;
		// height: 5rem;
		// margin: 2rem auto;
		// text-align: center;
		span {
			font-size: 1.33rem;
			font-weight: 400;
			color: #161616;
		}
		img {
			width: 0.95rem;
			height: 0.95rem;
		}
		div {
			margin-right: 0.86rem;
			margin-left: auto;
			width: 4.19rem;
			height: 4.19rem;
			border-radius: 50%;
			overflow: hidden;
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
		}
	}
	.user-avatar::before {
		content: '';
		width: 96%;
		position: absolute;
		right: 0;
		bottom: 0;
		height: 0.1rem;
		background-color: #efefef;
	}

	.menu-item {
		// border-top: 1px solid #eee;
	}
}
.ds-button-large {
	width: 96%;
	margin: 1rem 2% 0 2%;
}
</style>
