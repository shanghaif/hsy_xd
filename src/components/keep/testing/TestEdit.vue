<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-17 16:47:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-22 13:55:33
-->
<template>
    <div class="container Step5">
        <div>
            <div v-show="showDetail" position="right" class="common-popup-wrapper">
                <div class="common-header-wrap">
                    <mt-header title="申请信息" class="common-header">
                        <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
                    </mt-header>
                </div>
                <div class="common-popup-content">
                    <div class="label"><span>公司及法人信息</span>
                      <!-- <select v-model="storeJoinin.store_type" class="changeType">
                        <option value="0">商家入驻</option>
                        <option value="2">农户入驻</option>
                      </select> -->
                      <!-- <mt-button type="default" class="edit_728" @click="fun_toEdit" size="small">去修改</mt-button> -->
                    </div>
                    <mt-cell :title="storeJoinin.store_type==1?'店铺名称':'公司名称'">{{storeJoinin.company_name}}</mt-cell>
                    <mt-cell title="所在地">{{storeJoinin.company_address}}</mt-cell>
                    <mt-cell title="详细地址">{{storeJoinin.company_address_detail}}</mt-cell>
                    <mt-cell v-if="storeJoinin.store_type==0" title="注册资金">{{storeJoinin.company_registered_capital}}万元</mt-cell>
                    <mt-cell title="法人">{{storeJoinin.contacts_name}}</mt-cell>
                    <mt-cell title="电话">{{storeJoinin.contacts_phone}}</mt-cell>
                    <mt-cell title="电子邮箱">{{storeJoinin.contacts_email}}</mt-cell>
                    <div v-if="storeJoinin.store_type==0">
                      <div class="label">营业执照信息（副本）</div>
                      <mt-cell title="许可证编号">{{storeJoinin.b_xk_no}}</mt-cell>
                      <mt-cell title="营业执照号">{{storeJoinin.business_licence_number}}</mt-cell>
                      <mt-cell title="营业执照所在地">{{storeJoinin.business_licence_address}}</mt-cell>
                      <mt-cell title="有效期起始">{{storeJoinin.business_licence_start}}</mt-cell>
                      <mt-cell title="有效期结束">{{storeJoinin.business_licence_end}}</mt-cell>
                      <mt-cell title="经营范围">{{storeJoinin.business_sphere}}</mt-cell>
                      <mt-cell class="pt-5" title="营业执照电子版">
                          <div class="user-avatar-wrapper">
                              <div class="user-avatar">
                                  <img :src="storeJoinin.business_licence_number_electronic" @click="openImage(storeJoinin.business_licence_number_electronic)">
                              </div>
                          </div>
                      </mt-cell>
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
                    <div v-if="storeJoinin.store_type==2">
                      <div class="label">营业执照信息（副本）</div>
                      <mt-cell title="身份证号码">{{storeJoinin.business_licence_number}}</mt-cell>
                      <!-- <mt-cell title="营业执照所在地">{{storeJoinin.business_licence_address}}</mt-cell> -->
                      <mt-cell title="身份证起始日期">{{storeJoinin.business_licence_start}}</mt-cell>
                      <mt-cell title="身份证结束日期">{{storeJoinin.business_licence_end}}</mt-cell>
                      <!-- <mt-cell title="经营范围">{{storeJoinin.business_sphere}}</mt-cell> -->
                      <mt-cell class="pt-5" title="身份证正面照">
                          <div class="user-avatar-wrapper">
                              <div class="user-avatar">
                                  <img :src="storeJoinin.business_licence_number_electronic_url" @click="openImage(storeJoinin.business_licence_number_electronic_url)">
                              </div>
                          </div>
                      </mt-cell>
                        <div class="label">开户银行信息</div>
                        <mt-cell title="个人开户名">{{storeJoinin.bank_account_name}}</mt-cell>
                        <mt-cell title="个人银行账号">{{storeJoinin.bank_account_number}}</mt-cell>
                        <mt-cell title="银行支行名称">{{storeJoinin.bank_name}}</mt-cell>
                        <mt-cell title="银行所在地">{{storeJoinin.bank_address}}</mt-cell>
                        <div class="label">结算账号信息</div>
                        <mt-cell title="个人开户名">{{storeJoinin.settlement_bank_account_name}}</mt-cell>
                        <mt-cell title="个人银行账号">{{storeJoinin.settlement_bank_account_number}}</mt-cell>
                        <mt-cell title="银行支行名称">{{storeJoinin.settlement_bank_name}}</mt-cell>
                        <mt-cell title="银行所在地">{{storeJoinin.settlement_bank_address}}</mt-cell>
                    </div>
                    <div v-else>
                        <div class="label">结算账号信息</div>
                        <!-- <mt-cell title="支付宝姓名">{{storeJoinin.settlement_bank_account_name}}</mt-cell>
                        <mt-cell title="支付宝账号">{{storeJoinin.settlement_bank_account_number}}</mt-cell> -->
                    </div>
                    <mt-cell title="商家账号">{{storeJoinin.seller_name}}</mt-cell>
                    <!-- <mt-cell title="店铺名称">{{storeJoinin.store_name}}</mt-cell> -->
                    <mt-field label="店铺名称" v-model="storeJoinin.store_name"></mt-field>
                    <mt-cell title="店铺等级">{{storeJoinin.storegrade_name}}</mt-cell>
                    <mt-cell title="开店时长">{{storeJoinin.joinin_year}}年</mt-cell>
                    <!-- <mt-cell title="店铺分类">{{storeJoinin.storeclass_name}}</mt-cell> -->
                    <div class="import storeclass" @click="$refs.secondselect.currentValue=true"><mt-cell title="店铺分类" is-link>{{storeJoinin.storeclass_name}}</mt-cell></div>
                    <div @click="showGoodsClass=true"><mt-cell title="经营类目" is-link></mt-cell></div>
                    
                    <div class="label">修改信息</div>
                    <!-- <mt-radio
                      title="是否食安品牌"
                      v-model="objData.sabrand_id"
                      :options="[
                        {
                          label: '暂无',
                          value: '0',
                        },
                        {
                          label: '食安山东',
                          value: '1'
                        },
                        {
                          label: '食安曹县',
                          value: '2'
                        }
                      ]">
                    </mt-radio> -->
                    <!-- <mt-cell title="食安等级:">
                      <el-select
                        v-model="objData.sabrand_grade" placeholder="请选择食安商家等级">
                        <el-option v-for="item in djList" :label="item.name" :value="item.id" :key="item.id">
                          <span style="float: left">{{ item.name }}</span>
                        </el-option>
                      </el-select>
                    </mt-cell> -->
                    
                    <div class="order-comment-body">
                      <div class="enter"><textarea rows="6" placeholder="关闭原因" v-model="storeJoinin.joinin_message"></textarea></div>
                    </div>
                    
                    <div class="button-wrapper">
                      <button @click="saveVerify(1)" class="ds-button-large button-open" >修改店铺</button>
                      <button @click="saveVerify(0)" class="ds-button-large button-disable">关闭店铺</button>
                    </div>
                    
                    <second-select
                      @onConfirm="getonConfirm"
                      title="店铺分类"
                      v-if="storeArr.length>0" ref="secondselect" :items="storeArr"></second-select>
                    <!-- <mt-field label="审核意见" v-model="shenhe"></mt-field> -->
                </div>
            </div>
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
import { keepGetShenhedit, keepSaveStoreEdit } from '../../../apikeep/testing'
import SecondSelect from '../SecondSelect';
export default {
  components: {
    Step,
    SecondSelect
  },
  data () {
    return {
      storeJoinin:{},
      djList:[
        { name: "A+", id: 9 },
        { name: "A", id: 8 },
        { name: "A-", id: 7 },
        { name: "B+", id: 6 },
        { name: "B", id: 5 },
        { name: "B-", id: 4 },
        { name: "C+", id: 3 },
        { name: "C", id: 2 },
        { name: "C-", id: 1 },
      ],
      member_id:this.$route.query.member_id,
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '店铺信息' }, { title: '合同签订' }],
      showimage: '',
      isshow: false,
      showGoodsClass: false,
      showDetail: true,
      message: '',
      title: '',

      pathName:null,

      storeArr:[],
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.pathName = from.name;
    })
  },

  mounted () {
    let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    html.style.fontSize = 20 + 'px';
    window.onresize = () => {
      let sw = document.documentElement.clientWidth;
      let html = document.documentElement;
      html.style.fontSize = 20 + 'px';
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
    }
  },
  created: function () {
    keepGetShenhedit(this.member_id).then(res => {
      this.storeJoinin = res.result;
      this.storeJoinin.member_id = this.member_id;
    }).catch(error => {
      Toast(error.message)
    })

    
    this.utils.getSpecialIdentity(0).then(store=>{
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
  },

  methods: {
    ...mapMutations({
      sellerJoininSave: 'sellerJoininSave',
      sellerEditState: 'sellerEditState',//拒绝后去修改
    }),

    getonConfirm(arr){
      this.storeJoinin.storeclass_id = arr[1].id;
      this.storeJoinin.storeclass_name = arr[1].name;
      this.$refs.secondselect.currentValue = false;
      this.$forceUpdate();
    },
    fun_goBack(){
      // console.log(this.pathName);
      if( 'SellerJoininSelf2' == this.pathName || this.pathName == 'SellerJoinin1' || this.pathName == 'SellerJoinin2' ){
        this.$router.go(-2);
      }else{
        this.$router.go(-1);
      }
    },
    // 拒绝后去修改
    fun_toEdit(){
      this.sellerEditState(true);
      if(this.storeJoinin.store_type == 0){
        this.$router.push({ name: 'SellerJoinin2' })
      }else if(this.storeJoinin.store_type == 2){
        this.$router.push({ name: 'SellerJoininSelf2' })
      }
    },
    saveVerify ( type ) {
      var objData = {
        store_name      : this.storeJoinin.store_name,         //店铺名称
        storeclass_id   : this.storeJoinin.storeclass_id,      //分类id
        member_id       : this.member_id,                      //用户id
        store_state     : type,                                //0关闭店铺  1开启
        store_close_info: this.storeJoinin.store_close_info,   //关闭原因
      };
      // console.log(objData);
      // return false;
      keepSaveStoreEdit(objData).then(res=>{
        Toast(res.message);
      }).catch(err=>{
        Toast(err.message);
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

      // uploadInfoFile(formdata).then(res => {
      //   this.storeJoinin.paying_money_certificate = res.result.path
      //   this.storeJoinin.paying_money_certificate_url = res.result.url
      //   this.$forceUpdate()
      // }).catch(function (error) {
      //   Toast(error.message)
      // })
    }
  }
}
</script>
<style  lang="scss" scoped>
.Step5{
  &/deep/.mint-popup-bottom{
    height: 13.8rem;
    .toolbar-item{
      font-size: .8rem;
    }
    .picker-header{
      font-size: .8rem;
    }
  }

  
	.order-comment-body {
		background: rgba(255, 255, 255, 1);
		padding:  .82rem;
		.enter {
			padding-top: 0 !important;
			textarea {
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
				padding: 0 !important;
				background: #fff !important;
				border: 0 !important;
				// font-size: 1.23rem !important;
				font-weight: 400;
        width: 94%;
        padding: .4rem !important;
        resize: none;
        border-radius: 8px;
				&::-webkit-input-placeholder {
					/* WebKit browsers 适配谷歌 */
					color: #c6c6c6;
				}
			}
		}
  }
  
	.button-wrapper {
		padding: 0 1.43rem;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 4rem 0;
		.ds-button-large {
      width: 48%;
      height: 30px;
      font-size: 16px;
			background: rgba(230, 230, 230, 1);
			border-radius: .9rem;
			color: #fff;
		}
		.button-open {
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0px 0px 20rpx 0px rgba(251, 104, 84, 0.5);
		}
		.button-disable {
			background: rgba(230, 230, 230, 1);
			background: linear-gradient(90deg, rgba(252, 105, 82, 1) 0%, rgba(229, 50, 22, 1) 100%);
			box-shadow: 0px 0px 20rpx 0px rgba(251, 104, 84, 0.5);
		}
	}
  .changeType{
    position: absolute;
    right: 5rem;
    top: .2rem;
    /* background-image: linear-gradient(45deg, #3ED0AF, #4BBAC2); */
    color: #4BBAC2;
    background: #fff;
    height: 33px;
    padding: 0 0.4rem;
    border-radius: 4px;
  }

}
.edit_728{
  position: absolute;
  right: .42rem;
  top: .2rem;
  background-image: linear-gradient(45deg,#3ED0AF,#4BBAC2);
  color: #fff;
}
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
    
.common-popup-content {
	top: 4rem;
	&/deep/.mint-cell-title{
		min-width: 5rem;
	}
}
</style>
