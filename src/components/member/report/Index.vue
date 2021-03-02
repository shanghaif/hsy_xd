<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 15:35:13
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-15 16:23:30
-->
<template>
<div class="report-cont">  
  <!-- 顶部按钮 -->  
  <head-title title="举报管理"></head-title>
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
        <mt-tab-item id="1">举报商品</mt-tab-item>
        <mt-tab-item id="2">举报商家</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <inform-list></inform-list>          
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <report-list></report-list>
        </mt-tab-container-item>        
      </mt-tab-container>
    </div>
  </div>
  
</div>
</template>

<script>
import { Toast,  } from "mint-ui";
import { mapState } from "vuex";
import HeadTitle from '../../HeadTitle';
import ReportList from './ReportList';
import InformList from '../inform/InformList';
export default {
  data(){
    return {
      selected: '1',
    }
  },
  components:{
    'report-list':ReportList,
    'inform-list':InformList,
    'head-title':HeadTitle,
  },

  methods:{
    // 返回函数
    fun_back(){
      this.$router.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
.report-cont{
  div{
    box-sizing: border-box;
  }
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  flex-direction: column;
  .head_title_cont{
    flex-shrink: 0;
  }
  .qualify{
    flex-shrink:1;
    overflow-y: scroll;
    .content{
      display: flex;
      height: 100%;
      overflow-y: hidden;
      flex-direction: column;
      &/deep/.mint-tab-container{
        flex: 1;
        overflow-y: scroll;
      }
    }
  }
}
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