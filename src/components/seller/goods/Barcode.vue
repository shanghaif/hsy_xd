<template>
<div class="Barcode">
  <!-- 顶部返回栏 -->
  <head-title fontSize='0.32rem' fontSizeRight='0.30rem'></head-title>
  <!-- 主体 -->
  <div class="cont">
      <!-- 转换的 图片 -->
      <div v-show="!imgUrl && goodInfo.goods_name" ref="imageDom" class="image-dom">
        <!-- 标题 -->
        <div class="title">
          <p>好食源溯源二维码</p>
          <span>亮码销售</span>
        </div>
        <!-- 表格 -->
        <table>
          <tr>
            <td>食品名称：</td>
            <td>{{goodInfo.goods_name}}</td>
          </tr>
          <tr>
            <td>批次号：</td>
            <td>{{goodInfo.pch}}</td>
          </tr>
          <tr>
            <td>溯源编码：</td>
            <td>{{goodInfo.suyuan}}</td>
          </tr>
        </table>
        <!-- 二维码 -->
        <div class="qrcode" id="qrcode" ref="qrcode">
          <img src="https://shop.ihaosy.com/uploads/home/common/seller_center_logo.png" alt="">
          <!-- <div>
            <span>好</span>
            <span>食</span>
            <span>源</span>
          </div> -->
        </div>
      </div>
      <img v-show="imgUrl" :src="imgUrl" alt="">

      <button
        @click="fun_downImg"
        class="btn_new"
        >下载溯源码
      </button>
  </div>
</div>
</template>

<script>
import QRCode from 'qrcodejs2'
import html2canvas from "html2canvas"
import { Toast } from 'mint-ui'
import HeadTitle from '../../HeadTitle';

import { getGoodsQrcode } from "../../../api/sellerGoods";//获取 证书列表
import { getPdfQualify_w } from "../../../api/sellerQualify";//获取 证书列表

export default {
  data () {
    return {
      goods_commonid:this.$route.query.goods_commonid,//传过来的id
      imgUrl:null,  //  图片路径

      goodInfo: {
        goods_name : null,  //  商品名称
        pch : null,         //  批次号
        suyuan : null,      //  溯源码
      },    // 商品详情
    }
  },

  components:{
    HeadTitle
  },

  created () {
    this.fun_loading();
  },

  mounted(){
		let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    
    html.style.fontSize = (sw/7.5) + 'px';
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
      html.style.fontSize = (sw/7.5) + 'px';
    };
  },

  methods: {
    // 初始化函数
    fun_loading(){
      // 查看详情
      getGoodsQrcode( this.goods_commonid ).then(res=>{
        // console.log(res);
        this.goodInfo = res.result;
        this.qr = new QRCode(document.getElementById("qrcode"), {
          width: 120,
          height: 120,
          text: env.H5_HOST + "/home/traceability?goods_commonid="+this.goods_commonid// 二维码内容
        })
        // 拼接
        var that = this;
        this.$nextTick(()=>{
          //生成图片
          html2canvas(this.$refs.imageDom,{useCORS:true,logging:true}).then(canvas => {
            // 转成图片，生成图片地址
            this.imgUrl = canvas.toDataURL("image/png"); //可将 canvas 转为 base64 格式
            if( !window.plus){
              that.link = document.createElement("a");
              that.link.href = canvas.toDataURL("image/png");//下载链接
              // that.link.href = 'https://shop.ihaosy.com/uploads/home/appadv/5e9cc7eea54d7.jpg';
              that.link.setAttribute("download","123.jpg");
              that.link.style.display = "none";//a标签隐藏
              document.body.appendChild(that.link);
            }
          });
        })
      })
    },

    // 点击下载
    fun_downImg(){
      if( !window.plus){
        var ua = navigator.userAgent.toLowerCase();
        //如果在微信里
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          Toast("长按溯源码图片保存");
        }else if(!this.link){
          this.getBase64Image(this.$refs.refimg,this.$refs.refimg.width,this.$refs.refimg.height);
        }else{
          this.link.click();
        }
      }else{
        if(this.hasImgUrl){
          this.plusDownloader(this.imgUrl);
        }else{
          getPdfQualify_w(this.imgUrl,this.id,this.n).then(res=>{
            this.plusDownloader('https://'+res.result);
          })
        }
      }
    },
    // PLUS 下载图片
    plusDownloader(url){
      var sd_path = "";
      var name = "溯源码";
      var watiting = plus.nativeUI.showWaiting("开始下载：0%");  
      var dtask = plus.downloader.createDownload(url, {
          method:"GET",
          filename:"_downloads/hegezheng.jpg"
        },
        function(d,status){
          // alert('状态'+status);
          //d为下载的文件对象
          if(status==200){
            alert("下载成功");
          }else{
            alert("下载失败");
            //下载失败
            plus.downloader.clear();        //清除下载任务
          }
        }
      );   
      dtask.addEventListener("statechanged",  function(task,  status)  {
        if  (!dtask)  {              
          return;          
        }   
        // alert(task.state);
        switch  (task.state)  {             
            case  1:  
                  // 开始  
                break;              
            case  2:  
                  // 已连接到服务器  
                break;              
            case  3:  
                  // 已接收到数据  
                var  nowData  =  Math.floor(task.downloadedSize  *  100  /  task.totalSize);   
                // alert(nowData);             
                if  (nowData  %  10  ===  0)  {                      
                    watiting.setTitle("已下载："  +  nowData  +  "%");                      
                    if  (nowData  ===  100)  {                          
                        plus.nativeUI.toast("正在准备环境，请稍后！");      
                        plus.io.resolveLocalFileSystemURL(dtask.filename, function(entry) {  
                            sd_path = plus.io.convertLocalFileSystemURL("_downloads/" + name);  
                            watiting.close();  
                            plus.runtime.openFile(dtask.filename,{},function(err){  
                                alert('打开失败');  
                            });  
                        });                                   
                        //plus.runtime.quit();                      
                    }                  
                }                  
                break;              
            case  4:  
                  // 下载完成  
                break;  
        }      
      },false);      
      dtask.setRequestHeader('Access-Control-Allow-Origin','*');  
      dtask.start();  
    },

    // 浏览器下载
    getBase64Image(img,width,height) {
      //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
      var canvas = document.createElement("canvas");
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();  
      this.link = document.createElement("a");
      this.link.href = dataURL;//下载链接
      this.link.setAttribute("download","溯源码.jpg");
      this.link.style.display = "none";//a标签隐藏
      document.body.appendChild(this.link);
      this.link.click();
    },
  }
}
</script>

<style scoped lang="scss">
.Barcode{
  text-align: center;
  font-size: 0.14rem;  
  // 头部
  &/deep/.head_title_cont{
    height: 4.5rem;
    height: 0.9rem;
    .header-wrap{
      padding: 1.3rem 1.5rem 1.2rem;
      padding: 0.26rem .3rem 0.24rem;
      img{
        width: 2rem;
        height: 2rem;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
		.header-title-r{
			right: -15%;
		}
  }

  .cont{
    .image-dom{
      text-align: center;
      padding: 0.85rem 0.55rem;
      height: 9rem;
      // border: 1px solid #eee;
      .title{
        font-size: 0.36rem;
        p{
          margin-bottom: 0.16rem;
          font-size: 0.42rem;
        }
      }

      table{
        border-collapse: collapse;
        border: none;
        margin: 1rem auto;
        tr{
          td{
            padding: 0.15rem;
            text-align: right;
            &:last-child{
              width: 4.48rem;
              text-align: left;
              border-left: 1px solid #000;
              border-right: 1px solid #000;
              border-top: 1px solid #000;
            }
            &:first-child{
              width: 1.54rem;
              border-left: 1px solid #000;
              border-right: 0 solid #000;
              border-top: 1px solid #000;
            }
          }
          &:last-child{
            td{
              border-bottom: 1px solid #000;
            }
          }
        }
      }
      .qrcode{
        width: fit-content;
        margin: 0 auto;
        position: relative;
        >img{
          position: absolute;
          width: 42px;
          height: 42px;
          background: transparent;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        // &::before{
        //   content: "好食源";
        //   display: block;
        //   border: 2px solid #fff;
        //   position: absolute;
        //   width: 60px;
        //   height: 60px;
        //   line-height: 60px;
        //   color: #fff;
        //   background: rgba(6,6,6,0.3);
        //   font-weight: 800;
        //   font-size: 20px;
        //   top: 50%;
        //   left: 50%;
        //   -webkit-transform: translate(-50%, -50%);
        //   transform: translate(-50%, -50%);
        //   padding: 6px;
        // }
      }
    }

    >img{
      width: 100%;
    }

    .btn_new{
      width: 6.90rem;
      height: .80rem;
      background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
      box-shadow: 0px 0px .2rem 0px rgba(251, 104, 84, 0.5);
      border-radius: .40rem;
      color: #fff;

      position: fixed;
      left: 0.3rem;
      bottom: 0.6rem;
    }
  }
}
</style>