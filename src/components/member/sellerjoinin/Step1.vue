<template>
  <div class="step1">
    <div class="bg" >
      <img class="every-phone" v-lazy="require('@/assets/image/sellerjoinin_back.png')" alt="">
    </div>
		<img class="back" @click="$router.go(-1);" src="@/assets/image/brand/h5_l_f.png" alt="" />

    <div class="btn_cont">
        <button class="btn" size="large" @click="nextStepSelf(2)" >农户入驻</button>
        <!-- <button class="btn" size="large" @click="nextStep(0)">未开放</button> -->
        <button class="btn" size="large" @click="nextStep(0)">商家入驻</button>
    </div>
    <div class="check_cont" @click.stop="can = !can">
      <span v-show="can" class="c_icon">        
        <img src="@/assets/image/icon2/agree.png" alt="">
      </span>
      <span v-show="!can" class="c_icon"></span>
      <span>同意商家</span>
      <span  @click="onAgreement" style="color:#F1F280">入驻协议</span>
    </div>
    <!-- <div class="check_cont" @click="onAgreement">
        <mt-checklist
          v-model="value"
          :options="options">
        </mt-checklist>
    </div> -->

  </div>
</template>

<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { getStoreJoinin } from '../../../api/seller'
import { resetRem, resumeRem } from '@/util/rem';

export default {
  components: {
  },
  data () {
    return {
      options: [{ label: '《同意商家入驻协议》', value: 1 }],
      value: [1],
      can: true,

      store_type:null,
    }
  },

  mounted () {
    resetRem();
  },

  beforeDestroy(){
    resumeRem();
  },

  computed: {
      ...mapState({
          storeJoinin: state => state.member.storeJoinin
      })
  },

  created: function () {
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin
      if (store_joinin) {
          if(store_joinin.joinin_state == 30){
              MessageBox('初审失败', store_joinin.joinin_message)
          }
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
        this.store_type = store_joinin.store_type;
      }
    }).catch(error => {
      Toast(error.message)
    })
  },

  methods: {
    ...mapMutations({
      sellerJoininSave: 'sellerJoininSave',
      sellerJoininTypeSave:'sellerJoininTypeSave',
    }),
    nextStep (type) {
      if( this.store_type == null | this.store_type != 2 ){
        if( !this.can ){
          Toast("请勾选同意商家协议");
          return false;
        }
        this.sellerJoininSave({ storeJoinin: { store_type: type } })
        this.sellerJoininTypeSave( type )
        this.$router.push({ name: 'SellerJoinin2' })
      }else{
        Toast("您已提交了农户入驻");
      }
    },
    nextStepSelf (type) {
      if( this.store_type == null | this.store_type == 2 ){
        if( !this.can ){
          Toast("请勾选同意商家协议");
          return false;
        }
        this.sellerJoininSave({ storeJoinin: { store_type: 2 } })
        this.sellerJoininTypeSave( type )
        this.$router.push({ name: 'SellerJoininSelf2' })
      }else{
        Toast("您已提交了商家入驻");
      }
    },
    onAgreement () {
      this.$router.push({
        name: 'HomeDocument',
        query: { type: 'open_store' }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
.step1 {
  width: 100vw;
  height: 100vh;
  // background-image: url('../../../assets/image/sellerjoinin_back.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  background-position: center;

  .bg{
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    img{
      width: 100%;

    }

    .every-phone{
      transform: translate(-50%,-50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .back{  
    position: absolute;
    width: 2rem;
    margin: 1rem 1.43rem;
  }

  
  .btn_cont{
    position: absolute;
    display: flex;
    bottom: 20vw;
    justify-content: space-evenly;
    width: 100vw;
    
    .btn{
      width: 38vw;
      background: #FFFFFF;
      border-radius: 8px;
      padding: 2.8vw;
      font-size: 1.8rem;
      color: #E7371C;
    }
  }

  .check_cont{
    position: absolute;
    display: flex;
    bottom: 8vw;
    justify-content: center;
    width: 100vw;
    font-size: 1.2rem;
    color: #FFFFFF;
    span{
      margin-top:.16rem
    }

    .c_icon{
      border: 1px solid #fff;
      width: 1.46rem;
      height: 1.46rem;
      margin-top: .2rem;
      line-height: 1.46rem;
      border-radius: 50%;
      text-align: center;
      margin-right: .6rem;

      img{
        width: 72%;
        height: 72%;
        transform: translate(0rem, -0.1rem);
      }
    }
  }
}
</style>
