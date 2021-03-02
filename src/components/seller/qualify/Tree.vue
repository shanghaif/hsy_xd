<template>
<div>
  <div class="common-header-wrap">
    <mt-header class="common-header" title="食品合格证">
        <mt-button icon="back" slot="left"  @click="$router.go(-1)"></mt-button>
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
        <!-- <span class="down_arrow"  @click="$router.go(-1)"></span>
        <span>合格证</span>
      </div>     -->
      <div class="get_data">
        <div class="time"
          @click="onDate('start')">
          <mt-cell title="起始" is-link>{{startTime?$moment.unix(startTime).format('YYYY-MM-DD'):''}}</mt-cell>
        </div>
        <div class="time"
          @click="onDate('end')">
          <mt-cell title="结束" is-link>{{endTime?$moment.unix(endTime).format('YYYY-MM-DD'):''}}</mt-cell>
        </div>
        <mt-button @click="fun_getData">查询</mt-button>
      </div>
      <!-- 上面输入框 -->
      <div>
        <ul id="tree" class="ztree" style="overflow:auto;"></ul>
      </div>    
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

  </div>
</div>
</template>

<script>
import { getCertificate, getCertificateChild } from '../../../api/sellerQualify'
// import '../../../assets/css/jquery-1.4.4.min.js';
import '../../../assets/css/jquery.ztree.core.js';

export default {
  data(){
    return{
      name:null,
      startTime:null,  //起始时间
      endTime:null,    //结束时间
      dataName:null,   //时间类型
      selectData: '',
      selectDataMy: '',
      TimeType:1,
    }
  },
  methods:{
    // 选择时间函数
    onDate (name,type) {
      this.dataName = name;      
      if( name ==  'start' ){
        this.selectData = this.startTime*1000;
        this.$refs.startTime.open();
      }else{
        this.selectData = this.endTime*1000;
        this.$refs.endTime.open();
      }
    },
    // 接收日期
    dateConfirm (value) {
      var nowDate = parseInt(value.getTime() / 1000);      
      if( this.dataName == 'start'){
        if( nowDate <= this.endTime){
          this.startTime = nowDate;
        }else{
          Toast("请重新选择时间");
        }
      }else{
        if( nowDate >= this.startTime){
          this.endTime = nowDate;
        }else{          
          Toast("请重新选择时间");
        }
      }
      this.$forceUpdate()
    },
    fun_getData(){
      getCertificate(this.$moment.unix(this.startTime).format('YYYY-MM-DD'),this.$moment.unix(this.endTime).format('YYYY-MM-DD')).then(res=>{      
        var zTree;
        var demoIframe;
        var zNodes;

        var setting = {
          view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true,
              // idKey: "id",
              // pIdKey: "pId",
              // idKey: "goods_id",
              // pIdKey: "goods_fa",
              idKey: "certificate_no",
              pIdKey: "certificate_pno",
              rootPId: ""
            }
          },
          callback: {
            beforeClick: function (treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj("tree");
              if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
              } else {
                // demoIframe.attr("src", treeNode.file + ".html");
                return true;
              }
            }
          }
        };
        for(var item of res.result){
          if( item.certificate_no == 0 ){
            item.certificate_no = new Date().getTime()+Math.random()*5;
          }
          if( !item.child ){
            if( !item.child_fa ){
              item.name =  `暂无 [${item.store_name?item.store_name:"暂无"}](${item.num})`;
            }else{
              item.name =  `${item.child_fa.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.num}）`;
            }
          }else{
            item.name = `${item.child.product_name} [${item.store_name?item.store_name:"暂无"}]（${item.num}）`;
          }
        }
        zNodes = res.result;
        // console.log(zNodes)
        $(document).ready(function () {
          var t = $("#tree");
          t = $.fn.zTree.init(t, setting, zNodes);
          // demoIframe = $("#testIframe");
          // demoIframe.bind("load", loadReady);
          // var zTree = $.fn.zTree.getZTreeObj("tree");
          // zTree.selectNode(zTree.getNodeByParam("id", 101));

        });

        function loadReady() {
          var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
            htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
            maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
            h = demoIframe.height() >= maxH ? minH : maxH;
          if (h < 530) h = 530;
          demoIframe.height(h);
        }
      
      })
    }
  },
  created(){    
    this.endTime = parseInt(new Date().getTime() / 1000);
    this.startTime = parseInt( (new Date(new Date().getTime()-2592000000)) / 1000);
  },
  mounted(){
    this.fun_getData();
  }
}
</script>

<style lang="scss" scoped>
.get_data{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

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
    display: inline-block;
    text-align: left;
    position: relative;
    $w:300px;
    $h:456px;
    background-image: url('../../../assets/image/bg.jpg');
    background-repeat: no-repeat;
    background-size: $w $h;
    background-position: top;
    height: 480px;

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

        .qrcode{
          position: absolute;
          bottom: -10px;
          right: 4px;
          img{
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
  .img_cont1{
    background-image: url('../../../assets/image/bg1.jpg');
  }
  .img_url{
    text-align: center;
    // margin-top: 1rem;
    img{
      width: 100%;
      margin: 0 auto;
      
    }

  }
}
//  @import '../../../assets/css/zTreeStyle.css';
/*-------------------------------------
zTree Style

version:	3.4
author:		Hunter.z
email:		hunter.z@263.net
website:	http://code.google.com/p/jquerytree/

-------------------------------------*/

.ztree * {padding:0; margin:0; font-size:12px; font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif}
.ztree {
  margin:0; padding:5px; color:#333;
  &/deep/ li{
    padding:0; margin:.85rem 0; list-style:none; line-height:14px; text-align:left; white-space:nowrap; outline:0;
    // color:red;
    ul{ 
      margin:0; padding:0 0 0 18px;

    }
    ul.line{ background:url(../../../assets/css/img/line_conn.gif) 0 0 repeat-y;}

    a {
      padding:1px 3px 0 0; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
      text-decoration:none; vertical-align:top; display: inline-block;
      &:hover {text-decoration:underline}
      
      &.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    }
    // a.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.curSelectedNode {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.curSelectedNode_Edit {padding-top:0px; background-color:#FFE6B0; color:black; height:16px; border:1px #FFB951 solid; opacity:0.8;}
    a.tmpTargetNode_inner {padding-top:0px; background-color:#316AC5; color:white; height:16px; border:1px #316AC5 solid;
      opacity:0.8; filter:alpha(opacity=80)}
    a.tmpTargetNode_prev {}
    a.tmpTargetNode_next {}
    a input.rename {height:14px; width:80px; padding:0; margin:0;
      font-size:12px; border:1px #7EC4CC solid; *border:0px}
 
 

 span {line-height:16px; margin-right:2px}
  span.button {
    line-height:0; margin:0;
    width:16px; height:16px;
    display: inline-block; vertical-align:middle;
    border:0 none; cursor: pointer;outline:none;
    background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
    background-image:url("../../../assets/css/img/zTreeStandard.png");
    *background-image:url("../../../assets/css/img/zTreeStandard.gif")
  }

 span.button.chk {width:13px; height:13px; margin:0 3px 0 0; cursor: auto}
 span.button.chk.checkbox_false_full {background-position:0 0}
 span.button.chk.checkbox_false_full_focus {background-position:0 -14px}
 span.button.chk.checkbox_false_part {background-position:0 -28px}
 span.button.chk.checkbox_false_part_focus {background-position:0 -42px}
 span.button.chk.checkbox_false_disable {background-position:0 -56px}
 span.button.chk.checkbox_true_full {background-position:-14px 0}
 span.button.chk.checkbox_true_full_focus {background-position:-14px -14px}
 span.button.chk.checkbox_true_part {background-position:-14px -28px}
 span.button.chk.checkbox_true_part_focus {background-position:-14px -42px}
 span.button.chk.checkbox_true_disable {background-position:-14px -56px}
 span.button.chk.radio_false_full {background-position:-28px 0}
 span.button.chk.radio_false_full_focus {background-position:-28px -14px}
 span.button.chk.radio_false_part {background-position:-28px -28px}
 span.button.chk.radio_false_part_focus {background-position:-28px -42px}
 span.button.chk.radio_false_disable {background-position:-28px -56px}
 span.button.chk.radio_true_full {background-position:-42px 0}
 span.button.chk.radio_true_full_focus {background-position:-42px -14px}
 span.button.chk.radio_true_part {background-position:-42px -28px}
 span.button.chk.radio_true_part_focus {background-position:-42px -42px}
 span.button.chk.radio_true_disable {background-position:-42px -56px}

 span.button.switch {width:18px; height:18px}
 span.button.root_open{background-position:-92px -54px}
 span.button.root_close{background-position:-74px -54px}
 span.button.roots_open{background-position:-92px 0}
 span.button.roots_close{background-position:-74px 0}
 span.button.center_open{background-position:-92px -18px}
 span.button.center_close{background-position:-74px -18px}
 span.button.bottom_open{background-position:-92px -36px}
 span.button.bottom_close{background-position:-74px -36px}
 span.button.noline_open{background-position:-92px -72px}
 span.button.noline_close{background-position:-74px -72px}
 span.button.root_docu{ background:none;}
 span.button.roots_docu{background-position:-56px 0}
 span.button.center_docu{background-position:-56px -18px}
 span.button.bottom_docu{background-position:-56px -36px}
 span.button.noline_docu{ background:none;}

  span.button.ico_open{
    margin-right:2px;
    // background-position:-110px -16px;
    background-position: -110px -32px;
    vertical-align:top; *vertical-align:middle}
 span.button.ico_close{
    margin-right:2px;
    // background-position:-110px 0;
    background-position: -110px -32px;
    vertical-align:top; *vertical-align:middle}
 span.button.ico_docu{
   margin-right:2px;
   background-position:-110px -32px;
   vertical-align:top; *vertical-align:middle}
 span.button.edit {
   margin-right:2px;
  //  background-position:-110px -48px;
    background-position: -110px -32px;
   vertical-align:top; *vertical-align:middle}
 span.button.remove {
   margin-right:2px;
  //  background-position:-110px -64px;
    background-position: -110px -32px;
   vertical-align:top; *vertical-align:middle}

 span.button.ico_loading{margin-right:2px; background:url(../../../assets/css/img/loading.gif) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}

ul.tmpTargetzTree {background-color:#FFE6B0; opacity:0.8; filter:alpha(opacity=80)}

span.tmpzTreeMove_arrow {width:16px; height:16px; display: inline-block; padding:0; margin:2px 0 0 1px; border:0 none; position:absolute;
	background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
	background-position:-110px -80px; background-image:url("../../../assets/css/img/zTreeStandard.png"); *background-image:url("../../../assets/css/img/zTreeStandard.gif")}

ul.ztree.zTreeDragUL {margin:0; padding:0; position:absolute; width:auto; height:auto;overflow:hidden; background-color:#cfcfcf; border:1px #00B83F dotted; opacity:0.8; filter:alpha(opacity=80)}
.zTreeMask {z-index:10000; background-color:#cfcfcf; opacity:0.0; filter:alpha(opacity=0); position:absolute}
 }

}
/* level style*/
/* span.button.level0 {
	display:none;
}
 ul.level0 {
	padding:0;
	background:none;
}*/
</style>