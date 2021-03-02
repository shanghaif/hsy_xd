<template>
  <div class="qualify">
    <!-- 顶部开始 -->
    <div class="header">
      <!-- 返回按钮 -->
      <span class="down_arrow"  @click="fun_back"></span>
      <span>食用农产品合格证</span>
    </div>
    <!-- 顶部结束 -->  
    <!-- 内容开始 -->
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">我的合格证</mt-tab-item>
        <mt-tab-item id="4">我发放的合格证</mt-tab-item>
        <mt-tab-item id="2">新增合格证</mt-tab-item>
        <mt-tab-item id="3">发放合格证</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="mt1">
            <!-- 我的合格证 -->
            <div class="li_cont"  v-for="(item,index) in list" :key="index">
              <!-- 上部分 -->
              <div class="li_top">
                <div @click="fun_see(item.certificate_id)">
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
            <!-- 我的合格证 -->
            <div class="li_cont"  v-for="(item,index) in list" :key="index">
              <!-- 上部分 -->
              <div class="li_top">
                <div @click="fun_see(item.certificate_id)">
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
        <mt-tab-container-item id="2">
          <div class="mt2">
            <div class="blue" @click="fun_newQualify(1)">
              <div>
                <p>添加合格证</p>
                <p>手动添加</p>
              </div>
            </div>
            <div class="blue red" @click="fun_newQualify(-1)">
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
    <!-- 内容结束 -->  
      <!-- 保存按钮 -->
      <!-- <mt-button
        v-if="selected == 1"
        @click="fun_newQualify"
        class="btn_new"
        size="large"
        >新增食品合格证
      </mt-button>   -->
      <!-- 按钮结束 -->
  </div>
</template>

<script>
import { Toast,  } from "mint-ui";
import { mapState } from "vuex";
import { getQualify } from "../../../api/sellerQualify";//获取 证书列表
export default {
  data(){
    return {
      selected: '1',
      list:[],
    }
  },
  computed:{ 
    ...mapState({
      info: state => state.member.info,//用户详细信息 获取id
    }),
  },

  created(){
    this.selected = this.$route.query.id?this.$route.query.id:"1";
    getQualify().then(res=>{
      this.list = res.result;
    })
  },

  methods:{
    // 返回函数
    fun_back(){
      this.$router.push( {name:"SellerIndex"} );
    },
    // 加载数据
    fun_loading(){

    },
    // 查看图片
    fun_see( id ){
      this.$router.push( {name:"SellerQsee",query:{ id:id } } );
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
.qualify{
  height: 100vh;
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
    padding-top: 1.4rem;
    & /deep/ .mint-navbar .mint-tab-item{
      color: #000;
      border-bottom:0;
      padding: 0;
      .mint-tab-item-label{
        padding: 0;
        font-size: .8rem;
        margin: 0;
      color: #999;
      }
    }
    & /deep/ .mint-navbar .is-selected .mint-tab-item-label{
      font-size: 1rem;
      color: #000;
      font-weight: 600;
      position: relative;
      bottom: .21rem;
    }

    // & /deep/ .mint-navbar .mint-tab-item.is-selected[data-v-4e8f00f0] {
    //   color: #000;
    //   font-weight: 600;
    //   position: relative;
    //   bottom: .21rem;
    // }
    .mt1{      
      padding: .4rem .4rem;
      margin-top: 1rem;
      max-height: 26.8rem;
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
      padding: 1.4rem 0;
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