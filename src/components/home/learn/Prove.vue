<template>
<div id="app">
  <div class="learn">
    <!-- 顶部开始 -->
    <div class="header">
      <!-- 返回按钮 -->
      <!-- <span class="down_arrow"  @click="$router.push({ name: 'HomeLearn' })"></span> -->
		  <img  class="down_arrow"  @click="$router.push({ name: 'HomeLearn' })" src="@/assets/image/brand/h5_l_f.png"/>
      <span>食品安全知识培训证书</span>
    </div>
    <!---->
    <div class="content"  v-if="!imgState" ref="imageDom">
      <div class="main">
        <div class="title">
          <p>食品安全知识</p>
          <p>培训证书</p>
        </div>
        <div class="hr">
          （食安培训-{{zs}}）
          <hr color="#800000" size="1">
        </div>    
        <div class="info">
          <span>{{dw}}</span>&nbsp;
          <span>{{xm}}</span>
          同志参加年度在线食品安全
          <span>{{'《'+gw_name+'》'}}</span>
          培训总计40课时课程，经考试合格，特发本年度食品安全培训合格证书。
        </div>
        <div  id="qrcode" class="qrcode">
        </div>
        <div class="time">发证日期：{{ksd}}</div>
        <div>
            有 效 期：{{ksd}}至{{ksdYear}}-12-31
        </div>
        <div>
            发证方式：在线颁发
        </div>
        <div class="from">
          <hr color="#800000" size="1">
          <!-- <br> -->
          发证单位：曹县食品安全委员会办公室
        </div>
            
      </div>
      <!-- 图片 -->
    </div>
    <div v-show="imgState" class="img_url">
      <img :src="imgUrl" crossOrigin='anonymous'>
    </div>
  </div>  
  <div class="explain">
    <!-- <p>{{resObj.store_name}}</p> -->
    <mt-button
      @click="fun_downImg"
      class="btn_new"
      size="large"
      >下载图片
    </mt-button>  
  </div>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import QRCode from 'qrcodejs2'  // 引入qrcode
import html2canvas from "html2canvas"
import { getData, getImgUrl } from "../../../api/homeLearn.js";//传递用户id 返回学习信息
export default {
  data(){
    return{
      mid:this.$route.query.mid,
      dw:null,//管理局
      xm:null, //姓名
      gw:null,//岗位
      ksd:null,//发证日期
      zs:null, //证书编号
      gw_name:null,//岗位名称
      ksdYear:null, //有效日期

      imgState:false,
      link:null,
      imgUrl:null,

    }
  },
  mounted () {
    this.fun_loading();
  },
  computed:{
    ...mapState({
      info: state => state.member.info,//用户详细信息 获取id
    })
  },
  methods: {
    
    fun_downImg(){
      if( !window.plus){
        this.link.click();
      }else{        
        getImgUrl(this.imgUrl,this.id).then(res=>{
          var sd_path = "";
          var name = "合格证";
          var watiting = plus.nativeUI.showWaiting("开始下载：0%");  
          var dtask = plus.downloader.createDownload('https://'+res.result, {  
              method:"GET",
              filename:"_downloads/img/zs.jpg"
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

          /************************************** */
        })
      }
    },
    fun_loading(){
      getData(this.mid).then(res=>{
        var res = res.result;
        // 如果培训时间 不达标
        // if( res.ks < 144000 ){
        //   // 跳转到培训页面
        //   this.$router.push({ name: 'HomeTraining' })
        // }else if( res.fs < 85 ){
        //   // 跳转到考试页面
        //   this.$router.push({ name: 'HomeTest' })
        // }
        if( !res.zs ){
          // 跳转到考试页面
          this.$router.push({ name: 'HomeLearn' })
        }
        [ this.dw,this.xm,this.gw_name,this.ksd,this.zs ] = [ res.dw,res.xm,res.gw_name,res.ksd,res.zs ]
        this.zs = this.zs.split("|")[0];
        this.ksdYear = res.ksd.slice(0,4);
        this.qrcode();
      }).catch(err=>{
        Toast(err.message);
      })
    },
    qrcode() {
      let qrcode = new QRCode('qrcode', {
        width: 132,  
        height: 132,
        text: env.H5_HOST+'/home/prove?mid='+this.mid, // 二维码地址
        colorDark : "#000",
        colorLight : "#fff",
      })
      var that = this;
      this.$nextTick(()=>{
        //生成图片
        html2canvas(this.$refs.imageDom,{useCORS:true,logging:true}).then(canvas => {
            // 转成图片，生成图片地址
            this.imgUrl = canvas.toDataURL("image/png"); //可将 canvas 转为 base64 格式
            // console.log('生成的图片',this.imgUrl);
            this.imgState = true;

            this.link = document.createElement("a");
            this.link.href = canvas.toDataURL("image/png");//下载链接
            this.link.setAttribute("download","食品安全.png");
            this.link.style.display = "none";//a标签隐藏
            document.body.appendChild(this.link);
        });
      })
    },
  }
}
</script>

<style lang="scss" scoped>
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
.learn{
  $arrow: 1.2rem;
  $arrowcolor: #fff;
  // 顶部内容----------------------------------
  .header{
    text-align: center;
    position: relative;  
    padding: .46rem .2rem;
    background-color: #008080;
    font-size: 1rem;
    color: #fff;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
    }
    .h_time{
      margin-left: .2rem;
      color:#ffff00;
      font-size: .68rem;
    }
  }
  // ----------------------------
  .img_url{
      img{width: 100%;}
    }
  .content{
    background: #fff;
    padding: 1rem 2.2rem;
    height: 26rem;
    line-height: 1.6;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;

    
    .main{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      line-height: 1.6;
      font-size: 0.68rem;

      .title{
        font-family: '微软雅黑';
        font-weight: 400;
        font-size: 1.1rem;
        color: #e64241;
        text-align: center;
      }

      .hr{
        text-align: center;
        font-size: 0.4rem;
        font-weight: bold;
        margin: 0 auto;
      }
      
      .qrcode{
        display: flex;
        justify-content: center;
        img{
          margin: 0 auto;
        }
      }

      .info{
        font-size: 0.72rem;
      }

      .from{
        font-size: 0.6rem;
        color: #e64241;
        font-weight: bold;
        margin-bottom: 0.05rem;
        width: 100%;
      }
    }
  }
}
</style>