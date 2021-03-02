<template>
    <div class="step-three">
      <div class="common-header-wrap">
        <mt-header title="店铺入驻" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div>
        <step :options="options" :active="1"></step>

        <div v-if="storeJoinin.store_type != 2">
            <div>
                <div class="label">开户银行信息</div>
                <mt-field class="step-three-import" label="银行开户名" v-model="storeJoinin.bank_account_name"></mt-field>
                <mt-field class="step-three-import" label="公司银行账号" v-model="storeJoinin.bank_account_number"></mt-field>
                <mt-field class="step-three-import" label="银行支行名称" v-model="storeJoinin.bank_name"></mt-field>
                <div @click="onRegion('bank_address')"><mt-cell title="银行所在地" is-link>{{storeJoinin.bank_address}}</mt-cell></div>
                <mt-cell title="此账号为结算账号">
                    <mt-switch v-model="isSame"></mt-switch>
                </mt-cell>
            </div>
            <div v-if="!isSame">
                <div class="label">结算账号信息</div>
                <mt-field label="银行开户名" v-model="storeJoinin.settlement_bank_account_name"></mt-field>
                <mt-field label="公司银行账号" v-model="storeJoinin.settlement_bank_account_number"></mt-field>
                <mt-field label="银行支行名称" v-model="storeJoinin.settlement_bank_name"></mt-field>
                <div @click="onRegion('settlement_bank_address')"><mt-cell title="银行所在地" is-link>{{storeJoinin.settlement_bank_address}}</mt-cell></div>
            </div>
        </div>
        <mt-button size="large" type="primary" @click="nextStep">提交</mt-button>
        <div>
            <region-picker ref="picker" @onConfirm="onPickerConfirm"></region-picker>
        </div>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import RegionPicker from '../../RegionPicker'
import Step from '../../Step'
import { getStoreJoinin, saveStoreJoinin3 } from '../../../api/seller'
export default {
  components: {
    Step,
    RegionPicker
  },
  data () {
    return {
      isSame: false,
      regionName: '',
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '合同签订' }]
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin,
      editState: state => state.seller.editState,//拒绝后去修改
    })
  },
  created: function () {
    this.isSame = !!this.storeJoinin.is_settlement_account
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin
      if (store_joinin) {
        if (store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
          if( !this.editState ){
            this.$router.push({ name: 'SellerPerfect3' })
            return
          }
        }
        // if (store_joinin.joinin_state == 40) {
        //     Toast('您的店铺已开通')
        //   this.$router.push({ name: 'HomeSellerLogin' })
        //   return
        // }
        // if (!this.storeJoinin) {
          this.isSame = !!this.storeJoinin.is_settlement_account
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
      if( this.storeJoinin.store_type != 2 ){
        if( !this.storeJoinin.bank_account_name || !this.storeJoinin.bank_account_number){
          Toast("请输入银行开户名和账号");
          return false;
        }
      }
      if( !this.storeJoinin.bank_name ){
        Toast("请输入银行名称");
        return false;
      }
      this.storeJoinin.is_settlement_account = this.isSame;
      saveStoreJoinin3(this.storeJoinin).then(res => {
        this.sellerJoininSave({ storeJoinin: this.storeJoinin })
        this.$router.push({ name: 'SellerPerfect3' })
      }).catch(error => {
        Toast(error.message)
      })
    },
    onPickerConfirm (values) {
      if (this.regionName == 'bank_address') {
        this.storeJoinin.bank_address = this.getRegionStr(values)
      }
      if (this.regionName == 'settlement_bank_address') {
        this.storeJoinin.settlement_bank_address = this.getRegionStr(values)
      }
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
    }
  }
}
</script>
<style  lang="scss" scoped>
.step-three{  
  &/deep/.mint-cell{
    padding-left: 0.8rem;
  }
  .step-three-import{
    & /deep/ .mint-cell-text::after{
      content: "*";
      color: red;
      font-size: 1.2rem;
      position: absolute;
      left: .5rem;
      top: .8rem;
    }
  }
  
  .label {
    padding: .5rem;
    font-size: .7rem;
    background: #eee;
  }
}
</style>
