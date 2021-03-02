<template>
<div>  
  <!-- 顶部按钮 -->
  <div class="common-header-wrap">
    <mt-header class="common-header" title="食用农产品合格证">
        <mt-button icon="back" slot="left"  @click="fun_back"></mt-button>
        <mt-button slot="right" size="small"
          class="tree"
          type="primary" 
          @click="$router.push({name:'SellerQtree'})">追溯</mt-button>
    </mt-header>
    <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
  </div>
  <!-- 顶部按钮 -->
  <div class="qualify">
    <!-- 顶部开始 -->
    <!-- <div class="header">
      <span class="down_arrow"  @click="fun_back"></span>
      <span>食用农产品合格证</span>
      <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span>
    </div> -->
    <!-- 顶部结束 -->  
    <!-- 内容开始 -->
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">我的合格证</mt-tab-item>
        <mt-tab-item id="4">已发合格证</mt-tab-item>
        <mt-tab-item id="2">新增合格证</mt-tab-item>
        <mt-tab-item id="3">发放合格证</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="mt1">
            <div class="get_data">
              <div class="time"
                @click="onDate('start',1)">
                <mt-cell title="起始" is-link>{{startTime?$moment.unix(startTime).format('YYYY-MM-DD'):''}}</mt-cell>
              </div>
              <div class="time"
                @click="onDate('end',1)">
                <mt-cell title="结束" is-link>{{endTime?$moment.unix(endTime).format('YYYY-MM-DD'):''}}</mt-cell>
              </div>
              <mt-button @click="fun_getDataAll(1)">查询</mt-button>
            </div>
            <!-- 我的合格证 -->
            <div class="li_cont"  v-for="(item,index) in list" :key="index">
              <!-- 上部分 -->
              <div class="li_top">
                <div @click="fun_see(item.certificate_id,1)">
                  <span>食用农产品名称：{{item.product_name}}</span>
                  <p class="see">
                    查看图片&nbsp;&nbsp;
                    <span class="see_arrow"></span>
                  </p>
                </div>
                <div>编号：{{item.certificate_no}}</div>
                <div>生成日期：{{item.add_time}}</div>
              </div>
              <!-- 上部分结束 -->
              <!-- 下部分 -->
              <!-- <div class="li_bottom" @click="fun_edit(1)">
                <span>修改合格证</span>
                <span class="see_arrow"></span>
              </div> -->
              <!-- 下部分结束 -->
            </div>        
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="mt1">            
            <div class="get_data">
              <div class="time"
                @click="onDate('start',0)">
                <mt-cell title="起始" is-link>{{startTimeMy?$moment.unix(startTimeMy).format('YYYY-MM-DD'):''}}</mt-cell>
              </div>
              <div class="time"
                @click="onDate('end',0)">
                <mt-cell title="结束" is-link>{{endTimeMy?$moment.unix(endTimeMy).format('YYYY-MM-DD'):''}}</mt-cell>
              </div>
              <mt-button @click="fun_getDataAll(0)">查询</mt-button>
            </div>
            <!-- 我的合格证 -->
            <div class="li_cont"  v-for="(item,index) in mylist" :key="index">
              <!-- 上部分 -->
              <div class="li_top">
                <div @click="fun_see(item.source_id,2)">
                  <span>食用农产品名称：{{item.certificate_info?item.certificate_info.product_name:""}}</span>
                  <p class="see">
                    查看图片&nbsp;&nbsp;
                    <span class="see_arrow"></span>
                  </p>
                </div>
                <div>编号：{{item.certificate_info?item.certificate_info.certificate_no:item.certificate_no}}</div>
                <div>生成日期：{{item.add_time}}</div>
              </div>
              <!-- 上部分结束 -->
              <!-- 下部分 -->
              <!-- <div class="li_bottom" @click="fun_edit(1)">
                <span>修改合格证</span>
                <span class="see_arrow"></span>
              </div> -->
              <!-- 下部分结束 -->
            </div>        
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="mt2">
            <div 
            v-if="utils.isSpecialIdentity(info.storeclass_id)"
             class="blue" @click="fun_newQualify(1)">
              <div>
                <p>添加合格证</p>
                <p>手动添加</p>
              </div>
            </div>
            <div class="blue red"
              v-if="!utils.isSpecialIdentityEnd(info.storeclass_id)"
              @click="fun_newQualify(-1)">
              <div>
                <p>上传合格证</p>
                <p>上传图片</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="mt2">
            <div class="blue" @click="fun_put(1)">
              <div>
                <p>发放合格证（本地）</p>
                <p>本地商户合格证发放</p>
              </div>
            </div>
            <div class="blue red" @click="fun_put(-1)">
              <div>
                <p>发放合格证（外地）</p>
                <p>外地商户合格证发放</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 选择日期 所有  -->
    <mt-datetime-picker
        ref="startTime"
        type="date"
        :startDate="new Date('2020/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="startTime?(new Date(startTime*1000)):(new Date())"
        @confirm="dateConfirm"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
        ref="endTime"
        type="date"
        :startDate="new Date('2000/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="endTime?(new Date(endTime*1000)):(new Date())"
        @confirm="dateConfirm"
    >
    </mt-datetime-picker>
    <!-- 选择日期 我发放的  -->
    <mt-datetime-picker
        ref="startTimeMy"
        type="date"
        :startDate="new Date('2020/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="startTimeMy?(new Date(startTimeMy*1000)):(new Date())"
        @confirm="dateConfirm"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
        ref="endTimeMy"
        type="date"
        :startDate="new Date('2000/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="endTimeMy?(new Date(endTimeMy*1000)):(new Date())"
        @confirm="dateConfirm"
    >
    </mt-datetime-picker>
  </div>
  
</div>
</template>

<script>
import { Toast,  } from "mint-ui";
import { mapState } from "vuex";
import { getQualifyAll, getMyQualify } from "../../../api/sellerQualify";//获取 证书列表
export default {
  data(){
    return {
      startTime:null,  //起始时间
      endTime:null,    //结束时间
      startTimeMy:null,  //起始时间
      endTimeMy:null,    //结束时间
      dataName:null,   //时间类型
      selectData: '',
      selectDataMy: '',
      TimeType:1,

      selected: '1',
      list:[],
      mylist:[],
    }
  },
  computed:{
    ...mapState({
      // info: state => state.member.info,//用户详细信息 获取id
      info: state => state.seller.info,//用户商家详细信息 获取id
    }),
  },

  created(){
    //起始结束日期
    this.endTime = parseInt(new Date().getTime() / 1000);
    this.startTime = parseInt( (new Date(new Date().getTime()-2592000000)) / 1000);
    this.endTimeMy = parseInt(new Date().getTime() / 1000);
    this.startTimeMy = parseInt( (new Date(new Date().getTime()-2592000000)) / 1000);

    this.selected = this.$route.query.id?this.$route.query.id:"1";
    this.fun_getDataAll(1);
    this.fun_getDataAll();
  },

  methods:{
    // 选择时间函数
    onDate (name,type) {
      this.dataName = name;
      this.TimeType = type;
      if( type == 1 ){
        if( name ==  'start' ){
          this.selectData = this.startTime*1000;
          this.$refs.startTime.open();
        }else{
          this.selectData = this.endTime*1000;
          this.$refs.endTime.open();
        }
      }else{
        if( name ==  'start' ){
          this.selectDataMy = this.startTime*1000;
          this.$refs.startTimeMy.open();
        }else{
          this.selectDataMy = this.endTime*1000;
          this.$refs.endTimeMy.open();
        }
      }
    },
    // 接收日期
    dateConfirm (value) {
      var nowDate = parseInt(value.getTime() / 1000);
      if( this.TimeType == 1){
        if( this.dataName == 'start' ){
          if( nowDate <= this.endTime ){
            this.startTime = nowDate;
          }else{
            Toast("请重新选择时间");
          }
        }else{
          if( nowDate >= this.startTime ){
            this.endTime = nowDate;
          }else{          
            Toast("请重新选择时间");
          }
        }
      }else{
        if( this.dataName == 'start'){
          if( nowDate <= this.endTimeMy ){
            this.startTimeMy = nowDate;
          }else{
            Toast("请重新选择时间");
          }
        }else{
          if( nowDate >= this.startTimeMy ){
            this.endTimeMy = nowDate;
          }else{
            Toast("请重新选择时间");
          }
        }
      }
      this.$forceUpdate()
    },
    // 获取数据函数
    fun_getDataAll( type ){
      if( type == 1){
        getQualifyAll(this.$moment.unix(this.startTime).format('YYYY-MM-DD'),this.$moment.unix(this.endTime).format('YYYY-MM-DD')).then(res=>{
          this.list = res.result;
        })
      }else{
        getMyQualify(this.$moment.unix(this.startTimeMy).format('YYYY-MM-DD'),this.$moment.unix(this.endTimeMy).format('YYYY-MM-DD')).then(res=>{
          this.mylist = res.result;
        })
      }
    },
    // 返回函数
    fun_back(){
      this.$router.push( {name:"SellerIndex"} );
    },
    // 加载数据
    fun_loading(){

    },
    // 查看图片
    fun_see( id ,n ){
      this.$router.push( {name:"HomeQsee",query:{ sName:this.info.seller_name, id:id, n:n } } );
    },
    // 修改合格证
    fun_edit(v){
      this.$router.push( { name:"SellerQedit" ,query: { id: v} })
    },
    //  新增合格证
    fun_newQualify(v){
      if( v >0 ){
        this.$router.push( {name:"SellerQnew"})
      }else{
        this.$router.push( {name:"SellerQedit"})
      }
    },
    // 发放合格证
    fun_put(v){
      this.$router.push( {name:"SellerQput", query: { id: v} })
    },
  }
}
</script>

<style lang="scss" scoped>
div{
  .common-header-wrap{
    // 追溯
    .tree{
      z-index: 99;
      color: #fff;
      font-size: .86rem;
      line-height: .86rem;
      height: 1.4326rem;
      background: transparent !important;
      padding: .24rem .2rem;
      border-radius: 5px;
      border: 1px solid #666;
      color: #666;
    }
  }
}
.qualify{
  height: auto;
  padding: 0 .4rem 0;
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  position: relative;
  // 按钮
  .btn_new{
    background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
    box-shadow:0px 0px 20px 0px rgba(67,199,183,0.5);
    border-radius:40px;
    color: #fff;
    position: absolute;
    bottom: 1rem;
    width: 92.8vw;
  }
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
        font-size: .56rem;
        line-height: 2.8;
        margin: 0;
        color: #999;
        // color:#3cd3ad;
      }
    }
    & /deep/ .mint-navbar .is-selected .mint-tab-item-label{
      font-size: 0.63rem;
      color: #000;
      // color:#4cb8c4;
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
    .get_data{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 18px;

      // border-bottom: 1px solid #999;
      // padding: 5px 0;
      // border-top: 1px solid #999;
      .time{
        width:42%;
        & /deep/ .mint-cell{
          min-height: 1.8rem;
        }
        & /deep/ .mint-cell-wrapper{
          font-size: .6rem;
          // color: #3cd3ad;
        }
        & /deep/ .mint-cell-value.is-link{
          // color: #3cd3ad;
        }
      }
      button{
        font-size: .6rem;
        width: 16%;

        height: 1.678rem;
        border: 1px solid #666;
        // background: linear-gradient(139deg, #3cd3ad 0%, #4cb8c4 100%);
        // color: #fff;
      }
    }

    .mt1{      
      padding: .4rem .4rem;
      // margin-top: 1rem;
      max-height: 84vh;
      overflow: auto;
      .li_cont{
        margin: .4rem 0;
        color: #fff;
        padding: 0 .8rem 0;
        font-size: 0.7rem;
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
            &:first-child{
              display: flex;
              justify-content: space-between;

              .see{
                position: relative;
              }
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
    }

    .mt2{      
      padding: .4rem 0;
      .blue{
        width: 100%;
        height: 6.8rem;
        position: relative;
        background-image: url('../../../assets/image/qualify/blue_.png');
        background-size: cover;

        width: 100%;
        height: 8rem;
        position: relative;
        background-image: url(/img/blue_.f060e06d.png);
        background-size: contain;
        background-repeat: no-repeat;
        img{
          width: 100%;
        }
        div{
          font-size: .7rem;
          color: #fff;
          width: 7rem;
          position: absolute;
          right: 10vw;
          top: 3rem;

          p{
            &:last-child{
              font-size: .58rem;
              margin-top: .2rem;
            }
          }

        }
      }
      .red{
        background-image: url('../../../assets/image/qualify/red_.png');
      }
    }
    

  } 
}
</style>