<template>
	<div class="container reserve">
		<!-- header -->
		<head-title :title="title"></head-title>
		<div class="content">
			<text-banner :content="message" :bgcolor="'#FDF5C7'" :color="'rgba(247, 140, 8, 1)'"></text-banner>
			<div class="the-title">宴席信息</div>
			<mt-cell title="宴请方式" class="star-red">
				<mt-navbar class="tab-nav" v-model="selected">
					<mt-tab-item id="1" v-if="banquet_mode.indexOf('1') != -1">到店堂食</mt-tab-item>
					<mt-tab-item id="2" v-if="banquet_mode.indexOf('2') != -1">厨师上门</mt-tab-item>
				</mt-navbar>
			</mt-cell>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<!-- <mt-cell class="star-red" title="宴请时间" is-link></mt-cell> -->
					<div class="list-cell star-red" @click="onDate('start')">
						<span>宴请时间:</span>
						<div>
							<input type="text" placeholder="选择时间" readonly="readonly" v-model="nameStartTime" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<div class="list-cell star-red" @click="$refs.typePicker.currentValue = true">
						<span>宴请类型:</span>
						<div>
							<input type="text" placeholder="选择类型" readonly="readonly" v-model="selectTypeName" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<!-- <div class="list-cell star-red" @click="tablePopup = true"> -->
					<div class="list-cell star-red" @click="currentValue = true">
						<span>所需桌位:</span>
						<div>
							<input type="text" placeholder="选择桌位" readonly="readonly" v-model="selectTable" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<div style="height: 0.48rem;background-color: rgba(244, 245, 247, 1);"></div>
					<div v-show="TableTypeArr.indexOf('3') != -1">
						<div class="list-type">
							<span>包间:</span>
							<input type="number" @blur="allNumber(), computedPrice()" v-model="bz" placeholder="请输入预定桌数" />
							<input type="number" @blur="allNumber()" v-model="br" placeholder="请输入每桌平均人数" />
						</div>
						<div
							class="list-cell list-cell-red"
							@click="
								$router.push({ name: 'HomeBanquetChooseDishes', query: { store_id: store_id, table_name: 'bj', banquet_type: selectTypeId } }),
									saveBanquetSelected()
							"
						>
							<span></span>
							<div>
								<span>选择包间菜品</span>
								<img src="@/assets/image/icon2/icon-right-red.png" alt="" />
							</div>
						</div>
					</div>
					<div class="selected-food-list" v-if="selectGoodsList.bj.length > 0 && TableTypeArr.indexOf('3') != -1">
						<div>包间菜品</div>
						<ul
							:class="{ ulClose: !selectGoodsList.bjtype, ulClose1: !selectGoodsList.bjtype && selectGoodsList.bj && selectGoodsList.bj.length == 1 }"
							:style="{ height: 'auto' }"
						>
							<li v-for="(value, i) in selectGoodsList.bj" :key="i">
								<img :src="value.goods_image" alt="" />
								<div>
									<span>{{ value.goods_name }}</span>
									<div>
										<span>每桌{{ value.num }}件 x {{ bz }}桌</span>
										<span>
											<span>¥</span>
											<span>{{ value.goods_price }}</span>
										</span>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="selectGoodsList.bj && selectGoodsList.bj.length > 2 && !selectGoodsList.bjtype" @click.stop="open('bj')" class="open">
							<span>展开(共{{ selectGoodsList.bj.length }}种)</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
						<div v-if="selectGoodsList.bjtype" @click.stop="close('bj')" class="open close">
							<span>关闭</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
					</div>
					<div v-show="TableTypeArr.indexOf('1') != -1">
						<div class="list-type">
							<span>小桌:</span>
							<input type="number" @blur="allNumber(), computedPrice()" v-model="xz" placeholder="请输入预定桌数" />
							<input type="number" @blur="allNumber()" v-model="xr" placeholder="请输入每桌平均人数" />
						</div>
						<div
							class="list-cell list-cell-red"
							@click="
								$router.push({ name: 'HomeBanquetChooseDishes', query: { store_id: store_id, table_name: 'xz', banquet_type: selectTypeId } }),
									saveBanquetSelected()
							"
						>
							<span></span>
							<div>
								<span>选择小桌菜品</span>
								<img src="@/assets/image/icon2/icon-right-red.png" alt="" />
							</div>
						</div>
					</div>
					<div class="selected-food-list" v-if="selectGoodsList.xz.length > 0 && TableTypeArr.indexOf('1') != -1">
						<div>小桌菜品</div>
						<ul
							:class="{ ulClose: !selectGoodsList.xztype, ulClose1: !selectGoodsList.xztype && selectGoodsList.xz && selectGoodsList.xz.length == 1 }"
							:style="{ height: 'auto' }"
						>
							<li v-for="(value, i) in selectGoodsList.xz" :key="i">
								<img :src="value.goods_image" alt="" />
								<div>
									<span>{{ value.goods_name }}</span>
									<div>
										<span>每桌{{ value.num }}件 x {{ xz }}桌</span>
										<span>
											<span>¥</span>
											<span>{{ value.goods_price }}</span>
										</span>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="selectGoodsList.xz && selectGoodsList.xz.length > 2 && !selectGoodsList.xztype" @click.stop="open('xz')" class="open">
							<span>展开(共{{ selectGoodsList.xz.length }}种)</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
						<div v-if="selectGoodsList.xztype" @click.stop="close('xz')" class="open close">
							<span>关闭</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
					</div>
					<div v-show="TableTypeArr.indexOf('2') != -1">
						<div class="list-type">
							<span>大桌:</span>
							<input type="number" @blur="allNumber(), computedPrice()" v-model="dz" placeholder="请输入预定桌数" />
							<input type="number" @blur="allNumber()" v-model="dr" placeholder="请输入每桌平均人数" />
						</div>
						<div
							class="list-cell list-cell-red"
							@click="
								$router.push({ name: 'HomeBanquetChooseDishes', query: { store_id: store_id, table_name: 'dz', banquet_type: selectTypeId } }),
									saveBanquetSelected()
							"
						>
							<span></span>
							<div>
								<span>选择大桌菜品</span>
								<img src="@/assets/image/icon2/icon-right-red.png" alt="" />
							</div>
						</div>
					</div>

					<div class="selected-food-list" v-if="selectGoodsList.dz.length > 0 && TableTypeArr.indexOf('2') != -1">
						<div>大桌菜品</div>
						<ul
							:class="{ ulClose: !selectGoodsList.dztype, ulClose1: !selectGoodsList.dztype && selectGoodsList.dz && selectGoodsList.dz.length == 1 }"
							:style="{ height: 'auto' }"
						>
							<li v-for="(value, i) in selectGoodsList.dz" :key="i">
								<img :src="value.goods_image" alt="" />
								<div>
									<span>{{ value.goods_name }}</span>
									<div>
										<span>每桌{{ value.num }}件 x {{ dz }}桌</span>
										<span>
											<span>¥</span>
											<span>{{ value.goods_price }}</span>
										</span>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="selectGoodsList.dz && selectGoodsList.dz.length > 2 && !selectGoodsList.dztype" @click.stop="open('dz')" class="open">
							<span>展开(共{{ selectGoodsList.dz.length }}种)</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
						<div v-if="selectGoodsList.dztype" @click.stop="close('dz')" class="open close">
							<span>关闭</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
					</div>

					<div style="height: 0.48rem;background-color: rgba(244, 245, 247, 1);"></div>
					<div class="list-cell">
						<span>预计到店人数:</span>
						<div><input type="text" placeholder="请输入预计到店总人数" v-model="manNumber" /></div>
					</div>
					<div class="the-title">联系信息</div>
					<div class="list-cell star-red list-cell-start">
						<span>联系人:</span>
						<div><input type="text" placeholder="请输入联系人姓名" v-model="name" /></div>
					</div>
					<div class="list-cell star-red list-cell-start">
						<span>联系方式:</span>
						<div><input type="text" placeholder="请输入联系方式，方便商家联系您" v-model="phone" /></div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="list-cell star-red" @click="onDate('start')">
						<span>宴请时间:</span>
						<div>
							<input type="text" placeholder="选择时间" readonly="readonly" v-model="nameStartTime" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<div class="list-cell star-red" @click="$refs.typePicker.currentValue = true">
						<span>宴请类型:</span>
						<div>
							<input type="text" placeholder="选择类型" readonly="readonly" v-model="selectTypeName" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<div style="height: 0.48rem;background-color: rgba(244, 245, 247, 1);"></div>
					<div class="list-cell star-red list-cell-start">
						<span>桌数:</span>
						<div><input type="number" @blur="computedPrice" placeholder="请输入预定桌数" v-model="selectTableCook" /></div>
					</div>
					<div
						class="list-cell list-cell-red"
						@click="
							$router.push({ name: 'HomeBanquetChooseDishes', query: { store_id: store_id, table_name: 'cook', banquet_type: selectTypeId } }),
								saveBanquetSelected('cook')
						"
					>
						<span></span>
						<div>
							<span>选择菜品</span>
							<img src="@/assets/image/icon2/icon-right-red.png" alt="" />
						</div>
					</div>
					<div class="selected-food-list" v-if="selectGoodsList.cook.length > 0">
						<div>厨师上门桌菜品</div>
						<ul
							:class="{ ulClose: !selectGoodsList.cooktype, ulClose1: !selectGoodsList.cooktype && selectGoodsList.cook && selectGoodsList.cook.length == 1 }"
							:style="{ height: 'auto' }"
						>
							<li v-for="(value, i) in selectGoodsList.cook" :key="i">
								<img :src="value.goods_image" alt="" />
								<div>
									<span>{{ value.goods_name }}</span>
									<div>
										<span>每桌{{ value.num }}件 x {{ selectTableCook }}桌</span>
										<span>
											<span>¥</span>
											<span>{{ value.goods_price }}</span>
										</span>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="selectGoodsList.cook && selectGoodsList.cook.length > 3 && !selectGoodsList.cooktype" @click.stop="open('cook')" class="open ">
							<span>展开(共{{selectGoodsList.cook.length}}种)</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
						<div v-if="selectGoodsList.cooktype" @click.stop="close('cook')" class="open close">
							<span>关闭</span>
							<img src="@/assets/image/icon2/icon-bottom.png" alt="" />
						</div>
					</div>

					<div class="list-cell list-cell-start star-red">
						<span>菜品食材:</span>
						<div>
							<span :class="{ select: selectTab == 1 }" @click="selectTabM(1)">厨师准备</span>
							<span :class="{ select: selectTab == 2 }" @click="selectTabM(2)">家里自备</span>
						</div>
					</div>
					<div class="the-title">联系信息</div>
					<div class="list-cell star-red list-cell-start">
						<span>联系人:</span>
						<div><input type="text" placeholder="请输入联系人姓名" v-model="name" /></div>
					</div>
					<div class="list-cell star-red list-cell-start">
						<span>联系方式:</span>
						<div><input type="text" placeholder="请输入联系方式，方便商家联系您" v-model="phone" /></div>
					</div>
					<!-- @click="address" -->
					<div class="list-cell star-red list-cell-start" @click="onRegion">
						<span>上门地址:</span>
						<div>
							<input type="text" placeholder="请选择地址区域" readonly="readonly" v-model="selectAddress" />
							<img src="@/assets/image/icon2/icon-right.png" alt="" />
						</div>
					</div>
					<div class="address"><textarea name="" v-model="detailed_address" id="" cols="30" rows="10" placeholder="请输入详细地址，方便厨师上门"></textarea></div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<div class="footer">
			<div class="footer-left">
				<span>
					<span>预估费用参考:</span>
					<span>￥{{ price }}</span>
				</span>
				<span>此费用仅作为参考，不作线上支付</span>
			</div>
			<div class="submit" @click="submit()">提交预定</div>
		</div>
		<mt-datetime-picker
			ref="datePicker1"
			type="datetime"
			:startDate="new Date()"
			yearFormat="{value}年"
			monthFormat="{value}月"
			dateFormat="{value}日"
			:value="new Date()"
			@confirm="dateConfirm1"
		></mt-datetime-picker>
		<!-- <OneDropDown @pickOneDropDown="pickSlectResult" ref="typePicker" :items="values"></OneDropDown> -->
		<!-- 弹窗单选列表 -->
		<SelectBox title="请选择宴请类型" :items="values" ref="typePicker" @getSelectBox="getSelectValue"></SelectBox>

		<!-- <mt-popup class="receiving-value" v-model="tablePopup" position="bottom">
			<img src="@/assets/image/icon2/icon-cha.png" @click="tablePopupCancel" alt="" />
			<div class="receiving-value-title">请选择桌位</div>

			<ul>
				<li v-show="table_type.indexOf('1') != -1">
					<input value="1" v-model="TableTypeArr" type="checkbox" />
					<div><img v-show="TableTypeArr[0] == 1 || TableTypeArr[1] == 1 || TableTypeArr[2] == 1" src="@/assets/image/icon2/icon-select.png" alt="" /></div>
					<span>小桌</span>
				</li>
				<li v-show="table_type.indexOf('2') != -1">
					<input value="2" v-model="TableTypeArr" type="checkbox" />
					<div><img v-show="TableTypeArr[0] == 2 || TableTypeArr[1] == 2 || TableTypeArr[2] == 2" src="@/assets/image/icon2/icon-select.png" alt="" /></div>
					<span>大桌</span>
				</li>
				<li v-show="table_type.indexOf('3') != -1">
					<input value="3" v-model="TableTypeArr" type="checkbox" />
					<div><img v-show="TableTypeArr[0] == 3 || TableTypeArr[1] == 3 || TableTypeArr[2] == 3" src="@/assets/image/icon2/icon-select.png" alt="" /></div>
					<span>包间</span>
				</li>
			</ul>

			<div class="confirm-get" @click="confirmSelectTable">确认</div>
		</mt-popup> -->

		<!-- 适配宴席 -->
		<mt-popup class="selectBox" v-model="currentValue" position="bottom">
			<div class="cont">
				<!-- 头部 -->
				<div class="head">{{ adaptTitle }}</div>
				<!-- 内容 -->
				<div class="center" v-for="(v, i) in adaptItems" :key="i" @click="adapt(i)">
					<span>{{ v.name }}</span>
					<img v-if="v.select" src="@/assets/image/icon2/icon-select-red.png" alt="" />
				</div>
				<!-- 尾部 -->
				<div class="foot" style="color: #FB1319;" @click="confirmadapt()">确认</div>
				<div class="foot" @click="currentValue = false">取消</div>
			</div>
		</mt-popup>

		<region-picker ref="picker" :valm="address_info.area_id" v-on:onConfirm="onPickerConfirm"></region-picker>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import SelectBox from '@/components/SelectBox.vue';
import textBanner from './textBanner';
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast } from 'mint-ui';
import { getSellerSetList, sendOrderList } from '@/api/memberBanquet.js';
import RegionPicker from '../../../components/RegionPicker2';
// import OneDropDown from '@/components/OneDropDown.vue';
export default {
	data() {
		return {
			title: '宴席预定', //or厨师上门
			message: '填写并提交您的宴席预定的基本信息，商家收到后会第一时间联系您',
			selected: '1',
			tableType: '包间', //选择的所需桌位，默认包间
			nameStartTime: null,
			selectTypeName: '', //宴请类型
			selectTypeId: '', //宴请类型id
			selectTable: '', //所需桌位
			manNumber: null, //到店人数
			selectTab: 1,
			name: '', //联系人姓名
			selectAddress: '', //上门地址区域
			price: 0, //预估费用
			phone: '', //联系方式
			values: [{ name: '喜宴', id: 1 }, { name: '丧宴', id: 2 }, { name: '生日宴', id: 3 }, { name: '正式宴会', id: 4 }, { name: '家宴', id: 5 }, { name: '便宴', id: 6 }],
			tablePopup: false, //选择桌位弹窗,
			TableTypeArr: [],
			store_id: this.$route.query.store_id,
			banquet_mode: null, //宴席类型,
			table_type: null, //桌位类型
			bz: null,
			br: null,
			xz: null,
			xr: null,
			dz: null,
			dr: null,
			banquetReserve: {},
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
			detailed_address: '',
			selectTableCook: null, //厨师上门所需桌数
			selectGoodsList: [], //选择的菜品
			currentValue: false, //选择桌位
			adaptItems: [],
			adaptTitle: '请选择桌位'
		};
	},
	components: {
		HeadTitle,
		textBanner,
		// OneDropDown,
		SelectBox,
		RegionPicker
	},
	computed: {
		// ...mapState(),
		...mapState({
			banquetStore: state => state.home.banquetStore
		})
	},
	activated() {
		this.getSellerSetList();
		this.computedPrice();
		console.log(this.selected, 'this.selected', typeof this.selected);
		this.selectGoodsList = this.banquetStore;
		this.selectGoodsList.bjtype = false;
		this.selectGoodsList.xztype = false;
		this.selectGoodsList.dztype = false;
		this.selectGoodsList.cooktype = false;
		console.log(this.TableTypeArr, 'TableTypeArr.indexOf!= -1');
		console.log(this.selectGoodsList, 'this.selectGoodsList');
		// this.$forceUpdate();
		// console.log(this.banquetStore, 'banquetStore');
	},
	// created() {
	// 	this.getSellerSetList();
	// },

	watch: {
		bz(val) {
			if (+val > +this.banquetReserve.table_maxnum.bz || (+val <= 0 && val != null)) {
				Toast('本店包间最多预定' + this.banquetReserve.table_maxnum.bz + '桌且大于0');
			}
		},
		xz(val) {
			if (+val > +this.banquetReserve.table_maxnum.xz || (+val <= 0 && val != null)) {
				Toast('本店小桌最多预定' + this.banquetReserve.table_maxnum.xz + '桌且大于0');
			}
		},
		dz(val) {
			if (+val > +this.banquetReserve.table_maxnum.dz || (+val <= 0 && val != null)) {
				Toast('本店大桌最多预定' + this.banquetReserve.table_maxnum.dz + '桌且大于0');
			}
		},
		br(val) {
			console.log(this.banquetReserve.table_maxnumber.bn, 'this.banquetReserve.table_maxnumber.bn');
			if (+val > this.banquetReserve.table_maxnumber.bn || (+val <= 0 && val != null)) {
				Toast('本店包间每桌人数最多支持' + this.banquetReserve.table_maxnumber.bn + '人且大于0');
			}
		},
		xr(val) {
			if (+val > +this.banquetReserve.table_maxnumber.xn || (+val <= 0 && val != null)) {
				Toast('本店小桌每桌人数最多支持' + this.banquetReserve.table_maxnumber.xn + '人且大于0');
			}
		},
		dr(val) {
			if (+val > +this.banquetReserve.table_maxnumber.dn || (+val <= 0 && val != null)) {
				Toast('本店大桌每桌人数最多支持' + this.banquetReserve.table_maxnumber.dn + '人且大于0');
			}
		}
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapMutations({
			saveBanquetStore: 'saveBanquetStore' // 保存 宴请 购物车 数据
		}),
		saveBanquetSelected(type) {
			console.log(type, 'type');
			if (type == 'cook' && type) {
				this.saveBanquetStore({ type: true, typeName: '2' });
			} else {
				this.saveBanquetStore({ type: true, typeName: '1' });
			}
		},
		computedPrice() {
			console.log(this.banquetStore, 'banquetStore');
			this.price = 0;
			if (this.selected == 1) {
				var xzPrice = 0;
				var dzPrice = 0;
				var bzPrice = 0;
				if (this.banquetStore.xz.length) {
					for (var item of this.banquetStore.xz) {
						// debugger
						xzPrice += item.goods_price * item.num * this.xz;
					}
				}
				if (this.banquetStore.dz.length) {
					for (var item of this.banquetStore.dz) {
						dzPrice += item.goods_price * item.num * this.dz;
					}
				}
				if (this.banquetStore.bj.length) {
					for (var item of this.banquetStore.bj) {
						bzPrice += item.goods_price * item.num * this.bz;
					}
				}
				this.price = parseFloat(xzPrice + dzPrice + bzPrice).toFixed(2);
			} else {
				var cookTablePrice = 0;
				if (this.banquetStore.cook.length) {
					for (var item of this.banquetStore.cook) {
						cookTablePrice += item.goods_price * item.num * this.selectTableCook;
					}
				}
				this.price = parseFloat(cookTablePrice).toFixed(2) ;
				// debugger
			}
		},
		adapt(i) {
			this.adaptItems[i].select = !this.adaptItems[i].select;
		},
		// 确认所选桌位
		confirmadapt() {
			this.TableTypeArr = [];
			this.currentValue = false;
			for (var item of this.adaptItems) {
				if (item.select == true) {
					this.TableTypeArr.push(item.id);
				}
			}
			this.$forceUpdate();
			console.log(this.TableTypeArr, 'this.TableTypeArr');
		},
		getSellerSetList() {
			// getSellerSetList({store_id:this.store_id})
			console.log(this.store_id, 'this.store_id');
			getSellerSetList({ store_id: this.store_id })
				.then(res => {
					// Toast(res.message);
					this.banquetReserve = res.result;
					this.selected = res.result.banquet_mode.slice(0, 1);
					console.log(this.selected, 'res.result');
					this.banquet_mode = res.result.banquet_mode;
					this.table_type = res.result.table_type;
					this.adaptItems = [];
					if (this.table_type.indexOf('1') != -1) {
						this.adaptItems.push({ name: '小桌', select: false, id: '1' });
					}
					if (this.table_type.indexOf('2') != -1) {
						this.adaptItems.push({ name: '大桌', select: false, id: '2' });
					}
					if (this.table_type.indexOf('3') != -1) {
						this.adaptItems.push({ name: '包间', select: false, id: '3' });
					}
					console.log(this.adaptItems, 'this.adaptItems');
					// debugger
					this.name = res.result.member_info.member_name;
					this.phone = res.result.member_info.member_phone;
					if (this.banquetStore.typeName) {
						this.selected = this.banquetStore.typeName;
					}
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		selectTabM(type) {
			this.selectTab = type;
		},
		onDate(values) {
			// if (!this.xianshi_id) {
			// 	this.timeType = values;
			// }
			this.$refs.datePicker1.open();
			// debugger
		},
		dateConfirm1(v) {
			this.nameStartTime = this.dateTimeReturn(v);
			// debugger
		},
		dateTimeReturn(v) {
			var d = new Date(v);
			var year = d.getFullYear();
			var month = change(d.getMonth() + 1);
			var day = change(d.getDate());
			var hour = change(d.getHours());
			var minute = change(d.getMinutes());
			// var second=change(d.getSeconds());
			function change(t) {
				if (t < 10) {
					return '0' + t;
				} else {
					return t;
				}
			}
			var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00';
			return time;
		},
		// pickSlectResult(values) {
		// 	// console.log(values, 'pickOneDropDown');
		// 	this.selectTypeName = values[0].name;
		// 	this.selectTypeId = values[0].id;
		// 	// debugger
		// },
		allNumber() {
			// debugger
			this.manNumber = this.bz * this.br + this.xz * this.xr + this.dz * this.dr;
		},
		open(type) {
			// console.log(item);
			// item.type = true;
			if (type == 'bj') {
				this.selectGoodsList.bjtype = true;
			}
			if (type == 'xz') {
				this.selectGoodsList.xztype = true;
			}
			if (type == 'dz') {
				this.selectGoodsList.dztype = true;
			}
			if (type == 'cook') {
				this.selectGoodsList.cooktype = true;
			}
			console.log(this.selectGoodsList, 'this.selectGoodsListaaaaaaaaaaaaaaa');
			this.$forceUpdate();
		},
		close(type) {
			if (type == 'bj') {
				this.selectGoodsList.bjtype = false;
			}
			if (type == 'xz') {
				this.selectGoodsList.xztype = false;
			}
			if (type == 'dz') {
				this.selectGoodsList.dztype = false;
			}
			if (type == 'cook') {
				this.selectGoodsList.cooktype = false;
			}
			this.$forceUpdate();
		},
		submit() {
			console.log(this.banquetStore, 'banquetStore');
			// 提交用户订单
			let params = {};
			console.log(this.selected, 'this.selected');
			params.banquet_mode = this.selected;
			params.store_id = this.store_id;
			if (this.nameStartTime) {
				params.banquet_time = this.nameStartTime;
			} else {
				Toast('请选择宴请时间');
				return;
			}
			if (this.selectTypeId) {
				params.banquet_type = this.selectTypeId;
			} else {
				Toast('请选择宴请类型');
				return;
			}
			if (this.name) {
				params.member_name = this.name;
			} else {
				Toast('请填写联系人姓名');
				return;
			}
			if (this.phone) {
				params.member_phone = this.phone;
			} else {
				Toast('请填写联系人电话');
				return;
			}

			params.cost_reference = this.price;
			// params.dishes_food =
			if (this.selected == 1) {
				if (!this.TableTypeArr.length) {
					Toast('请选择所需桌位');
					return;
				}
				if (this.TableTypeArr.indexOf('3') != -1) {
					if (+this.bz && +this.bz <= +this.banquetReserve.table_maxnum.bz) {
						params.bz = this.bz;
					} else {
						Toast('请填写正确的包间桌数');
						return;
					}
					if (+this.br && +this.br <= +this.banquetReserve.table_maxnumber.bn) {
						params.bn = this.br;
					} else {
						Toast('请填写正确的每桌平均人数');
						return;
					}
				}
				if (this.TableTypeArr.indexOf('1') != -1) {
					if (+this.xz && +this.xz <= +this.banquetReserve.table_maxnum.xz) {
						params.xz = this.xz;
					} else {
						Toast('请填写正确的小桌桌数');
						return;
					}
					if (+this.xr && +this.xr <= +this.banquetReserve.table_maxnumber.xn) {
						params.xn = this.xr;
					} else {
						Toast('请填写正确的每桌平均人数');
						return;
					}
				}
				if (this.TableTypeArr.indexOf('2') != -1) {
					if (+this.dz && +this.dz <= +this.banquetReserve.table_maxnum.dz) {
						params.dz = this.dz;
					} else {
						Toast('请填写正确的大桌桌数');
						return;
					}
					if (+this.dr && +this.dr <= +this.banquetReserve.table_maxnumber.dn) {
						params.dn = this.dr;
					} else {
						Toast('请填写正确的大桌平均人数');
						return;
					}
				}
				params.banquet_num = this.manNumber;
				if (this.TableTypeArr.indexOf('1') != -1) {
					if (this.banquetStore.xz.length>0) {
						params.xzarr = this.banquetStore.xz;
					} else {
						Toast('请选择小桌菜品');
						return;
					}
				}
				if (this.TableTypeArr.indexOf('2') != -1) {
					if (this.banquetStore.dz.length>0) {
						params.dzarr = this.banquetStore.dz;
					} else {
						Toast('请选择大桌菜品');
						return;
					}
				}
				if (this.TableTypeArr.indexOf('3') != -1) {
					if (this.banquetStore.bj.length>0) {
						params.bjarr = this.banquetStore.bj;
					} else {
						Toast('请选择包间菜品');
						return;
					}
				}
			} else {
				if (this.selectTableCook) {
					params.table_num = this.selectTableCook;
				} else {
					Toast('请填写所需桌数');
					return;
				}
				if (this.selectTab) {
					params.dishes_food = this.selectTab;
				} else {
					Toast('请选择菜品食材准备方式');
					return;
				}
				if (this.selectAddress) {
					params.address = this.selectAddress;
				} else {
					Toast('请选择上门地址');
					return;
				}
				if (this.detailed_address) {
					params.detailed_address = this.detailed_address;
				} else {
					Toast('请填写上门详细地址');
					return;
				}
				params.cook = this.banquetStore.cook;
			}

			// params.
			console.log(params, 'params');
			// return;
			var that = this;
			sendOrderList(params)
				.then(res => {
					Toast(res.message);
					this.$router.push({ name: 'HomeSubmitSuccess', query: { selected: this.selected, selectTab: this.selectTab } });
					that.saveBanquetStore({ key: 'xz', data: [] });
					that.saveBanquetStore({ key: 'dz', data: [] });
					that.saveBanquetStore({ key: 'bj', data: [] });
					that.saveBanquetStore({ key: 'cook', data: [] });
					this.saveBanquetStore({ clear: true });
					this.nameStartTime = null;
					this.selectAddress = '';
					this.selectTypeId = '';
					this.bz = null;
					this.xz = null;
					this.dz = null;
					this.br = null;
					this.xr = null;
					this.dr = null;
					this.selectTypeName = '';
					this.selected = '1';
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		getSelectValue(values) {
			// 宴请类型选择
			console.log(values, 'values');
			this.selectTypeName = values.name;
			this.selectTypeId = values.id;
		},
		// confirmSelectTable() {
		// 	this.bz = null;
		// 	this.xz = null;
		// 	this.dz = null;
		// 	this.br = null;
		// 	this.xr = null;
		// 	this.dr = null;
		// 	this.tablePopup = false;
		// 	console.log(this.TableTypeArr, 'TableTypeArr');
		// },
		// tablePopupCancel() {
		// 	this.tablePopup = false;
		// 	// this.TableTypeArr = [];
		// },
		// 选择地址
		onRegion(picker, values) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			this.address_info.area_info = this.getRegionStr(values);

			this.address_info.area_id = values[2].area_id;
			this.address_info.city_id = values[1].area_id;
			// this.cvalue = null;
			console.log(values);
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
			this.selectAddress = title;
			console.log(title, ';title');
			return title;
		}
	}
};
</script>

<style lang="scss" scoped>
.reserve {
	@mixin flex {
		display: flex;
		justify-content: space-between;
	}
	/deep/.mint-datetime-action {
		color: #fb060d;
	}
	> div.content {
		padding-top: 3.7rem;
	}
	min-height: 100vh;
	background-color: rgba(244, 245, 247, 1);
	padding-bottom: 5rem;
	/deep/.head_title_cont {
		position: fixed;
		width: 100%;
		z-index: 99;
	}
	/deep/.mint-tab-container {
		background-color: #fff;
	}
	.the-title {
		background: #f4f5f7;
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		font-weight: 400;
		color: #6f6f6f;
	}
	.star-red {
		padding-left: 1rem;
		&::before {
			content: '*';
			color: red;
			font-size: 1.2rem;
			position: absolute;
			left: 1.43rem;
			top: 50%;
			transform: translate(0, -50%);
		}
	}
	/deep/.mint-cell {
		min-height: 0;
		&::after {
			left: 4%;
			width: 96%;
			background-color: rgba(239, 239, 239, 1);
		}
		.mint-cell-wrapper {
			padding: 1.19rem 1.43rem;
			.mint-cell-title {
				flex: none;
				.mint-cell-text {
					font-size: 1.05rem;
				}
			}
			.mint-cell-value {
				.mint-navbar {
					.mint-tab-item {
						padding: 0;
						font-size: 1.05rem;
						background: #f4f5f7;
						border-radius: 1.07rem;
						padding: 0.38rem 1.43rem;
						margin-left: 1.43rem;
						border: 0.05rem solid transparent;
						.mint-tab-item-label {
							font-size: 1.05rem;
							margin-top: 0.05rem;
						}
					}
					.is-selected {
						font-weight: 400;
						color: #fb060d;
						background: #ffe3e4;
						border: 0.05rem solid #fb060d;
					}
				}
			}
		}
	}
	.list-type {
		display: flex;
		padding: 0.95rem 1.43rem;
		align-items: center;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 4%;
			width: 96%;
			background-color: rgba(239, 239, 239, 1);
			height: 1px;
		}
		span {
			width: 4rem;
			flex-shrink: 0;
			margin-right: 1rem;
		}
		input {
			font-size: 1.33rem;
			&:nth-child(2) {
				width: 34%;
				margin-right: 2rem;
				border-right: 1px solid #d8d8d8;
			}
			&:nth-child(3) {
				width: 44%;
			}
		}
	}
	.list-cell {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 0.95rem 1.43rem;
		align-items: center;
		position: relative;
		font-size: 1.33rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 4%;
			width: 96%;
			background-color: rgba(239, 239, 239, 1);
			height: 1px;
		}
		span {
			margin-left: 1rem;
			flex-shrink: 0;
			font-size: 1.05rem;
		}
		> div {
			display: flex;
			align-items: center;
			input {
				text-align: right;
				font-size: 1.33rem;
			}
			img {
				height: 1.14rem;
				vertical-align: baseline;
			}
		}
	}
	.list-cell-red {
		> div {
			font-size: 1.24rem;
			font-weight: 400;
			color: #fb060d;
			> img {
				height: 1.05rem;
			}
		}
	}
	.list-cell-start {
		justify-content: flex-start;
		> div {
			width: 100%;
			input {
				width: 100%;
				margin-left: 2rem;
				text-align: left;
				font-size: 1.33rem;
			}
			span {
				color: #6f6f6f;
				padding: 0.38rem 1.43rem;
				background: #f4f5f7;
				border-radius: 1.07rem;
				border: 0.05rem solid transparent;
				&.select {
					color: #fb060d;
					background: #ffe5e5;
					border: 0.05rem solid #fb060d;
				}
			}
		}
	}
	.address {
		padding: 1.43rem;
		textarea {
			box-sizing: border-box;
			height: 9.05rem;
			background: #f4f5f7;
			border-radius: 0.19rem;
			width: 100%;
			padding: 1.43rem;
		}
	}
	.footer {
		background-color: #fff;
		padding: 0.67rem 1.43rem 0.62rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		width: 100%;
		bottom: 0;
		box-sizing: border-box;
		.footer-left {
			display: flex;
			flex-direction: column;
			> span {
				&:nth-child(1) {
					> span {
						&:nth-child(1) {
							font-size: 1.24rem;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #161616;
						}
						&:nth-child(2) {
							font-size: 1.43rem;
							font-family: DIN-Bold, DIN;
							font-weight: bold;
							color: #ff0000;
						}
					}
				}
				&:nth-child(2) {
					font-size: 1.05rem;
					font-weight: 400;
					color: #6f6f6f;
				}
			}
		}
		.submit {
			padding: 0.9rem 2.1rem;
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			border-radius: 1.67rem;
			font-size: 1.14rem;
			font-weight: 400;
			color: #ffffff;
		}
	}

	.receiving-value {
		border-radius: 1.43rem 1.43rem 0rem 0rem;
		height: 67.2%;
		padding: 0 4%;
		box-sizing: border-box;
		> img {
			width: 1.33rem;
			position: absolute;
			right: 1.43rem;
			top: 1.48rem;
		}
		.receiving-value-title {
			text-align: center;
			margin: 1.95rem 0 1.9rem;
			font-size: 1.52rem;
			font-weight: 600;
			color: #161616;
		}

		.line-1 {
			border: 1px solid #efefef;
			margin: 0 -1.43rem 1.9rem;
		}
		.confirm-get {
			position: absolute;
			box-sizing: border-box;
			width: 92%;
			bottom: 2.67rem;
			padding: 0.95rem 0;
			text-align: center;
			font-size: 1.33rem;
			font-weight: 400;
			color: #ffffff;
			text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
			background: linear-gradient(90deg, #ff865d 0%, #fb060d 100%);
			box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
			border-radius: 1.9rem;
		}

		// .way {
		// 	@include flex;
		// 	justify-content: flex-start;
		// 	height: 0.9rem;
		// 	background: #ffffff;
		// 	height: 0.9rem;
		// 	padding: 0.25rem 0;

		// 	font-size: 0.28rem;
		// 	font-family: PingFangSC-Regular, PingFang SC;
		// 	font-weight: 400;
		// 	color: #161616;
		// 	border-bottom: 1px solid #eee;

		// 	.bright {
		// 		color: #ff0000;
		// 		margin-right: 0.05rem;
		// 	}
		> ul {
			@include flex;
			justify-content: flex-start;
			> li {
				margin-left: 1.3rem;
				@include flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
				input {
					width: 100%;
					height: 100%;
					position: absolute;
					font-size: 1.05rem;
				}
				> div {
					@include flex;
					justify-content: center;
					align-items: center;
					img {
						width: 1.22rem;
						height: 1.22rem;
					}
					// &:first-child{
					width: 1.22rem;
					height: 1.22rem;
					background: #edeef0;
					border-radius: 0.1rem;
					margin-right: 0.6rem;
					// }
				}
			}
		}
		// }
	}
	// 菜品列表
	.selected-food-list {
		margin-bottom: 0.95rem;
		> div {
			padding: 1.43rem;
		}
		ul {
			// padding-top: 0.1rem;
			overflow: hidden;
			transition: all 1s;
			padding: 0 1.43rem;
			li {
				@include flex;
				margin-bottom: 1.52rem;
				img {
					width: 5.52rem;
					height: 5.52rem;
					border-radius: 0.38rem;
					margin-right: 0.95rem;
				}
				> div {
					flex: 1;
					@include flex;
					flex-direction: column;
					> span {
						font-size: 1.24rem;
						font-weight: 500;
						color: #161616;
					}
					> div {
						@include flex;
						> span {
							font-size: 1.14rem;
							font-weight: 400;
							color: #6f6f6f;
							&:last-child {
								font-size: 1.24rem;
								font-weight: 500;
								color: #ff0000;
							}
						}
					}
				}
			}
		}
	}

	.ulClose {
		height: 13rem !important;
		overflow-y: hidden;
	}
	// 	.ulClose1 {
	// 		height: 6.5rem!important;
	//         overflow-y: hidden;
	//     }
	.ulClose1 {
		height: 6.5rem !important;
		overflow-y: hidden;
	}
	// 展开
	.open {
		@include flex;
		justify-content: center;
		align-items: center;
		span {
			font-size: 1.14rem;
			font-weight: 400;
			color: #6f6f6f;
		}
		img {
			width: 1.05rem;
			margin-left: 0.43rem;
			// height: 1.05rem;
		}
	}
	.close {
		img {
			transform: rotate(180deg);
		}
	}
	.selectBox {
		div {
			box-sizing: border-box;
		}
		.cont {
			width: 100%;
			// height: 50vh;
			background: #efefef;
			$height: 40px;
			padding-bottom: 30px;
			div {
				height: $height;
				line-height: $height;
				background: #ffffff;
				text-align: center;
				font-size: 14px;
			}
			.head {
				color: #6f6f6f;
				font-size: 12px;
			}
			.center {
				font-weight: 500;
				color: #161616;
				margin-top: 1px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 2.81rem;
				img {
					height: 0.95rem;
				}
			}
			.foot {
				color: #6f6f6f;
				margin-top: 10px;
				font-size: 16px;
			}
		}
	}
}
input::-webkit-input-placeholder {
	color: #c6c6c6;
}
</style>
