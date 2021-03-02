<template>
  <div clas="uonh">
		<!-- 头部 -->
		<head-title title="修改许可证" ></head-title>

		<!-- 主题内容 --> 
    <div class="license hsy_main">
      <mt-field label="许可证编号" placeholder="请输入许可证编号" disableClear
        :readonly="!subType"
        v-model="b_xk_no"
        >
      </mt-field>
      <div class="help">
        <p>温馨提示</p>
        <ul>
          <li>1.请注意区分大小写</li>
          <li>2.请不要输入多余空格</li>
          <!-- <li>3.请注意输入的是许可证编号，而非</li> -->
        </ul>
        
      </div>
      <mt-button v-if="!subType" class="btn_new" @click="subType=true" >编辑</mt-button>
      <mt-button v-show='subType' class="btn_new" @click="fun_submit" >保存</mt-button>
    </div>
	</div>
</template>
<script>
	
import '@/assets/style/hsy-mint.scss';
import { Toast, MessageBox } from 'mint-ui'
import HeadTitle from '../../HeadTitle';
import { resetRem, resumeRem } from '@/util/rem';

import { getStoreJoinin, setSellerXkz } from '../../../api/seller';

	export default {

		components: {
			'head-title': HeadTitle,
    },
    
		data() {
      return{
        b_xk_no: null,
        subType:false,
      }
    },
    
		created: function() {
      getStoreJoinin().then(res=>{
        this.b_xk_no = res.result.store_joinin.b_xk_no;
      })
    },
    
		mounted() {
      resetRem();
    },
    
    beforeDestroy(){
      resumeRem();
    },

		methods: {
      // 提交 修改
      fun_submit(){
        // var reg =  /^[A-Za-z0-9]+$/;
        // var reg = /^[A-Z]{1}[A-Z0-9]{6,20}$/;
        // console.log(reg.test('J123456'));
        // return false;
        // console.log(this.b_xk_no);
        if( this.b_xk_no ){
          setSellerXkz(this.b_xk_no).then(res=>{
            Toast(res.message);
            this.subType = false;
          }).catch(err=>{
            // Toast(err.message)
            MessageBox('提示', err.message);
          })
        }else{
          Toast("请输入许可证编号");
        }
      }
    },
    
	}
</script>

<style lang="scss" scoped>
.license{
  .help{
    margin: 1rem 1.4rem;
    font-size: 1.2rem;
    padding: .5rem .5rem 2rem .5rem;
    border: 1px dashed #e5e5e5;
    color: #6F6F6F;
    p{ 
      font-size: 1.4rem;
      color: #6F6F6F;
      margin-bottom: 1rem;
    }
  }
  // 按钮
  &/deep/ .mint-button{
    background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
    box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
    border-radius:40px;
    color: #fff;
    width: 92%;
    margin: 0;
    bottom: 4%;
    left: 4%;
    z-index: 1;
		position: fixed;
		bottom: 4%;
		left: 4%;
		z-index: 1;
  }
  &/deep/.mint-cell{
    .mint-cell-wrapper {
      .mint-cell-title{
        width:auto !important
      }
      .mint-field-core{
        text-align: left;
        padding-left: 1rem;
      }
    }
  }
}
</style>
