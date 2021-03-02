<template>
<div class="container goods_consult hsy_main">
  
    <head-title title="回复评价" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title>
    

    <div class="body">
      
      <!-- 咨询内容 -->      
      <p class="name">回复内容</p>
      <div class="type">
        <textarea v-model="content" placeholder="请输入回复内容" maxlength="150" class="text_area">
        </textarea>
        <span class="text_length">{{content.length}}/150</span>
      </div>

      <mt-button class="hsy_btn hsy_d" v-on:click="submit">发送</mt-button>
    </div>

</div>
</template>

<script>
import '@/assets/style/hsy-mint.scss';
import { Toast, Indicator } from 'mint-ui'
import { addExplain } from '../../../api/sellerEvaluate'
import { mapState, mapMutations } from 'vuex'

import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle';

export default {
  name: 'HomeGoodsConsult',
  data () {
    return {
      geval_id:null,
      content: '',
    }
  },
  components: {
    'head-title':HeadTitle
  },
  
  mounted () {
    resetRem();
  },

  beforeDestroy(){
    resumeRem();
  },

  created () {
    this.geval_id = this.$route.query.geval_id;
  },

  methods: {
    // 点击 发送
    submit(){
      Indicator.open();
      addExplain(this.geval_id, this.content).then(res => {
        Indicator.close();
        Toast(res.message)
        this.$router.go(-1)
      }).catch(function (error) {
        Indicator.close();
        Toast(error.message)
      })
    }
  }

}
</script>

<style scoped lang="scss">
    .consult-item{background:#fff;border-bottom:1px solid #e1e1e1}
    .consult-info{padding:.5rem;display: flex}
    .consult-info .p-info{flex:1;margin-left:1rem;}
    .consult-info .p-info .name{font-size:0.7rem;}
    .consult-info .p-info .explain{font-size:0.7rem;color:$primaryColor;margin-bottom:.5rem}
    .consult-info .p-info .explain .right{float:right;color:gray}
    .consult-info .p-info .replay{border-top:1px dashed #e1e1e1;font-size:.8rem;margin-top:.5rem;padding-top:.5rem;color:green}
.goods_consult{
  .body{
    padding: 0 1.43rem;

    .hsy_d{
      display: block;
    }

    .name{      
      font-size: 1.55rem;
      color: #161616;      
      font-weight: 500;
      margin-top: 1rem;
    }
    .type{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      position: relative;
      padding-top: 1.4rem;

      .text_length{
        position: absolute;
        right: 1rem;
        bottom: .4rem;
        color: #888;
      }
      p{
        font-size: 1.4rem;
        background: #FFE5E5;
        border-radius: 22.5px;
        color: #6F6F6F;
        background: #F4F5F7;
        width: fit-content;
        padding: 0.4rem 1.4rem;
        text-align: center;
        margin-bottom: 0;
        margin-bottom: 1.4rem;
        margin-right: .6rem;
        box-sizing: border-box;
        border: 1px solid transparent;
      }
      textarea{
        padding: 1rem;
        width: 100%;
        min-height: 15rem;
        color: #6F6F6F;
        resize: none;
        background: #F4F5F7;
        border-radius: 16px;
        font-size: 1.36rem;
        line-height: 1.4;
      }
      .active{
        color: #E63116;
        border: 1px solid #E5371B;
        background: #FFE5E5;
      }

      input{
        width: 4rem;
        font-size: 29px;
        background: #F4F5F7;
        color: #6F6F6F;
        margin-left: 1rem;
        padding-left: 1.4rem;
        width: 8rem;
        line-height: 1;
        border-radius: 4px;
        &::-webkit-input-placeholder{
          font-size: 1.3rem;
        }
      }

    }
  }
}
</style>
