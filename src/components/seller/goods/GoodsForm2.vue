<template>
<div  >
	<div class="container goods-form-2 hsy_main" v-show="cropDataShow">
		<!-- <div class="common-header-wrap">
			<mt-header title="商品发布" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<HeadTitle :title="editType?'商品编辑':'商品发布'"></HeadTitle>
		<step :options="options" :active="1"></step>
		<div class="label">商品基本信息</div>
		<mt-cell class="mast_value" title="商品分类" is-link>{{ goods_class.gctag_name }}</mt-cell>
		<!-- <div @click="goClass" class="mast_value">
			<div class="cell-list mint-cell-text">
				<span>商品分类</span>
				<div>
					<span>{{ goods_class.gctag_name }}</span>
					<img src="@/assets/image/icon2/icon-right.png" alt="" />
				</div>
			</div>
		</div> -->
		<!-- <div class="mast_value">
			<div class="cell-list mint-cell-text">
				<span>商品名称</span>
				<div>
					<input type="text" v-model="goods_class.goods_name">
				</div>
			</div>
		</div> -->
		<mt-field class="mast_value" label="商品名称" v-model="goods.goods_name"></mt-field>

		<mt-field v-if="productType" class="mast_value" label="验货人"  v-model="goods.goods_yhren"></mt-field>
		<mt-field label="商品卖点" v-model="goods.goods_advword"></mt-field>
		<div @click="$refs.unitpicker.currentValue = true"><mt-field class="mast_value" label="单位" :readonly="true" v-model="goods_unit_name"></mt-field></div>
		<mt-field type="number" class="mast_value" label="价格" :readonly="ifSpec" v-model="goods.goods_price"></mt-field>
		<mt-field type="number" label="最低价格" v-model="goods.goods_min_price"></mt-field>
		<mt-field type="number" v-if="info.supply_chain == 10" label="供应链折扣" :readonly="ifSpec" v-model="goods.goods_g_price"></mt-field>
		<mt-field label="零售折扣" type="number" @blur.native.capture="changeField($event, '零售折扣')" :readonly="ifSpec" v-model="goods.goods_l_price"></mt-field>
		<mt-field label="批发折扣" type="number" @blur.native.capture="changeField($event, '批发折扣')" :readonly="ifSpec" v-model="goods.goods_p_price"></mt-field>
		<mt-field label="集采折扣" type="number" @blur.native.capture="changeField($event, '集采折扣')" v-if="isjicai" :readonly="ifSpec" v-model="goods.goods_j_price"></mt-field>
		<mt-field label="社区团折扣" type="number" @blur.native.capture="changeField($event, '社区团折扣')" :readonly="ifSpec" v-model="goods.goods_c_price"></mt-field>
		<mt-field label="团长返点" type="number" @blur.native.capture="changeField($event, '团长返点', 1)" :readonly="ifSpec" v-model="goods.goods_b_price"></mt-field>

		<mt-field label="市场价" type="number" v-model="goods.goods_marketprice"></mt-field>
		<mt-field label="成本价" type="number" v-model="goods.goods_costprice"></mt-field>
		<mt-field v-if="$route.query.class_id == 1698" label="选择菜谱" type="text">
			<el-select v-model="menuValue" placeholder="请选择">
				<el-option v-for="item in menuOptions" :key="item.menu_id" :label="item.menu_title" :value="item.menu_id"></el-option>
			</el-select>
		</mt-field>

		<mt-field style="display: none" label="折扣" v-model="goods.goods_discount" readonly></mt-field>
		<mt-field class="mast_value" type="number" :label="productType?'商品库存':'实际重量'" :readonly="ifSpec || editType" v-model="goods.goods_storage"></mt-field>
		<mt-field :label="productType?'库存预警值':'实际重量预警值'" type="number" :readonly="ifSpec" v-model="goods.goods_storage_alarm"></mt-field>
		<mt-field label="商家货号" :readonly="ifSpec" v-model="goods.goods_serial"></mt-field>
		<div v-if="mulSpec" @click="showSpecName = true"><mt-cell title="设置规格名" is-link></mt-cell></div>
		<div v-if="mulSpec" @click="showSpecValue = true"><mt-cell title="设置规格值" is-link></mt-cell></div>
		<mt-cell class="mt-5 mast_value" title="商品图片">
			<div class="user-avatar-wrapper">
				<div v-if="goods.goods_image" class="user-avatar">
					<img :src="goods.goods_image_url" @click="openImage(goods.goods_image_url)" />
					<span @click="dropImage('goods_image')" class="del-btn iconfont">&#xe6d8;</span>
				</div>
				<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadImage('goods_image', $event)">
					<!-- <div class="center-text">相机/相册</div> -->
					<img src="@/assets/image/icon2/icon-empty.png" alt="" />
					<input type="file" accept="image/*" />
				</div>
			</div>
		</mt-cell>
		<div v-if="nosy">
			<div class="label">商品安全信息</div>
			<!-- 冷链 -->
			<div class="cold" v-if="!productType">
				<mt-field class="mast_value" label="生产批次" :readonly="editType" v-model="goods.batch_number"></mt-field>
					
				<mt-cell  class="mast_value mt-5" v-if="!productType" title="食品流入地类型">					
					<div class="way">
						<ul>
							<li @click='changePortProvince(1)'>
								<div>
									<img v-show="goods.port_province == 1" src="@/assets/image/icon2/icon-select.png" alt="">
								</div>
								<span>口岸</span>
							</li>
							<li @click="changePortProvince(2)">
								<div>
									<img v-show="goods.port_province ==2" src="@/assets/image/icon2/icon-select.png" alt="">
								</div>
								<span>省份</span>
							</li>
						</ul>
					</div>
				</mt-cell>


				<mt-field class="mast_value" label="食品流入地名称" :readonly="editType" v-model="goods.access_information"></mt-field>
				<mt-field class="mast_value" label="报关单号" :readonly="editType" v-model="goods.odd_numbers"></mt-field>
				<div @click="onDate4(false)">
					<mt-cell class="mast_value" title="入境日期" is-link>{{ goods.entry_date}}</mt-cell>
				</div>
				<mt-field class="mast_value" label="入境口岸" :readonly="editType" v-model="goods.entry_ka"></mt-field>

				<mt-field class="mast_value" label="来源地冷库" :readonly="editType" v-model="goods.sourcecold_storage"></mt-field>
				<mt-field class="mast_value" label="储存冷库" :readonly="editType" v-model="goods.cold_storage"></mt-field>
				<div @click="onDate4(true)">
					<mt-cell class="mast_value" title="入库日期" is-link>{{ goods.join_warehouse_time}}</mt-cell>
				</div>
				<mt-field class="mast_value" label="原产国" :readonly="editType" v-model="goods.goods_chandi"></mt-field>

				<mt-field class="mast_value" label="报检重量" :readonly="editType" v-model="goods.inspection_weight"></mt-field>
				<mt-field class="mast_value" label="收货人" :readonly="editType" v-model="goods.consignee"></mt-field>
				<mt-field class="mast_value" label="发货人" :readonly="editType" v-model="goods.consignor"></mt-field>
				<mt-field class="mast_value" label="规格"  type="textarea" :readonly="editType" v-model="goods.specifications"></mt-field>
			</div>
			<!-- 冷链结束 -->

			<mt-field v-if="productType" class="mast_value" label="产地" :readonly="editType" v-model="goods.goods_chandi"></mt-field>
			<div  v-if="productType" @click="onDate4(false)">
				<mt-cell class="mast_value" title="生产日期" is-link>{{ goods.goods_scdate ? $moment.unix(goods.goods_scdate).format('YYYY-MM-DD') : '' }}</mt-cell>
				<!-- <div class="cell-list mast_value">
					<span>生产日期</span>
					<div>
						<span>{{ goods.goods_scdate ? $moment.unix(goods.goods_scdate).format('YYYY-MM-DD') : '' }}</span>
						<img src="@/assets/image/icon2/icon-right.png" alt="" />
					</div>
				</div> -->
			</div>
			<div v-if="productType" @click="qualifyShow">
				<mt-cell :class="{ mast_value: qualifyState }" title="食品合格证" is-link>{{ certificate_no ? certificate_no : certificate_no == null ? '已选中' : '' }}</mt-cell>
			</div>
			<qualify-checklist ref="qualify" @onQualifyChoose="fun_receiveQualify" />
			<mt-cell  v-if="productType" :class="{ mast_value: !isProduce }" class="mt-5" title="产地证明">
				<div class="user-avatar-wrapper">
					<div v-if="goods.goods_chandipic" class="user-avatar">
						<img :src="goods.goods_chandipic_url" @click="openImage(goods.goods_chandipic_url)" />
						<span v-if="!editType" @click="dropImage('goods_chandipic')" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadImage('goods_chandipic', $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
			</mt-cell>
			<mt-field :class="{ mast_value: !isProduce }" label="供货商" :readonly="editType" v-model="goods.goods_gonghuo"></mt-field>
			<mt-cell :class="{ mast_value: !isProduce }" class="mt-5" :title="!productType?'供货商证明':'购货证明'">
				<div class="user-avatar-wrapper">
					<div v-if="goods.goods_gonghuopic" class="user-avatar">
						<img :src="goods.goods_gonghuopic_url" @click="openImage(goods.goods_gonghuopic_url)" />
						<span  v-if="!editType" @click="dropImage('goods_gonghuopic')" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadImage('goods_gonghuopic', $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
			</mt-cell>
			<mt-field v-if="!productType" class="mast_value" label="检验证书编号" :readonly="editType" v-model="goods.goods_jianyan_no"></mt-field>
			<mt-cell class="mt-5 mast_value" :title="!productType?'检验合格证明':(isChivesEggs?'韭菜鸡蛋合格证':'检验证书')">
				<div class="user-avatar-wrapper">
					<div v-if="goods.goods_jianyan" class="user-avatar">
						<img :src="goods.goods_jianyan_url" @click="openImage(goods.goods_jianyan_url)" />
						<span  v-if="!editType" @click="dropImage('goods_jianyan')" class="del-btn iconfont">&#xe6d8;</span>
					</div>
					<div v-else class="user-avatar avatar-empty" ref="upload_btn1" @change="uploadImage('goods_jianyan', $event)">
						<!-- <div class="center-text">相机/相册</div> -->
						<img src="@/assets/image/icon2/icon-empty.png" alt="" />
						<input type="file" accept="image/*" />
					</div>
				</div>
			</mt-cell>
			<mt-field label="车牌号" placeholder="例如：鲁A88888" :readonly="editType&&!!goods.license_plate" v-model="goods.license_plate"></mt-field>
		</div>
		<div class="label">商品详情描述</div>
		<div v-if="ifAttr" @click="showAttr = true"><mt-cell title="商品属性" is-link></mt-cell></div>
		<div @click="showDesc = true"><mt-cell title="商品描述" is-link></mt-cell></div>
		<div @click="showBrand = true">
			<mt-cell title="商品品牌" is-link>{{ goods.brand_name }}</mt-cell>
		</div>
		<div class="label">特殊商品</div>
		<div v-if="goods_class.gc_virtual">
			<mt-cell title="虚拟商品"><mt-switch v-model="goods.is_virtual"></mt-switch></mt-cell>
			<div v-if="goods.is_virtual">
				<div @click="onDate">
					<mt-cell title="虚拟商品有效期" is-link>{{ virtual_indate ? $moment.unix(virtual_indate).format('YYYY-MM-DD') : '' }}</mt-cell>
				</div>
				<mt-field label="购买上限" v-model="goods.virtual_limit"></mt-field>
				<mt-cell title="支持过期退款"><mt-switch v-model="goods.virtual_invalid_refund"></mt-switch></mt-cell>
			</div>
		</div>
		<div v-if="!goods.is_virtual">
			<mt-cell title="F码商品"><mt-switch v-model="goods.is_goodsfcode"></mt-switch></mt-cell>
			<div v-if="goods.is_goodsfcode">
				<mt-field label="生成F码数量" v-model="g_fccount"></mt-field>
				<mt-field label="F码前缀" v-model="g_fcprefix"></mt-field>
			</div>
			<mt-cell title="预售"><mt-switch v-model="goods.is_presell"></mt-switch></mt-cell>
			<div v-if="goods.is_presell" @click="onDate2">
				<mt-cell title="发货日期" is-link>{{ presell_deliverdate ? $moment.unix(presell_deliverdate).format('YYYY-MM-DD') : '' }}</mt-cell>
			</div>
		</div>

		<div class="label">商品物流信息</div>
		<div @click="onRegion"><mt-cell title="地区" :value="area_info" is-link></mt-cell></div>
		<mt-cell title="固定运费"><mt-switch v-model="ifFixedFreight"></mt-switch></mt-cell>
		<mt-field v-if="ifFixedFreight" label="运费" v-model="goods.goods_freight"></mt-field>
		<div v-if="!ifFixedFreight" @click="showTransportList = true">
			<mt-cell title="售卖区域" :value="area_info" is-link>{{ goods.transport_title }}</mt-cell>
		</div>
		<div class="label">发票信息</div>
		<mt-cell title="开增值税发票"><mt-switch v-model="goods.goods_vat"></mt-switch></mt-cell>
		<div class="label">其他信息</div>
		<div @click="showClass = true"><mt-cell title="本店分类" is-link></mt-cell></div>
		<mt-cell title="立即发布"><mt-switch v-model="goods.goods_state"></mt-switch></mt-cell>
		<div v-if="!goods.goods_state" @click="onDatetime">
			<mt-cell title="发布时间" is-link>{{ goods_shelftime ? $moment.unix(goods_shelftime).format('YYYY-MM-DD HH:mm') : '' }}</mt-cell>
		</div>
		<mt-cell title="预约"><mt-switch v-model="goods.is_appoint"></mt-switch></mt-cell>
		<div v-if="goods.is_appoint" @click="onDate3">
			<mt-cell title="发售日期" is-link>{{ appoint_satedate ? $moment.unix(appoint_satedate).format('YYYY-MM-DD') : '' }}</mt-cell>
		</div>

		<mt-cell title="商品推荐"><mt-switch v-model="goods.goods_commend"></mt-switch></mt-cell>
		<!-- <mt-button size="large" type="primary" class="mt-30" @click="nextStep">{{ commonid ? '保存' : '下一步' }}</mt-button> -->
		<div class="add-button" @click="nextStep"><span>{{ editType ? '保存' : '下一步' }}</span></div>
		<div>
			<mt-popup v-model="isshow" popup-transition="popup-fade" class="popup"><img :src="showimage" :style="getBannerStyle" @click="isshow = false" /></mt-popup>
			<mt-popup v-model="showSpecAdd">
				<mt-field v-model="spec_add_value" placeholder="请输入规格值"></mt-field>
				<mt-button size="large" type="primary" class="mt-10" @click="goodsSpecAdd()">确定</mt-button>
			</mt-popup>
			<mt-popup class="middle-popup" v-model="bodyEditVisible" popup-transition="popup-fade">
				<mt-field v-if="bodyItem.type == 'text'" placeholder="请输入内容" v-model="bodyItem.value" type="textarea" />
				<div v-if="bodyItem.type == 'image'" class="user-avatar iconfont icon-xiangji" ref="upload_btn" @change="uploadImage('goods_body', $event)">
					<img :src="bodyItem.value_url" />
					<input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg" />
				</div>
			</mt-popup>
			<mt-popup class="middle-popup type-popup" v-model="bodyAddVisible" popup-transition="popup-fade">
				<mt-cell title="类型"><mt-radio v-model="bodyType" :options="bodyTypeOptions"></mt-radio></mt-cell>

				<div class="btn-wrapper">
					<mt-button class="btn" type="default" @click="bodyAddVisible = false">取消</mt-button>
					<mt-button class="btn" type="primary" @click="confirmBodyAdd">确定</mt-button>
				</div>
			</mt-popup>
		</div>
		<div>
			<mt-popup v-model="showBrand" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="品牌" class="common-header">
						<mt-button slot="left" icon="back" @click="showBrand = false"></mt-button>
						<mt-button
							slot="right"
							@click="
								showBrand = false;
								goods.brand_id = 0;
								goods.brand_name = '';
							"
						>
							取消
						</mt-button>
					</mt-header>
				</div>
				<div class="common-popup-content">
					<div class="brand-list">
						<div v-for="(bclass, index) in brand_list" :key="index">
							<h2>{{ index }}</h2>
							<ul>
								<li v-for="item in bclass" v-bind:key="item.brand_id" @click="selectBrand(item.brand_id, item.brand_name)">
									<div class="p-img" :style="{ backgroundImage: 'url(' + item.brand_pic + ')' }"></div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</mt-popup>

			<mt-popup v-model="showTransportList" position="right" class="common-popup-wrapper">
				<transport-list
					ref="transportList"
					:ifComponent="true"
					@useTransport="useTransport"
					@editTransport="editTransport"
					@addTransport="
						transparentQuery = { action: 'add', transport_id: 0 };
						showTransportForm = true;
					"
					@closeTransortList="showTransportList = false"
				/>
			</mt-popup>
			<mt-popup v-model="showTransportForm" position="right" class="common-popup-wrapper">
				<transport-form :query="transparentQuery" :ifComponent="true" @saveTransport="saveTransport" @closeTransortForm="showTransportForm = false" />
			</mt-popup>
			<mt-popup v-model="showClass" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="店铺分类" class="common-header">
						<mt-button slot="left" icon="back" @click="showClass = false"></mt-button>
						<mt-button slot="right" @click="addStoreClass">新增</mt-button>
					</mt-header>
				</div>
				<div class="common-popup-content">
					<div
						v-for="(item, index) in sgcate_id"
						:key="index"
						@click="
							showClassPicker = true;
							sgcate_index = index;
						"
					>
						<mt-cell title="选择分类" is-link>{{ sgcate_name[index] }}</mt-cell>
					</div>
				</div>
			</mt-popup>
			<mt-popup v-model="showSpecValue" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="设置规格值" class="common-header"><mt-button slot="left" icon="back" @click="calcSpec()"></mt-button></mt-header>
				</div>
				<div class="common-popup-content">
					<div v-for="(spvalue_key, k) in specArray.spvalue_key" :key="k">
						<div class="label">{{ spec[spvalue_key].label }}</div>
						<mt-field class="mast_value" label="价格" v-model="spec[spvalue_key].goods_price"></mt-field>
						<mt-field v-if="info.supply_chain == 10" label="供应链折扣" @blur.native.capture="fun_PriceToast($event, spvalue_key, 10)" v-model="spec[spvalue_key].goods_g_price"></mt-field>
						<mt-field type="number" label="零售折扣" @blur.native.capture="fun_PriceToast($event, spvalue_key, 1)" v-model="spec[spvalue_key].goods_l_price"></mt-field>
						<mt-field type="number" label="批发折扣" @blur.native.capture="fun_PriceToast($event, spvalue_key, 2)" v-model="spec[spvalue_key].goods_p_price"></mt-field>
						<mt-field
							type="number"
							label="社区团折扣"
							@blur.native.capture="fun_PriceToast($event, spvalue_key, 3)"
							v-model="spec[spvalue_key].goods_c_price"
						></mt-field>
						<mt-field
							type="number"
							label="集采折扣"
							@blur.native.capture="fun_PriceToast($event, spvalue_key, 4)"
							v-if="isjicai"
							v-model="spec[spvalue_key].goods_j_price"
						></mt-field>
						<mt-field type="number" label="团长返点" @blur.native.capture="fun_PriceToast($event, spvalue_key, 5)" v-model="spec[spvalue_key].goods_b_price"></mt-field>
						<mt-field type="number" label="市场价" v-model="spec[spvalue_key].goods_marketprice"></mt-field>
						<mt-field type="number" class="mast_value" :label="productType?'商品库存':'实际重量'" v-model="spec[spvalue_key].goods_storage"></mt-field>
						<mt-field type="number" :label="productType?'库存预警值':'实际重量预警值'" v-model="spec[spvalue_key].goods_storage_alarm"></mt-field>
						<mt-field label="商家货号" v-model="spec[spvalue_key].goods_serial"></mt-field>
					</div>
				</div>
			</mt-popup>
			<mt-popup v-model="showDesc" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="商品描述" class="common-header"><mt-button slot="left" icon="back" @click="showDesc = false"></mt-button></mt-header>
				</div>
				<div class="common-popup-content">
					<div class="body-list">
						<div class="body-item" v-for="(item, index) in bodyList" :key="index">
							<div v-if="item.type == 'text'">{{ item.value ? item.value : '请输入内容' }}</div>
							<div v-if="item.type == 'image'">
								<img v-if="item.value" :src="item.value_url" />
								<span v-else>请上传图片</span>
							</div>
							<div class="btn-list">
								<!--上移-->
								<i class="iconfont" v-show="index != 0" @click="bodyMove(index, 'up')">&#xe648;</i>
								<!--下移-->
								<i class="iconfont" v-show="index != bodyList.length - 1" @click="bodyMove(index, 'down')">&#xe643;</i>
								<!--插入-->
								<i class="iconfont" @click="bodyAdd(index)">&#xe69c;</i>
								<!--编辑-->
								<i class="iconfont" @click="bodyEdit(index, item)">&#xe658;</i>
								<!--删除-->
								<i class="iconfont" v-show="index != bodyList.length - 1" @click="bodyDel(index)">&#xe641;</i>
							</div>
						</div>
					</div>
				</div>
			</mt-popup>
			<mt-popup v-model="showAttr" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="商品属性" class="common-header"><mt-button slot="left" icon="back" @click="showAttr = false"></mt-button></mt-header>
				</div>
				<div class="common-popup-content" v-if="attr_list">
					<div v-for="(item, index) in attr_list" :key="index" @click="popAttr(index)">
						<mt-cell :title="item.attr_name" is-link>{{ attrValue[index] }}</mt-cell>
					</div>
				</div>
			</mt-popup>
			<mt-popup v-model="showSpecName" position="right" class="common-popup-wrapper">
				<div class="common-header-wrap">
					<mt-header title="设置规格名" class="common-header"><mt-button slot="left" icon="back" @click="hideSpecName()"></mt-button></mt-header>
				</div>
				<div class="common-popup-content" v-if="spec_list">
					<div v-for="(val, k) in spec_list" :key="k">
						<mt-field v-model="sp_name[k]"></mt-field>
						<mt-checklist v-model="sp_val[k]" :options="sp_option[k]"></mt-checklist>
						<mt-button
							size="large"
							type="primary"
							class="mt-10"
							@click="
								sp_id = k;
								showSpecAdd = true;
							"
						>
							添加规格值
						</mt-button>
					</div>
				</div>
			</mt-popup>
		</div>
		<div>
			<mt-popup v-model="showClassPicker" position="bottom">
				<mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
					<div class="toolbar">
						<button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
						<div class="picker-header">选择分类</div>
						<button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
					</div>
				</mt-picker>
			</mt-popup>

			<mt-popup v-for="(item, index) in attrList" :key="index" v-model="showAttrValue[index]" position="bottom">
				<mt-picker :ref="'attr_picker_' + index" :slots="attrList[index]" valueKey="attrvalue_name" showToolbar>
					<div class="toolbar">
						<button class="toolbar-item cancel-item" @click="cancelAttr(index)">取消</button>
						<div class="picker-header">选择属性</div>
						<button class="toolbar-item confirm-item" @click="confirmAttr(index)">确定</button>
					</div>
				</mt-picker>
			</mt-popup>
			<mt-datetime-picker
				ref="datetimePicker"
				type="datetime"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				hourFormat="{value}时"
				minuteFormat="{value}分"
				:value="goods_shelftime ? new Date(goods_shelftime) : new Date()"
				@confirm="datetimeConfirm"
				@cancel="goods_shelftime = 0"
			></mt-datetime-picker>
			<region-picker ref="picker" @onConfirm="onPickerConfirm" @onCancel="area_info = ''"></region-picker>
			<unit-picker ref="unitpicker" @onConfirmUnit="onUnit"></unit-picker>
			<mt-datetime-picker
				ref="datePicker"
				type="date"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="virtual_indate ? new Date(virtual_indate) : new Date()"
				@confirm="dateConfirm"
			></mt-datetime-picker>
			<mt-datetime-picker
				ref="datePicker2"
				type="date"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="presell_deliverdate ? new Date(presell_deliverdate) : new Date()"
				@confirm="dateConfirm2"
			></mt-datetime-picker>
			<mt-datetime-picker
				ref="datePicker3"
				type="date"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="appoint_satedate ? new Date(appoint_satedate) : new Date()"
				@confirm="dateConfirm3"
			></mt-datetime-picker>
			<mt-datetime-picker
				ref="datePicker4"
				type="date"
				:startDate="new Date(new Date() - new Date(1000 * 60 * 60 * 24 * 365 * 10))"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="goods.goods_scdate ? new Date(goods.goods_scdate) : new Date()"
				@confirm="dateConfirm4"
			></mt-datetime-picker>
		</div>
		
	</div>
	<crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img>
</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle.vue';
import { mapState, mapMutations } from 'vuex';
import { Toast, MessageBox } from 'mint-ui';
import Step from '../../Step';
import transportList from '../transport/transportList';
import transportForm from '../transport/transportForm';
import RegionPicker from '../../../components/RegionPicker';
import UnitPicker from '../UnitPicker.vue';
import { getTransportList } from '../../../api/sellerTransport';
import { getBrandList } from '../../../api/homesearch';
import { getCommonData, goodsEdit, goodsSpecAdd, uploadInfoFile, goodsSave, uploadGoodsCropImg } from '../../../api/sellerGoods';
import { getGoodsClassTree } from '../../../api/sellerGoodsClass';
import { getMenuInfo } from '@/api/homeMenu';
import '@/assets/style/hsy-mint.scss';
import QualifyChecklist from '../QualifyChecklist';

import CropImg from '../../CropImg'

export default {
	data() {
		return {
			join_warehouse_time:false,  // 入库日期
			
			productType: true,  // 发布商品类型 ( true/正常 发布)  (false/冷链商品)

			cropImgIndex:null,    // 裁切的图片名称
			cropDataShow:true,    // 切换 插件 隐藏 表单页面
			
			goods_unit_name: '',
			options: [{ title: '选择商品分类' }, { title: '填写商品详情' }, { title: '上传商品图片' }],
			ifLoad: 0,
			isjicai: false, //集采折扣 是否展示
			class_id: this.$route.query.class_id,
			commonid: this.$route.query.commonid,
			editType: this.$route.query.editType,  // 编辑？
			goods: { goods_state: true },  // 车牌号

			showSpecName: false,
			showSpecValue: false,
			showSpecAdd: false,
			showDesc: false,
			showBrand: false,
			showClass: false,
			showTransportList: false,
			showTransportForm: false,
			showClassPicker: false,
			showAttr: false,
			selectAttr: {},
			ifAttr: false,
			nosy: true,
			showAttrValue: {},
			attrValue: {},
			attrList: {},
			ifSpec: false,
			mulSpec: false,
			showimage: '',
			isshow: false,
			goods_shelftime: 0,
			virtual_indate: 0,
			presell_deliverdate: 0,
			appoint_satedate: 0,
			goods_scdate: 0,
			sp_val: {},
			sp_name: {},
			sp_option: {},
			spec_list: false,
			spec_json: false,
			attr_list: false,
			sp_id: 0,
			spec_add_value: '',
			specArray: false,
			spec: {},
			bodyVisible: false,
			bodyIndex: 0,
			bodyList: [
				{
					type: 'text',
					value: ''
				}
			],
			bodyItem: false,
			bodyEditVisible: false,
			bodyAddVisible: false,
			bodyTypeOptions: [
				{
					label: '文字',
					value: 'text'
				},
				{
					label: '图片',
					value: 'image'
				}
			],
			bodyType: 'text',
			area_info: '',
			ifFixedFreight: true,
			brand_list: {},
			g_fccount: '',
			g_fcprefix: '',
			transport_list: [],
			transparentQuery: { action: 'add', transport_id: 0 },
			items: false,
			sgcate_id: [0],
			sgcate_name: [''],
			sgcate_index: 0,
			goods_class: {},
			attr_checked: false,
			spec_checked: false,
			certificate_goods: null, //合格证ID
			certificate_no: '', //合格证编号
			certificate_num: '', //合格证商品数量
			menuOptions: [],
			menuValue: ''
		};
	},

	created() {
		getMenuInfo()
			.then(res => {
				// debugger
				this.menuOptions = res.result.result;
				// console.log(this.menuOptions,'this.menuOptions')
			})
			.catch(error => {
				Toast(error.message);
			});

		getGoodsClassTree()
			.then(res => {
				this.items = res.result.class_list;
			})
			.catch(error => {
				Toast(error.message);
			});
		getTransportList()
			.then(res => {
				this.transport_list = res.result.transport_list;
			})
			.catch(error => {
				Toast(error.message);
			});
		getBrandList(0)
			.then(res => {
				this.brand_list = res.result.brand_l;
			})
			.catch(function(error) {
				Toast(error.message);
			});
		getCommonData(this.class_id)
			.then(res => {
				var spec_list = res.result.spec_list;
				var attr_list = res.result.attr_list;
				if (attr_list && Object.keys(attr_list).length) {
					this.ifAttr = true;
					this.attr_list = attr_list;
					for (var i in attr_list) {
						this.attrList[i] = [
							{
								flex: 1,
								values: attr_list[i].value,
								textAlign: 'center'
							}
						];
					}
				}
				var sp_option = {};

				if (spec_list && Object.keys(spec_list).length) {
					this.mulSpec = true;
					for (var k in spec_list) {
						var val = spec_list[k];
						sp_option[k] = [];
						this.sp_val[k] = [];
						if (typeof this.sp_name[k] === 'undefined') {
							this.sp_name[k] = val.sp_name;
						}
						for (var j in val.value) {
							sp_option[k].push({
								label: val.value[j].spvalue_name,
								value: val.value[j].spvalue_id
							});
						}
					}
				}
				this.goods_class = res.result.goods_class;
				this.spec_json = res.result.spec_json;
				this.sp_option = sp_option;
				this.spec_list = spec_list;
				//------------------------------------------------------
				// 集采折扣展示改为false
				this.isjicai = false;
				// 如果是 集批商户  而且 是集批标示的商品
				var s = this.goods_class.j_identification;
				if (this.mclass == 6 && s == 2) {
					// 集采折扣展示
					this.isjicai = true;
				}

				//-------------------------------------------------------
				if (!this.goods_class.gc_id) {
					Toast('请重新选择分类');
					this.$router.push({ name: 'SellerGoodsForm1', query: { commonid: this.commonid } });
				}
				this.ifLoad++;

				(res.result.goods_class.gc_id_1 == 1703)?( this.productType = false,this.goods.port_province=1 ):'';
			})
			.catch(error => {
				Toast(error.message);
			});
		if (this.commonid) {
			goodsEdit(this.commonid)
				.then(res => {
					if (res.result.certificate_info) {
						this.certificate_no = res.result.certificate_info.certificate_no;
						this.certificate_goods = res.result.certificate_info.certificate_id;
						this.certificate_num = res.result.certificate_info.product_num;
					}
					var spec_checked = res.result.spec_checked;
					this.attr_checked = res.result.attr_checked;
					var goods = res.result.goods;
					//====================

					this.nosy = true;
					if (goods.goods_suyuan != '') {
						var s = goods.goods_suyuan;
						//alert(s)
						//alert(s.indexOf("|"))
						if (s && s.indexOf('|') != -1) {
							this.nosy = false;
							//alert(s.indexOf("|"))
						}
					}
					// 如果 由单位名称 单位ID
					this.goods_unit_name = goods.goods_unit_name;
					goods.goods_unit_id = goods.goods_unit;

					goods.is_virtual = !!goods.is_virtual;
					goods.is_goodsfcode = !!goods.is_goodsfcode;
					goods.is_presell = !!goods.is_presell;
					goods.goods_vat = !!goods.goods_vat;
					goods.goods_state = !!goods.goods_state;
					goods.is_appoint = !!goods.is_appoint;
					goods.goods_commend = !!goods.goods_commend;
					goods.virtual_invalid_refund = !!goods.virtual_invalid_refund;
					if (goods.mb_body) {
						this.bodyList = goods.mb_body;
					}
					this.ifFixedFreight = !goods.transport_id;
					this.goods_shelftime = goods.goods_shelftime;
					this.virtual_indate = goods.virtual_indate;
					this.goods = goods;

					if (goods.spec_name) {
						for (var k in goods.spec_name) {
							this.sp_name[k] = goods.spec_name[k];
						}
					}

					this.area_info = res.result.area ? res.result.area.area_name : '';
					var sp_value = res.result.sp_value;
					var jcprice;

					for (var i in sp_value) {
						if (this.isjicai) {
							jcprice = sp_value[i]['jprice'];
						} else {
							jcprice = 0;
						}

						this.spec[i] = {
							goods_id: sp_value[i]['id'],
							label: sp_value[i]['label'],
							color: sp_value[i]['color'],
							sp_value: sp_value[i]['sp_value'],
							goods_marketprice: sp_value[i]['marketprice'],
							goods_price: sp_value[i]['price'],
							goods_c_price: sp_value[i]['cprice'],
							goods_l_price: sp_value[i]['lprice'],
							goods_b_price: sp_value[i]['bprice'],
							goods_j_price: jcprice,
							goods_p_price: sp_value[i]['pprice'],
							goods_storage_alarm: sp_value[i]['alarm'],
							goods_serial: sp_value[i]['sku'],
							goods_storage: sp_value[i]['stock']
						};
					}

					this.spec_checked = spec_checked;
					this.sgcate_id = res.result.store_class_goods;
					let store_goods_class = res.result.store_goods_class;
					for (var i in this.sgcate_id) {
						if (store_goods_class[this.sgcate_id[i]]) {
							this.sgcate_name[i] = store_goods_class[this.sgcate_id[i]].storegc_name;
						}
					}
					this.ifLoad++;
				})
				.catch(error => {
					Toast(error.message);
				});
		}
	},
	computed: {
		...mapState({
			mclass: state => state.member.mclass,
			info: state => state.seller.info
		}),

		// 是否是 三种特殊身份
		qualifyState: function() {
			return this.utils.isSpecialIdentity(this.info.storeclass_id);
		},

		// 是否是 生产企业
		isProduce() {
			return this.info.storeclass_id == '29';
		},

		// 是否 发布的是 韭菜1019 鸡蛋 1297
		isChivesEggs(){
			return this.class_id == 1019 || this.class_id== 1297;
		},

		getBannerStyle: function() {
			const { width, height } = window.screen;
			let itemWidth = width;
			let itemHeight = height;
			return {
				maxWidth: itemWidth + 'px',
				maxHeight: itemHeight + 'px'
			};
		},
		buildItems: function() {
			if (!this.items || !this.items[0]) {
				return [];
			}
			let items = new Array();

			this.getDefaultItems(this.items, items);
			return items;
		}
	},
	components: {
		Step,
		RegionPicker,
		transportForm,
		transportList,
		HeadTitle,
		'qualify-checklist': QualifyChecklist,
		'unit-picker': UnitPicker,
		"crop-img": CropImg
	},
	watch: {
		ifLoad: function() {
			if (this.attr_checked && this.attr_list && Object.keys(this.attr_checked).length && Object.keys(this.attr_list).length) {
				for (var i in this.attr_list) {
					for (var j in this.attr_list[i].value) {
						if (this.attr_checked.indexOf(this.attr_list[i].value[j].attrvalue_id) > -1) {
							this.attrValue[i] = this.attr_list[i].value[j].attrvalue_name;
						}
					}
				}
			}
			if (this.spec_checked && Object.keys(this.spec_checked).length && this.spec_json && Object.keys(this.spec_json).length) {
				this.ifSpec = true;
				var spvalue_ids = Object.keys(this.spec_checked);
				for (var i in this.spec_json) {
					var temp = Object.keys(this.spec_json[i]);
					var arr = temp.filter(function(v) {
						return spvalue_ids.indexOf(v) !== -1; // 利用filter方法来遍历是否有相同的元素
					});
					if (arr.length) {
						this.sp_val[i] = arr;
					}
				}
				this.getSpecArray();
			}
			this.$forceUpdate();
		}
	},
	methods: {
		// 供应链 口岸
		changePortProvince(v){
			( !this.editType )?(this.goods.port_province = v,this.$forceUpdate()):'';
		},

		fun_PriceToast(e, index, who) {
			if (!e.target.value) {
				return false;
			}
			this.$forceUpdate();
			if (who == 1) {
				if (Number(this.spec[index].goods_l_price) > 1 || Number(this.spec[index].goods_l_price) < 0) {
					var obj = this.spec[index];
					obj.goods_l_price = '';
					this.$set(this.spec, index, obj);
					Toast('零售折扣介于0~1之间');
				}
			} else if (who == 10) {	
				if( this.info.supply_chain == 10 ){
					if (Number(this.spec[index].goods_g_price) > 1 || Number(this.spec[index].goods_g_price) < 0) {
						var obj = this.spec[index];
						obj.goods_g_price = '';
						this.$set(this.spec, index, obj);
						Toast('供应链折扣介于0~1之间');
					}
				}
			} else if (who == 2) {
				if (Number(this.spec[index].goods_p_price) > 1 || Number(this.spec[index].goods_p_price) < 0) {
					var obj = this.spec[index];
					obj.goods_p_price = '';
					this.$set(this.spec, index, obj);
					Toast('批发折扣介于0~1之间');
				}
			} else if (who == 3) {
				if (Number(this.spec[index].goods_c_price) > 1 || Number(this.spec[index].goods_c_price) < 0) {
					var obj = this.spec[index];
					obj.goods_c_price = '';
					this.$set(this.spec, index, obj);
					Toast('团购折扣介于0~1之间');
				}
			} else if (who == 4) {
				if (Number(this.spec[index].goods_j_price) > 1 || Number(this.spec[index].goods_j_price) < 0) {
					var obj = this.spec[index];
					obj.goods_j_price = '';
					this.$set(this.spec, index, obj);
					Toast('集采折扣介于0~1之间');
				}
			} else if (who == 5) {
				if (Number(this.spec[index].goods_b_price) > 0.3 || Number(this.spec[index].goods_b_price) < 0.01) {
					var obj = this.spec[index];
					obj.goods_b_price = '';
					this.$set(this.spec, index, obj);
					Toast('团长返点介于0.01~0.3之间');
				}
			}
			this.$forceUpdate();
		},

		qualifyShow() {
			if ( !this.editType ) {
				this.$refs.qualify.showState = true;
			}
		},
		fun_receiveQualify(item) {
			this.certificate_num = item.product_num;
			this.certificate_goods = item.certificate_id;
			this.certificate_no = item.certificate_no;
		},
		changeField(e, name, tuan) {
			if (!e.target.value) {
				return false;
			}
			if (tuan == 1) {
				if (e.target.value > 0.3 || e.target.value < 0.01) {
					Toast('团长返点介于0.01~0.3之间');
					this.goods.goods_b_price = null;
				}
			} else if (e.target.value > 1 || e.target.value < 0) {
				switch (name) {
					case '零售折扣':
						this.goods.goods_l_price = null;
						break;
					case '批发折扣':
						this.goods.goods_p_price = null;
						break;
					case '集采折扣':
						this.goods.goods_j_price = null;
						break;
					case '社区团折扣':
						this.goods.goods_c_price = null;
						break;
				}
				Toast(name + '介于0~1之间');
			}
		},
		hideSpecName() {
			this.showSpecName = false;
			this.checkSpec();
			this.calcSpec();
		},
		goClass() {
			this.$router.push({ name: 'SellerGoodsForm1', query: { commonid: this.commonid } });
		},
		popAttr(index) {
			this.showAttrValue[index] = true;
			this.$forceUpdate();
		},
		selectBrand(brand_id, brand_name) {
			this.goods.brand_name = brand_name;
			this.goods.brand_id = brand_id;
			this.showBrand = false;
		},
		calcSpec() {
			let min_price;
			let min_bprice;
			let min_cprice;
			let min_pprice;
			let min_jprice;
			let min_lprice;
			let min_marketprice;
			let total_storage = 0;
			let goods_storage_alarm = 0;
			let goods_serial;
			for (var j in this.specArray.spvalue_key) {
				var i = this.specArray.spvalue_key[j];
				var temp = parseFloat(this.spec[i].goods_price);
				if (!isNaN(temp) && (typeof min_price === 'undefined' || min_price > temp)) {
					min_price = temp;
					min_marketprice = this.spec[i].goods_marketprice;
					min_pprice = this.spec[i].goods_p_price;
					min_bprice = this.spec[i].goods_b_price;
					min_cprice = this.spec[i].goods_c_price;
					min_jprice = this.spec[i].goods_j_price;
					min_lprice = this.spec[i].goods_l_price;
					goods_storage_alarm = this.spec[i].goods_storage_alarm;
					goods_serial = this.spec[i].goods_serial;
				}
				if (!isNaN(this.spec[i].goods_storage) && this.spec[i].goods_storage > 0) {
					total_storage += parseInt(this.spec[i].goods_storage);
				}
			}
			if (!this.isjicai) {
				min_jprice = 0;
			}

			this.goods.goods_serial = goods_serial;
			this.goods.goods_price = min_price;
			this.goods.goods_p_price = min_pprice;
			this.goods.goods_b_price = min_bprice;
			this.goods.goods_c_price = min_cprice;
			this.goods.goods_j_price = min_jprice;
			this.goods.goods_l_price = min_lprice;
			this.goods.goods_marketprice = min_marketprice;
			this.goods.goods_storage_alarm = goods_storage_alarm;
			this.goods.goods_storage = total_storage;
			this.showSpecValue = false;
		},
		checkSpec() {
			this.ifSpec = false;
			for (var k in this.sp_val) {
				if (this.sp_val[k].length) {
					this.ifSpec = true;
					break;
				}
			}

			this.getSpecArray();
		},
		addStoreClass() {
			this.sgcate_id.push(0);
			this.sgcate_name.push('');
		},
		getDefaultItems(_item, defaultItems) {
			defaultItems.push({
				flex: 1,
				values: _item,
				textAlign: 'center'
			});
			defaultItems.push({
				flex: 1,
				values: _item[0].children,
				textAlign: 'center'
			});
		},

		cancelClass() {
			this.showClassPicker = false;
		},
		confirmClass() {
			let values = this.$refs.class_picker.getValues();
			var temp = values[1];
			if (!temp) {
				temp = values[0];
			}
			this.sgcate_name.splice(this.sgcate_index, 1, temp.value);
			this.sgcate_id[this.sgcate_index] = temp.id;

			this.showClassPicker = false;
		},
		onClassChange(picker, values) {
			picker.setSlotValues(1, values[0] ? values[0].children : []);
			picker.setSlotValues(2, values[1] ? values[1].children : []);
		},
		cancelAttr(index) {
			this.showAttrValue[index] = false;
			this.$forceUpdate();
		},
		confirmAttr(index) {
			let refStr = 'attr_picker_' + index;
			let values = this.$refs[refStr][0].getValues();

			if (typeof this.selectAttr[index] === 'undefined') {
				this.selectAttr[index] = {
					name: this.attr_list[index].attr_name
				};
				this.selectAttr[index][values[0].attrvalue_id] = values[0].attrvalue_name;
			}
			this.showAttrValue[index] = false;
			this.attrValue[index] = values[0].attrvalue_name;
			this.$forceUpdate();
		},

		saveTransport() {
			this.$refs.transportList.reload();
			this.showTransportForm = false;
		},
		useTransport(transport_id, transport_title) {
			this.goods.transport_id = transport_id;
			this.goods.transport_title = transport_title;
			this.showTransportList = false;
		},
		editTransport(transport_id) {
			this.transparentQuery = { action: 'edit', transport_id: transport_id };
			this.showTransportForm = true;
		},
		onRegion(picker, values) {
			this.$refs.picker.currentValue = true;
		},
		onPickerConfirm(values) {
			this.area_info = this.getRegionStr(values);

			this.goods.areaid_1 = values[0].area_id;
			this.goods.areaid_2 = values[1].area_id;
		},
		onUnit(values) {
			this.goods_unit_name = values[0].name;
			this.goods.goods_unit_id = values[0].id;
			// console.log(this.goods_unit_name);
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
		bodyDel(index) {
			this.bodyList.splice(index, 1);
		},
		bodyMove(index, mode) {
			if (mode == 'up') {
				this.bodyList.splice(index - 1, 2, this.bodyList[index], this.bodyList[index - 1]);
			} else {
				this.bodyList.splice(index, 2, this.bodyList[index + 1], this.bodyList[index]);
			}
		},
		confirmBodyAdd() {
			let bodyItem = { type: this.bodyType, value: '' };
			this.bodyList.splice(this.bodyIndex, 0, bodyItem);
			this.bodyAddVisible = false;
			this.bodyEdit(this.bodyIndex, bodyItem);
		},
		bodyAdd(index) {
			this.bodyAddVisible = true;
			this.bodyIndex = index;
		},
		bodyEdit(index, item) {
			this.bodyEditVisible = true;
			this.bodyItem = item;
		},
		getSpecArray() {
			let sp_val = this.sp_val;

			this.specArray = this.doExchange(sp_val);
			this.$forceUpdate;
		},
		doExchange(arr) {
			var len = Object.keys(arr).length;
			// 当数组大于等于2个的时候
			if (len >= 2) {
				var j = 0;
				var myArr = [];
				// 将新组合的数组并到原数组中
				var newArr = {};
				for (var i in arr) {
					if (myArr.length > 1) {
						if (arr[i].length) {
							newArr[i] = arr[i];
						}
					} else {
						if (i == 0 || arr[i].length) {
							myArr.push({ sp_id: i, spvalue_id: arr[i] });
						}
					}
					j++;
				}

				if (myArr.length > 0) {
					var temp;
					if (typeof arr[0] === 'undefined') {
						temp = { spvalue_id: [], spvalue_name: [] };
						for (var i in myArr[0].spvalue_id) {
							temp.spvalue_id[i] = [myArr[0].spvalue_id[i]];
							temp.spvalue_name[i] = [this.spec_json[myArr[0].sp_id][myArr[0].spvalue_id[i]].spvalue_name];
						}
					} else {
						temp = arr[0];
					}

					if (myArr.length > 1) {
						newArr[0] = { spvalue_id: [], spvalue_name: [] };
						var index = 0;
						for (var i in temp.spvalue_id) {
							for (var j in myArr[1].spvalue_id) {
								newArr[0].spvalue_id[index] = temp.spvalue_id[i].concat([myArr[1].spvalue_id[j]]);
								newArr[0].spvalue_name[index] = temp.spvalue_name[i].concat([this.spec_json[myArr[1].sp_id][myArr[1].spvalue_id[j]].spvalue_name]);

								index++;
							}
						}
					} else {
						newArr[0] = temp;
					}
				} else {
					newArr[0] = [];
				}

				// 执行回调
				return this.doExchange(newArr);
			} else {
				arr[0]['spvalue_key'] = [];
				for (var i in arr[0].spvalue_id) {
					let color = null;
					var spvalue_id_list = arr[0].spvalue_id[i];
					if (this.spec_list[1]) {
						for (var j in this.spec_list[1].value) {
							if (spvalue_id_list.indexOf(this.spec_list[1].value[j].spvalue_id) > -1) {
								color = this.spec_list[1].value[j].spvalue_id;
							}
						}
					}
					var spvalue_name = arr[0].spvalue_name[i];
					var spvalue_id = arr[0].spvalue_id[i];
					var sp_value = {};
					for (var k in spvalue_name) {
						sp_value[spvalue_id[k]] = spvalue_name[k];
					}
					var spvalue_id_str = spvalue_id
						.sort(function(a, b) {
							return a - b;
						})
						.join('');
					arr[0]['spvalue_key'].push(spvalue_id_str);
					if (typeof this.spec[spvalue_id_str] === 'undefined') {
						this.spec[spvalue_id_str] = {
							goods_id: 0,
							label: arr[0].spvalue_name[i].join('|'),
							color: color,
							sp_value: sp_value,
							goods_marketprice: this.goods.goods_marketprice,
							goods_price: this.goods.goods_price,
							goods_storage_alarm: this.goods.goods_storage_alarm,
							goods_serial: this.goods.goods_serial,
							goods_storage: this.goods.goods_storage
						};
					}
				}

				return arr[0];
			}
		},
		goodsSpecAdd() {
			goodsSpecAdd(this.spec_add_value, this.class_id, this.sp_id)
				.then(res => {
					this.sp_option[this.sp_id].push({
						label: this.spec_add_value,
						value: res.result.value_id
					});
					if (!this.spec_json[this.sp_id]) {
						this.spec_json[this.sp_id] = {};
					}
					this.spec_json[this.sp_id][res.result.value_id] = {
						spvalue_name: this.spec_add_value,
						spvalue_id: res.result.value_id,
						spvalue_color: null
					};
					this.showSpecAdd = false;
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		nextStep() {
			// 冷链
			switch(this.productType) {
				case true:
						// 代码块
						if (!this.goods.goods_chandi) {
							Toast('请输入产地');
							return false;
						} else if (!this.goods.goods_scdate) {
							Toast('请选择生产日期');
							return false;
						} else if (!this.goods.goods_chandipic && !this.isProduce) {
							Toast('请上传产地证明');
							return false;
						}else if (!this.goods.goods_yhren) {
							Toast('请输入验货人名称');
							return false;
						}
						// 如果需要合格证
						if (this.qualifyState) {
							if (!this.certificate_goods) {
								Toast('请选择合格证');
								return false;
							}
						}
					break;
				case false:						
						// 代码块
						if( !this.goods.batch_number){
							Toast("请输入生产批次");
							return false;
						}else if( !this.goods.access_information){
							Toast("请输入食品流入地名称");
							return false;
						}else	if( !this.goods.odd_numbers){
							Toast("请输入单号");
							return false;
						}else if( !this.goods.entry_date){
							Toast("请选择入境日期");
							return false;
						}else	if( !this.goods.entry_ka){
							Toast("请输入入境口岸");
							return false;
						}else if( !this.goods.goods_chandi){
							Toast("请输入原产国");
							return false;
						}else	if( !this.goods.inspection_weight){
							Toast("请输入报检重量");
							return false;
						}else if( !this.goods.consignee){
							Toast("请输入收货人");
							return false;
						}else	if( !this.goods.consignor){
							Toast("请输入发货人");
							return false;
						}else if( !this.goods.specifications){
							Toast("请输入规格");
							return false;
						} else if( !this.goods.goods_jianyan_no){
							Toast("请输入检验证书编号");
							return false;
						} else if( !this.goods.sourcecold_storage){
							Toast("请输入来源地冷库");
							return false;
						} else if( !this.goods.cold_storage){
							Toast("请输入储存冷库");
							return false;
						} else if( !this.goods.join_warehouse_time){
							Toast("请选择入库日期");
							return false;
						}
						break;
				// default:
				// 		默认代码块
			}
			// this.goods
      // console.log("🚀 ~ file: GoodsForm2.vue ~ line 1304 ~ nextStep ~ this.goods", this.goods);
			// return false;
			/************   最低价    *************************************/
			// if( !this.goods.goods_min_price ){
			// 	Toast('请输入最低价格');
			// 	return false;
			// }
			if( ( +this.goods.goods_min_price) <= 0  ){
				Toast('最低价格必须大于零');
				return false;
			}
			// }
			if( this.goods.goods_min_price ){
				var minPrice = ( +this.goods.goods_min_price)/(+this.goods.goods_price);	
				if( this.info.supply_chain == 10 ){
					if( (this.goods.goods_g_price && (+this.goods.goods_g_price) != 0 ) &&( Number(this.goods.goods_g_price) < minPrice ) ){
						Toast('供应链价格不得小于最低价');
						return false;
					}
				}
				if( (this.goods.goods_l_price && (+this.goods.goods_l_price) != 0 ) &&( Number(this.goods.goods_l_price) < minPrice ) ){
					Toast('零售价格不得小于最低价');
					return false;
				}
				if( (this.goods.goods_p_price && (+this.goods.goods_p_price) != 0 ) && ( Number(this.goods.goods_p_price) < minPrice ) ){
					Toast('批发价格不得小于最低价');
					return false;
				}
				if( (this.goods.goods_j_price && (+this.goods.goods_j_price) != 0 ) && ( Number(this.goods.goods_j_price) < minPrice ) ){
					Toast('集采价格不得小于最低价!');
					return false;
				}
				if( (this.goods.goods_c_price && (+this.goods.goods_c_price) != 0 ) && ( Number(this.goods.goods_c_price) < minPrice ) ){
					Toast('团购价格不得小于最低价');
					return false;
				}
			}
			/************   最低价    *************************************/

			/************   折扣      *************************************/
			if (Number(this.goods.goods_l_price) > 1 || Number(this.goods.goods_l_price) < 0) {
				Toast('零售折扣必须在0~1之间');
				return false;
			}
			if (Number(this.goods.goods_p_price) > 1 || Number(this.goods.goods_p_price) < 0) {
				Toast('批发折扣必须在0~1之间');
				return;
			}
			if (this.isjicai) {
				if (Number(this.goods.goods_j_price) > 1 || Number(this.goods.goods_j_price) < 0) {
					Toast('集采折扣必须在0~1之间');
					return false;
				}
			}
			if (Number(this.goods.goods_c_price) > 1 || Number(this.goods.goods_c_price) < 0) {
				Toast('社区团折扣必须在0~1之间');
				return false;
			}
			/************   折扣      *************************************/


			if (!this.isjicai) {
				this.goods.goods_j_price = 0;
			}

			if (!this.goods.goods_name) {
				Toast('请输入商品名称');
				return false;
			} else if (!this.goods.goods_jianyan) {
				if(this.productType){
					this.isChivesEggs?Toast('请上传韭菜鸡蛋合格证'):Toast('请上传检验合格证明');
				}else{
					Toast('请上传检验证书');
				}
				return false;
			} else if (!this.goods.goods_unit_id) {
				Toast('请选择单位');
				return false;
			} else if (isNaN(this.goods.goods_price) || this.goods.goods_price <= 0) {
				Toast('请检查价格');
				return false;
			} else if (!this.goods.goods_gonghuo && !this.isProduce) {
				Toast('请输入供货商名称');
				return false;
			} else if (!this.goods.goods_gonghuopic && !this.isProduce) {
				if(this.productType){
					Toast('请上传购货证明');
				}else{
					Toast('请上传供货商证明');
				}
				return false;
			} else if (parseFloat(this.goods.goods_marketprice) < parseFloat(this.goods.goods_price) && parseFloat(this.goods.goods_marketprice) > 0) {
				Toast('市场价不能小于价格');
				return false;
			} else if (isNaN(this.goods.goods_storage) || this.goods.goods_storage < 0) {
				this.productType?Toast('请检查库存'):Toast('请检查实际重量')
				return false;
			} else if (
				(this.goods.goods_storage_alarm && (isNaN(this.goods.goods_storage_alarm) || this.goods.goods_storage_alarm < 0)) ||
				parseInt(this.goods.goods_storage_alarm) > parseInt(this.goods.goods_storage)
			) {
				Toast('请检查库存预警值');
				return false;
			}
			
			this.goods.goods_discount = parseInt((this.goods.goods_price / this.goods.goods_marketprice) * 100);
			var sp_val = {};
			for (var i in this.sp_val) {
				sp_val[i] = {};
				for (var j in this.sp_val[i]) {
					sp_val[i][this.sp_val[i][j]] = this.spec_json[i][this.sp_val[i][j]].spvalue_name;
				}
			}
			if (this.ifFixedFreight) {
				this.goods.transport_id = 0;
			}
			var spec = {};
			if (this.specArray) {
				for (i in this.specArray.spvalue_key) {
					spec[this.specArray.spvalue_key[i]] = this.spec[this.specArray.spvalue_key[i]];
				}
			}

			
			
		
			// if(this.certificate_goods&&this.certificate_num <this.goods.goods_storage){
			//   Toast("发布数量不得大于合格证限定数量（"+this.certificate_num+'）');
			//   return false;
			// }
			// console.log(this.menuValue, 'menuvalue');
			for( var i in spec){
				var obj =spec[i];
				/************   最低价    *************************************/
				if( this.goods.goods_min_price ){
					var minPrice = ( +this.goods.goods_min_price)/(+this.goods.goods_price);	
					if( this.info.supply_chain == 10 ){
						if( obj.goods_g_price && ( Number(obj.goods_g_price) !=0 ) && ( Number(obj.goods_g_price) < minPrice ) ){
							Toast('供应链价格不得小于最低价');
							return false;
						}
					}
					if( obj.goods_l_price && ( Number(obj.goods_l_price) !=0 ) &&( Number(obj.goods_l_price) < minPrice ) ){
						Toast('零售价格不得小于最低价');
						return false;
					}
					if( obj.goods_p_price && ( Number(obj.goods_p_price) !=0 ) && ( Number(obj.goods_p_price) < minPrice ) ){
						Toast('批发价格不得小于最低价!');
						return false;
					}
					if( obj.goods_j_price && ( Number(obj.goods_j_price) !=0 ) && ( Number(obj.goods_j_price) < minPrice ) ){
						Toast('集采价格不得小于最低价');
						return false;
					}
					if( obj.goods_c_price && ( Number(obj.goods_c_price) !=0 ) && ( Number(obj.goods_c_price) < minPrice ) ){
						Toast('团购价格不得小于最低价');
						return false;
					}
				}				
				/************   最低价    *************************************/
			}
			var menu_id = this.menuValue;
			var newCommid = null;
			if( this.editType ){
				newCommid = this.commonid;
			}

			// debugger
			goodsSave(
				this.certificate_goods,
				this.class_id,
				newCommid,
				this.goods,
				this.bodyList,
				this.sgcate_id,
				spec,
				this.sp_name,
				sp_val,
				this.selectAttr,
				this.g_fccount,
				this.g_fcprefix,
				menu_id
			)
				.then(res => {
					if (!this.editType) {
						this.$router.push({ name: 'SellerGoodsForm3', query: { commonid: res.result.commonid } });
					}
					Toast(res.message);
				})
				.catch(error => {
					Toast(error.message);
				});
		},
		openImage(src) {
			this.showimage = src;
			this.isshow = true;
		},
		dropImage(type) {
			this.goods[type] = '';
			this.$forceUpdate();
		},

		uploadImage(type, event) {
			if (typeof event.target.files[0] === 'undefined') {
				return;
			}
			let formdata = new FormData();
			if (event.target.files[0].size > 200 * 1024) {
        // Toast("上传图片不得大于200k,请裁切图片后上传");
        // 保存 当前 值 名称
        this.cropImgIndex = type;
        // 传值 隐藏 当前页面 打开 插件
        this.cropDataShow = false;
        this.$refs.cropImg.currentValue = true;
        // 将当前 的 input 里的 文件 传递给 插件
        this.$refs.cropImg.files = event.target.files;

        // 清除 当前 input 的 值
        event.target.files = null;
        event.target.type = null;
        // 重新 设置 类型 是文件
        event.target.type = "file";

        return false;
			}
			formdata.append('file', event.target.files[0]);
			formdata.append('name', 'file');

			uploadInfoFile(formdata)
				.then(res => {
					if (type == 'goods_body') {
						this.bodyItem.value = res.result.path;
						this.bodyItem.value_url = res.result.url;
						this.bodyEditVisible = false;
					} else {
						this.goods[type] = res.result.path;
						this.goods[type + '_url'] = res.result.url;
					}
					this.$forceUpdate();
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		

		// 图片 接收 图片
		fun_getCropImgData(obj){
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			this.cropDataShow = true;
			// 如果 是 带值 传递过来的 上传 图片
			if( obj.type ){
				uploadGoodsCropImg(obj.data).then(res=>{
					
					if (this.cropImgIndex == 'goods_body') {
						this.bodyItem.value = res.result.file_name;
						this.bodyItem.value_url = res.result.file_path;
						this.bodyEditVisible = false;
					} else {
						this.goods[this.cropImgIndex] = res.result.file_name;
						this.goods[this.cropImgIndex + '_url'] = res.result.file_path;
					}
					this.$forceUpdate();
				}).catch(err=>{
					Toast(err.message);
				})
				
			}
		},

		datetimeConfirm(value) {
			this.goods.goods_shelftime = parseInt(value.getTime() / 1000);
			this.goods_shelftime = this.goods.goods_shelftime;
		},
		onDatetime(picker, values) {
			this.$refs.datetimePicker.open();
		},
		dateConfirm(value) {
			this.goods.virtual_indate = parseInt(value.getTime() / 1000);
			this.virtual_indate = this.goods.virtual_indate;
		},
		onDate(picker, values) {
			this.$refs.datePicker.open();
		},
		dateConfirm2(value) {
			this.goods.presell_deliverdate = parseInt(value.getTime() / 1000);
			this.presell_deliverdate = this.goods.presell_deliverdate;
		},
		onDate2(picker, values) {
			this.$refs.datePicker2.open();
		},
		dateConfirm3(value) {
			this.goods.appoint_satedate = parseInt(value.getTime() / 1000);
			this.appoint_satedate = this.goods.appoint_satedate;
		},
		onDate3(picker, values) {
			this.$refs.datePicker3.open();
		},
		dateConfirm4(value) {
			if( this.join_warehouse_time ){
				 this.goods.join_warehouse_time = value.toLocaleDateString()
			}else{
				console.log(value)
				this.productType?(
					this.goods.goods_scdate = parseInt(value.getTime() / 1000)
				):( this.goods.entry_date = value.toLocaleDateString());
			}
			this.$forceUpdate();
		},
		jcpd() {},
		onDate4(name) {
			this.join_warehouse_time = name;		
			if ( !this.editType ) {
				this.$refs.datePicker4.open();
			}
		}
	},
	mounted() {
		this.jcpd();
	}
};
</script>
<style>
.goods-form-2 input[readonly] {
	color: #999;
}
</style>
<style scoped lang="scss">
.container {
	background: #fff;
	/*------------------------*/
	/deep/.mint-cell {
		&::after {
			right: 0;
			left: 1.42rem;
			background-color: #efefef;
		}
	}
	/deep/ .mint-cell-wrapper {
		padding: 1.19rem 1.42rem;
		.mint-field-core {
			text-align: right;
		}
	}
	& /deep/ .mint-cell-text {
		padding-left: 0.66rem;
	}
	.mast_value {
		& /deep/ .mint-cell-text {
			position: relative;
		}
		& /deep/ .mint-cell-text::after {
			content: '*';
			color: red;
			font-size: 1.2rem;
			position: absolute;
			left: 0.1rem;
			top: 0.1rem;
		}
	}
	/*------------------------*/

	.label {
		padding: 1.9rem 1.43rem 0.95rem;
		font-size: 1.05rem;
		background: #f4f5f7;
	}
	.user-avatar-wrapper {
		display: inline-block;
		vertical-align: top;
		// margin-right: 0.5rem;
		// margin-bottom: 0.5rem;
	}
	.user-avatar-wrapper .del-btn {
		mix-blend-mode: difference;
		font-size: 1.6rem;
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
	}
	.user-avatar {
		display: block;
		// border: 1px solid #eee;
		position: relative;
		border-radius: 0.76rem;
		width: 7.61rem;
		height: 7.61rem;
		margin: 0 auto;
		text-align: center;
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
		.center-text {
			padding: 0.2rem;
			padding-top: 3.5rem;
			font-size: 0.6rem;
		}
	}
	.avatar-empty {
		background-color: #f4f5f7;
		line-height: 7.61rem;
		img {
			width: 2.86rem;
			height: 2.52rem;
		}
	}
	.user-avatar::before {
		position: absolute;
		font-size: 1.5rem;
		line-height: 5rem;
		left: 50%;
		margin-left: -0.75rem;
		color: rgba(0, 0, 0, 0.5);
	}
	.btn-wrapper {
		display: flex;
		.btn {
			flex: 1;
		}
	}
	.mint-radiolist {
		display: flex;
		.mint-cell {
			flex: 1;
			.mint-radio-input:checked + .mint-radio-core {
				background-color: #ff9900 !important;
				border-color: #ff9900 !important;
			}
		}
	}
	.body-list {
		.body-item {
			padding: 1rem;
			position: relative;
			min-height: 2.2rem;
			font-size: 1rem;
			img {
				max-width: 100%;
			}
			.btn-list {
				text-align: right;
				background: rgba(0, 0, 0, 0.5);
				position: absolute;
				top: 0.5rem;
				bottom: 0.5rem;
				left: 0.5rem;
				right: 0.5rem;
				padding: 0.5rem;
				box-sizing: border-box;
				i {
					font-size: 1.2rem;
					margin-left: 0.5rem;
					color: #fff;
				}
			}
		}
	}
	.middle-popup {
		width: 80%;
	}
	.brand-list {
		h2 {
			line-height: 2rem;
			font-size: 0.7rem;
			padding-left: 0.5rem;
			font-weight: 700;
		}
		ul {
			overflow: hidden;
			border-top: 1px solid #f6f6f9;
		}
		li {
			box-sizing: border-box;
			text-align: center;
			width: 25%;
			padding-bottom: 20%;
			float: left;
			border-bottom: 1px solid #f6f6f9;
			border-right: 1px solid #f6f6f9;
			position: relative;
			.p-img {
				position: absolute;
				top: 0.5rem;
				bottom: 0.5rem;
				right: 0.5rem;
				left: 0.5rem;
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
		li:nth-child(4n) {
			border-right: 0;
		}
	}
}

.cell-list {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	padding: 1.19rem 1.43rem;
	margin-left: 1.43rem;
	display: flex;
	justify-content: space-between;
	position: relative;
	div {
		display: flex;
		align-items: center;
		span {
			margin-right: 1rem;
		}
		input {
			text-align: right;
		}
		img {
			width: 1.43rem;
			height: 1.43rem;
		}
	}
	span {
	}
	&::before {
		content: '';
		position: absolute;
		// left: 1.43rem;
		bottom: 0;
		height: 1px;
		width: 100%;
		background-color: #efefef;
	}
}
/deep/.mint-popup-bottom {
	height: 28rem;
}
.picker-items {
	width: 100%;
}
.goods-form-2 {
	// 冷链
	.cold{
		&/deep/.is-textarea{
			textarea{
				// resize:none;
				max-height: 5.2rem;
			}
		}
	}

	/deep/.toolbar {
		height: 3rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		background-color: #f0f2f5;
		.toolbar-item {
			font-size: 1.1rem;
			border: none;
			border-radius: 0;
			background-color: #f0f2f5;
		}
		.cancel-item {
			margin-left: 0.5rem;
			color: #4e545d;
		}
		.confirm-item {
			margin-right: 0.5rem;
			color: red;
		}
		.picker-header {
			color: #4e545d;
			line-height: 3rem;
			font-size: 1rem;
		}
	}
	.toolbar {
		height: 3rem;
	}
	.common-header-wrap {
		height: 4rem;
		.common-header {
			height: 4rem;
			line-height: 4rem;
			/deep/.mint-header-title {
				font-size: 1.52rem;
			}
		}
	}
	.common-popup-content {
		top: 4rem;
	}
}
.add-button {
	background-color: #fff;
	// position: fixed;
	// z-index: 2;
	// bottom: 0;
	margin-top: 2rem;
	padding: 1rem 1.43rem;
	width: 100%;
	box-sizing: border-box;
	// margin-bottom: 1rem;
	span {
		display: block;
		text-align: center;
		height: 3.81rem;
		line-height: 3.81rem;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.9rem;

		font-size: 1.33rem;
		font-weight: 400;
		color: #ffffff;
	}
}

.type-popup {
	/deep/.mint-radiolist {
		width: 100%;
		.mint-radiolist-title {
			margin: 0;
		}
		.mint-radiolist-label {
			width: 7rem;
			.mint-radio-label {
				margin: 0;
			}
		}
	}
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
</style>
