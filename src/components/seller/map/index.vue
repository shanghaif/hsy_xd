<template>
	<div class="member-auth" v-if="popMap">
		<div class="mmap ">
			<div class="common-header-wrap">
				<mt-header title="长按抓取位置" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
			</div>
			<div class="common-popup-content" :style="{ height: endHeight }">
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
						<!-- <bm-info-window :show="add.show" @close="pWindowClose" @open="pWindowOpen" style="font-size: 14px">         -->
						<!-- <p>地址：{{ add.site }}</p>         
            </bm-info-window> -->
					</bm-marker>
				</baidu-map>

				<div class="test_btn"><mt-button @click.stop="fun_save" class="btn_sty" size="large">保存位置</mt-button></div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import { uploadAuth, dropAuth, updateMemberAuth } from '../../../api/member';
import { saveSellerStore_lon_lat } from '../../../api/seller';
import $ from 'jquery';
export default {
	components: {},
	name: 'MemberProfileSet',
	data() {
		return {
			endHeight: null, //地图高度
			keyword: '', //关键词
			popMap: false,
			select: { width: '100%', height: '100%' },
			lng: 115.579356,
			lat: 34.875037,
			dlwz: '',
			add: {
				show: false,
				p: { lng: 0, lat: 0 },
				siteName: '',
				site: ''
			},
			if_confirm: false,
			showimage: '',
			isshow: false,
			realname: '',
			idcard: '',
			member_ww: ''
		};
	},
	created() {
		this.popMap = true;
	},
	mounted() {
		// this.hh();
	},
	computed: {
		...mapState({
			keyToken: state => state.member.token,
			user: state => state.seller.info
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
				// console.log($(".mint-header").height());
				this.endHeight = $(window).height() - $('.mint-header').height() - 1 + 'px !important';
				// console.log(this.endHeight);
			}
		}
	},

	methods: {
		...mapMutations({
			memberEdit: 'memberEdit'
		}),
		fun_save() {
			// 保存地址
			saveSellerStore_lon_lat(this.keyToken, this.user.store_id, this.lat, this.lng).then(res => {
				Toast('保存成功');
				this.$router.go(-1);
			});
		},
		getPoint(e) {
			this.add.p = e.point;
			this.add.show = true;
			let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
			geocoder.getLocation(e.point, rs => {
				this.add.site = rs.address;
			});
			//this.memberPoint({ point: { lng: this.add.p.lng, lat: this.add.p.lat, address: this.add.site, cityCode: '' } })
			this.dlwz = this.add.p.lng + '/' + this.add.p.lat;
			this.lng = this.add.p.lng;
			this.lat = this.add.p.lat;
			this.$forceUpdate();
		}
	}
};
</script>
<style lang="scss" scoped>
.member-auth {
	background: #fff;
}
.ui-form-control {
	padding: 0.2em 0.5em 0.2em;
	border-radius: 1.5rem;
	// background-color: #eee;
	background-color: #fff;
	margin: 0.7rem;
	width: 100%;
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
	font-size: 0.9em;
}
.ui-form-area {
	margin-bottom: 0.5em;
}
.BMap_noprint {
	width: 87%;
}
.test_btn {
	position: absolute;
	bottom: 0;
	width: 100%;
	.btn_sty {
		width: 86%;
		margin: 0.7rem auto;
		font-size: 0.75rem;
		background: linear-gradient(45deg, #f4563e, #e63519);
		color: #fff;
		border-radius: 1rem;
	}
}
.common-popup-content {
	& /deep/ .anchorBR {
		bottom: 52px !important;
	}
}
</style>
<style>
.member-auth .mint-cell-title {
	flex: unset;
	width: 7rem;
}
.member-auth .mint-cell-value {
	flex: 1;
}
</style>
