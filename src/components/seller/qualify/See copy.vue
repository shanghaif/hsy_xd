<template>
<div class="q_see">
    <!-- 顶部开始 -->
    <div class="header">
      <!-- 返回按钮 -->
      <span class="down_arrow"  @click="fun_back"></span>
      <span>新增食品合格证</span>
    </div>
    <!-- 上面输入框 -->
    <div v-show="!imgState" class="img_cont">
      <div class="content">
        <div class="no">{{resObj.certificate_no}}</div>
        <!-- 上面 -->
        <ul class="top">
          <li><span>食用农产品名称：&nbsp;&nbsp;{{ resObj.product_name}}</span></li>
          <li><span>数量（重量）：&nbsp;&nbsp;{{ resObj.product_num}}</span></li>
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
          <!-- </div> -->
        </ul>
        <!-- 下面 -->
      </div>
    </div>
    <!-- 下面图片 -->
    <div v-show="imgState" class="img_url">
      <img :src="imgUrl" >
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import { getQualifyInfo } from "../../../api/sellerQualify";//获取 证书列表
export default {
  data () {
    return {
      imgState:true,
      imgUrl:null,//图片路径
      id:this.$route.query.id,//传过来的id

      resObj:{},    //返回数据
      product_name : null,  //产品名称
      product_num : null,   //产品数量
      product_phone : null, //联系方式
      product_origin : null,//产地
      add_time : null,      //开具日期
      autograph_seal : null,//签名
      additional : null,    //附加信息
      check:{
        check1: null,
        check2: null,
        check3: null,
        check4: null,
        check5: null,
        check6: null,
        check7: null,
        check8: null,
        check9: null,
      }
    }
  },
  computed: {
    ...mapState({
      items: state => state.goodsclass.items
    })
  },
  created () { 
      this.imgUrl = 'https://shop.ihaosy.com/uploads/home/store/goods/30/30_2020072318404244354_240.jpg';
      // 查看详情
      getQualifyInfo( this.id ).then(res=>{
        var res = res.result;
        if( !res.certificate_image ){
          // 拼接
          this.imgState = false;
          this.resObj = res;

          this.product_name = 
          this.check1 = res.check1;
          this.check2 = res.check2;
          this.check3 = res.check3;
          this.check4 = res.check4;
          this.check5 = res.check5;
          this.check6 = res.check6;
          this.check7 = res.check7;
          this.check8 = res.check8;
          this.check9 = res.check9;
        }else{
          // 展示图片
          this.imgUrl = res.image;
        }
      })
  },
  methods: {
    // 返回
    fun_back(){
      this.$router.push( {name:"SellerQualify",query:{id:'1'} });
    },
  }
}
</script>

<style scoped lang="scss">
.q_see{
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  height: 100vh;
  position: relative;
  padding:0 .4rem 0;

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
    $w:300px;
    $h:456px;
    background-image: url('../../../assets/image/bg.jpg');
    background-repeat: no-repeat;
    background-size: $w $h;
    background-position: top;
    height: $h;

    .content{
      width: $w;
      // height: $h;
      // background: red;
      margin: 0 auto;
      padding-top: 94px;
      position: relative;

      .no{
        font-size: 12px;
        position: absolute;
        top: 41px;
        right: 7px;
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
        /* margin-top: 35px; */
        width: 218px;
        margin-left: 42px;
        margin-top: 38px;
        font-size: 12px;
        // background: #fff;
        // border:1px solid  pink;
        font-size: 12px;
        position: relative;

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
          width: 212px;
          left: -24px;
          margin-bottom: 7px;
          line-height: 22px;
          -webkit-transform: scale(0.7);
          transform: scale(0.7);
          white-space: pre-wrap;
        }
      }
    }
  }

  .img_url{
    $w:300px;
    $h:456px;
    height: $h;
    text-align: center;
    margin-top: 1rem;
    img{
      width: 90%;
      margin: 0 auto;
      
    }

  }
}
</style>
