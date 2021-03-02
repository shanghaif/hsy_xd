<template>
	<div>
		<div class="member-auth hsy_main" v-show="cropDataShow">
			<!-- 头部 -->
			<head-title title="人员认证" :titleRight="titleRight" titleRightColor="#fc6952"></head-title>

			<!-- 主题内容 -->
			<div v-if="!popMap" class="cont">
				<!-- 姓名 身份证 -->
				<div class="name_card">
					<mt-field
						label="姓名"
						placeholder="请输入真实姓名"
						disableClear
						v-only-chinese
						:readonly="user.member_auth_state == 1 || user.member_auth_state == 3 || user.member_auth_state == 5"
						v-model="realname"
					></mt-field>
					<mt-field
						label="身份证"
						placeholder="请输入身份证号码"
						disableClear
						class="none"
						:readonly="user.member_auth_state == 1 || user.member_auth_state == 3 || user.member_auth_state == 3 || user.member_auth_state == 5"
						v-model="idcard"
					></mt-field>
				</div>

				<!-- 单位 -->
				<div class="name_card">
					<mt-field
						label="单位名称"
						placeholder="请输入单位名称"
						disableClear
						:readonly="user.member_auth_state == 1 || user.member_auth_state == 3"
						v-model="dwname"
					></mt-field>
					<!-- <div @click="popMap=true">
          <mt-field label="单位地址" placeholder="请选择" disableClear
            v-model="dlwz" readonly
            >
              <img v-show='hangye == 999' class="icon_right" src="@/assets/image/icon2/icon-black-left.png" />
          </mt-field>
        </div> -->

					<a class="mint-cell mint-field" @click="popMap = true">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title"><span class="mint-cell-text">单位地址</span></div>
							<div class="mint-cell-value">
								<img v-show="!dlwz" class="icon_right" src="@/assets/image/icon2/icon-black-left.png" />
								<input v-model="dlwz" placeholder="请选择" type="text" class="ui-form-input select_content" :class="{ ab_right: !dlwz, sel_color: !dlwz }" />
							</div>
						</div>
					</a>

					<a class="mint-cell mint-field">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title"><span class="mint-cell-text">所属行业</span></div>
							<div class="mint-cell-value">
								<img class="icon_right" src="@/assets/image/icon2/icon-black-left.png" />
								<select
									class="ui-form-input select_content ab_right"
									:disabled="user.member_auth_state == 1 || user.member_auth_state == 3"
									:class="{ sel_color: hangye == '999' }"
									v-model="hangye"
								>
									<option value="999">请选择</option>
									<option v-for="(prov, index) of hangyes" :key="index" :value="index">{{ prov }}</option>
								</select>
							</div>
						</div>
					</a>

					<a class="mint-cell mint-field">
						<div class="mint-cell-wrapper">
							<div class="mint-cell-title"><span class="mint-cell-text">所属岗位</span></div>
							<div class="mint-cell-value">
								<img class="icon_right" src="@/assets/image/icon2/icon-black-left.png" />
								<select
									:class="{ sel_color: gangwei == '999' }"
									class="ab_right ui-form-input select_content"
									:disabled="user.member_auth_state == 1 || user.member_auth_state == 3"
									v-model="gangwei"
								>
									<option value="999">请选择</option>
									<option v-for="(c, index) of gangweis[hangye]" :key="index" :value="c.id">{{ c.n }}</option>
								</select>
							</div>
						</div>
					</a>
					
					<mt-cell  class="mast_value mt-5" title="社区团信息">					
						<div class="way">
							<ul>
								<li @click='(user.member_auth_state != 1 && user.member_auth_state != 3)?myTuan = !myTuan:""'>
									<div>
										<img v-show="myTuan" src="@/assets/image/icon2/icon-select.png" alt="">
									</div>
									<!-- <span>社区团信息</span> -->
								</li>
							</ul>
						</div>
					</mt-cell>
					<div v-show="myTuan">
						<div class="tuan-select" @click="onRegion">
							<mt-cell title="社区所在地区：">
								<span class="color_start" :class="{ color_end: member_areainfo == '请选择地区' }">{{ member_areainfo }}</span>
								<img class="icon_right" src="@/assets/image/icon2/icon-black-left.png" />
							</mt-cell>
						</div>
						
						<mt-cell title="社区团名称:">
							<el-select							
								:disabled="user.member_auth_state == 1 || user.member_auth_state == 3"
								v-model="tuan" placeholder="请选择小区名称">
								<el-option v-for="item in tuanList" :label="item.community_name" :value="item.community_name+','+item.community_id" :key="item.member_areainfo">
									<span style="float: left">{{ item.community_name }}</span>
									<!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.member_areainfo }}</span> -->
								</el-option>
							</el-select>
						</mt-cell>

						<!-- <mt-field
							label="申请社区团名称"
							placeholder="请输入社区团名称"
							disableClear
							:readonly="user.member_auth_state == 1 || user.member_auth_state == 3"
							v-model="tuan"
						></mt-field> -->

						<mt-field
							label="团长开户名"
							placeholder="请输入开户名"
							disableClear
							v-only-chinese
							:readonly="user.member_auth_state == 1 || user.member_auth_state == 3"
							v-model="bank_account_name"
						></mt-field>

						<mt-field
							label="团长银行账号"
							placeholder="请输入银行账号"
							disableClear
							class="none"
							:readonly="user.member_auth_state == 1 || user.member_auth_state == 3"
							v-model="bank_account_number"
						></mt-field>
						
					</div>
				</div>

				<div class="idcard-wrapper">
					<div class="idcard-item">
						<div class="title">身份证正面照片</div>
						<div class="img">
							<div v-if="user.member_idcard_image1_url" class="user-avatar" :class="{ userNone: user.member_idcard_image1_url }">
								<img v-if="user.member_idcard_image1_url" @click="openImage(user.member_idcard_image1_url)" :src="user.member_idcard_image1_url" />
								<span
									v-if="user.member_auth_state != 1 && user.member_auth_state != 3 && user.member_auth_state != 5"
									@click="dropImage('member_idcard_image1')"
									class="del-btn iconfont"
								>
									&#xe619;
								</span>
							</div>
							<div
								v-else-if="user.member_auth_state == 0 || user.member_auth_state == 2"
								class="user-avatar"
								ref="upload_btn1"
								@change="uploadInformPic('member_idcard_image1', $event)"
							>
								<!-- <img src="../../../assets/image/member_idcard_image2.png"> -->
								<div class="icon_img">
									<img src="@/assets/image/icon2/camera.png" />
									<span>上传照片</span>
								</div>
								<input type="file" accept="image/*" />
							</div>
						</div>
					</div>

					<mt-button class="btn_new" @click="submitInformation(1)" v-if="user.member_auth_state != 1 && user.member_auth_state != 3 && user.member_auth_state != 5">
						保存
					</mt-button>
					<!-- <mt-button class="btn_new" @click="editsubmitInformation" v-if="user.member_auth_state ==1 || user.member_auth_state==3">编辑</mt-button> -->
					<mt-button class="btn_new" @click="submitInformation(2)" v-if="user.member_auth_state == 5">保存</mt-button>
				</div>
			</div>

			<!-- <div class="form" v-if="!popMap">
			<div class="ui-form-area">
				<div class="ui-form-control">
          <input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3||user.member_auth_state==5"
					 v-model="realname" placeholder="真实姓名" class="ui-form-input"></div>
			</div>
			<div class="ui-form-area">
				<div class="ui-form-control"><input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3||user.member_auth_state==3||user.member_auth_state==5"
					 v-model="idcard" placeholder="身份证号" class="ui-form-input"></div>
			</div>
			<div class="ui-form-area">
				<div class="ui-form-control"><input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3"
					 v-model="dwname" placeholder="单位名称" class="ui-form-input"></div>
			</div>
			<div class="ui-form-area" @click="popMap=true">
				<div class="ui-form-control"><input type="text" v-model="dlwz" readonly="true" placeholder="地理位置" class="ui-form-input"></div>
			</div>
			<div>
				<div class="ui-form-area">

					<div class="ui-form-control register-form-select">
						<select class="ui-form-input select_content" :disabled="user.member_auth_state==1||user.member_auth_state==3"
						 v-model='hangye'>
							<option value='999'>所属行业</option>
							<option v-for='(prov,index) of hangyes' :key='index' :value='index'>{{prov}}</option>
						</select>

					</div>
				</div>
				<div class="ui-form-area">

					<div class="ui-form-control register-form-select">
						<select class="ui-form-input select_content" :disabled="user.member_auth_state==1||user.member_auth_state==3"
						 v-model='gangwei'>
							<option value='999'>所属岗位</option>
							<option v-for='(c,index) of gangweis[hangye]' :key='index' :value='c.id'>{{c.n}}</option>
						</select>

					</div>
				</div>
				<div class="ui-form-area">
					<div class="ui-form-control"><input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3"
						 v-model="tuan" placeholder="申请社区团名称" class="ui-form-input"></div>
				</div>
				<div class="ui-form-area">
					<div class="ui-form-control">
						<input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3" v-model="bank_account_name"
						 placeholder="团长开户名" class="ui-form-input"></div>
				</div>
				<div class="ui-form-area">
					<div class="ui-form-control">
						<input type="text" :readonly="user.member_auth_state==1||user.member_auth_state==3" v-model="bank_account_number"
						 placeholder="团长银行账号" class="ui-form-input"></div>
				</div>
			</div>
			<div class="idcard-wrapper">
				<div class="idcard-item">
					<div class="img">
						<div v-if="user.member_idcard_image1_url" class="user-avatar">
							<img v-if="user.member_idcard_image1_url" @click="openImage(user.member_idcard_image1_url)" :src="user.member_idcard_image1_url">
							<span v-if="user.member_auth_state!=1 && user.member_auth_state!=3 && user.member_auth_state!=5" @click="dropImage('member_idcard_image1')"
							 class="del-btn iconfont">&#xe619;</span>
						</div>
						<div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji"
						 ref="upload_btn1" @change="uploadInformPic('member_idcard_image1',$event)">
							<img src="../../../assets/image/member_idcard_image2.png">
							<input type="file" accept="image/*">
						</div>
					</div>
					<div class="title">身份证正面照片</div>
				</div>
				<div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image2_url" class="user-avatar">
                        <img v-if="user.member_idcard_image2_url" @click="openImage(user.member_idcard_image2_url)" :src="user.member_idcard_image2_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image2')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image2',$event)">
                        <img src="../../../assets/image/member_idcard_image1.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">健康证</div>
            </div>
            <div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image3_url" class="user-avatar">
                        <img v-if="user.member_idcard_image3_url" @click="openImage(user.member_idcard_image3_url)" :src="user.member_idcard_image3_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image3')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image3',$event)">
                        <img src="../../../assets/image/member_idcard_image3.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">学习证</div>
            </div>
			</div>
			<mt-button class="ds-button-large mb-10" type="primary" @click="submitInformation(1)" v-if="user.member_auth_state!=1 && user.member_auth_state!=3 && user.member_auth_state!=5">保存</mt-button>
			<mt-button class="ds-button-large mb-10" type="primary" @click="editsubmitInformation" v-if="user.member_auth_state ==1 || user.member_auth_state==3">编辑</mt-button>
			<mt-button class="ds-button-large mb-10" type="primary" @click="submitInformation(2)" v-if="user.member_auth_state == 5">保存</mt-button>
		</div> -->

			<mt-popup v-model="isshow" popup-transition="popup-fade" class="popup"><img :src="showimage" :style="getBannerStyle" @click="isshow = false" /></mt-popup>

			<!-- 地图 长按 抓取位置 -->
			<div v-if="popMap" class="mmap ">
				<div class="head_title_cont">
					<div class="header-wrap">
						<img @click="popMap = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
						<span class="header-title">长按抓取位置</span>
					</div>
				</div>

				<div class="common-popup-content" :style="{ height: endHeight, top: 0 }">
					<baidu-map
						class="map"
						:center="{ lng: lng, lat: lat }"
						:zoom="15"
						:scroll-wheel-zoom="true"
						:auto-resize="true"
						:style="select"
						@longpress="getPoint"
						@click="getPoint"
					>
						<bm-control>
							<div class="ui-form-area">
								<div class="ui-form-control"><input v-model="keyword" type="text" placeholder="输入地名" class="ui-form-input  " /></div>
							</div>
						</bm-control>
						<bm-local-search :keyword="keyword" :auto-viewport="true" />
						<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getPoint"></bm-geolocation>

						<bm-marker :position="add.p">
							<bm-info-window :show="add.show" @close="pWindowClose" @open="pWindowOpen" style="font-size: 14px">
								<p>地址：{{ add.site }}</p>
							</bm-info-window>
						</bm-marker>
					</baidu-map>
				</div>
			</div>
		</div>

		<!-- 三级地址 -->
		<region-picker ref="picker" :valm='member_areaid' v-on:onConfirm="onPickerConfirm"></region-picker>
		<!-- 裁切图片 -->
		<crop-img ref="cropImg" :dataType="true" @haveCropImgData="fun_getCropImgData"></crop-img>
	</div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { uploadAuth, dropAuth, updateMemberAuth, uploadCropImg, getTuanList } from '../../../api/member';
import $ from 'jquery';
import RegionPicker from '../../../components/RegionPicker2';
import HeadTitle from '../../HeadTitle';
import CropImg from '../../CropImg';

import { resetRem, resumeRem } from '@/util/rem';
import { checkInviter } from '../../../api/memberInviter';

import '@/assets/style/hsy-mint.scss';

export default {
	components: {
		'head-title': HeadTitle,
		'crop-img': CropImg,	
		'region-picker': RegionPicker,
	},
	name: 'MemberProfileSet',
	data() {
		return {
			myTuan:false,    //  社区团
			member_areaid: null,            //  社区地址 id
			member_areainfo : '请选择地区',  // 社区团地址 
			tuanList:[],              // 社区团下拉列表
			tuan: '',                 // 社区团名称

			cropImgIndex: null, // 裁切的图片名称
			cropDataShow: true, // 切换 插件 隐藏 表单页面

			titleRight: null, //  是否有编辑
			endHeight: null, //地图高度
			keyword: '', //关键词
			popMap: false,
			select: {
				width: '100%',
				height: ''
			},
			lng: 115.579356,
			lat: 34.875037,
			dlwz: '',
			add: {
				show: false,
				p: {
					lng: 0,
					lat: 0
				},
				siteName: '',
				site: ''
			},
			if_confirm: false,
			showimage: '',
			isshow: false,
			realname: '',
			idcard: '',
			member_ww: '',
			hangye: '999',
			gangwei: '999',
			bank_account_name: null, // 银行开户名
			bank_account_number: null, //公司银行账号
			bank_name: null, //开户银行支行名称
			hangyes: ['执法监管', '食品生产', '食品流通', '餐饮服务', '水产品生产', '畜牧产品生产', '农业生产', '林业生产', '食源性疾病'],
			gangweis: [
				[
					{
						n: '食品安全监管人员',
						id: 1
					},
					{
						n: '农业执法监管人员',
						id: 11
					},
					{
						n: '林业执法监管人员',
						id: 13
					},
					{
						n: '水产品执法监管人员',
						id: 16
					},
					{
						n: '畜牧执法监管人员',
						id: 19
					}
				],
				[
					{
						n: '食品生产企业负责人',
						id: 2
					},
					{
						n: '食品生产企业安全管理员',
						id: 3
					},
					{
						n: '食品生产从业人员',
						id: 4
					}
				],
				[
					{
						n: '食品流通企业负责人',
						id: 5
					},
					{
						n: '食品流通企业安全管理员',
						id: 6
					},
					{
						n: '食品流通企业从业人员',
						id: 7
					}
				],
				[
					{
						n: '餐饮服务企业负责人',
						id: 8
					},
					{
						n: '餐饮服务安全管理员',
						id: 9
					},
					{
						n: '餐饮服务从业人员',
						id: 10
					}
				],
				[
					{
						n: '水产品生产管理人员',
						id: 17
					},
					{
						n: '水产品从业人员',
						id: 18
					}
				],
				[
					{
						n: '畜牧生产从业人员',
						id: 20
					}
				],
				[
					{
						n: '农药经营人员',
						id: 12
					}
				],
				[
					{
						n: '林业生产管理人员',
						id: 14
					},
					{
						n: '林业从业人员',
						id: 15
					}
				],
				[
					{
						n: '食源性疾病流调人员',
						id: 21
					},
					{
						n: '食源性疾病报告人员',
						id: 22
					}
				]
			]
		};
	},
	mounted() {
		resetRem();

		this.hh();
		// 如果 此用户上一次点击了修改按钮
		if (this.user.member_auth_state == 5) {
			// 此用户已经保存过一次实名认证了 ,此时修改按钮显示
			this.memberEdit({
				member_auth_state: 3
			});
		}

		if (this.user.member_auth_state == 1 || this.user.member_auth_state == 3) {
			this.titleRight = '编辑';
		}
	},
	computed: {
		...mapState({
			user: state => state.member.info,
		}),
		getBannerStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width;
			let itemHeight = height;
			return {
				maxWidth: itemWidth + 'px',
				maxHeight: itemHeight + 'px'
			};
		}
	},
	watch: {
		popMap: function(v) {
			if (v == true) {
				// console.log($(window).height());
				// console.log($('.head_title_cont').height());
				// console.log($('.common-footer').height());
				this.endHeight = $(window).height() - $('.common-header-wrap').height() + 'px !important';
				// console.log(this.endHeight);
			}
		}
	},
	created: function() {
		this.gangwei = '999';
		this.hangye = '999';
		if (this.user) {
			// console.log(this.user);
			this.realname = this.user.member_truename;
			this.idcard = this.user.member_idcard;
			this.dwname = this.user.dwname;
			if (this.user.lng) {
				this.lng = this.user.lng;
				this.lat = this.user.lat;
				this.dlwz = this.lng + '/' + this.lat;
			}
			if (this.user.gangwei) {
				this.gangwei = this.user.gangwei;
			}
			if (this.user.hangye) {
				this.hangye = this.user.hangye;
			}
			this.tuan = this.user.tuan; // 社区团
			this.myTuan = this.tuan?true:false;
			this.bank_account_name = this.user.bank_account_name; // 银行开户名
			this.bank_account_number = this.user.bank_account_number; // 公司银行账号
			// this.bank_name = this.user.bank_name;                     // 银行支行名称

			this.member_areaid = this.user.member_areaid;
			this.member_areainfo = this.user.member_areainfo;
			if( this.member_areaid ){
				
				getTuanList(this.member_areaid).then(res => {
					this.tuanList = res.result;
					this.tuan = this.user.tuan; // 社区团
					this.myTuan = this.tuan?true:false;
				});
			}
		}
	},

	methods: {
		...mapMutations({
			memberEdit: 'memberEdit'
		}),
		
		/****** 社区团 ********* */
		// 社区所在地址
		onRegion(picker, values) {
			(this.user.member_auth_state != 1 && this.user.member_auth_state != 3)?( this.$refs.picker.currentValue = true ):'';
		},

		// 接收 三级 地址
		onPickerConfirm(values) {
			this.member_areainfo = this.getRegionStr(values);

			this.member_areaid = values[2].area_id;
			getTuanList(values[2].area_id).then(res => {
				this.tuanList = res.result;
				// 团购地址更改
				this.tuan = null;
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



		// 点击编辑
		fun_right() {
			this.titleRight = null;
			// console.log('年后');
			this.editsubmitInformation();
		},

		// 子组件 触发 父组件
		fun_onleft() {
			this.popMap = false;
		},

			hh() {
				this.select.height = (window.innerHeight) - 30 + 'px'
			},
			getPoint(e) {

				this.add.p = e.point;
				this.add.show = true;
				let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
				geocoder.getLocation(e.point, rs => {
					this.add.site = rs.address;
				});
				//this.memberPoint({ point: { lng: this.add.p.lng, lat: this.add.p.lat, address: this.add.site, cityCode: '' } })
				this.dlwz = this.add.p.lng + "/" + this.add.p.lat
				this.lng = this.add.p.lng
				this.lat = this.add.p.lat
				this.$forceUpdate()
			},
			submitInformation(n) {

				if (!this.realname) {
					Toast("请填写真实姓名");
					return false;
				}
				this.realname = this.utils.getChinese(this.realname);
				if ( !this.utils.IsChinese(this.realname) ){
					Toast("真实姓名必须为汉字格式");
					return false;
				}
				if (!this.idcard) {
					Toast("请填写身份证号码");
					return false;
				}
				if (!this.utils.checkIsCardNo(this.idcard)) {
					Toast("请检查身份证号码格式");
					return false;
				}
				if (!this.user.member_idcard_image1_url) {
					Toast("请上传身份证");
					return false;
				}
				if( this.bank_account_name ){
					this.bank_account_name = this.utils.getChinese(this.bank_account_name);
					if ( !this.utils.IsChinese(this.bank_account_name) ){
						Toast("团长开户名必须为汉字格式");
						return false;
					}
				}
				if (!this.if_confirm) {
					this.confirmSumit(n)
					return
				}
				MessageBox.confirm('请仔细核对信息，确认上传后除非管理员审核否则无法再次上传').then(action => {
					this.confirmSumit(n)
				})
			},
			confirmSumit(n) {
				!this.myTuan?this.tuan=null:"";
				updateMemberAuth(
					this.member_areaid,
					this.member_areainfo,
					this.realname, this.idcard,
					this.if_confirm, this.dwname,
					this.lng, this.lat, this.hangye,
					this.gangwei, this.tuan,
					n,
					this.bank_account_name,
					this.bank_account_number,
					this.bank_name,
				).then(res => {
					if (this.if_confirm) {
						this.memberEdit({
							member_truename: this.realname,
							member_idcard: this.idcard,
							member_auth_state: 1,
							dwname: this.dwname,
							lng: this.lng,
							lat: this.lat,
							hangye: this.hangye,
							gangwei: this.gangwei,
							tuan: this.tuan,
							bank_account_name: this.bank_account_name,
							bank_account_number: this.bank_account_number,
							member_areaid:this.member_areaid,
							member_areainfo:this.member_areainfo,
						});
						// console.log("成功");
						this.titleRight = '编辑';
						
						// 如果是从申请社区团跳转过来的
						if(this.$route.params.Application && this.tuan && this.tuan.indexOf(',')!=-1){	
							checkInviter().then(res => {
								this.$router.push({ name: 'MemberInviterManage' });
							}).catch(err=> {
								Toast(err.message);
							});
						}else{
							Toast(res.message);
						}
					} else {
						this.if_confirm = true;
						this.submitInformation(n);
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		// 点击修改按钮 切换状态为 5
		editsubmitInformation() {
			this.memberEdit({
				member_auth_state: 5
			});
		},
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},
		dropImage(id) {
			MessageBox.confirm('确定要删除该图片吗？').then(action => {
				dropAuth(id)
					.then(res => {
						this.user[id + '_url'] = '';
						var temp = {};
						temp[id + '_url'] = '';
						this.memberEdit(temp);
					})
					.catch(function(error) {
						Toast(error.message);
					});
			});
		},
		uploadInformPic(index, event) {
			// return false;
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
				// Toast("上传图片不得大于200k,请裁切图片后上传");
				// 保存 当前 值 名称
				this.cropImgIndex = index;
				// 传值 隐藏 当前页面 打开 插件
				this.cropDataShow = false;
				this.$refs.cropImg.currentValue = true;
				// 将当前 的 input 里的 文件 传递给 插件
				this.$refs.cropImg.files = event.target.files;

				// 清除 当前 input 的 值
				event.target.files = null;
				event.target.type = null;
				// 重新 设置 类型 是文件
				event.target.type = 'file';

				return false;
			}
			formdata.append(index, event.target.files[0]);
			formdata.append('id', index);
			uploadAuth(formdata)
				.then(res => {
					this.user[index + '_url'] = res.result.file_path;
					var temp = {};
					temp[index + '_url'] = res.result.file_path;
					this.memberEdit(temp);
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},

		// 图片 接收 图片
		fun_getCropImgData(obj) {
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			this.cropDataShow = true;
			// 如果 是 带值 传递过来的 上传 图片
			if (obj.type) {
				let formdata = new FormData();
				formdata.append(this.cropImgIndex, obj.data,Date.now() + '.jpg');
				formdata.append('id', this.cropImgIndex);
				uploadAuth(formdata).then(res => {
					this.user[this.cropImgIndex + '_url'] = res.result.file_path;
					var temp = {};
					temp[this.cropImgIndex + '_url'] = res.result.file_path;
					this.memberEdit(temp);
				})
				.catch(function(error) {
					Toast(error.message);
				});
				
				// uploadCropImg(obj.data)
				// 	.then(res => {
				// 		this.user[this.cropImgIndex + '_url'] = res.result.file_name;
				// 		var temp = {};
				// 		temp[this.cropImgIndex + '_url'] = res.result.file_path;
				// 		this.memberEdit(temp);
				// 	})
				// 	.catch(err => {
				// 		Toast(err.message);
				// 	});
			}
		}
	},

	beforeDestroy() {
		resumeRem();
	}
};
</script>

<style lang="scss" scoped>
.member-auth {
	background: #c6c6c6;
	div {
		box-sizing: border-box;
	}

	
.way{
	width: 100%;
	ul{
		$size:1.28rem;
		display: flex;
		justify-content: flex-end;
		li{
			display: flex;
			align-items: center;
			margin-left: 4rem;
			div{
				border: 1px solid #ccc;
				width: $size;
    		height: $size;
				margin-right: .4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 80%;
				}
			}
		}
	}
}

	.tuan-select{
		position: relative;
		.color_start {
			padding-right: 1rem;
		}
		&/deep/.mint-cell-value{
			position: relative;
		}
	}
	.head_title_cont {
		height: 3.74rem;
		background: #f4f5f7;
		font-size: 1.28rem;
		position: relative;
		z-index: 1;

		// 头部
		.header-wrap {
			padding: 1rem 1.43rem;
			position: relative;
			display: flex;
			background: #fff;
			justify-content: space-between;
			img {
				// position: absolute;
				// left: 1.78rem;
				// top: 50%;
				width: 1.64rem;
				height: 1.64rem;
				// transform: translate(0, -50%);
			}
			.header-title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-size: 1.39rem;
				font-weight: 400;
				color: rgba(22, 22, 22, 1);
			}
			.header-right {
				span {
					font-size: 1.3rem;
				}
			}
		}
	}
	// 主题内容
	.cont {
		background-color: #f4f5f7;
		margin-top: -1px;
		// padding-bottom: 10rem;

		select {
			&:disabled {
				opacity: 1;
			}
		}

		// 按钮
		.btn_new {
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
			border-radius: 40px;
			color: #fff;
			width: 92%;
			margin: 3rem auto;
			// margin: 4rem auto 2rem;
			// position: fixed;
			bottom: 4%;
			left: 4%;
			z-index: 1;
		}

		// 消除 下划线
		.none:after {
			content: '';
			display: none;
		}

		// 输入框 样式
		// &/deep/.mint-cell {
		// 	min-height: 45px;
		// 	&:after{
		// 		content: "";
		// 		position: absolute;
		// 		z-index: 1;
		// 		pointer-events: none;
		// 		background-color: #e5e5e5;
		// 		height: 1px;
		// 		left: 4%;
		// 		width: 92%;
		// 	}

		// 	.mint-cell-wrapper {
		// 		padding: 0rem 1.43rem;
		// 		font-size: 1.28rem;
		// 		color: #161616;

		// 		.mint-field-core {
		// 			text-align: right;
		// 			padding-top: .28rem;
		// 			color: #6F6F6F;
		// 		}

		// 		.mint-cell-title {
		// 			flex: unset;
		// 			width: 7rem;
		// 			width: 120px;

		// 			.mint-cell-text {
		// 				vertical-align: revert;
		// 			}
		// 		}
		// 	}

		// 	input::-webkit-input-placeholder {
		// 		/* WebKit browsers */
		// 		color: #C6C6C6;
		// 	}

		// 	select{
		// 		direction: rtl;
		// 	}
		// 	.ui-form-input{
		// 		color:#6F6F6F;
		// 		text-align: right;
		// 	}
		// 	.ab_right{
		// 		padding-right: 1rem;
		// 		&::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
		// 				color: #6F6F6F;
		// 		}
		// 	}
		// }

		.name_card {
			margin-bottom: 10px;
		}
	}

	.map {
		height: 100% !important;
	}

	.idcard-wrapper {
		background: #fff;

		.idcard-item {
			background: #fff;
			padding: 1rem 0;
			margin-bottom: 0.5rem;
			display: flex;
			padding: 0rem 1.43rem;
			justify-content: space-between;

			.del-btn {
				position: absolute;
				font-size: 1.5rem;
				top: -3.75rem;
				right: -0.75rem;
			}

			.title {
				font-size: 1.28rem;
				text-align: center;
				height: 10rem;
				line-height: 10rem;
			}
		}
	}
	.img {
		padding-top: 1rem;
	}

	.user-avatar {
		display: block;
		position: relative;
		// width: 10rem;
		// height: 8rem;
		// margin: 0 auto;
		// text-align: center;
		width: 10rem;
		height: 7.55rem;
		border-radius: 16px;
		border: 1px dashed #c4c4c4;
		line-height: 8rem;
		padding: 1rem;

		.icon_img {
			width: 100%;
			height: 100%;
			padding: 4% 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			span {
				line-height: initial;
				color: #e63116;
				font-size: 12px;
			}

			img {
				width: 2.8rem;
				height: 2.8rem;
			}
		}

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

	.userNone {
		padding: 0;
		border: 0;
	}

	// .user-avatar::before {
	// 	position: absolute;
	// 	font-size: 1.5rem;
	// 	line-height: 8rem;
	// 	left: 50%;
	// 	margin-left: -.75rem;
	// 	color: rgba(0, 0, 0, 0.5)
	// }
}

.ui-form-control {
	padding: 0.2em 0.5em 0.2em;
	border-radius: 1em;
	background-color: #fff;

	.select_content {
		// color: #777;
		// font-size: 0.9em;
	}
}

.register-form-select {
	position: relative;
	z-index: 1;
}
.hsy_main .mint-cell .sel_color {
	color: #c6c6c6;
	&::-webkit-input-placeholder {
		/* WebKit browsers 适配谷歌 */
		color: #c6c6c6;
	}
}

.ui-form-input {
	width: 100%;
	background-color: transparent;
}

.ui-form-input,
.ui-form-input:focus {
	outline: none;
	border: none;
	color: #2c333a;
	color: #c6c6c6;
	font-size: 0.9em;
}

.ui-form-area {
	margin-bottom: 0.5em;
}

.mmap {
	position: absolute;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	z-index: 999;

	&/deep/.anchorTL {
		top: 4.14rem !important;
		left: 0.5rem !important;
		input {
			width: 80vw;
			padding-left: 0.2rem;
			font-size: 1.32rem;
			line-height: 1.32rem;
			height: 1.32rem;
			vertical-align: middle;
			padding: 0.8rem 0.2rem;
		}
	}
}

.member-auth .mint-cell-value {
	flex: 1;
	position: relative;

	.icon_right {
		width: 1.4rem;
		/* height: 2rem; */
		transform: rotate(180deg);
		position: absolute;
		right: 1rem;
		opacity: 0.5;
		width: 1.4rem;
		/* height: 2rem; */
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
		position: absolute;
		right: -0.5rem;
		opacity: 0.5;
		color: #6f6f6f;
	}
}
.hsy_main .mint-cell-value select {
	color: #6f6f6f;
	font-size: 1.18rem;
}
</style>
