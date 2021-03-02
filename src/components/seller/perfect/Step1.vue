<template>
<div>
  <div class="step2" :class="{popMap_mmap:popMap}"  v-show="cropDataShow">
    <div class="common-header-wrap">
      <mt-header title="店铺入驻" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <step :options="options" :active="0"></step>
    <!-- 旧版本 隐藏 -->
    <div>      
      <div class="label">店铺及联系人信息</div>
      <mt-field class="import" :label="storeJoinin.store_type==1?'店铺名称':'公司名称'" v-model="storeJoinin.company_name"></mt-field>
      <div class="import" @click="onRegion('company_address')"><mt-cell title="所在地" is-link>{{storeJoinin.company_address}}</mt-cell></div>
      <div class="import" @click="popMap=true"><mt-cell title="地理位置" is-link>{{storeJoinin.store_longitude}}/{{storeJoinin.store_latitude}}</mt-cell></div>
      <mt-field class="import" label="详细地址" v-model="storeJoinin.company_address_detail"></mt-field>
      <mt-field class="import" type="number"  label="注册资金（万元）" v-model="storeJoinin.company_registered_capital"></mt-field>
      <mt-field class="import" label="联系人姓名" v-model="storeJoinin.contacts_name"></mt-field>
      <mt-field class="import" label="联系人电话" v-model="storeJoinin.contacts_phone"></mt-field>
      <mt-field label="电子邮箱" v-model="storeJoinin.contacts_email"></mt-field>      
    </div>
    <!-- 旧版本 隐藏 结束 -->

    <div class="label">营业执照信息（副本）</div>
    <!-- <mt-field class="import" label="许可证编号" v-model="storeJoinin.b_xk_no"></mt-field> -->
    <mt-field class="import pink pt-5" label="许可证编号" v-model="storeJoinin.b_xk_no"></mt-field>
    <mt-field class="import" label="营业执照号" v-model="storeJoinin.business_licence_number"></mt-field>
    <div class="import" @click="onRegion('business_licence_address')"><mt-cell title="营业执照所在地" is-link>{{storeJoinin.business_licence_address}}</mt-cell></div>
    <div class="import" @click="onDate('business_licence_start')"><mt-cell title="有效期起始" is-link>{{storeJoinin.business_licence_start}}</mt-cell></div>
    <div class="import" @click="onDate('business_licence_end')"><mt-cell title="有效期结束" is-link>{{storeJoinin.business_licence_end}}</mt-cell></div>
    <div class="import pink">
      <mt-cell title="营业执照长期有效"><mt-switch v-model="idSwitch" style="margin-right:8px"></mt-switch></mt-cell>      
    </div>
    <mt-field class="import"  label="经营范围" v-model="storeJoinin.business_sphere"></mt-field>
    <mt-cell class="import pt-5" title="营业执照电子版">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.business_licence_number_electronic" class="user-avatar">
          <img :src="storeJoinin.business_licence_number_electronic_url" @click="openImage(storeJoinin.business_licence_number_electronic_url)">
          <span @click="dropImage('business_licence_number_electronic')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('business_licence_number_electronic',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="import three pt-5" title="生产许可、经营许可、登记证(三选一)">
     
    </mt-cell>
    <mt-cell class="import pink pt-5" title="生产许可">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk2" class="user-avatar">
          <img :src="storeJoinin.b_xk2_url" @click="openImage(storeJoinin.b_xk2_url)">
          <span @click="dropImage('b_xk2')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_xk2',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="import pink pt-5" title="经营许可">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk1" class="user-avatar">
          <img :src="storeJoinin.b_xk1_url" @click="openImage(storeJoinin.b_xk1_url)">
          <span @click="dropImage('b_xk1')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_xk1',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="import pink pt-5" title="小餐饮、小作坊登记证">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk3" class="user-avatar">
          <img :src="storeJoinin.b_xk3_url" @click="openImage(storeJoinin.b_xk3_url)">
          <span @click="dropImage('b_xk3')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_xk3',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="pt-5" title="负责人健康证">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_fzrjkz" class="user-avatar">
          <img :src="storeJoinin.b_fzrjkz_url" @click="openImage(storeJoinin.b_fzrjkz_url)">
          <span @click="dropImage('b_fzrjkz')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_fzrjkz',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="pt-5" title="安全员健康证">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_aqyjkz" class="user-avatar">
          <img :src="storeJoinin.b_aqyjkz_url" @click="openImage(storeJoinin.b_aqyjkz_url)">
          <span @click="dropImage('b_aqyjkz')" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_aqyjkz',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-button size="large" type="primary" @click="nextStep">下一步</mt-button>

    <div>
      <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
        <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
      </mt-popup>
    </div>
    <div>
      <region-picker ref="picker" @onConfirm="onPickerConfirm"></region-picker>
      <mt-datetime-picker
              ref="datePicker"
              type="date"
              :startDate="new Date('2000/1/1')"
              :endDate="new Date('2055/12/31')"
              yearFormat="{value}年"
              monthFormat="{value}月"
              dateFormat="{value}日"
              :value="selectData?(new Date(selectData)):(new Date())"
              @confirm="dateConfirm"
      >
      </mt-datetime-picker>
    </div>
    <!-- <div> -->
      <div v-if="popMap"  class="mmap "  >
        <div class="common-header-wrap">
          <mt-header title="长按抓取位置" class="common-header">
            <mt-button slot="left" icon="back" @click="popMap=false"></mt-button>
          </mt-header>
        </div>
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
    <!-- </div> -->
  </div>
  
		<crop-img ref="cropImg" @haveCropImgData="fun_getCropImgData"></crop-img>
  
</div>
</template>
<script>


import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import Step from '../../Step'
import RegionPicker from '../../RegionPicker'
import $ from "jquery";
import CropImg from '../../CropImg'

import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2, getStcomByxkz, setSellerXkz, uploadCropImg } from '../../../api/seller'

export default {
  components: {
    Step,
    RegionPicker,
    "crop-img": CropImg
    
  },
  data () {
    return {
			cropImgIndex:null,    // 裁切的图片名称
			cropDataShow:true,    // 切换 插件 隐藏 表单页面
      
      b_xk_noTime: null,
      keyword: "", //关键词
      idSwitch:false,  //营业执照证长期有效
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
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '合同签订' }],
      showimage: '',
      isshow: false,
      popMap: false,
      selectData: '',
      regionName: '',
      dataName: '',

      old_b_xk_no: null, // 许可证 是否在库中
    }
  },
  watch:{
    popMap:function(v){
      if( v == true ){
        // console.log($(window).height());
        // console.log($(".mint-header").height());
        // console.log($('.common-footer').height());
        this.endHeight = $(window).height() - $(".mint-header").height() - $('.common-footer').height()+'px !important';
        // console.log(this.endHeight);
      }
    },

    idSwitch:function(v){
      if( v ){
        this.storeJoinin.business_licence_end = '2220/1/01';
      }else{
        this.storeJoinin.business_licence_end = this.storeJoinin.business_licence_end;
        // this.storeJoinin.business_licence_end = '2000/1/01';
      }
    }
  },
  mounted () {
    this.hh();
    $('.three ')
  },
  computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin,
      editState: state => state.seller.editState,//拒绝后去修改
    }),
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    }
  },
  created: function () {
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin;
      if (store_joinin) {
        // console.log(123,store_joinin);
        if ( store_joinin.joinin_state == 10 ||store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
          if( !this.editState ){
            this.$router.push({ name: 'SellerPerfect3' })
            return
          }
        }
        // if (store_joinin.joinin_state == 40) {
        //   Toast('您的店铺已开通')
        //   this.$router.push({ name: 'HomeSellerLogin' })
        //   return
        // }
        // if (!this.storeJoinin) {
          // console.log(store_joinin);
          this.sellerJoininSave({ storeJoinin: store_joinin });
          this.sellerJoininSave({ storeJoinin: {store_type:0} });
          if( this.storeJoinin.business_licence_end == "2220-01-01" ){
            this.idSwitch = true;
          }
          this.$forceUpdate();
        // }
      }
    }).catch(error => {
      Toast(error.message)
    })
  },

  methods: {
    ...mapMutations({
      memberPoint: 'memberPoint',
      sellerJoininSave: 'sellerJoininSave'
    }),
	hh(){this.select.height=(window.innerHeight)-30+'px'},
	getPoint(e){  
	
		// console.log(e.target)	
			this.add.p = e.point;
			this.add.show = true;
			let geocoder= new BMap.Geocoder();  //创建地址解析器的实例
			geocoder.getLocation(e.point,rs=>{
				this.add.site = rs.address;
				this.storeJoinin.company_address_detail = this.add.site
			});
			//this.memberPoint({ point: { lng: this.add.p.lng, lat: this.add.p.lat, address: this.add.site, cityCode: '' } })
			
			this.storeJoinin.store_longitude = this.add.p.lng
			this.storeJoinin.store_latitude = this.add.p.lat
			this.$forceUpdate()
	},
	pWindowClose () {
	  this.add.show = false
	},
	
	pWindowOpen () {
	   setInterval(()=>{
	   this.add.show = true
	 },100)
	},
    nextStep () {
      if( !this.storeJoinin.company_name ){
        Toast('请输入公司名称');
        return false;
      }
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
      if( !this.storeJoinin.company_registered_capital ){
        Toast('请输入注册资金');
        return false;
      }
      if( !/^[0-9]*$/.test(this.storeJoinin.company_registered_capital) ){
        Toast('注册资金必须为正整数');
        return false;
      }
      if( !this.storeJoinin.contacts_name ){
        Toast('请输入联系人姓名');
        return false;
      }
      if( !this.utils.IsChinese(this.storeJoinin.contacts_name) ){
        Toast('联系人姓名必须为汉字格式');
        return false;
      }
      if( !this.storeJoinin.contacts_phone ){
        Toast('请输入联系人电话');
        return false;
      }if( !this.utils.checkIsTel(this.storeJoinin.contacts_phone) ){
        Toast("请检查联系人电话格式");
        return false;
      }
      if( this.storeJoinin.b_xk_no ){
        if( !this.utils.IsEnglishNum(this.storeJoinin.b_xk_no)){
          Toast('请检查许可证编号');
          return false;
        }
      }
      if( !this.storeJoinin.business_licence_number ){
        Toast('请输入营业执照号');
        return false;
      }
      if( !this.utils.IsEnglishNum(this.storeJoinin.business_licence_number) ){
        Toast('请检查营业执照号');
        return false;
      }
      if( !this.storeJoinin.business_licence_address ){
        Toast('请选择营业执照所在地');
        return false;
      }
      if( !this.storeJoinin.business_licence_start ){
        Toast('请选择有效起始时间');
        return false;
      }
      if( !this.storeJoinin.business_licence_end ){
        Toast('请选择有效结束时间');
        return false;
      }
      if( new Date(this.storeJoinin.business_licence_end).getTime() <= new Date(this.storeJoinin.business_licence_start).getTime() ){
        Toast('请检查营业执照起始/结束日期');
        return false;
      }
      if( !this.storeJoinin.business_sphere ){
        Toast('请输入经营范围');
        return false;
      }
      if( !this.storeJoinin.business_licence_number_electronic ){
        Toast('请上传营业执照');
        return false;
      }

      if( !this.storeJoinin.b_xk1 & !this.storeJoinin.b_xk2  & !this.storeJoinin.b_xk3  ){
        Toast('请选择生产许可，经营许可，小餐饮作坊登记证其中一项');
        return false;
      }
      this.storeJoinin.store_type = 0;

      // 验证许可证
      setSellerXkz(this.storeJoinin.b_xk_no,this.old_b_xk_no).then(res=>{
        //  如果 表中含有 此许可证 正常走 下一步
        saveStoreJoinin2(this.storeJoinin).then(res => {
          this.sellerJoininSave({ storeJoinin: this.storeJoinin })
          this.$router.push({ name: 'SellerPerfect2' })
        }).catch(error => {
          Toast(error.message);
        })
      }).catch(err=>{        
        // 否则 给与 提示信息
        Toast(err.message);
        this.old_b_xk_no = err.result.data;
        // this.storeJoinin.b_xk_no = '';
        this.$forceUpdate();
      });
      return false;

        if( this.storeJoinin.b_xk_no ){
          getStcomByxkz(this.storeJoinin.b_xk_no).then(res=>{
            //  如果 表中含有 此许可证 正常走 下一步
            saveStoreJoinin2(this.storeJoinin).then(res => {
              this.sellerJoininSave({ storeJoinin: this.storeJoinin })
              this.$router.push({ name: 'SellerPerfect2' })
            }).catch(error => {
              Toast(error.message);
            })
          }).catch(err=>{
            //  如果 表中含有 此许可证 正常走 下一步
            saveStoreJoinin2(this.storeJoinin).then(res => {
              // 否则 给与 提示信息
              Toast(err.message);
              var Time = setTimeout(()=>{
                this.sellerJoininSave({ storeJoinin: this.storeJoinin })
                clearTimeout(Time);
                Time = null;
                this.$router.push({ name: 'SellerPerfect2' })
              },1200)
            }).catch(error => {
              Toast(error.message);
            })
          })
        }else{
          saveStoreJoinin2(this.storeJoinin).then(res => {
            this.sellerJoininSave({ storeJoinin: this.storeJoinin })
            this.$router.push({ name: 'SellerPerfect2' })
          }).catch(error => {
            Toast(error.message);
          })
        }
    },
    setPosition (lat, lng, name) {
      this.popMap = false
      this.storeJoinin.company_address_detail = name
      this.storeJoinin.store_longitude = lng
      this.storeJoinin.store_latitude = lat
      this.$forceUpdate()
    },
    dateConfirm (value) {
      this.storeJoinin[this.dataName] = value.getFullYear() + '/' + (value.getMonth() + 1) + '/' + value.getDate();
      this.idSwitch = false;
      this.b_xk_noTime = new Date(value).getTime();
      this.$forceUpdate()
    },
    onDate (name) {
      if (this.storeJoinin[name]) {
        this.selectData = this.storeJoinin[name]
      }
      this.dataName = name
      this.$refs.datePicker.open()
    },
    onPickerConfirm (values) {
      if (this.regionName == 'company_address') {
        this.storeJoinin.company_address = this.getRegionStr(values)
        this.storeJoinin.company_province_id = values[values.length - 1].area_id
      }
      if (this.regionName == 'business_licence_address') {
        this.storeJoinin.business_licence_address = this.getRegionStr(values)
      }
      this.selectCity(values.length > 1 ? values[1].area_name : values[0].area_name)
      this.$forceUpdate()
    },
    onRegion (name) {
      this.regionName = name
      this.$refs.picker.currentValue = true
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
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage (type) {
      this.storeJoinin[type] = ''
      this.$forceUpdate()
    },
    uploadImage (type, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData();
      if( event.target.files[0].size >200*1024 ){
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
      formdata.append('file', event.target.files[0])
      formdata.append('name', 'file')
//alert(type)
      uploadInfoFile(formdata).then(res => {
        this.storeJoinin[type] = res.result.path
        this.storeJoinin[type+"_url"] = res.result.url
        this.$forceUpdate()
      }).catch(function (error) {
        Toast(error.message)
      })
    },

    

    // 图片 接收 图片
    fun_getCropImgData(obj){
			// 关闭插件 打开 当前页面
			this.$refs.cropImg.currentValue = false;
			this.cropDataShow = true;
			// 如果 是 带值 传递过来的 上传 图片
      if( obj.type ){
        uploadCropImg(obj.data).then(res=>{
              
          this.storeJoinin[this.cropImgIndex] = res.result.file_name
          this.storeJoinin[this.cropImgIndex+"_url"] = res.result.file_path
          this.$forceUpdate()
        }).catch(err=>{
          Toast(err.message);
        })
        
      }
    },

    selectCity (city_name) {
   //   getPointByAddress(city_name).then(res => {
 //       if (res.result.location) {
  //        var lng = res.result.location.lng
//          var lat = res.result.location.lat
 //         if (this.regionName == 'company_address') {
  //          this.storeJoinin.store_latitude = lat
//            this.storeJoinin.store_longitude = lng
//          }
//          if (this.regionName == 'business_licence_address') {

//          }

//          this.memberPoint({ point: { lng: lng, lat: lat, address: res.result.sematic_description, cityCode: res.result.cityCode, cityName: city_name } })
          // this.$forceUpdate()
//        } else {
//          Toast('无法获取城市位置')
//        }
//      }).catch(function (error) {
//        Toast(error.message)
//      })
    }

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
</style>
