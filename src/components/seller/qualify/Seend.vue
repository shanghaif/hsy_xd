<template>
<div>
  <div class="common-header-wrap">
    <mt-header class="common-header" title="食品合格证">
        <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        <!-- <mt-button slot="right" size="small"
          style="width:2.6rem;height: 1.6rem;color:#fff" 
          type="primary" 
          @click="submitData">追溯</mt-button> -->
    </mt-header>
    <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
  </div>
  <div class="q_see">
      <!-- 顶部开始 -->
      <!-- <div class="header"> -->
        <!-- 返回按钮 -->
        <!-- <span class="down_arrow"  @click="fun_back"></span>
        <span>食品合格证</span>
      </div> -->
      <!-- 上面输入框 -->
      <div ref="imageDom"  v-show="!imgState">      
        <div class="img_cont container" >
          <img class="img_cont_imgBg" :src="require('../../../assets/image/bg.jpg')" alt="">
          <div class="content">
            <div class="no">No.{{resObj.certificate_no}}</div>
            <!-- 上面 -->
            <ul class="top">
              <li><span>食用农产品名称：&nbsp;&nbsp;{{ resObj.product_name}}</span></li>
              <li><span>数量（重量）：&nbsp;&nbsp;{{ resObj.product_num}}&nbsp;{{resObj.product_unit_name?resObj.product_unit_name:""}}</span></li>
              <!-- <li><span>单位：&nbsp;&nbsp;{{resObj.product_unit_name?resObj.product_unit_name:""}}</span></li> -->
              <li><span>联系方式：&nbsp;&nbsp;{{ resObj.product_phone}}</span></li>
              <li><span>产地：&nbsp;&nbsp;{{ resObj.product_origin}}</span></li>
              <li><span>开具日期：&nbsp;&nbsp;{{ resObj.add_time}}</span></li>
              <li><span>生产者盖章或签名：&nbsp;&nbsp;{{ resObj.autograph_seal}}</span></li>
            </ul>
            <!-- 下面 -->
            <ul class="bottom">
              <li><span>我承诺对产品质量安全以及合格证真实性负责：</span></li>
              <!-- 多选框开始 -->
              <div class="checkbox">
                <div class="first">
                  <p><input type="checkbox" class="hidden" :checked="resObj.check1 == '1'"/>
                    <span class=""></span>
                    <span class="txt">不使用禁限用农药兽药</span>
                  </p> 
                  <p><input type="checkbox" class="hidden"  :checked="resObj.check2 == '1'" />
                    <span class=""></span>
                    <span class="txt">不使用非法添加物</span>
                  </p> 
                </div>
                <div class="second">
                  <p><input type="checkbox" class="hidden"  :checked="resObj.check3 == '1'" />
                    <span class=""></span>
                    <span class="txt">遵循农药安全间隔期、兽药休药期规定</span>
                  </p> 
                </div>
                <div class="long">
                <p><input type="checkbox" class="hidden"  :checked="resObj.check4 == '1'"/>
                  <span class=""></span>
                  <span class="txt">销售的食用农产品符合农药兽药残留食品安全国家标准</span>
                </p> 
                </div>
                <div class="three">
                  <p><input type="checkbox" class="hidden"  :checked="resObj.check5 == '1'"/>
                    <span class=""></span>
                    <span class="txt">绿色食品</span>
                  </p>
                  <p><input type="checkbox" class="hidden"  :checked="resObj.check6 == '1'"/>
                    <span class=""></span>
                    <span class="txt">有机食品</span>
                  </p>
                  <p><input type="checkbox" class="hidden" :checked="resObj.check7 == '1'"/>
                    <span class=""></span>
                    <span class="txt">自检合格</span>
                  </p>
                </div>
                <div class="end">
                  <p><input type="checkbox" class="hidden" :checked="resObj.check8 == '1'"/>
                    <span class=""></span>
                    <span class="txt">委托检验合格</span>
                  </p>
                  <p><input type="checkbox" class="hidden" :checked="resObj.check9 == '1'" />
                    <span class=""></span>
                    <span class="txt">地理标志产品</span>
                  </p>              
                </div>
              </div>
              <!-- 多选框结束 -->
              <!-- <div class="hr"> -->
                <p class="hr">{{resObj.additional}}</p>
                <div class="qrcode" id="qrcode" ref="qrcode"></div>
              <!-- </div> -->
            </ul>
            <!-- 下面 -->
          </div>
          
        </div>    
      </div>
      <!-- 下面图片 -->
      <div v-show="imgState" class="img_url">
        <img :src="imgUrl" crossOrigin='anonymous'>
        <!-- <p style="margin-top: 10px;text-align: center;">{{resObj.store_name}}({{resObj.num}})</p> -->
        <p style="margin-top:10px;font-size:.8rem;text-align: center;">经销商：{{resObj.store_name}}</p>
        <p style="margin:10px 0;font-size:.8rem;text-align: center;">数量：({{resObj.num}})</p>
      </div>
      <!-- <div class="explain">
        <mt-button
          @click="fun_downImg"
          class="btn_new"
          size="large"
          >下载合格证
        </mt-button>  
      </div> -->

      <div>
        <canvas id="canvas"></canvas>
        <div style="display:none;">
          <img id="source" :src="imgUrl"
              width="300" height="227">
        </div>
      </div>

  </div>
</div>
</template>

<script>
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"
// import JsPDF from 'jspdf'
import FileSaver from 'file-saver';
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import { getQualifyInfo, getMyQualifyInfo, getPdfQualify_w } from "../../../api/sellerQualify";//获取 证书列表
export default {
  data () {
    return {
      imgState:false,
      imgUrl:null,//图片路径
      sName:this.$route.query.sName,//传过来的member_id
      id:this.$route.query.id,//传过来的id
      n:this.$route.query.n,//传过来的n

      resObj:{},    //返回数据
      product_name : null,  //产品名称
      product_num : null,   //产品数量
      product_phone : null, //联系方式
      product_origin : null,//产地
      add_time : null,      //开具日期
      autograph_seal : null,//签名
      additional : null,    //附加信息
      hasImgUrl:false,      //图片格式
      // check:{
      //   check1: null,
      //   check2: null,
      //   check3: null,
      //   check4: null,
      //   check5: null,
      //   check6: null,
      //   check7: null,
      //   check8: null,
      //   check9: null,
      // }
    }
  },
  computed: {
    ...mapState({
      items: state => state.goodsclass.items
    })
  },
  created () {
    this.fun_loading();
  },
  methods: {
    fun_loading(){
      if( this.n ==2 ){//我的
        // 查看详情
        getMyQualifyInfo( this.id ).then(res=>{
          this.resObj.num = res.result.num;
          this.resObj.store_name = res.result.store_name;
          if( !res.result.certificate_info.certificate_image ){
            this.resObj = res.result.certificate_info;
            this.resObj.add_time = res.result.add_time;

            this.resObj.num = res.result.num;
            this.resObj.store_name = res.result.store_name;
            this.qr = new QRCode(document.getElementById("qrcode"), {
              width: 60,
              height: 60, // 高度
              text: env.H5_HOST + "/home/qseend?id="+this.id+"&n=2" // 二维码内容
            })
          }else{
            // console.log(123);
            this.resObj.certificate_no = null;
            this.hasImgUrl = true;
            // 展示图片
            this.imgState = true;
            this.imgUrl = res.result.certificate_info.image;
          }
        })      
      }else{
        // 查看详情
        getQualifyInfo( this.id ).then(res=>{
          this.resObj = res.result;
          this.resObj.num = res.result.product_num;
          if( !res.result.certificate_image ){
            this.qr = new QRCode(document.getElementById("qrcode"), {
              width: 60,
              height: 60, // 高度
              text: env.H5_HOST +  "/home/qseend?id="+this.id+"&n=1" // 二维码内容
            });
            // 拼接
            var that = this;
            this.$nextTick(()=>{
              //生成图片
              html2canvas(this.$refs.imageDom,{useCORS:true,logging:true}).then(canvas => {
                  // 转成图片，生成图片地址
                  this.imgUrl = canvas.toDataURL("image/png"); //可将 canvas 转为 base64 格式
                  this.imgState = true;
                  if( !window.plus){
                    that.link = document.createElement("a");
                    that.link.href = canvas.toDataURL("image/png");//下载链接
                    that.link.setAttribute("download","123.jpg");
                    that.link.style.display = "none";//a标签隐藏
                    document.body.appendChild(that.link);
                  }
              });
            })
          }else{
            // 展示图片
            this.hasImgUrl = true;
            this.imgState = true;
            // console.log( res.result);
            this.imgUrl = res.result.image;
            
          }
        })
      }
    },
    // 返回
    fun_back(){
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped lang="scss">
.q_see{
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  // height: 100vh;
  position: relative;
  padding:0 .4rem 0;

  .explain{
    padding: .41rem .41rem;
    text-align: center;
    font-size: .4rem;
    .btn_new{
      font-size: .4rem;
      background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
      border-radius:40px;
      color: #fff;
      width: 68%;
      margin: 0 auto;
    }
    p{
      margin: .2rem;
    }

   
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

  // 
  .img_cont{
    // display: inline-block;
    // text-align: left;
    position: relative;
    $w:300px;
    $h:456px;
    // background-image: url('../../../assets/image/bg1.jpg');
    // background-repeat: no-repeat;
    // background-size: $w $h;
    // background-position: top;
    height: 480px;

    .img_cont_imgBg{
      position: absolute;
      width: $w;
      height: $h;
      left: 50%;
      margin-left: -150px;
    }
    .content{
      width: $w;
      // height: $h;
      // background: red;
      margin: 0 auto;
      padding-top: 94px;
      position: relative;

      .no{
        // font-size: 12px;
        // position: absolute;
        // top: 41px;
        // right: 7px;
        // -webkit-transform: scale(0.46);
        // transform: scale(0.46);
        font-size: 12px;
        position: absolute;
        top: 41px;
        width: 200px;
        right: -20px;
        -webkit-transform: scale(0.46);
        transform: scale(0.46);
      }

      .top{
        font-size: 12px;

        li{
          margin-bottom: 7px;
          span{            
            display: block;
            transform: scale(.7);
          }
        }
      }
      // 多选框
      .bottom{
        height: 128px;
        width: 218px;
        margin-left: 42px;
        margin-top: 32px;
        font-size: 12px;
        font-size: 12px;
        position: relative;
        transform: scale(.98);

        li{
          margin-bottom: 7px;
          position: absolute;
          left: -32px;
          span{            
            display: block;
            -webkit-transform: scale(0.7);
            transform: scale(0.7);
            white-space: nowrap;
          }
        }

        .checkbox{
          margin-top: 16px;
          padding-left: 10px;
          margin-bottom: 7px;
          position: absolute;
          left: -12px;
          div{
            position: relative;
            height: 15px;
            p{
              position: absolute;
              left: -13px;
            }

          }
          .first{
            height: 15px;
            p{
              width: 133px;
              &:last-child{
                left: 117px;
              }
            }
          }
          .three{
            height: 15px;
            p{
              width: 133px;
              top: 0;
              left: 55px;
              &:first-child{
                left: -13px;
              }
              &:last-child{
                left: 117px;
              }
            }
          }
          .end{
            p{
              width: 133px;
              top: 0;
              &:last-child{
                left: 55px;
              }
            }

          }
          .second{            
            p{
              width: 224px;
              left: -28px;
            }
          }
          .long{
            p{
              width: 300px;
              left: -40px;
            }
          }
          input:checked{
            color: #000;
            background: #fff;
            &::before{
              content:"☑"
            }
          }

          p{
            position: relative;
            transform: scale(.68)
          }

          .hidden {
            opacity: 0;
            position: absolute;
            z-index: -1;
          }
          input[type=checkbox] + span {
            display: inline-block;
            height: 10px;
            width: 10px;
            border-radius: 3px;
            border: 1px solid #000;
            background-color: #fff;
          }
          input[type=checkbox]:checked + span {
            &::before{
              content:"✔";
              position: absolute;
              top: -1.9px;
            }
          }
          .txt {
            position: relative;
            /* height: 25px; */
            top: -3px;
            left: 3px;
          }
        }

        .hr{
          position: absolute;
          top: 89px;
          width: 208px;
          left: -24px;
          margin-bottom: 7px;
          line-height: 22px;
          -webkit-transform: scale(0.7);
          transform: scale(0.7);
          white-space: pre-wrap;
        }

        .qrcode{
          position: absolute;
          bottom: -10px;
          right: 8px;
          img{
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
  // .img_cont1{
  //   background-image: url('../../../assets/image/bg1.jpg');
  // }
  .img_url{
    text-align: center;
    // margin-top: 1rem;
    img{
      width: 100%;
      margin: 0 auto;
      
    }

  }
}
</style>
