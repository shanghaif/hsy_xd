<template>
  <div class="learn">
    <!-- 返回按钮 -->
    <img class="down_arrow"  @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png"/>
    <div class="learn_cont">
      <!-- 标题 -->
      <h3 class="title">从业学习</h3>
      <!-- 按钮 -->
      <div>
        <mt-button
          class="border_radius"
          size="large" type="danger" @click="fun_training()">培训</mt-button>
        <mt-button
          class="border_radius linear_test"
          :class="{testFalse:test}"
          size="large" type="danger" @click="fun_test()">考试</mt-button>
      </div>      
      <mt-button
        v-if="proveState"
        @click="$router.push({ name: 'HomeProve', query: { mid: info.member_id } })"
        class="border_radius"
        size="large" type="danger">
          <span>查看证书</span>          
          <span style="font-size:13.6px">（非当年证书需重新学习）</span>
        </mt-button>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import { mapState } from "vuex";
import { getData, saveJD} from "../../../api/homeLearn.js";//传递用户id 返回学习信息
import {  resumeRem } from '@/util/rem'
export default {
  data(){
    return {
      test:false,//是否可以考试
      proveState:false,//是否可查看证书,
      fs: null,
      ks: null,
      zs:null,
			learnOBJ:{},    //  培训信息 
    }
  },
  computed:{
    ...mapState({
      info: state => state.member.info,//用户详细信息 获取id
    }),    
  },
  created(){
    getData(this.info.member_id).then(res=>{
      // console.log( res.result.ks > 144000 );
      this.fs = res.result.fs;
      this.ks = res.result.ks;
			this.learnOBJ = res.result;
      if(res.result.zs && res.result.zs.length >= 10){
        this.proveState = true;
      }
      if( res.result.ks > 144000 &&  this.learnOBJ.xxd.slice(0,4) == new Date().getFullYear() ){
        this.test = true;
      }
    })
  },

  mounted(){
    resumeRem();
  },

  methods:{
    // 培训函数
    fun_training(){
      if( this.proveState && this.fs>=85 && this.ks>144000  ){
        // MessageBox({
        //   title: '温馨提示',
        //   message: '重新培训将会清空之前数据',
        //   showCancelButton: true,
        //   confirmButtonText:"重新培训",
        //   cancelButtonText:"取消培训"
        // }).then(action => {
        //   if(action == 'confirm'){
            // saveJD(null,null,null).then(res=>{
              // 跳转到培训页面
              this.$router.push({ name: 'HomeTraining' })
            // })
          // }
        // })
      }else{
        // 跳转到培训页面
        this.$router.push({ name: 'HomeTraining' })

      }
    },

    // 考试函数
    fun_test(){			
			if( this.learnOBJ.xxd.slice(0,4) != new Date().getFullYear()){
				Toast("当年培训时长未达标,请先去培训");	
				return false;
			}else if( this.proveState && this.fs>=85 && this.ks>144000  ){
        MessageBox({
          title: '温馨提示',
          message: '确定重新考试？',
          showCancelButton: true,
          confirmButtonText:"重新考试",
          cancelButtonText:"取消考试"
        }).then(action => {
          if(action == 'confirm'){
            // 跳转到考试页面
            this.$router.push({ name: 'HomeTest' })
          }
        })
      }else if( this.test == true ){// 如果 可以考试(培训时间达标)
        // 跳转到考试页面
        this.$router.push({ name: 'HomeTest' })
      }else{
        Toast("当年培训时长未达标,请先去培训");
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.learn{
  padding: .2rem .6rem;

  $arrow: 1.2rem;
  $arrowcolor: #000;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
      top: .46rem;
    }
  // 主题内容
  .learn_cont{
    text-align: center;
    padding: 1rem 1rem;
    // 标题
    .title{
      font-size: 2rem;
      margin: 2rem 1rem;
      color: #40C5EE;
    }
    // 按钮
    .border_radius{
      border-radius:2.2rem;
      margin: .68rem 0;
      background: linear-gradient(45deg, #40C4B5, #38BAAE);
    }  
    .linear_test{
      background: linear-gradient(45deg, #E999, #999);
    }
    .testFalse{
      background: linear-gradient(45deg, #F4563E, #E63519);
    }
  }
  
}
</style>