<template>
	<div class="addressform hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header :title="getTitle" class="common-header">
				<mt-button slot="left" icon="back" @click="goBack"></mt-button>
			</mt-header>
		</div> -->
		<head-title :title="getTitle"></head-title>
		<mt-field label="收货人：" placeholder="请输入收货人名称" v-model="address_info.address_realname"></mt-field>
		<mt-field label="手机号码：" placeholder="请输入手机号码" v-model="address_info.address_mob_phone"></mt-field>
		<div @click="onRegion">
			<mt-cell title="所在地区：">
				<span class="color_start" :class="{ color_end: address_info.area_info == '请选择地区' }">{{ address_info.area_info }}</span>
				<span class="iconfont right-arrow abs_right">&#xe600;</span>
			</mt-cell>
		</div>
		<!-- <el-select  v-if="mclass>2"  v-model="value"  placeholder="B团选择" @change="bsel">
    <el-option
     v-for="item in b"
   :label="item.b_name"
     :value="item.b_name">
<span style="float: left">{{ item.b_name}}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.b_addr }}</span>
    </el-option>
   </el-select> -->
		<mt-cell v-if="mclass < 3" title="团购地址：">
			<el-select v-model="cvalue" placeholder="若为团购地址，请点击我">
				<el-option v-for="item in tuanList" :label="item.tuan" :value="item.tuan" :key="item.member_areainfo">
					<span style="float: left">{{ item.tuan }}</span>
					<span style="float: right; color: #8492a6; font-size: 13px">{{ item.member_areainfo }}</span>
				</el-option>
			</el-select>
		</mt-cell>
		<!-- <mt-cell title="选择地址类型"> -->
		<!-- <mt-radio
        v-if="mclass<3" 
        class="aredType"
          title="请选择地址类型"
          v-model="lcValue"
          :options="[{label: '以零售地址为准',value: 'l' },{label: '以团购地址为准',value: 'c' }]">
        </mt-radio> -->
		<!-- </mt-cell> -->

		<!-- <mt-field label="详细地址：" v-model="address_info.address_detail">
      <textarea></textarea>
    </mt-field> -->

		<a class="mint-cell mint-field">
			<div class="mint-cell-wrapper end_type">
				<div class="mint-cell-title"><span class="mint-cell-text">详细地址：</span></div>
				<div class="mint-cell-value top">
					<textarea class="text_area" v-model="address_info.address_detail" rows="4" placeholder="请输入详细地址" maxlength="100"></textarea>
				</div>
			</div>
		</a>
		<!--<mt-cell class="input-wrap" title="地址"><input type="text" v-model="address_info.address_detail"><i class="iconfont" @click="popMap=true;getPosition()">&#xe6d3;</i></mt-cell>-->
		<mt-cell class="space_between" title="默认地址："><mt-switch v-model="address_info.address_is_default"></mt-switch></mt-cell>

		<mt-button class="hsy_btn hsy_f" v-on:click="submit">{{ getSumitTitle }}</mt-button>

		<region-picker ref="picker" :valm="address_info.area_id" v-on:onConfirm="onPickerConfirm"></region-picker>

		<!--&lt;!&ndash;地图选点&ndash;&gt;-->
		<!--<mt-popup v-model="popMap" position="right" class="common-popup-wrapper">-->
		<!--<div class="common-header-wrap">-->
		<!--<mt-header title="定位" class="common-header">-->
		<!--<mt-button slot="left" icon="back" @click="popMap=false"></mt-button>-->
		<!--</mt-header>-->
		<!--</div>-->
		<!--<div class="common-popup-content">-->
		<!--<map-select ref="map_select" :longitude="address_info.address_longitude" :latitude="address_info.address_latitude" @setPosition="setPosition"></map-select>-->
		<!--</div>-->
		<!--</mt-popup>-->
	</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';

import { mapState, mapMutations } from 'vuex';
import { getPointByAddress } from '../../../util/bmap';
import { Toast, Indicator } from 'mint-ui';
import RegionPicker from '../../../components/RegionPicker2';
import MapSelect from '../../../components/MapSelect';
import { getAddressInfo, getTuanList, addAddress, editAddress } from '../../../api/memberAddress';
import { tuanlist } from '../../../api/homesearch';
export default {
	components: {
		RegionPicker,
		HeadTitle
		// MapSelect
	},
	computed: {
		...mapState({
			mclass: state => state.member.mclass,
			token: state => state.member.token
		}),
		isAddMode() {
			let mode = this.$route.query.action;
			// add: 添加地址，edit: 编辑地址
			if (mode === 'add') {
				return true;
			} else {
				return false;
			}
		},
		getTitle() {
			if (this.isAddMode) {
				return '新增地址';
			} else {
				return '修改收货地址';
			}
		},
		getSumitTitle() {
			let isFromCheckout = this.$route.query.isFromCheckout;
			if (isFromCheckout) {
				return '保存并使用';
			} else {
				return '保存';
			}
		}
	},
	data() {
		return {
			pathName: null,
			popMap: false,
			address_id: 0,
			address_info: {
				address_realname: '',
				address_mob_phone: '',
				address_detail: '',
				address_is_default: true,
				area_info: '请选择地区',
				city_id: 0,
				area_id: 0,
				address_longitude: 0,
				address_latitude: 0
			},
			cvalue: null, //团购地址
			tuanList: [
				// {
				//   member_areaid: null,
				//   member_areainfo: null,
				//   member_id: null,
				//   tuan: "",
				// }
			] //团购列表
			// lcValue:'l',//团购 零售
			// laddress_details:'',//零售详细地址
			// caddress_details:'',//团购详细地址
		};
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			// console.log(from.name);
			vm.pathName = from.name;
		});
	},

	mounted() {
		resetRem();
	},

	beforeDestroy() {
		resumeRem();
	},
	// watch:{
	// lcValue(v){
	//   console.log(v);
	//   this.address_info.address_detail = this.caddress_details
	//   if(v == "l"){
	//     console.log();
	//     this.address_info.address_detail = this.laddress_details;
	//   }
	// }
	// },
	created: function() {
		if (!this.isAddMode) {
			this.address_id = this.$route.query.address_id;
			getAddressInfo(this.address_id)
				.then(res => {
					this.address_info.address_realname = res.result.address_info.address_realname;
					this.address_info.address_mob_phone = res.result.address_info.address_mob_phone;
					this.address_info.address_detail = res.result.address_info.address_detail;

					this.address_info.area_info = res.result.address_info.area_info;
					this.address_info.city_id = res.result.address_info.city_id;
					this.address_info.area_id = res.result.address_info.area_id;
					this.address_info.address_longitude = res.result.address_info.address_longitude;
					this.address_info.address_latitude = res.result.address_info.address_latitude;

					if (res.result.address_info.tuan) {
						//如果有团购地址
						this.cvalue = res.result.address_info.tuan;
					}
					if (this.mclass < 3) {
						tuanlist(this.address_info.area_id, this.token).then(res => {
							this.tuanList = res.result;
						});
					}
					if (res.result.address_info.address_is_default === '1') {
						this.address_info.address_is_default = true;
						this.memberSaveArea_id([this.address_info.area_id, this.address_info.address_detail]);
					} else {
						this.address_info.address_is_default = false;
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
		// getTuanList().then(res => {
		//   this.b=res.result.b
		//   this.c=res.result.c;
		// })
		this.address_info.mclass = this.mclass;
	},
	methods: {
		fun_left() {
			if (this.pathName == 'MemberBuyStep1') {
				this.$router.go(-2);
			} else {
				this.$router.go(-1);
			}
		},
		// bsel(s){
		// if(s!="")
		// this.address_info.address_detail="B团:"+s
		// else
		// this.address_info.address_detail=""
		// },
		// csel(s){
		//   if(s!="")
		//   {
		//     this.address_info.address_detail="团购:"+s
		//     this.caddress_details = "团购:"+s;
		//     this.lcValue = "c";
		//   }else{
		//     this.address_info.address_detail = "";
		//     this.lcValue = "l";
		//   }
		// },
		...mapMutations({
			memberSaveArea_id: 'memberSaveArea_id',
			memberEditMclass: 'memberEditMclass'
		}),
		goBack() {
			this.$router.go(-1);
		},
		// getPosition () {
		//   getPointByAddress(this.address_info.area_info + this.address_info.address_detail).then(res => {
		//     if (res.result.location) {
		//       this.address_info.address_longitude = res.result.location.lng
		//       this.address_info.address_latitude = res.result.location.lat
		//     }
		//   }).catch(function (error) {
		//     Toast(error.message)
		//   })
		// },
		// setPosition (lat, lng, name) {
		//   this.popMap = false
		//   this.address_info.address_detail = name
		//   this.address_info.address_longitude = lng
		//   this.address_info.address_latitude = lat
		// },
		submit() {
			if (this.address_info.address_realname === '') {
				Toast('请填写收件人姓名');
				return;
			}
			if (this.address_info.address_realname.length === 0) {
				Toast('请填写收件人姓名');
				return;
			}
			if (this.address_info.address_realname.length < 2 || this.address_info.address_realname.length > 15) {
				Toast('2-15个字符限制');
				return;
			}
			if (this.address_info.address_mob_phone === '') {
				Toast('请填写手机号码');
				return;
			}
			if (this.address_info.address_mob_phone.length === 0) {
				Toast('请填写手机号码');
				return;
			}
			if (!this.utils.checkIsTel(this.address_info.address_mob_phone)) {
				Toast('请检查联系手机格式');
				return;
			}
			if (this.address_info.area_id === 0 || this.address_info.area_id === undefined) {
				Toast('请选择所在地区');
				return;
			}
			// if (this.address_info.address_detail === '') {
			//   Toast('请填写详细地址')
			//   return
			// }
			// if (this.address_info.address_detail.length === 0) {
			//   Toast('请填写详细地址')
			// }
			if (this.address_info.address_longitude === 0 || this.address_info.address_latitude === 0) {
				// Toast('请在地图选址')
			}
			// if(this.lcValue == "c"){
			this.address_info.tuan = this.cvalue;
			// return false;
			// 如果是普通会员
			if (this.isAddMode) {
				Indicator.open();
				addAddress(this.address_info).then(
					response => {
						Indicator.close();
						this.updateSelectedAddress();
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			} else {
				Indicator.open();
				editAddress(this.address_info, this.address_id).then(
					response => {
						Indicator.close();
						this.updateSelectedAddress();
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			}
		},
		onRegion(picker, values) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			this.address_info.area_info = this.getRegionStr(values);

			this.address_info.area_id = values[2].area_id;
			this.address_info.city_id = values[1].area_id;
			// this.cvalue = null;
			// console.log(values);
			tuanlist(values[2].area_id, this.token).then(res => {
				this.tuanList = res.result;
				// 团购地址更改
				this.cvalue = null;
				this.address_info.tuan = null;
			});
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
		updateSelectedAddress() {
			let isFromCheckout = this.$route.query.isFromCheckout;
			let goBackLevel = this.$route.query.goBackLevel ? this.$route.query.goBackLevel : -1;
			if (isFromCheckout) {
				// console.log("多");
				this.$router.go(goBackLevel);
			} else {
				// console.log("少");
				this.goBack();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.right-arrow {
	transform: rotate(-90deg);
	color: #ddd;
	font-size: 0.6rem;
	display: inline-block;
}
.input-wrap {
	position: relative;
	i {
		position: absolute;
		right: 0;
		top: 0;
		line-height: 2.4rem;
		display: block;
		width: 2rem;
		text-align: center;
		font-size: 1rem;
	}
}
.addressform {
	& /deep/.mint-cell {
		min-height: 48px;
		&:after {
			content: '';
			position: absolute;
			z-index: 1;
			pointer-events: none;
			background-color: #efefef;
			height: 1px;
			// right: 0 !important;
			left: 4% !important;
			width: 96%;
		}

		.mint-cell-wrapper {
			padding: 0rem 1.43rem;
			font-size: 1.18rem;
			color: #161616;

			.abs_right {
				position: absolute;
				right: 1.43rem;
			}

			.mint-field-core {
				text-align: left;
			}

			.mint-cell-title {
				flex: unset;
				width: 7rem;
				width: auto !important;

				.mint-cell-text {
					vertical-align: revert;
				}
			}

			.mint-cell-value {
				width: auto !important;
				justify-content: flex-end;
				align-items: center;
				padding-left: 1rem;
			}
		}

		input::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #c6c6c6;
		}

		select {
			direction: rtl;
		}
		.ui-form-input {
			color: #6f6f6f;
			text-align: right;
		}
		.ab_right {
			padding-right: 1rem;
			&::-webkit-input-placeholder {
				/* WebKit browsers 适配谷歌 */
				color: #c6c6c6;
			}
		}
	}
	/deep/.el-input__inner {
		height: 35px;
		line-height: 35px;
		.el-input__icon {
			line-height: 35px;
		}
	}
	.space_between {
		&/deep/.mint-cell-wrapper {
			justify-content: space-between;
		}
	}
	.end_type {
		align-items: baseline;
		.text_area {
			outline: none;
			font-size: 0.4rem;
			line-height: 0.48rem;
			line-height: 4.8vw;
			color: #333;
			border: none;
			-webkit-flex: 1;
			flex: 1;
			padding-right: 0.4rem;
			padding-right: 4vw;
			padding-left: 0;
			-webkit-tap-highlight-color: transparent;
			resize: none;
			color: #6f6f6f;

			font-family: Arial;
			font-size: 1.18rem;
		}
		textarea::-webkit-input-placeholder {
			color: #c6c6c6;
		}
	}

	.color_start {
		color: #6f6f6f;
	}

	.color_end {
		color: #c6c6c6;
	}

	.top {
		padding-top: 1rem;
	}
	.aredType {
		& /deep/ .mint-cell-title {
			width: 200px;
		}
	}
}
</style>
