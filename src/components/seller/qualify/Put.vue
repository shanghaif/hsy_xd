<template>
<div>
  <div class="common-header-wrap">
    <mt-header class="common-header" :title="'发放合格证'+(id>0?'本地':'外地')">
        <mt-button icon="back" slot="left"  @click="fun_back"></mt-button>
        <!-- <mt-button slot="right" size="small"
          style="width:2.6rem;height: 1.6rem;color:#fff" 
          type="primary" 
          @click="submitData">追溯</mt-button> -->
    </mt-header>
    <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
  </div>
  <div class="q_put">
      <!-- 顶部开始 -->
      <!-- <div class="header"> -->
        <!-- 返回按钮 -->
        <!-- <span class="down_arrow"  @click="fun_back"></span>
        <span>发放合格证({{id>0?"本地":"外地"}})</span>
      </div> -->
      <!-- 上面输入框 -->
      <div v-if="id>0" class="top_cont">
        <!-- <div>
          <mt-search 
          autofocus 
          v-model="searchValue" 
          :result="['张三']">
          </mt-search>
        </div> -->
        <div class="name">
          <mt-field label="商户名称：" v-model="store_name" @focus.native.capture="fun_first"></mt-field>

          <!--  -->
          <a v-if="showSearch" class=" mint-field searchlist">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title" style="width: 93px;"></div>
              <div class="mint-cell-value">
                <!-- <input type="text" class="mint-field-core"> -->
                <p @click="fun_end(item)" v-for="item in storeList" :key="item.store_id">{{item.store_name}}</p>
                <div class="mint-field-other"></div>
              </div>
            </div>
          </a>
          <!--  -->
        </div>
        <div><mt-field label="商户编号：" readonly v-model="store_id"></mt-field></div>
        <div><mt-field label="可用数量：" type="number" v-model="num"></mt-field></div>
        <div  @click="$refs.qualify.showState = true"><mt-cell title="食品合格证" is-link>{{certificate_no}}</mt-cell></div>
      </div>
      <div v-if="id<0" class="top_cont">
        <div><mt-field label="商户名称：" v-model="wName"></mt-field></div>
        <!-- <div><mt-field label="商户编号：" type="number" v-model="wStore_id"></mt-field></div> -->
        <div><mt-field label="可用数量：" type="number" v-model="wNum"></mt-field></div>
        <div  @click="$refs.qualify.showState = true"><mt-cell title="食品合格证" is-link>{{certificate_no}}</mt-cell></div>
      </div>
      <qualify-checklist @onQualifyChoose="fun_receiveQualify" ref="qualify"/>
      <!-- 结束 -->
        <mt-button
          @click="fun_add"
          class="btn_new"
          size="large"
          >提交
        </mt-button>
  </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import QualifyChecklist from "./QualifyChecklist"
import { getStoreList, putQualify, putQualify_w } from "../../../api/sellerQualify";//获取 商家列表
export default {
  data () {
    return {
      id: this.$route.query.id,//来自于
      goods:{},
      store_name:null,//商家名称
      store_id:null,  //商家编号
      num:null,    //数量
      certificate_no:null,certificate_id:null,
      storeList:[],    //商家列表
      showSearch:false,//显示模糊搜索

      wName:null,   //外地商家名称
      // wStore_id:null,//外地商家编号
      wNum:null,//外地数量

      certificate_num:null,//合格证数量

      timeout: null
    }
  },
  components:{
    "qualify-checklist":QualifyChecklist
  },
  watch:{
    store_name:function(v){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // console.log("走接口",v);
        getStoreList(v).then(res=>{
          this.storeList = res.result;
        })
      }, 300)
    }
  },
  methods:{
    fun_first(){
      this.showSearch = true;
    },
    fun_end(item){
      this.store_id = item.store_id;
      this.store_name = item.store_name;
      this.showSearch = false;
    },
    // 返回函数
    fun_back(){
      this.$router.push( {name:"SellerQualify",query:{id:'3'} });
    },

    // 选择合格证
    fun_receiveQualify(item){
      this.certificate_num = item.product_num;
      this.certificate_no = item.certificate_no;
      this.certificate_id = item.certificate_id;
    },

    // 提交
    fun_add(){
      if( this.id <0 ){
        if ( !this.wName ){
          Toast("请输入商家名称");
          return false;
        }
        // if( !this.wStore_id){
        //   Toast("请输入商家编号");
        //   return false;
        // }
        if ( !this.wNum ){
          Toast("请输入数量");
          return false;
        }
        if ( !this.certificate_id ){
          Toast("请选择合格证");
          return false;
        }
        if( this.certificate_num <this.wNum ){
          // Toast("数量不得大于合格正限定数量"+this.certificate_num);
          Toast("数量不得大于"+this.certificate_num+"(合格证限定数量)");
          return false;
        }
        putQualify_w( this.wName,this.wStore_id, this.wNum, this.certificate_id ).then(res=>{
          Toast("操作成功");
          // console.log(res);
          // this.$router.push( {name:"SellerQualify",query:{id:'3'} });
          this.$router.push( {name:"SellerQualify",query:{id:'4'} });
        }).catch(err=>{
          Toast(err.message);
        })
      }else{
        if ( !this.store_id ){
          Toast("请选择商家名称");
          return false;
        }
        if ( !this.num ){
          Toast("请输入数量");
          return false;
        }
        if ( !this.certificate_id ){
          Toast("请选择合格证");
          return false;
        }
        if( this.certificate_num <this.num ){
          Toast("数量不得大于"+this.certificate_num+"(合格证限定数量)");
          return false;
        }
        putQualify( this.store_name,this.store_id, this.num, this.certificate_id ).then(res=>{
          Toast("操作成功");
          // console.log(res);
          // this.$router.push( {name:"SellerQualify",query:{id:'3'} });
          this.$router.push( {name:"SellerQualify",query:{id:'4'} });
        }).catch(err=>{
          Toast(err.message);
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.q_put{
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  position: relative;
  padding: 0 .4rem 0;
  height: 97vh;

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
  // 按钮
  .btn_new{
    background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
    box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
    border-radius:40px;
    color: #fff;
    margin: 1rem 0;

    position: absolute;
    width: 96vw;
    bottom: 1rem;
  }

  .name{
    position: relative;

    .searchlist{
      position: absolute;
      top: 50px;
      right: 0px;
      width: 100%;
      // background: pink;
      
      .mint-cell-value{
        display: block;
        // border: 1px solid #F65F49;
        max-height: 10rem;
        // min-height: 4rem;
        overflow: auto;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        background: #999;
        z-index: 10;
        padding-left: 12px;
        p{
          margin: .7652rem 0;
          width: 96%;
          color: #fff;
          border-bottom: 1px solid #fff;
          padding-bottom: 5px;
          font-size: .82rem;
        }
      }
    }
  }
}

</style>
