<template>
<div class="container">
    <div class="header" >
      <div class="content-wrapper">
        <video
          id="myPlayer"
          poster="../../../assets/image/video.png"
          controls
          x5-playsinline="true"
          playsInline
          webkit-playsinline
          muted
        >
            <source id="source" :src="sxturl" type="application/x-mpegURL" />
        </video>
        <div class="content">
          <div class="store_name">  
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                位置选择<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="(val,i) in sxt.cams" :key="i" :command="val.s">{{val.n}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>                
        </div>
      </div>
      <div class="store_credit">
        <ul>
            <li>
                <span class="text">{{deliverycredit_text}}</span>
                <span class="credit store_deliverycredit">{{deliverycredit_credit}}分</span>
            </li>
            <li>
                <span class="text">{{desccredit_text}}</span>
                <span class="credit store_desccredit">{{desccredit_credit}}分</span>
            </li>
            <li>
                <span class="text">{{servicecredit_text}}</span>
                <span class="credit store_servicecredit">{{servicecredit_credit}}分</span>
            </li>
        </ul>
      </div>
      <div class="shopping-info-nums">   
        <div class="store_info mt-5">
          <div><label>商家 名称：</label><span>{{store.store_company_name}}</span></div>
          <div><label>商家 地址：</label><span>{{store.area_info}}</span></div>
          <div>
            <label>商家 电话：</label>
            <span>{{store.store_phone}}</span> 
            <a :href="'tel:'+ store.store_phone">
              <i class="iconfont">&#xe6d1;</i>
            </a>
          </div>
          <div @click="imageVisible=true"><label>商家二维码：</label><i class="iconfont">&#xe6e0;</i></div>
          <div><label>全部 商品：</label><span>{{store.goods_count}}</span></div>
          <div><label>商家 别名：</label><span>{{store.seller_name}}</span></div>
          <!-- 图片 -->
          <div class="block" v-if="store.business_licence_number_electronic">
            <span class="demonstration">营业执照</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[0]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.business_licence_number_electronic" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="store.b_xk1">
            <span class="demonstration">经营许可证</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[1]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.b_xk1" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="store.b_xk2">
            <span class="demonstration">生产许可证</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[2]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.b_xk2" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="store.b_xk3">
            <span class="demonstration">登记证</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[3]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.b_xk3" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="store.b_fzrjkz">
            <span class="demonstration">负责人健康证</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[4]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.b_fzrjkz" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="store.b_aqyjkz">
            <span class="demonstration">安全人员健康证</span>
            <ran-viewer 
              :options="options"
              @inited="inited"
              class="ran-viewer" ref="viewer"
              >
              <template>
                <!-- <mt-spinner v-show="!imgShow[5]" color="dodgerblue" type="fading-circle"></mt-spinner> -->
                <img :src="store.b_aqyjkz" :style="getBannerStyle1">
              </template>
            </ran-viewer>   
          </div>
          <div class="block" v-if="sid">
            <span class="demonstration">返回地图</span>
            <mt-button @click="fun_comeBackMap">返回地图</mt-button>
          </div>
      </div>
    </div>
  </div>
    
  <common-store-footer :store_id="store.store_id"></common-store-footer>
  <mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup">
      <h4>{{store.store_name}}</h4>
      <div class="img-new-box"><img :src="qrcodeurl"></div>
      <p>邀请好友扫一扫分享店铺给TA</p>
  </mt-popup>
</div>
</template>

<script>
import $ from 'jquery'
import { mapState,mapActions } from 'vuex'
import { Toast } from 'mint-ui'
import CommonStoreFooter from '../common/CommonStoreFooter'
import { getStoreInfo } from '../../../api/homestoredetail'
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite'
import HeaderMore from '../../HeaderMore'
// npm install v-viewer --save
import 'viewerjs/dist/viewer.css'
import Viewer from "v-viewer/src/component.vue"
// npm install v-viewer --save

export default {
  name: 'Storeabout',
  data () {
    return {
      imageVisible:false,
      store: {
        store_id: this.$route.query.id ? this.$route.query.id : ''
      },
      lat: this.$route.query.lat ? this.$route.query.lat : null,//商家经纬度
      lng: this.$route.query.lng ? this.$route.query.lng : null,//商家经纬度
      sid: this.$route.query.sid ? this.$route.query.sid : null,//商家经纬度
      rec_goods_list: false,
      popupVisible: false, // 弹出更多
      showDot:false,
      deliverycredit_text:"",
      deliverycredit_credit:0,
      desccredit_text:"",
      desccredit_credit:0,
      servicecredit_text:"",
      servicecredit_credit:0,
      showimage:'',
      isshow:false,
      qrcodeurl:"",
      sxturl:'',
	    sxt:{},
      player:'',
      videoArr:[],
      options:{//配置查看图片缩放
        'button':true, //右上角按钮
        "zoomable": true, //是否可以缩放
        "movable": true, //是否可以移动
        "transition": true, //使用 CSS3 过度
        "fullscreen": true, //播放时是否全屏
        "keyboard": true, //是否支持键盘
        "title": false, //当前图片标题
        "tooltip": false, //显示缩放百分比
        "navbar": false, //底部缩略图
        "toolbar": false, //底部工具栏
        "rotatable": false, //是否可旋转
        "scalable": false, //是否可翻转
      },
      // imgShow:[false,false,false,false,false,false]//图片是否显示
    }
  },
  components: {
    HeaderMore,
    CommonStoreFooter,
    "ran-viewer":Viewer
  },

  computed: {
    ...mapState({
      config: state => state.config.config,
      token: state => state.member.token,
      isOnline:state => state.member.isOnline,
    }),
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    },
    getBannerStyle1: function () {
      const { width, height } = window.screen
      var width1= (width-0)*0.3
      var height1= (height-0)*0.3
      return {
        maxWidth: width1 + 'px',
        maxHeight: height1+ 'px'
      }
    },
  },
  created () {
    getStoreInfo(
      this.store.store_id, this.token
    ).then((res) => {
      this.store = res.result.store_info;

      this.qrcodeurl = env.SITE_URL + '/home/qrcode?url=' + encodeURIComponent(env.H5_HOST + '/home/storedetail?id=' + this.store.store_id)
      this.rec_goods_list = res.result.rec_goods_list
      this.deliverycredit_text = res.result.store_info.store_credit.store_deliverycredit.text
      this.deliverycredit_credit = res.result.store_info.store_credit.store_deliverycredit.credit
      this.desccredit_text= res.result.store_info.store_credit.store_desccredit.text
      this.desccredit_credit= res.result.store_info.store_credit.store_desccredit.credit
      this.servicecredit_text= res.result.store_info.store_credit.store_servicecredit.text
      this. servicecredit_credit= res.result.store_info.store_credit.store_servicecredit.credit
      var s=this.store.camer
      if(s.length>10){
          s=s.replace(/&quot;/g,"\"")
          this.sxt=JSON.parse(s)
          // console.log('sxt',this.sxt);
          var line = JSON.parse(s).cams;
          for(var i = 0;i<line.length;i++){
            this.videoArr.push({n:line[i].n})
          }
          this.getaddr()
      }
      //alert(s)
      if(this.store.is_platform_store){
        this.fetchConfig({}).then(
          response => {
          },
          error => {
              Toast(error.message)
          }
        )
      }
    }).catch(function (error) {
    })
  },
  beforeDestroy(){//销毁阶段 处理数据
    if( this.player ){
      this.player.stop();
      this.player = null;
    }
  },
  methods: {
    ...mapActions({
      fetchConfig: 'fetchConfig'
    }),

    //返回地图函数 
    fun_comeBackMap(){      
      // console.log("返回地图");
      // this.$router.go(-1);
      this.$router.push( { 'name':"HomeMapdh",'query':{'lng':this.lng,'lat':this.lat,'sid':this.sid}} )
    },
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    handleCommand(val) {
      if( this.sxturl !== val ){//如果 选中路线 不是 当前路线
        if( val == null && this.sxturl == 'https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8' ){
          return 
        }
        if( this.player ){//如果有萤石对象
          this.player.stop();//停止
          this.player = null;//清空
          $("#myPlayer").attr("src",null);//坑
        }
        if(val == null){//如果当前播放对象异常
          Toast("设备异常,查看测试视频");//路径更改为 萤石测试地址
          val = "https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8";
        }
        // 路径赋值
        this.sxturl = val;
        $("#myPlayer").attr("src",this.sxturl);
        // 创建 萤石对象
        this.player = new EZUIKit.EZUIPlayer('myPlayer')
        // 播放视频
        this.player.play();
        document.getElementById("myPlayer").volume=0//静音播放（不可更改）
      }
    
    },
    //=====================获取直播地址
    getaddr(){
      let cams="";
      let that=this;
      for (let i = 0; i < this.sxt.cams.length; i++) {
        cams=cams+this.sxt.cams[i]['s']+":1,";
      }
      $.ajax({
        type: "POST", 
        url: "https://open.ys7.com/api/lapp/live/address/get",
        data: {
          accessToken:this.sxt.token,
          source:cams,	
        },            
        dataType: "json", 
        success: function (data) { 
          let addressData = data.data; 
          if (data.code != '200' || !addressData) { 
            Toast("直播链接获取失败"); 
            return;
          }
          for (let i = 0; i < addressData.length; i++) {
            that.sxt.cams[i]['s'] =addressData[i].hls ;
          }
          // 地址赋值
          if(addressData[0].hls == null){//如果当前播放对象异常
            Toast("设备异常,查看测试视频");//路径更改为 萤石测试地址
            addressData[0].hls = "https://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8";
          }
          that.sxturl = addressData[0].hls;
          $("#myPlayer").attr("src",that.sxturl);
          // 创建 萤石对象
          that.player = new EZUIKit.EZUIPlayer('myPlayer')
          // 播放
          that.player.play();
          document.getElementById("myPlayer").volume=0//静音播放（不可更改）
        },            
        error: function (e) {
          console.log(e); 
        }
      });
    },
    // 弹出更多
    popupMore () {
      if (!this.popupVisible) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
    },
    // 图片缩放函数
    inited (viewer) {
      this.$viewer = viewer
    },
    // 判断当前图片是否加载完成
    // ImgLoad(i){
    //   this.imgShow[i] = true;
    //   this.imgShow.splice(i,1,true);
    // }
  }
}
</script>

<style scoped lang="scss">
.header {
  overflow: hidden;position: relative;background-position: center;background-size: auto 100%;
  .content-wrapper {
    -ms-flex-align: center;-webkit-box-align: center;align-items: center;display: -webkit-box;display: -ms-flexbox;display: flex;padding:0.0rem 0.0rem;position: relative;background-size: auto 100%;
    .avatar {
      -ms-flex: 0 0 3rem;-webkit-box-flex: 0;flex: 0 0 3rem;margin-right:0.4rem;width:3rem;    border: 1px solid #efefef;
      img {border-radius:0.1rem;width:3rem;height:3rem;}
    }
    .content {
      position:absolute;
      // width:8rem;height:3rem;
      // margin-left: .5rem;
      top: .2rem;
      right: .5rem;
      .store_name {font-size:.75rem;;margin-bottom:.4rem;}
      .follow_number{line-height:0.7rem;font-size:0.7rem;margin-top:0.1rem;color: #999}
    }
  }
}
    

    .store_credit{background: #fff;padding: 0px .5rem 10px;}
    .store_credit ul li{display: inline-block;width: 33%;text-align: center}
    .store_credit ul li .text{font-size: .6rem}
    .store_credit ul li .credit{font-size: .6rem;margin-left: .2rem}
    .store_credit ul li .store_deliverycredit{color: #ec5151}
    .store_credit ul li .store_desccredit{color: #13ab53}
    .store_credit ul li .store_servicecredit{color: #f447c9}
    .shopping-info-nums{background: #fff;border-top: 1px solid #f3f3f3;padding: 10px 0}
    .shopping-info-nums ul li{width: 50%;text-align: center;display: inline-block;}
    .shopping-info-nums ul li .nums{font-size: .8rem;color: #333}
    .shopping-info-nums ul li .text{font-size: .5rem;color: #999}
    .shopping-about{background: #fff;padding-top: 25px;}
    .shopping-about div{border-top: 1px solid #f3f3f3;padding: 0 .5rem;height: 2rem;line-height: 2rem}
    .shopping-about label{width: 15%;color: #999;text-align: center;font-size: .65rem;vertical-align:middle}
    .shopping-about i {float: right;font-size: 1.1rem;color: #999}
    .store_info {background: #fff;}
    .store_info div{border-bottom: 1px solid #f3f3f3;padding: 7px .5rem;}
    .store_info div span{ font-size: .65rem;vertical-align:middle}
    .store_info div label{ width: 32%;display: inline-block;color: #999;text-align: left;font-size: .65rem;vertical-align:middle}
    
    .store_info .block{
      span{
        width: 32%;display: inline-block;text-align: left;font-size: .65rem;vertical-align: middle;
      }
      .ran-viewer{ display: inline-block;padding: 0;}
    }
    .header .background {-webkit-filter: blur(0.5rem);filter: blur(0.5rem);height: 100%;left: 0;position: absolute;top: 0;width: 100%;z-index: -1;}
    .middle-popup h4{    font-size: .75rem; text-align: center; padding: .6rem;  border: 1px solid #eee; color: #444;}
    .middle-popup .img-new-box{background: #fff; padding: .75rem; margin: .5rem .65rem;height: auto}
    .middle-popup .img-new-box img{width: 100%}
    .middle-popup p{font-size: .65rem;color: #777; text-align: center; padding: .4rem; border-top: 1px solid #eee;}
  .user-avatar {
    display: block;
    border:1px solid #eee;
    position: relative;
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
      height: 100%
    }
  }
  .user-avatar::before {
    position: absolute;
    font-size: 1.5rem;
    line-height: 5rem;
    left: 50%;
    margin-left: -.75rem;
    color: rgba(0, 0, 0, 0.5)
  }
#myPlayer{width: 100%;height: 100%;}
</style>

