<template>
  <div class="container">
    <!-- 头部  -->
    <div class="head_title_cont">    
      <div class="header-wrap">
        <img @click="fun_goBack" src="@/assets/image/icon2/icon-black-left.png" alt="" />
        <span class="header-title">配送区域</span>
        <div class="header-right">
        </div>
      </div>
    </div>

    <div class="container_cont">
      <!-- 零售区域 -->
      <div class="name">
        <span>零售区域</span>
      </div>
      <div>
        <el-cascader
          v-model="selarra"
          :options="options"
          :props="props"
          @change="change(1)"
          ref="cascader1"
          popper-class="elcss"
          collapse-tags
          clearable>
        </el-cascader>
      </div>

      <!-- 社区团购 -->
      <div class="name">
        <span>社区团购</span>
      </div>
      <div>
        <el-cascader
          v-model="selarrb"
          :options="options"
          :props="props"
          @change="change(2)"
          ref="cascader2"
          popper-class="elcss"
          collapse-tags
          clearable>
        </el-cascader>
      </div>

      
      <!-- 提交按钮 -->
      <mt-button
        @click="fun_onSave"
        class="btn_new"
        size="large"
        >保存
      </mt-button>

    </div>

  </div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';

import { Toast, Indicator } from 'mint-ui'
import { getAreaTree } from '../../../api/area'
import { offPayList,offPaySave } from '../../../api/homesearch'
export default {
  name: 'CostList',
  data () {
    return {
      props: {
        multiple: true,
        value:'area_id',
        label:'area_name',
        children:'child' 
      },
      options: [],
      selarra:[[37170000,37172100,37172101]],
      selarrb:[[37170000,37172100,37172101]],
      selarr1:[],
      selarr2:[],
    }
  },
  
  created: function () {
    getAreaTree().then(res => {
      this.options = res.result.area_list
      // console.log('返回的地址数据',this.options);
      // console.log(res)
    })
    offPayList().then(res => {
      this.area_id_array(res.result.area_id_array,2)
      this.area_id_array(res.result.area_id_l_array,1)
    })
  },
  
  mounted(){
    resetRem();
  },

  beforeDestroy(){
    resumeRem();
  },

  methods: {
    area_id_array(res,t){
      if( !res ) return;//无数据 退出
      let n1
      let n2
      let n
      let arr1=[]
      let arr=[]
      let len = res.length
      for (var  i = 0; i <len; i++) {
        n=parseInt(res[i])
        if(n%100>0){
          n1=parseInt(n/10000)*10000
          n2=parseInt(n/100)*100
          arr1=[n1,n2,n]
          arr.push(arr1)
        }

      }
      if ( t == 1 ){
        this.selarra = arr
        this.selarr1 = res
      // console.log('零售',this.selarr1);
      }else{
        this.selarrb = arr
        this.selarr2 = res
      // console.log('团购',this.selarr2);
      }

    },

    fun_goBack () {
      if (this.ifComponent) {
        this.$emit('closeTransortList')
      } else {
        this.$router.go(-1)
      }
    },

    change(n){
      let nodesObj = this.$refs[`cascader${n}`].getCheckedNodes()
      let arr=[]
      nodesObj.forEach((item) => {
        arr.push(item.value)
      });
      if( n == 1 ){ 
        this.selarr1 = arr;
      }else{
        this.selarr2 = arr;
      }
    },
    
    // 保存
    fun_onSave(){
      // console.log('零售',this.selarr1,'团购',this.selarr2);
      // return false;
      offPaySave(this.selarr2,this.selarr1).then(res => {
        if( res.code == 10000 ){
          Toast('保存成功')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  background: #F4F5F7;
  height: 100vh;

  .head_title_cont{

    background: #F4F5F7;
    font-size: 1.28rem;

    // 头部
    .header-wrap {
      padding: 1rem 1.43rem;
      position: relative;
      display: flex;
      background: #fff;
      justify-content: space-between;
      img {
        // position: absolute;
        // left: 1.78rem;
        // top: 50%;
        width: 1.74rem;
        height: 1.74rem;
        // transform: translate(0, -50%);
      }
      .header-title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.39rem;
        font-weight: 400;
        color: rgba(22, 22, 22, 1);
      }
      .header-right {
        span {
          font-size: 1.3rem;
        }
      }
    }

  }

    .container_cont{      
      .name{
        height:3.5rem;
        font-size: 0.92rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 1.2rem;
      }
      // 按钮
      .btn_new{
        -webkit-box-shadow: 0 0 20px 0 rgba(251, 104, 84, 0.5);
        box-shadow: 0 0 20px 0 rgba(251, 104, 84, 0.5);
        background: linear-gradient(89deg, #fc6952, #e53216 99%);
        border-radius: 40px;
        color: #fff;
        /* margin: 1rem 0; */
        width: 92%;
        /* margin: 0 auto; */
        /* margin: 1rem auto; */
        position: fixed;
        z-index: 10;
        bottom: 4%;
        left: 4%;

      }

      &/deep/.el-input__inner{
        padding:0 1.2rem;
      }
    }
    .el-cascader{
      width:100%;
    }
  }

    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        background-color: #fff;
        border-bottom: 1px solid #e8eaed;
    }
    .bottom-wrapper {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
    }
    .bottom-left-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .bottom-right-wrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: stretch;
    }
    .edit-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .delete-wrapper {
        margin-right: 0.5rem;
    }
    .subtitle {
        font-size: 0.7rem;
        color: #7c7f88;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        margin-left: 1rem;
        margin-right: 0.5rem;
    }
    .subtitle i{font-size:0.8rem;margin-right:.5rem;}
    .el-cascader-panel{
      width:400px;
      height:300px;
      overFlow-x:scroll; 
    }
    .elcss{
      width:200px;
      height:300px;
      overFlow-x:scroll; 
    }

</style>
