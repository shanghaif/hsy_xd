<template>
  <div>
    <div class="common-header-wrap">
      <mt-header title="店铺入驻" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <step :options="options" :active="0"></step>
    <div class="label">店铺及联系人信息</div>
    <mt-field :label="storeJoinin.store_type==1?'店铺名称':'公司名称'" v-model="storeJoinin.company_name"></mt-field>
    <div @click="onRegion('company_address')"><mt-cell title="所在地" is-link>{{storeJoinin.company_address}}</mt-cell></div>
    <mt-field label="详细地址" v-model="storeJoinin.company_address_detail"></mt-field>
    <mt-field v-if="storeJoinin.store_type==0" label="注册资金（万元）" v-model="storeJoinin.company_registered_capital"></mt-field>
    <mt-field label="联系人姓名" v-model="storeJoinin.contacts_name"></mt-field>
    <mt-field label="联系人电话" v-model="storeJoinin.contacts_phone"></mt-field>
    <mt-field label="电子邮箱" v-model="storeJoinin.contacts_email"></mt-field>
    <div class="label">营业执照信息（副本）</div>
    <mt-field label="营业执照号" v-model="storeJoinin.business_licence_number"></mt-field>
    <div @click="onRegion('business_licence_address')"><mt-cell title="营业执照所在地" is-link>{{storeJoinin.business_licence_address}}</mt-cell></div>
    <div @click="onDate('business_licence_start')"><mt-cell title="有效期起始" is-link>{{storeJoinin.business_licence_start}}</mt-cell></div>
    <div @click="onDate('business_licence_end')"><mt-cell title="有效期结束" is-link>{{storeJoinin.business_licence_end}}</mt-cell></div>
    <mt-field label="经营范围" v-model="storeJoinin.business_sphere"></mt-field>
    <mt-cell class="pt-5" title="营业执照电子版">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.business_licence_number_electronic" class="user-avatar">
          <img :src="storeJoinin.business_licence_number_electronic_url" @click="openImage(storeJoinin.business_licence_number_electronic_url)">
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('business_licence_number_electronic',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="pt-5" title="生产许可">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk2" class="user-avatar">
          <img :src="storeJoinin.b_xk2_url" @click="openImage(storeJoinin.b_xk2_url)">
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_xk2',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="pt-5" title="经营许可">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk1" class="user-avatar">
          <img :src="storeJoinin.b_xk1_url" @click="openImage(storeJoinin.b_xk1_url)">
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
        </div>
        <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('b_xk1',$event)">
          <div class="center-text">相机/相册</div>
          <input type="file" accept="image/*">
        </div>
      </div>
    </mt-cell>
    <mt-cell class="pt-5" title="小餐饮、小作坊登记证">
      <div class="user-avatar-wrapper">
        <div v-if="storeJoinin.b_xk3" class="user-avatar">
          <img :src="storeJoinin.b_xk3_url" @click="openImage(storeJoinin.b_xk3_url)">
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
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
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
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
          <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
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
              yearFormat="{value}年"
              monthFormat="{value}月"
              dateFormat="{value}日"
              :value="selectData?(new Date(selectData)):(new Date())"
              @confirm="dateConfirm"
      >
      </mt-datetime-picker>
    </div>
    <div>
      <mt-popup v-model="popMap" position="right" class="common-popup-wrapper">
        <div class="common-header-wrap">
          <mt-header title="定位" class="common-header">
            <mt-button slot="left" icon="back" @click="popMap=false"></mt-button>
          </mt-header>
        </div>
        <div class="common-popup-content">
          <map-select ref="map_select" :longitude="storeJoinin.store_longitude" :latitude="storeJoinin.store_latitude" @setPosition="setPosition"></map-select>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import Step from '../../Step'
import RegionPicker from '../../RegionPicker'
import MapSelect from '../../../components/MapSelect'
import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2 } from '../../../api/seller'
import { getPointByAddress } from '../../../util/bmap'
export default {
  components: {
    Step,
    RegionPicker,
    MapSelect
  },
  data () {
    return {
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '店铺信息' }, { title: '合同签订' }],
      showimage: '',
      isshow: false,
      popMap: false,
      selectData: '',
      regionName: '',
      dataName: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin
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
      var store_joinin = res.result.store_joinin
      if (store_joinin) {
        if (store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
          this.$router.push({ name: 'SellerJoinin5' })
          return
        }
        if (store_joinin.joinin_state == 40) {
          Toast('您的店铺已开通')
          this.$router.push({ name: 'HomeSellerLogin' })
          return
        }
        // if (!this.storeJoinin) {
          this.sellerJoininSave({ storeJoinin: store_joinin })
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
    nextStep () {
      saveStoreJoinin2(this.storeJoinin).then(res => {
        this.sellerJoininSave({ storeJoinin: this.storeJoinin })
        this.$router.push({ name: 'SellerJoinin3' })
      }).catch(error => {
        Toast(error.message)
      })
    },
    setPosition (lat, lng, name) {
      this.popMap = false
      this.storeJoinin.company_address_detail = name
      this.storeJoinin.store_longitude = lng
      this.storeJoinin.store_latitude = lat
      this.$forceUpdate()
    },
    dateConfirm (value) {
      this.storeJoinin[this.dataName] = value.getFullYear() + '/' + (value.getMonth() + 1) + '/' + value.getDate()
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
    dropImage () {
      this.storeJoinin.business_licence_number_electronic = ''
      this.$forceUpdate()
    },
    uploadImage (type, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData()
      formdata.append('file', event.target.files[0])
      formdata.append('name', 'file')
alert(type)
      uploadInfoFile(formdata).then(res => {
        this.storeJoinin[type] = res.result.path
        this.storeJoinin[type+"_url"] = res.result.url
        this.$forceUpdate()
      }).catch(function (error) {
        Toast(error.message)
      })
    },
    selectCity (city_name) {
      getPointByAddress(city_name).then(res => {
        if (res.result.location) {
          var lng = res.result.location.lng
          var lat = res.result.location.lat
          if (this.regionName == 'company_address') {
            this.storeJoinin.store_latitude = lat
            this.storeJoinin.store_longitude = lng
          }
          if (this.regionName == 'business_licence_address') {

          }

          this.memberPoint({ point: { lng: lng, lat: lat, address: res.result.sematic_description, cityCode: res.result.cityCode, cityName: city_name } })
          // this.$forceUpdate()
        } else {
          Toast('无法获取城市位置')
        }
      }).catch(function (error) {
        Toast(error.message)
      })
    }

  }
}
</script>
<style  lang="scss" scoped>
  .container {
    background: #fff;
  }
  .label {
    padding: .5rem;
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
</style>
