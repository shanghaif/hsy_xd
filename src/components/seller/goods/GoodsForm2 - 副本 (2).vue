<template>
<div class="container goods-form-2">
    <div class="common-header-wrap">
        <mt-header title="商品发布" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div>
    <step :options="options" :active="1"></step>
    <div class="label">商品基本信息</div>
    <div @click="goClass"><mt-cell title="商品分类" is-link>{{goods_class.gctag_name}}</mt-cell></div>
    <mt-field label="商品名称" v-model="goods.goods_name"></mt-field>
    <mt-field label="验货人" v-model="goods.goods_yhren"></mt-field>
    <mt-field label="商品卖点" v-model="goods.goods_advword"></mt-field>
    <mt-field label="零售价" :readonly="ifSpec" v-model="goods.goods_price"></mt-field>
    <mt-field label="批发价"  :readonly="ifSpec"  v-model="goods.goods_p_price"></mt-field>
    <mt-field label="C团价"  :readonly="ifSpec" v-model="goods.goods_c_price"></mt-field>
    <mt-field label="B团价"  :readonly="ifSpec" v-model="goods.goods_b_price"></mt-field>
    <mt-field label="集采价"  :readonly="ifSpec" v-model="goods.goods_j_price"></mt-field>
    <mt-field label="市场价"  v-model="goods.goods_marketprice"></mt-field>
    <mt-field label="成本价" v-model="goods.goods_costprice"></mt-field>
    <mt-field style="display: none" label="折扣" v-model="goods.goods_discount" readonly ></mt-field>
    <mt-field label="商品库存" :readonly="ifSpec" v-model="goods.goods_storage"></mt-field>
    <mt-field label="库存预警值" :readonly="ifSpec" v-model="goods.goods_storage_alarm"></mt-field>
    <mt-field label="商家货号" :readonly="ifSpec" v-model="goods.goods_serial"></mt-field>
    <div v-if="mulSpec" @click="showSpecName=true"><mt-cell title="设置规格名" is-link></mt-cell></div>
    <div v-if="mulSpec" @click="showSpecValue=true"><mt-cell title="设置规格值" is-link></mt-cell></div>
    <mt-cell class="mt-5" title="商品图片">
        <div class="user-avatar-wrapper">
            <div v-if="goods.goods_image" class="user-avatar">
                <img :src="goods.goods_image_url" @click="openImage(goods.goods_image_url)">
                <span @click="dropImage('goods_image')" class="del-btn iconfont">&#xe6d8;</span>
            </div>
            <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('goods_image',$event)">
                <div class="center-text">相机/相册</div>
                <input type="file" accept="image/*">
            </div>
        </div>
    </mt-cell>
<div v-if="nosy">
<div class="label">商品安全信息</div>

    <mt-field label="产地" v-model="goods.goods_chandi"></mt-field>
 <div  @click="onDate4"><mt-cell title="生产日期" is-link>{{goods.goods_scdate?$moment.unix(goods.goods_scdate).format('YYYY-MM-DD'):''}}</mt-cell></div>
    <mt-cell class="mt-5" title="产地证明">
        <div class="user-avatar-wrapper">
            <div v-if="goods.goods_chandipic" class="user-avatar">
                <img :src="goods.goods_chandipic_url" @click="openImage(goods.goods_chandipic_url)">
                <span  @click="dropImage('goods_chandipic')" class="del-btn iconfont">&#xe6d8;</span>
            </div>
            <div v-else  class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('goods_chandipic',$event)">
                <div class="center-text">相机/相册</div>
                <input type="file" accept="image/*">
            </div>
        </div>
    </mt-cell>
    <mt-field label="供货商" v-model="goods.goods_gonghuo"></mt-field>
    <mt-cell class="mt-5" title="购货证明">
        <div class="user-avatar-wrapper">
            <div v-if="goods.goods_gonghuopic" class="user-avatar">
                <img :src="goods.goods_gonghuopic_url" @click="openImage(goods.goods_gonghuopic_url)">
                <span @click="dropImage('goods_gonghuopic')" class="del-btn iconfont">&#xe6d8;</span>
            </div>
            <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('goods_gonghuopic',$event)">
                <div class="center-text">相机/相册</div>
                <input type="file" accept="image/*">
            </div>
        </div>
    </mt-cell>
   <mt-cell class="mt-5" title="检验报告">
        <div class="user-avatar-wrapper">
            <div v-if="goods.goods_jianyan" class="user-avatar">
                <img :src="goods.goods_jianyan_url" @click="openImage(goods.goods_jianyan_url)">
                <span @click="dropImage('goods_jianyan')" class="del-btn iconfont">&#xe6d8;</span>
            </div>
            <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('goods_jianyan',$event)">
                <div class="center-text">相机/相册</div>
                <input type="file" accept="image/*">
            </div>
        </div>
    </mt-cell>
</div>
    <div class="label">商品详情描述</div>
    <div v-if="ifAttr" @click="showAttr=true"><mt-cell title="商品属性" is-link></mt-cell></div>
    <div @click="showDesc=true"><mt-cell title="商品描述" is-link></mt-cell></div>
    <div @click="showBrand=true"><mt-cell title="商品品牌" is-link>{{goods.brand_name}}</mt-cell></div>
    <div class="label">特殊商品</div>
    <div v-if="goods_class.gc_virtual">
    <mt-cell title="虚拟商品">
        <mt-switch v-model="goods.is_virtual"></mt-switch>
    </mt-cell>
    <div v-if="goods.is_virtual">
        <div @click="onDate"><mt-cell title="虚拟商品有效期" is-link>{{virtual_indate?$moment.unix(virtual_indate).format('YYYY-MM-DD'):''}}</mt-cell></div>
        <mt-field label="购买上限" v-model="goods.virtual_limit"></mt-field>
        <mt-cell title="支持过期退款">
            <mt-switch v-model="goods.virtual_invalid_refund"></mt-switch>
        </mt-cell>
    </div>
    </div>
    <div v-if="!goods.is_virtual">
        <mt-cell title="F码商品">
            <mt-switch v-model="goods.is_goodsfcode"></mt-switch>
        </mt-cell>
        <div v-if="goods.is_goodsfcode">
            <mt-field label="生成F码数量" v-model="g_fccount"></mt-field>
            <mt-field label="F码前缀" v-model="g_fcprefix"></mt-field>
        </div>
        <mt-cell title="预售">
            <mt-switch v-model="goods.is_presell"></mt-switch>
        </mt-cell>
        <div v-if="goods.is_presell" @click="onDate2"><mt-cell title="发货日期" is-link>{{presell_deliverdate?$moment.unix(presell_deliverdate).format('YYYY-MM-DD'):''}}</mt-cell></div>

    </div>

    <div class="label">商品物流信息</div>
    <div @click="onRegion"><mt-cell title="地区" :value="area_info" is-link></mt-cell></div>
    <mt-cell title="固定运费">
        <mt-switch v-model="ifFixedFreight"></mt-switch>
    </mt-cell>
    <mt-field v-if="ifFixedFreight" label="运费" v-model="goods.goods_freight"></mt-field>
    <div v-if="!ifFixedFreight" @click="showTransportList=true"><mt-cell title="售卖区域" :value="area_info" is-link>{{goods.transport_title}}</mt-cell></div>
    <div class="label">发票信息</div>
    <mt-cell title="开增值税发票">
        <mt-switch v-model="goods.goods_vat"></mt-switch>
    </mt-cell>
    <div class="label">其他信息</div>
    <div @click="showClass=true"><mt-cell title="本店分类" is-link></mt-cell></div>
    <mt-cell title="立即发布">
        <mt-switch v-model="goods.goods_state"></mt-switch>
    </mt-cell>
    <div v-if="!goods.goods_state" @click="onDatetime"><mt-cell title="发布时间" is-link>{{goods_shelftime?$moment.unix(goods_shelftime).format('YYYY-MM-DD HH:mm'):''}}</mt-cell></div>
    <mt-cell title="预约">
        <mt-switch v-model="goods.is_appoint"></mt-switch>
    </mt-cell>
    <div v-if="goods.is_appoint" @click="onDate3"><mt-cell title="发售日期" is-link>{{appoint_satedate?$moment.unix(appoint_satedate).format('YYYY-MM-DD'):''}}</mt-cell></div>

    <mt-cell title="商品推荐">
        <mt-switch v-model="goods.goods_commend"></mt-switch>
    </mt-cell>
    <mt-button size="large" type="primary" class="mt-10" @click="nextStep">{{commonid?'保存':'下一步'}}</mt-button>

    <div>
        <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
            <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
        </mt-popup>
        <mt-popup v-model="showSpecAdd">
            <mt-field v-model="spec_add_value" placeholder="请输入规格值"></mt-field>
            <mt-button size="large" type="primary" class="mt-10" @click="goodsSpecAdd()">确定</mt-button>
        </mt-popup>
        <mt-popup
                class="middle-popup"
                v-model="bodyEditVisible"
                popup-transition="popup-fade">
            <mt-field v-if="bodyItem.type=='text'" placeholder="请输入内容" v-model="bodyItem.value" type="textarea" />
            <div v-if="bodyItem.type=='image'" class="user-avatar iconfont icon-xiangji" ref="upload_btn" @change="uploadImage('goods_body',$event)">
                <img :src="bodyItem.value_url">
                <input type="file" accept="image/jpg,image/png,image/gif,image/bmp,image/jpeg">
            </div>

        </mt-popup>
        <mt-popup
                class="middle-popup"
                v-model="bodyAddVisible"
                popup-transition="popup-fade">
            <mt-cell title="类型">
                <mt-radio
                        v-model="bodyType"
                        :options="bodyTypeOptions">
                </mt-radio>
            </mt-cell>

            <div class="btn-wrapper">

                <mt-button class="btn" type="default" @click="bodyAddVisible=false">取消</mt-button>
                <mt-button class="btn" type="primary" @click='confirmBodyAdd'>确定</mt-button>
            </div>
        </mt-popup>
    </div>
    <div>
        <mt-popup v-model="showBrand" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="品牌" class="common-header">
                    <mt-button slot="left" icon="back" @click="showBrand=false"></mt-button>
                    <mt-button slot="right" @click="showBrand=false;goods.brand_id=0;goods.brand_name=''">取消</mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content">
                <div class="brand-list">
                    <div v-for="(bclass,index) in brand_list" :key="index">
                        <h2>{{index}}</h2>
                        <ul>
                            <li v-for="item in bclass" v-bind:key="item.brand_id" @click="selectBrand(item.brand_id,item.brand_name)">
                                <div class="p-img" :style="{backgroundImage:'url('+item.brand_pic+')'}"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </mt-popup>

        <mt-popup v-model="showTransportList" position="right" class="common-popup-wrapper">
            <transport-list ref="transportList" :ifComponent='true' @useTransport="useTransport" @editTransport="editTransport" @addTransport="transparentQuery={action:'add',transport_id:0};showTransportForm=true" @closeTransortList='showTransportList=false' />
        </mt-popup>
        <mt-popup v-model="showTransportForm" position="right" class="common-popup-wrapper">
            <transport-form :query="transparentQuery" :ifComponent='true' @saveTransport="saveTransport" @closeTransortForm='showTransportForm=false' />
        </mt-popup>
        <mt-popup v-model="showClass" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="店铺分类" class="common-header">
                    <mt-button slot="left" icon="back" @click="showClass=false"></mt-button>
                    <mt-button slot="right" @click="addStoreClass">新增</mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content">
                <div v-for="(item,index) in sgcate_id" :key="index" @click="showClassPicker=true;sgcate_index=index"><mt-cell title="选择分类" is-link>{{sgcate_name[index]}}</mt-cell></div>
            </div>
        </mt-popup>
        <mt-popup v-model="showSpecValue" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="设置规格值" class="common-header">
                    <mt-button slot="left" icon="back" @click="calcSpec()"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content">
                <div v-for="(spvalue_key,k) in specArray.spvalue_key" :key="k">
                    <div class="label">{{spec[spvalue_key].label}}</div>
                    <mt-field label="零售价" v-model="spec[spvalue_key].goods_price"></mt-field>
                    <mt-field label="批发价" v-model="spec[spvalue_key].goods_p_price"></mt-field>
                    <mt-field label="C团价" v-model="spec[spvalue_key].goods_c_price"></mt-field>
                    <mt-field label="B团价" v-model="spec[spvalue_key].goods_b_price"></mt-field>
                    <mt-field label="集采价" v-model="spec[spvalue_key].goods_j_price"></mt-field>
                    <mt-field label="市场价" v-model="spec[spvalue_key].goods_marketprice"></mt-field>
                    <mt-field label="商品库存" v-model="spec[spvalue_key].goods_storage"></mt-field>
                    <mt-field label="库存预警值" v-model="spec[spvalue_key].goods_storage_alarm"></mt-field>
                    <mt-field label="商家货号" v-model="spec[spvalue_key].goods_serial"></mt-field>

                </div>

            </div>
        </mt-popup>
        <mt-popup v-model="showDesc" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="商品描述" class="common-header">
                    <mt-button slot="left" icon="back" @click="showDesc=false"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content">
                <div class="body-list">
                    <div class="body-item" v-for="(item,index) in bodyList" :key='index'>
                        <div v-if="item.type=='text'">{{item.value?item.value:'请输入内容'}}</div>
                        <div v-if="item.type=='image'"><img v-if="item.value" :src="item.value_url"><span v-else>请上传图片</span></div>
                        <div class="btn-list">
                            <!--上移-->
                            <i class="iconfont" v-show="index!=0" @click="bodyMove(index,'up')">&#xe648;</i>
                            <!--下移-->
                            <i class="iconfont" v-show="index!=(bodyList.length-1)" @click="bodyMove(index,'down')">&#xe643;</i>
                            <!--插入-->
                            <i class="iconfont" @click="bodyAdd(index)">&#xe69c;</i>
                            <!--编辑-->
                            <i class="iconfont" @click="bodyEdit(index,item)">&#xe658;</i>
                            <!--删除-->
                            <i class="iconfont" v-show="index!=(bodyList.length-1)" @click="bodyDel(index)">&#xe641;</i>
                        </div>
                    </div>
                </div>

            </div>
        </mt-popup>
        <mt-popup v-model="showAttr" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="商品属性" class="common-header">
                    <mt-button slot="left" icon="back" @click="showAttr=false"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content" v-if="attr_list">
                <div v-for="(item,index) in attr_list" :key="index" @click="popAttr(index)"><mt-cell :title="item.attr_name" is-link>{{attrValue[index]}}</mt-cell></div>

            </div>
        </mt-popup>
        <mt-popup v-model="showSpecName" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="设置规格名" class="common-header">
                    <mt-button slot="left" icon="back" @click="hideSpecName()"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content" v-if="spec_list">
                <div v-for="(val,k) in spec_list" :key="k">
                    <mt-field v-model="sp_name[k]"></mt-field>
                    <mt-checklist
                            v-model="sp_val[k]"
                            :options="sp_option[k]">
                    </mt-checklist>
                    <mt-button size="large" type="primary" class="mt-10" @click="sp_id=k;showSpecAdd=true">添加规格值</mt-button>
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

        <mt-popup v-for="(item,index) in attrList" :key="index" v-model="showAttrValue[index]" position="bottom">
            <mt-picker :ref="'attr_picker_'+index" :slots="attrList[index]" valueKey="attrvalue_name" showToolbar>
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
                :value="goods_shelftime?(new Date(goods_shelftime)):(new Date())"
                @confirm="datetimeConfirm"
                @cancel="goods_shelftime=0"
        >
        </mt-datetime-picker>
        <region-picker ref="picker" @onConfirm="onPickerConfirm" @onCancel="area_info=''"></region-picker>
        <mt-datetime-picker
                ref="datePicker"
                type="date"
                :startDate="new Date()"
                yearFormat="{value}年"
                monthFormat="{value}月"
                dateFormat="{value}日"
                :value="virtual_indate?(new Date(virtual_indate)):(new Date())"
                @confirm="dateConfirm"
        >
        </mt-datetime-picker>
        <mt-datetime-picker
                ref="datePicker2"
                type="date"
                :startDate="new Date()"
                yearFormat="{value}年"
                monthFormat="{value}月"
                dateFormat="{value}日"
                :value="presell_deliverdate?(new Date(presell_deliverdate)):(new Date())"
                @confirm="dateConfirm2"
        >
        </mt-datetime-picker>
        <mt-datetime-picker
                ref="datePicker3"
                type="date"
                :startDate="new Date()"
                yearFormat="{value}年"
                monthFormat="{value}月"
                dateFormat="{value}日"
                :value="appoint_satedate?(new Date(appoint_satedate)):(new Date())"
                @confirm="dateConfirm3"
        >
        </mt-datetime-picker>
        <mt-datetime-picker
                ref="datePicker4"
                type="date"
                :startDate="new Date()"
                yearFormat="{value}年"
                monthFormat="{value}月"
                dateFormat="{value}日"
                :value="goods.goods_scdate?(new Date(goods.goods_scdate)):(new Date())"
                @confirm="dateConfirm4"
        >
        </mt-datetime-picker>
    </div>

</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import Step from '../../Step'
import transportList from '../transport/transportList'
import transportForm from '../transport/transportForm'
import RegionPicker from '../../../components/RegionPicker'
import { getTransportList } from '../../../api/sellerTransport'
import { getBrandList } from '../../../api/homesearch'
import { getCommonData, goodsEdit, goodsSpecAdd, uploadInfoFile, goodsSave } from '../../../api/sellerGoods'
import { getGoodsClassTree } from '../../../api/sellerGoodsClass'
export default {
  data () {
    return {
      options: [{ title: '选择商品分类' }, { title: '填写商品详情' }, { title: '上传商品图片' }],
      ifLoad: 0,
      class_id: this.$route.query.class_id,
      commonid: this.$route.query.commonid,
      goods: { goods_state: true },
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
      nosy:true,
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
      goods_scdate:0,
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
      bodyList: [{
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
      spec_checked: false
    }
  },

  created () {




    getGoodsClassTree().then(res => {
      this.items = res.result.class_list
    }).catch(error => {
      Toast(error.message)
    })
    getTransportList().then(res => {
      this.transport_list = res.result.transport_list
    }).catch(error => {
      Toast(error.message)
    })
    getBrandList(0).then(res => {
      this.brand_list = res.result.brand_l
    }).catch(function (error) {
      Toast(error.message)
    })
    getCommonData(this.class_id).then(res => {
      var spec_list = res.result.spec_list
      var attr_list = res.result.attr_list
      if (attr_list && Object.keys(attr_list).length) {
        this.ifAttr = true
        this.attr_list = attr_list
        for (var i in attr_list) {
          this.attrList[i] = [{
            flex: 1,
            values: attr_list[i].value,
            textAlign: 'center'

          }]
        }
      }
      var sp_option = {}

      if (spec_list && Object.keys(spec_list).length) {
        this.mulSpec = true
        for (var k in spec_list) {
          var val = spec_list[k]
          sp_option[k] = []
          this.sp_val[k] = []
          if (typeof (this.sp_name[k]) === 'undefined') {
            this.sp_name[k] = val.sp_name
          }
          for (var j in val.value) {
            sp_option[k].push({
              label: val.value[j].spvalue_name,
              value: val.value[j].spvalue_id
            })
          }
        }
      }
      this.goods_class = res.result.goods_class
      this.spec_json = res.result.spec_json
      this.sp_option = sp_option
      this.spec_list = spec_list

      if (!this.goods_class.gc_id) {
        Toast('请重新选择分类')
        this.$router.push({ name: 'SellerGoodsForm1', query: { commonid: this.commonid } })
      }
      this.ifLoad++
    }).catch(error => {
      Toast(error.message)
    })
    if (this.commonid) {
      goodsEdit(this.commonid).then(res => {
        var spec_checked = res.result.spec_checked
        this.attr_checked = res.result.attr_checked
        var goods = res.result.goods
//====================

this.nosy= true
if(goods.goods_suyuan!=""){
	var s=goods.goods_suyuan
//alert(s)
//alert(s.indexOf("|"))
	if(s.indexOf("|") != -1)	{
		this.nosy= false
		//alert(s.indexOf("|"))
	}
}


        goods.is_virtual = !!goods.is_virtual
        goods.is_goodsfcode = !!goods.is_goodsfcode
        goods.is_presell = !!goods.is_presell
        goods.goods_vat = !!goods.goods_vat
        goods.goods_state = !!goods.goods_state
        goods.is_appoint = !!goods.is_appoint
        goods.goods_commend = !!goods.goods_commend
        goods.virtual_invalid_refund = !!goods.virtual_invalid_refund
        if (goods.mb_body) {
          this.bodyList = goods.mb_body
        }
        this.ifFixedFreight = !goods.transport_id
        this.goods_shelftime = goods.goods_shelftime
        this.virtual_indate = goods.virtual_indate
        this.goods = goods

        if (goods.spec_name) {
          for (var k in goods.spec_name) {
            this.sp_name[k] = goods.spec_name[k]
          }
        }

        this.area_info = res.result.area ? res.result.area.area_name : ''
        var sp_value = res.result.sp_value
        for (var i in sp_value) {
          this.spec[i] = {
            goods_id: sp_value[i]['id'],
            label: sp_value[i]['label'],
            color: sp_value[i]['color'],
            sp_value: sp_value[i]['sp_value'],
            goods_marketprice: sp_value[i]['marketprice'],
            goods_price: sp_value[i]['price'],
            goods_c_price: sp_value[i]['cprice'],
            goods_b_price: sp_value[i]['bprice'],
            goods_j_price: sp_value[i]['jprice'],
            goods_p_price: sp_value[i]['pprice'],
            goods_storage_alarm: sp_value[i]['alarm'],
            goods_serial: sp_value[i]['sku'],
            goods_storage: sp_value[i]['stock']
          }
        }

        this.spec_checked = spec_checked
        this.sgcate_id = res.result.store_class_goods
        let store_goods_class = res.result.store_goods_class
        for (var i in this.sgcate_id) {
          if (store_goods_class[this.sgcate_id[i]]) {
            this.sgcate_name[i] = store_goods_class[this.sgcate_id[i]].storegc_name
          }
        }
        this.ifLoad++
      }).catch(error => {
        Toast(error.message)
      })
    }
  },
  computed: {
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    },
    buildItems: function () {
      if (!this.items || !this.items[0]) {
        return []
      }
      let items = new Array()

      this.getDefaultItems(this.items, items)
      return items
    }
  },
  components: {
    Step,
    RegionPicker,
    transportForm,
    transportList
  },
  watch: {
    ifLoad: function () {
      if (this.attr_checked && this.attr_list && Object.keys(this.attr_checked).length && Object.keys(this.attr_list).length) {
        for (var i in this.attr_list) {
          for (var j in this.attr_list[i].value) {
            if (this.attr_checked.indexOf(this.attr_list[i].value[j].attrvalue_id) > -1) {
              this.attrValue[i] = this.attr_list[i].value[j].attrvalue_name
            }
          }
        }
      }
      if (this.spec_checked && Object.keys(this.spec_checked).length && this.spec_json && Object.keys(this.spec_json).length) {
        this.ifSpec = true
        var spvalue_ids = Object.keys(this.spec_checked)
        for (var i in this.spec_json) {
          var temp = Object.keys(this.spec_json[i])
          var arr = temp.filter(function (v) {
            return spvalue_ids.indexOf(v) !== -1 // 利用filter方法来遍历是否有相同的元素
          })
          if (arr.length) {
            this.sp_val[i] = arr
          }
        }
        this.getSpecArray()
      }
      this.$forceUpdate()
    }
  },
  methods: {
    hideSpecName () {
      this.showSpecName = false
      this.checkSpec()
      this.calcSpec()
    },
    goClass () {
      this.$router.push({ name: 'SellerGoodsForm1', query: { commonid: this.commonid } })
    },
    popAttr (index) {
      this.showAttrValue[index] = true
      this.$forceUpdate()
    },
    selectBrand (brand_id, brand_name) {
      this.goods.brand_name = brand_name
      this.goods.brand_id = brand_id
      this.showBrand = false
    },
    calcSpec () {
      let min_price
      let min_bprice
      let min_cprice
      let min_pprice
      let min_jprice
      let min_marketprice
      let total_storage = 0
      let goods_storage_alarm = 0
      let goods_serial
      for (var j in this.specArray.spvalue_key) {
        var i = this.specArray.spvalue_key[j]
        var temp = parseFloat(this.spec[i].goods_price)
        if (!isNaN(temp) && (typeof (min_price) === 'undefined' || min_price > temp)) {
          min_price = temp
          min_marketprice = this.spec[i].goods_marketprice
          min_pprice = this.spec[i].goods_p_price
          min_bprice = this.spec[i].goods_b_price
          min_cprice = this.spec[i].goods_c_price
          min_jprice = this.spec[i].goods_j_price
          goods_storage_alarm = this.spec[i].goods_storage_alarm
          goods_serial = this.spec[i].goods_serial
        }
        if (!isNaN(this.spec[i].goods_storage) && this.spec[i].goods_storage > 0) {
          total_storage += parseInt(this.spec[i].goods_storage)
        }
      }
      this.goods.goods_serial = goods_serial
      this.goods.goods_price = min_price
      this.goods.goods_p_price = min_pprice
      this.goods.goods_b_price = min_bprice
      this.goods.goods_c_price = min_cprice
      this.goods.goods_j_price = min_jprice
      this.goods.goods_marketprice = min_marketprice
      this.goods.goods_storage_alarm = goods_storage_alarm
      this.goods.goods_storage = total_storage
      this.showSpecValue = false
    },
    checkSpec () {
      this.ifSpec = false
      for (var k in this.sp_val) {
        if (this.sp_val[k].length) {
          this.ifSpec = true
          break
        }
      }

      this.getSpecArray()
    },
    addStoreClass () {
      this.sgcate_id.push(0)
      this.sgcate_name.push('')
    },
    getDefaultItems (_item, defaultItems) {
      defaultItems.push({
        flex: 1,
        values: _item,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: _item[0].children,
        textAlign: 'center'

      })
    },

    cancelClass () {
      this.showClassPicker = false
    },
    confirmClass () {
      let values = this.$refs.class_picker.getValues()
      var temp = values[1]
      if (!temp) {
        temp = values[0]
      }
      this.sgcate_name.splice(this.sgcate_index, 1, temp.value)
      this.sgcate_id[this.sgcate_index] = temp.id

      this.showClassPicker = false
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
    },
    cancelAttr (index) {
      this.showAttrValue[index] = false
      this.$forceUpdate()
    },
    confirmAttr (index) {
      let refStr = 'attr_picker_' + index
      let values = this.$refs[refStr][0].getValues()

      if (typeof (this.selectAttr[index]) === 'undefined') {
        this.selectAttr[index] = {
          name: this.attr_list[index].attr_name
        }
        this.selectAttr[index][values[0].attrvalue_id] = values[0].attrvalue_name
      }
      this.showAttrValue[index] = false
      this.attrValue[index] = values[0].attrvalue_name
      this.$forceUpdate()
    },

    saveTransport () {
      this.$refs.transportList.reload()
      this.showTransportForm = false
    },
    useTransport (transport_id, transport_title) {
      this.goods.transport_id = transport_id
      this.goods.transport_title = transport_title
      this.showTransportList = false
    },
    editTransport (transport_id) {
      this.transparentQuery = { action: 'edit', transport_id: transport_id }
      this.showTransportForm = true
    },
    onRegion (picker, values) {
      this.$refs.picker.currentValue = true
    },
    onPickerConfirm (values) {
      this.area_info = this.getRegionStr(values)

      this.goods.areaid_1 = values[0].area_id
      this.goods.areaid_2 = values[1].area_id
    },
    getRegionStr (values) {
      let title = ''
      for (let i = 0; i < values.length; i++) {
        const element = values[i]
        if (i !== 0) {
          title = title + ' ' + element.area_name
        } else {
          title = title + element.area_name
        }
      }
      return title
    },
    bodyDel (index) {
      this.bodyList.splice(index, 1)
    },
    bodyMove (index, mode) {
      if (mode == 'up') {
        this.bodyList.splice(index - 1, 2, this.bodyList[index], this.bodyList[index - 1])
      } else {
        this.bodyList.splice(index, 2, this.bodyList[index + 1], this.bodyList[index])
      }
    },
    confirmBodyAdd () {
      let bodyItem = { type: this.bodyType, value: '' }
      this.bodyList.splice(this.bodyIndex, 0, bodyItem)
      this.bodyAddVisible = false
      this.bodyEdit(this.bodyIndex, bodyItem)
    },
    bodyAdd (index) {
      this.bodyAddVisible = true
      this.bodyIndex = index
    },
    bodyEdit (index, item) {
      this.bodyEditVisible = true
      this.bodyItem = item
    },
    getSpecArray () {
      let sp_val = this.sp_val

      this.specArray = this.doExchange(sp_val)
      this.$forceUpdate
    },
    doExchange (arr) {
      var len = Object.keys(arr).length
      // 当数组大于等于2个的时候
      if (len >= 2) {
        var j = 0
        var myArr = []
        // 将新组合的数组并到原数组中
        var newArr = {}
        for (var i in arr) {
          if (myArr.length > 1) {
            if (arr[i].length) {
              newArr[i] = arr[i]
            }
          } else {
            if (i == 0 || arr[i].length) {
              myArr.push({ sp_id: i, spvalue_id: arr[i] })
            }
          }
          j++
        }

        if (myArr.length > 0) {
          var temp
          if (typeof (arr[0]) === 'undefined') {
            temp = { spvalue_id: [], spvalue_name: [] }
            for (var i in myArr[0].spvalue_id) {
              temp.spvalue_id[i] = [myArr[0].spvalue_id[i]]
              temp.spvalue_name[i] = [this.spec_json[myArr[0].sp_id][myArr[0].spvalue_id[i]].spvalue_name]
            }
          } else {
            temp = arr[0]
          }

          if (myArr.length > 1) {
            newArr[0] = { spvalue_id: [], spvalue_name: [] }
            var index = 0
            for (var i in temp.spvalue_id) {
              for (var j in myArr[1].spvalue_id) {
                newArr[0].spvalue_id[index] = temp.spvalue_id[i].concat([myArr[1].spvalue_id[j]])
                newArr[0].spvalue_name[index] = temp.spvalue_name[i].concat([this.spec_json[myArr[1].sp_id][myArr[1].spvalue_id[j]].spvalue_name])

                index++
              }
            }
          } else {
            newArr[0] = temp
          }
        } else {
          newArr[0] = []
        }

        // 执行回调
        return this.doExchange(newArr)
      } else {
        arr[0]['spvalue_key'] = []
        for (var i in arr[0].spvalue_id) {
          let color = null
          var spvalue_id_list = arr[0].spvalue_id[i]
          if (this.spec_list[1]) {
            for (var j in this.spec_list[1].value) {
              if (spvalue_id_list.indexOf(this.spec_list[1].value[j].spvalue_id) > -1) {
                color = this.spec_list[1].value[j].spvalue_id
              }
            }
          }
          var spvalue_name = arr[0].spvalue_name[i]
          var spvalue_id = arr[0].spvalue_id[i]
          var sp_value = {}
          for (var k in spvalue_name) {
            sp_value[spvalue_id[k]] = spvalue_name[k]
          }
          var spvalue_id_str = spvalue_id.sort(function (a, b) { return a - b }).join('')
          arr[0]['spvalue_key'].push(spvalue_id_str)
          if (typeof (this.spec[spvalue_id_str]) === 'undefined') {
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
            }
          }
        }

        return arr[0]
      }
    },
    goodsSpecAdd () {
      goodsSpecAdd(this.spec_add_value, this.class_id, this.sp_id).then(res => {
        this.sp_option[this.sp_id].push({
          label: this.spec_add_value,
          value: res.result.value_id
        })
        this.spec_json[this.sp_id][res.result.value_id] = {
          spvalue_name: this.spec_add_value,
          spvalue_id: res.result.value_id,
          spvalue_color: null
        }
        this.showSpecAdd = false
      }).catch(error => {
        Toast(error.message)
      })
    },
    nextStep () {
      if (isNaN(this.goods.goods_price) || this.goods.goods_price <= 0) {
        Toast('请检查价格')
        return
      }
      if (parseFloat(this.goods.goods_marketprice) < parseFloat(this.goods.goods_price) && parseFloat(this.goods.goods_marketprice) > 0) {
        Toast('市场价不能小于价格')
        return
      }
      if (isNaN(this.goods.goods_storage) || this.goods.goods_storage < 0) {
        Toast('请检查库存')
        return
      }
      if (this.goods.goods_storage_alarm && (isNaN(this.goods.goods_storage_alarm) || this.goods.goods_storage_alarm < 0)) {
        Toast('请检查库存预警值')
        return
      }
      this.goods.goods_discount = parseInt(this.goods.goods_price / this.goods.goods_marketprice * 100)
      var sp_val = {}
      for (var i in this.sp_val) {
        sp_val[i] = {}
        for (var j in this.sp_val[i]) {
          sp_val[i][this.sp_val[i][j]] = this.spec_json[i][this.sp_val[i][j]].spvalue_name
        }
      }
      if (this.ifFixedFreight) {
        this.goods.transport_id = 0
      }
      var spec = {}
      if (this.specArray) {
        for (i in this.specArray.spvalue_key) {
          spec[this.specArray.spvalue_key[i]] = this.spec[this.specArray.spvalue_key[i]]
        }
      }
      goodsSave(this.class_id, this.commonid, this.goods, this.bodyList, this.sgcate_id, spec, this.sp_name, sp_val, this.selectAttr, this.g_fccount, this.g_fcprefix).then(res => {
        if (!this.commonid) {
          this.$router.push({ name: 'SellerGoodsForm3', query: { commonid: res.result.commonid } })
        }
        Toast(res.message)
      }).catch(error => {
        Toast(error.message)
      })
    },
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage (type) {
      this.goods[type] = ''
      this.$forceUpdate()
    },

    uploadImage (type, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData()

      formdata.append('file', event.target.files[0])
      formdata.append('name', 'file')

      uploadInfoFile(formdata).then(res => {
        if (type == 'goods_body') {
          this.bodyItem.value = res.result.path
          this.bodyItem.value_url = res.result.url
          this.bodyEditVisible = false

        } else {
          this.goods[type] = res.result.path
          this.goods[type+"_url"] = res.result.url
        }
        this.$forceUpdate()
      }).catch(function (error) {
        Toast(error.message)
      })
    },
    datetimeConfirm (value) {
      this.goods.goods_shelftime = parseInt(value.getTime() / 1000)
      this.goods_shelftime = this.goods.goods_shelftime
    },
    onDatetime (picker, values) {
      this.$refs.datetimePicker.open()
    },
    dateConfirm (value) {
      this.goods.virtual_indate = parseInt(value.getTime() / 1000)
      this.virtual_indate = this.goods.virtual_indate
    },
    onDate (picker, values) {
      this.$refs.datePicker.open()
    },
    dateConfirm2 (value) {
      this.goods.presell_deliverdate = parseInt(value.getTime() / 1000)
      this.presell_deliverdate = this.goods.presell_deliverdate
    },
    onDate2 (picker, values) {
      this.$refs.datePicker2.open()
    },
    dateConfirm3 (value) {
      this.goods.appoint_satedate = parseInt(value.getTime() / 1000)
      this.appoint_satedate = this.goods.appoint_satedate
    },
    onDate3 (picker, values) {
      this.$refs.datePicker3.open()
    },
    dateConfirm4 (value) {
      this.goods.goods_scdate = parseInt(value.getTime() / 1000)
      this.goods_scdate = this.goods.goods_scdate
     this.$forceUpdate()
    },
    onDate4 (picker, values) {
      this.$refs.datePicker4.open()
    }
  }
}
</script>
<style>
    .goods-form-2 input[readonly]{color:#999}
</style>
<style scoped lang="scss">
    .container{
        background: #fff;
        .label{
            padding:.5rem;
            font-size: .7rem;
            background: #eee;
        }
        .user-avatar-wrapper{display: inline-block;vertical-align: top;margin-right: .5rem;margin-bottom:.5rem}
        .user-avatar-wrapper .del-btn{position:absolute;bottom:.2rem;right:.2rem}
        .user-avatar {
            display: block;
            border:1px solid #eee;
            position: relative;
            width: 5rem;
            height: 5rem;
            margin: 0 auto;
            text-align: center;
            img {
                width: 100%;
                height: 100%
            }
            input {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0
            }
            .center-text{padding:.2rem;padding-top:3.5rem;font-size:.6rem}
        }
        .user-avatar::before {
            position: absolute;
            font-size: 1.5rem;
            line-height: 5rem;
            left: 50%;
            margin-left: -.75rem;
            color: rgba(0, 0, 0, 0.5)
        }
        .btn-wrapper{display:flex;
            .btn{flex:1}
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
        .body-list{
            .body-item{padding:1rem;position:relative;min-height:2.2rem;font-size:.6rem;
                img{max-width:100%}
                .btn-list{text-align:right;background:rgba(0,0,0,.5);position:absolute;top:.5rem;bottom:.5rem;left:.5rem;right:.5rem;padding:.5rem;box-sizing:border-box;
                    i{font-size:1.2rem;margin-left:.5rem;color:#fff;}
                }
            }
        }
        .middle-popup{width:80%}
        .brand-list{
            h2{line-height:2rem;font-size:.7rem;padding-left:.5rem;font-weight:700;}
            ul{overflow: hidden;border-top:1px solid #f6f6f9}
            li{
                box-sizing: border-box;
                text-align: center;
                width: 25%;
                padding-bottom:20%;
                float: left;
                border-bottom: 1px solid #f6f6f9;
                border-right: 1px solid #f6f6f9;
                position:relative;
                .p-img{
                    position:absolute;
                    top:.5rem;
                    bottom:.5rem;
                    right:.5rem;
                    left:.5rem;
                    background-size:contain;
                    background-position:center;
                    background-repeat:no-repeat;
                }

            }
            li:nth-child(4n) {
                border-right: 0;
            }
        }
    }
    .toolbar {
        height: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        background-color: #f0f2f5;
        .toolbar-item {
            font-size: .6rem;
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
            line-height: 2rem;
            font-size:.8rem;
        }
    }
</style>
