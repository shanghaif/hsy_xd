<template>
    <div class="container">
        <div class="common-header-wrap">
            <mt-header title="店铺入驻" class="common-header">
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
            </mt-header>
        </div>
        <step :options="options" :active="3"></step>
        <div v-if="storeJoinin.joinin_state==20 || storeJoinin.joinin_state==31">
            <div v-if="storeJoinin.joinin_state==31" class="notice">{{title}}:{{message}}</div>
            <div @click="showDetail=true"><mt-cell title="申请信息" is-link></mt-cell></div>
            <mt-cell title="应付金额">{{storeJoinin.paying_amount}}元</mt-cell>
            <mt-cell class="pt-5" title="付款凭证">
                <div class="user-avatar-wrapper">
                    <div v-if="storeJoinin.paying_money_certificate" class="user-avatar">
                        <img :src="storeJoinin.paying_money_certificate_url" @click="openImage(storeJoinin.paying_money_certificate_url)">
                        <span @click="dropImage()" class="del-btn iconfont">&#xe6d8;</span>
                    </div>
                    <div v-else class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadImage('paying_money_certificate',$event)">
                        <div class="center-text">相机/相册</div>
                        <input type="file" accept="image/*">
                    </div>
                </div>
            </mt-cell>
            <mt-field label="备注" v-model="storeJoinin.paying_money_certificate_explain"></mt-field>
            <mt-button size="large" type="primary" @click="nextStep">提交</mt-button>
        </div>
        <div class="main-content" v-else>
            <img class="center-image" src="../../../assets/image/sellerjoinin_wait.jpg" />
            <div class="big-title">{{title}}</div>
            <div class="desc">{{message}}</div>
        </div>
        <div>
            <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
                <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
            </mt-popup>
        </div>
        <div>
            <mt-popup v-model="showDetail" position="right" class="common-popup-wrapper">
                <div class="common-header-wrap">
                    <mt-header title="申请信息" class="common-header">
                        <mt-button slot="left" icon="back" @click="showDetail=false"></mt-button>
                    </mt-header>
                </div>
                <div class="common-popup-content">
                    <div class="label">公司及联系人信息</div>
                    <mt-cell :title="storeJoinin.store_type==1?'店铺名称':'公司名称'">{{storeJoinin.company_name}}</mt-cell>
                    <mt-cell title="所在地">{{storeJoinin.company_address}}</mt-cell>
                    <mt-cell title="详细地址">{{storeJoinin.company_address_detail}}</mt-cell>
                    <mt-cell v-if="storeJoinin.store_type==0" title="注册资金">{{storeJoinin.company_registered_capital}}万元</mt-cell>
                    <mt-cell title="联系人姓名">{{storeJoinin.contacts_name}}</mt-cell>
                    <mt-cell title="联系人电话">{{storeJoinin.contacts_phone}}</mt-cell>
                    <mt-cell title="电子邮箱">{{storeJoinin.contacts_email}}</mt-cell>
                    <div class="label">营业执照信息（副本）</div>
                    <mt-cell title="营业执照号">{{storeJoinin.business_licence_number}}</mt-cell>
                    <mt-cell title="营业执照所在地">{{storeJoinin.business_licence_address}}</mt-cell>
                    <mt-cell title="有效期起始">{{storeJoinin.business_licence_start}}</mt-cell>
                    <mt-cell title="有效期结束">{{storeJoinin.business_licence_end}}</mt-cell>
                    <mt-cell title="经营范围">{{storeJoinin.business_sphere}}</mt-cell>
                    <mt-cell class="pt-5" title="营业执照电子版">
                        <div class="user-avatar-wrapper">
                            <div class="user-avatar">
                                <img :src="storeJoinin.business_licence_number_electronic_url" @click="openImage(storeJoinin.business_licence_number_electronic_url)">
                            </div>
                        </div>
                    </mt-cell>
                    <div v-if="storeJoinin.store_type==0">
                        <div class="label">开户银行信息</div>
                        <mt-cell title="银行开户名">{{storeJoinin.bank_account_name}}</mt-cell>
                        <mt-cell title="公司银行账号">{{storeJoinin.bank_account_number}}</mt-cell>
                        <mt-cell title="银行支行名称">{{storeJoinin.bank_name}}</mt-cell>
                        <mt-cell title="银行所在地">{{storeJoinin.bank_address}}</mt-cell>
                        <div class="label">结算账号信息</div>
                        <mt-cell title="银行开户名">{{storeJoinin.settlement_bank_account_name}}</mt-cell>
                        <mt-cell title="公司银行账号">{{storeJoinin.settlement_bank_account_number}}</mt-cell>
                        <mt-cell title="银行支行名称">{{storeJoinin.settlement_bank_name}}</mt-cell>
                        <mt-cell title="银行所在地">{{storeJoinin.settlement_bank_address}}</mt-cell>
                    </div>
                    <div v-else>
                        <div class="label">结算账号信息</div>
                        <mt-cell title="支付宝姓名">{{storeJoinin.settlement_bank_account_name}}</mt-cell>
                        <mt-cell title="支付宝账号">{{storeJoinin.settlement_bank_account_number}}</mt-cell>
                    </div>
                    <mt-cell title="商家账号">{{storeJoinin.seller_name}}</mt-cell>
                    <mt-cell title="店铺名称">{{storeJoinin.store_name}}</mt-cell>
                    <mt-cell title="店铺等级">{{storeJoinin.storegrade_name}}</mt-cell>
                    <mt-cell title="开店时长">{{storeJoinin.joinin_year}}年</mt-cell>
                    <mt-cell title="店铺分类">{{storeJoinin.storeclass_name}}</mt-cell>
                    <div @click="showGoodsClass=true"><mt-cell title="经营类目" is-link></mt-cell></div>
                </div>
            </mt-popup>
            <mt-popup v-model="showGoodsClass" position="right" class="common-popup-wrapper">
                <div class="common-header-wrap">
                    <mt-header title="经营类目" class="common-header">
                        <mt-button slot="left" icon="back" @click="showGoodsClass=false"></mt-button>
                    </mt-header>
                </div>
                <div class="common-popup-content">
                    <div v-for="(goods_class,index) in storeJoinin.store_class_names" :key="index"><mt-cell :title="goods_class">{{storeJoinin.store_class_commis_rates[index]}}%</mt-cell></div>
                </div>
            </mt-popup>
        </div>
        <div>
            <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
                <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
            </mt-popup>
        </div>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import Step from '../../Step'
import { getStoreJoinin, saveStoreJoinin5, uploadInfoFile } from '../../../api/seller'
export default {
  components: {
    Step
  },
  data () {
    return {
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '店铺信息' }, { title: '合同签订' }],
      showimage: '',
      isshow: false,
      showGoodsClass: false,
      showDetail: false,
      message: '',
      title: ''
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
        if (store_joinin.joinin_state == 40) {
          Toast('您的店铺已开通')
          this.$router.push({ name: 'HomeSellerLogin' })
          return
        }
        this.sellerJoininSave({ storeJoinin: store_joinin })
        if (store_joinin.joinin_state == 10) {
          this.message = '感谢您在本平台申请商家入驻'
          this.title = '正在审核中'
        } else if (store_joinin.joinin_state == 11) {
          this.title = '付款审核中'
          this.message = '请等待管理员审核打款'
        } else {
          // if (store_joinin.joinin_state == 20) {
          //   this.title = '初审成功'
          //   this.message = '应付金额' + store_joinin.paying_amount + '元'
          // } else {
          if (store_joinin.joinin_state == 30) {
            this.title = '初审失败'
          }
          if (store_joinin.joinin_state == 31) {
            this.title = '审核失败'
          }
          this.message = store_joinin.joinin_message
          // }
        }
      }
    }).catch(error => {
      Toast(error.message)
    })
  },

  methods: {
    ...mapMutations({
      sellerJoininSave: 'sellerJoininSave'
    }),
    nextStep () {
      saveStoreJoinin5(this.storeJoinin).then(res => {
        this.sellerJoininSave({ storeJoinin: this.storeJoinin })
        this.storeJoinin.joinin_state = 11
        this.title = '付款审核中'
        this.message = '请等待管理员审核打款'
      }).catch(error => {
        Toast(error.message)
      })
    },
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage () {
      this.storeJoinin.paying_money_certificate = ''
    },
    uploadImage (type, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData()

      formdata.append('file', event.target.files[0])
      formdata.append('name', 'file')

      uploadInfoFile(formdata).then(res => {
        this.storeJoinin.paying_money_certificate = res.result.path
        this.storeJoinin.paying_money_certificate_url = res.result.url
        this.$forceUpdate()
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
    .notice{font-size:.7rem;padding:.5rem;background:#FCF8E3;color:#C09853;line-height: 1.65rem;}
    .center-image{width: 60%}
    .main-content{text-align: center;padding:2rem}
    .big-title{margin-top:2rem;margin-bottom: 1rem;}
    .desc{font-size:.8rem;color:#666}
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
