<template>
<div>
  <div class="common-header-wrap">
    <mt-header class="common-header" title="报废/消费">
        <mt-button icon="back" slot="left"  @click="fun_back"></mt-button>
        <!-- <mt-button slot="right" size="small"
          style="width:2.6rem;height: 1.6rem;color:#fff" 
          type="primary" 
          @click="submitData">追溯</mt-button> -->
    </mt-header>
    <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
  </div>
  <div class="qualify">
    <!-- 顶部开始 -->
    <!-- <div class="header"> -->
      <!-- 返回按钮 -->
      <!-- <span class="down_arrow"  @click="fun_back"></span>
      <span>报废/消费</span>
    </div> -->
    <!-- 顶部结束 -->  
    <!-- 内容开始 -->
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">报废/消费列表</mt-tab-item>
        <mt-tab-item id="2">新增报废/消费</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="mt1">
            <!-- 我的合格证 -->
            <div class="li_cont">
              <!-- 上部分 -->
              <!-- <div class="li_top">
                <div class="flex">
                  <div>ID：{{item.goods_id}}</div>
                  <div class="see">
                    商品：{{item.goods_name}}&nbsp;&nbsp;
                  </div>
                </div>
                <div class="flex">
                  <div>数量：{{item.reimbursement_num}}</div>
                  <div class="see">
                    分类：{{item.type_name}}&nbsp;&nbsp;
                  </div>
                </div>
                <div>合格证编号：{{item.certificate_id}}</div>
                <div>时间：{{item.add_time}}</div>
              </div> -->
              <!-- 表格形式 -->
              <table class="table" v-for="(item,index) in list" :key="index">
                <tbody>
                  <tr>
                    <td>ID：{{item.goods_id}}</td>
                    <td>商品：{{item.goods_name}}</td>
                  </tr>
                  <tr>
                    <td>数量：{{item.reimbursement_num}}</td>
                    <td>分类：{{item.type_name}}&nbsp;&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="2">合格证编号：{{item.certificate_id}}</td>
                  </tr>
                  <tr>
                    <td colspan="2">时间：{{item.add_time}}</td>
                  </tr>
                </tbody>
              </table>
            </div>        
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="mt2">
            <div  @click="onRegion"><mt-field label="选择商品：" :readonly="true" v-model="goodsName"></mt-field></div>
            <div><mt-field label="数量(重量)：" v-model="num"></mt-field></div>
            <div  @click="onRegion1"><mt-field label="选择类型：" :readonly="true" v-model="goodsTypeName"></mt-field></div>
            <!-- 提交按钮 -->
            <div>
              <mt-button
                @click="fun_addQualify"
                class="btn_new"
                size="large"
                >保存
              </mt-button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
      
		<region-picker ref="picker" @onConfirm="onPickerConfirm"></region-picker>
		<region-picker1 ref="picker1" @onConfirm1="onPickerConfirm1"></region-picker1>
  </div>
</div>
</template>

<script>
import { Toast,  } from "mint-ui";
import { getGoodsReimbursement,addGoodsReimbursement } from "../../../api/sellerGoods";//获取 证书列表
import RegionPicker from './RegionPicker.vue'
import RegionPicker1 from './RegionPicker1.vue'
export default {
  data(){
    return {
      selected: '1',

      goodsId:null,
      goodsName:null,
      num:null,
      goodsTypeName:null,
      goodsType:null,

      list:[],
    }
  },
  components:{    
    "region-picker":RegionPicker,
    "region-picker1":RegionPicker1
  },

  created(){
    this.fun_loading();
  },

  methods:{
    // 返回函数
    fun_back(){
      this.$router.go(-1);
    },

    // 获取数据并加载列表
    fun_loading(){
      getGoodsReimbursement().then(res=>{
        this.selected = '1';
        this.list = res.result;
      })
    },

    onRegion1 (picker, values) {
      this.$refs.picker1.currentValue = true
    },
    onRegion (picker, values) {
      this.$refs.picker.currentValue = true
    },
    // 接收数据
    onPickerConfirm(e){
      var item = e[0];
      this.goodsId = item.goods_id;
      this.goodsName = item.goods_name;
    },
    // 接收数据
    onPickerConfirm1(e){
      var item = e[0];
      this.goodsTypeName = item.name
      this.goodsType = item.id
    },
    //  新增
    fun_addQualify(v){
      if( !this.goodsId ){
        Toast("请选择商品");
        return false;
      }
      if( !this.num ){
        Toast("请输入重量(数量)");
        return false;
      }
      if( !this.goodsType ){
        Toast("请选择类型");
        return false;
      }
      addGoodsReimbursement(this.goodsId,this.num,this.goodsType).then(res=>{
        Toast("操作成功");
        this.fun_loading();
      }).catch(err=>{
        Toast(err.message);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.qualify{
  height: 100vh;
  padding: 0 .4rem 0;
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  position: relative;
  // 顶部内容----------------------------------
  .header{
    text-align: center;
    position: relative;  
    padding: .46rem .2rem;
    font-size: 1rem;
    color: #000;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
      top: .1rem;
    }
    .down_arrow:after {            
      content: '';
      display: block;
      width: $arrow;
      height: $arrow;
      transform: rotate(225deg);
      border-right: 2px solid $arrowcolor;
      border-top: 2px solid $arrowcolor;
      margin-top: .5rem;
    }
  }

  // 主题内容----------------------------------
  .content{
    padding-top: .4rem;
    & /deep/ .mint-navbar .mint-tab-item{
      color: #000;
      border-bottom:0;
      padding: 0;
      .mint-tab-item-label{
        padding: 0;
        font-size: .86rem;
        line-height: 2.8;
        margin: 0;
      color: #999;
      }
    }
    & /deep/ .mint-navbar .is-selected .mint-tab-item-label{
      font-size: 0.83rem;
      color: #000;
      font-weight: 600;
      position: relative;
      bottom: .1rem;
    }

    // & /deep/ .mint-navbar .mint-tab-item.is-selected[data-v-4e8f00f0] {
    //   color: #000;
    //   font-weight: 600;
    //   position: relative;
    //   bottom: .21rem;
    // }
    .mt1{      
      padding: .4rem .4rem;
      // margin-top: 1rem;
      max-height: 84vh;
      overflow: auto;
      .li_cont{
        margin: .4rem 0;
        color: #333;
        padding: 8px ;
        font-size: 0.7rem;
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
            margin: .18rem 0;
          }
          .flex{
            margin: 0;
            display: flex;
            justify-content: space-between;
            div{
              width:40%;
              text-align: left;
            }
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

      .table{
        width: 100%;
        border: 1px solid #666;
        border-collapse: collapse;
        margin-bottom: 15px;

        
        // background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
        // box-shadow:0px 0px 20px 0px rgba(63,206,177,0.4);
        // border-radius:16px;
        // color: #fff;
        td{
          padding:5px;
          border:  1px solid #666;
        }
      }
    }

    .mt2{      
      padding: .4rem 0;
      div{
        display: block;
        margin: 1px;
        position: relative;
      }      
      // 按钮
      .btn_new{
        margin-top: 30px;
        background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
        box-shadow:0px 0px 20px 0px rgba(67,199,183,0.5);
        border-radius:40px;
        color: #fff;
        width: 92.8vw;
      }
    }
    

  } 
}
</style>