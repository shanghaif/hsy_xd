<template>
	<div class="container goods_consult hsy_main">
		<head-title title="咨询商家"></head-title>

		<div class="body">
			<!-- 咨询类型 -->
			<p class="name">咨询类型</p>
			<div class="type">
				<p v-for="(item, index) in type_options" :key="index" :class="{ active: type_id == item.value }" @click="fun_changeType(item.value)">{{ item.label }}</p>
			</div>

			<!-- 咨询内容 -->
			<p class="name">咨询内容</p>
			<div class="type">
				<textarea v-model="content" placeholder="请输入内容" maxlength="150" class="text_area"></textarea>
				<span class="text_length">{{ content.length }}/150</span>
			</div>

			<!-- 验证码 -->
			<p class="name">验证码</p>
			<div class="type">
				<div @click="changePictureCode" v-html="pictureCodeUrl"></div>
				<input v-model="pictureCode" placeholder="输入验证码" type="number" oninput="if(value.length>4)value=value.slice(0,4)" />
			</div>

			<mt-button class="hsy_btn hsy_d" v-on:click="submit">发送</mt-button>
		</div>

		<!-- <div class="consult-form mb-5">
        <div @click="typeVisible=true">
            <mt-cell title="咨询类型" :value="type_name" is-link />
        </div>
        <mt-field label="咨询内容" v-model="content" type="textarea"></mt-field>

        <mt-field label="验证码" v-model="pictureCode" type="number" :attr="{ oninput: 'if(value.length>4)value=value.slice(0,4)' }" >
            <img @click="changePictureCode" height="48" :src="pictureCodeUrl" class="countdown" >
            <div  @click="changePictureCode" v-html="pictureCodeUrl"></div>
        </mt-field>
        <mt-button class="ds-button-large" type="primary" v-on:click="submit">保存</mt-button>
    </div> -->
		<!-- <mt-popup v-model="typeVisible" position="right" class="common-popup-wrapper">
        <div class="common-header-wrap">
            <mt-header title="咨询类型" class="common-header">
                <mt-button slot="left" icon="back" @click="typeVisible=false"></mt-button>
            </mt-header>
        </div>
        <div class="common-popup-content">
            <mt-radio
                    v-model="type_id"
                    :options="type_options">
            </mt-radio>
        </div>
    </mt-popup> -->
		<!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div  v-if="consult_list && consult_list.length">
            <div class="consult-item"  v-for="(item, index) in consult_list">
                <div class="consult-info">

                    <div class="p-info">
                        <div class="explain">{{consultType[item.consulttype_id].consulttype_name}}<span class="right">{{ $moment.unix(item.consult_addtime).format('YYYY年MM月DD日') }}</span></div>
                        <div class="name">{{item.consult_content}}</div>
                        <div class="replay" v-if="item.consult_reply">{{item.consult_reply}}</div>
                    </div>
                </div>
            </div>
        </div>
        <empty-record v-else-if="consult_list && !consult_list.length"></empty-record>
    </div> -->
	</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { Toast, Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import EmptyRecord from '../../../components/EmptyRecord';
import { getGoodsConsult, addGoodsConsult } from '../../../api/homegoodsdetail';
import { checkPictureCaptchaChange } from '../../../api/common';
import $ from 'jquery';

import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle';

export default {
	name: 'HomeGoodsConsult',
	data() {
		return {
			goods_id: this.$route.query.goods_id,
			pictureCode: '',
			pictureCodeUrl: '', //验证码
			pictureCodeValue: null, //验证码值
			content: '',
			type_name: '',
			typeVisible: false,

			type_id: '',
			type_options: [],

			params: { page: 0, per_page: 10 },
			consult_list: false,
			pictureCodeValid: false,
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多

			Timer: null,
			ajaxTime: null
		};
	},
	components: {
		EmptyRecord,
		'head-title': HeadTitle
	},
	computed: {
		...mapState({
			token: state => state.member.token,
			consultType: state => state.goodsdetail.consultType
		})
	},

	mounted() {
		// this.changePictureCode();

		checkPictureCaptchaChange()
			.then(res => {
				this.pictureCodeUrl = res.result.h;
				this.pictureCodeValue = res.result.s;
			})
			.catch(err => {
				Toast(err.message);
			});
		this.ajaxTime = new Date().getTime();
		resetRem();
	},

	beforeDestroy() {
		resumeRem();
	},

	created() {
		if (!this.goods_id) {
			Toast('参数错误');
			this.$router.go(-1);
		}
		let temp = this.consultType;
		for (var i in temp) {
			if (!this.type_id) {
				this.type_id = temp[i].consulttype_id + '';
			}
			this.type_options.push({
				label: temp[i].consulttype_name,
				value: temp[i].consulttype_id + ''
			});
		}
	},
	watch: {
		pictureCode: function(val) {
			this.pictureCodeWait = true;
			if (val.length >= 4) {
				if (val == this.pictureCodeValue) {
					this.pictureCodeWait = false;
					this.pictureCodeValid = true;
				} else {
					this.pictureCodeWait = false;
					this.pictureCodeValid = false;
					Toast('验证码错误');
				}
			}
		},
		type_id: function(type_id) {
			this.type_name = this.consultType[type_id].consulttype_name;
			this.typeVisible = false;
		}
	},
	methods: {
		// 切换类型
		fun_changeType(v) {
			this.type_id = v;
		},

		submit() {
			if (!this.token) {
				Toast('请先去登录');
				return false;
			}
			if (!this.pictureCode) {
				Toast('请先输入图片验证码');
				return;
			}
			if (!this.content) {
				Toast('请先输入咨询内容');
				return;
			}
			if (!this.pictureCodeValid) {
				Toast('验证码错误');
				return;
			}
			addGoodsConsult(this.goods_id, this.type_id, this.content, this.token)
				.then(res => {
					Toast('发送成功');
					this.content = '';
					this.pictureCode = '';
					this.params = { page: 0, per_page: 10 };
					this.consult_list = false;
					this.loading = false;
					this.isMore = true;
					this.loadMore();
					this.changePictureCode();
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		changePictureCode() {
			Indicator.open();
			Indicator.close();
			var time = new Date().getTime();
			if (time - this.ajaxTime > 680) {
				checkPictureCaptchaChange()
					.then(res => {
						this.pictureCodeUrl = res.result.h;
						this.pictureCodeValue = res.result.s;
					})
					.catch(err => {
						Toast(err.message);
					});
				this.ajaxTime = time;
				time = null;
			}
		},

		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getConsultList(true);
			}
		},

		getConsultList() {
			Indicator.open();

			getGoodsConsult(this.params, this.goods_id)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.consult_list;
					if (temp) {
						if (!this.consult_list) {
							this.consult_list = temp;
						} else {
							this.consult_list = this.consult_list.concat(temp);
						}
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.consult-item {
	background: #fff;
	border-bottom: 1px solid #e1e1e1;
}
.consult-info {
	padding: 0.5rem;
	display: flex;
}
.consult-info .p-info {
	flex: 1;
	margin-left: 1rem;
}
.consult-info .p-info .name {
	font-size: 0.7rem;
}
.consult-info .p-info .explain {
	font-size: 0.7rem;
	color: $primaryColor;
	margin-bottom: 0.5rem;
}
.consult-info .p-info .explain .right {
	float: right;
	color: gray;
}
.consult-info .p-info .replay {
	border-top: 1px dashed #e1e1e1;
	font-size: 0.8rem;
	margin-top: 0.5rem;
	padding-top: 0.5rem;
	color: green;
}
.goods_consult {
	.body {
		padding: 0 1.43rem;

		.hsy_d {
			display: block;
		}

		.name {
			font-size: 1.33rem;
			color: #161616;
			font-weight: 600;
			margin-top: 1rem;
		}
		.type {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			position: relative;
			padding-top: 1rem;

			.text_length {
				position: absolute;
				right: 1rem;
				bottom: 0.4rem;
				color: #888;
			}
			p {
				font-size: 1.24rem;
				background: #ffe5e5;
				border-radius: 22.5px;
				color: #6f6f6f;
				background: #f4f5f7;
				width: fit-content;
				padding: 0.4rem 1.4rem;
				text-align: center;
				margin-bottom: 0;
				margin-bottom: 1.4rem;
				margin-right: 0.6rem;
				box-sizing: border-box;
				border: 1px solid transparent;
			}
			textarea {
				padding: 1rem;
				width: 100%;
				min-height: 15rem;
				color: #6f6f6f;
				resize: none;
				background: #f4f5f7;
				border-radius: 16px;
				font-size: 1.33rem;
				line-height: 1.4;
			}
			.active {
				color: #e63116;
				border: 1px solid #e5371b;
				background: #ffe5e5;
			}

			input {
				width: 4rem;
				font-size: 29px;
				background: #f4f5f7;
				color: #6f6f6f;
				margin-left: 1rem;
				padding-left: 1.4rem;
				width: 8rem;
				line-height: 1;
				border-radius: 4px;
				&::-webkit-input-placeholder {
					font-size: 1.3rem;
				}
			}
		}
	}
}
</style>
