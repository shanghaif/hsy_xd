<template>
<div>
  <div class="step2" :class="{popMap_mmap:popMap}">
    <div class="common-header-wrap">
      <mt-header title="店铺入驻" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <div class="label">店铺信息</div>
    <mt-field class="import" label="商家账号" v-model="storeJoinin.seller_name"></mt-field>
    <mt-field class="import" :label="storeJoinin.store_type==1?'店铺名称':'公司名称'" v-model="storeJoinin.company_name"></mt-field>
    <div class="import" @click="onRegion('company_address')"><mt-cell title="所在地" is-link>{{storeJoinin.company_address}}</mt-cell></div>
    <div class="import" @click="popMap=true"><mt-cell title="地理位置" is-link>{{storeJoinin.store_longitude}}/{{storeJoinin.store_latitude}}</mt-cell></div>
    <mt-field class="import" label="详细地址" v-model="storeJoinin.company_address_detail"></mt-field>
    <mt-field class="import" label="法人" v-model="storeJoinin.contacts_name"></mt-field>
    <mt-field class="import" label="电话" v-model="storeJoinin.contacts_phone"></mt-field>
	  <mt-field v-show="false" class="import" label="注册资金" v-model="storeJoinin.company_registered_capital"></mt-field>
    <mt-field v-show="false" label="电子邮箱" v-model="storeJoinin.contacts_email"></mt-field>
    <!-- 店铺分类 -->
    <mt-field v-show="false" class="import" label="店铺名称" v-model="storeJoinin.store_name"></mt-field>
    <div  v-show="false" class="import" @click="showStoreGrade=true"><mt-cell title="店铺等级" is-link>{{storeJoinin.storegrade_name}}</mt-cell></div>
    <div v-show="false" class="import" @click="showStoreTime=true"><mt-cell title="开店时长" is-link>{{storeJoinin.joinin_year?(storeJoinin.joinin_year+'年'):''}}</mt-cell></div>
    <div class="import storeclass" @click="$refs.secondselect.currentValue=true"><mt-cell title="店铺分类" is-link>{{storeJoinin.storeclass_name}}</mt-cell></div>
    <div v-show="false" @click="showGoodsClass=true"><mt-cell title="经营类目" is-link></mt-cell></div>
    
   
    <mt-button size="large" type="primary" @click="submitStoreData">提交申请</mt-button>
    <!-- 三级地址下拉框 -->
    <div>
      <region-picker ref="picker" @onConfirm="onPickerConfirm"></region-picker>
    </div>
    <!-- 地图 -->
    <div v-if="popMap"  class="mmap "  >
      <!-- 头部信息 -->
      <div class="common-header-wrap">
        <mt-header title="长按抓取位置" class="common-header">
          <mt-button slot="left" icon="back" @click="popMap=false"></mt-button>
        </mt-header>
      </div>
      <!-- 地图主体 -->
      <div class="common-popup-content" :style="{height:endHeight}">
        <baidu-map
          class="map" 
          :center="{lng: 115.579356, lat: 34.875037}" 
          :zoom="15" 
          :scroll-wheel-zoom="true" 
          :auto-resize="true" 
          :style="select"
          @longpress="getPoint"
          @click="getPoint"
          > 
          <bm-control>
            <div class="ui-form-area">
              <div class="ui-form-control">
                <input v-model="keyword" type="text" placeholder="输入地名" class="ui-form-input  ">
              </div>
            </div>
          </bm-control>
          <bm-local-search :keyword="keyword" :auto-viewport="true" /> 
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getPoint"></bm-geolocation>            
          <bm-marker :position="add.p" >           
            <bm-info-window :show="add.show" @close="pWindowClose" @open="pWindowOpen" style="font-size: 14px">          
              <p>地址：{{ add.site }}</p>           
            </bm-info-window>
          </bm-marker>                
        </baidu-map>
      </div>
    </div>
    
    <!-- 店铺等级 -->    
    <mt-popup v-model="showStoreGrade" position="bottom">
      <mt-picker ref="store_grade_picker" :slots="store_grade_options" valueKey="storegrade_name" @change="onStoreGradeChange" showToolbar>
        <div class="toolbar">
          <button class="toolbar-item cancel-item" @click="showStoreGrade = false">取消</button>
          <div class="picker-header">选择店铺等级</div>
          <button class="toolbar-item confirm-item" @click="confirmStoreGrade">确定</button>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 开店时长 -->    
    <mt-popup v-model="showStoreTime" position="bottom">
      <mt-picker ref="store_time_picker" :slots="store_time_options" valueKey="time_text" @change="onStoreTimeChange" showToolbar>
        <div class="toolbar">
          <button class="toolbar-item cancel-item" @click="showStoreTime = false">取消</button>
          <div class="picker-header">选择开店时长</div>
          <button class="toolbar-item confirm-item" @click="confirmStoreTime">确定</button>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 店铺分类 --> 
    <second-select
      @onConfirm="getonConfirm"
      title="店铺分类"
      v-if="storeArr.length>0" ref="secondselect"
      :items="storeArr">
    </second-select>
    <!-- 经营类目 -->      
    <mt-popup v-model="showGoodsClass" position="right" class="common-popup-wrapper">
      <div class="common-header-wrap">
        <mt-header title="经营类目" class="common-header">
          <mt-button slot="left" icon="back" @click="showGoodsClass=false"></mt-button>
          <mt-button slot="right" @click="addGoodsClass">新增</mt-button>
        </mt-header>
      </div>
      <div class="common-popup-content" v-if="storeJoinin.store_class_names">
        <div v-for="(goods_class,index) in storeJoinin.store_class_names"
          :key="index"
          @click="classIndex=index;classVisible=true">
          <mt-cell :title="goods_class?goods_class:'请选择分类'" 
            :value="(storeJoinin.store_class_commis_rates && storeJoinin.store_class_commis_rates[index])?(storeJoinin.store_class_commis_rates[index]+'%'):''"></mt-cell></div>
      </div>
    </mt-popup>
    <!-- 选择经营类目 -->
    <mt-popup v-model="classVisible" position="bottom">
      <mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
        <div class="toolbar">
          <button class="toolbar-item cancel-item" @click="classVisible=false">取消</button>
          <div class="picker-header">选择经营分类</div>
          <button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
        </div>
      </mt-picker>
    </mt-popup>

  </div>
  
  
</div>
</template>
<script>


import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import RegionPicker from '../../RegionPicker'
import $ from "jquery";
import CropImg from '../../CropImg'
import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2 } from '../../../api/seller';

import SecondSelect from '../../SecondSelect';
import { getStoreGrade } from '../../../api/seller';

export default {
  components: {
    RegionPicker,
    SecondSelect,    
  },
  data () {
    return {
      
      store_grade_options: [],  
      showStoreGrade: false,   // 店铺等级
      showStoreTime: false,    // 开店时长
      storeArr: [],            // 店铺分类
      showGoodsClass: false,   // 经营类目
      classVisible: false,     // 选择经营类目
      
      store_time_options: [{
        flex: 1,
        values: [{ time_number: 1, time_text: '1年' }, { time_number: 2, time_text: '2年' }],
        textAlign: 'center'
      }],  // 开店时长 列表

      keyword: "", //关键词
      endHeight:null,//地图高度
		select:{width:'100%', height:'',marginBottom: '15px'},
		  lng: 0,
		  lat: 0,
		fullscreen: false,
		  add: {
		  			show: false,
					p:{lng: 0, lat: 0},
		  			siteName:'',
		  			site: ''
		  		},
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '店铺信息' }, { title: '合同签订' }],
      showimage: '',
      isshow: false,
      popMap: false,
      selectData: '',
      dataName: '',

    }
  },
  watch:{
    popMap:function(v){
      if( v == true ){
        this.endHeight = $(window).height() - $(".mint-header").height() - $('.common-footer').height()+'px !important';
      }
    },
  },

  mounted () {
    this.hh();
  },

  computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin,
      items: state => state.goodsclass.items,
      editState: state => state.seller.editState,//拒绝后去修改
    }),
    
    buildItems: function () {
      if (!this.items || !this.items[0]) {
        return []
      }
      let items = new Array()

      this.getDefaultItems(this.items, items)
      return items
    }
  },
  created: function () {
    // 获取 详情
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin;
      if (store_joinin) {
        // if ( store_joinin.joinin_state == 10 ||store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
        //   if( !this.editState ){
        //     this.$router.push({ name: 'SellerPerfect3' })
        //     return
        //   }
        // }
        if (store_joinin.joinin_state == 40) {
          Toast('您的店铺已开通')
          this.$router.push({ name: 'HomeSellerLogin' })
          return
        }
        this.sellerJoininSave({ storeJoinin: store_joinin });
        this.sellerJoininSave({ storeJoinin: {store_type:0} });
      }
    }).catch(error => {
      Toast(error.message)
    })

    // 获取 店铺等级列表    
    getStoreGrade().then(res => {
      var store_grade = res.result.storegrade_list
      this.store_grade_options = [{
        flex: 1,
        values: store_grade,
        textAlign: 'center'
      }]
    }).catch(error => {
      Toast(error.message)
    })
    // 获取 店铺分类    
    this.utils.getSpecialIdentity().then(store=>{
      for( var item of store ){
        item.id = item.storeclass_id;
        item.name = item.storeclass_name;
        for( var end of item.child ){
          end.id = end.storeclass_id;
          end.name = end.storeclass_name;
        }
      }
      this.storeArr = store;
    }).catch(err=>{
      Toast(err)
    })

    // 获取 经营类目    
    this.fetchGoodsclassList();
  },

  methods: {    
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList',    //  获取 经营类目
    }),
    ...mapMutations({
      memberPoint: 'memberPoint',
      sellerJoininSave: 'sellerJoininSave'
    }),

    hh(){this.select.height=(window.innerHeight)-30+'px'},
  
    getPoint(e){
      this.add.p = e.point;
      this.add.show = true;
      let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
      geocoder.getLocation(e.point,rs=>{
        this.add.site = rs.address;
        this.storeJoinin.company_address_detail = this.add.site
      });			
      this.storeJoinin.store_longitude = this.add.p.lng
      this.storeJoinin.store_latitude = this.add.p.lat
      this.$forceUpdate()
    },
  
    pWindowClose () {
      this.add.show = false
    },
	
    pWindowOpen () {
      setInterval(()=>{
      this.add.show = true;
    },100)
    },

    // 点击下一步
    submitStoreData () {
      if( !this.storeJoinin.company_name ){
        Toast('请输入公司名称');
        return false;
      }
      this.storeJoinin.store_name = this.storeJoinin.company_name
      if( !this.utils.IsStandard( this.storeJoinin.company_name ) ){
        Toast('请检查公司名称（汉字或英文或数字格式）');
        return false;
      }
      if( !this.storeJoinin.company_address ){
        Toast('请选择所在地区');
        return false;
      }
      if( !this.storeJoinin.store_longitude ){
        Toast('请选择地理位置');
        return false;
      }
      if( !this.storeJoinin.company_address_detail ){
        Toast('请输入详细地址');
        return false;
      }
      // if( !this.storeJoinin.company_registered_capital ){
      //   Toast('请输入注册资金');
      //   return false;
      // }
      // if( !/^[0-9]*$/.test(this.storeJoinin.company_registered_capital) ){
      //   Toast('注册资金必须为正整数');
      //   return false;
      // }

      if( !this.storeJoinin.contacts_name ){
        Toast('请输入法人姓名');
        return false;
      }
      if( !this.utils.IsChinese(this.storeJoinin.contacts_name) ){
        Toast('法人姓名必须为汉字格式');
        return false;
      }
      if( !this.storeJoinin.contacts_phone ){
        Toast('请输入电话');
        return false;
      }if( !this.utils.checkIsTel(this.storeJoinin.contacts_phone) ){
        Toast("请检查电话格式");
        return false;
      }
      if( !this.storeJoinin.seller_name ){
        Toast("请输入商家账号");
        return false;
      }
      // if( !this.storeJoinin.store_name ){
      //   Toast("请输入店铺名称");
      //   return false;
      // }
      // if( !this.utils.IsStandard(this.storeJoinin.store_name )){
      //   Toast("请检查店铺名称（不得包含特殊符号）");
      //   return false;
      // }
      // if( !this.storeJoinin.storegrade_name ){
      //   Toast("请选择店铺等级");
      //   return false;
      // }
      // if( !this.storeJoinin.joinin_year ){
      //   Toast("请选择开店时长");
      //   return false;
      // }
      if( !this.storeJoinin.storeclass_id ){
        Toast("请选择店铺分类");
        return false;
      }
      this.storeJoinin.store_type = ((this.storeJoinin.storeclass_id+'').slice(0,3) == '105')?2:0;

      
      this.storeJoinin.company_registered_capital = '';
      this.storeJoinin.storegrade_name = '系统默认';
      this.storeJoinin.joinin_year = '1';
      this.storeJoinin.contacts_email = '';
      this.storeJoinin.storegrade_id = '1';
      // console.log(this.storeJoinin);
      // return false;
      saveStoreJoinin2(this.storeJoinin).then(res => {
        this.sellerJoininSave({ storeJoinin: this.storeJoinin });
        Toast(res.message);  
        this.$router.push({ name: 'HomeSellerLogin' })
      }).catch(error => {
        Toast(error.message);
      })
    },
    
    // 三级地址 下拉框
    onPickerConfirm (values) {
      this.storeJoinin.company_address = this.getRegionStr(values);
      this.storeJoinin.company_province_id = values[values.length - 1].area_id;
      this.$forceUpdate()
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

    // 所在地
    onRegion (name) {
      this.$refs.picker.currentValue = true;
    },

    //店铺等级
    onStoreGradeChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
    },
    
    confirmStoreGrade () {
      let values = this.$refs.store_grade_picker.getValues();
      this.storeJoinin.storegrade_name = values[values.length - 1].storegrade_name;
      this.storeJoinin.storegrade_id = values[values.length - 1].storegrade_id;
      this.showStoreGrade = false;
    },
    //店铺等级

    // 开店时长    
    confirmStoreTime () {
      let values = this.$refs.store_time_picker.getValues();
      this.storeJoinin.joinin_year = values[values.length - 1].time_number;
      this.showStoreTime = false;
    },    
    onStoreTimeChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
    },

    // 店铺分类
    getonConfirm(arr){
      this.storeJoinin.storeclass_id = arr[1].id;
      this.storeJoinin.storeclass_name = arr[1].name;
      this.$forceUpdate();
    },

    // 经营类目 列表数据    
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
      defaultItems.push({
        flex: 1,
        values: (_item[0].children && _item[0].children.length) ? _item[0].children[0].children : [],
        textAlign: 'center'

      })
    },
    // 新增 
    addGoodsClass () {
      if (!this.storeJoinin.store_class_names) {
        this.storeJoinin.store_class_names = []
      }
      this.storeJoinin.store_class_names.push('')
      this.$forceUpdate()
    },
    // 经营类目更改
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },
    // 经营类目确定
    confirmClass () {
      let values = this.$refs.class_picker.getValues()
      if (!this.storeJoinin.store_class_ids) {
        this.storeJoinin.store_class_ids = []
      }
      if (!this.storeJoinin.store_class_commis_rates) {
        this.storeJoinin.store_class_commis_rates = []
      }
      var store_class_names = ''
      var store_class_ids = ''
      var index=0
      for (var i in values) {
        if(values[i]){
          index=i
          if (!store_class_names) {
            store_class_names = values[i].value
            store_class_ids = values[i].id
          } else {
            store_class_names += ',' + values[i].value
            store_class_ids += ',' + values[i].id
          }
        }
      }
      this.storeJoinin.store_class_names[this.classIndex] = store_class_names
      this.storeJoinin.store_class_ids[this.classIndex] = store_class_ids
      this.storeJoinin.store_class_commis_rates[this.classIndex] = values[index].commis_rate
      this.classVisible = false
      this.$forceUpdate()
    },

  }
}
</script>
<style  lang="scss" scoped>
.step2{
  .map{height:100% !important;}
  &/deep/ .mint-cell-title{
    width: 32%;
  }
  &/deep/ .mint-cell-text{
    padding-left: .66rem;
  }
  .import {
    // & /deep/ input::-webkit-input-placeholder{
    //   color: red;
    //   font-size: 1.2rem;
    //   transform: translate(0,30%);
    // }
    & /deep/ .mint-cell-text{
      position: relative;
    }
    & /deep/ .mint-cell-text::after{
      content: "*";
      color: red;
      font-size: 1.2rem;
      position: absolute;
      left: .1rem;
      top: .1rem;
    }
  }
  .pink{
    & /deep/ .mint-cell-text::after{
      color: pink;
    }
  }
  .three{
    color: pink;
  }
}

  .container {
    background: #fff;
  }
  .label {
    padding: .5rem;
    font-size: .7rem;
    background: #eee;
  }
  .user-avatar-wrapper{display: inline-block;vertical-align: top;margin-right: .5rem;margin-bottom:.5rem}
  .user-avatar-wrapper .del-btn{
    mix-blend-mode: difference;
    font-size: 1.6rem;
    position: absolute;
    bottom: .2rem;
    right: .2rem;
  }
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
input,
input:focus{outline: none; border: none;}

.ui-form-area{margin-bottom: 1em;}

.ui-form-control{padding: 0.6em 1em 0.65em; border-radius: 1.5em; background-color: #eee;}

.ui-form-input{width: 100%; background-color: transparent;}

.ui-form-input,
.ui-form-input:focus{outline: none; border: none; color: #2c333a; font-size: 0.9em;}

.mmap { position:absolute; width:100%;bottom:30px;left:1px; top:1px; z-index:999} 

	.ui-form-control {
		padding: 0.2em 0.5em 0.2em;
		border-radius: 1em;
		background-color: #fff;

		.select_content {
			// color: #777;
			// font-size: 0.9em;
		}
  }

  // 
  .popMap_mmap{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

	.mmap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 999;

    &/deep/
    .anchorTL {
      top: .2rem !important;
      left: .2rem !important;
      input {
        width: 80vw;
        padding-left: .2rem;
        font-size: .8rem;
        line-height: .2rem;
        height: 0.2rem;
        vertical-align: middle;
        padding: .8rem .2rem;
      }
    }

    .common-popup-content{
      height: auto;
      width: 100vw;
    }

    .map{
      margin-bottom: 0!important;
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
