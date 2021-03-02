<template>
<div class="qualifyChecklist">
  <mt-popup  position="bottom" v-model="showState">
    <div class="mt1">
      <span class="out" @click="showState=false">×</span>
      <p class="title">选择合格证</p>
      <!-- 我的合格证 -->
      <div class="over">
        <div class="li_cont" 
          @click="fun_choose(item)"
           v-for="(item,index) in list" :key="index"         
          >
          <!-- 上部分 -->
          <div class="li_top">
            <div>食用农产品名称：{{item.product_name}}</div>
            <div>编号：{{item.certificate_no}}</div>
            <div>生成日期：{{item.add_time}}</div>
          </div>
          <!-- 上部分结束 -->
        </div>      
      </div>  
    </div>
  </mt-popup>  
</div>
</template>

<script>
import { getQualify } from "../../api/sellerQualify";//获取 证书列表
export default {
  data(){
    return{
      showState:false,
      list:{},
    }
  },
  created(){
    getQualify(1).then(res=>{
      this.list = res.result;
    })
  },
  methods:{
    fun_choose(item){
      // 隐藏
      this.showState = false;
      //使用$emit想父组件进行传值
      this.$emit("onQualifyChoose",item)
    }
  }
}
</script>

<style lang="scss" scoped>
.qualifyChecklist{
  .mint-popup-bottom{
    height: 70vh;
    overflow: hidden;
    background: transparent;
  }
  .mt1{      
    background: #fff;
    height: 100%;
    border-radius: 1rem 1rem 0 0;
    /* border-top-left-radius: 1rem; */
    /* border-top-right-radius: 1rem; */
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 10;

    .out{
      position: absolute;
      right: 1rem;
      top: -0.2rem;
      font-size: 2.6rem;
    }

    .title{
      text-align: center;
      margin: .68rem 0;
	  font-size: 1.52rem;
	  font-weight: 500;
	  color: #161616;
    }
    .over{
      height: 60vh;
      overflow: auto;
      padding: .42rem 1rem;
      .li_cont{
        color: #fff;
        font-size: 1.33rem;
        font-weight: 400;
        color: #FFFFFF;
        padding: 0 1.9rem 0;
        margin: 1rem 0;
        background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
        box-shadow:0px 0px 20px 0px rgba(63,206,177,0.4);
        border-radius:16px;
        ////////////////////////////////
        // 返回箭头
        .see_arrow {
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          margin: 0 auto;
          top: -.38em;
          right: -.2rem;
        }
        .see_arrow:after {            
          content: '';
          display: block;
          width: .4rem;
          height: .4rem;
          transform: rotate(45deg);
          border-right: 2px solid #fff;
          border-top: 2px solid #fff;
          margin-top: .5rem;
        }
        //////////////////////////////////

        .li_top{
          padding: .2rem 0;
          div{
            margin: .8rem 0;
          }
        }




        .li_bottom{
          position: relative;
          padding: .2rem 0;
          line-height: 1.828;
          border-top: 1px solid #fff;
          .see_arrow{
            top: 0;
          }
        }
      }
    }
  }
} 
</style>